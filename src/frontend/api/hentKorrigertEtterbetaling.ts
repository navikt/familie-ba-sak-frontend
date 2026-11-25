import { apiClient } from '@api/client/apiClient';
import type { IRestKorrigertEtterbetaling } from '@typer/vedtak';

export async function hentKorrigertEtterbetaling(behandlingId: number): Promise<IRestKorrigertEtterbetaling | null> {
    return apiClient.get<void, IRestKorrigertEtterbetaling | null>({
        url: `/familie-ba-sak/api/korrigertetterbetaling/behandling/${behandlingId}`,
    });
}
