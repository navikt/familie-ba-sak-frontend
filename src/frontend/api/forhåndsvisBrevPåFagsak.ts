import { apiClient } from '@api/client/apiClient';
import type { IManueltBrevRequestPåFagsak } from '@typer/dokument';
import type { FagsakId } from '@typer/fagsak';

export async function forhåndsvisBrevPåFagsak(
    fagsakId: FagsakId,
    payload: IManueltBrevRequestPåFagsak
): Promise<string> {
    return apiClient.post<IManueltBrevRequestPåFagsak, string>({
        url: `/familie-ba-sak/api/dokument/fagsak/${fagsakId}/forhaandsvis-brev`,
        data: payload,
    });
}
