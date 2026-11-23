import { apiClient } from '@api/client/apiClient';
import type { IRestFeilutbetaltValuta } from '@typer/eøs-feilutbetalt-valuta';

export async function hentFeilutbetaltValuta(behandlingId: number): Promise<IRestFeilutbetaltValuta[]> {
    return apiClient.get<void, IRestFeilutbetaltValuta[]>({
        url: `/familie-ba-sak/api/feilutbetalt-valuta/behandling/${behandlingId}`,
    });
}
