import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';
import { RessursResolver } from '@utils/ressursResolver';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

export interface Payload {
    fritekster: string[];
}

export async function oppdaterVedtaksperiodeMedFritekster(
    request: FamilieRequest,
    vedtaksperiodeMedBegrunnelserId: number,
    payload: Payload
) {
    const ressurs = await request<Payload, IVedtaksperiodeMedBegrunnelser[]>({
        method: 'PUT',
        url: `/familie-ba-sak/api/vedtaksperioder/fritekster/${vedtaksperiodeMedBegrunnelserId}`,
        data: payload,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
