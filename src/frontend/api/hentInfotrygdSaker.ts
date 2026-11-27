import { apiClient } from '@api/client/apiClient';
import type { IInfotrygdsaker, IInfotrygdsakerRequest } from '@typer/infotrygd';

export async function hentInfotrygdSaker(ident: string): Promise<IInfotrygdsaker> {
    return apiClient.post<IInfotrygdsakerRequest, IInfotrygdsaker>({
        url: '/familie-ba-sak/api/infotrygd/hent-infotrygdsaker-for-soker',
        data: { ident },
    });
}
