import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { IRestNyttVilkår } from '@typer/vilkår';

export async function opprettVilkårResultat(behandlingId: number, payload: IRestNyttVilkår) {
    return apiClient.post<IRestNyttVilkår, IBehandling>({
        url: `/familie-ba-sak/api/vilkaarsvurdering/${behandlingId}`,
        data: payload,
    });
}
