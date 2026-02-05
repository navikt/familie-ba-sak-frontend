import { useAppContext } from '../../../../context/AppContext';
import { BehandlerRolle, BehandlingStatus } from '../../../../typer/behandling';
import { useBehandlingContext } from '../context/BehandlingContext';

export function useSkalViseTotrinnskontroll() {
    const { behandling } = useBehandlingContext();
    const { hentSaksbehandlerRolle } = useAppContext();

    const saksbehandlerrolle = hentSaksbehandlerRolle();

    return BehandlerRolle.BESLUTTER === saksbehandlerrolle && behandling.status === BehandlingStatus.FATTER_VEDTAK;
}
