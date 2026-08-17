import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export async function angreKorrigertVedtak(behandlingId: number) {
    return apiClient.patch<null, IBehandling>({
        url: `/familie-ba-sak/api/korrigertvedtak/behandling/${behandlingId}`,
    });
}
