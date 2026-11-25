import { apiClient } from '@api/client/apiClient';

export async function hentMigreringsdato(behandlingId: number): Promise<string | null> {
    return apiClient.get<void, string | null>({
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/migreringsdato`,
    });
}
