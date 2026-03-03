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
  return props.$farge ? _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.TextSuccess : _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.TextNeutral;
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
/******/ 	__webpack_require__.h = () => ("ca71259b9bc06c0ecfbd")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi45ODk0NGU0YmZmYzQyNjRiMTQ2ZC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUErQjtBQUVLO0FBQ0c7QUFFbUM7QUFRbkM7QUFHK0Q7QUFDdkM7QUFFL0QsSUFBTWtCLGlCQUFpQixHQUFHaEIsNkRBQU0sQ0FBQ0MsdURBQVMsQ0FBQyxDQUFBZ0IsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLHNCQUFBLHFEQUM5QixVQUFBQyxLQUFLO0VBQUEsT0FBS0EsS0FBSyxDQUFDQyxNQUFNLEdBQUdULHNFQUFXLEdBQUdELHNFQUFXO0FBQUEsQ0FBQyxFQUM3Q0gseUVBQWMsQ0FDaEM7QUFBQ2MsRUFBQSxHQUhJTCxpQkFBaUI7QUFLdkIsSUFBTU0sa0JBQWtCLEdBQUd0Qiw2REFBTSxDQUFDRyxvREFBTSxDQUFDLENBQUFvQixnQkFBQSxLQUFBQSxnQkFBQSxHQUFBTCxzQkFBQSxvRUFDYlosd0VBQWEsRUFDdEJFLGtFQUFPLENBQ3pCO0FBQUNnQixHQUFBLEdBSElGLGtCQUFrQjtBQVN4QixJQUFNRyxlQUEwRCxHQUFHLFNBQTdEQSxlQUEwREEsQ0FBQUMsSUFBQSxFQUUxRDtFQUFBLElBQUFDLGNBQUE7RUFBQSxJQUFBQyxlQUFBLEdBQUFGLElBQUEsQ0FERkcsVUFBVTtJQUFJQyxjQUFjLEdBQUFGLGVBQUEsQ0FBZEUsY0FBYztJQUFFQyxHQUFHLEdBQUFILGVBQUEsQ0FBSEcsR0FBRztJQUFFQyxhQUFhLEdBQUFKLGVBQUEsQ0FBYkksYUFBYTtJQUFFQyxtQkFBbUIsR0FBQUwsZUFBQSxDQUFuQkssbUJBQW1CO0lBQUVDLFFBQVEsR0FBQU4sZUFBQSxDQUFSTSxRQUFRO0lBQUVDLGtCQUFrQixHQUFBUCxlQUFBLENBQWxCTyxrQkFBa0I7RUFFbkcsSUFBTUMsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFnQkEsQ0FBSUMsS0FBYSxFQUFhO0lBQ2hELE9BQU9BLEtBQUssQ0FBQ0MsTUFBTSxDQUFDLENB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LFlBQVksQ0FBRWlCLFFBQVEsS0FBSWpCLFlBQVksQ0FBQ2lCLFFBQVEsR0FBRztFQUFFLEdBRTNEbkIsaUNBQWlDLENBQUNFLFlBQVksYUFBWkEsWUFBWSx1QkFBWkEsWUFBWSxDQUFFaUIsUUFBUSxDQUMxQyxDQUNmLENBRVIsQ0FDUCxDQUFDO0FBRWQsQ0FBQztBQUFDVSxHQUFBLEdBNUZJOUMsZUFBMEQ7QUE2RmhFLGlFQUFlQSxlQUFlLEVBQUM7QUFBQSxJQUFBSixFQUFBLEVBQUFHLEdBQUEsRUFBQStDLEdBQUE7QUFBQUMsc0NBQUEsQ0FBQW5ELEVBQUE7QUFBQW1ELHNDQUFBLENBQUFoRCxHQUFBO0FBQUFnRCxzQ0FBQSxDQUFBRCxHQUFBLHFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUM5SC9CLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvRmFnc2FrL0JlaGFuZGxpbmcvU2lkZXIvU2ltdWxlcmluZy9TaW11bGVyaW5nUGFuZWwudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGlzQmVmb3JlIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEJvZHlTaG9ydCwgQm94LCBIU3RhY2ssIFNwYWNlciwgVlN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQge1xuICAgIEJvcmRlck5ldXRyYWwsXG4gICAgRm9udFdlaWdodEJvbGQsXG4gICAgU3BhY2UxNixcbiAgICBUZXh0RGFuZ2VyLFxuICAgIFRleHROZXV0cmFsLFxuICAgIFRleHRTdWNjZXNzLFxufSBmcm9tICdAbmF2aWt0L2RzLXRva2Vucy9kaXN0L3Rva2Vucyc7XG5cbmltcG9ydCB0eXBlIHsgSVNpbXVsZXJpbmdEVE8sIElTaW11bGVyaW5nUGVyaW9kZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL3NpbXVsZXJpbmcnO1xuaW1wb3J0IHsgRGF0b2Zvcm1hdCwgaXNvU3RyaW5nVGlsRGF0ZSwgaXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvZGF0byc7XG5pbXBvcnQgeyBmb3JtYXRlckJlbMO4cCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL2Zvcm1hdHRlcic7XG5cbmNvbnN0IEJvbGRUZWtzdE1lZEZhcmdlID0gc3R5bGVkKEJvZHlTaG9ydCk8eyAkZmFyZ2U/OiBzdHJpbmcgfT5gXG4gICAgY29sb3I6ICR7cHJvcHMgPT4gKHByb3BzLiRmYXJnZSA/IFRleHRTdWNjZXNzIDogVGV4dE5ldXRyYWwpfTtcbiAgICBmb250LXdlaWdodDogJHtGb250V2VpZ2h0Qm9sZH07XG5gO1xuXG5jb25zdCBIU3RhY2tNZWRCb3JkZXJUb3AgPSBzdHlsZWQoSFN0YWNrKWBcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgJHtCb3JkZXJOZXV0cmFsfTtcbiAgICBwYWRkaW5nLXRvcDogJHtTcGFjZTE2fTtcbmA7XG5cbmludGVyZmFjZSBJU2ltdWxlcmluZ1Byb3BzIHtcbiAgICBzaW11bGVyaW5nOiBJU2ltdWxlcmluZ0RUTztcbn1cblxuY29uc3QgU2ltdWxlcmluZ1BhbmVsOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxJU2ltdWxlcmluZ1Byb3BzPiA9ICh7XG4gICAgc2ltdWxlcmluZzogeyBmZWlsdXRiZXRhbGluZywgZm9tLCBldHRlcmJldGFsaW5nLCBmb21EYXRvTmVzdGVQZXJpb2RlLCBwZXJpb2RlciwgdG9tU2lzdGVVdGJldGFsaW5nIH0sXG59KSA9PiB7XG4gICAgY29uc3Qga2FwaXRhbGlzZXJUZWtzdCA9ICh0ZWtzdDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgICAgcmV0dXJuIHRla3N0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGVrc3Quc2xpY2UoMSkudG9Mb3dlckNhc2UoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZm9ybWF0ZXJCZWzDuHBFbGxlckRhc2hPbVVuZGVmaW5lZCA9IChiZWzDuHA/OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xuICAgICAgICByZXR1cm4gIWJlbMO4cCB8fCBiZWzDuHAgPT09IDAgPyAnLScgOiBmb3JtYXRlckJlbMO4cChiZWzDuHApO1xuICAgIH07XG5cbiAgICBjb25zdCBuZXN0ZVBlcmlvZGUgPSBmb21EYXRvTmVzdGVQZXJpb2RlXG4gICAgICAgID8gKHBlcmlvZGVyLmZpbmQocGVyaW9kZSA9PiBwZXJpb2RlLmZvbSA9PT0gZm9tRGF0b05lc3RlUGVyaW9kZSkgPz8gdW5kZWZpbmVkKVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGVyRsO4ck5lc3RlUGVyaW9kZSA9IChwZXJpb2RlOiBJU2ltdWxlcmluZ1BlcmlvZGUpID0+XG4gICAgICAgICFmb21EYXRvTmVzdGVQZXJpb2RlIHx8IGlzQmVmb3JlKGlzb1N0cmluZ1RpbERhdGUocGVyaW9kZS5mb20pLCBpc29TdHJpbmdUaWxEYXRlKGZvbURhdG9OZXN0ZVBlcmlvZGUpKTtcblxuICAgIGNvbnN0IHBhbmVsVGl0dGVsID0gKCk6IHN0cmluZyA9PiB7XG4gICAgICAgIGNvbnN0IHV0YmV0YWx0ZVBlcmlvZGVyID0gcGVyaW9kZXIuZmlsdGVyKHBlcmlvZGUgPT4gZXJGw7hyTmVzdGVQZXJpb2RlKHBlcmlvZGUpKTtcbiAgICAgICAgaWYgKHV0YmV0YWx0ZVBlcmlvZGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuICdUb3RhbHQnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1dGJldGFsdGVQZXJpb2Rlci5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBgVG90YWwgZm9yICR7aXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nKHtcbiAgICAgICAgICAgICAgICBpc29TdHJpbmc6IHBlcmlvZGVyWzBdLmZvbSxcbiAgICAgICAgICAgICAgICB0aWxGb3JtYXQ6IERhdG9mb3JtYXQuTcOFTkVEX8OFUl9OQVZOLFxuICAgICAgICAgICAgfSl9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYFRvdGFsdCBmb3IgcGVyaW9kZW4gJHtpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcoe1xuICAgICAgICAgICAgaXNvU3RyaW5nOiBmb20sXG4gICAgICAgICAgICB0aWxGb3JtYXQ6IERhdG9mb3JtYXQuREFUTyxcbiAgICAgICAgfSl9IC0gJHtpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcoe1xuICAgICAgICAgICAgaXNvU3RyaW5nOiB0b21TaXN0ZVV0YmV0YWxpbmcsXG4gICAgICAgICAgICB0aWxGb3JtYXQ6IERhdG9mb3JtYXQuREFUTyxcbiAgICAgICAgfSl9YDtcbiAgICB9O1xuICAgIGNvbnNvbGUubG9nKHtcbiAgICAgICAgY2hlY2s6IG5lc3RlUGVyaW9kZT8ucmVzdWx0YXQgJiYgbmVzdGVQZXJpb2RlLnJlc3VsdGF0ID4gMCxcbiAgICAgICAgY2FsY3VsYXRlZDogbmVzdGVQZXJpb2RlPy5yZXN1bHRhdCAmJiBuZXN0ZVBlcmlvZGUucmVzdWx0YXQgPiAwID8gVGV4dFN1Y2Nlc3MgOiBUZXh0TmV1dHJhbCxcbiAgICB9KTtcbiAgICByZXR1cm4gKFxuICAgICAgICA8Qm94XG4gICAgICAgICAgICBtYXhXaWR0aD17JzI2cmVtJ31cbiAgICAgICAgICAgIG1hcmdpbkJsb2NrPXsnc3BhY2UtMCBzcGFjZS00MCd9XG4gICAgICAgICAgICBib3JkZXJDb2xvcj1cIm5ldXRyYWwtc3Ryb25nXCJcbiAgICAgICAgICAgIGJvcmRlcldpZHRoPVwiMVwiXG4gICAgICAgICAgICBwYWRkaW5nPVwic3BhY2UtNDBcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8VlN0YWNrIGFyaWEtbGFiZWw9eydTaW11bGVyaW5nc292ZXJzaWt0J30gZ2FwPVwic3BhY2UtMTJcIj5cbiAgICAgICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0IHdlaWdodD1cInNlbWlib2xkXCI+e3BhbmVsVGl0dGVsKCl9PC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICAgICAgPEhTdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydD5GZWlsdXRiZXRhbGluZzwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICA8U3BhY2VyIC8+XG4gICAgICAgICAgICAgICAgICAgIDxCb2xkVGVrc3RNZWRGYXJnZSAkZmFyZ2U9e2ZlaWx1dGJldGFsaW5nID4gMCA/IFRleHREYW5nZXIgOiBUZXh0TmV1dHJhbH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0ZXJCZWzDuHBFbGxlckRhc2hPbVVuZGVmaW5lZChmZWlsdXRiZXRhbGluZyl9XG4gICAgICAgICAgICAgICAgICAgIDwvQm9sZFRla3N0TWVkRmFyZ2U+XG4gICAgICAgICAgICAgICAgPC9IU3RhY2s+XG5cbiAgICAgICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0PkV0dGVyYmV0YWxpbmc8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgICAgICAgICAgICA8Qm9sZFRla3N0TWVkRmFyZ2U+e2Zvcm1hdGVyQmVsw7hwRWxsZXJEYXNoT21VbmRlZmluZWQoZXR0ZXJiZXRhbGluZyl9PC9Cb2xkVGVrc3RNZWRGYXJnZT5cbiAgICAgICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgICAgICA8SFN0YWNrTWVkQm9yZGVyVG9wPlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0IHdlaWdodD1cInNlbWlib2xkXCI+TmVzdGUgdXRiZXRhbGluZzwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICA8U3BhY2VyIC8+XG4gICAgICAgICAgICAgICAgICAgIHshbmVzdGVQZXJpb2RlICYmIDxCb2R5U2hvcnQgd2VpZ2h0PVwic2VtaWJvbGRcIj4tPC9Cb2R5U2hvcnQ+fVxuICAgICAgICAgICAgICAgIDwvSFN0YWNrTWVkQm9yZGVyVG9wPlxuICAgICAgICAgICAgICAgIHtuZXN0ZVBlcmlvZGUgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7a2FwaXRhbGlzZXJUZWtzdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzb1N0cmluZzogZm9tRGF0b05lc3RlUGVyaW9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5Nw4VORURfw4VSX05BVk4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJvbGRUZWtzdE1lZEZhcmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZhcmdlPXtuZXN0ZVBlcmlvZGU/LnJlc3VsdGF0ICYmIG5lc3RlUGVyaW9kZS5yZXN1bHRhdCA+IDB9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2Zvcm1hdGVyQmVsw7hwRWxsZXJEYXNoT21VbmRlZmluZWQobmVzdGVQZXJpb2RlPy5yZXN1bHRhdCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0JvbGRUZWtzdE1lZEZhcmdlPlxuICAgICAgICAgICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9WU3RhY2s+XG4gICAgICAgIDwvQm94PlxuICAgICk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU2ltdWxlcmluZ1BhbmVsO1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiY2E3MTI1OWI5YmMwNmMwZWNmYmRcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJpc0JlZm9yZSIsInN0eWxlZCIsIkJvZHlTaG9ydCIsIkJveCIsIkhTdGFjayIsIlNwYWNlciIsIlZTdGFjayIsIkJvcmRlck5ldXRyYWwiLCJGb250V2VpZ2h0Qm9sZCIsIlNwYWNlMTYiLCJUZXh0RGFuZ2VyIiwiVGV4dE5ldXRyYWwiLCJUZXh0U3VjY2VzcyIsIkRhdG9mb3JtYXQiLCJpc29TdHJpbmdUaWxEYXRlIiwiaXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nIiwiZm9ybWF0ZXJCZWzDuHAiLCJCb2xkVGVrc3RNZWRGYXJnZSIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJwcm9wcyIsIiRmYXJnZSIsIl9jIiwiSFN0YWNrTWVkQm9yZGVyVG9wIiwiX3RlbXBsYXRlT2JqZWN0MiIsIl9jMiIsIlNpbXVsZXJpbmdQYW5lbCIsIl9yZWYiLCJfcGVyaW9kZXIkZmluZCIsIl9yZWYkc2ltdWxlcmluZyIsInNpbXVsZXJpbmciLCJmZWlsdXRiZXRhbGluZyIsImZvbSIsImV0dGVyYmV0YWxpbmciLCJmb21EYXRvTmVzdGVQZXJpb2RlIiwicGVyaW9kZXIiLCJ0b21TaXN0ZVV0YmV0YWxpbmciLCJrYXBpdGFsaXNlclRla3N0IiwidGVrc3QiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwidG9Mb3dlckNhc2UiLCJmb3JtYXRlckJlbMO4cEVsbGVyRGFzaE9tVW5kZWZpbmVkIiwiYmVsw7hwIiwibmVzdGVQZXJpb2RlIiwiZmluZCIsInBlcmlvZGUiLCJ1bmRlZmluZWQiLCJlckbDuHJOZXN0ZVBlcmlvZGUiLCJwYW5lbFRpdHRlbCIsInV0YmV0YWx0ZVBlcmlvZGVyIiwiZmlsdGVyIiwibGVuZ3RoIiwiY29uY2F0IiwiaXNvU3RyaW5nIiwidGlsRm9ybWF0IiwiTcOFTkVEX8OFUl9OQVZOIiwiREFUTyIsImNvbnNvbGUiLCJsb2ciLCJjaGVjayIsInJlc3VsdGF0IiwiY2FsY3VsYXRlZCIsImNyZWF0ZUVsZW1lbnQiLCJtYXhXaWR0aCIsIm1hcmdpbkJsb2NrIiwiYm9yZGVyQ29sb3IiLCJib3JkZXJXaWR0aCIsInBhZGRpbmciLCJnYXAiLCJ3ZWlnaHQiLCJfYzMiLCIkUmVmcmVzaFJlZyQiXSwic291cmNlUm9vdCI6IiJ9