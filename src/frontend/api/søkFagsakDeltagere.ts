import { apiClient } from '@api/client/apiClient';
import type { IFagsakDeltager, ISøkParam } from '@typer/fagsakdeltager';

export async function søkFagsakDeltagere(personIdent: string): Promise<IFagsakDeltager[]> {
    return apiClient.post<ISøkParam, IFagsakDeltager[]>({
        url: '/familie-ba-sak/api/fagsaker/sok',
        data: { personIdent },
    });
}
