import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import type { IRestEndretUtbetalingAndel } from '../typer/utbetalingAndel';
import { RessursResolver } from '../utils/ressursResolver';

export async function slettEndretUtbetalingAndel(
    request: FamilieRequest,
    behandlingId: number,
    endretUtbetalingAndel: IRestEndretUtbetalingAndel
) {
    const ressurs = await request<null, IBehandling>({
        method: 'DELETE',
        url: `/familie-ba-sak/api/endretutbetalingandel/${behandlingId}/${endretUtbetalingAndel.id}`,
        påvirkerSystemLaster: true,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
