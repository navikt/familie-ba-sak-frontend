import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { ISamhandlerInfo } from '../typer/samhandler';
import { RessursResolver } from '../utils/ressursResolver';

export async function hentSamhandler(request: FamilieRequest, orgnr: string) {
    const ressurs = await request<void, ISamhandlerInfo>({
        method: 'GET',
        url: '/familie-ba-sak/api/samhandler/orgnr/' + orgnr,
        påvirkerSystemLaster: false,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
