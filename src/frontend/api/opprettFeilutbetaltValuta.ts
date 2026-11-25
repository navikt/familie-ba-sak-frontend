import { apiClient } from '@api/client/apiClient';
import type { IRestFeilutbetaltValuta } from '@typer/eøs-feilutbetalt-valuta';

export interface OpprettFeilutbetaltValutaPayload {
    fom: string;
    tom: string;
    feilutbetaltBeløp: number;
}

export async function opprettFeilutbetaltValuta(behandlingId: number, payload: OpprettFeilutbetaltValutaPayload) {
    return apiClient.post<OpprettFeilutbetaltValutaPayload, IRestFeilutbetaltValuta[]>({
        url: `/familie-ba-sak/api/feilutbetalt-valuta/behandling/${behandlingId}`,
        data: payload,
    });
}
