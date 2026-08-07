import { apiClient } from '@api/client/apiClient';
import type { IsoDatoString } from '@utils/dato';

export interface OpprettKlagebehandlingPayload {
    klageMottattDato: IsoDatoString;
}

export async function opprettKlagebehandling(payload: OpprettKlagebehandlingPayload, fagsakId: number) {
    return apiClient.post<OpprettKlagebehandlingPayload, number>({
        data: payload,
        url: `/familie-ba-sak/api/fagsaker/${fagsakId}/opprett-klagebehandling`,
    });
}
