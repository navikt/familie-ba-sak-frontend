import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import { RessursResolver } from '../utils/ressursResolver';

export async function slettFeilutbetaltValuta(
    request: FamilieRequest,
    behandlingId: number,
    feilutbetaltValutaId: number
) {
    const ressurs = await request<null, IBehandling>({
        method: 'DELETE',
        url: `/familie-ba-sak/api/feilutbetalt-valuta/behandling/${behandlingId}/periode/${feilutbetaltValutaId}`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
