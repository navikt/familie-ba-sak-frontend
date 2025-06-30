import React from 'react';

import { PersonCircleFillIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Box, CopyButton, HStack, Tag } from '@navikt/ds-react';
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

interface PersonlinjeProps {
    søker?: IPersonInfo;
    minimalFagsak?: IMinimalFagsak;
    behandling?: IBehandling;
}

interface PersonlinjeIkonProps {
    fagsakType?: FagsakType;
    kjønn: string;
    alder: number;
}

const PersonlinjeIkon: React.FC<PersonlinjeIkonProps> = ({ fagsakType, kjønn, alder }) => {
    if (fagsakType === FagsakType.INSTITUSJON) {
        return <KontorIkonGrønn height="24" width="24" />;
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

const InnholdWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Box borderWidth="0 0 1 0" borderColor="border-subtle" paddingInline="4" paddingBlock="2">
            {children}
        </Box>
    );
};

const Divider: React.FC = () => {
    return <div>|</div>;
};

const Personlinje: React.FC<PersonlinjeProps> = ({ søker, minimalFagsak }) => {
    const { data: fagsakEier, isPending, error } = useHentPerson(minimalFagsak?.fagsakeier);

    if (isPending) {
        return (
            <InnholdWrapper>
                <BodyShort>Henter persondata...</BodyShort>
            </InnholdWrapper>
        );
    }

    if (error) {
        return (
            <Alert variant="error" fullWidth>
                Kunne ikke hente persondata
            </Alert>
        );
    }

    const fagsakEierInfo = {
        navn: fagsakEier.navn,
        ident: formaterIdent(fagsakEier.personIdent),
        alder: hentAlder(fagsakEier.fødselsdato),
        kjønn: fagsakEier.kjønn,
    };

    const visSøkerInfo =
        minimalFagsak?.fagsakType === FagsakType.INSTITUSJON ||
        minimalFagsak?.fagsakType === FagsakType.SKJERMET_BARN;

    const søkerInfo = {
        navn: søker?.navn ?? 'Ukjent',
        ident: formaterIdent(søker?.personIdent ?? ''),
        alder: hentAlder(søker?.fødselsdato ?? ''),
    };

    return (
        <InnholdWrapper>
            <HStack align="center" gap="3 4">
                <HStack align="center" gap="3 4">
                    <PersonlinjeIkon
                        fagsakType={minimalFagsak?.fagsakType}
                        kjønn={fagsakEierInfo.kjønn}
                        alder={fagsakEierInfo.alder}
                    />
                    <BodyShort as="span" weight="semibold">
                        {fagsakEierInfo.navn} ({fagsakEierInfo.alder} år)
                    </BodyShort>
                    <Divider />
                    <HStack align="center" gap="1">
                        {fagsakEierInfo.ident}
                        <CopyButton copyText={fagsakEierInfo.ident.replace(' ', '')} size="small" />
                    </HStack>
                </HStack>
                <Divider />
                <BodyShort>{`Kommunenr: ${søker?.kommunenummer ?? 'ukjent'}`}</BodyShort>
                {visSøkerInfo && (
                    <>
                        <Divider />
                        <HStack align="center" gap="3 4">
                            <span>
                                <BodyShort as="span" weight="semibold">
                                    Søker:{' '}
                                </BodyShort>
                                {søkerInfo.navn} ({søkerInfo.alder} år)
                            </span>
                            <Divider />
                            <HStack align="center" gap="1">
                                {søkerInfo.ident}
                                <CopyButton
                                    copyText={søkerInfo.ident.replace(' ', '')}
                                    size="small"
                                />
                            </HStack>
                        </HStack>
                    </>
                )}
                {søker?.dødsfallDato?.length && (
                    <>
                        <Divider />
                        <DødsfallTag dødsfallDato={søker.dødsfallDato} />
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
        </InnholdWrapper>
    );
};

const sjekkOmMigreringsdatoErEldreEnn3År = (migreringsdatoIString: string) => {
    const dato = new Date();
    const migreringsdato = new Date(migreringsdatoIString);
    const difference = dato.getTime() - migreringsdato.getTime();
    return Math.floor(Math.abs(difference) / millisekunderIEttÅr) < 3;
};

export default Personlinje;
