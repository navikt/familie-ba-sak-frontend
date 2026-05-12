import type { IRestTilgang } from '@typer/person';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

export interface HarSaksbehandlerTilgangPayload {
    brukerIdent: string;
}

export const harSaksbehandlerTilgang = async (request: FamilieRequest, brukerIdent: string) => {
    const ressurs = await request<HarSaksbehandlerTilgangPayload, IRestTilgang>({
        data: { brukerIdent: brukerIdent },
        method: 'POST',
        url: '/familie-ba-sak/api/tilgang',
    });
    return RessursResolver.resolveToPromise(ressurs);
};
