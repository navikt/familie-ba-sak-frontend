import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { FagsakType, IMinimalFagsak } from '../typer/fagsak';
import type { IInstitusjon } from '../typer/institusjon';
import { RessursResolver } from '../utils/ressursResolver';

export interface OpprettFagsakPayload {
    personIdent: string;
    fagsakType: FagsakType;
    institusjon: IInstitusjon | null;
}

export async function opprettFagsak(request: FamilieRequest, payload: OpprettFagsakPayload) {
    const ressurs = await request<OpprettFagsakPayload, IMinimalFagsak>({
        data: payload,
        method: 'POST',
        url: `/familie-ba-sak/api/fagsaker`,
        påvirkerSystemLaster: true,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
