"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const felt_1 = require("../typer/felt");
const formatter_1 = require("./formatter");
const periode_1 = require("../typer/periode");
const vilk_r_1 = require("../typer/vilk\u00E5r");
// eslint-disable-next-line
const validator = require('@navikt/fnrvalidator');
const harFyltInnIdent = (felt) => {
    return /^\d{11}$/.test(felt.verdi.replace(' ', ''))
        ? felt_1.ok(felt)
        : felt_1.feil(felt, 'Identen har ikke 11 tall');
};
const validerIdent = (felt) => {
    return validator.idnr(felt.verdi).status === 'valid'
        ? felt_1.ok(felt)
        : felt_1.feil(felt, 'Identen er ugyldig');
};
exports.identValidator = (identFelt) => {
    const validated = harFyltInnIdent(identFelt);
    if (validated.valideringsstatus !== felt_1.Valideringsstatus.OK) {
        return validated;
    }
    return validerIdent(identFelt);
};
exports.erGyldigMånedDato = (felt) => {
    return /^\d{2}\.\d{2}$/.test(felt.verdi.stønadFom) &&
        moment_1.default(felt.verdi.stønadFom, formatter_1.datoformat.MÅNED).isValid()
        ? felt_1.ok(felt)
        : felt_1.feil(felt, 'Ugyldig dato');
};
exports.erPeriodeGyldig = (felt) => {
    return moment_1.default(felt.verdi.fom).isValid() &&
        periode_1.stringToMoment(felt.verdi.fom, periode_1.TIDENES_MORGEN).isBefore(periode_1.stringToMoment(felt.verdi.tom, periode_1.TIDENES_ENDE))
        ? felt_1.ok(felt)
        : felt_1.feil(felt, 'Ugyldig periode');
};
exports.erResultatGyldig = (felt) => {
    return felt.verdi !== vilk_r_1.Resultat.KANSKJE ? felt_1.ok(felt) : felt_1.feil(felt, 'Resultat er ikke satt');
};
exports.erGyldigBegrunnelse = (felt) => {
    if (felt.verdi === '') {
        return felt_1.feil(felt, 'Begrunnelse er påkrevd. Vennligst fyll ut en begrunnelse til vedtaket.');
    }
    return felt_1.ok(felt);
};
const ikkeUtfyltFelt = 'Feltet er påkrevd, men mangler input';
exports.erUtfylt = (felt) => {
    if (felt.verdi === '') {
        return felt_1.feil(felt, ikkeUtfyltFelt);
    }
    return felt_1.ok(felt);
};
exports.lagInitiellFelt = (verdi, valideringsfunksjon) => {
    return {
        feilmelding: ikkeUtfyltFelt,
        valideringsFunksjon: valideringsfunksjon,
        valideringsstatus: felt_1.Valideringsstatus.IKKE_VALIDERT,
        verdi,
    };
};
exports.validerFelt = (nyVerdi, felt) => {
    return felt.valideringsFunksjon(Object.assign(Object.assign({}, felt), { verdi: nyVerdi }));
};
//# sourceMappingURL=validators.js.map