import { isValid, parseISO } from 'date-fns';

import type { DagMånedÅr, FamilieIsoDate, MånedÅr, YearMonth } from './typer';
import { capString } from './utils';

export const erIsoStringGyldig = (familieIsoDato?: FamilieIsoDate): boolean => {
    if (!familieIsoDato) return false;
    else if (!familieIsoDato.includes('-')) return false;

    const dato = parseISO(familieIsoDato);

    const år: number = dato.getFullYear();

    if (år < 1800 || år > 2500) {
        return false;
    }

    return isValid(dato);
};

export const parseIso8601String = (familieIsoDato: FamilieIsoDate): DagMånedÅr => {
    const dato = parseISO(familieIsoDato);

    if (!isValid(dato)) {
        throw new Error(`Dato '${familieIsoDato}' er ugyldig`);
    }

    const år: number = dato.getFullYear();

    if (år < 1800 || år > 2500) {
        throw new Error(`År fra dato '${familieIsoDato}' er '${år}' og er sannsynligvis feil`);
    }

    return {
        dag: dato.getDate(),
        måned: dato.getMonth(),
        år,
    };
};

export const parseIso8601StringMånedÅr = (dato: YearMonth): MånedÅr => {
    const månedÅrDato = parseISO(dato);

    if (!isValid(månedÅrDato)) {
        throw new Error(`Dato '${dato}' er ugyldig`);
    }

    const år: number = månedÅrDato.getFullYear();

    if (år < 1800 || år > 2500) {
        throw new Error(`År fra dato '${dato}' er '${år}' og er sannsynligvis feil`);
    }

    return {
        måned: månedÅrDato.getMonth(),
        år,
    };
};

export const parseIso8601MånedString = (familieIsoDato: FamilieIsoDate): DagMånedÅr => {
    const dato = parseISO(familieIsoDato);

    if (!isValid(dato)) {
        throw new Error(`Dato '${familieIsoDato}' er ugyldig`);
    }

    const år: number = dato.getFullYear();

    if (år < 1800 || år > 2500) {
        throw new Error(`År fra dato '${familieIsoDato}' er '${år}' og er sannsynligvis feil`);
    }

    return {
        dag: 1,
        måned: dato.getMonth(),
        år,
    };
};

export const serializeIso8601String = ({ år, måned, dag }: DagMånedÅr): FamilieIsoDate => {
    const yyyy = capString(4, år);
    const mm = capString(2, måned + 1);
    const dd = capString(2, dag);
    return `${yyyy}-${mm}-${dd}`;
};
