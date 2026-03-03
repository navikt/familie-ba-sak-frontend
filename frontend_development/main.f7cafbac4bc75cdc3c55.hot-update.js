"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/ikoner/StatusIkon.tsx"
/*!********************************************!*\
  !*** ./src/frontend/ikoner/StatusIkon.tsx ***!
  \********************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Status: () => (/* binding */ Status),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @navikt/aksel-icons */ "./node_modules/@navikt/aksel-icons/dist/react/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }



var Status = /*#__PURE__*/function (Status) {
  Status[Status["ADVARSEL"] = 0] = "ADVARSEL";
  Status[Status["FEIL"] = 1] = "FEIL";
  Status[Status["OK"] = 2] = "OK";
  Status[Status["INFO"] = 3] = "INFO";
  return Status;
}({});
var OkIkon = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__.CheckmarkCircleFillIcon)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    color: var(--ax-border-success);\n    font-size: 1.5rem;\n    min-width: 1.5rem;\n"])));
_c = OkIkon;
var FeilIkon = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__.XMarkOctagonFillIcon)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    color: var(--ax-border-danger);\n    font-size: 1.5rem;\n    min-width: 1.5rem;\n"])));
_c2 = FeilIkon;
var AdvarselIkon = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__.ExclamationmarkTriangleFillIcon)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    color: var(--ax-border-warning);\n    font-size: 1.5rem;\n    min-width: 1.5rem;\n"])));
_c3 = AdvarselIkon;
var InfoIkon = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__.InformationSquareFillIcon)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    color: var(--ax-border-info);\n    font-size: 1.5rem;\n    min-width: 1.5rem;\n"])));
_c4 = InfoIkon;
var StatusIkon = function StatusIkon(_ref) {
  var status = _ref.status,
    title = _ref.title;
  switch (status) {
    case Status.OK:
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(OkIkon, {
        title: title
      });
    case Status.FEIL:
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(FeilIkon, {
        title: title
      });
    case Status.ADVARSEL:
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(AdvarselIkon, {
        title: title
      });
    case Status.INFO:
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(InfoIkon, {
        title: title
      });
  }
};
_c5 = StatusIkon;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StatusIkon);
var _c, _c2, _c3, _c4, _c5;
__webpack_require__.$Refresh$.register(_c, "OkIkon");
__webpack_require__.$Refresh$.register(_c2, "FeilIkon");
__webpack_require__.$Refresh$.register(_c3, "AdvarselIkon");
__webpack_require__.$Refresh$.register(_c4, "InfoIkon");
__webpack_require__.$Refresh$.register(_c5, "StatusIkon");

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
      return _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.TextSuccessSubtle;
    case (_typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.ENDRET_UTBETALING, _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.ENDRET_UTEN_UTBETALING):
      return _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.TextInfoSubtle;
    case _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.AVSLÅTT:
    case (_typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.OPPHØRT, _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingResultat.FORTSATT_OPPHØRT):
      return _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.TextDangerSubtle;
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

/***/ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Behandlingsresultat.tsx"
/*!************************************************************************************************!*\
  !*** ./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Behandlingsresultat.tsx ***!
  \************************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/aksel-icons */ "./node_modules/@navikt/aksel-icons/dist/react/esm/index.js");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @navikt/familie-typer */ "./node_modules/@navikt/familie-typer/dist/index.js");
/* harmony import */ var _EndretUtbetaling_EndretUtbetalingAndelTabell__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EndretUtbetaling/EndretUtbetalingAndelTabell */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/EndretUtbetaling/EndretUtbetalingAndelTabell.tsx");
/* harmony import */ var _E_s_Kompetanse_KompetanseSkjema__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Eøs/Kompetanse/KompetanseSkjema */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/Kompetanse/KompetanseSkjema.tsx");
/* harmony import */ var _E_s_Kompetanse_useKompetansePeriodeSkjema__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Eøs/Kompetanse/useKompetansePeriodeSkjema */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/Kompetanse/useKompetansePeriodeSkjema.ts");
/* harmony import */ var _E_s_useE_s__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Eøs/useEøs */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/useEøs.ts");
/* harmony import */ var _E_s_UtbetaltAnnetLand_useUtenlandskPeriodeBel_pSkjema__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Eøs/UtbetaltAnnetLand/useUtenlandskPeriodeBeløpSkjema */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/UtbetaltAnnetLand/useUtenlandskPeriodeBeløpSkjema.ts");
/* harmony import */ var _E_s_UtbetaltAnnetLand_UtbetaltAnnetLand__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Eøs/UtbetaltAnnetLand/UtbetaltAnnetLand */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/UtbetaltAnnetLand/UtbetaltAnnetLand.tsx");
/* harmony import */ var _E_s_Valutakurs_useOppdaterValutakursOgSimuleringP_BeslutterSteg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Eøs/Valutakurs/useOppdaterValutakursOgSimuleringPåBeslutterSteg */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/Valutakurs/useOppdaterValutakursOgSimuleringPåBeslutterSteg.ts");
/* harmony import */ var _E_s_Valutakurs_useValutakursSkjema__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Eøs/Valutakurs/useValutakursSkjema */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/Valutakurs/useValutakursSkjema.ts");
/* harmony import */ var _E_s_Valutakurs_Valutakurser__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Eøs/Valutakurs/Valutakurser */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/Valutakurs/Valutakurser.tsx");
/* harmony import */ var _MigreringInfoboks__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./MigreringInfoboks */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/MigreringInfoboks.tsx");
/* harmony import */ var _Oppsummeringsboks__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Oppsummeringsboks */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Oppsummeringsboks.tsx");
/* harmony import */ var _TilkjentYtelseTidslinje__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./TilkjentYtelseTidslinje */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/TilkjentYtelseTidslinje.tsx");
/* harmony import */ var _useBehandlingsresultat__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./useBehandlingsresultat */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/useBehandlingsresultat.ts");
/* harmony import */ var _hooks_useFagsakId__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../../hooks/useFagsakId */ "./src/frontend/hooks/useFagsakId.ts");
/* harmony import */ var _hooks_useOpprettEndretUtbetalingAndel__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../../hooks/useOpprettEndretUtbetalingAndel */ "./src/frontend/hooks/useOpprettEndretUtbetalingAndel.ts");
/* harmony import */ var _komponenter_Tidslinje_TidslinjeContext__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../../komponenter/Tidslinje/TidslinjeContext */ "./src/frontend/komponenter/Tidslinje/TidslinjeContext.tsx");
/* harmony import */ var _typer_behandling__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../../typer/behandling */ "./src/frontend/typer/behandling.ts");
/* harmony import */ var _utils_dato__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../../utils/dato */ "./src/frontend/utils/dato/index.ts");
/* harmony import */ var _utils_formatter__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../../../utils/formatter */ "./src/frontend/utils/formatter.ts");
/* harmony import */ var _utils_ressursUtils__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../../../utils/ressursUtils */ "./src/frontend/utils/ressursUtils.ts");
/* harmony import */ var _FagsakContext__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../FagsakContext */ "./src/frontend/sider/Fagsak/FagsakContext.tsx");
/* harmony import */ var _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../context/BehandlingContext */ "./src/frontend/sider/Fagsak/Behandling/context/BehandlingContext.tsx");
/* harmony import */ var _Skjemasteg__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../Skjemasteg */ "./src/frontend/sider/Fagsak/Behandling/Sider/Skjemasteg.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject,
  _templateObject2,
  _templateObject3,
  _templateObject4,
  _s = __webpack_require__.$Refresh$.signature();
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }






























var EndretUtbetalingAndel = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    display: flex;\n    justify-content: flex-end;\n    margin-bottom: 1rem;\n"])));
_c = EndretUtbetalingAndel;
var StyledEditIkon = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_4__.PencilIcon)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    font-size: 1.5rem;\n"])));
_c2 = StyledEditIkon;
var StyledAlert = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Alert)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    margin-bottom: 1rem;\n"])));
_c3 = StyledAlert;
var StyledErrorSummary = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.ErrorSummary)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    margin-top: 5rem;\n"])));
_c4 = StyledErrorSummary;
var Behandlingsresultat = function Behandlingsresultat(_ref) {
  _s();
  var _åpenBehandling$kompe, _åpenBehandling$utenl, _åpenBehandling$utenl2;
  var åpenBehandling = _ref.åpenBehandling;
  var navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
  var fagsakId = (0,_hooks_useFagsakId__WEBPACK_IMPORTED_MODULE_20__.useFagsakId)();
  var _useFagsakContext = (0,_FagsakContext__WEBPACK_IMPORTED_MODULE_27__.useFagsakContext)(),
    fagsak = _useFagsakContext.fagsak;
  var _useBehandlingContext = (0,_context_BehandlingContext__WEBPACK_IMPORTED_MODULE_28__.useBehandlingContext)(),
    settÅpenBehandling = _useBehandlingContext.settÅpenBehandling;
  var _useBehandlingsresult = (0,_useBehandlingsresultat__WEBPACK_IMPORTED_MODULE_19__.useBehandlingsresultat)(åpenBehandling),
    visFeilmeldinger = _useBehandlingsresult.visFeilmeldinger,
    settVisFeilmeldinger = _useBehandlingsresult.settVisFeilmeldinger,
    hentPersonerMedUgyldigEtterbetalingsperiode = _useBehandlingsresult.hentPersonerMedUgyldigEtterbetalingsperiode,
    personerMedUgyldigEtterbetalingsperiode = _useBehandlingsresult.personerMedUgyldigEtterbetalingsperiode;
  var _useOpprettEndretUtbe = (0,_hooks_useOpprettEndretUtbetalingAndel__WEBPACK_IMPORTED_MODULE_21__.useOpprettEndretUtbetalingAndel)({
      onSuccess: function onSuccess(behandling) {
        return settÅpenBehandling((0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.byggDataRessurs)(behandling));
      }
    }),
    opprettEndretUtbetalingAndel = _useOpprettEndretUtbe.mutate,
    isOpprettEndretUtbetalingAndelPending = _useOpprettEndretUtbe.isPending,
    isOpprettEndretUtbetalingAndelError = _useOpprettEndretUtbe.isError,
    opprettEndretUtbetalingAndelError = _useOpprettEndretUtbe.error;
  var _useTidslinjeContext = (0,_komponenter_Tidslinje_TidslinjeContext__WEBPACK_IMPORTED_MODULE_22__.useTidslinjeContext)(),
    aktivEtikett = _useTidslinjeContext.aktivEtikett,
    filterOgSorterAndelPersonerIGrunnlag = _useTidslinjeContext.filterOgSorterAndelPersonerIGrunnlag,
    filterOgSorterGrunnlagPersonerMedAndeler = _useTidslinjeContext.filterOgSorterGrunnlagPersonerMedAndeler;
  (0,_E_s_Valutakurs_useOppdaterValutakursOgSimuleringP_BeslutterSteg__WEBPACK_IMPORTED_MODULE_13__["useOppdaterValutakursOgSimuleringPåBeslutterSteg"])();
  var _useBehandlingContext2 = (0,_context_BehandlingContext__WEBPACK_IMPORTED_MODULE_28__.useBehandlingContext)(),
    vurderErLesevisning = _useBehandlingContext2.vurderErLesevisning,
    behandlingresultatNesteOnClick = _useBehandlingContext2.behandlingresultatNesteOnClick,
    behandlingsstegSubmitressurs = _useBehandlingContext2.behandlingsstegSubmitressurs;
  var _useEøs = (0,_E_s_useE_s__WEBPACK_IMPORTED_MODULE_10__["useEøs"])(åpenBehandling),
    erEøsInformasjonGyldig = _useEøs.erEøsInformasjonGyldig,
    kompetanser = _useEøs.kompetanser,
    hentKompetanserMedFeil = _useEøs.hentKompetanserMedFeil,
    utbetaltAnnetLandBeløp = _useEøs.utbetaltAnnetLandBeløp,
    erUtbetaltAnnetLandBeløpGyldige = _useEøs.erUtbetaltAnnetLandBeløpGyldige,
    hentUtbetaltAnnetLandBeløpMedFeil = _useEøs.hentUtbetaltAnnetLandBeløpMedFeil,
    valutakurser = _useEøs.valutakurser,
    erValutakurserGyldige = _useEøs.erValutakurserGyldige,
    hentValutakurserMedFeil = _useEøs.hentValutakurserMedFeil;
  var erLesevisning = vurderErLesevisning();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    hentPersonerMedUgyldigEtterbetalingsperiode();
  }, [åpenBehandling]);
  var finnUtbetalingsperiodeForAktivEtikett = function finnUtbetalingsperiodeForAktivEtikett(utbetalingsperioder) {
    return aktivEtikett ? utbetalingsperioder.find(function (utbetalingsperiode) {
      return (0,_utils_dato__WEBPACK_IMPORTED_MODULE_24__.periodeOverlapperMedValgtDato)(utbetalingsperiode.periodeFom, utbetalingsperiode.periodeTom, aktivEtikett.date);
    }) : undefined;
  };
  var grunnlagPersoner = filterOgSorterGrunnlagPersonerMedAndeler(åpenBehandling.personer, åpenBehandling.personerMedAndelerTilkjentYtelse);
  var tidslinjePersoner = filterOgSorterAndelPersonerIGrunnlag(grunnlagPersoner, åpenBehandling.personerMedAndelerTilkjentYtelse);
  var erMigreringFraInfotrygd = åpenBehandling.type === _typer_behandling__WEBPACK_IMPORTED_MODULE_23__.Behandlingstype.MIGRERING_FRA_INFOTRYGD;
  var harKompetanser = ((_åpenBehandling$kompe = åpenBehandling.kompetanser) === null || _åpenBehandling$kompe === void 0 ? void 0 : _åpenBehandling$kompe.length) > 0;
  var harUtenlandskeBeløper = ((_åpenBehandling$utenl = åpenBehandling.utenlandskePeriodebeløp) === null || _åpenBehandling$utenl === void 0 ? void 0 : _åpenBehandling$utenl.length) > 0;
  var harValutakurser = ((_åpenBehandling$utenl2 = åpenBehandling.utenlandskePeriodebeløp) === null || _åpenBehandling$utenl2 === void 0 ? void 0 : _åpenBehandling$utenl2.length) > 0;
  var harEøs = harKompetanser || harUtenlandskeBeløper || harValutakurser;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Skjemasteg__WEBPACK_IMPORTED_MODULE_29__["default"], {
    senderInn: behandlingsstegSubmitressurs.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.RessursStatus.HENTER,
    tittel: "Behandlingsresultat",
    className: "behandlingsresultat",
    forrigeOnClick: function forrigeOnClick() {
      return navigate("/fagsak/".concat(fagsakId, "/").concat(åpenBehandling.behandlingId, "/vilkaarsvurdering"));
    },
    nesteOnClick: function nesteOnClick() {
      if (erLesevisning) {
        navigate("/fagsak/".concat(fagsakId, "/").concat(åpenBehandling.behandlingId, "/simulering"));
      } else if (harEøs && !erEøsInformasjonGyldig()) {
        settVisFeilmeldinger(true);
      } else {
        behandlingresultatNesteOnClick();
      }
    },
    maxWidthStyle: '80rem',
    feilmelding: (0,_utils_ressursUtils__WEBPACK_IMPORTED_MODULE_26__.hentFrontendFeilmelding)(behandlingsstegSubmitressurs),
    steg: _typer_behandling__WEBPACK_IMPORTED_MODULE_23__.BehandlingSteg.BEHANDLINGSRESULTAT
  }, personerMedUgyldigEtterbetalingsperiode.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(StyledAlert, {
    variant: 'warning'
  }, "Du har perioder som kan f\xF8re til etterbetaling utover tre m\xE5neder for person", ' ', (0,_utils_formatter__WEBPACK_IMPORTED_MODULE_25__["slåSammenListeTilStreng"])(personerMedUgyldigEtterbetalingsperiode.map(function (ident) {
    return (0,_utils_formatter__WEBPACK_IMPORTED_MODULE_25__.formaterIdent)(ident);
  })), "."), erMigreringFraInfotrygd && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_MigreringInfoboks__WEBPACK_IMPORTED_MODULE_16__["default"], {
    behandlingId: åpenBehandling.behandlingId
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_TilkjentYtelseTidslinje__WEBPACK_IMPORTED_MODULE_18__["default"], {
    grunnlagPersoner: grunnlagPersoner,
    tidslinjePersoner: tidslinjePersoner,
    fagsakType: fagsak.fagsakType
  }), !erLesevisning && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(EndretUtbetalingAndel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Button, {
    variant: "tertiary",
    size: "small",
    onClick: function onClick() {
      return opprettEndretUtbetalingAndel();
    },
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(StyledEditIkon, null),
    disabled: isOpprettEndretUtbetalingAndelPending,
    loading: isOpprettEndretUtbetalingAndelPending
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Label, null, "Endre utbetalingsperiode")), isOpprettEndretUtbetalingAndelError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.ErrorMessage, null, opprettEndretUtbetalingAndelError.message)), aktivEtikett && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Oppsummeringsboks__WEBPACK_IMPORTED_MODULE_17__.Oppsummeringsboks, {
    utbetalingsperiode: finnUtbetalingsperiodeForAktivEtikett(åpenBehandling.utbetalingsperioder),
    aktivEtikett: aktivEtikett,
    kompetanser: kompetanser,
    utbetaltAnnetLandBeløp: utbetaltAnnetLandBeløp,
    valutakurser: valutakurser
  }), åpenBehandling.endretUtbetalingAndeler.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_EndretUtbetaling_EndretUtbetalingAndelTabell__WEBPACK_IMPORTED_MODULE_7__["default"], {
    åpenBehandling: åpenBehandling
  }), harKompetanser && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_E_s_Kompetanse_KompetanseSkjema__WEBPACK_IMPORTED_MODULE_8__["default"], {
    kompetanser: kompetanser,
    visFeilmeldinger: visFeilmeldinger,
    åpenBehandling: åpenBehandling
  }), harUtenlandskeBeløper && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_E_s_UtbetaltAnnetLand_UtbetaltAnnetLand__WEBPACK_IMPORTED_MODULE_12__["default"], {
    utbetaltAnnetLandBeløp: utbetaltAnnetLandBeløp,
    erUtbetaltAnnetLandBeløpGyldige: erUtbetaltAnnetLandBeløpGyldige,
    visFeilmeldinger: visFeilmeldinger,
    åpenBehandling: åpenBehandling
  }), harValutakurser && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_E_s_Valutakurs_Valutakurser__WEBPACK_IMPORTED_MODULE_15__["default"], {
    valutakurser: valutakurser,
    erValutakurserGyldige: erValutakurserGyldige,
    visFeilmeldinger: visFeilmeldinger,
    åpenBehandling: åpenBehandling
  }),  true &&
  /*#__PURE__*/
  //visFeilmeldinger && (
  react__WEBPACK_IMPORTED_MODULE_1__.createElement(StyledErrorSummary, {
    heading: 'For å gå videre må du rette opp følgende:'
  }, [].concat(_toConsumableArray(hentKompetanserMedFeil().map(function (kompetanse) {
    return {
      feilmelding: "Kompetanse barn: ".concat(kompetanse.barnIdenter, ", f.o.m.: ").concat(kompetanse.fom, " er ikke fullstendig."),
      skjemaelementId: (0,_E_s_Kompetanse_useKompetansePeriodeSkjema__WEBPACK_IMPORTED_MODULE_9__.kompetanseFeilmeldingId)(kompetanse)
    };
  })), _toConsumableArray(hentUtbetaltAnnetLandBeløpMedFeil().map(function (utenlandskPeriodeBeløp) {
    return {
      feilmelding: "Utenlandsk bel\xF8p barn: ".concat(utenlandskPeriodeBeløp.barnIdenter, ", f.o.m.: ").concat(utenlandskPeriodeBeløp.fom, " er ikke fullstendig."),
      skjemaelementId: (0,_E_s_UtbetaltAnnetLand_useUtenlandskPeriodeBel_pSkjema__WEBPACK_IMPORTED_MODULE_11__["utenlandskPeriodeBeløpFeilmeldingId"])(utenlandskPeriodeBeløp)
    };
  })), _toConsumableArray(hentValutakurserMedFeil().map(function (valutakurs) {
    return {
      feilmelding: "Valutakurs barn: ".concat(valutakurs.barnIdenter, ", f.o.m.: ").concat(valutakurs.fom, " er ikke fullstendig."),
      skjemaelementId: (0,_E_s_Valutakurs_useValutakursSkjema__WEBPACK_IMPORTED_MODULE_14__.valutakursFeilmeldingId)(valutakurs)
    };
  }))).map(function (item) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.ErrorSummary.Item, {
      href: "#".concat(item.skjemaelementId)
    }, item.feilmelding);
  })));
};
_s(Behandlingsresultat, "LaRtFE2pMmNbQNNPdD3TmTUA94I=", false, function () {
  return [react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate, _hooks_useFagsakId__WEBPACK_IMPORTED_MODULE_20__.useFagsakId, _FagsakContext__WEBPACK_IMPORTED_MODULE_27__.useFagsakContext, _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_28__.useBehandlingContext, _useBehandlingsresultat__WEBPACK_IMPORTED_MODULE_19__.useBehandlingsresultat, _hooks_useOpprettEndretUtbetalingAndel__WEBPACK_IMPORTED_MODULE_21__.useOpprettEndretUtbetalingAndel, _komponenter_Tidslinje_TidslinjeContext__WEBPACK_IMPORTED_MODULE_22__.useTidslinjeContext, _E_s_Valutakurs_useOppdaterValutakursOgSimuleringP_BeslutterSteg__WEBPACK_IMPORTED_MODULE_13__["useOppdaterValutakursOgSimuleringPåBeslutterSteg"], _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_28__.useBehandlingContext, _E_s_useE_s__WEBPACK_IMPORTED_MODULE_10__["useEøs"]];
});
_c5 = Behandlingsresultat;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Behandlingsresultat);
var _c, _c2, _c3, _c4, _c5;
__webpack_require__.$Refresh$.register(_c, "EndretUtbetalingAndel");
__webpack_require__.$Refresh$.register(_c2, "StyledEditIkon");
__webpack_require__.$Refresh$.register(_c3, "StyledAlert");
__webpack_require__.$Refresh$.register(_c4, "StyledErrorSummary");
__webpack_require__.$Refresh$.register(_c5, "Behandlingsresultat");

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

/***/ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/Kompetanse/useKompetanse.ts"
/*!********************************************************************************************************!*\
  !*** ./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/Kompetanse/useKompetanse.ts ***!
  \********************************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useKompetanse: () => (/* binding */ useKompetanse)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _typer_e_sPerioder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../typer/eøsPerioder */ "./src/frontend/typer/eøsPerioder.ts");
/* harmony import */ var _utils_e_s__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../utils/eøs */ "./src/frontend/utils/eøs.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _s = __webpack_require__.$Refresh$.signature();
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var useKompetanse = function useKompetanse(_ref) {
  _s();
  var åpenBehandling = _ref.åpenBehandling;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    kompetanser = _useState2[0],
    settKompetanser = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (åpenBehandling.kompetanser.length > 0) {
      settKompetanser(åpenBehandling.kompetanser.sort(function (periodeA, periodeB) {
        return (0,_utils_e_s__WEBPACK_IMPORTED_MODULE_3__["sorterEøsPerioder"])(periodeA, periodeB, åpenBehandling.personer);
      }));
    }
  }, [åpenBehandling]);
  var erKompetanserGyldige = function erKompetanserGyldige() {
    return hentKompetanserMedFeil().length === 0;
  };
  var hentKompetanserMedFeil = function hentKompetanserMedFeil() {
    return [
    //TODO NGHI SLETT
    {
      id: 2,
      fom: '2025-12',
      barnIdenter: ['123123123'],
      status: _typer_e_sPerioder__WEBPACK_IMPORTED_MODULE_2__["EøsPeriodeStatus"].IKKE_UTFYLT
    }, {
      id: 2,
      fom: '2025-12',
      barnIdenter: ['123123123'],
      status: _typer_e_sPerioder__WEBPACK_IMPORTED_MODULE_2__["EøsPeriodeStatus"].IKKE_UTFYLT
    }];
    //return kompetanser.filter(kompetanse => kompetanse.status !== EøsPeriodeStatus.OK);
  };
  return {
    kompetanser: kompetanser,
    erKompetanserGyldige: erKompetanserGyldige,
    hentKompetanserMedFeil: hentKompetanserMedFeil
  };
};
_s(useKompetanse, "RKeHFnj8oQq5a/kqBa4XJapgYGo=");


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

/***/ },

/***/ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/GeneriskVilkår/GeneriskVilkår.tsx"
/*!*******************************************************************************************************!*\
  !*** ./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/GeneriskVilkår/GeneriskVilkår.tsx ***!
  \*******************************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @navikt/aksel-icons */ "./node_modules/@navikt/aksel-icons/dist/react/esm/index.js");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/familie-typer */ "./node_modules/@navikt/familie-typer/dist/index.js");
/* harmony import */ var _FjernUtvidetBarnetrygdVilk_r__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FjernUtvidetBarnetrygdVilkår */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/GeneriskVilkår/FjernUtvidetBarnetrygdVilkår.tsx");
/* harmony import */ var _Vilk_rTabell__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./VilkårTabell */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/GeneriskVilkår/VilkårTabell.tsx");
/* harmony import */ var _hooks_useFeatureToggles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../hooks/useFeatureToggles */ "./src/frontend/hooks/useFeatureToggles.ts");
/* harmony import */ var _typer_behandling__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../typer/behandling */ "./src/frontend/typer/behandling.ts");
/* harmony import */ var _typer_featureToggles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../typer/featureToggles */ "./src/frontend/typer/featureToggles.ts");
/* harmony import */ var _typer_person__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../typer/person */ "./src/frontend/typer/person.ts");
/* harmony import */ var _typer_vilk_r__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../../typer/vilkår */ "./src/frontend/typer/vilkår.ts");
/* harmony import */ var _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../context/BehandlingContext */ "./src/frontend/sider/Fagsak/Behandling/context/BehandlingContext.tsx");
/* harmony import */ var _Vilk_rsvurderingContext__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../VilkårsvurderingContext */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/VilkårsvurderingContext.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject,
  _s = __webpack_require__.$Refresh$.signature();
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }














var Container = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    margin-top: var(--ax-space-64);\n\n    &:last-child {\n        margin-bottom: var(--ax-space-20);\n    }\n"])));
_c = Container;
var GeneriskVilkår = function GeneriskVilkår(_ref) {
  _s();
  var person = _ref.person,
    vilkårFraConfig = _ref.vilkårFraConfig,
    vilkårResultater = _ref.vilkårResultater,
    visFeilmeldinger = _ref.visFeilmeldinger,
    generiskVilkårKey = _ref.generiskVilkårKey;
  var toggles = (0,_hooks_useFeatureToggles__WEBPACK_IMPORTED_MODULE_8__.useFeatureToggles)();
  var _useBehandlingContext = (0,_context_BehandlingContext__WEBPACK_IMPORTED_MODULE_13__.useBehandlingContext)(),
    behandling = _useBehandlingContext.behandling,
    vurderErLesevisning = _useBehandlingContext.vurderErLesevisning,
    settÅpenBehandling = _useBehandlingContext.settÅpenBehandling,
    erMigreringsbehandling = _useBehandlingContext.erMigreringsbehandling;
  var erLesevisning = vurderErLesevisning();
  var _useVilkårsvurderingC = (0,_Vilk_rsvurderingContext__WEBPACK_IMPORTED_MODULE_14__["useVilkårsvurderingContext"])(),
    settVilkårSubmit = _useVilkårsvurderingC.settVilkårSubmit,
    postVilkår = _useVilkårsvurderingC.postVilkår,
    vilkårSubmit = _useVilkårsvurderingC.vilkårSubmit;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    visFeilmeldingerForVilkår = _useState2[0],
    settVisFeilmeldingerForVilkår = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    feilmelding = _useState4[0],
    settFeilmelding = _useState4[1];
  var leggTilPeriodeKnappId = generiskVilkårKey + '__legg_til_periode';
  var settFokusPåLeggTilPeriodeKnapp = function settFokusPåLeggTilPeriodeKnapp() {
    var _document$getElementB;
    (_document$getElementB = document.getElementById(leggTilPeriodeKnappId)) === null || _document$getElementB === void 0 || _document$getElementB.focus();
  };
  var håndterNyPeriodeVilkårsvurdering = function håndterNyPeriodeVilkårsvurdering(promise) {
    promise.then(function (oppdatertBehandling) {
      settVisFeilmeldingerForVilkår(false);
      settVilkårSubmit(_Vilk_rsvurderingContext__WEBPACK_IMPORTED_MODULE_14__["VilkårSubmit"].NONE);
      settFeilmelding('');
      if (oppdatertBehandling.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__.RessursStatus.SUKSESS) {
        settÅpenBehandling(oppdatertBehandling);
      } else if (oppdatertBehandling.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__.RessursStatus.FEILET || oppdatertBehandling.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__.RessursStatus.FUNKSJONELL_FEIL || oppdatertBehandling.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__.RessursStatus.IKKE_TILGANG) {
        settFeilmelding(oppdatertBehandling.frontendFeilmelding);
        settVisFeilmeldingerForVilkår(true);
      } else {
        settFeilmelding('En ukjent feil har oppstått, vi har ikke klart å legge til periode.');
        settVisFeilmeldingerForVilkår(true);
      }
    })["catch"](function () {
      settVilkårSubmit(_Vilk_rsvurderingContext__WEBPACK_IMPORTED_MODULE_14__["VilkårSubmit"].NONE);
    });
  };
  var skalViseLeggTilKnapp = function skalViseLeggTilKnapp() {
    if (erLesevisning) {
      return false;
    }
    var uvurdertPeriodePåVilkår = vilkårResultater.find(function (vilkår) {
      return vilkår.verdi.resultat.verdi === _typer_vilk_r__WEBPACK_IMPORTED_MODULE_12__.Resultat.IKKE_VURDERT;
    });
    return uvurdertPeriodePåVilkår === undefined;
  };
  var skalViseFjernUtvidetBarnetrygdKnapp = function skalViseFjernUtvidetBarnetrygdKnapp() {
    if (erLesevisning) {
      return false;
    }
    var utvidetVilkår = vilkårResultater.filter(function (vilkårResultat) {
      return vilkårResultat.verdi.vilkårType === _typer_vilk_r__WEBPACK_IMPORTED_MODULE_12__["VilkårType"].UTVIDET_BARNETRYGD;
    });
    return erMigreringsbehandling && person.type === _typer_person__WEBPACK_IMPORTED_MODULE_11__.PersonType.SØKER && vilkårFraConfig.key === _typer_vilk_r__WEBPACK_IMPORTED_MODULE_12__["VilkårType"].UTVIDET_BARNETRYGD && utvidetVilkår.length !== 0;
  };
  var skalViseLyspære = toggles[_typer_featureToggles__WEBPACK_IMPORTED_MODULE_10__.FeatureToggle.skalViseVarsellampeForManueltLagtTilBarn] && behandling.steg == _typer_behandling__WEBPACK_IMPORTED_MODULE_9__.BehandlingSteg.VILKÅRSVURDERING && vilkårResultater.some(function (vilkår) {
    return !!vilkår.verdi.begrunnelseForManuellKontroll;
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Container, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Fieldset, {
    error: visFeilmeldingerForVilkår ? feilmelding : undefined,
    legend: vilkårFraConfig.tittel,
    hideLegend: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.HStack, {
    gap: "space-16",
    align: "center"
  }, skalViseLyspære && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__.LightBulbFillIcon, {
    fontSize: "1.5rem",
    color: "var(--ax-warning-500)"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Heading, {
    size: "medium",
    level: "3"
  }, vilkårFraConfig.tittel)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Vilk_rTabell__WEBPACK_IMPORTED_MODULE_7__["default"], {
    person: person,
    vilkårFraConfig: vilkårFraConfig,
    vilkårResultater: vilkårResultater,
    visFeilmeldinger: visFeilmeldinger,
    settFokusPåKnapp: settFokusPåLeggTilPeriodeKnapp
  }), skalViseLeggTilKnapp() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Box, {
    marginBlock: 'space-20 space-0'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Button, {
    onClick: function onClick() {
      var promise = postVilkår(person.personIdent, vilkårFraConfig.key);
      håndterNyPeriodeVilkårsvurdering(promise);
    },
    id: leggTilPeriodeKnappId,
    loading: vilkårSubmit === _Vilk_rsvurderingContext__WEBPACK_IMPORTED_MODULE_14__["VilkårSubmit"].POST,
    disabled: vilkårSubmit === _Vilk_rsvurderingContext__WEBPACK_IMPORTED_MODULE_14__["VilkårSubmit"].POST,
    variant: "tertiary",
    size: "medium",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__.PlusCircleIcon, null)
  }, "Legg til periode")), skalViseFjernUtvidetBarnetrygdKnapp() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_FjernUtvidetBarnetrygdVilk_r__WEBPACK_IMPORTED_MODULE_6__["default"], {
    personIdent: person.personIdent,
    slettVilkårId: generiskVilkårKey + '__slett-vilkår-utvidet'
  })));
};
_s(GeneriskVilkår, "AJkPv7g+EGdEq9bhoTSvrasK/2k=", false, function () {
  return [_hooks_useFeatureToggles__WEBPACK_IMPORTED_MODULE_8__.useFeatureToggles, _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_13__.useBehandlingContext, _Vilk_rsvurderingContext__WEBPACK_IMPORTED_MODULE_14__["useVilkårsvurderingContext"]];
});
_c2 = GeneriskVilkår;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GeneriskVilkår);
var _c, _c2;
__webpack_require__.$Refresh$.register(_c, "Container");
__webpack_require__.$Refresh$.register(_c2, "GeneriskVilk\xE5r");

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

/***/ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/Skjema/VilkårsvurderingSkjemaNormal.tsx"
/*!*************************************************************************************************************!*\
  !*** ./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/Skjema/VilkårsvurderingSkjemaNormal.tsx ***!
  \*************************************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @navikt/aksel-icons */ "./node_modules/@navikt/aksel-icons/dist/react/esm/index.js");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/familie-typer */ "./node_modules/@navikt/familie-typer/dist/index.js");
/* harmony import */ var _hooks_useFeatureToggles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../hooks/useFeatureToggles */ "./src/frontend/hooks/useFeatureToggles.ts");
/* harmony import */ var _komponenter_PersonInformasjon_PersonInformasjon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../komponenter/PersonInformasjon/PersonInformasjon */ "./src/frontend/komponenter/PersonInformasjon/PersonInformasjon.tsx");
/* harmony import */ var _typer_behandling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../typer/behandling */ "./src/frontend/typer/behandling.ts");
/* harmony import */ var _typer_featureToggles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../typer/featureToggles */ "./src/frontend/typer/featureToggles.ts");
/* harmony import */ var _typer_person__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../typer/person */ "./src/frontend/typer/person.ts");
/* harmony import */ var _typer_vilk_r__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../typer/vilkår */ "./src/frontend/typer/vilkår.ts");
/* harmony import */ var _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../context/BehandlingContext */ "./src/frontend/sider/Fagsak/Behandling/context/BehandlingContext.tsx");
/* harmony import */ var _GeneriskAnnenVurdering_GeneriskAnnenVurdering__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../GeneriskAnnenVurdering/GeneriskAnnenVurdering */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/GeneriskAnnenVurdering/GeneriskAnnenVurdering.tsx");
/* harmony import */ var _GeneriskVilk_r_GeneriskVilk_r__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../GeneriskVilkår/GeneriskVilkår */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/GeneriskVilkår/GeneriskVilkår.tsx");
/* harmony import */ var _Registeropplysninger_Registeropplysninger__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../Registeropplysninger/Registeropplysninger */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/Registeropplysninger/Registeropplysninger.tsx");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../utils */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/utils.ts");
/* harmony import */ var _Vilk_rsvurderingContext__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../VilkårsvurderingContext */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/VilkårsvurderingContext.tsx");
/* harmony import */ var _Vilk_rsvurderingSkjema_module_css__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./VilkårsvurderingSkjema.module.css */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/Skjema/VilkårsvurderingSkjema.module.css");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _s = __webpack_require__.$Refresh$.signature();
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

















var VilkårsvurderingSkjemaNormal = function VilkårsvurderingSkjemaNormal(_ref) {
  _s();
  var visFeilmeldinger = _ref.visFeilmeldinger;
  var toggles = (0,_hooks_useFeatureToggles__WEBPACK_IMPORTED_MODULE_5__.useFeatureToggles)();
  var _useVilkårsvurderingC = (0,_Vilk_rsvurderingContext__WEBPACK_IMPORTED_MODULE_16__["useVilkårsvurderingContext"])(),
    vilkårsvurdering = _useVilkårsvurderingC.vilkårsvurdering,
    settVilkårSubmit = _useVilkårsvurderingC.settVilkårSubmit,
    postVilkår = _useVilkårsvurderingC.postVilkår;
  var _useBehandlingContext = (0,_context_BehandlingContext__WEBPACK_IMPORTED_MODULE_11__.useBehandlingContext)(),
    vurderErLesevisning = _useBehandlingContext.vurderErLesevisning,
    erMigreringsbehandling = _useBehandlingContext.erMigreringsbehandling,
    settÅpenBehandling = _useBehandlingContext.settÅpenBehandling,
    aktivSettPåVent = _useBehandlingContext.aktivSettPåVent,
    behandling = _useBehandlingContext.behandling;
  var erLesevisning = vurderErLesevisning();
  var kanLeggeTilUtvidetVilkår = erMigreringsbehandling || behandling.årsak === _typer_behandling__WEBPACK_IMPORTED_MODULE_7__["BehandlingÅrsak"].KORREKSJON_VEDTAKSBREV || behandling.årsak === _typer_behandling__WEBPACK_IMPORTED_MODULE_7__["BehandlingÅrsak"].TEKNISK_ENDRING || behandling.årsak === _typer_behandling__WEBPACK_IMPORTED_MODULE_7__["BehandlingÅrsak"].KLAGE || behandling.årsak === _typer_behandling__WEBPACK_IMPORTED_MODULE_7__["BehandlingÅrsak"].ENDRE_MIGRERINGSDATO || behandling.årsak === _typer_behandling__WEBPACK_IMPORTED_MODULE_7__["BehandlingÅrsak"].IVERKSETTE_KA_VEDTAK;
  var personHarIkkevurdertVilkår = function personHarIkkevurdertVilkår(personResultat) {
    return personResultat.vilkårResultater.some(function (vilkårResultatFelt) {
      return vilkårResultatFelt.verdi.resultat.verdi === _typer_vilk_r__WEBPACK_IMPORTED_MODULE_10__.Resultat.IKKE_VURDERT;
    });
  };
  var hentEkspantdertePersoner = function hentEkspantdertePersoner() {
    return vilkårsvurdering.reduce(function (personMapEkspandert, personResultat) {
      return _objectSpread(_objectSpread({}, personMapEkspandert), {}, _defineProperty({}, personResultat.personIdent, erLesevisning || personHarIkkevurdertVilkår(personResultat)));
    }, {});
  };
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(hentEkspantdertePersoner()),
    _useState2 = _slicedToArray(_useState, 2),
    personErEkspandert = _useState2[0],
    settPersonErEkspandert = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    settPersonErEkspandert(hentEkspantdertePersoner());
  }, [aktivSettPåVent]);
  var leggTilVilkårUtvidet = function leggTilVilkårUtvidet(personIdent) {
    var promise = postVilkår(personIdent, _typer_vilk_r__WEBPACK_IMPORTED_MODULE_10__["VilkårType"].UTVIDET_BARNETRYGD);
    promise.then(function (oppdatertBehandling) {
      settVilkårSubmit(_Vilk_rsvurderingContext__WEBPACK_IMPORTED_MODULE_16__["VilkårSubmit"].NONE);
      if (oppdatertBehandling.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_4__.RessursStatus.SUKSESS) {
        settÅpenBehandling(oppdatertBehandling);
      }
    });
  };
  var vilkårSomMåKontrolleresPerPerson = Object.entries((0,_utils__WEBPACK_IMPORTED_MODULE_15__["utledVilkårSomMåKontrolleresPerPerson"])(behandling, vilkårsvurdering));
  var skalViseVarselboksForVilkårSomMåKontrolleres = toggles[_typer_featureToggles__WEBPACK_IMPORTED_MODULE_8__.FeatureToggle.skalViseVarsellampeForManueltLagtTilBarn] && vilkårSomMåKontrolleresPerPerson.length > 0 && (behandling.steg == _typer_behandling__WEBPACK_IMPORTED_MODULE_7__.BehandlingSteg.VILKÅRSVURDERING || behandling.steg == _typer_behandling__WEBPACK_IMPORTED_MODULE_7__.BehandlingSteg.BESLUTTE_VEDTAK);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, skalViseVarselboksForVilkårSomMåKontrolleres && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.Alert, {
    variant: "warning",
    contentMaxWidth: false,
    style: {
      width: 'fit-content'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.BodyShort, null, behandling.steg == _typer_behandling__WEBPACK_IMPORTED_MODULE_7__.BehandlingSteg.BESLUTTE_VEDTAK ? 'Automatisk utfylte vilkår som saksbehandler 1 ikke har gjort endringer på:' : 'Vær oppmerksom:'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.List, {
    as: "ul"
  }, vilkårSomMåKontrolleresPerPerson.map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      navn = _ref3[0],
      avvik = _ref3[1];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.List.Item, {
      key: navn
    }, navn, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.List, {
      as: "ul",
      size: "small"
    }, avvik.map(function (avvik) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.List.Item, {
        key: avvik
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.BodyShort, {
        size: "small"
      }, avvik));
    })));
  }))), vilkårsvurdering.map(function (personResultat, index) {
    var andreVurderinger = personResultat.andreVurderinger;
    var harUtvidet = personResultat.vilkårResultater.find(function (vilkårResultat) {
      return vilkårResultat.verdi.vilkårType === _typer_vilk_r__WEBPACK_IMPORTED_MODULE_10__["VilkårType"].UTVIDET_BARNETRYGD;
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      key: "".concat(index, "_").concat(personResultat.person.fødselsdato),
      id: "".concat(index, "_").concat(personResultat.person.fødselsdato)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.HStack, {
      wrap: false,
      justify: 'space-between',
      className: _Vilk_rsvurderingSkjema_module_css__WEBPACK_IMPORTED_MODULE_17__["default"].personLinje
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_komponenter_PersonInformasjon_PersonInformasjon__WEBPACK_IMPORTED_MODULE_6__["default"], {
      person: personResultat.person,
      somOverskrift: true,
      erLesevisning: erLesevisning
    }), !erLesevisning && personErEkspandert[personResultat.personIdent] && personResultat.person.type === _typer_person__WEBPACK_IMPORTED_MODULE_9__.PersonType.SØKER && !harUtvidet && kanLeggeTilUtvidetVilkår && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.Button, {
      variant: 'tertiary',
      id: "".concat(index, "_").concat(personResultat.person.fødselsdato, "__legg-til-vilk\xE5r-utvidet"),
      onClick: function onClick() {
        return leggTilVilkårUtvidet(personResultat.personIdent);
      },
      size: 'small',
      icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_2__.PlusCircleIcon, {
        title: "Legg til vilk\xE5r utvidet barnetrygd"
      })
    }, "Legg til vilk\xE5r utvidet barnetrygd"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.Button, {
      id: "vis-skjul-vilk\xE5rsvurdering-".concat(index, "_").concat(personResultat.person.fødselsdato, "}"),
      variant: "tertiary",
      onClick: function onClick() {
        return settPersonErEkspandert(_objectSpread(_objectSpread({}, personErEkspandert), {}, _defineProperty({}, personResultat.personIdent, !personErEkspandert[personResultat.personIdent])));
      },
      icon: personErEkspandert[personResultat.personIdent] ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_2__.ChevronUpIcon, {
        "aria-hidden": true
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_2__.ChevronDownIcon, {
        "aria-hidden": true
      }),
      iconPosition: "right"
    }, personErEkspandert[personResultat.personIdent] ? 'Skjul vilkårsvurdering' : 'Vis vilkårsvurdering')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react__WEBPACK_IMPORTED_MODULE_1__.Activity, {
      mode: personErEkspandert[personResultat.personIdent] ? 'visible' : 'hidden'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.Box, {
      paddingInline: 'space-56 space-0'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, personResultat.person.registerhistorikk ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Registeropplysninger_Registeropplysninger__WEBPACK_IMPORTED_MODULE_14__["default"], {
      registerHistorikk: personResultat.person.registerhistorikk,
      fødselsdato: personResultat.person.fødselsdato
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.Alert, {
      variant: "warning",
      children: 'Klarte ikke hente registeropplysninger'
    })), Object.values(_typer_vilk_r__WEBPACK_IMPORTED_MODULE_10__["vilkårConfig"]).filter(function (vc) {
      return vc.parterDetteGjelderFor.includes(personResultat.person.type);
    }).map(function (vc) {
      var vilkårResultater = personResultat.vilkårResultater.filter(function (vilkårResultat) {
        return vilkårResultat.verdi.vilkårType === vc.key;
      });
      if (vilkårResultater.length === 0 && personResultat.person.type === _typer_person__WEBPACK_IMPORTED_MODULE_9__.PersonType.SØKER) return undefined;
      // For barn ønsker vi alltid å rendre alle vilkår slik at man evt kan legge til tom periode
      else return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_GeneriskVilk_r_GeneriskVilk_r__WEBPACK_IMPORTED_MODULE_13__["default"], {
        key: "".concat(index, "_").concat(personResultat.person.fødselsdato, "_").concat(vc.key),
        generiskVilkårKey: "".concat(index, "_").concat(personResultat.person.fødselsdato, "_").concat(vc.key),
        person: personResultat.person,
        vilkårResultater: vilkårResultater,
        vilkårFraConfig: vc,
        visFeilmeldinger: visFeilmeldinger
      });
    }), andreVurderinger.length > 0 && Object.values(_typer_vilk_r__WEBPACK_IMPORTED_MODULE_10__.annenVurderingConfig).filter(function (annenVurderingConfig) {
      return annenVurderingConfig.parterDetteGjelderFor.includes(personResultat.person.type);
    }).map(function (annenVurderingConfig) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_GeneriskAnnenVurdering_GeneriskAnnenVurdering__WEBPACK_IMPORTED_MODULE_12__["default"], {
        key: "".concat(index, "_").concat(personResultat.person.fødselsdato, "_").concat(annenVurderingConfig.key),
        person: personResultat.person,
        andreVurderinger: personResultat.andreVurderinger,
        annenVurderingConfig: annenVurderingConfig,
        visFeilmeldinger: visFeilmeldinger
      });
    }))));
  }));
};
_s(VilkårsvurderingSkjemaNormal, "iwrM1pmeWb+fagJZXxTyze0hHD0=", false, function () {
  return [_hooks_useFeatureToggles__WEBPACK_IMPORTED_MODULE_5__.useFeatureToggles, _Vilk_rsvurderingContext__WEBPACK_IMPORTED_MODULE_16__["useVilkårsvurderingContext"], _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_11__.useBehandlingContext];
});
_c = VilkårsvurderingSkjemaNormal;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VilkårsvurderingSkjemaNormal);
var _c;
__webpack_require__.$Refresh$.register(_c, "Vilk\xE5rsvurderingSkjemaNormal");

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

/***/ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/Vilkårsvurdering.tsx"
/*!******************************************************************************************!*\
  !*** ./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/Vilkårsvurdering.tsx ***!
  \******************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vilkårsvurdering": () => (/* binding */ Vilkårsvurdering)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/familie-typer */ "./node_modules/@navikt/familie-typer/dist/index.js");
/* harmony import */ var _FyllUtVilk_rsvurderingITestmilj_Knapp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FyllUtVilkårsvurderingITestmiljøKnapp */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/FyllUtVilkårsvurderingITestmiljøKnapp.tsx");
/* harmony import */ var _GeneriskAnnenVurdering_AnnenVurderingTabell__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GeneriskAnnenVurdering/AnnenVurderingTabell */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/GeneriskAnnenVurdering/AnnenVurderingTabell.tsx");
/* harmony import */ var _GeneriskVilk_r_Vilk_rTabell__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./GeneriskVilkår/VilkårTabell */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/GeneriskVilkår/VilkårTabell.tsx");
/* harmony import */ var _OppdaterRegisteropplysninger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./OppdaterRegisteropplysninger */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/OppdaterRegisteropplysninger.tsx");
/* harmony import */ var _Skjema_Vilk_rsvurderingSkjema__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Skjema/VilkårsvurderingSkjema */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/Skjema/VilkårsvurderingSkjema.tsx");
/* harmony import */ var _T_mPersonopplysningerCacheITestmilj_Knapp__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./TømPersonopplysningerCacheITestmiljøKnapp */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/TømPersonopplysningerCacheITestmiljøKnapp.tsx");
/* harmony import */ var _Varsel_ManglendeFinnmarkmerkingVarsel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Varsel/ManglendeFinnmarkmerkingVarsel */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/Varsel/ManglendeFinnmarkmerkingVarsel.tsx");
/* harmony import */ var _Vilk_rsvurdering_module_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Vilkårsvurdering.module.css */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/Vilkårsvurdering.module.css");
/* harmony import */ var _Vilk_rsvurderingContext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./VilkårsvurderingContext */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/VilkårsvurderingContext.tsx");
/* harmony import */ var _hooks_useFeatureToggles__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../hooks/useFeatureToggles */ "./src/frontend/hooks/useFeatureToggles.ts");
/* harmony import */ var _typer_behandling__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../typer/behandling */ "./src/frontend/typer/behandling.ts");
/* harmony import */ var _typer_featureToggles__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../typer/featureToggles */ "./src/frontend/typer/featureToggles.ts");
/* harmony import */ var _typer_vilk_r__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../../typer/vilkår */ "./src/frontend/typer/vilkår.ts");
/* harmony import */ var _utils_dato__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../../utils/dato */ "./src/frontend/utils/dato/index.ts");
/* harmony import */ var _utils_milj___WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../../utils/miljø */ "./src/frontend/utils/miljø.ts");
/* harmony import */ var _utils_ressursUtils__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../../utils/ressursUtils */ "./src/frontend/utils/ressursUtils.ts");
/* harmony import */ var _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../context/BehandlingContext */ "./src/frontend/sider/Fagsak/Behandling/context/BehandlingContext.tsx");
/* harmony import */ var _Skjemasteg__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../Skjemasteg */ "./src/frontend/sider/Fagsak/Behandling/Sider/Skjemasteg.tsx");
/* harmony import */ var _Varsel_ManglendeSvalbardmerkingVarsel__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./Varsel/ManglendeSvalbardmerkingVarsel */ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/Varsel/ManglendeSvalbardmerkingVarsel.tsx");
/* harmony import */ var _FagsakContext__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../FagsakContext */ "./src/frontend/sider/Fagsak/FagsakContext.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _s = __webpack_require__.$Refresh$.signature();
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
























function Vilkårsvurdering() {
  _s();
  var _behandling$søknadsgr, _behandling$søknadsgr2;
  var toggles = (0,_hooks_useFeatureToggles__WEBPACK_IMPORTED_MODULE_14__.useFeatureToggles)();
  var _useFagsakContext = (0,_FagsakContext__WEBPACK_IMPORTED_MODULE_24__.useFagsakContext)(),
    fagsak = _useFagsakContext.fagsak;
  var _useBehandlingContext = (0,_context_BehandlingContext__WEBPACK_IMPORTED_MODULE_21__.useBehandlingContext)(),
    behandling = _useBehandlingContext.behandling,
    vurderErLesevisning = _useBehandlingContext.vurderErLesevisning,
    vilkårsvurderingNesteOnClick = _useBehandlingContext.vilkårsvurderingNesteOnClick,
    behandlingsstegSubmitressurs = _useBehandlingContext.behandlingsstegSubmitressurs;
  var _useVilkårsvurderingC = (0,_Vilk_rsvurderingContext__WEBPACK_IMPORTED_MODULE_13__["useVilkårsvurderingContext"])(),
    erVilkårsvurderingenGyldig = _useVilkårsvurderingC.erVilkårsvurderingenGyldig,
    hentVilkårMedFeil = _useVilkårsvurderingC.hentVilkårMedFeil,
    hentAndreVurderingerMedFeil = _useVilkårsvurderingC.hentAndreVurderingerMedFeil,
    vilkårsvurdering = _useVilkårsvurderingC.vilkårsvurdering;
  var erLesevisning = vurderErLesevisning();
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1__.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visFeilmeldinger = _React$useState2[0],
    settVisFeilmeldinger = _React$useState2[1];
  var navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
  var uregistrerteBarn = (_behandling$søknadsgr = (_behandling$søknadsgr2 = behandling.søknadsgrunnlag) === null || _behandling$søknadsgr2 === void 0 ? void 0 : _behandling$søknadsgr2.barnaMedOpplysninger.filter(function (barn) {
    return !barn.erFolkeregistrert;
  })) !== null && _behandling$søknadsgr !== void 0 ? _behandling$søknadsgr : [];
  if (vilkårsvurdering.length === 0) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, "Finner ingen vilk\xE5r p\xE5 behandlingen.");
  }
  var skjemaFeilmelding = (0,_utils_ressursUtils__WEBPACK_IMPORTED_MODULE_20__.hentFrontendFeilmelding)(behandlingsstegSubmitressurs);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Skjemasteg__WEBPACK_IMPORTED_MODULE_22__["default"], {
    skalViseForrigeKnapp: behandling.årsak === _typer_behandling__WEBPACK_IMPORTED_MODULE_15__["BehandlingÅrsak"].SØKNAD || behandling.årsak === _typer_behandling__WEBPACK_IMPORTED_MODULE_15__["BehandlingÅrsak"].FØDSELSHENDELSE,
    tittel: 'Vilkårsvurdering',
    forrigeOnClick: function forrigeOnClick() {
      if (behandling.årsak === _typer_behandling__WEBPACK_IMPORTED_MODULE_15__["BehandlingÅrsak"].SØKNAD) {
        navigate("/fagsak/".concat(fagsak.id, "/").concat(behandling.behandlingId, "/registrer-soknad"));
      } else {
        navigate("/fagsak/".concat(fagsak.id, "/").concat(behandling.behandlingId, "/filtreringsregler"));
      }
    },
    nesteOnClick: function nesteOnClick() {
      if (erLesevisning) {
        navigate("/fagsak/".concat(fagsak.id, "/").concat(behandling.behandlingId, "/tilkjent-ytelse"));
      } else if (erVilkårsvurderingenGyldig()) {
        vilkårsvurderingNesteOnClick();
      } else {
        settVisFeilmeldinger(true);
      }
    },
    maxWidthStyle: '80rem',
    senderInn: behandlingsstegSubmitressurs.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_4__.RessursStatus.HENTER,
    steg: _typer_behandling__WEBPACK_IMPORTED_MODULE_15__.BehandlingSteg.VILKÅRSVURDERING
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (behandling === null || behandling === void 0 ? void 0 : behandling.migreringsdato) !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.Detail, {
    className: _Vilk_rsvurdering_module_css__WEBPACK_IMPORTED_MODULE_12__["default"].hentetLabel,
    children: "Saken ble migrert fra Infotrygd: ".concat((0,_utils_dato__WEBPACK_IMPORTED_MODULE_18__.isoStringTilFormatertString)({
      isoString: behandling === null || behandling === void 0 ? void 0 : behandling.migreringsdato,
      tilFormat: _utils_dato__WEBPACK_IMPORTED_MODULE_18__.Datoformat.DATO
    }))
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_OppdaterRegisteropplysninger__WEBPACK_IMPORTED_MODULE_8__.OppdaterRegisteropplysninger, null)), !(0,_utils_milj___WEBPACK_IMPORTED_MODULE_19__.erProd)() && !toggles[_typer_featureToggles__WEBPACK_IMPORTED_MODULE_16__.FeatureToggle.skalSkjuleTestmiljøknapper] && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.HStack, {
    gap: "space-16",
    marginBlock: 'space-32 space-32'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_FyllUtVilk_rsvurderingITestmilj_Knapp__WEBPACK_IMPORTED_MODULE_5__["FyllUtVilkårsvurderingITestmiljøKnapp"], {
    behandlingId: behandling.behandlingId
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_T_mPersonopplysningerCacheITestmilj_Knapp__WEBPACK_IMPORTED_MODULE_10__["TømPersonopplysningerCacheITestmiljøKnapp"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.VStack, {
    gap: "space-40"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Skjema_Vilk_rsvurderingSkjema__WEBPACK_IMPORTED_MODULE_9__["default"], {
    visFeilmeldinger: visFeilmeldinger
  }), uregistrerteBarn.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.Alert, {
    variant: "info"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.BodyShort, null, "Du har registrert f\xF8lgende barn som ikke er registrert i Folkeregisteret:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.List, {
    as: 'ol'
  }, uregistrerteBarn.map(function (uregistrertBarn) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.List.Item, {
      key: "".concat(uregistrertBarn.navn, "_").concat(uregistrertBarn.fødselsdato)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.BodyShort, null, "".concat(uregistrertBarn.navn, " - ").concat((0,_utils_dato__WEBPACK_IMPORTED_MODULE_18__.isoStringTilFormatertString)({
      isoString: uregistrertBarn.fødselsdato,
      tilFormat: _utils_dato__WEBPACK_IMPORTED_MODULE_18__.Datoformat.DATO
    }))));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.BodyShort, null, "Dette vil f\xF8re til avslag for barna i listen.")), (hentVilkårMedFeil().length > 0 || hentAndreVurderingerMedFeil().length > 0) && visFeilmeldinger && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.ErrorSummary, {
    heading: 'For å gå videre må du rette opp følgende:',
    size: "small"
  }, [].concat(_toConsumableArray(hentVilkårMedFeil().map(function (vilkårResultat) {
    return {
      feilmelding: "Et vilk\xE5r av typen '".concat(_typer_vilk_r__WEBPACK_IMPORTED_MODULE_17__["vilkårConfig"][vilkårResultat.vilkårType].tittel, "' er ikke fullstendig"),
      skjemaelementId: (0,_GeneriskVilk_r_Vilk_rTabell__WEBPACK_IMPORTED_MODULE_7__["vilkårFeilmeldingId"])(vilkårResultat)
    };
  })), _toConsumableArray(hentAndreVurderingerMedFeil().map(function (annenVurdering) {
    return {
      feilmelding: "Et vilk\xE5r av typen '".concat(_typer_vilk_r__WEBPACK_IMPORTED_MODULE_17__.annenVurderingConfig[annenVurdering.type].tittel, "' er ikke fullstendig"),
      skjemaelementId: (0,_GeneriskAnnenVurdering_AnnenVurderingTabell__WEBPACK_IMPORTED_MODULE_6__.annenVurderingFeilmeldingId)(annenVurdering)
    };
  }))).map(function (item) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.ErrorSummary.Item, {
      href: "#".concat(item.skjemaelementId)
    }, item.feilmelding);
  })), skjemaFeilmelding !== '' && skjemaFeilmelding !== undefined && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.ErrorMessage, null, skjemaFeilmelding), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Varsel_ManglendeSvalbardmerkingVarsel__WEBPACK_IMPORTED_MODULE_23__.ManglendeSvalbardmerkingVarsel, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Varsel_ManglendeFinnmarkmerkingVarsel__WEBPACK_IMPORTED_MODULE_11__.ManglendeFinnmarkmerkingVarsel, null)));
}
_s(Vilkårsvurdering, "KeHojy9ikOjPfLXu7Xy6rpsLGzY=", false, function () {
  return [_hooks_useFeatureToggles__WEBPACK_IMPORTED_MODULE_14__.useFeatureToggles, _FagsakContext__WEBPACK_IMPORTED_MODULE_24__.useFagsakContext, _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_21__.useBehandlingContext, _Vilk_rsvurderingContext__WEBPACK_IMPORTED_MODULE_13__["useVilkårsvurderingContext"], react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate];
});
_c = Vilkårsvurdering;
var _c;
__webpack_require__.$Refresh$.register(_c, "Vilk\xE5rsvurdering");

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

/***/ "./src/frontend/sider/Fagsak/Saksoversikt/FagsakLenkepanel.tsx"
/*!*********************************************************************!*\
  !*** ./src/frontend/sider/Fagsak/Saksoversikt/FagsakLenkepanel.tsx ***!
  \*********************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FagsakLenkepanel: () => (/* binding */ FagsakLenkepanel),
/* harmony export */   SaksoversiktPanelBredde: () => (/* binding */ SaksoversiktPanelBredde)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/ds-tokens/dist/tokens */ "./node_modules/@navikt/ds-tokens/dist/tokens.js");
/* harmony import */ var _typer_behandling__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../typer/behandling */ "./src/frontend/typer/behandling.ts");
/* harmony import */ var _typer_behandlingstema__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../typer/behandlingstema */ "./src/frontend/typer/behandlingstema.ts");
/* harmony import */ var _typer_fagsak__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../typer/fagsak */ "./src/frontend/typer/fagsak.ts");
/* harmony import */ var _utils_fagsak__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../utils/fagsak */ "./src/frontend/utils/fagsak.ts");
/* harmony import */ var _FagsakContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../FagsakContext */ "./src/frontend/sider/Fagsak/FagsakContext.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject,
  _templateObject2,
  _templateObject3,
  _s = __webpack_require__.$Refresh$.signature(),
  _s2 = __webpack_require__.$Refresh$.signature(),
  _s3 = __webpack_require__.$Refresh$.signature();
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }










var SaksoversiktPanelBredde = "calc(10 * var(--ax-space-64))";
var HeaderTekst = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.BodyShort)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    font-size: ", ";\n"])), _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.FontSizeXlarge);
_c = HeaderTekst;
var BodyTekst = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.BodyShort)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    font-size: ", ";\n"])), _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.FontSizeHeadingMedium);
_c2 = BodyTekst;
var StyledAlert = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Alert)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    width: ", ";\n    margin-top: var(--ax-space-64);\n"])), SaksoversiktPanelBredde);
_c3 = StyledAlert;
function Innholdstabell() {
  _s();
  var _useFagsakContext = (0,_FagsakContext__WEBPACK_IMPORTED_MODULE_10__.useFagsakContext)(),
    fagsak = _useFagsakContext.fagsak;
  var behandlingstema = fagsak.løpendeKategori && fagsak.løpendeUnderkategori && (0,_typer_behandlingstema__WEBPACK_IMPORTED_MODULE_7__.tilBehandlingstema)(fagsak.løpendeKategori, fagsak.løpendeUnderkategori);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.HStack, {
    gap: "space-80"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HeaderTekst, {
    spacing: true
  }, "Behandlingstema"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(BodyTekst, {
    weight: "semibold"
  }, behandlingstema ? behandlingstema.navn : '-')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HeaderTekst, {
    spacing: true
  }, "Status"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(BodyTekst, {
    weight: "semibold"
  }, (0,_utils_fagsak__WEBPACK_IMPORTED_MODULE_9__.hentFagsakStatusVisning)(fagsak))));
}
_s(Innholdstabell, "NmVWkbSz3QO78WcsHKyBp5UQ2ig=", false, function () {
  return [_FagsakContext__WEBPACK_IMPORTED_MODULE_10__.useFagsakContext];
});
_c4 = Innholdstabell;
function FagsakTypeLabel() {
  _s2();
  var _useFagsakContext2 = (0,_FagsakContext__WEBPACK_IMPORTED_MODULE_10__.useFagsakContext)(),
    fagsak = _useFagsakContext2.fagsak;
  switch (fagsak.fagsakType) {
    case _typer_fagsak__WEBPACK_IMPORTED_MODULE_8__.FagsakType.INSTITUSJON:
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(StyledAlert, {
        variant: 'info'
      }, "Dette er en institusjonssak");
    case _typer_fagsak__WEBPACK_IMPORTED_MODULE_8__.FagsakType.BARN_ENSLIG_MINDREÅRIG:
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(StyledAlert, {
        variant: 'info'
      }, "Dette er en enslig mindre\xE5rig-sak");
    case _typer_fagsak__WEBPACK_IMPORTED_MODULE_8__.FagsakType.SKJERMET_BARN:
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(StyledAlert, {
        variant: 'info'
      }, "Dette er en skjermet barn-sak");
    default:
      return null;
  }
}
_s2(FagsakTypeLabel, "NmVWkbSz3QO78WcsHKyBp5UQ2ig=", false, function () {
  return [_FagsakContext__WEBPACK_IMPORTED_MODULE_10__.useFagsakContext];
});
_c5 = FagsakTypeLabel;
var genererHoverTekst = function genererHoverTekst(behandling) {
  return behandling.status === _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingStatus.AVSLUTTET ? 'Gå til gjeldende vedtak' : 'Gå til åpen behandling';
};
function FagsakLenkepanel() {
  _s3();
  var _useFagsakContext3 = (0,_FagsakContext__WEBPACK_IMPORTED_MODULE_10__.useFagsakContext)(),
    fagsak = _useFagsakContext3.fagsak;
  var aktivBehandling = (0,_utils_fagsak__WEBPACK_IMPORTED_MODULE_9__["hentAktivBehandlingPåMinimalFagsak"])(fagsak);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, aktivBehandling ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Box, {
    width: SaksoversiktPanelBredde,
    marginBlock: 'space-32 space-0'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.LinkCard, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.LinkCard.Title, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.LinkCard.Anchor, {
    asChild: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Link, {
    as: react_router__WEBPACK_IMPORTED_MODULE_2__.Link,
    to: "/fagsak/".concat(fagsak.id, "/").concat(aktivBehandling.behandlingId)
  }, genererHoverTekst(aktivBehandling)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.LinkCard.Description, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.VStack, {
    paddingBlock: 'space-16 space-0'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Innholdstabell, null))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Box, {
    width: SaksoversiktPanelBredde,
    marginBlock: 'space-32 space-0',
    borderColor: "neutral-strong",
    borderWidth: "1",
    borderRadius: "2",
    padding: "space-32"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Innholdstabell, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(FagsakTypeLabel, null));
}
_s3(FagsakLenkepanel, "NmVWkbSz3QO78WcsHKyBp5UQ2ig=", false, function () {
  return [_FagsakContext__WEBPACK_IMPORTED_MODULE_10__.useFagsakContext];
});
_c6 = FagsakLenkepanel;
var _c, _c2, _c3, _c4, _c5, _c6;
__webpack_require__.$Refresh$.register(_c, "HeaderTekst");
__webpack_require__.$Refresh$.register(_c2, "BodyTekst");
__webpack_require__.$Refresh$.register(_c3, "StyledAlert");
__webpack_require__.$Refresh$.register(_c4, "Innholdstabell");
__webpack_require__.$Refresh$.register(_c5, "FagsakTypeLabel");
__webpack_require__.$Refresh$.register(_c6, "FagsakLenkepanel");

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
/******/ 	__webpack_require__.h = () => ("1e09daf017577d231e75")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVcsc0NBQUEsQ0FBQUQsR0FBQTtBQUFBQyxzQ0FBQSxDQUFBNmMsR0FBQSxzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDdEVoQyxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL2lrb25lci9TdGF0dXNJa29uLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9GYWdzYWsvQmVoYW5kbGluZy9Iw7h5cmVtZW55L0JlaGFuZGxpbmdza29ydC9CZWhhbmRsaW5nc2tvcnQudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL0ZhZ3Nhay9CZWhhbmRsaW5nL1NpZGVyL0JlaGFuZGxpbmdzcmVzdWx0YXQvQmVoYW5kbGluZ3NyZXN1bHRhdC50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvRmFnc2FrL0JlaGFuZGxpbmcvU2lkZXIvQmVoYW5kbGluZ3NyZXN1bHRhdC9Fw7hzL0tvbXBldGFuc2UvdXNlS29tcGV0YW5zZS50cyIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9GYWdzYWsvQmVoYW5kbGluZy9TaWRlci9TaW11bGVyaW5nL1NpbXVsZXJpbmdQYW5lbC50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvRmFnc2FrL0JlaGFuZGxpbmcvU2lkZXIvVmlsa8OlcnN2dXJkZXJpbmcvR2VuZXJpc2tWaWxrw6VyL0dlbmVyaXNrVmlsa8Olci50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvRmFnc2FrL0JlaGFuZGxpbmcvU2lkZXIvVmlsa8OlcnN2dXJkZXJpbmcvU2tqZW1hL1ZpbGvDpXJzdnVyZGVyaW5nU2tqZW1hTm9ybWFsLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9GYWdzYWsvQmVoYW5kbGluZy9TaWRlci9WaWxrw6Vyc3Z1cmRlcmluZy9WaWxrw6Vyc3Z1cmRlcmluZy50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvRmFnc2FrL1Nha3NvdmVyc2lrdC9GYWdzYWtMZW5rZXBhbmVsLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHtcbiAgICBDaGVja21hcmtDaXJjbGVGaWxsSWNvbixcbiAgICBFeGNsYW1hdGlvbm1hcmtUcmlhbmdsZUZpbGxJY29uLFxuICAgIEluZm9ybWF0aW9uU3F1YXJlRmlsbEljb24sXG4gICAgWE1hcmtPY3RhZ29uRmlsbEljb24sXG59IGZyb20gJ0BuYXZpa3QvYWtzZWwtaWNvbnMnO1xuXG5pbnRlcmZhY2UgSVByb3BzIHtcbiAgICBzdGF0dXM6IFN0YXR1cztcbiAgICB0aXRsZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGVudW0gU3RhdHVzIHtcbiAgICBBRFZBUlNFTCxcbiAgICBGRUlMLFxuICAgIE9LLFxuICAgIElORk8sXG59XG5cbmNvbnN0IE9rSWtvbiA9IHN0eWxlZChDaGVja21hcmtDaXJjbGVGaWxsSWNvbilgXG4gICAgY29sb3I6IHZhcigtLWF4LWJvcmRlci1zdWNjZXNzKTtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICBtaW4td2lkdGg6IDEuNXJlbTtcbmA7XG5cbmNvbnN0IEZlaWxJa29uID0gc3R5bGVkKFhNYXJrT2N0YWdvbkZpbGxJY29uKWBcbiAgICBjb2xvcjogdmFyKC0tYXgtYm9yZGVyLWRhbmdlcik7XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgbWluLXdpZHRoOiAxLjVyZW07XG5gO1xuXG5jb25zdCBBZHZhcnNlbElrb24gPSBzdHlsZWQoRXhjbGFtYXRpb25tYXJrVHJpYW5nbGVGaWxsSWNvbilgXG4gICAgY29sb3I6IHZhcigtLWF4LWJvcmRlci13YXJuaW5nKTtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICBtaW4td2lkdGg6IDEuNXJlbTtcbmA7XG5cbmNvbnN0IEluZm9Ja29uID0gc3R5bGVkKEluZm9ybWF0aW9uU3F1YXJlRmlsbEljb24pYFxuICAgIGNvbG9yOiB2YXIoLS1heC1ib3JkZXItaW5mbyk7XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgbWluLXdpZHRoOiAxLjVyZW07XG5gO1xuXG5jb25zdCBTdGF0dXNJa29uOiBSZWFjdC5GQzxJUHJvcHM+ID0gKHsgc3RhdHVzLCB0aXRsZSB9KSA9PiB7XG4gICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgY2FzZSBTdGF0dXMuT0s6XG4gICAgICAgICAgICByZXR1cm4gPE9rSWtvbiB0aXRsZT17dGl0bGV9IC8+O1xuICAgICAgICBjYXNlIFN0YXR1cy5GRUlMOlxuICAgICAgICAgICAgcmV0dXJuIDxGZWlsSWtvbiB0aXRsZT17dGl0bGV9IC8+O1xuICAgICAgICBjYXNlIFN0YXR1cy5BRFZBUlNFTDpcbiAgICAgICAgICAgIHJldHVybiA8QWR2YXJzZWxJa29uIHRpdGxlPXt0aXRsZX0gLz47XG4gICAgICAgIGNhc2UgU3RhdHVzLklORk86XG4gICAgICAgICAgICByZXR1cm4gPEluZm9Ja29uIHRpdGxlPXt0aXRsZX0gLz47XG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IFN0YXR1c0lrb247XG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBCb2R5U2hvcnQsIEJveCwgSGVhZGluZywgVlN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgeyBUZXh0RGFuZ2VyU3VidGxlLCBUZXh0SW5mb1N1YnRsZSwgVGV4dE5ldXRyYWwsIFRleHRTdWNjZXNzU3VidGxlIH0gZnJvbSAnQG5hdmlrdC9kcy10b2tlbnMvZGlzdC90b2tlbnMnO1xuaW1wb3J0IHR5cGUgeyBBa3NlbENvbG9yZWRCb3JkZXJUb2tlbiB9IGZyb20gJ0BuYXZpa3QvZHMtdG9rZW5zL3R5cGVzJztcblxuaW1wb3J0IEluZm9ybWFzam9uc2JvbGsgZnJvbSAnLi9JbmZvcm1hc2pvbnNib2xrJztcbmltcG9ydCB7XG4gICAgQmVoYW5kbGluZ1Jlc3VsdGF0LFxuICAgIGJlaGFuZGxpbmdzcmVzdWx0YXRlcixcbiAgICBiZWhhbmRsaW5nc3N0YXR1c2VyLFxuICAgIGJlaGFuZGxpbmdzdHlwZXIsXG4gICAgYmVoYW5kbGluZ8OFcnNhayxcbiAgICBlckJlaGFuZGxpbmdIZW5sYWd0LFxufSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlci9iZWhhbmRsaW5nJztcbmltcG9ydCB7IERhdG9mb3JtYXQsIGlzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL2RhdG8nO1xuaW1wb3J0IHsgdXNlRmFnc2FrQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uL0ZhZ3Nha0NvbnRleHQnO1xuaW1wb3J0IHsgc2Frc3R5cGUgfSBmcm9tICcuLi8uLi8uLi9TYWtzb3ZlcnNpa3QvU2Frc292ZXJzaWt0JztcbmltcG9ydCB7IHVzZUJlaGFuZGxpbmdDb250ZXh0IH0gZnJvbSAnLi4vLi4vY29udGV4dC9CZWhhbmRsaW5nQ29udGV4dCc7XG5cbmNvbnN0IGhlbnRSZXN1bHRhdGZhcmdlID0gKGJlaGFuZGxpbmdSZXN1bHRhdDogQmVoYW5kbGluZ1Jlc3VsdGF0KTogQWtzZWxDb2xvcmVkQm9yZGVyVG9rZW4gPT4ge1xuICAgIGlmIChlckJlaGFuZGxpbmdIZW5sYWd0KGJlaGFuZGxpbmdSZXN1bHRhdCkpIHtcbiAgICAgICAgcmV0dXJuICduZXV0cmFsLXN1YnRsZSc7XG4gICAgfVxuXG4gICAgc3dpdGNoIChiZWhhbmRsaW5nUmVzdWx0YXQpIHtcbiAgICAgICAgY2FzZSBCZWhhbmRsaW5nUmVzdWx0YXQuSU5OVklMR0VUOlxuICAgICAgICBjYXNlIEJlaGFuZGxpbmdSZXN1bHRhdC5ERUxWSVNfSU5OVklMR0VUOlxuICAgICAgICBjYXNlIEJlaGFuZGxpbmdSZXN1bHRhdC5GT1JUU0FUVF9JTk5WSUxHRVQ6XG4gICAgICAgICAgICByZXR1cm4gJ3N1Y2Nlc3MnO1xuICAgICAgICBjYXNlIChCZWhhbmRsaW5nUmVzdWx0YXQuRU5EUkVUX1VUQkVUQUxJTkcsIEJlaGFuZGxpbmdSZXN1bHRhdC5FTkRSRVRfVVRFTl9VVEJFVEFMSU5HKTpcbiAgICAgICAgICAgIHJldHVybiAnYWNjZW50JztcbiAgICAgICAgY2FzZSBCZWhhbmRsaW5nUmVzdWx0YXQuQVZTTMOFVFQ6XG4gICAgICAgIGNhc2UgKEJlaGFuZGxpbmdSZXN1bHRhdC5PUFBIw5hSVCwgQmVoYW5kbGluZ1Jlc3VsdGF0LkZPUlRTQVRUX09QUEjDmFJUKTpcbiAgICAgICAgICAgIHJldHVybiAnZGFuZ2VyJztcbiAgICAgICAgY2FzZSBCZWhhbmRsaW5nUmVzdWx0YXQuSUtLRV9WVVJERVJUOlxuICAgICAgICAgICAgcmV0dXJuICduZXV0cmFsLXN1YnRsZSc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gJ25ldXRyYWwnO1xuICAgIH1cbn07XG5cbmNvbnN0IGhlbnRSZXN1bHRhdGZhcmdlVGVrc3QgPSAoYmVoYW5kbGluZ1Jlc3VsdGF0OiBCZWhhbmRsaW5nUmVzdWx0YXQpID0+IHtcbiAgICBpZiAoZXJCZWhhbmRsaW5nSGVubGFndChiZWhhbmRsaW5nUmVzdWx0YXQpKSB7XG4gICAgICAgIHJldHVybiBUZXh0TmV1dHJhbDtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGJlaGFuZGxpbmdSZXN1bHRhdCkge1xuICAgICAgICBjYXNlIEJlaGFuZGxpbmdSZXN1bHRhdC5JTk5WSUxHRVQ6XG4gICAgICAgIGNhc2UgQmVoYW5kbGluZ1Jlc3VsdGF0LkRFTFZJU19JTk5WSUxHRVQ6XG4gICAgICAgIGNhc2UgQmVoYW5kbGluZ1Jlc3VsdGF0LkZPUlRTQVRUX0lOTlZJTEdFVDpcbiAgICAgICAgICAgIHJldHVybiBUZXh0U3VjY2Vzc1N1YnRsZTtcbiAgICAgICAgY2FzZSAoQmVoYW5kbGluZ1Jlc3VsdGF0LkVORFJFVF9VVEJFVEFMSU5HLCBCZWhhbmRsaW5nUmVzdWx0YXQuRU5EUkVUX1VURU5fVVRCRVRBTElORyk6XG4gICAgICAgICAgICByZXR1cm4gVGV4dEluZm9TdWJ0bGU7XG4gICAgICAgIGNhc2UgQmVoYW5kbGluZ1Jlc3VsdGF0LkFWU0zDhVRUOlxuICAgICAgICBjYXNlIChCZWhhbmRsaW5nUmVzdWx0YXQuT1BQSMOYUlQsIEJlaGFuZGxpbmdSZXN1bHRhdC5GT1JUU0FUVF9PUFBIw5hSVCk6XG4gICAgICAgICAgICByZXR1cm4gVGV4dERhbmdlclN1YnRsZTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBUZXh0TmV1dHJhbDtcbiAgICB9XG59O1xuXG5jb25zdCBTdHlsZWRIZWFkaW5nID0gc3R5bGVkKEhlYWRpbmcpYFxuICAgIGZvbnQtc2l6ZTogdmFyKC0tYXgtc3BhY2UtMTYpO1xuYDtcblxuZXhwb3J0IGZ1bmN0aW9uIEJlaGFuZGxpbmdza29ydCgpIHtcbiAgICBjb25zdCB7IGZhZ3NhayB9ID0gdXNlRmFnc2FrQ29udGV4dCgpO1xuICAgIGNvbnN0IHsgYmVoYW5kbGluZyB9ID0gdXNlQmVoYW5kbGluZ0NvbnRleHQoKTtcblxuICAgIGNvbnN0IGJlaGFuZGxpbmdlciA9IGZhZ3Nhay5iZWhhbmRsaW5nZXI7XG5cbiAgICBjb25zdCBhbnRhbGxCZWhhbmRsaW5nZXIgPSBiZWhhbmRsaW5nZXIubGVuZ3RoO1xuICAgIGNvbnN0IGJlaGFuZGxpbmdJbmRleCA9IGJlaGFuZGxpbmdlci5maW5kSW5kZXgoYiA9PiBiLmJlaGFuZGxpbmdJZCA9PT0gYmVoYW5kbGluZy5iZWhhbmRsaW5nSWQpICsgMTtcblxuICAgIGNvbnN0IHRpdHRlbCA9IGAke2JlaGFuZGxpbmdzdHlwZXJbYmVoYW5kbGluZy50eXBlXS5uYXZufSAoJHtiZWhhbmRsaW5nSW5kZXh9LyR7YW50YWxsQmVoYW5kbGluZ2VyfSkgLSAke3Nha3N0eXBlKGJlaGFuZGxpbmcpLnRvTG93ZXJDYXNlKCl9YDtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxCb3hcbiAgICAgICAgICAgIHBhZGRpbmc9XCJzcGFjZS04XCJcbiAgICAgICAgICAgIGJvcmRlckNvbG9yPXtoZW50UmVzdWx0YXRmYXJnZShiZWhhbmRsaW5nLnJlc3VsdGF0KX1cbiAgICAgICAgICAgIGJvcmRlcldpZHRoPVwiMSAxIDEgNVwiXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM9XCI0XCJcbiAgICAgICAgICAgIG1hcmdpbj1cInNwYWNlLThcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8Qm94IGJvcmRlcldpZHRoPVwiMCAwIDEgMFwiIGJvcmRlckNvbG9yPVwibmV1dHJhbC1zdWJ0bGVcIj5cbiAgICAgICAgICAgICAgICA8VlN0YWNrIGdhcD1cInNwYWNlLTRcIiBtYXJnaW5CbG9jaz1cInNwYWNlLTAgc3BhY2UtOFwiPlxuICAgICAgICAgICAgICAgICAgICA8U3R5bGVkSGVhZGluZyBzaXplPXsneHNtYWxsJ30gbGV2ZWw9eycyJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGl0dGVsfVxuICAgICAgICAgICAgICAgICAgICA8L1N0eWxlZEhlYWRpbmc+XG4gICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQ+e2JlaGFuZGxpbmfDhXJzYWtbYmVoYW5kbGluZy7DpXJzYWtdfTwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgIDwvVlN0YWNrPlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8VlN0YWNrIGdhcD1cInNwYWNlLTE2XCIgbWFyZ2luQmxvY2s9XCJzcGFjZS0xNlwiPlxuICAgICAgICAgICAgICAgIDxJbmZvcm1hc2pvbnNib2xrIGxhYmVsPVwiQmVoYW5kbGluZ3NzdGF0dXNcIiB0ZWtzdD17YmVoYW5kbGluZ3NzdGF0dXNlcltiZWhhbmRsaW5nLnN0YXR1c119IC8+XG4gICAgICAgICAgICAgICAgPEluZm9ybWFzam9uc2JvbGtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJSZXN1bHRhdFwiXG4gICAgICAgICAgICAgICAgICAgIHRla3N0PXtiZWhhbmRsaW5nc3Jlc3VsdGF0ZXJbYmVoYW5kbGluZy5yZXN1bHRhdF19XG4gICAgICAgICAgICAgICAgICAgIHRla3N0RmFyZ2U9e2hlbnRSZXN1bHRhdGZhcmdlVGVrc3QoYmVoYW5kbGluZy5yZXN1bHRhdCl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICB7YmVoYW5kbGluZy5zw7hrbmFkTW90dGF0dERhdG8gJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEluZm9ybWFzam9uc2JvbGtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlPDuGtuYWQgbW90dGF0dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVrc3Q9e2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzb1N0cmluZzogYmVoYW5kbGluZy5zw7hrbmFkTW90dGF0dERhdG8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5EQVRPLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPEluZm9ybWFzam9uc2JvbGtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiT3BwcmV0dGV0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRla3N0PXtpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzb1N0cmluZzogYmVoYW5kbGluZy5vcHByZXR0ZXRUaWRzcHVua3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0LkRBVE8sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPEluZm9ybWFzam9uc2JvbGtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiVmVkdGFrc2RhdG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgdGVrc3Q9e2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNvU3RyaW5nOiBiZWhhbmRsaW5nLnZlZHRhaz8udmVkdGFrc2RhdG8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0LkRBVE8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFN0cmluZzogJ0lra2Ugc2F0dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8SW5mb3JtYXNqb25zYm9sa1xuICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIkVuaGV0XCJcbiAgICAgICAgICAgICAgICAgICAgdGVrc3Q9e2JlaGFuZGxpbmcuYXJiZWlkc2ZvcmRlbGluZ1DDpUJlaGFuZGxpbmcuYmVoYW5kbGVuZGVFbmhldElkfVxuICAgICAgICAgICAgICAgICAgICB0ZWtzdEhvdmVyPXtiZWhhbmRsaW5nLmFyYmVpZHNmb3JkZWxpbmdQw6VCZWhhbmRsaW5nLmJlaGFuZGxlbmRlRW5oZXROYXZufVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1ZTdGFjaz5cbiAgICAgICAgPC9Cb3g+XG4gICAgKTtcbn1cbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IFBlbmNpbEljb24gfSBmcm9tICdAbmF2aWt0L2Frc2VsLWljb25zJztcbmltcG9ydCB7IEFsZXJ0LCBCdXR0b24sIEVycm9yTWVzc2FnZSwgRXJyb3JTdW1tYXJ5LCBMYWJlbCB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHsgYnlnZ0RhdGFSZXNzdXJzLCBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcblxuaW1wb3J0IEVuZHJldFV0YmV0YWxpbmdBbmRlbFRhYmVsbCBmcm9tICcuL0VuZHJldFV0YmV0YWxpbmcvRW5kcmV0VXRiZXRhbGluZ0FuZGVsVGFiZWxsJztcbmltcG9ydCBLb21wZXRhbnNlU2tqZW1hIGZyb20gJy4vRcO4cy9Lb21wZXRhbnNlL0tvbXBldGFuc2VTa2plbWEnO1xuaW1wb3J0IHsga29tcGV0YW5zZUZlaWxtZWxkaW5nSWQgfSBmcm9tICcuL0XDuHMvS29tcGV0YW5zZS91c2VLb21wZXRhbnNlUGVyaW9kZVNramVtYSc7XG5pbXBvcnQgeyB1c2VFw7hzIH0gZnJvbSAnLi9Fw7hzL3VzZUXDuHMnO1xuaW1wb3J0IHsgdXRlbmxhbmRza1BlcmlvZGVCZWzDuHBGZWlsbWVsZGluZ0lkIH0gZnJvbSAnLi9Fw7hzL1V0YmV0YWx0QW5uZXRMYW5kL3VzZVV0ZW5sYW5kc2tQZXJpb2RlQmVsw7hwU2tqZW1hJztcbmltcG9ydCBVdGJldGFsdEFubmV0TGFuZCBmcm9tICcuL0XDuHMvVXRiZXRhbHRBbm5ldExhbmQvVXRiZXRhbHRBbm5ldExhbmQnO1xuaW1wb3J0IHsgdXNlT3BwZGF0ZXJWYWx1dGFrdXJzT2dTaW11bGVyaW5nUMOlQmVzbHV0dGVyU3RlZyB9IGZyb20gJy4vRcO4cy9WYWx1dGFrdXJzL3VzZU9wcGRhdGVyVmFsdXRha3Vyc09nU2ltdWxlcmluZ1DDpUJlc2x1dHRlclN0ZWcnO1xuaW1wb3J0IHsgdmFsdXRha3Vyc0ZlaWxtZWxkaW5nSWQgfSBmcm9tICcuL0XDuHMvVmFsdXRha3Vycy91c2VWYWx1dGFrdXJzU2tqZW1hJztcbmltcG9ydCBWYWx1dGFrdXJzZXIgZnJvbSAnLi9Fw7hzL1ZhbHV0YWt1cnMvVmFsdXRha3Vyc2VyJztcbmltcG9ydCBNaWdyZXJpbmdJbmZvYm9rcyBmcm9tICcuL01pZ3JlcmluZ0luZm9ib2tzJztcbmltcG9ydCB7IE9wcHN1bW1lcmluZ3Nib2tzIH0gZnJvbSAnLi9PcHBzdW1tZXJpbmdzYm9rcyc7XG5pbXBvcnQgVGlsa2plbnRZdGVsc2VUaWRzbGluamUgZnJvbSAnLi9UaWxramVudFl0ZWxzZVRpZHNsaW5qZSc7XG5pbXBvcnQgeyB1c2VCZWhhbmRsaW5nc3Jlc3VsdGF0IH0gZnJvbSAnLi91c2VCZWhhbmRsaW5nc3Jlc3VsdGF0JztcbmltcG9ydCB7IHVzZUZhZ3Nha0lkIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vaG9va3MvdXNlRmFnc2FrSWQnO1xuaW1wb3J0IHsgdXNlT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2hvb2tzL3VzZU9wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWwnO1xuaW1wb3J0IHsgdXNlVGlkc2xpbmplQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2tvbXBvbmVudGVyL1RpZHNsaW5qZS9UaWRzbGluamVDb250ZXh0JztcbmltcG9ydCB0eXBlIHsgSUJlaGFuZGxpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlci9iZWhhbmRsaW5nJztcbmltcG9ydCB7IEJlaGFuZGxpbmdTdGVnLCBCZWhhbmRsaW5nc3R5cGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlci9iZWhhbmRsaW5nJztcbmltcG9ydCB7XG4gICAgdHlwZSBJUmVzdEtvbXBldGFuc2UsXG4gICAgdHlwZSBJUmVzdFV0ZW5sYW5kc2tQZXJpb2RlQmVsw7hwLFxuICAgIHR5cGUgSVJlc3RWYWx1dGFrdXJzLFxufSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlci9lw7hzUGVyaW9kZXInO1xuaW1wb3J0IHR5cGUgeyBVdGJldGFsaW5nc3BlcmlvZGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlci92ZWR0YWtzcGVyaW9kZSc7XG5pbXBvcnQgeyBwZXJpb2RlT3ZlcmxhcHBlck1lZFZhbGd0RGF0byB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL2RhdG8nO1xuaW1wb3J0IHsgZm9ybWF0ZXJJZGVudCwgc2zDpVNhbW1lbkxpc3RlVGlsU3RyZW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvZm9ybWF0dGVyJztcbmltcG9ydCB7IGhlbnRGcm9udGVuZEZlaWxtZWxkaW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvcmVzc3Vyc1V0aWxzJztcbmltcG9ydCB7IHVzZUZhZ3Nha0NvbnRleHQgfSBmcm9tICcuLi8uLi8uLi9GYWdzYWtDb250ZXh0JztcbmltcG9ydCB7IHVzZUJlaGFuZGxpbmdDb250ZXh0IH0gZnJvbSAnLi4vLi4vY29udGV4dC9CZWhhbmRsaW5nQ29udGV4dCc7XG5pbXBvcnQgU2tqZW1hc3RlZyBmcm9tICcuLi9Ta2plbWFzdGVnJztcblxuY29uc3QgRW5kcmV0VXRiZXRhbGluZ0FuZGVsID0gc3R5bGVkLmRpdmBcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbmA7XG5cbmNvbnN0IFN0eWxlZEVkaXRJa29uID0gc3R5bGVkKFBlbmNpbEljb24pYFxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuYDtcblxuY29uc3QgU3R5bGVkQWxlcnQgPSBzdHlsZWQoQWxlcnQpYFxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG5gO1xuXG5jb25zdCBTdHlsZWRFcnJvclN1bW1hcnkgPSBzdHlsZWQoRXJyb3JTdW1tYXJ5KWBcbiAgICBtYXJnaW4tdG9wOiA1cmVtO1xuYDtcblxuaW50ZXJmYWNlIElCZWhhbmRsaW5nc3Jlc3VsdGF0UHJvcHMge1xuICAgIMOlcGVuQmVoYW5kbGluZzogSUJlaGFuZGxpbmc7XG59XG5cbmNvbnN0IEJlaGFuZGxpbmdzcmVzdWx0YXQ6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PElCZWhhbmRsaW5nc3Jlc3VsdGF0UHJvcHM+ID0gKHsgw6VwZW5CZWhhbmRsaW5nIH0pID0+IHtcbiAgICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gICAgY29uc3QgZmFnc2FrSWQgPSB1c2VGYWdzYWtJZCgpO1xuICAgIGNvbnN0IHsgZmFnc2FrIH0gPSB1c2VGYWdzYWtDb250ZXh0KCk7XG4gICAgY29uc3QgeyBzZXR0w4VwZW5CZWhhbmRsaW5nIH0gPSB1c2VCZWhhbmRsaW5nQ29udGV4dCgpO1xuXG4gICAgY29uc3Qge1xuICAgICAgICB2aXNGZWlsbWVsZGluZ2VyLFxuICAgICAgICBzZXR0VmlzRmVpbG1lbGRpbmdlcixcbiAgICAgICAgaGVudFBlcnNvbmVyTWVkVWd5bGRpZ0V0dGVyYmV0YWxpbmdzcGVyaW9kZSxcbiAgICAgICAgcGVyc29uZXJNZWRVZ3lsZGlnRXR0ZXJiZXRhbGluZ3NwZXJpb2RlLFxuICAgIH0gPSB1c2VCZWhhbmRsaW5nc3Jlc3VsdGF0KMOlcGVuQmVoYW5kbGluZyk7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIG11dGF0ZTogb3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbCxcbiAgICAgICAgaXNQZW5kaW5nOiBpc09wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxQZW5kaW5nLFxuICAgICAgICBpc0Vycm9yOiBpc09wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxFcnJvcixcbiAgICAgICAgZXJyb3I6IG9wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxFcnJvcixcbiAgICB9ID0gdXNlT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbCh7XG4gICAgICAgIG9uU3VjY2VzczogKGJlaGFuZGxpbmc6IElCZWhhbmRsaW5nKSA9PiBzZXR0w4VwZW5CZWhhbmRsaW5nKGJ5Z2dEYXRhUmVzc3VycyhiZWhhbmRsaW5nKSksXG4gICAgfSk7XG5cbiAgICBjb25zdCB7IGFrdGl2RXRpa2V0dCwgZmlsdGVyT2dTb3J0ZXJBbmRlbFBlcnNvbmVySUdydW5ubGFnLCBmaWx0ZXJPZ1NvcnRlckdydW5ubGFnUGVyc29uZXJNZWRBbmRlbGVyIH0gPVxuICAgICAgICB1c2VUaWRzbGluamVDb250ZXh0KCk7XG5cbiAgICB1c2VPcHBkYXRlclZhbHV0YWt1cnNPZ1NpbXVsZXJpbmdQw6VCZXNsdXR0ZXJTdGVnKCk7XG5cbiAgICBjb25zdCB7IHZ1cmRlckVyTGVzZXZpc25pbmcsIGJlaGFuZGxpbmdyZXN1bHRhdE5lc3RlT25DbGljaywgYmVoYW5kbGluZ3NzdGVnU3VibWl0cmVzc3VycyB9ID1cbiAgICAgICAgdXNlQmVoYW5kbGluZ0NvbnRleHQoKTtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgZXJFw7hzSW5mb3JtYXNqb25HeWxkaWcsXG4gICAgICAgIGtvbXBldGFuc2VyLFxuICAgICAgICBoZW50S29tcGV0YW5zZXJNZWRGZWlsLFxuICAgICAgICB1dGJldGFsdEFubmV0TGFuZEJlbMO4cCxcbiAgICAgICAgZXJVdGJldGFsdEFubmV0TGFuZEJlbMO4cEd5bGRpZ2UsXG4gICAgICAgIGhlbnRVdGJldGFsdEFubmV0TGFuZEJlbMO4cE1lZEZlaWwsXG4gICAgICAgIHZhbHV0YWt1cnNlcixcbiAgICAgICAgZXJWYWx1dGFrdXJzZXJHeWxkaWdlLFxuICAgICAgICBoZW50VmFsdXRha3Vyc2VyTWVkRmVpbCxcbiAgICB9ID0gdXNlRcO4cyjDpXBlbkJlaGFuZGxpbmcpO1xuXG4gICAgY29uc3QgZXJMZXNldmlzbmluZyA9IHZ1cmRlckVyTGVzZXZpc25pbmcoKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGhlbnRQZXJzb25lck1lZFVneWxkaWdFdHRlcmJldGFsaW5nc3BlcmlvZGUoKTtcbiAgICB9LCBbw6VwZW5CZWhhbmRsaW5nXSk7XG5cbiAgICBjb25zdCBmaW5uVXRiZXRhbGluZ3NwZXJpb2RlRm9yQWt0aXZFdGlrZXR0ID0gKFxuICAgICAgICB1dGJldGFsaW5nc3BlcmlvZGVyOiBVdGJldGFsaW5nc3BlcmlvZGVbXVxuICAgICk6IFV0YmV0YWxpbmdzcGVyaW9kZSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICAgIHJldHVybiBha3RpdkV0aWtldHRcbiAgICAgICAgICAgID8gdXRiZXRhbGluZ3NwZXJpb2Rlci5maW5kKCh1dGJldGFsaW5nc3BlcmlvZGU6IFV0YmV0YWxpbmdzcGVyaW9kZSkgPT5cbiAgICAgICAgICAgICAgICAgIHBlcmlvZGVPdmVybGFwcGVyTWVkVmFsZ3REYXRvKFxuICAgICAgICAgICAgICAgICAgICAgIHV0YmV0YWxpbmdzcGVyaW9kZS5wZXJpb2RlRm9tLFxuICAgICAgICAgICAgICAgICAgICAgIHV0YmV0YWxpbmdzcGVyaW9kZS5wZXJpb2RlVG9tLFxuICAgICAgICAgICAgICAgICAgICAgIGFrdGl2RXRpa2V0dC5kYXRlXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH07XG5cbiAgICBjb25zdCBncnVubmxhZ1BlcnNvbmVyID0gZmlsdGVyT2dTb3J0ZXJHcnVubmxhZ1BlcnNvbmVyTWVkQW5kZWxlcihcbiAgICAgICAgw6VwZW5CZWhhbmRsaW5nLnBlcnNvbmVyLFxuICAgICAgICDDpXBlbkJlaGFuZGxpbmcucGVyc29uZXJNZWRBbmRlbGVyVGlsa2plbnRZdGVsc2VcbiAgICApO1xuXG4gICAgY29uc3QgdGlkc2xpbmplUGVyc29uZXIgPSBmaWx0ZXJPZ1NvcnRlckFuZGVsUGVyc29uZXJJR3J1bm5sYWcoXG4gICAgICAgIGdydW5ubGFnUGVyc29uZXIsXG4gICAgICAgIMOlcGVuQmVoYW5kbGluZy5wZXJzb25lck1lZEFuZGVsZXJUaWxramVudFl0ZWxzZVxuICAgICk7XG5cbiAgICBjb25zdCBlck1pZ3JlcmluZ0ZyYUluZm90cnlnZCA9IMOlcGVuQmVoYW5kbGluZy50eXBlID09PSBCZWhhbmRsaW5nc3R5cGUuTUlHUkVSSU5HX0ZSQV9JTkZPVFJZR0Q7XG5cbiAgICBjb25zdCBoYXJLb21wZXRhbnNlciA9IMOlcGVuQmVoYW5kbGluZy5rb21wZXRhbnNlcj8ubGVuZ3RoID4gMDtcbiAgICBjb25zdCBoYXJVdGVubGFuZHNrZUJlbMO4cGVyID0gw6VwZW5CZWhhbmRsaW5nLnV0ZW5sYW5kc2tlUGVyaW9kZWJlbMO4cD8ubGVuZ3RoID4gMDtcbiAgICBjb25zdCBoYXJWYWx1dGFrdXJzZXIgPSDDpXBlbkJlaGFuZGxpbmcudXRlbmxhbmRza2VQZXJpb2RlYmVsw7hwPy5sZW5ndGggPiAwO1xuXG4gICAgY29uc3QgaGFyRcO4cyA9IGhhcktvbXBldGFuc2VyIHx8IGhhclV0ZW5sYW5kc2tlQmVsw7hwZXIgfHwgaGFyVmFsdXRha3Vyc2VyO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPFNramVtYXN0ZWdcbiAgICAgICAgICAgIHNlbmRlcklubj17YmVoYW5kbGluZ3NzdGVnU3VibWl0cmVzc3Vycy5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuSEVOVEVSfVxuICAgICAgICAgICAgdGl0dGVsPVwiQmVoYW5kbGluZ3NyZXN1bHRhdFwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJiZWhhbmRsaW5nc3Jlc3VsdGF0XCJcbiAgICAgICAgICAgIGZvcnJpZ2VPbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZShgL2ZhZ3Nhay8ke2ZhZ3Nha0lkfS8ke8OlcGVuQmVoYW5kbGluZy5iZWhhbmRsaW5nSWR9L3ZpbGthYXJzdnVyZGVyaW5nYCl9XG4gICAgICAgICAgICBuZXN0ZU9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJMZXNldmlzbmluZykge1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZShgL2ZhZ3Nhay8ke2ZhZ3Nha0lkfS8ke8OlcGVuQmVoYW5kbGluZy5iZWhhbmRsaW5nSWR9L3NpbXVsZXJpbmdgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhhckXDuHMgJiYgIWVyRcO4c0luZm9ybWFzam9uR3lsZGlnKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dFZpc0ZlaWxtZWxkaW5nZXIodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYmVoYW5kbGluZ3Jlc3VsdGF0TmVzdGVPbkNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG1heFdpZHRoU3R5bGU9eyc4MHJlbSd9XG4gICAgICAgICAgICBmZWlsbWVsZGluZz17aGVudEZyb250ZW5kRmVpbG1lbGRpbmcoYmVoYW5kbGluZ3NzdGVnU3VibWl0cmVzc3Vycyl9XG4gICAgICAgICAgICBzdGVnPXtCZWhhbmRsaW5nU3RlZy5CRUhBTkRMSU5HU1JFU1VMVEFUfVxuICAgICAgICA+XG4gICAgICAgICAgICB7cGVyc29uZXJNZWRVZ3lsZGlnRXR0ZXJiZXRhbGluZ3NwZXJpb2RlLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxTdHlsZWRBbGVydCB2YXJpYW50PXsnd2FybmluZyd9PlxuICAgICAgICAgICAgICAgICAgICBEdSBoYXIgcGVyaW9kZXIgc29tIGthbiBmw7hyZSB0aWwgZXR0ZXJiZXRhbGluZyB1dG92ZXIgdHJlIG3DpW5lZGVyIGZvciBwZXJzb257JyAnfVxuICAgICAgICAgICAgICAgICAgICB7c2zDpVNhbW1lbkxpc3RlVGlsU3RyZW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uZXJNZWRVZ3lsZGlnRXR0ZXJiZXRhbGluZ3NwZXJpb2RlLm1hcChpZGVudCA9PiBmb3JtYXRlcklkZW50KGlkZW50KSlcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgLlxuICAgICAgICAgICAgICAgIDwvU3R5bGVkQWxlcnQ+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2VyTWlncmVyaW5nRnJhSW5mb3RyeWdkICYmIDxNaWdyZXJpbmdJbmZvYm9rcyBiZWhhbmRsaW5nSWQ9e8OlcGVuQmVoYW5kbGluZy5iZWhhbmRsaW5nSWR9IC8+fVxuXG4gICAgICAgICAgICA8VGlsa2plbnRZdGVsc2VUaWRzbGluamVcbiAgICAgICAgICAgICAgICBncnVubmxhZ1BlcnNvbmVyPXtncnVubmxhZ1BlcnNvbmVyfVxuICAgICAgICAgICAgICAgIHRpZHNsaW5qZVBlcnNvbmVyPXt0aWRzbGluamVQZXJzb25lcn1cbiAgICAgICAgICAgICAgICBmYWdzYWtUeXBlPXtmYWdzYWsuZmFnc2FrVHlwZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7IWVyTGVzZXZpc25pbmcgJiYgKFxuICAgICAgICAgICAgICAgIDxFbmRyZXRVdGJldGFsaW5nQW5kZWw+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJ0ZXJ0aWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj17PFN0eWxlZEVkaXRJa29uIC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbFBlbmRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nPXtpc09wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxQZW5kaW5nfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWw+RW5kcmUgdXRiZXRhbGluZ3NwZXJpb2RlPC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIHtpc09wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxFcnJvciAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8RXJyb3JNZXNzYWdlPntvcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsRXJyb3IubWVzc2FnZX08L0Vycm9yTWVzc2FnZT5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L0VuZHJldFV0YmV0YWxpbmdBbmRlbD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7YWt0aXZFdGlrZXR0ICYmIChcbiAgICAgICAgICAgICAgICA8T3Bwc3VtbWVyaW5nc2Jva3NcbiAgICAgICAgICAgICAgICAgICAgdXRiZXRhbGluZ3NwZXJpb2RlPXtmaW5uVXRiZXRhbGluZ3NwZXJpb2RlRm9yQWt0aXZFdGlrZXR0KMOlcGVuQmVoYW5kbGluZy51dGJldGFsaW5nc3BlcmlvZGVyKX1cbiAgICAgICAgICAgICAgICAgICAgYWt0aXZFdGlrZXR0PXtha3RpdkV0aWtldHR9XG4gICAgICAgICAgICAgICAgICAgIGtvbXBldGFuc2VyPXtrb21wZXRhbnNlcn1cbiAgICAgICAgICAgICAgICAgICAgdXRiZXRhbHRBbm5ldExhbmRCZWzDuHA9e3V0YmV0YWx0QW5uZXRMYW5kQmVsw7hwfVxuICAgICAgICAgICAgICAgICAgICB2YWx1dGFrdXJzZXI9e3ZhbHV0YWt1cnNlcn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHvDpXBlbkJlaGFuZGxpbmcuZW5kcmV0VXRiZXRhbGluZ0FuZGVsZXIubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPEVuZHJldFV0YmV0YWxpbmdBbmRlbFRhYmVsbCDDpXBlbkJlaGFuZGxpbmc9e8OlcGVuQmVoYW5kbGluZ30gLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7aGFyS29tcGV0YW5zZXIgJiYgKFxuICAgICAgICAgICAgICAgIDxLb21wZXRhbnNlU2tqZW1hXG4gICAgICAgICAgICAgICAgICAgIGtvbXBldGFuc2VyPXtrb21wZXRhbnNlcn1cbiAgICAgICAgICAgICAgICAgICAgdmlzRmVpbG1lbGRpbmdlcj17dmlzRmVpbG1lbGRpbmdlcn1cbiAgICAgICAgICAgICAgICAgICAgw6VwZW5CZWhhbmRsaW5nPXvDpXBlbkJlaGFuZGxpbmd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7aGFyVXRlbmxhbmRza2VCZWzDuHBlciAmJiAoXG4gICAgICAgICAgICAgICAgPFV0YmV0YWx0QW5uZXRMYW5kXG4gICAgICAgICAgICAgICAgICAgIHV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwPXt1dGJldGFsdEFubmV0TGFuZEJlbMO4cH1cbiAgICAgICAgICAgICAgICAgICAgZXJVdGJldGFsdEFubmV0TGFuZEJlbMO4cEd5bGRpZ2U9e2VyVXRiZXRhbHRBbm5ldExhbmRCZWzDuHBHeWxkaWdlfVxuICAgICAgICAgICAgICAgICAgICB2aXNGZWlsbWVsZGluZ2VyPXt2aXNGZWlsbWVsZGluZ2VyfVxuICAgICAgICAgICAgICAgICAgICDDpXBlbkJlaGFuZGxpbmc9e8OlcGVuQmVoYW5kbGluZ31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtoYXJWYWx1dGFrdXJzZXIgJiYgKFxuICAgICAgICAgICAgICAgIDxWYWx1dGFrdXJzZXJcbiAgICAgICAgICAgICAgICAgICAgdmFsdXRha3Vyc2VyPXt2YWx1dGFrdXJzZXJ9XG4gICAgICAgICAgICAgICAgICAgIGVyVmFsdXRha3Vyc2VyR3lsZGlnZT17ZXJWYWx1dGFrdXJzZXJHeWxkaWdlfVxuICAgICAgICAgICAgICAgICAgICB2aXNGZWlsbWVsZGluZ2VyPXt2aXNGZWlsbWVsZGluZ2VyfVxuICAgICAgICAgICAgICAgICAgICDDpXBlbkJlaGFuZGxpbmc9e8OlcGVuQmVoYW5kbGluZ31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHt0cnVlICYmICggLy92aXNGZWlsbWVsZGluZ2VyICYmIChcbiAgICAgICAgICAgICAgICA8U3R5bGVkRXJyb3JTdW1tYXJ5IGhlYWRpbmc9eydGb3Igw6UgZ8OlIHZpZGVyZSBtw6UgZHUgcmV0dGUgb3BwIGbDuGxnZW5kZTonfT5cbiAgICAgICAgICAgICAgICAgICAge1tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmhlbnRLb21wZXRhbnNlck1lZEZlaWwoKS5tYXAoKGtvbXBldGFuc2U6IElSZXN0S29tcGV0YW5zZSkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWlsbWVsZGluZzogYEtvbXBldGFuc2UgYmFybjogJHtrb21wZXRhbnNlLmJhcm5JZGVudGVyfSwgZi5vLm0uOiAke2tvbXBldGFuc2UuZm9tfSBlciBpa2tlIGZ1bGxzdGVuZGlnLmAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tqZW1hZWxlbWVudElkOiBrb21wZXRhbnNlRmVpbG1lbGRpbmdJZChrb21wZXRhbnNlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmhlbnRVdGJldGFsdEFubmV0TGFuZEJlbMO4cE1lZEZlaWwoKS5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHV0ZW5sYW5kc2tQZXJpb2RlQmVsw7hwOiBJUmVzdFV0ZW5sYW5kc2tQZXJpb2RlQmVsw7hwKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWlsbWVsZGluZzogYFV0ZW5sYW5kc2sgYmVsw7hwIGJhcm46ICR7dXRlbmxhbmRza1BlcmlvZGVCZWzDuHAuYmFybklkZW50ZXJ9LCBmLm8ubS46ICR7dXRlbmxhbmRza1BlcmlvZGVCZWzDuHAuZm9tfSBlciBpa2tlIGZ1bGxzdGVuZGlnLmAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNramVtYWVsZW1lbnRJZDogdXRlbmxhbmRza1BlcmlvZGVCZWzDuHBGZWlsbWVsZGluZ0lkKHV0ZW5sYW5kc2tQZXJpb2RlQmVsw7hwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmhlbnRWYWx1dGFrdXJzZXJNZWRGZWlsKCkubWFwKCh2YWx1dGFrdXJzOiBJUmVzdFZhbHV0YWt1cnMpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVpbG1lbGRpbmc6IGBWYWx1dGFrdXJzIGJhcm46ICR7dmFsdXRha3Vycy5iYXJuSWRlbnRlcn0sIGYuby5tLjogJHt2YWx1dGFrdXJzLmZvbX0gZXIgaWtrZSBmdWxsc3RlbmRpZy5gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNramVtYWVsZW1lbnRJZDogdmFsdXRha3Vyc0ZlaWxtZWxkaW5nSWQodmFsdXRha3VycyksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgICAgIF0ubWFwKGl0ZW0gPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEVycm9yU3VtbWFyeS5JdGVtIGhyZWY9e2AjJHtpdGVtLnNramVtYWVsZW1lbnRJZH1gfT57aXRlbS5mZWlsbWVsZGluZ308L0Vycm9yU3VtbWFyeS5JdGVtPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L1N0eWxlZEVycm9yU3VtbWFyeT5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvU2tqZW1hc3RlZz5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQmVoYW5kbGluZ3NyZXN1bHRhdDtcbiIsImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgSUJlaGFuZGxpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi8uLi90eXBlci9iZWhhbmRsaW5nJztcbmltcG9ydCB0eXBlIHsgSVJlc3RLb21wZXRhbnNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvZcO4c1BlcmlvZGVyJztcbmltcG9ydCB7IEXDuHNQZXJpb2RlU3RhdHVzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvZcO4c1BlcmlvZGVyJztcbmltcG9ydCB7IHNvcnRlckXDuHNQZXJpb2RlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uLy4uL3V0aWxzL2XDuHMnO1xuXG5pbnRlcmZhY2UgSVByb3BzIHtcbiAgICDDpXBlbkJlaGFuZGxpbmc6IElCZWhhbmRsaW5nO1xufVxuXG5jb25zdCB1c2VLb21wZXRhbnNlID0gKHsgw6VwZW5CZWhhbmRsaW5nIH06IElQcm9wcykgPT4ge1xuICAgIGNvbnN0IFtrb21wZXRhbnNlciwgc2V0dEtvbXBldGFuc2VyXSA9IHVzZVN0YXRlPElSZXN0S29tcGV0YW5zZVtdPihbXSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAow6VwZW5CZWhhbmRsaW5nLmtvbXBldGFuc2VyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNldHRLb21wZXRhbnNlcihcbiAgICAgICAgICAgICAgICDDpXBlbkJlaGFuZGxpbmcua29tcGV0YW5zZXIuc29ydCgocGVyaW9kZUEsIHBlcmlvZGVCKSA9PlxuICAgICAgICAgICAgICAgICAgICBzb3J0ZXJFw7hzUGVyaW9kZXIocGVyaW9kZUEsIHBlcmlvZGVCLCDDpXBlbkJlaGFuZGxpbmcucGVyc29uZXIpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0sIFvDpXBlbkJlaGFuZGxpbmddKTtcblxuICAgIGNvbnN0IGVyS29tcGV0YW5zZXJHeWxkaWdlID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICByZXR1cm4gaGVudEtvbXBldGFuc2VyTWVkRmVpbCgpLmxlbmd0aCA9PT0gMDtcbiAgICB9O1xuXG4gICAgY29uc3QgaGVudEtvbXBldGFuc2VyTWVkRmVpbCA9ICgpOiBJUmVzdEtvbXBldGFuc2VbXSA9PiB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAvL1RPRE8gTkdISSBTTEVUVFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgICAgIGZvbTogJzIwMjUtMTInLFxuICAgICAgICAgICAgICAgIGJhcm5JZGVudGVyOiBbJzEyMzEyMzEyMyddLFxuICAgICAgICAgICAgICAgIHN0YXR1czogRcO4c1BlcmlvZGVTdGF0dXMuSUtLRV9VVEZZTFQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgICAgIGZvbTogJzIwMjUtMTInLFxuICAgICAgICAgICAgICAgIGJhcm5JZGVudGVyOiBbJzEyMzEyMzEyMyddLFxuICAgICAgICAgICAgICAgIHN0YXR1czogRcO4c1BlcmlvZGVTdGF0dXMuSUtLRV9VVEZZTFQsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgICAgICAvL3JldHVybiBrb21wZXRhbnNlci5maWx0ZXIoa29tcGV0YW5zZSA9PiBrb21wZXRhbnNlLnN0YXR1cyAhPT0gRcO4c1BlcmlvZGVTdGF0dXMuT0spO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBrb21wZXRhbnNlcixcbiAgICAgICAgZXJLb21wZXRhbnNlckd5bGRpZ2UsXG4gICAgICAgIGhlbnRLb21wZXRhbnNlck1lZEZlaWwsXG4gICAgfTtcbn07XG5cbmV4cG9ydCB7IHVzZUtvbXBldGFuc2UgfTtcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgaXNCZWZvcmUgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQm9keVNob3J0LCBCb3gsIEhTdGFjaywgU3BhY2VyLCBWU3RhY2sgfSBmcm9tICdAbmF2aWt0L2RzLXJlYWN0JztcbmltcG9ydCB7XG4gICAgQm9yZGVyTmV1dHJhbCxcbiAgICBGb250V2VpZ2h0Qm9sZCxcbiAgICBTcGFjZTE2LFxuICAgIFRleHREYW5nZXIsXG4gICAgVGV4dE5ldXRyYWwsXG4gICAgVGV4dFN1Y2Nlc3NTdWJ0bGUsXG59IGZyb20gJ0BuYXZpa3QvZHMtdG9rZW5zL2Rpc3QvdG9rZW5zJztcblxuaW1wb3J0IHR5cGUgeyBJU2ltdWxlcmluZ0RUTywgSVNpbXVsZXJpbmdQZXJpb2RlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvc2ltdWxlcmluZyc7XG5pbXBvcnQgeyBEYXRvZm9ybWF0LCBpc29TdHJpbmdUaWxEYXRlLCBpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9kYXRvJztcbmltcG9ydCB7IGZvcm1hdGVyQmVsw7hwIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvZm9ybWF0dGVyJztcblxuY29uc3QgQm9sZFRla3N0TWVkRmFyZ2UgPSBzdHlsZWQoQm9keVNob3J0KTx7ICRmYXJnZT86IHN0cmluZyB9PmBcbiAgICBjb2xvcjogJHtwcm9wcyA9PiAocHJvcHMuJGZhcmdlID8gVGV4dFN1Y2Nlc3NTdWJ0bGUgOiBUZXh0TmV1dHJhbCl9O1xuICAgIGZvbnQtd2VpZ2h0OiAke0ZvbnRXZWlnaHRCb2xkfTtcbmA7XG5cbmNvbnN0IEhTdGFja01lZEJvcmRlclRvcCA9IHN0eWxlZChIU3RhY2spYFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAke0JvcmRlck5ldXRyYWx9O1xuICAgIHBhZGRpbmctdG9wOiAke1NwYWNlMTZ9O1xuYDtcblxuaW50ZXJmYWNlIElTaW11bGVyaW5nUHJvcHMge1xuICAgIHNpbXVsZXJpbmc6IElTaW11bGVyaW5nRFRPO1xufVxuXG5jb25zdCBTaW11bGVyaW5nUGFuZWw6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PElTaW11bGVyaW5nUHJvcHM+ID0gKHtcbiAgICBzaW11bGVyaW5nOiB7IGZlaWx1dGJldGFsaW5nLCBmb20sIGV0dGVyYmV0YWxpbmcsIGZvbURhdG9OZXN0ZVBlcmlvZGUsIHBlcmlvZGVyLCB0b21TaXN0ZVV0YmV0YWxpbmcgfSxcbn0pID0+IHtcbiAgICBjb25zdCBrYXBpdGFsaXNlclRla3N0ID0gKHRla3N0OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgICAgICByZXR1cm4gdGVrc3QuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0ZWtzdC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBmb3JtYXRlckJlbMO4cEVsbGVyRGFzaE9tVW5kZWZpbmVkID0gKGJlbMO4cD86IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgICAgIHJldHVybiAhYmVsw7hwIHx8IGJlbMO4cCA9PT0gMCA/ICctJyA6IGZvcm1hdGVyQmVsw7hwKGJlbMO4cCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG5lc3RlUGVyaW9kZSA9IGZvbURhdG9OZXN0ZVBlcmlvZGVcbiAgICAgICAgPyAocGVyaW9kZXIuZmluZChwZXJpb2RlID0+IHBlcmlvZGUuZm9tID09PSBmb21EYXRvTmVzdGVQZXJpb2RlKSA/PyB1bmRlZmluZWQpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgZXJGw7hyTmVzdGVQZXJpb2RlID0gKHBlcmlvZGU6IElTaW11bGVyaW5nUGVyaW9kZSkgPT5cbiAgICAgICAgIWZvbURhdG9OZXN0ZVBlcmlvZGUgfHwgaXNCZWZvcmUoaXNvU3RyaW5nVGlsRGF0ZShwZXJpb2RlLmZvbSksIGlzb1N0cmluZ1RpbERhdGUoZm9tRGF0b05lc3RlUGVyaW9kZSkpO1xuXG4gICAgY29uc3QgcGFuZWxUaXR0ZWwgPSAoKTogc3RyaW5nID0+IHtcbiAgICAgICAgY29uc3QgdXRiZXRhbHRlUGVyaW9kZXIgPSBwZXJpb2Rlci5maWx0ZXIocGVyaW9kZSA9PiBlckbDuHJOZXN0ZVBlcmlvZGUocGVyaW9kZSkpO1xuICAgICAgICBpZiAodXRiZXRhbHRlUGVyaW9kZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1RvdGFsdCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0YmV0YWx0ZVBlcmlvZGVyLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGBUb3RhbCBmb3IgJHtpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcoe1xuICAgICAgICAgICAgICAgIGlzb1N0cmluZzogcGVyaW9kZXJbMF0uZm9tLFxuICAgICAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5Nw4VORURfw4VSX05BVk4sXG4gICAgICAgICAgICB9KX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgVG90YWx0IGZvciBwZXJpb2RlbiAke2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICBpc29TdHJpbmc6IGZvbSxcbiAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5EQVRPLFxuICAgICAgICB9KX0gLSAke2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICBpc29TdHJpbmc6IHRvbVNpc3RlVXRiZXRhbGluZyxcbiAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5EQVRPLFxuICAgICAgICB9KX1gO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8Qm94XG4gICAgICAgICAgICBtYXhXaWR0aD17JzI2cmVtJ31cbiAgICAgICAgICAgIG1hcmdpbkJsb2NrPXsnc3BhY2UtMCBzcGFjZS00MCd9XG4gICAgICAgICAgICBib3JkZXJDb2xvcj1cIm5ldXRyYWwtc3Ryb25nXCJcbiAgICAgICAgICAgIGJvcmRlcldpZHRoPVwiMVwiXG4gICAgICAgICAgICBwYWRkaW5nPVwic3BhY2UtNDBcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8VlN0YWNrIGFyaWEtbGFiZWw9eydTaW11bGVyaW5nc292ZXJzaWt0J30gZ2FwPVwic3BhY2UtMTJcIj5cbiAgICAgICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0IHdlaWdodD1cInNlbWlib2xkXCI+e3BhbmVsVGl0dGVsKCl9PC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICAgICAgPEhTdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydD5GZWlsdXRiZXRhbGluZzwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICA8U3BhY2VyIC8+XG4gICAgICAgICAgICAgICAgICAgIDxCb2xkVGVrc3RNZWRGYXJnZSAkZmFyZ2U9e2ZlaWx1dGJldGFsaW5nID4gMCA/IFRleHREYW5nZXIgOiBUZXh0TmV1dHJhbH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0ZXJCZWzDuHBFbGxlckRhc2hPbVVuZGVmaW5lZChmZWlsdXRiZXRhbGluZyl9XG4gICAgICAgICAgICAgICAgICAgIDwvQm9sZFRla3N0TWVkRmFyZ2U+XG4gICAgICAgICAgICAgICAgPC9IU3RhY2s+XG5cbiAgICAgICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0PkV0dGVyYmV0YWxpbmc8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgICAgICAgICAgICA8Qm9sZFRla3N0TWVkRmFyZ2U+e2Zvcm1hdGVyQmVsw7hwRWxsZXJEYXNoT21VbmRlZmluZWQoZXR0ZXJiZXRhbGluZyl9PC9Cb2xkVGVrc3RNZWRGYXJnZT5cbiAgICAgICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgICAgICA8SFN0YWNrTWVkQm9yZGVyVG9wPlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0IHdlaWdodD1cInNlbWlib2xkXCI+TmVzdGUgdXRiZXRhbGluZzwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICA8U3BhY2VyIC8+XG4gICAgICAgICAgICAgICAgICAgIHshbmVzdGVQZXJpb2RlICYmIDxCb2R5U2hvcnQgd2VpZ2h0PVwic2VtaWJvbGRcIj4tPC9Cb2R5U2hvcnQ+fVxuICAgICAgICAgICAgICAgIDwvSFN0YWNrTWVkQm9yZGVyVG9wPlxuICAgICAgICAgICAgICAgIHtuZXN0ZVBlcmlvZGUgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7a2FwaXRhbGlzZXJUZWtzdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzb1N0cmluZzogZm9tRGF0b05lc3RlUGVyaW9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5Nw4VORURfw4VSX05BVk4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJvbGRUZWtzdE1lZEZhcmdlICRmYXJnZT17bmVzdGVQZXJpb2RlPy5yZXN1bHRhdCAmJiBuZXN0ZVBlcmlvZGUucmVzdWx0YXQgPiAwfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0ZXJCZWzDuHBFbGxlckRhc2hPbVVuZGVmaW5lZChuZXN0ZVBlcmlvZGU/LnJlc3VsdGF0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQm9sZFRla3N0TWVkRmFyZ2U+XG4gICAgICAgICAgICAgICAgICAgIDwvSFN0YWNrPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L1ZTdGFjaz5cbiAgICAgICAgPC9Cb3g+XG4gICAgKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTaW11bGVyaW5nUGFuZWw7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBMaWdodEJ1bGJGaWxsSWNvbiwgUGx1c0NpcmNsZUljb24gfSBmcm9tICdAbmF2aWt0L2Frc2VsLWljb25zJztcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBGaWVsZHNldCwgSGVhZGluZywgSFN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgdHlwZSB7IEZlbHRTdGF0ZSB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS1za2plbWEnO1xuaW1wb3J0IHR5cGUgeyBSZXNzdXJzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcbmltcG9ydCB7IFJlc3N1cnNTdGF0dXMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuXG5pbXBvcnQgRmplcm5VdHZpZGV0QmFybmV0cnlnZFZpbGvDpXIgZnJvbSAnLi9GamVyblV0dmlkZXRCYXJuZXRyeWdkVmlsa8Olcic7XG5pbXBvcnQgVmlsa8OlclRhYmVsbCBmcm9tICcuL1ZpbGvDpXJUYWJlbGwnO1xuaW1wb3J0IHsgdXNlRmVhdHVyZVRvZ2dsZXMgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9ob29rcy91c2VGZWF0dXJlVG9nZ2xlcyc7XG5pbXBvcnQgeyBCZWhhbmRsaW5nU3RlZywgdHlwZSBJQmVoYW5kbGluZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3R5cGVyL2JlaGFuZGxpbmcnO1xuaW1wb3J0IHsgRmVhdHVyZVRvZ2dsZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3R5cGVyL2ZlYXR1cmVUb2dnbGVzJztcbmltcG9ydCB0eXBlIHsgSUdydW5ubGFnUGVyc29uIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvcGVyc29uJztcbmltcG9ydCB7IFBlcnNvblR5cGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi90eXBlci9wZXJzb24nO1xuaW1wb3J0IHR5cGUgeyBJVmlsa8OlckNvbmZpZywgSVZpbGvDpXJSZXN1bHRhdCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3R5cGVyL3ZpbGvDpXInO1xuaW1wb3J0IHsgUmVzdWx0YXQsIFZpbGvDpXJUeXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvdmlsa8Olcic7XG5pbXBvcnQgeyB1c2VCZWhhbmRsaW5nQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uL2NvbnRleHQvQmVoYW5kbGluZ0NvbnRleHQnO1xuaW1wb3J0IHsgdXNlVmlsa8OlcnN2dXJkZXJpbmdDb250ZXh0LCBWaWxrw6VyU3VibWl0IH0gZnJvbSAnLi4vVmlsa8OlcnN2dXJkZXJpbmdDb250ZXh0JztcblxuaW50ZXJmYWNlIElQcm9wcyB7XG4gICAgcGVyc29uOiBJR3J1bm5sYWdQZXJzb247XG4gICAgdmlsa8OlclJlc3VsdGF0ZXI6IEZlbHRTdGF0ZTxJVmlsa8OlclJlc3VsdGF0PltdO1xuICAgIHZpbGvDpXJGcmFDb25maWc6IElWaWxrw6VyQ29uZmlnO1xuICAgIHZpc0ZlaWxtZWxkaW5nZXI6IGJvb2xlYW47XG4gICAgZ2VuZXJpc2tWaWxrw6VyS2V5OiBzdHJpbmc7XG59XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gICAgbWFyZ2luLXRvcDogdmFyKC0tYXgtc3BhY2UtNjQpO1xuXG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tYXgtc3BhY2UtMjApO1xuICAgIH1cbmA7XG5cbmNvbnN0IEdlbmVyaXNrVmlsa8OlcjogUmVhY3QuRkM8SVByb3BzPiA9ICh7XG4gICAgcGVyc29uLFxuICAgIHZpbGvDpXJGcmFDb25maWcsXG4gICAgdmlsa8OlclJlc3VsdGF0ZXIsXG4gICAgdmlzRmVpbG1lbGRpbmdlcixcbiAgICBnZW5lcmlza1ZpbGvDpXJLZXksXG59KSA9PiB7XG4gICAgY29uc3QgdG9nZ2xlcyA9IHVzZUZlYXR1cmVUb2dnbGVzKCk7XG4gICAgY29uc3QgeyBiZWhhbmRsaW5nLCB2dXJkZXJFckxlc2V2aXNuaW5nLCBzZXR0w4VwZW5CZWhhbmRsaW5nLCBlck1pZ3JlcmluZ3NiZWhhbmRsaW5nIH0gPSB1c2VCZWhhbmRsaW5nQ29udGV4dCgpO1xuICAgIGNvbnN0IGVyTGVzZXZpc25pbmcgPSB2dXJkZXJFckxlc2V2aXNuaW5nKCk7XG4gICAgY29uc3QgeyBzZXR0Vmlsa8OlclN1Ym1pdCwgcG9zdFZpbGvDpXIsIHZpbGvDpXJTdWJtaXQgfSA9IHVzZVZpbGvDpXJzdnVyZGVyaW5nQ29udGV4dCgpO1xuXG4gICAgY29uc3QgW3Zpc0ZlaWxtZWxkaW5nZXJGb3JWaWxrw6VyLCBzZXR0VmlzRmVpbG1lbGRpbmdlckZvclZpbGvDpXJdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtmZWlsbWVsZGluZywgc2V0dEZlaWxtZWxkaW5nXSA9IHVzZVN0YXRlKCcnKTtcblxuICAgIGNvbnN0IGxlZ2dUaWxQZXJpb2RlS25hcHBJZCA9IGdlbmVyaXNrVmlsa8OlcktleSArICdfX2xlZ2dfdGlsX3BlcmlvZGUnO1xuXG4gICAgY29uc3Qgc2V0dEZva3VzUMOlTGVnZ1RpbFBlcmlvZGVLbmFwcCA9ICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGVnZ1RpbFBlcmlvZGVLbmFwcElkKT8uZm9jdXMoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaMOlbmR0ZXJOeVBlcmlvZGVWaWxrw6Vyc3Z1cmRlcmluZyA9IChwcm9taXNlOiBQcm9taXNlPFJlc3N1cnM8SUJlaGFuZGxpbmc+PikgPT4ge1xuICAgICAgICBwcm9taXNlXG4gICAgICAgICAgICAudGhlbigob3BwZGF0ZXJ0QmVoYW5kbGluZzogUmVzc3VyczxJQmVoYW5kbGluZz4pID0+IHtcbiAgICAgICAgICAgICAgICBzZXR0VmlzRmVpbG1lbGRpbmdlckZvclZpbGvDpXIoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNldHRWaWxrw6VyU3VibWl0KFZpbGvDpXJTdWJtaXQuTk9ORSk7XG4gICAgICAgICAgICAgICAgc2V0dEZlaWxtZWxkaW5nKCcnKTtcbiAgICAgICAgICAgICAgICBpZiAob3BwZGF0ZXJ0QmVoYW5kbGluZy5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuU1VLU0VTUykge1xuICAgICAgICAgICAgICAgICAgICBzZXR0w4VwZW5CZWhhbmRsaW5nKG9wcGRhdGVydEJlaGFuZGxpbmcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIG9wcGRhdGVydEJlaGFuZGxpbmcuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLkZFSUxFVCB8fFxuICAgICAgICAgICAgICAgICAgICBvcHBkYXRlcnRCZWhhbmRsaW5nLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5GVU5LU0pPTkVMTF9GRUlMIHx8XG4gICAgICAgICAgICAgICAgICAgIG9wcGRhdGVydEJlaGFuZGxpbmcuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLklLS0VfVElMR0FOR1xuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0RmVpbG1lbGRpbmcob3BwZGF0ZXJ0QmVoYW5kbGluZy5mcm9udGVuZEZlaWxtZWxkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0dFZpc0ZlaWxtZWxkaW5nZXJGb3JWaWxrw6VyKHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRGZWlsbWVsZGluZygnRW4gdWtqZW50IGZlaWwgaGFyIG9wcHN0w6V0dCwgdmkgaGFyIGlra2Uga2xhcnQgw6UgbGVnZ2UgdGlsIHBlcmlvZGUuJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldHRWaXNGZWlsbWVsZGluZ2VyRm9yVmlsa8Olcih0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXR0Vmlsa8OlclN1Ym1pdChWaWxrw6VyU3VibWl0Lk5PTkUpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNrYWxWaXNlTGVnZ1RpbEtuYXBwID0gKCkgPT4ge1xuICAgICAgICBpZiAoZXJMZXNldmlzbmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHV2dXJkZXJ0UGVyaW9kZVDDpVZpbGvDpXIgPSB2aWxrw6VyUmVzdWx0YXRlci5maW5kKFxuICAgICAgICAgICAgdmlsa8OlciA9PiB2aWxrw6VyLnZlcmRpLnJlc3VsdGF0LnZlcmRpID09PSBSZXN1bHRhdC5JS0tFX1ZVUkRFUlRcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHV2dXJkZXJ0UGVyaW9kZVDDpVZpbGvDpXIgPT09IHVuZGVmaW5lZDtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2thbFZpc2VGamVyblV0dmlkZXRCYXJuZXRyeWdkS25hcHAgPSAoKSA9PiB7XG4gICAgICAgIGlmIChlckxlc2V2aXNuaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXR2aWRldFZpbGvDpXIgPSB2aWxrw6VyUmVzdWx0YXRlci5maWx0ZXIoXG4gICAgICAgICAgICB2aWxrw6VyUmVzdWx0YXQgPT4gdmlsa8OlclJlc3VsdGF0LnZlcmRpLnZpbGvDpXJUeXBlID09PSBWaWxrw6VyVHlwZS5VVFZJREVUX0JBUk5FVFJZR0RcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGVyTWlncmVyaW5nc2JlaGFuZGxpbmcgJiZcbiAgICAgICAgICAgIHBlcnNvbi50eXBlID09PSBQZXJzb25UeXBlLlPDmEtFUiAmJlxuICAgICAgICAgICAgdmlsa8OlckZyYUNvbmZpZy5rZXkgPT09IFZpbGvDpXJUeXBlLlVUVklERVRfQkFSTkVUUllHRCAmJlxuICAgICAgICAgICAgdXR2aWRldFZpbGvDpXIubGVuZ3RoICE9PSAwXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNrYWxWaXNlTHlzcMOmcmUgPVxuICAgICAgICB0b2dnbGVzW0ZlYXR1cmVUb2dnbGUuc2thbFZpc2VWYXJzZWxsYW1wZUZvck1hbnVlbHRMYWd0VGlsQmFybl0gJiZcbiAgICAgICAgYmVoYW5kbGluZy5zdGVnID09IEJlaGFuZGxpbmdTdGVnLlZJTEvDhVJTVlVSREVSSU5HICYmXG4gICAgICAgIHZpbGvDpXJSZXN1bHRhdGVyLnNvbWUodmlsa8OlciA9PiAhIXZpbGvDpXIudmVyZGkuYmVncnVubmVsc2VGb3JNYW51ZWxsS29udHJvbGwpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPENvbnRhaW5lcj5cbiAgICAgICAgICAgIDxGaWVsZHNldFxuICAgICAgICAgICAgICAgIGVycm9yPXt2aXNGZWlsbWVsZGluZ2VyRm9yVmlsa8OlciA/IGZlaWxtZWxkaW5nIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgIGxlZ2VuZD17dmlsa8OlckZyYUNvbmZpZy50aXR0ZWx9XG4gICAgICAgICAgICAgICAgaGlkZUxlZ2VuZFxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxIU3RhY2sgZ2FwPVwic3BhY2UtMTZcIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICB7c2thbFZpc2VMeXNww6ZyZSAmJiA8TGlnaHRCdWxiRmlsbEljb24gZm9udFNpemU9XCIxLjVyZW1cIiBjb2xvcj1cInZhcigtLWF4LXdhcm5pbmctNTAwKVwiIC8+fVxuICAgICAgICAgICAgICAgICAgICA8SGVhZGluZyBzaXplPVwibWVkaXVtXCIgbGV2ZWw9XCIzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dmlsa8OlckZyYUNvbmZpZy50aXR0ZWx9XG4gICAgICAgICAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgICAgICA8Vmlsa8OlclRhYmVsbFxuICAgICAgICAgICAgICAgICAgICBwZXJzb249e3BlcnNvbn1cbiAgICAgICAgICAgICAgICAgICAgdmlsa8OlckZyYUNvbmZpZz17dmlsa8OlckZyYUNvbmZpZ31cbiAgICAgICAgICAgICAgICAgICAgdmlsa8OlclJlc3VsdGF0ZXI9e3ZpbGvDpXJSZXN1bHRhdGVyfVxuICAgICAgICAgICAgICAgICAgICB2aXNGZWlsbWVsZGluZ2VyPXt2aXNGZWlsbWVsZGluZ2VyfVxuICAgICAgICAgICAgICAgICAgICBzZXR0Rm9rdXNQw6VLbmFwcD17c2V0dEZva3VzUMOlTGVnZ1RpbFBlcmlvZGVLbmFwcH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHtza2FsVmlzZUxlZ2dUaWxLbmFwcCgpICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEJveCBtYXJnaW5CbG9jaz17J3NwYWNlLTIwIHNwYWNlLTAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBwb3N0Vmlsa8OlcihwZXJzb24ucGVyc29uSWRlbnQsIHZpbGvDpXJGcmFDb25maWcua2V5IGFzIFZpbGvDpXJUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaMOlbmR0ZXJOeVBlcmlvZGVWaWxrw6Vyc3Z1cmRlcmluZyhwcm9taXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtsZWdnVGlsUGVyaW9kZUtuYXBwSWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZz17dmlsa8OlclN1Ym1pdCA9PT0gVmlsa8OlclN1Ym1pdC5QT1NUfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt2aWxrw6VyU3VibWl0ID09PSBWaWxrw6VyU3VibWl0LlBPU1R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInRlcnRpYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwibWVkaXVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uPXs8UGx1c0NpcmNsZUljb24gLz59XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTGVnZyB0aWwgcGVyaW9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge3NrYWxWaXNlRmplcm5VdHZpZGV0QmFybmV0cnlnZEtuYXBwKCkgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8Rmplcm5VdHZpZGV0QmFybmV0cnlnZFZpbGvDpXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbklkZW50PXtwZXJzb24ucGVyc29uSWRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGV0dFZpbGvDpXJJZD17Z2VuZXJpc2tWaWxrw6VyS2V5ICsgJ19fc2xldHQtdmlsa8Olci11dHZpZGV0J31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9GaWVsZHNldD5cbiAgICAgICAgPC9Db250YWluZXI+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdlbmVyaXNrVmlsa8OlcjtcbiIsImltcG9ydCBSZWFjdCwgeyBBY3Rpdml0eSwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQ2hldnJvbkRvd25JY29uLCBDaGV2cm9uVXBJY29uLCBQbHVzQ2lyY2xlSWNvbiB9IGZyb20gJ0BuYXZpa3QvYWtzZWwtaWNvbnMnO1xuaW1wb3J0IHsgQWxlcnQsIEJvZHlTaG9ydCwgQm94LCBCdXR0b24sIEhTdGFjaywgTGlzdCB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBGZWx0U3RhdGUgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtc2tqZW1hJztcbmltcG9ydCB0eXBlIHsgUmVzc3VycyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcblxuaW1wb3J0IHsgdXNlRmVhdHVyZVRvZ2dsZXMgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9ob29rcy91c2VGZWF0dXJlVG9nZ2xlcyc7XG5pbXBvcnQgUGVyc29uSW5mb3JtYXNqb24gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4va29tcG9uZW50ZXIvUGVyc29uSW5mb3JtYXNqb24vUGVyc29uSW5mb3JtYXNqb24nO1xuaW1wb3J0IHsgQmVoYW5kbGluZ1N0ZWcsIEJlaGFuZGxpbmfDhXJzYWssIHR5cGUgSUJlaGFuZGxpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi90eXBlci9iZWhhbmRsaW5nJztcbmltcG9ydCB7IEZlYXR1cmVUb2dnbGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi90eXBlci9mZWF0dXJlVG9nZ2xlcyc7XG5pbXBvcnQgeyBQZXJzb25UeXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvcGVyc29uJztcbmltcG9ydCB7XG4gICAgYW5uZW5WdXJkZXJpbmdDb25maWcsXG4gICAgdHlwZSBJUGVyc29uUmVzdWx0YXQsXG4gICAgdHlwZSBJVmlsa8OlckNvbmZpZyxcbiAgICB0eXBlIElWaWxrw6VyUmVzdWx0YXQsXG4gICAgUmVzdWx0YXQsXG4gICAgdmlsa8OlckNvbmZpZyxcbiAgICBWaWxrw6VyVHlwZSxcbn0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvdmlsa8Olcic7XG5pbXBvcnQgeyB1c2VCZWhhbmRsaW5nQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uL2NvbnRleHQvQmVoYW5kbGluZ0NvbnRleHQnO1xuaW1wb3J0IEdlbmVyaXNrQW5uZW5WdXJkZXJpbmcgZnJvbSAnLi4vR2VuZXJpc2tBbm5lblZ1cmRlcmluZy9HZW5lcmlza0FubmVuVnVyZGVyaW5nJztcbmltcG9ydCBHZW5lcmlza1ZpbGvDpXIgZnJvbSAnLi4vR2VuZXJpc2tWaWxrw6VyL0dlbmVyaXNrVmlsa8Olcic7XG5pbXBvcnQgUmVnaXN0ZXJvcHBseXNuaW5nZXIgZnJvbSAnLi4vUmVnaXN0ZXJvcHBseXNuaW5nZXIvUmVnaXN0ZXJvcHBseXNuaW5nZXInO1xuaW1wb3J0IHsgdXRsZWRWaWxrw6VyU29tTcOlS29udHJvbGxlcmVzUGVyUGVyc29uIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgdXNlVmlsa8OlcnN2dXJkZXJpbmdDb250ZXh0LCBWaWxrw6VyU3VibWl0IH0gZnJvbSAnLi4vVmlsa8OlcnN2dXJkZXJpbmdDb250ZXh0JztcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9WaWxrw6Vyc3Z1cmRlcmluZ1NramVtYS5tb2R1bGUuY3NzJztcblxuaW50ZXJmYWNlIElWaWxrw6Vyc3Z1cmRlcmluZ1NramVtYU5vcm1hbCB7XG4gICAgdmlzRmVpbG1lbGRpbmdlcjogYm9vbGVhbjtcbn1cblxuY29uc3QgVmlsa8OlcnN2dXJkZXJpbmdTa2plbWFOb3JtYWw6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PElWaWxrw6Vyc3Z1cmRlcmluZ1NramVtYU5vcm1hbD4gPSAoeyB2aXNGZWlsbWVsZGluZ2VyIH0pID0+IHtcbiAgICBjb25zdCB0b2dnbGVzID0gdXNlRmVhdHVyZVRvZ2dsZXMoKTtcbiAgICBjb25zdCB7IHZpbGvDpXJzdnVyZGVyaW5nLCBzZXR0Vmlsa8OlclN1Ym1pdCwgcG9zdFZpbGvDpXIgfSA9IHVzZVZpbGvDpXJzdnVyZGVyaW5nQ29udGV4dCgpO1xuICAgIGNvbnN0IHsgdnVyZGVyRXJMZXNldmlzbmluZywgZXJNaWdyZXJpbmdzYmVoYW5kbGluZywgc2V0dMOFcGVuQmVoYW5kbGluZywgYWt0aXZTZXR0UMOlVmVudCwgYmVoYW5kbGluZyB9ID1cbiAgICAgICAgdXNlQmVoYW5kbGluZ0NvbnRleHQoKTtcbiAgICBjb25zdCBlckxlc2V2aXNuaW5nID0gdnVyZGVyRXJMZXNldmlzbmluZygpO1xuXG4gICAgY29uc3Qga2FuTGVnZ2VUaWxVdHZpZGV0Vmlsa8OlciA9XG4gICAgICAgIGVyTWlncmVyaW5nc2JlaGFuZGxpbmcgfHxcbiAgICAgICAgYmVoYW5kbGluZy7DpXJzYWsgPT09IEJlaGFuZGxpbmfDhXJzYWsuS09SUkVLU0pPTl9WRURUQUtTQlJFViB8fFxuICAgICAgICBiZWhhbmRsaW5nLsOlcnNhayA9PT0gQmVoYW5kbGluZ8OFcnNhay5URUtOSVNLX0VORFJJTkcgfHxcbiAgICAgICAgYmVoYW5kbGluZy7DpXJzYWsgPT09IEJlaGFuZGxpbmfDhXJzYWsuS0xBR0UgfHxcbiAgICAgICAgYmVoYW5kbGluZy7DpXJzYWsgPT09IEJlaGFuZGxpbmfDhXJzYWsuRU5EUkVfTUlHUkVSSU5HU0RBVE8gfHxcbiAgICAgICAgYmVoYW5kbGluZy7DpXJzYWsgPT09IEJlaGFuZGxpbmfDhXJzYWsuSVZFUktTRVRURV9LQV9WRURUQUs7XG5cbiAgICBjb25zdCBwZXJzb25IYXJJa2tldnVyZGVydFZpbGvDpXIgPSAocGVyc29uUmVzdWx0YXQ6IElQZXJzb25SZXN1bHRhdCkgPT5cbiAgICAgICAgcGVyc29uUmVzdWx0YXQudmlsa8OlclJlc3VsdGF0ZXIuc29tZShcbiAgICAgICAgICAgIHZpbGvDpXJSZXN1bHRhdEZlbHQgPT4gdmlsa8OlclJlc3VsdGF0RmVsdC52ZXJkaS5yZXN1bHRhdC52ZXJkaSA9PT0gUmVzdWx0YXQuSUtLRV9WVVJERVJUXG4gICAgICAgICk7XG5cbiAgICBjb25zdCBoZW50RWtzcGFudGRlcnRlUGVyc29uZXIgPSAoKSA9PlxuICAgICAgICB2aWxrw6Vyc3Z1cmRlcmluZy5yZWR1Y2UoXG4gICAgICAgICAgICAocGVyc29uTWFwRWtzcGFuZGVydCwgcGVyc29uUmVzdWx0YXQpID0+ICh7XG4gICAgICAgICAgICAgICAgLi4ucGVyc29uTWFwRWtzcGFuZGVydCxcbiAgICAgICAgICAgICAgICBbcGVyc29uUmVzdWx0YXQucGVyc29uSWRlbnRdOiBlckxlc2V2aXNuaW5nIHx8IHBlcnNvbkhhcklra2V2dXJkZXJ0Vmlsa8OlcihwZXJzb25SZXN1bHRhdCksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICk7XG5cbiAgICBjb25zdCBbcGVyc29uRXJFa3NwYW5kZXJ0LCBzZXR0UGVyc29uRXJFa3NwYW5kZXJ0XSA9IHVzZVN0YXRlPHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9PihcbiAgICAgICAgaGVudEVrc3BhbnRkZXJ0ZVBlcnNvbmVyKClcbiAgICApO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgc2V0dFBlcnNvbkVyRWtzcGFuZGVydChoZW50RWtzcGFudGRlcnRlUGVyc29uZXIoKSk7XG4gICAgfSwgW2FrdGl2U2V0dFDDpVZlbnRdKTtcblxuICAgIGNvbnN0IGxlZ2dUaWxWaWxrw6VyVXR2aWRldCA9IChwZXJzb25JZGVudDogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBwb3N0Vmlsa8OlcihwZXJzb25JZGVudCwgVmlsa8OlclR5cGUuVVRWSURFVF9CQVJORVRSWUdEKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKChvcHBkYXRlcnRCZWhhbmRsaW5nOiBSZXNzdXJzPElCZWhhbmRsaW5nPikgPT4ge1xuICAgICAgICAgICAgc2V0dFZpbGvDpXJTdWJtaXQoVmlsa8OlclN1Ym1pdC5OT05FKTtcbiAgICAgICAgICAgIGlmIChvcHBkYXRlcnRCZWhhbmRsaW5nLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5TVUtTRVNTKSB7XG4gICAgICAgICAgICAgICAgc2V0dMOFcGVuQmVoYW5kbGluZyhvcHBkYXRlcnRCZWhhbmRsaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHZpbGvDpXJTb21Nw6VLb250cm9sbGVyZXNQZXJQZXJzb24gPSBPYmplY3QuZW50cmllcyhcbiAgICAgICAgdXRsZWRWaWxrw6VyU29tTcOlS29udHJvbGxlcmVzUGVyUGVyc29uKGJlaGFuZGxpbmcsIHZpbGvDpXJzdnVyZGVyaW5nKVxuICAgICk7XG5cbiAgICBjb25zdCBza2FsVmlzZVZhcnNlbGJva3NGb3JWaWxrw6VyU29tTcOlS29udHJvbGxlcmVzID1cbiAgICAgICAgdG9nZ2xlc1tGZWF0dXJlVG9nZ2xlLnNrYWxWaXNlVmFyc2VsbGFtcGVGb3JNYW51ZWx0TGFndFRpbEJhcm5dICYmXG4gICAgICAgIHZpbGvDpXJTb21Nw6VLb250cm9sbGVyZXNQZXJQZXJzb24ubGVuZ3RoID4gMCAmJlxuICAgICAgICAoYmVoYW5kbGluZy5zdGVnID09IEJlaGFuZGxpbmdTdGVnLlZJTEvDhVJTVlVSREVSSU5HIHx8IGJlaGFuZGxpbmcuc3RlZyA9PSBCZWhhbmRsaW5nU3RlZy5CRVNMVVRURV9WRURUQUspO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIHtza2FsVmlzZVZhcnNlbGJva3NGb3JWaWxrw6VyU29tTcOlS29udHJvbGxlcmVzICYmIChcbiAgICAgICAgICAgICAgICA8QWxlcnQgdmFyaWFudD1cIndhcm5pbmdcIiBjb250ZW50TWF4V2lkdGg9e2ZhbHNlfSBzdHlsZT17eyB3aWR0aDogJ2ZpdC1jb250ZW50JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtiZWhhbmRsaW5nLnN0ZWcgPT0gQmVoYW5kbGluZ1N0ZWcuQkVTTFVUVEVfVkVEVEFLXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnQXV0b21hdGlzayB1dGZ5bHRlIHZpbGvDpXIgc29tIHNha3NiZWhhbmRsZXIgMSBpa2tlIGhhciBnam9ydCBlbmRyaW5nZXIgcMOlOidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdWw6ZyIG9wcG1lcmtzb206J31cbiAgICAgICAgICAgICAgICAgICAgPC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgICAgIDxMaXN0IGFzPVwidWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt2aWxrw6VyU29tTcOlS29udHJvbGxlcmVzUGVyUGVyc29uLm1hcCgoW25hdm4sIGF2dmlrXSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0ga2V5PXtuYXZufT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge25hdm59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0IGFzPVwidWxcIiBzaXplPVwic21hbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthdnZpay5tYXAoYXZ2aWsgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0ga2V5PXthdnZpa30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQgc2l6ZT1cInNtYWxsXCI+e2F2dmlrfTwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlzdC5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlzdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L0xpc3Q+XG4gICAgICAgICAgICAgICAgPC9BbGVydD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7dmlsa8OlcnN2dXJkZXJpbmcubWFwKChwZXJzb25SZXN1bHRhdDogSVBlcnNvblJlc3VsdGF0LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYW5kcmVWdXJkZXJpbmdlciA9IHBlcnNvblJlc3VsdGF0LmFuZHJlVnVyZGVyaW5nZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFyVXR2aWRldCA9IHBlcnNvblJlc3VsdGF0LnZpbGvDpXJSZXN1bHRhdGVyLmZpbmQoXG4gICAgICAgICAgICAgICAgICAgIHZpbGvDpXJSZXN1bHRhdCA9PiB2aWxrw6VyUmVzdWx0YXQudmVyZGkudmlsa8OlclR5cGUgPT09IFZpbGvDpXJUeXBlLlVUVklERVRfQkFSTkVUUllHRFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2Ake2luZGV4fV8ke3BlcnNvblJlc3VsdGF0LnBlcnNvbi5mw7hkc2Vsc2RhdG99YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtpbmRleH1fJHtwZXJzb25SZXN1bHRhdC5wZXJzb24uZsO4ZHNlbHNkYXRvfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxIU3RhY2sgd3JhcD17ZmFsc2V9IGp1c3RpZnk9eydzcGFjZS1iZXR3ZWVuJ30gY2xhc3NOYW1lPXtzdHlsZXMucGVyc29uTGluamV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQZXJzb25JbmZvcm1hc2pvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb249e3BlcnNvblJlc3VsdGF0LnBlcnNvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29tT3ZlcnNrcmlmdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlckxlc2V2aXNuaW5nPXtlckxlc2V2aXNuaW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyFlckxlc2V2aXNuaW5nICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbkVyRWtzcGFuZGVydFtwZXJzb25SZXN1bHRhdC5wZXJzb25JZGVudF0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uUmVzdWx0YXQucGVyc29uLnR5cGUgPT09IFBlcnNvblR5cGUuU8OYS0VSICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFoYXJVdHZpZGV0ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGthbkxlZ2dlVGlsVXR2aWRldFZpbGvDpXIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9eyd0ZXJ0aWFyeSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2luZGV4fV8ke3BlcnNvblJlc3VsdGF0LnBlcnNvbi5mw7hkc2Vsc2RhdG99X19sZWdnLXRpbC12aWxrw6VyLXV0dmlkZXRgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGxlZ2dUaWxWaWxrw6VyVXR2aWRldChwZXJzb25SZXN1bHRhdC5wZXJzb25JZGVudCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT17J3NtYWxsJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uPXs8UGx1c0NpcmNsZUljb24gdGl0bGU9XCJMZWdnIHRpbCB2aWxrw6VyIHV0dmlkZXQgYmFybmV0cnlnZFwiIC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtgTGVnZyB0aWwgdmlsa8OlciB1dHZpZGV0IGJhcm5ldHJ5Z2RgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YHZpcy1za2p1bC12aWxrw6Vyc3Z1cmRlcmluZy0ke2luZGV4fV8ke3BlcnNvblJlc3VsdGF0LnBlcnNvbi5mw7hkc2Vsc2RhdG99fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJ0ZXJ0aWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0UGVyc29uRXJFa3NwYW5kZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wZXJzb25FckVrc3BhbmRlcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BlcnNvblJlc3VsdGF0LnBlcnNvbklkZW50XTogIXBlcnNvbkVyRWtzcGFuZGVydFtwZXJzb25SZXN1bHRhdC5wZXJzb25JZGVudF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb249e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uRXJFa3NwYW5kZXJ0W3BlcnNvblJlc3VsdGF0LnBlcnNvbklkZW50XSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblVwSWNvbiBhcmlhLWhpZGRlbiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvbkRvd25JY29uIGFyaWEtaGlkZGVuIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvblBvc2l0aW9uPVwicmlnaHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3BlcnNvbkVyRWtzcGFuZGVydFtwZXJzb25SZXN1bHRhdC5wZXJzb25JZGVudF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ1NranVsIHZpbGvDpXJzdnVyZGVyaW5nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnVmlzIHZpbGvDpXJzdnVyZGVyaW5nJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvSFN0YWNrPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEFjdGl2aXR5IG1vZGU9e3BlcnNvbkVyRWtzcGFuZGVydFtwZXJzb25SZXN1bHRhdC5wZXJzb25JZGVudF0gPyAndmlzaWJsZScgOiAnaGlkZGVuJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJveCBwYWRkaW5nSW5saW5lPXsnc3BhY2UtNTYgc3BhY2UtMCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3BlcnNvblJlc3VsdGF0LnBlcnNvbi5yZWdpc3Rlcmhpc3RvcmlrayA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmVnaXN0ZXJvcHBseXNuaW5nZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJIaXN0b3Jpa2s9e3BlcnNvblJlc3VsdGF0LnBlcnNvbi5yZWdpc3Rlcmhpc3Rvcmlra31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZsO4ZHNlbHNkYXRvPXtwZXJzb25SZXN1bHRhdC5wZXJzb24uZsO4ZHNlbHNkYXRvfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBbGVydCB2YXJpYW50PVwid2FybmluZ1wiIGNoaWxkcmVuPXsnS2xhcnRlIGlra2UgaGVudGUgcmVnaXN0ZXJvcHBseXNuaW5nZXInfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtPYmplY3QudmFsdWVzKHZpbGvDpXJDb25maWcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCh2YzogSVZpbGvDpXJDb25maWcpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmMucGFydGVyRGV0dGVHamVsZGVyRm9yLmluY2x1ZGVzKHBlcnNvblJlc3VsdGF0LnBlcnNvbi50eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgodmM6IElWaWxrw6VyQ29uZmlnKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgdmlsa8OlclJlc3VsdGF0ZXI6IEZlbHRTdGF0ZTxJVmlsa8OlclJlc3VsdGF0PltdID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uUmVzdWx0YXQudmlsa8OlclJlc3VsdGF0ZXIuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZpbGvDpXJSZXN1bHRhdDogRmVsdFN0YXRlPElWaWxrw6VyUmVzdWx0YXQ+KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpbGvDpXJSZXN1bHRhdC52ZXJkaS52aWxrw6VyVHlwZSA9PT0gdmMua2V5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpbGvDpXJSZXN1bHRhdGVyLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25SZXN1bHRhdC5wZXJzb24udHlwZSA9PT0gUGVyc29uVHlwZS5Tw5hLRVJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRm9yIGJhcm4gw7huc2tlciB2aSBhbGx0aWQgw6UgcmVuZHJlIGFsbGUgdmlsa8OlciBzbGlrIGF0IG1hbiBldnQga2FuIGxlZ2dlIHRpbCB0b20gcGVyaW9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxHZW5lcmlza1ZpbGvDpXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2Ake2luZGV4fV8ke3BlcnNvblJlc3VsdGF0LnBlcnNvbi5mw7hkc2Vsc2RhdG99XyR7dmMua2V5fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJpc2tWaWxrw6VyS2V5PXtgJHtpbmRleH1fJHtwZXJzb25SZXN1bHRhdC5wZXJzb24uZsO4ZHNlbHNkYXRvfV8ke3ZjLmtleX1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbj17cGVyc29uUmVzdWx0YXQucGVyc29ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpbGvDpXJSZXN1bHRhdGVyPXt2aWxrw6VyUmVzdWx0YXRlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWxrw6VyRnJhQ29uZmlnPXt2Y31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNGZWlsbWVsZGluZ2VyPXt2aXNGZWlsbWVsZGluZ2VyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YW5kcmVWdXJkZXJpbmdlci5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QudmFsdWVzKGFubmVuVnVyZGVyaW5nQ29uZmlnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoYW5uZW5WdXJkZXJpbmdDb25maWcgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5uZW5WdXJkZXJpbmdDb25maWcucGFydGVyRGV0dGVHamVsZGVyRm9yLmluY2x1ZGVzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uUmVzdWx0YXQucGVyc29uLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKGFubmVuVnVyZGVyaW5nQ29uZmlnID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEdlbmVyaXNrQW5uZW5WdXJkZXJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17YCR7aW5kZXh9XyR7cGVyc29uUmVzdWx0YXQucGVyc29uLmbDuGRzZWxzZGF0b31fJHthbm5lblZ1cmRlcmluZ0NvbmZpZy5rZXl9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbj17cGVyc29uUmVzdWx0YXQucGVyc29ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kcmVWdXJkZXJpbmdlcj17cGVyc29uUmVzdWx0YXQuYW5kcmVWdXJkZXJpbmdlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFubmVuVnVyZGVyaW5nQ29uZmlnPXthbm5lblZ1cmRlcmluZ0NvbmZpZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc0ZlaWxtZWxkaW5nZXI9e3Zpc0ZlaWxtZWxkaW5nZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0FjdGl2aXR5PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgIDwvPlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBWaWxrw6Vyc3Z1cmRlcmluZ1NramVtYU5vcm1hbDtcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuXG5pbXBvcnQgeyBBbGVydCwgQm9keVNob3J0LCBEZXRhaWwsIEVycm9yTWVzc2FnZSwgRXJyb3JTdW1tYXJ5LCBIU3RhY2ssIExpc3QsIFZTdGFjayB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHsgUmVzc3Vyc1N0YXR1cyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5cbmltcG9ydCB7IEZ5bGxVdFZpbGvDpXJzdnVyZGVyaW5nSVRlc3RtaWxqw7hLbmFwcCB9IGZyb20gJy4vRnlsbFV0Vmlsa8OlcnN2dXJkZXJpbmdJVGVzdG1pbGrDuEtuYXBwJztcbmltcG9ydCB7IGFubmVuVnVyZGVyaW5nRmVpbG1lbGRpbmdJZCB9IGZyb20gJy4vR2VuZXJpc2tBbm5lblZ1cmRlcmluZy9Bbm5lblZ1cmRlcmluZ1RhYmVsbCc7XG5pbXBvcnQgeyB2aWxrw6VyRmVpbG1lbGRpbmdJZCB9IGZyb20gJy4vR2VuZXJpc2tWaWxrw6VyL1ZpbGvDpXJUYWJlbGwnO1xuaW1wb3J0IHsgT3BwZGF0ZXJSZWdpc3Rlcm9wcGx5c25pbmdlciB9IGZyb20gJy4vT3BwZGF0ZXJSZWdpc3Rlcm9wcGx5c25pbmdlcic7XG5pbXBvcnQgVmlsa8OlcnN2dXJkZXJpbmdTa2plbWEgZnJvbSAnLi9Ta2plbWEvVmlsa8OlcnN2dXJkZXJpbmdTa2plbWEnO1xuaW1wb3J0IHsgVMO4bVBlcnNvbm9wcGx5c25pbmdlckNhY2hlSVRlc3RtaWxqw7hLbmFwcCB9IGZyb20gJy4vVMO4bVBlcnNvbm9wcGx5c25pbmdlckNhY2hlSVRlc3RtaWxqw7hLbmFwcCc7XG5pbXBvcnQgeyBNYW5nbGVuZGVGaW5ubWFya21lcmtpbmdWYXJzZWwgfSBmcm9tICcuL1ZhcnNlbC9NYW5nbGVuZGVGaW5ubWFya21lcmtpbmdWYXJzZWwnO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1ZpbGvDpXJzdnVyZGVyaW5nLm1vZHVsZS5jc3MnO1xuaW1wb3J0IHsgdXNlVmlsa8OlcnN2dXJkZXJpbmdDb250ZXh0IH0gZnJvbSAnLi9WaWxrw6Vyc3Z1cmRlcmluZ0NvbnRleHQnO1xuaW1wb3J0IHsgdXNlRmVhdHVyZVRvZ2dsZXMgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9ob29rcy91c2VGZWF0dXJlVG9nZ2xlcyc7XG5pbXBvcnQgeyBCZWhhbmRsaW5nU3RlZywgQmVoYW5kbGluZ8OFcnNhayB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL2JlaGFuZGxpbmcnO1xuaW1wb3J0IHsgRmVhdHVyZVRvZ2dsZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL2ZlYXR1cmVUb2dnbGVzJztcbmltcG9ydCB7XG4gICAgYW5uZW5WdXJkZXJpbmdDb25maWcsXG4gICAgdHlwZSBJQW5uZW5WdXJkZXJpbmcsXG4gICAgdHlwZSBJVmlsa8OlclJlc3VsdGF0LFxuICAgIHZpbGvDpXJDb25maWcsXG59IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL3ZpbGvDpXInO1xuaW1wb3J0IHsgRGF0b2Zvcm1hdCwgaXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvZGF0byc7XG5pbXBvcnQgeyBlclByb2QgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9taWxqw7gnO1xuaW1wb3J0IHsgaGVudEZyb250ZW5kRmVpbG1lbGRpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9yZXNzdXJzVXRpbHMnO1xuaW1wb3J0IHsgdXNlQmVoYW5kbGluZ0NvbnRleHQgfSBmcm9tICcuLi8uLi9jb250ZXh0L0JlaGFuZGxpbmdDb250ZXh0JztcbmltcG9ydCBTa2plbWFzdGVnIGZyb20gJy4uL1NramVtYXN0ZWcnO1xuaW1wb3J0IHsgTWFuZ2xlbmRlU3ZhbGJhcmRtZXJraW5nVmFyc2VsIH0gZnJvbSAnLi9WYXJzZWwvTWFuZ2xlbmRlU3ZhbGJhcmRtZXJraW5nVmFyc2VsJztcbmltcG9ydCB7IHVzZUZhZ3Nha0NvbnRleHQgfSBmcm9tICcuLi8uLi8uLi9GYWdzYWtDb250ZXh0JztcblxuZXhwb3J0IGZ1bmN0aW9uIFZpbGvDpXJzdnVyZGVyaW5nKCkge1xuICAgIGNvbnN0IHRvZ2dsZXMgPSB1c2VGZWF0dXJlVG9nZ2xlcygpO1xuXG4gICAgY29uc3QgeyBmYWdzYWsgfSA9IHVzZUZhZ3Nha0NvbnRleHQoKTtcbiAgICBjb25zdCB7IGJlaGFuZGxpbmcsIHZ1cmRlckVyTGVzZXZpc25pbmcsIHZpbGvDpXJzdnVyZGVyaW5nTmVzdGVPbkNsaWNrLCBiZWhhbmRsaW5nc3N0ZWdTdWJtaXRyZXNzdXJzIH0gPVxuICAgICAgICB1c2VCZWhhbmRsaW5nQ29udGV4dCgpO1xuXG4gICAgY29uc3QgeyBlclZpbGvDpXJzdnVyZGVyaW5nZW5HeWxkaWcsIGhlbnRWaWxrw6VyTWVkRmVpbCwgaGVudEFuZHJlVnVyZGVyaW5nZXJNZWRGZWlsLCB2aWxrw6Vyc3Z1cmRlcmluZyB9ID1cbiAgICAgICAgdXNlVmlsa8OlcnN2dXJkZXJpbmdDb250ZXh0KCk7XG5cbiAgICBjb25zdCBlckxlc2V2aXNuaW5nID0gdnVyZGVyRXJMZXNldmlzbmluZygpO1xuXG4gICAgY29uc3QgW3Zpc0ZlaWxtZWxkaW5nZXIsIHNldHRWaXNGZWlsbWVsZGluZ2VyXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICAgIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcblxuICAgIGNvbnN0IHVyZWdpc3RyZXJ0ZUJhcm4gPVxuICAgICAgICBiZWhhbmRsaW5nLnPDuGtuYWRzZ3J1bm5sYWc/LmJhcm5hTWVkT3BwbHlzbmluZ2VyLmZpbHRlcihiYXJuID0+ICFiYXJuLmVyRm9sa2VyZWdpc3RyZXJ0KSA/PyBbXTtcblxuICAgIGlmICh2aWxrw6Vyc3Z1cmRlcmluZy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+RmlubmVyIGluZ2VuIHZpbGvDpXIgcMOlIGJlaGFuZGxpbmdlbi48L2Rpdj47XG4gICAgfVxuXG4gICAgY29uc3Qgc2tqZW1hRmVpbG1lbGRpbmcgPSBoZW50RnJvbnRlbmRGZWlsbWVsZGluZyhiZWhhbmRsaW5nc3N0ZWdTdWJtaXRyZXNzdXJzKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxTa2plbWFzdGVnXG4gICAgICAgICAgICBza2FsVmlzZUZvcnJpZ2VLbmFwcD17XG4gICAgICAgICAgICAgICAgYmVoYW5kbGluZy7DpXJzYWsgPT09IEJlaGFuZGxpbmfDhXJzYWsuU8OYS05BRCB8fCBiZWhhbmRsaW5nLsOlcnNhayA9PT0gQmVoYW5kbGluZ8OFcnNhay5Gw5hEU0VMU0hFTkRFTFNFXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aXR0ZWw9eydWaWxrw6Vyc3Z1cmRlcmluZyd9XG4gICAgICAgICAgICBmb3JyaWdlT25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChiZWhhbmRsaW5nLsOlcnNhayA9PT0gQmVoYW5kbGluZ8OFcnNhay5Tw5hLTkFEKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlKGAvZmFnc2FrLyR7ZmFnc2FrLmlkfS8ke2JlaGFuZGxpbmcuYmVoYW5kbGluZ0lkfS9yZWdpc3RyZXItc29rbmFkYCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGUoYC9mYWdzYWsvJHtmYWdzYWsuaWR9LyR7YmVoYW5kbGluZy5iZWhhbmRsaW5nSWR9L2ZpbHRyZXJpbmdzcmVnbGVyYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG5lc3RlT25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlckxlc2V2aXNuaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlKGAvZmFnc2FrLyR7ZmFnc2FrLmlkfS8ke2JlaGFuZGxpbmcuYmVoYW5kbGluZ0lkfS90aWxramVudC15dGVsc2VgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVyVmlsa8OlcnN2dXJkZXJpbmdlbkd5bGRpZygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpbGvDpXJzdnVyZGVyaW5nTmVzdGVPbkNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dFZpc0ZlaWxtZWxkaW5nZXIodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG1heFdpZHRoU3R5bGU9eyc4MHJlbSd9XG4gICAgICAgICAgICBzZW5kZXJJbm49e2JlaGFuZGxpbmdzc3RlZ1N1Ym1pdHJlc3N1cnMuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLkhFTlRFUn1cbiAgICAgICAgICAgIHN0ZWc9e0JlaGFuZGxpbmdTdGVnLlZJTEvDhVJTVlVSREVSSU5HfVxuICAgICAgICA+XG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIHtiZWhhbmRsaW5nPy5taWdyZXJpbmdzZGF0byAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxEZXRhaWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmhlbnRldExhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW49e2BTYWtlbiBibGUgbWlncmVydCBmcmEgSW5mb3RyeWdkOiAke2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNvU3RyaW5nOiBiZWhhbmRsaW5nPy5taWdyZXJpbmdzZGF0byxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWxGb3JtYXQ6IERhdG9mb3JtYXQuREFUTyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfWB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8T3BwZGF0ZXJSZWdpc3Rlcm9wcGx5c25pbmdlciAvPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICB7IWVyUHJvZCgpICYmICF0b2dnbGVzW0ZlYXR1cmVUb2dnbGUuc2thbFNranVsZVRlc3RtaWxqw7hrbmFwcGVyXSAmJiAoXG4gICAgICAgICAgICAgICAgPEhTdGFjayBnYXA9XCJzcGFjZS0xNlwiIG1hcmdpbkJsb2NrPXsnc3BhY2UtMzIgc3BhY2UtMzInfT5cbiAgICAgICAgICAgICAgICAgICAgPEZ5bGxVdFZpbGvDpXJzdnVyZGVyaW5nSVRlc3RtaWxqw7hLbmFwcCBiZWhhbmRsaW5nSWQ9e2JlaGFuZGxpbmcuYmVoYW5kbGluZ0lkfSAvPlxuICAgICAgICAgICAgICAgICAgICA8VMO4bVBlcnNvbm9wcGx5c25pbmdlckNhY2hlSVRlc3RtaWxqw7hLbmFwcCAvPlxuICAgICAgICAgICAgICAgIDwvSFN0YWNrPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxWU3RhY2sgZ2FwPVwic3BhY2UtNDBcIj5cbiAgICAgICAgICAgICAgICA8Vmlsa8OlcnN2dXJkZXJpbmdTa2plbWEgdmlzRmVpbG1lbGRpbmdlcj17dmlzRmVpbG1lbGRpbmdlcn0gLz5cbiAgICAgICAgICAgICAgICB7dXJlZ2lzdHJlcnRlQmFybi5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEFsZXJ0IHZhcmlhbnQ9XCJpbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0PkR1IGhhciByZWdpc3RyZXJ0IGbDuGxnZW5kZSBiYXJuIHNvbSBpa2tlIGVyIHJlZ2lzdHJlcnQgaSBGb2xrZXJlZ2lzdGVyZXQ6PC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGlzdCBhcz17J29sJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3VyZWdpc3RyZXJ0ZUJhcm4ubWFwKHVyZWdpc3RyZXJ0QmFybiA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0ga2V5PXtgJHt1cmVnaXN0cmVydEJhcm4ubmF2bn1fJHt1cmVnaXN0cmVydEJhcm4uZsO4ZHNlbHNkYXRvfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YCR7dXJlZ2lzdHJlcnRCYXJuLm5hdm59IC0gJHtpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc29TdHJpbmc6IHVyZWdpc3RyZXJ0QmFybi5mw7hkc2Vsc2RhdG8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5EQVRPLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0PkRldHRlIHZpbCBmw7hyZSB0aWwgYXZzbGFnIGZvciBiYXJuYSBpIGxpc3Rlbi48L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgPC9BbGVydD5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHsoaGVudFZpbGvDpXJNZWRGZWlsKCkubGVuZ3RoID4gMCB8fCBoZW50QW5kcmVWdXJkZXJpbmdlck1lZEZlaWwoKS5sZW5ndGggPiAwKSAmJiB2aXNGZWlsbWVsZGluZ2VyICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEVycm9yU3VtbWFyeSBoZWFkaW5nPXsnRm9yIMOlIGfDpSB2aWRlcmUgbcOlIGR1IHJldHRlIG9wcCBmw7hsZ2VuZGU6J30gc2l6ZT1cInNtYWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmhlbnRWaWxrw6VyTWVkRmVpbCgpLm1hcCgodmlsa8OlclJlc3VsdGF0OiBJVmlsa8OlclJlc3VsdGF0KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWlsbWVsZGluZzogYEV0IHZpbGvDpXIgYXYgdHlwZW4gJyR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWxrw6VyQ29uZmlnW3ZpbGvDpXJSZXN1bHRhdC52aWxrw6VyVHlwZV0udGl0dGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0nIGVyIGlra2UgZnVsbHN0ZW5kaWdgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2plbWFlbGVtZW50SWQ6IHZpbGvDpXJGZWlsbWVsZGluZ0lkKHZpbGvDpXJSZXN1bHRhdCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmhlbnRBbmRyZVZ1cmRlcmluZ2VyTWVkRmVpbCgpLm1hcCgoYW5uZW5WdXJkZXJpbmc6IElBbm5lblZ1cmRlcmluZykgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVpbG1lbGRpbmc6IGBFdCB2aWxrw6VyIGF2IHR5cGVuICcke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5uZW5WdXJkZXJpbmdDb25maWdbYW5uZW5WdXJkZXJpbmcudHlwZV0udGl0dGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0nIGVyIGlra2UgZnVsbHN0ZW5kaWdgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2plbWFlbGVtZW50SWQ6IGFubmVuVnVyZGVyaW5nRmVpbG1lbGRpbmdJZChhbm5lblZ1cmRlcmluZyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXS5tYXAoaXRlbSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEVycm9yU3VtbWFyeS5JdGVtIGhyZWY9e2AjJHtpdGVtLnNramVtYWVsZW1lbnRJZH1gfT57aXRlbS5mZWlsbWVsZGluZ308L0Vycm9yU3VtbWFyeS5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvRXJyb3JTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge3NramVtYUZlaWxtZWxkaW5nICE9PSAnJyAmJiBza2plbWFGZWlsbWVsZGluZyAhPT0gdW5kZWZpbmVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEVycm9yTWVzc2FnZT57c2tqZW1hRmVpbG1lbGRpbmd9PC9FcnJvck1lc3NhZ2U+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8TWFuZ2xlbmRlU3ZhbGJhcmRtZXJraW5nVmFyc2VsIC8+XG4gICAgICAgICAgICAgICAgPE1hbmdsZW5kZUZpbm5tYXJrbWVya2luZ1ZhcnNlbCAvPlxuICAgICAgICAgICAgPC9WU3RhY2s+XG4gICAgICAgIDwvU2tqZW1hc3RlZz5cbiAgICApO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgTGluayBhcyBSZWFjdFJvdXRlckxpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEFsZXJ0LCBCb2R5U2hvcnQsIEJveCwgSFN0YWNrLCBMaW5rLCBMaW5rQ2FyZCwgVlN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgeyBGb250U2l6ZUhlYWRpbmdNZWRpdW0sIEZvbnRTaXplWGxhcmdlIH0gZnJvbSAnQG5hdmlrdC9kcy10b2tlbnMvZGlzdC90b2tlbnMnO1xuXG5pbXBvcnQgdHlwZSB7IFZpc25pbmdCZWhhbmRsaW5nIH0gZnJvbSAnLi92aXNuaW5nQmVoYW5kbGluZyc7XG5pbXBvcnQgeyBCZWhhbmRsaW5nU3RhdHVzIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXIvYmVoYW5kbGluZyc7XG5pbXBvcnQgdHlwZSB7IElCZWhhbmRsaW5nc3RlbWEgfSBmcm9tICcuLi8uLi8uLi90eXBlci9iZWhhbmRsaW5nc3RlbWEnO1xuaW1wb3J0IHsgdGlsQmVoYW5kbGluZ3N0ZW1hIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXIvYmVoYW5kbGluZ3N0ZW1hJztcbmltcG9ydCB7IEZhZ3Nha1R5cGUgfSBmcm9tICcuLi8uLi8uLi90eXBlci9mYWdzYWsnO1xuaW1wb3J0IHsgaGVudEFrdGl2QmVoYW5kbGluZ1DDpU1pbmltYWxGYWdzYWssIGhlbnRGYWdzYWtTdGF0dXNWaXNuaW5nIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZmFnc2FrJztcbmltcG9ydCB7IHVzZUZhZ3Nha0NvbnRleHQgfSBmcm9tICcuLi9GYWdzYWtDb250ZXh0JztcblxuZXhwb3J0IGNvbnN0IFNha3NvdmVyc2lrdFBhbmVsQnJlZGRlID0gYGNhbGMoMTAgKiB2YXIoLS1heC1zcGFjZS02NCkpYDtcblxuY29uc3QgSGVhZGVyVGVrc3QgPSBzdHlsZWQoQm9keVNob3J0KWBcbiAgICBmb250LXNpemU6ICR7Rm9udFNpemVYbGFyZ2V9O1xuYDtcblxuY29uc3QgQm9keVRla3N0ID0gc3R5bGVkKEJvZHlTaG9ydClgXG4gICAgZm9udC1zaXplOiAke0ZvbnRTaXplSGVhZGluZ01lZGl1bX07XG5gO1xuXG5jb25zdCBTdHlsZWRBbGVydCA9IHN0eWxlZChBbGVydClgXG4gICAgd2lkdGg6ICR7U2Frc292ZXJzaWt0UGFuZWxCcmVkZGV9O1xuICAgIG1hcmdpbi10b3A6IHZhcigtLWF4LXNwYWNlLTY0KTtcbmA7XG5cbmZ1bmN0aW9uIElubmhvbGRzdGFiZWxsKCkge1xuICAgIGNvbnN0IHsgZmFnc2FrIH0gPSB1c2VGYWdzYWtDb250ZXh0KCk7XG5cbiAgICBjb25zdCBiZWhhbmRsaW5nc3RlbWE6IElCZWhhbmRsaW5nc3RlbWEgfCB1bmRlZmluZWQgPVxuICAgICAgICBmYWdzYWsubMO4cGVuZGVLYXRlZ29yaSAmJlxuICAgICAgICBmYWdzYWsubMO4cGVuZGVVbmRlcmthdGVnb3JpICYmXG4gICAgICAgIHRpbEJlaGFuZGxpbmdzdGVtYShmYWdzYWsubMO4cGVuZGVLYXRlZ29yaSwgZmFnc2FrLmzDuHBlbmRlVW5kZXJrYXRlZ29yaSk7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPEhTdGFjayBnYXA9XCJzcGFjZS04MFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8SGVhZGVyVGVrc3Qgc3BhY2luZz5CZWhhbmRsaW5nc3RlbWE8L0hlYWRlclRla3N0PlxuICAgICAgICAgICAgICAgIDxCb2R5VGVrc3Qgd2VpZ2h0PVwic2VtaWJvbGRcIj57YmVoYW5kbGluZ3N0ZW1hID8gYmVoYW5kbGluZ3N0ZW1hLm5hdm4gOiAnLSd9PC9Cb2R5VGVrc3Q+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPEhlYWRlclRla3N0IHNwYWNpbmc+U3RhdHVzPC9IZWFkZXJUZWtzdD5cbiAgICAgICAgICAgICAgICA8Qm9keVRla3N0IHdlaWdodD1cInNlbWlib2xkXCI+e2hlbnRGYWdzYWtTdGF0dXNWaXNuaW5nKGZhZ3Nhayl9PC9Cb2R5VGVrc3Q+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9IU3RhY2s+XG4gICAgKTtcbn1cblxuZnVuY3Rpb24gRmFnc2FrVHlwZUxhYmVsKCkge1xuICAgIGNvbnN0IHsgZmFnc2FrIH0gPSB1c2VGYWdzYWtDb250ZXh0KCk7XG4gICAgc3dpdGNoIChmYWdzYWsuZmFnc2FrVHlwZSkge1xuICAgICAgICBjYXNlIEZhZ3Nha1R5cGUuSU5TVElUVVNKT046XG4gICAgICAgICAgICByZXR1cm4gPFN0eWxlZEFsZXJ0IHZhcmlhbnQ9eydpbmZvJ30+RGV0dGUgZXIgZW4gaW5zdGl0dXNqb25zc2FrPC9TdHlsZWRBbGVydD47XG4gICAgICAgIGNhc2UgRmFnc2FrVHlwZS5CQVJOX0VOU0xJR19NSU5EUkXDhVJJRzpcbiAgICAgICAgICAgIHJldHVybiA8U3R5bGVkQWxlcnQgdmFyaWFudD17J2luZm8nfT5EZXR0ZSBlciBlbiBlbnNsaWcgbWluZHJlw6VyaWctc2FrPC9TdHlsZWRBbGVydD47XG4gICAgICAgIGNhc2UgRmFnc2FrVHlwZS5TS0pFUk1FVF9CQVJOOlxuICAgICAgICAgICAgcmV0dXJuIDxTdHlsZWRBbGVydCB2YXJpYW50PXsnaW5mbyd9PkRldHRlIGVyIGVuIHNramVybWV0IGJhcm4tc2FrPC9TdHlsZWRBbGVydD47XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cbmNvbnN0IGdlbmVyZXJIb3ZlclRla3N0ID0gKGJlaGFuZGxpbmc6IFZpc25pbmdCZWhhbmRsaW5nKSA9PiB7XG4gICAgcmV0dXJuIGJlaGFuZGxpbmcuc3RhdHVzID09PSBCZWhhbmRsaW5nU3RhdHVzLkFWU0xVVFRFVCA/ICdHw6UgdGlsIGdqZWxkZW5kZSB2ZWR0YWsnIDogJ0fDpSB0aWwgw6VwZW4gYmVoYW5kbGluZyc7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gRmFnc2FrTGVua2VwYW5lbCgpIHtcbiAgICBjb25zdCB7IGZhZ3NhayB9ID0gdXNlRmFnc2FrQ29udGV4dCgpO1xuICAgIGNvbnN0IGFrdGl2QmVoYW5kbGluZzogVmlzbmluZ0JlaGFuZGxpbmcgfCB1bmRlZmluZWQgPSBoZW50QWt0aXZCZWhhbmRsaW5nUMOlTWluaW1hbEZhZ3NhayhmYWdzYWspO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIHtha3RpdkJlaGFuZGxpbmcgPyAoXG4gICAgICAgICAgICAgICAgPEJveCB3aWR0aD17U2Frc292ZXJzaWt0UGFuZWxCcmVkZGV9IG1hcmdpbkJsb2NrPXsnc3BhY2UtMzIgc3BhY2UtMCd9PlxuICAgICAgICAgICAgICAgICAgICA8TGlua0NhcmQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGlua0NhcmQuVGl0bGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpbmtDYXJkLkFuY2hvciBhc0NoaWxkPXt0cnVlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgYXM9e1JlYWN0Um91dGVyTGlua30gdG89e2AvZmFnc2FrLyR7ZmFnc2FrLmlkfS8ke2FrdGl2QmVoYW5kbGluZy5iZWhhbmRsaW5nSWR9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Z2VuZXJlckhvdmVyVGVrc3QoYWt0aXZCZWhhbmRsaW5nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlua0NhcmQuQW5jaG9yPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rQ2FyZC5UaXRsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rQ2FyZC5EZXNjcmlwdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VlN0YWNrIHBhZGRpbmdCbG9jaz17J3NwYWNlLTE2IHNwYWNlLTAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElubmhvbGRzdGFiZWxsIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WU3RhY2s+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0xpbmtDYXJkLkRlc2NyaXB0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L0xpbmtDYXJkPlxuICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPXtTYWtzb3ZlcnNpa3RQYW5lbEJyZWRkZX1cbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luQmxvY2s9eydzcGFjZS0zMiBzcGFjZS0wJ31cbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I9XCJuZXV0cmFsLXN0cm9uZ1wiXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoPVwiMVwiXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cIjJcIlxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nPVwic3BhY2UtMzJcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPElubmhvbGRzdGFiZWxsIC8+XG4gICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPEZhZ3Nha1R5cGVMYWJlbCAvPlxuICAgICAgICA8Lz5cbiAgICApO1xufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMWUwOWRhZjAxNzU3N2QyMzFlNzVcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJzdHlsZWQiLCJDaGVja21hcmtDaXJjbGVGaWxsSWNvbiIsIkV4Y2xhbWF0aW9ubWFya1RyaWFuZ2xlRmlsbEljb24iLCJJbmZvcm1hdGlvblNxdWFyZUZpbGxJY29uIiwiWE1hcmtPY3RhZ29uRmlsbEljb24iLCJTdGF0dXMiLCJPa0lrb24iLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiX2MiLCJGZWlsSWtvbiIsIl90ZW1wbGF0ZU9iamVjdDIiLCJfYzIiLCJBZHZhcnNlbElrb24iLCJfdGVtcGxhdGVPYmplY3QzIiwiX2MzIiwiSW5mb0lrb24iLCJfdGVtcGxhdGVPYmplY3Q0IiwiX2M0IiwiU3RhdHVzSWtvbiIsIl9yZWYiLCJzdGF0dXMiLCJ0aXRsZSIsIk9LIiwiY3JlYXRlRWxlbWVudCIsIkZFSUwiLCJBRFZBUlNFTCIsIklORk8iLCJfYzUiLCIkUmVmcmVzaFJlZyQiLCJCb2R5U2hvcnQiLCJCb3giLCJIZWFkaW5nIiwiVlN0YWNrIiwiVGV4dERhbmdlclN1YnRsZSIsIlRleHRJbmZvU3VidGxlIiwiVGV4dE5ldXRyYWwiLCJUZXh0U3VjY2Vzc1N1YnRsZSIsIkluZm9ybWFzam9uc2JvbGsiLCJCZWhhbmRsaW5nUmVzdWx0YXQiLCJiZWhhbmRsaW5nc3Jlc3VsdGF0ZXIiLCJiZWhhbmRsaW5nc3N0YXR1c2VyIiwiYmVoYW5kbGluZ3N0eXBlciIsImJlaGFuZGxpbmfDhXJzYWsiLCJlckJlaGFuZGxpbmdIZW5sYWd0IiwiRGF0b2Zvcm1hdCIsImlzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyIsInVzZUZhZ3Nha0NvbnRleHQiLCJzYWtzdHlwZSIsInVzZUJlaGFuZGxpbmdDb250ZXh0IiwiaGVudFJlc3VsdGF0ZmFyZ2UiLCJiZWhhbmRsaW5nUmVzdWx0YXQiLCJJTk5WSUxHRVQiLCJERUxWSVNfSU5OVklMR0VUIiwiRk9SVFNBVFRfSU5OVklMR0VUIiwiRU5EUkVUX1VUQkVUQUxJTkciLCJFTkRSRVRfVVRFTl9VVEJFVEFMSU5HIiwiQVZTTMOFVFQiLCJPUFBIw5hSVCIsIkZPUlRTQVRUX09QUEjDmFJUIiwiSUtLRV9WVVJERVJUIiwiaGVudFJlc3VsdGF0ZmFyZ2VUZWtzdCIsIlN0eWxlZEhlYWRpbmciLCJCZWhhbmRsaW5nc2tvcnQiLCJfcyIsIl9iZWhhbmRsaW5nJHZlZHRhayIsIl91c2VGYWdzYWtDb250ZXh0IiwiZmFnc2FrIiwiX3VzZUJlaGFuZGxpbmdDb250ZXh0IiwiYmVoYW5kbGluZyIsImJlaGFuZGxpbmdlciIsImFudGFsbEJlaGFuZGxpbmdlciIsImxlbmd0aCIsImJlaGFuZGxpbmdJbmRleCIsImZpbmRJbmRleCIsImIiLCJiZWhhbmRsaW5nSWQiLCJ0aXR0ZWwiLCJjb25jYXQiLCJ0eXBlIiwibmF2biIsInRvTG93ZXJDYXNlIiwicGFkZGluZyIsImJvcmRlckNvbG9yIiwicmVzdWx0YXQiLCJib3JkZXJXaWR0aCIsImJvcmRlclJhZGl1cyIsIm1hcmdpbiIsImdhcCIsIm1hcmdpbkJsb2NrIiwic2l6ZSIsImxldmVsIiwiw6Vyc2FrIiwibGFiZWwiLCJ0ZWtzdCIsInRla3N0RmFyZ2UiLCJzw7hrbmFkTW90dGF0dERhdG8iLCJpc29TdHJpbmciLCJ0aWxGb3JtYXQiLCJEQVRPIiwib3BwcmV0dGV0VGlkc3B1bmt0IiwidmVkdGFrIiwidmVkdGFrc2RhdG8iLCJkZWZhdWx0U3RyaW5nIiwiYXJiZWlkc2ZvcmRlbGluZ1DDpUJlaGFuZGxpbmciLCJiZWhhbmRsZW5kZUVuaGV0SWQiLCJ0ZWtzdEhvdmVyIiwiYmVoYW5kbGVuZGVFbmhldE5hdm4iLCJ1c2VFZmZlY3QiLCJ1c2VOYXZpZ2F0ZSIsIlBlbmNpbEljb24iLCJBbGVydCIsIkJ1dHRvbiIsIkVycm9yTWVzc2FnZSIsIkVycm9yU3VtbWFyeSIsIkxhYmVsIiwiYnlnZ0RhdGFSZXNzdXJzIiwiUmVzc3Vyc1N0YXR1cyIsIkVuZHJldFV0YmV0YWxpbmdBbmRlbFRhYmVsbCIsIktvbXBldGFuc2VTa2plbWEiLCJrb21wZXRhbnNlRmVpbG1lbGRpbmdJZCIsInVzZUXDuHMiLCJ1dGVubGFuZHNrUGVyaW9kZUJlbMO4cEZlaWxtZWxkaW5nSWQiLCJVdGJldGFsdEFubmV0TGFuZCIsInVzZU9wcGRhdGVyVmFsdXRha3Vyc09nU2ltdWxlcmluZ1DDpUJlc2x1dHRlclN0ZWciLCJ2YWx1dGFrdXJzRmVpbG1lbGRpbmdJZCIsIlZhbHV0YWt1cnNlciIsIk1pZ3JlcmluZ0luZm9ib2tzIiwiT3Bwc3VtbWVyaW5nc2Jva3MiLCJUaWxramVudFl0ZWxzZVRpZHNsaW5qZSIsInVzZUJlaGFuZGxpbmdzcmVzdWx0YXQiLCJ1c2VGYWdzYWtJZCIsInVzZU9wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWwiLCJ1c2VUaWRzbGluamVDb250ZXh0IiwiQmVoYW5kbGluZ1N0ZWciLCJCZWhhbmRsaW5nc3R5cGUiLCJwZXJpb2RlT3ZlcmxhcHBlck1lZFZhbGd0RGF0byIsImZvcm1hdGVySWRlbnQiLCJzbMOlU2FtbWVuTGlzdGVUaWxTdHJlbmciLCJoZW50RnJvbnRlbmRGZWlsbWVsZGluZyIsIlNramVtYXN0ZWciLCJFbmRyZXRVdGJldGFsaW5nQW5kZWwiLCJkaXYiLCJTdHlsZWRFZGl0SWtvbiIsIlN0eWxlZEFsZXJ0IiwiU3R5bGVkRXJyb3JTdW1tYXJ5IiwiQmVoYW5kbGluZ3NyZXN1bHRhdCIsIl/DpXBlbkJlaGFuZGxpbmcka29tcGUiLCJfw6VwZW5CZWhhbmRsaW5nJHV0ZW5sIiwiX8OlcGVuQmVoYW5kbGluZyR1dGVubDIiLCLDpXBlbkJlaGFuZGxpbmciLCJuYXZpZ2F0ZSIsImZhZ3Nha0lkIiwic2V0dMOFcGVuQmVoYW5kbGluZyIsIl91c2VCZWhhbmRsaW5nc3Jlc3VsdCIsInZpc0ZlaWxtZWxkaW5nZXIiLCJzZXR0VmlzRmVpbG1lbGRpbmdlciIsImhlbnRQZXJzb25lck1lZFVneWxkaWdFdHRlcmJldGFsaW5nc3BlcmlvZGUiLCJwZXJzb25lck1lZFVneWxkaWdFdHRlcmJldGFsaW5nc3BlcmlvZGUiLCJfdXNlT3BwcmV0dEVuZHJldFV0YmUiLCJvblN1Y2Nlc3MiLCJvcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsIiwibXV0YXRlIiwiaXNPcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsUGVuZGluZyIsImlzUGVuZGluZyIsImlzT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbEVycm9yIiwiaXNFcnJvciIsIm9wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxFcnJvciIsImVycm9yIiwiX3VzZVRpZHNsaW5qZUNvbnRleHQiLCJha3RpdkV0aWtldHQiLCJmaWx0ZXJPZ1NvcnRlckFuZGVsUGVyc29uZXJJR3J1bm5sYWciLCJmaWx0ZXJPZ1NvcnRlckdydW5ubGFnUGVyc29uZXJNZWRBbmRlbGVyIiwiX3VzZUJlaGFuZGxpbmdDb250ZXh0MiIsInZ1cmRlckVyTGVzZXZpc25pbmciLCJiZWhhbmRsaW5ncmVzdWx0YXROZXN0ZU9uQ2xpY2siLCJiZWhhbmRsaW5nc3N0ZWdTdWJtaXRyZXNzdXJzIiwiX3VzZUXDuHMiLCJlckXDuHNJbmZvcm1hc2pvbkd5bGRpZyIsImtvbXBldGFuc2VyIiwiaGVudEtvbXBldGFuc2VyTWVkRmVpbCIsInV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwIiwiZXJVdGJldGFsdEFubmV0TGFuZEJlbMO4cEd5bGRpZ2UiLCJoZW50VXRiZXRhbHRBbm5ldExhbmRCZWzDuHBNZWRGZWlsIiwidmFsdXRha3Vyc2VyIiwiZXJWYWx1dGFrdXJzZXJHeWxkaWdlIiwiaGVudFZhbHV0YWt1cnNlck1lZEZlaWwiLCJlckxlc2V2aXNuaW5nIiwiZmlublV0YmV0YWxpbmdzcGVyaW9kZUZvckFrdGl2RXRpa2V0dCIsInV0YmV0YWxpbmdzcGVyaW9kZXIiLCJmaW5kIiwidXRiZXRhbGluZ3NwZXJpb2RlIiwicGVyaW9kZUZvbSIsInBlcmlvZGVUb20iLCJkYXRlIiwidW5kZWZpbmVkIiwiZ3J1bm5sYWdQZXJzb25lciIsInBlcnNvbmVyIiwicGVyc29uZXJNZWRBbmRlbGVyVGlsa2plbnRZdGVsc2UiLCJ0aWRzbGluamVQZXJzb25lciIsImVyTWlncmVyaW5nRnJhSW5mb3RyeWdkIiwiTUlHUkVSSU5HX0ZSQV9JTkZPVFJZR0QiLCJoYXJLb21wZXRhbnNlciIsImhhclV0ZW5sYW5kc2tlQmVsw7hwZXIiLCJ1dGVubGFuZHNrZVBlcmlvZGViZWzDuHAiLCJoYXJWYWx1dGFrdXJzZXIiLCJoYXJFw7hzIiwic2VuZGVySW5uIiwiSEVOVEVSIiwiY2xhc3NOYW1lIiwiZm9ycmlnZU9uQ2xpY2siLCJuZXN0ZU9uQ2xpY2siLCJtYXhXaWR0aFN0eWxlIiwiZmVpbG1lbGRpbmciLCJzdGVnIiwiQkVIQU5ETElOR1NSRVNVTFRBVCIsInZhcmlhbnQiLCJtYXAiLCJpZGVudCIsImZhZ3Nha1R5cGUiLCJvbkNsaWNrIiwiaWNvbiIsImRpc2FibGVkIiwibG9hZGluZyIsIm1lc3NhZ2UiLCJlbmRyZXRVdGJldGFsaW5nQW5kZWxlciIsImhlYWRpbmciLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJrb21wZXRhbnNlIiwiYmFybklkZW50ZXIiLCJmb20iLCJza2plbWFlbGVtZW50SWQiLCJ1dGVubGFuZHNrUGVyaW9kZUJlbMO4cCIsInZhbHV0YWt1cnMiLCJpdGVtIiwiSXRlbSIsImhyZWYiLCJ1c2VTdGF0ZSIsIkXDuHNQZXJpb2RlU3RhdHVzIiwic29ydGVyRcO4c1BlcmlvZGVyIiwidXNlS29tcGV0YW5zZSIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInNldHRLb21wZXRhbnNlciIsInNvcnQiLCJwZXJpb2RlQSIsInBlcmlvZGVCIiwiZXJLb21wZXRhbnNlckd5bGRpZ2UiLCJpZCIsIklLS0VfVVRGWUxUIiwiaXNCZWZvcmUiLCJIU3RhY2siLCJTcGFjZXIiLCJCb3JkZXJOZXV0cmFsIiwiRm9udFdlaWdodEJvbGQiLCJTcGFjZTE2IiwiVGV4dERhbmdlciIsImlzb1N0cmluZ1RpbERhdGUiLCJmb3JtYXRlckJlbMO4cCIsIkJvbGRUZWtzdE1lZEZhcmdlIiwicHJvcHMiLCIkZmFyZ2UiLCJIU3RhY2tNZWRCb3JkZXJUb3AiLCJTaW11bGVyaW5nUGFuZWwiLCJfcGVyaW9kZXIkZmluZCIsIl9yZWYkc2ltdWxlcmluZyIsInNpbXVsZXJpbmciLCJmZWlsdXRiZXRhbGluZyIsImV0dGVyYmV0YWxpbmciLCJmb21EYXRvTmVzdGVQZXJpb2RlIiwicGVyaW9kZXIiLCJ0b21TaXN0ZVV0YmV0YWxpbmciLCJrYXBpdGFsaXNlclRla3N0IiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsImZvcm1hdGVyQmVsw7hwRWxsZXJEYXNoT21VbmRlZmluZWQiLCJiZWzDuHAiLCJuZXN0ZVBlcmlvZGUiLCJwZXJpb2RlIiwiZXJGw7hyTmVzdGVQZXJpb2RlIiwicGFuZWxUaXR0ZWwiLCJ1dGJldGFsdGVQZXJpb2RlciIsImZpbHRlciIsIk3DhU5FRF/DhVJfTkFWTiIsIm1heFdpZHRoIiwid2VpZ2h0IiwiTGlnaHRCdWxiRmlsbEljb24iLCJQbHVzQ2lyY2xlSWNvbiIsIkZpZWxkc2V0IiwiRmplcm5VdHZpZGV0QmFybmV0cnlnZFZpbGvDpXIiLCJWaWxrw6VyVGFiZWxsIiwidXNlRmVhdHVyZVRvZ2dsZXMiLCJGZWF0dXJlVG9nZ2xlIiwiUGVyc29uVHlwZSIsIlJlc3VsdGF0IiwiVmlsa8OlclR5cGUiLCJ1c2VWaWxrw6Vyc3Z1cmRlcmluZ0NvbnRleHQiLCJWaWxrw6VyU3VibWl0IiwiQ29udGFpbmVyIiwiR2VuZXJpc2tWaWxrw6VyIiwicGVyc29uIiwidmlsa8OlckZyYUNvbmZpZyIsInZpbGvDpXJSZXN1bHRhdGVyIiwiZ2VuZXJpc2tWaWxrw6VyS2V5IiwidG9nZ2xlcyIsImVyTWlncmVyaW5nc2JlaGFuZGxpbmciLCJfdXNlVmlsa8OlcnN2dXJkZXJpbmdDIiwic2V0dFZpbGvDpXJTdWJtaXQiLCJwb3N0Vmlsa8OlciIsInZpbGvDpXJTdWJtaXQiLCJ2aXNGZWlsbWVsZGluZ2VyRm9yVmlsa8OlciIsInNldHRWaXNGZWlsbWVsZGluZ2VyRm9yVmlsa8OlciIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0Iiwic2V0dEZlaWxtZWxkaW5nIiwibGVnZ1RpbFBlcmlvZGVLbmFwcElkIiwic2V0dEZva3VzUMOlTGVnZ1RpbFBlcmlvZGVLbmFwcCIsIl9kb2N1bWVudCRnZXRFbGVtZW50QiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJmb2N1cyIsImjDpW5kdGVyTnlQZXJpb2RlVmlsa8OlcnN2dXJkZXJpbmciLCJwcm9taXNlIiwidGhlbiIsIm9wcGRhdGVydEJlaGFuZGxpbmciLCJOT05FIiwiU1VLU0VTUyIsIkZFSUxFVCIsIkZVTktTSk9ORUxMX0ZFSUwiLCJJS0tFX1RJTEdBTkciLCJmcm9udGVuZEZlaWxtZWxkaW5nIiwic2thbFZpc2VMZWdnVGlsS25hcHAiLCJ1dnVyZGVydFBlcmlvZGVQw6VWaWxrw6VyIiwidmlsa8OlciIsInZlcmRpIiwic2thbFZpc2VGamVyblV0dmlkZXRCYXJuZXRyeWdkS25hcHAiLCJ1dHZpZGV0Vmlsa8OlciIsInZpbGvDpXJSZXN1bHRhdCIsInZpbGvDpXJUeXBlIiwiVVRWSURFVF9CQVJORVRSWUdEIiwiU8OYS0VSIiwia2V5Iiwic2thbFZpc2VMeXNww6ZyZSIsInNrYWxWaXNlVmFyc2VsbGFtcGVGb3JNYW51ZWx0TGFndFRpbEJhcm4iLCJWSUxLw4VSU1ZVUkRFUklORyIsInNvbWUiLCJiZWdydW5uZWxzZUZvck1hbnVlbGxLb250cm9sbCIsImxlZ2VuZCIsImhpZGVMZWdlbmQiLCJhbGlnbiIsImZvbnRTaXplIiwiY29sb3IiLCJzZXR0Rm9rdXNQw6VLbmFwcCIsInBlcnNvbklkZW50IiwiUE9TVCIsInNsZXR0Vmlsa8OlcklkIiwiQWN0aXZpdHkiLCJDaGV2cm9uRG93bkljb24iLCJDaGV2cm9uVXBJY29uIiwiTGlzdCIsIlBlcnNvbkluZm9ybWFzam9uIiwiQmVoYW5kbGluZ8OFcnNhayIsImFubmVuVnVyZGVyaW5nQ29uZmlnIiwidmlsa8OlckNvbmZpZyIsIkdlbmVyaXNrQW5uZW5WdXJkZXJpbmciLCJSZWdpc3Rlcm9wcGx5c25pbmdlciIsInV0bGVkVmlsa8OlclNvbU3DpUtvbnRyb2xsZXJlc1BlclBlcnNvbiIsInN0eWxlcyIsIlZpbGvDpXJzdnVyZGVyaW5nU2tqZW1hTm9ybWFsIiwidmlsa8OlcnN2dXJkZXJpbmciLCJha3RpdlNldHRQw6VWZW50Iiwia2FuTGVnZ2VUaWxVdHZpZGV0Vmlsa8OlciIsIktPUlJFS1NKT05fVkVEVEFLU0JSRVYiLCJURUtOSVNLX0VORFJJTkciLCJLTEFHRSIsIkVORFJFX01JR1JFUklOR1NEQVRPIiwiSVZFUktTRVRURV9LQV9WRURUQUsiLCJwZXJzb25IYXJJa2tldnVyZGVydFZpbGvDpXIiLCJwZXJzb25SZXN1bHRhdCIsInZpbGvDpXJSZXN1bHRhdEZlbHQiLCJoZW50RWtzcGFudGRlcnRlUGVyc29uZXIiLCJyZWR1Y2UiLCJwZXJzb25NYXBFa3NwYW5kZXJ0IiwiX29iamVjdFNwcmVhZCIsIl9kZWZpbmVQcm9wZXJ0eSIsInBlcnNvbkVyRWtzcGFuZGVydCIsInNldHRQZXJzb25FckVrc3BhbmRlcnQiLCJsZWdnVGlsVmlsa8OlclV0dmlkZXQiLCJ2aWxrw6VyU29tTcOlS29udHJvbGxlcmVzUGVyUGVyc29uIiwiT2JqZWN0IiwiZW50cmllcyIsInNrYWxWaXNlVmFyc2VsYm9rc0ZvclZpbGvDpXJTb21Nw6VLb250cm9sbGVyZXMiLCJCRVNMVVRURV9WRURUQUsiLCJGcmFnbWVudCIsImNvbnRlbnRNYXhXaWR0aCIsInN0eWxlIiwid2lkdGgiLCJhcyIsIl9yZWYyIiwiX3JlZjMiLCJhdnZpayIsImluZGV4IiwiYW5kcmVWdXJkZXJpbmdlciIsImhhclV0dmlkZXQiLCJmw7hkc2Vsc2RhdG8iLCJ3cmFwIiwianVzdGlmeSIsInBlcnNvbkxpbmplIiwic29tT3ZlcnNrcmlmdCIsImljb25Qb3NpdGlvbiIsIm1vZGUiLCJwYWRkaW5nSW5saW5lIiwicmVnaXN0ZXJoaXN0b3Jpa2siLCJyZWdpc3Rlckhpc3RvcmlrayIsImNoaWxkcmVuIiwidmFsdWVzIiwidmMiLCJwYXJ0ZXJEZXR0ZUdqZWxkZXJGb3IiLCJpbmNsdWRlcyIsIkRldGFpbCIsIkZ5bGxVdFZpbGvDpXJzdnVyZGVyaW5nSVRlc3RtaWxqw7hLbmFwcCIsImFubmVuVnVyZGVyaW5nRmVpbG1lbGRpbmdJZCIsInZpbGvDpXJGZWlsbWVsZGluZ0lkIiwiT3BwZGF0ZXJSZWdpc3Rlcm9wcGx5c25pbmdlciIsIlZpbGvDpXJzdnVyZGVyaW5nU2tqZW1hIiwiVMO4bVBlcnNvbm9wcGx5c25pbmdlckNhY2hlSVRlc3RtaWxqw7hLbmFwcCIsIk1hbmdsZW5kZUZpbm5tYXJrbWVya2luZ1ZhcnNlbCIsImVyUHJvZCIsIk1hbmdsZW5kZVN2YWxiYXJkbWVya2luZ1ZhcnNlbCIsIlZpbGvDpXJzdnVyZGVyaW5nIiwiX2JlaGFuZGxpbmckc8O4a25hZHNnciIsIl9iZWhhbmRsaW5nJHPDuGtuYWRzZ3IyIiwidmlsa8OlcnN2dXJkZXJpbmdOZXN0ZU9uQ2xpY2siLCJlclZpbGvDpXJzdnVyZGVyaW5nZW5HeWxkaWciLCJoZW50Vmlsa8Olck1lZEZlaWwiLCJoZW50QW5kcmVWdXJkZXJpbmdlck1lZEZlaWwiLCJfUmVhY3QkdXNlU3RhdGUiLCJfUmVhY3QkdXNlU3RhdGUyIiwidXJlZ2lzdHJlcnRlQmFybiIsInPDuGtuYWRzZ3J1bm5sYWciLCJiYXJuYU1lZE9wcGx5c25pbmdlciIsImJhcm4iLCJlckZvbGtlcmVnaXN0cmVydCIsInNramVtYUZlaWxtZWxkaW5nIiwic2thbFZpc2VGb3JyaWdlS25hcHAiLCJTw5hLTkFEIiwiRsOYRFNFTFNIRU5ERUxTRSIsIm1pZ3JlcmluZ3NkYXRvIiwiaGVudGV0TGFiZWwiLCJza2FsU2tqdWxlVGVzdG1pbGrDuGtuYXBwZXIiLCJ1cmVnaXN0cmVydEJhcm4iLCJhbm5lblZ1cmRlcmluZyIsIkxpbmsiLCJSZWFjdFJvdXRlckxpbmsiLCJMaW5rQ2FyZCIsIkZvbnRTaXplSGVhZGluZ01lZGl1bSIsIkZvbnRTaXplWGxhcmdlIiwiQmVoYW5kbGluZ1N0YXR1cyIsInRpbEJlaGFuZGxpbmdzdGVtYSIsIkZhZ3Nha1R5cGUiLCJoZW50QWt0aXZCZWhhbmRsaW5nUMOlTWluaW1hbEZhZ3NhayIsImhlbnRGYWdzYWtTdGF0dXNWaXNuaW5nIiwiU2Frc292ZXJzaWt0UGFuZWxCcmVkZGUiLCJIZWFkZXJUZWtzdCIsIkJvZHlUZWtzdCIsIklubmhvbGRzdGFiZWxsIiwiYmVoYW5kbGluZ3N0ZW1hIiwibMO4cGVuZGVLYXRlZ29yaSIsImzDuHBlbmRlVW5kZXJrYXRlZ29yaSIsInNwYWNpbmciLCJGYWdzYWtUeXBlTGFiZWwiLCJfczIiLCJfdXNlRmFnc2FrQ29udGV4dDIiLCJJTlNUSVRVU0pPTiIsIkJBUk5fRU5TTElHX01JTkRSRcOFUklHIiwiU0tKRVJNRVRfQkFSTiIsImdlbmVyZXJIb3ZlclRla3N0IiwiQVZTTFVUVEVUIiwiRmFnc2FrTGVua2VwYW5lbCIsIl9zMyIsIl91c2VGYWdzYWtDb250ZXh0MyIsImFrdGl2QmVoYW5kbGluZyIsIlRpdGxlIiwiQW5jaG9yIiwiYXNDaGlsZCIsInRvIiwiRGVzY3JpcHRpb24iLCJwYWRkaW5nQmxvY2siLCJfYzYiXSwic291cmNlUm9vdCI6IiJ9