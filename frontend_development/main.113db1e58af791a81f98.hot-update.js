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
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_T_mPersonopplysningerCacheITestmilj_Knapp__WEBPACK_IMPORTED_MODULE_10__["TømPersonopplysningerCacheITestmiljøKnapp"], null)), "test", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.VStack, {
    gap: "space-8"
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
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.BodyShort, null, "Dette vil f\xF8re til avslag for barna i listen.")), "test", (hentVilkårMedFeil().length > 0 || hentAndreVurderingerMedFeil().length > 0) && visFeilmeldinger && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.ErrorSummary, {
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
/******/ 	__webpack_require__.h = () => ("fcfb14dd481ffbdeff50")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4xMTNkYjFlNThhZjc5MWE4MWY5OC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQStCO0FBRVk7QUFFbUU7QUFDeEQ7QUFFMEM7QUFDSjtBQUN4QjtBQUNVO0FBQ1Q7QUFDbUM7QUFDZjtBQUN0QztBQUNvQjtBQUNJO0FBQ087QUFDZDtBQU0vQjtBQUMrQztBQUNoQztBQUN3QjtBQUNMO0FBQ2hDO0FBQ2tEO0FBQy9CO0FBRW5ELFNBQVNrQyxnQkFBZ0JBLENBQUEsRUFBRztFQUFBQyxFQUFBO0VBQUEsSUFBQUMscUJBQUEsRUFBQUMsc0JBQUE7RUFDL0IsSUFBTUMsT0FBTyxHQUFHbEIsNEVBQWlCLENBQUMsQ0FBQztFQUVuQyxJQUFBbUIsaUJBQUEsR0FBbUJOLGlFQUFnQixDQUFDLENBQUM7SUFBN0JPLE1BQU0sR0FBQUQsaUJBQUEsQ0FBTkMsTUFBTTtFQUNkLElBQUFDLHFCQUFBLEdBQ0lYLGlGQUFvQixDQUFDLENBQUM7SUFEbEJZLFVBQVUsR0FBQUQscUJBQUEsQ0FBVkMsVUFBVTtJQUFFQyxtQkFBbUIsR0FBQUYscUJBQUEsQ0FBbkJFLG1CQUFtQjtJQUFFQyw0QkFBNEIsR0FBQUgscUJBQUEsQ0FBNUJHLDRCQUE0QjtJQUFFQyw0QkFBNEIsR0FBQUoscUJBQUEsQ0FBNUJJLDRCQUE0QjtFQUduRyxJQUFBQyxxQkFBQSxHQUNJM0Isd0ZBQTBCLENBQUMsQ0FBQztJQUR4QjRCLDBCQUEwQixHQUFBRCxxQkFBQSxDQUExQkMsMEJBQTBCO0lBQUVDLGlCQUFpQixHQUFBRixxQkFBQSxDQUFqQkUsaUJBQWlCO0lBQUVDLDJCQUEyQixHQUFBSCxxQkFBQSxDQUEzQkcsMkJBQTJCO0lBQUVDLGdCQUFnQixHQUFBSixxQkFBQSxDQUFoQkksZ0JBQWdCO0VBR3BHLElBQU1DLGFBQWEsR0FBR1IsbUJBQW1CLENBQUMsQ0FBQztFQUUzQyxJQUFBUyxl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RUFDQXhDLGlCQUFpQixLQUFLLEVBQUUsSUFBSUEsaUJBQWlCLEtBQUsrQyxTQUFTLGlCQUN4RGxILGdEQUFBLENBQUNLLDBEQUFZLFFBQUU4RCxpQkFBZ0MsQ0FDbEQsZUFDRG5FLGdEQUFBLENBQUNnQyxtR0FBOEIsTUFBRSxDQUFDLGVBQ2xDaEMsZ0RBQUEsQ0FBQ2lCLG1HQUE4QixNQUFFLENBQzdCLENBQ0EsQ0FBQztBQUVyQjtBQUFDa0IsRUFBQSxDQXZIZUQsZ0JBQWdCO0VBQUEsUUFDWmQsd0VBQWlCLEVBRWRhLDZEQUFnQixFQUUvQkgsNkVBQW9CLEVBR3BCWCxvRkFBMEIsRUFNYmxCLHFEQUFXO0FBQUE7QUFBQWtILEVBQUEsR0FkaEJqRixnQkFBZ0I7QUFBQSxJQUFBaUYsRUFBQTtBQUFBQyxzQ0FBQSxDQUFBRCxFQUFBLHlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNqQ2hDLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvRmFnc2FrL0JlaGFuZGxpbmcvU2lkZXIvVmlsa8OlcnN2dXJkZXJpbmcvVmlsa8OlcnN2dXJkZXJpbmcudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHVzZU5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcblxuaW1wb3J0IHsgQWxlcnQsIEJvZHlTaG9ydCwgRGV0YWlsLCBFcnJvck1lc3NhZ2UsIEVycm9yU3VtbWFyeSwgSFN0YWNrLCBMaXN0LCBWU3RhY2sgfSBmcm9tICdAbmF2aWt0L2RzLXJlYWN0JztcbmltcG9ydCB7IFJlc3N1cnNTdGF0dXMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuXG5pbXBvcnQgeyBGeWxsVXRWaWxrw6Vyc3Z1cmRlcmluZ0lUZXN0bWlsasO4S25hcHAgfSBmcm9tICcuL0Z5bGxVdFZpbGvDpXJzdnVyZGVyaW5nSVRlc3RtaWxqw7hLbmFwcCc7XG5pbXBvcnQgeyBhbm5lblZ1cmRlcmluZ0ZlaWxtZWxkaW5nSWQgfSBmcm9tICcuL0dlbmVyaXNrQW5uZW5WdXJkZXJpbmcvQW5uZW5WdXJkZXJpbmdUYWJlbGwnO1xuaW1wb3J0IHsgdmlsa8OlckZlaWxtZWxkaW5nSWQgfSBmcm9tICcuL0dlbmVyaXNrVmlsa8Olci9WaWxrw6VyVGFiZWxsJztcbmltcG9ydCB7IE9wcGRhdGVyUmVnaXN0ZXJvcHBseXNuaW5nZXIgfSBmcm9tICcuL09wcGRhdGVyUmVnaXN0ZXJvcHBseXNuaW5nZXInO1xuaW1wb3J0IFZpbGvDpXJzdnVyZGVyaW5nU2tqZW1hIGZyb20gJy4vU2tqZW1hL1ZpbGvDpXJzdnVyZGVyaW5nU2tqZW1hJztcbmltcG9ydCB7IFTDuG1QZXJzb25vcHBseXNuaW5nZXJDYWNoZUlUZXN0bWlsasO4S25hcHAgfSBmcm9tICcuL1TDuG1QZXJzb25vcHBseXNuaW5nZXJDYWNoZUlUZXN0bWlsasO4S25hcHAnO1xuaW1wb3J0IHsgTWFuZ2xlbmRlRmlubm1hcmttZXJraW5nVmFyc2VsIH0gZnJvbSAnLi9WYXJzZWwvTWFuZ2xlbmRlRmlubm1hcmttZXJraW5nVmFyc2VsJztcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9WaWxrw6Vyc3Z1cmRlcmluZy5tb2R1bGUuY3NzJztcbmltcG9ydCB7IHVzZVZpbGvDpXJzdnVyZGVyaW5nQ29udGV4dCB9IGZyb20gJy4vVmlsa8OlcnN2dXJkZXJpbmdDb250ZXh0JztcbmltcG9ydCB7IHVzZUZlYXR1cmVUb2dnbGVzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vaG9va3MvdXNlRmVhdHVyZVRvZ2dsZXMnO1xuaW1wb3J0IHsgQmVoYW5kbGluZ1N0ZWcsIEJlaGFuZGxpbmfDhXJzYWsgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlci9iZWhhbmRsaW5nJztcbmltcG9ydCB7IEZlYXR1cmVUb2dnbGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlci9mZWF0dXJlVG9nZ2xlcyc7XG5pbXBvcnQge1xuICAgIGFubmVuVnVyZGVyaW5nQ29uZmlnLFxuICAgIHR5cGUgSUFubmVuVnVyZGVyaW5nLFxuICAgIHR5cGUgSVZpbGvDpXJSZXN1bHRhdCxcbiAgICB2aWxrw6VyQ29uZmlnLFxufSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlci92aWxrw6VyJztcbmltcG9ydCB7IERhdG9mb3JtYXQsIGlzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL2RhdG8nO1xuaW1wb3J0IHsgZXJQcm9kIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvbWlsasO4JztcbmltcG9ydCB7IGhlbnRGcm9udGVuZEZlaWxtZWxkaW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvcmVzc3Vyc1V0aWxzJztcbmltcG9ydCB7IHVzZUJlaGFuZGxpbmdDb250ZXh0IH0gZnJvbSAnLi4vLi4vY29udGV4dC9CZWhhbmRsaW5nQ29udGV4dCc7XG5pbXBvcnQgU2tqZW1hc3RlZyBmcm9tICcuLi9Ta2plbWFzdGVnJztcbmltcG9ydCB7IE1hbmdsZW5kZVN2YWxiYXJkbWVya2luZ1ZhcnNlbCB9IGZyb20gJy4vVmFyc2VsL01hbmdsZW5kZVN2YWxiYXJkbWVya2luZ1ZhcnNlbCc7XG5pbXBvcnQgeyB1c2VGYWdzYWtDb250ZXh0IH0gZnJvbSAnLi4vLi4vLi4vRmFnc2FrQ29udGV4dCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBWaWxrw6Vyc3Z1cmRlcmluZygpIHtcbiAgICBjb25zdCB0b2dnbGVzID0gdXNlRmVhdHVyZVRvZ2dsZXMoKTtcblxuICAgIGNvbnN0IHsgZmFnc2FrIH0gPSB1c2VGYWdzYWtDb250ZXh0KCk7XG4gICAgY29uc3QgeyBiZWhhbmRsaW5nLCB2dXJkZXJFckxlc2V2aXNuaW5nLCB2aWxrw6Vyc3Z1cmRlcmluZ05lc3RlT25DbGljaywgYmVoYW5kbGluZ3NzdGVnU3VibWl0cmVzc3VycyB9ID1cbiAgICAgICAgdXNlQmVoYW5kbGluZ0NvbnRleHQoKTtcblxuICAgIGNvbnN0IHsgZXJWaWxrw6Vyc3Z1cmRlcmluZ2VuR3lsZGlnLCBoZW50Vmlsa8Olck1lZEZlaWwsIGhlbnRBbmRyZVZ1cmRlcmluZ2VyTWVkRmVpbCwgdmlsa8OlcnN2dXJkZXJpbmcgfSA9XG4gICAgICAgIHVzZVZpbGvDpXJzdnVyZGVyaW5nQ29udGV4dCgpO1xuXG4gICAgY29uc3QgZXJMZXNldmlzbmluZyA9IHZ1cmRlckVyTGVzZXZpc25pbmcoKTtcblxuICAgIGNvbnN0IFt2aXNGZWlsbWVsZGluZ2VyLCBzZXR0VmlzRmVpbG1lbGRpbmdlcl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG5cbiAgICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG5cbiAgICBjb25zdCB1cmVnaXN0cmVydGVCYXJuID1cbiAgICAgICAgYmVoYW5kbGluZy5zw7hrbmFkc2dydW5ubGFnPy5iYXJuYU1lZE9wcGx5c25pbmdlci5maWx0ZXIoYmFybiA9PiAhYmFybi5lckZvbGtlcmVnaXN0cmVydCkgPz8gW107XG5cbiAgICBpZiAodmlsa8OlcnN2dXJkZXJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PkZpbm5lciBpbmdlbiB2aWxrw6VyIHDDpSBiZWhhbmRsaW5nZW4uPC9kaXY+O1xuICAgIH1cblxuICAgIGNvbnN0IHNramVtYUZlaWxtZWxkaW5nID0gaGVudEZyb250ZW5kRmVpbG1lbGRpbmcoYmVoYW5kbGluZ3NzdGVnU3VibWl0cmVzc3Vycyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8U2tqZW1hc3RlZ1xuICAgICAgICAgICAgc2thbFZpc2VGb3JyaWdlS25hcHA9e1xuICAgICAgICAgICAgICAgIGJlaGFuZGxpbmcuw6Vyc2FrID09PSBCZWhhbmRsaW5nw4Vyc2FrLlPDmEtOQUQgfHwgYmVoYW5kbGluZy7DpXJzYWsgPT09IEJlaGFuZGxpbmfDhXJzYWsuRsOYRFNFTFNIRU5ERUxTRVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGl0dGVsPXsnVmlsa8OlcnN2dXJkZXJpbmcnfVxuICAgICAgICAgICAgZm9ycmlnZU9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYmVoYW5kbGluZy7DpXJzYWsgPT09IEJlaGFuZGxpbmfDhXJzYWsuU8OYS05BRCkge1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZShgL2ZhZ3Nhay8ke2ZhZ3Nhay5pZH0vJHtiZWhhbmRsaW5nLmJlaGFuZGxpbmdJZH0vcmVnaXN0cmVyLXNva25hZGApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlKGAvZmFnc2FrLyR7ZmFnc2FrLmlkfS8ke2JlaGFuZGxpbmcuYmVoYW5kbGluZ0lkfS9maWx0cmVyaW5nc3JlZ2xlcmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBuZXN0ZU9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJMZXNldmlzbmluZykge1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZShgL2ZhZ3Nhay8ke2ZhZ3Nhay5pZH0vJHtiZWhhbmRsaW5nLmJlaGFuZGxpbmdJZH0vdGlsa2plbnQteXRlbHNlYCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlclZpbGvDpXJzdnVyZGVyaW5nZW5HeWxkaWcoKSkge1xuICAgICAgICAgICAgICAgICAgICB2aWxrw6Vyc3Z1cmRlcmluZ05lc3RlT25DbGljaygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRWaXNGZWlsbWVsZGluZ2VyKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBtYXhXaWR0aFN0eWxlPXsnODByZW0nfVxuICAgICAgICAgICAgc2VuZGVySW5uPXtiZWhhbmRsaW5nc3N0ZWdTdWJtaXRyZXNzdXJzLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5IRU5URVJ9XG4gICAgICAgICAgICBzdGVnPXtCZWhhbmRsaW5nU3RlZy5WSUxLw4VSU1ZVUkRFUklOR31cbiAgICAgICAgPlxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICB7YmVoYW5kbGluZz8ubWlncmVyaW5nc2RhdG8gIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8RGV0YWlsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5oZW50ZXRMYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuPXtgU2FrZW4gYmxlIG1pZ3JlcnQgZnJhIEluZm90cnlnZDogJHtpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzb1N0cmluZzogYmVoYW5kbGluZz8ubWlncmVyaW5nc2RhdG8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0LkRBVE8sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPE9wcGRhdGVyUmVnaXN0ZXJvcHBseXNuaW5nZXIgLz5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgeyFlclByb2QoKSAmJiAhdG9nZ2xlc1tGZWF0dXJlVG9nZ2xlLnNrYWxTa2p1bGVUZXN0bWlsasO4a25hcHBlcl0gJiYgKFxuICAgICAgICAgICAgICAgIDxIU3RhY2sgZ2FwPVwic3BhY2UtMTZcIiBtYXJnaW5CbG9jaz17J3NwYWNlLTMyIHNwYWNlLTMyJ30+XG4gICAgICAgICAgICAgICAgICAgIDxGeWxsVXRWaWxrw6Vyc3Z1cmRlcmluZ0lUZXN0bWlsasO4S25hcHAgYmVoYW5kbGluZ0lkPXtiZWhhbmRsaW5nLmJlaGFuZGxpbmdJZH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPFTDuG1QZXJzb25vcHBseXNuaW5nZXJDYWNoZUlUZXN0bWlsasO4S25hcHAgLz5cbiAgICAgICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB0ZXN0XG4gICAgICAgICAgICA8VlN0YWNrIGdhcD1cInNwYWNlLThcIj5cbiAgICAgICAgICAgICAgICA8Vmlsa8OlcnN2dXJkZXJpbmdTa2plbWEgdmlzRmVpbG1lbGRpbmdlcj17dmlzRmVpbG1lbGRpbmdlcn0gLz5cbiAgICAgICAgICAgICAgICB7dXJlZ2lzdHJlcnRlQmFybi5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEFsZXJ0IHZhcmlhbnQ9XCJpbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0PkR1IGhhciByZWdpc3RyZXJ0IGbDuGxnZW5kZSBiYXJuIHNvbSBpa2tlIGVyIHJlZ2lzdHJlcnQgaSBGb2xrZXJlZ2lzdGVyZXQ6PC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGlzdCBhcz17J29sJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3VyZWdpc3RyZXJ0ZUJhcm4ubWFwKHVyZWdpc3RyZXJ0QmFybiA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0ga2V5PXtgJHt1cmVnaXN0cmVydEJhcm4ubmF2bn1fJHt1cmVnaXN0cmVydEJhcm4uZsO4ZHNlbHNkYXRvfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YCR7dXJlZ2lzdHJlcnRCYXJuLm5hdm59IC0gJHtpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc29TdHJpbmc6IHVyZWdpc3RyZXJ0QmFybi5mw7hkc2Vsc2RhdG8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5EQVRPLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0PkRldHRlIHZpbCBmw7hyZSB0aWwgYXZzbGFnIGZvciBiYXJuYSBpIGxpc3Rlbi48L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgPC9BbGVydD5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHRlc3RcbiAgICAgICAgICAgICAgICB7KGhlbnRWaWxrw6VyTWVkRmVpbCgpLmxlbmd0aCA+IDAgfHwgaGVudEFuZHJlVnVyZGVyaW5nZXJNZWRGZWlsKCkubGVuZ3RoID4gMCkgJiYgdmlzRmVpbG1lbGRpbmdlciAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxFcnJvclN1bW1hcnkgaGVhZGluZz17J0ZvciDDpSBnw6UgdmlkZXJlIG3DpSBkdSByZXR0ZSBvcHAgZsO4bGdlbmRlOid9IHNpemU9XCJzbWFsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5oZW50Vmlsa8Olck1lZEZlaWwoKS5tYXAoKHZpbGvDpXJSZXN1bHRhdDogSVZpbGvDpXJSZXN1bHRhdCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVpbG1lbGRpbmc6IGBFdCB2aWxrw6VyIGF2IHR5cGVuICcke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlsa8OlckNvbmZpZ1t2aWxrw6VyUmVzdWx0YXQudmlsa8OlclR5cGVdLnRpdHRlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9JyBlciBpa2tlIGZ1bGxzdGVuZGlnYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tqZW1hZWxlbWVudElkOiB2aWxrw6VyRmVpbG1lbGRpbmdJZCh2aWxrw6VyUmVzdWx0YXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5oZW50QW5kcmVWdXJkZXJpbmdlck1lZEZlaWwoKS5tYXAoKGFubmVuVnVyZGVyaW5nOiBJQW5uZW5WdXJkZXJpbmcpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlaWxtZWxkaW5nOiBgRXQgdmlsa8OlciBhdiB0eXBlbiAnJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFubmVuVnVyZGVyaW5nQ29uZmlnW2FubmVuVnVyZGVyaW5nLnR5cGVdLnRpdHRlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9JyBlciBpa2tlIGZ1bGxzdGVuZGlnYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tqZW1hZWxlbWVudElkOiBhbm5lblZ1cmRlcmluZ0ZlaWxtZWxkaW5nSWQoYW5uZW5WdXJkZXJpbmcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0ubWFwKGl0ZW0gPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFcnJvclN1bW1hcnkuSXRlbSBocmVmPXtgIyR7aXRlbS5za2plbWFlbGVtZW50SWR9YH0+e2l0ZW0uZmVpbG1lbGRpbmd9PC9FcnJvclN1bW1hcnkuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L0Vycm9yU3VtbWFyeT5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtza2plbWFGZWlsbWVsZGluZyAhPT0gJycgJiYgc2tqZW1hRmVpbG1lbGRpbmcgIT09IHVuZGVmaW5lZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxFcnJvck1lc3NhZ2U+e3NramVtYUZlaWxtZWxkaW5nfTwvRXJyb3JNZXNzYWdlPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPE1hbmdsZW5kZVN2YWxiYXJkbWVya2luZ1ZhcnNlbCAvPlxuICAgICAgICAgICAgICAgIDxNYW5nbGVuZGVGaW5ubWFya21lcmtpbmdWYXJzZWwgLz5cbiAgICAgICAgICAgIDwvVlN0YWNrPlxuICAgICAgICA8L1NramVtYXN0ZWc+XG4gICAgKTtcbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImZjZmIxNGRkNDgxZmZiZGVmZjUwXCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlTmF2aWdhdGUiLCJBbGVydCIsIkJvZHlTaG9ydCIsIkRldGFpbCIsIkVycm9yTWVzc2FnZSIsIkVycm9yU3VtbWFyeSIsIkhTdGFjayIsIkxpc3QiLCJWU3RhY2siLCJSZXNzdXJzU3RhdHVzIiwiRnlsbFV0Vmlsa8OlcnN2dXJkZXJpbmdJVGVzdG1pbGrDuEtuYXBwIiwiYW5uZW5WdXJkZXJpbmdGZWlsbWVsZGluZ0lkIiwidmlsa8OlckZlaWxtZWxkaW5nSWQiLCJPcHBkYXRlclJlZ2lzdGVyb3BwbHlzbmluZ2VyIiwiVmlsa8OlcnN2dXJkZXJpbmdTa2plbWEiLCJUw7htUGVyc29ub3BwbHlzbmluZ2VyQ2FjaGVJVGVzdG1pbGrDuEtuYXBwIiwiTWFuZ2xlbmRlRmlubm1hcmttZXJraW5nVmFyc2VsIiwic3R5bGVzIiwidXNlVmlsa8OlcnN2dXJkZXJpbmdDb250ZXh0IiwidXNlRmVhdHVyZVRvZ2dsZXMiLCJCZWhhbmRsaW5nU3RlZyIsIkJlaGFuZGxpbmfDhXJzYWsiLCJGZWF0dXJlVG9nZ2xlIiwiYW5uZW5WdXJkZXJpbmdDb25maWciLCJ2aWxrw6VyQ29uZmlnIiwiRGF0b2Zvcm1hdCIsImlzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyIsImVyUHJvZCIsImhlbnRGcm9udGVuZEZlaWxtZWxkaW5nIiwidXNlQmVoYW5kbGluZ0NvbnRleHQiLCJTa2plbWFzdGVnIiwiTWFuZ2xlbmRlU3ZhbGJhcmRtZXJraW5nVmFyc2VsIiwidXNlRmFnc2FrQ29udGV4dCIsIlZpbGvDpXJzdnVyZGVyaW5nIiwiX3MiLCJfYmVoYW5kbGluZyRzw7hrbmFkc2dyIiwiX2JlaGFuZGxpbmckc8O4a25hZHNncjIiLCJ0b2dnbGVzIiwiX3VzZUZhZ3Nha0NvbnRleHQiLCJmYWdzYWsiLCJfdXNlQmVoYW5kbGluZ0NvbnRleHQiLCJiZWhhbmRsaW5nIiwidnVyZGVyRXJMZXNldmlzbmluZyIsInZpbGvDpXJzdnVyZGVyaW5nTmVzdGVPbkNsaWNrIiwiYmVoYW5kbGluZ3NzdGVnU3VibWl0cmVzc3VycyIsIl91c2VWaWxrw6Vyc3Z1cmRlcmluZ0MiLCJlclZpbGvDpXJzdnVyZGVyaW5nZW5HeWxkaWciLCJoZW50Vmlsa8Olck1lZEZlaWwiLCJoZW50QW5kcmVWdXJkZXJpbmdlck1lZEZlaWwiLCJ2aWxrw6Vyc3Z1cmRlcmluZyIsImVyTGVzZXZpc25pbmciLCJfUmVhY3QkdXNlU3RhdGUiLCJ1c2VTdGF0ZSIsIl9SZWFjdCR1c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInZpc0ZlaWxtZWxkaW5nZXIiLCJzZXR0VmlzRmVpbG1lbGRpbmdlciIsIm5hdmlnYXRlIiwidXJlZ2lzdHJlcnRlQmFybiIsInPDuGtuYWRzZ3J1bm5sYWciLCJiYXJuYU1lZE9wcGx5c25pbmdlciIsImZpbHRlciIsImJhcm4iLCJlckZvbGtlcmVnaXN0cmVydCIsImxlbmd0aCIsImNyZWF0ZUVsZW1lbnQiLCJza2plbWFGZWlsbWVsZGluZyIsInNrYWxWaXNlRm9ycmlnZUtuYXBwIiwiw6Vyc2FrIiwiU8OYS05BRCIsIkbDmERTRUxTSEVOREVMU0UiLCJ0aXR0ZWwiLCJmb3JyaWdlT25DbGljayIsImNvbmNhdCIsImlkIiwiYmVoYW5kbGluZ0lkIiwibmVzdGVPbkNsaWNrIiwibWF4V2lkdGhTdHlsZSIsInNlbmRlcklubiIsInN0YXR1cyIsIkhFTlRFUiIsInN0ZWciLCJWSUxLw4VSU1ZVUkRFUklORyIsIkZyYWdtZW50IiwibWlncmVyaW5nc2RhdG8iLCJjbGFzc05hbWUiLCJoZW50ZXRMYWJlbCIsImNoaWxkcmVuIiwiaXNvU3RyaW5nIiwidGlsRm9ybWF0IiwiREFUTyIsInNrYWxTa2p1bGVUZXN0bWlsasO4a25hcHBlciIsImdhcCIsIm1hcmdpbkJsb2NrIiwidmFyaWFudCIsImFzIiwibWFwIiwidXJlZ2lzdHJlcnRCYXJuIiwiSXRlbSIsImtleSIsIm5hdm4iLCJmw7hkc2Vsc2RhdG8iLCJoZWFkaW5nIiwic2l6ZSIsIl90b0NvbnN1bWFibGVBcnJheSIsInZpbGvDpXJSZXN1bHRhdCIsImZlaWxtZWxkaW5nIiwidmlsa8OlclR5cGUiLCJza2plbWFlbGVtZW50SWQiLCJhbm5lblZ1cmRlcmluZyIsInR5cGUiLCJpdGVtIiwiaHJlZiIsInVuZGVmaW5lZCIsIl9jIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==