import type { IsoDatoString } from '../utils/dato';

export interface IRestFeilutbetaltValuta {
    id: number;
    fom: IsoDatoString;
    tom: IsoDatoString;
    feilutbetaltBeløp: number;
}

export interface IRestNyFeilutbetaltValutaPeriode {
    fom: IsoDatoString;
    tom: IsoDatoString;
    feilutbetaltBeløp: number;
}

export interface IFeilutbetaltValutaSkjemaFelter {
    fom: Date | undefined;
    tom: Date | undefined;
    feilutbetaltBeløp: string;
}
