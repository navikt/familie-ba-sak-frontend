import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../../../../utils/ressursResolver';

export async function hentAInntektUrl(request: FamilieRequest, ident: string): Promise<string> {
    const ressurs = await request<{ ident: string }, string>({
        method: 'POST',
        url: 'familie-ba-sak/api/a-inntekt/hent-url',
        data: { ident },
    });
    return RessursResolver.resolveToPromise(ressurs);
}
