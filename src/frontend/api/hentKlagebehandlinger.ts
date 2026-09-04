import { apiClient } from '@api/client/apiClient';
import type { IKlagebehandling } from '@typer/klage';

export async function hentKlagebehandlinger(fagsakId: number): Promise<IKlagebehandling[]> {
    return apiClient.get<void, IKlagebehandling[]>({
        url: `/familie-ba-sak/api/fagsaker/${fagsakId}/hent-klagebehandlinger`,
        timeout: 10000,
    });
}
