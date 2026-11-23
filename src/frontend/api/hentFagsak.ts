import { apiClient } from '@api/client/apiClient';
import type { FagsakId, IMinimalFagsak } from '@typer/fagsak';

export async function hentFagsak(fagsakId: FagsakId) {
    return apiClient.get<void, IMinimalFagsak>({
        url: `/familie-ba-sak/api/fagsaker/minimal/${fagsakId}`,
    });
}
