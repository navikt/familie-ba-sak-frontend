import dayjs from 'dayjs';
import { YearMonth } from '../typer/tid';

export const periodeOverlapperMedValgtDato = (
    periodeFom: string,
    periodeTom: string,
    valgtDato: Date
) => {
    const valgtDatoToMoment = dayjs(valgtDato.toDateString());
    return (
        valgtDatoToMoment.isBetween(periodeFom, periodeTom) ||
        valgtDatoToMoment.isSame(periodeFom) ||
        valgtDatoToMoment.isSame(periodeTom)
    );
};

export const hentFørsteDagIYearMonth = (yearMonth: YearMonth) => {
    return dayjs(yearMonth).startOf('month');
};

export const hentSisteDagIYearMonth = (yearMonth: YearMonth) => {
    return dayjs(yearMonth).endOf('month');
};
