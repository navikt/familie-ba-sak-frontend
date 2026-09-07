import { apiClient } from '@api/client/apiClient';
import type { HenleggÅrsak, IBehandling } from '@typer/behandling';

export interface HenleggBehandlingPayload {
    årsak: HenleggÅrsak;
    begrunnelse: string;
}

export async function henleggBehandling(behandling: IBehandling, payload: HenleggBehandlingPayload) {
    return apiClient.put<HenleggBehandlingPayload, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/behandlinger/${behandling.behandlingId}/steg/henlegg`,
    });
}
