import { apiClient } from '@api/client/apiClient';

export async function opprettTilbakekreving(fagsakId: number) {
    return apiClient.get<void, string>({
        url: `/familie-ba-sak/api/fagsaker/${fagsakId}/opprett-tilbakekreving`,
    });
}
