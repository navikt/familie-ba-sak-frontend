import dayjs from 'dayjs';
import { datoformat, datoformatNorsk, formaterIsoDato } from '../utils/formatter';

export const TIDENES_MORGEN: dayjs.Dayjs = dayjs(-8640000000000000);
export const TIDENES_ENDE: dayjs.Dayjs = dayjs(8640000000000000);

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
    return dayjs(dato, datoformat.ISO_DAG);
};

export const periodeToString = (periode: IPeriode, format: datoformat = datoformat.DATO) => {
    return `${formaterIsoDato(
        periode.fom,
        format,
        datoformatNorsk.DATO.toLowerCase()
    )} - ${formaterIsoDato(periode.tom, format)}`;
};

export const formaterMomentTilStringDato = (dato: dayjs.Dayjs): string => {
    return dato.format(datoformat.ISO_DAG);
};

export const stringToMoment = (
    dato: string | undefined,
    defaultValue: dayjs.Dayjs
): dayjs.Dayjs => {
    return dato && dato !== '' ? dayjs(dato, datoformat.ISO_DAG) : defaultValue;
};

export const diff = (første: IPeriode, annen: IPeriode) => {
    return stringToMoment(første.fom, TIDENES_ENDE).diff(
        stringToMoment(annen.fom, TIDENES_ENDE),
        'day'
    );
};

export const sisteDagInneværendeMåned = (): dayjs.Dayjs => {
    return dayjs().endOf('month');
};

export const ikkeEtterfølgendeOgHullPåOver1Måned = (første: IPeriode, annen: IPeriode): boolean => {
    return (
        stringToMoment(annen.fom, TIDENES_MORGEN).diff(
            stringToMoment(første.tom, TIDENES_ENDE),
            'day'
        ) >= 28 &&
        stringToMoment(annen.fom, TIDENES_MORGEN).month() -
            stringToMoment(første.tom, TIDENES_ENDE).month() >
            1
    );
};
