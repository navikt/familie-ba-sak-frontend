import { apiClient } from '@api/client/apiClient';
import type { IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';

export async function slettSammensattKontrollsak(payload: IRestSammensattKontrollsak): Promise<number> {
    return apiClient.delete<IRestSammensattKontrollsak, number>({
        data: payload,
        url: '/familie-ba-sak/api/sammensatt-kontrollsak',
    });
}
