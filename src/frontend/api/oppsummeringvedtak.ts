import { IFagsak } from '../typer/fagsak';
import { Ressurs } from '../typer/ressurs';
import { ISaksbehandler } from '../typer/saksbehandler';
import { axiosRequest } from './axios';
import { aktivVedtak } from './fagsak';

export const hentAktivVedtaksbrev = (
    fagsak: IFagsak,
    innloggetSaksbehandler?: ISaksbehandler
): Promise<Ressurs<string>> => {
    const vedtak = aktivVedtak(fagsak);
    console.log(fagsak);
    console.log(vedtak);
    return axiosRequest<string>(
        {
            method: 'GET',
            url: `/familie-ba-sak/api/dokument/vedtak-html/${vedtak?.id}`,
        },
        innloggetSaksbehandler
    );
};
