import {
    BehandlingKategori,
    BehandlingResultat,
    BehandlingStatus,
    Behandlingstype,
    BehandlingUnderkategori,
    BehandlingÅrsak,
} from '../../../typer/behandling';

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
    årsak?: BehandlingÅrsak;
    vedtakForBehandling: VisningVedtakForBehandling[];
    kategori?: BehandlingKategori;
    underkategori?: BehandlingUnderkategori;
}
