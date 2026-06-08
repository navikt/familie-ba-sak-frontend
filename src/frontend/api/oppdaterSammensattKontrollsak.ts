import type { IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';
import { RessursResolver } from '@utils/ressursResolver';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

export async function oppdaterSammensattKontrollsak(request: FamilieRequest, payload: IRestSammensattKontrollsak) {
    const ressurs = await request<IRestSammensattKontrollsak, IRestSammensattKontrollsak>({
        data: payload,
        method: 'PUT',
        url: '/familie-ba-sak/api/sammensatt-kontrollsak',
        påvirkerSystemLaster: false,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
