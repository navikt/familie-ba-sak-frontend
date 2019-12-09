import { Ressurs } from '../typer/ressurs';
import { ISaksbehandler } from '../typer/saksbehandler';
import { axiosRequest } from './axios';

export interface IVedtaksBrev {
    content: string;
}

export const hentVedtaksbrev = (
    fagsakId: number,
    innloggetSaksbehandler?: ISaksbehandler
): Promise<Ressurs<IVedtaksBrev>> => {
    return axiosRequest<IVedtaksBrev>(
        {
            method: 'GET',
            url: `/familie-ba-sak/api/vedtaksbrev/${fagsakId}`,
        },
        innloggetSaksbehandler
    );
};
