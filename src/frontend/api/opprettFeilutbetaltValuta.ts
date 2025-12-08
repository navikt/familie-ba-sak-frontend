import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import { RessursResolver } from '../utils/ressursResolver';

export interface OpprettFeilutbetaltValutaPayload {
    fom: string;
    tom: string;
    feilutbetaltBeløp: number;
}

export async function opprettFeilutbetaltValuta(
    request: FamilieRequest,
    behandlingId: number,
    payload: OpprettFeilutbetaltValutaPayload
) {
    const ressurs = await request<OpprettFeilutbetaltValutaPayload, IBehandling>({
        method: 'POST',
        url: `/familie-ba-sak/api/feilutbetalt-valuta/behandling/${behandlingId}`,
        data: payload,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
