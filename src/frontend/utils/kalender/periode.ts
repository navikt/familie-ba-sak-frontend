import { isAfter, isBefore, isSameDay } from 'date-fns';

import type { IPeriode, IsoDatoString } from '../dato';
import {
    isoStringTilDate,
    isoStringTilDateMedFallback,
    isoStringTilFormatertString,
    tidenesEnde,
} from '../dato';
import { Datoformat } from '../formatter';

import type { FamilieIsoDate, IYearMonthPeriode, YearMonth } from '.';
import { yearMonthTilKalenderMåned, yearMonthTilVisning } from '.';

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
    return `${isoStringTilFormatertString({
        isoDatoString: periode.fom,
        tilFormat: Datoformat.DATO,
    })} - ${isoStringTilFormatertString({
        isoDatoString: periode.tom,
        tilFormat: Datoformat.DATO,
    })}`;
};

export const yearMonthPeriodeToString = (periode: IYearMonthPeriode) => {
    return `${yearMonthTilVisning(
        periode.fom ? yearMonthTilKalenderMåned(periode.fom) : undefined
    )} - ${yearMonthTilVisning(periode.tom ? yearMonthTilKalenderMåned(periode.tom) : undefined)}`;
};
