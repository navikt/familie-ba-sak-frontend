import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export async function angreKorrigertEtterbetaling(behandlingId: number) {
    return apiClient.patch<null, IBehandling>({
        url: `/familie-ba-sak/api/korrigertetterbetaling/behandling/${behandlingId}`,
    });
}
