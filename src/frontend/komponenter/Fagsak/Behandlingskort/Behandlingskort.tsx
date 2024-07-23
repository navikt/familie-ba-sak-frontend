import * as React from 'react';

import styled from 'styled-components';

import { BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
import {
    AIconInfo,
    AIconSuccess,
    ASpacing4,
    ATextDanger,
    ATextDefault,
} from '@navikt/ds-tokens/dist/tokens';
import { hentDataFraRessurs } from '@navikt/familie-typer';

import { useFagsakContext } from '../../../context/Fagsak/FagsakContext';
import type { IBehandling } from '../../../typer/behandling';
import {
    BehandlingResultat,
    behandlingsresultater,
    behandlingsstatuser,
    behandlingstyper,
    behandlingÅrsak,
    erBehandlingHenlagt,
} from '../../../typer/behandling';
import { Datoformat, isoStringTilFormatertString } from '../../../utils/dato';
import Informasjonsbolk from '../../Felleskomponenter/Informasjonsbolk/Informasjonsbolk';
import { sakstype } from '../Saksoversikt/Saksoversikt';

interface IBehandlingskortProps {
    åpenBehandling: IBehandling;
}

const hentResultatfarge = (behandlingResultat: BehandlingResultat) => {
    if (erBehandlingHenlagt(behandlingResultat)) {
        return 'border-subtle';
    }

    switch (behandlingResultat) {
        case BehandlingResultat.INNVILGET:
        case BehandlingResultat.DELVIS_INNVILGET:
        case BehandlingResultat.FORTSATT_INNVILGET:
            return 'border-success';
        case (BehandlingResultat.ENDRET_UTBETALING, BehandlingResultat.ENDRET_UTEN_UTBETALING):
            return 'border-action';
        case BehandlingResultat.AVSLÅTT:
        case (BehandlingResultat.OPPHØRT, BehandlingResultat.FORTSATT_OPPHØRT):
            return 'border-danger';
        case BehandlingResultat.IKKE_VURDERT:
            return 'border-subtle';
        default:
            return 'border-default';
    }
};

const hentResultatfargeTekst = (behandlingResultat: BehandlingResultat) => {
    if (erBehandlingHenlagt(behandlingResultat)) {
        return ATextDefault;
    }

    switch (behandlingResultat) {
        case BehandlingResultat.INNVILGET:
        case BehandlingResultat.DELVIS_INNVILGET:
        case BehandlingResultat.FORTSATT_INNVILGET:
            return AIconSuccess;
        case (BehandlingResultat.ENDRET_UTBETALING, BehandlingResultat.ENDRET_UTEN_UTBETALING):
            return AIconInfo;
        case BehandlingResultat.AVSLÅTT:
        case (BehandlingResultat.OPPHØRT, BehandlingResultat.FORTSATT_OPPHØRT):
            return ATextDanger;
        default:
            return ATextDefault;
    }
};

const StyledHeading = styled(Heading)`
    font-size: ${ASpacing4};
`;

const Behandlingskort: React.FC<IBehandlingskortProps> = ({ åpenBehandling }) => {
    const minimalFagsak = hentDataFraRessurs(useFagsakContext().minimalFagsak);
    const behandlinger = minimalFagsak?.behandlinger ?? [];

    const antallBehandlinger = behandlinger.length;
    const åpenBehandlingIndex =
        behandlinger.findIndex(
            behandling => behandling.behandlingId === åpenBehandling.behandlingId
        ) + 1;

    const tittel = `${
        åpenBehandling ? behandlingstyper[åpenBehandling.type].navn : 'ukjent'
    } (${åpenBehandlingIndex}/${antallBehandlinger}) - ${sakstype(åpenBehandling).toLowerCase()}`;

    return (
        <Box
            padding="2"
            borderColor={hentResultatfarge(åpenBehandling.resultat)}
            borderWidth="1 1 1 5"
            borderRadius="medium"
            margin="2"
        >
            <Box borderWidth="0 0 1 0" borderColor="border-subtle">
                <VStack gap="1" marginBlock="0 2">
                    <StyledHeading size={'xsmall'} level={'2'}>
                        {tittel}
                    </StyledHeading>
                    <BodyShort>{behandlingÅrsak[åpenBehandling.årsak]}</BodyShort>
                </VStack>
            </Box>
            <Informasjonsbolk
                informasjon={[
                    {
                        label: 'Behandlingsstatus',
                        tekst: behandlingsstatuser[åpenBehandling.status],
                    },
                ]}
            />
            <Informasjonsbolk
                infoTeksFarve={hentResultatfargeTekst(åpenBehandling.resultat)}
                informasjon={[
                    {
                        label: 'Resultat',
                        tekst: behandlingsresultater[åpenBehandling.resultat],
                    },
                ]}
            />
            <Informasjonsbolk
                informasjon={[
                    {
                        label: 'Opprettet',
                        tekst: isoStringTilFormatertString({
                            isoString: åpenBehandling.opprettetTidspunkt,
                            tilFormat: Datoformat.DATO,
                        }),
                    },
                    {
                        label: 'Vedtaksdato',
                        tekst: isoStringTilFormatertString({
                            isoString: åpenBehandling.vedtak?.vedtaksdato,
                            tilFormat: Datoformat.DATO,
                            defaultString: 'Ikke satt',
                        }),
                    },
                ]}
            />

            <Informasjonsbolk
                informasjon={[
                    {
                        label: 'Enhet',
                        tekst: åpenBehandling.arbeidsfordelingPåBehandling.behandlendeEnhetId,
                        tekstTitle:
                            åpenBehandling.arbeidsfordelingPåBehandling.behandlendeEnhetNavn,
                    },
                ]}
            />
        </Box>
    );
};

export default Behandlingskort;
