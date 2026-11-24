import { apiClient } from '@api/client/apiClient';
import type { IRestRefusjonEøs } from '@typer/refusjon-eøs';

export interface OpprettRefusjonEøsPayload {
    fom: string;
    tom: string;
    refusjonsbeløp: number;
    land: string;
    refusjonAvklart: boolean;
}

export async function opprettRefusjonEøs(behandlingId: number, payload: OpprettRefusjonEøsPayload) {
    return apiClient.post<OpprettRefusjonEøsPayload, IRestRefusjonEøs[]>({
        url: `/familie-ba-sak/api/refusjon-eøs/behandlinger/${behandlingId}`,
        data: payload,
    });
}
