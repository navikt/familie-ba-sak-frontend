import type { IManueltBrevRequestPåFagsak } from '@typer/dokument';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

export async function forhåndsvisBrevPåFagsak(
    request: FamilieRequest,
    fagsakId: number,
    payload: IManueltBrevRequestPåFagsak
): Promise<string> {
    const ressurs = await request<IManueltBrevRequestPåFagsak, string>({
        method: 'POST',
        data: payload,
        url: `/familie-ba-sak/api/dokument/fagsak/${fagsakId}/forhaandsvis-brev`,
        påvirkerSystemLaster: false,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
