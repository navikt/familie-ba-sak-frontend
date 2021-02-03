import familieDayjs, { Dayjs, familieDayjsDiff } from '../utils/familieDayjs';
import { datoformat, datoformatNorsk, formaterIsoDato, isoStringToDayjs } from '../utils/formatter';

export const TIDENES_MORGEN: Dayjs = familieDayjs().subtract(1000, 'year');
export const TIDENES_ENDE: Dayjs = familieDayjs().add(1000, 'year');

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
    return familieDayjsDiff(
        isoStringToDayjs(første.fom, TIDENES_ENDE),
        isoStringToDayjs(annen.fom, TIDENES_ENDE)
    );
};

export const lagPeriodeId = (periode: IPeriode) => {
    return `${formaterIsoDato(periode.fom, datoformat.ISO_DAG)}-${formaterIsoDato(
        periode.tom,
        datoformat.ISO_DAG
    )}`;
};
