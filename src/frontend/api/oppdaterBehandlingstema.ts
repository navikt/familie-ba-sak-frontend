import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { BehandlingKategori, BehandlingUnderkategori } from '@typer/behandlingstema';

export interface OppdaterBehandlingstemaPayload {
    behandlingKategori: BehandlingKategori;
    behandlingUnderkategori: BehandlingUnderkategori;
}

export async function oppdaterBehandlingstema(payload: OppdaterBehandlingstemaPayload, behandlingId: number) {
    return apiClient.put<OppdaterBehandlingstemaPayload, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/behandlingstema`,
    });
}
