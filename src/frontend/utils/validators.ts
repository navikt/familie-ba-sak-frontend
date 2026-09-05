import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, Valideringsstatus } from '@navikt/familie-skjema';
import { idnr } from '@navikt/fnrvalidator';
import { Adressebeskyttelsegradering } from '../typer/person';

const harFyltInnIdent = (felt: FeltState<string>): FeltState<string> => {
    return /^\d{11}$/.test(felt.verdi.replace(' ', '')) ? ok(felt) : feil(felt, 'Identen har ikke 11 tall');
};

const validerIdent = (felt: FeltState<string>): FeltState<string> => {
    return idnr(felt.verdi).status === 'valid' ? ok(felt) : feil(felt, 'Identen er ugyldig');
};

export const identValidator = (identFelt: FeltState<string>): FeltState<string> => {
    const validated = harFyltInnIdent(identFelt);
    if (validated.valideringsstatus !== Valideringsstatus.OK) {
        return validated;
    }

    return validerIdent(identFelt);
};

export const sjekkEr11Tall = (verdi: string): boolean => {
    return /^\d{11}$/.test(verdi.replace(' ', ''));
};

export const sjekkErGyldigIdent = (verdi: string): boolean => {
    return idnr(verdi).status === 'valid';
};

export const erPositivtHeltall = (string: string) => {
    const tall = Number(string);

    return Number.isInteger(tall) && tall > 0;
};

export const erLik0 = (string: string) => {
    const tall = Number(string);

    return Number.isInteger(tall) && tall === 0;
};

export const erAdresseBeskyttet = (adresseBeskyttelsesGradering: Adressebeskyttelsegradering | undefined) => {
    return (
        adresseBeskyttelsesGradering !== undefined &&
        adresseBeskyttelsesGradering !== null &&
        adresseBeskyttelsesGradering !== Adressebeskyttelsegradering.UGRADERT
    );
};
