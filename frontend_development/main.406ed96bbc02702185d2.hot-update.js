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
  return props.$farge ? props.$farge : _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.TextNeutral;
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
  console.log({
    check: (nestePeriode === null || nestePeriode === void 0 ? void 0 : nestePeriode.resultat) && nestePeriode.resultat > 0
  });
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
    $farge: nestePeriode !== null && nestePeriode !== void 0 && nestePeriode.resultat && nestePeriode.resultat > 0 ? _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.TextSuccess : _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.TextNeutral
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
/******/ 	__webpack_require__.h = () => ("cb3a6aebe16a713bf760")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi40MDZlZDk2YmJjMDI3MDIxODVkMi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUErQjtBQUVLO0FBQ0c7QUFFbUM7QUFRbkM7QUFHK0Q7QUFDdkM7QUFFL0QsSUFBTWtCLGlCQUFpQixHQUFHaEIsNkRBQU0sQ0FBQ0MsdURBQVMsQ0FBQyxDQUFBZ0IsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLHNCQUFBLHFEQUM5QixVQUFBQyxLQUFLO0VBQUEsT0FBS0EsS0FBSyxDQUFDQyxNQUFNLEdBQUdELEtBQUssQ0FBQ0MsTUFBTSxHQUFHVixzRUFBVztBQUFBLENBQUMsRUFDOUNILHlFQUFjLENBQ2hDO0FBQUNjLEVBQUEsR0FISUwsaUJBQWlCO0FBS3ZCLElBQU1NLGtCQUFrQixHQUFHdEIsNkRBQU0sQ0FBQ0csb0RBQU0sQ0FBQyxDQUFBb0IsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQUwsc0JBQUEsb0VBQ2JaLHdFQUFhLEVBQ3RCRSxrRUFBTyxDQUN6QjtBQUFDZ0IsR0FBQSxHQUhJRixrQkFBa0I7QUFTeEIsSUFBTUcsZUFBMEQsR0FBRyxTQUE3REEsZUFBMERBLENBQUFDLElBQUEsRUFFMUQ7RUFBQSxJQUFBQyxjQUFBO0VBQUEsSUFBQUMsZUFBQSxHQUFBRixJQUFBLENBREZHLFVBQVU7SUFBSUMsY0FBYyxHQUFBRixlQUFBLENBQWRFLGNBQWM7SUFBRUMsR0FBRyxHQUFBSCxlQUFBLENBQUhHLEdBQUc7SUFBRUMsYUFBYSxHQUFBSixlQUFBLENBQWJJLGFBQWE7SUFBRUMsbUJBQW1CLEdBQUFMLGVBQUEsQ0FBbkJLLG1CQUFtQjtJQUFFQyxRQUFRLEdBQUFOLGVBQUEsQ0FBUk0sUUFBUTtJQUFFQyxrQkFBa0IsR0FBQVAsZUFBQSxDQUFsQk8sa0JBQWtCO0VBRW5HLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBZ0JBLENBQUlDLEtBQWEsRUFBYTtJQUNoRCxPQUFPQSxLQUFLLENBQUNDLE1B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WSx1QkFBWkEsWUFBWSxDQUFFaUIsUUFBUSxDQUMxQyxDQUNmLENBRVIsQ0FDUCxDQUFDO0FBRWQsQ0FBQztBQUFDUyxHQUFBLEdBekZJN0MsZUFBMEQ7QUEwRmhFLGlFQUFlQSxlQUFlLEVBQUM7QUFBQSxJQUFBSixFQUFBLEVBQUFHLEdBQUEsRUFBQThDLEdBQUE7QUFBQUMsc0NBQUEsQ0FBQWxELEVBQUE7QUFBQWtELHNDQUFBLENBQUEvQyxHQUFBO0FBQUErQyxzQ0FBQSxDQUFBRCxHQUFBLHFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUMzSC9CLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvRmFnc2FrL0JlaGFuZGxpbmcvU2lkZXIvU2ltdWxlcmluZy9TaW11bGVyaW5nUGFuZWwudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGlzQmVmb3JlIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEJvZHlTaG9ydCwgQm94LCBIU3RhY2ssIFNwYWNlciwgVlN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQge1xuICAgIEJvcmRlck5ldXRyYWwsXG4gICAgRm9udFdlaWdodEJvbGQsXG4gICAgU3BhY2UxNixcbiAgICBUZXh0RGFuZ2VyLFxuICAgIFRleHROZXV0cmFsLFxuICAgIFRleHRTdWNjZXNzLFxufSBmcm9tICdAbmF2aWt0L2RzLXRva2Vucy9kaXN0L3Rva2Vucyc7XG5cbmltcG9ydCB0eXBlIHsgSVNpbXVsZXJpbmdEVE8sIElTaW11bGVyaW5nUGVyaW9kZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL3NpbXVsZXJpbmcnO1xuaW1wb3J0IHsgRGF0b2Zvcm1hdCwgaXNvU3RyaW5nVGlsRGF0ZSwgaXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvZGF0byc7XG5pbXBvcnQgeyBmb3JtYXRlckJlbMO4cCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL2Zvcm1hdHRlcic7XG5cbmNvbnN0IEJvbGRUZWtzdE1lZEZhcmdlID0gc3R5bGVkKEJvZHlTaG9ydCk8eyAkZmFyZ2U/OiBzdHJpbmcgfT5gXG4gICAgY29sb3I6ICR7cHJvcHMgPT4gKHByb3BzLiRmYXJnZSA/IHByb3BzLiRmYXJnZSA6IFRleHROZXV0cmFsKX07XG4gICAgZm9udC13ZWlnaHQ6ICR7Rm9udFdlaWdodEJvbGR9O1xuYDtcblxuY29uc3QgSFN0YWNrTWVkQm9yZGVyVG9wID0gc3R5bGVkKEhTdGFjaylgXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICR7Qm9yZGVyTmV1dHJhbH07XG4gICAgcGFkZGluZy10b3A6ICR7U3BhY2UxNn07XG5gO1xuXG5pbnRlcmZhY2UgSVNpbXVsZXJpbmdQcm9wcyB7XG4gICAgc2ltdWxlcmluZzogSVNpbXVsZXJpbmdEVE87XG59XG5cbmNvbnN0IFNpbXVsZXJpbmdQYW5lbDogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8SVNpbXVsZXJpbmdQcm9wcz4gPSAoe1xuICAgIHNpbXVsZXJpbmc6IHsgZmVpbHV0YmV0YWxpbmcsIGZvbSwgZXR0ZXJiZXRhbGluZywgZm9tRGF0b05lc3RlUGVyaW9kZSwgcGVyaW9kZXIsIHRvbVNpc3RlVXRiZXRhbGluZyB9LFxufSkgPT4ge1xuICAgIGNvbnN0IGthcGl0YWxpc2VyVGVrc3QgPSAodGVrc3Q6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICAgIHJldHVybiB0ZWtzdC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRla3N0LnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGZvcm1hdGVyQmVsw7hwRWxsZXJEYXNoT21VbmRlZmluZWQgPSAoYmVsw7hwPzogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgcmV0dXJuICFiZWzDuHAgfHwgYmVsw7hwID09PSAwID8gJy0nIDogZm9ybWF0ZXJCZWzDuHAoYmVsw7hwKTtcbiAgICB9O1xuXG4gICAgY29uc3QgbmVzdGVQZXJpb2RlID0gZm9tRGF0b05lc3RlUGVyaW9kZVxuICAgICAgICA/IChwZXJpb2Rlci5maW5kKHBlcmlvZGUgPT4gcGVyaW9kZS5mb20gPT09IGZvbURhdG9OZXN0ZVBlcmlvZGUpID8/IHVuZGVmaW5lZClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBlckbDuHJOZXN0ZVBlcmlvZGUgPSAocGVyaW9kZTogSVNpbXVsZXJpbmdQZXJpb2RlKSA9PlxuICAgICAgICAhZm9tRGF0b05lc3RlUGVyaW9kZSB8fCBpc0JlZm9yZShpc29TdHJpbmdUaWxEYXRlKHBlcmlvZGUuZm9tKSwgaXNvU3RyaW5nVGlsRGF0ZShmb21EYXRvTmVzdGVQZXJpb2RlKSk7XG5cbiAgICBjb25zdCBwYW5lbFRpdHRlbCA9ICgpOiBzdHJpbmcgPT4ge1xuICAgICAgICBjb25zdCB1dGJldGFsdGVQZXJpb2RlciA9IHBlcmlvZGVyLmZpbHRlcihwZXJpb2RlID0+IGVyRsO4ck5lc3RlUGVyaW9kZShwZXJpb2RlKSk7XG4gICAgICAgIGlmICh1dGJldGFsdGVQZXJpb2Rlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAnVG90YWx0JztcbiAgICAgICAgfVxuICAgICAgICBpZiAodXRiZXRhbHRlUGVyaW9kZXIubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYFRvdGFsIGZvciAke2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICAgICAgaXNvU3RyaW5nOiBwZXJpb2RlclswXS5mb20sXG4gICAgICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0Lk3DhU5FRF/DhVJfTkFWTixcbiAgICAgICAgICAgIH0pfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBUb3RhbHQgZm9yIHBlcmlvZGVuICR7aXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nKHtcbiAgICAgICAgICAgIGlzb1N0cmluZzogZm9tLFxuICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0LkRBVE8sXG4gICAgICAgIH0pfSAtICR7aXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nKHtcbiAgICAgICAgICAgIGlzb1N0cmluZzogdG9tU2lzdGVVdGJldGFsaW5nLFxuICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0LkRBVE8sXG4gICAgICAgIH0pfWA7XG4gICAgfTtcbmNvbnNvbGUubG9nKHtjaGVjazogbmVzdGVQZXJpb2RlPy5yZXN1bHRhdCAmJiBuZXN0ZVBlcmlvZGUucmVzdWx0YXQgPiAwfSlcbiAgICByZXR1cm4gKFxuICAgICAgICA8Qm94XG4gICAgICAgICAgICBtYXhXaWR0aD17JzI2cmVtJ31cbiAgICAgICAgICAgIG1hcmdpbkJsb2NrPXsnc3BhY2UtMCBzcGFjZS00MCd9XG4gICAgICAgICAgICBib3JkZXJDb2xvcj1cIm5ldXRyYWwtc3Ryb25nXCJcbiAgICAgICAgICAgIGJvcmRlcldpZHRoPVwiMVwiXG4gICAgICAgICAgICBwYWRkaW5nPVwic3BhY2UtNDBcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8VlN0YWNrIGFyaWEtbGFiZWw9eydTaW11bGVyaW5nc292ZXJzaWt0J30gZ2FwPVwic3BhY2UtMTJcIj5cbiAgICAgICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0IHdlaWdodD1cInNlbWlib2xkXCI+e3BhbmVsVGl0dGVsKCl9PC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICAgICAgPEhTdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydD5GZWlsdXRiZXRhbGluZzwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICA8U3BhY2VyIC8+XG4gICAgICAgICAgICAgICAgICAgIDxCb2xkVGVrc3RNZWRGYXJnZSAkZmFyZ2U9e2ZlaWx1dGJldGFsaW5nID4gMCA/IFRleHREYW5nZXIgOiBUZXh0TmV1dHJhbH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0ZXJCZWzDuHBFbGxlckRhc2hPbVVuZGVmaW5lZChmZWlsdXRiZXRhbGluZyl9XG4gICAgICAgICAgICAgICAgICAgIDwvQm9sZFRla3N0TWVkRmFyZ2U+XG4gICAgICAgICAgICAgICAgPC9IU3RhY2s+XG5cbiAgICAgICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0PkV0dGVyYmV0YWxpbmc8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgICAgICAgICAgICA8Qm9sZFRla3N0TWVkRmFyZ2U+e2Zvcm1hdGVyQmVsw7hwRWxsZXJEYXNoT21VbmRlZmluZWQoZXR0ZXJiZXRhbGluZyl9PC9Cb2xkVGVrc3RNZWRGYXJnZT5cbiAgICAgICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgICAgICA8SFN0YWNrTWVkQm9yZGVyVG9wPlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0IHdlaWdodD1cInNlbWlib2xkXCI+TmVzdGUgdXRiZXRhbGluZzwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICA8U3BhY2VyIC8+XG4gICAgICAgICAgICAgICAgICAgIHshbmVzdGVQZXJpb2RlICYmIDxCb2R5U2hvcnQgd2VpZ2h0PVwic2VtaWJvbGRcIj4tPC9Cb2R5U2hvcnQ+fVxuICAgICAgICAgICAgICAgIDwvSFN0YWNrTWVkQm9yZGVyVG9wPlxuICAgICAgICAgICAgICAgIHtuZXN0ZVBlcmlvZGUgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7a2FwaXRhbGlzZXJUZWtzdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzb1N0cmluZzogZm9tRGF0b05lc3RlUGVyaW9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5Nw4VORURfw4VSX05BVk4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJvbGRUZWtzdE1lZEZhcmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZhcmdlPXtuZXN0ZVBlcmlvZGU/LnJlc3VsdGF0ICYmIG5lc3RlUGVyaW9kZS5yZXN1bHRhdCA+IDAgPyBUZXh0U3VjY2VzcyA6IFRleHROZXV0cmFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmb3JtYXRlckJlbMO4cEVsbGVyRGFzaE9tVW5kZWZpbmVkKG5lc3RlUGVyaW9kZT8ucmVzdWx0YXQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb2xkVGVrc3RNZWRGYXJnZT5cbiAgICAgICAgICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvVlN0YWNrPlxuICAgICAgICA8L0JveD5cbiAgICApO1xufTtcbmV4cG9ydCBkZWZhdWx0IFNpbXVsZXJpbmdQYW5lbDtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImNiM2E2YWViZTE2YTcxM2JmNzYwXCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwiaXNCZWZvcmUiLCJzdHlsZWQiLCJCb2R5U2hvcnQiLCJCb3giLCJIU3RhY2siLCJTcGFjZXIiLCJWU3RhY2siLCJCb3JkZXJOZXV0cmFsIiwiRm9udFdlaWdodEJvbGQiLCJTcGFjZTE2IiwiVGV4dERhbmdlciIsIlRleHROZXV0cmFsIiwiVGV4dFN1Y2Nlc3MiLCJEYXRvZm9ybWF0IiwiaXNvU3RyaW5nVGlsRGF0ZSIsImlzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyIsImZvcm1hdGVyQmVsw7hwIiwiQm9sZFRla3N0TWVkRmFyZ2UiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwicHJvcHMiLCIkZmFyZ2UiLCJfYyIsIkhTdGFja01lZEJvcmRlclRvcCIsIl90ZW1wbGF0ZU9iamVjdDIiLCJfYzIiLCJTaW11bGVyaW5nUGFuZWwiLCJfcmVmIiwiX3BlcmlvZGVyJGZpbmQiLCJfcmVmJHNpbXVsZXJpbmciLCJzaW11bGVyaW5nIiwiZmVpbHV0YmV0YWxpbmciLCJmb20iLCJldHRlcmJldGFsaW5nIiwiZm9tRGF0b05lc3RlUGVyaW9kZSIsInBlcmlvZGVyIiwidG9tU2lzdGVVdGJldGFsaW5nIiwia2FwaXRhbGlzZXJUZWtzdCIsInRla3N0IiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvTG93ZXJDYXNlIiwiZm9ybWF0ZXJCZWzDuHBFbGxlckRhc2hPbVVuZGVmaW5lZCIsImJlbMO4cCIsIm5lc3RlUGVyaW9kZSIsImZpbmQiLCJwZXJpb2RlIiwidW5kZWZpbmVkIiwiZXJGw7hyTmVzdGVQZXJpb2RlIiwicGFuZWxUaXR0ZWwiLCJ1dGJldGFsdGVQZXJpb2RlciIsImZpbHRlciIsImxlbmd0aCIsImNvbmNhdCIsImlzb1N0cmluZyIsInRpbEZvcm1hdCIsIk3DhU5FRF/DhVJfTkFWTiIsIkRBVE8iLCJjb25zb2xlIiwibG9nIiwiY2hlY2siLCJyZXN1bHRhdCIsImNyZWF0ZUVsZW1lbnQiLCJtYXhXaWR0aCIsIm1hcmdpbkJsb2NrIiwiYm9yZGVyQ29sb3IiLCJib3JkZXJXaWR0aCIsInBhZGRpbmciLCJnYXAiLCJ3ZWlnaHQiLCJfYzMiLCIkUmVmcmVzaFJlZyQiXSwic291cmNlUm9vdCI6IiJ9