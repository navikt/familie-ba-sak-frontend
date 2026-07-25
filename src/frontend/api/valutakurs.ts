import { apiClient } from '@api/client/apiClient';
import type { IBehandling, VurderingsstrategiForValutakurser } from '@typer/behandling';

export interface OppdaterValutakursPayload {
    id: number;
    fom: string;
    tom?: string;
    barnIdenter: string[];
    valutakode?: string;
    valutakursdato?: string;
    kurs?: string;
}

export async function oppdaterValutakurs(payload: OppdaterValutakursPayload, behandlingId: number) {
    return apiClient.put<OppdaterValutakursPayload, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/differanseberegning/valutakurs/${behandlingId}`,
    });
}

export async function slettValutakurs(behandlingId: number, valutakursId: number) {
    return apiClient.delete<void, IBehandling>({
        url: `/familie-ba-sak/api/differanseberegning/valutakurs/${behandlingId}/${valutakursId}`,
    });
}

export async function endreVurderingsstrategiForValutakurser(
    behandlingId: number,
    vurderingsstrategi: VurderingsstrategiForValutakurser
) {
    return apiClient.put<undefined, IBehandling>({
        url: `/familie-ba-sak/api/differanseberegning/valutakurs/behandlinger/${behandlingId}/endre-vurderingsstrategi-til/${vurderingsstrategi}`,
    });
}
