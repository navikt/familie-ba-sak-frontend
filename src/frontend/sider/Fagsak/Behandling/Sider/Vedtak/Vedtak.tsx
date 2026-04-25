import React, { useState } from 'react';

import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';

import { AlleBegrunnelserProvider } from './AlleBegrunnelserContext';
import { BehandlingSendtTilTotrinnskontrollModal } from './BehandlingSendtTilTotrinnskontrollModal';
import { useFeilutbetaltValutaTabellContext } from './FeilutbetaltValuta/FeilutbetaltValutaTabellContext';
import { useSammensattKontrollsakContext } from './SammensattKontrollsak/SammensattKontrollsakContext';
import { Vedtaksalert } from './Vedtaksalert';
import { VedtaksbrevBygger } from './VedtaksbrevBygger';
import { Vedtaksmeny } from './Vedtaksmeny/Vedtaksmeny';
import { useVedtaksperioderContext } from './Vedtaksperioder/VedtaksperioderContext';
import { useFagsakId } from '../../../../../hooks/useFagsakId';
import { BehandlingÅrsak, type IBehandling } from '../../../../../typer/behandling';
import { BehandlingStatus, BehandlingSteg, Behandlingstype } from '../../../../../typer/behandling';
import { erBehandlingMedVedtaksbrevutsending } from '../../../../../utils/behandling';
import { useBehandlingContext } from '../../context/BehandlingContext';
import { useSimuleringContext } from '../Simulering/SimuleringContext';
import Skjemasteg from '../Skjemasteg';
import { useRefusjonEøsTabellContext } from './RefusjonEøs/RefusjonEøsTabellContext';
import { useSendVedtakTilBeslutter } from '../../../../../hooks/useSendVedtakTilBeslutter';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../../typer/vedtaksperiode';
import { useBrukerContext } from '../../../BrukerContext';

const StyledSkjemaSteg = styled(Skjemasteg)`
    .typo-innholdstittel {
        margin-bottom: 1.4rem;
    }
`;

export const BehandlingKorrigertAlert = styled(Alert)`
    margin-bottom: 1.5rem;
`;

function minstEnPeriodeharBegrunnelseEllerFritekst(vedtaksperioderMedBegrunnelser: IVedtaksperiodeMedBegrunnelser[]) {
    return vedtaksperioderMedBegrunnelser.some(
        vedtaksperioderMedBegrunnelse =>
            vedtaksperioderMedBegrunnelse.begrunnelser.length !== 0 ||
            vedtaksperioderMedBegrunnelse.fritekster.length !== 0
    );
}

function kanSendeInnVedtak(vedtaksperioderMedBegrunnelser: IVedtaksperiodeMedBegrunnelser[], behandling: IBehandling) {
    return (
        minstEnPeriodeharBegrunnelseEllerFritekst(vedtaksperioderMedBegrunnelser) ||
        behandling.årsak === BehandlingÅrsak.TEKNISK_ENDRING ||
        behandling.årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ||
        behandling.årsak === BehandlingÅrsak.DØDSFALL_BRUKER ||
        behandling.årsak === BehandlingÅrsak.IVERKSETTE_KA_VEDTAK ||
        behandling.årsak === BehandlingÅrsak.FALSK_IDENTITET ||
        behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD
    );
}

export function Vedtak() {
    const { bruker } = useBrukerContext();
    const { behandling, settÅpenBehandling, vurderErLesevisning } = useBehandlingContext();
    const { erLeggTilFeilutbetaltValutaFormÅpen } = useFeilutbetaltValutaTabellContext();
    const { erLeggTilRefusjonEøsFormÅpen } = useRefusjonEøsTabellContext();
    const { erSammensattKontrollsak } = useSammensattKontrollsakContext();
    const { behandlingErMigreringMedAvvikUtenforBeløpsgrenser } = useSimuleringContext();
    const { vedtaksperioder } = useVedtaksperioderContext();

    const fagsakId = useFagsakId();
    const navigate = useNavigate();

    const [visModal, settVisModal] = useState<boolean>(false);
    const [feilmelding, settFeilmelding] = useState<string | undefined>(undefined);

    const {
        mutate: sendVedtakTilBeslutter,
        isPending: sendVedtakTilBeslutterIsPending,
        error: sendVedtakTilBeslutterError,
    } = useSendVedtakTilBeslutter({
        onSuccess: behandling => {
            settÅpenBehandling(byggSuksessRessurs(behandling));
            settVisModal(true);
        },
    });

    const erLesevisning = vurderErLesevisning();
    const visSubmitKnapp = !erLesevisning && behandling.status === BehandlingStatus.UTREDES;
    const erVedtaksbrevutsending = erBehandlingMedVedtaksbrevutsending(behandling);
    const erMigreringFraInfotrygd = behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    function sendTilBeslutter() {
        if (erLeggTilFeilutbetaltValutaFormÅpen) {
            settFeilmelding(
                'Det er lagt til en ny periode med feilutbetalt valuta. Fyll ut periode og beløp, eller fjern perioden.'
            );
        } else if (erLeggTilRefusjonEøsFormÅpen) {
            settFeilmelding(
                'Det er lagt til en ny periode med refusjon EØS. Fyll ut periode og refusjonsbeløp, eller fjern perioden.'
            );
        } else if (!kanSendeInnVedtak(vedtaksperioder, behandling) && !erSammensattKontrollsak) {
            settFeilmelding('Vedtaksbrevet mangler begrunnelse. Du må legge til minst én begrunnelse.');
        } else {
            settFeilmelding(undefined);
            sendVedtakTilBeslutter({ behandlingId: behandling.behandlingId, behandlendeEnhet: '9999' });
        }
    }

    return (
        <AlleBegrunnelserProvider>
            <StyledSkjemaSteg
                tittel="Vedtak"
                forrigeOnClick={() => navigate(`/fagsak/${fagsakId}/${behandling.behandlingId}/simulering`)}
                nesteOnClick={visSubmitKnapp ? sendTilBeslutter : undefined}
                nesteKnappTittel={
                    erMigreringFraInfotrygd && !behandlingErMigreringMedAvvikUtenforBeløpsgrenser
                        ? 'Bekreft migrering'
                        : 'Til godkjenning'
                }
                senderInn={sendVedtakTilBeslutterIsPending}
                maxWidthStyle="54rem"
                className={'vedtak'}
                feilmelding={feilmelding ?? sendVedtakTilBeslutterError?.message}
                steg={BehandlingSteg.BESLUTTE_VEDTAK}
            >
                {erVedtaksbrevutsending ? (
                    <>
                        <Vedtaksmeny />
                        <VedtaksbrevBygger åpenBehandling={behandling} bruker={bruker} />
                    </>
                ) : (
                    <Vedtaksalert åpenBehandling={behandling} />
                )}

                {visModal && <BehandlingSendtTilTotrinnskontrollModal settVisModal={settVisModal} />}
            </StyledSkjemaSteg>
        </AlleBegrunnelserProvider>
    );
}
