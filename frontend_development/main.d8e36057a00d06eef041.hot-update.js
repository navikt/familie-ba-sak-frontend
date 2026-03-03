"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

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
/******/ 	__webpack_require__.h = () => ("6fb94a6c6a831843e6f8")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGVBQ2xDL0osZ0RBQUEsQ0FBQ3lKLG1HQUE4QixNQUFFLENBQzdCLENBQ0EsQ0FBQztBQUVyQjtBQUFDdkgsRUFBQSxDQXJIZStILGdCQUFnQjtFQUFBLFFBQ1puSix3RUFBaUIsRUFFZGtKLDZEQUFnQixFQUUvQnhJLDZFQUFvQixFQUdwQkssb0ZBQTBCLEVBTWJpSCxxREFBVztBQUFBO0FBQUFGLEVBQUEsR0FkaEJxQixnQkFBZ0I7QUFBQSxJQUFBckIsRUFBQTtBQUFBQyxzQ0FBQSxDQUFBRCxFQUFBLHlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNqQ2hDLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvRmFnc2FrL0JlaGFuZGxpbmcvU2lkZXIvVmlsa8OlcnN2dXJkZXJpbmcvU2tqZW1hL1ZpbGvDpXJzdnVyZGVyaW5nU2tqZW1hTm9ybWFsLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9GYWdzYWsvQmVoYW5kbGluZy9TaWRlci9WaWxrw6Vyc3Z1cmRlcmluZy9WaWxrw6Vyc3Z1cmRlcmluZy50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBBY3Rpdml0eSwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQ2hldnJvbkRvd25JY29uLCBDaGV2cm9uVXBJY29uLCBQbHVzQ2lyY2xlSWNvbiB9IGZyb20gJ0BuYXZpa3QvYWtzZWwtaWNvbnMnO1xuaW1wb3J0IHsgQWxlcnQsIEJvZHlTaG9ydCwgQm94LCBCdXR0b24sIEhTdGFjaywgTGlzdCB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBGZWx0U3RhdGUgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtc2tqZW1hJztcbmltcG9ydCB0eXBlIHsgUmVzc3VycyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcblxuaW1wb3J0IHsgdXNlRmVhdHVyZVRvZ2dsZXMgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9ob29rcy91c2VGZWF0dXJlVG9nZ2xlcyc7XG5pbXBvcnQgUGVyc29uSW5mb3JtYXNqb24gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4va29tcG9uZW50ZXIvUGVyc29uSW5mb3JtYXNqb24vUGVyc29uSW5mb3JtYXNqb24nO1xuaW1wb3J0IHsgQmVoYW5kbGluZ1N0ZWcsIEJlaGFuZGxpbmfDhXJzYWssIHR5cGUgSUJlaGFuZGxpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi90eXBlci9iZWhhbmRsaW5nJztcbmltcG9ydCB7IEZlYXR1cmVUb2dnbGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi90eXBlci9mZWF0dXJlVG9nZ2xlcyc7XG5pbXBvcnQgeyBQZXJzb25UeXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvcGVyc29uJztcbmltcG9ydCB7XG4gICAgYW5uZW5WdXJkZXJpbmdDb25maWcsXG4gICAgdHlwZSBJUGVyc29uUmVzdWx0YXQsXG4gICAgdHlwZSBJVmlsa8OlckNvbmZpZyxcbiAgICB0eXBlIElWaWxrw6VyUmVzdWx0YXQsXG4gICAgUmVzdWx0YXQsXG4gICAgdmlsa8OlckNvbmZpZyxcbiAgICBWaWxrw6VyVHlwZSxcbn0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvdmlsa8Olcic7XG5pbXBvcnQgeyB1c2VCZWhhbmRsaW5nQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uL2NvbnRleHQvQmVoYW5kbGluZ0NvbnRleHQnO1xuaW1wb3J0IEdlbmVyaXNrQW5uZW5WdXJkZXJpbmcgZnJvbSAnLi4vR2VuZXJpc2tBbm5lblZ1cmRlcmluZy9HZW5lcmlza0FubmVuVnVyZGVyaW5nJztcbmltcG9ydCBHZW5lcmlza1ZpbGvDpXIgZnJvbSAnLi4vR2VuZXJpc2tWaWxrw6VyL0dlbmVyaXNrVmlsa8Olcic7XG5pbXBvcnQgUmVnaXN0ZXJvcHBseXNuaW5nZXIgZnJvbSAnLi4vUmVnaXN0ZXJvcHBseXNuaW5nZXIvUmVnaXN0ZXJvcHBseXNuaW5nZXInO1xuaW1wb3J0IHsgdXRsZWRWaWxrw6VyU29tTcOlS29udHJvbGxlcmVzUGVyUGVyc29uIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgdXNlVmlsa8OlcnN2dXJkZXJpbmdDb250ZXh0LCBWaWxrw6VyU3VibWl0IH0gZnJvbSAnLi4vVmlsa8OlcnN2dXJkZXJpbmdDb250ZXh0JztcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9WaWxrw6Vyc3Z1cmRlcmluZ1NramVtYS5tb2R1bGUuY3NzJztcblxuaW50ZXJmYWNlIElWaWxrw6Vyc3Z1cmRlcmluZ1NramVtYU5vcm1hbCB7XG4gICAgdmlzRmVpbG1lbGRpbmdlcjogYm9vbGVhbjtcbn1cblxuY29uc3QgVmlsa8OlcnN2dXJkZXJpbmdTa2plbWFOb3JtYWw6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PElWaWxrw6Vyc3Z1cmRlcmluZ1NramVtYU5vcm1hbD4gPSAoeyB2aXNGZWlsbWVsZGluZ2VyIH0pID0+IHtcbiAgICBjb25zdCB0b2dnbGVzID0gdXNlRmVhdHVyZVRvZ2dsZXMoKTtcbiAgICBjb25zdCB7IHZpbGvDpXJzdnVyZGVyaW5nLCBzZXR0Vmlsa8OlclN1Ym1pdCwgcG9zdFZpbGvDpXIgfSA9IHVzZVZpbGvDpXJzdnVyZGVyaW5nQ29udGV4dCgpO1xuICAgIGNvbnN0IHsgdnVyZGVyRXJMZXNldmlzbmluZywgZXJNaWdyZXJpbmdzYmVoYW5kbGluZywgc2V0dMOFcGVuQmVoYW5kbGluZywgYWt0aXZTZXR0UMOlVmVudCwgYmVoYW5kbGluZyB9ID1cbiAgICAgICAgdXNlQmVoYW5kbGluZ0NvbnRleHQoKTtcbiAgICBjb25zdCBlckxlc2V2aXNuaW5nID0gdnVyZGVyRXJMZXNldmlzbmluZygpO1xuXG4gICAgY29uc3Qga2FuTGVnZ2VUaWxVdHZpZGV0Vmlsa8OlciA9XG4gICAgICAgIGVyTWlncmVyaW5nc2JlaGFuZGxpbmcgfHxcbiAgICAgICAgYmVoYW5kbGluZy7DpXJzYWsgPT09IEJlaGFuZGxpbmfDhXJzYWsuS09SUkVLU0pPTl9WRURUQUtTQlJFViB8fFxuICAgICAgICBiZWhhbmRsaW5nLsOlcnNhayA9PT0gQmVoYW5kbGluZ8OFcnNhay5URUtOSVNLX0VORFJJTkcgfHxcbiAgICAgICAgYmVoYW5kbGluZy7DpXJzYWsgPT09IEJlaGFuZGxpbmfDhXJzYWsuS0xBR0UgfHxcbiAgICAgICAgYmVoYW5kbGluZy7DpXJzYWsgPT09IEJlaGFuZGxpbmfDhXJzYWsuRU5EUkVfTUlHUkVSSU5HU0RBVE8gfHxcbiAgICAgICAgYmVoYW5kbGluZy7DpXJzYWsgPT09IEJlaGFuZGxpbmfDhXJzYWsuSVZFUktTRVRURV9LQV9WRURUQUs7XG5cbiAgICBjb25zdCBwZXJzb25IYXJJa2tldnVyZGVydFZpbGvDpXIgPSAocGVyc29uUmVzdWx0YXQ6IElQZXJzb25SZXN1bHRhdCkgPT5cbiAgICAgICAgcGVyc29uUmVzdWx0YXQudmlsa8OlclJlc3VsdGF0ZXIuc29tZShcbiAgICAgICAgICAgIHZpbGvDpXJSZXN1bHRhdEZlbHQgPT4gdmlsa8OlclJlc3VsdGF0RmVsdC52ZXJkaS5yZXN1bHRhdC52ZXJkaSA9PT0gUmVzdWx0YXQuSUtLRV9WVVJERVJUXG4gICAgICAgICk7XG5cbiAgICBjb25zdCBoZW50RWtzcGFudGRlcnRlUGVyc29uZXIgPSAoKSA9PlxuICAgICAgICB2aWxrw6Vyc3Z1cmRlcmluZy5yZWR1Y2UoXG4gICAgICAgICAgICAocGVyc29uTWFwRWtzcGFuZGVydCwgcGVyc29uUmVzdWx0YXQpID0+ICh7XG4gICAgICAgICAgICAgICAgLi4ucGVyc29uTWFwRWtzcGFuZGVydCxcbiAgICAgICAgICAgICAgICBbcGVyc29uUmVzdWx0YXQucGVyc29uSWRlbnRdOiBlckxlc2V2aXNuaW5nIHx8IHBlcnNvbkhhcklra2V2dXJkZXJ0Vmlsa8OlcihwZXJzb25SZXN1bHRhdCksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICk7XG5cbiAgICBjb25zdCBbcGVyc29uRXJFa3NwYW5kZXJ0LCBzZXR0UGVyc29uRXJFa3NwYW5kZXJ0XSA9IHVzZVN0YXRlPHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9PihcbiAgICAgICAgaGVudEVrc3BhbnRkZXJ0ZVBlcnNvbmVyKClcbiAgICApO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgc2V0dFBlcnNvbkVyRWtzcGFuZGVydChoZW50RWtzcGFudGRlcnRlUGVyc29uZXIoKSk7XG4gICAgfSwgW2FrdGl2U2V0dFDDpVZlbnRdKTtcblxuICAgIGNvbnN0IGxlZ2dUaWxWaWxrw6VyVXR2aWRldCA9IChwZXJzb25JZGVudDogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBwb3N0Vmlsa8OlcihwZXJzb25JZGVudCwgVmlsa8OlclR5cGUuVVRWSURFVF9CQVJORVRSWUdEKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKChvcHBkYXRlcnRCZWhhbmRsaW5nOiBSZXNzdXJzPElCZWhhbmRsaW5nPikgPT4ge1xuICAgICAgICAgICAgc2V0dFZpbGvDpXJTdWJtaXQoVmlsa8OlclN1Ym1pdC5OT05FKTtcbiAgICAgICAgICAgIGlmIChvcHBkYXRlcnRCZWhhbmRsaW5nLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5TVUtTRVNTKSB7XG4gICAgICAgICAgICAgICAgc2V0dMOFcGVuQmVoYW5kbGluZyhvcHBkYXRlcnRCZWhhbmRsaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHZpbGvDpXJTb21Nw6VLb250cm9sbGVyZXNQZXJQZXJzb24gPSBPYmplY3QuZW50cmllcyhcbiAgICAgICAgdXRsZWRWaWxrw6VyU29tTcOlS29udHJvbGxlcmVzUGVyUGVyc29uKGJlaGFuZGxpbmcsIHZpbGvDpXJzdnVyZGVyaW5nKVxuICAgICk7XG5cbiAgICBjb25zdCBza2FsVmlzZVZhcnNlbGJva3NGb3JWaWxrw6VyU29tTcOlS29udHJvbGxlcmVzID1cbiAgICAgICAgdG9nZ2xlc1tGZWF0dXJlVG9nZ2xlLnNrYWxWaXNlVmFyc2VsbGFtcGVGb3JNYW51ZWx0TGFndFRpbEJhcm5dICYmXG4gICAgICAgIHZpbGvDpXJTb21Nw6VLb250cm9sbGVyZXNQZXJQZXJzb24ubGVuZ3RoID4gMCAmJlxuICAgICAgICAoYmVoYW5kbGluZy5zdGVnID09IEJlaGFuZGxpbmdTdGVnLlZJTEvDhVJTVlVSREVSSU5HIHx8IGJlaGFuZGxpbmcuc3RlZyA9PSBCZWhhbmRsaW5nU3RlZy5CRVNMVVRURV9WRURUQUspO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIHtza2FsVmlzZVZhcnNlbGJva3NGb3JWaWxrw6VyU29tTcOlS29udHJvbGxlcmVzICYmIChcbiAgICAgICAgICAgICAgICA8QWxlcnQgdmFyaWFudD1cIndhcm5pbmdcIiBjb250ZW50TWF4V2lkdGg9e2ZhbHNlfSBzdHlsZT17eyB3aWR0aDogJ2ZpdC1jb250ZW50JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtiZWhhbmRsaW5nLnN0ZWcgPT0gQmVoYW5kbGluZ1N0ZWcuQkVTTFVUVEVfVkVEVEFLXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnQXV0b21hdGlzayB1dGZ5bHRlIHZpbGvDpXIgc29tIHNha3NiZWhhbmRsZXIgMSBpa2tlIGhhciBnam9ydCBlbmRyaW5nZXIgcMOlOidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdWw6ZyIG9wcG1lcmtzb206J31cbiAgICAgICAgICAgICAgICAgICAgPC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgICAgIDxMaXN0IGFzPVwidWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt2aWxrw6VyU29tTcOlS29udHJvbGxlcmVzUGVyUGVyc29uLm1hcCgoW25hdm4sIGF2dmlrXSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0ga2V5PXtuYXZufT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge25hdm59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0IGFzPVwidWxcIiBzaXplPVwic21hbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthdnZpay5tYXAoYXZ2aWsgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0ga2V5PXthdnZpa30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQgc2l6ZT1cInNtYWxsXCI+e2F2dmlrfTwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlzdC5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlzdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L0xpc3Q+XG4gICAgICAgICAgICAgICAgPC9BbGVydD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7dmlsa8OlcnN2dXJkZXJpbmcubWFwKChwZXJzb25SZXN1bHRhdDogSVBlcnNvblJlc3VsdGF0LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYW5kcmVWdXJkZXJpbmdlciA9IHBlcnNvblJlc3VsdGF0LmFuZHJlVnVyZGVyaW5nZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFyVXR2aWRldCA9IHBlcnNvblJlc3VsdGF0LnZpbGvDpXJSZXN1bHRhdGVyLmZpbmQoXG4gICAgICAgICAgICAgICAgICAgIHZpbGvDpXJSZXN1bHRhdCA9PiB2aWxrw6VyUmVzdWx0YXQudmVyZGkudmlsa8OlclR5cGUgPT09IFZpbGvDpXJUeXBlLlVUVklERVRfQkFSTkVUUllHRFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2Ake2luZGV4fV8ke3BlcnNvblJlc3VsdGF0LnBlcnNvbi5mw7hkc2Vsc2RhdG99YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtpbmRleH1fJHtwZXJzb25SZXN1bHRhdC5wZXJzb24uZsO4ZHNlbHNkYXRvfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxIU3RhY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5PXsnc3BhY2UtYmV0d2Vlbid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMucGVyc29uTGluamV9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBlcnNvbkluZm9ybWFzam9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbj17cGVyc29uUmVzdWx0YXQucGVyc29ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb21PdmVyc2tyaWZ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyTGVzZXZpc25pbmc9e2VyTGVzZXZpc25pbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IWVyTGVzZXZpc25pbmcgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uRXJFa3NwYW5kZXJ0W3BlcnNvblJlc3VsdGF0LnBlcnNvbklkZW50XSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25SZXN1bHRhdC5wZXJzb24udHlwZSA9PT0gUGVyc29uVHlwZS5Tw5hLRVIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWhhclV0dmlkZXQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2FuTGVnZ2VUaWxVdHZpZGV0Vmlsa8OlciAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD17J3RlcnRpYXJ5J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7aW5kZXh9XyR7cGVyc29uUmVzdWx0YXQucGVyc29uLmbDuGRzZWxzZGF0b31fX2xlZ2ctdGlsLXZpbGvDpXItdXR2aWRldGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbGVnZ1RpbFZpbGvDpXJVdHZpZGV0KHBlcnNvblJlc3VsdGF0LnBlcnNvbklkZW50KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplPXsnc21hbGwnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb249ezxQbHVzQ2lyY2xlSWNvbiB0aXRsZT1cIkxlZ2cgdGlsIHZpbGvDpXIgdXR2aWRldCBiYXJuZXRyeWdkXCIgLz59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2BMZWdnIHRpbCB2aWxrw6VyIHV0dmlkZXQgYmFybmV0cnlnZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgdmlzLXNranVsLXZpbGvDpXJzdnVyZGVyaW5nLSR7aW5kZXh9XyR7cGVyc29uUmVzdWx0YXQucGVyc29uLmbDuGRzZWxzZGF0b319YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInRlcnRpYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRQZXJzb25FckVrc3BhbmRlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnBlcnNvbkVyRWtzcGFuZGVydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcGVyc29uUmVzdWx0YXQucGVyc29uSWRlbnRdOiAhcGVyc29uRXJFa3NwYW5kZXJ0W3BlcnNvblJlc3VsdGF0LnBlcnNvbklkZW50XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj17XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25FckVrc3BhbmRlcnRbcGVyc29uUmVzdWx0YXQucGVyc29uSWRlbnRdID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uVXBJY29uIGFyaWEtaGlkZGVuIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uRG93bkljb24gYXJpYS1oaWRkZW4gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uUG9zaXRpb249XCJyaWdodFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGVyc29uRXJFa3NwYW5kZXJ0W3BlcnNvblJlc3VsdGF0LnBlcnNvbklkZW50XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnU2tqdWwgdmlsa8OlcnN2dXJkZXJpbmcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdWaXMgdmlsa8OlcnN2dXJkZXJpbmcnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QWN0aXZpdHkgbW9kZT17cGVyc29uRXJFa3NwYW5kZXJ0W3BlcnNvblJlc3VsdGF0LnBlcnNvbklkZW50XSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm94IHBhZGRpbmdJbmxpbmU9eydzcGFjZS01NiBzcGFjZS0wJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGVyc29uUmVzdWx0YXQucGVyc29uLnJlZ2lzdGVyaGlzdG9yaWtrID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSZWdpc3Rlcm9wcGx5c25pbmdlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdpc3Rlckhpc3Rvcmlraz17cGVyc29uUmVzdWx0YXQucGVyc29uLnJlZ2lzdGVyaGlzdG9yaWtrfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmw7hkc2Vsc2RhdG89e3BlcnNvblJlc3VsdGF0LnBlcnNvbi5mw7hkc2Vsc2RhdG99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFsZXJ0IHZhcmlhbnQ9XCJ3YXJuaW5nXCIgY2hpbGRyZW49eydLbGFydGUgaWtrZSBoZW50ZSByZWdpc3Rlcm9wcGx5c25pbmdlcid9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge09iamVjdC52YWx1ZXModmlsa8OlckNvbmZpZylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHZjOiBJVmlsa8OlckNvbmZpZykgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2Yy5wYXJ0ZXJEZXR0ZUdqZWxkZXJGb3IuaW5jbHVkZXMocGVyc29uUmVzdWx0YXQucGVyc29uLnR5cGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKCh2YzogSVZpbGvDpXJDb25maWcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2aWxrw6VyUmVzdWx0YXRlcjogRmVsdFN0YXRlPElWaWxrw6VyUmVzdWx0YXQ+W10gPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25SZXN1bHRhdC52aWxrw6VyUmVzdWx0YXRlci5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmlsa8OlclJlc3VsdGF0OiBGZWx0U3RhdGU8SVZpbGvDpXJSZXN1bHRhdD4pID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlsa8OlclJlc3VsdGF0LnZlcmRpLnZpbGvDpXJUeXBlID09PSB2Yy5rZXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlsa8OlclJlc3VsdGF0ZXIubGVuZ3RoID09PSAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvblJlc3VsdGF0LnBlcnNvbi50eXBlID09PSBQZXJzb25UeXBlLlPDmEtFUlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGb3IgYmFybiDDuG5za2VyIHZpIGFsbHRpZCDDpSByZW5kcmUgYWxsZSB2aWxrw6VyIHNsaWsgYXQgbWFuIGV2dCBrYW4gbGVnZ2UgdGlsIHRvbSBwZXJpb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEdlbmVyaXNrVmlsa8OlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17YCR7aW5kZXh9XyR7cGVyc29uUmVzdWx0YXQucGVyc29uLmbDuGRzZWxzZGF0b31fJHt2Yy5rZXl9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmlza1ZpbGvDpXJLZXk9e2Ake2luZGV4fV8ke3BlcnNvblJlc3VsdGF0LnBlcnNvbi5mw7hkc2Vsc2RhdG99XyR7dmMua2V5fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uPXtwZXJzb25SZXN1bHRhdC5wZXJzb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlsa8OlclJlc3VsdGF0ZXI9e3ZpbGvDpXJSZXN1bHRhdGVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpbGvDpXJGcmFDb25maWc9e3ZjfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc0ZlaWxtZWxkaW5nZXI9e3Zpc0ZlaWxtZWxkaW5nZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthbmRyZVZ1cmRlcmluZ2VyLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC52YWx1ZXMoYW5uZW5WdXJkZXJpbmdDb25maWcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihhbm5lblZ1cmRlcmluZ0NvbmZpZyA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbm5lblZ1cmRlcmluZ0NvbmZpZy5wYXJ0ZXJEZXR0ZUdqZWxkZXJGb3IuaW5jbHVkZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25SZXN1bHRhdC5wZXJzb24udHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoYW5uZW5WdXJkZXJpbmdDb25maWcgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8R2VuZXJpc2tBbm5lblZ1cmRlcmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtgJHtpbmRleH1fJHtwZXJzb25SZXN1bHRhdC5wZXJzb24uZsO4ZHNlbHNkYXRvfV8ke2FubmVuVnVyZGVyaW5nQ29uZmlnLmtleX1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uPXtwZXJzb25SZXN1bHRhdC5wZXJzb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmRyZVZ1cmRlcmluZ2VyPXtwZXJzb25SZXN1bHRhdC5hbmRyZVZ1cmRlcmluZ2VyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5uZW5WdXJkZXJpbmdDb25maWc9e2FubmVuVnVyZGVyaW5nQ29uZmlnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzRmVpbG1lbGRpbmdlcj17dmlzRmVpbG1lbGRpbmdlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQWN0aXZpdHk+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgPC8+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZpbGvDpXJzdnVyZGVyaW5nU2tqZW1hTm9ybWFsO1xuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5cbmltcG9ydCB7IEFsZXJ0LCBCb2R5U2hvcnQsIERldGFpbCwgRXJyb3JNZXNzYWdlLCBFcnJvclN1bW1hcnksIEhTdGFjaywgTGlzdCwgVlN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcblxuaW1wb3J0IHsgRnlsbFV0Vmlsa8OlcnN2dXJkZXJpbmdJVGVzdG1pbGrDuEtuYXBwIH0gZnJvbSAnLi9GeWxsVXRWaWxrw6Vyc3Z1cmRlcmluZ0lUZXN0bWlsasO4S25hcHAnO1xuaW1wb3J0IHsgYW5uZW5WdXJkZXJpbmdGZWlsbWVsZGluZ0lkIH0gZnJvbSAnLi9HZW5lcmlza0FubmVuVnVyZGVyaW5nL0FubmVuVnVyZGVyaW5nVGFiZWxsJztcbmltcG9ydCB7IHZpbGvDpXJGZWlsbWVsZGluZ0lkIH0gZnJvbSAnLi9HZW5lcmlza1ZpbGvDpXIvVmlsa8OlclRhYmVsbCc7XG5pbXBvcnQgeyBPcHBkYXRlclJlZ2lzdGVyb3BwbHlzbmluZ2VyIH0gZnJvbSAnLi9PcHBkYXRlclJlZ2lzdGVyb3BwbHlzbmluZ2VyJztcbmltcG9ydCBWaWxrw6Vyc3Z1cmRlcmluZ1NramVtYSBmcm9tICcuL1NramVtYS9WaWxrw6Vyc3Z1cmRlcmluZ1NramVtYSc7XG5pbXBvcnQgeyBUw7htUGVyc29ub3BwbHlzbmluZ2VyQ2FjaGVJVGVzdG1pbGrDuEtuYXBwIH0gZnJvbSAnLi9Uw7htUGVyc29ub3BwbHlzbmluZ2VyQ2FjaGVJVGVzdG1pbGrDuEtuYXBwJztcbmltcG9ydCB7IE1hbmdsZW5kZUZpbm5tYXJrbWVya2luZ1ZhcnNlbCB9IGZyb20gJy4vVmFyc2VsL01hbmdsZW5kZUZpbm5tYXJrbWVya2luZ1ZhcnNlbCc7XG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vVmlsa8OlcnN2dXJkZXJpbmcubW9kdWxlLmNzcyc7XG5pbXBvcnQgeyB1c2VWaWxrw6Vyc3Z1cmRlcmluZ0NvbnRleHQgfSBmcm9tICcuL1ZpbGvDpXJzdnVyZGVyaW5nQ29udGV4dCc7XG5pbXBvcnQgeyB1c2VGZWF0dXJlVG9nZ2xlcyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2hvb2tzL3VzZUZlYXR1cmVUb2dnbGVzJztcbmltcG9ydCB7IEJlaGFuZGxpbmdTdGVnLCBCZWhhbmRsaW5nw4Vyc2FrIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvYmVoYW5kbGluZyc7XG5pbXBvcnQgeyBGZWF0dXJlVG9nZ2xlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvZmVhdHVyZVRvZ2dsZXMnO1xuaW1wb3J0IHtcbiAgICBhbm5lblZ1cmRlcmluZ0NvbmZpZyxcbiAgICB0eXBlIElBbm5lblZ1cmRlcmluZyxcbiAgICB0eXBlIElWaWxrw6VyUmVzdWx0YXQsXG4gICAgdmlsa8OlckNvbmZpZyxcbn0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvdmlsa8Olcic7XG5pbXBvcnQgeyBEYXRvZm9ybWF0LCBpc29TdHJpbmdUaWxGb3JtYXRlcnRTdHJpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9kYXRvJztcbmltcG9ydCB7IGVyUHJvZCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL21pbGrDuCc7XG5pbXBvcnQgeyBoZW50RnJvbnRlbmRGZWlsbWVsZGluZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL3Jlc3N1cnNVdGlscyc7XG5pbXBvcnQgeyB1c2VCZWhhbmRsaW5nQ29udGV4dCB9IGZyb20gJy4uLy4uL2NvbnRleHQvQmVoYW5kbGluZ0NvbnRleHQnO1xuaW1wb3J0IFNramVtYXN0ZWcgZnJvbSAnLi4vU2tqZW1hc3RlZyc7XG5pbXBvcnQgeyBNYW5nbGVuZGVTdmFsYmFyZG1lcmtpbmdWYXJzZWwgfSBmcm9tICcuL1ZhcnNlbC9NYW5nbGVuZGVTdmFsYmFyZG1lcmtpbmdWYXJzZWwnO1xuaW1wb3J0IHsgdXNlRmFnc2FrQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uL0ZhZ3Nha0NvbnRleHQnO1xuXG5leHBvcnQgZnVuY3Rpb24gVmlsa8OlcnN2dXJkZXJpbmcoKSB7XG4gICAgY29uc3QgdG9nZ2xlcyA9IHVzZUZlYXR1cmVUb2dnbGVzKCk7XG5cbiAgICBjb25zdCB7IGZhZ3NhayB9ID0gdXNlRmFnc2FrQ29udGV4dCgpO1xuICAgIGNvbnN0IHsgYmVoYW5kbGluZywgdnVyZGVyRXJMZXNldmlzbmluZywgdmlsa8OlcnN2dXJkZXJpbmdOZXN0ZU9uQ2xpY2ssIGJlaGFuZGxpbmdzc3RlZ1N1Ym1pdHJlc3N1cnMgfSA9XG4gICAgICAgIHVzZUJlaGFuZGxpbmdDb250ZXh0KCk7XG5cbiAgICBjb25zdCB7IGVyVmlsa8OlcnN2dXJkZXJpbmdlbkd5bGRpZywgaGVudFZpbGvDpXJNZWRGZWlsLCBoZW50QW5kcmVWdXJkZXJpbmdlck1lZEZlaWwsIHZpbGvDpXJzdnVyZGVyaW5nIH0gPVxuICAgICAgICB1c2VWaWxrw6Vyc3Z1cmRlcmluZ0NvbnRleHQoKTtcblxuICAgIGNvbnN0IGVyTGVzZXZpc25pbmcgPSB2dXJkZXJFckxlc2V2aXNuaW5nKCk7XG5cbiAgICBjb25zdCBbdmlzRmVpbG1lbGRpbmdlciwgc2V0dFZpc0ZlaWxtZWxkaW5nZXJdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuXG4gICAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuXG4gICAgY29uc3QgdXJlZ2lzdHJlcnRlQmFybiA9XG4gICAgICAgIGJlaGFuZGxpbmcuc8O4a25hZHNncnVubmxhZz8uYmFybmFNZWRPcHBseXNuaW5nZXIuZmlsdGVyKGJhcm4gPT4gIWJhcm4uZXJGb2xrZXJlZ2lzdHJlcnQpID8/IFtdO1xuXG4gICAgaWYgKHZpbGvDpXJzdnVyZGVyaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gPGRpdj5GaW5uZXIgaW5nZW4gdmlsa8OlciBww6UgYmVoYW5kbGluZ2VuLjwvZGl2PjtcbiAgICB9XG5cbiAgICBjb25zdCBza2plbWFGZWlsbWVsZGluZyA9IGhlbnRGcm9udGVuZEZlaWxtZWxkaW5nKGJlaGFuZGxpbmdzc3RlZ1N1Ym1pdHJlc3N1cnMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPFNramVtYXN0ZWdcbiAgICAgICAgICAgIHNrYWxWaXNlRm9ycmlnZUtuYXBwPXtcbiAgICAgICAgICAgICAgICBiZWhhbmRsaW5nLsOlcnNhayA9PT0gQmVoYW5kbGluZ8OFcnNhay5Tw5hLTkFEIHx8IGJlaGFuZGxpbmcuw6Vyc2FrID09PSBCZWhhbmRsaW5nw4Vyc2FrLkbDmERTRUxTSEVOREVMU0VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpdHRlbD17J1ZpbGvDpXJzdnVyZGVyaW5nJ31cbiAgICAgICAgICAgIGZvcnJpZ2VPbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGJlaGFuZGxpbmcuw6Vyc2FrID09PSBCZWhhbmRsaW5nw4Vyc2FrLlPDmEtOQUQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGUoYC9mYWdzYWsvJHtmYWdzYWsuaWR9LyR7YmVoYW5kbGluZy5iZWhhbmRsaW5nSWR9L3JlZ2lzdHJlci1zb2tuYWRgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZShgL2ZhZ3Nhay8ke2ZhZ3Nhay5pZH0vJHtiZWhhbmRsaW5nLmJlaGFuZGxpbmdJZH0vZmlsdHJlcmluZ3NyZWdsZXJgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgbmVzdGVPbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVyTGVzZXZpc25pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGUoYC9mYWdzYWsvJHtmYWdzYWsuaWR9LyR7YmVoYW5kbGluZy5iZWhhbmRsaW5nSWR9L3RpbGtqZW50LXl0ZWxzZWApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJWaWxrw6Vyc3Z1cmRlcmluZ2VuR3lsZGlnKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmlsa8OlcnN2dXJkZXJpbmdOZXN0ZU9uQ2xpY2soKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXR0VmlzRmVpbG1lbGRpbmdlcih0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgbWF4V2lkdGhTdHlsZT17JzgwcmVtJ31cbiAgICAgICAgICAgIHNlbmRlcklubj17YmVoYW5kbGluZ3NzdGVnU3VibWl0cmVzc3Vycy5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuSEVOVEVSfVxuICAgICAgICAgICAgc3RlZz17QmVoYW5kbGluZ1N0ZWcuVklMS8OFUlNWVVJERVJJTkd9XG4gICAgICAgID5cbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAge2JlaGFuZGxpbmc/Lm1pZ3JlcmluZ3NkYXRvICE9PSBudWxsICYmIChcbiAgICAgICAgICAgICAgICAgICAgPERldGFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuaGVudGV0TGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbj17YFNha2VuIGJsZSBtaWdyZXJ0IGZyYSBJbmZvdHJ5Z2Q6ICR7aXNvU3RyaW5nVGlsRm9ybWF0ZXJ0U3RyaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc29TdHJpbmc6IGJlaGFuZGxpbmc/Lm1pZ3JlcmluZ3NkYXRvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbEZvcm1hdDogRGF0b2Zvcm1hdC5EQVRPLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9YH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDxPcHBkYXRlclJlZ2lzdGVyb3BwbHlzbmluZ2VyIC8+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgIHshZXJQcm9kKCkgJiYgIXRvZ2dsZXNbRmVhdHVyZVRvZ2dsZS5za2FsU2tqdWxlVGVzdG1pbGrDuGtuYXBwZXJdICYmIChcbiAgICAgICAgICAgICAgICA8SFN0YWNrIGdhcD1cInNwYWNlLTE2XCIgbWFyZ2luQmxvY2s9eydzcGFjZS0zMiBzcGFjZS0zMid9PlxuICAgICAgICAgICAgICAgICAgICA8RnlsbFV0Vmlsa8OlcnN2dXJkZXJpbmdJVGVzdG1pbGrDuEtuYXBwIGJlaGFuZGxpbmdJZD17YmVoYW5kbGluZy5iZWhhbmRsaW5nSWR9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxUw7htUGVyc29ub3BwbHlzbmluZ2VyQ2FjaGVJVGVzdG1pbGrDuEtuYXBwIC8+XG4gICAgICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPFZTdGFjayBnYXA9XCJzcGFjZS0zMlwiPlxuICAgICAgICAgICAgICAgIDxWaWxrw6Vyc3Z1cmRlcmluZ1NramVtYSB2aXNGZWlsbWVsZGluZ2VyPXt2aXNGZWlsbWVsZGluZ2VyfSAvPlxuICAgICAgICAgICAgICAgIHt1cmVnaXN0cmVydGVCYXJuLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8QWxlcnQgdmFyaWFudD1cImluZm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQ+RHUgaGFyIHJlZ2lzdHJlcnQgZsO4bGdlbmRlIGJhcm4gc29tIGlra2UgZXIgcmVnaXN0cmVydCBpIEZvbGtlcmVnaXN0ZXJldDo8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0IGFzPXsnb2wnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dXJlZ2lzdHJlcnRlQmFybi5tYXAodXJlZ2lzdHJlcnRCYXJuID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBrZXk9e2Ake3VyZWdpc3RyZXJ0QmFybi5uYXZufV8ke3VyZWdpc3RyZXJ0QmFybi5mw7hkc2Vsc2RhdG99YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtgJHt1cmVnaXN0cmVydEJhcm4ubmF2bn0gLSAke2lzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzb1N0cmluZzogdXJlZ2lzdHJlcnRCYXJuLmbDuGRzZWxzZGF0byxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsRm9ybWF0OiBEYXRvZm9ybWF0LkRBVE8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlzdD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQ+RGV0dGUgdmlsIGbDuHJlIHRpbCBhdnNsYWcgZm9yIGJhcm5hIGkgbGlzdGVuLjwvQm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICA8L0FsZXJ0PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgeyhoZW50Vmlsa8Olck1lZEZlaWwoKS5sZW5ndGggPiAwIHx8IGhlbnRBbmRyZVZ1cmRlcmluZ2VyTWVkRmVpbCgpLmxlbmd0aCA+IDApICYmIHZpc0ZlaWxtZWxkaW5nZXIgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8RXJyb3JTdW1tYXJ5IGhlYWRpbmc9eydGb3Igw6UgZ8OlIHZpZGVyZSBtw6UgZHUgcmV0dGUgb3BwIGbDuGxnZW5kZTonfSBzaXplPVwic21hbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uaGVudFZpbGvDpXJNZWRGZWlsKCkubWFwKCh2aWxrw6VyUmVzdWx0YXQ6IElWaWxrw6VyUmVzdWx0YXQpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlaWxtZWxkaW5nOiBgRXQgdmlsa8OlciBhdiB0eXBlbiAnJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpbGvDpXJDb25maWdbdmlsa8OlclJlc3VsdGF0LnZpbGvDpXJUeXBlXS50aXR0ZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfScgZXIgaWtrZSBmdWxsc3RlbmRpZ2AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNramVtYWVsZW1lbnRJZDogdmlsa8OlckZlaWxtZWxkaW5nSWQodmlsa8OlclJlc3VsdGF0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uaGVudEFuZHJlVnVyZGVyaW5nZXJNZWRGZWlsKCkubWFwKChhbm5lblZ1cmRlcmluZzogSUFubmVuVnVyZGVyaW5nKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWlsbWVsZGluZzogYEV0IHZpbGvDpXIgYXYgdHlwZW4gJyR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbm5lblZ1cmRlcmluZ0NvbmZpZ1thbm5lblZ1cmRlcmluZy50eXBlXS50aXR0ZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfScgZXIgaWtrZSBmdWxsc3RlbmRpZ2AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNramVtYWVsZW1lbnRJZDogYW5uZW5WdXJkZXJpbmdGZWlsbWVsZGluZ0lkKGFubmVuVnVyZGVyaW5nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICBdLm1hcChpdGVtID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXJyb3JTdW1tYXJ5Lkl0ZW0gaHJlZj17YCMke2l0ZW0uc2tqZW1hZWxlbWVudElkfWB9PntpdGVtLmZlaWxtZWxkaW5nfTwvRXJyb3JTdW1tYXJ5Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9FcnJvclN1bW1hcnk+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7c2tqZW1hRmVpbG1lbGRpbmcgIT09ICcnICYmIHNramVtYUZlaWxtZWxkaW5nICE9PSB1bmRlZmluZWQgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8RXJyb3JNZXNzYWdlPntza2plbWFGZWlsbWVsZGluZ308L0Vycm9yTWVzc2FnZT5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDxNYW5nbGVuZGVTdmFsYmFyZG1lcmtpbmdWYXJzZWwgLz5cbiAgICAgICAgICAgICAgICA8TWFuZ2xlbmRlRmlubm1hcmttZXJraW5nVmFyc2VsIC8+XG4gICAgICAgICAgICA8L1ZTdGFjaz5cbiAgICAgICAgPC9Ta2plbWFzdGVnPlxuICAgICk7XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI2ZmI5NGE2YzZhODMxODQzZTZmOFwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsIkFjdGl2aXR5IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJDaGV2cm9uRG93bkljb24iLCJDaGV2cm9uVXBJY29uIiwiUGx1c0NpcmNsZUljb24iLCJBbGVydCIsIkJvZHlTaG9ydCIsIkJveCIsIkJ1dHRvbiIsIkhTdGFjayIsIkxpc3QiLCJSZXNzdXJzU3RhdHVzIiwidXNlRmVhdHVyZVRvZ2dsZXMiLCJQZXJzb25JbmZvcm1hc2pvbiIsIkJlaGFuZGxpbmdTdGVnIiwiQmVoYW5kbGluZ8OFcnNhayIsIkZlYXR1cmVUb2dnbGUiLCJQZXJzb25UeXBlIiwiYW5uZW5WdXJkZXJpbmdDb25maWciLCJSZXN1bHRhdCIsInZpbGvDpXJDb25maWciLCJWaWxrw6VyVHlwZSIsInVzZUJlaGFuZGxpbmdDb250ZXh0IiwiR2VuZXJpc2tBbm5lblZ1cmRlcmluZyIsIkdlbmVyaXNrVmlsa8OlciIsIlJlZ2lzdGVyb3BwbHlzbmluZ2VyIiwidXRsZWRWaWxrw6VyU29tTcOlS29udHJvbGxlcmVzUGVyUGVyc29uIiwidXNlVmlsa8OlcnN2dXJkZXJpbmdDb250ZXh0IiwiVmlsa8OlclN1Ym1pdCIsInN0eWxlcyIsIlZpbGvDpXJzdnVyZGVyaW5nU2tqZW1hTm9ybWFsIiwiX3JlZiIsIl9zIiwidmlzRmVpbG1lbGRpbmdlciIsInRvZ2dsZXMiLCJfdXNlVmlsa8OlcnN2dXJkZXJpbmdDIiwidmlsa8OlcnN2dXJkZXJpbmciLCJzZXR0Vmlsa8OlclN1Ym1pdCIsInBvc3RWaWxrw6VyIiwiX3VzZUJlaGFuZGxpbmdDb250ZXh0IiwidnVyZGVyRXJMZXNldmlzbmluZyIsImVyTWlncmVyaW5nc2JlaGFuZGxpbmciLCJzZXR0w4VwZW5CZWhhbmRsaW5nIiwiYWt0aXZTZXR0UMOlVmVudCIsImJlaGFuZGxpbmciLCJlckxlc2V2aXNuaW5nIiwia2FuTGVnZ2VUaWxVdHZpZGV0Vmlsa8OlciIsIsOlcnNhayIsIktPUlJFS1NKT05fVkVEVEFLU0JSRVYiLCJURUtOSVNLX0VORFJJTkciLCJLTEFHRSIsIkVORFJFX01JR1JFUklOR1NEQVRPIiwiSVZFUktTRVRURV9LQV9WRURUQUsiLCJwZXJzb25IYXJJa2tldnVyZGVydFZpbGvDpXIiLCJwZXJzb25SZXN1bHRhdCIsInZpbGvDpXJSZXN1bHRhdGVyIiwic29tZSIsInZpbGvDpXJSZXN1bHRhdEZlbHQiLCJ2ZXJkaSIsInJlc3VsdGF0IiwiSUtLRV9WVVJERVJUIiwiaGVudEVrc3BhbnRkZXJ0ZVBlcnNvbmVyIiwicmVkdWNlIiwicGVyc29uTWFwRWtzcGFuZGVydCIsIl9vYmplY3RTcHJlYWQiLCJfZGVmaW5lUHJvcGVydHkiLCJwZXJzb25JZGVudCIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInBlcnNvbkVyRWtzcGFuZGVydCIsInNldHRQZXJzb25FckVrc3BhbmRlcnQiLCJsZWdnVGlsVmlsa8OlclV0dmlkZXQiLCJwcm9taXNlIiwiVVRWSURFVF9CQVJORVRSWUdEIiwidGhlbiIsIm9wcGRhdGVydEJlaGFuZGxpbmciLCJOT05FIiwic3RhdHVzIiwiU1VLU0VTUyIsInZpbGvDpXJTb21Nw6VLb250cm9sbGVyZXNQZXJQZXJzb24iLCJPYmplY3QiLCJlbnRyaWVzIiwic2thbFZpc2VWYXJzZWxib2tzRm9yVmlsa8OlclNvbU3DpUtvbnRyb2xsZXJlcyIsInNrYWxWaXNlVmFyc2VsbGFtcGVGb3JNYW51ZWx0TGFndFRpbEJhcm4iLCJsZW5ndGgiLCJzdGVnIiwiVklMS8OFUlNWVVJERVJJTkciLCJCRVNMVVRURV9WRURUQUsiLCJjcmVhdGVFbGVtZW50IiwiRnJhZ21lbnQiLCJ2YXJpYW50IiwiY29udGVudE1heFdpZHRoIiwic3R5bGUiLCJ3aWR0aCIsImFzIiwibWFwIiwiX3JlZjIiLCJfcmVmMyIsIm5hdm4iLCJhdnZpayIsIkl0ZW0iLCJrZXkiLCJzaXplIiwiaW5kZXgiLCJhbmRyZVZ1cmRlcmluZ2VyIiwiaGFyVXR2aWRldCIsImZpbmQiLCJ2aWxrw6VyUmVzdWx0YXQiLCJ2aWxrw6VyVHlwZSIsImNvbmNhdCIsInBlcnNvbiIsImbDuGRzZWxzZGF0byIsImlkIiwid3JhcCIsImp1c3RpZnkiLCJjbGFzc05hbWUiLCJwZXJzb25MaW5qZSIsInNvbU92ZXJza3JpZnQiLCJ0eXBlIiwiU8OYS0VSIiwib25DbGljayIsImljb24iLCJ0aXRsZSIsImljb25Qb3NpdGlvbiIsIm1vZGUiLCJwYWRkaW5nSW5saW5lIiwicmVnaXN0ZXJoaXN0b3Jpa2siLCJyZWdpc3Rlckhpc3RvcmlrayIsImNoaWxkcmVuIiwidmFsdWVzIiwiZmlsdGVyIiwidmMiLCJwYXJ0ZXJEZXR0ZUdqZWxkZXJGb3IiLCJpbmNsdWRlcyIsInVuZGVmaW5lZCIsImdlbmVyaXNrVmlsa8OlcktleSIsInZpbGvDpXJGcmFDb25maWciLCJfYyIsIiRSZWZyZXNoUmVnJCIsInVzZU5hdmlnYXRlIiwiRGV0YWlsIiwiRXJyb3JNZXNzYWdlIiwiRXJyb3JTdW1tYXJ5IiwiVlN0YWNrIiwiRnlsbFV0Vmlsa8OlcnN2dXJkZXJpbmdJVGVzdG1pbGrDuEtuYXBwIiwiYW5uZW5WdXJkZXJpbmdGZWlsbWVsZGluZ0lkIiwidmlsa8OlckZlaWxtZWxkaW5nSWQiLCJPcHBkYXRlclJlZ2lzdGVyb3BwbHlzbmluZ2VyIiwiVmlsa8OlcnN2dXJkZXJpbmdTa2plbWEiLCJUw7htUGVyc29ub3BwbHlzbmluZ2VyQ2FjaGVJVGVzdG1pbGrDuEtuYXBwIiwiTWFuZ2xlbmRlRmlubm1hcmttZXJraW5nVmFyc2VsIiwiRGF0b2Zvcm1hdCIsImlzb1N0cmluZ1RpbEZvcm1hdGVydFN0cmluZyIsImVyUHJvZCIsImhlbnRGcm9udGVuZEZlaWxtZWxkaW5nIiwiU2tqZW1hc3RlZyIsIk1hbmdsZW5kZVN2YWxiYXJkbWVya2luZ1ZhcnNlbCIsInVzZUZhZ3Nha0NvbnRleHQiLCJWaWxrw6Vyc3Z1cmRlcmluZyIsIl9iZWhhbmRsaW5nJHPDuGtuYWRzZ3IiLCJfYmVoYW5kbGluZyRzw7hrbmFkc2dyMiIsIl91c2VGYWdzYWtDb250ZXh0IiwiZmFnc2FrIiwidmlsa8OlcnN2dXJkZXJpbmdOZXN0ZU9uQ2xpY2siLCJiZWhhbmRsaW5nc3N0ZWdTdWJtaXRyZXNzdXJzIiwiZXJWaWxrw6Vyc3Z1cmRlcmluZ2VuR3lsZGlnIiwiaGVudFZpbGvDpXJNZWRGZWlsIiwiaGVudEFuZHJlVnVyZGVyaW5nZXJNZWRGZWlsIiwiX1JlYWN0JHVzZVN0YXRlIiwiX1JlYWN0JHVzZVN0YXRlMiIsInNldHRWaXNGZWlsbWVsZGluZ2VyIiwibmF2aWdhdGUiLCJ1cmVnaXN0cmVydGVCYXJuIiwic8O4a25hZHNncnVubmxhZyIsImJhcm5hTWVkT3BwbHlzbmluZ2VyIiwiYmFybiIsImVyRm9sa2VyZWdpc3RyZXJ0Iiwic2tqZW1hRmVpbG1lbGRpbmciLCJza2FsVmlzZUZvcnJpZ2VLbmFwcCIsIlPDmEtOQUQiLCJGw5hEU0VMU0hFTkRFTFNFIiwidGl0dGVsIiwiZm9ycmlnZU9uQ2xpY2siLCJiZWhhbmRsaW5nSWQiLCJuZXN0ZU9uQ2xpY2siLCJtYXhXaWR0aFN0eWxlIiwic2VuZGVySW5uIiwiSEVOVEVSIiwibWlncmVyaW5nc2RhdG8iLCJoZW50ZXRMYWJlbCIsImlzb1N0cmluZyIsInRpbEZvcm1hdCIsIkRBVE8iLCJza2FsU2tqdWxlVGVzdG1pbGrDuGtuYXBwZXIiLCJnYXAiLCJtYXJnaW5CbG9jayIsInVyZWdpc3RyZXJ0QmFybiIsImhlYWRpbmciLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJmZWlsbWVsZGluZyIsInNramVtYWVsZW1lbnRJZCIsImFubmVuVnVyZGVyaW5nIiwiaXRlbSIsImhyZWYiXSwic291cmNlUm9vdCI6IiJ9