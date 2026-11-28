import { apiClient } from '@api/client/apiClient';

interface PathParams {
    behandlingId: number;
}

export function slettTilbakekrevingsvedtakMotregning(pathParams: PathParams) {
    const { behandlingId } = pathParams;
    return apiClient.delete<void, null>({
        url: `/familie-ba-sak/api/behandling/${behandlingId}/tilbakekrevingsvedtak-motregning`,
    });
}
