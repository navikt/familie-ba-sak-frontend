import { isValid, parseISO } from 'date-fns';

import type { DagMånedÅr, FamilieIsoDate, MånedÅr, YearMonth } from './typer';
import { antallDagerIMåned } from './typer';
import { capString } from './utils';

export const erIsoStringGyldig = (familieIsoDato?: FamilieIsoDate): boolean => {
    if (!familieIsoDato) return false;
    else if (!familieIsoDato.includes('-')) return false;

    const dato = parseISO(familieIsoDato);

    const år: number = dato.getFullYear();
    const måned: number = dato.getMonth();
    const dag: number = dato.getDate();

    if (år < 1800 || år > 2500) {
        return false;
    }

    if (måned < 0 || måned > 11) {
        return false;
    }

    if (dag < 1 || dag > antallDagerIMåned({ år, måned: måned })) {
        return false;
    }

    if (isValid(dato)) {
        return true;
    }

    return true;
};

export const parseIso8601String = (familieIsoDato: FamilieIsoDate): DagMånedÅr => {
    const dato = parseISO(familieIsoDato);

    if (!isValid(dato)) {
        throw new Error(`Dato '${familieIsoDato}' er ugyldig`);
    }

    const år: number = dato.getFullYear();
    const måned: number = dato.getMonth();
    const dag: number = dato.getDate();

    if (år < 1800 || år > 2500) {
        throw new Error(`År fra dato '${familieIsoDato}' er '${år}' og er sannsynligvis feil`);
    }

    if (måned < 0 || måned > 11) {
        throw new Error(
            `Måned fra dato '${familieIsoDato}' er '${måned}' og er sannsynligvis feil`
        );
    }

    if (dag < 1 || dag > antallDagerIMåned({ år, måned: måned })) {
        throw new Error(`Dag fra dato '${familieIsoDato}' er '${dag}' og er sannsynligvis feil`);
    }

    return {
        dag,
        måned: måned,
        år,
    };
};

export const parseIso8601StringMånedÅr = (dato: YearMonth): MånedÅr => {
    const månedÅrDato = parseISO(dato);

    if (!isValid(månedÅrDato)) {
        throw new Error(`Dato '${dato}' er ugyldig`);
    }

    const år: number = månedÅrDato.getFullYear();
    const måned: number = månedÅrDato.getMonth();

    if (år < 1800 || år > 2500) {
        throw new Error(`År fra dato '${dato}' er '${år}' og er sannsynligvis feil`);
    }

    if (måned < 0 || måned > 11) {
        throw new Error(`Måned fra dato '${dato}' er '${måned}' og er sannsynligvis feil`);
    }

    return {
        måned: måned,
        år,
    };
};

export const parseIso8601MånedString = (familieIsoDato: FamilieIsoDate): DagMånedÅr => {
    const dato = parseISO(familieIsoDato);

    if (!isValid(dato)) {
        throw new Error(`Dato '${familieIsoDato}' er ugyldig`);
    }

    const år: number = dato.getFullYear();
    const måned: number = dato.getMonth();
    const dag = 1;

    if (år < 1800 || år > 2500) {
        throw new Error(`År fra dato '${familieIsoDato}' er '${år}' og er sannsynligvis feil`);
    }

    if (måned < 0 || måned > 11) {
        throw new Error(
            `Måned fra dato '${familieIsoDato}' er '${måned}' og er sannsynligvis feil`
        );
    }

    return {
        dag,
        måned: måned,
        år,
    };
};

export const serializeIso8601String = ({ år, måned, dag }: DagMånedÅr): FamilieIsoDate => {
    const yyyy = capString(4, år);
    const mm = capString(2, måned + 1);
    const dd = capString(2, dag);
    return `${yyyy}-${mm}-${dd}`;
};
