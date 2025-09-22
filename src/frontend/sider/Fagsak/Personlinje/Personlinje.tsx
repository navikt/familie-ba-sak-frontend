import React from 'react';

import { BodyShort, Box, CopyButton, HStack, Tag } from '@navikt/ds-react';
import { kjønnType } from '@navikt/familie-typer';

import { useHentPerson } from '../../../hooks/useHentPerson';
import DødsfallTag from '../../../komponenter/DødsfallTag';
import { PersonIkon } from '../../../komponenter/PersonIkon';
import type { IBehandling } from '../../../typer/behandling';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import { FagsakType } from '../../../typer/fagsak';
import { type IPersonInfo } from '../../../typer/person';
import { Datoformat, isoStringTilFormatertString } from '../../../utils/dato';
import { formaterIdent, hentAlder, millisekunderIEttÅr } from '../../../utils/formatter';
import { erAdresseBeskyttet } from '../../../utils/validators';

interface PersonlinjeProps {
    bruker?: IPersonInfo;
    minimalFagsak?: IMinimalFagsak;
    behandling?: IBehandling;
}

const InnholdContainer = ({ children }: React.PropsWithChildren) => {
    return (
        <Box borderWidth="0 0 1 0" borderColor="border-subtle" paddingInline="4" paddingBlock="2">
            {children}
        </Box>
    );
};

const Divider = () => {
    return <div>|</div>;
};

export const Personlinje = ({ bruker, minimalFagsak }: PersonlinjeProps) => {
    // TODO: Dersom bruker også er søker, som ofte er tilfelle, gjør vi et unødvendig kall for å hente person-information om søker (useHentPerson) selv om vi allerede får denne informasjonen fra `bruker`. Dett bør fikses i en senere PR ved å endre til bruk av context for å få global tilgang til bruker og søker fra context, fremfor å passere bruker som prop her, og i tillegg gjøre et kall for å hente søker.

    const { data: søkerData } = useHentPerson({ ident: minimalFagsak?.søkerFødselsnummer });

    const fagsakeier = {
        navn: bruker?.navn || 'Ukjent',
        ident: formaterIdent(bruker?.personIdent ?? ''),
        alder: hentAlder(bruker?.fødselsdato ?? ''),
        kjønn: bruker?.kjønn ?? kjønnType.UKJENT,
        kommunenummer: bruker?.kommunenummer ?? 'ukjent',
        erEgenAnsatt: søkerData?.erEgenAnsatt || bruker?.erEgenAnsatt || false,
    };

    let søker = null;

    if (minimalFagsak?.fagsakType === FagsakType.INSTITUSJON) {
        søker = {
            navn: minimalFagsak.institusjon?.navn || 'Ukjent',
            ident: formaterIdent(minimalFagsak.institusjon?.orgNummer ?? ''),
        };
    } else if (minimalFagsak?.fagsakType === FagsakType.SKJERMET_BARN) {
        søker = {
            navn: søkerData?.navn || 'Ukjent',
            ident: formaterIdent(søkerData?.personIdent ?? ''),
            alder: hentAlder(søkerData?.fødselsdato ?? ''),
            dødsfallDato: søkerData?.dødsfallDato,
        };
    }

    return (
        <InnholdContainer>
            <HStack align="center" gap="3 4">
                <HStack gap="3 4">
                    <PersonIkon
                        fagsakType={minimalFagsak?.fagsakType}
                        kjønn={fagsakeier.kjønn}
                        erBarn={fagsakeier.alder < 18}
                        erAdresseBeskyttet={erAdresseBeskyttet(
                            søkerData?.adressebeskyttelseGradering
                        )}
                        erEgenAnsatt={fagsakeier.erEgenAnsatt}
                    />
                    <HStack align="center" gap="3 4">
                        <BodyShort as="span" weight="semibold">
                            {fagsakeier.navn} ({fagsakeier.alder} år)
                        </BodyShort>
                        <Divider />
                        <HStack align="center" gap="1">
                            {fagsakeier.ident}
                            <CopyButton copyText={fagsakeier.ident.replace(' ', '')} size="small" />
                        </HStack>
                    </HStack>
                </HStack>
                <Divider />
                <BodyShort>{`Kommunenr: ${fagsakeier.kommunenummer}`}</BodyShort>
                {søker && (
                    <>
                        <Divider />
                        <HStack align="center" gap="3 4">
                            <span>
                                <BodyShort as="span" weight="semibold">
                                    Søker:{' '}
                                </BodyShort>
                                {søker.navn}
                                {søker.alder && <> ({søker.alder} år)</>}
                            </span>
                            <Divider />
                            <HStack align="center" gap="1">
                                {søker.ident}
                                <CopyButton copyText={søker.ident.replace(' ', '')} size="small" />
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
                {minimalFagsak?.migreringsdato &&
                    sjekkOmMigreringsdatoErEldreEnn3År(minimalFagsak.migreringsdato) && (
                        <>
                            <Divider />
                            <Tag variant="info" size="small">
                                Migrert{' '}
                                {isoStringTilFormatertString({
                                    isoString: minimalFagsak?.migreringsdato,
                                    tilFormat: Datoformat.DATO,
                                })}
                            </Tag>
                        </>
                    )}
            </HStack>
        </InnholdContainer>
    );
};

const sjekkOmMigreringsdatoErEldreEnn3År = (migreringsdatoIString: string) => {
    const dato = new Date();
    const migreringsdato = new Date(migreringsdatoIString);
    const difference = dato.getTime() - migreringsdato.getTime();
    return Math.floor(Math.abs(difference) / millisekunderIEttÅr) < 3;
};
