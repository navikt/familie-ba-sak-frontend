"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RessursStatus;
(function (RessursStatus) {
    RessursStatus["FEILET"] = "FEILET";
    RessursStatus["HENTER"] = "HENTER";
    RessursStatus["IKKE_HENTET"] = "IKKE_HENTET";
    RessursStatus["IKKE_TILGANG"] = "IKKE_TILGANG";
    RessursStatus["SUKSESS"] = "SUKSESS";
})(RessursStatus = exports.RessursStatus || (exports.RessursStatus = {}));
exports.byggTomRessurs = () => {
    return {
        status: RessursStatus.IKKE_HENTET,
    };
};
exports.byggFeiletRessurs = (melding, error) => {
    return {
        errorMelding: error ? error.message : undefined,
        melding,
        status: RessursStatus.FEILET,
    };
};
exports.byggSuksessRessurs = (data) => {
    return {
        data,
        status: RessursStatus.SUKSESS,
    };
};
//# sourceMappingURL=ressurs.js.map