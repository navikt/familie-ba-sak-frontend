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

export interface VisningBehandling {
    aktiv: boolean;
    behandlingId: number | string;
    kategori?: BehandlingKategori;
    opprettetTidspunkt: string;
    resultat?: BehandlingResultat | TilbakekrevingsbehandlingResultat;
    status: BehandlingStatus;
    type: Behandlingstype | Tilbakekrevingsbehandlingstype;
    underkategori?: BehandlingUnderkategori;
    vedtaksdato: string;
    årsak?: BehandlingÅrsak | TilbakekrevingsbehandlingÅrsak;
}
