import { AxiosResponse } from 'axios';

import { ISaksbehandler } from '@navikt/familie-typer';

import { preferredAxios } from './axios';

export const hentInnloggetBruker = (): Promise<ISaksbehandler> => {
    return preferredAxios.get(`/user/profile`).then((response: AxiosResponse) => {
        return response.data;
    });
};
