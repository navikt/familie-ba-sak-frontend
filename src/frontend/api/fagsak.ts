import { IPersonBeregning } from '../typer/behandle';
import { BehandlingKategori, Behandlingstype, BehandlingUnderkategori } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import { IRestPersonResultat } from '../typer/vilkår';

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
    personResultater: IRestPersonResultat[];
}

export interface IOpprettBeregningData {
    personBeregninger: IPersonBeregning[];
}
