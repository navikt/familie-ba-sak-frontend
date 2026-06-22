import { apiClient } from '@api/client/apiClient';
import type { IManueltBrevRequestPåFagsak } from '@typer/dokument';

export async function sendInformasjonsbrev(fagsakId: number, payload: IManueltBrevRequestPåFagsak): Promise<void> {
    return apiClient.post<IManueltBrevRequestPåFagsak, void>({
        url: `/familie-ba-sak/api/dokument/fagsak/${fagsakId}/send-brev`,
        data: payload,
    });
}
