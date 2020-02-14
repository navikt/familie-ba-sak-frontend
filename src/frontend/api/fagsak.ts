import {
    IFagsak,
    Behandlingstype,
    BehandlingKategori,
    BehandlingUnderkategori,
    VedtakResultat,
} from '../typer/fagsak';
import { Ressurs } from '../typer/ressurs';
import { ISaksbehandler } from '../typer/saksbehandler';
import { axiosRequest } from './axios';

export const hentFagsak = (
    id: string,
    innloggetSaksbehandler?: ISaksbehandler
): Promise<Ressurs<IFagsak>> => {
    if (window.location.host.includes('preprod')) {
        axiosRequest({ method: 'GET', url: '/familie-ba-sak/api/fagsak' });
    }

    return axiosRequest<IFagsak>(
        {
            method: 'GET',
            url: `/familie-ba-sak/api/fagsak/${id}`,
        },
        innloggetSaksbehandler
    );
};

export const hentFagsaker = (
    filter: string,
    innloggetSaksbehandler?: ISaksbehandler
): Promise<Ressurs<IFagsak[]>> => {
    return axiosRequest(
        {
            headers: {
                filter,
            },
            method: 'GET',
            url: '/familie-ba-sak/api/fagsak',
        },
        innloggetSaksbehandler
    );
};

export interface IOpprettBehandlingData {
    barnasFødselsnummer: string[];
    behandlingType: Behandlingstype;
    fødselsnummer: string;
    kategori: BehandlingKategori;
    underkategori: BehandlingUnderkategori;
}

export const apiOpprettBehandling = (data: IOpprettBehandlingData) => {
    return axiosRequest<IFagsak>({
        data,
        method: 'POST',
        url: '/familie-ba-sak/api/behandling/opprett',
    });
};

export interface IOpprettVedtakData {
    resultat: VedtakResultat;
}

export const apiOpprettVedtak = (fagsakId: number, data: IOpprettVedtakData) => {
    return axiosRequest<IFagsak>({
        data,
        method: 'POST',
        url: `/familie-ba-sak/api/fagsak/${fagsakId}/nytt-vedtak`,
    });
};
