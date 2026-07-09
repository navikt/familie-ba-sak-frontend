import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export async function taBehandlingAvVent(behandlingId: number): Promise<IBehandling> {
    return apiClient.put<undefined, IBehandling>({
        url: `/familie-ba-sak/api/sett-på-vent/${behandlingId}/fortsettbehandling`,
    });
}
