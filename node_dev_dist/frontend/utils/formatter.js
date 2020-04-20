"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
var datoformat;
(function (datoformat) {
    datoformat["M\u00C5NED"] = "MM.YY";
    datoformat["DATO"] = "DD.MM.YYYY";
    datoformat["DATO_FORKORTTET"] = "DD.MM.YY";
    datoformat["DATO_FORLENGET"] = "LL";
    datoformat["ISO_M\u00C5NED"] = "YYYY-MM";
    datoformat["ISO_DAG"] = "YYYY-MM-DD";
    datoformat["DATO_TID"] = "DD.MM.YY HH:mm";
    datoformat["TID"] = "HH:mm";
})(datoformat = exports.datoformat || (exports.datoformat = {}));
var datoformatNorsk;
(function (datoformatNorsk) {
    datoformatNorsk["DATO"] = "DD.MM.\u00C5\u00C5\u00C5\u00C5";
})(datoformatNorsk = exports.datoformatNorsk || (exports.datoformatNorsk = {}));
exports.formaterIsoDato = (dato, tilFormat, defaultString) => {
    const momentDato = moment_1.default(dato);
    return momentDato.isValid() && dato
        ? momentDato.format(tilFormat)
        : dato || defaultString || '';
};
exports.formaterDato = (dato, tilFormat) => {
    return dato.isValid() ? dato.format(tilFormat) : '';
};
exports.hentAlder = (dato) => {
    const momentDato = moment_1.default(dato);
    return momentDato.isValid() ? moment_1.default().diff(momentDato, 'years') : 0;
};
exports.formaterBeløp = (beløp) => {
    return `${beløp.toLocaleString('no-NO')} kr`;
};
//# sourceMappingURL=formatter.js.map