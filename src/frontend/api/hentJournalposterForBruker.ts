import { apiClient } from '@api/client/apiClient';
import type { ITilgangsstyrtJournalpost } from '@typer/journalpost';

export async function hentJournalposterForBruker(ident: string): Promise<ITilgangsstyrtJournalpost[]> {
    return apiClient.post<{ ident: string }, ITilgangsstyrtJournalpost[]>({
        url: '/familie-ba-sak/api/journalpost/for-bruker',
        data: { ident },
    });
}
