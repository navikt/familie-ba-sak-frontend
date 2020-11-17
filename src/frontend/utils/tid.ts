import moment from 'moment';
import { YearMonth } from '../typer/tid';

export const periodeOverlapperMedValgtDato = (
    periodeFom: string,
    periodeTom: string,
    valgtDato: Date
) => {
    const valgtDatoToMoment = moment(valgtDato.toDateString());
    return (
        valgtDatoToMoment.isBetween(periodeFom, periodeTom) ||
        valgtDatoToMoment.isSame(periodeFom) ||
        valgtDatoToMoment.isSame(periodeTom)
    );
};

export const hentFørsteDagIYearMonth = (yearMonth: YearMonth) => {
    return moment(yearMonth).startOf('month');
};

export const hentSisteDagIYearMonth = (yearMonth: YearMonth) => {
    return moment(yearMonth).endOf('month');
};
