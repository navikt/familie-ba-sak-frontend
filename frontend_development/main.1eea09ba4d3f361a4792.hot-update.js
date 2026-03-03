"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

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
    gap: "space-32"
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

/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e723ccd88b635402a605")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4xZWVhMDliYTRkM2YzNjFhNDc5Mi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQStCO0FBRVk7QUFFbUU7QUFDeEQ7QUFFMEM7QUFDSjtBQUN4QjtBQUNVO0FBQ1Q7QUFDbUM7QUFDZjtBQUN0QztBQUNvQjtBQUNJO0FBQ087QUFDZDtBQU0vQjtBQUMrQztBQUNoQztBQUN3QjtBQUNMO0FBQ2hDO0FBQ2tEO0FBQy9CO0FBRW5ELFNBQVNrQyxnQkFBZ0JBLENBQUEsRUFBRztFQUFBQyxFQUFBO0VBQUEsSUFBQUMscUJBQUEsRUFBQUMsc0JBQUE7RUFDL0IsSUFBTUMsT0FBTyxHQUFHbEIsNEVBQWlCLENBQUMsQ0FBQztFQUVuQyxJQUFBbUIsaUJBQUEsR0FBbUJOLGlFQUFnQixDQUFDLENBQUM7SUFBN0JPLE1BQU0sR0FBQUQsaUJBQUEsQ0FBTkMsTUFBTTtFQUNkLElBQUFDLHFCQUFBLEdBQ0lYLGlGQUFvQixDQUFDLENBQUM7SUFEbEJZLFVBQVUsR0FBQUQscUJBQUEsQ0FBVkMsVUFBVTtJQUFFQyxtQkFBbUIsR0FBQUYscUJBQUEsQ0FBbkJFLG1CQUFtQjtJQUFFQyw0QkFBNEIsR0FBQUgscUJBQUEsQ0FBNUJHLDRCQUE0QjtJQUFFQyw0QkFBNEIsR0FBQUoscUJBQUEsQ0FBNUJJLDRCQUE0QjtFQUduRyxJQUFBQyxxQkFBQSxHQUNJM0Isd0ZBQTBCLENBQUMsQ0FBQztJQUR4QjRCLDBCQUEwQixHQUFBRCxxQkFBQSxDQUExQkMsMEJBQTBCO0lBQUVDLGlCQUFpQixHQUFBRixxQkFBQSxDQUFqQkUsaUJBQWlCO0lBQUVDLDJCQUEyQixHQUFBSCxxQkFBQSxDQUEzQkcsMkJBQTJCO0lBQUVDLGdCQUFnQixHQUFBSixxQkFBQSxDQUFoQkksZ0JBQWdCO0VBR3BHLElBQU1DLGFBQWEsR0FBR1IsbUJBQW1CLENBQUMsQ0FBQztFQUUzQyxJQUFBUyxl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QUFFLElBQUlBLGlCQUFpQixLQUFLK0MsU0FBUyxpQkFDeERsSCxnREFBQSxDQUFDSywwREFBWSxRQUFFOEQsaUJBQWdDLENBQ2xELGVBQ0RuRSxnREFBQSxDQUFDZ0MsbUdBQThCLE1BQUUsQ0FBQyxlQUNsQ2hDLGdEQUFBLENBQUNpQixtR0FBOEIsTUFBRSxDQUM3QixDQUNBLENBQUM7QUFFckI7QUFBQ2tCLEVBQUEsQ0FySGVELGdCQUFnQjtFQUFBLFFBQ1pkLHdFQUFpQixFQUVkYSw2REFBZ0IsRUFFL0JILDZFQUFvQixFQUdwQlgsb0ZBQTBCLEVBTWJsQixxREFBVztBQUFBO0FBQUFrSCxFQUFBLEdBZGhCakYsZ0JBQWdCO0FBQUEsSUFBQWlGLEVBQUE7QUFBQUMsc0NBQUEsQ0FBQUQsRUFBQSx5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDakNoQyxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL0ZhZ3Nhay9CZWhhbmRsaW5nL1NpZGVyL1ZpbGvDpXJzdnVyZGVyaW5nL1ZpbGvDpXJzdnVyZGVyaW5nLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5cbmltcG9ydCB7IEFsZXJ0LCBCb2R5U2hvcnQsIERldGFpbCwgRXJyb3JNZXNzYWdlLCBFcnJvclN1bW1hcnksIEhTdGFjaywgTGlzdCwgVlN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcblxuaW1wb3J0IHsgRnlsbFV0Vmlsa8OlcnN2dXJkZXJpbmdJVGVzdG1pbGrDuEtuYXBwIH0gZnJvbSAnLi9GeWxsVXRWaWxrw6Vyc3Z1cmRlcmluZ0lUZXN0bWlsasO4S25hcHAnO1xuaW1wb3J0IHsgYW5uZW5WdXJkZXJpbmdGZWlsbWVsZGluZ0lkIH0gZnJvbSAnLi9HZW5lcmlza0FubmVuVnVyZGVyaW5nL0FubmVuVnVyZGVyaW5nVGFiZWxsJztcbmltcG9ydCB7IHZpbGvDpXJGZWlsbWVsZGluZ0lkIH0gZnJvbSAnLi9HZW5lcmlza1ZpbGvDpXIvVmlsa8OlclRhYmVsbCc7XG5pbXBvcnQgeyBPcHBkYXRlclJlZ2lzdGVyb3BwbHlzbmluZ2VyIH0gZnJvbSAnLi9PcHBkYXRlclJlZ2lzdGVyb3BwbHlzbmluZ2VyJztcbmltcG9ydCBWaWxrw6Vyc3Z1cmRlcmluZ1NramVtYSBmcm9tICcuL1NramVtYS9WaWxrw6Vyc3Z1cmRlcmluZ1NramVtYSc7XG5pbXBvcnQgeyBUw7htUGVyc29ub3BwbHlzbmluZ2VyQ2FjaGVJVGVzdG1pbGrDuEtuYXBwIH0gZnJvbSAnLi9Uw7htUGVyc29ub3BwbHlzbmluZ2VyQ2FjaGVJVGVzdG1pbGrDuEtuYXBwJztcbmltcG9ydCB7IE1hbmdsZW5kZUZpbm5tYXJrbWVya2luZ1ZhcnNlbCB9IGZyb20gJy4vVmFyc2VsL01hbmdsZW5kZUZpbm5tYXJrbWVya2luZ1ZhcnNlbCc7XG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vVmlsa8OlcnN2dXJkZXJpbmcubW9kdWxlLmNzcyc7XG5pbXBvcnQgeyB1c2VWaWxrw6Vyc3Z1cmRlcmluZ0NvbnRleHQgfSBmcm9tICcuL1ZpbGvDpXJzdnVyZGVyaW5nQ29udGV4dCc7XG5pbXBvcnQgeyB1c2VGZWF0dXJlVG9nZ2xlcyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2hvb2tzL3VzZUZlYXR1cmVUb2dnbGVzJztcbmltcG9ydCB7IEJlaGFuZGxpbmdTdGVnLCBCZWhhbmRsaW5nw4Vyc2FrIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvYmVoYW5kbGluZyc7XG5pbXBvcnQgeyBGZWF0dXJlVG9nZ2xlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvZmVhdHVyZVRvZ2dsZXMnO1xuaW1wb3J0IHtcbiAgICBhbm5lblZ1cmRlcmluZ0NvbmZpZyxcbiAgICB0eXBlIElBbm5lblZ1cmRlcmluZyxcbiAgICB0eXBlIElWaWxrw6VyUmVzdWx0YXQsXG4gICAgdmlsa8OlckNvbmZpZyxcbn0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvdmlsa8Olcic7XG5pbXBvcnQgeyBEYXRvZm9ybWF0LCBpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9kYXRvJztcbmltcG9ydCB7IGVyUHJvZCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL21pbGrDuCc7XG5pbXBvcnQgeyBoZW50RnJvbnRlbmRGZWlsbWVsZGluZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL3Jlc3N1cnNVdGlscyc7XG5pbXBvcnQgeyB1c2VCZWhhbmRsaW5nQ29udGV4dCB9IGZyb20gJy4uLy4uL2NvbnRleHQvQmVoYW5kbGluZ0NvbnRleHQnO1xuaW1wb3J0IFNramVtYXN0ZWcgZnJvbSAnLi4vU2tqZW1hc3RlZyc7XG5pbXBvcnQgeyBNYW5nbGVuZGVTdmFsYmFyZG1lcmtpbmdWYXJzZWwgfSBmcm9tICcuL1ZhcnNlbC9NYW5nbGVuZGVTdmFsYmFyZG1lcmtpbmdWYXJzZWwnO1xuaW1wb3J0IHsgdXNlRmFnc2FrQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uL0ZhZ3Nha0NvbnRleHQnO1xuXG5leHBvcnQgZnVuY3Rpb24gVmlsa8OlcnN2dXJkZXJpbmcoKSB7XG4gICAgY29uc3QgdG9nZ2xlcyA9IHVzZUZlYXR1cmVUb2dnbGVzKCk7XG5cbiAgICBjb25zdCB7IGZhZ3NhayB9ID0gdXNlRmFnc2FrQ29udGV4dCgpO1xuICAgIGNvbnN0IHsgYmVoYW5kbGluZywgdnVyZGVyRXJMZXNldmlzbmluZywgdmlsa8OlcnN2dXJkZXJpbmdOZXN0ZU9uQ2xpY2ssIGJlaGFuZGxpbmdzc3RlZ1N1Ym1pdHJlc3N1cnMgfSA9XG4gICAgICAgIHVzZUJlaGFuZGxpbmdDb250ZXh0KCk7XG5cbiAgICBjb25zdCB7IGVyVmlsa8OlcnN2dXJkZXJpbmdlbkd5bGRpZywgaGVudFZpbGvDpXJNZWRGZWlsLCBoZW50QW5kcmVWdXJkZXJpbmdlck1lZEZlaWwsIHZpbGvDpXJzdnVyZGVyaW5nIH0gPVxuICAgICAgICB1c2VWaWxrw6Vyc3Z1cmRlcmluZ0NvbnRleHQoKTtcblxuICAgIGNvbnN0IGVyTGVzZXZpc25pbmcgPSB2dXJkZXJFckxlc2V2aXNuaW5nKCk7XG5cbiAgICBjb25zdCBbdmlzRmVpbG1lbGRpbmdlciwgc2V0dFZpc0ZlaWxtZWxkaW5nZXJdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuXG4gICAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuXG4gICAgY29uc3QgdXJlZ2lzdHJlcnRlQmFybiA9XG4gICAgICAgIGJlaGFuZGxpbmcuc8O4a25hZHNncnVubmxhZz8uYmFybmFNZWRPcHBseXNuaW5nZXIuZmlsdGVyKGJhcm4gPT4gIWJhcm4uZXJGb2xrZXJlZ2lzdHJlcnQpID8/IFtdO1xuXG4gICAgaWYgKHZpbGvDpXJzdnVyZGVyaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gPGRpdj5GaW5uZXIgaW5nZW4gdmlsa8OlciBww6UgYmVoYW5kbGluZ2VuLjwvZGl2PjtcbiAgICB9XG5cbiAgICBjb25zdCBza2plbWFGZWlsbWVsZGluZyA9IGhlbnRGcm9udGVuZEZlaWxtZWxkaW5nKGJlaGFuZGxpbmdzc3RlZ1N1Ym1pdHJlc3N1cnMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPFNramVtYXN0ZWdcbiAgICAgICAgICAgIHNrYWxWaXNlRm9ycmlnZUtuYXBwPXtcbiAgICAgICAgICAgICAgICBiZWhhbmRsaW5nLsOlcnNhayA9PT0gQmVoYW5kbGluZ8OFcnNhay5Tw5hLTkFEIHx8IGJlaGFuZGxpbmcuw6Vyc2FrID09PSBCZWhhbmRsaW5nw4Vyc2FrLkbDmERTRUxTSEVOREVMU0VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpdHRlbD17J1ZpbGvDpXJzdnVyZGVyaW5nJ31cbiAgICAgICAgICAgIGZvcnJpZ2VPbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGJlaGFuZGxpbmcuw6Vyc2FrID09PSBCZWhhbmRsaW5nw4Vyc2FrLlPDmEtOQUQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGUoYC9mYWdzYWsvJHtmYWdzYWsuaWR9LyR7YmVoYW5kbGluZy5iZWhhbmRsaW5nSWR9L3JlZ2lzdHJlci1zb2tuYWRgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZShgL2ZhZ3Nhay8ke2ZhZ3Nhay5pZH0vJHtiZWhhbmRsaW5nLmJlaGFuZGxpbmdJZH0vZmlsdHJlcmluZ3NyZWdsZXJgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgbmVzdGVPbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVyTGVzZXZpc25pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGUoYC9mYWdzYWsvJHtmYWdzYWsuaWR9LyR7YmVoYW5kbGluZy5iZWhhbmRsaW5nSWR9L3RpbGtqZW50LXl0ZWxzZWApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJWaWxrw6Vyc3Z1cmRlcmluZ2VuR3lsZGlnKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmlsa8OlcnN2dXJkZXJpbmdOZXN0ZU9uQ2xpY2soKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXR0VmlzRmVpbG1lbGRpbmdlcih0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgbWF4V2lkdGhTdHlsZT17JzgwcmVtJ31cbiAgICAgICAgICAgIHNlbmRlcklubj17YmVoYW5kbGluZ3NzdGVnU3VibWl0cmVzc3Vycy5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuSEVOVEVSfVxuICAgICAgICAgICAgc3RlZz17QmVoYW5kbGluZ1N0ZWcuVklMS8OFUlNWVVJERVJJTkd9XG4gICAgICAgID5cbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAge2JlaGFuZGxpbmc/Lm1pZ3JlcmluZ3NkYXRvICE9PSBudWxsICYmIChcbiAgICAgICAgICAgICAgICAgICAgPERldGFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuaGVudGV0TGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbj17YFNha2VuIGJsZSBtaWdyZXJ0IGZyYSBJbmZvdHJ5Z2Q6ICR7aXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc29TdHJpbmc6IGJlaGFuZGxpbmc/Lm1pZ3JlcmluZ3NkYXRvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5EQVRPLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9YH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDxPcHBkYXRlclJlZ2lzdGVyb3BwbHlzbmluZ2VyIC8+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgIHshZXJQcm9kKCkgJiYgIXRvZ2dsZXNbRmVhdHVyZVRvZ2dsZS5za2FsU2tqdWxlVGVzdG1pbGrDuGtuYXBwZXJdICYmIChcbiAgICAgICAgICAgICAgICA8SFN0YWNrIGdhcD1cInNwYWNlLTE2XCIgbWFyZ2luQmxvY2s9eydzcGFjZS0zMiBzcGFjZS0zMid9PlxuICAgICAgICAgICAgICAgICAgICA8RnlsbFV0Vmlsa8OlcnN2dXJkZXJpbmdJVGVzdG1pbGrDuEtuYXBwIGJlaGFuZGxpbmdJZD17YmVoYW5kbGluZy5iZWhhbmRsaW5nSWR9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxUw7htUGVyc29ub3BwbHlzbmluZ2VyQ2FjaGVJVGVzdG1pbGrDuEtuYXBwIC8+XG4gICAgICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPFZTdGFjayBnYXA9XCJzcGFjZS0zMlwiPlxuICAgICAgICAgICAgICAgIDxWaWxrw6Vyc3Z1cmRlcmluZ1NramVtYSB2aXNGZWlsbWVsZGluZ2VyPXt2aXNGZWlsbWVsZGluZ2VyfSAvPlxuICAgICAgICAgICAgICAgIHt1cmVnaXN0cmVydGVCYXJuLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8QWxlcnQgdmFyaWFudD1cImluZm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQ+RHUgaGFyIHJlZ2lzdHJlcnQgZsO4bGdlbmRlIGJhcm4gc29tIGlra2UgZXIgcmVnaXN0cmVydCBpIEZvbGtlcmVnaXN0ZXJldDo8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0IGFzPXsnb2wnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dXJlZ2lzdHJlcnRlQmFybi5tYXAodXJlZ2lzdHJlcnRCYXJuID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBrZXk9e2Ake3VyZWdpc3RyZXJ0QmFybi5uYXZufV8ke3VyZWdpc3RyZXJ0QmFybi5mw7hkc2Vsc2RhdG99YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtgJHt1cmVnaXN0cmVydEJhcm4ubmF2bn0gLSAke2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzb1N0cmluZzogdXJlZ2lzdHJlcnRCYXJuLmbDuGRzZWxzZGF0byxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0LkRBVE8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlzdD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQ+RGV0dGUgdmlsIGbDuHJlIHRpbCBhdnNsYWcgZm9yIGJhcm5hIGkgbGlzdGVuLjwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICA8L0FsZXJ0PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgeyhoZW50Vmlsa8Olck1lZEZlaWwoKS5sZW5ndGggPiAwIHx8IGhlbnRBbmRyZVZ1cmRlcmluZ2VyTWVkRmVpbCgpLmxlbmd0aCA+IDApICYmIHZpc0ZlaWxtZWxkaW5nZXIgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8RXJyb3JTdW1tYXJ5IGhlYWRpbmc9eydGb3Igw6UgZ8OlIHZpZGVyZSBtw6UgZHUgcmV0dGUgb3BwIGbDuGxnZW5kZTonfSBzaXplPVwic21hbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uaGVudFZpbGvDpXJNZWRGZWlsKCkubWFwKCh2aWxrw6VyUmVzdWx0YXQ6IElWaWxrw6VyUmVzdWx0YXQpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlaWxtZWxkaW5nOiBgRXQgdmlsa8OlciBhdiB0eXBlbiAnJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpbGvDpXJDb25maWdbdmlsa8OlclJlc3VsdGF0LnZpbGvDpXJUeXBlXS50aXR0ZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfScgZXIgaWtrZSBmdWxsc3RlbmRpZ2AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNramVtYWVsZW1lbnRJZDogdmlsa8OlckZlaWxtZWxkaW5nSWQodmlsa8OlclJlc3VsdGF0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uaGVudEFuZHJlVnVyZGVyaW5nZXJNZWRGZWlsKCkubWFwKChhbm5lblZ1cmRlcmluZzogSUFubmVuVnVyZGVyaW5nKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWlsbWVsZGluZzogYEV0IHZpbGvDpXIgYXYgdHlwZW4gJyR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbm5lblZ1cmRlcmluZ0NvbmZpZ1thbm5lblZ1cmRlcmluZy50eXBlXS50aXR0ZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfScgZXIgaWtrZSBmdWxsc3RlbmRpZ2AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNramVtYWVsZW1lbnRJZDogYW5uZW5WdXJkZXJpbmdGZWlsbWVsZGluZ0lkKGFubmVuVnVyZGVyaW5nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICBdLm1hcChpdGVtID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXJyb3JTdW1tYXJ5Lkl0ZW0gaHJlZj17YCMke2l0ZW0uc2tqZW1hZWxlbWVudElkfWB9PntpdGVtLmZlaWxtZWxkaW5nfTwvRXJyb3JTdW1tYXJ5Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9FcnJvclN1bW1hcnk+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7c2tqZW1hRmVpbG1lbGRpbmcgIT09ICcnICYmIHNramVtYUZlaWxtZWxkaW5nICE9PSB1bmRlZmluZWQgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8RXJyb3JNZXNzYWdlPntza2plbWFGZWlsbWVsZGluZ308L0Vycm9yTWVzc2FnZT5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDxNYW5nbGVuZGVTdmFsYmFyZG1lcmtpbmdWYXJzZWwgLz5cbiAgICAgICAgICAgICAgICA8TWFuZ2xlbmRlRmlubm1hcmttZXJraW5nVmFyc2VsIC8+XG4gICAgICAgICAgICA8L1ZTdGFjaz5cbiAgICAgICAgPC9Ta2plbWFzdGVnPlxuICAgICk7XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJlNzIzY2NkODhiNjM1NDAyYTYwNVwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZU5hdmlnYXRlIiwiQWxlcnQiLCJCb2R5U2hvcnQiLCJEZXRhaWwiLCJFcnJvck1lc3NhZ2UiLCJFcnJvclN1bW1hcnkiLCJIU3RhY2siLCJMaXN0IiwiVlN0YWNrIiwiUmVzc3Vyc1N0YXR1cyIsIkZ5bGxVdFZpbGvDpXJzdnVyZGVyaW5nSVRlc3RtaWxqw7hLbmFwcCIsImFubmVuVnVyZGVyaW5nRmVpbG1lbGRpbmdJZCIsInZpbGvDpXJGZWlsbWVsZGluZ0lkIiwiT3BwZGF0ZXJSZWdpc3Rlcm9wcGx5c25pbmdlciIsIlZpbGvDpXJzdnVyZGVyaW5nU2tqZW1hIiwiVMO4bVBlcnNvbm9wcGx5c25pbmdlckNhY2hlSVRlc3RtaWxqw7hLbmFwcCIsIk1hbmdsZW5kZUZpbm5tYXJrbWVya2luZ1ZhcnNlbCIsInN0eWxlcyIsInVzZVZpbGvDpXJzdnVyZGVyaW5nQ29udGV4dCIsInVzZUZlYXR1cmVUb2dnbGVzIiwiQmVoYW5kbGluZ1N0ZWciLCJCZWhhbmRsaW5nw4Vyc2FrIiwiRmVhdHVyZVRvZ2dsZSIsImFubmVuVnVyZGVyaW5nQ29uZmlnIiwidmlsa8OlckNvbmZpZyIsIkRhdG9mb3JtYXQiLCJpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmciLCJlclByb2QiLCJoZW50RnJvbnRlbmRGZWlsbWVsZGluZyIsInVzZUJlaGFuZGxpbmdDb250ZXh0IiwiU2tqZW1hc3RlZyIsIk1hbmdsZW5kZVN2YWxiYXJkbWVya2luZ1ZhcnNlbCIsInVzZUZhZ3Nha0NvbnRleHQiLCJWaWxrw6Vyc3Z1cmRlcmluZyIsIl9zIiwiX2JlaGFuZGxpbmckc8O4a25hZHNnciIsIl9iZWhhbmRsaW5nJHPDuGtuYWRzZ3IyIiwidG9nZ2xlcyIsIl91c2VGYWdzYWtDb250ZXh0IiwiZmFnc2FrIiwiX3VzZUJlaGFuZGxpbmdDb250ZXh0IiwiYmVoYW5kbGluZyIsInZ1cmRlckVyTGVzZXZpc25pbmciLCJ2aWxrw6Vyc3Z1cmRlcmluZ05lc3RlT25DbGljayIsImJlaGFuZGxpbmdzc3RlZ1N1Ym1pdHJlc3N1cnMiLCJfdXNlVmlsa8OlcnN2dXJkZXJpbmdDIiwiZXJWaWxrw6Vyc3Z1cmRlcmluZ2VuR3lsZGlnIiwiaGVudFZpbGvDpXJNZWRGZWlsIiwiaGVudEFuZHJlVnVyZGVyaW5nZXJNZWRGZWlsIiwidmlsa8OlcnN2dXJkZXJpbmciLCJlckxlc2V2aXNuaW5nIiwiX1JlYWN0JHVzZVN0YXRlIiwidXNlU3RhdGUiLCJfUmVhY3QkdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJ2aXNGZWlsbWVsZGluZ2VyIiwic2V0dFZpc0ZlaWxtZWxkaW5nZXIiLCJuYXZpZ2F0ZSIsInVyZWdpc3RyZXJ0ZUJhcm4iLCJzw7hrbmFkc2dydW5ubGFnIiwiYmFybmFNZWRPcHBseXNuaW5nZXIiLCJmaWx0ZXIiLCJiYXJuIiwiZXJGb2xrZXJlZ2lzdHJlcnQiLCJsZW5ndGgiLCJjcmVhdGVFbGVtZW50Iiwic2tqZW1hRmVpbG1lbGRpbmciLCJza2FsVmlzZUZvcnJpZ2VLbmFwcCIsIsOlcnNhayIsIlPDmEtOQUQiLCJGw5hEU0VMU0hFTkRFTFNFIiwidGl0dGVsIiwiZm9ycmlnZU9uQ2xpY2siLCJjb25jYXQiLCJpZCIsImJlaGFuZGxpbmdJZCIsIm5lc3RlT25DbGljayIsIm1heFdpZHRoU3R5bGUiLCJzZW5kZXJJbm4iLCJzdGF0dXMiLCJIRU5URVIiLCJzdGVnIiwiVklMS8OFUlNWVVJERVJJTkciLCJGcmFnbWVudCIsIm1pZ3JlcmluZ3NkYXRvIiwiY2xhc3NOYW1lIiwiaGVudGV0TGFiZWwiLCJjaGlsZHJlbiIsImlzb1N0cmluZyIsInRpbEZvcm1hdCIsIkRBVE8iLCJza2FsU2tqdWxlVGVzdG1pbGrDuGtuYXBwZXIiLCJnYXAiLCJtYXJnaW5CbG9jayIsInZhcmlhbnQiLCJhcyIsIm1hcCIsInVyZWdpc3RyZXJ0QmFybiIsIkl0ZW0iLCJrZXkiLCJuYXZuIiwiZsO4ZHNlbHNkYXRvIiwiaGVhZGluZyIsInNpemUiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJ2aWxrw6VyUmVzdWx0YXQiLCJmZWlsbWVsZGluZyIsInZpbGvDpXJUeXBlIiwic2tqZW1hZWxlbWVudElkIiwiYW5uZW5WdXJkZXJpbmciLCJ0eXBlIiwiaXRlbSIsImhyZWYiLCJ1bmRlZmluZWQiLCJfYyIsIiRSZWZyZXNoUmVnJCJdLCJzb3VyY2VSb290IjoiIn0=