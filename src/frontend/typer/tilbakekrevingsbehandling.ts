import { BehandlingResultat, BehandlingStatus, Behandlingstype } from './behandling';

export enum TilbakekrevingbehandlingÅrsak {
    REVURDERING_KLAGE_NFP = 'REVURDERING_KLAGE_NFP',
    REVURDERING_KLAGE_KA = 'REVURDERING_KLAGE_KA',
    REVURDERING_OPPLYSNINGER_OM_VILKÅR = 'REVURDERING_OPPLYSNINGER_OM_VILKÅR',
    REVURDERING_OPPLYSNINGER_OM_FORELDELSE = 'REVURDERING_OPPLYSNINGER_OM_FORELDELSE',
    REVURDERING_FEILUTBETALT_BELØP_HELT_ELLER_DELVIS_BORTFALT = 'REVURDERING_FEILUTBETALT_BELØP_HELT_ELLER_DELVIS_BORTFALT',
}

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
    årsak?: TilbakekrevingbehandlingÅrsak;
    vedtakForBehandling: IVedtakForTilbakekreving[];
}
