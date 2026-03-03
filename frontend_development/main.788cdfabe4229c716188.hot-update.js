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
/******/ 	__webpack_require__.h = () => ("6d22c7abe466b30caeb5")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi43ODhjZGZhYmU0MjI5YzcxNjE4OC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQStCO0FBRVk7QUFFbUU7QUFDeEQ7QUFFMEM7QUFDSjtBQUN4QjtBQUNVO0FBQ1Q7QUFDbUM7QUFDZjtBQUN0QztBQUNvQjtBQUNJO0FBQ087QUFDZDtBQU0vQjtBQUMrQztBQUNoQztBQUN3QjtBQUNMO0FBQ2hDO0FBQ2tEO0FBQy9CO0FBRW5ELFNBQVNrQyxnQkFBZ0JBLENBQUEsRUFBRztFQUFBQyxFQUFBO0VBQUEsSUFBQUMscUJBQUEsRUFBQUMsc0JBQUE7RUFDL0IsSUFBTUMsT0FBTyxHQUFHbEIsNEVBQWlCLENBQUMsQ0FBQztFQUVuQyxJQUFBbUIsaUJBQUEsR0FBbUJOLGlFQUFnQixDQUFDLENBQUM7SUFBN0JPLE1BQU0sR0FBQUQsaUJBQUEsQ0FBTkMsTUFBTTtFQUNkLElBQUFDLHFCQUFBLEdBQ0lYLGlGQUFvQixDQUFDLENBQUM7SUFEbEJZLFVBQVUsR0FBQUQscUJBQUEsQ0FBVkMsVUFBVTtJQUFFQyxtQkFBbUIsR0FBQUYscUJBQUEsQ0FBbkJFLG1CQUFtQjtJQUFFQyw0QkFBNEIsR0FBQUgscUJBQUEsQ0FBNUJHLDRCQUE0QjtJQUFFQyw0QkFBNEIsR0FBQUoscUJBQUEsQ0FBNUJJLDRCQUE0QjtFQUduRyxJQUFBQyxxQkFBQSxHQUNJM0Isd0ZBQTBCLENBQUMsQ0FBQztJQUR4QjRCLDBCQUEwQixHQUFBRCxxQkFBQSxDQUExQkMsMEJBQTBCO0lBQUVDLGlCQUFpQixHQUFBRixxQkFBQSxDQUFqQkUsaUJBQWlCO0lBQUVDLDJCQUEyQixHQUFBSCxxQkFBQSxDQUEzQkcsMkJBQTJCO0lBQUVDLGdCQUFnQixHQUFBSixxQkFBQSxDQUFoQkksZ0JBQWdCO0VBR3BHLElBQU1DLGFBQWEsR0FBR1IsbUJBQW1CLENBQUMsQ0FBQztFQUUzQyxJQUFBUyxl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QWlCLEtBQUssRUFBRSxJQUFJQSxpQkFBaUIsS0FBSytDLFNBQVMsaUJBQ3hEbEgsZ0RBQUEsQ0FBQ0ssMERBQVksUUFBRThELGlCQUFnQyxDQUNsRCxlQUNEbkUsZ0RBQUEsQ0FBQ2dDLG1HQUE4QixNQUFFLENBQUMsZUFDbENoQyxnREFBQSxDQUFDaUIsbUdBQThCLE1BQUUsQ0FDN0IsQ0FDQSxDQUFDO0FBRXJCO0FBQUNrQixFQUFBLENBdEhlRCxnQkFBZ0I7RUFBQSxRQUNaZCx3RUFBaUIsRUFFZGEsNkRBQWdCLEVBRS9CSCw2RUFBb0IsRUFHcEJYLG9GQUEwQixFQU1ibEIscURBQVc7QUFBQTtBQUFBa0gsRUFBQSxHQWRoQmpGLGdCQUFnQjtBQUFBLElBQUFpRixFQUFBO0FBQUFDLHNDQUFBLENBQUFELEVBQUEseUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ2pDaEMsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9GYWdzYWsvQmVoYW5kbGluZy9TaWRlci9WaWxrw6Vyc3Z1cmRlcmluZy9WaWxrw6Vyc3Z1cmRlcmluZy50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuXG5pbXBvcnQgeyBBbGVydCwgQm9keVNob3J0LCBEZXRhaWwsIEVycm9yTWVzc2FnZSwgRXJyb3JTdW1tYXJ5LCBIU3RhY2ssIExpc3QsIFZTdGFjayB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHsgUmVzc3Vyc1N0YXR1cyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5cbmltcG9ydCB7IEZ5bGxVdFZpbGvDpXJzdnVyZGVyaW5nSVRlc3RtaWxqw7hLbmFwcCB9IGZyb20gJy4vRnlsbFV0Vmlsa8OlcnN2dXJkZXJpbmdJVGVzdG1pbGrDuEtuYXBwJztcbmltcG9ydCB7IGFubmVuVnVyZGVyaW5nRmVpbG1lbGRpbmdJZCB9IGZyb20gJy4vR2VuZXJpc2tBbm5lblZ1cmRlcmluZy9Bbm5lblZ1cmRlcmluZ1RhYmVsbCc7XG5pbXBvcnQgeyB2aWxrw6VyRmVpbG1lbGRpbmdJZCB9IGZyb20gJy4vR2VuZXJpc2tWaWxrw6VyL1ZpbGvDpXJUYWJlbGwnO1xuaW1wb3J0IHsgT3BwZGF0ZXJSZWdpc3Rlcm9wcGx5c25pbmdlciB9IGZyb20gJy4vT3BwZGF0ZXJSZWdpc3Rlcm9wcGx5c25pbmdlcic7XG5pbXBvcnQgVmlsa8OlcnN2dXJkZXJpbmdTa2plbWEgZnJvbSAnLi9Ta2plbWEvVmlsa8OlcnN2dXJkZXJpbmdTa2plbWEnO1xuaW1wb3J0IHsgVMO4bVBlcnNvbm9wcGx5c25pbmdlckNhY2hlSVRlc3RtaWxqw7hLbmFwcCB9IGZyb20gJy4vVMO4bVBlcnNvbm9wcGx5c25pbmdlckNhY2hlSVRlc3RtaWxqw7hLbmFwcCc7XG5pbXBvcnQgeyBNYW5nbGVuZGVGaW5ubWFya21lcmtpbmdWYXJzZWwgfSBmcm9tICcuL1ZhcnNlbC9NYW5nbGVuZGVGaW5ubWFya21lcmtpbmdWYXJzZWwnO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1ZpbGvDpXJzdnVyZGVyaW5nLm1vZHVsZS5jc3MnO1xuaW1wb3J0IHsgdXNlVmlsa8OlcnN2dXJkZXJpbmdDb250ZXh0IH0gZnJvbSAnLi9WaWxrw6Vyc3Z1cmRlcmluZ0NvbnRleHQnO1xuaW1wb3J0IHsgdXNlRmVhdHVyZVRvZ2dsZXMgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9ob29rcy91c2VGZWF0dXJlVG9nZ2xlcyc7XG5pbXBvcnQgeyBCZWhhbmRsaW5nU3RlZywgQmVoYW5kbGluZ8OFcnNhayB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL2JlaGFuZGxpbmcnO1xuaW1wb3J0IHsgRmVhdHVyZVRvZ2dsZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL2ZlYXR1cmVUb2dnbGVzJztcbmltcG9ydCB7XG4gICAgYW5uZW5WdXJkZXJpbmdDb25maWcsXG4gICAgdHlwZSBJQW5uZW5WdXJkZXJpbmcsXG4gICAgdHlwZSBJVmlsa8OlclJlc3VsdGF0LFxuICAgIHZpbGvDpXJDb25maWcsXG59IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL3ZpbGvDpXInO1xuaW1wb3J0IHsgRGF0b2Zvcm1hdCwgaXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvZGF0byc7XG5pbXBvcnQgeyBlclByb2QgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9taWxqw7gnO1xuaW1wb3J0IHsgaGVudEZyb250ZW5kRmVpbG1lbGRpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9yZXNzdXJzVXRpbHMnO1xuaW1wb3J0IHsgdXNlQmVoYW5kbGluZ0NvbnRleHQgfSBmcm9tICcuLi8uLi9jb250ZXh0L0JlaGFuZGxpbmdDb250ZXh0JztcbmltcG9ydCBTa2plbWFzdGVnIGZyb20gJy4uL1NramVtYXN0ZWcnO1xuaW1wb3J0IHsgTWFuZ2xlbmRlU3ZhbGJhcmRtZXJraW5nVmFyc2VsIH0gZnJvbSAnLi9WYXJzZWwvTWFuZ2xlbmRlU3ZhbGJhcmRtZXJraW5nVmFyc2VsJztcbmltcG9ydCB7IHVzZUZhZ3Nha0NvbnRleHQgfSBmcm9tICcuLi8uLi8uLi9GYWdzYWtDb250ZXh0JztcblxuZXhwb3J0IGZ1bmN0aW9uIFZpbGvDpXJzdnVyZGVyaW5nKCkge1xuICAgIGNvbnN0IHRvZ2dsZXMgPSB1c2VGZWF0dXJlVG9nZ2xlcygpO1xuXG4gICAgY29uc3QgeyBmYWdzYWsgfSA9IHVzZUZhZ3Nha0NvbnRleHQoKTtcbiAgICBjb25zdCB7IGJlaGFuZGxpbmcsIHZ1cmRlckVyTGVzZXZpc25pbmcsIHZpbGvDpXJzdnVyZGVyaW5nTmVzdGVPbkNsaWNrLCBiZWhhbmRsaW5nc3N0ZWdTdWJtaXRyZXNzdXJzIH0gPVxuICAgICAgICB1c2VCZWhhbmRsaW5nQ29udGV4dCgpO1xuXG4gICAgY29uc3QgeyBlclZpbGvDpXJzdnVyZGVyaW5nZW5HeWxkaWcsIGhlbnRWaWxrw6VyTWVkRmVpbCwgaGVudEFuZHJlVnVyZGVyaW5nZXJNZWRGZWlsLCB2aWxrw6Vyc3Z1cmRlcmluZyB9ID1cbiAgICAgICAgdXNlVmlsa8OlcnN2dXJkZXJpbmdDb250ZXh0KCk7XG5cbiAgICBjb25zdCBlckxlc2V2aXNuaW5nID0gdnVyZGVyRXJMZXNldmlzbmluZygpO1xuXG4gICAgY29uc3QgW3Zpc0ZlaWxtZWxkaW5nZXIsIHNldHRWaXNGZWlsbWVsZGluZ2VyXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICAgIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcblxuICAgIGNvbnN0IHVyZWdpc3RyZXJ0ZUJhcm4gPVxuICAgICAgICBiZWhhbmRsaW5nLnPDuGtuYWRzZ3J1bm5sYWc/LmJhcm5hTWVkT3BwbHlzbmluZ2VyLmZpbHRlcihiYXJuID0+ICFiYXJuLmVyRm9sa2VyZWdpc3RyZXJ0KSA/PyBbXTtcblxuICAgIGlmICh2aWxrw6Vyc3Z1cmRlcmluZy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+RmlubmVyIGluZ2VuIHZpbGvDpXIgcMOlIGJlaGFuZGxpbmdlbi48L2Rpdj47XG4gICAgfVxuXG4gICAgY29uc3Qgc2tqZW1hRmVpbG1lbGRpbmcgPSBoZW50RnJvbnRlbmRGZWlsbWVsZGluZyhiZWhhbmRsaW5nc3N0ZWdTdWJtaXRyZXNzdXJzKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxTa2plbWFzdGVnXG4gICAgICAgICAgICBza2FsVmlzZUZvcnJpZ2VLbmFwcD17XG4gICAgICAgICAgICAgICAgYmVoYW5kbGluZy7DpXJzYWsgPT09IEJlaGFuZGxpbmfDhXJzYWsuU8OYS05BRCB8fCBiZWhhbmRsaW5nLsOlcnNhayA9PT0gQmVoYW5kbGluZ8OFcnNhay5Gw5hEU0VMU0hFTkRFTFNFXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aXR0ZWw9eydWaWxrw6Vyc3Z1cmRlcmluZyd9XG4gICAgICAgICAgICBmb3JyaWdlT25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChiZWhhbmRsaW5nLsOlcnNhayA9PT0gQmVoYW5kbGluZ8OFcnNhay5Tw5hLTkFEKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlKGAvZmFnc2FrLyR7ZmFnc2FrLmlkfS8ke2JlaGFuZGxpbmcuYmVoYW5kbGluZ0lkfS9yZWdpc3RyZXItc29rbmFkYCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGUoYC9mYWdzYWsvJHtmYWdzYWsuaWR9LyR7YmVoYW5kbGluZy5iZWhhbmRsaW5nSWR9L2ZpbHRyZXJpbmdzcmVnbGVyYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG5lc3RlT25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlckxlc2V2aXNuaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlKGAvZmFnc2FrLyR7ZmFnc2FrLmlkfS8ke2JlaGFuZGxpbmcuYmVoYW5kbGluZ0lkfS90aWxramVudC15dGVsc2VgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVyVmlsa8OlcnN2dXJkZXJpbmdlbkd5bGRpZygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpbGvDpXJzdnVyZGVyaW5nTmVzdGVPbkNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dFZpc0ZlaWxtZWxkaW5nZXIodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG1heFdpZHRoU3R5bGU9eyc4MHJlbSd9XG4gICAgICAgICAgICBzZW5kZXJJbm49e2JlaGFuZGxpbmdzc3RlZ1N1Ym1pdHJlc3N1cnMuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLkhFTlRFUn1cbiAgICAgICAgICAgIHN0ZWc9e0JlaGFuZGxpbmdTdGVnLlZJTEvDhVJTVlVSREVSSU5HfVxuICAgICAgICA+XG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIHtiZWhhbmRsaW5nPy5taWdyZXJpbmdzZGF0byAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxEZXRhaWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmhlbnRldExhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW49e2BTYWtlbiBibGUgbWlncmVydCBmcmEgSW5mb3RyeWdkOiAke2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNvU3RyaW5nOiBiZWhhbmRsaW5nPy5taWdyZXJpbmdzZGF0byxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWxGb3JtYXQ6IERhdG9mb3JtYXQuREFUTyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfWB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8T3BwZGF0ZXJSZWdpc3Rlcm9wcGx5c25pbmdlciAvPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICB7IWVyUHJvZCgpICYmICF0b2dnbGVzW0ZlYXR1cmVUb2dnbGUuc2thbFNranVsZVRlc3RtaWxqw7hrbmFwcGVyXSAmJiAoXG4gICAgICAgICAgICAgICAgPEhTdGFjayBnYXA9XCJzcGFjZS0xNlwiIG1hcmdpbkJsb2NrPXsnc3BhY2UtMzIgc3BhY2UtMzInfT5cbiAgICAgICAgICAgICAgICAgICAgPEZ5bGxVdFZpbGvDpXJzdnVyZGVyaW5nSVRlc3RtaWxqw7hLbmFwcCBiZWhhbmRsaW5nSWQ9e2JlaGFuZGxpbmcuYmVoYW5kbGluZ0lkfSAvPlxuICAgICAgICAgICAgICAgICAgICA8VMO4bVBlcnNvbm9wcGx5c25pbmdlckNhY2hlSVRlc3RtaWxqw7hLbmFwcCAvPlxuICAgICAgICAgICAgICAgIDwvSFN0YWNrPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxWU3RhY2sgZ2FwPVwic3BhY2UtOFwiPlxuICAgICAgICAgICAgICAgIDxWaWxrw6Vyc3Z1cmRlcmluZ1NramVtYSB2aXNGZWlsbWVsZGluZ2VyPXt2aXNGZWlsbWVsZGluZ2VyfSAvPlxuICAgICAgICAgICAgICAgIHt1cmVnaXN0cmVydGVCYXJuLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8QWxlcnQgdmFyaWFudD1cImluZm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQ+RHUgaGFyIHJlZ2lzdHJlcnQgZsO4bGdlbmRlIGJhcm4gc29tIGlra2UgZXIgcmVnaXN0cmVydCBpIEZvbGtlcmVnaXN0ZXJldDo8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0IGFzPXsnb2wnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dXJlZ2lzdHJlcnRlQmFybi5tYXAodXJlZ2lzdHJlcnRCYXJuID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBrZXk9e2Ake3VyZWdpc3RyZXJ0QmFybi5uYXZufV8ke3VyZWdpc3RyZXJ0QmFybi5mw7hkc2Vsc2RhdG99YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtgJHt1cmVnaXN0cmVydEJhcm4ubmF2bn0gLSAke2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzb1N0cmluZzogdXJlZ2lzdHJlcnRCYXJuLmbDuGRzZWxzZGF0byxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0LkRBVE8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlzdD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQ+RGV0dGUgdmlsIGbDuHJlIHRpbCBhdnNsYWcgZm9yIGJhcm5hIGkgbGlzdGVuLjwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICA8L0FsZXJ0PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgdGVzdFxuICAgICAgICAgICAgICAgIHsoaGVudFZpbGvDpXJNZWRGZWlsKCkubGVuZ3RoID4gMCB8fCBoZW50QW5kcmVWdXJkZXJpbmdlck1lZEZlaWwoKS5sZW5ndGggPiAwKSAmJiB2aXNGZWlsbWVsZGluZ2VyICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEVycm9yU3VtbWFyeSBoZWFkaW5nPXsnRm9yIMOlIGfDpSB2aWRlcmUgbcOlIGR1IHJldHRlIG9wcCBmw7hsZ2VuZGU6J30gc2l6ZT1cInNtYWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmhlbnRWaWxrw6VyTWVkRmVpbCgpLm1hcCgodmlsa8OlclJlc3VsdGF0OiBJVmlsa8OlclJlc3VsdGF0KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWlsbWVsZGluZzogYEV0IHZpbGvDpXIgYXYgdHlwZW4gJyR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWxrw6VyQ29uZmlnW3ZpbGvDpXJSZXN1bHRhdC52aWxrw6VyVHlwZV0udGl0dGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0nIGVyIGlra2UgZnVsbHN0ZW5kaWdgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2plbWFlbGVtZW50SWQ6IHZpbGvDpXJGZWlsbWVsZGluZ0lkKHZpbGvDpXJSZXN1bHRhdCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmhlbnRBbmRyZVZ1cmRlcmluZ2VyTWVkRmVpbCgpLm1hcCgoYW5uZW5WdXJkZXJpbmc6IElBbm5lblZ1cmRlcmluZykgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVpbG1lbGRpbmc6IGBFdCB2aWxrw6VyIGF2IHR5cGVuICcke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5uZW5WdXJkZXJpbmdDb25maWdbYW5uZW5WdXJkZXJpbmcudHlwZV0udGl0dGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0nIGVyIGlra2UgZnVsbHN0ZW5kaWdgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2plbWFlbGVtZW50SWQ6IGFubmVuVnVyZGVyaW5nRmVpbG1lbGRpbmdJZChhbm5lblZ1cmRlcmluZyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXS5tYXAoaXRlbSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEVycm9yU3VtbWFyeS5JdGVtIGhyZWY9e2AjJHtpdGVtLnNramVtYWVsZW1lbnRJZH1gfT57aXRlbS5mZWlsbWVsZGluZ308L0Vycm9yU3VtbWFyeS5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvRXJyb3JTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge3NramVtYUZlaWxtZWxkaW5nICE9PSAnJyAmJiBza2plbWFGZWlsbWVsZGluZyAhPT0gdW5kZWZpbmVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEVycm9yTWVzc2FnZT57c2tqZW1hRmVpbG1lbGRpbmd9PC9FcnJvck1lc3NhZ2U+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8TWFuZ2xlbmRlU3ZhbGJhcmRtZXJraW5nVmFyc2VsIC8+XG4gICAgICAgICAgICAgICAgPE1hbmdsZW5kZUZpbm5tYXJrbWVya2luZ1ZhcnNlbCAvPlxuICAgICAgICAgICAgPC9WU3RhY2s+XG4gICAgICAgIDwvU2tqZW1hc3RlZz5cbiAgICApO1xufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiNmQyMmM3YWJlNDY2YjMwY2FlYjVcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VOYXZpZ2F0ZSIsIkFsZXJ0IiwiQm9keVNob3J0IiwiRGV0YWlsIiwiRXJyb3JNZXNzYWdlIiwiRXJyb3JTdW1tYXJ5IiwiSFN0YWNrIiwiTGlzdCIsIlZTdGFjayIsIlJlc3N1cnNTdGF0dXMiLCJGeWxsVXRWaWxrw6Vyc3Z1cmRlcmluZ0lUZXN0bWlsasO4S25hcHAiLCJhbm5lblZ1cmRlcmluZ0ZlaWxtZWxkaW5nSWQiLCJ2aWxrw6VyRmVpbG1lbGRpbmdJZCIsIk9wcGRhdGVyUmVnaXN0ZXJvcHBseXNuaW5nZXIiLCJWaWxrw6Vyc3Z1cmRlcmluZ1NramVtYSIsIlTDuG1QZXJzb25vcHBseXNuaW5nZXJDYWNoZUlUZXN0bWlsasO4S25hcHAiLCJNYW5nbGVuZGVGaW5ubWFya21lcmtpbmdWYXJzZWwiLCJzdHlsZXMiLCJ1c2VWaWxrw6Vyc3Z1cmRlcmluZ0NvbnRleHQiLCJ1c2VGZWF0dXJlVG9nZ2xlcyIsIkJlaGFuZGxpbmdTdGVnIiwiQmVoYW5kbGluZ8OFcnNhayIsIkZlYXR1cmVUb2dnbGUiLCJhbm5lblZ1cmRlcmluZ0NvbmZpZyIsInZpbGvDpXJDb25maWciLCJEYXRvZm9ybWF0IiwiaXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nIiwiZXJQcm9kIiwiaGVudEZyb250ZW5kRmVpbG1lbGRpbmciLCJ1c2VCZWhhbmRsaW5nQ29udGV4dCIsIlNramVtYXN0ZWciLCJNYW5nbGVuZGVTdmFsYmFyZG1lcmtpbmdWYXJzZWwiLCJ1c2VGYWdzYWtDb250ZXh0IiwiVmlsa8OlcnN2dXJkZXJpbmciLCJfcyIsIl9iZWhhbmRsaW5nJHPDuGtuYWRzZ3IiLCJfYmVoYW5kbGluZyRzw7hrbmFkc2dyMiIsInRvZ2dsZXMiLCJfdXNlRmFnc2FrQ29udGV4dCIsImZhZ3NhayIsIl91c2VCZWhhbmRsaW5nQ29udGV4dCIsImJlaGFuZGxpbmciLCJ2dXJkZXJFckxlc2V2aXNuaW5nIiwidmlsa8OlcnN2dXJkZXJpbmdOZXN0ZU9uQ2xpY2siLCJiZWhhbmRsaW5nc3N0ZWdTdWJtaXRyZXNzdXJzIiwiX3VzZVZpbGvDpXJzdnVyZGVyaW5nQyIsImVyVmlsa8OlcnN2dXJkZXJpbmdlbkd5bGRpZyIsImhlbnRWaWxrw6VyTWVkRmVpbCIsImhlbnRBbmRyZVZ1cmRlcmluZ2VyTWVkRmVpbCIsInZpbGvDpXJzdnVyZGVyaW5nIiwiZXJMZXNldmlzbmluZyIsIl9SZWFjdCR1c2VTdGF0ZSIsInVzZVN0YXRlIiwiX1JlYWN0JHVzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5IiwidmlzRmVpbG1lbGRpbmdlciIsInNldHRWaXNGZWlsbWVsZGluZ2VyIiwibmF2aWdhdGUiLCJ1cmVnaXN0cmVydGVCYXJuIiwic8O4a25hZHNncnVubmxhZyIsImJhcm5hTWVkT3BwbHlzbmluZ2VyIiwiZmlsdGVyIiwiYmFybiIsImVyRm9sa2VyZWdpc3RyZXJ0IiwibGVuZ3RoIiwiY3JlYXRlRWxlbWVudCIsInNramVtYUZlaWxtZWxkaW5nIiwic2thbFZpc2VGb3JyaWdlS25hcHAiLCLDpXJzYWsiLCJTw5hLTkFEIiwiRsOYRFNFTFNIRU5ERUxTRSIsInRpdHRlbCIsImZvcnJpZ2VPbkNsaWNrIiwiY29uY2F0IiwiaWQiLCJiZWhhbmRsaW5nSWQiLCJuZXN0ZU9uQ2xpY2siLCJtYXhXaWR0aFN0eWxlIiwic2VuZGVySW5uIiwic3RhdHVzIiwiSEVOVEVSIiwic3RlZyIsIlZJTEvDhVJTVlVSREVSSU5HIiwiRnJhZ21lbnQiLCJtaWdyZXJpbmdzZGF0byIsImNsYXNzTmFtZSIsImhlbnRldExhYmVsIiwiY2hpbGRyZW4iLCJpc29TdHJpbmciLCJ0aWxGb3JtYXQiLCJEQVRPIiwic2thbFNranVsZVRlc3RtaWxqw7hrbmFwcGVyIiwiZ2FwIiwibWFyZ2luQmxvY2siLCJ2YXJpYW50IiwiYXMiLCJtYXAiLCJ1cmVnaXN0cmVydEJhcm4iLCJJdGVtIiwia2V5IiwibmF2biIsImbDuGRzZWxzZGF0byIsImhlYWRpbmciLCJzaXplIiwiX3RvQ29uc3VtYWJsZUFycmF5Iiwidmlsa8OlclJlc3VsdGF0IiwiZmVpbG1lbGRpbmciLCJ2aWxrw6VyVHlwZSIsInNramVtYWVsZW1lbnRJZCIsImFubmVuVnVyZGVyaW5nIiwidHlwZSIsIml0ZW0iLCJocmVmIiwidW5kZWZpbmVkIiwiX2MiLCIkUmVmcmVzaFJlZyQiXSwic291cmNlUm9vdCI6IiJ9