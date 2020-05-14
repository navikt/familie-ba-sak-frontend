import moment from 'moment';

import { IPersonBeregning } from '../typer/beregning';
import { feil, IFelt, ok, Valideringsstatus, ValiderIFelt } from '../typer/felt';
import { datoformat } from './formatter';
import { IPeriode, stringToMoment, TIDENES_MORGEN, TIDENES_ENDE } from '../typer/periode';
import { Resultat } from '../typer/vilkår';

export type IIdentFelt = IFelt<string>;

// eslint-disable-next-line
const validator = require('@navikt/fnrvalidator');

const harFyltInnIdent = (felt: IIdentFelt): IIdentFelt => {
    return /^\d{11}$/.test(felt.verdi.replace(' ', ''))
        ? ok(felt)
        : feil(felt, 'Identen har ikke 11 tall');
};

const validerIdent = (felt: IIdentFelt): IIdentFelt => {
    return validator.idnr(felt.verdi).status === 'valid'
        ? ok(felt)
        : feil(felt, 'Identen er ugyldig');
};

export const identValidator = (identFelt: IIdentFelt): IIdentFelt => {
    const validated = harFyltInnIdent(identFelt);
    if (validated.valideringsstatus !== Valideringsstatus.OK) {
        return validated;
    }

    return validerIdent(identFelt);
};

export const erGyldigMånedDato = (felt: IFelt<IPersonBeregning>): IFelt<IPersonBeregning> => {
    return /^\d{2}\.\d{2}$/.test(felt.verdi.stønadFom) &&
        moment(felt.verdi.stønadFom, datoformat.MÅNED).isValid()
        ? ok(felt)
        : feil(felt, 'Ugyldig dato');
};

export const erPeriodeGyldig = (felt: IFelt<IPeriode>): IFelt<IPeriode> => {
    return moment(felt.verdi.fom).isValid() &&
        stringToMoment(felt.verdi.fom, TIDENES_MORGEN).isBefore(
            stringToMoment(felt.verdi.tom, TIDENES_ENDE)
        )
        ? ok(felt)
        : feil(felt, 'Ugyldig periode');
};

export const erResultatGyldig = (felt: IFelt<Resultat>): IFelt<Resultat> => {
    return felt.verdi !== Resultat.KANSKJE ? ok(felt) : feil(felt, 'Resultat er ikke satt');
};

const ikkeUtfyltFelt = 'Feltet er påkrevd, men mangler input';
export const erUtfylt = (felt: IFelt<string>): IFelt<string> => {
    if (felt.verdi === '') {
        return feil(felt, ikkeUtfyltFelt);
    }
    return ok(felt);
};

export const lagInitiellFelt = <T>(verdi: T, valideringsfunksjon: ValiderIFelt<T>): IFelt<T> => {
    return {
        feilmelding: ikkeUtfyltFelt,
        valideringsFunksjon: valideringsfunksjon,
        valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        verdi,
    };
};

export const validerFelt = <T>(nyVerdi: T, felt: IFelt<T>): IFelt<T> => {
    return felt.valideringsFunksjon({
        ...felt,
        verdi: nyVerdi,
    });
};

export const ikkeValider = <T>(felt: IFelt<T>): IFelt<T> => {
    return ok(felt);
};
