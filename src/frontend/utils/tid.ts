import dayjs from 'dayjs';

import { FamilieIsoDate, YearMonth } from '../typer/tid';
import { Dayjs } from './familieDayjs';
import { datoformat } from './formatter';

export const periodeOverlapperMedValgtDato = (
    periodeFom: FamilieIsoDate,
    periodeTom: FamilieIsoDate,
    valgtDato: Date
) => {
    const valgtDatoToDayjs = dayjs(valgtDato.toISOString()).startOf('day');
    const periodeFomToDayjs = dayjs(periodeFom).startOf('day');
    const periodeTomToDayjs = dayjs(periodeTom).startOf('day');

    return (
        valgtDatoToDayjs.isBetween(periodeFomToDayjs, periodeTomToDayjs, 'date') ||
        valgtDatoToDayjs.isSame(periodeFomToDayjs, 'date') ||
        valgtDatoToDayjs.isSame(periodeTomToDayjs, 'date')
    );
};

export const sisteDagInneværendeMåned = (): Dayjs => {
    return dayjs().endOf('month');
};

export const hentFørsteDagIYearMonth = (yearMonth: YearMonth) => {
    return dayjs(yearMonth, datoformat.ISO_MÅNED).startOf('month');
};

export const hentSisteDagIYearMonth = (yearMonth: YearMonth) => {
    return dayjs(yearMonth, datoformat.ISO_MÅNED).endOf('month');
};

export const leggTilÅr = (dato: string, år: number) => {
    const dayJs = dayjs(new Date(dato));
    return dayJs.set('year', dayJs.year() + år);
};

export const datoDagenFør = (dayjs: Dayjs): Dayjs => {
    return dayjs.subtract(1, 'day');
};
