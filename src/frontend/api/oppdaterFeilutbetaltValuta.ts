import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

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
    return apiClient.put<OppdaterFeilutbetaltValutaPayload, IBehandling>({
        url: `/familie-ba-sak/api/feilutbetalt-valuta/behandling/${behandlingId}/periode/${feilutbetaltValutaId}`,
        data: payload,
    });
}
