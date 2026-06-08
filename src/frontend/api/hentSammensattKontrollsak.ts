import type { IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';
import { RessursResolver } from '@utils/ressursResolver';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

export async function hentSammensattKontrollsak(request: FamilieRequest, behandlingId: number) {
    const ressurs = await request<void, IRestSammensattKontrollsak | null>({
        method: 'GET',
        url: `/familie-ba-sak/api/sammensatt-kontrollsak/${behandlingId}`,
    });

    return RessursResolver.resolveToPromise(ressurs);
}
