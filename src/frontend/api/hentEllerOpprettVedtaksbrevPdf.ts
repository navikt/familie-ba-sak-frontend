import { apiClient } from '@api/client/apiClient';

interface PathParams {
    vedtakId: number;
}

export async function hentEllerOpprettVedtaksbrevPdf(httpMethod: 'GET' | 'POST', pathParams: PathParams) {
    const { vedtakId } = pathParams;
    return apiClient.request<void, string>({
        method: httpMethod,
        url: `/familie-ba-sak/api/dokument/vedtaksbrev/${vedtakId}`,
    });
}
