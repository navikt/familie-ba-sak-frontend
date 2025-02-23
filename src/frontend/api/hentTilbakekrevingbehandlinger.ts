import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { ITilbakekrevingsbehandling } from '../typer/tilbakekrevingsbehandling';
import { RessursResolver } from '../utils/ressursResolver';

export async function hentTilbakekrevingbehandlinger(request: FamilieRequest, fagsakId: number) {
    const ressurs = await request<void, ITilbakekrevingsbehandling[]>({
        url: `/familie-ba-sak/api/tilbakekreving/${fagsakId}`,
        method: 'GET',
        påvirkerSystemLaster: true,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
