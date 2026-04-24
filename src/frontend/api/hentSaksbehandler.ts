import { preferredAxios } from '@navikt/familie-http';
import type { ISaksbehandler } from '@navikt/familie-typer';

export async function hentSaksbehandler(): Promise<ISaksbehandler> {
    const response = await preferredAxios.get<ISaksbehandler>(`/user/profile`);
    return response.data;
}
