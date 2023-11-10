import { isValid, parseISO } from 'date-fns';

import type { FamilieIsoDate, MånedÅr, YearMonth } from './typer';

export const erIsoStringGyldig = (familieIsoDato?: FamilieIsoDate): boolean => {
    if (!familieIsoDato) return false;

    const dato = parseISO(familieIsoDato);
    return isValid(dato);
};

export const parseIso8601StringMånedÅr = (dato: YearMonth): MånedÅr => {
    const månedÅrDato = parseISO(dato);

    if (!isValid(månedÅrDato)) {
        throw new Error(`Dato '${dato}' er ugyldig`);
    }

    return {
        måned: månedÅrDato.getMonth(),
        år: månedÅrDato.getFullYear(),
    };
};
