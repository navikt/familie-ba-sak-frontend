import type { IBehandling } from '@typer/behandling';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

export async function utfyllVilkårForBarnaAutomatisk(request: FamilieRequest, behandlingId: number) {
    const ressurs = await request<null, IBehandling>({
        method: 'POST',
        url: `/familie-ba-sak/api/vilkaarsvurdering/${behandlingId}/automatisk-fyll-ut-barnas-vilkaar`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
