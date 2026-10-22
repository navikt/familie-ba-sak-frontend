import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { Brevmottaker } from '@typer/brevmottaker';

export type OpprettBrevmottakerPayload = Brevmottaker;

export async function opprettBrevmottaker(behandlingId: number, payload: OpprettBrevmottakerPayload) {
    return apiClient.post<OpprettBrevmottakerPayload, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/brevmottaker/${behandlingId}`,
    });
}
