import { apiClient } from '@api/client/apiClient';
import type { ManuellJournalføring } from '@sider/ManuellJournalføring/journalføring';

export function journalfør(
    payload: ManuellJournalføring,
    journalpostId: string,
    oppgaveId: string,
    saksbehandlerEnhet: string
) {
    return apiClient.post({
        data: payload,
        url: `/familie-ba-sak/api/journalpost/${journalpostId}/journalfør/${oppgaveId}?journalfoerendeEnhet=${saksbehandlerEnhet ?? '9999'}`,
    });
}
