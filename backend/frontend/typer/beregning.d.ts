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
export declare enum YtelseType {
    ORDINÆR_BARNETRYGD = "ORDIN\u00C6R_BARNETRYGD",
    UTVIDET_BARNETRYGD = "UTVIDET_BARNETRYGD",
    SMÅBARNSTILLEGG = "SM\u00C5BARNSTILLEGG",
    FINNMARKSTILLEGG = "FINNMARKSTILLEGG",
    SVALBARDTILLEGG = "SVALBARDTILLEGG"
}
export declare const ytelsetype: INøkkelPar;
