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
import { IVilkårResultat } from '../typer/vilkår';
import { IBarnBeregning } from '../typer/behandle';

export const apiOpprettFagsak = (
    data: IOpprettFagsakData,
    innloggetSaksbehandler?: ISaksbehandler
) => {
    return axiosRequest<IFagsak>(
        {
            data,
            method: 'POST',
            url: `/familie-ba-sak/api/fagsak/ny-fagsak`,
        },
        innloggetSaksbehandler
    );
};

export const hentFagsak = (
    id: string,
    innloggetSaksbehandler?: ISaksbehandler
): Promise<Ressurs<IFagsak>> => {
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

export interface IOpprettFagsakData {
    personIdent: string;
}

export interface IOpprettBehandlingData {
    barnasIdenter: string[];
    behandlingType: Behandlingstype;
    ident: string;
    kategori: BehandlingKategori;
    underkategori: BehandlingUnderkategori;
}

export const apiOpprettBehandling = (data: IOpprettBehandlingData) => {
    return axiosRequest<IFagsak>({
        data,
        method: 'POST',
        url: '/familie-ba-sak/api/behandling/ny-behandling',
    });
};

export interface IOpprettVedtakData {
    resultat: VedtakResultat;
    samletVilkårResultat: IVilkårResultat[];
    begrunnelse: string;
}

export const apiOpprettVedtak = (fagsakId: number, data: IOpprettVedtakData) => {
    return axiosRequest<IFagsak>({
        data,
        method: 'POST',
        url: `/familie-ba-sak/api/fagsak/${fagsakId}/nytt-vedtak`,
    });
};

export interface IOpprettBeregningData {
    barnasBeregning: IBarnBeregning[];
}

export const apiOpprettBeregning = (fagsakId: number, data: any) => {
    return axiosRequest<IFagsak>({
        data,
        method: 'POST',
        url: `/familie-ba-sak/api/fagsak/${fagsakId}/oppdater-vedtak-beregning`,
    });
};
