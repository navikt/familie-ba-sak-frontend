import { format, isValid, startOfToday } from 'date-fns';

import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok } from '@navikt/familie-skjema';

import { Datoformat } from './formatter';

export type IsoDatoString = string; // Format YYYY-MM-DD (ISO)

export const dagensDato = () => startOfToday();

export const formatterDateTilIsoString = (dato?: Date): string =>
    dato && isValid(dato) ? format(dato, Datoformat.ISO_DAG) : '';

export const formatterDateTilIsoStringEllerUndefined = (dato?: Date): string | undefined =>
    dato && isValid(dato) ? format(dato, Datoformat.ISO_DAG) : undefined;

export const validerGyldigDato = (felt: FeltState<Date | undefined>) =>
    felt.verdi && isValid(felt.verdi) ? ok(felt) : feil(felt, 'Du må velge en gyldig dato');
