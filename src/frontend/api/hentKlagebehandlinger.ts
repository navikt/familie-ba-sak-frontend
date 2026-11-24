import { apiClient } from '@api/client/apiClient';
import type { FagsakId } from '@typer/fagsak';
import type { IKlagebehandling } from '@typer/klage';

export async function hentKlagebehandlinger(fagsakId: FagsakId): Promise<IKlagebehandling[]> {
    return apiClient.get<void, IKlagebehandling[]>({
        url: `/familie-ba-sak/api/fagsaker/${fagsakId}/hent-klagebehandlinger`,
        timeout: 10000,
    });
}
