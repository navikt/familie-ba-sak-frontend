import { apiClient } from '@api/client/apiClient';
import type { IRestRefusjonEøs } from '@typer/refusjon-eøs';

export async function slettRefusjonEøs(behandlingId: number, refusjonEøsId: number) {
    return apiClient.delete<void, IRestRefusjonEøs[]>({
        url: `/familie-ba-sak/api/refusjon-eøs/behandlinger/${behandlingId}/perioder/${refusjonEøsId}`,
    });
}
