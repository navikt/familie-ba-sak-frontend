import { apiClient } from '@api/client/apiClient';
import type { IRestFeilutbetaltValuta } from '@typer/eøs-feilutbetalt-valuta';

export async function slettFeilutbetaltValuta(behandlingId: number, feilutbetaltValutaId: number) {
    return apiClient.delete<void, IRestFeilutbetaltValuta[]>({
        url: `/familie-ba-sak/api/feilutbetalt-valuta/behandling/${behandlingId}/periode/${feilutbetaltValutaId}`,
    });
}
