import { apiClient } from '@api/client/apiClient';
import type { IManueltBrevRequestPåFagsak } from '@typer/dokument';
import type { FagsakId } from '@typer/fagsak';

export async function sendInformasjonsbrev(fagsakId: FagsakId, payload: IManueltBrevRequestPåFagsak): Promise<void> {
    return apiClient.post<IManueltBrevRequestPåFagsak, void>({
        url: `/familie-ba-sak/api/dokument/fagsak/${fagsakId}/send-brev`,
        data: payload,
    });
}
