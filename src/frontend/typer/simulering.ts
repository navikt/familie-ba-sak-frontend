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

export enum TilbakekrevingAlternativ {
    OPPRETT_SEND_VARSEL,
    OPPRETT_IKKE_SEND_VARSEL,
    AVVENT_TILMBAKEKREVING,
}
