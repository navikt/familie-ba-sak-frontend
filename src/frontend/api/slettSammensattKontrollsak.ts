import type { IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';
import { RessursResolver } from '@utils/ressursResolver';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

export async function slettSammensattKontrollsak(request: FamilieRequest, payload: IRestSammensattKontrollsak) {
    const ressurs = await request<IRestSammensattKontrollsak, number>({
        data: payload,
        method: 'DELETE',
        url: '/familie-ba-sak/api/sammensatt-kontrollsak',
        påvirkerSystemLaster: true,
    });

    return RessursResolver.resolveToPromise(ressurs);
}
