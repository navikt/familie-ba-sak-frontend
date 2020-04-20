import moment, { Moment } from 'moment';
import { datoformat } from '../utils/formatter';
export declare const TIDENES_MORGEN: Moment;
export declare const TIDENES_ENDE: Moment;
export interface IPeriode {
    fom?: string;
    tom?: string;
}
export declare const nyPeriode: (fom?: string | undefined, tom?: string | undefined) => IPeriode;
export declare const nyMoment: (dato: string | undefined) => moment.Moment;
export declare const periodeToString: (periode: IPeriode, format?: datoformat) => string;
export declare const formaterMomentTilStringDato: (dato: moment.Moment) => string;
export declare const stringToMoment: (dato: string | undefined, defaultValue: moment.Moment) => moment.Moment;
export declare const diff: (første: IPeriode, annen: IPeriode) => number;
export declare const slåSammen: (første: IPeriode, annen: IPeriode) => IPeriode;
export declare const etterfølgende: (første: IPeriode, annen: IPeriode) => boolean;
export declare const ikkeEtterfølgendeOgHullPåOver1Måned: (første: IPeriode, annen: IPeriode) => boolean;
export declare const kanErstatte: (skalErstatte: IPeriode, annen: IPeriode) => boolean;
export declare const kanSplitte: (skalSplitte: IPeriode, annen: IPeriode) => boolean;
export declare const kanFlytteFom: (skalFlytteFom: IPeriode, annen: IPeriode) => boolean;
export declare const kanFlytteTom: (skalFlytteTom: IPeriode, annen: IPeriode) => boolean;
export declare const overlapperMinstEttSted: (første: IPeriode, annen: IPeriode) => boolean;
