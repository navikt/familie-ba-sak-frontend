import { apiClient } from '@api/client/apiClient';
import type { IRestFeilutbetaltValuta } from '@typer/eøs-feilutbetalt-valuta';

export interface OppdaterFeilutbetaltValutaPayload {
    fom: string;
    tom: string;
    feilutbetaltBeløp: number;
}

export async function oppdaterFeilutbetaltValuta(
    behandlingId: number,
    feilutbetaltValutaId: number,
    payload: OppdaterFeilutbetaltValutaPayload
) {
    return apiClient.put<OppdaterFeilutbetaltValutaPayload, IRestFeilutbetaltValuta[]>({
        url: `/familie-ba-sak/api/feilutbetalt-valuta/behandling/${behandlingId}/periode/${feilutbetaltValutaId}`,
        data: payload,
    });
}
