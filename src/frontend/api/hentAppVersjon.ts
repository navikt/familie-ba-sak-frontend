import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

export async function hentAppVersjon(request: FamilieRequest) {
    const ressurs = await request<void, string>({
        url: '/version',
        method: 'GET',
    });
    return RessursResolver.resolveToPromise(ressurs);
}
