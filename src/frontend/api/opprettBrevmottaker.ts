import { apiClient } from '@api/client/apiClient';
import type { Brevmottaker, BrevmottakerBehandling } from '@typer/brevmottaker';

interface PathParams {
    behandlingId: number;
}

export type OpprettBrevmottakerPayload = Brevmottaker;

export async function opprettBrevmottaker(pathParams: PathParams, payload: OpprettBrevmottakerPayload) {
    const { behandlingId } = pathParams;
    return apiClient.post<OpprettBrevmottakerPayload, BrevmottakerBehandling[]>({
        data: payload,
        url: `/familie-ba-sak/api/brevmottaker/${behandlingId}`,
    });
}
