import { useBehandlingContext } from '../sider/Fagsak/Behandling/BehandlingContext';

export function useBehandling() {
    const { behandling } = useBehandlingContext();
    return behandling;
}
