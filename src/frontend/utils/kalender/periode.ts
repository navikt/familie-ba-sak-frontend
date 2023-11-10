import { isAfter, isBefore, isSameDay } from 'date-fns';

import type { IsoDatoString } from '../dato';
import { isoStringTilDate, isoStringTilDateMedFallback, tidenesEnde } from '../dato';

import type { IYearMonthPeriode, YearMonth } from '.';

export const nyYearMonthPeriode = (fom?: YearMonth, tom?: YearMonth): IYearMonthPeriode => {
    return {
        fom: fom !== '' && fom ? fom : undefined,
        tom: tom !== '' && tom ? tom : undefined,
    };
};

export const periodeOverlapperMedValgtDato = (
    periodeFom: IsoDatoString,
    periodeTom: IsoDatoString | undefined,
    valgtDato: Date
) => {
    const periodeFomDate = isoStringTilDate(periodeFom);
    const periodeTomDate = isoStringTilDateMedFallback({
        isoString: periodeTom,
        fallbackDate: tidenesEnde,
    });

    return (
        (isAfter(valgtDato, periodeFomDate) && isBefore(valgtDato, periodeTomDate)) ||
        isSameDay(valgtDato, periodeFomDate) ||
        isSameDay(valgtDato, periodeTomDate)
    );
};
