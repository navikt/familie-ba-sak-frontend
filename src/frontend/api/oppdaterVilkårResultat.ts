import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { IRestPersonResultat } from '@typer/vilkår';

interface PathParams {
    behandlingId: number;
    vilkårResultatId: number;
}

export async function oppdaterVilkårResultat(pathParams: PathParams, payload: IRestPersonResultat) {
    const { behandlingId, vilkårResultatId } = pathParams;
    return apiClient.put<IRestPersonResultat, IBehandling>({
        url: `/familie-ba-sak/api/vilkaarsvurdering/${behandlingId}/${vilkårResultatId}`,
        data: payload,
    });
}
