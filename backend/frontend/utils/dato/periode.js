import { isAfter, isBefore, isSameDay } from 'date-fns';
import { Datoformat, isoStringTilDate, isoStringTilDateMedFallback, isoStringTilFormatertString, tidenesEnde, } from './dato';
export const nyIsoDatoPeriode = (fom, tom) => {
    return {
        fom: fom !== '' && fom ? fom : undefined,
        tom: tom !== '' && tom ? tom : undefined,
    };
};
export const nyIsoMånedPeriode = (fom, tom) => {
    return {
        fom: fom !== '' && fom ? fom : undefined,
        tom: tom !== '' && tom ? tom : undefined,
    };
};
export const isoDatoPeriodeTilFormatertString = (periode) => {
    return `${isoStringTilFormatertString({
        isoString: periode.fom,
        tilFormat: Datoformat.DATO,
    })} - ${isoStringTilFormatertString({
        isoString: periode.tom,
        tilFormat: Datoformat.DATO,
    })}`;
};
export const isoMånedPeriodeTilFormatertString = ({ periode, tilFormat }) => {
    return `${isoStringTilFormatertString({
        isoString: periode.fom,
        tilFormat: tilFormat,
    })} - ${isoStringTilFormatertString({
        isoString: periode.tom,
        tilFormat: tilFormat,
    })}`;
};
export const periodeOverlapperMedValgtDato = (periodeFom, periodeTom, valgtDato) => {
    const periodeFomDate = isoStringTilDate(periodeFom);
    const periodeTomDate = isoStringTilDateMedFallback({
        isoString: periodeTom,
        fallbackDate: tidenesEnde,
    });
    return ((isAfter(valgtDato, periodeFomDate) && isBefore(valgtDato, periodeTomDate)) ||
        isSameDay(valgtDato, periodeFomDate) ||
        isSameDay(valgtDato, periodeTomDate));
};
