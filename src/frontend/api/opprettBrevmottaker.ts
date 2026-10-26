import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { Brevmottaker } from '@typer/brevmottaker';

interface PathParams {
    behandlingId: number;
}

export type OpprettBrevmottakerPayload = Brevmottaker;

export async function opprettBrevmottaker(pathParams: PathParams, payload: OpprettBrevmottakerPayload) {
    const { behandlingId } = pathParams;
    return apiClient.post<OpprettBrevmottakerPayload, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/brevmottaker/${behandlingId}`,
    });
}
