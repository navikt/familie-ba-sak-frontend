import type { IRestOpprettSammensattKontrollsak, IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';
import { RessursResolver } from '@utils/ressursResolver';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

export async function opprettSammensattKontrollsak(
    request: FamilieRequest,
    payload: IRestOpprettSammensattKontrollsak
) {
    const ressurs = await request<IRestOpprettSammensattKontrollsak, IRestSammensattKontrollsak>({
        data: payload,
        method: 'POST',
        url: '/familie-ba-sak/api/sammensatt-kontrollsak',
        påvirkerSystemLaster: true,
    });

    return RessursResolver.resolveToPromise(ressurs);
}
