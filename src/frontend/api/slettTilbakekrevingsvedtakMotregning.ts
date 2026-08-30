import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

interface PathParams {
    behandlingId: number;
}

export function slettTilbakekrevingsvedtakMotregning(pathParams: PathParams) {
    const { behandlingId } = pathParams;
    return apiClient.delete<void, IBehandling>({
        url: `/familie-ba-sak/api/behandling/${behandlingId}/tilbakekrevingsvedtak-motregning`,
    });
}
