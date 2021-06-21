import { BehandlingStatus } from './behandling';

export enum Tilbakekrevingsbehandlingstype {
    TILBAKEKREVING = 'TILBAKEKREVING',
    REVURDERING_TILBAKEKREVING = 'REVURDERING_TILBAKEKREVING',
}

export const tilbakekrevingstyper = [
    Tilbakekrevingsbehandlingstype.TILBAKEKREVING,
    Tilbakekrevingsbehandlingstype.REVURDERING_TILBAKEKREVING,
];

export enum TilbakekrevingsbehandlingÅrsak {
    REVURDERING_KLAGE_NFP = 'REVURDERING_KLAGE_NFP',
    REVURDERING_KLAGE_KA = 'REVURDERING_KLAGE_KA',
    REVURDERING_OPPLYSNINGER_OM_VILKÅR = 'REVURDERING_OPPLYSNINGER_OM_VILKÅR',
    REVURDERING_OPPLYSNINGER_OM_FORELDELSE = 'REVURDERING_OPPLYSNINGER_OM_FORELDELSE',
    REVURDERING_FEILUTBETALT_BELØP_HELT_ELLER_DELVIS_BORTFALT = 'REVURDERING_FEILUTBETALT_BELØP_HELT_ELLER_DELVIS_BORTFALT',
}

export enum TilbakekrevingsbehandlingResultat {
    INGEN_TILBAKEBETALING = 'INGEN_TILBAKEBETALING',
    DELVIS_TILBAKEBETALING = 'DELVIS_TILBAKEBETALING',
    FULL_TILBAKEBETALING = 'FULL_TILBAKEBETALING',
    HENLAGT = 'HENLAGT',
}

interface IVedtakForTilbakekreving {
    aktiv: boolean;
    vedtaksdato: string;
}

export interface ITilbakekrevingsbehandling {
    aktiv: boolean;
    behandlingId: string;
    type: Tilbakekrevingsbehandlingstype;
    opprettetTidspunkt: string;
    resultat?: TilbakekrevingsbehandlingResultat;
    status: BehandlingStatus;
    årsak?: TilbakekrevingsbehandlingÅrsak;
    vedtakForBehandling: IVedtakForTilbakekreving[];
}
