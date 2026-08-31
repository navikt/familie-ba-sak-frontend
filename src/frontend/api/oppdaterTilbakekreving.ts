import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { ITilbakekreving } from '@typer/simulering';

interface PathParams {
    behandlingId: number;
}

export function oppdaterTilbakekreving(pathParams: PathParams, payload: ITilbakekreving | undefined) {
    const { behandlingId } = pathParams;
    return apiClient.post<ITilbakekreving | undefined, IBehandling>({
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/steg/tilbakekreving`,
        data: payload,
    });
}
