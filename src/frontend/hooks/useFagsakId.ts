import { useFagsak } from './useFagsak';

export function useFagsakId() {
    const fagsak = useFagsak();
    return fagsak.id;
}
