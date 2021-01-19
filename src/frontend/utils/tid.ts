import { YearMonth } from '../typer/tid';
import familieDayjs, { Dayjs } from './familieDayjs';

export const periodeOverlapperMedValgtDato = (
    periodeFom: string,
    periodeTom: string,
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
