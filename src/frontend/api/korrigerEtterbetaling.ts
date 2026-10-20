import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export interface KorrigerEtterbetalingPayload {
    årsak: string;
    beløp: number;
    begrunnelse: string;
}

export async function korrigerEtterbetaling(payload: KorrigerEtterbetalingPayload, behandlingId: number) {
    return apiClient.post<KorrigerEtterbetalingPayload, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/korrigertetterbetaling/behandling/${behandlingId}`,
    });
}
