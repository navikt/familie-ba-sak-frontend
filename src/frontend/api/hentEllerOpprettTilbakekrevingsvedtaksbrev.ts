import { apiClient } from '@api/client/apiClient';

interface PathParams {
    behandlingId: number;
}

export async function hentEllerOpprettTilbakekrevingsvedtaksbrev(httpMethod: 'GET' | 'POST', pathParams: PathParams) {
    const { behandlingId } = pathParams;
    return apiClient.request<void, string>({
        method: httpMethod,
        url: `/familie-ba-sak/api/behandling/${behandlingId}/tilbakekrevingsvedtak-motregning/pdf`,
    });
}
