import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export async function kopierVilkårFraSøkerTilBarna(behandlingId: number) {
    return apiClient.post<null, IBehandling>({
        url: `/familie-ba-sak/api/vilkaarsvurdering/${behandlingId}/automatisk-fyll-ut-barnas-vilkaar`,
    });
}
