import type { FamilieIsoDate } from '../utils/kalender';

export interface ITrekkILøpendeUtbetaling {
    id: number;
    behandlingId: number;
    fom?: FamilieIsoDate;
    tom?: FamilieIsoDate;
    feilutbetaltBeløp: number;
}
export interface IRestTrekkILøpendeUtbetalingIdentifikator {
    id: number;
    behandlingId: number;
}

export interface IRestTrekkILøpendeUtbetaling {
    id: number;
    fom: FamilieIsoDate;
    tom: FamilieIsoDate;
    feilutbetaltBeløp: number;
}

export interface IRestNyFeilutbetaltValutaPeriode {
    fom: FamilieIsoDate;
    tom: FamilieIsoDate;
    feilutbetaltBeløp: number;
}

export interface IFeilutbetaltValutaSkjemaFelter {
    fom: FamilieIsoDate;
    tom: FamilieIsoDate;
    feilutbetaltBeløp: string;
}
