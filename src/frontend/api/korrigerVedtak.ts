import type { IBehandling } from '@typer/behandling';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

export interface KorrigerVedtakPayload {
    vedtaksdato: string;
    begrunnelse: string;
}

export async function korrigerVedtak(request: FamilieRequest, payload: KorrigerVedtakPayload, behandlingId: number) {
    const ressurs = await request<KorrigerVedtakPayload, IBehandling>({
        data: payload,
        method: 'POST',
        url: `/familie-ba-sak/api/korrigertvedtak/behandling/${behandlingId}`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
