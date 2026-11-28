import { apiClient } from '@api/client/apiClient';
import type { BrevmottakerBehandling } from '@typer/brevmottaker';

export async function hentBrevmottakere(behandlingId: number): Promise<BrevmottakerBehandling[]> {
    return apiClient.get<void, BrevmottakerBehandling[]>({
        url: `/familie-ba-sak/api/brevmottaker/${behandlingId}`,
    });
}
