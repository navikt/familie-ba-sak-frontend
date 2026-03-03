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
/******/ 	__webpack_require__.h = () => ("826cc50a2e359eb97a85")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4zNTA0M2E5Njk4YjllYjUwMWI1Zi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUErQjtBQUVLO0FBQ0c7QUFFbUM7QUFRbkM7QUFHK0Q7QUFDdkM7QUFFL0QsSUFBTW1CLGlCQUFpQixHQUFHakIsNkRBQU0sQ0FBQ0MsdURBQVMsQ0FBQyxDQUFBaUIsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLHNCQUFBLHFEQUM5QixVQUFBQyxLQUFLO0VBQUEsT0FBS0EsS0FBSyxDQUFDQyxNQUFNLEdBQUdULDRFQUFpQixHQUFHRixzRUFBVztBQUFBLENBQUMsRUFDbkRILHlFQUFjLENBQ2hDO0FBQUNlLEVBQUEsR0FISUwsaUJBQWlCO0FBS3ZCLElBQU1NLGtCQUFrQixHQUFHdkIsNkRBQU0sQ0FBQ0csb0RBQU0sQ0FBQyxDQUFBcUIsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQUwsc0JBQUEsb0VBQ2JiLHdFQUFhLEVBQ3RCRSxrRUFBTyxDQUN6QjtBQUFDaUIsR0FBQSxHQUhJRixrQkFBa0I7QUFTeEIsSUFBTUcsZUFBMEQsR0FBRyxTQUE3REEsZUFBMERBLENBQUFDLElBQUEsRUFFMUQ7RUFBQSxJQUFBQyxjQUFBO0VBQUEsSUFBQUMsZUFBQSxHQUFBRixJQUFBLENBREZHLFVBQVU7SUFBSUMsY0FBYyxHQUFBRixlQUFBLENBQWRFLGNBQWM7SUFBRUMsR0FBRyxHQUFBSCxlQUFBLENBQUhHLEdBQUc7SUFBRUMsYUFBYSxHQUFBSixlQUFBLENBQWJJLGFBQWE7SUFBRUMsbUJBQW1CLEdBQUFMLGVBQUEsQ0FBbkJLLG1CQUFtQjtJQUFFQyxRQUFRLEdBQUFOLGVBQUEsQ0FBUk0sUUFBUTtJQUFFQyxrQkFBa0IsR0FBQVAsZUFBQSxDQUFsQk8sa0JBQWtCO0VBRW5HLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBZ0JBLENBQUlDLEtBQWEsRUFBYTtJQUNoRCxPQUFPQSxLQUFLLENBQUNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsR0FBR0YsS0FBSyxDQUFDRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsQ0FBQyxDQUFDO0VBQ3ZFLENBQUM7RUFFRCxJQUFNQyxpQ0FBaUMsR0FBRyxTQUFwQ0EsaUNBQWlDQSxDQUFJQyxLQUFjLEVBQWE7SUFDbEUsT0FBTyxDQUFDQSxLQUFLLElBQUlBLEtBQUssS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHNUIsa0VBQWEsQ0FBQzRCLEtBQUssQ0FBQztFQUM3RCxDQUFDO0VBRUQsSUFBTUMsWUFBWSxHQUFHWCxtQkFBbUIsSUFBQU4sY0FBQSxHQUNqQ08sUUFBUSxDQUFDVyxJQUFJLENBQUMsVUFBQUMsT0FBTztJQUFBLE9BQUlBLE9BQU8sQ0FBQ2YsR0FBRyxLQUFLRSxtQkFBbUI7RUFBQSxFQUFDLGNBQUFOLGNBQUEsY0FBQUEsY0FBQSxHQUFJb0IsU0FBUyxHQUMzRUEsU0FBUztFQUVmLElBQU1DLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBaUJBLENBQUlGLE9BQTJCO0lBQUEsT0FDbEQsQ0FBQ2IsbUJBQW1CLElBQUluQyxrREFBUSxDQUFDZSw2REFBZ0IsQ0FBQ2lDLE9BQU8sQ0FBQ2YsR0FBRyxDQUFDLEVBQUVsQiw2REFBZ0IsQ0FBQ29CLG1CQUFtQixDQUFDLENBQUM7RUFBQTtFQUUxRyxJQUFNZ0IsV0FBVyxHQUFHLFNBQWRBLFdBQVdBLENBQUEsRUFBaUI7SUFDOUIsSUFBTUMsaUJBQWlCLEdBQUdoQixRQUFRLENBQUNpQixNQUFNLENBQUMsVUFBQUwsT0FBTztNQUFBLE9BQUlFLGlCQUFpQixDQUFDRixPQUFPLENBQUM7SUFBQSxFQUFDO0lBQ2hGLElBQUlJLGlCQUFpQixDQUFDRSxNQUFNLEtBQUssQ0FBQyxFQUFFO01BQ2hDLE9BQU8sUUFBUTtJQUNuQjtJQUNBLElBQUlGLGlCQUFpQixDQUFDRSxNQUFNLEtBQUssQ0FBQyxFQUFFO01BQ2hDLG9CQUFBQyxNQUFBLENBQW9CdkMsd0VBQTJCLENBQUM7UUFDNUN3QyxTQUFTLEVBQUVwQixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNILEdBQUc7UUFDMUJ3QixTQUFTLEVBQUUzQyxtREFBVSxDQUFDNEM7TUFDMUIsQ0FBQyxDQUFDO0lBQ047SUFDQSw4QkFBQUgsTUFBQSxDQUE4QnZDLHdFQUEyQixDQUFDO01BQ3REd0MsU0FBUyxFQUFFdkIsR0FBRztNQUNkd0IsU0FBUyxFQUFFM0MsbURBQVUsQ0FBQzZDO0lBQzFCLENBQUMsQ0FBQyxTQUFBSixNQUFBLENBQU12Qyx3RUFBMkIsQ0FBQztNQUNoQ3dDLFNBQVMsRUFBRW5CLGtCQUFrQjtNQUM3Qm9CLFNBQVMsRUFBRTNDLG1EQUFVLENBQUM2QztJQUMxQixDQUFDLENBQUM7RUFDTixDQUFDO0VBQ0RDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDO0lBQ1JDLEtBQUssRUFBRSxDQUFBaEIsWUFBWSxhQUFaQSxZQUFZLHVCQUFaQSxZQUFZLENBQUVpQixRQUFRLEtBQUlqQixZQUFZLENBQUNpQixRQUFRLEdBQUcsQ0FBQztJQUMxREMsVUFBVSxFQUFFbEIsWUFBWSxhQUFaQSxZQUFZLGVBQVpBLFlBQVksQ0FBRWlCLFFBQVEsSUFBSWpCLFlBQVksQ0FBQ2lCLFFBQVEsR0FBRyxDQUFDLEdBQUduRCxzRUFBVyxHQUFHRCxzRUFBV0E7RUFDL0YsQ0FBQyxDQUFDO0VBQ0Ysb0JBQ0laLGdEQUFBLENBQUNJLGlEQUFHO0lBQ0ErRCxRQUFRLEVBQUUsT0FBUTtJQUNsQkMsV0FBVyxFQUFFLGtCQUFtQjtJQUNoQ0MsV0FBVyxFQUFDLGdCQUFnQjtJQUM1QkMsV0FBVyxFQUFDLEdBQUc7SUFDZkMsT0FBTyxFQUFDO0VBQVUsZ0JBRWxCdkUsZ0RBQUEsQ0FBQ08sb0RBQU07SUFBQyxjQUFZLHFCQUFzQjtJQUFDaUUsR0FBRyxFQUFDO0VBQVUsZ0JBQ3JEeEUsZ0RBQUEsQ0FBQ0ssb0RBQU0scUJBQ0hMLGdEQUFBLENBQUNHLHVEQUFTO0lBQUNzRSxNQUFNLEVBQUM7RUFBVSxHQUFFckIsV0FBVyxDQUFDLENBQWEsQ0FDbkQsQ0FBQyxlQUNUcEQsZ0RBQUEsQ0FBQ0ssb0RBQU0scUJBQ0hMLGdEQUFBLENBQUNHLHVEQUFTLFFBQUMsZ0JBQXlCLENBQUMsZUFDckNILGdEQUFBLENBQUNNLG9EQUFNLE1BQUUsQ0FBQyxlQUNWTixnREFBQSxDQUFDbUIsaUJBQWlCO0lBQUNJLE1BQU0sRUFBRVUsY0FBYyxHQUFHLENBQUMsR0FBR3RCLHFFQUFVLEdBQUdDLHNFQUFXQTtFQUFDLEdBQ3BFaUMsaUNBQWlDLENBQUNaLGNBQWMsQ0FDbEMsQ0FDZixDQUFDLGVBRVRqQyxnREFBQSxDQUFDSyxvREFBTSxxQkFDSEwsZ0RBQUEsQ0FBQ0csdURBQVMsUUFBQyxlQUF3QixDQUFDLGVBQ3BDSCxnREFBQSxDQUFDTSxvREFBTSxNQUFFLENBQUMsZUFDVk4sZ0RBQUEsQ0FBQ21CLGlCQUFpQixRQUFFMEIsaUNBQWlDLENBQUNWLGFBQWEsQ0FBcUIsQ0FDcEYsQ0FBQyxlQUNUbkMsZ0RBQUEsQ0FBQ3lCLGtCQUFrQixxQkFDZnpCLGdEQUFBLENBQUNHLHVEQUFTO0lBQUNzRSxNQUFNLEVBQUM7RUFBVSxHQUFDLGtCQUEyQixDQUFDLGVBQ3pEekUsZ0RBQUEsQ0FBQ00sb0RBQU0sTUFBRSxDQUFDLEVBQ1QsQ0FBQ3lDLFlBQVksaUJBQUkvQyxnREFBQSxDQUFDRyx1REFBUztJQUFDc0UsTUFBTSxFQUFDO0VBQVUsR0FBQyxHQUFZLENBQzNDLENBQUMsRUFDcEIxQixZQUFZLGlCQUNUL0MsZ0RBQUEsQ0FBQ0ssb0RBQU0scUJBQ0hMLGdEQUFBLENBQUNHLHVEQUFTLFFBQ0xvQyxnQkFBZ0IsQ0FDYnRCLHdFQUEyQixDQUFDO0lBQ3hCd0MsU0FBUyxFQUFFckIsbUJBQW1CO0lBQzlCc0IsU0FBUyxFQUFFM0MsbURBQVUsQ0FBQzRDO0VBQzFCLENBQUMsQ0FDTCxDQUNPLENBQUMsZUFDWjNELGdEQUFBLENBQUNNLG9EQUFNLE1BQUUsQ0FBQyxlQUNWTixnREFBQSxDQUFDbUIsaUJBQWlCO0lBQUNJLE1BQU0sRUFBRSxDQUFBd0IsWUFBWSxhQUFaQSxZQUFZLHVCQUFaQSxZQUFZLENBQUVpQixRQUFRLEtBQUlqQixZQUFZLENBQUNpQixRQUFRLEdBQUc7RUFBRSxHQUMxRW5CLGlDQUFpQyxDQUFDRSxZQUFZLGFBQVpBLFlBQVksdUJBQVpBLFlBQVksQ0FBRWlCLFFBQVEsQ0FDMUMsQ0FDZixDQUVSLENBQ1AsQ0FBQztBQUVkLENBQUM7QUFBQ1UsR0FBQSxHQTFGSTlDLGVBQTBEO0FBMkZoRSxpRUFBZUEsZUFBZSxFQUFDO0FBQUEsSUFBQUosRUFBQSxFQUFBRyxHQUFBLEVBQUErQyxHQUFBO0FBQUFDLHNDQUFBLENBQUFuRCxFQUFBO0FBQUFtRCxzQ0FBQSxDQUFBaEQsR0FBQTtBQUFBZ0Qsc0NBQUEsQ0FBQUQsR0FBQSxxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDNUgvQixzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL0ZhZ3Nhay9CZWhhbmRsaW5nL1NpZGVyL1NpbXVsZXJpbmcvU2ltdWxlcmluZ1BhbmVsLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBpc0JlZm9yZSB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBCb2R5U2hvcnQsIEJveCwgSFN0YWNrLCBTcGFjZXIsIFZTdGFjayB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHtcbiAgICBCb3JkZXJOZXV0cmFsLFxuICAgIEZvbnRXZWlnaHRCb2xkLFxuICAgIFNwYWNlMTYsXG4gICAgVGV4dERhbmdlcixcbiAgICBUZXh0TmV1dHJhbCxcbiAgICBUZXh0U3VjY2VzcywgVGV4dFN1Y2Nlc3NTdWJ0bGUsXG59IGZyb20gJ0BuYXZpa3QvZHMtdG9rZW5zL2Rpc3QvdG9rZW5zJztcblxuaW1wb3J0IHR5cGUgeyBJU2ltdWxlcmluZ0RUTywgSVNpbXVsZXJpbmdQZXJpb2RlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvc2ltdWxlcmluZyc7XG5pbXBvcnQgeyBEYXRvZm9ybWF0LCBpc29TdHJpbmdUaWxEYXRlLCBpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9kYXRvJztcbmltcG9ydCB7IGZvcm1hdGVyQmVsw7hwIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvZm9ybWF0dGVyJztcblxuY29uc3QgQm9sZFRla3N0TWVkRmFyZ2UgPSBzdHlsZWQoQm9keVNob3J0KTx7ICRmYXJnZT86IHN0cmluZyB9PmBcbiAgICBjb2xvcjogJHtwcm9wcyA9PiAocHJvcHMuJGZhcmdlID8gVGV4dFN1Y2Nlc3NTdWJ0bGUgOiBUZXh0TmV1dHJhbCl9O1xuICAgIGZvbnQtd2VpZ2h0OiAke0ZvbnRXZWlnaHRCb2xkfTtcbmA7XG5cbmNvbnN0IEhTdGFja01lZEJvcmRlclRvcCA9IHN0eWxlZChIU3RhY2spYFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAke0JvcmRlck5ldXRyYWx9O1xuICAgIHBhZGRpbmctdG9wOiAke1NwYWNlMTZ9O1xuYDtcblxuaW50ZXJmYWNlIElTaW11bGVyaW5nUHJvcHMge1xuICAgIHNpbXVsZXJpbmc6IElTaW11bGVyaW5nRFRPO1xufVxuXG5jb25zdCBTaW11bGVyaW5nUGFuZWw6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PElTaW11bGVyaW5nUHJvcHM+ID0gKHtcbiAgICBzaW11bGVyaW5nOiB7IGZlaWx1dGJldGFsaW5nLCBmb20sIGV0dGVyYmV0YWxpbmcsIGZvbURhdG9OZXN0ZVBlcmlvZGUsIHBlcmlvZGVyLCB0b21TaXN0ZVV0YmV0YWxpbmcgfSxcbn0pID0+IHtcbiAgICBjb25zdCBrYXBpdGFsaXNlclRla3N0ID0gKHRla3N0OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgICAgICByZXR1cm4gdGVrc3QuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0ZWtzdC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBmb3JtYXRlckJlbMO4cEVsbGVyRGFzaE9tVW5kZWZpbmVkID0gKGJlbMO4cD86IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgICAgIHJldHVybiAhYmVsw7hwIHx8IGJlbMO4cCA9PT0gMCA/ICctJyA6IGZvcm1hdGVyQmVsw7hwKGJlbMO4cCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG5lc3RlUGVyaW9kZSA9IGZvbURhdG9OZXN0ZVBlcmlvZGVcbiAgICAgICAgPyAocGVyaW9kZXIuZmluZChwZXJpb2RlID0+IHBlcmlvZGUuZm9tID09PSBmb21EYXRvTmVzdGVQZXJpb2RlKSA/PyB1bmRlZmluZWQpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgZXJGw7hyTmVzdGVQZXJpb2RlID0gKHBlcmlvZGU6IElTaW11bGVyaW5nUGVyaW9kZSkgPT5cbiAgICAgICAgIWZvbURhdG9OZXN0ZVBlcmlvZGUgfHwgaXNCZWZvcmUoaXNvU3RyaW5nVGlsRGF0ZShwZXJpb2RlLmZvbSksIGlzb1N0cmluZ1RpbERhdGUoZm9tRGF0b05lc3RlUGVyaW9kZSkpO1xuXG4gICAgY29uc3QgcGFuZWxUaXR0ZWwgPSAoKTogc3RyaW5nID0+IHtcbiAgICAgICAgY29uc3QgdXRiZXRhbHRlUGVyaW9kZXIgPSBwZXJpb2Rlci5maWx0ZXIocGVyaW9kZSA9PiBlckbDuHJOZXN0ZVBlcmlvZGUocGVyaW9kZSkpO1xuICAgICAgICBpZiAodXRiZXRhbHRlUGVyaW9kZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1RvdGFsdCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0YmV0YWx0ZVBlcmlvZGVyLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGBUb3RhbCBmb3IgJHtpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcoe1xuICAgICAgICAgICAgICAgIGlzb1N0cmluZzogcGVyaW9kZXJbMF0uZm9tLFxuICAgICAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5Nw4VORURfw4VSX05BVk4sXG4gICAgICAgICAgICB9KX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgVG90YWx0IGZvciBwZXJpb2RlbiAke2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICBpc29TdHJpbmc6IGZvbSxcbiAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5EQVRPLFxuICAgICAgICB9KX0gLSAke2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICBpc29TdHJpbmc6IHRvbVNpc3RlVXRiZXRhbGluZyxcbiAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5EQVRPLFxuICAgICAgICB9KX1gO1xuICAgIH07XG4gICAgY29uc29sZS5sb2coe1xuICAgICAgICBjaGVjazogbmVzdGVQZXJpb2RlPy5yZXN1bHRhdCAmJiBuZXN0ZVBlcmlvZGUucmVzdWx0YXQgPiAwLFxuICAgICAgICBjYWxjdWxhdGVkOiBuZXN0ZVBlcmlvZGU/LnJlc3VsdGF0ICYmIG5lc3RlUGVyaW9kZS5yZXN1bHRhdCA+IDAgPyBUZXh0U3VjY2VzcyA6IFRleHROZXV0cmFsLFxuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxCb3hcbiAgICAgICAgICAgIG1heFdpZHRoPXsnMjZyZW0nfVxuICAgICAgICAgICAgbWFyZ2luQmxvY2s9eydzcGFjZS0wIHNwYWNlLTQwJ31cbiAgICAgICAgICAgIGJvcmRlckNvbG9yPVwibmV1dHJhbC1zdHJvbmdcIlxuICAgICAgICAgICAgYm9yZGVyV2lkdGg9XCIxXCJcbiAgICAgICAgICAgIHBhZGRpbmc9XCJzcGFjZS00MFwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxWU3RhY2sgYXJpYS1sYWJlbD17J1NpbXVsZXJpbmdzb3ZlcnNpa3QnfSBnYXA9XCJzcGFjZS0xMlwiPlxuICAgICAgICAgICAgICAgIDxIU3RhY2s+XG4gICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQgd2VpZ2h0PVwic2VtaWJvbGRcIj57cGFuZWxUaXR0ZWwoKX08L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0PkZlaWx1dGJldGFsaW5nPC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgICAgIDxTcGFjZXIgLz5cbiAgICAgICAgICAgICAgICAgICAgPEJvbGRUZWtzdE1lZEZhcmdlICRmYXJnZT17ZmVpbHV0YmV0YWxpbmcgPiAwID8gVGV4dERhbmdlciA6IFRleHROZXV0cmFsfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtmb3JtYXRlckJlbMO4cEVsbGVyRGFzaE9tVW5kZWZpbmVkKGZlaWx1dGJldGFsaW5nKX1cbiAgICAgICAgICAgICAgICAgICAgPC9Cb2xkVGVrc3RNZWRGYXJnZT5cbiAgICAgICAgICAgICAgICA8L0hTdGFjaz5cblxuICAgICAgICAgICAgICAgIDxIU3RhY2s+XG4gICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQ+RXR0ZXJiZXRhbGluZzwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICA8U3BhY2VyIC8+XG4gICAgICAgICAgICAgICAgICAgIDxCb2xkVGVrc3RNZWRGYXJnZT57Zm9ybWF0ZXJCZWzDuHBFbGxlckRhc2hPbVVuZGVmaW5lZChldHRlcmJldGFsaW5nKX08L0JvbGRUZWtzdE1lZEZhcmdlPlxuICAgICAgICAgICAgICAgIDwvSFN0YWNrPlxuICAgICAgICAgICAgICAgIDxIU3RhY2tNZWRCb3JkZXJUb3A+XG4gICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQgd2VpZ2h0PVwic2VtaWJvbGRcIj5OZXN0ZSB1dGJldGFsaW5nPC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgICAgIDxTcGFjZXIgLz5cbiAgICAgICAgICAgICAgICAgICAgeyFuZXN0ZVBlcmlvZGUgJiYgPEJvZHlTaG9ydCB3ZWlnaHQ9XCJzZW1pYm9sZFwiPi08L0JvZHlTaG9ydD59XG4gICAgICAgICAgICAgICAgPC9IU3RhY2tNZWRCb3JkZXJUb3A+XG4gICAgICAgICAgICAgICAge25lc3RlUGVyaW9kZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxIU3RhY2s+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtrYXBpdGFsaXNlclRla3N0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNvU3RyaW5nOiBmb21EYXRvTmVzdGVQZXJpb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0Lk3DhU5FRF/DhVJfTkFWTixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3BhY2VyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Qm9sZFRla3N0TWVkRmFyZ2UgJGZhcmdlPXtuZXN0ZVBlcmlvZGU/LnJlc3VsdGF0ICYmIG5lc3RlUGVyaW9kZS5yZXN1bHRhdCA+IDB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmb3JtYXRlckJlbMO4cEVsbGVyRGFzaE9tVW5kZWZpbmVkKG5lc3RlUGVyaW9kZT8ucmVzdWx0YXQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb2xkVGVrc3RNZWRGYXJnZT5cbiAgICAgICAgICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvVlN0YWNrPlxuICAgICAgICA8L0JveD5cbiAgICApO1xufTtcbmV4cG9ydCBkZWZhdWx0IFNpbXVsZXJpbmdQYW5lbDtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjgyNmNjNTBhMmUzNTllYjk3YTg1XCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwiaXNCZWZvcmUiLCJzdHlsZWQiLCJCb2R5U2hvcnQiLCJCb3giLCJIU3RhY2siLCJTcGFjZXIiLCJWU3RhY2siLCJCb3JkZXJOZXV0cmFsIiwiRm9udFdlaWdodEJvbGQiLCJTcGFjZTE2IiwiVGV4dERhbmdlciIsIlRleHROZXV0cmFsIiwiVGV4dFN1Y2Nlc3MiLCJUZXh0U3VjY2Vzc1N1YnRsZSIsIkRhdG9mb3JtYXQiLCJpc29TdHJpbmdUaWxEYXRlIiwiaXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nIiwiZm9ybWF0ZXJCZWzDuHAiLCJCb2xkVGVrc3RNZWRGYXJnZSIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJwcm9wcyIsIiRmYXJnZSIsIl9jIiwiSFN0YWNrTWVkQm9yZGVyVG9wIiwiX3RlbXBsYXRlT2JqZWN0MiIsIl9jMiIsIlNpbXVsZXJpbmdQYW5lbCIsIl9yZWYiLCJfcGVyaW9kZXIkZmluZCIsIl9yZWYkc2ltdWxlcmluZyIsInNpbXVsZXJpbmciLCJmZWlsdXRiZXRhbGluZyIsImZvbSIsImV0dGVyYmV0YWxpbmciLCJmb21EYXRvTmVzdGVQZXJpb2RlIiwicGVyaW9kZXIiLCJ0b21TaXN0ZVV0YmV0YWxpbmciLCJrYXBpdGFsaXNlclRla3N0IiwidGVrc3QiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwidG9Mb3dlckNhc2UiLCJmb3JtYXRlckJlbMO4cEVsbGVyRGFzaE9tVW5kZWZpbmVkIiwiYmVsw7hwIiwibmVzdGVQZXJpb2RlIiwiZmluZCIsInBlcmlvZGUiLCJ1bmRlZmluZWQiLCJlckbDuHJOZXN0ZVBlcmlvZGUiLCJwYW5lbFRpdHRlbCIsInV0YmV0YWx0ZVBlcmlvZGVyIiwiZmlsdGVyIiwibGVuZ3RoIiwiY29uY2F0IiwiaXNvU3RyaW5nIiwidGlsRm9ybWF0IiwiTcOFTkVEX8OFUl9OQVZOIiwiREFUTyIsImNvbnNvbGUiLCJsb2ciLCJjaGVjayIsInJlc3VsdGF0IiwiY2FsY3VsYXRlZCIsImNyZWF0ZUVsZW1lbnQiLCJtYXhXaWR0aCIsIm1hcmdpbkJsb2NrIiwiYm9yZGVyQ29sb3IiLCJib3JkZXJXaWR0aCIsInBhZGRpbmciLCJnYXAiLCJ3ZWlnaHQiLCJfYzMiLCIkUmVmcmVzaFJlZyQiXSwic291cmNlUm9vdCI6IiJ9