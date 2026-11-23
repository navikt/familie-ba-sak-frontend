import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export async function slettFeilutbetaltValuta(behandlingId: number, feilutbetaltValutaId: number) {
    return apiClient.delete<void, IBehandling>({
        url: `/familie-ba-sak/api/feilutbetalt-valuta/behandling/${behandlingId}/periode/${feilutbetaltValutaId}`,
    });
}
