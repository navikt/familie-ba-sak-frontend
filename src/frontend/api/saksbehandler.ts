import { preferredAxios } from '@navikt/familie-http';
import type { ISaksbehandler } from '@navikt/familie-typer';

export const hentInnloggetBruker = async (): Promise<ISaksbehandler> => {
    const svar = await preferredAxios.get<ISaksbehandler>(`/user/profile`);
    return svar.data;
};
