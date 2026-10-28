import { apiClient } from '@api/client/apiClient';
import type { VedtakBegrunnelse } from '@typer/vedtak';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';

interface Payload {
    standardbegrunnelser: VedtakBegrunnelse[];
}

export async function oppdaterVedtaksperiodeMedBegrunnelser(
    vedtaksperiodeMedBegrunnelserId: number,
    payload: Payload
): Promise<IVedtaksperiodeMedBegrunnelser[]> {
    return apiClient.put<Payload, IVedtaksperiodeMedBegrunnelser[]>({
        url: `/familie-ba-sak/api/vedtaksperioder/standardbegrunnelser/${vedtaksperiodeMedBegrunnelserId}`,
        data: payload,
    });
}
