import { IFagsak } from '../typer/fagsak';
import { Ressurs } from '../typer/ressurs';
import { ISaksbehandler } from '../typer/saksbehandler';
import { axiosRequest } from './axios';
import { IVilkårResultat } from '../typer/vilkår';
import { IPersonBeregning } from '../typer/behandle';
import {
    BehandlingKategori,
    BehandlingResultat,
    Behandlingstype,
    BehandlingUnderkategori,
} from '../typer/behandling';
import { datoformat, formaterIsoDato } from '../utils/formatter';

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
    personBeregninger: IPersonBeregning[];
}

export const apiOpprettBeregning = (fagsak: IFagsak, data: IOpprettBeregningData) => {
    const dataTilKalkulator = data.personBeregninger.map(beregning => ({
        personident: beregning.personident,
        ytelsetype: beregning.ytelseType,
        halvytelse: beregning.deltYtelse,
        stønadFom: formaterIsoDato(beregning.stønadFom, datoformat.ISO_MÅNED),
        stønadTom: formaterIsoDato(beregning.stønadTom, datoformat.ISO_MÅNED),
    }));
    const dataTilIverksetting = {
        personBeregninger: data.personBeregninger.map(beregning => ({
            ident: beregning.personident,
            beløp: beregning.beløp,
            stønadFom: beregning.stønadFom,
        })),
    };
    const vedtakId = aktivVedtak(fagsak)?.id;
    axiosRequest<IFagsak>({
        data: dataTilKalkulator,
        method: 'PUT',
        url: `/familie-ba-sak/api/kalkulator`,
    });
    return axiosRequest<IFagsak>({
        data: dataTilIverksetting,
        method: 'PUT',
        url: `/familie-ba-sak/api/vedtak/${vedtakId}/beregning`,
    });
};
