import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

interface PathParams {
    behandlingId: number;
    vilkårResultatId: number;
}

interface Payload {
    personIdent: string;
}

export function slettVilkårResultat(pathParams: PathParams, payload: Payload) {
    const { behandlingId, vilkårResultatId } = pathParams;
    return apiClient.delete<string, IBehandling>({
        url: `/familie-ba-sak/api/vilkaarsvurdering/${behandlingId}/${vilkårResultatId}`,
        data: payload.personIdent,
    });
}
