import { apiClient } from '@api/client/apiClient';
import type { Adressebeskyttelsegradering } from '@typer/person';

export interface Tilgangsresultat {
    saksbehandlerHarTilgang: boolean;
    adressebeskyttelsegradering: Adressebeskyttelsegradering;
}

interface Payload {
    brukerIdent: string;
}

export async function sjekkSaksbehandlertilgangTilIdent(payload: Payload): Promise<Tilgangsresultat> {
    return apiClient.post<Payload, Tilgangsresultat>({
        url: '/familie-ba-sak/api/tilgang',
        data: payload,
    });
}
