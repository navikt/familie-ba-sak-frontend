import { useBehandlingContext } from '../sider/Fagsak/Behandling/context/BehandlingContext';

export function useBehandling() {
    const { behandling } = useBehandlingContext();
    return behandling;
}
