import { apiClient } from '@api/client/apiClient';
import type { IRestRefusjonEøs } from '@typer/refusjon-eøs';

export async function hentRefusjonEøs(behandlingId: number): Promise<IRestRefusjonEøs[]> {
    return apiClient.get<void, IRestRefusjonEøs[]>({
        url: `/familie-ba-sak/api/refusjon-eøs/behandlinger/${behandlingId}`,
    });
}
