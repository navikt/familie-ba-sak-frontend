import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { VedtakBegrunnelse } from '../typer/vedtak';
import type { IVedtaksperiodeMedBegrunnelser } from '../typer/vedtaksperiode';
import { RessursResolver } from '../utils/ressursResolver';

interface Payload {
    standardbegrunnelser: VedtakBegrunnelse[];
}

export async function oppdaterStandardbegrunnelser(
    request: FamilieRequest,
    vedtaksperiodeMedBegrunnelserId: number,
    payload: Payload
) {
    const ressurs = await request<{ standardbegrunnelser: VedtakBegrunnelse[] }, IVedtaksperiodeMedBegrunnelser[]>({
        method: 'PUT',
        url: `/familie-ba-sak/api/vedtaksperioder/standardbegrunnelser/${vedtaksperiodeMedBegrunnelserId}`,
        data: payload,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
