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
    forfallsdato: string;
    nyttBeløp: number;
    tidligereUtbetalt: number;
    resultat: number;
}
