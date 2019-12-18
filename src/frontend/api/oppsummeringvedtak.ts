import { IFagsak } from '../typer/fagsak';
import { Ressurs, RessursStatus } from '../typer/ressurs';
import { ISaksbehandler } from '../typer/saksbehandler';
import { axiosRequest } from './axios';

export const hentAktivVedtaksbrev = (
    fagsak: IFagsak,
    innloggetSaksbehandler?: ISaksbehandler
): Promise<Ressurs<string>> => {
    const aktivBehandling = fagsak.behandlinger.find(b => b.aktiv);

    if (aktivBehandling === undefined) {
        return new Promise(resolve =>
            resolve({
                melding: 'Internal Error: No active behandling',
                status: RessursStatus.FEILET,
            })
        );
    }

    return axiosRequest<string>(
        {
            method: 'GET',
            url: `/familie-ba-sak/api/behandling/${aktivBehandling.behandlingId}/vedtak-html`,
        },
        innloggetSaksbehandler
    );
};
