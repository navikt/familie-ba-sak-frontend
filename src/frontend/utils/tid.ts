import { YearMonth } from '../typer/tid';
import familieDayjs, { Dayjs } from './familieDayjs';

export const periodeOverlapperMedValgtDato = (
    periodeFom: string,
    periodeTom: string,
    valgtDato: Date
) => {
    const valgtDatoToDayjs = familieDayjs(valgtDato);

    return (
        valgtDatoToDayjs.isBetween(periodeFom, periodeTom, 'date') ||
        valgtDatoToDayjs.isSame(periodeFom, 'date') ||
        valgtDatoToDayjs.isSame(periodeTom, 'date')
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
