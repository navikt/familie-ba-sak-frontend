import { apiClient } from '@api/client/apiClient';
import type { FagsakId, IMinimalFagsak } from '@typer/fagsak';

export interface LåsOppFagsakPayload {
    begrunnelse: string;
}

export async function låsOppFagsak(fagsakId: FagsakId, payload: LåsOppFagsakPayload): Promise<IMinimalFagsak> {
    return apiClient.patch<LåsOppFagsakPayload, IMinimalFagsak>({
        url: `/familie-ba-sak/api/fagsaker/${fagsakId}/laas-opp`,
        data: payload,
    });
}
