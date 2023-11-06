import { format, isValid, startOfToday } from 'date-fns';

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

interface FormatterProps {
    dato?: Date;
    datoformat: Datoformat;
    defaultString?: string;
}
export const formatterDate = ({ dato, datoformat, defaultString = '' }: FormatterProps): string => {
    return dato && isValid(dato) ? format(dato, datoformat) : defaultString;
};

export const formatterDateTilIsoString = (dato?: Date): string =>
    formatterDate({ dato: dato, datoformat: Datoformat.ISO_DAG, defaultString: '' });

export const formatterDateTilIsoStringEllerUndefined = (dato?: Date): string | undefined =>
    dato && isValid(dato) ? format(dato, Datoformat.ISO_DAG) : undefined;

export const validerGyldigDato = (felt: FeltState<Date | undefined>) =>
    felt.verdi && isValid(felt.verdi) ? ok(felt) : feil(felt, 'Du må velge en gyldig dato');
