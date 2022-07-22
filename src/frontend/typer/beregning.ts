import type { YearMonth } from '../utils/kalender';
import type { INøkkelPar } from './common';

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
    skalUtbetales: boolean;
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
