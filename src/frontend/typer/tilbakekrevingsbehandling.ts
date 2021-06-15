import {
    BehandlingResultat,
    BehandlingStatus,
    Behandlingstype,
    BehandlingÅrsak,
} from './behandling';

interface IVedtakForTilbakekreving {
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
    vedtakForBehandling: IVedtakForTilbakekreving[];
}
