import { apiClient } from '@api/client/apiClient';
import type { Distribusjonskanal } from '@typer/dokument';

export async function hentDistribusjonskanal(personIdent: string): Promise<Distribusjonskanal> {
    return apiClient.post<{ ident: string }, Distribusjonskanal>({
        url: `/familie-ba-sak/api/dokument/distribusjonskanal`,
        data: { ident: personIdent },
    });
}
