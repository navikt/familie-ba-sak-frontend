import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { BehandlingStatus } from '@typer/behandling';

export function useVisTilGodkjenning() {
    const erLesevisning = useErLesevisning();
    const behandling = useBehandling();

    return !erLesevisning && behandling.status === BehandlingStatus.UTREDES;
}
