import { type IBehandling, type NyBehandling } from '@typer/behandling';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

export async function opprettBehandling(request: FamilieRequest, payload: NyBehandling) {
    const ressurs = await request<NyBehandling, IBehandling>({
        data: payload,
        method: 'POST',
        url: `/familie-ba-sak/api/behandlinger`,
        påvirkerSystemLaster: true,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
