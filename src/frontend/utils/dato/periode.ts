import type { IsoDatoString, IsoMånedString } from './dato';
import { isoStringTilFormatertString } from './dato';
import { Datoformat } from '../formatter';

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

export const isoDatoPeriodeTilFormatertString = (periode: IIsoDatoPeriode) => {
    return `${isoStringTilFormatertString({
        isoString: periode.fom,
        tilFormat: Datoformat.DATO,
    })} - ${isoStringTilFormatertString({
        isoString: periode.tom,
        tilFormat: Datoformat.DATO,
    })}`;
};

export const isoMånedPeriodeTilFormatertString = (periode: IIsoMånedPeriode) => {
    return `${isoStringTilFormatertString({
        isoString: periode.fom,
        tilFormat: Datoformat.MÅNED_ÅR,
    })} - ${isoStringTilFormatertString({
        isoString: periode.tom,
        tilFormat: Datoformat.MÅNED_ÅR,
    })}`;
};
