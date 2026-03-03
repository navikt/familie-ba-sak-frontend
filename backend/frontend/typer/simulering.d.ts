export interface ISimuleringDTO {
    perioder: ISimuleringPeriode[];
    fomDatoNestePeriode?: string;
    etterbetaling: number;
    feilutbetaling: number;
    fom: string;
    tidSimuleringHentet?: string;
    tomDatoNestePeriode?: string;
    tomSisteUtbetaling?: string;
    avregningsperioder: IAvregningsperiode[];
    overlappendePerioderMedAndreFagsaker: IOverlappendePeriodeMedAndreFagsaker[];
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
export interface IAvregningsperiode {
    fom: string;
    tom: string;
    totalEtterbetaling: number;
    totalFeilutbetaling: number;
}
export interface IOverlappendePeriodeMedAndreFagsaker {
    fom: string;
    tom: string;
    fagsaker: number[];
}
export declare enum Tilbakekrevingsvalg {
    OPPRETT_TILBAKEKREVING_MED_VARSEL = "OPPRETT_TILBAKEKREVING_MED_VARSEL",
    OPPRETT_TILBAKEKREVING_UTEN_VARSEL = "OPPRETT_TILBAKEKREVING_UTEN_VARSEL",
    IGNORER_TILBAKEKREVING = "IGNORER_TILBAKEKREVING"
}
export declare const visTilbakekrevingsvalg: Record<Tilbakekrevingsvalg, string>;
export interface ITilbakekreving {
    vedtakId: number;
    valg: Tilbakekrevingsvalg;
    varsel?: string;
    begrunnelse: string;
    tilbakekrevingsbehandlingId?: string;
}
