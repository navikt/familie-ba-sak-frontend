import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import { RessursResolver } from '../utils/ressursResolver';

export async function angreKorrigertEtterbetaling(request: FamilieRequest, behandlingId: number) {
    const ressurs = await request<null, IBehandling>({
        method: 'PATCH',
        url: `/familie-ba-sak/api/korrigertetterbetaling/behandling/${behandlingId}`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
