import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export async function slettBrevmottaker(behandlingId: number, brevmottakerId: number) {
    return apiClient.delete<void, IBehandling>({
        url: `/familie-ba-sak/api/brevmottaker/${behandlingId}/${brevmottakerId}`,
    });
}
