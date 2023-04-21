import type { FamilieIsoDate } from '../utils/kalender';

export interface IRestRefusjonEøs {
    land: string;
    avklart: boolean;
    perioder: IRestRefusjonEøsPeriode[];
}
export interface IRestRefusjonEøsPeriode {
    id: number;
    fom: FamilieIsoDate;
    tom: FamilieIsoDate;
    refusjonsbeløp: number;
    //todo: land og refusjonAvklart
}

export interface IRestNyRefusjonEøsPeriode {
    fom: FamilieIsoDate;
    tom: FamilieIsoDate;
    refusjonsbeløp: number;
    //todo: land og refusjonAvklart
}

export interface IRefusjonEøsPeriodeSkjemaFelter {
    fom: FamilieIsoDate;
    tom: FamilieIsoDate;
    refusjonsbeløp: string;
    //todo: land og refusjonAvklart
}
