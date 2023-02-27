export interface ISimuleringDTO {
    perioder: ISimuleringPeriode[];
    fomDatoNestePeriode?: string;
    etterbetaling: number;
    feilutbetaling: number;
    fom: string;
    tidSimuleringHentet?: string;
    tomDatoNestePeriode?: string;
    tomSisteUtbetaling?: string;
}

export interface ISimuleringPeriode {
    fom: string;
    tom: string;
    forfallsdato?: string;
    nyttBeløp?: number;
    tidligereUtbetalt?: number;
    resultat?: number;
    etterbetaling?: number;
    feilutbetaling?: number;
    manuellPostering?: number;
}

export enum Tilbakekrevingsvalg {
    OPPRETT_TILBAKEKREVING_MED_VARSEL = 'OPPRETT_TILBAKEKREVING_MED_VARSEL',
    OPPRETT_TILBAKEKREVING_UTEN_VARSEL = 'OPPRETT_TILBAKEKREVING_UTEN_VARSEL',
    IGNORER_TILBAKEKREVING = 'IGNORER_TILBAKEKREVING',
}

export const visTilbakekrevingsvalg: Record<Tilbakekrevingsvalg, string> = {
    OPPRETT_TILBAKEKREVING_MED_VARSEL: 'Opprett tilbakekreving med varsel',
    OPPRETT_TILBAKEKREVING_UTEN_VARSEL: 'Opprett tilbakekreving uten varsel',
    IGNORER_TILBAKEKREVING: 'Ignorer tilbakekreving',
};

export interface ITilbakekreving {
    vedtakId: number;
    valg: Tilbakekrevingsvalg;
    varsel?: string;
    begrunnelse: string;
    tilbakekrevingsbehandlingId?: string;
}
