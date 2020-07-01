import { ISaksbehandler } from '@navikt/familie-typer';
import { preferredAxios } from './axios';
import { AxiosResponse } from 'axios';

export const hentInnloggetBruker = (): Promise<ISaksbehandler> => {
    return preferredAxios.get(`/user/profile`).then((response: AxiosResponse) => {
        return response.data;
    });
};
