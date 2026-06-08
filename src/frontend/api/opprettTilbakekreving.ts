import type { IBehandling } from '@typer/behandling';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

export async function opprettTilbakekreving(request: FamilieRequest, fagsakId: number) {
    const ressurs = await request<null, IBehandling>({
        method: 'GET',
        url: `/familie-ba-sak/api/fagsaker/${fagsakId}/opprett-tilbakekreving`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
