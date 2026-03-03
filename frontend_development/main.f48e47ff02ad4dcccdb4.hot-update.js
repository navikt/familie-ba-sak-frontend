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

/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ddf82f007e8b19b7dca0")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTdGLEVBQUE7QUFBQTZGLHNDQUFBLENBQUFELEdBQUEsdUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ25LOUIsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9GYWdzYWsvQmVoYW5kbGluZy9TaWRlci9WaWxrw6Vyc3Z1cmRlcmluZy9HZW5lcmlza1ZpbGvDpXIvR2VuZXJpc2tWaWxrw6VyLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgTGlnaHRCdWxiRmlsbEljb24sIFBsdXNDaXJjbGVJY29uIH0gZnJvbSAnQG5hdmlrdC9ha3NlbC1pY29ucyc7XG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgRmllbGRzZXQsIEhlYWRpbmcsIEhTdGFjayB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBGZWx0U3RhdGUgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtc2tqZW1hJztcbmltcG9ydCB0eXBlIHsgUmVzc3VycyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcblxuaW1wb3J0IEZqZXJuVXR2aWRldEJhcm5ldHJ5Z2RWaWxrw6VyIGZyb20gJy4vRmplcm5VdHZpZGV0QmFybmV0cnlnZFZpbGvDpXInO1xuaW1wb3J0IFZpbGvDpXJUYWJlbGwgZnJvbSAnLi9WaWxrw6VyVGFiZWxsJztcbmltcG9ydCB7IHVzZUZlYXR1cmVUb2dnbGVzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vaG9va3MvdXNlRmVhdHVyZVRvZ2dsZXMnO1xuaW1wb3J0IHsgQmVoYW5kbGluZ1N0ZWcsIHR5cGUgSUJlaGFuZGxpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi90eXBlci9iZWhhbmRsaW5nJztcbmltcG9ydCB7IEZlYXR1cmVUb2dnbGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi90eXBlci9mZWF0dXJlVG9nZ2xlcyc7XG5pbXBvcnQgdHlwZSB7IElHcnVubmxhZ1BlcnNvbiB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3R5cGVyL3BlcnNvbic7XG5pbXBvcnQgeyBQZXJzb25UeXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvcGVyc29uJztcbmltcG9ydCB0eXBlIHsgSVZpbGvDpXJDb25maWcsIElWaWxrw6VyUmVzdWx0YXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi90eXBlci92aWxrw6VyJztcbmltcG9ydCB7IFJlc3VsdGF0LCBWaWxrw6VyVHlwZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3R5cGVyL3ZpbGvDpXInO1xuaW1wb3J0IHsgdXNlQmVoYW5kbGluZ0NvbnRleHQgfSBmcm9tICcuLi8uLi8uLi9jb250ZXh0L0JlaGFuZGxpbmdDb250ZXh0JztcbmltcG9ydCB7IHVzZVZpbGvDpXJzdnVyZGVyaW5nQ29udGV4dCwgVmlsa8OlclN1Ym1pdCB9IGZyb20gJy4uL1ZpbGvDpXJzdnVyZGVyaW5nQ29udGV4dCc7XG5cbmludGVyZmFjZSBJUHJvcHMge1xuICAgIHBlcnNvbjogSUdydW5ubGFnUGVyc29uO1xuICAgIHZpbGvDpXJSZXN1bHRhdGVyOiBGZWx0U3RhdGU8SVZpbGvDpXJSZXN1bHRhdD5bXTtcbiAgICB2aWxrw6VyRnJhQ29uZmlnOiBJVmlsa8OlckNvbmZpZztcbiAgICB2aXNGZWlsbWVsZGluZ2VyOiBib29sZWFuO1xuICAgIGdlbmVyaXNrVmlsa8OlcktleTogc3RyaW5nO1xufVxuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICAgIG1hcmdpbi10b3A6IHZhcigtLWF4LXNwYWNlLTY0KTtcblxuICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IHZhcigtLWF4LXNwYWNlLTIwKTtcbiAgICB9XG5gO1xuXG5jb25zdCBHZW5lcmlza1ZpbGvDpXI6IFJlYWN0LkZDPElQcm9wcz4gPSAoe1xuICAgIHBlcnNvbixcbiAgICB2aWxrw6VyRnJhQ29uZmlnLFxuICAgIHZpbGvDpXJSZXN1bHRhdGVyLFxuICAgIHZpc0ZlaWxtZWxkaW5nZXIsXG4gICAgZ2VuZXJpc2tWaWxrw6VyS2V5LFxufSkgPT4ge1xuICAgIGNvbnN0IHRvZ2dsZXMgPSB1c2VGZWF0dXJlVG9nZ2xlcygpO1xuICAgIGNvbnN0IHsgYmVoYW5kbGluZywgdnVyZGVyRXJMZXNldmlzbmluZywgc2V0dMOFcGVuQmVoYW5kbGluZywgZXJNaWdyZXJpbmdzYmVoYW5kbGluZyB9ID0gdXNlQmVoYW5kbGluZ0NvbnRleHQoKTtcbiAgICBjb25zdCBlckxlc2V2aXNuaW5nID0gdnVyZGVyRXJMZXNldmlzbmluZygpO1xuICAgIGNvbnN0IHsgc2V0dFZpbGvDpXJTdWJtaXQsIHBvc3RWaWxrw6VyLCB2aWxrw6VyU3VibWl0IH0gPSB1c2VWaWxrw6Vyc3Z1cmRlcmluZ0NvbnRleHQoKTtcblxuICAgIGNvbnN0IFt2aXNGZWlsbWVsZGluZ2VyRm9yVmlsa8Olciwgc2V0dFZpc0ZlaWxtZWxkaW5nZXJGb3JWaWxrw6VyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbZmVpbG1lbGRpbmcsIHNldHRGZWlsbWVsZGluZ10gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgICBjb25zdCBsZWdnVGlsUGVyaW9kZUtuYXBwSWQgPSBnZW5lcmlza1ZpbGvDpXJLZXkgKyAnX19sZWdnX3RpbF9wZXJpb2RlJztcblxuICAgIGNvbnN0IHNldHRGb2t1c1DDpUxlZ2dUaWxQZXJpb2RlS25hcHAgPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxlZ2dUaWxQZXJpb2RlS25hcHBJZCk/LmZvY3VzKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGjDpW5kdGVyTnlQZXJpb2RlVmlsa8OlcnN2dXJkZXJpbmcgPSAocHJvbWlzZTogUHJvbWlzZTxSZXNzdXJzPElCZWhhbmRsaW5nPj4pID0+IHtcbiAgICAgICAgcHJvbWlzZVxuICAgICAgICAgICAgLnRoZW4oKG9wcGRhdGVydEJlaGFuZGxpbmc6IFJlc3N1cnM8SUJlaGFuZGxpbmc+KSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0dFZpc0ZlaWxtZWxkaW5nZXJGb3JWaWxrw6VyKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzZXR0Vmlsa8OlclN1Ym1pdChWaWxrw6VyU3VibWl0Lk5PTkUpO1xuICAgICAgICAgICAgICAgIHNldHRGZWlsbWVsZGluZygnJyk7XG4gICAgICAgICAgICAgICAgaWYgKG9wcGRhdGVydEJlaGFuZGxpbmcuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLlNVS1NFU1MpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dMOFcGVuQmVoYW5kbGluZyhvcHBkYXRlcnRCZWhhbmRsaW5nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICBvcHBkYXRlcnRCZWhhbmRsaW5nLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5GRUlMRVQgfHxcbiAgICAgICAgICAgICAgICAgICAgb3BwZGF0ZXJ0QmVoYW5kbGluZy5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuRlVOS1NKT05FTExfRkVJTCB8fFxuICAgICAgICAgICAgICAgICAgICBvcHBkYXRlcnRCZWhhbmRsaW5nLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5JS0tFX1RJTEdBTkdcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dEZlaWxtZWxkaW5nKG9wcGRhdGVydEJlaGFuZGxpbmcuZnJvbnRlbmRGZWlsbWVsZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIHNldHRWaXNGZWlsbWVsZGluZ2VyRm9yVmlsa8Olcih0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXR0RmVpbG1lbGRpbmcoJ0VuIHVramVudCBmZWlsIGhhciBvcHBzdMOldHQsIHZpIGhhciBpa2tlIGtsYXJ0IMOlIGxlZ2dlIHRpbCBwZXJpb2RlLicpO1xuICAgICAgICAgICAgICAgICAgICBzZXR0VmlzRmVpbG1lbGRpbmdlckZvclZpbGvDpXIodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0dFZpbGvDpXJTdWJtaXQoVmlsa8OlclN1Ym1pdC5OT05FKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBza2FsVmlzZUxlZ2dUaWxLbmFwcCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGVyTGVzZXZpc25pbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1dnVyZGVydFBlcmlvZGVQw6VWaWxrw6VyID0gdmlsa8OlclJlc3VsdGF0ZXIuZmluZChcbiAgICAgICAgICAgIHZpbGvDpXIgPT4gdmlsa8Olci52ZXJkaS5yZXN1bHRhdC52ZXJkaSA9PT0gUmVzdWx0YXQuSUtLRV9WVVJERVJUXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB1dnVyZGVydFBlcmlvZGVQw6VWaWxrw6VyID09PSB1bmRlZmluZWQ7XG4gICAgfTtcblxuICAgIGNvbnN0IHNrYWxWaXNlRmplcm5VdHZpZGV0QmFybmV0cnlnZEtuYXBwID0gKCkgPT4ge1xuICAgICAgICBpZiAoZXJMZXNldmlzbmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHV0dmlkZXRWaWxrw6VyID0gdmlsa8OlclJlc3VsdGF0ZXIuZmlsdGVyKFxuICAgICAgICAgICAgdmlsa8OlclJlc3VsdGF0ID0+IHZpbGvDpXJSZXN1bHRhdC52ZXJkaS52aWxrw6VyVHlwZSA9PT0gVmlsa8OlclR5cGUuVVRWSURFVF9CQVJORVRSWUdEXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBlck1pZ3JlcmluZ3NiZWhhbmRsaW5nICYmXG4gICAgICAgICAgICBwZXJzb24udHlwZSA9PT0gUGVyc29uVHlwZS5Tw5hLRVIgJiZcbiAgICAgICAgICAgIHZpbGvDpXJGcmFDb25maWcua2V5ID09PSBWaWxrw6VyVHlwZS5VVFZJREVUX0JBUk5FVFJZR0QgJiZcbiAgICAgICAgICAgIHV0dmlkZXRWaWxrw6VyLmxlbmd0aCAhPT0gMFxuICAgICAgICApO1xuICAgIH07XG5cbiAgICBjb25zdCBza2FsVmlzZUx5c3DDpnJlID1cbiAgICAgICAgdG9nZ2xlc1tGZWF0dXJlVG9nZ2xlLnNrYWxWaXNlVmFyc2VsbGFtcGVGb3JNYW51ZWx0TGFndFRpbEJhcm5dICYmXG4gICAgICAgIGJlaGFuZGxpbmcuc3RlZyA9PSBCZWhhbmRsaW5nU3RlZy5WSUxLw4VSU1ZVUkRFUklORyAmJlxuICAgICAgICB2aWxrw6VyUmVzdWx0YXRlci5zb21lKHZpbGvDpXIgPT4gISF2aWxrw6VyLnZlcmRpLmJlZ3J1bm5lbHNlRm9yTWFudWVsbEtvbnRyb2xsKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxDb250YWluZXI+XG4gICAgICAgICAgICA8RmllbGRzZXRcbiAgICAgICAgICAgICAgICBlcnJvcj17dmlzRmVpbG1lbGRpbmdlckZvclZpbGvDpXIgPyBmZWlsbWVsZGluZyA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICBsZWdlbmQ9e3ZpbGvDpXJGcmFDb25maWcudGl0dGVsfVxuICAgICAgICAgICAgICAgIGhpZGVMZWdlbmRcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8SFN0YWNrIGdhcD1cInNwYWNlLTE2XCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAge3NrYWxWaXNlTHlzcMOmcmUgJiYgPExpZ2h0QnVsYkZpbGxJY29uIGZvbnRTaXplPVwiMS41cmVtXCIgY29sb3I9XCJ2YXIoLS1heC13YXJuaW5nLTUwMClcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT1cIm1lZGl1bVwiIGxldmVsPVwiM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3ZpbGvDpXJGcmFDb25maWcudGl0dGVsfVxuICAgICAgICAgICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICAgICAgPFZpbGvDpXJUYWJlbGxcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uPXtwZXJzb259XG4gICAgICAgICAgICAgICAgICAgIHZpbGvDpXJGcmFDb25maWc9e3ZpbGvDpXJGcmFDb25maWd9XG4gICAgICAgICAgICAgICAgICAgIHZpbGvDpXJSZXN1bHRhdGVyPXt2aWxrw6VyUmVzdWx0YXRlcn1cbiAgICAgICAgICAgICAgICAgICAgdmlzRmVpbG1lbGRpbmdlcj17dmlzRmVpbG1lbGRpbmdlcn1cbiAgICAgICAgICAgICAgICAgICAgc2V0dEZva3VzUMOlS25hcHA9e3NldHRGb2t1c1DDpUxlZ2dUaWxQZXJpb2RlS25hcHB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICB7c2thbFZpc2VMZWdnVGlsS25hcHAoKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxCb3ggbWFyZ2luQmxvY2s9eydzcGFjZS0yMCBzcGFjZS0wJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9taXNlID0gcG9zdFZpbGvDpXIocGVyc29uLnBlcnNvbklkZW50LCB2aWxrw6VyRnJhQ29uZmlnLmtleSBhcyBWaWxrw6VyVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGjDpW5kdGVyTnlQZXJpb2RlVmlsa8OlcnN2dXJkZXJpbmcocHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17bGVnZ1RpbFBlcmlvZGVLbmFwcElkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e3ZpbGvDpXJTdWJtaXQgPT09IFZpbGvDpXJTdWJtaXQuUE9TVH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dmlsa8OlclN1Ym1pdCA9PT0gVmlsa8OlclN1Ym1pdC5QT1NUfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJ0ZXJ0aWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT1cIm1lZGl1bVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj17PFBsdXNDaXJjbGVJY29uIC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExlZ2cgdGlsIHBlcmlvZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtza2FsVmlzZUZqZXJuVXR2aWRldEJhcm5ldHJ5Z2RLbmFwcCgpICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEZqZXJuVXR2aWRldEJhcm5ldHJ5Z2RWaWxrw6VyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25JZGVudD17cGVyc29uLnBlcnNvbklkZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgc2xldHRWaWxrw6VySWQ9e2dlbmVyaXNrVmlsa8OlcktleSArICdfX3NsZXR0LXZpbGvDpXItdXR2aWRldCd9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvRmllbGRzZXQ+XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHZW5lcmlza1ZpbGvDpXI7XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJkZGY4MmYwMDdlOGIxOWI3ZGNhMFwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwic3R5bGVkIiwiTGlnaHRCdWxiRmlsbEljb24iLCJQbHVzQ2lyY2xlSWNvbiIsIkJveCIsIkJ1dHRvbiIsIkZpZWxkc2V0IiwiSGVhZGluZyIsIkhTdGFjayIsIlJlc3N1cnNTdGF0dXMiLCJGamVyblV0dmlkZXRCYXJuZXRyeWdkVmlsa8OlciIsIlZpbGvDpXJUYWJlbGwiLCJ1c2VGZWF0dXJlVG9nZ2xlcyIsIkJlaGFuZGxpbmdTdGVnIiwiRmVhdHVyZVRvZ2dsZSIsIlBlcnNvblR5cGUiLCJSZXN1bHRhdCIsIlZpbGvDpXJUeXBlIiwidXNlQmVoYW5kbGluZ0NvbnRleHQiLCJ1c2VWaWxrw6Vyc3Z1cmRlcmluZ0NvbnRleHQiLCJWaWxrw6VyU3VibWl0IiwiQ29udGFpbmVyIiwiZGl2IiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbCIsIl9jIiwiR2VuZXJpc2tWaWxrw6VyIiwiX3JlZiIsIl9zIiwicGVyc29uIiwidmlsa8OlckZyYUNvbmZpZyIsInZpbGvDpXJSZXN1bHRhdGVyIiwidmlzRmVpbG1lbGRpbmdlciIsImdlbmVyaXNrVmlsa8OlcktleSIsInRvZ2dsZXMiLCJfdXNlQmVoYW5kbGluZ0NvbnRleHQiLCJiZWhhbmRsaW5nIiwidnVyZGVyRXJMZXNldmlzbmluZyIsInNldHTDhXBlbkJlaGFuZGxpbmciLCJlck1pZ3JlcmluZ3NiZWhhbmRsaW5nIiwiZXJMZXNldmlzbmluZyIsIl91c2VWaWxrw6Vyc3Z1cmRlcmluZ0MiLCJzZXR0Vmlsa8OlclN1Ym1pdCIsInBvc3RWaWxrw6VyIiwidmlsa8OlclN1Ym1pdCIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInZpc0ZlaWxtZWxkaW5nZXJGb3JWaWxrw6VyIiwic2V0dFZpc0ZlaWxtZWxkaW5nZXJGb3JWaWxrw6VyIiwiX3VzZVN0YXRlMyIsIl91c2VTdGF0ZTQiLCJmZWlsbWVsZGluZyIsInNldHRGZWlsbWVsZGluZyIsImxlZ2dUaWxQZXJpb2RlS25hcHBJZCIsInNldHRGb2t1c1DDpUxlZ2dUaWxQZXJpb2RlS25hcHAiLCJfZG9jdW1lbnQkZ2V0RWxlbWVudEIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZm9jdXMiLCJow6VuZHRlck55UGVyaW9kZVZpbGvDpXJzdnVyZGVyaW5nIiwicHJvbWlzZSIsInRoZW4iLCJvcHBkYXRlcnRCZWhhbmRsaW5nIiwiTk9ORSIsInN0YXR1cyIsIlNVS1NFU1MiLCJGRUlMRVQiLCJGVU5LU0pPTkVMTF9GRUlMIiwiSUtLRV9USUxHQU5HIiwiZnJvbnRlbmRGZWlsbWVsZGluZyIsInNrYWxWaXNlTGVnZ1RpbEtuYXBwIiwidXZ1cmRlcnRQZXJpb2RlUMOlVmlsa8OlciIsImZpbmQiLCJ2aWxrw6VyIiwidmVyZGkiLCJyZXN1bHRhdCIsIklLS0VfVlVSREVSVCIsInVuZGVmaW5lZCIsInNrYWxWaXNlRmplcm5VdHZpZGV0QmFybmV0cnlnZEtuYXBwIiwidXR2aWRldFZpbGvDpXIiLCJmaWx0ZXIiLCJ2aWxrw6VyUmVzdWx0YXQiLCJ2aWxrw6VyVHlwZSIsIlVUVklERVRfQkFSTkVUUllHRCIsInR5cGUiLCJTw5hLRVIiLCJrZXkiLCJsZW5ndGgiLCJza2FsVmlzZUx5c3DDpnJlIiwic2thbFZpc2VWYXJzZWxsYW1wZUZvck1hbnVlbHRMYWd0VGlsQmFybiIsInN0ZWciLCJWSUxLw4VSU1ZVUkRFUklORyIsInNvbWUiLCJiZWdydW5uZWxzZUZvck1hbnVlbGxLb250cm9sbCIsImNyZWF0ZUVsZW1lbnQiLCJlcnJvciIsImxlZ2VuZCIsInRpdHRlbCIsImhpZGVMZWdlbmQiLCJnYXAiLCJhbGlnbiIsImZvbnRTaXplIiwiY29sb3IiLCJzaXplIiwibGV2ZWwiLCJzZXR0Rm9rdXNQw6VLbmFwcCIsIm1hcmdpbkJsb2NrIiwib25DbGljayIsInBlcnNvbklkZW50IiwiaWQiLCJsb2FkaW5nIiwiUE9TVCIsImRpc2FibGVkIiwidmFyaWFudCIsImljb24iLCJzbGV0dFZpbGvDpXJJZCIsIl9jMiIsIiRSZWZyZXNoUmVnJCJdLCJzb3VyY2VSb290IjoiIn0=