import { apiClient } from '@api/client/apiClient';
import type { IRestKorrigertVedtak } from '@typer/vedtak';

export interface KorrigerVedtakPayload {
    vedtaksdato: string;
    begrunnelse: string;
}

export async function korrigerVedtak(payload: KorrigerVedtakPayload, behandlingId: number) {
    return apiClient.post<KorrigerVedtakPayload, IRestKorrigertVedtak>({
        data: payload,
        url: `/familie-ba-sak/api/korrigertvedtak/behandling/${behandlingId}`,
    });
}
