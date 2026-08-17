import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export interface KorrigerVedtakPayload {
    vedtaksdato: string;
    begrunnelse: string;
}

export async function korrigerVedtak(payload: KorrigerVedtakPayload, behandlingId: number) {
    return apiClient.post<KorrigerVedtakPayload, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/korrigertvedtak/behandling/${behandlingId}`,
    });
}
