import moment, { Moment } from 'moment';
import { datoformat, formaterIsoDato } from '../utils/formatter';

interface IPeriode {
    // Format 2020-04-09 (ISO)
    fom: string;
    tom: string;
}

export const nyPeriode = (fom?: string, tom?: string): IPeriode => {
    return { fom: fom ? fom : '', tom: tom ? tom : '' };
};

export const nyMoment = (dato: string) => {
    return moment(dato, datoformat.ISO_DAG);
};

export const periodeToString = (periode: IPeriode) => {
    return `${formaterIsoDato(periode.fom, datoformat.DATO)} - ${formaterIsoDato(
        periode.tom,
        datoformat.DATO
    )}`;
};

export const formaterMomentTilStringDato = (dato: Moment): string => {
    return dato.format(datoformat.ISO_DAG);
};

export const stringToMoment = (dato: string): Moment => {
    return moment(dato, datoformat.ISO_DAG);
};

export const isValid = (periode: IPeriode): boolean => {
    return stringToMoment(periode.fom).isBefore(periode.tom);
};

export const diff = (første: IPeriode, annen: IPeriode) => {
    return stringToMoment(første.fom).diff(annen.fom, 'day');
};

export const slåSammen = (første: IPeriode, annen: IPeriode): IPeriode => {
    return {
        fom: første.fom,
        tom: annen.tom,
    };
};

export const etterfølgende = (første: IPeriode, annen: IPeriode): boolean => {
    return stringToMoment(første.tom)
        .add(1, 'day')
        .isSame(annen.fom);
};

export const kanErstatte = (første: IPeriode, annen: IPeriode): boolean => {
    return (
        stringToMoment(første.fom).isBefore(stringToMoment(annen.fom)) &&
        stringToMoment(første.tom).isAfter(stringToMoment(annen.tom))
    );
};

export const kanSplitte = (første: IPeriode, annen: IPeriode): boolean => {
    return (
        stringToMoment(første.fom).isBetween(
            stringToMoment(annen.fom),
            stringToMoment(annen.tom)
        ) &&
        stringToMoment(første.tom).isBetween(stringToMoment(annen.fom), stringToMoment(annen.tom))
    );
};

export const kanFlytteFom = (første: IPeriode, annen: IPeriode): boolean => {
    return (
        stringToMoment(første.fom).isBefore(stringToMoment(annen.fom)) &&
        stringToMoment(første.tom).isBetween(stringToMoment(annen.fom), stringToMoment(annen.tom))
    );
};

export const kanFlytteTom = (første: IPeriode, annen: IPeriode): boolean => {
    return (
        stringToMoment(første.fom).isBetween(
            stringToMoment(annen.fom),
            stringToMoment(annen.tom)
        ) && stringToMoment(første.tom).isAfter(stringToMoment(annen.tom))
    );
};

export const overlapperMinstEttSted = (første: IPeriode, annen: IPeriode): boolean => {
    return (
        stringToMoment(første.fom).isBetween(
            stringToMoment(annen.fom),
            stringToMoment(annen.tom)
        ) ||
        stringToMoment(første.tom).isBetween(stringToMoment(annen.fom), stringToMoment(annen.tom))
    );
};
