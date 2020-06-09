import { ISaksbehandler } from '../typer/saksbehandler';
import { preferredAxios } from './axios';
import { AxiosResponse } from 'axios';

export const hentInnloggetBruker = (): Promise<ISaksbehandler> => {
    return preferredAxios.get(`/user/profile`).then((response: AxiosResponse) => {
        return response.data;
    });
};
