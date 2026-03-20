import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IsoDatoString } from '../utils/dato';
import { RessursResolver } from '../utils/ressursResolver';

export async function hentEndringstidspunkt(request: FamilieRequest, behandlingId: number) {
    const ressurs = await request<void, IsoDatoString>({
        method: 'GET',
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/endringstidspunkt`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
