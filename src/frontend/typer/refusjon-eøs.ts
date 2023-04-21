import type { FamilieIsoDate } from '../utils/kalender';

export interface IRestRefusjonEøs {
    id: number;
    fom: FamilieIsoDate;
    tom: FamilieIsoDate;
    feilutbetaltBeløp: number;
    //todo: land og refusjonAvklart
}

export interface IRestNyRefusjonEøsPeriode {
    fom: FamilieIsoDate;
    tom: FamilieIsoDate;
    feilutbetaltBeløp: number;
    //todo: land og refusjonAvklart
}

export interface IRefusjonEøsSkjemaFelter {
    fom: FamilieIsoDate;
    tom: FamilieIsoDate;
    feilutbetaltBeløp: string;
    //todo: land og refusjonAvklart
}
