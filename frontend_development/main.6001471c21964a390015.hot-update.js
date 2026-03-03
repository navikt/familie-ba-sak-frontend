"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/sider/Fagsak/Behandling/Sider/Simulering/SimuleringPanel.tsx"
/*!***********************************************************************************!*\
  !*** ./src/frontend/sider/Fagsak/Behandling/Sider/Simulering/SimuleringPanel.tsx ***!
  \***********************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/isBefore.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/ds-tokens/dist/tokens */ "./node_modules/@navikt/ds-tokens/dist/tokens.js");
/* harmony import */ var _utils_dato__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../utils/dato */ "./src/frontend/utils/dato/index.ts");
/* harmony import */ var _utils_formatter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../utils/formatter */ "./src/frontend/utils/formatter.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject, _templateObject2;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }







var BoldTekstMedFarge = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.BodyShort)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    color: ", ";\n    font-weight: ", ";\n"])), function (props) {
  return props.$farge ? _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.TextSuccessSubtle : _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.TextNeutral;
}, _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.FontWeightBold);
_c = BoldTekstMedFarge;
var HStackMedBorderTop = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.HStack)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    border-top: 1px solid ", ";\n    padding-top: ", ";\n"])), _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.BorderNeutral, _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.Space16);
_c2 = HStackMedBorderTop;
var SimuleringPanel = function SimuleringPanel(_ref) {
  var _perioder$find;
  var _ref$simulering = _ref.simulering,
    feilutbetaling = _ref$simulering.feilutbetaling,
    fom = _ref$simulering.fom,
    etterbetaling = _ref$simulering.etterbetaling,
    fomDatoNestePeriode = _ref$simulering.fomDatoNestePeriode,
    perioder = _ref$simulering.perioder,
    tomSisteUtbetaling = _ref$simulering.tomSisteUtbetaling;
  var kapitaliserTekst = function kapitaliserTekst(tekst) {
    return tekst.charAt(0).toUpperCase() + tekst.slice(1).toLowerCase();
  };
  var formaterBeløpEllerDashOmUndefined = function formaterBeløpEllerDashOmUndefined(beløp) {
    return !beløp || beløp === 0 ? '-' : (0,_utils_formatter__WEBPACK_IMPORTED_MODULE_7__["formaterBeløp"])(beløp);
  };
  var nestePeriode = fomDatoNestePeriode ? (_perioder$find = perioder.find(function (periode) {
    return periode.fom === fomDatoNestePeriode;
  })) !== null && _perioder$find !== void 0 ? _perioder$find : undefined : undefined;
  var erFørNestePeriode = function erFørNestePeriode(periode) {
    return !fomDatoNestePeriode || (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.isBefore)((0,_utils_dato__WEBPACK_IMPORTED_MODULE_6__.isoStringTilDate)(periode.fom), (0,_utils_dato__WEBPACK_IMPORTED_MODULE_6__.isoStringTilDate)(fomDatoNestePeriode));
  };
  var panelTittel = function panelTittel() {
    var utbetaltePerioder = perioder.filter(function (periode) {
      return erFørNestePeriode(periode);
    });
    if (utbetaltePerioder.length === 0) {
      return 'Totalt';
    }
    if (utbetaltePerioder.length === 1) {
      return "Total for ".concat((0,_utils_dato__WEBPACK_IMPORTED_MODULE_6__.isoStringTilFormatertString)({
        isoString: perioder[0].fom,
        tilFormat: _utils_dato__WEBPACK_IMPORTED_MODULE_6__.Datoformat.MÅNED_ÅR_NAVN
      }));
    }
    return "Totalt for perioden ".concat((0,_utils_dato__WEBPACK_IMPORTED_MODULE_6__.isoStringTilFormatertString)({
      isoString: fom,
      tilFormat: _utils_dato__WEBPACK_IMPORTED_MODULE_6__.Datoformat.DATO
    }), " - ").concat((0,_utils_dato__WEBPACK_IMPORTED_MODULE_6__.isoStringTilFormatertString)({
      isoString: tomSisteUtbetaling,
      tilFormat: _utils_dato__WEBPACK_IMPORTED_MODULE_6__.Datoformat.DATO
    }));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Box, {
    maxWidth: '26rem',
    marginBlock: 'space-0 space-40',
    borderColor: "neutral-strong",
    borderWidth: "1",
    padding: "space-40"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.VStack, {
    "aria-label": 'Simuleringsoversikt',
    gap: "space-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.HStack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.BodyShort, {
    weight: "semibold"
  }, panelTittel())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.HStack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.BodyShort, null, "Feilutbetaling"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(BoldTekstMedFarge, {
    $farge: feilutbetaling > 0 ? _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.TextDanger : _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.TextNeutral
  }, formaterBeløpEllerDashOmUndefined(feilutbetaling))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.HStack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.BodyShort, null, "Etterbetaling"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(BoldTekstMedFarge, null, formaterBeløpEllerDashOmUndefined(etterbetaling))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(HStackMedBorderTop, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.BodyShort, {
    weight: "semibold"
  }, "Neste utbetaling"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Spacer, null), !nestePeriode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.BodyShort, {
    weight: "semibold"
  }, "-")), nestePeriode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.HStack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.BodyShort, null, kapitaliserTekst((0,_utils_dato__WEBPACK_IMPORTED_MODULE_6__.isoStringTilFormatertString)({
    isoString: fomDatoNestePeriode,
    tilFormat: _utils_dato__WEBPACK_IMPORTED_MODULE_6__.Datoformat.MÅNED_ÅR_NAVN
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(BoldTekstMedFarge, {
    $farge: (nestePeriode === null || nestePeriode === void 0 ? void 0 : nestePeriode.resultat) && nestePeriode.resultat > 0
  }, formaterBeløpEllerDashOmUndefined(nestePeriode === null || nestePeriode === void 0 ? void 0 : nestePeriode.resultat)))));
};
_c3 = SimuleringPanel;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SimuleringPanel);
var _c, _c2, _c3;
__webpack_require__.$Refresh$.register(_c, "BoldTekstMedFarge");
__webpack_require__.$Refresh$.register(_c2, "HStackMedBorderTop");
__webpack_require__.$Refresh$.register(_c3, "SimuleringPanel");

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (typeof __react_refresh_error_overlay__ !== 'undefined') {
			errorOverlay = __react_refresh_error_overlay__;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("28bacbc76645aca8f56d")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBQTtBQUFBK0Msc0NBQUEsQ0FBQTVDLEdBQUE7QUFBQTRDLHNDQUFBLENBQUFELEdBQUEscUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzFIL0Isc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9GYWdzYWsvQmVoYW5kbGluZy9TaWRlci9TaW11bGVyaW5nL1NpbXVsZXJpbmdQYW5lbC50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgaXNCZWZvcmUgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQm9keVNob3J0LCBCb3gsIEhTdGFjaywgU3BhY2VyLCBWU3RhY2sgfSBmcm9tICdAbmF2aWt0L2RzLXJlYWN0JztcbmltcG9ydCB7XG4gICAgQm9yZGVyTmV1dHJhbCxcbiAgICBGb250V2VpZ2h0Qm9sZCxcbiAgICBTcGFjZTE2LFxuICAgIFRleHREYW5nZXIsXG4gICAgVGV4dE5ldXRyYWwsXG4gICAgVGV4dFN1Y2Nlc3MsXG4gICAgVGV4dFN1Y2Nlc3NTdWJ0bGUsXG59IGZyb20gJ0BuYXZpa3QvZHMtdG9rZW5zL2Rpc3QvdG9rZW5zJztcblxuaW1wb3J0IHR5cGUgeyBJU2ltdWxlcmluZ0RUTywgSVNpbXVsZXJpbmdQZXJpb2RlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvc2ltdWxlcmluZyc7XG5pbXBvcnQgeyBEYXRvZm9ybWF0LCBpc29TdHJpbmdUaWxEYXRlLCBpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9kYXRvJztcbmltcG9ydCB7IGZvcm1hdGVyQmVsw7hwIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvZm9ybWF0dGVyJztcblxuY29uc3QgQm9sZFRla3N0TWVkRmFyZ2UgPSBzdHlsZWQoQm9keVNob3J0KTx7ICRmYXJnZT86IHN0cmluZyB9PmBcbiAgICBjb2xvcjogJHtwcm9wcyA9PiAocHJvcHMuJGZhcmdlID8gVGV4dFN1Y2Nlc3NTdWJ0bGUgOiBUZXh0TmV1dHJhbCl9O1xuICAgIGZvbnQtd2VpZ2h0OiAke0ZvbnRXZWlnaHRCb2xkfTtcbmA7XG5cbmNvbnN0IEhTdGFja01lZEJvcmRlclRvcCA9IHN0eWxlZChIU3RhY2spYFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAke0JvcmRlck5ldXRyYWx9O1xuICAgIHBhZGRpbmctdG9wOiAke1NwYWNlMTZ9O1xuYDtcblxuaW50ZXJmYWNlIElTaW11bGVyaW5nUHJvcHMge1xuICAgIHNpbXVsZXJpbmc6IElTaW11bGVyaW5nRFRPO1xufVxuXG5jb25zdCBTaW11bGVyaW5nUGFuZWw6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PElTaW11bGVyaW5nUHJvcHM+ID0gKHtcbiAgICBzaW11bGVyaW5nOiB7IGZlaWx1dGJldGFsaW5nLCBmb20sIGV0dGVyYmV0YWxpbmcsIGZvbURhdG9OZXN0ZVBlcmlvZGUsIHBlcmlvZGVyLCB0b21TaXN0ZVV0YmV0YWxpbmcgfSxcbn0pID0+IHtcbiAgICBjb25zdCBrYXBpdGFsaXNlclRla3N0ID0gKHRla3N0OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgICAgICByZXR1cm4gdGVrc3QuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0ZWtzdC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBmb3JtYXRlckJlbMO4cEVsbGVyRGFzaE9tVW5kZWZpbmVkID0gKGJlbMO4cD86IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgICAgIHJldHVybiAhYmVsw7hwIHx8IGJlbMO4cCA9PT0gMCA/ICctJyA6IGZvcm1hdGVyQmVsw7hwKGJlbMO4cCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG5lc3RlUGVyaW9kZSA9IGZvbURhdG9OZXN0ZVBlcmlvZGVcbiAgICAgICAgPyAocGVyaW9kZXIuZmluZChwZXJpb2RlID0+IHBlcmlvZGUuZm9tID09PSBmb21EYXRvTmVzdGVQZXJpb2RlKSA/PyB1bmRlZmluZWQpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgZXJGw7hyTmVzdGVQZXJpb2RlID0gKHBlcmlvZGU6IElTaW11bGVyaW5nUGVyaW9kZSkgPT5cbiAgICAgICAgIWZvbURhdG9OZXN0ZVBlcmlvZGUgfHwgaXNCZWZvcmUoaXNvU3RyaW5nVGlsRGF0ZShwZXJpb2RlLmZvbSksIGlzb1N0cmluZ1RpbERhdGUoZm9tRGF0b05lc3RlUGVyaW9kZSkpO1xuXG4gICAgY29uc3QgcGFuZWxUaXR0ZWwgPSAoKTogc3RyaW5nID0+IHtcbiAgICAgICAgY29uc3QgdXRiZXRhbHRlUGVyaW9kZXIgPSBwZXJpb2Rlci5maWx0ZXIocGVyaW9kZSA9PiBlckbDuHJOZXN0ZVBlcmlvZGUocGVyaW9kZSkpO1xuICAgICAgICBpZiAodXRiZXRhbHRlUGVyaW9kZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1RvdGFsdCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0YmV0YWx0ZVBlcmlvZGVyLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGBUb3RhbCBmb3IgJHtpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcoe1xuICAgICAgICAgICAgICAgIGlzb1N0cmluZzogcGVyaW9kZXJbMF0uZm9tLFxuICAgICAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5Nw4VORURfw4VSX05BVk4sXG4gICAgICAgICAgICB9KX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgVG90YWx0IGZvciBwZXJpb2RlbiAke2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICBpc29TdHJpbmc6IGZvbSxcbiAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5EQVRPLFxuICAgICAgICB9KX0gLSAke2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICBpc29TdHJpbmc6IHRvbVNpc3RlVXRiZXRhbGluZyxcbiAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5EQVRPLFxuICAgICAgICB9KX1gO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8Qm94XG4gICAgICAgICAgICBtYXhXaWR0aD17JzI2cmVtJ31cbiAgICAgICAgICAgIG1hcmdpbkJsb2NrPXsnc3BhY2UtMCBzcGFjZS00MCd9XG4gICAgICAgICAgICBib3JkZXJDb2xvcj1cIm5ldXRyYWwtc3Ryb25nXCJcbiAgICAgICAgICAgIGJvcmRlcldpZHRoPVwiMVwiXG4gICAgICAgICAgICBwYWRkaW5nPVwic3BhY2UtNDBcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8VlN0YWNrIGFyaWEtbGFiZWw9eydTaW11bGVyaW5nc292ZXJzaWt0J30gZ2FwPVwic3BhY2UtMTJcIj5cbiAgICAgICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0IHdlaWdodD1cInNlbWlib2xkXCI+e3BhbmVsVGl0dGVsKCl9PC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICAgICAgPEhTdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydD5GZWlsdXRiZXRhbGluZzwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICA8U3BhY2VyIC8+XG4gICAgICAgICAgICAgICAgICAgIDxCb2xkVGVrc3RNZWRGYXJnZSAkZmFyZ2U9e2ZlaWx1dGJldGFsaW5nID4gMCA/IFRleHREYW5nZXIgOiBUZXh0TmV1dHJhbH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0ZXJCZWzDuHBFbGxlckRhc2hPbVVuZGVmaW5lZChmZWlsdXRiZXRhbGluZyl9XG4gICAgICAgICAgICAgICAgICAgIDwvQm9sZFRla3N0TWVkRmFyZ2U+XG4gICAgICAgICAgICAgICAgPC9IU3RhY2s+XG5cbiAgICAgICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0PkV0dGVyYmV0YWxpbmc8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgICAgICAgICAgICA8Qm9sZFRla3N0TWVkRmFyZ2U+e2Zvcm1hdGVyQmVsw7hwRWxsZXJEYXNoT21VbmRlZmluZWQoZXR0ZXJiZXRhbGluZyl9PC9Cb2xkVGVrc3RNZWRGYXJnZT5cbiAgICAgICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgICAgICA8SFN0YWNrTWVkQm9yZGVyVG9wPlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0IHdlaWdodD1cInNlbWlib2xkXCI+TmVzdGUgdXRiZXRhbGluZzwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICA8U3BhY2VyIC8+XG4gICAgICAgICAgICAgICAgICAgIHshbmVzdGVQZXJpb2RlICYmIDxCb2R5U2hvcnQgd2VpZ2h0PVwic2VtaWJvbGRcIj4tPC9Cb2R5U2hvcnQ+fVxuICAgICAgICAgICAgICAgIDwvSFN0YWNrTWVkQm9yZGVyVG9wPlxuICAgICAgICAgICAgICAgIHtuZXN0ZVBlcmlvZGUgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7a2FwaXRhbGlzZXJUZWtzdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzb1N0cmluZzogZm9tRGF0b05lc3RlUGVyaW9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5Nw4VORURfw4VSX05BVk4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJvbGRUZWtzdE1lZEZhcmdlICRmYXJnZT17bmVzdGVQZXJpb2RlPy5yZXN1bHRhdCAmJiBuZXN0ZVBlcmlvZGUucmVzdWx0YXQgPiAwfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0ZXJCZWzDuHBFbGxlckRhc2hPbVVuZGVmaW5lZChuZXN0ZVBlcmlvZGU/LnJlc3VsdGF0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQm9sZFRla3N0TWVkRmFyZ2U+XG4gICAgICAgICAgICAgICAgICAgIDwvSFN0YWNrPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L1ZTdGFjaz5cbiAgICAgICAgPC9Cb3g+XG4gICAgKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTaW11bGVyaW5nUGFuZWw7XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIyOGJhY2JjNzY2NDVhY2E4ZjU2ZFwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsImlzQmVmb3JlIiwic3R5bGVkIiwiQm9keVNob3J0IiwiQm94IiwiSFN0YWNrIiwiU3BhY2VyIiwiVlN0YWNrIiwiQm9yZGVyTmV1dHJhbCIsIkZvbnRXZWlnaHRCb2xkIiwiU3BhY2UxNiIsIlRleHREYW5nZXIiLCJUZXh0TmV1dHJhbCIsIlRleHRTdWNjZXNzU3VidGxlIiwiRGF0b2Zvcm1hdCIsImlzb1N0cmluZ1RpbERhdGUiLCJpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmciLCJmb3JtYXRlckJlbMO4cCIsIkJvbGRUZWtzdE1lZEZhcmdlIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbCIsInByb3BzIiwiJGZhcmdlIiwiX2MiLCJIU3RhY2tNZWRCb3JkZXJUb3AiLCJfdGVtcGxhdGVPYmplY3QyIiwiX2MyIiwiU2ltdWxlcmluZ1BhbmVsIiwiX3JlZiIsIl9wZXJpb2RlciRmaW5kIiwiX3JlZiRzaW11bGVyaW5nIiwic2ltdWxlcmluZyIsImZlaWx1dGJldGFsaW5nIiwiZm9tIiwiZXR0ZXJiZXRhbGluZyIsImZvbURhdG9OZXN0ZVBlcmlvZGUiLCJwZXJpb2RlciIsInRvbVNpc3RlVXRiZXRhbGluZyIsImthcGl0YWxpc2VyVGVrc3QiLCJ0ZWtzdCIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0b0xvd2VyQ2FzZSIsImZvcm1hdGVyQmVsw7hwRWxsZXJEYXNoT21VbmRlZmluZWQiLCJiZWzDuHAiLCJuZXN0ZVBlcmlvZGUiLCJmaW5kIiwicGVyaW9kZSIsInVuZGVmaW5lZCIsImVyRsO4ck5lc3RlUGVyaW9kZSIsInBhbmVsVGl0dGVsIiwidXRiZXRhbHRlUGVyaW9kZXIiLCJmaWx0ZXIiLCJsZW5ndGgiLCJjb25jYXQiLCJpc29TdHJpbmciLCJ0aWxGb3JtYXQiLCJNw4VORURfw4VSX05BVk4iLCJEQVRPIiwiY3JlYXRlRWxlbWVudCIsIm1heFdpZHRoIiwibWFyZ2luQmxvY2siLCJib3JkZXJDb2xvciIsImJvcmRlcldpZHRoIiwicGFkZGluZyIsImdhcCIsIndlaWdodCIsInJlc3VsdGF0IiwiX2MzIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==