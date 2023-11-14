export interface ITilbakekrevingsbehandling {
    behandlingId: number | string;
    opprettetTidspunkt: string;
    aktiv: boolean;
    årsak?: TilbakekrevingsbehandlingÅrsak;
    type: Tilbakekrevingsbehandlingstype;
    status: Behandlingsstatus;
    resultat?: Behandlingsresultatstype;
    vedtaksdato?: string;
}

export enum Behandlingsresultatstype {
    IKKE_FASTSATT = 'IKKE_FASTSATT',
    INGEN_TILBAKEBETALING = 'INGEN_TILBAKEBETALING',
    DELVIS_TILBAKEBETALING = 'DELVIS_TILBAKEBETALING',
    FULL_TILBAKEBETALING = 'FULL_TILBAKEBETALING',
    HENLAGT = 'HENLAGT',
}

export enum Behandlingsstatus {
    AVSLUTTET = 'AVSLUTTET',
    FATTER_VEDTAK = 'FATTER_VEDTAK',
    IVERKSETTER_VEDTAK = 'IVERKSETTER_VEDTAK',
    OPPRETTET = 'OPPRETTET',
    UTREDES = 'UTREDES',
}

export enum Tilbakekrevingsbehandlingstype {
    TILBAKEKREVING = 'TILBAKEKREVING',
    REVURDERING_TILBAKEKREVING = 'REVURDERING_TILBAKEKREVING',
}

export enum TilbakekrevingsbehandlingÅrsak {
    REVURDERING_KLAGE_NFP = 'REVURDERING_KLAGE_NFP',
    REVURDERING_KLAGE_KA = 'REVURDERING_KLAGE_KA',
    REVURDERING_OPPLYSNINGER_OM_VILKÅR = 'REVURDERING_OPPLYSNINGER_OM_VILKÅR',
    REVURDERING_OPPLYSNINGER_OM_FORELDELSE = 'REVURDERING_OPPLYSNINGER_OM_FORELDELSE',
    REVURDERING_FEILUTBETALT_BELØP_HELT_ELLER_DELVIS_BORTFALT = 'REVURDERING_FEILUTBETALT_BELØP_HELT_ELLER_DELVIS_BORTFALT',
}

export enum TilbakekrevingsbehandlingResultat {
    IKKE_FASTSATT = 'IKKE_FASTSATT',
    INGEN_TILBAKEBETALING = 'INGEN_TILBAKEBETALING',
    DELVIS_TILBAKEBETALING = 'DELVIS_TILBAKEBETALING',
    FULL_TILBAKEBETALING = 'FULL_TILBAKEBETALING',
    HENLAGT = 'HENLAGT',
}
