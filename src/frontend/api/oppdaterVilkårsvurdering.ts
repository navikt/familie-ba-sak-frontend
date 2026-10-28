import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export async function oppdaterVilkårsvurdering(behandlingId: number): Promise<IBehandling> {
    return apiClient.post<void, IBehandling>({
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/steg/vilkårsvurdering`,
    });
}
