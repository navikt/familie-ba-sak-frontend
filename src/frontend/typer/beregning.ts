import { INøkkelPar } from './common';
import { BehandlingKategori } from './behandling';
import { IPerson } from './person';

export interface IOppsummeringBeregning {
    periodeFom: string;
    periodeTom: string;
    sakstype: BehandlingKategori;
    beregningDetaljer: IBeregningDetalj[];
    ytelseTyper: YtelseType[];
    antallBarn: number;
    utbetaltPerMnd: number;
}

export interface IBeregningDetalj {
    person: IPerson;
    ytelseType: YtelseType;
    utbetaltPerMnd: number;
}

export interface IPersonBeregning {
    personIdent: string;
    ytelsePerioder: IYtelsePeriode[];
    beløp: number;
    stønadFom: string;
    stønadTom: string;
}

export interface IYtelsePeriode {
    beløp: number;
    stønadFom: string;
    stønadTom: string;
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
