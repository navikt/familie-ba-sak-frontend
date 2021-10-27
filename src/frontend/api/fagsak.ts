import { Behandlingstype, BehandlingÅrsak, IBehandling } from '../typer/behandling';
import { BehandlingKategori, BehandlingUnderkategori } from '../typer/behandlingstema';

export const aktivVedtakPåBehandling = (behandling?: IBehandling) =>
    behandling?.vedtakForBehandling.find(v => v.aktiv);

export interface IOpprettEllerHentFagsakData {
    personIdent: string | null;
    aktørId: string | null;
}

export interface IOpprettBehandlingData {
    behandlingType: Behandlingstype;
    behandlingÅrsak: BehandlingÅrsak;
    kategori: BehandlingKategori;
    navIdent?: string;
    søkersIdent: string;
    underkategori: BehandlingUnderkategori;
}
