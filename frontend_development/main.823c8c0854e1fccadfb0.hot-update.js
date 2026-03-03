"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

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
  _templateObject2,
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
var UtførKnapp = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Button)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    margin-top: var(--ax-space-20);\n"])));
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
  }), "test", skalViseLeggTilKnapp() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Box, {
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
  }, "Legg til periode")), "test", skalViseFjernUtvidetBarnetrygdKnapp() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_FjernUtvidetBarnetrygdVilk_r__WEBPACK_IMPORTED_MODULE_6__["default"], {
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

/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("455a821dae2714a1b25f")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b0ZBQTBCO0FBQUE7QUFBQXFHLEdBQUEsR0FWL0U1RixjQUFnQztBQStIdEMsaUVBQWVBLGNBQWMsRUFBQztBQUFBLElBQUFILEVBQUEsRUFBQStGLEdBQUE7QUFBQUMsc0NBQUEsQ0FBQWhHLEVBQUE7QUFBQWdHLHNDQUFBLENBQUFELEdBQUEsdUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ3pLOUIsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9GYWdzYWsvQmVoYW5kbGluZy9TaWRlci9WaWxrw6Vyc3Z1cmRlcmluZy9HZW5lcmlza1ZpbGvDpXIvR2VuZXJpc2tWaWxrw6VyLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgTGlnaHRCdWxiRmlsbEljb24sIFBsdXNDaXJjbGVJY29uIH0gZnJvbSAnQG5hdmlrdC9ha3NlbC1pY29ucyc7XG5pbXBvcnQgeyBCdXR0b24sIEZpZWxkc2V0LCBIZWFkaW5nLCBIU3RhY2sgfSBmcm9tICdAbmF2aWt0L2RzLXJlYWN0JztcbmltcG9ydCB0eXBlIHsgRmVsdFN0YXRlIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXNramVtYSc7XG5pbXBvcnQgdHlwZSB7IFJlc3N1cnMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuaW1wb3J0IHsgUmVzc3Vyc1N0YXR1cyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5cbmltcG9ydCBGamVyblV0dmlkZXRCYXJuZXRyeWdkVmlsa8OlciBmcm9tICcuL0ZqZXJuVXR2aWRldEJhcm5ldHJ5Z2RWaWxrw6VyJztcbmltcG9ydCBWaWxrw6VyVGFiZWxsIGZyb20gJy4vVmlsa8OlclRhYmVsbCc7XG5pbXBvcnQgeyB1c2VGZWF0dXJlVG9nZ2xlcyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL2hvb2tzL3VzZUZlYXR1cmVUb2dnbGVzJztcbmltcG9ydCB7IEJlaGFuZGxpbmdTdGVnLCB0eXBlIElCZWhhbmRsaW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvYmVoYW5kbGluZyc7XG5pbXBvcnQgeyBGZWF0dXJlVG9nZ2xlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvZmVhdHVyZVRvZ2dsZXMnO1xuaW1wb3J0IHR5cGUgeyBJR3J1bm5sYWdQZXJzb24gfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi90eXBlci9wZXJzb24nO1xuaW1wb3J0IHsgUGVyc29uVHlwZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3R5cGVyL3BlcnNvbic7XG5pbXBvcnQgdHlwZSB7IElWaWxrw6VyQ29uZmlnLCBJVmlsa8OlclJlc3VsdGF0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvdmlsa8Olcic7XG5pbXBvcnQgeyBSZXN1bHRhdCwgVmlsa8OlclR5cGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi90eXBlci92aWxrw6VyJztcbmltcG9ydCB7IHVzZUJlaGFuZGxpbmdDb250ZXh0IH0gZnJvbSAnLi4vLi4vLi4vY29udGV4dC9CZWhhbmRsaW5nQ29udGV4dCc7XG5pbXBvcnQgeyB1c2VWaWxrw6Vyc3Z1cmRlcmluZ0NvbnRleHQsIFZpbGvDpXJTdWJtaXQgfSBmcm9tICcuLi9WaWxrw6Vyc3Z1cmRlcmluZ0NvbnRleHQnO1xuXG5pbnRlcmZhY2UgSVByb3BzIHtcbiAgICBwZXJzb246IElHcnVubmxhZ1BlcnNvbjtcbiAgICB2aWxrw6VyUmVzdWx0YXRlcjogRmVsdFN0YXRlPElWaWxrw6VyUmVzdWx0YXQ+W107XG4gICAgdmlsa8OlckZyYUNvbmZpZzogSVZpbGvDpXJDb25maWc7XG4gICAgdmlzRmVpbG1lbGRpbmdlcjogYm9vbGVhbjtcbiAgICBnZW5lcmlza1ZpbGvDpXJLZXk6IHN0cmluZztcbn1cblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgICBtYXJnaW4tdG9wOiB2YXIoLS1heC1zcGFjZS02NCk7XG5cbiAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1heC1zcGFjZS0yMCk7XG4gICAgfVxuYDtcblxuY29uc3QgVXRmw7hyS25hcHAgPSBzdHlsZWQoQnV0dG9uKWBcbiAgICBtYXJnaW4tdG9wOiB2YXIoLS1heC1zcGFjZS0yMCk7XG5gO1xuXG5jb25zdCBHZW5lcmlza1ZpbGvDpXI6IFJlYWN0LkZDPElQcm9wcz4gPSAoe1xuICAgIHBlcnNvbixcbiAgICB2aWxrw6VyRnJhQ29uZmlnLFxuICAgIHZpbGvDpXJSZXN1bHRhdGVyLFxuICAgIHZpc0ZlaWxtZWxkaW5nZXIsXG4gICAgZ2VuZXJpc2tWaWxrw6VyS2V5LFxufSkgPT4ge1xuICAgIGNvbnN0IHRvZ2dsZXMgPSB1c2VGZWF0dXJlVG9nZ2xlcygpO1xuICAgIGNvbnN0IHsgYmVoYW5kbGluZywgdnVyZGVyRXJMZXNldmlzbmluZywgc2V0dMOFcGVuQmVoYW5kbGluZywgZXJNaWdyZXJpbmdzYmVoYW5kbGluZyB9ID0gdXNlQmVoYW5kbGluZ0NvbnRleHQoKTtcbiAgICBjb25zdCBlckxlc2V2aXNuaW5nID0gdnVyZGVyRXJMZXNldmlzbmluZygpO1xuICAgIGNvbnN0IHsgc2V0dFZpbGvDpXJTdWJtaXQsIHBvc3RWaWxrw6VyLCB2aWxrw6VyU3VibWl0IH0gPSB1c2VWaWxrw6Vyc3Z1cmRlcmluZ0NvbnRleHQoKTtcblxuICAgIGNvbnN0IFt2aXNGZWlsbWVsZGluZ2VyRm9yVmlsa8Olciwgc2V0dFZpc0ZlaWxtZWxkaW5nZXJGb3JWaWxrw6VyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbZmVpbG1lbGRpbmcsIHNldHRGZWlsbWVsZGluZ10gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgICBjb25zdCBsZWdnVGlsUGVyaW9kZUtuYXBwSWQgPSBnZW5lcmlza1ZpbGvDpXJLZXkgKyAnX19sZWdnX3RpbF9wZXJpb2RlJztcblxuICAgIGNvbnN0IHNldHRGb2t1c1DDpUxlZ2dUaWxQZXJpb2RlS25hcHAgPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxlZ2dUaWxQZXJpb2RlS25hcHBJZCk/LmZvY3VzKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGjDpW5kdGVyTnlQZXJpb2RlVmlsa8OlcnN2dXJkZXJpbmcgPSAocHJvbWlzZTogUHJvbWlzZTxSZXNzdXJzPElCZWhhbmRsaW5nPj4pID0+IHtcbiAgICAgICAgcHJvbWlzZVxuICAgICAgICAgICAgLnRoZW4oKG9wcGRhdGVydEJlaGFuZGxpbmc6IFJlc3N1cnM8SUJlaGFuZGxpbmc+KSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0dFZpc0ZlaWxtZWxkaW5nZXJGb3JWaWxrw6VyKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzZXR0Vmlsa8OlclN1Ym1pdChWaWxrw6VyU3VibWl0Lk5PTkUpO1xuICAgICAgICAgICAgICAgIHNldHRGZWlsbWVsZGluZygnJyk7XG4gICAgICAgICAgICAgICAgaWYgKG9wcGRhdGVydEJlaGFuZGxpbmcuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLlNVS1NFU1MpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dMOFcGVuQmVoYW5kbGluZyhvcHBkYXRlcnRCZWhhbmRsaW5nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICBvcHBkYXRlcnRCZWhhbmRsaW5nLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5GRUlMRVQgfHxcbiAgICAgICAgICAgICAgICAgICAgb3BwZGF0ZXJ0QmVoYW5kbGluZy5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuRlVOS1NKT05FTExfRkVJTCB8fFxuICAgICAgICAgICAgICAgICAgICBvcHBkYXRlcnRCZWhhbmRsaW5nLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5JS0tFX1RJTEdBTkdcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dEZlaWxtZWxkaW5nKG9wcGRhdGVydEJlaGFuZGxpbmcuZnJvbnRlbmRGZWlsbWVsZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIHNldHRWaXNGZWlsbWVsZGluZ2VyRm9yVmlsa8Olcih0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXR0RmVpbG1lbGRpbmcoJ0VuIHVramVudCBmZWlsIGhhciBvcHBzdMOldHQsIHZpIGhhciBpa2tlIGtsYXJ0IMOlIGxlZ2dlIHRpbCBwZXJpb2RlLicpO1xuICAgICAgICAgICAgICAgICAgICBzZXR0VmlzRmVpbG1lbGRpbmdlckZvclZpbGvDpXIodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0dFZpbGvDpXJTdWJtaXQoVmlsa8OlclN1Ym1pdC5OT05FKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBza2FsVmlzZUxlZ2dUaWxLbmFwcCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGVyTGVzZXZpc25pbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1dnVyZGVydFBlcmlvZGVQw6VWaWxrw6VyID0gdmlsa8OlclJlc3VsdGF0ZXIuZmluZChcbiAgICAgICAgICAgIHZpbGvDpXIgPT4gdmlsa8Olci52ZXJkaS5yZXN1bHRhdC52ZXJkaSA9PT0gUmVzdWx0YXQuSUtLRV9WVVJERVJUXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB1dnVyZGVydFBlcmlvZGVQw6VWaWxrw6VyID09PSB1bmRlZmluZWQ7XG4gICAgfTtcblxuICAgIGNvbnN0IHNrYWxWaXNlRmplcm5VdHZpZGV0QmFybmV0cnlnZEtuYXBwID0gKCkgPT4ge1xuICAgICAgICBpZiAoZXJMZXNldmlzbmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHV0dmlkZXRWaWxrw6VyID0gdmlsa8OlclJlc3VsdGF0ZXIuZmlsdGVyKFxuICAgICAgICAgICAgdmlsa8OlclJlc3VsdGF0ID0+IHZpbGvDpXJSZXN1bHRhdC52ZXJkaS52aWxrw6VyVHlwZSA9PT0gVmlsa8OlclR5cGUuVVRWSURFVF9CQVJORVRSWUdEXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBlck1pZ3JlcmluZ3NiZWhhbmRsaW5nICYmXG4gICAgICAgICAgICBwZXJzb24udHlwZSA9PT0gUGVyc29uVHlwZS5Tw5hLRVIgJiZcbiAgICAgICAgICAgIHZpbGvDpXJGcmFDb25maWcua2V5ID09PSBWaWxrw6VyVHlwZS5VVFZJREVUX0JBUk5FVFJZR0QgJiZcbiAgICAgICAgICAgIHV0dmlkZXRWaWxrw6VyLmxlbmd0aCAhPT0gMFxuICAgICAgICApO1xuICAgIH07XG5cbiAgICBjb25zdCBza2FsVmlzZUx5c3DDpnJlID1cbiAgICAgICAgdG9nZ2xlc1tGZWF0dXJlVG9nZ2xlLnNrYWxWaXNlVmFyc2VsbGFtcGVGb3JNYW51ZWx0TGFndFRpbEJhcm5dICYmXG4gICAgICAgIGJlaGFuZGxpbmcuc3RlZyA9PSBCZWhhbmRsaW5nU3RlZy5WSUxLw4VSU1ZVUkRFUklORyAmJlxuICAgICAgICB2aWxrw6VyUmVzdWx0YXRlci5zb21lKHZpbGvDpXIgPT4gISF2aWxrw6VyLnZlcmRpLmJlZ3J1bm5lbHNlRm9yTWFudWVsbEtvbnRyb2xsKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxDb250YWluZXI+XG4gICAgICAgICAgICA8RmllbGRzZXRcbiAgICAgICAgICAgICAgICBlcnJvcj17dmlzRmVpbG1lbGRpbmdlckZvclZpbGvDpXIgPyBmZWlsbWVsZGluZyA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICBsZWdlbmQ9e3ZpbGvDpXJGcmFDb25maWcudGl0dGVsfVxuICAgICAgICAgICAgICAgIGhpZGVMZWdlbmRcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8SFN0YWNrIGdhcD1cInNwYWNlLTE2XCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAge3NrYWxWaXNlTHlzcMOmcmUgJiYgPExpZ2h0QnVsYkZpbGxJY29uIGZvbnRTaXplPVwiMS41cmVtXCIgY29sb3I9XCJ2YXIoLS1heC13YXJuaW5nLTUwMClcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT1cIm1lZGl1bVwiIGxldmVsPVwiM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3ZpbGvDpXJGcmFDb25maWcudGl0dGVsfVxuICAgICAgICAgICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICAgICAgPFZpbGvDpXJUYWJlbGxcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uPXtwZXJzb259XG4gICAgICAgICAgICAgICAgICAgIHZpbGvDpXJGcmFDb25maWc9e3ZpbGvDpXJGcmFDb25maWd9XG4gICAgICAgICAgICAgICAgICAgIHZpbGvDpXJSZXN1bHRhdGVyPXt2aWxrw6VyUmVzdWx0YXRlcn1cbiAgICAgICAgICAgICAgICAgICAgdmlzRmVpbG1lbGRpbmdlcj17dmlzRmVpbG1lbGRpbmdlcn1cbiAgICAgICAgICAgICAgICAgICAgc2V0dEZva3VzUMOlS25hcHA9e3NldHRGb2t1c1DDpUxlZ2dUaWxQZXJpb2RlS25hcHB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICB0ZXN0XG4gICAgICAgICAgICAgICAge3NrYWxWaXNlTGVnZ1RpbEtuYXBwKCkgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8Qm94IG1hcmdpbkJsb2NrPXsnc3BhY2UtMjAgc3BhY2UtMCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvbWlzZSA9IHBvc3RWaWxrw6VyKHBlcnNvbi5wZXJzb25JZGVudCwgdmlsa8OlckZyYUNvbmZpZy5rZXkgYXMgVmlsa8OlclR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBow6VuZHRlck55UGVyaW9kZVZpbGvDpXJzdnVyZGVyaW5nKHByb21pc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e2xlZ2dUaWxQZXJpb2RlS25hcHBJZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nPXt2aWxrw6VyU3VibWl0ID09PSBWaWxrw6VyU3VibWl0LlBPU1R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3ZpbGvDpXJTdWJtaXQgPT09IFZpbGvDpXJTdWJtaXQuUE9TVH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwidGVydGlhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCJtZWRpdW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb249ezxQbHVzQ2lyY2xlSWNvbiAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMZWdnIHRpbCBwZXJpb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB0ZXN0XG4gICAgICAgICAgICAgICAge3NrYWxWaXNlRmplcm5VdHZpZGV0QmFybmV0cnlnZEtuYXBwKCkgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8Rmplcm5VdHZpZGV0QmFybmV0cnlnZFZpbGvDpXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbklkZW50PXtwZXJzb24ucGVyc29uSWRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGV0dFZpbGvDpXJJZD17Z2VuZXJpc2tWaWxrw6VyS2V5ICsgJ19fc2xldHQtdmlsa8Olci11dHZpZGV0J31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9GaWVsZHNldD5cbiAgICAgICAgPC9Db250YWluZXI+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdlbmVyaXNrVmlsa8OlcjtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjQ1NWE4MjFkYWUyNzE0YTFiMjVmXCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJzdHlsZWQiLCJMaWdodEJ1bGJGaWxsSWNvbiIsIlBsdXNDaXJjbGVJY29uIiwiQnV0dG9uIiwiRmllbGRzZXQiLCJIZWFkaW5nIiwiSFN0YWNrIiwiUmVzc3Vyc1N0YXR1cyIsIkZqZXJuVXR2aWRldEJhcm5ldHJ5Z2RWaWxrw6VyIiwiVmlsa8OlclRhYmVsbCIsInVzZUZlYXR1cmVUb2dnbGVzIiwiQmVoYW5kbGluZ1N0ZWciLCJGZWF0dXJlVG9nZ2xlIiwiUGVyc29uVHlwZSIsIlJlc3VsdGF0IiwiVmlsa8OlclR5cGUiLCJ1c2VCZWhhbmRsaW5nQ29udGV4dCIsInVzZVZpbGvDpXJzdnVyZGVyaW5nQ29udGV4dCIsIlZpbGvDpXJTdWJtaXQiLCJDb250YWluZXIiLCJkaXYiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiX2MiLCJVdGbDuHJLbmFwcCIsIl90ZW1wbGF0ZU9iamVjdDIiLCJHZW5lcmlza1ZpbGvDpXIiLCJfcmVmIiwiX3MiLCJwZXJzb24iLCJ2aWxrw6VyRnJhQ29uZmlnIiwidmlsa8OlclJlc3VsdGF0ZXIiLCJ2aXNGZWlsbWVsZGluZ2VyIiwiZ2VuZXJpc2tWaWxrw6VyS2V5IiwidG9nZ2xlcyIsIl91c2VCZWhhbmRsaW5nQ29udGV4dCIsImJlaGFuZGxpbmciLCJ2dXJkZXJFckxlc2V2aXNuaW5nIiwic2V0dMOFcGVuQmVoYW5kbGluZyIsImVyTWlncmVyaW5nc2JlaGFuZGxpbmciLCJlckxlc2V2aXNuaW5nIiwiX3VzZVZpbGvDpXJzdnVyZGVyaW5nQyIsInNldHRWaWxrw6VyU3VibWl0IiwicG9zdFZpbGvDpXIiLCJ2aWxrw6VyU3VibWl0IiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5IiwidmlzRmVpbG1lbGRpbmdlckZvclZpbGvDpXIiLCJzZXR0VmlzRmVpbG1lbGRpbmdlckZvclZpbGvDpXIiLCJfdXNlU3RhdGUzIiwiX3VzZVN0YXRlNCIsImZlaWxtZWxkaW5nIiwic2V0dEZlaWxtZWxkaW5nIiwibGVnZ1RpbFBlcmlvZGVLbmFwcElkIiwic2V0dEZva3VzUMOlTGVnZ1RpbFBlcmlvZGVLbmFwcCIsIl9kb2N1bWVudCRnZXRFbGVtZW50QiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJmb2N1cyIsImjDpW5kdGVyTnlQZXJpb2RlVmlsa8OlcnN2dXJkZXJpbmciLCJwcm9taXNlIiwidGhlbiIsIm9wcGRhdGVydEJlaGFuZGxpbmciLCJOT05FIiwic3RhdHVzIiwiU1VLU0VTUyIsIkZFSUxFVCIsIkZVTktTSk9ORUxMX0ZFSUwiLCJJS0tFX1RJTEdBTkciLCJmcm9udGVuZEZlaWxtZWxkaW5nIiwic2thbFZpc2VMZWdnVGlsS25hcHAiLCJ1dnVyZGVydFBlcmlvZGVQw6VWaWxrw6VyIiwiZmluZCIsInZpbGvDpXIiLCJ2ZXJkaSIsInJlc3VsdGF0IiwiSUtLRV9WVVJERVJUIiwidW5kZWZpbmVkIiwic2thbFZpc2VGamVyblV0dmlkZXRCYXJuZXRyeWdkS25hcHAiLCJ1dHZpZGV0Vmlsa8OlciIsImZpbHRlciIsInZpbGvDpXJSZXN1bHRhdCIsInZpbGvDpXJUeXBlIiwiVVRWSURFVF9CQVJORVRSWUdEIiwidHlwZSIsIlPDmEtFUiIsImtleSIsImxlbmd0aCIsInNrYWxWaXNlTHlzcMOmcmUiLCJza2FsVmlzZVZhcnNlbGxhbXBlRm9yTWFudWVsdExhZ3RUaWxCYXJuIiwic3RlZyIsIlZJTEvDhVJTVlVSREVSSU5HIiwic29tZSIsImJlZ3J1bm5lbHNlRm9yTWFudWVsbEtvbnRyb2xsIiwiY3JlYXRlRWxlbWVudCIsImVycm9yIiwibGVnZW5kIiwidGl0dGVsIiwiaGlkZUxlZ2VuZCIsImdhcCIsImFsaWduIiwiZm9udFNpemUiLCJjb2xvciIsInNpemUiLCJsZXZlbCIsInNldHRGb2t1c1DDpUtuYXBwIiwiQm94IiwibWFyZ2luQmxvY2siLCJvbkNsaWNrIiwicGVyc29uSWRlbnQiLCJpZCIsImxvYWRpbmciLCJQT1NUIiwiZGlzYWJsZWQiLCJ2YXJpYW50IiwiaWNvbiIsInNsZXR0Vmlsa8OlcklkIiwiX2MyIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==