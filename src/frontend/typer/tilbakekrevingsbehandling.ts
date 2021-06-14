import {
    BehandlingResultat,
    BehandlingStatus,
    Behandlingstype,
    BehandlingÅrsak,
} from './behandling';

interface IVedtakForBehandling {
    aktiv: boolean;
    vedtaksdato: string;
}

export interface ITilbakekrevingsbehandling {
    aktiv: boolean;
    behandlingId: string;
    type: Behandlingstype;
    opprettetTidspunkt: string;
    resultat?: BehandlingResultat;
    status: BehandlingStatus;
    årsak?: BehandlingÅrsak;
    vedtakForBehandling: IVedtakForBehandling[];
}
