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

interface FormatterDateProps {
    dato?: Date;
    datoformat: Datoformat;
    defaultString?: string;
}
export const formatterDate = ({
    dato,
    datoformat,
    defaultString = '',
}: FormatterDateProps): string => {
    return dato && isValid(dato) ? format(dato, datoformat) : defaultString;
};

export const formatterDateTilIsoString = (dato?: Date): string =>
    formatterDate({ dato: dato, datoformat: Datoformat.ISO_DAG, defaultString: '' });

export const formatterDateTilIsoStringEllerUndefined = (dato?: Date): string | undefined =>
    dato && isValid(dato) ? format(dato, Datoformat.ISO_DAG) : undefined;

interface FormatterIsoStringProps {
    isoDatoString: IsoDatoString | undefined;
    tilFormat: Datoformat;
    defaultString?: string;
}

export const formatterIsoDatoString = ({
    isoDatoString,
    tilFormat,
    defaultString = '',
}: FormatterIsoStringProps): string => {
    const dato = isoDatoString ? new Date(isoDatoString) : undefined;
    return formatterDate({ dato: dato, datoformat: tilFormat, defaultString: defaultString });
};

export const parseIsoString = (isoDatoString: IsoDatoString): Date => {
    const dato = parseISO(isoDatoString);

    if (!isValid(dato)) {
        throw new Error(`Dato '${isoDatoString}' er ugyldig`);
    }

    return dato;
};

interface ParserProps {
    isoDatoString: IsoDatoString | undefined;
    fallbackDate: Date;
}

export const parseIsoStringMedFallback = ({ isoDatoString, fallbackDate }: ParserProps) =>
    isoDatoString ? parseIsoString(isoDatoString) : fallbackDate;

export const validerGyldigDato = (felt: FeltState<Date | undefined>) =>
    felt.verdi && isValid(felt.verdi) ? ok(felt) : feil(felt, 'Du må velge en gyldig dato');
