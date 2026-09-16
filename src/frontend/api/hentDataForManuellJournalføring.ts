import { apiClient } from '@api/client/apiClient';
import type { IDataForManuellJournalføring } from '@typer/manuell-journalføring';

export async function hentDataForManuellJournalføring(oppgaveId: string) {
    return apiClient.get<void, IDataForManuellJournalføring>({
        url: `/familie-ba-sak/api/oppgave/${oppgaveId}`,
    });
}
