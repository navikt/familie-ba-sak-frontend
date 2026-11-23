import { apiClient } from '@api/client/apiClient';
import type { IRestKorrigertEtterbetaling } from '@typer/vedtak';

export interface KorrigerEtterbetalingPayload {
    årsak: string;
    beløp: number;
    begrunnelse: string;
}

export async function korrigerEtterbetaling(payload: KorrigerEtterbetalingPayload, behandlingId: number) {
    return apiClient.post<KorrigerEtterbetalingPayload, IRestKorrigertEtterbetaling>({
        data: payload,
        url: `/familie-ba-sak/api/korrigertetterbetaling/behandling/${behandlingId}`,
    });
}
