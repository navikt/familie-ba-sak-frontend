import { apiClient } from '@api/client/apiClient';
import type { IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';

export async function oppdaterSammensattKontrollsak(
    payload: IRestSammensattKontrollsak
): Promise<IRestSammensattKontrollsak> {
    return apiClient.put<IRestSammensattKontrollsak, IRestSammensattKontrollsak>({
        data: payload,
        url: '/familie-ba-sak/api/sammensatt-kontrollsak',
    });
}
