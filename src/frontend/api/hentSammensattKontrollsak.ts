import { apiClient } from '@api/client/apiClient';
import type { IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';

export async function hentSammensattKontrollsak(behandlingId: number): Promise<IRestSammensattKontrollsak | null> {
    return apiClient.get<void, IRestSammensattKontrollsak | null>({
        url: `/familie-ba-sak/api/sammensatt-kontrollsak/${behandlingId}`,
    });
}
