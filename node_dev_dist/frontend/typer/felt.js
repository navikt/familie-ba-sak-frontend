"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Valideringsstatus;
(function (Valideringsstatus) {
    Valideringsstatus["FEIL"] = "FEIL";
    Valideringsstatus["ADVARSEL"] = "ADVARSEL";
    Valideringsstatus["OK"] = "OK";
    Valideringsstatus["IKKE_VALIDERT"] = "IKKE_VALIDERT";
})(Valideringsstatus = exports.Valideringsstatus || (exports.Valideringsstatus = {}));
exports.ok = (felt) => {
    return {
        feilmelding: '',
        valideringsFunksjon: felt.valideringsFunksjon,
        valideringsstatus: Valideringsstatus.OK,
        verdi: felt.verdi,
    };
};
exports.feil = (felt, feilmelding) => {
    return {
        feilmelding,
        valideringsFunksjon: felt.valideringsFunksjon,
        valideringsstatus: Valideringsstatus.FEIL,
        verdi: felt.verdi,
    };
};
exports.nyttFelt = (verdi, valideringsFunksjon) => ({
    feilmelding: '',
    valideringsFunksjon,
    valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
    verdi,
});
//# sourceMappingURL=felt.js.map