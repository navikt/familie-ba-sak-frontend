import React from 'react';

import { PersonCircleFillIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, CopyButton, HStack, Tag } from '@navikt/ds-react';
import {
    GuttIkon,
    JenteIkon,
    KvinneIkon,
    MannIkon,
    NøytralPersonIkon,
} from '@navikt/familie-ikoner';
import { kjønnType } from '@navikt/familie-typer';

import { useHentPerson } from '../../../hooks/useHentPerson';
import KontorIkonGrønn from '../../../ikoner/KontorIkonGrønn';
import DødsfallTag from '../../../komponenter/DødsfallTag';
import type { IBehandling } from '../../../typer/behandling';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import { FagsakType } from '../../../typer/fagsak';
import type { IPersonInfo } from '../../../typer/person';
import { Datoformat, isoStringTilFormatertString } from '../../../utils/dato';
import { formaterIdent, hentAlder, millisekunderIEttÅr } from '../../../utils/formatter';

interface IProps {
    søker?: IPersonInfo;
    minimalFagsak?: IMinimalFagsak;
    behandling?: IBehandling;
}

interface IkonForFagsakTypeProps {
    fagsakType?: FagsakType;
    kjønn: string;
    alder: number;
}

const PersonlinjeIkon: React.FC<IkonForFagsakTypeProps> = ({ fagsakType, kjønn, alder }) => {
    // TODO: Bedre håndtering av ikoner. Nå er det tre forskjellige implementasjon og prop-typer. Kan alle være Aksel?
    if (fagsakType === FagsakType.INSTITUSJON) {
        return <KontorIkonGrønn height={'24'} width={'24'} />;
    }
    if (fagsakType === FagsakType.SKJERMET_BARN) {
        return <PersonCircleFillIcon color="var(--a-orange-600)" height={28} width={28} />;
    }

    const ikonProps = { height: 24, width: 24 };

    if (kjønn === kjønnType.KVINNE) {
        return alder < 18 ? <JenteIkon {...ikonProps} /> : <KvinneIkon {...ikonProps} />;
    }
    if (kjønn === kjønnType.MANN) {
        return alder < 18 ? <GuttIkon {...ikonProps} /> : <MannIkon {...ikonProps} />;
    }
    return <NøytralPersonIkon {...ikonProps} />;
};

const Personlinje: React.FC<IProps> = ({ søker, minimalFagsak }) => {
    // TODO: Bedre bruk av hook. Error state, loading, etc.
    const fagsakEier = useHentPerson(minimalFagsak?.fagsakeier);

    // TODO: Rydd opp dette. Gjør dette inline, eller flytt til hjelpefunksjon/komponent.
    const søkerNavn = søker?.navn ?? 'Ukjent';
    const søkerIdent = formaterIdent(søker?.personIdent ?? '');
    const søkerAlder = hentAlder(søker?.fødselsdato ?? '');

    const fagsakEierNavn = fagsakEier.data?.navn ?? 'Ukjent';
    const fagsakEierIdent = formaterIdent(fagsakEier.data?.personIdent ?? '');
    const fagsakEierAlder = hentAlder(fagsakEier.data?.fødselsdato ?? '');
    const fagsakEierKjønn = fagsakEier.data?.kjønn ?? kjønnType.UKJENT;

    return (
        <Box
            borderWidth={'0 0 1 0'}
            borderColor="border-subtle"
            paddingInline={'4'}
            paddingBlock={'2'}
        >
            <HStack align="center" gap="4">
                <HStack align="center" gap="4">
                    <PersonlinjeIkon
                        fagsakType={minimalFagsak?.fagsakType}
                        kjønn={fagsakEierKjønn}
                        alder={fagsakEierAlder}
                    />
                    <BodyShort as={'span'} weight={'semibold'}>
                        {fagsakEierNavn} ({fagsakEierAlder} år)
                    </BodyShort>
                    <div>|</div>
                    <HStack align="center" gap="1">
                        {fagsakEierIdent}
                        <CopyButton copyText={fagsakEierIdent.replace(' ', '')} size={'small'} />
                    </HStack>
                </HStack>
                <div>|</div>
                <BodyShort>{`Kommunenr: ${søker?.kommunenummer ?? 'ukjent'}`}</BodyShort>
                <div>|</div>
                {/* TODO: Skal kun vises hvis det er institusjon/skjermet barn*/}
                <HStack align="center" gap="4">
                    <span>
                        <BodyShort as={'span'} weight={'semibold'}>
                            Søker:{' '}
                        </BodyShort>
                        {søkerNavn} ({søkerAlder} år)
                    </span>
                    <div>|</div>
                    <HStack align="center" gap="1">
                        {søkerIdent}
                        <CopyButton copyText={søkerIdent.replace(' ', '')} size={'small'} />
                    </HStack>
                </HStack>
                {søker?.dødsfallDato?.length && (
                    <>
                        <div>|</div>
                        <DødsfallTag dødsfallDato={søker.dødsfallDato} />
                    </>
                )}
                {minimalFagsak?.migreringsdato &&
                    sjekkOmMigreringsdatoErEldreEnn3År(minimalFagsak.migreringsdato) && (
                        <>
                            <div>|</div>
                            <Tag
                                size="small"
                                children={`Migrert ${isoStringTilFormatertString({
                                    isoString: minimalFagsak?.migreringsdato,
                                    tilFormat: Datoformat.DATO,
                                })}`}
                                variant={'info'}
                            />
                        </>
                    )}
            </HStack>
        </Box>
    );
};

const sjekkOmMigreringsdatoErEldreEnn3År = (migreringsdatoIString: string) => {
    const dato = new Date();
    const migreringsdato = new Date(migreringsdatoIString);
    const difference = dato.getTime() - migreringsdato.getTime();
    return Math.floor(Math.abs(difference) / millisekunderIEttÅr) < 3;
};

export default Personlinje;
