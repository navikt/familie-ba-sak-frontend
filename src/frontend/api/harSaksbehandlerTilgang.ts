import { apiClient } from '@api/client/apiClient';
import type { IRestTilgang } from '@typer/person';

export interface HarSaksbehandlerTilgangPayload {
    brukerIdent: string;
}

export async function harSaksbehandlerTilgang(payload: HarSaksbehandlerTilgangPayload) {
    return apiClient.post<HarSaksbehandlerTilgangPayload, IRestTilgang>({
        data: payload,
        url: '/familie-ba-sak/api/tilgang',
    });
}
