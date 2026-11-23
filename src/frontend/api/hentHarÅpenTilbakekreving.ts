import { apiClient } from '@api/client/apiClient';
import type { FagsakId } from '@typer/fagsak';

export async function hentHarÅpenTilbakekreving(fagsakId: FagsakId): Promise<boolean> {
    return apiClient.get<void, boolean>({
        url: `/familie-ba-sak/api/fagsaker/${fagsakId}/har-apen-tilbakekreving`,
    });
}
