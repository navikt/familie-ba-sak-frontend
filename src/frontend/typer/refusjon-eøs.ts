import type { IsoDatoString } from '../utils/dato';
export interface IRestRefusjonEøs {
    id: number;
    fom: IsoDatoString;
    tom: IsoDatoString;
    refusjonsbeløp: number;
    land: string;
    refusjonAvklart: boolean;
}

export interface IRestNyRefusjonEøs {
    fom: IsoDatoString;
    tom: IsoDatoString;
    refusjonsbeløp: number;
    land: string;
    refusjonAvklart: boolean;
}

export interface IRefusjonEøsSkjemaFelter {
    fom: Date | undefined;
    tom: Date | undefined;
    refusjonsbeløp: string;
    land: string;
    refusjonAvklart: boolean | undefined;
}
