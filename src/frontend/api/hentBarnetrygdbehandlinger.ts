import { apiClient } from '@api/client/apiClient';
import type { VisningBehandling } from '@sider/Fagsak/Saksoversikt/visningBehandling';
import type { FagsakId } from '@typer/fagsak';

export async function hentBarnetrygdbehandlinger(fagsakId: FagsakId): Promise<VisningBehandling[]> {
    return apiClient.get<void, VisningBehandling[]>({
        url: `/familie-ba-sak/api/behandlinger/fagsak/${fagsakId}`,
    });
}
