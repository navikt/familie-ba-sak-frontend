import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export interface OppdaterRefusjonEøsPayload {
    fom: string;
    tom: string;
    refusjonsbeløp: number;
    land: string;
    refusjonAvklart: boolean;
}

export async function oppdaterRefusjonEøs(
    behandlingId: number,
    refusjonEøsId: number,
    payload: OppdaterRefusjonEøsPayload
) {
    return apiClient.put<OppdaterRefusjonEøsPayload, IBehandling>({
        url: `/familie-ba-sak/api/refusjon-eøs/behandlinger/${behandlingId}/perioder/${refusjonEøsId}`,
        data: payload,
    });
}
