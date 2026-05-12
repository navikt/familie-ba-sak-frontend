import { useBehandling } from './useBehandling';

export function useBehandlingId() {
    const behandling = useBehandling();
    return behandling.behandlingId;
}
