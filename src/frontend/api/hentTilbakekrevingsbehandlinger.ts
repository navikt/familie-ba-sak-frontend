import { apiClient } from '@api/client/apiClient';
import type { ITilbakekrevingsbehandling } from '@typer/tilbakekrevingsbehandling';

export async function hentTilbakekrevingsbehandlinger(fagsakId: number): Promise<ITilbakekrevingsbehandling[]> {
    return apiClient.get<void, ITilbakekrevingsbehandling[]>({
        url: `/familie-ba-sak/api/tilbakekreving/fagsak/${fagsakId}`,
        timeout: 10000,
    });
}
