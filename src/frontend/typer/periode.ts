import moment, { Moment } from 'moment';

import { datoformat, formaterIsoDato } from '../utils/formatter';

export const TIDENES_MORGEN: Moment = moment(-8640000000000000);
export const TIDENES_ENDE: Moment = moment(8640000000000000);

export interface IPeriode {
    // Format YYYY-MM-DD (ISO)
    fom?: string;
    tom?: string;
}

export const nyPeriode = (fom?: string, tom?: string): IPeriode => {
    return { fom: fom !== '' ? fom : undefined, tom: tom !== '' ? tom : undefined };
};

export const nyMoment = (dato: string | undefined) => {
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

export const stringToMoment = (dato: string | undefined, defaultValue: Moment): Moment => {
    return dato && dato !== '' ? moment(dato, datoformat.ISO_DAG) : defaultValue;
};

export const diff = (første: IPeriode, annen: IPeriode) => {
    return stringToMoment(første.fom, TIDENES_MORGEN).diff(
        stringToMoment(annen.fom, TIDENES_MORGEN),
        'day'
    );
};

export const slåSammen = (første: IPeriode, annen: IPeriode): IPeriode => {
    return {
        fom: første.fom,
        tom: annen.tom,
    };
};

export const etterfølgende = (første: IPeriode, annen: IPeriode): boolean => {
    return stringToMoment(første.tom, TIDENES_ENDE)
        .add(1, 'day')
        .isSame(stringToMoment(annen.fom, TIDENES_MORGEN));
};

export const ikkeEtterfølgendeOgHullPåOver1Måned = (første: IPeriode, annen: IPeriode): boolean => {
    return (
        !etterfølgende(første, annen) &&
        stringToMoment(annen.fom, TIDENES_MORGEN).diff(
            stringToMoment(første.tom, TIDENES_ENDE),
            'days'
        ) >= 28 &&
        stringToMoment(annen.fom, TIDENES_MORGEN).month() -
            stringToMoment(første.tom, TIDENES_ENDE).month() >
            1
    );
};

export const kanErstatte = (skalErstatte: IPeriode, annen: IPeriode): boolean => {
    return (
        stringToMoment(skalErstatte.fom, TIDENES_MORGEN).isSameOrBefore(
            stringToMoment(annen.fom, TIDENES_MORGEN)
        ) &&
        stringToMoment(skalErstatte.tom, TIDENES_ENDE).isSameOrAfter(
            stringToMoment(annen.tom, TIDENES_ENDE)
        )
    );
};

export const kanSplitte = (skalSplitte: IPeriode, annen: IPeriode): boolean => {
    return (
        stringToMoment(skalSplitte.fom, TIDENES_MORGEN).isBetween(
            stringToMoment(annen.fom, TIDENES_MORGEN),
            stringToMoment(annen.tom, TIDENES_ENDE)
        ) &&
        stringToMoment(skalSplitte.tom, TIDENES_ENDE).isBetween(
            stringToMoment(annen.fom, TIDENES_MORGEN),
            stringToMoment(annen.tom, TIDENES_ENDE)
        )
    );
};

export const kanFlytteFom = (skalFlytteFom: IPeriode, annen: IPeriode): boolean => {
    return (
        stringToMoment(skalFlytteFom.fom, TIDENES_MORGEN).isSameOrBefore(
            stringToMoment(annen.fom, TIDENES_MORGEN)
        ) &&
        stringToMoment(skalFlytteFom.tom, TIDENES_ENDE).isBetween(
            stringToMoment(annen.fom, TIDENES_MORGEN),
            stringToMoment(annen.tom, TIDENES_ENDE)
        )
    );
};

export const kanFlytteTom = (skalFlytteTom: IPeriode, annen: IPeriode): boolean => {
    return (
        stringToMoment(skalFlytteTom.fom, TIDENES_MORGEN).isBetween(
            stringToMoment(annen.fom, TIDENES_MORGEN),
            stringToMoment(annen.tom, TIDENES_ENDE)
        ) &&
        stringToMoment(skalFlytteTom.tom, TIDENES_ENDE).isSameOrAfter(
            stringToMoment(annen.tom, TIDENES_ENDE)
        )
    );
};

export const overlapperMinstEttSted = (første: IPeriode, annen: IPeriode): boolean => {
    const førsteFom = stringToMoment(første.fom, TIDENES_MORGEN);
    const førsteTom = stringToMoment(første.tom, TIDENES_ENDE);
    const annenFom = stringToMoment(annen.fom, TIDENES_MORGEN);
    const annenTom = stringToMoment(annen.tom, TIDENES_ENDE);

    return (
        førsteFom.isBetween(annenFom, annenTom) ||
        førsteTom.isBetween(annenFom, annenTom) ||
        (førsteFom.isBefore(annenFom) && førsteTom.isAfter(annenTom))
    );
};
