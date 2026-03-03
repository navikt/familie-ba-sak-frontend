export const hentPar = (nøkkel, nøkkelPar, defaultValue) => {
    var _a, _b;
    return (_b = (_a = Object.values(nøkkelPar).find((par) => par.id === nøkkel)) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : defaultValue;
};
