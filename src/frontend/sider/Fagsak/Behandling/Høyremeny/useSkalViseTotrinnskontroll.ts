import { useAppContext } from '../../../../context/AppContext';
import { BehandlerRolle, BehandlingStatus } from '../../../../typer/behandling';
import { useBehandlingContext } from '../context/BehandlingContext';

export function useSkalViseTotrinnskontroll() {
    const { behandling } = useBehandlingContext();
    const { hentSaksbehandlerRolle, innloggetSaksbehandler } = useAppContext();

    const saksbehandlerrolle = hentSaksbehandlerRolle();
    const egetVedtak = behandling.totrinnskontroll?.saksbehandlerId === innloggetSaksbehandler?.navIdent;

    return (
        (BehandlerRolle.BESLUTTER === saksbehandlerrolle || egetVedtak) &&
        behandling.status === BehandlingStatus.FATTER_VEDTAK
    );
}
