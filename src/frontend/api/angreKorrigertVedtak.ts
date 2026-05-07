import type { IBehandling } from '@typer/behandling';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

export async function angreKorrigertVedtak(request: FamilieRequest, behandlingId: number) {
    const ressurs = await request<null, IBehandling>({
        method: 'PATCH',
        url: `/familie-ba-sak/api/korrigertvedtak/behandling/${behandlingId}`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
