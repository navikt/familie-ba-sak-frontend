import { Ressurs } from '../typer/ressurs';
import { ISaksbehandler } from '../typer/saksbehandler';
import { axiosRequest } from './axios';
import { IFagsak } from '../typer/fagsak';

export interface IVedtaksBrev {
    content: string;
}

export const hentVedtaksbrev = (
    fagsak: IFagsak,
    innloggetSaksbehandler?: ISaksbehandler
): Promise<Ressurs<IVedtaksBrev>> => {
    //TODO: get active behandling ID
    const behandlingId = -1;

    return axiosRequest<IVedtaksBrev>(
        {
            method: 'GET',
            url: `/familie-ba-sak/api/behandling/${behandlingId}/vedtak-html`,
        },
        innloggetSaksbehandler
    );
};
