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
  return props.$farge ? _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.BorderSuccess : _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.TextNeutral;
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
    check: (nestePeriode === null || nestePeriode === void 0 ? void 0 : nestePeriode.resultat) && nestePeriode.resultat > 0,
    calculated: nestePeriode !== null && nestePeriode !== void 0 && nestePeriode.resultat && nestePeriode.resultat > 0 ? _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.TextSuccess : _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.TextNeutral
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
/******/ 	__webpack_require__.h = () => ("8422498048e81b28e095")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi43OTVkMDFjOWI1NjgyNjAxMGQ4Zi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUErQjtBQUVLO0FBQ0c7QUFFbUM7QUFTbkM7QUFHK0Q7QUFDdkM7QUFFL0QsSUFBTW1CLGlCQUFpQixHQUFHakIsNkRBQU0sQ0FBQ0MsdURBQVMsQ0FBQyxDQUFBaUIsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLHNCQUFBLHFEQUM5QixVQUFBQyxLQUFLO0VBQUEsT0FBS0EsS0FBSyxDQUFDQyxNQUFNLEdBQUdkLHdFQUFhLEdBQUdJLHNFQUFXO0FBQUEsQ0FBQyxFQUMvQ0gseUVBQWMsQ0FDaEM7QUFBQ2MsRUFBQSxHQUhJTCxpQkFBaUI7QUFLdkIsSUFBTU0sa0JBQWtCLEdBQUd2Qiw2REFBTSxDQUFDRyxvREFBTSxDQUFDLENBQUFxQixnQkFBQSxLQUFBQSxnQkFBQSxHQUFBTCxzQkFBQSxvRUFDYmIsd0VBQWEsRUFDdEJHLGtFQUFPLENBQ3pCO0FBQUNnQixHQUFBLEdBSElGLGtCQUFrQjtBQVN4QixJQUFNRyxlQUEwRCxHQUFHLFNBQTdEQSxlQUEwREEsQ0FBQUMsSUFBQSxFQUUxRDtFQUFBLElBQUFDLGNBQUE7RUFBQSxJQUFBQyxlQUFBLEdBQUFGLElBQUEsQ0FERkcsVUFBVTtJQUFJQyxjQUFjLEdBQUFGLGVBQUEsQ0FBZEUsY0FBYztJQUFFQyxHQUFHLEdBQUFILGVBQUEsQ0FBSEcsR0FBRztJQUFFQyxhQUFhLEdBQUFKLGVBQUEsQ0FBYkksYUFBYTtJQUFFQyxtQkFBbUIsR0FBQUwsZUFBQSxDQUFuQkssbUJBQW1CO0lBQUVDLFFBQVEsR0FBQU4sZUFBQSxDQUFSTSxRQUFRO0lBQUVDLGtCQUFrQixHQUFBUCxlQUFBLENBQWxCTyxrQkFBa0I7RUFFbkcsSUFBTUMsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFnQkEsQ0FBSUMsS0FBYSxFQUFhO0lBQ2hELE9BQU9BLEtBQUssQ0FBQ0MsTUFBTSxDQUFDLENB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LFlBQVksQ0FBRWlCLFFBQVEsS0FBSWpCLFlBQVksQ0FBQ2lCLFFBQVEsR0FBRztFQUFFLEdBQzFFbkIsaUNBQWlDLENBQUNFLFlBQVksYUFBWkEsWUFBWSx1QkFBWkEsWUFBWSxDQUFFaUIsUUFBUSxDQUMxQyxDQUNmLENBRVIsQ0FDUCxDQUFDO0FBRWQsQ0FBQztBQUFDVSxHQUFBLEdBMUZJOUMsZUFBMEQ7QUEyRmhFLGlFQUFlQSxlQUFlLEVBQUM7QUFBQSxJQUFBSixFQUFBLEVBQUFHLEdBQUEsRUFBQStDLEdBQUE7QUFBQUMsc0NBQUEsQ0FBQW5ELEVBQUE7QUFBQW1ELHNDQUFBLENBQUFoRCxHQUFBO0FBQUFnRCxzQ0FBQSxDQUFBRCxHQUFBLHFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUM3SC9CLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvRmFnc2FrL0JlaGFuZGxpbmcvU2lkZXIvU2ltdWxlcmluZy9TaW11bGVyaW5nUGFuZWwudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGlzQmVmb3JlIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEJvZHlTaG9ydCwgQm94LCBIU3RhY2ssIFNwYWNlciwgVlN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQge1xuICAgIEJvcmRlck5ldXRyYWwsXG4gICAgQm9yZGVyU3VjY2VzcyxcbiAgICBGb250V2VpZ2h0Qm9sZCxcbiAgICBTcGFjZTE2LFxuICAgIFRleHREYW5nZXIsXG4gICAgVGV4dE5ldXRyYWwsXG4gICAgVGV4dFN1Y2Nlc3MsXG59IGZyb20gJ0BuYXZpa3QvZHMtdG9rZW5zL2Rpc3QvdG9rZW5zJztcblxuaW1wb3J0IHR5cGUgeyBJU2ltdWxlcmluZ0RUTywgSVNpbXVsZXJpbmdQZXJpb2RlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvc2ltdWxlcmluZyc7XG5pbXBvcnQgeyBEYXRvZm9ybWF0LCBpc29TdHJpbmdUaWxEYXRlLCBpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9kYXRvJztcbmltcG9ydCB7IGZvcm1hdGVyQmVsw7hwIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvZm9ybWF0dGVyJztcblxuY29uc3QgQm9sZFRla3N0TWVkRmFyZ2UgPSBzdHlsZWQoQm9keVNob3J0KTx7ICRmYXJnZT86IHN0cmluZyB9PmBcbiAgICBjb2xvcjogJHtwcm9wcyA9PiAocHJvcHMuJGZhcmdlID8gQm9yZGVyU3VjY2VzcyA6IFRleHROZXV0cmFsKX07XG4gICAgZm9udC13ZWlnaHQ6ICR7Rm9udFdlaWdodEJvbGR9O1xuYDtcblxuY29uc3QgSFN0YWNrTWVkQm9yZGVyVG9wID0gc3R5bGVkKEhTdGFjaylgXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICR7Qm9yZGVyTmV1dHJhbH07XG4gICAgcGFkZGluZy10b3A6ICR7U3BhY2UxNn07XG5gO1xuXG5pbnRlcmZhY2UgSVNpbXVsZXJpbmdQcm9wcyB7XG4gICAgc2ltdWxlcmluZzogSVNpbXVsZXJpbmdEVE87XG59XG5cbmNvbnN0IFNpbXVsZXJpbmdQYW5lbDogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8SVNpbXVsZXJpbmdQcm9wcz4gPSAoe1xuICAgIHNpbXVsZXJpbmc6IHsgZmVpbHV0YmV0YWxpbmcsIGZvbSwgZXR0ZXJiZXRhbGluZywgZm9tRGF0b05lc3RlUGVyaW9kZSwgcGVyaW9kZXIsIHRvbVNpc3RlVXRiZXRhbGluZyB9LFxufSkgPT4ge1xuICAgIGNvbnN0IGthcGl0YWxpc2VyVGVrc3QgPSAodGVrc3Q6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICAgIHJldHVybiB0ZWtzdC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRla3N0LnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGZvcm1hdGVyQmVsw7hwRWxsZXJEYXNoT21VbmRlZmluZWQgPSAoYmVsw7hwPzogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgcmV0dXJuICFiZWzDuHAgfHwgYmVsw7hwID09PSAwID8gJy0nIDogZm9ybWF0ZXJCZWzDuHAoYmVsw7hwKTtcbiAgICB9O1xuXG4gICAgY29uc3QgbmVzdGVQZXJpb2RlID0gZm9tRGF0b05lc3RlUGVyaW9kZVxuICAgICAgICA/IChwZXJpb2Rlci5maW5kKHBlcmlvZGUgPT4gcGVyaW9kZS5mb20gPT09IGZvbURhdG9OZXN0ZVBlcmlvZGUpID8/IHVuZGVmaW5lZClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBlckbDuHJOZXN0ZVBlcmlvZGUgPSAocGVyaW9kZTogSVNpbXVsZXJpbmdQZXJpb2RlKSA9PlxuICAgICAgICAhZm9tRGF0b05lc3RlUGVyaW9kZSB8fCBpc0JlZm9yZShpc29TdHJpbmdUaWxEYXRlKHBlcmlvZGUuZm9tKSwgaXNvU3RyaW5nVGlsRGF0ZShmb21EYXRvTmVzdGVQZXJpb2RlKSk7XG5cbiAgICBjb25zdCBwYW5lbFRpdHRlbCA9ICgpOiBzdHJpbmcgPT4ge1xuICAgICAgICBjb25zdCB1dGJldGFsdGVQZXJpb2RlciA9IHBlcmlvZGVyLmZpbHRlcihwZXJpb2RlID0+IGVyRsO4ck5lc3RlUGVyaW9kZShwZXJpb2RlKSk7XG4gICAgICAgIGlmICh1dGJldGFsdGVQZXJpb2Rlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAnVG90YWx0JztcbiAgICAgICAgfVxuICAgICAgICBpZiAodXRiZXRhbHRlUGVyaW9kZXIubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYFRvdGFsIGZvciAke2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICAgICAgaXNvU3RyaW5nOiBwZXJpb2RlclswXS5mb20sXG4gICAgICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0Lk3DhU5FRF/DhVJfTkFWTixcbiAgICAgICAgICAgIH0pfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBUb3RhbHQgZm9yIHBlcmlvZGVuICR7aXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nKHtcbiAgICAgICAgICAgIGlzb1N0cmluZzogZm9tLFxuICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0LkRBVE8sXG4gICAgICAgIH0pfSAtICR7aXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nKHtcbiAgICAgICAgICAgIGlzb1N0cmluZzogdG9tU2lzdGVVdGJldGFsaW5nLFxuICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0LkRBVE8sXG4gICAgICAgIH0pfWA7XG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyh7XG4gICAgICAgIGNoZWNrOiBuZXN0ZVBlcmlvZGU/LnJlc3VsdGF0ICYmIG5lc3RlUGVyaW9kZS5yZXN1bHRhdCA+IDAsXG4gICAgICAgIGNhbGN1bGF0ZWQ6IG5lc3RlUGVyaW9kZT8ucmVzdWx0YXQgJiYgbmVzdGVQZXJpb2RlLnJlc3VsdGF0ID4gMCA/IFRleHRTdWNjZXNzIDogVGV4dE5ldXRyYWwsXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPEJveFxuICAgICAgICAgICAgbWF4V2lkdGg9eycyNnJlbSd9XG4gICAgICAgICAgICBtYXJnaW5CbG9jaz17J3NwYWNlLTAgc3BhY2UtNDAnfVxuICAgICAgICAgICAgYm9yZGVyQ29sb3I9XCJuZXV0cmFsLXN0cm9uZ1wiXG4gICAgICAgICAgICBib3JkZXJXaWR0aD1cIjFcIlxuICAgICAgICAgICAgcGFkZGluZz1cInNwYWNlLTQwXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPFZTdGFjayBhcmlhLWxhYmVsPXsnU2ltdWxlcmluZ3NvdmVyc2lrdCd9IGdhcD1cInNwYWNlLTEyXCI+XG4gICAgICAgICAgICAgICAgPEhTdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydCB3ZWlnaHQ9XCJzZW1pYm9sZFwiPntwYW5lbFRpdHRlbCgpfTwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgIDwvSFN0YWNrPlxuICAgICAgICAgICAgICAgIDxIU3RhY2s+XG4gICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQ+RmVpbHV0YmV0YWxpbmc8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgICAgICAgICAgICA8Qm9sZFRla3N0TWVkRmFyZ2UgJGZhcmdlPXtmZWlsdXRiZXRhbGluZyA+IDAgPyBUZXh0RGFuZ2VyIDogVGV4dE5ldXRyYWx9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2Zvcm1hdGVyQmVsw7hwRWxsZXJEYXNoT21VbmRlZmluZWQoZmVpbHV0YmV0YWxpbmcpfVxuICAgICAgICAgICAgICAgICAgICA8L0JvbGRUZWtzdE1lZEZhcmdlPlxuICAgICAgICAgICAgICAgIDwvSFN0YWNrPlxuXG4gICAgICAgICAgICAgICAgPEhTdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydD5FdHRlcmJldGFsaW5nPC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgICAgIDxTcGFjZXIgLz5cbiAgICAgICAgICAgICAgICAgICAgPEJvbGRUZWtzdE1lZEZhcmdlPntmb3JtYXRlckJlbMO4cEVsbGVyRGFzaE9tVW5kZWZpbmVkKGV0dGVyYmV0YWxpbmcpfTwvQm9sZFRla3N0TWVkRmFyZ2U+XG4gICAgICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICAgICAgPEhTdGFja01lZEJvcmRlclRvcD5cbiAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydCB3ZWlnaHQ9XCJzZW1pYm9sZFwiPk5lc3RlIHV0YmV0YWxpbmc8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgICAgICAgICAgICB7IW5lc3RlUGVyaW9kZSAmJiA8Qm9keVNob3J0IHdlaWdodD1cInNlbWlib2xkXCI+LTwvQm9keVNob3J0Pn1cbiAgICAgICAgICAgICAgICA8L0hTdGFja01lZEJvcmRlclRvcD5cbiAgICAgICAgICAgICAgICB7bmVzdGVQZXJpb2RlICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEhTdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2thcGl0YWxpc2VyVGVrc3QoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc29TdHJpbmc6IGZvbURhdG9OZXN0ZVBlcmlvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWxGb3JtYXQ6IERhdG9mb3JtYXQuTcOFTkVEX8OFUl9OQVZOLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTcGFjZXIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb2xkVGVrc3RNZWRGYXJnZSAkZmFyZ2U9e25lc3RlUGVyaW9kZT8ucmVzdWx0YXQgJiYgbmVzdGVQZXJpb2RlLnJlc3VsdGF0ID4gMH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2Zvcm1hdGVyQmVsw7hwRWxsZXJEYXNoT21VbmRlZmluZWQobmVzdGVQZXJpb2RlPy5yZXN1bHRhdCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0JvbGRUZWtzdE1lZEZhcmdlPlxuICAgICAgICAgICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9WU3RhY2s+XG4gICAgICAgIDwvQm94PlxuICAgICk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU2ltdWxlcmluZ1BhbmVsO1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiODQyMjQ5ODA0OGU4MWIyOGUwOTVcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJpc0JlZm9yZSIsInN0eWxlZCIsIkJvZHlTaG9ydCIsIkJveCIsIkhTdGFjayIsIlNwYWNlciIsIlZTdGFjayIsIkJvcmRlck5ldXRyYWwiLCJCb3JkZXJTdWNjZXNzIiwiRm9udFdlaWdodEJvbGQiLCJTcGFjZTE2IiwiVGV4dERhbmdlciIsIlRleHROZXV0cmFsIiwiVGV4dFN1Y2Nlc3MiLCJEYXRvZm9ybWF0IiwiaXNvU3RyaW5nVGlsRGF0ZSIsImlzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyIsImZvcm1hdGVyQmVsw7hwIiwiQm9sZFRla3N0TWVkRmFyZ2UiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwicHJvcHMiLCIkZmFyZ2UiLCJfYyIsIkhTdGFja01lZEJvcmRlclRvcCIsIl90ZW1wbGF0ZU9iamVjdDIiLCJfYzIiLCJTaW11bGVyaW5nUGFuZWwiLCJfcmVmIiwiX3BlcmlvZGVyJGZpbmQiLCJfcmVmJHNpbXVsZXJpbmciLCJzaW11bGVyaW5nIiwiZmVpbHV0YmV0YWxpbmciLCJmb20iLCJldHRlcmJldGFsaW5nIiwiZm9tRGF0b05lc3RlUGVyaW9kZSIsInBlcmlvZGVyIiwidG9tU2lzdGVVdGJldGFsaW5nIiwia2FwaXRhbGlzZXJUZWtzdCIsInRla3N0IiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvTG93ZXJDYXNlIiwiZm9ybWF0ZXJCZWzDuHBFbGxlckRhc2hPbVVuZGVmaW5lZCIsImJlbMO4cCIsIm5lc3RlUGVyaW9kZSIsImZpbmQiLCJwZXJpb2RlIiwidW5kZWZpbmVkIiwiZXJGw7hyTmVzdGVQZXJpb2RlIiwicGFuZWxUaXR0ZWwiLCJ1dGJldGFsdGVQZXJpb2RlciIsImZpbHRlciIsImxlbmd0aCIsImNvbmNhdCIsImlzb1N0cmluZyIsInRpbEZvcm1hdCIsIk3DhU5FRF/DhVJfTkFWTiIsIkRBVE8iLCJjb25zb2xlIiwibG9nIiwiY2hlY2siLCJyZXN1bHRhdCIsImNhbGN1bGF0ZWQiLCJjcmVhdGVFbGVtZW50IiwibWF4V2lkdGgiLCJtYXJnaW5CbG9jayIsImJvcmRlckNvbG9yIiwiYm9yZGVyV2lkdGgiLCJwYWRkaW5nIiwiZ2FwIiwid2VpZ2h0IiwiX2MzIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==