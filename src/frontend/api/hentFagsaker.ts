import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IMinimalFagsak } from '../typer/fagsak';
import { RessursResolver } from '../utils/ressursResolver';

export async function hentFagsaker(
    request: FamilieRequest,
    personIdent: string,
    påvirkerSystemLaster: boolean = true
) {
    const ressurs = await request<{ personIdent: string }, IMinimalFagsak[]>({
        method: 'POST',
        url: `/familie-ba-sak/api/fagsaker/hent-fagsaker-paa-person`,
        data: { personIdent },
        påvirkerSystemLaster,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
