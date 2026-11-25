import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

interface PathParams {
    behandlingId: number;
}

export async function hentBehandling(pathParams: PathParams) {
    const { behandlingId } = pathParams;
    return apiClient.get<void, IBehandling>({
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}`,
    });
}
