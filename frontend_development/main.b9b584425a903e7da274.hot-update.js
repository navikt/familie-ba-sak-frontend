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
/******/ 	__webpack_require__.h = () => ("35043a9698b9eb501b5f")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5iOWI1ODQ0MjVhOTAzZTdkYTI3NC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUErQjtBQUVLO0FBQ0c7QUFFbUM7QUFRbkM7QUFHK0Q7QUFDdkM7QUFFL0QsSUFBTWtCLGlCQUFpQixHQUFHaEIsNkRBQU0sQ0FBQ0MsdURBQVMsQ0FBQyxDQUFBZ0IsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLHNCQUFBLHFEQUM5QixVQUFBQyxLQUFLO0VBQUEsT0FBS0EsS0FBSyxDQUFDQyxNQUFNLEdBQUdDLGlCQUFpQixHQUFHWCxzRUFBVztBQUFBLENBQUMsRUFDbkRILHlFQUFjLENBQ2hDO0FBQUNlLEVBQUEsR0FISU4saUJBQWlCO0FBS3ZCLElBQU1PLGtCQUFrQixHQUFHdkIsNkRBQU0sQ0FBQ0csb0RBQU0sQ0FBQyxDQUFBcUIsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQU4sc0JBQUEsb0VBQ2JaLHdFQUFhLEVBQ3RCRSxrRUFBTyxDQUN6QjtBQUFDaUIsR0FBQSxHQUhJRixrQkFBa0I7QUFTeEIsSUFBTUcsZUFBMEQsR0FBRyxTQUE3REEsZUFBMERBLENBQUFDLElBQUEsRUFFMUQ7RUFBQSxJQUFBQyxjQUFBO0VBQUEsSUFBQUMsZUFBQSxHQUFBRixJQUFBLENBREZHLFVBQVU7SUFBSUMsY0FBYyxHQUFBRixlQUFBLENBQWRFLGNBQWM7SUFBRUMsR0FBRyxHQUFBSCxlQUFBLENBQUhHLEdBQUc7SUFBRUMsYUFBYSxHQUFBSixlQUFBLENBQWJJLGFBQWE7SUFBRUMsbUJBQW1CLEdBQUFMLGVBQUEsQ0FBbkJLLG1CQUFtQjtJQUFFQyxRQUFRLEdBQUFOLGVBQUEsQ0FBUk0sUUFBUTtJQUFFQyxrQkFBa0IsR0FBQVAsZUFBQSxDQUFsQk8sa0JBQWtCO0VBRW5HLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBZ0JBLENBQUlDLEtBQWEsRUFBYTtJQUNoRCxPQUFPQSxLQUFLLENBQUNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsR0FBR0YsS0FBSyxDQUFDRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsQ0FBQyxDQUFDO0VBQ3ZFLENBQUM7RUFFRCxJQUFNQyxpQ0FBaUMsR0FBRyxTQUFwQ0EsaUNBQWlDQSxDQUFJQyxLQUFjLEVBQWE7SUFDbEUsT0FBTyxDQUFDQSxLQUFLLElBQUlBLEtBQUssS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHN0Isa0VBQWEsQ0FBQzZCLEtBQUssQ0FBQztFQUM3RCxDQUFDO0VBRUQsSUFBTUMsWUFBWSxHQUFHWCxtQkFBbUIsSUFBQU4sY0FBQSxHQUNqQ08sUUFBUSxDQUFDVyxJQUFJLENBQUMsVUFBQUMsT0FBTztJQUFBLE9BQUlBLE9BQU8sQ0FBQ2YsR0FBRyxLQUFLRSxtQkFBbUI7RUFBQSxFQUFDLGNBQUFOLGNBQUEsY0FBQUEsY0FBQSxHQUFJb0IsU0FBUyxHQUMzRUEsU0FBUztFQUVmLElBQU1DLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBaUJBLENBQUlGLE9BQTJCO0lBQUEsT0FDbEQsQ0FBQ2IsbUJBQW1CLElBQUluQyxrREFBUSxDQUFDYyw2REFBZ0IsQ0FBQ2tDLE9BQU8sQ0FBQ2YsR0FBRyxDQUFDLEVBQUVuQiw2REFBZ0IsQ0FBQ3FCLG1CQUFtQixDQUFDLENBQUM7RUFBQTtFQUUxRyxJQUFNZ0IsV0FBVyxHQUFHLFNBQWRBLFdBQVdBLENBQUEsRUFBaUI7SUFDOUIsSUFBTUMsaUJBQWlCLEdBQUdoQixRQUFRLENBQUNpQixNQUFNLENBQUMsVUFBQUwsT0FBTztNQUFBLE9BQUlFLGlCQUFpQixDQUFDRixPQUFPLENBQUM7SUFBQSxFQUFDO0lBQ2hGLElBQUlJLGlCQUFpQixDQUFDRSxNQUFNLEtBQUssQ0FBQyxFQUFFO01BQ2hDLE9BQU8sUUFBUTtJQUNuQjtJQUNBLElBQUlGLGlCQUFpQixDQUFDRSxNQUFNLEtBQUssQ0FBQyxFQUFFO01BQ2hDLG9CQUFBQyxNQUFBLENBQW9CeEMsd0VBQTJCLENBQUM7UUFDNUN5QyxTQUFTLEVBQUVwQixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNILEdBQUc7UUFDMUJ3QixTQUFTLEVBQUU1QyxtREFBVSxDQUFDNkM7TUFDMUIsQ0FBQyxDQUFDO0lBQ047SUFDQSw4QkFBQUgsTUFBQSxDQUE4QnhDLHdFQUEyQixDQUFDO01BQ3REeUMsU0FBUyxFQUFFdkIsR0FBRztNQUNkd0IsU0FBUyxFQUFFNUMsbURBQVUsQ0FBQzhDO0lBQzFCLENBQUMsQ0FBQyxTQUFBSixNQUFBLENBQU14Qyx3RUFBMkIsQ0FBQztNQUNoQ3lDLFNBQVMsRUFBRW5CLGtCQUFrQjtNQUM3Qm9CLFNBQVMsRUFBRTVDLG1EQUFVLENBQUM4QztJQUMxQixDQUFDLENBQUM7RUFDTixDQUFDO0VBQ0RDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDO0lBQ1JDLEtBQUssRUFBRSxDQUFBaEIsWUFBWSxhQUFaQSxZQUFZLHVCQUFaQSxZQUFZLENBQUVpQixRQUFRLEtBQUlqQixZQUFZLENBQUNpQixRQUFRLEdBQUcsQ0FBQztJQUMxREMsVUFBVSxFQUFFbEIsWUFBWSxhQUFaQSxZQUFZLGVBQVpBLFlBQVksQ0FBRWlCLFFBQVEsSUFBSWpCLFlBQVksQ0FBQ2lCLFFBQVEsR0FBRyxDQUFDLEdBQUduRCxzRUFBVyxHQUFHRCxzRUFBV0E7RUFDL0YsQ0FBQyxDQUFDO0VBQ0Ysb0JBQ0laLGdEQUFBLENBQUNJLGlEQUFHO0lBQ0ErRCxRQUFRLEVBQUUsT0FBUTtJQUNsQkMsV0FBVyxFQUFFLGtCQUFtQjtJQUNoQ0MsV0FBVyxFQUFDLGdCQUFnQjtJQUM1QkMsV0FBVyxFQUFDLEdBQUc7SUFDZkMsT0FBTyxFQUFDO0VBQVUsZ0JBRWxCdkUsZ0RBQUEsQ0FBQ08sb0RBQU07SUFBQyxjQUFZLHFCQUFzQjtJQUFDaUUsR0FBRyxFQUFDO0VBQVUsZ0JBQ3JEeEUsZ0RBQUEsQ0FBQ0ssb0RBQU0scUJBQ0hMLGdEQUFBLENBQUNHLHVEQUFTO0lBQUNzRSxNQUFNLEVBQUM7RUFBVSxHQUFFckIsV0FBVyxDQUFDLENBQWEsQ0FDbkQsQ0FBQyxlQUNUcEQsZ0RBQUEsQ0FBQ0ssb0RBQU0scUJBQ0hMLGdEQUFBLENBQUNHLHVEQUFTLFFBQUMsZ0JBQXlCLENBQUMsZUFDckNILGdEQUFBLENBQUNNLG9EQUFNLE1BQUUsQ0FBQyxlQUNWTixnREFBQSxDQUFDa0IsaUJBQWlCO0lBQUNJLE1BQU0sRUFBRVcsY0FBYyxHQUFHLENBQUMsR0FBR3RCLHFFQUFVLEdBQUdDLHNFQUFXQTtFQUFDLEdBQ3BFaUMsaUNBQWlDLENBQUNaLGNBQWMsQ0FDbEMsQ0FDZixDQUFDLGVBRVRqQyxnREFBQSxDQUFDSyxvREFBTSxxQkFDSEwsZ0RBQUEsQ0FBQ0csdURBQVMsUUFBQyxlQUF3QixDQUFDLGVBQ3BDSCxnREFBQSxDQUFDTSxvREFBTSxNQUFFLENBQUMsZUFDVk4sZ0RBQUEsQ0FBQ2tCLGlCQUFpQixRQUFFMkIsaUNBQWlDLENBQUNWLGFBQWEsQ0FBcUIsQ0FDcEYsQ0FBQyxlQUNUbkMsZ0RBQUEsQ0FBQ3lCLGtCQUFrQixxQkFDZnpCLGdEQUFBLENBQUNHLHVEQUFTO0lBQUNzRSxNQUFNLEVBQUM7RUFBVSxHQUFDLGtCQUEyQixDQUFDLGVBQ3pEekUsZ0RBQUEsQ0FBQ00sb0RBQU0sTUFBRSxDQUFDLEVBQ1QsQ0FBQ3lDLFlBQVksaUJBQUkvQyxnREFBQSxDQUFDRyx1REFBUztJQUFDc0UsTUFBTSxFQUFDO0VBQVUsR0FBQyxHQUFZLENBQzNDLENBQUMsRUFDcEIxQixZQUFZLGlCQUNUL0MsZ0RBQUEsQ0FBQ0ssb0RBQU0scUJBQ0hMLGdEQUFBLENBQUNHLHVEQUFTLFFBQ0xvQyxnQkFBZ0IsQ0FDYnZCLHdFQUEyQixDQUFDO0lBQ3hCeUMsU0FBUyxFQUFFckIsbUJBQW1CO0lBQzlCc0IsU0FBUyxFQUFFNUMsbURBQVUsQ0FBQzZDO0VBQzFCLENBQUMsQ0FDTCxDQUNPLENBQUMsZUFDWjNELGdEQUFBLENBQUNNLG9EQUFNLE1BQUUsQ0FBQyxlQUNWTixnREFBQSxDQUFDa0IsaUJBQWlCO0lBQUNJLE1BQU0sRUFBRSxDQUFBeUIsWUFBWSxhQUFaQSxZQUFZLHVCQUFaQSxZQUFZLENBQUVpQixRQUFRLEtBQUlqQixZQUFZLENBQUNpQixRQUFRLEdBQUc7RUFBRSxHQUMxRW5CLGlDQUFpQyxDQUFDRSxZQUFZLGFBQVpBLFlBQVksdUJBQVpBLFlBQVksQ0FBRWlCLFFBQVEsQ0FDMUMsQ0FDZixDQUVSLENBQ1AsQ0FBQztBQUVkLENBQUM7QUFBQ1UsR0FBQSxHQTFGSTlDLGVBQTBEO0FBMkZoRSxpRUFBZUEsZUFBZSxFQUFDO0FBQUEsSUFBQUosRUFBQSxFQUFBRyxHQUFBLEVBQUErQyxHQUFBO0FBQUFDLHNDQUFBLENBQUFuRCxFQUFBO0FBQUFtRCxzQ0FBQSxDQUFBaEQsR0FBQTtBQUFBZ0Qsc0NBQUEsQ0FBQUQsR0FBQSxxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDNUgvQixzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL0ZhZ3Nhay9CZWhhbmRsaW5nL1NpZGVyL1NpbXVsZXJpbmcvU2ltdWxlcmluZ1BhbmVsLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBpc0JlZm9yZSB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBCb2R5U2hvcnQsIEJveCwgSFN0YWNrLCBTcGFjZXIsIFZTdGFjayB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHtcbiAgICBCb3JkZXJOZXV0cmFsLFxuICAgIEZvbnRXZWlnaHRCb2xkLFxuICAgIFNwYWNlMTYsXG4gICAgVGV4dERhbmdlcixcbiAgICBUZXh0TmV1dHJhbCxcbiAgICBUZXh0U3VjY2Vzcyxcbn0gZnJvbSAnQG5hdmlrdC9kcy10b2tlbnMvZGlzdC90b2tlbnMnO1xuXG5pbXBvcnQgdHlwZSB7IElTaW11bGVyaW5nRFRPLCBJU2ltdWxlcmluZ1BlcmlvZGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlci9zaW11bGVyaW5nJztcbmltcG9ydCB7IERhdG9mb3JtYXQsIGlzb1N0cmluZ1RpbERhdGUsIGlzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL2RhdG8nO1xuaW1wb3J0IHsgZm9ybWF0ZXJCZWzDuHAgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9mb3JtYXR0ZXInO1xuXG5jb25zdCBCb2xkVGVrc3RNZWRGYXJnZSA9IHN0eWxlZChCb2R5U2hvcnQpPHsgJGZhcmdlPzogc3RyaW5nIH0+YFxuICAgIGNvbG9yOiAke3Byb3BzID0+IChwcm9wcy4kZmFyZ2UgPyBUZXh0U3VjY2Vzc1N1YnRsZSA6IFRleHROZXV0cmFsKX07XG4gICAgZm9udC13ZWlnaHQ6ICR7Rm9udFdlaWdodEJvbGR9O1xuYDtcblxuY29uc3QgSFN0YWNrTWVkQm9yZGVyVG9wID0gc3R5bGVkKEhTdGFjaylgXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICR7Qm9yZGVyTmV1dHJhbH07XG4gICAgcGFkZGluZy10b3A6ICR7U3BhY2UxNn07XG5gO1xuXG5pbnRlcmZhY2UgSVNpbXVsZXJpbmdQcm9wcyB7XG4gICAgc2ltdWxlcmluZzogSVNpbXVsZXJpbmdEVE87XG59XG5cbmNvbnN0IFNpbXVsZXJpbmdQYW5lbDogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8SVNpbXVsZXJpbmdQcm9wcz4gPSAoe1xuICAgIHNpbXVsZXJpbmc6IHsgZmVpbHV0YmV0YWxpbmcsIGZvbSwgZXR0ZXJiZXRhbGluZywgZm9tRGF0b05lc3RlUGVyaW9kZSwgcGVyaW9kZXIsIHRvbVNpc3RlVXRiZXRhbGluZyB9LFxufSkgPT4ge1xuICAgIGNvbnN0IGthcGl0YWxpc2VyVGVrc3QgPSAodGVrc3Q6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICAgIHJldHVybiB0ZWtzdC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRla3N0LnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGZvcm1hdGVyQmVsw7hwRWxsZXJEYXNoT21VbmRlZmluZWQgPSAoYmVsw7hwPzogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgcmV0dXJuICFiZWzDuHAgfHwgYmVsw7hwID09PSAwID8gJy0nIDogZm9ybWF0ZXJCZWzDuHAoYmVsw7hwKTtcbiAgICB9O1xuXG4gICAgY29uc3QgbmVzdGVQZXJpb2RlID0gZm9tRGF0b05lc3RlUGVyaW9kZVxuICAgICAgICA/IChwZXJpb2Rlci5maW5kKHBlcmlvZGUgPT4gcGVyaW9kZS5mb20gPT09IGZvbURhdG9OZXN0ZVBlcmlvZGUpID8/IHVuZGVmaW5lZClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBlckbDuHJOZXN0ZVBlcmlvZGUgPSAocGVyaW9kZTogSVNpbXVsZXJpbmdQZXJpb2RlKSA9PlxuICAgICAgICAhZm9tRGF0b05lc3RlUGVyaW9kZSB8fCBpc0JlZm9yZShpc29TdHJpbmdUaWxEYXRlKHBlcmlvZGUuZm9tKSwgaXNvU3RyaW5nVGlsRGF0ZShmb21EYXRvTmVzdGVQZXJpb2RlKSk7XG5cbiAgICBjb25zdCBwYW5lbFRpdHRlbCA9ICgpOiBzdHJpbmcgPT4ge1xuICAgICAgICBjb25zdCB1dGJldGFsdGVQZXJpb2RlciA9IHBlcmlvZGVyLmZpbHRlcihwZXJpb2RlID0+IGVyRsO4ck5lc3RlUGVyaW9kZShwZXJpb2RlKSk7XG4gICAgICAgIGlmICh1dGJldGFsdGVQZXJpb2Rlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAnVG90YWx0JztcbiAgICAgICAgfVxuICAgICAgICBpZiAodXRiZXRhbHRlUGVyaW9kZXIubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYFRvdGFsIGZvciAke2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICAgICAgaXNvU3RyaW5nOiBwZXJpb2RlclswXS5mb20sXG4gICAgICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0Lk3DhU5FRF/DhVJfTkFWTixcbiAgICAgICAgICAgIH0pfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBUb3RhbHQgZm9yIHBlcmlvZGVuICR7aXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nKHtcbiAgICAgICAgICAgIGlzb1N0cmluZzogZm9tLFxuICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0LkRBVE8sXG4gICAgICAgIH0pfSAtICR7aXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nKHtcbiAgICAgICAgICAgIGlzb1N0cmluZzogdG9tU2lzdGVVdGJldGFsaW5nLFxuICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0LkRBVE8sXG4gICAgICAgIH0pfWA7XG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyh7XG4gICAgICAgIGNoZWNrOiBuZXN0ZVBlcmlvZGU/LnJlc3VsdGF0ICYmIG5lc3RlUGVyaW9kZS5yZXN1bHRhdCA+IDAsXG4gICAgICAgIGNhbGN1bGF0ZWQ6IG5lc3RlUGVyaW9kZT8ucmVzdWx0YXQgJiYgbmVzdGVQZXJpb2RlLnJlc3VsdGF0ID4gMCA/IFRleHRTdWNjZXNzIDogVGV4dE5ldXRyYWwsXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPEJveFxuICAgICAgICAgICAgbWF4V2lkdGg9eycyNnJlbSd9XG4gICAgICAgICAgICBtYXJnaW5CbG9jaz17J3NwYWNlLTAgc3BhY2UtNDAnfVxuICAgICAgICAgICAgYm9yZGVyQ29sb3I9XCJuZXV0cmFsLXN0cm9uZ1wiXG4gICAgICAgICAgICBib3JkZXJXaWR0aD1cIjFcIlxuICAgICAgICAgICAgcGFkZGluZz1cInNwYWNlLTQwXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPFZTdGFjayBhcmlhLWxhYmVsPXsnU2ltdWxlcmluZ3NvdmVyc2lrdCd9IGdhcD1cInNwYWNlLTEyXCI+XG4gICAgICAgICAgICAgICAgPEhTdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydCB3ZWlnaHQ9XCJzZW1pYm9sZFwiPntwYW5lbFRpdHRlbCgpfTwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgIDwvSFN0YWNrPlxuICAgICAgICAgICAgICAgIDxIU3RhY2s+XG4gICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQ+RmVpbHV0YmV0YWxpbmc8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgICAgICAgICAgICA8Qm9sZFRla3N0TWVkRmFyZ2UgJGZhcmdlPXtmZWlsdXRiZXRhbGluZyA+IDAgPyBUZXh0RGFuZ2VyIDogVGV4dE5ldXRyYWx9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2Zvcm1hdGVyQmVsw7hwRWxsZXJEYXNoT21VbmRlZmluZWQoZmVpbHV0YmV0YWxpbmcpfVxuICAgICAgICAgICAgICAgICAgICA8L0JvbGRUZWtzdE1lZEZhcmdlPlxuICAgICAgICAgICAgICAgIDwvSFN0YWNrPlxuXG4gICAgICAgICAgICAgICAgPEhTdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydD5FdHRlcmJldGFsaW5nPC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgICAgIDxTcGFjZXIgLz5cbiAgICAgICAgICAgICAgICAgICAgPEJvbGRUZWtzdE1lZEZhcmdlPntmb3JtYXRlckJlbMO4cEVsbGVyRGFzaE9tVW5kZWZpbmVkKGV0dGVyYmV0YWxpbmcpfTwvQm9sZFRla3N0TWVkRmFyZ2U+XG4gICAgICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICAgICAgPEhTdGFja01lZEJvcmRlclRvcD5cbiAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydCB3ZWlnaHQ9XCJzZW1pYm9sZFwiPk5lc3RlIHV0YmV0YWxpbmc8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgICAgICAgICAgICB7IW5lc3RlUGVyaW9kZSAmJiA8Qm9keVNob3J0IHdlaWdodD1cInNlbWlib2xkXCI+LTwvQm9keVNob3J0Pn1cbiAgICAgICAgICAgICAgICA8L0hTdGFja01lZEJvcmRlclRvcD5cbiAgICAgICAgICAgICAgICB7bmVzdGVQZXJpb2RlICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEhTdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2thcGl0YWxpc2VyVGVrc3QoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc29TdHJpbmc6IGZvbURhdG9OZXN0ZVBlcmlvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWxGb3JtYXQ6IERhdG9mb3JtYXQuTcOFTkVEX8OFUl9OQVZOLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTcGFjZXIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb2xkVGVrc3RNZWRGYXJnZSAkZmFyZ2U9e25lc3RlUGVyaW9kZT8ucmVzdWx0YXQgJiYgbmVzdGVQZXJpb2RlLnJlc3VsdGF0ID4gMH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2Zvcm1hdGVyQmVsw7hwRWxsZXJEYXNoT21VbmRlZmluZWQobmVzdGVQZXJpb2RlPy5yZXN1bHRhdCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0JvbGRUZWtzdE1lZEZhcmdlPlxuICAgICAgICAgICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9WU3RhY2s+XG4gICAgICAgIDwvQm94PlxuICAgICk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU2ltdWxlcmluZ1BhbmVsO1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMzUwNDNhOTY5OGI5ZWI1MDFiNWZcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJpc0JlZm9yZSIsInN0eWxlZCIsIkJvZHlTaG9ydCIsIkJveCIsIkhTdGFjayIsIlNwYWNlciIsIlZTdGFjayIsIkJvcmRlck5ldXRyYWwiLCJGb250V2VpZ2h0Qm9sZCIsIlNwYWNlMTYiLCJUZXh0RGFuZ2VyIiwiVGV4dE5ldXRyYWwiLCJUZXh0U3VjY2VzcyIsIkRhdG9mb3JtYXQiLCJpc29TdHJpbmdUaWxEYXRlIiwiaXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nIiwiZm9ybWF0ZXJCZWzDuHAiLCJCb2xkVGVrc3RNZWRGYXJnZSIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJwcm9wcyIsIiRmYXJnZSIsIlRleHRTdWNjZXNzU3VidGxlIiwiX2MiLCJIU3RhY2tNZWRCb3JkZXJUb3AiLCJfdGVtcGxhdGVPYmplY3QyIiwiX2MyIiwiU2ltdWxlcmluZ1BhbmVsIiwiX3JlZiIsIl9wZXJpb2RlciRmaW5kIiwiX3JlZiRzaW11bGVyaW5nIiwic2ltdWxlcmluZyIsImZlaWx1dGJldGFsaW5nIiwiZm9tIiwiZXR0ZXJiZXRhbGluZyIsImZvbURhdG9OZXN0ZVBlcmlvZGUiLCJwZXJpb2RlciIsInRvbVNpc3RlVXRiZXRhbGluZyIsImthcGl0YWxpc2VyVGVrc3QiLCJ0ZWtzdCIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0b0xvd2VyQ2FzZSIsImZvcm1hdGVyQmVsw7hwRWxsZXJEYXNoT21VbmRlZmluZWQiLCJiZWzDuHAiLCJuZXN0ZVBlcmlvZGUiLCJmaW5kIiwicGVyaW9kZSIsInVuZGVmaW5lZCIsImVyRsO4ck5lc3RlUGVyaW9kZSIsInBhbmVsVGl0dGVsIiwidXRiZXRhbHRlUGVyaW9kZXIiLCJmaWx0ZXIiLCJsZW5ndGgiLCJjb25jYXQiLCJpc29TdHJpbmciLCJ0aWxGb3JtYXQiLCJNw4VORURfw4VSX05BVk4iLCJEQVRPIiwiY29uc29sZSIsImxvZyIsImNoZWNrIiwicmVzdWx0YXQiLCJjYWxjdWxhdGVkIiwiY3JlYXRlRWxlbWVudCIsIm1heFdpZHRoIiwibWFyZ2luQmxvY2siLCJib3JkZXJDb2xvciIsImJvcmRlcldpZHRoIiwicGFkZGluZyIsImdhcCIsIndlaWdodCIsIl9jMyIsIiRSZWZyZXNoUmVnJCJdLCJzb3VyY2VSb290IjoiIn0=