import {
    BehandlingKategori,
    BehandlingResultat,
    BehandlingStatus,
    Behandlingstype,
    BehandlingUnderkategori,
    BehandlingÅrsak,
} from '../../../typer/behandling';
import { TilbakekrevingbehandlingÅrsak } from '../../../typer/tilbakekrevingsbehandling';

export interface VisningVedtakForBehandling {
    aktiv: boolean;
    vedtaksdato: string;
}

export interface VisningBehandling {
    aktiv: boolean;
    behandlingId: number | string;
    type: Behandlingstype;
    opprettetTidspunkt: string;
    resultat?: BehandlingResultat;
    status: BehandlingStatus;
    årsak?: BehandlingÅrsak | TilbakekrevingbehandlingÅrsak;
    vedtakForBehandling: VisningVedtakForBehandling[];
    kategori?: BehandlingKategori;
    underkategori?: BehandlingUnderkategori;
}
