import { apiClient } from '@api/client/apiClient';

export async function hentHarÅpenTilbakekreving(fagsakId: number): Promise<boolean> {
    return apiClient.get<void, boolean>({
        url: `/familie-ba-sak/api/fagsaker/${fagsakId}/har-apen-tilbakekreving`,
    });
}
