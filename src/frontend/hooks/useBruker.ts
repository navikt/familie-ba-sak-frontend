import { useBrukerContext } from '../sider/Fagsak/BrukerContext';

export function useBruker() {
    const { bruker } = useBrukerContext();
    return bruker;
}
