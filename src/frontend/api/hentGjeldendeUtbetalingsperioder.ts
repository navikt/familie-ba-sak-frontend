import { apiClient } from '@api/client/apiClient';
import type { FagsakId } from '@typer/fagsak';
import type { Utbetalingsperiode } from '@typer/vedtaksperiode';

export async function hentGjeldendeUtbetalingsperioder(fagsakId: FagsakId) {
    return apiClient.get<void, Utbetalingsperiode[]>({
        url: `/familie-ba-sak/api/fagsaker/${fagsakId}/gjeldende-utbetalingsperioder`,
    });
}
