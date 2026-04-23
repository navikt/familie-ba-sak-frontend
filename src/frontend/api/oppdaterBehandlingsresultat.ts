import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import { RessursResolver } from '../utils/ressursResolver';

export async function oppdaterBehandlingsresultat(request: FamilieRequest, behandlingId: number) {
    const ressurs = await request<void, IBehandling>({
        method: 'POST',
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/steg/behandlingsresultat`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
