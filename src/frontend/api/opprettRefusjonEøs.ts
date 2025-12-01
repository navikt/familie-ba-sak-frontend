import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import { RessursResolver } from '../utils/ressursResolver';

export interface OpprettRefusjonEøsPayload {
    fom: string;
    tom: string;
    refusjonsbeløp: number;
    land: string;
    refusjonAvklart: boolean;
}

export async function opprettRefusjonEøs(
    request: FamilieRequest,
    behandlingId: number,
    payload: OpprettRefusjonEøsPayload
) {
    const ressurs = await request<OpprettRefusjonEøsPayload, IBehandling>({
        method: 'POST',
        url: `/familie-ba-sak/api/refusjon-eøs/behandlinger/${behandlingId}`,
        data: payload,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
