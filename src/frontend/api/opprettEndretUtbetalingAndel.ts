import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export async function opprettEndretUtbetalingAndel(behandlingId: number) {
    return apiClient.post<void, IBehandling>({
        url: `/familie-ba-sak/api/endretutbetalingandel/${behandlingId}`,
    });
}
