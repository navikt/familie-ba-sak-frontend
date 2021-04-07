import familieDayjs, { Dayjs, familieDayjsDiff } from '../utils/familieDayjs';
import { datoformat, datoformatNorsk, formaterIsoDato, isoStringToDayjs } from '../utils/formatter';
import { FamilieIsoDate } from './tid';

export const TIDENES_MORGEN: Dayjs = familieDayjs().subtract(1000, 'year');
export const TIDENES_ENDE: Dayjs = familieDayjs().add(1000, 'year');

export interface IPeriode {
    // Format YYYY-MM-DD (ISO)
    fom?: FamilieIsoDate;
    tom?: FamilieIsoDate;
}

export const nyPeriode = (fom?: FamilieIsoDate, tom?: FamilieIsoDate): IPeriode => {
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
    if (!første.fom && !første.tom) {
        return 1;
    }
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
