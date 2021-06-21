import {
    BehandlingKategori,
    BehandlingResultat,
    BehandlingStatus,
    Behandlingstype,
    BehandlingUnderkategori,
    BehandlingÅrsak,
} from '../../../typer/behandling';
import {
    TilbakekrevingsbehandlingResultat,
    Tilbakekrevingsbehandlingstype,
    TilbakekrevingsbehandlingÅrsak,
} from '../../../typer/tilbakekrevingsbehandling';

export interface VisningVedtakForBehandling {
    aktiv: boolean;
    vedtaksdato: string;
}

export interface VisningBehandling {
    aktiv: boolean;
    behandlingId: number | string;
    type: Behandlingstype | Tilbakekrevingsbehandlingstype;
    opprettetTidspunkt: string;
    resultat?: BehandlingResultat | TilbakekrevingsbehandlingResultat;
    status: BehandlingStatus;
    årsak?: BehandlingÅrsak | TilbakekrevingsbehandlingÅrsak;
    vedtakForBehandling: VisningVedtakForBehandling[];
    kategori?: BehandlingKategori;
    underkategori?: BehandlingUnderkategori;
}
