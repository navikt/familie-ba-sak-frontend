import { IPersonBeregning } from '../typer/beregning';
import {
    BehandlingKategori,
    Behandlingstype,
    BehandlingUnderkategori,
    IBehandling,
} from '../typer/behandling';
import { IRestPersonResultat } from '../typer/vilkår';

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
