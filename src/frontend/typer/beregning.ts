import type { INøkkelPar } from './common';
import type { IsoMånedString } from '../utils/dato';

export interface IPersonMedAndelerTilkjentYtelse {
    personIdent: string;
    ytelsePerioder: IYtelsePeriode[];
    beløp: number;
    stønadFom: IsoMånedString;
    stønadTom: IsoMånedString;
}

export interface IYtelsePeriode {
    beløp: number;
    stønadFom: IsoMånedString;
    stønadTom: IsoMånedString;
    ytelseType: YtelseType;
    skalUtbetales: boolean;
}

export enum YtelseType {
    ORDINÆR_BARNETRYGD = 'ORDINÆR_BARNETRYGD',
    UTVIDET_BARNETRYGD = 'UTVIDET_BARNETRYGD',
    SMÅBARNSTILLEGG = 'SMÅBARNSTILLEGG',
    FINNMARKSTILLEGG = 'FINNMARKSTILLEGG',
    SVALBARDTILLEGG = 'SVALBARDTILLEGG',
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
    FINNMARKSTILLEGG: {
        id: 'FINNMARKSTILLEGG',
        navn: 'Finnmarkstillegg',
    },
    SVALBARDTILLEGG: {
        id: 'SVALBARDTILLEGG',
        navn: 'Svalbardtillegg',
    },
};
