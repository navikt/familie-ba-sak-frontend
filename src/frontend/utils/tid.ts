import dayjs from 'dayjs';

import { FamilieIsoDate, YearMonth } from '../typer/tid';
import familieDayjs, { Dayjs } from './familieDayjs';

export const periodeOverlapperMedValgtDato = (
    periodeFom: FamilieIsoDate,
    periodeTom: FamilieIsoDate,
    valgtDato: Date
) => {
    const valgtDatoToDayjs = familieDayjs(valgtDato.toISOString()).startOf('day');
    const periodeFomToDayjs = familieDayjs(periodeFom).startOf('day');
    const periodeTomToDayjs = familieDayjs(periodeTom).startOf('day');

    return (
        valgtDatoToDayjs.isBetween(periodeFomToDayjs, periodeTomToDayjs, 'date') ||
        valgtDatoToDayjs.isSame(periodeFomToDayjs, 'date') ||
        valgtDatoToDayjs.isSame(periodeTomToDayjs, 'date')
    );
};

export const sisteDagInneværendeMåned = (): Dayjs => {
    return familieDayjs().endOf('month');
};

export const hentFørsteDagIYearMonth = (yearMonth: YearMonth) => {
    return familieDayjs(yearMonth).startOf('month');
};

export const hentSisteDagIYearMonth = (yearMonth: YearMonth) => {
    return familieDayjs(yearMonth).endOf('month');
};

export const leggTilÅr = (dato: string, år: number) => {
    const dayJs = dayjs(new Date(dato));
    return dayJs.set('year', dayJs.year() + år);
};
