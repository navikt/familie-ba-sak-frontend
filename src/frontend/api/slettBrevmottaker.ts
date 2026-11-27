import { apiClient } from '@api/client/apiClient';
import type { BrevmottakerBehandling } from '@typer/brevmottaker';

interface PathParams {
    behandlingId: number;
    brevmottakerId: number;
}

export async function slettBrevmottaker(pathParams: PathParams) {
    const { behandlingId, brevmottakerId } = pathParams;
    return apiClient.delete<void, BrevmottakerBehandling[]>({
        url: `/familie-ba-sak/api/brevmottaker/${behandlingId}/${brevmottakerId}`,
    });
}
