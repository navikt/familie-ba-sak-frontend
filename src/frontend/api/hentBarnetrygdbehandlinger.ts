import { apiClient } from '@api/client/apiClient';

import type { VisningBehandling } from '@sider/Fagsak/Saksoversikt/visningBehandling';

export async function hentBarnetrygdbehandlinger(fagsakId: number): Promise<VisningBehandling[]> {
    return apiClient.get<void, VisningBehandling[]>({
        url: `/familie-ba-sak/api/behandlinger/fagsak/${fagsakId}`,
    });
}
