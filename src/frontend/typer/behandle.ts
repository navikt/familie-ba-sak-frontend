import { INøkkelPar } from './common';

export interface IPersonBeregning {
    personident: string;
    ytelseType: YtelseType;
    deltYtelse: boolean;
    beløp: number;
    stønadFom: string;
}

export enum YtelseType {
    ORDINÆR_BARNETRYGD = 'ORDINÆR BARNETRYGD',
    UTVIDET_BARNETRYGD = 'UTVIDET BARNETRYGD',
    SMÅBARNSTILLEGG = 'SMÅBARNSTILLEGG',
}

export const ytelsetype: INøkkelPar = {
    ORDINÆR_BARNETRYGD: {
        id: 'ORDINÆR BARNETRYGD',
        navn: 'Ordinær barnetrygd',
    },
    UTVIDET_BARNETRYGD: {
        id: 'UTVIDET BARNETRYGD',
        navn: 'Utvidet barnetrygd',
    },
    SMÅBARNSTILLEGG: {
        id: 'SMÅBARNSTILLEGG',
        navn: 'Småbarnstillegg',
    },
};

export const ordinærBeløp = 1054;
