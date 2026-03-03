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
  return props.$farge ? TextSuccessSubtle : _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.TextNeutral;
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
/******/ 	__webpack_require__.h = () => ("b9b584425a903e7da274")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxZQUFZLENBQUVpQixRQUFRLEtBQUlqQixZQUFZLENBQUNpQixRQUFRLEdBQUc7RUFBRSxHQUMxRW5CLGlDQUFpQyxDQUFDRSxZQUFZLGFBQVpBLFlBQVksdUJBQVpBLFlBQVksQ0FBRWlCLFFBQVEsQ0FDMUMsQ0FDZixDQUVSLENBQ1AsQ0FBQztBQUVkLENBQUM7QUFBQ1UsR0FBQSxHQTFGSTlDLGVBQTBEO0FBMkZoRSxpRUFBZUEsZUFBZSxFQUFDO0FBQUEsSUFBQUosRUFBQSxFQUFBRyxHQUFBLEVBQUErQyxHQUFBO0FBQUFDLHNDQUFBLENBQUFuRCxFQUFBO0FBQUFtRCxzQ0FBQSxDQUFBaEQsR0FBQTtBQUFBZ0Qsc0NBQUEsQ0FBQUQsR0FBQSxxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDN0gvQixzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL0ZhZ3Nhay9CZWhhbmRsaW5nL1NpZGVyL1NpbXVsZXJpbmcvU2ltdWxlcmluZ1BhbmVsLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBpc0JlZm9yZSB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBCb2R5U2hvcnQsIEJveCwgSFN0YWNrLCBTcGFjZXIsIFZTdGFjayB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHtcbiAgICBCb3JkZXJOZXV0cmFsLFxuICAgIEJvcmRlclN1Y2Nlc3MsXG4gICAgRm9udFdlaWdodEJvbGQsXG4gICAgU3BhY2UxNixcbiAgICBUZXh0RGFuZ2VyLFxuICAgIFRleHROZXV0cmFsLFxuICAgIFRleHRTdWNjZXNzLFxufSBmcm9tICdAbmF2aWt0L2RzLXRva2Vucy9kaXN0L3Rva2Vucyc7XG5cbmltcG9ydCB0eXBlIHsgSVNpbXVsZXJpbmdEVE8sIElTaW11bGVyaW5nUGVyaW9kZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL3NpbXVsZXJpbmcnO1xuaW1wb3J0IHsgRGF0b2Zvcm1hdCwgaXNvU3RyaW5nVGlsRGF0ZSwgaXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvZGF0byc7XG5pbXBvcnQgeyBmb3JtYXRlckJlbMO4cCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL2Zvcm1hdHRlcic7XG5cbmNvbnN0IEJvbGRUZWtzdE1lZEZhcmdlID0gc3R5bGVkKEJvZHlTaG9ydCk8eyAkZmFyZ2U/OiBzdHJpbmcgfT5gXG4gICAgY29sb3I6ICR7cHJvcHMgPT4gKHByb3BzLiRmYXJnZSA/IFRleHRTdWNjZXNzU3VidGxlIDogVGV4dE5ldXRyYWwpfTtcbiAgICBmb250LXdlaWdodDogJHtGb250V2VpZ2h0Qm9sZH07XG5gO1xuXG5jb25zdCBIU3RhY2tNZWRCb3JkZXJUb3AgPSBzdHlsZWQoSFN0YWNrKWBcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgJHtCb3JkZXJOZXV0cmFsfTtcbiAgICBwYWRkaW5nLXRvcDogJHtTcGFjZTE2fTtcbmA7XG5cbmludGVyZmFjZSBJU2ltdWxlcmluZ1Byb3BzIHtcbiAgICBzaW11bGVyaW5nOiBJU2ltdWxlcmluZ0RUTztcbn1cblxuY29uc3QgU2ltdWxlcmluZ1BhbmVsOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxJU2ltdWxlcmluZ1Byb3BzPiA9ICh7XG4gICAgc2ltdWxlcmluZzogeyBmZWlsdXRiZXRhbGluZywgZm9tLCBldHRlcmJldGFsaW5nLCBmb21EYXRvTmVzdGVQZXJpb2RlLCBwZXJpb2RlciwgdG9tU2lzdGVVdGJldGFsaW5nIH0sXG59KSA9PiB7XG4gICAgY29uc3Qga2FwaXRhbGlzZXJUZWtzdCA9ICh0ZWtzdDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgICAgcmV0dXJuIHRla3N0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGVrc3Quc2xpY2UoMSkudG9Mb3dlckNhc2UoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZm9ybWF0ZXJCZWzDuHBFbGxlckRhc2hPbVVuZGVmaW5lZCA9IChiZWzDuHA/OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xuICAgICAgICByZXR1cm4gIWJlbMO4cCB8fCBiZWzDuHAgPT09IDAgPyAnLScgOiBmb3JtYXRlckJlbMO4cChiZWzDuHApO1xuICAgIH07XG5cbiAgICBjb25zdCBuZXN0ZVBlcmlvZGUgPSBmb21EYXRvTmVzdGVQZXJpb2RlXG4gICAgICAgID8gKHBlcmlvZGVyLmZpbmQocGVyaW9kZSA9PiBwZXJpb2RlLmZvbSA9PT0gZm9tRGF0b05lc3RlUGVyaW9kZSkgPz8gdW5kZWZpbmVkKVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGVyRsO4ck5lc3RlUGVyaW9kZSA9IChwZXJpb2RlOiBJU2ltdWxlcmluZ1BlcmlvZGUpID0+XG4gICAgICAgICFmb21EYXRvTmVzdGVQZXJpb2RlIHx8IGlzQmVmb3JlKGlzb1N0cmluZ1RpbERhdGUocGVyaW9kZS5mb20pLCBpc29TdHJpbmdUaWxEYXRlKGZvbURhdG9OZXN0ZVBlcmlvZGUpKTtcblxuICAgIGNvbnN0IHBhbmVsVGl0dGVsID0gKCk6IHN0cmluZyA9PiB7XG4gICAgICAgIGNvbnN0IHV0YmV0YWx0ZVBlcmlvZGVyID0gcGVyaW9kZXIuZmlsdGVyKHBlcmlvZGUgPT4gZXJGw7hyTmVzdGVQZXJpb2RlKHBlcmlvZGUpKTtcbiAgICAgICAgaWYgKHV0YmV0YWx0ZVBlcmlvZGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuICdUb3RhbHQnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1dGJldGFsdGVQZXJpb2Rlci5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBgVG90YWwgZm9yICR7aXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nKHtcbiAgICAgICAgICAgICAgICBpc29TdHJpbmc6IHBlcmlvZGVyWzBdLmZvbSxcbiAgICAgICAgICAgICAgICB0aWxGb3JtYXQ6IERhdG9mb3JtYXQuTcOFTkVEX8OFUl9OQVZOLFxuICAgICAgICAgICAgfSl9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYFRvdGFsdCBmb3IgcGVyaW9kZW4gJHtpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcoe1xuICAgICAgICAgICAgaXNvU3RyaW5nOiBmb20sXG4gICAgICAgICAgICB0aWxGb3JtYXQ6IERhdG9mb3JtYXQuREFUTyxcbiAgICAgICAgfSl9IC0gJHtpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcoe1xuICAgICAgICAgICAgaXNvU3RyaW5nOiB0b21TaXN0ZVV0YmV0YWxpbmcsXG4gICAgICAgICAgICB0aWxGb3JtYXQ6IERhdG9mb3JtYXQuREFUTyxcbiAgICAgICAgfSl9YDtcbiAgICB9O1xuICAgIGNvbnNvbGUubG9nKHtcbiAgICAgICAgY2hlY2s6IG5lc3RlUGVyaW9kZT8ucmVzdWx0YXQgJiYgbmVzdGVQZXJpb2RlLnJlc3VsdGF0ID4gMCxcbiAgICAgICAgY2FsY3VsYXRlZDogbmVzdGVQZXJpb2RlPy5yZXN1bHRhdCAmJiBuZXN0ZVBlcmlvZGUucmVzdWx0YXQgPiAwID8gVGV4dFN1Y2Nlc3MgOiBUZXh0TmV1dHJhbCxcbiAgICB9KTtcbiAgICByZXR1cm4gKFxuICAgICAgICA8Qm94XG4gICAgICAgICAgICBtYXhXaWR0aD17JzI2cmVtJ31cbiAgICAgICAgICAgIG1hcmdpbkJsb2NrPXsnc3BhY2UtMCBzcGFjZS00MCd9XG4gICAgICAgICAgICBib3JkZXJDb2xvcj1cIm5ldXRyYWwtc3Ryb25nXCJcbiAgICAgICAgICAgIGJvcmRlcldpZHRoPVwiMVwiXG4gICAgICAgICAgICBwYWRkaW5nPVwic3BhY2UtNDBcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8VlN0YWNrIGFyaWEtbGFiZWw9eydTaW11bGVyaW5nc292ZXJzaWt0J30gZ2FwPVwic3BhY2UtMTJcIj5cbiAgICAgICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0IHdlaWdodD1cInNlbWlib2xkXCI+e3BhbmVsVGl0dGVsKCl9PC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICAgICAgPEhTdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydD5GZWlsdXRiZXRhbGluZzwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICA8U3BhY2VyIC8+XG4gICAgICAgICAgICAgICAgICAgIDxCb2xkVGVrc3RNZWRGYXJnZSAkZmFyZ2U9e2ZlaWx1dGJldGFsaW5nID4gMCA/IFRleHREYW5nZXIgOiBUZXh0TmV1dHJhbH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0ZXJCZWzDuHBFbGxlckRhc2hPbVVuZGVmaW5lZChmZWlsdXRiZXRhbGluZyl9XG4gICAgICAgICAgICAgICAgICAgIDwvQm9sZFRla3N0TWVkRmFyZ2U+XG4gICAgICAgICAgICAgICAgPC9IU3RhY2s+XG5cbiAgICAgICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0PkV0dGVyYmV0YWxpbmc8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgICAgICAgICAgICA8Qm9sZFRla3N0TWVkRmFyZ2U+e2Zvcm1hdGVyQmVsw7hwRWxsZXJEYXNoT21VbmRlZmluZWQoZXR0ZXJiZXRhbGluZyl9PC9Cb2xkVGVrc3RNZWRGYXJnZT5cbiAgICAgICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgICAgICA8SFN0YWNrTWVkQm9yZGVyVG9wPlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0IHdlaWdodD1cInNlbWlib2xkXCI+TmVzdGUgdXRiZXRhbGluZzwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICA8U3BhY2VyIC8+XG4gICAgICAgICAgICAgICAgICAgIHshbmVzdGVQZXJpb2RlICYmIDxCb2R5U2hvcnQgd2VpZ2h0PVwic2VtaWJvbGRcIj4tPC9Cb2R5U2hvcnQ+fVxuICAgICAgICAgICAgICAgIDwvSFN0YWNrTWVkQm9yZGVyVG9wPlxuICAgICAgICAgICAgICAgIHtuZXN0ZVBlcmlvZGUgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7a2FwaXRhbGlzZXJUZWtzdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzb1N0cmluZzogZm9tRGF0b05lc3RlUGVyaW9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5Nw4VORURfw4VSX05BVk4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJvbGRUZWtzdE1lZEZhcmdlICRmYXJnZT17bmVzdGVQZXJpb2RlPy5yZXN1bHRhdCAmJiBuZXN0ZVBlcmlvZGUucmVzdWx0YXQgPiAwfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0ZXJCZWzDuHBFbGxlckRhc2hPbVVuZGVmaW5lZChuZXN0ZVBlcmlvZGU/LnJlc3VsdGF0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQm9sZFRla3N0TWVkRmFyZ2U+XG4gICAgICAgICAgICAgICAgICAgIDwvSFN0YWNrPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L1ZTdGFjaz5cbiAgICAgICAgPC9Cb3g+XG4gICAgKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTaW11bGVyaW5nUGFuZWw7XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJiOWI1ODQ0MjVhOTAzZTdkYTI3NFwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsImlzQmVmb3JlIiwic3R5bGVkIiwiQm9keVNob3J0IiwiQm94IiwiSFN0YWNrIiwiU3BhY2VyIiwiVlN0YWNrIiwiQm9yZGVyTmV1dHJhbCIsIkZvbnRXZWlnaHRCb2xkIiwiU3BhY2UxNiIsIlRleHREYW5nZXIiLCJUZXh0TmV1dHJhbCIsIlRleHRTdWNjZXNzIiwiRGF0b2Zvcm1hdCIsImlzb1N0cmluZ1RpbERhdGUiLCJpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmciLCJmb3JtYXRlckJlbMO4cCIsIkJvbGRUZWtzdE1lZEZhcmdlIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbCIsInByb3BzIiwiJGZhcmdlIiwiVGV4dFN1Y2Nlc3NTdWJ0bGUiLCJfYyIsIkhTdGFja01lZEJvcmRlclRvcCIsIl90ZW1wbGF0ZU9iamVjdDIiLCJfYzIiLCJTaW11bGVyaW5nUGFuZWwiLCJfcmVmIiwiX3BlcmlvZGVyJGZpbmQiLCJfcmVmJHNpbXVsZXJpbmciLCJzaW11bGVyaW5nIiwiZmVpbHV0YmV0YWxpbmciLCJmb20iLCJldHRlcmJldGFsaW5nIiwiZm9tRGF0b05lc3RlUGVyaW9kZSIsInBlcmlvZGVyIiwidG9tU2lzdGVVdGJldGFsaW5nIiwia2FwaXRhbGlzZXJUZWtzdCIsInRla3N0IiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvTG93ZXJDYXNlIiwiZm9ybWF0ZXJCZWzDuHBFbGxlckRhc2hPbVVuZGVmaW5lZCIsImJlbMO4cCIsIm5lc3RlUGVyaW9kZSIsImZpbmQiLCJwZXJpb2RlIiwidW5kZWZpbmVkIiwiZXJGw7hyTmVzdGVQZXJpb2RlIiwicGFuZWxUaXR0ZWwiLCJ1dGJldGFsdGVQZXJpb2RlciIsImZpbHRlciIsImxlbmd0aCIsImNvbmNhdCIsImlzb1N0cmluZyIsInRpbEZvcm1hdCIsIk3DhU5FRF/DhVJfTkFWTiIsIkRBVE8iLCJjb25zb2xlIiwibG9nIiwiY2hlY2siLCJyZXN1bHRhdCIsImNhbGN1bGF0ZWQiLCJjcmVhdGVFbGVtZW50IiwibWF4V2lkdGgiLCJtYXJnaW5CbG9jayIsImJvcmRlckNvbG9yIiwiYm9yZGVyV2lkdGgiLCJwYWRkaW5nIiwiZ2FwIiwid2VpZ2h0IiwiX2MzIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==