import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { BehandlingSendtTilTotrinnskontrollModal } from './BehandlingSendtTilTotrinnskontrollModal';
import { Vedtaksbrev } from './Vedtaksbrev';
import Vedtaksmeny from './Vedtaksmeny';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useVedtaksperioder } from '../../../context/behandlingContext/useVedtaksperioder';
import { useSimulering } from '../../../context/SimuleringContext';
import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../typer/behandling';
import { BehandlingStatus, BehandlingSteg, Behandlingstype } from '../../../typer/behandling';
import type { IPersonInfo } from '../../../typer/person';
import { erBehandlingMedVedtaksbrevutsending } from '../../../utils/behandling';
import { hentFrontendFeilmelding } from '../../../utils/ressursUtils';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';

interface IVedtakProps {
    åpenBehandling: IBehandling;
    bruker: IPersonInfo;
}

const StyledSkjemaSteg = styled(Skjemasteg)`
    .typo-innholdstittel {
        margin-bottom: 1.4rem;
    }
`;

export const BehandlingKorrigertAlert = styled(Alert)`
    margin-bottom: 1.5rem;
`;

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ åpenBehandling, bruker }) => {
    const { fagsakId } = useSakOgBehandlingParams();
    const { vurderErLesevisning, sendTilBeslutterNesteOnClick, behandlingsstegSubmitressurs } =
        useBehandling();

    const {
        vedtaksperioderMedBegrunnelserRessurs,
        settVisRefusjonEøs,
        settVisFeilutbetaltValuta,
        erUlagretNyFeilutbetaltValutaPeriode,
        erUlagretNyRefusjonEøsPeriode,
    } = useVedtaksperioder();

    const { behandlingErMigreringMedAvvikUtenforBeløpsgrenser } = useSimulering();

    const erLesevisning = vurderErLesevisning();

    const navigate = useNavigate();

    const [visModal, settVisModal] = React.useState<boolean>(false);

    const visSubmitKnapp = !erLesevisning && åpenBehandling?.status === BehandlingStatus.UTREDES;

    const sendTilBeslutter = () => {
        sendTilBeslutterNesteOnClick(
            (visModal: boolean) => settVisModal(visModal),
            erUlagretNyFeilutbetaltValutaPeriode,
            erUlagretNyRefusjonEøsPeriode,
            vedtaksperioderMedBegrunnelserRessurs
        );
    };

    const erMigreringFraInfotrygd = åpenBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;
    const erVedtaksbrevutsending = erBehandlingMedVedtaksbrevutsending(åpenBehandling);

    return (
        <StyledSkjemaSteg
            tittel="Vedtak"
            forrigeOnClick={() =>
                navigate(`/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/simulering`)
            }
            nesteOnClick={visSubmitKnapp ? sendTilBeslutter : undefined}
            nesteKnappTittel={
                erMigreringFraInfotrygd && !behandlingErMigreringMedAvvikUtenforBeløpsgrenser
                    ? 'Bekreft migrering'
                    : 'Til godkjenning'
            }
            senderInn={behandlingsstegSubmitressurs.status === RessursStatus.HENTER}
            maxWidthStyle="54rem"
            className={'vedtak'}
            feilmelding={hentFrontendFeilmelding(behandlingsstegSubmitressurs)}
            steg={BehandlingSteg.BESLUTTE_VEDTAK}
        >
            {åpenBehandling.status == BehandlingStatus.UTREDES && (
                <Vedtaksmeny
                    åpenBehandling={åpenBehandling}
                    erBehandlingMedVedtaksbrevutsending={erVedtaksbrevutsending}
                    visFeilutbetaltValuta={() => settVisFeilutbetaltValuta(true)}
                    visRefusjonEøs={() => settVisRefusjonEøs(true)}
                />
            )}

            <Vedtaksbrev åpenBehandling={åpenBehandling} bruker={bruker} />

            {visModal && <BehandlingSendtTilTotrinnskontrollModal settVisModal={settVisModal} />}
        </StyledSkjemaSteg>
    );
};

export default OppsummeringVedtak;
