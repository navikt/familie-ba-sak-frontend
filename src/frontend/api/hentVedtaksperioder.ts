import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IVedtaksperiodeMedBegrunnelser } from '../typer/vedtaksperiode';
import { RessursResolver } from '../utils/ressursResolver';

export async function hentVedtaksperioder(
    request: FamilieRequest,
    behandlingId: number
): Promise<IVedtaksperiodeMedBegrunnelser[]> {
    const ressurs = await request<void, IVedtaksperiodeMedBegrunnelser[]>({
        method: 'GET',
        url: `/familie-ba-sak/api/vedtaksperioder/behandling/${behandlingId}/hent-vedtaksperioder`,
        påvirkerSystemLaster: true,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
