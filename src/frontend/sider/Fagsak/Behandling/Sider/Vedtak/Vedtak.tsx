import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsakId } from '@hooks/useFagsakId';
import { HentVedtaksperioderQueryKeyFactory } from '@hooks/useHentVedtaksperioder';
import { useOpprettSammensattKontrollsakError } from '@hooks/useOpprettSammensattKontrollsakError';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { useSendVedtakTilBeslutter } from '@hooks/useSendVedtakTilBeslutter';
import { useSlettSammensattKontrollsakError } from '@hooks/useSlettSammensattKontrollsakError';
import { Button, ErrorMessage, HStack, LocalAlert, VStack } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { Steg } from '@sider/Fagsak/Behandling/Sider/Steg';
import { useQueryClient } from '@tanstack/react-query';
import { BehandlingStatus, Behandlingstype, BehandlingÅrsak, type IBehandling } from '@typer/behandling';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';
import { erBehandlingMedVedtaksbrevutsending } from '@utils/behandling';
import { erDefinert } from '@utils/commons';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useBehandlingContext } from '../../context/BehandlingContext';
import { useSimuleringContext } from '../Simulering/SimuleringContext';
import { useFeilutbetaltValutaTabellContext } from './FeilutbetaltValuta/FeilutbetaltValutaTabellContext';
import { useRefusjonEøsTabellContext } from './RefusjonEøs/RefusjonEøsTabellContext';
import { useSammensattKontrollsakContext } from './SammensattKontrollsak/SammensattKontrollsakContext';
import { SendtTilTotrinnskontrollModal } from './SendtTilTotrinnskontrollModal';
import { Vedtaksalert } from './Vedtaksalert';
import { VedtaksbrevBygger } from './VedtaksbrevBygger';
import { Vedtaksmeny } from './Vedtaksmeny/Vedtaksmeny';
import { useVedtaksperioderContext } from './Vedtaksperioder/VedtaksperioderContext';

function kanSendeInnVedtak(vedtaksperioderMedBegrunnelser: IVedtaksperiodeMedBegrunnelser[], behandling: IBehandling) {
    const minstEnPeriodeharBegrunnelseEllerFritekst = vedtaksperioderMedBegrunnelser.some(
        vedtaksperioderMedBegrunnelse =>
            vedtaksperioderMedBegrunnelse.begrunnelser.length !== 0 ||
            vedtaksperioderMedBegrunnelse.fritekster.length !== 0
    );

    return (
        minstEnPeriodeharBegrunnelseEllerFritekst ||
        behandling.årsak === BehandlingÅrsak.TEKNISK_ENDRING ||
        behandling.årsak === BehandlingÅrsak.DØDSFALL_BRUKER ||
        behandling.årsak === BehandlingÅrsak.IVERKSETTE_KA_VEDTAK ||
        behandling.årsak === BehandlingÅrsak.FALSK_IDENTITET ||
        behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD
    );
}

export function Vedtak() {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { erLeggTilFeilutbetaltValutaFormÅpen } = useFeilutbetaltValutaTabellContext();
    const { erLeggTilRefusjonEøsFormÅpen } = useRefusjonEøsTabellContext();
    const { sammensattKontrollsak } = useSammensattKontrollsakContext();
    const { behandlingErMigreringMedAvvikUtenforBeløpsgrenser } = useSimuleringContext();
    const { vedtaksperioder } = useVedtaksperioderContext();

    const saksbehandler = useSaksbehandler();
    const fagsakId = useFagsakId();
    const erLesevisning = useErLesevisning();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [visSendtTilTotrinnskontrollModal, settVisSendtTilTotrinnskontrollModal] = useState<boolean>(false);
    const [tilGodkjenningFeilmelding, settTilGodkjenningFeilmelding] = useState<string | undefined>(undefined);

    const slettSammensattKontrollsakError = useSlettSammensattKontrollsakError(behandling.behandlingId);
    const opprettSammensattKontrollsakError = useOpprettSammensattKontrollsakError(behandling.behandlingId);

    const {
        mutate: sendVedtakTilBeslutter,
        isPending: sendVedtakTilBeslutterIsPending,
        error: sendVedtakTilBeslutterError,
    } = useSendVedtakTilBeslutter({
        onSuccess: async behandling => {
            await queryClient.invalidateQueries({
                queryKey: HentVedtaksperioderQueryKeyFactory.behandling(behandling.behandlingId),
            });
            settÅpenBehandling(byggSuksessRessurs(behandling));
            settVisSendtTilTotrinnskontrollModal(true);
        },
    });

    const visTilGodkjenningKnapp = !erLesevisning && behandling.status === BehandlingStatus.UTREDES;
    const erVedtaksbrevutsending = erBehandlingMedVedtaksbrevutsending(behandling);
    const erMigreringFraInfotrygd = behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;
    const feilmelding = tilGodkjenningFeilmelding || sendVedtakTilBeslutterError?.message;

    function onTilGodkjenningClicked() {
        if (erDefinert(sammensattKontrollsak) && sammensattKontrollsak.fritekst.trim() === '') {
            settTilGodkjenningFeilmelding('Sammensatt kontrollsak mangler en begrunnelse.');
        } else if (erLeggTilFeilutbetaltValutaFormÅpen) {
            settTilGodkjenningFeilmelding(
                'Det er lagt til en ny periode med feilutbetalt valuta. Fyll ut periode og beløp, eller fjern perioden.'
            );
        } else if (erLeggTilRefusjonEøsFormÅpen) {
            settTilGodkjenningFeilmelding(
                'Det er lagt til en ny periode med refusjon EØS. Fyll ut periode og refusjonsbeløp, eller fjern perioden.'
            );
        } else if (!kanSendeInnVedtak(vedtaksperioder, behandling) && !erDefinert(sammensattKontrollsak)) {
            settTilGodkjenningFeilmelding('Vedtaksbrevet mangler begrunnelse. Du må legge til minst én begrunnelse.');
        } else {
            settTilGodkjenningFeilmelding(undefined);
            sendVedtakTilBeslutter({ behandlingId: behandling.behandlingId, behandlendeEnhet: saksbehandler.enhet });
        }
    }

    function onForrigeStegClicked() {
        navigate(`/fagsak/${fagsakId}/${behandling.behandlingId}/simulering`);
    }

    return (
        <Steg tittel={'Vedtak'} maxWidth={'60rem'}>
            {visSendtTilTotrinnskontrollModal && (
                <SendtTilTotrinnskontrollModal lukkModal={() => settVisSendtTilTotrinnskontrollModal(false)} />
            )}
            <VStack gap={'space-40'}>
                {erVedtaksbrevutsending ? (
                    <VStack gap={'space-12'}>
                        {slettSammensattKontrollsakError && (
                            <LocalAlert status={'error'}>
                                <LocalAlert.Header>
                                    <LocalAlert.Title>{slettSammensattKontrollsakError.message}</LocalAlert.Title>
                                </LocalAlert.Header>
                            </LocalAlert>
                        )}
                        {opprettSammensattKontrollsakError && (
                            <LocalAlert status={'error'}>
                                <LocalAlert.Header>
                                    <LocalAlert.Title>{opprettSammensattKontrollsakError.message}</LocalAlert.Title>
                                </LocalAlert.Header>
                            </LocalAlert>
                        )}
                        <Vedtaksmeny />
                        <VedtaksbrevBygger />
                    </VStack>
                ) : (
                    <Vedtaksalert åpenBehandling={behandling} />
                )}
                {feilmelding && <ErrorMessage>{feilmelding}</ErrorMessage>}
                <HStack gap={'space-20'}>
                    <Button variant={'tertiary'} onClick={onForrigeStegClicked}>
                        Forrige steg
                    </Button>
                    {visTilGodkjenningKnapp && (
                        <Button
                            variant={'primary'}
                            onClick={onTilGodkjenningClicked}
                            loading={sendVedtakTilBeslutterIsPending}
                        >
                            {erMigreringFraInfotrygd && !behandlingErMigreringMedAvvikUtenforBeløpsgrenser
                                ? 'Bekreft migrering'
                                : 'Til godkjenning'}
                        </Button>
                    )}
                </HStack>
            </VStack>
        </Steg>
    );
}
