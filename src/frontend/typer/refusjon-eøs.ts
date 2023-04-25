import type { FamilieIsoDate } from '../utils/kalender';
export interface IRestRefusjonEøs {
    id: number;
    fom: FamilieIsoDate;
    tom: FamilieIsoDate;
    refusjonsbeløp: number;
    land: string;
    refusjonAvklart: boolean;
}

export interface IRestNyRefusjonEøs {
    fom: FamilieIsoDate;
    tom: FamilieIsoDate;
    refusjonsbeløp: number;
    land: string;
    refusjonAvklart: boolean;
}

export interface IRefusjonEøsSkjemaFelter {
    fom: FamilieIsoDate;
    tom: FamilieIsoDate;
    refusjonsbeløp: string;
    land: string;
    refusjonAvklart: boolean | undefined;
}
