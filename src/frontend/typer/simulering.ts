export interface ISimuleringDTO {
    perioder: ISimuleringPeriode[];
    fomDatoNestePeriode?: string;
    etterbetaling: number;
    feilutbetaling: number;
    fom: string;
    tomDatoNestePeriode: string;
}

export interface ISimuleringPeriode {
    fom: string;
    tom: string;
    forfallsdato?: string;
    nyttBeløp?: number;
    tidligereUtbetalt?: number;
    resultat?: number;
}

export enum Tilbakekrevingsvalg {
    OPPRETT_TILBAKEKREVING_MED_VARSEL = 'OPPRETT_TILBAKEKREVING_MED_VARSEL',
    OPPRETT_TILBAKEKREVING_UTEN_VARSEL = 'OPPRETT_TILBAKEKREVING_UTEN_VARSEL',
    IGNORER_TILBAKEKREVING = 'IGNORER_TILBAKEKREVING',
}

export interface ITilbakekreving {
    vedtakId: number;
    valg: Tilbakekrevingsvalg;
    varsel?: string;
    begrunnelse: string;
}
