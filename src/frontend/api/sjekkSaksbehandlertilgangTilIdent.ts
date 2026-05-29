import type { Adressebeskyttelsegradering } from '@typer/person';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

export interface Tilgangsresultat {
    saksbehandlerHarTilgang: boolean;
    adressebeskyttelsegradering: Adressebeskyttelsegradering;
}

interface Payload {
    brukerIdent: string;
}

export async function sjekkSaksbehandlertilgangTilIdent(request: FamilieRequest, payload: Payload) {
    const ressurs = await request<Payload, Tilgangsresultat>({
        method: 'POST',
        url: '/familie-ba-sak/api/tilgang',
        data: payload,
        påvirkerSystemLaster: false,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
