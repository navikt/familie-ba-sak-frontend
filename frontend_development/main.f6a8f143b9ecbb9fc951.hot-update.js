"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/sider/Fagsak/Behandling/Høyremeny/Behandlingskort/Behandlingskort.tsx"
/*!********************************************************************************************!*\
  !*** ./src/frontend/sider/Fagsak/Behandling/Høyremeny/Behandlingskort/Behandlingskort.tsx ***!
  \********************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Behandlingskort: () => (/* binding */ Behandlingskort)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/ds-tokens/dist/tokens */ "./node_modules/@navikt/ds-tokens/dist/tokens.js");
/* harmony import */ var _Informasjonsbolk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Informasjonsbolk */ "./src/frontend/sider/Fagsak/Behandling/Høyremeny/Behandlingskort/Informasjonsbolk.tsx");
/* harmony import */ var _typer_behandling__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../typer/behandling */ "./src/frontend/typer/behandling.ts");
/* harmony import */ var _utils_dato__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../utils/dato */ "./src/frontend/utils/dato/index.ts");
/* harmony import */ var _FagsakContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../FagsakContext */ "./src/frontend/sider/Fagsak/FagsakContext.tsx");
/* harmony import */ var _Saksoversikt_Saksoversikt__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../Saksoversikt/Saksoversikt */ "./src/frontend/sider/Fagsak/Saksoversikt/Saksoversikt.tsx");
/* harmony import */ var _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../context/BehandlingContext */ "./src/frontend/sider/Fagsak/Behandling/context/BehandlingContext.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject,
  _s = __webpack_require__.$Refresh$.signature();
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }










var hentResultatfarge = function hentResultatfarge(behandlingResultat) {
  if ((0,_typer_behandling__WEBPACK_IMPORTED_MODULE_6__.erBehandlingHenlagt)(behandlingResultat)) {
    return 'neutral-subtle';
  }
  switch (behandlingResultat) {
    case _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.INNVILGET:
    case _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.DELVIS_INNVILGET:
    case _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.FORTSATT_INNVILGET:
      return 'success';
    case (_typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.ENDRET_UTBETALING, _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.ENDRET_UTEN_UTBETALING):
      return 'accent';
    case _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.AVSLÅTT:
    case (_typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.OPPHØRT, _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.FORTSATT_OPPHØRT):
      return 'danger';
    case _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.IKKE_VURDERT:
      return 'neutral-subtle';
    default:
      return 'neutral';
  }
};
var hentResultatfargeTekst = function hentResultatfargeTekst(behandlingResultat) {
  if ((0,_typer_behandling__WEBPACK_IMPORTED_MODULE_6__.erBehandlingHenlagt)(behandlingResultat)) {
    return _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.TextNeutral;
  }
  switch (behandlingResultat) {
    case _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.INNVILGET:
    case _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.DELVIS_INNVILGET:
    case _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.FORTSATT_INNVILGET:
      return _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.TextSuccess;
    case (_typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.ENDRET_UTBETALING, _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.ENDRET_UTEN_UTBETALING):
      return _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.TextInfo;
    case _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.AVSLÅTT:
    case (_typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.OPPHØRT, _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.FORTSATT_OPPHØRT):
      return _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.TextDanger;
    default:
      return _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.TextNeutral;
  }
};
var StyledHeading = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.Heading)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    font-size: var(--ax-space-16);\n"])));
_c = StyledHeading;
function Behandlingskort() {
  _s();
  var _behandling$vedtak;
  var _useFagsakContext = (0,_FagsakContext__WEBPACK_IMPORTED_MODULE_8__.useFagsakContext)(),
    fagsak = _useFagsakContext.fagsak;
  var _useBehandlingContext = (0,_context_BehandlingContext__WEBPACK_IMPORTED_MODULE_10__.useBehandlingContext)(),
    behandling = _useBehandlingContext.behandling;
  var behandlinger = fagsak.behandlinger;
  var antallBehandlinger = behandlinger.length;
  var behandlingIndex = behandlinger.findIndex(function (b) {
    return b.behandlingId === behandling.behandlingId;
  }) + 1;
  var tittel = "".concat(_typer_behandling__WEBPACK_IMPORTED_MODULE_6__.behandlingstyper[behandling.type].navn, " (").concat(behandlingIndex, "/").concat(antallBehandlinger, ") - ").concat((0,_Saksoversikt_Saksoversikt__WEBPACK_IMPORTED_MODULE_9__.sakstype)(behandling).toLowerCase());
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.Box, {
    padding: "space-8",
    borderColor: hentResultatfarge(behandling.resultat),
    borderWidth: "1 1 1 5",
    borderRadius: "4",
    margin: "space-8"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.Box, {
    borderWidth: "0 0 1 0",
    borderColor: "neutral-subtle"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.VStack, {
    gap: "space-4",
    marginBlock: "space-0 space-8"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(StyledHeading, {
    size: 'xsmall',
    level: '2'
  }, tittel), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.BodyShort, null, _typer_behandling__WEBPACK_IMPORTED_MODULE_6__["behandlingÅrsak"][behandling.årsak]))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.VStack, {
    gap: "space-16",
    marginBlock: "space-16"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Informasjonsbolk__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: "Behandlingsstatus",
    tekst: _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.behandlingsstatuser[behandling.status]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Informasjonsbolk__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: "Resultat",
    tekst: _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.behandlingsresultater[behandling.resultat],
    tekstFarge: hentResultatfargeTekst(behandling.resultat)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, behandling.søknadMottattDato && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Informasjonsbolk__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: "S\xF8knad mottatt",
    tekst: (0,_utils_dato__WEBPACK_IMPORTED_MODULE_7__.isoStringTilFormatertString)({
      isoString: behandling.søknadMottattDato,
      tilFormat: _utils_dato__WEBPACK_IMPORTED_MODULE_7__.Datoformat.DATO
    })
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Informasjonsbolk__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: "Opprettet",
    tekst: (0,_utils_dato__WEBPACK_IMPORTED_MODULE_7__.isoStringTilFormatertString)({
      isoString: behandling.opprettetTidspunkt,
      tilFormat: _utils_dato__WEBPACK_IMPORTED_MODULE_7__.Datoformat.DATO
    })
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Informasjonsbolk__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: "Vedtaksdato",
    tekst: (0,_utils_dato__WEBPACK_IMPORTED_MODULE_7__.isoStringTilFormatertString)({
      isoString: (_behandling$vedtak = behandling.vedtak) === null || _behandling$vedtak === void 0 ? void 0 : _behandling$vedtak.vedtaksdato,
      tilFormat: _utils_dato__WEBPACK_IMPORTED_MODULE_7__.Datoformat.DATO,
      defaultString: 'Ikke satt'
    })
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Informasjonsbolk__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: "Enhet",
    tekst: behandling.arbeidsfordelingPåBehandling.behandlendeEnhetId,
    tekstHover: behandling.arbeidsfordelingPåBehandling.behandlendeEnhetNavn
  })));
}
_s(Behandlingskort, "VOIRXmnV8qkZzx9KVE7GkVNjKUI=", false, function () {
  return [_FagsakContext__WEBPACK_IMPORTED_MODULE_8__.useFagsakContext, _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_10__.useBehandlingContext];
});
_c2 = Behandlingskort;
var _c, _c2;
__webpack_require__.$Refresh$.register(_c, "StyledHeading");
__webpack_require__.$Refresh$.register(_c2, "Behandlingskort");

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

/***/ },

/***/ "./src/frontend/sider/Fagsak/Behandling/Høyremeny/Behandlingskort/Informasjonsbolk.tsx"
/*!*********************************************************************************************!*\
  !*** ./src/frontend/sider/Fagsak/Behandling/Høyremeny/Behandlingskort/Informasjonsbolk.tsx ***!
  \*********************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @navikt/ds-tokens/dist/tokens */ "./node_modules/@navikt/ds-tokens/dist/tokens.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));




var Informasjonsbolk = function Informasjonsbolk(_ref) {
  var label = _ref.label,
    tekst = _ref.tekst,
    tekstHover = _ref.tekstHover,
    tekstFarge = _ref.tekstFarge;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.HGrid, {
    columns: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.BodyShort, null, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.BodyShort, {
    weight: "semibold",
    style: {
      color: tekstFarge !== null && tekstFarge !== void 0 ? tekstFarge : _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__.TextNeutral
    },
    title: tekstHover
  }, tekst));
};
_c = Informasjonsbolk;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Informasjonsbolk);
var _c;
__webpack_require__.$Refresh$.register(_c, "Informasjonsbolk");

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
/******/ 	__webpack_require__.h = () => ("ee84965ad41f5352fb76")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5mNmE4ZjE0M2I5ZWNiYjlmYzk1MS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBK0I7QUFFUTtBQUU0QjtBQUM0QjtBQUc3QztBQVFUO0FBQzJDO0FBQzFCO0FBQ0k7QUFDUztBQUV2RSxJQUFNc0IsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFpQkEsQ0FBSUMsa0JBQXNDLEVBQThCO0VBQzNGLElBQUlQLHNFQUFtQixDQUFDTyxrQkFBa0IsQ0FBQyxFQUFFO0lBQ3pDLE9BQU8sZ0JBQWdCO0VBQzNCO0VBRUEsUUFBUUEsa0JBQWtCO0lBQ3RCLEtBQUtaLGlFQUFrQixDQUFDYSxTQUFTO0lBQ2pDLEtBQUtiLGlFQUFrQixDQUFDYyxnQkFBZ0I7SUFDeEMsS0FBS2QsaUVBQWtCLENBQUNlLGtCQUFrQjtNQUN0QyxPQUFPLFNBQVM7SUFDcEIsTUFBTWYsaUVBQWtCLENBQUNnQixpQkFBaUIsRUFBRWhCLGlFQUFrQixDQUFDaUIsc0JBQXNCO01BQ2pGLE9BQU8sUUFBUTtJQUNuQixLQUFLakIsaUVBQWtCLENBQUNrQixPQUFPO0lBQy9CLE1BQU1sQixpRUFBa0IsQ0FBQ21CLE9BQU8sRUFBRW5CLGlFQUFrQixDQUFDb0IsZ0JBQWdCO01BQ2pFLE9BQU8sUUFBUTtJQUNuQixLQUFLcEIsaUVBQWtCLENBQUNxQixZQUFZO01BQ2hDLE9BQU8sZ0JBQWdCO0lBQzNCO01BQ0ksT0FBTyxTQUFTO0VBQ3hCO0FBQ0osQ0FBQztBQUVELElBQU1DLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBc0JBLENBQUlWLGtCQUFzQyxFQUFLO0VBQ3ZFLElBQUlQLHNFQUFtQixDQUFDTyxrQkFBa0IsQ0FBQyxFQUFFO0lBQ3pDLE9BQU9mLHNFQUFXO0VBQ3RCO0VBRUEsUUFBUWUsa0JBQWtCO0lBQ3RCLEtBQUtaLGlFQUFrQixDQUFDYSxTQUFTO0lBQ2pDLEtBQUtiLGlFQUFrQixDQUFDYyxnQkFBZ0I7SUFDeEMsS0FB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WkUsNkVBQW9CO0FBQUE7QUFBQWdFLEdBQUEsR0FGL0IvQyxlQUFlO0FBQUEsSUFBQUQsRUFBQSxFQUFBZ0QsR0FBQTtBQUFBQyxzQ0FBQSxDQUFBakQsRUFBQTtBQUFBaUQsc0NBQUEsQ0FBQUQsR0FBQSxxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRUE7QUFFcUI7QUFDUTtBQVM1RCxJQUFNM0UsZ0JBQWtDLEdBQUcsU0FBckNBLGdCQUFrQ0EsQ0FBQThFLElBQUEsRUFBaUQ7RUFBQSxJQUEzQ25CLEtBQUssR0FBQW1CLElBQUEsQ0FBTG5CLEtBQUs7SUFBRUMsS0FBSyxHQUFBa0IsSUFBQSxDQUFMbEIsS0FBSztJQUFFYSxVQUFVLEdBQUFLLElBQUEsQ0FBVkwsVUFBVTtJQUFFWCxVQUFVLEdBQUFnQixJQUFBLENBQVZoQixVQUFVO0VBQzlFLG9CQUNJeEUsZ0RBQUEsQ0FBQ3VGLG1EQUFLO0lBQUNFLE9BQU8sRUFBRTtFQUFFLGdCQUNkekYsZ0RBQUEsQ0FBQ0UsdURBQVMsUUFBRW1FLEtBQWlCLENBQUMsZUFDOUJyRSxnREFBQSxDQUFDRSx1REFBUztJQUFDd0YsTUFBTSxFQUFDLFVBQVU7SUFBQ0MsS0FBSyxFQUFFO01BQUVDLEtBQUssRUFBRXBCLFVBQVUsYUFBVkEsVUFBVSxjQUFWQSxVQUFVLEdBQUloRSxzRUFBV0E7SUFBQyxDQUFFO0lBQUNxRixLQUFLLEVBQUVWO0VBQVcsR0FDdkZiLEtBQ00sQ0FDUixDQUFDO0FBRWhCLENBQUM7QUFBQ2pDLEVBQUEsR0FUSTNCLGdCQUFrQztBQVd4QyxpRUFBZUEsZ0JBQWdCLEVBQUM7QUFBQSxJQUFBMkIsRUFBQTtBQUFBaUQsc0NBQUEsQ0FBQWpELEVBQUEsc0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ3ZCaEMsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9GYWdzYWsvQmVoYW5kbGluZy9Iw7h5cmVtZW55L0JlaGFuZGxpbmdza29ydC9CZWhhbmRsaW5nc2tvcnQudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL0ZhZ3Nhay9CZWhhbmRsaW5nL0jDuHlyZW1lbnkvQmVoYW5kbGluZ3Nrb3J0L0luZm9ybWFzam9uc2JvbGsudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBCb2R5U2hvcnQsIEJveCwgSGVhZGluZywgVlN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgeyBUZXh0RGFuZ2VyLCBUZXh0SW5mbywgVGV4dE5ldXRyYWwsIFRleHRTdWNjZXNzIH0gZnJvbSAnQG5hdmlrdC9kcy10b2tlbnMvZGlzdC90b2tlbnMnO1xuaW1wb3J0IHR5cGUgeyBBa3NlbENvbG9yZWRCb3JkZXJUb2tlbiB9IGZyb20gJ0BuYXZpa3QvZHMtdG9rZW5zL3R5cGVzJztcblxuaW1wb3J0IEluZm9ybWFzam9uc2JvbGsgZnJvbSAnLi9JbmZvcm1hc2pvbnNib2xrJztcbmltcG9ydCB7XG4gICAgQmVoYW5kbGluZ1Jlc3VsdGF0LFxuICAgIGJlaGFuZGxpbmdzcmVzdWx0YXRlcixcbiAgICBiZWhhbmRsaW5nc3N0YXR1c2VyLFxuICAgIGJlaGFuZGxpbmdzdHlwZXIsXG4gICAgYmVoYW5kbGluZ8OFcnNhayxcbiAgICBlckJlaGFuZGxpbmdIZW5sYWd0LFxufSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlci9iZWhhbmRsaW5nJztcbmltcG9ydCB7IERhdG9mb3JtYXQsIGlzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL2RhdG8nO1xuaW1wb3J0IHsgdXNlRmFnc2FrQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uL0ZhZ3Nha0NvbnRleHQnO1xuaW1wb3J0IHsgc2Frc3R5cGUgfSBmcm9tICcuLi8uLi8uLi9TYWtzb3ZlcnNpa3QvU2Frc292ZXJzaWt0JztcbmltcG9ydCB7IHVzZUJlaGFuZGxpbmdDb250ZXh0IH0gZnJvbSAnLi4vLi4vY29udGV4dC9CZWhhbmRsaW5nQ29udGV4dCc7XG5cbmNvbnN0IGhlbnRSZXN1bHRhdGZhcmdlID0gKGJlaGFuZGxpbmdSZXN1bHRhdDogQmVoYW5kbGluZ1Jlc3VsdGF0KTogQWtzZWxDb2xvcmVkQm9yZGVyVG9rZW4gPT4ge1xuICAgIGlmIChlckJlaGFuZGxpbmdIZW5sYWd0KGJlaGFuZGxpbmdSZXN1bHRhdCkpIHtcbiAgICAgICAgcmV0dXJuICduZXV0cmFsLXN1YnRsZSc7XG4gICAgfVxuXG4gICAgc3dpdGNoIChiZWhhbmRsaW5nUmVzdWx0YXQpIHtcbiAgICAgICAgY2FzZSBCZWhhbmRsaW5nUmVzdWx0YXQuSU5OVklMR0VUOlxuICAgICAgICBjYXNlIEJlaGFuZGxpbmdSZXN1bHRhdC5ERUxWSVNfSU5OVklMR0VUOlxuICAgICAgICBjYXNlIEJlaGFuZGxpbmdSZXN1bHRhdC5GT1JUU0FUVF9JTk5WSUxHRVQ6XG4gICAgICAgICAgICByZXR1cm4gJ3N1Y2Nlc3MnO1xuICAgICAgICBjYXNlIChCZWhhbmRsaW5nUmVzdWx0YXQuRU5EUkVUX1VUQkVUQUxJTkcsIEJlaGFuZGxpbmdSZXN1bHRhdC5FTkRSRVRfVVRFTl9VVEJFVEFMSU5HKTpcbiAgICAgICAgICAgIHJldHVybiAnYWNjZW50JztcbiAgICAgICAgY2FzZSBCZWhhbmRsaW5nUmVzdWx0YXQuQVZTTMOFVFQ6XG4gICAgICAgIGNhc2UgKEJlaGFuZGxpbmdSZXN1bHRhdC5PUFBIw5hSVCwgQmVoYW5kbGluZ1Jlc3VsdGF0LkZPUlRTQVRUX09QUEjDmFJUKTpcbiAgICAgICAgICAgIHJldHVybiAnZGFuZ2VyJztcbiAgICAgICAgY2FzZSBCZWhhbmRsaW5nUmVzdWx0YXQuSUtLRV9WVVJERVJUOlxuICAgICAgICAgICAgcmV0dXJuICduZXV0cmFsLXN1YnRsZSc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gJ25ldXRyYWwnO1xuICAgIH1cbn07XG5cbmNvbnN0IGhlbnRSZXN1bHRhdGZhcmdlVGVrc3QgPSAoYmVoYW5kbGluZ1Jlc3VsdGF0OiBCZWhhbmRsaW5nUmVzdWx0YXQpID0+IHtcbiAgICBpZiAoZXJCZWhhbmRsaW5nSGVubGFndChiZWhhbmRsaW5nUmVzdWx0YXQpKSB7XG4gICAgICAgIHJldHVybiBUZXh0TmV1dHJhbDtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGJlaGFuZGxpbmdSZXN1bHRhdCkge1xuICAgICAgICBjYXNlIEJlaGFuZGxpbmdSZXN1bHRhdC5JTk5WSUxHRVQ6XG4gICAgICAgIGNhc2UgQmVoYW5kbGluZ1Jlc3VsdGF0LkRFTFZJU19JTk5WSUxHRVQ6XG4gICAgICAgIGNhc2UgQmVoYW5kbGluZ1Jlc3VsdGF0LkZPUlRTQVRUX0lOTlZJTEdFVDpcbiAgICAgICAgICAgIHJldHVybiBUZXh0U3VjY2VzcztcbiAgICAgICAgY2FzZSAoQmVoYW5kbGluZ1Jlc3VsdGF0LkVORFJFVF9VVEJFVEFMSU5HLCBCZWhhbmRsaW5nUmVzdWx0YXQuRU5EUkVUX1VURU5fVVRCRVRBTElORyk6XG4gICAgICAgICAgICByZXR1cm4gVGV4dEluZm87XG4gICAgICAgIGNhc2UgQmVoYW5kbGluZ1Jlc3VsdGF0LkFWU0zDhVRUOlxuICAgICAgICBjYXNlIChCZWhhbmRsaW5nUmVzdWx0YXQuT1BQSMOYUlQsIEJlaGFuZGxpbmdSZXN1bHRhdC5GT1JUU0FUVF9PUFBIw5hSVCk6XG4gICAgICAgICAgICByZXR1cm4gVGV4dERhbmdlcjtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBUZXh0TmV1dHJhbDtcbiAgICB9XG59O1xuXG5jb25zdCBTdHlsZWRIZWFkaW5nID0gc3R5bGVkKEhlYWRpbmcpYFxuICAgIGZvbnQtc2l6ZTogdmFyKC0tYXgtc3BhY2UtMTYpO1xuYDtcblxuZXhwb3J0IGZ1bmN0aW9uIEJlaGFuZGxpbmdza29ydCgpIHtcbiAgICBjb25zdCB7IGZhZ3NhayB9ID0gdXNlRmFnc2FrQ29udGV4dCgpO1xuICAgIGNvbnN0IHsgYmVoYW5kbGluZyB9ID0gdXNlQmVoYW5kbGluZ0NvbnRleHQoKTtcblxuICAgIGNvbnN0IGJlaGFuZGxpbmdlciA9IGZhZ3Nhay5iZWhhbmRsaW5nZXI7XG5cbiAgICBjb25zdCBhbnRhbGxCZWhhbmRsaW5nZXIgPSBiZWhhbmRsaW5nZXIubGVuZ3RoO1xuICAgIGNvbnN0IGJlaGFuZGxpbmdJbmRleCA9IGJlaGFuZGxpbmdlci5maW5kSW5kZXgoYiA9PiBiLmJlaGFuZGxpbmdJZCA9PT0gYmVoYW5kbGluZy5iZWhhbmRsaW5nSWQpICsgMTtcblxuICAgIGNvbnN0IHRpdHRlbCA9IGAke2JlaGFuZGxpbmdzdHlwZXJbYmVoYW5kbGluZy50eXBlXS5uYXZufSAoJHtiZWhhbmRsaW5nSW5kZXh9LyR7YW50YWxsQmVoYW5kbGluZ2VyfSkgLSAke3Nha3N0eXBlKGJlaGFuZGxpbmcpLnRvTG93ZXJDYXNlKCl9YDtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxCb3hcbiAgICAgICAgICAgIHBhZGRpbmc9XCJzcGFjZS04XCJcbiAgICAgICAgICAgIGJvcmRlckNvbG9yPXtoZW50UmVzdWx0YXRmYXJnZShiZWhhbmRsaW5nLnJlc3VsdGF0KX1cbiAgICAgICAgICAgIGJvcmRlcldpZHRoPVwiMSAxIDEgNVwiXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM9XCI0XCJcbiAgICAgICAgICAgIG1hcmdpbj1cInNwYWNlLThcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8Qm94IGJvcmRlcldpZHRoPVwiMCAwIDEgMFwiIGJvcmRlckNvbG9yPVwibmV1dHJhbC1zdWJ0bGVcIj5cbiAgICAgICAgICAgICAgICA8VlN0YWNrIGdhcD1cInNwYWNlLTRcIiBtYXJnaW5CbG9jaz1cInNwYWNlLTAgc3BhY2UtOFwiPlxuICAgICAgICAgICAgICAgICAgICA8U3R5bGVkSGVhZGluZyBzaXplPXsneHNtYWxsJ30gbGV2ZWw9eycyJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGl0dGVsfVxuICAgICAgICAgICAgICAgICAgICA8L1N0eWxlZEhlYWRpbmc+XG4gICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQ+e2JlaGFuZGxpbmfDhXJzYWtbYmVoYW5kbGluZy7DpXJzYWtdfTwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgIDwvVlN0YWNrPlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8VlN0YWNrIGdhcD1cInNwYWNlLTE2XCIgbWFyZ2luQmxvY2s9XCJzcGFjZS0xNlwiPlxuICAgICAgICAgICAgICAgIDxJbmZvcm1hc2pvbnNib2xrIGxhYmVsPVwiQmVoYW5kbGluZ3NzdGF0dXNcIiB0ZWtzdD17YmVoYW5kbGluZ3NzdGF0dXNlcltiZWhhbmRsaW5nLnN0YXR1c119IC8+XG4gICAgICAgICAgICAgICAgPEluZm9ybWFzam9uc2JvbGtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJSZXN1bHRhdFwiXG4gICAgICAgICAgICAgICAgICAgIHRla3N0PXtiZWhhbmRsaW5nc3Jlc3VsdGF0ZXJbYmVoYW5kbGluZy5yZXN1bHRhdF19XG4gICAgICAgICAgICAgICAgICAgIHRla3N0RmFyZ2U9e2hlbnRSZXN1bHRhdGZhcmdlVGVrc3QoYmVoYW5kbGluZy5yZXN1bHRhdCl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICB7YmVoYW5kbGluZy5zw7hrbmFkTW90dGF0dERhdG8gJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEluZm9ybWFzam9uc2JvbGtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlPDuGtuYWQgbW90dGF0dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVrc3Q9e2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzb1N0cmluZzogYmVoYW5kbGluZy5zw7hrbmFkTW90dGF0dERhdG8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5EQVRPLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPEluZm9ybWFzam9uc2JvbGtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiT3BwcmV0dGV0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRla3N0PXtpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzb1N0cmluZzogYmVoYW5kbGluZy5vcHByZXR0ZXRUaWRzcHVua3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0LkRBVE8sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPEluZm9ybWFzam9uc2JvbGtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiVmVkdGFrc2RhdG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgdGVrc3Q9e2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNvU3RyaW5nOiBiZWhhbmRsaW5nLnZlZHRhaz8udmVkdGFrc2RhdG8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0LkRBVE8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFN0cmluZzogJ0lra2Ugc2F0dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8SW5mb3JtYXNqb25zYm9sa1xuICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIkVuaGV0XCJcbiAgICAgICAgICAgICAgICAgICAgdGVrc3Q9e2JlaGFuZGxpbmcuYXJiZWlkc2ZvcmRlbGluZ1DDpUJlaGFuZGxpbmcuYmVoYW5kbGVuZGVFbmhldElkfVxuICAgICAgICAgICAgICAgICAgICB0ZWtzdEhvdmVyPXtiZWhhbmRsaW5nLmFyYmVpZHNmb3JkZWxpbmdQw6VCZWhhbmRsaW5nLmJlaGFuZGxlbmRlRW5oZXROYXZufVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1ZTdGFjaz5cbiAgICAgICAgPC9Cb3g+XG4gICAgKTtcbn1cbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQm9keVNob3J0LCBIR3JpZCB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHsgVGV4dE5ldXRyYWwgfSBmcm9tICdAbmF2aWt0L2RzLXRva2Vucy9kaXN0L3Rva2Vucyc7XG5cbmludGVyZmFjZSBJUHJvcHMge1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgdGVrc3Q6IHN0cmluZztcbiAgICB0ZWtzdEhvdmVyPzogc3RyaW5nO1xuICAgIHRla3N0RmFyZ2U/OiBzdHJpbmc7XG59XG5cbmNvbnN0IEluZm9ybWFzam9uc2JvbGs6IFJlYWN0LkZDPElQcm9wcz4gPSAoeyBsYWJlbCwgdGVrc3QsIHRla3N0SG92ZXIsIHRla3N0RmFyZ2UgfSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxIR3JpZCBjb2x1bW5zPXsyfT5cbiAgICAgICAgICAgIDxCb2R5U2hvcnQ+e2xhYmVsfTwvQm9keVNob3J0PlxuICAgICAgICAgICAgPEJvZHlTaG9ydCB3ZWlnaHQ9XCJzZW1pYm9sZFwiIHN0eWxlPXt7IGNvbG9yOiB0ZWtzdEZhcmdlID8/IFRleHROZXV0cmFsIH19IHRpdGxlPXt0ZWtzdEhvdmVyfT5cbiAgICAgICAgICAgICAgICB7dGVrc3R9XG4gICAgICAgICAgICA8L0JvZHlTaG9ydD5cbiAgICAgICAgPC9IR3JpZD5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5mb3JtYXNqb25zYm9saztcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImVlODQ5NjVhZDQxZjUzNTJmYjc2XCIpIl0sIm5hbWVzIjpbIlJlYWN0Iiwic3R5bGVkIiwiQm9keVNob3J0IiwiQm94IiwiSGVhZGluZyIsIlZTdGFjayIsIlRleHREYW5nZXIiLCJUZXh0SW5mbyIsIlRleHROZXV0cmFsIiwiVGV4dFN1Y2Nlc3MiLCJJbmZvcm1hc2pvbnNib2xrIiwiQmVoYW5kbGluZ1Jlc3VsdGF0IiwiYmVoYW5kbGluZ3NyZXN1bHRhdGVyIiwiYmVoYW5kbGluZ3NzdGF0dXNlciIsImJlaGFuZGxpbmdzdHlwZXIiLCJiZWhhbmRsaW5nw4Vyc2FrIiwiZXJCZWhhbmRsaW5nSGVubGFndCIsIkRhdG9mb3JtYXQiLCJpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmciLCJ1c2VGYWdzYWtDb250ZXh0Iiwic2Frc3R5cGUiLCJ1c2VCZWhhbmRsaW5nQ29udGV4dCIsImhlbnRSZXN1bHRhdGZhcmdlIiwiYmVoYW5kbGluZ1Jlc3VsdGF0IiwiSU5OVklMR0VUIiwiREVMVklTX0lOTlZJTEdFVCIsIkZPUlRTQVRUX0lOTlZJTEdFVCIsIkVORFJFVF9VVEJFVEFMSU5HIiwiRU5EUkVUX1VURU5fVVRCRVRBTElORyIsIkFWU0zDhVRUIiwiT1BQSMOYUlQiLCJGT1JUU0FUVF9PUFBIw5hSVCIsIklLS0VfVlVSREVSVCIsImhlbnRSZXN1bHRhdGZhcmdlVGVrc3QiLCJTdHlsZWRIZWFkaW5nIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbCIsIl9jIiwiQmVoYW5kbGluZ3Nrb3J0IiwiX3MiLCJfYmVoYW5kbGluZyR2ZWR0YWsiLCJfdXNlRmFnc2FrQ29udGV4dCIsImZhZ3NhayIsIl91c2VCZWhhbmRsaW5nQ29udGV4dCIsImJlaGFuZGxpbmciLCJiZWhhbmRsaW5nZXIiLCJhbnRhbGxCZWhhbmRsaW5nZXIiLCJsZW5ndGgiLCJiZWhhbmRsaW5nSW5kZXgiLCJmaW5kSW5kZXgiLCJiIiwiYmVoYW5kbGluZ0lkIiwidGl0dGVsIiwiY29uY2F0IiwidHlwZSIsIm5hdm4iLCJ0b0xvd2VyQ2FzZSIsImNyZWF0ZUVsZW1lbnQiLCJwYWRkaW5nIiwiYm9yZGVyQ29sb3IiLCJyZXN1bHRhdCIsImJvcmRlcldpZHRoIiwiYm9yZGVyUmFkaXVzIiwibWFyZ2luIiwiZ2FwIiwibWFyZ2luQmxvY2siLCJzaXplIiwibGV2ZWwiLCLDpXJzYWsiLCJsYWJlbCIsInRla3N0Iiwic3RhdHVzIiwidGVrc3RGYXJnZSIsInPDuGtuYWRNb3R0YXR0RGF0byIsImlzb1N0cmluZyIsInRpbEZvcm1hdCIsIkRBVE8iLCJvcHByZXR0ZXRUaWRzcHVua3QiLCJ2ZWR0YWsiLCJ2ZWR0YWtzZGF0byIsImRlZmF1bHRTdHJpbmciLCJhcmJlaWRzZm9yZGVsaW5nUMOlQmVoYW5kbGluZyIsImJlaGFuZGxlbmRlRW5oZXRJZCIsInRla3N0SG92ZXIiLCJiZWhhbmRsZW5kZUVuaGV0TmF2biIsIl9jMiIsIiRSZWZyZXNoUmVnJCIsIkhHcmlkIiwiX3JlZiIsImNvbHVtbnMiLCJ3ZWlnaHQiLCJzdHlsZSIsImNvbG9yIiwidGl0bGUiXSwic291cmNlUm9vdCI6IiJ9