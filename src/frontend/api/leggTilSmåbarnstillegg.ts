import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export interface Småbarnstilleggkorrigering {
    årMåned: string;
}

export async function leggTilSmåbarnstillegg(
    payload: Småbarnstilleggkorrigering,
    behandlingId: number
): Promise<IBehandling> {
    return apiClient.post<Småbarnstilleggkorrigering, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/småbarnstilleggkorrigering/behandling/${behandlingId}`,
    });
}
