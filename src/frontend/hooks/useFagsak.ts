import { useFagsakContext } from '../sider/Fagsak/FagsakContext';

export function useFagsak() {
    const { fagsak } = useFagsakContext();
    return fagsak;
}
