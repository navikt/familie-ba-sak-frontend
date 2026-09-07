import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { VilkårType } from '@typer/vilkår';

export interface SlettVilkårPayload {
    personIdent: string;
    vilkårType: VilkårType;
}

export async function slettVilkår(behandlingId: number, payload: SlettVilkårPayload) {
    return apiClient.delete<SlettVilkårPayload, IBehandling>({
        url: `/familie-ba-sak/api/vilkaarsvurdering/${behandlingId}/vilkaar`,
        data: payload,
    });
}
