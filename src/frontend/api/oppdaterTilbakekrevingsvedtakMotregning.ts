import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { OppdaterTilbakekrevingsvedtakMotregningDTO } from '@typer/tilbakekrevingsvedtakMotregning';

interface PathParams {
    behandlingId: number;
}

export function oppdaterTilbakekrevingsvedtakMotregning(
    pathParams: PathParams,
    payload: OppdaterTilbakekrevingsvedtakMotregningDTO
) {
    const { behandlingId } = pathParams;
    return apiClient.patch<OppdaterTilbakekrevingsvedtakMotregningDTO, IBehandling>({
        url: `/familie-ba-sak/api/behandling/${behandlingId}/tilbakekrevingsvedtak-motregning`,
        data: payload,
    });
}
