import { IFagsak } from '../typer/fagsak';
import { Ressurs, RessursStatus } from '../typer/ressurs';
import { ISaksbehandler } from '../typer/saksbehandler';
import { axiosRequest } from './axios';

export interface IVedtaksBrev {
    content: string;
}

export const hentVedtaksbrev = (
    fagsak: IFagsak,
    innloggetSaksbehandler?: ISaksbehandler
): Promise<Ressurs<IVedtaksBrev>> => {
    console.log(fagsak);

    const aktivBehandling = fagsak.behandlinger.find(b => b.aktiv);

    if (aktivBehandling === undefined) {
        return new Promise(resolve =>
            resolve({
                status: RessursStatus.FEILET,
                melding: 'Internal Error: No active behandling',
            })
        );
    }

    return axiosRequest<IVedtaksBrev>(
        {
            method: 'GET',
            url: `/familie-ba-sak/api/behandling/${aktivBehandling.behandlingId}/vedtak-html`,
        },
        innloggetSaksbehandler
    );
};
