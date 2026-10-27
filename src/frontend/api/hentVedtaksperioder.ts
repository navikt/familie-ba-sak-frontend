import { apiClient } from '@api/client/apiClient';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';

export async function hentVedtaksperioder(behandlingId: number): Promise<IVedtaksperiodeMedBegrunnelser[]> {
    return apiClient.get<void, IVedtaksperiodeMedBegrunnelser[]>({
        url: `/familie-ba-sak/api/vedtaksperioder/behandling/${behandlingId}/hent-vedtaksperioder`,
    });
}
