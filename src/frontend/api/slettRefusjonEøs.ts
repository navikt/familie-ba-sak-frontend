import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export async function slettRefusjonEøs(behandlingId: number, refusjonEøsId: number) {
    return apiClient.delete<void, IBehandling>({
        url: `/familie-ba-sak/api/refusjon-eøs/behandlinger/${behandlingId}/perioder/${refusjonEøsId}`,
    });
}
