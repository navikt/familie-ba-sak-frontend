import type { IsoDatoString } from '../utils/dato';
export interface IRestRefusjonEøs {
    id: number;
    fom: IsoDatoString;
    tom: IsoDatoString;
    refusjonsbeløp: number;
    land: string;
    refusjonAvklart: boolean;
}
