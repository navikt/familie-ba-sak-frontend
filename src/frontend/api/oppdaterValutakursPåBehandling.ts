import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

interface PathParams {
    behandlingId: number;
}

export async function oppdaterValutakursPåBehandling(pathParams: PathParams) {
    const { behandlingId } = pathParams;
    return apiClient.put<void, IBehandling>({
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/oppdatert-valutakurs`,
    });
}
