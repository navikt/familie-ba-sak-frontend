import { apiClient } from '@api/client/apiClient';

export async function hentGenererteBrevbegrunnelser(vedtaksperiodeId: number): Promise<string[]> {
    return apiClient.get<void, string[]>({
        url: `/familie-ba-sak/api/vedtaksperioder/brevbegrunnelser/${vedtaksperiodeId}`,
    });
}
