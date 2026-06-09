import type { Distribusjonskanal } from '@typer/dokument';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

export async function hentDistribusjonskanal(
    request: FamilieRequest,
    personIdent: string
): Promise<Distribusjonskanal> {
    const ressurs = await request<{ ident: string }, Distribusjonskanal>({
        method: 'POST',
        data: { ident: personIdent },
        url: `/familie-ba-sak/api/dokument/distribusjonskanal`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
