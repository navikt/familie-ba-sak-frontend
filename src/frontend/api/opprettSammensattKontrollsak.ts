import { apiClient } from '@api/client/apiClient';
import type { IRestOpprettSammensattKontrollsak, IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';

export async function opprettSammensattKontrollsak(
    payload: IRestOpprettSammensattKontrollsak
): Promise<IRestSammensattKontrollsak> {
    return apiClient.post<IRestOpprettSammensattKontrollsak, IRestSammensattKontrollsak>({
        data: payload,
        url: '/familie-ba-sak/api/sammensatt-kontrollsak',
    });
}
