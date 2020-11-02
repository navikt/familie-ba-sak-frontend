import moment, { Moment } from 'moment';
import { datoformat, datoformatNorsk, formaterIsoDato } from '../utils/formatter';

export const TIDENES_MORGEN: Moment = moment(-8640000000000000);
export const TIDENES_ENDE: Moment = moment(8640000000000000);

export interface IPeriode {
    // Format YYYY-MM-DD (ISO)
    fom?: string;
    tom?: string;
}

export const hentPeriodeHash = (periode: IPeriode) => {
    return `${periode.fom}_${periode.tom}`;
};

export const nyPeriode = (fom?: string, tom?: string): IPeriode => {
    return {
        fom: fom !== '' && fom !== null ? fom : undefined,
        tom: tom !== '' && tom !== null ? tom : undefined,
    };
};

export const nyMoment = (dato: string | undefined) => {
    return moment(dato, datoformat.ISO_DAG);
};

export const periodeToString = (periode: IPeriode, format: datoformat = datoformat.DATO) => {
    return `${formaterIsoDato(
        periode.fom,
        format,
        datoformatNorsk.DATO.toLowerCase()
    )} - ${formaterIsoDato(periode.tom, format)}`;
};

export const formaterMomentTilStringDato = (dato: Moment): string => {
    return dato.format(datoformat.ISO_DAG);
};

export const stringToMoment = (dato: string | undefined, defaultValue: Moment): Moment => {
    return dato && dato !== '' ? moment(dato, datoformat.ISO_DAG) : defaultValue;
};

export const diff = (første: IPeriode, annen: IPeriode) => {
    return stringToMoment(første.fom, TIDENES_ENDE).diff(
        stringToMoment(annen.fom, TIDENES_ENDE),
        'day'
    );
};

export const sisteDagNesteMåned = (): Moment => {
    return moment().add(1, 'months').endOf('month');
};

export const ikkeEtterfølgendeOgHullPåOver1Måned = (første: IPeriode, annen: IPeriode): boolean => {
    return (
        stringToMoment(annen.fom, TIDENES_MORGEN).diff(
            stringToMoment(første.tom, TIDENES_ENDE),
            'days'
        ) >= 28 &&
        stringToMoment(annen.fom, TIDENES_MORGEN).month() -
            stringToMoment(første.tom, TIDENES_ENDE).month() >
            1
    );
};
