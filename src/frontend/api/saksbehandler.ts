import { ISaksbehandler } from '../typer/saksbehandler';
import { preferredAxios } from './axios';

export const hentInnloggetBruker = (): Promise<ISaksbehandler> => {
    return preferredAxios.get(`/user/profile`).then(response => {
        return response.data;
    });
};
