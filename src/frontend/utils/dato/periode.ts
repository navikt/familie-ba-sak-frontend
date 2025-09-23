import { isAfter, isBefore, isSameDay } from 'date-fns';

import type { IsoDatoString, IsoMånedString } from './dato';
import {
    Datoformat,
    isoStringTilDate,
    isoStringTilDateMedFallback,
    isoStringTilFormatertString,
    tidenesEnde,
} from './dato';

export interface IIsoDatoPeriode {
    // Format YYYY-MM-DD (ISO)
    fom?: IsoDatoString;
    tom?: IsoDatoString;
}

export interface IIsoMånedPeriode {
    // Format YYYY-MM
    fom?: IsoMånedString;
    tom?: IsoMånedString;
}

export const nyIsoDatoPeriode = (fom?: IsoDatoString, tom?: IsoDatoString): IIsoDatoPeriode => {
    return {
        fom: fom !== '' && fom ? fom : undefined,
        tom: tom !== '' && tom ? tom : undefined,
    };
};

export const nyIsoMånedPeriode = (fom?: IsoMånedString, tom?: IsoMånedString): IIsoMånedPeriode => {
    return {
        fom: fom !== '' && fom ? fom : undefined,
        tom: tom !== '' && tom ? tom : undefined,
    };
};

export const isoDatoPeriodeTilFormatertString = (periode: IIsoDatoPeriode) => {
    return `${isoStringTilFormatertString({
        isoString: periode.fom,
        tilFormat: Datoformat.DATO,
    })} - ${isoStringTilFormatertString({
        isoString: periode.tom,
        tilFormat: Datoformat.DATO,
    })}`;
};

interface FormaterIsoMånedPeriodeProps {
    periode: IIsoMånedPeriode;
    tilFormat: Datoformat;
}

export const isoMånedPeriodeTilFormatertString = ({ periode, tilFormat }: FormaterIsoMånedPeriodeProps) => {
    return `${isoStringTilFormatertString({
        isoString: periode.fom,
        tilFormat: tilFormat,
    })} - ${isoStringTilFormatertString({
        isoString: periode.tom,
        tilFormat: tilFormat,
    })}`;
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
