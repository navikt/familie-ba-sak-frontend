import { useSaksbehandler } from '../../../../hooks/useSaksbehandler';
import { BehandlerRolle, BehandlingStatus } from '../../../../typer/behandling';
import { useBehandlingContext } from '../context/BehandlingContext';

export function useSkalViseTotrinnskontroll() {
    const { behandling } = useBehandlingContext();
    const saksbehandler = useSaksbehandler();

    const erBeslutter = BehandlerRolle.BESLUTTER === saksbehandler.rolle;
    const erEgetVedtak = behandling.totrinnskontroll?.saksbehandlerId === saksbehandler.navIdent;
    const erPåFatterVedtak = behandling.status === BehandlingStatus.FATTER_VEDTAK;

    return (erBeslutter || erEgetVedtak) && erPåFatterVedtak;
}
