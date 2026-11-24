import { apiClient } from '@api/client/apiClient';
import type { FagsakId } from '@typer/fagsak';

export async function opprettTilbakekreving(fagsakId: FagsakId) {
    return apiClient.get<void, string>({
        url: `/familie-ba-sak/api/fagsaker/${fagsakId}/opprett-tilbakekreving`,
    });
}
