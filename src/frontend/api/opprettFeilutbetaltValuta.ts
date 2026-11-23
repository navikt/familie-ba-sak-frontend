import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export interface OpprettFeilutbetaltValutaPayload {
    fom: string;
    tom: string;
    feilutbetaltBeløp: number;
}

export async function opprettFeilutbetaltValuta(behandlingId: number, payload: OpprettFeilutbetaltValutaPayload) {
    return apiClient.post<OpprettFeilutbetaltValutaPayload, IBehandling>({
        url: `/familie-ba-sak/api/feilutbetalt-valuta/behandling/${behandlingId}`,
        data: payload,
    });
}
