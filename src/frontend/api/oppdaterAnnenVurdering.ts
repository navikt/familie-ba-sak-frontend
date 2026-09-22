import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { IRestAnnenVurdering } from '@typer/vilkår';

interface PathParams {
    behandlingId: number;
    annenVurderingId: number;
}

export async function oppdaterAnnenVurdering(pathParams: PathParams, payload: IRestAnnenVurdering) {
    const { behandlingId, annenVurderingId } = pathParams;
    return apiClient.put<IRestAnnenVurdering, IBehandling>({
        url: `/familie-ba-sak/api/vilkaarsvurdering/${behandlingId}/annenvurdering/${annenVurderingId}`,
        data: payload,
    });
}
