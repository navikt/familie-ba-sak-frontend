import type { IBehandling } from '@typer/behandling';
import { RessursResolver } from '@utils/ressursResolver';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

export async function taBehandlingAvVent(request: FamilieRequest, behandlingId: number) {
    const ressurs = await request<undefined, IBehandling>({
        method: 'PUT',
        url: `/familie-ba-sak/api/sett-på-vent/${behandlingId}/fortsettbehandling`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
