import { IBarnBeregning } from '../typer/behandle';
import {
    BehandlingKategori,
    BehandlingResultat,
    Behandlingstype,
    BehandlingUnderkategori,
} from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import { Ressurs } from '../typer/ressurs';
import { ISaksbehandler } from '../typer/saksbehandler';
import { IVilkårResultat } from '../typer/vilkår';
import { axiosRequest } from './axios';

export const aktivBehandling = (fagsak: IFagsak) => fagsak.behandlinger.find(b => b.aktiv);

export const aktivVedtak = (fagsak: IFagsak) =>
    aktivBehandling(fagsak)?.vedtakForBehandling.find(v => v.aktiv);

export const apiOpprettFagsak = (
    data: IOpprettFagsakData,
    innloggetSaksbehandler?: ISaksbehandler
) => {
    return axiosRequest<IFagsak>(
        {
            data,
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker`,
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
            url: `/familie-ba-sak/api/fagsaker/${id}`,
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
            url: '/familie-ba-sak/api/fagsaker',
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
    søkersIdent: string;
    kategori: BehandlingKategori;
    underkategori: BehandlingUnderkategori;
}

export const apiOpprettBehandling = (data: IOpprettBehandlingData) => {
    return axiosRequest<IFagsak>({
        data,
        method: 'POST',
        url: '/familie-ba-sak/api/behandlinger',
    });
};

export interface IRestVilkårsvurdering {
    resultat: BehandlingResultat;
    samletVilkårResultat: IVilkårResultat[];
    begrunnelse: string;
}

export const apiOpprettEllerOppdaterVedtak = (fagsakId: number, data: IRestVilkårsvurdering) => {
    return axiosRequest<IFagsak>({
        data,
        method: 'PUT',
        url: `/familie-ba-sak/api/fagsaker/${fagsakId}/vedtak`,
    });
};

export interface IOpprettBeregningData {
    barnasBeregning: IBarnBeregning[];
}

export const apiOpprettBeregning = (fagsak: IFagsak, data: any) => {
    const vedtakId = aktivVedtak(fagsak)?.id;

    return axiosRequest<IFagsak>({
        data,
        method: 'PUT',
        url: `/familie-ba-sak/api/vedtak/${vedtakId}/beregning`,
    });
};
