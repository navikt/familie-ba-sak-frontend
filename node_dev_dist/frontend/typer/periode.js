"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const formatter_1 = require("../utils/formatter");
exports.TIDENES_MORGEN = moment_1.default(-8640000000000000);
exports.TIDENES_ENDE = moment_1.default(8640000000000000);
exports.nyPeriode = (fom, tom) => {
    return {
        fom: fom !== '' && fom !== null ? fom : undefined,
        tom: tom !== '' && tom !== null ? tom : undefined,
    };
};
exports.nyMoment = (dato) => {
    return moment_1.default(dato, formatter_1.datoformat.ISO_DAG);
};
exports.periodeToString = (periode, format = formatter_1.datoformat.DATO) => {
    return `${formatter_1.formaterIsoDato(periode.fom, format, formatter_1.datoformatNorsk.DATO.toLowerCase())} - ${formatter_1.formaterIsoDato(periode.tom, format)}`;
};
exports.formaterMomentTilStringDato = (dato) => {
    return dato.format(formatter_1.datoformat.ISO_DAG);
};
exports.stringToMoment = (dato, defaultValue) => {
    return dato && dato !== '' ? moment_1.default(dato, formatter_1.datoformat.ISO_DAG) : defaultValue;
};
exports.diff = (første, annen) => {
    return exports.stringToMoment(første.fom, exports.TIDENES_MORGEN).diff(exports.stringToMoment(annen.fom, exports.TIDENES_MORGEN), 'day');
};
exports.slåSammen = (første, annen) => {
    return {
        fom: første.fom,
        tom: annen.tom,
    };
};
exports.etterfølgende = (første, annen) => {
    return exports.stringToMoment(første.tom, exports.TIDENES_ENDE)
        .add(1, 'day')
        .isSame(exports.stringToMoment(annen.fom, exports.TIDENES_MORGEN));
};
exports.ikkeEtterfølgendeOgHullPåOver1Måned = (første, annen) => {
    return (!exports.etterfølgende(første, annen) &&
        exports.stringToMoment(annen.fom, exports.TIDENES_MORGEN).diff(exports.stringToMoment(første.tom, exports.TIDENES_ENDE), 'days') >= 28 &&
        exports.stringToMoment(annen.fom, exports.TIDENES_MORGEN).month() -
            exports.stringToMoment(første.tom, exports.TIDENES_ENDE).month() >
            1);
};
exports.kanErstatte = (skalErstatte, annen) => {
    return (exports.stringToMoment(skalErstatte.fom, exports.TIDENES_MORGEN).isSameOrBefore(exports.stringToMoment(annen.fom, exports.TIDENES_MORGEN)) &&
        exports.stringToMoment(skalErstatte.tom, exports.TIDENES_ENDE).isSameOrAfter(exports.stringToMoment(annen.tom, exports.TIDENES_ENDE)));
};
exports.kanSplitte = (skalSplitte, annen) => {
    return (exports.stringToMoment(skalSplitte.fom, exports.TIDENES_MORGEN).isBetween(exports.stringToMoment(annen.fom, exports.TIDENES_MORGEN), exports.stringToMoment(annen.tom, exports.TIDENES_ENDE)) &&
        exports.stringToMoment(skalSplitte.tom, exports.TIDENES_ENDE).isBetween(exports.stringToMoment(annen.fom, exports.TIDENES_MORGEN), exports.stringToMoment(annen.tom, exports.TIDENES_ENDE)));
};
exports.kanFlytteFom = (skalFlytteFom, annen) => {
    return (exports.stringToMoment(skalFlytteFom.fom, exports.TIDENES_MORGEN).isSameOrBefore(exports.stringToMoment(annen.fom, exports.TIDENES_MORGEN)) &&
        exports.stringToMoment(skalFlytteFom.tom, exports.TIDENES_ENDE).isBetween(exports.stringToMoment(annen.fom, exports.TIDENES_MORGEN), exports.stringToMoment(annen.tom, exports.TIDENES_ENDE)));
};
exports.kanFlytteTom = (skalFlytteTom, annen) => {
    return (exports.stringToMoment(skalFlytteTom.fom, exports.TIDENES_MORGEN).isBetween(exports.stringToMoment(annen.fom, exports.TIDENES_MORGEN), exports.stringToMoment(annen.tom, exports.TIDENES_ENDE)) &&
        exports.stringToMoment(skalFlytteTom.tom, exports.TIDENES_ENDE).isSameOrAfter(exports.stringToMoment(annen.tom, exports.TIDENES_ENDE)));
};
exports.overlapperMinstEttSted = (første, annen) => {
    const førsteFom = exports.stringToMoment(første.fom, exports.TIDENES_MORGEN);
    const førsteTom = exports.stringToMoment(første.tom, exports.TIDENES_ENDE);
    const annenFom = exports.stringToMoment(annen.fom, exports.TIDENES_MORGEN);
    const annenTom = exports.stringToMoment(annen.tom, exports.TIDENES_ENDE);
    return (førsteFom.isBetween(annenFom, annenTom) ||
        førsteTom.isBetween(annenFom, annenTom) ||
        (førsteFom.isSameOrBefore(annenFom) && førsteTom.isSameOrAfter(annenTom)));
};
//# sourceMappingURL=periode.js.map