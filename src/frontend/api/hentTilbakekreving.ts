import { apiClient } from '@api/client/apiClient';
import type { ITilbakekreving } from '@typer/simulering';

export async function hentTilbakekreving(behandlingId: number): Promise<ITilbakekreving | null> {
    return apiClient.get<void, ITilbakekreving | null>({
        url: `/familie-ba-sak/api/tilbakekreving/behandling/${behandlingId}`,
    });
}
