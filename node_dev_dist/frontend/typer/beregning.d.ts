import { INøkkelPar } from './common';
import { BehandlingKategori } from './behandling';
import { IPerson } from './person';
export interface IOppsummeringBeregning {
    periodeFom: string;
    periodeTom: string;
    sakstype: BehandlingKategori;
    beregningDetaljer: IBeregningDetalj[];
    stønadstype: YtelseType[];
    antallBarn: number;
    utbetaltPerMnd: number;
}
export interface IBeregningDetalj {
    person: IPerson;
    stønadstype: YtelseType;
    utbetaltPerMnd: number;
}
export interface IPersonBeregning {
    personident: string;
    ytelseType: YtelseType;
    deltYtelse: boolean;
    ingenYtelse: boolean;
    beløp: number;
    stønadFom: string;
    stønadTom: string;
}
export declare enum YtelseType {
    ORDINÆR_BARNETRYGD = "ORDIN\u00C6R_BARNETRYGD",
    UTVIDET_BARNETRYGD = "UTVIDET_BARNETRYGD",
    SMÅBARNSTILLEGG = "SM\u00C5BARNSTILLEGG"
}
export declare const ytelsetype: INøkkelPar;
export declare const ordinærBeløp = 1054;
