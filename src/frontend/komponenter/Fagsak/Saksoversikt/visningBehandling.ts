import {
    BehandlingResultat,
    BehandlingStatus,
    Behandlingstype,
    BehandlingÅrsak,
} from '../../../typer/behandling';
import { BehandlingKategori, BehandlingUnderkategori } from '../../../typer/behandlingstema';
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
