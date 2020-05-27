import { IPersonBeregning } from '../typer/beregning';
import {
    BehandlingKategori,
    Behandlingstype,
    BehandlingUnderkategori,
    IBehandling,
} from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import { IRestPersonResultat } from '../typer/vilkår';

export const aktivBehandling = (fagsak: IFagsak) => fagsak.behandlinger.find(b => b.aktiv);

export const aktivVedtak = (fagsak: IFagsak) =>
    aktivBehandling(fagsak)?.vedtakForBehandling.find(v => v.aktiv);

export const aktivVedtakPåBehandling = (behandling?: IBehandling) =>
    behandling?.vedtakForBehandling.find(v => v.aktiv);

export interface IOpprettEllerHentFagsakData {
    personIdent: string | null;
    aktørId: string | null;
}

export interface IOpprettBehandlingData {
    behandlingType: Behandlingstype;
    søkersIdent: string;
    kategori: BehandlingKategori;
    underkategori: BehandlingUnderkategori;
}

export interface IRestVilkårsvurdering {
    personResultater: IRestPersonResultat[];
}

export interface IOpprettBeregningData {
    personBeregninger: IPersonBeregning[];
}
