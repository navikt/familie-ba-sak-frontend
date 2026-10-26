import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

interface PathParams {
    behandlingId: number;
    brevmottakerId: number;
}

export async function slettBrevmottaker(pathParams: PathParams) {
    const { behandlingId, brevmottakerId } = pathParams;
    return apiClient.delete<void, IBehandling>({
        url: `/familie-ba-sak/api/brevmottaker/${behandlingId}/${brevmottakerId}`,
    });
}
