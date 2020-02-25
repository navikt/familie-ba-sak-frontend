import { ISaksbehandler } from '../typer/saksbehandler';
import { preferredAxios } from './axios';

export const hentInnloggetBruker = (): Promise<ISaksbehandler> => {
    return preferredAxios.get(`/user/profile`).then(response => {
        return response.data;
    });
};

export const hentBrukerEnhet = (): Promise<string> => {
    return preferredAxios.get(`/user/enhet`).then(response => {
        return response.data;
    });
};
