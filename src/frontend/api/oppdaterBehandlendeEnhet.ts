import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { IRestEndreBehandlendeEnhet } from '@typer/enhet';

export interface OppdaterBehandlendeEnhetPayload {
    enhetId: string;
    begrunnelse: string;
}

export async function oppdaterBehandlendeEnhet(behandlingId: number, payload: OppdaterBehandlendeEnhetPayload) {
    return apiClient.put<IRestEndreBehandlendeEnhet, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/arbeidsfordeling/${behandlingId}`,
    });
}
