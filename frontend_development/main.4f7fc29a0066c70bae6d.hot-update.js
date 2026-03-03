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
/******/ 	__webpack_require__.h = () => ("795d01c9b56826010d8f")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi40ZjdmYzI5YTAwNjZjNzBiYWU2ZC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUErQjtBQUVLO0FBQ0c7QUFFbUM7QUFRbkM7QUFHK0Q7QUFDdkM7QUFFL0QsSUFBTW1CLGlCQUFpQixHQUFHakIsNkRBQU0sQ0FBQ0MsdURBQVMsQ0FBQyxDQUFBaUIsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLHNCQUFBLHFEQUM5QixVQUFBQyxLQUFLO0VBQUEsT0FBS0EsS0FBSyxDQUFDQyxNQUFNLEdBQUdkLHdFQUFhLEdBQUdJLHNFQUFXO0FBQUEsQ0FBQyxFQUMvQ0gseUVBQWMsQ0FDaEM7QUFBQ2MsRUFBQSxHQUhJTCxpQkFBaUI7QUFLdkIsSUFBTU0sa0JBQWtCLEdBQUd2Qiw2REFBTSxDQUFDRyxvREFBTSxDQUFDLENBQUFxQixnQkFBQSxLQUFBQSxnQkFBQSxHQUFBTCxzQkFBQSxvRUFDYmIsd0VBQWEsRUFDdEJHLGtFQUFPLENBQ3pCO0FBQUNnQixHQUFBLEdBSElGLGtCQUFrQjtBQVN4QixJQUFNRyxlQUEwRCxHQUFHLFNBQTdEQSxlQUEwREEsQ0FBQUMsSUFBQSxFQUUxRDtFQUFBLElBQUFDLGNBQUE7RUFBQSxJQUFBQyxlQUFBLEdBQUFGLElBQUEsQ0FERkcsVUFBVTtJQUFJQyxjQUFjLEdBQUFGLGVBQUEsQ0FBZEUsY0FBYztJQUFFQyxHQUFHLEdBQUFILGVBQUEsQ0FBSEcsR0FBRztJQUFFQyxhQUFhLEdBQUFKLGVBQUEsQ0FBYkksYUFBYTtJQUFFQyxtQkFBbUIsR0FBQUwsZUFBQSxDQUFuQkssbUJBQW1CO0lBQUVDLFFBQVEsR0FBQU4sZUFBQSxDQUFSTSxRQUFRO0lBQUVDLGtCQUFrQixHQUFBUCxlQUFBLENBQWxCTyxrQkFBa0I7RUFFbkcsSUFBTUMsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFnQkEsQ0FBSUMsS0FBYSxFQUFhO0lBQ2hELE9BQU9BLEtBQUssQ0FBQ0MsTUFBTSxDQUFDLENB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LFlBQVksQ0FBRWlCLFFBQVEsS0FBSWpCLFlBQVksQ0FBQ2lCLFFBQVEsR0FBRztFQUFFLEdBQzFFbkIsaUNBQWlDLENBQUNFLFlBQVksYUFBWkEsWUFBWSx1QkFBWkEsWUFBWSxDQUFFaUIsUUFBUSxDQUMxQyxDQUNmLENBRVIsQ0FDUCxDQUFDO0FBRWQsQ0FBQztBQUFDVSxHQUFBLEdBMUZJOUMsZUFBMEQ7QUEyRmhFLGlFQUFlQSxlQUFlLEVBQUM7QUFBQSxJQUFBSixFQUFBLEVBQUFHLEdBQUEsRUFBQStDLEdBQUE7QUFBQUMsc0NBQUEsQ0FBQW5ELEVBQUE7QUFBQW1ELHNDQUFBLENBQUFoRCxHQUFBO0FBQUFnRCxzQ0FBQSxDQUFBRCxHQUFBLHFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUM1SC9CLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvRmFnc2FrL0JlaGFuZGxpbmcvU2lkZXIvU2ltdWxlcmluZy9TaW11bGVyaW5nUGFuZWwudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGlzQmVmb3JlIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEJvZHlTaG9ydCwgQm94LCBIU3RhY2ssIFNwYWNlciwgVlN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQge1xuICAgIEJvcmRlck5ldXRyYWwsIEJvcmRlclN1Y2Nlc3MsXG4gICAgRm9udFdlaWdodEJvbGQsXG4gICAgU3BhY2UxNixcbiAgICBUZXh0RGFuZ2VyLFxuICAgIFRleHROZXV0cmFsLFxuICAgIFRleHRTdWNjZXNzLFxufSBmcm9tICdAbmF2aWt0L2RzLXRva2Vucy9kaXN0L3Rva2Vucyc7XG5cbmltcG9ydCB0eXBlIHsgSVNpbXVsZXJpbmdEVE8sIElTaW11bGVyaW5nUGVyaW9kZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL3NpbXVsZXJpbmcnO1xuaW1wb3J0IHsgRGF0b2Zvcm1hdCwgaXNvU3RyaW5nVGlsRGF0ZSwgaXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvZGF0byc7XG5pbXBvcnQgeyBmb3JtYXRlckJlbMO4cCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL2Zvcm1hdHRlcic7XG5cbmNvbnN0IEJvbGRUZWtzdE1lZEZhcmdlID0gc3R5bGVkKEJvZHlTaG9ydCk8eyAkZmFyZ2U/OiBzdHJpbmcgfT5gXG4gICAgY29sb3I6ICR7cHJvcHMgPT4gKHByb3BzLiRmYXJnZSA/IEJvcmRlclN1Y2Nlc3MgOiBUZXh0TmV1dHJhbCl9O1xuICAgIGZvbnQtd2VpZ2h0OiAke0ZvbnRXZWlnaHRCb2xkfTtcbmA7XG5cbmNvbnN0IEhTdGFja01lZEJvcmRlclRvcCA9IHN0eWxlZChIU3RhY2spYFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAke0JvcmRlck5ldXRyYWx9O1xuICAgIHBhZGRpbmctdG9wOiAke1NwYWNlMTZ9O1xuYDtcblxuaW50ZXJmYWNlIElTaW11bGVyaW5nUHJvcHMge1xuICAgIHNpbXVsZXJpbmc6IElTaW11bGVyaW5nRFRPO1xufVxuXG5jb25zdCBTaW11bGVyaW5nUGFuZWw6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PElTaW11bGVyaW5nUHJvcHM+ID0gKHtcbiAgICBzaW11bGVyaW5nOiB7IGZlaWx1dGJldGFsaW5nLCBmb20sIGV0dGVyYmV0YWxpbmcsIGZvbURhdG9OZXN0ZVBlcmlvZGUsIHBlcmlvZGVyLCB0b21TaXN0ZVV0YmV0YWxpbmcgfSxcbn0pID0+IHtcbiAgICBjb25zdCBrYXBpdGFsaXNlclRla3N0ID0gKHRla3N0OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgICAgICByZXR1cm4gdGVrc3QuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0ZWtzdC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBmb3JtYXRlckJlbMO4cEVsbGVyRGFzaE9tVW5kZWZpbmVkID0gKGJlbMO4cD86IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgICAgIHJldHVybiAhYmVsw7hwIHx8IGJlbMO4cCA9PT0gMCA/ICctJyA6IGZvcm1hdGVyQmVsw7hwKGJlbMO4cCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG5lc3RlUGVyaW9kZSA9IGZvbURhdG9OZXN0ZVBlcmlvZGVcbiAgICAgICAgPyAocGVyaW9kZXIuZmluZChwZXJpb2RlID0+IHBlcmlvZGUuZm9tID09PSBmb21EYXRvTmVzdGVQZXJpb2RlKSA/PyB1bmRlZmluZWQpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgZXJGw7hyTmVzdGVQZXJpb2RlID0gKHBlcmlvZGU6IElTaW11bGVyaW5nUGVyaW9kZSkgPT5cbiAgICAgICAgIWZvbURhdG9OZXN0ZVBlcmlvZGUgfHwgaXNCZWZvcmUoaXNvU3RyaW5nVGlsRGF0ZShwZXJpb2RlLmZvbSksIGlzb1N0cmluZ1RpbERhdGUoZm9tRGF0b05lc3RlUGVyaW9kZSkpO1xuXG4gICAgY29uc3QgcGFuZWxUaXR0ZWwgPSAoKTogc3RyaW5nID0+IHtcbiAgICAgICAgY29uc3QgdXRiZXRhbHRlUGVyaW9kZXIgPSBwZXJpb2Rlci5maWx0ZXIocGVyaW9kZSA9PiBlckbDuHJOZXN0ZVBlcmlvZGUocGVyaW9kZSkpO1xuICAgICAgICBpZiAodXRiZXRhbHRlUGVyaW9kZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1RvdGFsdCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0YmV0YWx0ZVBlcmlvZGVyLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGBUb3RhbCBmb3IgJHtpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcoe1xuICAgICAgICAgICAgICAgIGlzb1N0cmluZzogcGVyaW9kZXJbMF0uZm9tLFxuICAgICAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5Nw4VORURfw4VSX05BVk4sXG4gICAgICAgICAgICB9KX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgVG90YWx0IGZvciBwZXJpb2RlbiAke2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICBpc29TdHJpbmc6IGZvbSxcbiAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5EQVRPLFxuICAgICAgICB9KX0gLSAke2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICBpc29TdHJpbmc6IHRvbVNpc3RlVXRiZXRhbGluZyxcbiAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5EQVRPLFxuICAgICAgICB9KX1gO1xuICAgIH07XG4gICAgY29uc29sZS5sb2coe1xuICAgICAgICBjaGVjazogbmVzdGVQZXJpb2RlPy5yZXN1bHRhdCAmJiBuZXN0ZVBlcmlvZGUucmVzdWx0YXQgPiAwLFxuICAgICAgICBjYWxjdWxhdGVkOiBuZXN0ZVBlcmlvZGU/LnJlc3VsdGF0ICYmIG5lc3RlUGVyaW9kZS5yZXN1bHRhdCA+IDAgPyBUZXh0U3VjY2VzcyA6IFRleHROZXV0cmFsLFxuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxCb3hcbiAgICAgICAgICAgIG1heFdpZHRoPXsnMjZyZW0nfVxuICAgICAgICAgICAgbWFyZ2luQmxvY2s9eydzcGFjZS0wIHNwYWNlLTQwJ31cbiAgICAgICAgICAgIGJvcmRlckNvbG9yPVwibmV1dHJhbC1zdHJvbmdcIlxuICAgICAgICAgICAgYm9yZGVyV2lkdGg9XCIxXCJcbiAgICAgICAgICAgIHBhZGRpbmc9XCJzcGFjZS00MFwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxWU3RhY2sgYXJpYS1sYWJlbD17J1NpbXVsZXJpbmdzb3ZlcnNpa3QnfSBnYXA9XCJzcGFjZS0xMlwiPlxuICAgICAgICAgICAgICAgIDxIU3RhY2s+XG4gICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQgd2VpZ2h0PVwic2VtaWJvbGRcIj57cGFuZWxUaXR0ZWwoKX08L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0PkZlaWx1dGJldGFsaW5nPC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgICAgIDxTcGFjZXIgLz5cbiAgICAgICAgICAgICAgICAgICAgPEJvbGRUZWtzdE1lZEZhcmdlICRmYXJnZT17ZmVpbHV0YmV0YWxpbmcgPiAwID8gVGV4dERhbmdlciA6IFRleHROZXV0cmFsfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtmb3JtYXRlckJlbMO4cEVsbGVyRGFzaE9tVW5kZWZpbmVkKGZlaWx1dGJldGFsaW5nKX1cbiAgICAgICAgICAgICAgICAgICAgPC9Cb2xkVGVrc3RNZWRGYXJnZT5cbiAgICAgICAgICAgICAgICA8L0hTdGFjaz5cblxuICAgICAgICAgICAgICAgIDxIU3RhY2s+XG4gICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQ+RXR0ZXJiZXRhbGluZzwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICA8U3BhY2VyIC8+XG4gICAgICAgICAgICAgICAgICAgIDxCb2xkVGVrc3RNZWRGYXJnZT57Zm9ybWF0ZXJCZWzDuHBFbGxlckRhc2hPbVVuZGVmaW5lZChldHRlcmJldGFsaW5nKX08L0JvbGRUZWtzdE1lZEZhcmdlPlxuICAgICAgICAgICAgICAgIDwvSFN0YWNrPlxuICAgICAgICAgICAgICAgIDxIU3RhY2tNZWRCb3JkZXJUb3A+XG4gICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQgd2VpZ2h0PVwic2VtaWJvbGRcIj5OZXN0ZSB1dGJldGFsaW5nPC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgICAgIDxTcGFjZXIgLz5cbiAgICAgICAgICAgICAgICAgICAgeyFuZXN0ZVBlcmlvZGUgJiYgPEJvZHlTaG9ydCB3ZWlnaHQ9XCJzZW1pYm9sZFwiPi08L0JvZHlTaG9ydD59XG4gICAgICAgICAgICAgICAgPC9IU3RhY2tNZWRCb3JkZXJUb3A+XG4gICAgICAgICAgICAgICAge25lc3RlUGVyaW9kZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxIU3RhY2s+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtrYXBpdGFsaXNlclRla3N0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNvU3RyaW5nOiBmb21EYXRvTmVzdGVQZXJpb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0Lk3DhU5FRF/DhVJfTkFWTixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3BhY2VyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Qm9sZFRla3N0TWVkRmFyZ2UgJGZhcmdlPXtuZXN0ZVBlcmlvZGU/LnJlc3VsdGF0ICYmIG5lc3RlUGVyaW9kZS5yZXN1bHRhdCA+IDB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmb3JtYXRlckJlbMO4cEVsbGVyRGFzaE9tVW5kZWZpbmVkKG5lc3RlUGVyaW9kZT8ucmVzdWx0YXQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb2xkVGVrc3RNZWRGYXJnZT5cbiAgICAgICAgICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvVlN0YWNrPlxuICAgICAgICA8L0JveD5cbiAgICApO1xufTtcbmV4cG9ydCBkZWZhdWx0IFNpbXVsZXJpbmdQYW5lbDtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjc5NWQwMWM5YjU2ODI2MDEwZDhmXCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwiaXNCZWZvcmUiLCJzdHlsZWQiLCJCb2R5U2hvcnQiLCJCb3giLCJIU3RhY2siLCJTcGFjZXIiLCJWU3RhY2siLCJCb3JkZXJOZXV0cmFsIiwiQm9yZGVyU3VjY2VzcyIsIkZvbnRXZWlnaHRCb2xkIiwiU3BhY2UxNiIsIlRleHREYW5nZXIiLCJUZXh0TmV1dHJhbCIsIlRleHRTdWNjZXNzIiwiRGF0b2Zvcm1hdCIsImlzb1N0cmluZ1RpbERhdGUiLCJpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmciLCJmb3JtYXRlckJlbMO4cCIsIkJvbGRUZWtzdE1lZEZhcmdlIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbCIsInByb3BzIiwiJGZhcmdlIiwiX2MiLCJIU3RhY2tNZWRCb3JkZXJUb3AiLCJfdGVtcGxhdGVPYmplY3QyIiwiX2MyIiwiU2ltdWxlcmluZ1BhbmVsIiwiX3JlZiIsIl9wZXJpb2RlciRmaW5kIiwiX3JlZiRzaW11bGVyaW5nIiwic2ltdWxlcmluZyIsImZlaWx1dGJldGFsaW5nIiwiZm9tIiwiZXR0ZXJiZXRhbGluZyIsImZvbURhdG9OZXN0ZVBlcmlvZGUiLCJwZXJpb2RlciIsInRvbVNpc3RlVXRiZXRhbGluZyIsImthcGl0YWxpc2VyVGVrc3QiLCJ0ZWtzdCIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0b0xvd2VyQ2FzZSIsImZvcm1hdGVyQmVsw7hwRWxsZXJEYXNoT21VbmRlZmluZWQiLCJiZWzDuHAiLCJuZXN0ZVBlcmlvZGUiLCJmaW5kIiwicGVyaW9kZSIsInVuZGVmaW5lZCIsImVyRsO4ck5lc3RlUGVyaW9kZSIsInBhbmVsVGl0dGVsIiwidXRiZXRhbHRlUGVyaW9kZXIiLCJmaWx0ZXIiLCJsZW5ndGgiLCJjb25jYXQiLCJpc29TdHJpbmciLCJ0aWxGb3JtYXQiLCJNw4VORURfw4VSX05BVk4iLCJEQVRPIiwiY29uc29sZSIsImxvZyIsImNoZWNrIiwicmVzdWx0YXQiLCJjYWxjdWxhdGVkIiwiY3JlYXRlRWxlbWVudCIsIm1heFdpZHRoIiwibWFyZ2luQmxvY2siLCJib3JkZXJDb2xvciIsImJvcmRlcldpZHRoIiwicGFkZGluZyIsImdhcCIsIndlaWdodCIsIl9jMyIsIiRSZWZyZXNoUmVnJCJdLCJzb3VyY2VSb290IjoiIn0=