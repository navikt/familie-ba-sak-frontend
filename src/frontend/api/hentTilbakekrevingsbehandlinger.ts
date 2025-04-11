import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { ITilbakekrevingsbehandling } from '../typer/tilbakekrevingsbehandling';
import { RessursResolver } from '../utils/ressursResolver';

export async function hentTilbakekrevingsbehandlinger(
    request: FamilieRequest,
    fagsakId: number
): Promise<ITilbakekrevingsbehandling[]> {
    const ressurs = await request<void, ITilbakekrevingsbehandling[]>({
        method: 'GET',
        url: `/familie-ba-sak/api/tilbakekreving/fagsak/${fagsakId}`,
        påvirkerSystemLaster: true,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
