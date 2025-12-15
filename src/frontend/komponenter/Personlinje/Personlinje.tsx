import React, { type PropsWithChildren } from 'react';

import { BodyShort, Box, CopyButton, HStack, Tag } from '@navikt/ds-react';
import { kjønnType } from '@navikt/familie-typer';

import { useHentPerson } from '../../hooks/useHentPerson';
import type { IBehandling } from '../../typer/behandling';
import type { IMinimalFagsak } from '../../typer/fagsak';
import { FagsakType } from '../../typer/fagsak';
import { type IPersonInfo } from '../../typer/person';
import { Datoformat, isoStringTilFormatertString } from '../../utils/dato';
import { formaterIdent, hentAlder, millisekunderIEttÅr } from '../../utils/formatter';
import { erAdresseBeskyttet } from '../../utils/validators';
import DødsfallTag from '../DødsfallTag';
import { PersonIkon } from '../PersonIkon';
import styles from './Personlinje.module.css';

function InnholdContainer({ children }: PropsWithChildren) {
    return (
        <Box borderWidth={'0 0 1 0'} borderColor={'border-subtle'} paddingInline={'4'} paddingBlock={'2'}>
            {children}
        </Box>
    );
}

function Divider() {
    return <div>|</div>;
}

function sjekkOmMigreringsdatoErEldreEnn3År(migreringsdatoIString: string) {
    const dato = new Date();
    const migreringsdato = new Date(migreringsdatoIString);
    const difference = dato.getTime() - migreringsdato.getTime();
    return Math.floor(Math.abs(difference) / millisekunderIEttÅr) < 3;
}

function utledFagsakeier(bruker?: IPersonInfo, søkerData?: IPersonInfo) {
    return {
        navn: bruker?.navn || 'Ukjent',
        ident: formaterIdent(bruker?.personIdent ?? ''),
        alder: hentAlder(bruker?.fødselsdato ?? ''),
        kjønn: bruker?.kjønn ?? kjønnType.UKJENT,
        kommunenummer: bruker?.kommunenummer ?? 'ukjent',
        erEgenAnsatt: søkerData?.erEgenAnsatt || bruker?.erEgenAnsatt || false,
        erFalskIdentitet: bruker?.erFalskIdentitet || false,
    };
}

function utledSøker(fagsak?: IMinimalFagsak, søkerData?: IPersonInfo) {
    if (fagsak?.fagsakType === FagsakType.INSTITUSJON) {
        return {
            navn: fagsak.institusjon?.navn || 'Ukjent',
            ident: formaterIdent(fagsak.institusjon?.orgNummer ?? ''),
        };
    }
    if (fagsak?.fagsakType === FagsakType.SKJERMET_BARN) {
        return {
            navn: søkerData?.navn || 'Ukjent',
            ident: formaterIdent(søkerData?.personIdent ?? ''),
            alder: hentAlder(søkerData?.fødselsdato ?? ''),
            dødsfallDato: søkerData?.dødsfallDato,
        };
    }
    return undefined;
}

interface Props {
    bruker?: IPersonInfo;
    fagsak?: IMinimalFagsak;
    behandling?: IBehandling;
}

export function Personlinje({ bruker, fagsak }: Props) {
    // TODO: Dersom bruker også er søker, som ofte er tilfelle, gjør vi et unødvendig kall for å hente person-information om søker (useHentPerson) selv om vi allerede får denne informasjonen fra `bruker`. Dett bør fikses i en senere PR ved å endre til bruk av context for å få global tilgang til bruker og søker fra context, fremfor å passere bruker som prop her, og i tillegg gjøre et kall for å hente søker.
    // TODO : Her burde man håndtere "error" og "isPending" tilstandene
    const { data: søkerData } = useHentPerson({ ident: fagsak?.søkerFødselsnummer });

    const fagsakeier = utledFagsakeier(bruker, søkerData);
    const søker = utledSøker(fagsak, søkerData);

    return (
        <InnholdContainer>
            <HStack align={'center'} gap={'3 4'}>
                <HStack gap={'3 4'}>
                    <PersonIkon
                        fagsakType={fagsak?.fagsakType}
                        kjønn={fagsakeier.kjønn}
                        erBarn={fagsakeier.alder < 18}
                        erAdresseBeskyttet={erAdresseBeskyttet(søkerData?.adressebeskyttelseGradering)}
                        erEgenAnsatt={fagsakeier.erEgenAnsatt}
                    />
                    <HStack align={'center'} gap={'3 4'}>
                        <BodyShort as={'span'} weight={'semibold'}>
                            {fagsakeier.navn} ({fagsakeier.alder} år){' '}
                            {fagsakeier.erFalskIdentitet && (
                                <BodyShort as={'span'} weight={'semibold'}>
                                    - <mark className={styles.falskIdentitet}>Falsk identitet</mark>
                                </BodyShort>
                            )}
                        </BodyShort>
                        <Divider />
                        <HStack align={'center'} gap={'1'}>
                            {fagsakeier.ident}
                            <CopyButton copyText={fagsakeier.ident.replace(' ', '')} size={'small'} />
                        </HStack>
                    </HStack>
                </HStack>
                <Divider />
                <BodyShort>{`Kommunenr: ${fagsakeier.kommunenummer}`}</BodyShort>
                {søker && (
                    <>
                        <Divider />
                        <HStack align={'center'} gap={'3 4'}>
                            <span>
                                <BodyShort as={'span'} weight={'semibold'}>
                                    Søker:{' '}
                                </BodyShort>
                                {søker.navn}
                                {søker.alder && <> ({søker.alder} år)</>}
                            </span>
                            <Divider />
                            <HStack align={'center'} gap={'1'}>
                                {søker.ident}
                                <CopyButton copyText={søker.ident.replace(' ', '')} size={'small'} />
                            </HStack>
                        </HStack>
                    </>
                )}
                {søkerData && søkerData.dødsfallDato && søkerData.dødsfallDato.length > 0 && (
                    <>
                        <Divider />
                        <DødsfallTag dødsfallDato={søkerData.dødsfallDato} />
                    </>
                )}
                {fagsak?.migreringsdato && sjekkOmMigreringsdatoErEldreEnn3År(fagsak.migreringsdato) && (
                    <>
                        <Divider />
                        <Tag variant={'info'} size={'small'}>
                            Migrert{' '}
                            {isoStringTilFormatertString({
                                isoString: fagsak?.migreringsdato,
                                tilFormat: Datoformat.DATO,
                            })}
                        </Tag>
                    </>
                )}
            </HStack>
        </InnholdContainer>
    );
}
