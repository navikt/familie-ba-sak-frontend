import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { IRestEndretUtbetalingAndel } from '@typer/utbetalingAndel';

export async function slettEndretUtbetalingAndel(
    behandlingId: number,
    endretUtbetalingAndel: IRestEndretUtbetalingAndel
) {
    return apiClient.delete<void, IBehandling>({
        url: `/familie-ba-sak/api/endretutbetalingandel/${behandlingId}/${endretUtbetalingAndel.id}`,
    });
}
