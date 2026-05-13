import type { IBehandling } from '@typer/behandling';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

export async function oppdaterVilkårsvurdering(request: FamilieRequest, behandlingId: number) {
    const ressurs = await request<void, IBehandling>({
        method: 'POST',
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/steg/vilkårsvurdering`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
