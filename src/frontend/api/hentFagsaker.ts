import { apiClient } from '@api/client/apiClient';

import type { IMinimalFagsak } from '@typer/fagsak';

interface Payload {
    personIdent: string;
}

export async function hentFagsaker(payload: Payload): Promise<IMinimalFagsak[]> {
    return apiClient.post<{ personIdent: string }, IMinimalFagsak[]>({
        url: '/familie-ba-sak/api/fagsaker/hent-fagsaker-paa-person',
        data: payload,
    });
}
