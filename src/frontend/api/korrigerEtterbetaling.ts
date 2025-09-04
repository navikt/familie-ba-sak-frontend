import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import { RessursResolver } from '../utils/ressursResolver';

export interface KorrigerEtterbetalingPayload {
    årsak: string;
    beløp: number;
    begrunnelse: string;
}

export async function korrigerEtterbetaling(
    request: FamilieRequest,
    payload: KorrigerEtterbetalingPayload,
    behandlingId: number
) {
    const ressurs = await request<KorrigerEtterbetalingPayload, IBehandling>({
        data: payload,
        method: 'POST',
        url: `/familie-ba-sak/api/korrigertetterbetaling/behandling/${behandlingId}`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
