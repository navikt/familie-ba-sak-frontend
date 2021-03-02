import { INøkkelPar } from './common';
import { YearMonth } from './tid';

export interface IPersonMedAndelerTilkjentYtelse {
    personIdent: string;
    ytelsePerioder: IYtelsePeriode[];
    beløp: number;
    stønadFom: YearMonth;
    stønadTom: YearMonth;
}

export interface IYtelsePeriode {
    beløp: number;
    stønadFom: YearMonth;
    stønadTom: YearMonth;
    ytelseType: YtelseType;
}

export enum YtelseType {
    ORDINÆR_BARNETRYGD = 'ORDINÆR_BARNETRYGD',
    UTVIDET_BARNETRYGD = 'UTVIDET_BARNETRYGD',
    SMÅBARNSTILLEGG = 'SMÅBARNSTILLEGG',
}

export const ytelsetype: INøkkelPar = {
    ORDINÆR_BARNETRYGD: {
        id: 'ORDINÆR_BARNETRYGD',
        navn: 'Ordinær',
    },
    UTVIDET_BARNETRYGD: {
        id: 'UTVIDET_BARNETRYGD',
        navn: 'Utvidet',
    },
    SMÅBARNSTILLEGG: {
        id: 'SMÅBARNSTILLEGG',
        navn: 'Småbarnstillegg',
    },
};

export const satsBeløp = {
    ORDINÆR_UNDER_6_ÅR: 1354,
    ORDINÆR_FRA_6_ÅR: 1054,
};
