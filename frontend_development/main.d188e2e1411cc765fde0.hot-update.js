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
_c2 = UtførKnapp;
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
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(UtførKnapp, {
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
_c3 = GeneriskVilkår;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GeneriskVilkår);
var _c, _c2, _c3;
__webpack_require__.$Refresh$.register(_c, "Container");
__webpack_require__.$Refresh$.register(_c2, "Utf\xF8rKnapp");
__webpack_require__.$Refresh$.register(_c3, "GeneriskVilk\xE5r");

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
/******/ 	__webpack_require__.h = () => ("823c8c0854e1fccadfb0")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5kMTg4ZTJlMTQxMWNjNzY1ZmRlMC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF3QztBQUVEO0FBRWlDO0FBQ0g7QUFHZjtBQUVvQjtBQUNoQztBQUNvQztBQUNRO0FBQ2Y7QUFFWDtBQUVVO0FBQ0k7QUFDWTtBQVV0RixJQUFNcUIsU0FBUyxHQUFHbkIseURBQU0sQ0FBQ29CLEdBQUcsQ0FBQUMsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLHNCQUFBLHdIQU0zQjtBQUFDQyxFQUFBLEdBTklKLFNBQVM7QUFRZixJQUFNSyxVQUFVLEdBQUd4Qiw2REFBTSxDQUFDRyxvREFBTSxDQUFDLENBQUFzQixnQkFBQSxLQUFBQSxnQkFBQSxHQUFBSCxzQkFBQSwrQ0FFaEM7QUFBQ0ksR0FBQSxHQUZJRixVQUFVO0FBSWhCLElBQU1HLGNBQWdDLEdBQUcsU0FBbkNBLGNBQWdDQSxDQUFBQyxJQUFBLEVBTWhDO0VBQUFDLEVBQUE7RUFBQSxJQUxGQyxNQUFNLEdBQUFGLElBQUEsQ0FBTkUsTUFBTTtJQUNOQyxlQUFlLEdBQUFILElBQUEsQ0FBZkcsZUFBZTtJQUNmQyxnQkFBZ0IsR0FBQUosSUFBQSxDQUFoQkksZ0JBQWdCO0lBQ2hCQyxnQkFBZ0IsR0FBQUwsSUFBQSxDQUFoQkssZ0JBQWdCO0lBQ2hCQyxpQkFBaUIsR0FBQU4sSUFBQSxDQUFqQk0saUJBQWlCO0VBRWpCLElBQU1DLE9BQU8sR0FBR3pCLDJFQUFpQixDQUFDLENBQUM7RUFDbkMsSUFBQTBCLHFCQUFBLEdBQXdGcEIsaUZBQW9CLENBQUMsQ0FBQztJQUF0R3FCLFVBQVUsR0FBQUQscUJBQUEsQ0FBVkMsVUFBVTtJQUFFQyxtQkFBbUIsR0FBQUYscUJBQUEsQ0FBbkJFLG1CQUFtQjtJQUFFQyxrQkFBa0IsR0FBQUgscUJBQUEsQ0FBbEJHLGtCQUFrQjtJQUFFQyxzQkFBc0IsR0FBQUoscUJBQUEsQ0FBdEJJLHNCQUFz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QixFQUN1RE0sNkVBQW9CLEVBRXJEQyxvRkFBMEI7QUFBQTtBQUFBc0csR0FBQSxHQVYvRTVGLGNBQWdDO0FBK0h0QyxpRUFBZUEsY0FBYyxFQUFDO0FBQUEsSUFBQUosRUFBQSxFQUFBRyxHQUFBLEVBQUE2RixHQUFBO0FBQUFDLHNDQUFBLENBQUFqRyxFQUFBO0FBQUFpRyxzQ0FBQSxDQUFBOUYsR0FBQTtBQUFBOEYsc0NBQUEsQ0FBQUQsR0FBQSx1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDeks5QixzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL0ZhZ3Nhay9CZWhhbmRsaW5nL1NpZGVyL1ZpbGvDpXJzdnVyZGVyaW5nL0dlbmVyaXNrVmlsa8Olci9HZW5lcmlza1ZpbGvDpXIudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBMaWdodEJ1bGJGaWxsSWNvbiwgUGx1c0NpcmNsZUljb24gfSBmcm9tICdAbmF2aWt0L2Frc2VsLWljb25zJztcbmltcG9ydCB7IEJ1dHRvbiwgRmllbGRzZXQsIEhlYWRpbmcsIEhTdGFjayB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBGZWx0U3RhdGUgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtc2tqZW1hJztcbmltcG9ydCB0eXBlIHsgUmVzc3VycyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcblxuaW1wb3J0IEZqZXJuVXR2aWRldEJhcm5ldHJ5Z2RWaWxrw6VyIGZyb20gJy4vRmplcm5VdHZpZGV0QmFybmV0cnlnZFZpbGvDpXInO1xuaW1wb3J0IFZpbGvDpXJUYWJlbGwgZnJvbSAnLi9WaWxrw6VyVGFiZWxsJztcbmltcG9ydCB7IHVzZUZlYXR1cmVUb2dnbGVzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vaG9va3MvdXNlRmVhdHVyZVRvZ2dsZXMnO1xuaW1wb3J0IHsgQmVoYW5kbGluZ1N0ZWcsIHR5cGUgSUJlaGFuZGxpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi90eXBlci9iZWhhbmRsaW5nJztcbmltcG9ydCB7IEZlYXR1cmVUb2dnbGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi90eXBlci9mZWF0dXJlVG9nZ2xlcyc7XG5pbXBvcnQgdHlwZSB7IElHcnVubmxhZ1BlcnNvbiB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3R5cGVyL3BlcnNvbic7XG5pbXBvcnQgeyBQZXJzb25UeXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvcGVyc29uJztcbmltcG9ydCB0eXBlIHsgSVZpbGvDpXJDb25maWcsIElWaWxrw6VyUmVzdWx0YXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi90eXBlci92aWxrw6VyJztcbmltcG9ydCB7IFJlc3VsdGF0LCBWaWxrw6VyVHlwZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3R5cGVyL3ZpbGvDpXInO1xuaW1wb3J0IHsgdXNlQmVoYW5kbGluZ0NvbnRleHQgfSBmcm9tICcuLi8uLi8uLi9jb250ZXh0L0JlaGFuZGxpbmdDb250ZXh0JztcbmltcG9ydCB7IHVzZVZpbGvDpXJzdnVyZGVyaW5nQ29udGV4dCwgVmlsa8OlclN1Ym1pdCB9IGZyb20gJy4uL1ZpbGvDpXJzdnVyZGVyaW5nQ29udGV4dCc7XG5cbmludGVyZmFjZSBJUHJvcHMge1xuICAgIHBlcnNvbjogSUdydW5ubGFnUGVyc29uO1xuICAgIHZpbGvDpXJSZXN1bHRhdGVyOiBGZWx0U3RhdGU8SVZpbGvDpXJSZXN1bHRhdD5bXTtcbiAgICB2aWxrw6VyRnJhQ29uZmlnOiBJVmlsa8OlckNvbmZpZztcbiAgICB2aXNGZWlsbWVsZGluZ2VyOiBib29sZWFuO1xuICAgIGdlbmVyaXNrVmlsa8OlcktleTogc3RyaW5nO1xufVxuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICAgIG1hcmdpbi10b3A6IHZhcigtLWF4LXNwYWNlLTY0KTtcblxuICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IHZhcigtLWF4LXNwYWNlLTIwKTtcbiAgICB9XG5gO1xuXG5jb25zdCBVdGbDuHJLbmFwcCA9IHN0eWxlZChCdXR0b24pYFxuICAgIG1hcmdpbi10b3A6IHZhcigtLWF4LXNwYWNlLTIwKTtcbmA7XG5cbmNvbnN0IEdlbmVyaXNrVmlsa8OlcjogUmVhY3QuRkM8SVByb3BzPiA9ICh7XG4gICAgcGVyc29uLFxuICAgIHZpbGvDpXJGcmFDb25maWcsXG4gICAgdmlsa8OlclJlc3VsdGF0ZXIsXG4gICAgdmlzRmVpbG1lbGRpbmdlcixcbiAgICBnZW5lcmlza1ZpbGvDpXJLZXksXG59KSA9PiB7XG4gICAgY29uc3QgdG9nZ2xlcyA9IHVzZUZlYXR1cmVUb2dnbGVzKCk7XG4gICAgY29uc3QgeyBiZWhhbmRsaW5nLCB2dXJkZXJFckxlc2V2aXNuaW5nLCBzZXR0w4VwZW5CZWhhbmRsaW5nLCBlck1pZ3JlcmluZ3NiZWhhbmRsaW5nIH0gPSB1c2VCZWhhbmRsaW5nQ29udGV4dCgpO1xuICAgIGNvbnN0IGVyTGVzZXZpc25pbmcgPSB2dXJkZXJFckxlc2V2aXNuaW5nKCk7XG4gICAgY29uc3QgeyBzZXR0Vmlsa8OlclN1Ym1pdCwgcG9zdFZpbGvDpXIsIHZpbGvDpXJTdWJtaXQgfSA9IHVzZVZpbGvDpXJzdnVyZGVyaW5nQ29udGV4dCgpO1xuXG4gICAgY29uc3QgW3Zpc0ZlaWxtZWxkaW5nZXJGb3JWaWxrw6VyLCBzZXR0VmlzRmVpbG1lbGRpbmdlckZvclZpbGvDpXJdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtmZWlsbWVsZGluZywgc2V0dEZlaWxtZWxkaW5nXSA9IHVzZVN0YXRlKCcnKTtcblxuICAgIGNvbnN0IGxlZ2dUaWxQZXJpb2RlS25hcHBJZCA9IGdlbmVyaXNrVmlsa8OlcktleSArICdfX2xlZ2dfdGlsX3BlcmlvZGUnO1xuXG4gICAgY29uc3Qgc2V0dEZva3VzUMOlTGVnZ1RpbFBlcmlvZGVLbmFwcCA9ICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGVnZ1RpbFBlcmlvZGVLbmFwcElkKT8uZm9jdXMoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaMOlbmR0ZXJOeVBlcmlvZGVWaWxrw6Vyc3Z1cmRlcmluZyA9IChwcm9taXNlOiBQcm9taXNlPFJlc3N1cnM8SUJlaGFuZGxpbmc+PikgPT4ge1xuICAgICAgICBwcm9taXNlXG4gICAgICAgICAgICAudGhlbigob3BwZGF0ZXJ0QmVoYW5kbGluZzogUmVzc3VyczxJQmVoYW5kbGluZz4pID0+IHtcbiAgICAgICAgICAgICAgICBzZXR0VmlzRmVpbG1lbGRpbmdlckZvclZpbGvDpXIoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNldHRWaWxrw6VyU3VibWl0KFZpbGvDpXJTdWJtaXQuTk9ORSk7XG4gICAgICAgICAgICAgICAgc2V0dEZlaWxtZWxkaW5nKCcnKTtcbiAgICAgICAgICAgICAgICBpZiAob3BwZGF0ZXJ0QmVoYW5kbGluZy5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuU1VLU0VTUykge1xuICAgICAgICAgICAgICAgICAgICBzZXR0w4VwZW5CZWhhbmRsaW5nKG9wcGRhdGVydEJlaGFuZGxpbmcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIG9wcGRhdGVydEJlaGFuZGxpbmcuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLkZFSUxFVCB8fFxuICAgICAgICAgICAgICAgICAgICBvcHBkYXRlcnRCZWhhbmRsaW5nLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5GVU5LU0pPTkVMTF9GRUlMIHx8XG4gICAgICAgICAgICAgICAgICAgIG9wcGRhdGVydEJlaGFuZGxpbmcuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLklLS0VfVElMR0FOR1xuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0RmVpbG1lbGRpbmcob3BwZGF0ZXJ0QmVoYW5kbGluZy5mcm9udGVuZEZlaWxtZWxkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0dFZpc0ZlaWxtZWxkaW5nZXJGb3JWaWxrw6VyKHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRGZWlsbWVsZGluZygnRW4gdWtqZW50IGZlaWwgaGFyIG9wcHN0w6V0dCwgdmkgaGFyIGlra2Uga2xhcnQgw6UgbGVnZ2UgdGlsIHBlcmlvZGUuJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldHRWaXNGZWlsbWVsZGluZ2VyRm9yVmlsa8Olcih0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXR0Vmlsa8OlclN1Ym1pdChWaWxrw6VyU3VibWl0Lk5PTkUpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNrYWxWaXNlTGVnZ1RpbEtuYXBwID0gKCkgPT4ge1xuICAgICAgICBpZiAoZXJMZXNldmlzbmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHV2dXJkZXJ0UGVyaW9kZVDDpVZpbGvDpXIgPSB2aWxrw6VyUmVzdWx0YXRlci5maW5kKFxuICAgICAgICAgICAgdmlsa8OlciA9PiB2aWxrw6VyLnZlcmRpLnJlc3VsdGF0LnZlcmRpID09PSBSZXN1bHRhdC5JS0tFX1ZVUkRFUlRcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHV2dXJkZXJ0UGVyaW9kZVDDpVZpbGvDpXIgPT09IHVuZGVmaW5lZDtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2thbFZpc2VGamVyblV0dmlkZXRCYXJuZXRyeWdkS25hcHAgPSAoKSA9PiB7XG4gICAgICAgIGlmIChlckxlc2V2aXNuaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXR2aWRldFZpbGvDpXIgPSB2aWxrw6VyUmVzdWx0YXRlci5maWx0ZXIoXG4gICAgICAgICAgICB2aWxrw6VyUmVzdWx0YXQgPT4gdmlsa8OlclJlc3VsdGF0LnZlcmRpLnZpbGvDpXJUeXBlID09PSBWaWxrw6VyVHlwZS5VVFZJREVUX0JBUk5FVFJZR0RcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGVyTWlncmVyaW5nc2JlaGFuZGxpbmcgJiZcbiAgICAgICAgICAgIHBlcnNvbi50eXBlID09PSBQZXJzb25UeXBlLlPDmEtFUiAmJlxuICAgICAgICAgICAgdmlsa8OlckZyYUNvbmZpZy5rZXkgPT09IFZpbGvDpXJUeXBlLlVUVklERVRfQkFSTkVUUllHRCAmJlxuICAgICAgICAgICAgdXR2aWRldFZpbGvDpXIubGVuZ3RoICE9PSAwXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNrYWxWaXNlTHlzcMOmcmUgPVxuICAgICAgICB0b2dnbGVzW0ZlYXR1cmVUb2dnbGUuc2thbFZpc2VWYXJzZWxsYW1wZUZvck1hbnVlbHRMYWd0VGlsQmFybl0gJiZcbiAgICAgICAgYmVoYW5kbGluZy5zdGVnID09IEJlaGFuZGxpbmdTdGVnLlZJTEvDhVJTVlVSREVSSU5HICYmXG4gICAgICAgIHZpbGvDpXJSZXN1bHRhdGVyLnNvbWUodmlsa8OlciA9PiAhIXZpbGvDpXIudmVyZGkuYmVncnVubmVsc2VGb3JNYW51ZWxsS29udHJvbGwpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPENvbnRhaW5lcj5cbiAgICAgICAgICAgIDxGaWVsZHNldFxuICAgICAgICAgICAgICAgIGVycm9yPXt2aXNGZWlsbWVsZGluZ2VyRm9yVmlsa8OlciA/IGZlaWxtZWxkaW5nIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgIGxlZ2VuZD17dmlsa8OlckZyYUNvbmZpZy50aXR0ZWx9XG4gICAgICAgICAgICAgICAgaGlkZUxlZ2VuZFxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxIU3RhY2sgZ2FwPVwic3BhY2UtMTZcIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICB7c2thbFZpc2VMeXNww6ZyZSAmJiA8TGlnaHRCdWxiRmlsbEljb24gZm9udFNpemU9XCIxLjVyZW1cIiBjb2xvcj1cInZhcigtLWF4LXdhcm5pbmctNTAwKVwiIC8+fVxuICAgICAgICAgICAgICAgICAgICA8SGVhZGluZyBzaXplPVwibWVkaXVtXCIgbGV2ZWw9XCIzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dmlsa8OlckZyYUNvbmZpZy50aXR0ZWx9XG4gICAgICAgICAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgICAgICA8Vmlsa8OlclRhYmVsbFxuICAgICAgICAgICAgICAgICAgICBwZXJzb249e3BlcnNvbn1cbiAgICAgICAgICAgICAgICAgICAgdmlsa8OlckZyYUNvbmZpZz17dmlsa8OlckZyYUNvbmZpZ31cbiAgICAgICAgICAgICAgICAgICAgdmlsa8OlclJlc3VsdGF0ZXI9e3ZpbGvDpXJSZXN1bHRhdGVyfVxuICAgICAgICAgICAgICAgICAgICB2aXNGZWlsbWVsZGluZ2VyPXt2aXNGZWlsbWVsZGluZ2VyfVxuICAgICAgICAgICAgICAgICAgICBzZXR0Rm9rdXNQw6VLbmFwcD17c2V0dEZva3VzUMOlTGVnZ1RpbFBlcmlvZGVLbmFwcH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHRlc3RcbiAgICAgICAgICAgICAgICB7c2thbFZpc2VMZWdnVGlsS25hcHAoKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxCb3ggbWFyZ2luQmxvY2s9eydzcGFjZS0yMCBzcGFjZS0wJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VXRmw7hyS25hcHBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBwb3N0Vmlsa8OlcihwZXJzb24ucGVyc29uSWRlbnQsIHZpbGvDpXJGcmFDb25maWcua2V5IGFzIFZpbGvDpXJUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaMOlbmR0ZXJOeVBlcmlvZGVWaWxrw6Vyc3Z1cmRlcmluZyhwcm9taXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtsZWdnVGlsUGVyaW9kZUtuYXBwSWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZz17dmlsa8OlclN1Ym1pdCA9PT0gVmlsa8OlclN1Ym1pdC5QT1NUfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt2aWxrw6VyU3VibWl0ID09PSBWaWxrw6VyU3VibWl0LlBPU1R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInRlcnRpYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwibWVkaXVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uPXs8UGx1c0NpcmNsZUljb24gLz59XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTGVnZyB0aWwgcGVyaW9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9VdGbDuHJLbmFwcD5cbiAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB0ZXN0XG4gICAgICAgICAgICAgICAge3NrYWxWaXNlRmplcm5VdHZpZGV0QmFybmV0cnlnZEtuYXBwKCkgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8Rmplcm5VdHZpZGV0QmFybmV0cnlnZFZpbGvDpXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbklkZW50PXtwZXJzb24ucGVyc29uSWRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGV0dFZpbGvDpXJJZD17Z2VuZXJpc2tWaWxrw6VyS2V5ICsgJ19fc2xldHQtdmlsa8Olci11dHZpZGV0J31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9GaWVsZHNldD5cbiAgICAgICAgPC9Db250YWluZXI+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdlbmVyaXNrVmlsa8OlcjtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjgyM2M4YzA4NTRlMWZjY2FkZmIwXCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJzdHlsZWQiLCJMaWdodEJ1bGJGaWxsSWNvbiIsIlBsdXNDaXJjbGVJY29uIiwiQnV0dG9uIiwiRmllbGRzZXQiLCJIZWFkaW5nIiwiSFN0YWNrIiwiUmVzc3Vyc1N0YXR1cyIsIkZqZXJuVXR2aWRldEJhcm5ldHJ5Z2RWaWxrw6VyIiwiVmlsa8OlclRhYmVsbCIsInVzZUZlYXR1cmVUb2dnbGVzIiwiQmVoYW5kbGluZ1N0ZWciLCJGZWF0dXJlVG9nZ2xlIiwiUGVyc29uVHlwZSIsIlJlc3VsdGF0IiwiVmlsa8OlclR5cGUiLCJ1c2VCZWhhbmRsaW5nQ29udGV4dCIsInVzZVZpbGvDpXJzdnVyZGVyaW5nQ29udGV4dCIsIlZpbGvDpXJTdWJtaXQiLCJDb250YWluZXIiLCJkaXYiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiX2MiLCJVdGbDuHJLbmFwcCIsIl90ZW1wbGF0ZU9iamVjdDIiLCJfYzIiLCJHZW5lcmlza1ZpbGvDpXIiLCJfcmVmIiwiX3MiLCJwZXJzb24iLCJ2aWxrw6VyRnJhQ29uZmlnIiwidmlsa8OlclJlc3VsdGF0ZXIiLCJ2aXNGZWlsbWVsZGluZ2VyIiwiZ2VuZXJpc2tWaWxrw6VyS2V5IiwidG9nZ2xlcyIsIl91c2VCZWhhbmRsaW5nQ29udGV4dCIsImJlaGFuZGxpbmciLCJ2dXJkZXJFckxlc2V2aXNuaW5nIiwic2V0dMOFcGVuQmVoYW5kbGluZyIsImVyTWlncmVyaW5nc2JlaGFuZGxpbmciLCJlckxlc2V2aXNuaW5nIiwiX3VzZVZpbGvDpXJzdnVyZGVyaW5nQyIsInNldHRWaWxrw6VyU3VibWl0IiwicG9zdFZpbGvDpXIiLCJ2aWxrw6VyU3VibWl0IiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5IiwidmlzRmVpbG1lbGRpbmdlckZvclZpbGvDpXIiLCJzZXR0VmlzRmVpbG1lbGRpbmdlckZvclZpbGvDpXIiLCJfdXNlU3RhdGUzIiwiX3VzZVN0YXRlNCIsImZlaWxtZWxkaW5nIiwic2V0dEZlaWxtZWxkaW5nIiwibGVnZ1RpbFBlcmlvZGVLbmFwcElkIiwic2V0dEZva3VzUMOlTGVnZ1RpbFBlcmlvZGVLbmFwcCIsIl9kb2N1bWVudCRnZXRFbGVtZW50QiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJmb2N1cyIsImjDpW5kdGVyTnlQZXJpb2RlVmlsa8OlcnN2dXJkZXJpbmciLCJwcm9taXNlIiwidGhlbiIsIm9wcGRhdGVydEJlaGFuZGxpbmciLCJOT05FIiwic3RhdHVzIiwiU1VLU0VTUyIsIkZFSUxFVCIsIkZVTktTSk9ORUxMX0ZFSUwiLCJJS0tFX1RJTEdBTkciLCJmcm9udGVuZEZlaWxtZWxkaW5nIiwic2thbFZpc2VMZWdnVGlsS25hcHAiLCJ1dnVyZGVydFBlcmlvZGVQw6VWaWxrw6VyIiwiZmluZCIsInZpbGvDpXIiLCJ2ZXJkaSIsInJlc3VsdGF0IiwiSUtLRV9WVVJERVJUIiwidW5kZWZpbmVkIiwic2thbFZpc2VGamVyblV0dmlkZXRCYXJuZXRyeWdkS25hcHAiLCJ1dHZpZGV0Vmlsa8OlciIsImZpbHRlciIsInZpbGvDpXJSZXN1bHRhdCIsInZpbGvDpXJUeXBlIiwiVVRWSURFVF9CQVJORVRSWUdEIiwidHlwZSIsIlPDmEtFUiIsImtleSIsImxlbmd0aCIsInNrYWxWaXNlTHlzcMOmcmUiLCJza2FsVmlzZVZhcnNlbGxhbXBlRm9yTWFudWVsdExhZ3RUaWxCYXJuIiwic3RlZyIsIlZJTEvDhVJTVlVSREVSSU5HIiwic29tZSIsImJlZ3J1bm5lbHNlRm9yTWFudWVsbEtvbnRyb2xsIiwiY3JlYXRlRWxlbWVudCIsImVycm9yIiwibGVnZW5kIiwidGl0dGVsIiwiaGlkZUxlZ2VuZCIsImdhcCIsImFsaWduIiwiZm9udFNpemUiLCJjb2xvciIsInNpemUiLCJsZXZlbCIsInNldHRGb2t1c1DDpUtuYXBwIiwiQm94IiwibWFyZ2luQmxvY2siLCJvbkNsaWNrIiwicGVyc29uSWRlbnQiLCJpZCIsImxvYWRpbmciLCJQT1NUIiwiZGlzYWJsZWQiLCJ2YXJpYW50IiwiaWNvbiIsInNsZXR0Vmlsa8OlcklkIiwiX2MzIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==