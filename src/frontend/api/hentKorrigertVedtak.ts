import { apiClient } from '@api/client/apiClient';
import type { IRestKorrigertVedtak } from '@typer/vedtak';

export async function hentKorrigertVedtak(behandlingId: number): Promise<IRestKorrigertVedtak | null> {
    return apiClient.get<void, IRestKorrigertVedtak | null>({
        url: `/familie-ba-sak/api/korrigertvedtak/behandling/${behandlingId}`,
    });
}
