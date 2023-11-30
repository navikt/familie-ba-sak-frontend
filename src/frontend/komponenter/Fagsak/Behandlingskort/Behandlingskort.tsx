import * as React from 'react';

import styled from 'styled-components';

import { BodyShort, Heading } from '@navikt/ds-react';
import {
    ABlue700,
    AGray100,
    AGray300,
    AGray400,
    AGray600,
    AGray900,
    AGreen600,
    ARed600,
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
        return AGray300;
    }

    switch (behandlingResultat) {
        case BehandlingResultat.INNVILGET:
        case BehandlingResultat.DELVIS_INNVILGET:
        case BehandlingResultat.FORTSATT_INNVILGET:
            return AGreen600;
        case (BehandlingResultat.ENDRET_UTBETALING, BehandlingResultat.ENDRET_UTEN_UTBETALING):
            return ABlue700;
        case BehandlingResultat.AVSLÅTT:
        case (BehandlingResultat.OPPHØRT, BehandlingResultat.FORTSATT_OPPHØRT):
            return ARed600;
        case BehandlingResultat.IKKE_VURDERT:
            return AGray100;
        default:
            return AGray600;
    }
};

const hentResultatfargeTekst = (behandlingResultat: BehandlingResultat) => {
    if (erBehandlingHenlagt(behandlingResultat)) {
        return AGray900;
    }

    switch (behandlingResultat) {
        case BehandlingResultat.INNVILGET:
        case BehandlingResultat.DELVIS_INNVILGET:
        case BehandlingResultat.FORTSATT_INNVILGET:
            return AGreen600;
        case (BehandlingResultat.ENDRET_UTBETALING, BehandlingResultat.ENDRET_UTEN_UTBETALING):
            return ABlue700;
        case BehandlingResultat.AVSLÅTT:
        case (BehandlingResultat.OPPHØRT, BehandlingResultat.FORTSATT_OPPHØRT):
            return ARed600;
        default:
            return AGray900;
    }
};

const Container = styled.div<{ behandlingResultat: BehandlingResultat }>`
    border: 1px solid ${AGray400};
    border-left: 0.5rem solid ${AGray400};
    border-radius: 0.25rem;
    padding: 0.5rem;
    margin: 0.5rem;
    border-left-color: ${({ behandlingResultat }) => hentResultatfarge(behandlingResultat)};
`;

const StyledHeading = styled(Heading)`
    font-size: 1rem;
    margin-bottom: 0.2rem;
`;

const StyledHr = styled.hr`
    border: none;
    border-bottom: 1px solid ${AGray100};
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
