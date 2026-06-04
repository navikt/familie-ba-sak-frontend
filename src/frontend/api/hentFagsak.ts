import { apiClient } from '@api/client/apiClient';
import type { IMinimalFagsak } from '@typer/fagsak';

export async function hentFagsak(fagsakId: number) {
    return apiClient.get<void, IMinimalFagsak>({
        url: `/familie-ba-sak/api/fagsaker/minimal/${fagsakId}`,
    });
}
