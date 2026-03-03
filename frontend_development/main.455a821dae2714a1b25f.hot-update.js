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
/******/ 	__webpack_require__.h = () => ("2a8344f5ecbc10550bce")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi40NTVhODIxZGFlMjcxNGExYjI1Zi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBRUQ7QUFFaUM7QUFDSDtBQUdmO0FBRW9CO0FBQ2hDO0FBQ29DO0FBQ1E7QUFDZjtBQUVYO0FBRVU7QUFDSTtBQUNZO0FBVXRGLElBQU1xQixTQUFTLEdBQUduQix5REFBTSxDQUFDb0IsR0FBRyxDQUFBQyxlQUFBLEtBQUFBLGVBQUEsR0FBQUMsc0JBQUEsd0hBTTNCO0FBQUNDLEVBQUEsR0FOSUosU0FBUztBQVFmLElBQU1LLGNBQWdDLEdBQUcsU0FBbkNBLGNBQWdDQSxDQUFBQyxJQUFBLEVBTWhDO0VBQUFDLEVBQUE7RUFBQSxJQUxGQyxNQUFNLEdBQUFGLElBQUEsQ0FBTkUsTUFBTTtJQUNOQyxlQUFlLEdBQUFILElBQUEsQ0FBZkcsZUFBZTtJQUNmQyxnQkFBZ0IsR0FBQUosSUFBQSxDQUFoQkksZ0JBQWdCO0lBQ2hCQyxnQkFBZ0IsR0FBQUwsSUFBQSxDQUFoQkssZ0JBQWdCO0lBQ2hCQyxpQkFBaUIsR0FBQU4sSUFBQSxDQUFqQk0saUJBQWlCO0VBRWpCLElBQU1DLE9BQU8sR0FBR3RCLDJFQUFpQixDQUFDLENBQUM7RUFDbkMsSUFBQXVCLHFCQUFBLEdBQXdGakIsaUZBQW9CLENBQUMsQ0FBQztJQUF0R2tCLFVBQVUsR0FBQUQscUJBQUEsQ0FBVkMsVUFBVTtJQUFFQyxtQkFBbUIsR0FBQUYscUJBQUEsQ0FBbkJFLG1CQUFtQjtJQUFFQyxrQkFBa0IsR0FBQUgscUJBQUEsQ0FBbEJHLGtCQUFrQjtJQUFFQyxzQkFBc0IsR0FBQUoscUJBQUEsQ0FBdEJJLHNCQUFzQjtFQUNuRixJQUFNQyxhQUFhLEdBQUdILG1CQUFtQixDQUFDLENBQUM7RUFDM0MsSUFBQUkscUJBQUEsR0FBdUR0Qix3RkFBMEIsQ0FBQyxDQUFDO0lBQTNFdUIsZ0JBQWdCLEdBQUFELHFCQUFBLENB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QUFDLHNDQUFBLENBQUE5RixFQUFBO0FBQUE4RixzQ0FBQSxDQUFBRCxHQUFBLHVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNySzlCLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvRmFnc2FrL0JlaGFuZGxpbmcvU2lkZXIvVmlsa8OlcnN2dXJkZXJpbmcvR2VuZXJpc2tWaWxrw6VyL0dlbmVyaXNrVmlsa8Olci50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IExpZ2h0QnVsYkZpbGxJY29uLCBQbHVzQ2lyY2xlSWNvbiB9IGZyb20gJ0BuYXZpa3QvYWtzZWwtaWNvbnMnO1xuaW1wb3J0IHsgQnV0dG9uLCBGaWVsZHNldCwgSGVhZGluZywgSFN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgdHlwZSB7IEZlbHRTdGF0ZSB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS1za2plbWEnO1xuaW1wb3J0IHR5cGUgeyBSZXNzdXJzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcbmltcG9ydCB7IFJlc3N1cnNTdGF0dXMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuXG5pbXBvcnQgRmplcm5VdHZpZGV0QmFybmV0cnlnZFZpbGvDpXIgZnJvbSAnLi9GamVyblV0dmlkZXRCYXJuZXRyeWdkVmlsa8Olcic7XG5pbXBvcnQgVmlsa8OlclRhYmVsbCBmcm9tICcuL1ZpbGvDpXJUYWJlbGwnO1xuaW1wb3J0IHsgdXNlRmVhdHVyZVRvZ2dsZXMgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9ob29rcy91c2VGZWF0dXJlVG9nZ2xlcyc7XG5pbXBvcnQgeyBCZWhhbmRsaW5nU3RlZywgdHlwZSBJQmVoYW5kbGluZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3R5cGVyL2JlaGFuZGxpbmcnO1xuaW1wb3J0IHsgRmVhdHVyZVRvZ2dsZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3R5cGVyL2ZlYXR1cmVUb2dnbGVzJztcbmltcG9ydCB0eXBlIHsgSUdydW5ubGFnUGVyc29uIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvcGVyc29uJztcbmltcG9ydCB7IFBlcnNvblR5cGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi90eXBlci9wZXJzb24nO1xuaW1wb3J0IHR5cGUgeyBJVmlsa8OlckNvbmZpZywgSVZpbGvDpXJSZXN1bHRhdCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3R5cGVyL3ZpbGvDpXInO1xuaW1wb3J0IHsgUmVzdWx0YXQsIFZpbGvDpXJUeXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvdmlsa8Olcic7XG5pbXBvcnQgeyB1c2VCZWhhbmRsaW5nQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uL2NvbnRleHQvQmVoYW5kbGluZ0NvbnRleHQnO1xuaW1wb3J0IHsgdXNlVmlsa8OlcnN2dXJkZXJpbmdDb250ZXh0LCBWaWxrw6VyU3VibWl0IH0gZnJvbSAnLi4vVmlsa8OlcnN2dXJkZXJpbmdDb250ZXh0JztcblxuaW50ZXJmYWNlIElQcm9wcyB7XG4gICAgcGVyc29uOiBJR3J1bm5sYWdQZXJzb247XG4gICAgdmlsa8OlclJlc3VsdGF0ZXI6IEZlbHRTdGF0ZTxJVmlsa8OlclJlc3VsdGF0PltdO1xuICAgIHZpbGvDpXJGcmFDb25maWc6IElWaWxrw6VyQ29uZmlnO1xuICAgIHZpc0ZlaWxtZWxkaW5nZXI6IGJvb2xlYW47XG4gICAgZ2VuZXJpc2tWaWxrw6VyS2V5OiBzdHJpbmc7XG59XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gICAgbWFyZ2luLXRvcDogdmFyKC0tYXgtc3BhY2UtNjQpO1xuXG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tYXgtc3BhY2UtMjApO1xuICAgIH1cbmA7XG5cbmNvbnN0IEdlbmVyaXNrVmlsa8OlcjogUmVhY3QuRkM8SVByb3BzPiA9ICh7XG4gICAgcGVyc29uLFxuICAgIHZpbGvDpXJGcmFDb25maWcsXG4gICAgdmlsa8OlclJlc3VsdGF0ZXIsXG4gICAgdmlzRmVpbG1lbGRpbmdlcixcbiAgICBnZW5lcmlza1ZpbGvDpXJLZXksXG59KSA9PiB7XG4gICAgY29uc3QgdG9nZ2xlcyA9IHVzZUZlYXR1cmVUb2dnbGVzKCk7XG4gICAgY29uc3QgeyBiZWhhbmRsaW5nLCB2dXJkZXJFckxlc2V2aXNuaW5nLCBzZXR0w4VwZW5CZWhhbmRsaW5nLCBlck1pZ3JlcmluZ3NiZWhhbmRsaW5nIH0gPSB1c2VCZWhhbmRsaW5nQ29udGV4dCgpO1xuICAgIGNvbnN0IGVyTGVzZXZpc25pbmcgPSB2dXJkZXJFckxlc2V2aXNuaW5nKCk7XG4gICAgY29uc3QgeyBzZXR0Vmlsa8OlclN1Ym1pdCwgcG9zdFZpbGvDpXIsIHZpbGvDpXJTdWJtaXQgfSA9IHVzZVZpbGvDpXJzdnVyZGVyaW5nQ29udGV4dCgpO1xuXG4gICAgY29uc3QgW3Zpc0ZlaWxtZWxkaW5nZXJGb3JWaWxrw6VyLCBzZXR0VmlzRmVpbG1lbGRpbmdlckZvclZpbGvDpXJdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtmZWlsbWVsZGluZywgc2V0dEZlaWxtZWxkaW5nXSA9IHVzZVN0YXRlKCcnKTtcblxuICAgIGNvbnN0IGxlZ2dUaWxQZXJpb2RlS25hcHBJZCA9IGdlbmVyaXNrVmlsa8OlcktleSArICdfX2xlZ2dfdGlsX3BlcmlvZGUnO1xuXG4gICAgY29uc3Qgc2V0dEZva3VzUMOlTGVnZ1RpbFBlcmlvZGVLbmFwcCA9ICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGVnZ1RpbFBlcmlvZGVLbmFwcElkKT8uZm9jdXMoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaMOlbmR0ZXJOeVBlcmlvZGVWaWxrw6Vyc3Z1cmRlcmluZyA9IChwcm9taXNlOiBQcm9taXNlPFJlc3N1cnM8SUJlaGFuZGxpbmc+PikgPT4ge1xuICAgICAgICBwcm9taXNlXG4gICAgICAgICAgICAudGhlbigob3BwZGF0ZXJ0QmVoYW5kbGluZzogUmVzc3VyczxJQmVoYW5kbGluZz4pID0+IHtcbiAgICAgICAgICAgICAgICBzZXR0VmlzRmVpbG1lbGRpbmdlckZvclZpbGvDpXIoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNldHRWaWxrw6VyU3VibWl0KFZpbGvDpXJTdWJtaXQuTk9ORSk7XG4gICAgICAgICAgICAgICAgc2V0dEZlaWxtZWxkaW5nKCcnKTtcbiAgICAgICAgICAgICAgICBpZiAob3BwZGF0ZXJ0QmVoYW5kbGluZy5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuU1VLU0VTUykge1xuICAgICAgICAgICAgICAgICAgICBzZXR0w4VwZW5CZWhhbmRsaW5nKG9wcGRhdGVydEJlaGFuZGxpbmcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIG9wcGRhdGVydEJlaGFuZGxpbmcuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLkZFSUxFVCB8fFxuICAgICAgICAgICAgICAgICAgICBvcHBkYXRlcnRCZWhhbmRsaW5nLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5GVU5LU0pPTkVMTF9GRUlMIHx8XG4gICAgICAgICAgICAgICAgICAgIG9wcGRhdGVydEJlaGFuZGxpbmcuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLklLS0VfVElMR0FOR1xuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0RmVpbG1lbGRpbmcob3BwZGF0ZXJ0QmVoYW5kbGluZy5mcm9udGVuZEZlaWxtZWxkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0dFZpc0ZlaWxtZWxkaW5nZXJGb3JWaWxrw6VyKHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRGZWlsbWVsZGluZygnRW4gdWtqZW50IGZlaWwgaGFyIG9wcHN0w6V0dCwgdmkgaGFyIGlra2Uga2xhcnQgw6UgbGVnZ2UgdGlsIHBlcmlvZGUuJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldHRWaXNGZWlsbWVsZGluZ2VyRm9yVmlsa8Olcih0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXR0Vmlsa8OlclN1Ym1pdChWaWxrw6VyU3VibWl0Lk5PTkUpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNrYWxWaXNlTGVnZ1RpbEtuYXBwID0gKCkgPT4ge1xuICAgICAgICBpZiAoZXJMZXNldmlzbmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHV2dXJkZXJ0UGVyaW9kZVDDpVZpbGvDpXIgPSB2aWxrw6VyUmVzdWx0YXRlci5maW5kKFxuICAgICAgICAgICAgdmlsa8OlciA9PiB2aWxrw6VyLnZlcmRpLnJlc3VsdGF0LnZlcmRpID09PSBSZXN1bHRhdC5JS0tFX1ZVUkRFUlRcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHV2dXJkZXJ0UGVyaW9kZVDDpVZpbGvDpXIgPT09IHVuZGVmaW5lZDtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2thbFZpc2VGamVyblV0dmlkZXRCYXJuZXRyeWdkS25hcHAgPSAoKSA9PiB7XG4gICAgICAgIGlmIChlckxlc2V2aXNuaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXR2aWRldFZpbGvDpXIgPSB2aWxrw6VyUmVzdWx0YXRlci5maWx0ZXIoXG4gICAgICAgICAgICB2aWxrw6VyUmVzdWx0YXQgPT4gdmlsa8OlclJlc3VsdGF0LnZlcmRpLnZpbGvDpXJUeXBlID09PSBWaWxrw6VyVHlwZS5VVFZJREVUX0JBUk5FVFJZR0RcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGVyTWlncmVyaW5nc2JlaGFuZGxpbmcgJiZcbiAgICAgICAgICAgIHBlcnNvbi50eXBlID09PSBQZXJzb25UeXBlLlPDmEtFUiAmJlxuICAgICAgICAgICAgdmlsa8OlckZyYUNvbmZpZy5rZXkgPT09IFZpbGvDpXJUeXBlLlVUVklERVRfQkFSTkVUUllHRCAmJlxuICAgICAgICAgICAgdXR2aWRldFZpbGvDpXIubGVuZ3RoICE9PSAwXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNrYWxWaXNlTHlzcMOmcmUgPVxuICAgICAgICB0b2dnbGVzW0ZlYXR1cmVUb2dnbGUuc2thbFZpc2VWYXJzZWxsYW1wZUZvck1hbnVlbHRMYWd0VGlsQmFybl0gJiZcbiAgICAgICAgYmVoYW5kbGluZy5zdGVnID09IEJlaGFuZGxpbmdTdGVnLlZJTEvDhVJTVlVSREVSSU5HICYmXG4gICAgICAgIHZpbGvDpXJSZXN1bHRhdGVyLnNvbWUodmlsa8OlciA9PiAhIXZpbGvDpXIudmVyZGkuYmVncnVubmVsc2VGb3JNYW51ZWxsS29udHJvbGwpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPENvbnRhaW5lcj5cbiAgICAgICAgICAgIDxGaWVsZHNldFxuICAgICAgICAgICAgICAgIGVycm9yPXt2aXNGZWlsbWVsZGluZ2VyRm9yVmlsa8OlciA/IGZlaWxtZWxkaW5nIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgIGxlZ2VuZD17dmlsa8OlckZyYUNvbmZpZy50aXR0ZWx9XG4gICAgICAgICAgICAgICAgaGlkZUxlZ2VuZFxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxIU3RhY2sgZ2FwPVwic3BhY2UtMTZcIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICB7c2thbFZpc2VMeXNww6ZyZSAmJiA8TGlnaHRCdWxiRmlsbEljb24gZm9udFNpemU9XCIxLjVyZW1cIiBjb2xvcj1cInZhcigtLWF4LXdhcm5pbmctNTAwKVwiIC8+fVxuICAgICAgICAgICAgICAgICAgICA8SGVhZGluZyBzaXplPVwibWVkaXVtXCIgbGV2ZWw9XCIzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dmlsa8OlckZyYUNvbmZpZy50aXR0ZWx9XG4gICAgICAgICAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgICAgICA8Vmlsa8OlclRhYmVsbFxuICAgICAgICAgICAgICAgICAgICBwZXJzb249e3BlcnNvbn1cbiAgICAgICAgICAgICAgICAgICAgdmlsa8OlckZyYUNvbmZpZz17dmlsa8OlckZyYUNvbmZpZ31cbiAgICAgICAgICAgICAgICAgICAgdmlsa8OlclJlc3VsdGF0ZXI9e3ZpbGvDpXJSZXN1bHRhdGVyfVxuICAgICAgICAgICAgICAgICAgICB2aXNGZWlsbWVsZGluZ2VyPXt2aXNGZWlsbWVsZGluZ2VyfVxuICAgICAgICAgICAgICAgICAgICBzZXR0Rm9rdXNQw6VLbmFwcD17c2V0dEZva3VzUMOlTGVnZ1RpbFBlcmlvZGVLbmFwcH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHRlc3RcbiAgICAgICAgICAgICAgICB7c2thbFZpc2VMZWdnVGlsS25hcHAoKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxCb3ggbWFyZ2luQmxvY2s9eydzcGFjZS0yMCBzcGFjZS0wJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9taXNlID0gcG9zdFZpbGvDpXIocGVyc29uLnBlcnNvbklkZW50LCB2aWxrw6VyRnJhQ29uZmlnLmtleSBhcyBWaWxrw6VyVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGjDpW5kdGVyTnlQZXJpb2RlVmlsa8OlcnN2dXJkZXJpbmcocHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17bGVnZ1RpbFBlcmlvZGVLbmFwcElkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e3ZpbGvDpXJTdWJtaXQgPT09IFZpbGvDpXJTdWJtaXQuUE9TVH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dmlsa8OlclN1Ym1pdCA9PT0gVmlsa8OlclN1Ym1pdC5QT1NUfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJ0ZXJ0aWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT1cIm1lZGl1bVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj17PFBsdXNDaXJjbGVJY29uIC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExlZ2cgdGlsIHBlcmlvZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHRlc3RcbiAgICAgICAgICAgICAgICB7c2thbFZpc2VGamVyblV0dmlkZXRCYXJuZXRyeWdkS25hcHAoKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxGamVyblV0dmlkZXRCYXJuZXRyeWdkVmlsa8OlclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uSWRlbnQ9e3BlcnNvbi5wZXJzb25JZGVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNsZXR0Vmlsa8OlcklkPXtnZW5lcmlza1ZpbGvDpXJLZXkgKyAnX19zbGV0dC12aWxrw6VyLXV0dmlkZXQnfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L0ZpZWxkc2V0PlxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2VuZXJpc2tWaWxrw6VyO1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMmE4MzQ0ZjVlY2JjMTA1NTBiY2VcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInN0eWxlZCIsIkxpZ2h0QnVsYkZpbGxJY29uIiwiUGx1c0NpcmNsZUljb24iLCJCdXR0b24iLCJGaWVsZHNldCIsIkhlYWRpbmciLCJIU3RhY2siLCJSZXNzdXJzU3RhdHVzIiwiRmplcm5VdHZpZGV0QmFybmV0cnlnZFZpbGvDpXIiLCJWaWxrw6VyVGFiZWxsIiwidXNlRmVhdHVyZVRvZ2dsZXMiLCJCZWhhbmRsaW5nU3RlZyIsIkZlYXR1cmVUb2dnbGUiLCJQZXJzb25UeXBlIiwiUmVzdWx0YXQiLCJWaWxrw6VyVHlwZSIsInVzZUJlaGFuZGxpbmdDb250ZXh0IiwidXNlVmlsa8OlcnN2dXJkZXJpbmdDb250ZXh0IiwiVmlsa8OlclN1Ym1pdCIsIkNvbnRhaW5lciIsImRpdiIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJfYyIsIkdlbmVyaXNrVmlsa8OlciIsIl9yZWYiLCJfcyIsInBlcnNvbiIsInZpbGvDpXJGcmFDb25maWciLCJ2aWxrw6VyUmVzdWx0YXRlciIsInZpc0ZlaWxtZWxkaW5nZXIiLCJnZW5lcmlza1ZpbGvDpXJLZXkiLCJ0b2dnbGVzIiwiX3VzZUJlaGFuZGxpbmdDb250ZXh0IiwiYmVoYW5kbGluZyIsInZ1cmRlckVyTGVzZXZpc25pbmciLCJzZXR0w4VwZW5CZWhhbmRsaW5nIiwiZXJNaWdyZXJpbmdzYmVoYW5kbGluZyIsImVyTGVzZXZpc25pbmciLCJfdXNlVmlsa8OlcnN2dXJkZXJpbmdDIiwic2V0dFZpbGvDpXJTdWJtaXQiLCJwb3N0Vmlsa8OlciIsInZpbGvDpXJTdWJtaXQiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJ2aXNGZWlsbWVsZGluZ2VyRm9yVmlsa8OlciIsInNldHRWaXNGZWlsbWVsZGluZ2VyRm9yVmlsa8OlciIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0IiwiZmVpbG1lbGRpbmciLCJzZXR0RmVpbG1lbGRpbmciLCJsZWdnVGlsUGVyaW9kZUtuYXBwSWQiLCJzZXR0Rm9rdXNQw6VMZWdnVGlsUGVyaW9kZUtuYXBwIiwiX2RvY3VtZW50JGdldEVsZW1lbnRCIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImZvY3VzIiwiaMOlbmR0ZXJOeVBlcmlvZGVWaWxrw6Vyc3Z1cmRlcmluZyIsInByb21pc2UiLCJ0aGVuIiwib3BwZGF0ZXJ0QmVoYW5kbGluZyIsIk5PTkUiLCJzdGF0dXMiLCJTVUtTRVNTIiwiRkVJTEVUIiwiRlVOS1NKT05FTExfRkVJTCIsIklLS0VfVElMR0FORyIsImZyb250ZW5kRmVpbG1lbGRpbmciLCJza2FsVmlzZUxlZ2dUaWxLbmFwcCIsInV2dXJkZXJ0UGVyaW9kZVDDpVZpbGvDpXIiLCJmaW5kIiwidmlsa8OlciIsInZlcmRpIiwicmVzdWx0YXQiLCJJS0tFX1ZVUkRFUlQiLCJ1bmRlZmluZWQiLCJza2FsVmlzZUZqZXJuVXR2aWRldEJhcm5ldHJ5Z2RLbmFwcCIsInV0dmlkZXRWaWxrw6VyIiwiZmlsdGVyIiwidmlsa8OlclJlc3VsdGF0Iiwidmlsa8OlclR5cGUiLCJVVFZJREVUX0JBUk5FVFJZR0QiLCJ0eXBlIiwiU8OYS0VSIiwia2V5IiwibGVuZ3RoIiwic2thbFZpc2VMeXNww6ZyZSIsInNrYWxWaXNlVmFyc2VsbGFtcGVGb3JNYW51ZWx0TGFndFRpbEJhcm4iLCJzdGVnIiwiVklMS8OFUlNWVVJERVJJTkciLCJzb21lIiwiYmVncnVubmVsc2VGb3JNYW51ZWxsS29udHJvbGwiLCJjcmVhdGVFbGVtZW50IiwiZXJyb3IiLCJsZWdlbmQiLCJ0aXR0ZWwiLCJoaWRlTGVnZW5kIiwiZ2FwIiwiYWxpZ24iLCJmb250U2l6ZSIsImNvbG9yIiwic2l6ZSIsImxldmVsIiwic2V0dEZva3VzUMOlS25hcHAiLCJCb3giLCJtYXJnaW5CbG9jayIsIm9uQ2xpY2siLCJwZXJzb25JZGVudCIsImlkIiwibG9hZGluZyIsIlBPU1QiLCJkaXNhYmxlZCIsInZhcmlhbnQiLCJpY29uIiwic2xldHRWaWxrw6VySWQiLCJfYzIiLCIkUmVmcmVzaFJlZyQiXSwic291cmNlUm9vdCI6IiJ9