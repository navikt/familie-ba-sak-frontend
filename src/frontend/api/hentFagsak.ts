import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IMinimalFagsak } from '../typer/fagsak';
import { RessursResolver } from '../utils/ressursResolver';

export async function hentFagsak(request: FamilieRequest, fagsakId: number) {
    const ressurs = await request<void, IMinimalFagsak>({
        method: 'GET',
        url: `/familie-ba-sak/api/fagsaker/minimal/${fagsakId}`,
        påvirkerSystemLaster: true,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
