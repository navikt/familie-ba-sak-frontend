import { preferredAxios } from '@navikt/familie-http';
import type { ISaksbehandler } from '@navikt/familie-typer';

import type { Saksbehandler } from '../typer/saksbehandler';

export async function hentSaksbehandler(): Promise<Saksbehandler> {
    const response = await preferredAxios.get<ISaksbehandler>(`/user/profile`);
    return {
        ...response.data,
        groups: response.data.groups ?? [],
    };
}
