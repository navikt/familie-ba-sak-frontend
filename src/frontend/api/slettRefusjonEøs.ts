import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import { RessursResolver } from '../utils/ressursResolver';

export async function slettRefusjonEøs(request: FamilieRequest, behandlingId: number, refusjonEøsId: number) {
    const ressurs = await request<null, IBehandling>({
        method: 'DELETE',
        url: `/familie-ba-sak/api/refusjon-eøs/behandlinger/${behandlingId}/perioder/${refusjonEøsId}`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
