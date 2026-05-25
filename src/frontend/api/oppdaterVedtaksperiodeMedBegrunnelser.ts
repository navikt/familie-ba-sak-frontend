import type { VedtakBegrunnelse } from '@typer/vedtak';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

interface Payload {
    standardbegrunnelser: VedtakBegrunnelse[];
}

export async function oppdaterVedtaksperiodeMedBegrunnelser(
    request: FamilieRequest,
    vedtaksperiodeMedBegrunnelserId: number,
    payload: Payload
) {
    const ressurs = await request<Payload, IVedtaksperiodeMedBegrunnelser[]>({
        method: 'PUT',
        url: `/familie-ba-sak/api/vedtaksperioder/begrunnelser/${vedtaksperiodeMedBegrunnelserId}`,
        data: payload,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
