import { AxiosResponse } from 'axios';

import { preferredAxios } from '@navikt/familie-http';
import { ISaksbehandler } from '@navikt/familie-typer';

export const hentInnloggetBruker = (): Promise<ISaksbehandler> => {
    return preferredAxios.get(`/user/profile`).then((response: AxiosResponse) => {
        return response.data;
    });
};
