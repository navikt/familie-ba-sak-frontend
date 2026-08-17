import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export interface LeggTilBarnPåBehandlingPayload {
    barnIdent: string;
}

export async function leggTilBarnPåBehandling(payload: LeggTilBarnPåBehandlingPayload, behandlingId: number) {
    return apiClient.post<LeggTilBarnPåBehandlingPayload, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/legg-til-barn`,
    });
}
