import { apiClient } from '@api/client/apiClient';
import type { TilbakekrevingsvedtakMotregningDTO } from '@typer/tilbakekrevingsvedtakMotregning';

export async function hentTilbakekrevingsvedtakMotregning(
    behandlingId: number
): Promise<TilbakekrevingsvedtakMotregningDTO | null> {
    return apiClient.get<void, TilbakekrevingsvedtakMotregningDTO | null>({
        url: `/familie-ba-sak/api/behandling/${behandlingId}/tilbakekrevingsvedtak-motregning`,
    });
}
