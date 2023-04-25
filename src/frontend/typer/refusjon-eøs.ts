import type { FamilieIsoDate } from '../utils/kalender';
export interface IRestRefusjonEøs {
    id: number;
    fom: FamilieIsoDate;
    tom: FamilieIsoDate;
    refusjonsbeløp: number;
    //todo: land og refusjonAvklart
}

export interface IRestNyRefusjonEøs {
    fom: FamilieIsoDate;
    tom: FamilieIsoDate;
    refusjonsbeløp: number;
    //todo: land og refusjonAvklart
}

export interface IRefusjonEøsSkjemaFelter {
    fom: FamilieIsoDate;
    tom: FamilieIsoDate;
    refusjonsbeløp: string;
    //todo: land og refusjonAvklart
}
