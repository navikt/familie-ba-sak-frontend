import moment from 'moment';

import { IPersonBeregning } from '../typer/behandle';
import { feil, IFelt, ok, Valideringsstatus, ValiderIFelt } from '../typer/felt';
import { datoformat } from './formatter';

export type IIdentFelt = IFelt<string>;

// tslint:disable-next-line: no-var-requires
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

export const erGyldigBegrunnelse = (felt: IFelt<string>): IFelt<string> => {
    if (felt.verdi === '') {
        return feil(felt, 'Begrunnelse er påkrevd. Vennligst fyll ut en begrunnelse til vedtaket.');
    }
    return ok(felt);
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
