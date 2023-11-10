import { isAfter, isBefore, isSameDay } from 'date-fns';

import type { IPeriode, IsoDatoString } from '../dato';
import { isoStringTilDate, isoStringTilDateMedFallback, tidenesEnde } from '../dato';

import type { FamilieIsoDate, IYearMonthPeriode, YearMonth } from '.';
import { kalenderDato, tilVisning, yearMonthTilVisning, yearMonthTilKalenderMåned } from '.';

export const nyPeriode = (fom?: FamilieIsoDate, tom?: FamilieIsoDate): IPeriode => {
    return {
        fom: fom !== '' && fom ? fom : undefined,
        tom: tom !== '' && tom ? tom : undefined,
    };
};

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
        isoDatoString: periodeTom,
        fallbackDate: tidenesEnde,
    });

    return (
        (isAfter(valgtDato, periodeFomDate) && isBefore(valgtDato, periodeTomDate)) ||
        isSameDay(valgtDato, periodeFomDate) ||
        isSameDay(valgtDato, periodeTomDate)
    );
};

export const periodeToString = (periode: IPeriode) => {
    return `${tilVisning(periode.fom ? kalenderDato(periode.fom) : undefined)} - ${tilVisning(
        periode.tom ? kalenderDato(periode.tom) : undefined
    )}`;
};

export const yearMonthPeriodeToString = (periode: IYearMonthPeriode) => {
    return `${yearMonthTilVisning(
        periode.fom ? yearMonthTilKalenderMåned(periode.fom) : undefined
    )} - ${yearMonthTilVisning(periode.tom ? yearMonthTilKalenderMåned(periode.tom) : undefined)}`;
};
