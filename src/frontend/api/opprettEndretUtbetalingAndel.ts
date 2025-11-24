import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import { RessursResolver } from '../utils/ressursResolver';

export async function opprettEndretUtbetalingAndel(request: FamilieRequest, behandlingId: number) {
    const ressurs = await request<null, IBehandling>({
        method: 'POST',
        url: `/familie-ba-sak/api/endretutbetalingandel/${behandlingId}`,
        påvirkerSystemLaster: false,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
