import * as React from 'react';

import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { AlleBegrunnelserProvider } from './AlleBegrunnelserContext';
import { BehandlingSendtTilTotrinnskontrollModal } from './BehandlingSendtTilTotrinnskontrollModal';
import { useFeilutbetaltValutaTabellContext } from './FeilutbetaltValuta/FeilutbetaltValutaTabellContext';
import { useSammensattKontrollsakContext } from './SammensattKontrollsak/SammensattKontrollsakContext';
import { Vedtaksalert } from './Vedtaksalert';
import { VedtaksbrevBygger } from './VedtaksbrevBygger';
import { Vedtaksmeny } from './Vedtaksmeny/Vedtaksmeny';
import useSakOgBehandlingParams from '../../../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../../../typer/behandling';
import { BehandlingStatus, BehandlingSteg, Behandlingstype } from '../../../../../typer/behandling';
import type { IPersonInfo } from '../../../../../typer/person';
import { erBehandlingMedVedtaksbrevutsending } from '../../../../../utils/behandling';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import { useBehandlingContext } from '../../context/BehandlingContext';
import { useSimuleringContext } from '../Simulering/SimuleringContext';
import Skjemasteg from '../Skjemasteg';
import { useRefusjonEøsTabellContext } from './RefusjonEøs/RefusjonEøsTabellContext';
import { useHentVedtaksperioder } from '../../../../../hooks/useHentVedtaksperioder';

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

const Vedtak: React.FunctionComponent<IVedtakProps> = ({ åpenBehandling, bruker }) => {
    const { fagsakId } = useSakOgBehandlingParams();
    const { vurderErLesevisning, sendTilBeslutterNesteOnClick, behandlingsstegSubmitressurs } = useBehandlingContext();

    const { erLeggTilFeilutbetaltValutaFormÅpen } = useFeilutbetaltValutaTabellContext();
    const { erLeggTilRefusjonEøsFormÅpen } = useRefusjonEøsTabellContext();
    const { erSammensattKontrollsak } = useSammensattKontrollsakContext();
    const { behandlingErMigreringMedAvvikUtenforBeløpsgrenser } = useSimuleringContext();

    const { behandling } = useBehandlingContext();
    const behandlingId = behandling.behandlingId;
    const { data: vedtaksperioderMedBegrunnelser } = useHentVedtaksperioder(behandlingId);

    const erLesevisning = vurderErLesevisning();

    const navigate = useNavigate();

    const [visModal, settVisModal] = React.useState<boolean>(false);

    const visSubmitKnapp = !erLesevisning && åpenBehandling?.status === BehandlingStatus.UTREDES;

    const sendTilBeslutter = () => {
        sendTilBeslutterNesteOnClick(
            (visModal: boolean) => settVisModal(visModal),
            erLeggTilFeilutbetaltValutaFormÅpen,
            erLeggTilRefusjonEøsFormÅpen,
            vedtaksperioderMedBegrunnelser,
            erSammensattKontrollsak
        );
    };

    const erVedtaksbrevutsending = erBehandlingMedVedtaksbrevutsending(åpenBehandling);

    const erMigreringFraInfotrygd = åpenBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    return (
        <AlleBegrunnelserProvider>
            <StyledSkjemaSteg
                tittel="Vedtak"
                forrigeOnClick={() => navigate(`/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/simulering`)}
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
                {erVedtaksbrevutsending ? (
                    <>
                        <Vedtaksmeny />
                        <VedtaksbrevBygger åpenBehandling={åpenBehandling} bruker={bruker} />
                    </>
                ) : (
                    <Vedtaksalert åpenBehandling={åpenBehandling} />
                )}

                {visModal && <BehandlingSendtTilTotrinnskontrollModal settVisModal={settVisModal} />}
            </StyledSkjemaSteg>
        </AlleBegrunnelserProvider>
    );
};

export default Vedtak;
