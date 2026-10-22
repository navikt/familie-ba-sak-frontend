import { apiClient } from '@api/client/apiClient';
import type { IMinimalFagsak } from '@typer/fagsak';

interface Payload {
    personIdent: string;
}

export async function hentFagsakPåPerson(payload: Payload): Promise<IMinimalFagsak> {
    return apiClient.post<Payload, IMinimalFagsak>({
        url: '/familie-ba-sak/api/fagsaker/hent-fagsak-paa-person',
        data: payload,
    });
}
