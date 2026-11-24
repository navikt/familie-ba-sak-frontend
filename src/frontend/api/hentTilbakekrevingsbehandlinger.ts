import { apiClient } from '@api/client/apiClient';
import type { FagsakId } from '@typer/fagsak';
import type { ITilbakekrevingsbehandling } from '@typer/tilbakekrevingsbehandling';

export async function hentTilbakekrevingsbehandlinger(fagsakId: FagsakId): Promise<ITilbakekrevingsbehandling[]> {
    return apiClient.get<void, ITilbakekrevingsbehandling[]>({
        url: `/familie-ba-sak/api/tilbakekreving/fagsak/${fagsakId}`,
        timeout: 10000,
    });
}
