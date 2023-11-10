import { format, isValid, parseISO, startOfToday } from 'date-fns';

import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok } from '@navikt/familie-skjema';

import { Datoformat } from './formatter';

export type IsoDatoString = string; // Format YYYY-MM-DD (ISO)

export interface IPeriode {
    // Format YYYY-MM-DD (ISO)
    fom?: IsoDatoString;
    tom?: IsoDatoString;
}

export const dagensDato = startOfToday();

export const tidenesMorgen = new Date(1000, 1, 1);

export const tidenesEnde = new Date(3000, 1, 1);

interface DateTilFormatertStringProps {
    date?: Date;
    tilFormat: Datoformat;
    defaultString?: string;
}
export const dateTilFormatertString = ({
    date,
    tilFormat,
    defaultString = '',
}: DateTilFormatertStringProps): string => {
    return date && isValid(date) ? format(date, tilFormat) : defaultString;
};

export const dateTilIsoString = (dato?: Date): IsoDatoString =>
    dateTilFormatertString({ date: dato, tilFormat: Datoformat.ISO_DAG, defaultString: '' });

export const dateTilIsoStringEllerUndefined = (dato?: Date): IsoDatoString | undefined =>
    dato && isValid(dato) ? format(dato, Datoformat.ISO_DAG) : undefined;

interface IsoStringTilFormatertStringProps {
    isoDatoString: IsoDatoString | undefined;
    tilFormat: Datoformat;
    defaultString?: string;
}

export const isoStringTilFormatertString = ({
    isoDatoString,
    tilFormat,
    defaultString = '',
}: IsoStringTilFormatertStringProps): string => {
    const dato = isoDatoString ? parseISO(isoDatoString) : undefined;
    return dateTilFormatertString({
        date: dato,
        tilFormat: tilFormat,
        defaultString: defaultString,
    });
};

export const isoStringTilDate = (isoDatoString: IsoDatoString): Date => {
    const dato = parseISO(isoDatoString);

    if (!isValid(dato)) {
        throw new Error(`Dato '${isoDatoString}' er ugyldig`);
    }

    return dato;
};

interface IsoStringTilDateProps {
    isoDatoString: IsoDatoString | undefined;
    fallbackDate: Date;
}

export const isoStringTilDateMedFallback = ({
    isoDatoString,
    fallbackDate,
}: IsoStringTilDateProps) => (isoDatoString ? isoStringTilDate(isoDatoString) : fallbackDate);

export const validerGyldigDato = (felt: FeltState<Date | undefined>) =>
    felt.verdi && isValid(felt.verdi) ? ok(felt) : feil(felt, 'Du må velge en gyldig dato');

export const erIsoStringGyldig = (isoString?: IsoDatoString): boolean => {
    if (!isoString) return false;

    const dato = parseISO(isoString);
    return isValid(dato);
};
