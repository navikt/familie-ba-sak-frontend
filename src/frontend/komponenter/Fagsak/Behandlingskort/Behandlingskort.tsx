import * as React from 'react';

import styled from 'styled-components';

import { BodyShort, Heading } from '@navikt/ds-react';
import {
    ABorderAction,
    ABorderDanger,
    ABorderDefault,
    ABorderSubtle,
    ABorderSuccess,
    AIconInfo,
    AIconSuccess,
    ATextDanger,
    ATextDefault,
} from '@navikt/ds-tokens/dist/tokens';
import { hentDataFraRessurs } from '@navikt/familie-typer';

import { useFagsakContext } from '../../../context/fagsak/FagsakContext';
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
        return ABorderSubtle;
    }

    switch (behandlingResultat) {
        case BehandlingResultat.INNVILGET:
        case BehandlingResultat.DELVIS_INNVILGET:
        case BehandlingResultat.FORTSATT_INNVILGET:
            return ABorderSuccess;
        case (BehandlingResultat.ENDRET_UTBETALING, BehandlingResultat.ENDRET_UTEN_UTBETALING):
            return ABorderAction;
        case BehandlingResultat.AVSLÅTT:
        case (BehandlingResultat.OPPHØRT, BehandlingResultat.FORTSATT_OPPHØRT):
            return ABorderDanger;
        case BehandlingResultat.IKKE_VURDERT:
            return ABorderSubtle;
        default:
            return ABorderDefault;
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

const Container = styled.div<{ behandlingResultat: BehandlingResultat }>`
    border: 1px solid ${ABorderSubtle};
    border-left: 0.5rem solid ${ABorderSubtle};
    border-radius: 0.25rem;
    padding: 0.5rem;
    margin: 0.5rem;
    border-color: ${({ behandlingResultat }) => hentResultatfarge(behandlingResultat)};
`;

const StyledHeading = styled(Heading)`
    font-size: 1rem;
    margin-bottom: 0.2rem;
`;

const StyledHr = styled.hr`
    border: none;
    border-bottom: 1px solid ${ABorderSubtle};
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
        <Container behandlingResultat={åpenBehandling.resultat}>
            <StyledHeading size={'small'} level={'2'}>
                {tittel}
            </StyledHeading>
            <BodyShort>{behandlingÅrsak[åpenBehandling.årsak]}</BodyShort>
            <StyledHr />
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
        </Container>
    );
};

export default Behandlingskort;
