import { IPersonBeregning } from '../typer/behandle';
import {
    BehandlingKategori,
    BehandlingResultat,
    Behandlingstype,
    BehandlingUnderkategori,
} from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import { Resultat, VilkårType } from '../typer/vilkår';

export const aktivBehandling = (fagsak: IFagsak) => fagsak.behandlinger.find(b => b.aktiv);

export const aktivVedtak = (fagsak: IFagsak) =>
    aktivBehandling(fagsak)?.vedtakForBehandling.find(v => v.aktiv);

export interface IOpprettEllerHentFagsakData {
    personIdent: string;
}

export interface IOpprettBehandlingData {
    behandlingType: Behandlingstype;
    søkersIdent: string;
    kategori: BehandlingKategori;
    underkategori: BehandlingUnderkategori;
}

export interface IRestVilkårsvurdering {
    brevType: BehandlingResultat;
    periodeResultater: IRestPeriodeResultat[];
    begrunnelse: string;
}

export interface IRestPeriodeResultat {
    personIdent: string;
    periodeFom: string | undefined;
    periodeTom: string | undefined;
    vilkårResultater: IRestVilkårResultat[];
}

export interface IRestVilkårResultat {
    vilkårType: VilkårType;
    resultat: Resultat;
}

export interface IOpprettBeregningData {
    personBeregninger: IPersonBeregning[];
}
