import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import { RessursResolver } from '../utils/ressursResolver';

export interface OppdaterRefusjonEøsPayload {
    fom: string;
    tom: string;
    refusjonsbeløp: number;
    land: string;
    refusjonAvklart: boolean;
}

export async function oppdaterRefusjonEøs(
    request: FamilieRequest,
    behandlingId: number,
    refusjonEøsId: number,
    payload: OppdaterRefusjonEøsPayload
) {
    const ressurs = await request<OppdaterRefusjonEøsPayload, IBehandling>({
        method: 'PUT',
        url: `/familie-ba-sak/api/refusjon-eøs/behandlinger/${behandlingId}/perioder/${refusjonEøsId}`,
        data: payload,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
