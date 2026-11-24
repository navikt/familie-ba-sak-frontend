import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';
import type { FagsakId, IMinimalFagsak } from '@typer/fagsak';

import { RessursResolver } from '../utils/ressursResolver';

export interface LåsOppFagsakPayload {
    begrunnelse: string;
}

export async function låsOppFagsak(request: FamilieRequest, fagsakId: FagsakId, payload: LåsOppFagsakPayload) {
    const ressurs = await request<LåsOppFagsakPayload, IMinimalFagsak>({
        data: payload,
        method: 'PATCH',
        url: `/familie-ba-sak/api/fagsaker/${fagsakId}/laas-opp`,
        påvirkerSystemLaster: false,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
