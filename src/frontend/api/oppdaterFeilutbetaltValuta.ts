import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import { RessursResolver } from '../utils/ressursResolver';

export interface OppdaterFeilutbetaltValutaPayload {
    fom: string;
    tom: string;
    feilutbetaltBeløp: number;
}

export async function oppdaterFeilutbetaltValuta(
    request: FamilieRequest,
    behandlingId: number,
    feilutbetaltValutaId: number,
    payload: OppdaterFeilutbetaltValutaPayload
) {
    const ressurs = await request<OppdaterFeilutbetaltValutaPayload, IBehandling>({
        method: 'PUT',
        url: `/familie-ba-sak/api/feilutbetalt-valuta/behandling/${behandlingId}/periode/${feilutbetaltValutaId}`,
        data: payload,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
