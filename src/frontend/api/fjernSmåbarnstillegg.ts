import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

import type { Småbarnstilleggkorrigering } from './leggTilSmåbarnstillegg';

export async function fjernSmåbarnstillegg(
    payload: Småbarnstilleggkorrigering,
    behandlingId: number
): Promise<IBehandling> {
    return apiClient.delete<Småbarnstilleggkorrigering, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/småbarnstilleggkorrigering/behandling/${behandlingId}`,
    });
}
