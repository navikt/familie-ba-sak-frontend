import type { IManueltBrevRequestPåFagsak } from '@typer/dokument';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

export async function sendInformasjonsbrev(
    request: FamilieRequest,
    fagsakId: number,
    payload: IManueltBrevRequestPåFagsak
): Promise<void> {
    const ressurs = await request<IManueltBrevRequestPåFagsak, void>({
        method: 'POST',
        data: payload,
        url: `/familie-ba-sak/api/dokument/fagsak/${fagsakId}/send-brev`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
