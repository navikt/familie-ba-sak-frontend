import familieDayjs, { Dayjs } from '../utils/familieDayjs';
import { datoformat, datoformatNorsk, formaterIsoDato, isoStringToDayjs } from '../utils/formatter';

export const TIDENES_MORGEN: Dayjs = familieDayjs(-8640000000000000);
export const TIDENES_ENDE: Dayjs = familieDayjs(8640000000000000);

export interface IPeriode {
    // Format YYYY-MM-DD (ISO)
    fom?: string;
    tom?: string;
}

export const nyPeriode = (fom?: string, tom?: string): IPeriode => {
    return {
        fom: fom !== '' && fom !== null ? fom : undefined,
        tom: tom !== '' && tom !== null ? tom : undefined,
    };
};

export const periodeToString = (periode: IPeriode, format: datoformat = datoformat.DATO) => {
    return `${formaterIsoDato(
        periode.fom,
        format,
        datoformatNorsk.DATO.toLowerCase()
    )} - ${formaterIsoDato(periode.tom, format)}`;
};

export const periodeDiff = (første: IPeriode, annen: IPeriode) => {
    return isoStringToDayjs(første.fom, TIDENES_ENDE).diff(
        isoStringToDayjs(annen.fom, TIDENES_ENDE)
    );
};
