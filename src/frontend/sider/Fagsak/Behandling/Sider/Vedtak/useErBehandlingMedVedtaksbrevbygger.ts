import { useBehandling } from '@hooks/useBehandling';
import { BehandlingStatus, BehandlingÅrsak } from '@typer/behandling';

export function useErBehandlingMedVedtaksbrevbygger() {
    const behandling = useBehandling();

    return behandling.årsak !== BehandlingÅrsak.DØDSFALL_BRUKER && behandling.status !== BehandlingStatus.AVSLUTTET;
}
