import { apiClient } from '@api/client/apiClient';
import type { IRestKorrigertVedtak } from '@typer/vedtak';

export async function angreKorrigertVedtak(behandlingId: number) {
    return apiClient.patch<null, IRestKorrigertVedtak | null>({
        url: `/familie-ba-sak/api/korrigertvedtak/behandling/${behandlingId}`,
    });
}
