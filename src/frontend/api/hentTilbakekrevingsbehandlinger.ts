import type { ITilbakekrevingsbehandling } from '@typer/tilbakekrevingsbehandling';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

export async function hentTilbakekrevingsbehandlinger(
    request: FamilieRequest,
    fagsakId: number
): Promise<ITilbakekrevingsbehandling[]> {
    const ressurs = await request<void, ITilbakekrevingsbehandling[]>({
        method: 'GET',
        url: `/familie-ba-sak/api/tilbakekreving/fagsak/${fagsakId}`,
        påvirkerSystemLaster: true,
        timeout: 10000,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
