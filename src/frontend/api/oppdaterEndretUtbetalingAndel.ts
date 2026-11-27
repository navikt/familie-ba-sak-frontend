import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { IRestEndretUtbetalingAndel } from '@typer/utbetalingAndel';

export async function oppdaterEndretUtbetalingAndel(
    behandlingId: number,
    endretUtbetalingAndel: IRestEndretUtbetalingAndel
) {
    return apiClient.put<IRestEndretUtbetalingAndel, IBehandling>({
        url: `/familie-ba-sak/api/endretutbetalingandel/${behandlingId}/${endretUtbetalingAndel.id}`,
        data: endretUtbetalingAndel,
    });
}
