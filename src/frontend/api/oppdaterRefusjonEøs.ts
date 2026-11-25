import { apiClient } from '@api/client/apiClient';
import type { IRestRefusjonEøs } from '@typer/refusjon-eøs';

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
    return apiClient.put<OppdaterRefusjonEøsPayload, IRestRefusjonEøs[]>({
        url: `/familie-ba-sak/api/refusjon-eøs/behandlinger/${behandlingId}/perioder/${refusjonEøsId}`,
        data: payload,
    });
}
