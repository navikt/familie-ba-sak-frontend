import type {
    BehandlingResultat,
    BehandlingStatus,
    Behandlingstype,
    BehandlingÅrsak,
} from '../../../typer/behandling';
import type { BehandlingKategori, BehandlingUnderkategori } from '../../../typer/behandlingstema';

export interface VisningBehandling {
    aktiv: boolean;
    behandlingId: number | string;
    opprettetTidspunkt: string;
    resultat?: BehandlingResultat;
    status: BehandlingStatus;
    type: Behandlingstype;
    kategori: BehandlingKategori;
    underkategori: BehandlingUnderkategori;
    vedtaksdato?: string;
    årsak?: BehandlingÅrsak;
}
