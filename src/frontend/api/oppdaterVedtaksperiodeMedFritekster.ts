import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IRestPutVedtaksperiodeMedFritekster, IVedtaksperiodeMedBegrunnelser } from '../typer/vedtaksperiode';
import { RessursResolver } from '../utils/ressursResolver';

export async function oppdaterVedtaksperiodeMedFritekster(
    request: FamilieRequest,
    vedtaksperiodeMedBegrunnelserId: number,
    payload: IRestPutVedtaksperiodeMedFritekster
) {
    const ressurs = await request<IRestPutVedtaksperiodeMedFritekster, IVedtaksperiodeMedBegrunnelser[]>({
        method: 'PUT',
        url: `/familie-ba-sak/api/vedtaksperioder/fritekster/${vedtaksperiodeMedBegrunnelserId}`,
        data: payload,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
