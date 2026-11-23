import { apiClient } from '@api/client/apiClient';
import type { IRestKorrigertEtterbetaling } from '@typer/vedtak';

export async function angreKorrigertEtterbetaling(behandlingId: number) {
    return apiClient.patch<null, IRestKorrigertEtterbetaling | null>({
        url: `/familie-ba-sak/api/korrigertetterbetaling/behandling/${behandlingId}`,
    });
}
