import type { IsoDatoString } from '../utils/dato';

export interface IRestFeilutbetaltValuta {
    id: number;
    fom: IsoDatoString;
    tom: IsoDatoString;
    feilutbetaltBeløp: number;
}
