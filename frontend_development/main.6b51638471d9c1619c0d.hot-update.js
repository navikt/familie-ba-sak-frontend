"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/context/AppContext.tsx"
/*!*********************************************!*\
  !*** ./src/frontend/context/AppContext.tsx ***!
  \*********************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppProvider: () => (/* binding */ AppProvider),
/* harmony export */   useAppContext: () => (/* binding */ useAppContext)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_familie_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @navikt/familie-http */ "./node_modules/@navikt/familie-http/dist/index.js");
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/familie-typer */ "./node_modules/@navikt/familie-typer/dist/index.js");
/* harmony import */ var _AuthContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AuthContext */ "./src/frontend/context/AuthContext.tsx");
/* harmony import */ var _hooks_useFeatureToggles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../hooks/useFeatureToggles */ "./src/frontend/hooks/useFeatureToggles.ts");
/* harmony import */ var _ikoner_StatusIkon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ikoner/StatusIkon */ "./src/frontend/ikoner/StatusIkon.tsx");
/* harmony import */ var _typer_behandling__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../typer/behandling */ "./src/frontend/typer/behandling.ts");
/* harmony import */ var _typer_featureToggles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../typer/featureToggles */ "./src/frontend/typer/featureToggles.ts");
/* harmony import */ var _typer_person__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../typer/person */ "./src/frontend/typer/person.ts");
/* harmony import */ var _utils_behandling__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/behandling */ "./src/frontend/utils/behandling.ts");
/* harmony import */ var _utils_commons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/commons */ "./src/frontend/utils/commons.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _s = __webpack_require__.$Refresh$.signature(),
  _s2 = __webpack_require__.$Refresh$.signature();
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }












var initalState = {
  tittel: '',
  visModal: false
};
var tilgangModal = function tilgangModal(data, lukkModal) {
  return {
    tittel: 'Diskresjonskode',
    visModal: !data.saksbehandlerHarTilgang,
    onClose: function onClose() {
      return lukkModal();
    },
    innhold: function innhold() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.HStack, {
        gap: "4",
        align: "center",
        marginBlock: "2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ikoner_StatusIkon__WEBPACK_IMPORTED_MODULE_7__["default"], {
        status: _ikoner_StatusIkon__WEBPACK_IMPORTED_MODULE_7__.Status.FEIL
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.BodyShort, null, "Bruker har diskresjonskode ".concat(_typer_person__WEBPACK_IMPORTED_MODULE_10__.adressebeskyttelsestyper[data.adressebeskyttelsegradering])));
    },
    actions: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.Button, {
      key: "lukk",
      variant: "primary",
      size: "small",
      onClick: lukkModal,
      children: "Lukk"
    })]
  };
};
var AppContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
var AppProvider = function AppProvider(props) {
  _s();
  var _useAuthContext = (0,_AuthContext__WEBPACK_IMPORTED_MODULE_5__.useAuthContext)(),
    autentisert = _useAuthContext.autentisert,
    innloggetSaksbehandler = _useAuthContext.innloggetSaksbehandler;
  var _useHttp = (0,_navikt_familie_http__WEBPACK_IMPORTED_MODULE_3__.useHttp)(),
    request = _useHttp.request,
    systemetLaster = _useHttp.systemetLaster;
  var toggles = (0,_hooks_useFeatureToggles__WEBPACK_IMPORTED_MODULE_6__.useFeatureToggles)();
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1___default().useState(initalState),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    appInfoModal = _React$useState2[0],
    settAppInfoModal = _React$useState2[1];
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}),
    _useState2 = _slicedToArray(_useState, 2),
    toasts = _useState2[0],
    settToasts = _useState2[1];
  var lukkModal = function lukkModal() {
    settAppInfoModal(initalState);
  };
  var hentPerson = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(brukerIdent) {
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            return _context.a(2, request({
              method: 'POST',
              url: '/familie-ba-sak/api/person/enkel',
              data: {
                ident: brukerIdent
              }
            }).then(function (ressurs) {
              if ('data' in ressurs && ressurs.data.harTilgang === false) {
                settAppInfoModal(tilgangModal({
                  saksbehandlerHarTilgang: false,
                  adressebeskyttelsegradering: ressurs.data.adressebeskyttelseGradering
                }, lukkModal));
              }
              return ressurs;
            }));
        }
      }, _callee);
    }));
    return function hentPerson(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var sjekkTilgang = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(brukerIdent) {
      var visSystemetLaster,
        _args2 = arguments;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            visSystemetLaster = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : true;
            return _context2.a(2, request({
              method: 'POST',
              url: '/familie-ba-sak/api/tilgang',
              data: {
                brukerIdent: brukerIdent
              },
              påvirkerSystemLaster: visSystemetLaster
            }).then(function (ressurs) {
              if (ressurs.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_4__.RessursStatus.SUKSESS) {
                settAppInfoModal(tilgangModal(ressurs.data, lukkModal));
                return ressurs.data.saksbehandlerHarTilgang;
              } else {
                return false;
              }
            }));
        }
      }, _callee2);
    }));
    return function sjekkTilgang(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var hentSaksbehandlerRolle = function hentSaksbehandlerRolle() {
    var rolle = _typer_behandling__WEBPACK_IMPORTED_MODULE_8__.BehandlerRolle.UKJENT;
    if (innloggetSaksbehandler && innloggetSaksbehandler.groups) {
      innloggetSaksbehandler.groups.forEach(function (id) {
        rolle = rolle < (0,_utils_behandling__WEBPACK_IMPORTED_MODULE_11__.gruppeIdTilRolle)(id) ? (0,_utils_behandling__WEBPACK_IMPORTED_MODULE_11__.gruppeIdTilRolle)(id) : rolle;
      });
    }
    if (innloggetSaksbehandler && rolle === _typer_behandling__WEBPACK_IMPORTED_MODULE_8__.BehandlerRolle.UKJENT) {
      (0,_navikt_familie_http__WEBPACK_IMPORTED_MODULE_3__.loggFeil)(undefined, innloggetSaksbehandler, 'Saksbehandler tilhører ingen av de definerte tilgangsgruppene.');
      (0,_utils_commons__WEBPACK_IMPORTED_MODULE_12__.tilFeilside)();
    }
    return rolle;
  };
  var harInnloggetSaksbehandlerSkrivetilgang = function harInnloggetSaksbehandlerSkrivetilgang() {
    var rolle = hentSaksbehandlerRolle();
    return rolle >= _typer_behandling__WEBPACK_IMPORTED_MODULE_8__.BehandlerRolle.SAKSBEHANDLER;
  };
  var harInnloggetSaksbehandlerSuperbrukerTilgang = function harInnloggetSaksbehandlerSuperbrukerTilgang() {
    var _innloggetSaksbehandl;
    return innloggetSaksbehandler === null || innloggetSaksbehandler === void 0 || (_innloggetSaksbehandl = innloggetSaksbehandler.groups) === null || _innloggetSaksbehandl === void 0 ? void 0 : _innloggetSaksbehandl.includes(_utils_behandling__WEBPACK_IMPORTED_MODULE_11__.gruppeIdTilSuperbrukerRolle);
  };
  var skalObfuskereData = toggles[_typer_featureToggles__WEBPACK_IMPORTED_MODULE_9__.FeatureToggle.skalObfuskereData] && !harInnloggetSaksbehandlerSkrivetilgang();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(AppContext.Provider, {
    value: {
      autentisert: autentisert,
      hentSaksbehandlerRolle: hentSaksbehandlerRolle,
      innloggetSaksbehandler: innloggetSaksbehandler,
      harInnloggetSaksbehandlerSkrivetilgang: harInnloggetSaksbehandlerSkrivetilgang,
      harInnloggetSaksbehandlerSuperbrukerTilgang: harInnloggetSaksbehandlerSuperbrukerTilgang,
      appInfoModal: appInfoModal,
      settToast: function settToast(toastId, toast) {
        return settToasts(_objectSpread(_objectSpread({}, toasts), {}, _defineProperty({}, toastId, toast)));
      },
      settToasts: settToasts,
      sjekkTilgang: sjekkTilgang,
      systemetLaster: systemetLaster,
      toasts: toasts,
      hentPerson: hentPerson,
      skalObfuskereData: skalObfuskereData
    }
  }, props.children);
};
_s(AppProvider, "19o279ZRI90tXitt8FlVqRhwl2g=", false, function () {
  return [_AuthContext__WEBPACK_IMPORTED_MODULE_5__.useAuthContext, _navikt_familie_http__WEBPACK_IMPORTED_MODULE_3__.useHttp, _hooks_useFeatureToggles__WEBPACK_IMPORTED_MODULE_6__.useFeatureToggles];
});
_c = AppProvider;
var useAppContext = function useAppContext() {
  _s2();
  var context = react__WEBPACK_IMPORTED_MODULE_1___default().useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext må brukes innenfor AppProvider');
  }
  return context;
};
_s2(useAppContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");

var _c;
__webpack_require__.$Refresh$.register(_c, "AppProvider");

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

/***/ "./src/frontend/ikoner/KontorIkonGrønn.tsx"
/*!*************************************************!*\
  !*** ./src/frontend/ikoner/KontorIkonGrønn.tsx ***!
  \*************************************************/
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
/* harmony import */ var _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/ds-tokens/dist/tokens */ "./node_modules/@navikt/ds-tokens/dist/tokens.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }




var IkonSirkel = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].span(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    border-color: ", ";\n    border-radius: 50%;\n    background-color: ", ";\n    display: inline-grid;\n    place-items: center;\n    height: ", "px;\n    width: ", "px;\n    color: white;\n"])), function (props) {
  return props.$color;
}, function (props) {
  return props.$color;
}, function (props) {
  return props.$height;
}, function (props) {
  return props.$width;
});
_c = IkonSirkel;
var KontorIkonGrønn = function KontorIkonGrønn(_ref) {
  var className = _ref.className,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? '24' : _ref$height,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? '24' : _ref$width,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.AGreen600 : _ref$color;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(IkonSirkel, {
    $height: height,
    $width: width,
    $color: color
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__.Buildings3Icon, {
    height: height === '24' ? 20 : 28,
    width: width === '24' ? 20 : 28,
    className: className
  }));
};
_c2 = KontorIkonGrønn;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (KontorIkonGrønn);
var _c, _c2;
__webpack_require__.$Refresh$.register(_c, "IkonSirkel");
__webpack_require__.$Refresh$.register(_c2, "KontorIkonGr\xF8nn");

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
var OkIkon = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__.CheckmarkCircleFillIcon)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    color: var(--a-icon-success);\n    font-size: 1.5rem;\n    min-width: 1.5rem;\n"])));
_c = OkIkon;
var FeilIkon = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__.XMarkOctagonFillIcon)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    color: var(--a-icon-danger);\n    font-size: 1.5rem;\n    min-width: 1.5rem;\n"])));
_c2 = FeilIkon;
var AdvarselIkon = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__.ExclamationmarkTriangleFillIcon)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    color: var(--a-icon-warning);\n    font-size: 1.5rem;\n    min-width: 1.5rem;\n"])));
_c3 = AdvarselIkon;
var InfoIkon = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__.InformationSquareFillIcon)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    color: var(--a-icon-info);\n    font-size: 1.5rem;\n    min-width: 1.5rem;\n"])));
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

/***/ "./src/frontend/sider/ManuellJournalføring/AvsenderPanel.tsx"
/*!*******************************************************************!*\
  !*** ./src/frontend/sider/ManuellJournalføring/AvsenderPanel.tsx ***!
  \*******************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AvsenderPanel: () => (/* binding */ AvsenderPanel)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/familie-skjema */ "./node_modules/@navikt/familie-skjema/dist/index.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module './AvsenderPanel.module.css'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _DeltagerInfo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DeltagerInfo */ "./src/frontend/sider/ManuellJournalføring/DeltagerInfo.tsx");
/* harmony import */ var _ManuellJournalf_ringContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ManuellJournalføringContext */ "./src/frontend/sider/ManuellJournalføring/ManuellJournalføringContext.tsx");
/* harmony import */ var _ikoner_EmailIkon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../ikoner/EmailIkon */ "./src/frontend/ikoner/EmailIkon.tsx");
/* harmony import */ var _utils_formatter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/formatter */ "./src/frontend/utils/formatter.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject,
  _s = __webpack_require__.$Refresh$.signature();
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }










var StyledExpansionCard = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.ExpansionCard)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    margin-top: 1rem;\n"])));
_c = StyledExpansionCard;
var AvsenderPanel = function AvsenderPanel() {
  _s();
  var _skjema$felter$avsend;
  var _useManuellJournalfør = (0,_ManuellJournalf_ringContext__WEBPACK_IMPORTED_MODULE_8__["useManuellJournalføringContext"])(),
    skjema = _useManuellJournalfør.skjema,
    erLesevisning = _useManuellJournalfør.erLesevisning,
    settAvsenderLikBruker = _useManuellJournalfør.settAvsenderLikBruker,
    tilbakestillAvsender = _useManuellJournalfør.tilbakestillAvsender,
    erDigitaltInnsendtDokument = _useManuellJournalfør.erDigitaltInnsendtDokument;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    åpen = _useState2[0],
    settÅpen = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    brukerErAvsender = _useState4[0],
    settBrukerErAvsender = _useState4[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (skjema.visFeilmeldinger && (skjema.felter.avsenderNavn.valideringsstatus === _navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_5__.Valideringsstatus.FEIL || skjema.felter.avsenderIdent.valideringsstatus === _navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_5__.Valideringsstatus.FEIL)) {
      settÅpen(true);
    }
  }, [skjema.visFeilmeldinger, skjema.felter.avsenderNavn.valideringsstatus, skjema.felter.avsenderIdent.valideringsstatus]);
  var lesevisning = erLesevisning() || erDigitaltInnsendtDokument;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(StyledExpansionCard, {
    open: åpen,
    onToggle: function onToggle() {
      settÅpen(!åpen);
    },
    size: "small",
    "aria-label": "Avsenderpanel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.ExpansionCard.Header, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.ExpansionCard.Title, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_DeltagerInfo__WEBPACK_IMPORTED_MODULE_7__.DeltagerInfo, {
    ikon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ikoner_EmailIkon__WEBPACK_IMPORTED_MODULE_9__.EmailIkon, {
      filled: åpen,
      width: 48,
      height: 48
    }),
    navn: skjema.felter.avsenderNavn.verdi || 'Ukjent avsender',
    ident: (0,_utils_formatter__WEBPACK_IMPORTED_MODULE_10__.formaterIdent)((_skjema$felter$avsend = skjema.felter.avsenderIdent.verdi) !== null && _skjema$felter$avsend !== void 0 ? _skjema$felter$avsend : ''),
    undertittel: "Avsender"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.ExpansionCard.Content, {
    className: Object(function webpackMissingModule() { var e = new Error("Cannot find module './AvsenderPanel.module.css'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())
  }, lesevisning ? brukerErAvsender ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.BodyShort, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('skjemaelement', 'lese-felt'),
    children: 'Avsender er bruker'
  }) : null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Checkbox, {
    value: 'Avsender er bruker',
    checked: brukerErAvsender,
    onChange: function onChange() {
      if (brukerErAvsender) {
        tilbakestillAvsender();
      } else {
        settAvsenderLikBruker();
      }
      settBrukerErAvsender(!brukerErAvsender);
    }
  }, "Avsender er bruker"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.TextField, _extends({}, skjema.felter.avsenderNavn.hentNavInputProps(skjema.visFeilmeldinger), {
    readOnly: lesevisning,
    label: 'Navn',
    size: 'medium',
    placeholder: 'Navn',
    disabled: brukerErAvsender
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.TextField, _extends({}, skjema.felter.avsenderIdent.hentNavInputProps(skjema.visFeilmeldinger), {
    readOnly: lesevisning,
    label: 'Ident',
    size: 'medium',
    placeholder: 'Fnr/dnr/orgnr',
    disabled: brukerErAvsender
  }))));
};
_s(AvsenderPanel, "pGEcaYtVoubpHAq3a3kV/LgEqXg=", false, function () {
  return [_ManuellJournalf_ringContext__WEBPACK_IMPORTED_MODULE_8__["useManuellJournalføringContext"]];
});
_c2 = AvsenderPanel;
var _c, _c2;
__webpack_require__.$Refresh$.register(_c, "StyledExpansionCard");
__webpack_require__.$Refresh$.register(_c2, "AvsenderPanel");

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

/***/ "./src/frontend/sider/ManuellJournalføring/BrukerPanel.tsx"
/*!*****************************************************************!*\
  !*** ./src/frontend/sider/ManuellJournalføring/BrukerPanel.tsx ***!
  \*****************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BrukerPanel: () => (/* binding */ BrukerPanel)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @navikt/aksel-icons */ "./node_modules/@navikt/aksel-icons/dist/react/esm/index.js");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/ds-tokens/dist/tokens */ "./node_modules/@navikt/ds-tokens/dist/tokens.js");
/* harmony import */ var _navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @navikt/familie-skjema */ "./node_modules/@navikt/familie-skjema/dist/index.js");
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @navikt/familie-typer */ "./node_modules/@navikt/familie-typer/dist/index.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module './BrukerPanel.module.css'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _DeltagerInfo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DeltagerInfo */ "./src/frontend/sider/ManuellJournalføring/DeltagerInfo.tsx");
/* harmony import */ var _ManuellJournalf_ringContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ManuellJournalføringContext */ "./src/frontend/sider/ManuellJournalføring/ManuellJournalføringContext.tsx");
/* harmony import */ var _ikoner_KontoSirkel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../ikoner/KontoSirkel */ "./src/frontend/ikoner/KontoSirkel.tsx");
/* harmony import */ var _komponenter_Samhandler_SamhandlerTabell__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../komponenter/Samhandler/SamhandlerTabell */ "./src/frontend/komponenter/Samhandler/SamhandlerTabell.tsx");
/* harmony import */ var _komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../komponenter/Samhandler/useSamhandler */ "./src/frontend/komponenter/Samhandler/useSamhandler.ts");
/* harmony import */ var _typer_fagsak__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../typer/fagsak */ "./src/frontend/typer/fagsak.ts");
/* harmony import */ var _utils_formatter__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../utils/formatter */ "./src/frontend/utils/formatter.ts");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../utils/validators */ "./src/frontend/utils/validators.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject,
  _templateObject2,
  _templateObject3,
  _templateObject4,
  _templateObject5,
  _templateObject6,
  _s = __webpack_require__.$Refresh$.signature();
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
















var FlexDiv = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    display: flex;\n    margin-bottom: 1.5rem;\n"])));
_c = FlexDiv;
var StyledButton = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Button)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    margin-left: 1rem;\n    margin-top: auto;\n    width: 10rem;\n"])));
_c2 = StyledButton;
var StyledExpansionCard = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.ExpansionCard)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    margin-top: 1rem;\n    width: 100%;\n"])));
_c3 = StyledExpansionCard;
var StyledSelect = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Select)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    margin: 0.75rem 0 1.25rem;\n"])));
_c4 = StyledSelect;
var ToppMargin = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    margin-top: 2rem;\n"])));
_c5 = ToppMargin;
var StyledAlert = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Alert)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n    margin-top: 2rem;\n"])));
_c6 = StyledAlert;
var BrukerPanel = function BrukerPanel() {
  _s();
  var _skjema$felter$bruker2, _skjema$felter$bruker3, _skjema$felter$bruker4;
  var _useManuellJournalfør = (0,_ManuellJournalf_ringContext__WEBPACK_IMPORTED_MODULE_10__["useManuellJournalføringContext"])(),
    skjema = _useManuellJournalfør.skjema,
    endreBrukerOgSettNormalFagsak = _useManuellJournalfør.endreBrukerOgSettNormalFagsak,
    erLesevisning = _useManuellJournalfør.erLesevisning,
    institusjonsfagsaker = _useManuellJournalfør.institusjonsfagsaker,
    settMinimalFagsakTilInstitusjonsfagsak = _useManuellJournalfør.settMinimalFagsakTilInstitusjonsfagsak,
    settMinimalFagsakTilNormalFagsakForPerson = _useManuellJournalfør.settMinimalFagsakTilNormalFagsakForPerson,
    kanKnyttesTilInstitusjonsfagsak = _useManuellJournalfør.kanKnyttesTilInstitusjonsfagsak;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    åpen = _useState2[0],
    settÅpen = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    feilMelding = _useState4[0],
    settFeilMelding = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    spinner = _useState6[0],
    settSpinner = _useState6[1];
  var nyIdent = (0,_navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_6__.useFelt)({
    verdi: '',
    valideringsfunksjon: _utils_validators__WEBPACK_IMPORTED_MODULE_16__.identValidator
  });
  var _useSamhandlerRequest = (0,_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_13__.useSamhandlerRequest)(false),
    hentSamhandler = _useSamhandlerRequest.hentSamhandler;
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    valgtInstitusjon = _useState8[0],
    settValgtInstitusjon = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState0 = _slicedToArray(_useState9, 2),
    samhandlerFeilmelding = _useState0[0],
    settSamhandlerFeilmelding = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState10 = _slicedToArray(_useState1, 2),
    erFagsaktypePanelÅpnet = _useState10[0],
    settErFagsaktypePanelÅpnet = _useState10[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    settFeilMelding('');
  }, [nyIdent.verdi]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (skjema.visFeilmeldinger && skjema.felter.bruker.valideringsstatus === _navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_6__.Valideringsstatus.FEIL) {
      settÅpen(true);
    }
  }, [skjema.visFeilmeldinger, skjema.felter.bruker.valideringsstatus]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    settSamhandlerFeilmelding('');
    if (valgtInstitusjon !== '' && valgtInstitusjon !== 'ny-institusjon') {
      settMinimalFagsakTilInstitusjonsfagsak(valgtInstitusjon);
      hentSamhandler(valgtInstitusjon).then(function (ressurs) {
        if (ressurs.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_7__.RessursStatus.SUKSESS) {
          skjema.felter.samhandler.validerOgSettFelt(ressurs.data);
        } else {
          skjema.felter.samhandler.nullstill();
          settSamhandlerFeilmelding('Kan ikke hente opplysninger om institusjon');
        }
      });
    } else {
      var _skjema$felter$bruker;
      settMinimalFagsakTilNormalFagsakForPerson((_skjema$felter$bruker = skjema.felter.bruker.verdi) === null || _skjema$felter$bruker === void 0 ? void 0 : _skjema$felter$bruker.personIdent);
      skjema.felter.samhandler.nullstill();
    }
  }, [valgtInstitusjon]);
  var erBrukerPåInstitusjon = skjema.felter.fagsakType.verdi === _typer_fagsak__WEBPACK_IMPORTED_MODULE_14__.FagsakType.INSTITUSJON;
  var oppdaterFagsaktype = function oppdaterFagsaktype(nyFagsakType) {
    skjema.felter.fagsakType.validerOgSettFelt(nyFagsakType);
    if (nyFagsakType !== _typer_fagsak__WEBPACK_IMPORTED_MODULE_14__.FagsakType.INSTITUSJON) {
      settValgtInstitusjon('');
    }
  };
  var nullstillFagsaktype = function nullstillFagsaktype() {
    oppdaterFagsaktype(_typer_fagsak__WEBPACK_IMPORTED_MODULE_14__.FagsakType.NORMAL);
    settErFagsaktypePanelÅpnet(false);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(StyledExpansionCard, {
    open: åpen,
    onToggle: function onToggle() {
      settÅpen(!åpen);
    },
    size: "small",
    "aria-label": "Brukerpanel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.ExpansionCard.Header, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.ExpansionCard.Title, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_DeltagerInfo__WEBPACK_IMPORTED_MODULE_9__.DeltagerInfo, {
    ikon: erBrukerPåInstitusjon ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__.Buildings3FillIcon, {
      color: _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.BgAccentStrong,
      width: 48,
      height: 48
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ikoner_KontoSirkel__WEBPACK_IMPORTED_MODULE_11__.KontoSirkel, {
      filled: åpen,
      width: 48,
      height: 48
    }),
    navn: ((_skjema$felter$bruker2 = skjema.felter.bruker.verdi) === null || _skjema$felter$bruker2 === void 0 ? void 0 : _skjema$felter$bruker2.navn) || 'Ukjent bruker',
    undertittel: erBrukerPåInstitusjon ? 'Søker/Bruker er på institusjon' : 'Søker/Bruker',
    ident: (0,_utils_formatter__WEBPACK_IMPORTED_MODULE_15__.formaterIdent)((_skjema$felter$bruker3 = (_skjema$felter$bruker4 = skjema.felter.bruker.verdi) === null || _skjema$felter$bruker4 === void 0 ? void 0 : _skjema$felter$bruker4.personIdent) !== null && _skjema$felter$bruker3 !== void 0 ? _skjema$felter$bruker3 : '')
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.ExpansionCard.Content, {
    className: Object(function webpackMissingModule() { var e = new Error("Cannot find module './BrukerPanel.module.css'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())
  }, !erLesevisning() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(FlexDiv, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.TextField, _extends({}, nyIdent.hentNavInputProps(!!feilMelding), {
    error: nyIdent.hentNavInputProps(!!feilMelding).feil || feilMelding,
    label: 'Endre bruker',
    description: 'Skriv inn brukers/søkers fødselsnummer eller D-nummer',
    size: "small"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(StyledButton, {
    onClick: function onClick() {
      if (nyIdent.valideringsstatus === _navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_6__.Valideringsstatus.OK) {
        settSpinner(true);
        nullstillFagsaktype();
        endreBrukerOgSettNormalFagsak(nyIdent.verdi)["finally"](function () {
          settSpinner(false);
        });
      } else {
        settFeilMelding('Personident er ugyldig');
      }
    },
    children: 'Endre bruker',
    loading: spinner,
    size: "small",
    variant: "secondary"
  })), kanKnyttesTilInstitusjonsfagsak() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.ReadMore, {
    size: "medium",
    header: "S\xF8ker er en institusjon eller enslig mindre\xE5rig",
    open: erFagsaktypePanelÅpnet,
    onClick: function onClick() {
      return settErFagsaktypePanelÅpnet(!erFagsaktypePanelÅpnet);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(StyledSelect, {
    label: "Fagsaktype",
    size: "small",
    onChange: function onChange(event) {
      return oppdaterFagsaktype(event.target.value);
    },
    value: skjema.felter.fagsakType.verdi
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("option", {
    value: _typer_fagsak__WEBPACK_IMPORTED_MODULE_14__.FagsakType.NORMAL
  }, "Velg"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("option", {
    value: _typer_fagsak__WEBPACK_IMPORTED_MODULE_14__.FagsakType.INSTITUSJON
  }, "Institusjon"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("option", {
    value: _typer_fagsak__WEBPACK_IMPORTED_MODULE_14__.FagsakType.BARN_ENSLIG_MINDREÅRIG
  }, "Enslig mindre\xE5rig")), erBrukerPåInstitusjon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(StyledSelect, {
    label: "Institusjon",
    size: "small",
    onChange: function onChange(event) {
      return settValgtInstitusjon(event.target.value);
    },
    value: valgtInstitusjon
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("option", {
    value: ""
  }, "Velg"), institusjonsfagsaker.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_7__.RessursStatus.SUKSESS && institusjonsfagsaker.data.map(function (_ref) {
    var institusjon = _ref.institusjon,
      status = _ref.status;
    return institusjon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("option", {
      value: institusjon.orgNummer,
      key: institusjon.orgNummer
    }, (0,_utils_formatter__WEBPACK_IMPORTED_MODULE_15__.formaterIdent)(institusjon.orgNummer), " |", ' ', _typer_fagsak__WEBPACK_IMPORTED_MODULE_14__.fagsakStatus[status].navn);
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("option", {
    value: "ny-institusjon"
  }, "Ny institusjon")), skjema.felter.fagsakType.verdi !== _typer_fagsak__WEBPACK_IMPORTED_MODULE_14__.FagsakType.NORMAL && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "tertiary",
    size: "xsmall",
    onClick: nullstillFagsaktype,
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowUndoIcon, null)
  }, "Tilbakestill")), valgtInstitusjon === 'ny-institusjon' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(StyledAlert, {
    variant: "warning",
    inline: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Heading, {
    size: "xsmall",
    level: "3"
  }, "Institusjonssak p\xE5 bruker m\xE5 opprettes"), "For \xE5 journalf\xF8re dokumentet, m\xE5 ny fagsak av typen institusjon opprettes via saksbehandlerl\xF8sningen. N\xE5r fagsaken er tilknyttet godkjent institusjon, kan dokumentet journalf\xF8res.")), samhandlerFeilmelding && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(StyledAlert, {
    variant: "warning",
    inline: true
  }, samhandlerFeilmelding), skjema.felter.samhandler.verdi !== undefined && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(ToppMargin, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_komponenter_Samhandler_SamhandlerTabell__WEBPACK_IMPORTED_MODULE_12__.SamhandlerTabell, {
    samhandler: skjema.felter.samhandler.verdi
  }))));
};
_s(BrukerPanel, "5sIta4ySv74NIvyX3i7r5u2mWPM=", false, function () {
  return [_ManuellJournalf_ringContext__WEBPACK_IMPORTED_MODULE_10__["useManuellJournalføringContext"], _navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_6__.useFelt, _komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_13__.useSamhandlerRequest];
});
_c7 = BrukerPanel;
var _c, _c2, _c3, _c4, _c5, _c6, _c7;
__webpack_require__.$Refresh$.register(_c, "FlexDiv");
__webpack_require__.$Refresh$.register(_c2, "StyledButton");
__webpack_require__.$Refresh$.register(_c3, "StyledExpansionCard");
__webpack_require__.$Refresh$.register(_c4, "StyledSelect");
__webpack_require__.$Refresh$.register(_c5, "ToppMargin");
__webpack_require__.$Refresh$.register(_c6, "StyledAlert");
__webpack_require__.$Refresh$.register(_c7, "BrukerPanel");

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
/******/ 	__webpack_require__.h = () => ("9208505213fd1ab0ea74")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi42YjUxNjM4NDcxZDljMTYxOWMwZC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFDQSx1S0FBQUEsQ0FBQSxFQUFBQyxDQUFBLEVBQUFDLENBQUEsd0JBQUFDLE1BQUEsR0FBQUEsTUFBQSxPQUFBQyxDQUFBLEdBQUFGLENBQUEsQ0FBQUcsUUFBQSxrQkFBQUMsQ0FBQSxHQUFBSixDQUFBLENBQUFLLFdBQUEsOEJBQUFDLEVBQUFOLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUMsQ0FBQSxHQUFBTCxDQUFBLElBQUFBLENBQUEsQ0FBQU0sU0FBQSxZQUFBQyxTQUFBLEdBQUFQLENBQUEsR0FBQU8sU0FBQSxFQUFBQyxDQUFBLEdBQUFDLE1BQUEsQ0FBQUMsTUFBQSxDQUFBTCxDQUFBLENBQUFDLFNBQUEsVUFBQUssbUJBQUEsQ0FBQUgsQ0FBQSx1QkFBQVYsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUUsQ0FBQSxFQUFBQyxDQUFBLEVBQUFHLENBQUEsRUFBQUksQ0FBQSxNQUFBQyxDQUFBLEdBQUFYLENBQUEsUUFBQVksQ0FBQSxPQUFBQyxDQUFBLEtBQUFGLENBQUEsS0FBQWIsQ0FBQSxLQUFBZ0IsQ0FBQSxFQUFBcEIsQ0FBQSxFQUFBcUIsQ0FBQSxFQUFBQyxDQUFBLEVBQUFOLENBQUEsRUFBQU0sQ0FBQSxDQUFBQyxJQUFBLENBQUF2QixDQUFBLE1BQUFzQixDQUFBLFdBQUFBLEVBQUFyQixDQUFBLEVBQUFDLENBQUEsV0FBQU0sQ0FBQSxHQUFBUCxDQUFBLEVBQUFRLENBQUEsTUFBQUcsQ0FBQSxHQUFBWixDQUFBLEVBQUFtQixDQUFBLENBQUFmLENBQUEsR0FBQUYsQ0FBQSxFQUFBbUIsQ0FBQSxnQkFBQUMsRUFBQXBCLENBQUEsRUFBQUUsQ0FBQSxTQUFBSyxDQUFBLEdBQUFQLENBQUEsRUFBQVUsQ0FBQSxHQUFBUixDQUFBLEVBQUFILENBQUEsT0FBQWlCLENBQUEsSUFBQUYsQ0FBQSxLQUFBVixDQUFBLElBQUFMLENBQUEsR0FBQWdCLENBQUEsQ0FBQU8sTUFBQSxFQUFBdkIsQ0FBQSxVQUFBSyxDQUFBLEVBQUFFLENBQUEsR0FBQVMsQ0FBQSxDQUFBaEIsQ0FBQSxHQUFBcUIsQ0FBQSxHQUFBSCxDQUFBLENBQUFGLENBQUEsRUFBQVEsQ0FBQSxHQUFBakIsQ0FBQSxLQUFBTixDQUFBLFFBQUFJLENBQUEsR0FBQW1CLENBQUEsS0FBQXJCLENBQUEsTUFBQVEsQ0FBQSxHQUFBSixDQUFBLEVBQUFDLENBQUEsR0FBQUQsQ0FBQSxZQUFBQyxDQUFBLFdBQUFELENBQUEsTUFBQUEsQ0FBQSxNQUFBUixDQUFBLElBQUFRLENBQUEsT0FBQWMsQ0FBQSxNQUFBaEIsQ0FBQSxHQUFBSixDQUFBLFFBQUFvQixDQUFBLEdBQUFkLENBQUEsUUFBQUMsQ0FBQSxNQUFBVSxDQUFBLENBQUFDLENBQUEsR0FBQWhCLENBQUEsRUFBQWUsQ0FBQSxDQUFBZixDQUFBLEdBQUFJLENBQUEsT0FBQWMsQ0FBQSxHQUFBRyxDQUFBLEtBQUFuQixDQUFBLEdBQUFKLENBQUEsUUFBQU0sQ0FBQSxNQUFBSixDQUFBLElBQUFBLENBQUEsR0FBQXFCLENBQUEsTUFBQWpCLENBQUEsTUFBQU4sQ0FBQSxFQUFBTSxDQUFBLE1BQUFKLENBQUEsRUFBQWUsQ0FBQSxDQUFBZixDQUFBLEdBQUFxQixDQUFBLEVBQUFoQixDQUFBLGNBQUFILENBQUEsSUFBQUosQ0FBQSxhQUFBbUIsQ0FBQSxRQUFBSCxDQUFBLE9BQUFkLENBQUEscUJBQUFFLENBQUEsRUFBQVcsQ0FBQSxFQUFBUSxDQUFBLFFBQUFULENBQUEsWUFBQVUsU0FBQSx1Q0FBQVIsQ0FBQSxVQUFBRCxDQUFBLElBQUFLLENBQUEsQ0FBQUwsQ0FBQSxFQUFBUSxDQUFBLEdBQUFoQixDQUFBLEdBQUFRLENBQUEsRUFBQUwsQ0FBQSxHQUFBYSxDQUFBLEdBQUF4QixDQUFBLEdBQUFRLENBQUEsT0FBQVQsQ0FBQSxHQUFBWSxDQUFBLE1BQUFNLENBQUEsS0FBQVYsQ0FBQSxLQUFBQyxDQUFBLEdBQUFBLENBQUEsUUFBQUEsQ0FBQSxTQUFBVSxDQUFBLENBQUFmLENBQUEsUUFBQWtCLENBQUEsQ0FBQWIsQ0FBQSxFQUFBRyxDQUFBLEtBQUFPLENBQUEsQ0FBQWYsQ0FBQSxHQUFBUSxDQUFBLEdBQUFPLENBQUEsQ0FBQUMsQ0FBQSxHQUFBUixDQUFBLGFBQUFJLENBQUEsTUFBQVIsQ0FBQSxRQUFBQyxDQUFBLEtBQUFILENBQUEsWUFBQUwsQ0FBQSxHQUFBTyxDQUFBLENBQUFGLENBQUEsV0FBQUwsQ0FBQSxHQUFBQSxDQUFBLENBQUEwQixJQUFBLENBQUFuQixDQUFBLEVBQUFJLENBQUEsVUFBQWMsU0FBQSwyQ0FBQXpCLENBQUEsQ0FBQTJCLElBQUEsU0FBQTNCLENBQUEsRUFBQVcsQ0FBQSxHQUFBWCxDQUFBLENBQUE0QixLQUFBLEVBQUFwQixDQUFBLFNBQUFBLENBQUEsb0JBQUFBLENBQUEsS0FBQVIsQ0FBQSxHQUFBTyxDQUFBLGVBQUFQLENBQUEsQ0FBQTBCLElBQUEsQ0FBQW5CLENBQUEsR0FBQUMsQ0FBQSxTQUFBRyxDQUFBLEdBQUFjLFNBQUEsdUNBQUFwQixDQUFBLGdCQUFBRyxDQUFBLE9BQUFELENBQUEsR0FBQVIsQ0FBQSxjQUFBQyxDQUFBLElBQUFpQixDQUFBLEdBQUFDLENBQUEsQ0FBQWYsQ0FBQSxRQUFBUSxDQUFBLEdBQUFWLENBQUEsQ0FBQXlCLElBQUEsQ0FBQXZCLENBQUEsRUFBQWUsQ0FBQSxPQUFBRSxDQUFBLGtCQUFBcEIsQ0FBQSxJQUFBTyxDQUFBLEdBQUFSLENBQUEsRUFBQVMsQ0FBQSxNQUFBRyxDQUFBLEdBQUFYLENBQUEsY0FBQWUsQ0FBQSxtQkFBQWEsS0FBQSxFQUFBNUIsQ0FBQSxFQUFBMkIsSUFBQSxFQUFBVixDQUFBLFNBQUFoQixDQUFBLEVBQUFJLENBQUEsRUFBQUUsQ0FBQSxRQUFBSSxDQUFBLFFBQUFTLENBQUEsZ0JBQUFWLFVBQUEsY0FBQW1CLGtCQUFBLGNBQUFDLDJCQUFBLEtBQUE5QixDQUFBLEdBQUFZLE1BQUEsQ0FBQW1CLGNBQUEsTUFBQXZCLENBQUEsTUFBQUwsQ0FBQSxJQUFBSCxDQUFBLENBQUFBLENBQUEsSUFBQUcsQ0FBQSxTQUFBVyxtQkFBQSxDQUFBZCxDQUFBLE9BQUFHLENBQUEsaUNBQUFILENBQUEsR0FBQVcsQ0FBQSxHQUFBbUIsMEJBQUEsQ0FBQXJCLFNBQUEsR0FBQUMsU0FBQSxDQUFBRCxTQUFBLEdBQUFHLE1BQUEsQ0FBQUMsTUFBQSxDQUFBTCxDQUFBLFlBQUFPLEVBQUFoQixDQUFBLFdBQUFhLE1BQUEsQ0FBQW9CLGNBQUEsR0FBQXBCLE1BQUEsQ0FBQW9CLGNBQUEsQ0FBQWpDLENBQUEsRUFBQStCLDBCQUFBLEtBQUEvQixDQUFBLENBQUFrQyxTQUFBLEdBQUFILDBCQUFBLEVBQUFoQixtQkFBQSxDQUFBZixDQUFBLEVBQUFNLENBQUEseUJBQUFOLENBQUEsQ0FBQVUsU0FBQSxHQUFBRyxNQUFBLENBQUFDLE1BQUEsQ0FBQUYsQ0FBQSxHQUFBWixDQUFBLFdBQUE4QixpQkFBQSxDQUFBcEIsU0FBQSxHQUFBcUIsMEJBQUEsRUFBQWhCLG1CQUFBLENBQUFILENBQUEsaUJBQUFtQiwwQkFBQSxHQUFBaEIsbUJBQUEsQ0FBQWdCLDBCQUFBLGlCQUFBRCxpQkFBQSxHQUFBQSxpQkFBQSxDQUFBSyxXQUFBLHdCQUFBcEIsbUJBQUEsQ0FBQWdCLDBCQUFBLEVBQUF6QixDQUFBLHdCQUFBUyxtQkFBQSxDQUFBSCxDQUFBLEdBQUFHLG1CQUFBLENBQUFILENBQUEsRUFBQU4sQ0FBQSxnQkFBQVMsbUJBQUEsQ0FBQUgsQ0FBQSxFQUFBUixDQUFBLGlDQUFBVyxtQkFBQSxDQUFBSCxDQUFBLDhEQUFBd0IsWUFBQSxZQUFBQSxhQUFBLGFBQUFDLENBQUEsRUFBQTdCLENBQUEsRUFBQThCLENBQUEsRUFBQXRCLENBQUE7QUFBQSxTQUFBRCxvQkFBQWYsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUgsQ0FBQSxRQUFBTyxDQUFBLEdBQUFLLE1BQUEsQ0FBQTBCLGNBQUEsUUFBQS9CLENBQUEsdUJBQUFSLENBQUEsSUFBQVEsQ0FBQSxRQUFBTyxtQkFBQSxZQUFBeUIsbUJBQUF4QyxDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxFQUFBSCxDQUFBLGFBQUFLLEVBQUFKLENBQUEsRUFBQUUsQ0FBQSxJQUFBVyxtQkFBQSxDQUFBZixDQUFBLEVBQUFFLENBQUEsWUFBQUYsQ0FBQSxnQkFBQXlDLE9BQUEsQ0FBQXZDLENBQUEsRUFBQUUsQ0FBQSxFQUFBSixDQUFBLFNBQUFFLENBQUEsR0FBQU0sQ0FBQSxHQUFBQSxDQUFBLENBQUFSLENBQUEsRUFBQUUsQ0FBQSxJQUFBMkIsS0FBQSxFQUFBekIsQ0FBQSxFQUFBc0MsVUFBQSxHQUFBekMsQ0FBQSxFQUFBMEMsWUFBQSxHQUFBMUMsQ0FBQSxFQUFBMkMsUUFBQSxHQUFBM0MsQ0FBQSxNQUFBRCxDQUFBLENBQUFFLENBQUEsSUFBQUUsQ0FBQSxJQUFBRSxDQUFBLGFBQUFBLENBQUEsY0FBQUEsQ0FBQSxtQkFBQVMsbUJBQUEsQ0FBQWYsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUgsQ0FBQTtBQUFBLFNBQUE0QyxtQkFBQXpDLENBQUEsRUFBQUgsQ0FBQSxFQUFBRCxDQUFBLEVBQUFFLENBQUEsRUFBQUksQ0FBQSxFQUFBZSxDQUFBLEVBQUFaLENBQUEsY0FBQUQsQ0FBQSxHQUFBSixDQUFBLENBQUFpQixDQUFBLEVBQUFaLENBQUEsR0FBQUcsQ0FBQSxHQUFBSixDQUFBLENBQUFxQixLQUFBLFdBQUF6QixDQUFBLGdCQUFBSixDQUFBLENBQUFJLENBQUEsS0FBQUksQ0FBQSxDQUFBb0IsSUFBQSxHQUFBM0IsQ0FBQSxDQUFBVyxDQUFBLElBQUFrQyxPQUFBLENBQUFDLE9BQUEsQ0FBQW5DLENBQUEsRUFBQW9DLElBQUEsQ0FBQTlDLENBQUEsRUFBQUksQ0FBQTtBQUFBLFNBQUEyQyxrQkFBQTdDLENBQUEsNkJBQUFILENBQUEsU0FBQUQsQ0FBQSxHQUFBa0QsU0FBQSxhQUFBSixPQUFBLFdBQUE1QyxDQUFBLEVBQUFJLENBQUEsUUFBQWUsQ0FBQSxHQUFBakIsQ0FBQSxDQUFBK0MsS0FBQSxDQUFBbEQsQ0FBQSxFQUFBRCxDQUFBLFlBQUFvRCxNQUFBaEQsQ0FBQSxJQUFBeUMsa0JBQUEsQ0FBQXhCLENBQUEsRUFBQW5CLENBQUEsRUFBQUksQ0FBQSxFQUFBOEMsS0FBQSxFQUFBQyxNQUFBLFVBQUFqRCxDQUFBLGNBQUFpRCxPQUFBakQsQ0FBQSxJQUFBeUMsa0JBQUEsQ0FBQXhCLENBQUEsRUFBQW5CLENBQUEsRUFBQUksQ0FBQSxFQUFBOEMsS0FBQSxFQUFBQyxNQUFBLFdBQUFqRCxDQUFBLEtBQUFnRCxLQUFBO0FBQUEsU0FBQUUsZUFBQXBELENBQUEsRUFBQUYsQ0FBQSxXQUFBdUQsZUFBQSxDQUFBckQsQ0FBQSxLQUFBc0QscUJBQUEsQ0FBQXRELENBQUEsRUFBQUYsQ0FBQSxLQUFBeUQsMkJBQUEsQ0FBQXZELENBQUEsRUFBQUYsQ0FBQSxLQUFBMEQsZ0JBQUE7QUFBQSxTQUFBQSxpQkFBQSxjQUFBaEMsU0FBQTtBQUFBLFNBQUErQiw0QkFBQXZELENBQUEsRUFBQW1CLENBQUEsUUFBQW5CLENBQUEsMkJBQUFBLENBQUEsU0FBQXlELGlCQUFBLENBQUF6RCxDQUFBLEVBQUFtQixDQUFBLE9BQUFwQixDQUFBLE1BQUEyRCxRQUFBLENBQUFqQyxJQUFBLENBQUF6QixDQUFBLEVBQUEyRCxLQUFBLDZCQUFBNUQsQ0FBQSxJQUFBQyxDQUFBLENBQUE0RCxXQUFBLEtBQUE3RCxDQUFBLEdBQUFDLENBQUEsQ0FBQTRELFdBQUEsQ0FBQUMsSUFBQSxhQUFBOUQsQ0FBQSxjQUFBQSxDQUFBLEdBQUErRCxLQUFBLENBQUFDLElBQUEsQ0FBQS9ELENBQUEsb0JBQUFELENBQUEsK0NBQUFpRSxJQUFBLENBQUFqRSxDQUFBLElBQUEwRCxpQkFBQSxDQUFBekQsQ0FBQSxFQUFBbUIsQ0FBQTtBQUFBLFNBQUFzQyxrQkFBQXpELENBQUEsRUFBQW1CLENBQUEsYUFBQUEsQ0FBQSxJQUFBQSxDQUFBLEdBQUFuQixDQUFBLENBQUFzQixNQUFBLE1BQUFILENBQUEsR0FBQW5CLENBQUEsQ0FBQXNCLE1BQUEsWUFBQXhCLENBQUEsTUFBQUksQ0FBQSxHQUFBNEQsS0FBQSxDQUFBM0MsQ0FBQSxHQUFBckIsQ0FBQSxHQUFBcUIsQ0FBQSxFQUFBckIsQ0FBQSxJQUFBSSxDQUFBLENBQUFKLENBQUEsSUFBQUUsQ0FBQSxDQUFBRixDQUFBLFVBQUFJLENBQUE7QUFBQSxTQUFBb0Qsc0JBQUF0RCxDQUFBLEVBQUF1QixDQUFBLFFBQUF4QixDQUFBLFdBQUFDLENBQUEsZ0NBQUFDLE1BQUEsSUFBQUQsQ0FBQSxDQUFBQyxNQUFBLENBQUFFLFFBQUEsS0FBQUgsQ0FBQSw0QkFBQUQsQ0FBQSxRQUFBRCxDQUFBLEVBQUFJLENBQUEsRUFBQUksQ0FBQSxFQUFBSSxDQUFBLEVBQUFTLENBQUEsT0FBQUwsQ0FBQSxPQUFBVixDQUFBLGlCQUFBRSxDQUFBLElBQUFQLENBQUEsR0FBQUEsQ0FBQSxDQUFBMEIsSUFBQSxDQUFBekIsQ0FBQSxHQUFBaUUsSUFBQSxRQUFBMUMsQ0FBQSxRQUFBWixNQUFBLENBQUFaLENBQUEsTUFBQUEsQ0FBQSxVQUFBZSxDQUFBLHVCQUFBQSxDQUFBLElBQUFoQixDQUFBLEdBQUFRLENBQUEsQ0FBQW1CLElBQUEsQ0FBQTFCLENBQUEsR0FBQTJCLElBQUEsTUFBQVAsQ0FBQSxDQUFBK0MsSUFBQSxDQUFBcEUsQ0FBQSxDQUFBNkIsS0FBQSxHQUFBUixDQUFBLENBQUFHLE1BQUEsS0FBQUMsQ0FBQSxHQUFBVCxDQUFBLGlCQUFBZCxDQUFBLElBQUFJLENBQUEsT0FBQUYsQ0FBQSxHQUFBRixDQUFBLHlCQUFBYyxDQUFBLFlBQUFmLENBQUEsZUFBQVcsQ0FBQSxHQUFBWCxDQUFBLGNBQUFZLE1BQUEsQ0FBQUQsQ0FBQSxNQUFBQSxDQUFBLDJCQUFBTixDQUFBLFFBQUFGLENBQUEsYUFBQWlCLENBQUE7QUFBQSxTQUFBa0MsZ0JBQUFyRCxDQUFBLFFBQUE4RCxLQUFBLENBQUFLLE9BQUEsQ0FBQW5FLENBQUEsVUFBQUEsQ0FBQTtBQUR5RjtBQUk1QjtBQUNKO0FBRUg7QUFFUDtBQUNnQjtBQUNMO0FBRUw7QUFDRztBQUVHO0FBQ3lCO0FBQ3JDO0FBZS9DLElBQU11RixXQUFtQixHQUFHO0VBQ3hCQyxNQUFNLEVBQUUsRUFBRTtFQUNWQyxRQUFRLEVBQUU7QUFDZCxDQUFDO0FBRUQsSUFBTUMsWUFBWSxHQUFHLFNBQWZBLFlBQVlBLENBQUlDLElBQWtCLEVBQUVDLFNBQXFCO0VBQUEsT0FBTTtJQUNqRUosTUFBTSxFQUFFLGlCQUFpQjtJQUN6QkMsUUFBUSxFQUFFLENBQUNFLElBQUksQ0FBQ0UsdUJBQXVCO0lBQ3ZDQyxPQUFPLEVBQUUsU0FBVEEsT0FBT0EsQ0FBQTtNQUFBLE9BQVFGLFNBQVMsQ0FBQyxDQUFDO0lBQUE7SUFDMUJHLE9BQU8sRUFBRSxTQUFUQSxPQUFPQSxDQUFBLEVBQVE7TUFDWCxvQkFDSTNCLDBEQUFBLENBQUNLLG9EQUFNO1FBQUN3QixHQUFHLEVBQUMsR0FBRztRQUFDQyxLQUFLLEVBQUMsUUFBUTtRQUFDQyxXQUFXLEVBQUM7TUFBRyxnQkFDMUMvQiwwREFBQSxDQUFDVywwREFBVTtRQUFDcUIsTUFBTSxFQUFFcEIsc0RBQU0sQ0FBQ3FCO01BQUssQ0FBRSxDQUFDLGVBQ25DakMsMERBQUEsQ0FBQ0csdURBQVMsc0NBQUErQixNQUFBLENBQ3lCbkIsb0VBQXdCLENBQUNRLElBQUksQ0FBQ1ksMkJBQTJCLENBQUMsQ0FDbEYsQ0FDUCxDQUFDO0lBRWpCLENBQUM7SUFDREMsT0FBTyxFQUFFLGNBQUNwQywwREFBQSxDQUFDSSxvREFBTTtNQUFDaUMsR0FBRyxFQUFDLE1BQU07TUFBQ0MsT0FBTyxFQUFDLFNBQVM7TUFBQ0MsSUFBSSxFQUFDLE9BQU87TUFBQ0MsT0FBTyxFQUFFaEIsU0FBVTtNQUFDaUIsUUFBUSxFQUFDO0lBQU0sQ0FBRSxDQUFDO0VBQ3RHLENBQUM7QUFBQSxDQUFDO0FBa0JGLElBQU1DLFVBQVUsZ0JBQUd6QyxvREFBYSxDQUE4QjBDLFNBQVMsQ0FBQztBQUV4RSxJQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBV0EsQ0FBSUMsS0FBd0IsRUFBSztFQUFBQyxFQUFBO0VBQzlDLElBQUFDLGVBQUEsR0FBZ0R0Qyw0REFBYyxDQUFDLENBQUM7SUFBeER1QyxXQUFXLEdBQUFELGVBQUEsQ0FBWEMsV0FBVztJQUFFQyxzQkFBc0IsR0FBQUYsZUFBQSxDQUF0QkUsc0JBQXNCO0VBQzNDLElBQUFDLFFBQUEsR0FBb0MzQyw2REFBTyxDQUFDLENBQUM7SUFBckM0QyxPQUFPLEdBQUFELFFBQUEsQ0FBUEMsT0FBTztJQUFFQyxjQUFjLEdBQUFGLFFBQUEsQ0FBZEUsY0FBYztFQUMvQixJQUFNQyxPQUFPLEdBQUczQywyRUFBaUIsQ0FBQyxDQUFDO0VBRW5DLElBQUE0QyxlQUFBLEdBQXlDdEQscURBQWMsQ0FBU21CLFdBQVcsQ0FBQztJQUFBb0MsZ0JBQUEsR0FBQXZFLGNBQUEsQ0FBQXNFLGVBQUE7SUFBckVFLFlBQVksR0FBQUQsZ0JBQUE7SUFBRUUsZ0JBQWdCLEdBQUFGLGdCQUFBO0VBQ3JDLElBQUFHLFNBQUEsR0FBNkJ4RCwrQ0FBUSxDQUFnQyxDQUFDLENBQUMsQ0FBQztJQUFBeUQsVUFBQSxHQUFBM0UsY0FBQSxDQUFBMEUsU0FBQTtJQUFqRUUsTUFBTSxHQUFBRCxVQUFBO0lBQUVFLFVBQVUsR0FBQUYsVUFBQTtFQUV6QixJQUFNbkMsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQUEsRUFBUztJQUNwQmlDLGdCQUFnQixDQUFDdEMsV0FBVyxDQUFDO0VBQ2pDLENBQUM7RUFFRCxJQUFNMkMsVUFBVTtJQUFBLElBQUFDLElBQUEsR0FBQXBGLGlCQUFBLGNBQUFiLFlBQUEsR0FBQUUsQ0FBQSxDQUFHLFNBQUFnRyxRQUFPQyxXQUFtQjtNQUFBLE9BQUFuRyxZQUFBLEdBQUFDLENBQUEsV0FBQW1HLFFBQUE7UUFBQSxrQkFBQUEsUUFBQSxDQUFBcEksQ0FBQTtVQUFBO1lBQUEsT0FBQW9JLFFBQUEsQ0FBQW5ILENBQUEsSUFDbENvRyxPQUFPLENBQWlDO2NBQzNDZ0IsTUFBTSxFQUFFLE1BQU07Y0FDZEMsR0FBRyxFQUFFLGtDQUFrQztjQUN2QzdDLElBQUksRUFBRTtnQkFDRjhDLEtBQUssRUFBRUo7Y0FDWDtZQUNKLENBQUMsQ0FBQyxDQUFDdkYsSUFBSSxDQUFDLFVBQUM0RixPQUE2QixFQUFLO2NBQ3ZDLElBQUksTUFBTSxJQUFJQSxPQUFPLElBQUlBLE9BQU8sQ0FBQy9DLElBQUksQ0FBQ2dELFVBQVUsS0FBSyxLQUFLLEVBQUU7Z0JBQ3hEZCxnQkFBZ0IsQ0FDWm5DLFlBQVksQ0FDUjtrQkFDSUcsdUJBQXVCLEVBQUUsS0FBSztrQkFDOUJVLDJCQUEyQixFQUFFbUMsT0FBTyxDQUFDL0MsSUFBSSxDQUFDaUQ7Z0JBQzlDLENBQUMsRUFDRGhELFNBQ0osQ0FDSixDQUFDO2NBQ0w7Y0FDQSxPQUFPOEMsT0FBTztZQUNsQixDQUFDLENBQUM7UUFBQTtNQUFBLEdBQUFOLE9BQUE7SUFBQSxDQUNMO0lBQUEsZ0JBckJLRixVQUFVQSxDQUFBVyxFQUFBO01BQUEsT0FBQVYsSUFBQSxDQUFBbEYsS0FBQSxPQUFBRCxTQUFBO0lBQUE7RUFBQSxHQXFCZjtFQUVELElBQU04RixZQUFZO0lBQUEsSUFBQUMsS0FBQSxHQUFBaEcsaUJBQUEsY0FBQWIsWUFBQSxHQUFBRSxDQUFBLENBQUcsU0FBQTRHLFNBQU9YLFdBQW1CO01BQUEsSUFBQVksaUJBQUE7UUFBQUMsTUFBQSxHQUFBbEcsU0FBQTtNQUFBLE9BQUFkLFlBQUEsR0FBQUMsQ0FBQSxXQUFBZ0gsU0FBQTtRQUFBLGtCQUFBQSxTQUFBLENBQUFqSixDQUFBO1VBQUE7WUFBRStJLGlCQUFpQixHQUFBQyxNQUFBLENBQUE1SCxNQUFBLFFBQUE0SCxNQUFBLFFBQUFuQyxTQUFBLEdBQUFtQyxNQUFBLE1BQUcsSUFBSTtZQUFBLE9BQUFDLFNBQUEsQ0FBQWhJLENBQUEsSUFDOURvRyxPQUFPLENBQXdDO2NBQ2xEZ0IsTUFBTSxFQUFFLE1BQU07Y0FDZEMsR0FBRyxFQUFFLDZCQUE2QjtjQUNsQzdDLElBQUksRUFBRTtnQkFBRTBDLFdBQVcsRUFBWEE7Y0FBWSxDQUFDO2NBQ3JCZSxvQkFBb0IsRUFBRUg7WUFDMUIsQ0FBQyxDQUFDLENBQUNuRyxJQUFJLENBQUMsVUFBQzRGLE9BQThCLEVBQUs7Y0FDeEMsSUFBSUEsT0FBTyxDQUFDdEMsTUFBTSxLQUFLeEIsZ0VBQWEsQ0FBQ3lFLE9BQU8sRUFBRTtnQkFDMUN4QixnQkFBZ0IsQ0FBQ25DLFlBQVksQ0FBQ2dELE9BQU8sQ0FBQy9DLElBQUksRUFBRUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZELE9BQU84QyxPQUFPLENBQUMvQyxJQUFJLENBQUNFLHVCQUF1QjtjQUMvQyxDQUFDLE1BQU07Z0JBQ0gsT0FBTyxLQUFLO2NBQ2hCO1lBQ0osQ0FBQyxDQUFDO1FBQUE7TUFBQSxHQUFBbUQsUUFBQTtJQUFBLENBQ0w7SUFBQSxnQkFkS0YsWUFBWUEsQ0FBQVEsR0FBQTtNQUFBLE9BQUFQLEtBQUEsQ0FBQTlGLEtBQUEsT0FBQUQsU0FBQTtJQUFBO0VBQUEsR0FjakI7RUFFRCxJQUFNdUcsc0JBQXNCLEdBQUcsU0FBekJBLHNCQUFzQkEsQ0FBQSxFQUF5QjtJQUNqRCxJQUFJQyxLQUFLLEdBQUd2RSw2REFBYyxDQUFDd0UsTUFBTTtJQUNqQyxJQUFJcEMsc0JBQXNCLElBQUlBLHNCQUFzQixDQUFDcUMsTUFBTSxFQUFFO01BQ3pEckMsc0JBQXNCLENBQUNxQyxNQUFNLENBQUNDLE9BQU8sQ0FBQyxVQUFDQyxFQUFVLEVBQUs7UUFDbERKLEtBQUssR0FBR0EsS0FBSyxHQUFHcEUsb0VBQWdCLENBQUN3RSxFQUFFLENBQUMsR0FBR3hFLG9FQUFnQixDQUFDd0UsRUFBRSxDQUFDLEdBQUdKLEtBQUs7TUFDdkUsQ0FBQyxDQUFDO0lBQ047SUFFQSxJQUFJbkMsc0JBQXNCLElBQUltQyxLQUFLLEtBQUt2RSw2REFBYyxDQUFDd0UsTUFBTSxFQUFFO01BQzNEL0UsOERBQVEsQ0FDSnFDLFNBQVMsRUFDVE0sc0JBQXNCLEVBQ3RCLGdFQUNKLENBQUM7TUFDRC9CLDREQUFXLENBQUMsQ0FBQztJQUNqQjtJQUVBLE9BQU9rRSxLQUFLO0VBQ2hCLENBQUM7RUFFRCxJQUFNSyxzQ0FBc0MsR0FBRyxTQUF6Q0Esc0NBQXNDQSxDQUFBLEVBQVM7SUFDakQsSUFBTUwsS0FBSyxHQUFHRCxzQkFBc0IsQ0FBQyxDQUFDO0lBRXRDLE9BQU9DLEtBQUssSUFBSXZFLDZEQUFjLENBQUM2RSxhQUFhO0VBQ2hELENBQUM7RUFFRCxJQUFNQywyQ0FBMkMsR0FBRyxTQUE5Q0EsMkNBQTJDQSxDQUFBO0lBQUEsSUFBQUMscUJBQUE7SUFBQSxPQUM3QzNDLHNCQUFzQixhQUF0QkEsc0JBQXNCLGdCQUFBMkMscUJBQUEsR0FBdEIzQyxzQkFBc0IsQ0FBRXFDLE1BQU0sY0FBQU0scUJBQUEsdUJBQTlCQSxxQkFBQSxDQUFnQ0MsUUFBUSxDQUFDNUUsMkVBQTJCLENBQUM7RUFBQTtFQUV6RSxJQUFNNkUsaUJBQWlCLEdBQUd6QyxPQUFPLENBQUN2QyxnRUFBYSxDQUFDZ0YsaUJBQWlCLENBQUMsSUFBSSxDQUFDTCxzQ0FBc0MsQ0FBQyxDQUFDO0VBRS9HLG9CQUNJekYsMERBQUEsQ0FBQzBDLFVBQVUsQ0FBQ3FELFFBQVE7SUFDaEJ4SSxLQUFLLEVBQUU7TUFDSHlGLFdBQVcsRUFBWEEsV0FBVztNQUNYbUMsc0JBQXNCLEVBQXRCQSxzQkFBc0I7TUFDdEJsQyxzQkFBc0IsRUFBdEJBLHNCQUFzQjtNQUN0QndDLHNDQUFzQyxFQUF0Q0Esc0NBQXNDO01BQ3RDRSwyQ0FBMkMsRUFBM0NBLDJDQUEyQztNQUMzQ25DLFlBQVksRUFBWkEsWUFBWTtNQUNad0MsU0FBUyxFQUFFLFNBQVhBLFNBQVNBLENBQUdDLE9BQW1CLEVBQUVDLEtBQWE7UUFBQSxPQUMxQ3JDLFVBQVUsQ0FBQXNDLGFBQUEsQ0FBQUEsYUFBQSxLQUNIdkMsTUFBTSxPQUFBd0MsZUFBQSxLQUNSSCxPQUFPLEVBQUdDLEtBQUssRUFDbkIsQ0FBQztNQUFBO01BQ05yQyxVQUFVLEVBQVZBLFVBQVU7TUFDVmEsWUFBWSxFQUFaQSxZQUFZO01BQ1p0QixjQUFjLEVBQWRBLGNBQWM7TUFDZFEsTUFBTSxFQUFOQSxNQUFNO01BQ05FLFVBQVUsRUFBVkEsVUFBVTtNQUNWZ0MsaUJBQWlCLEVBQWpCQTtJQUNKO0VBQUUsR0FFRGpELEtBQUssQ0FBQ0osUUFDVSxDQUFDO0FBRTlCLENBQUM7QUFBQ0ssRUFBQSxDQTNHSUYsV0FBVztFQUFBLFFBQ21DbkMsd0RBQWMsRUFDMUJGLHlEQUFPLEVBQzNCRyx1RUFBaUI7QUFBQTtBQUFBMkYsRUFBQSxHQUgvQnpELFdBQVc7QUE2R2pCLElBQU0wRCxhQUFhLEdBQUcsU0FBaEJBLGFBQWFBLENBQUEsRUFBUztFQUFBQyxHQUFBO0VBQ3hCLElBQU1DLE9BQU8sR0FBR3hHLHVEQUFnQixDQUFDMEMsVUFBVSxDQUFDO0VBQzVDLElBQUksQ0FBQzhELE9BQU8sRUFBRTtJQUNWLE1BQU0sSUFBSUUsS0FBSyxDQUFDLDhDQUE4QyxDQUFDO0VBQ25FO0VBQ0EsT0FBT0YsT0FBTztBQUNsQixDQUFDO0FBQUNELEdBQUEsQ0FOSUQsYUFBYTtBQVFtQjtBQUFBLElBQUFELEVBQUE7QUFBQU0sc0NBQUEsQ0FBQU4sRUFBQSxpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5TFA7QUFFUTtBQUVjO0FBQ0s7QUFTMUQsSUFBTVUsVUFBVSxHQUFHSCx5REFBTSxDQUFDSSxJQUFJLENBQUFDLGVBQUEsS0FBQUEsZUFBQSxHQUFBQyxzQkFBQSwyTUFLVixVQUFBckUsS0FBSztFQUFBLE9BQUlBLEtBQUssQ0FBQ3NFLE1BQU07QUFBQSxHQUVqQixVQUFBdEUsS0FBSztFQUFBLE9BQUlBLEtBQUssQ0FBQ3NFLE1BQU07QUFBQSxHQUcvQixVQUFBdEUsS0FBSztFQUFBLE9BQUlBLEtBQUssQ0FBQ3VFLE9BQU87QUFBQSxHQUN2QixVQUFBdkUsS0FBSztFQUFBLE9BQUlBLEtBQUssQ0FBQ3dFLE1BQU07QUFBQSxFQUVqQztBQUFDaEIsRUFBQSxHQWJJVSxVQUFVO0FBZWhCLElBQU1PLGVBQTBELEdBQUcsU0FBN0RBLGVBQTBEQSxDQUFBdkQsSUFBQSxFQUsxRDtFQUFBLElBSkZ3RCxTQUFTLEdBQUF4RCxJQUFBLENBQVR3RCxTQUFTO0lBQUFDLFdBQUEsR0FBQXpELElBQUEsQ0FDVDBELE1BQU07SUFBTkEsTUFBTSxHQUFBRCxXQUFBLGNBQUcsSUFBSSxHQUFBQSxXQUFBO0lBQUFFLFVBQUEsR0FBQTNELElBQUEsQ0FDYjRELEtBQUs7SUFBTEEsS0FBSyxHQUFBRCxVQUFBLGNBQUcsSUFBSSxHQUFBQSxVQUFBO0lBQUFFLFVBQUEsR0FBQTdELElBQUEsQ0FDWjhELEtBQUs7SUFBTEEsS0FBSyxHQUFBRCxVQUFBLGNBQUdkLG9FQUFTLEdBQUFjLFVBQUE7RUFFakIsb0JBQ0k1SCxnREFBQSxDQUFDK0csVUFBVTtJQUFDSyxPQUFPLEVBQUVLLE1BQU87SUFBQ0osTUFBTSxFQUFFTSxLQUFNO0lBQUNSLE1BQU0sRUFBRVU7RUFBTSxnQkFDdEQ3SCxnREFBQSxDQUFDNkcsK0RBQWM7SUFBQ1ksTUFBTSxFQUFFQSxNQUFNLEtBQUssSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFHO0lBQUNFLEtBQUssRUFBRUEsS0FBSyxLQUFLLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRztJQUFDSixTQUFTLEVBQUVBO0VBQVUsQ0FBRSxDQUNuRyxDQUFDO0FBRXJCLENBQUM7QUFBQ08sR0FBQSxHQVhJUixlQUEwRDtBQWFoRSxpRUFBZUEsZUFBZSxFQUFDO0FBQUEsSUFBQWpCLEVBQUEsRUFBQXlCLEdBQUE7QUFBQW5CLHNDQUFBLENBQUFOLEVBQUE7QUFBQU0sc0NBQUEsQ0FBQW1CLEdBQUEsd0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUNBO0FBRVE7QUFPVjtBQU90QixJQUFLbEgsTUFBTSwwQkFBTkEsTUFBTTtFQUFOQSxNQUFNLENBQU5BLE1BQU07RUFBTkEsTUFBTSxDQUFOQSxNQUFNO0VBQU5BLE1BQU0sQ0FBTkEsTUFBTTtFQUFOQSxNQUFNLENBQU5BLE1BQU07RUFBQSxPQUFOQSxNQUFNO0FBQUE7QUFPbEIsSUFBTXVILE1BQU0sR0FBR3ZCLDZEQUFNLENBQUNtQix3RUFBdUIsQ0FBQyxDQUFBZCxlQUFBLEtBQUFBLGVBQUEsR0FBQUMsc0JBQUEsNkZBSTdDO0FBQUNiLEVBQUEsR0FKSThCLE1BQU07QUFNWixJQUFNQyxRQUFRLEdBQUd4Qiw2REFBTSxDQUFDc0IscUVBQW9CLENBQUMsQ0FBQUcsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQW5CLHNCQUFBLDRGQUk1QztBQUFDWSxHQUFBLEdBSklNLFFBQVE7QUFNZCxJQUFNRSxZQUFZLEdBQUcxQiw2REFBTSxDQUFDb0IsZ0ZBQStCLENBQUMsQ0FBQU8sZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQXJCLHNCQUFBLDZGQUkzRDtBQUFDc0IsR0FBQSxHQUpJRixZQUFZO0FBTWxCLElBQU1HLFFBQVEsR0FBRzdCLDZEQUFNLENBQUNxQiwwRUFBeUIsQ0FBQyxDQUFBUyxnQkFBQSxLQUFBQSxnQkFBQSxHQUFBeEIsc0JBQUEsMEZBSWpEO0FBQUN5QixHQUFBLEdBSklGLFFBQVE7QUFNZCxJQUFNOUgsVUFBNEIsR0FBRyxTQUEvQkEsVUFBNEJBLENBQUFvRCxJQUFBLEVBQTBCO0VBQUEsSUFBcEIvQixNQUFNLEdBQUErQixJQUFBLENBQU4vQixNQUFNO0lBQUU0RyxLQUFLLEdBQUE3RSxJQUFBLENBQUw2RSxLQUFLO0VBQ2pELFFBQVE1RyxNQUFNO0lBQ1YsS0FBS3BCLE1BQU0sQ0FBQ2lJLEVBQUU7TUFDVixvQkFBTzdJLGdEQUFBLENBQUNtSSxNQUFNO1FBQUNTLEtBQUssRUFBRUE7TUFBTSxDQUFFLENBQUM7SUFDbkMsS0FBS2hJLE1BQU0sQ0FBQ3FCLElBQUk7TUFDWixvQkFBT2pDLGdEQUFBLENBQUNvSSxRQUFRO1FBQUNRLEtBQUssRUFBRUE7TUFBTSxDQUFFLENBQUM7SUFDckMsS0FBS2hJLE1BQU0sQ0FBQ2tJLFFBQVE7TUFDaEIsb0JBQU85SSxnREFBQSxDQUFDc0ksWUFBWTtRQUFDTSxLQUFLLEVBQUVBO01BQU0sQ0FBRSxDQUFDO0lBQ3pDLEtBQUtoSSxNQUFNLENBQUNtSSxJQUFJO01BQ1osb0JBQU8vSSxnREFBQSxDQUFDeUksUUFBUTtRQUFDRyxLQUFLLEVBQUVBO01BQU0sQ0FBRSxDQUFDO0VBQ3pDO0FBQ0osQ0FBQztBQUFDSSxHQUFBLEdBWElySSxVQUE0QjtBQVlsQyxpRUFBZUEsVUFBVSxFQUFDO0FBQUEsSUFBQTBGLEVBQUEsRUFBQXlCLEdBQUEsRUFBQVUsR0FBQSxFQUFBRyxHQUFBLEVBQUFLLEdBQUE7QUFBQXJDLHNDQUFBLENBQUFOLEVBQUE7QUFBQU0sc0NBQUEsQ0FBQW1CLEdBQUE7QUFBQW5CLHNDQUFBLENBQUE2QixHQUFBO0FBQUE3QixzQ0FBQSxDQUFBZ0MsR0FBQTtBQUFBaEMsc0NBQUEsQ0FBQXFDLEdBQUEsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0R5QjtBQUVmO0FBQ0c7QUFFMEM7QUFDdEI7QUFFWDtBQUNGO0FBQ2lDO0FBQzVCO0FBQ0c7QUFFdEQsSUFBTVksbUJBQW1CLEdBQUdoRCw2REFBTSxDQUFDd0MsMkRBQWEsQ0FBQyxDQUFBbkMsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLHNCQUFBLGlDQUVoRDtBQUFDYixFQUFBLEdBRkl1RCxtQkFBbUI7QUFJbEIsSUFBTUMsYUFBdUIsR0FBRyxTQUExQkEsYUFBdUJBLENBQUEsRUFBUztFQUFBL0csRUFBQTtFQUFBLElBQUFnSCxxQkFBQTtFQUN6QyxJQUFBQyxxQkFBQSxHQUNJTiwrRkFBOEIsQ0FBQyxDQUFDO0lBRDVCTyxNQUFNLEdBQUFELHFCQUFBLENBQU5DLE1BQU07SUFBRUMsYUFBYSxHQUFBRixxQkFBQSxDQUFiRSxhQUFhO0lBQUVDLHFCQUFxQixHQUFBSCxxQkFBQSxDQUFyQkcscUJBQXFCO0lBQUVDLG9CQUFvQixHQUFBSixxQkFBQSxDQUFwQkksb0JBQW9CO0lBQUVDLDBCQUEwQixHQUFBTCxxQkFBQSxDQUExQkssMEJBQTBCO0VBRXRHLElBQUExRyxTQUFBLEdBQXlCeEQsK0NBQVEsQ0FBQyxLQUFLLENBQUM7SUFBQXlELFVBQUEsR0FBQTNFLGNBQUEsQ0FBQTBFLFNBQUE7SUFBakMyRyxJQUFJLEdBQUExRyxVQUFBO0lBQUUyRyxRQUFRLEdBQUEzRyxVQUFBO0VBQ3JCLElBQUE0RyxVQUFBLEdBQWlEckssK0NBQVEsQ0FBQyxLQUFLLENBQUM7SUFBQXNLLFVBQUEsR0FBQXhMLGNBQUEsQ0FBQXVMLFVBQUE7SUFBekRFLGdCQUFnQixHQUFBRCxVQUFBO0lBQUVFLG9CQUFvQixHQUFBRixVQUFBO0VBRTdDdkIsZ0RBQVMsQ0FBQyxZQUFNO0lBQ1osSUFDSWUsTUFBTSxDQUFDVyxnQkFBZ0IsS0FDdEJYLE1BQU0sQ0FBQ1ksTUFBTSxDQUFDQyxZQUFZLENBQUNDLGlCQUFpQixLQUFLeEIscUVBQWlCLENBQUNySCxJQUFJLElBQ3BFK0gsTUFBTSxDQUFDWSxNQUFNLENBQUNHLGFBQWEsQ0FBQ0QsaUJBQWlCLEtBQUt4QixxRUFBaUIsQ0FBQ3JILElBQUksQ0FBQyxFQUMvRTtNQUNFcUksUUFBUSxDQUFDLElBQUksQ0FBQztJQUNsQjtFQUNKLENBQUMsRUFBRSxDQUNDTixNQUFNLENBQUNXLGdCQUFnQixFQUN2QlgsTUFBTSxDQUFDWSxNQUFNLENBQUNDLFlBQVksQ0FBQ0MsaUJBQWlCLEVBQzVDZCxNQUFNLENBQUNZLE1BQU0sQ0FBQ0csYUFBYSxDQUFDRCxpQkFBaUIsQ0FDaEQsQ0FBQztFQUVGLElBQU1FLFdBQVcsR0FBR2YsYUFBYSxDQUFDLENBQUMsSUFBSUcsMEJBQTBCO0VBRWpFLG9CQUNJcEssMERBQUEsQ0FBQzRKLG1CQUFtQjtJQUNoQnFCLElBQUksRUFBRVosSUFBSztJQUNYYSxRQUFRLEVBQUUsU0FBVkEsUUFBUUEsQ0FBQSxFQUFRO01BQ1paLFFBQVEsQ0FBQyxDQUFDRCxJQUFJLENBQUM7SUFDbkIsQ0FBRTtJQUNGOUgsSUFBSSxFQUFDLE9BQU87SUFDWixjQUFXO0VBQWUsZ0JBRTFCdkMsMERBQUEsQ0FBQ29KLDJEQUFhLENBQUMrQixNQUFNLHFCQUNqQm5MLDBEQUFBLENBQUNvSiwyREFBYSxDQUFDZ0MsS0FBSyxxQkFDaEJwTCwwREFBQSxDQUFDd0osdURBQVk7SUFDVDZCLElBQUksZUFBRXJMLDBEQUFBLENBQUMwSix3REFBUztNQUFDNEIsTUFBTSxFQUFFakIsSUFBSztNQUFDMUMsS0FBSyxFQUFFLEVBQUc7TUFBQ0YsTUFBTSxFQUFFO0lBQUcsQ0FBRSxDQUFFO0lBQ3pEOEQsSUFBSSxFQUFFdkIsTUFBTSxDQUFDWSxNQUFNLENBQUNDLFlBQVksQ0FBQ1csS0FBSyxJQUFJLGlCQUFrQjtJQUM1RG5ILEtBQUssRUFBRXNGLGdFQUFhLEVBQUFHLHFCQUFBLEdBQUNFLE1BQU0sQ0FBQ1ksTUFBTSxDQUFDRyxhQUFhLENBQUNTLEtBQUssY0FBQTFCLHFCQUFBLGNBQUFBLHFCQUFBLEdBQUksRUFBRSxDQUFFO0lBQzlEMkIsV0FBVyxFQUFDO0VBQVUsQ0FDekIsQ0FDZ0IsQ0FDSCxDQUFDLGVBQ3ZCekwsMERBQUEsQ0FBQ29KLDJEQUFhLENBQUNzQyxPQUFPO0lBQUNuRSxTQUFTLEVBQUVnQyx5SkFBbUJvQztFQUFDLEdBQ2pEWCxXQUFXLEdBQ1JQLGdCQUFnQixnQkFDWnpLLDBEQUFBLENBQUNHLHVEQUFTO0lBQ05vSCxTQUFTLEVBQUUyQixpREFBVSxDQUFDLGVBQWUsRUFBRSxXQUFXLENBQUU7SUFDcER6RyxRQUFRLEVBQUU7RUFBcUIsQ0FDbEMsQ0FBQyxHQUNGLElBQUksZ0JBRVJ6QywwREFBQSxDQUFDbUosc0RBQVE7SUFDTDVMLEtBQUssRUFBRSxvQkFBcUI7SUFDNUJxTyxPQUFPLEVBQUVuQixnQkFBaUI7SUFDMUJvQixRQUFRLEVBQUUsU0FBVkEsUUFBUUEsQ0FBQSxFQUFRO01BQ1osSUFBSXBCLGdCQUFnQixFQUFFO1FBQ2xCTixvQkFBb0IsQ0FBQyxDQUFDO01BQzFCLENBQUMsTUFBTTtRQUNIRCxxQkFBcUIsQ0FBQyxDQUFDO01BQzNCO01BQ0FRLG9CQUFvQixDQUFDLENBQUNELGdCQUFnQixDQUFDO0lBQzNDO0VBQUUsR0FDTCxvQkFFUyxDQUNiLGVBQ0R6SywwREFBQSxXQUFLLENBQUMsZUFDTkEsMERBQUEsQ0FBQ3FKLHVEQUFTLEVBQUF5QyxRQUFBLEtBQ0Y5QixNQUFNLENBQUNZLE1BQU0sQ0FBQ0MsWUFBWSxDQUFDa0IsaUJBQWlCLENBQUMvQixNQUFNLENBQUNXLGdCQUFnQixDQUFDO0lBQ3pFcUIsUUFBUSxFQUFFaEIsV0FBWTtJQUN0QmlCLEtBQUssRUFBRSxNQUFPO0lBQ2QxSixJQUFJLEVBQUUsUUFBUztJQUNmMkosV0FBVyxFQUFFLE1BQU87SUFDcEJDLFFBQVEsRUFBRTFCO0VBQWlCLEVBQzlCLENBQUMsZUFFRnpLLDBEQUFBLFdBQUssQ0FBQyxlQUNOQSwwREFBQSxDQUFDcUosdURBQVMsRUFBQXlDLFFBQUEsS0FDRjlCLE1BQU0sQ0FBQ1ksTUFBTSxDQUFDRyxhQUFhLENBQUNnQixpQkFBaUIsQ0FBQy9CLE1BQU0sQ0FBQ1csZ0JBQWdCLENBQUM7SUFDMUVxQixRQUFRLEVBQUVoQixXQUFZO0lBQ3RCaUIsS0FBSyxFQUFFLE9BQVE7SUFDZjFKLElBQUksRUFBRSxRQUFTO0lBQ2YySixXQUFXLEVBQUUsZUFBZ0I7SUFDN0JDLFFBQVEsRUFBRTFCO0VBQWlCLEVBQzlCLENBQ2tCLENBQ04sQ0FBQztBQUU5QixDQUFDO0FBQUMzSCxFQUFBLENBdkZXK0csYUFBdUI7RUFBQSxRQUU1QkosMkZBQThCO0FBQUE7QUFBQTNCLEdBQUEsR0FGekIrQixhQUF1QjtBQUFBLElBQUF4RCxFQUFBLEVBQUF5QixHQUFBO0FBQUFuQixzQ0FBQSxDQUFBTixFQUFBO0FBQUFNLHNDQUFBLENBQUFtQixHQUFBLG1COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQmU7QUFFWjtBQUVpQztBQUM4QjtBQUN2QztBQUNLO0FBRWQ7QUFFUjtBQUNBO0FBQ2lDO0FBQ3hCO0FBQzBCO0FBQ0M7QUFDcEI7QUFFUjtBQUNFO0FBRXhELElBQU1vRixPQUFPLEdBQUd0Ryx5REFBTSxDQUFDdUcsR0FBRyxDQUFBbEcsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLHNCQUFBLDBEQUd6QjtBQUFDYixFQUFBLEdBSEk2RyxPQUFPO0FBS2IsSUFBTUUsWUFBWSxHQUFHeEcsNkRBQU0sQ0FBQ3hHLG9EQUFNLENBQUMsQ0FBQWlJLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFuQixzQkFBQSw0RUFJbEM7QUFBQ1ksR0FBQSxHQUpJc0YsWUFBWTtBQU1sQixJQUFNeEQsbUJBQW1CLEdBQUdoRCw2REFBTSxDQUFDd0MsMkRBQWEsQ0FBQyxDQUFBYixnQkFBQSxLQUFBQSxnQkFBQSxHQUFBckIsc0JBQUEsbURBR2hEO0FBQUNzQixHQUFBLEdBSElvQixtQkFBbUI7QUFLekIsSUFBTXlELFlBQVksR0FBR3pHLDZEQUFNLENBQUM2RixvREFBTSxDQUFDLENBQUEvRCxnQkFBQSxLQUFBQSxnQkFBQSxHQUFBeEIsc0JBQUEsMENBRWxDO0FBQUN5QixHQUFBLEdBRkkwRSxZQUFZO0FBSWxCLElBQU1DLFVBQVUsR0FBRzFHLHlEQUFNLENBQUN1RyxHQUFHLENBQUFJLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFyRyxzQkFBQSxpQ0FFNUI7QUFBQzhCLEdBQUEsR0FGSXNFLFVBQVU7QUFJaEIsSUFBTUUsV0FBVyxHQUFHNUcsNkRBQU0sQ0FBQzBGLG1EQUFLLENBQUMsQ0FBQW1CLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUF2RyxzQkFBQSxpQ0FFaEM7QUFBQ3dHLEdBQUEsR0FGSUYsV0FBVztBQUlWLElBQU1HLFdBQXFCLEdBQUcsU0FBeEJBLFdBQXFCQSxDQUFBLEVBQVM7RUFBQTdLLEVBQUE7RUFBQSxJQUFBOEssc0JBQUEsRUFBQUMsc0JBQUEsRUFBQUMsc0JBQUE7RUFDdkMsSUFBQS9ELHFCQUFBLEdBUUlOLGdHQUE4QixDQUFDLENBQUM7SUFQaENPLE1BQU0sR0FBQUQscUJBQUEsQ0FBTkMsTUFBTTtJQUNOK0QsNkJBQTZCLEdBQUFoRSxxQkFBQSxDQUE3QmdFLDZCQUE2QjtJQUM3QjlELGFBQWEsR0FBQUYscUJBQUEsQ0FBYkUsYUFBYTtJQUNiK0Qsb0JBQW9CLEdBQUFqRSxxQkFBQSxDQUFwQmlFLG9CQUFvQjtJQUNwQkMsc0NBQXNDLEdBQUFsRSxxQkFBQSxDQUF0Q2tFLHNDQUFzQztJQUN0Q0MseUNBQXlDLEdBQUFuRSxxQkFBQSxDQUF6Q21FLHlDQUF5QztJQUN6Q0MsK0JBQStCLEdBQUFwRSxxQkFBQSxDQUEvQm9FLCtCQUErQjtFQUVuQyxJQUFBekssU0FBQSxHQUF5QnhELCtDQUFRLENBQUMsS0FBSyxDQUFDO0lBQUF5RCxVQUFBLEdBQUEzRSxjQUFBLENBQUEwRSxTQUFBO0lBQWpDMkcsSUFBSSxHQUFBMUcsVUFBQTtJQUFFMkcsUUFBUSxHQUFBM0csVUFBQTtFQUNyQixJQUFBNEcsVUFBQSxHQUF1Q3JLLCtDQUFRLENBQXFCLEVBQUUsQ0FBQztJQUFBc0ssVUFBQSxHQUFBeEwsY0FBQSxDQUFBdUwsVUFBQTtJQUFoRTZELFdBQVcsR0FBQTVELFVBQUE7SUFBRTZELGVBQWUsR0FBQTdELFVBQUE7RUFDbkMsSUFBQThELFVBQUEsR0FBK0JwTywrQ0FBUSxDQUFDLEtBQUssQ0FBQztJQUFBcU8sVUFBQSxHQUFBdlAsY0FBQSxDQUFBc1AsVUFBQTtJQUF2Q0UsT0FBTyxHQUFBRCxVQUFBO0lBQUVFLFdBQVcsR0FBQUYsVUFBQTtFQUMzQixJQUFNRyxPQUFPLEdBQUcvQiwrREFBTyxDQUFDO0lBQ3BCbkIsS0FBSyxFQUFFLEVBQUU7SUFDVG1ELG1CQUFtQixFQUFFMUIsOERBQWNBO0VBQ3ZDLENBQUMsQ0FBQztFQUNGLElBQUEyQixxQkFBQSxHQUEyQjlCLDRGQUFvQixDQUFDLEtBQUssQ0FBQztJQUE5QytCLGNBQWMsR0FBQUQscUJBQUEsQ0FBZEMsY0FBYztFQUN0QixJQUFBQyxVQUFBLEdBQWlENU8sK0NBQVEsQ0FBUyxFQUFFLENBQUM7SUFBQTZPLFVBQUEsR0FBQS9QLGNBQUEsQ0FBQThQLFVBQUE7SUFBOURFLGdCQUFnQixHQUFBRCxVQUFBO0lBQUVFLG9CQUFvQixHQUFBRixVQUFBO0VBQzdDLElBQUFHLFVBQUEsR0FBMkRoUCwrQ0FBUSxDQUFTLEVBQUUsQ0FBQztJQUFBaVAsVUFBQSxHQUFBblEsY0FBQSxDQUFBa1EsVUFBQTtJQUF4RUUscUJBQXFCLEdBQUFELFVBQUE7SUFBRUUseUJBQXlCLEdBQUFGLFVBQUE7RUFDdkQsSUFBQUcsVUFBQSxHQUE2RHBQLCtDQUFRLENBQVUsS0FBSyxDQUFDO0lBQUFxUCxXQUFBLEdBQUF2USxjQUFBLENBQUFzUSxVQUFBO0lBQTlFRSxzQkFBc0IsR0FBQUQsV0FBQTtJQUFFRSwwQkFBMEIsR0FBQUYsV0FBQTtFQUV6RHRHLGdEQUFTLENBQUMsWUFBTTtJQUNab0YsZUFBZSxDQUFDLEVBQUUsQ0FBQztFQUN2QixDQUFDLEVBQUUsQ0FBQ0ssT0FBTyxDQUFDbEQsS0FBSyxDQUFDLENBQUM7RUFFbkJ2QyxnREFBUyxDQUFDLFlBQU07SUFDWixJQUFJZSxNQUFNLENBQUNXLGdCQUFnQixJQUFJWCxNQUFNLENBQUNZLE1BQU0sQ0FBQzhFLE1BQU0sQ0FBQzVFLGlCQUFpQixLQUFLeEIscUVBQWlCLENBQUNySCxJQUFJLEVBQUU7TUFDOUZxSSxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQ2xCO0VBQ0osQ0FBQyxFQUFFLENBQUNOLE1BQU0sQ0FBQ1csZ0JBQWdCLEVBQUVYLE1BQU0sQ0FBQ1ksTUFBTSxDQUFDOEUsTUFBTSxDQUFDNUUsaUJBQWlCLENBQUMsQ0FBQztFQUVyRTdCLGdEQUFTLENBQUMsWUFBTTtJQUNab0cseUJBQXlCLENBQUMsRUFBRSxDQUFDO0lBQzdCLElBQUlMLGdCQUFnQixLQUFLLEVBQUUsSUFBSUEsZ0JBQWdCLEtBQUssZ0JBQWdCLEVBQUU7TUFDbEVmLHNDQUFzQyxDQUFDZSxnQkFBZ0IsQ0FBQztNQUN4REgsY0FBYyxDQUFDRyxnQkFBZ0IsQ0FBQyxDQUFDdFEsSUFBSSxDQUFDLFVBQUM0RixPQUFpQyxFQUFLO1FBQ3pFLElBQUlBLE9BQU8sQ0FBQ3RDLE1BQU0sS0FBS3hCLGdFQUFhLENBQUN5RSxPQUFPLEVBQUU7VUFDMUMrRSxNQUFNLENBQUNZLE1BQU0sQ0FBQytFLFVBQVUsQ0FBQ0MsaUJBQWlCLENBQUN0TCxPQUFPLENBQUMvQyxJQUFJLENBQUM7UUFDNUQsQ0FBQyxNQUFNO1VBQ0h5SSxNQUFNLENBQUNZLE1BQU0sQ0FBQytFLFVBQVUsQ0FBQ0UsU0FBUyxDQUFDLENBQUM7VUFDcENSLHlCQUF5QixDQUFDLDRDQUE0QyxDQUFDO1FBQzNFO01BQ0osQ0FBQyxDQUFDO0lBQ04sQ0FBQyxNQUFNO01BQUEsSUFBQVMscUJBQUE7TUFDSDVCLHlDQUF5QyxFQUFBNEIscUJBQUEsR0FBQzlGLE1BQU0sQ0FBQ1ksTUFBTSxDQUFDOEUsTUFBTSxDQUFDbEUsS0FBSyxjQUFBc0UscUJBQUEsdUJBQTFCQSxxQkFBQSxDQUE0QkMsV0FBVyxDQUFDO01BQ2xGL0YsTUFBTSxDQUFDWSxNQUFNLENBQUMrRSxVQUFVLENBQUNFLFNBQVMsQ0FBQyxDQUFDO0lBQ3hDO0VBQ0osQ0FBQyxFQUFFLENBQUNiLGdCQUFnQixDQUFDLENBQUM7RUFFdEIsSUFBTWdCLHFCQUFxQixHQUFHaEcsTUFBTSxDQUFDWSxNQUFNLENBQUNxRixVQUFVLENBQUN6RSxLQUFLLEtBQUt3QixzREFBVSxDQUFDa0QsV0FBVztFQUV2RixJQUFNQyxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQWtCQSxDQUFJQyxZQUF3QixFQUFLO0lBQ3JEcEcsTUFBTSxDQUFDWSxNQUFNLENBQUNxRixVQUFVLENBQUNMLGlCQUFpQixDQUFDUSxZQUFZLENBQUM7SUFDeEQsSUFBSUEsWUFBWSxLQUFLcEQsc0RBQVUsQ0FBQ2tELFdBQVcsRUFBRTtNQUN6Q2pCLG9CQUFvQixDQUFDLEVBQUUsQ0FBQztJQUM1QjtFQUNKLENBQUM7RUFFRCxJQUFNb0IsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFtQkEsQ0FBQSxFQUFTO0lBQzlCRixrQkFBa0IsQ0FBQ25ELHNEQUFVLENBQUNzRCxNQUFNLENBQUM7SUFDckNiLDBCQUEwQixDQUFDLEtBQUssQ0FBQztFQUNyQyxDQUFDO0VBRUQsb0JBQ0l6UCwwREFBQSxDQUFDNEosbUJBQW1CO0lBQ2hCcUIsSUFBSSxFQUFFWixJQUFLO0lBQ1hhLFFBQVEsRUFBRSxTQUFWQSxRQUFRQSxDQUFBLEVBQVE7TUFDWlosUUFBUSxDQUFDLENBQUNELElBQUksQ0FBQztJQUNuQixDQUFFO0lBQ0Y5SCxJQUFJLEVBQUMsT0FBTztJQUNaLGNBQVc7RUFBYSxnQkFFeEJ2QywwREFBQSxDQUFDb0osMkRBQWEsQ0FBQytCLE1BQU0scUJBQ2pCbkwsMERBQUEsQ0FBQ29KLDJEQUFhLENBQUNnQyxLQUFLLHFCQUNoQnBMLDBEQUFBLENBQUN3Six1REFBWTtJQUNUNkIsSUFBSSxFQUNBMkUscUJBQXFCLGdCQUNqQmhRLDBEQUFBLENBQUNxTSxtRUFBa0I7TUFBQ3hFLEtBQUssRUFBRTZFLHlFQUFlO01BQUMvRSxLQUFLLEVBQUUsRUFBRztNQUFDRixNQUFNLEVBQUU7SUFBRyxDQUFFLENBQUMsZ0JBRXBFekgsMERBQUEsQ0FBQzRNLDZEQUFXO01BQUN0QixNQUFNLEVBQUVqQixJQUFLO01BQUMxQyxLQUFLLEVBQUUsRUFBRztNQUFDRixNQUFNLEVBQUU7SUFBRyxDQUFFLENBRTFEO0lBQ0Q4RCxJQUFJLEVBQUUsRUFBQXFDLHNCQUFBLEdBQUE1RCxNQUFNLENBQUNZLE1BQU0sQ0FBQzhFLE1BQU0sQ0FBQ2xFLEtBQUssY0FBQW9DLHNCQUFBLHVCQUExQkEsc0JBQUEsQ0FBNEJyQyxJQUFJLEtBQUksZUFBZ0I7SUFDMURFLFdBQVcsRUFBRXVFLHFCQUFxQixHQUFHLGdDQUFnQyxHQUFHLGNBQWU7SUFDdkYzTCxLQUFLLEVBQUVzRixnRUFBYSxFQUFBa0Usc0JBQUEsSUFBQUMsc0JBQUEsR0FBQzlELE1BQU0sQ0FBQ1ksTUFBTSxDQUFDOEUsTUFBTSxDQUFDbEUsS0FBSyxjQUFBc0Msc0JBQUEsdUJBQTFCQSxzQkFBQSxDQUE0QmlDLFdBQVcsY0FBQWxDLHNCQUFBLGNBQUFBLHNCQUFBLEdBQUksRUFBRTtFQUFFLENBQ3ZFLENBQ2dCLENBQ0gsQ0FBQyxlQUN2QjdOLDBEQUFBLENBQUNvSiwyREFBYSxDQUFDc0MsT0FBTztJQUFDbkUsU0FBUyxFQUFFZ0MsdUpBQW1Cb0M7RUFBQyxHQUNqRCxDQUFDMUIsYUFBYSxDQUFDLENBQUMsaUJBQ2JqSywwREFBQSxDQUFBQSx1REFBQSxxQkFDSUEsMERBQUEsQ0FBQ2tOLE9BQU8scUJBQ0psTiwwREFBQSxDQUFDcUosdURBQVMsRUFBQXlDLFFBQUEsS0FDRjRDLE9BQU8sQ0FBQzNDLGlCQUFpQixDQUFDLENBQUMsQ0FBQ3FDLFdBQVcsQ0FBQztJQUM1Q29DLEtBQUssRUFBRTlCLE9BQU8sQ0FBQzNDLGlCQUFpQixDQUFDLENBQUMsQ0FBQ3FDLFdBQVcsQ0FBQyxDQUFDcUMsSUFBSSxJQUFJckMsV0FBWTtJQUNwRW5DLEtBQUssRUFBRSxjQUFlO0lBQ3RCeUUsV0FBVyxFQUFFLHVEQUF3RDtJQUNyRW5PLElBQUksRUFBQztFQUFPLEVBQ2YsQ0FBQyxlQUNGdkMsMERBQUEsQ0FBQ29OLFlBQVk7SUFDVDVLLE9BQU8sRUFBRSxTQUFUQSxPQUFPQSxDQUFBLEVBQVE7TUFDWCxJQUFJa00sT0FBTyxDQUFDNUQsaUJBQWlCLEtBQUt4QixxRUFBaUIsQ0FBQ1QsRUFBRSxFQUFFO1FBQ3BENEYsV0FBVyxDQUFDLElBQUksQ0FBQztRQUNqQjRCLG1CQUFtQixDQUFDLENBQUM7UUFDckJ0Qyw2QkFBNkIsQ0FBQ1csT0FBTyxDQUFDbEQsS0FBSyxDQUFDLFdBQVEsQ0FBQyxZQUFNO1VBQ3ZEaUQsV0FBVyxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDLENBQUM7TUFDTixDQUFDLE1BQU07UUFDSEosZUFBZSxDQUFDLHdCQUF3QixDQUFDO01BQzdDO0lBQ0osQ0FBRTtJQUNGNUwsUUFBUSxFQUFFLGNBQWU7SUFDekJrTyxPQUFPLEVBQUVuQyxPQUFRO0lBQ2pCak0sSUFBSSxFQUFDLE9BQU87SUFDWkQsT0FBTyxFQUFDO0VBQVcsQ0FDdEIsQ0FDSSxDQUFDLEVBQ1Q2TCwrQkFBK0IsQ0FBQyxDQUFDLGlCQUM5Qm5PLDBEQUFBLENBQUN3TSxzREFBUTtJQUNMakssSUFBSSxFQUFDLFFBQVE7SUFDYnFPLE1BQU0sRUFBQyx1REFBaUQ7SUFDeEQzRixJQUFJLEVBQUV1RSxzQkFBdUI7SUFDN0JoTixPQUFPLEVBQUUsU0FBVEEsT0FBT0EsQ0FBQTtNQUFBLE9BQVFpTiwwQkFBMEIsQ0FBQyxDQUFDRCxzQkFBc0IsQ0FBQztJQUFBO0VBQUMsZ0JBRW5FeFAsMERBQUEsQ0FBQ3FOLFlBQVk7SUFDVHBCLEtBQUssRUFBQyxZQUFZO0lBQ2xCMUosSUFBSSxFQUFDLE9BQU87SUFDWnNKLFFBQVEsRUFBRSxTQUFWQSxRQUFRQSxDQUFHZ0YsS0FBMkM7TUFBQSxPQUNsRFYsa0JBQWtCLENBQUNVLEtBQUssQ0FBQ0MsTUFBTSxDQUFDdlQsS0FBbUIsQ0FBQztJQUFBLENBQ3ZEO0lBQ0RBLEtBQUssRUFBRXlNLE1BQU0sQ0FBQ1ksTUFBTSxDQUFDcUYsVUFBVSxDQUFDekU7RUFBTSxnQkFFdEN4TCwwREFBQTtJQUFRekMsS0FBSyxFQUFFeVAsc0RBQVUsQ0FBQ3NEO0VBQU8sR0FBQyxNQUFZLENBQUMsZUFDL0N0USwwREFBQTtJQUFRekMsS0FBSyxFQUFFeVAsc0RBQVUsQ0FBQ2tEO0VBQVksR0FBQyxhQUFtQixDQUFDLGVBQzFEbFEsMERBQUE7SUFBUXpDLEtBQUssRUFBRXlQLHNEQUFVLENBQUMrRDtFQUF1QixHQUFDLHNCQUF5QixDQUNsRSxDQUFDLEVBQ2RmLHFCQUFxQixpQkFDbEJoUSwwREFBQSxDQUFDcU4sWUFBWTtJQUNUcEIsS0FBSyxFQUFDLGFBQWE7SUFDbkIxSixJQUFJLEVBQUMsT0FBTztJQUNac0osUUFBUSxFQUFFLFNBQVZBLFFBQVFBLENBQUdnRixLQUEyQztNQUFBLE9BQ2xENUIsb0JBQW9CLENBQUM0QixLQUFLLENBQUNDLE1BQU0sQ0FBQ3ZULEtBQUssQ0FBQztJQUFBLENBQzNDO0lBQ0RBLEtBQUssRUFBRXlSO0VBQWlCLGdCQUV4QmhQLDBEQUFBO0lBQVF6QyxLQUFLLEVBQUM7RUFBRSxHQUFDLE1BQVksQ0FBQyxFQUM3QnlRLG9CQUFvQixDQUFDaE0sTUFBTSxLQUFLeEIsZ0VBQWEsQ0FBQ3lFLE9BQU8sSUFDbEQrSSxvQkFBb0IsQ0FBQ3pNLElBQUksQ0FBQ3lQLEdBQUcsQ0FBQyxVQUFBak4sSUFBQSxFQUE2QjtJQUFBLElBQTFCa04sV0FBVyxHQUFBbE4sSUFBQSxDQUFYa04sV0FBVztNQUFFalAsTUFBTSxHQUFBK0IsSUFBQSxDQUFOL0IsTUFBTTtJQUNoRCxPQUNJaVAsV0FBVyxpQkFDUGpSLDBEQUFBO01BQ0l6QyxLQUFLLEVBQUUwVCxXQUFXLENBQUNDLFNBQVU7TUFDN0I3TyxHQUFHLEVBQUU0TyxXQUFXLENBQUNDO0lBQVUsR0FFMUJ2SCxnRUFBYSxDQUFDc0gsV0FBVyxDQUFDQyxTQUFTLENBQUMsRUFBQyxJQUFFLEVBQUMsR0FBRyxFQUMzQ25FLHdEQUFZLENBQUMvSyxNQUFNLENBQUMsQ0FBQ3VKLElBQ2xCLENBQ1g7RUFFVCxDQUFDLENBQUMsZUFDTnZMLDBEQUFBO0lBQVF6QyxLQUFLLEVBQUM7RUFBZ0IsR0FBQyxnQkFBc0IsQ0FDM0MsQ0FDakIsRUFDQXlNLE1BQU0sQ0FBQ1ksTUFBTSxDQUFDcUYsVUFBVSxDQUFDekUsS0FBSyxLQUFLd0Isc0RBQVUsQ0FBQ3NELE1BQU0saUJBQ2pEdFEsMERBQUEsQ0FBQ0ksb0RBQU07SUFDSGtDLE9BQU8sRUFBQyxVQUFVO0lBQ2xCQyxJQUFJLEVBQUMsUUFBUTtJQUNiQyxPQUFPLEVBQUU2TixtQkFBb0I7SUFDN0JjLElBQUksZUFBRW5SLDBEQUFBLENBQUNvTSw4REFBYSxNQUFFO0VBQUUsR0FDM0IsY0FFTyxDQUVOLENBQ2IsRUFDQTRDLGdCQUFnQixLQUFLLGdCQUFnQixpQkFDbENoUCwwREFBQSxDQUFDd04sV0FBVztJQUFDbEwsT0FBTyxFQUFDLFNBQVM7SUFBQzhPLE1BQU07RUFBQSxnQkFDakNwUiwwREFBQSxDQUFDdU0scURBQU87SUFBQ2hLLElBQUksRUFBQyxRQUFRO0lBQUM4TyxLQUFLLEVBQUM7RUFBRyxHQUFDLDhDQUV4QixDQUFDLHlNQUlELENBRW5CLENBQ0wsRUFDQWpDLHFCQUFxQixpQkFDbEJwUCwwREFBQSxDQUFDd04sV0FBVztJQUFDbEwsT0FBTyxFQUFDLFNBQVM7SUFBQzhPLE1BQU07RUFBQSxHQUNoQ2hDLHFCQUNRLENBQ2hCLEVBQ0FwRixNQUFNLENBQUNZLE1BQU0sQ0FBQytFLFVBQVUsQ0FBQ25FLEtBQUssS0FBSzdJLFNBQVMsaUJBQ3pDM0MsMERBQUEsQ0FBQ3NOLFVBQVUscUJBQ1B0TiwwREFBQSxDQUFDNk0sdUZBQWdCO0lBQUM4QyxVQUFVLEVBQUUzRixNQUFNLENBQUNZLE1BQU0sQ0FBQytFLFVBQVUsQ0FBQ25FO0VBQU0sQ0FBRSxDQUN2RCxDQUVHLENBQ04sQ0FBQztBQUU5QixDQUFDO0FBQUMxSSxFQUFBLENBek1XNkssV0FBcUI7RUFBQSxRQVMxQmxFLDRGQUE4QixFQUlsQmtELDJEQUFPLEVBSUlHLHdGQUFvQjtBQUFBO0FBQUF3RSxHQUFBLEdBakJ0QzNELFdBQXFCO0FBQUEsSUFBQXRILEVBQUEsRUFBQXlCLEdBQUEsRUFBQVUsR0FBQSxFQUFBRyxHQUFBLEVBQUFLLEdBQUEsRUFBQTBFLEdBQUEsRUFBQTRELEdBQUE7QUFBQTNLLHNDQUFBLENBQUFOLEVBQUE7QUFBQU0sc0NBQUEsQ0FBQW1CLEdBQUE7QUFBQW5CLHNDQUFBLENBQUE2QixHQUFBO0FBQUE3QixzQ0FBQSxDQUFBZ0MsR0FBQTtBQUFBaEMsc0NBQUEsQ0FBQXFDLEdBQUE7QUFBQXJDLHNDQUFBLENBQUErRyxHQUFBO0FBQUEvRyxzQ0FBQSxDQUFBMkssR0FBQSxpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDbERsQyxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL2NvbnRleHQvQXBwQ29udGV4dC50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvaWtvbmVyL0tvbnRvcklrb25HcsO4bm4udHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL2lrb25lci9TdGF0dXNJa29uLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9NYW51ZWxsSm91cm5hbGbDuHJpbmcvQXZzZW5kZXJQYW5lbC50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvTWFudWVsbEpvdXJuYWxmw7hyaW5nL0JydWtlclBhbmVsLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHR5cGUgUHJvcHNXaXRoQ2hpbGRyZW4sIHVzZVN0YXRlLCB0eXBlIEpTWCB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBBeGlvc1JlcXVlc3RDb25maWcgfSBmcm9tICdheGlvcyc7XG5cbmltcG9ydCB7IEJvZHlTaG9ydCwgQnV0dG9uLCBIU3RhY2sgfSBmcm9tICdAbmF2aWt0L2RzLXJlYWN0JztcbmltcG9ydCB7IGxvZ2dGZWlsLCB1c2VIdHRwIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLWh0dHAnO1xuaW1wb3J0IHR5cGUgeyBJU2Frc2JlaGFuZGxlciwgUmVzc3VycyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcblxuaW1wb3J0IHsgdXNlQXV0aENvbnRleHQgfSBmcm9tICcuL0F1dGhDb250ZXh0JztcbmltcG9ydCB7IHVzZUZlYXR1cmVUb2dnbGVzIH0gZnJvbSAnLi4vaG9va3MvdXNlRmVhdHVyZVRvZ2dsZXMnO1xuaW1wb3J0IFN0YXR1c0lrb24sIHsgU3RhdHVzIH0gZnJvbSAnLi4vaWtvbmVyL1N0YXR1c0lrb24nO1xuaW1wb3J0IHR5cGUgeyBJVG9hc3QsIFRvYXN0VHlwZXIgfSBmcm9tICcuLi9rb21wb25lbnRlci9Ub2FzdC90eXBlcic7XG5pbXBvcnQgeyBCZWhhbmRsZXJSb2xsZSB9IGZyb20gJy4uL3R5cGVyL2JlaGFuZGxpbmcnO1xuaW1wb3J0IHsgRmVhdHVyZVRvZ2dsZSB9IGZyb20gJy4uL3R5cGVyL2ZlYXR1cmVUb2dnbGVzJztcbmltcG9ydCB0eXBlIHsgSVBlcnNvbkluZm8sIElSZXN0VGlsZ2FuZyB9IGZyb20gJy4uL3R5cGVyL3BlcnNvbic7XG5pbXBvcnQgeyBhZHJlc3NlYmVza3l0dGVsc2VzdHlwZXIgfSBmcm9tICcuLi90eXBlci9wZXJzb24nO1xuaW1wb3J0IHsgZ3J1cHBlSWRUaWxSb2xsZSwgZ3J1cHBlSWRUaWxTdXBlcmJydWtlclJvbGxlIH0gZnJvbSAnLi4vdXRpbHMvYmVoYW5kbGluZyc7XG5pbXBvcnQgeyB0aWxGZWlsc2lkZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbnMnO1xuXG5leHBvcnQgdHlwZSBGYW1pbGllQXhpb3NSZXF1ZXN0Q29uZmlnPEQ+ID0gQXhpb3NSZXF1ZXN0Q29uZmlnICYge1xuICAgIGRhdGE/OiBEO1xuICAgIHDDpXZpcmtlclN5c3RlbUxhc3Rlcj86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElNb2RhbCB7XG4gICAgYWN0aW9ucz86IEpTWC5FbGVtZW50W10gfCBKU1guRWxlbWVudDtcbiAgICBpbm5ob2xkPzogKCkgPT4gUmVhY3QuUmVhY3ROb2RlO1xuICAgIG9uQ2xvc2U/OiAoKSA9PiB2b2lkO1xuICAgIHRpdHRlbDogc3RyaW5nO1xuICAgIHZpc01vZGFsOiBib29sZWFuO1xufVxuXG5jb25zdCBpbml0YWxTdGF0ZTogSU1vZGFsID0ge1xuICAgIHRpdHRlbDogJycsXG4gICAgdmlzTW9kYWw6IGZhbHNlLFxufTtcblxuY29uc3QgdGlsZ2FuZ01vZGFsID0gKGRhdGE6IElSZXN0VGlsZ2FuZywgbHVra01vZGFsOiAoKSA9PiB2b2lkKSA9PiAoe1xuICAgIHRpdHRlbDogJ0Rpc2tyZXNqb25za29kZScsXG4gICAgdmlzTW9kYWw6ICFkYXRhLnNha3NiZWhhbmRsZXJIYXJUaWxnYW5nLFxuICAgIG9uQ2xvc2U6ICgpID0+IGx1a2tNb2RhbCgpLFxuICAgIGlubmhvbGQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxIU3RhY2sgZ2FwPVwiNFwiIGFsaWduPVwiY2VudGVyXCIgbWFyZ2luQmxvY2s9XCIyXCI+XG4gICAgICAgICAgICAgICAgPFN0YXR1c0lrb24gc3RhdHVzPXtTdGF0dXMuRkVJTH0gLz5cbiAgICAgICAgICAgICAgICA8Qm9keVNob3J0PlxuICAgICAgICAgICAgICAgICAgICB7YEJydWtlciBoYXIgZGlza3Jlc2pvbnNrb2RlICR7YWRyZXNzZWJlc2t5dHRlbHNlc3R5cGVyW2RhdGEuYWRyZXNzZWJlc2t5dHRlbHNlZ3JhZGVyaW5nXX1gfVxuICAgICAgICAgICAgICAgIDwvQm9keVNob3J0PlxuICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICk7XG4gICAgfSxcbiAgICBhY3Rpb25zOiBbPEJ1dHRvbiBrZXk9XCJsdWtrXCIgdmFyaWFudD1cInByaW1hcnlcIiBzaXplPVwic21hbGxcIiBvbkNsaWNrPXtsdWtrTW9kYWx9IGNoaWxkcmVuPVwiTHVra1wiIC8+XSxcbn0pO1xuXG5pbnRlcmZhY2UgQXBwQ29udGV4dFZhbHVlIHtcbiAgICBhdXRlbnRpc2VydDogYm9vbGVhbjtcbiAgICBoZW50U2Frc2JlaGFuZGxlclJvbGxlOiAoKSA9PiBCZWhhbmRsZXJSb2xsZTtcbiAgICBpbm5sb2dnZXRTYWtzYmVoYW5kbGVyOiBJU2Frc2JlaGFuZGxlciB8IHVuZGVmaW5lZDtcbiAgICBoYXJJbm5sb2dnZXRTYWtzYmVoYW5kbGVyU2tyaXZldGlsZ2FuZzogKCkgPT4gYm9vbGVhbjtcbiAgICBoYXJJbm5sb2dnZXRTYWtzYmVoYW5kbGVyU3VwZXJicnVrZXJUaWxnYW5nOiAoKSA9PiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIGFwcEluZm9Nb2RhbDogSU1vZGFsO1xuICAgIHNldHRUb2FzdDogKHRvYXN0SWQ6IFRvYXN0VHlwZXIsIHRvYXN0OiBJVG9hc3QpID0+IHZvaWQ7XG4gICAgc2V0dFRvYXN0czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248eyBbdG9hc3RJZDogc3RyaW5nXTogSVRvYXN0IH0+PjtcbiAgICBzamVra1RpbGdhbmc6IChicnVrZXJJZGVudDogc3RyaW5nLCB2aXNTeXN0ZW1ldExhc3Rlcj86IGJvb2xlYW4pID0+IFByb21pc2U8Ym9vbGVhbj47XG4gICAgc3lzdGVtZXRMYXN0ZXI6ICgpID0+IGJvb2xlYW47XG4gICAgdG9hc3RzOiB7IFt0b2FzdElkOiBzdHJpbmddOiBJVG9hc3QgfTtcbiAgICBoZW50UGVyc29uOiAoYnJ1a2VySWRlbnQ6IHN0cmluZykgPT4gUHJvbWlzZTxSZXNzdXJzPElQZXJzb25JbmZvPj47XG4gICAgc2thbE9iZnVza2VyZURhdGE6IGJvb2xlYW47XG59XG5cbmNvbnN0IEFwcENvbnRleHQgPSBjcmVhdGVDb250ZXh0PEFwcENvbnRleHRWYWx1ZSB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcblxuY29uc3QgQXBwUHJvdmlkZXIgPSAocHJvcHM6IFByb3BzV2l0aENoaWxkcmVuKSA9PiB7XG4gICAgY29uc3QgeyBhdXRlbnRpc2VydCwgaW5ubG9nZ2V0U2Frc2JlaGFuZGxlciB9ID0gdXNlQXV0aENvbnRleHQoKTtcbiAgICBjb25zdCB7IHJlcXVlc3QsIHN5c3RlbWV0TGFzdGVyIH0gPSB1c2VIdHRwKCk7XG4gICAgY29uc3QgdG9nZ2xlcyA9IHVzZUZlYXR1cmVUb2dnbGVzKCk7XG5cbiAgICBjb25zdCBbYXBwSW5mb01vZGFsLCBzZXR0QXBwSW5mb01vZGFsXSA9IFJlYWN0LnVzZVN0YXRlPElNb2RhbD4oaW5pdGFsU3RhdGUpO1xuICAgIGNvbnN0IFt0b2FzdHMsIHNldHRUb2FzdHNdID0gdXNlU3RhdGU8eyBbdG9hc3RJZDogc3RyaW5nXTogSVRvYXN0IH0+KHt9KTtcblxuICAgIGNvbnN0IGx1a2tNb2RhbCA9ICgpID0+IHtcbiAgICAgICAgc2V0dEFwcEluZm9Nb2RhbChpbml0YWxTdGF0ZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhlbnRQZXJzb24gPSBhc3luYyAoYnJ1a2VySWRlbnQ6IHN0cmluZyk6IFByb21pc2U8UmVzc3VyczxJUGVyc29uSW5mbz4+ID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3Q8eyBpZGVudDogc3RyaW5nIH0sIElQZXJzb25JbmZvPih7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9mYW1pbGllLWJhLXNhay9hcGkvcGVyc29uL2Vua2VsJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpZGVudDogYnJ1a2VySWRlbnQsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KS50aGVuKChyZXNzdXJzOiBSZXNzdXJzPElQZXJzb25JbmZvPikgPT4ge1xuICAgICAgICAgICAgaWYgKCdkYXRhJyBpbiByZXNzdXJzICYmIHJlc3N1cnMuZGF0YS5oYXJUaWxnYW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHNldHRBcHBJbmZvTW9kYWwoXG4gICAgICAgICAgICAgICAgICAgIHRpbGdhbmdNb2RhbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYWtzYmVoYW5kbGVySGFyVGlsZ2FuZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRyZXNzZWJlc2t5dHRlbHNlZ3JhZGVyaW5nOiByZXNzdXJzLmRhdGEuYWRyZXNzZWJlc2t5dHRlbHNlR3JhZGVyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGx1a2tNb2RhbFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNzdXJzO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2pla2tUaWxnYW5nID0gYXN5bmMgKGJydWtlcklkZW50OiBzdHJpbmcsIHZpc1N5c3RlbWV0TGFzdGVyID0gdHJ1ZSk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgICAgICByZXR1cm4gcmVxdWVzdDx7IGJydWtlcklkZW50OiBzdHJpbmcgfSwgSVJlc3RUaWxnYW5nPih7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9mYW1pbGllLWJhLXNhay9hcGkvdGlsZ2FuZycsXG4gICAgICAgICAgICBkYXRhOiB7IGJydWtlcklkZW50IH0sXG4gICAgICAgICAgICBww6V2aXJrZXJTeXN0ZW1MYXN0ZXI6IHZpc1N5c3RlbWV0TGFzdGVyLFxuICAgICAgICB9KS50aGVuKChyZXNzdXJzOiBSZXNzdXJzPElSZXN0VGlsZ2FuZz4pID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNzdXJzLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5TVUtTRVNTKSB7XG4gICAgICAgICAgICAgICAgc2V0dEFwcEluZm9Nb2RhbCh0aWxnYW5nTW9kYWwocmVzc3Vycy5kYXRhLCBsdWtrTW9kYWwpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzc3Vycy5kYXRhLnNha3NiZWhhbmRsZXJIYXJUaWxnYW5nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBoZW50U2Frc2JlaGFuZGxlclJvbGxlID0gKCk6IEJlaGFuZGxlclJvbGxlID0+IHtcbiAgICAgICAgbGV0IHJvbGxlID0gQmVoYW5kbGVyUm9sbGUuVUtKRU5UO1xuICAgICAgICBpZiAoaW5ubG9nZ2V0U2Frc2JlaGFuZGxlciAmJiBpbm5sb2dnZXRTYWtzYmVoYW5kbGVyLmdyb3Vwcykge1xuICAgICAgICAgICAgaW5ubG9nZ2V0U2Frc2JlaGFuZGxlci5ncm91cHMuZm9yRWFjaCgoaWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHJvbGxlID0gcm9sbGUgPCBncnVwcGVJZFRpbFJvbGxlKGlkKSA/IGdydXBwZUlkVGlsUm9sbGUoaWQpIDogcm9sbGU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbm5sb2dnZXRTYWtzYmVoYW5kbGVyICYmIHJvbGxlID09PSBCZWhhbmRsZXJSb2xsZS5VS0pFTlQpIHtcbiAgICAgICAgICAgIGxvZ2dGZWlsKFxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBpbm5sb2dnZXRTYWtzYmVoYW5kbGVyLFxuICAgICAgICAgICAgICAgICdTYWtzYmVoYW5kbGVyIHRpbGjDuHJlciBpbmdlbiBhdiBkZSBkZWZpbmVydGUgdGlsZ2FuZ3NncnVwcGVuZS4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGlsRmVpbHNpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByb2xsZTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFySW5ubG9nZ2V0U2Frc2JlaGFuZGxlclNrcml2ZXRpbGdhbmcgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvbGxlID0gaGVudFNha3NiZWhhbmRsZXJSb2xsZSgpO1xuXG4gICAgICAgIHJldHVybiByb2xsZSA+PSBCZWhhbmRsZXJSb2xsZS5TQUtTQkVIQU5ETEVSO1xuICAgIH07XG5cbiAgICBjb25zdCBoYXJJbm5sb2dnZXRTYWtzYmVoYW5kbGVyU3VwZXJicnVrZXJUaWxnYW5nID0gKCkgPT5cbiAgICAgICAgaW5ubG9nZ2V0U2Frc2JlaGFuZGxlcj8uZ3JvdXBzPy5pbmNsdWRlcyhncnVwcGVJZFRpbFN1cGVyYnJ1a2VyUm9sbGUpO1xuXG4gICAgY29uc3Qgc2thbE9iZnVza2VyZURhdGEgPSB0b2dnbGVzW0ZlYXR1cmVUb2dnbGUuc2thbE9iZnVza2VyZURhdGFdICYmICFoYXJJbm5sb2dnZXRTYWtzYmVoYW5kbGVyU2tyaXZldGlsZ2FuZygpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEFwcENvbnRleHQuUHJvdmlkZXJcbiAgICAgICAgICAgIHZhbHVlPXt7XG4gICAgICAgICAgICAgICAgYXV0ZW50aXNlcnQsXG4gICAgICAgICAgICAgICAgaGVudFNha3NiZWhhbmRsZXJSb2xsZSxcbiAgICAgICAgICAgICAgICBpbm5sb2dnZXRTYWtzYmVoYW5kbGVyLFxuICAgICAgICAgICAgICAgIGhhcklubmxvZ2dldFNha3NiZWhhbmRsZXJTa3JpdmV0aWxnYW5nLFxuICAgICAgICAgICAgICAgIGhhcklubmxvZ2dldFNha3NiZWhhbmRsZXJTdXBlcmJydWtlclRpbGdhbmcsXG4gICAgICAgICAgICAgICAgYXBwSW5mb01vZGFsLFxuICAgICAgICAgICAgICAgIHNldHRUb2FzdDogKHRvYXN0SWQ6IFRvYXN0VHlwZXIsIHRvYXN0OiBJVG9hc3QpID0+XG4gICAgICAgICAgICAgICAgICAgIHNldHRUb2FzdHMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4udG9hc3RzLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RvYXN0SWRdOiB0b2FzdCxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgc2V0dFRvYXN0cyxcbiAgICAgICAgICAgICAgICBzamVra1RpbGdhbmcsXG4gICAgICAgICAgICAgICAgc3lzdGVtZXRMYXN0ZXIsXG4gICAgICAgICAgICAgICAgdG9hc3RzLFxuICAgICAgICAgICAgICAgIGhlbnRQZXJzb24sXG4gICAgICAgICAgICAgICAgc2thbE9iZnVza2VyZURhdGEsXG4gICAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvQXBwQ29udGV4dC5Qcm92aWRlcj5cbiAgICApO1xufTtcblxuY29uc3QgdXNlQXBwQ29udGV4dCA9ICgpID0+IHtcbiAgICBjb25zdCBjb250ZXh0ID0gUmVhY3QudXNlQ29udGV4dChBcHBDb250ZXh0KTtcbiAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1c2VBcHBDb250ZXh0IG3DpSBicnVrZXMgaW5uZW5mb3IgQXBwUHJvdmlkZXInKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59O1xuXG5leHBvcnQgeyBBcHBQcm92aWRlciwgdXNlQXBwQ29udGV4dCB9O1xuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQnVpbGRpbmdzM0ljb24gfSBmcm9tICdAbmF2aWt0L2Frc2VsLWljb25zJztcbmltcG9ydCB7IEFHcmVlbjYwMCB9IGZyb20gJ0BuYXZpa3QvZHMtdG9rZW5zL2Rpc3QvdG9rZW5zJztcblxuaW50ZXJmYWNlIElLb250b3JJa29uR3LDuG5uIHtcbiAgICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gICAgaGVpZ2h0PzogJzMyJyB8ICcyNCc7XG4gICAgd2lkdGg/OiAnMzInIHwgJzI0JztcbiAgICBjb2xvcj86IHN0cmluZztcbn1cblxuY29uc3QgSWtvblNpcmtlbCA9IHN0eWxlZC5zcGFuPHtcbiAgICAkaGVpZ2h0OiBJS29udG9ySWtvbkdyw7hublsnaGVpZ2h0J107XG4gICAgJHdpZHRoOiBJS29udG9ySWtvbkdyw7hublsnd2lkdGgnXTtcbiAgICAkY29sb3I6IElLb250b3JJa29uR3LDuG5uWydjb2xvciddO1xufT5gXG4gICAgYm9yZGVyLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLiRjb2xvcn07XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMuJGNvbG9yfTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZ3JpZDtcbiAgICBwbGFjZS1pdGVtczogY2VudGVyO1xuICAgIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy4kaGVpZ2h0fXB4O1xuICAgIHdpZHRoOiAke3Byb3BzID0+IHByb3BzLiR3aWR0aH1weDtcbiAgICBjb2xvcjogd2hpdGU7XG5gO1xuXG5jb25zdCBLb250b3JJa29uR3LDuG5uOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxJS29udG9ySWtvbkdyw7hubj4gPSAoe1xuICAgIGNsYXNzTmFtZSxcbiAgICBoZWlnaHQgPSAnMjQnLFxuICAgIHdpZHRoID0gJzI0JyxcbiAgICBjb2xvciA9IEFHcmVlbjYwMCxcbn0pID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8SWtvblNpcmtlbCAkaGVpZ2h0PXtoZWlnaHR9ICR3aWR0aD17d2lkdGh9ICRjb2xvcj17Y29sb3J9PlxuICAgICAgICAgICAgPEJ1aWxkaW5nczNJY29uIGhlaWdodD17aGVpZ2h0ID09PSAnMjQnID8gMjAgOiAyOH0gd2lkdGg9e3dpZHRoID09PSAnMjQnID8gMjAgOiAyOH0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IC8+XG4gICAgICAgIDwvSWtvblNpcmtlbD5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgS29udG9ySWtvbkdyw7hubjtcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7XG4gICAgQ2hlY2ttYXJrQ2lyY2xlRmlsbEljb24sXG4gICAgRXhjbGFtYXRpb25tYXJrVHJpYW5nbGVGaWxsSWNvbixcbiAgICBJbmZvcm1hdGlvblNxdWFyZUZpbGxJY29uLFxuICAgIFhNYXJrT2N0YWdvbkZpbGxJY29uLFxufSBmcm9tICdAbmF2aWt0L2Frc2VsLWljb25zJztcblxuaW50ZXJmYWNlIElQcm9wcyB7XG4gICAgc3RhdHVzOiBTdGF0dXM7XG4gICAgdGl0bGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIFN0YXR1cyB7XG4gICAgQURWQVJTRUwsXG4gICAgRkVJTCxcbiAgICBPSyxcbiAgICBJTkZPLFxufVxuXG5jb25zdCBPa0lrb24gPSBzdHlsZWQoQ2hlY2ttYXJrQ2lyY2xlRmlsbEljb24pYFxuICAgIGNvbG9yOiB2YXIoLS1hLWljb24tc3VjY2Vzcyk7XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgbWluLXdpZHRoOiAxLjVyZW07XG5gO1xuXG5jb25zdCBGZWlsSWtvbiA9IHN0eWxlZChYTWFya09jdGFnb25GaWxsSWNvbilgXG4gICAgY29sb3I6IHZhcigtLWEtaWNvbi1kYW5nZXIpO1xuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgIG1pbi13aWR0aDogMS41cmVtO1xuYDtcblxuY29uc3QgQWR2YXJzZWxJa29uID0gc3R5bGVkKEV4Y2xhbWF0aW9ubWFya1RyaWFuZ2xlRmlsbEljb24pYFxuICAgIGNvbG9yOiB2YXIoLS1hLWljb24td2FybmluZyk7XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgbWluLXdpZHRoOiAxLjVyZW07XG5gO1xuXG5jb25zdCBJbmZvSWtvbiA9IHN0eWxlZChJbmZvcm1hdGlvblNxdWFyZUZpbGxJY29uKWBcbiAgICBjb2xvcjogdmFyKC0tYS1pY29uLWluZm8pO1xuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgIG1pbi13aWR0aDogMS41cmVtO1xuYDtcblxuY29uc3QgU3RhdHVzSWtvbjogUmVhY3QuRkM8SVByb3BzPiA9ICh7IHN0YXR1cywgdGl0bGUgfSkgPT4ge1xuICAgIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgICAgIGNhc2UgU3RhdHVzLk9LOlxuICAgICAgICAgICAgcmV0dXJuIDxPa0lrb24gdGl0bGU9e3RpdGxlfSAvPjtcbiAgICAgICAgY2FzZSBTdGF0dXMuRkVJTDpcbiAgICAgICAgICAgIHJldHVybiA8RmVpbElrb24gdGl0bGU9e3RpdGxlfSAvPjtcbiAgICAgICAgY2FzZSBTdGF0dXMuQURWQVJTRUw6XG4gICAgICAgICAgICByZXR1cm4gPEFkdmFyc2VsSWtvbiB0aXRsZT17dGl0bGV9IC8+O1xuICAgICAgICBjYXNlIFN0YXR1cy5JTkZPOlxuICAgICAgICAgICAgcmV0dXJuIDxJbmZvSWtvbiB0aXRsZT17dGl0bGV9IC8+O1xuICAgIH1cbn07XG5leHBvcnQgZGVmYXVsdCBTdGF0dXNJa29uO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEJvZHlTaG9ydCwgQ2hlY2tib3gsIEV4cGFuc2lvbkNhcmQsIFRleHRGaWVsZCB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHsgVmFsaWRlcmluZ3NzdGF0dXMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtc2tqZW1hJztcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0F2c2VuZGVyUGFuZWwubW9kdWxlLmNzcyc7XG5pbXBvcnQgeyBEZWx0YWdlckluZm8gfSBmcm9tICcuL0RlbHRhZ2VySW5mbyc7XG5pbXBvcnQgeyB1c2VNYW51ZWxsSm91cm5hbGbDuHJpbmdDb250ZXh0IH0gZnJvbSAnLi9NYW51ZWxsSm91cm5hbGbDuHJpbmdDb250ZXh0JztcbmltcG9ydCB7IEVtYWlsSWtvbiB9IGZyb20gJy4uLy4uL2lrb25lci9FbWFpbElrb24nO1xuaW1wb3J0IHsgZm9ybWF0ZXJJZGVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm1hdHRlcic7XG5cbmNvbnN0IFN0eWxlZEV4cGFuc2lvbkNhcmQgPSBzdHlsZWQoRXhwYW5zaW9uQ2FyZClgXG4gICAgbWFyZ2luLXRvcDogMXJlbTtcbmA7XG5cbmV4cG9ydCBjb25zdCBBdnNlbmRlclBhbmVsOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNramVtYSwgZXJMZXNldmlzbmluZywgc2V0dEF2c2VuZGVyTGlrQnJ1a2VyLCB0aWxiYWtlc3RpbGxBdnNlbmRlciwgZXJEaWdpdGFsdElubnNlbmR0RG9rdW1lbnQgfSA9XG4gICAgICAgIHVzZU1hbnVlbGxKb3VybmFsZsO4cmluZ0NvbnRleHQoKTtcbiAgICBjb25zdCBbw6VwZW4sIHNldHTDhXBlbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2JydWtlckVyQXZzZW5kZXIsIHNldHRCcnVrZXJFckF2c2VuZGVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHNramVtYS52aXNGZWlsbWVsZGluZ2VyICYmXG4gICAgICAgICAgICAoc2tqZW1hLmZlbHRlci5hdnNlbmRlck5hdm4udmFsaWRlcmluZ3NzdGF0dXMgPT09IFZhbGlkZXJpbmdzc3RhdHVzLkZFSUwgfHxcbiAgICAgICAgICAgICAgICBza2plbWEuZmVsdGVyLmF2c2VuZGVySWRlbnQudmFsaWRlcmluZ3NzdGF0dXMgPT09IFZhbGlkZXJpbmdzc3RhdHVzLkZFSUwpXG4gICAgICAgICkge1xuICAgICAgICAgICAgc2V0dMOFcGVuKHRydWUpO1xuICAgICAgICB9XG4gICAgfSwgW1xuICAgICAgICBza2plbWEudmlzRmVpbG1lbGRpbmdlcixcbiAgICAgICAgc2tqZW1hLmZlbHRlci5hdnNlbmRlck5hdm4udmFsaWRlcmluZ3NzdGF0dXMsXG4gICAgICAgIHNramVtYS5mZWx0ZXIuYXZzZW5kZXJJZGVudC52YWxpZGVyaW5nc3N0YXR1cyxcbiAgICBdKTtcblxuICAgIGNvbnN0IGxlc2V2aXNuaW5nID0gZXJMZXNldmlzbmluZygpIHx8IGVyRGlnaXRhbHRJbm5zZW5kdERva3VtZW50O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPFN0eWxlZEV4cGFuc2lvbkNhcmRcbiAgICAgICAgICAgIG9wZW49e8OlcGVufVxuICAgICAgICAgICAgb25Ub2dnbGU9eygpID0+IHtcbiAgICAgICAgICAgICAgICBzZXR0w4VwZW4oIcOlcGVuKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkF2c2VuZGVycGFuZWxcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8RXhwYW5zaW9uQ2FyZC5IZWFkZXI+XG4gICAgICAgICAgICAgICAgPEV4cGFuc2lvbkNhcmQuVGl0bGU+XG4gICAgICAgICAgICAgICAgICAgIDxEZWx0YWdlckluZm9cbiAgICAgICAgICAgICAgICAgICAgICAgIGlrb249ezxFbWFpbElrb24gZmlsbGVkPXvDpXBlbn0gd2lkdGg9ezQ4fSBoZWlnaHQ9ezQ4fSAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdm49e3NramVtYS5mZWx0ZXIuYXZzZW5kZXJOYXZuLnZlcmRpIHx8ICdVa2plbnQgYXZzZW5kZXInfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnQ9e2Zvcm1hdGVySWRlbnQoc2tqZW1hLmZlbHRlci5hdnNlbmRlcklkZW50LnZlcmRpID8/ICcnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVydGl0dGVsPVwiQXZzZW5kZXJcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uQ2FyZC5UaXRsZT5cbiAgICAgICAgICAgIDwvRXhwYW5zaW9uQ2FyZC5IZWFkZXI+XG4gICAgICAgICAgICA8RXhwYW5zaW9uQ2FyZC5Db250ZW50IGNsYXNzTmFtZT17c3R5bGVzLmlubmVyQ29udGVudH0+XG4gICAgICAgICAgICAgICAge2xlc2V2aXNuaW5nID8gKFxuICAgICAgICAgICAgICAgICAgICBicnVrZXJFckF2c2VuZGVyID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEJvZHlTaG9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnc2tqZW1hZWxlbWVudCcsICdsZXNlLWZlbHQnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbj17J0F2c2VuZGVyIGVyIGJydWtlcid9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbFxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eydBdnNlbmRlciBlciBicnVrZXInfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17YnJ1a2VyRXJBdnNlbmRlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJydWtlckVyQXZzZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsYmFrZXN0aWxsQXZzZW5kZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0QXZzZW5kZXJMaWtCcnVrZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dEJydWtlckVyQXZzZW5kZXIoIWJydWtlckVyQXZzZW5kZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgQXZzZW5kZXIgZXIgYnJ1a2VyXG4gICAgICAgICAgICAgICAgICAgIDwvQ2hlY2tib3g+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgIHsuLi5za2plbWEuZmVsdGVyLmF2c2VuZGVyTmF2bi5oZW50TmF2SW5wdXRQcm9wcyhza2plbWEudmlzRmVpbG1lbGRpbmdlcil9XG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXtsZXNldmlzbmluZ31cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eydOYXZuJ31cbiAgICAgICAgICAgICAgICAgICAgc2l6ZT17J21lZGl1bSd9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXsnTmF2bid9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXticnVrZXJFckF2c2VuZGVyfVxuICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgIHsuLi5za2plbWEuZmVsdGVyLmF2c2VuZGVySWRlbnQuaGVudE5hdklucHV0UHJvcHMoc2tqZW1hLnZpc0ZlaWxtZWxkaW5nZXIpfVxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17bGVzZXZpc25pbmd9XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXsnSWRlbnQnfVxuICAgICAgICAgICAgICAgICAgICBzaXplPXsnbWVkaXVtJ31cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9eydGbnIvZG5yL29yZ25yJ31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2JydWtlckVyQXZzZW5kZXJ9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvRXhwYW5zaW9uQ2FyZC5Db250ZW50PlxuICAgICAgICA8L1N0eWxlZEV4cGFuc2lvbkNhcmQ+XG4gICAgKTtcbn07XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEFycm93VW5kb0ljb24sIEJ1aWxkaW5nczNGaWxsSWNvbiB9IGZyb20gJ0BuYXZpa3QvYWtzZWwtaWNvbnMnO1xuaW1wb3J0IHsgQWxlcnQsIEJ1dHRvbiwgRXhwYW5zaW9uQ2FyZCwgSGVhZGluZywgUmVhZE1vcmUsIFNlbGVjdCwgVGV4dEZpZWxkIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgeyBCZ0FjY2VudFN0cm9uZyB9IGZyb20gJ0BuYXZpa3QvZHMtdG9rZW5zL2Rpc3QvdG9rZW5zJztcbmltcG9ydCB7IHVzZUZlbHQsIFZhbGlkZXJpbmdzc3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXNramVtYSc7XG5pbXBvcnQgdHlwZSB7IFJlc3N1cnMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuaW1wb3J0IHsgUmVzc3Vyc1N0YXR1cyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9CcnVrZXJQYW5lbC5tb2R1bGUuY3NzJztcbmltcG9ydCB7IERlbHRhZ2VySW5mbyB9IGZyb20gJy4vRGVsdGFnZXJJbmZvJztcbmltcG9ydCB7IHVzZU1hbnVlbGxKb3VybmFsZsO4cmluZ0NvbnRleHQgfSBmcm9tICcuL01hbnVlbGxKb3VybmFsZsO4cmluZ0NvbnRleHQnO1xuaW1wb3J0IHsgS29udG9TaXJrZWwgfSBmcm9tICcuLi8uLi9pa29uZXIvS29udG9TaXJrZWwnO1xuaW1wb3J0IHsgU2FtaGFuZGxlclRhYmVsbCB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL1NhbWhhbmRsZXIvU2FtaGFuZGxlclRhYmVsbCc7XG5pbXBvcnQgeyB1c2VTYW1oYW5kbGVyUmVxdWVzdCB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL1NhbWhhbmRsZXIvdXNlU2FtaGFuZGxlcic7XG5pbXBvcnQgeyBmYWdzYWtTdGF0dXMsIEZhZ3Nha1R5cGUgfSBmcm9tICcuLi8uLi90eXBlci9mYWdzYWsnO1xuaW1wb3J0IHR5cGUgeyBJU2FtaGFuZGxlckluZm8gfSBmcm9tICcuLi8uLi90eXBlci9zYW1oYW5kbGVyJztcbmltcG9ydCB7IGZvcm1hdGVySWRlbnQgfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXR0ZXInO1xuaW1wb3J0IHsgaWRlbnRWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi91dGlscy92YWxpZGF0b3JzJztcblxuY29uc3QgRmxleERpdiA9IHN0eWxlZC5kaXZgXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG5gO1xuXG5jb25zdCBTdHlsZWRCdXR0b24gPSBzdHlsZWQoQnV0dG9uKWBcbiAgICBtYXJnaW4tbGVmdDogMXJlbTtcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xuICAgIHdpZHRoOiAxMHJlbTtcbmA7XG5cbmNvbnN0IFN0eWxlZEV4cGFuc2lvbkNhcmQgPSBzdHlsZWQoRXhwYW5zaW9uQ2FyZClgXG4gICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICB3aWR0aDogMTAwJTtcbmA7XG5cbmNvbnN0IFN0eWxlZFNlbGVjdCA9IHN0eWxlZChTZWxlY3QpYFxuICAgIG1hcmdpbjogMC43NXJlbSAwIDEuMjVyZW07XG5gO1xuXG5jb25zdCBUb3BwTWFyZ2luID0gc3R5bGVkLmRpdmBcbiAgICBtYXJnaW4tdG9wOiAycmVtO1xuYDtcblxuY29uc3QgU3R5bGVkQWxlcnQgPSBzdHlsZWQoQWxlcnQpYFxuICAgIG1hcmdpbi10b3A6IDJyZW07XG5gO1xuXG5leHBvcnQgY29uc3QgQnJ1a2VyUGFuZWw6IFJlYWN0LkZDID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgICAgc2tqZW1hLFxuICAgICAgICBlbmRyZUJydWtlck9nU2V0dE5vcm1hbEZhZ3NhayxcbiAgICAgICAgZXJMZXNldmlzbmluZyxcbiAgICAgICAgaW5zdGl0dXNqb25zZmFnc2FrZXIsXG4gICAgICAgIHNldHRNaW5pbWFsRmFnc2FrVGlsSW5zdGl0dXNqb25zZmFnc2FrLFxuICAgICAgICBzZXR0TWluaW1hbEZhZ3Nha1RpbE5vcm1hbEZhZ3Nha0ZvclBlcnNvbixcbiAgICAgICAga2FuS255dHRlc1RpbEluc3RpdHVzam9uc2ZhZ3NhayxcbiAgICB9ID0gdXNlTWFudWVsbEpvdXJuYWxmw7hyaW5nQ29udGV4dCgpO1xuICAgIGNvbnN0IFvDpXBlbiwgc2V0dMOFcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbZmVpbE1lbGRpbmcsIHNldHRGZWlsTWVsZGluZ10gPSB1c2VTdGF0ZTxzdHJpbmcgfCB1bmRlZmluZWQ+KCcnKTtcbiAgICBjb25zdCBbc3Bpbm5lciwgc2V0dFNwaW5uZXJdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IG55SWRlbnQgPSB1c2VGZWx0KHtcbiAgICAgICAgdmVyZGk6ICcnLFxuICAgICAgICB2YWxpZGVyaW5nc2Z1bmtzam9uOiBpZGVudFZhbGlkYXRvcixcbiAgICB9KTtcbiAgICBjb25zdCB7IGhlbnRTYW1oYW5kbGVyIH0gPSB1c2VTYW1oYW5kbGVyUmVxdWVzdChmYWxzZSk7XG4gICAgY29uc3QgW3ZhbGd0SW5zdGl0dXNqb24sIHNldHRWYWxndEluc3RpdHVzam9uXSA9IHVzZVN0YXRlPHN0cmluZz4oJycpO1xuICAgIGNvbnN0IFtzYW1oYW5kbGVyRmVpbG1lbGRpbmcsIHNldHRTYW1oYW5kbGVyRmVpbG1lbGRpbmddID0gdXNlU3RhdGU8c3RyaW5nPignJyk7XG4gICAgY29uc3QgW2VyRmFnc2FrdHlwZVBhbmVsw4VwbmV0LCBzZXR0RXJGYWdzYWt0eXBlUGFuZWzDhXBuZXRdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgc2V0dEZlaWxNZWxkaW5nKCcnKTtcbiAgICB9LCBbbnlJZGVudC52ZXJkaV0pO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKHNramVtYS52aXNGZWlsbWVsZGluZ2VyICYmIHNramVtYS5mZWx0ZXIuYnJ1a2VyLnZhbGlkZXJpbmdzc3RhdHVzID09PSBWYWxpZGVyaW5nc3N0YXR1cy5GRUlMKSB7XG4gICAgICAgICAgICBzZXR0w4VwZW4odHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LCBbc2tqZW1hLnZpc0ZlaWxtZWxkaW5nZXIsIHNramVtYS5mZWx0ZXIuYnJ1a2VyLnZhbGlkZXJpbmdzc3RhdHVzXSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXR0U2FtaGFuZGxlckZlaWxtZWxkaW5nKCcnKTtcbiAgICAgICAgaWYgKHZhbGd0SW5zdGl0dXNqb24gIT09ICcnICYmIHZhbGd0SW5zdGl0dXNqb24gIT09ICdueS1pbnN0aXR1c2pvbicpIHtcbiAgICAgICAgICAgIHNldHRNaW5pbWFsRmFnc2FrVGlsSW5zdGl0dXNqb25zZmFnc2FrKHZhbGd0SW5zdGl0dXNqb24pO1xuICAgICAgICAgICAgaGVudFNhbWhhbmRsZXIodmFsZ3RJbnN0aXR1c2pvbikudGhlbigocmVzc3VyczogUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3N1cnMuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLlNVS1NFU1MpIHtcbiAgICAgICAgICAgICAgICAgICAgc2tqZW1hLmZlbHRlci5zYW1oYW5kbGVyLnZhbGlkZXJPZ1NldHRGZWx0KHJlc3N1cnMuZGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2tqZW1hLmZlbHRlci5zYW1oYW5kbGVyLm51bGxzdGlsbCgpO1xuICAgICAgICAgICAgICAgICAgICBzZXR0U2FtaGFuZGxlckZlaWxtZWxkaW5nKCdLYW4gaWtrZSBoZW50ZSBvcHBseXNuaW5nZXIgb20gaW5zdGl0dXNqb24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldHRNaW5pbWFsRmFnc2FrVGlsTm9ybWFsRmFnc2FrRm9yUGVyc29uKHNramVtYS5mZWx0ZXIuYnJ1a2VyLnZlcmRpPy5wZXJzb25JZGVudCk7XG4gICAgICAgICAgICBza2plbWEuZmVsdGVyLnNhbWhhbmRsZXIubnVsbHN0aWxsKCk7XG4gICAgICAgIH1cbiAgICB9LCBbdmFsZ3RJbnN0aXR1c2pvbl0pO1xuXG4gICAgY29uc3QgZXJCcnVrZXJQw6VJbnN0aXR1c2pvbiA9IHNramVtYS5mZWx0ZXIuZmFnc2FrVHlwZS52ZXJkaSA9PT0gRmFnc2FrVHlwZS5JTlNUSVRVU0pPTjtcblxuICAgIGNvbnN0IG9wcGRhdGVyRmFnc2FrdHlwZSA9IChueUZhZ3Nha1R5cGU6IEZhZ3Nha1R5cGUpID0+IHtcbiAgICAgICAgc2tqZW1hLmZlbHRlci5mYWdzYWtUeXBlLnZhbGlkZXJPZ1NldHRGZWx0KG55RmFnc2FrVHlwZSk7XG4gICAgICAgIGlmIChueUZhZ3Nha1R5cGUgIT09IEZhZ3Nha1R5cGUuSU5TVElUVVNKT04pIHtcbiAgICAgICAgICAgIHNldHRWYWxndEluc3RpdHVzam9uKCcnKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBudWxsc3RpbGxGYWdzYWt0eXBlID0gKCkgPT4ge1xuICAgICAgICBvcHBkYXRlckZhZ3Nha3R5cGUoRmFnc2FrVHlwZS5OT1JNQUwpO1xuICAgICAgICBzZXR0RXJGYWdzYWt0eXBlUGFuZWzDhXBuZXQoZmFsc2UpO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8U3R5bGVkRXhwYW5zaW9uQ2FyZFxuICAgICAgICAgICAgb3Blbj17w6VwZW59XG4gICAgICAgICAgICBvblRvZ2dsZT17KCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldHTDhXBlbighw6VwZW4pO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiQnJ1a2VycGFuZWxcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8RXhwYW5zaW9uQ2FyZC5IZWFkZXI+XG4gICAgICAgICAgICAgICAgPEV4cGFuc2lvbkNhcmQuVGl0bGU+XG4gICAgICAgICAgICAgICAgICAgIDxEZWx0YWdlckluZm9cbiAgICAgICAgICAgICAgICAgICAgICAgIGlrb249e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyQnJ1a2VyUMOlSW5zdGl0dXNqb24gPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdWlsZGluZ3MzRmlsbEljb24gY29sb3I9e0JnQWNjZW50U3Ryb25nfSB3aWR0aD17NDh9IGhlaWdodD17NDh9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEtvbnRvU2lya2VsIGZpbGxlZD17w6VwZW59IHdpZHRoPXs0OH0gaGVpZ2h0PXs0OH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZuPXtza2plbWEuZmVsdGVyLmJydWtlci52ZXJkaT8ubmF2biB8fCAnVWtqZW50IGJydWtlcid9XG4gICAgICAgICAgICAgICAgICAgICAgICB1bmRlcnRpdHRlbD17ZXJCcnVrZXJQw6VJbnN0aXR1c2pvbiA/ICdTw7hrZXIvQnJ1a2VyIGVyIHDDpSBpbnN0aXR1c2pvbicgOiAnU8O4a2VyL0JydWtlcid9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZGVudD17Zm9ybWF0ZXJJZGVudChza2plbWEuZmVsdGVyLmJydWtlci52ZXJkaT8ucGVyc29uSWRlbnQgPz8gJycpfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uQ2FyZC5UaXRsZT5cbiAgICAgICAgICAgIDwvRXhwYW5zaW9uQ2FyZC5IZWFkZXI+XG4gICAgICAgICAgICA8RXhwYW5zaW9uQ2FyZC5Db250ZW50IGNsYXNzTmFtZT17c3R5bGVzLmlubmVyQ29udGVudH0+XG4gICAgICAgICAgICAgICAgeyFlckxlc2V2aXNuaW5nKCkgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZsZXhEaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ubnlJZGVudC5oZW50TmF2SW5wdXRQcm9wcyghIWZlaWxNZWxkaW5nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I9e255SWRlbnQuaGVudE5hdklucHV0UHJvcHMoISFmZWlsTWVsZGluZykuZmVpbCB8fCBmZWlsTWVsZGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9eydFbmRyZSBicnVrZXInfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbj17J1Nrcml2IGlubiBicnVrZXJzL3PDuGtlcnMgZsO4ZHNlbHNudW1tZXIgZWxsZXIgRC1udW1tZXInfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN0eWxlZEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobnlJZGVudC52YWxpZGVyaW5nc3N0YXR1cyA9PT0gVmFsaWRlcmluZ3NzdGF0dXMuT0spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0U3Bpbm5lcih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsc3RpbGxGYWdzYWt0eXBlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kcmVCcnVrZXJPZ1NldHROb3JtYWxGYWdzYWsobnlJZGVudC52ZXJkaSkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRTcGlubmVyKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dEZlaWxNZWxkaW5nKCdQZXJzb25pZGVudCBlciB1Z3lsZGlnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuPXsnRW5kcmUgYnJ1a2VyJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZz17c3Bpbm5lcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT1cInNtYWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRmxleERpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtrYW5Lbnl0dGVzVGlsSW5zdGl0dXNqb25zZmFnc2FrKCkgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSZWFkTW9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwibWVkaXVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyPVwiU8O4a2VyIGVyIGVuIGluc3RpdHVzam9uIGVsbGVyIGVuc2xpZyBtaW5kcmXDpXJpZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW49e2VyRmFnc2FrdHlwZVBhbmVsw4VwbmV0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXR0RXJGYWdzYWt0eXBlUGFuZWzDhXBuZXQoIWVyRmFnc2FrdHlwZVBhbmVsw4VwbmV0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTdHlsZWRTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiRmFnc2FrdHlwZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudDogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTFNlbGVjdEVsZW1lbnQ+KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wcGRhdGVyRmFnc2FrdHlwZShldmVudC50YXJnZXQudmFsdWUgYXMgRmFnc2FrVHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtza2plbWEuZmVsdGVyLmZhZ3Nha1R5cGUudmVyZGl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e0ZhZ3Nha1R5cGUuTk9STUFMfT5WZWxnPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtGYWdzYWtUeXBlLklOU1RJVFVTSk9OfT5JbnN0aXR1c2pvbjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgezxvcHRpb24gdmFsdWU9e0ZhZ3Nha1R5cGUuQkFSTl9FTlNMSUdfTUlORFJFw4VSSUd9PkVuc2xpZyBtaW5kcmXDpXJpZzwvb3B0aW9uPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9TdHlsZWRTZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlckJydWtlclDDpUluc3RpdHVzam9uICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTdHlsZWRTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIkluc3RpdHVzam9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxTZWxlY3RFbGVtZW50PikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dFZhbGd0SW5zdGl0dXNqb24oZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dmFsZ3RJbnN0aXR1c2pvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+VmVsZzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpbnN0aXR1c2pvbnNmYWdzYWtlci5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuU1VLU0VTUyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0aXR1c2pvbnNmYWdzYWtlci5kYXRhLm1hcCgoeyBpbnN0aXR1c2pvbiwgc3RhdHVzIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGl0dXNqb24gJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17aW5zdGl0dXNqb24ub3JnTnVtbWVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbnN0aXR1c2pvbi5vcmdOdW1tZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmb3JtYXRlcklkZW50KGluc3RpdHVzam9uLm9yZ051bW1lcil9IHx7JyAnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2ZhZ3Nha1N0YXR1c1tzdGF0dXNdLm5hdm59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJueS1pbnN0aXR1c2pvblwiPk55IGluc3RpdHVzam9uPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1N0eWxlZFNlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3NramVtYS5mZWx0ZXIuZmFnc2FrVHlwZS52ZXJkaSAhPT0gRmFnc2FrVHlwZS5OT1JNQUwgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJ0ZXJ0aWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT1cInhzbWFsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17bnVsbHN0aWxsRmFnc2FrdHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uPXs8QXJyb3dVbmRvSWNvbiAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaWxiYWtlc3RpbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvUmVhZE1vcmU+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAge3ZhbGd0SW5zdGl0dXNqb24gPT09ICdueS1pbnN0aXR1c2pvbicgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTdHlsZWRBbGVydCB2YXJpYW50PVwid2FybmluZ1wiIGlubGluZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT1cInhzbWFsbFwiIGxldmVsPVwiM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW5zdGl0dXNqb25zc2FrIHDDpSBicnVrZXIgbcOlIG9wcHJldHRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvciDDpSBqb3VybmFsZsO4cmUgZG9rdW1lbnRldCwgbcOlIG55IGZhZ3NhayBhdiB0eXBlbiBpbnN0aXR1c2pvbiBvcHByZXR0ZXMgdmlhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNha3NiZWhhbmRsZXJsw7hzbmluZ2VuLiBOw6VyIGZhZ3Nha2VuIGVyIHRpbGtueXR0ZXQgZ29ka2plbnQgaW5zdGl0dXNqb24sIGthbiBkb2t1bWVudGV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpvdXJuYWxmw7hyZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9TdHlsZWRBbGVydD5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge3NhbWhhbmRsZXJGZWlsbWVsZGluZyAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxTdHlsZWRBbGVydCB2YXJpYW50PVwid2FybmluZ1wiIGlubGluZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyRmVpbG1lbGRpbmd9XG4gICAgICAgICAgICAgICAgICAgIDwvU3R5bGVkQWxlcnQ+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7c2tqZW1hLmZlbHRlci5zYW1oYW5kbGVyLnZlcmRpICE9PSB1bmRlZmluZWQgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8VG9wcE1hcmdpbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTYW1oYW5kbGVyVGFiZWxsIHNhbWhhbmRsZXI9e3NramVtYS5mZWx0ZXIuc2FtaGFuZGxlci52ZXJkaX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9Ub3BwTWFyZ2luPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L0V4cGFuc2lvbkNhcmQuQ29udGVudD5cbiAgICAgICAgPC9TdHlsZWRFeHBhbnNpb25DYXJkPlxuICAgICk7XG59O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiOTIwODUwNTIxM2ZkMWFiMGVhNzRcIikiXSwibmFtZXMiOlsiZSIsInQiLCJyIiwiU3ltYm9sIiwibiIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsImYiLCJwIiwieSIsIkciLCJ2IiwiYSIsImQiLCJiaW5kIiwibGVuZ3RoIiwibCIsIlR5cGVFcnJvciIsImNhbGwiLCJkb25lIiwidmFsdWUiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImRpc3BsYXlOYW1lIiwiX3JlZ2VuZXJhdG9yIiwidyIsIm0iLCJkZWZpbmVQcm9wZXJ0eSIsIl9yZWdlbmVyYXRvckRlZmluZSIsIl9pbnZva2UiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3VtZW50cyIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJfc2xpY2VkVG9BcnJheSIsIl9hcnJheVdpdGhIb2xlcyIsIl9pdGVyYWJsZVRvQXJyYXlMaW1pdCIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVJlc3QiLCJfYXJyYXlMaWtlVG9BcnJheSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJBcnJheSIsImZyb20iLCJ0ZXN0IiwibmV4dCIsInB1c2giLCJpc0FycmF5IiwiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlU3RhdGUiLCJCb2R5U2hvcnQiLCJCdXR0b24iLCJIU3RhY2siLCJsb2dnRmVpbCIsInVzZUh0dHAiLCJSZXNzdXJzU3RhdHVzIiwidXNlQXV0aENvbnRleHQiLCJ1c2VGZWF0dXJlVG9nZ2xlcyIsIlN0YXR1c0lrb24iLCJTdGF0dXMiLCJCZWhhbmRsZXJSb2xsZSIsIkZlYXR1cmVUb2dnbGUiLCJhZHJlc3NlYmVza3l0dGVsc2VzdHlwZXIiLCJncnVwcGVJZFRpbFJvbGxlIiwiZ3J1cHBlSWRUaWxTdXBlcmJydWtlclJvbGxlIiwidGlsRmVpbHNpZGUiLCJpbml0YWxTdGF0ZSIsInRpdHRlbCIsInZpc01vZGFsIiwidGlsZ2FuZ01vZGFsIiwiZGF0YSIsImx1a2tNb2RhbCIsInNha3NiZWhhbmRsZXJIYXJUaWxnYW5nIiwib25DbG9zZSIsImlubmhvbGQiLCJjcmVhdGVFbGVtZW50IiwiZ2FwIiwiYWxpZ24iLCJtYXJnaW5CbG9jayIsInN0YXR1cyIsIkZFSUwiLCJjb25jYXQiLCJhZHJlc3NlYmVza3l0dGVsc2VncmFkZXJpbmciLCJhY3Rpb25zIiwia2V5IiwidmFyaWFudCIsInNpemUiLCJvbkNsaWNrIiwiY2hpbGRyZW4iLCJBcHBDb250ZXh0IiwidW5kZWZpbmVkIiwiQXBwUHJvdmlkZXIiLCJwcm9wcyIsIl9zIiwiX3VzZUF1dGhDb250ZXh0IiwiYXV0ZW50aXNlcnQiLCJpbm5sb2dnZXRTYWtzYmVoYW5kbGVyIiwiX3VzZUh0dHAiLCJyZXF1ZXN0Iiwic3lzdGVtZXRMYXN0ZXIiLCJ0b2dnbGVzIiwiX1JlYWN0JHVzZVN0YXRlIiwiX1JlYWN0JHVzZVN0YXRlMiIsImFwcEluZm9Nb2RhbCIsInNldHRBcHBJbmZvTW9kYWwiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwidG9hc3RzIiwic2V0dFRvYXN0cyIsImhlbnRQZXJzb24iLCJfcmVmIiwiX2NhbGxlZSIsImJydWtlcklkZW50IiwiX2NvbnRleHQiLCJtZXRob2QiLCJ1cmwiLCJpZGVudCIsInJlc3N1cnMiLCJoYXJUaWxnYW5nIiwiYWRyZXNzZWJlc2t5dHRlbHNlR3JhZGVyaW5nIiwiX3giLCJzamVra1RpbGdhbmciLCJfcmVmMiIsIl9jYWxsZWUyIiwidmlzU3lzdGVtZXRMYXN0ZXIiLCJfYXJnczIiLCJfY29udGV4dDIiLCJww6V2aXJrZXJTeXN0ZW1MYXN0ZXIiLCJTVUtTRVNTIiwiX3gyIiwiaGVudFNha3NiZWhhbmRsZXJSb2xsZSIsInJvbGxlIiwiVUtKRU5UIiwiZ3JvdXBzIiwiZm9yRWFjaCIsImlkIiwiaGFySW5ubG9nZ2V0U2Frc2JlaGFuZGxlclNrcml2ZXRpbGdhbmciLCJTQUtTQkVIQU5ETEVSIiwiaGFySW5ubG9nZ2V0U2Frc2JlaGFuZGxlclN1cGVyYnJ1a2VyVGlsZ2FuZyIsIl9pbm5sb2dnZXRTYWtzYmVoYW5kbCIsImluY2x1ZGVzIiwic2thbE9iZnVza2VyZURhdGEiLCJQcm92aWRlciIsInNldHRUb2FzdCIsInRvYXN0SWQiLCJ0b2FzdCIsIl9vYmplY3RTcHJlYWQiLCJfZGVmaW5lUHJvcGVydHkiLCJfYyIsInVzZUFwcENvbnRleHQiLCJfczIiLCJjb250ZXh0IiwidXNlQ29udGV4dCIsIkVycm9yIiwiJFJlZnJlc2hSZWckIiwic3R5bGVkIiwiQnVpbGRpbmdzM0ljb24iLCJBR3JlZW42MDAiLCJJa29uU2lya2VsIiwic3BhbiIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCIkY29sb3IiLCIkaGVpZ2h0IiwiJHdpZHRoIiwiS29udG9ySWtvbkdyw7hubiIsImNsYXNzTmFtZSIsIl9yZWYkaGVpZ2h0IiwiaGVpZ2h0IiwiX3JlZiR3aWR0aCIsIndpZHRoIiwiX3JlZiRjb2xvciIsImNvbG9yIiwiX2MyIiwiQ2hlY2ttYXJrQ2lyY2xlRmlsbEljb24iLCJFeGNsYW1hdGlvbm1hcmtUcmlhbmdsZUZpbGxJY29uIiwiSW5mb3JtYXRpb25TcXVhcmVGaWxsSWNvbiIsIlhNYXJrT2N0YWdvbkZpbGxJY29uIiwiT2tJa29uIiwiRmVpbElrb24iLCJfdGVtcGxhdGVPYmplY3QyIiwiQWR2YXJzZWxJa29uIiwiX3RlbXBsYXRlT2JqZWN0MyIsIl9jMyIsIkluZm9Ja29uIiwiX3RlbXBsYXRlT2JqZWN0NCIsIl9jNCIsInRpdGxlIiwiT0siLCJBRFZBUlNFTCIsIklORk8iLCJfYzUiLCJ1c2VFZmZlY3QiLCJjbGFzc05hbWVzIiwiQ2hlY2tib3giLCJFeHBhbnNpb25DYXJkIiwiVGV4dEZpZWxkIiwiVmFsaWRlcmluZ3NzdGF0dXMiLCJzdHlsZXMiLCJEZWx0YWdlckluZm8iLCJ1c2VNYW51ZWxsSm91cm5hbGbDuHJpbmdDb250ZXh0IiwiRW1haWxJa29uIiwiZm9ybWF0ZXJJZGVudCIsIlN0eWxlZEV4cGFuc2lvbkNhcmQiLCJBdnNlbmRlclBhbmVsIiwiX3NramVtYSRmZWx0ZXIkYXZzZW5kIiwiX3VzZU1hbnVlbGxKb3VybmFsZsO4ciIsInNramVtYSIsImVyTGVzZXZpc25pbmciLCJzZXR0QXZzZW5kZXJMaWtCcnVrZXIiLCJ0aWxiYWtlc3RpbGxBdnNlbmRlciIsImVyRGlnaXRhbHRJbm5zZW5kdERva3VtZW50Iiwiw6VwZW4iLCJzZXR0w4VwZW4iLCJfdXNlU3RhdGUzIiwiX3VzZVN0YXRlNCIsImJydWtlckVyQXZzZW5kZXIiLCJzZXR0QnJ1a2VyRXJBdnNlbmRlciIsInZpc0ZlaWxtZWxkaW5nZXIiLCJmZWx0ZXIiLCJhdnNlbmRlck5hdm4iLCJ2YWxpZGVyaW5nc3N0YXR1cyIsImF2c2VuZGVySWRlbnQiLCJsZXNldmlzbmluZyIsIm9wZW4iLCJvblRvZ2dsZSIsIkhlYWRlciIsIlRpdGxlIiwiaWtvbiIsImZpbGxlZCIsIm5hdm4iLCJ2ZXJkaSIsInVuZGVydGl0dGVsIiwiQ29udGVudCIsImlubmVyQ29udGVudCIsImNoZWNrZWQiLCJvbkNoYW5nZSIsIl9leHRlbmRzIiwiaGVudE5hdklucHV0UHJvcHMiLCJyZWFkT25seSIsImxhYmVsIiwicGxhY2Vob2xkZXIiLCJkaXNhYmxlZCIsIkFycm93VW5kb0ljb24iLCJCdWlsZGluZ3MzRmlsbEljb24iLCJBbGVydCIsIkhlYWRpbmciLCJSZWFkTW9yZSIsIlNlbGVjdCIsIkJnQWNjZW50U3Ryb25nIiwidXNlRmVsdCIsIktvbnRvU2lya2VsIiwiU2FtaGFuZGxlclRhYmVsbCIsInVzZVNhbWhhbmRsZXJSZXF1ZXN0IiwiZmFnc2FrU3RhdHVzIiwiRmFnc2FrVHlwZSIsImlkZW50VmFsaWRhdG9yIiwiRmxleERpdiIsImRpdiIsIlN0eWxlZEJ1dHRvbiIsIlN0eWxlZFNlbGVjdCIsIlRvcHBNYXJnaW4iLCJfdGVtcGxhdGVPYmplY3Q1IiwiU3R5bGVkQWxlcnQiLCJfdGVtcGxhdGVPYmplY3Q2IiwiX2M2IiwiQnJ1a2VyUGFuZWwiLCJfc2tqZW1hJGZlbHRlciRicnVrZXIyIiwiX3NramVtYSRmZWx0ZXIkYnJ1a2VyMyIsIl9za2plbWEkZmVsdGVyJGJydWtlcjQiLCJlbmRyZUJydWtlck9nU2V0dE5vcm1hbEZhZ3NhayIsImluc3RpdHVzam9uc2ZhZ3Nha2VyIiwic2V0dE1pbmltYWxGYWdzYWtUaWxJbnN0aXR1c2pvbnNmYWdzYWsiLCJzZXR0TWluaW1hbEZhZ3Nha1RpbE5vcm1hbEZhZ3Nha0ZvclBlcnNvbiIsImthbktueXR0ZXNUaWxJbnN0aXR1c2pvbnNmYWdzYWsiLCJmZWlsTWVsZGluZyIsInNldHRGZWlsTWVsZGluZyIsIl91c2VTdGF0ZTUiLCJfdXNlU3RhdGU2Iiwic3Bpbm5lciIsInNldHRTcGlubmVyIiwibnlJZGVudCIsInZhbGlkZXJpbmdzZnVua3Nqb24iLCJfdXNlU2FtaGFuZGxlclJlcXVlc3QiLCJoZW50U2FtaGFuZGxlciIsIl91c2VTdGF0ZTciLCJfdXNlU3RhdGU4IiwidmFsZ3RJbnN0aXR1c2pvbiIsInNldHRWYWxndEluc3RpdHVzam9uIiwiX3VzZVN0YXRlOSIsIl91c2VTdGF0ZTAiLCJzYW1oYW5kbGVyRmVpbG1lbGRpbmciLCJzZXR0U2FtaGFuZGxlckZlaWxtZWxkaW5nIiwiX3VzZVN0YXRlMSIsIl91c2VTdGF0ZTEwIiwiZXJGYWdzYWt0eXBlUGFuZWzDhXBuZXQiLCJzZXR0RXJGYWdzYWt0eXBlUGFuZWzDhXBuZXQiLCJicnVrZXIiLCJzYW1oYW5kbGVyIiwidmFsaWRlck9nU2V0dEZlbHQiLCJudWxsc3RpbGwiLCJfc2tqZW1hJGZlbHRlciRicnVrZXIiLCJwZXJzb25JZGVudCIsImVyQnJ1a2VyUMOlSW5zdGl0dXNqb24iLCJmYWdzYWtUeXBlIiwiSU5TVElUVVNKT04iLCJvcHBkYXRlckZhZ3Nha3R5cGUiLCJueUZhZ3Nha1R5cGUiLCJudWxsc3RpbGxGYWdzYWt0eXBlIiwiTk9STUFMIiwiRnJhZ21lbnQiLCJlcnJvciIsImZlaWwiLCJkZXNjcmlwdGlvbiIsImxvYWRpbmciLCJoZWFkZXIiLCJldmVudCIsInRhcmdldCIsIkJBUk5fRU5TTElHX01JTkRSRcOFUklHIiwibWFwIiwiaW5zdGl0dXNqb24iLCJvcmdOdW1tZXIiLCJpY29uIiwiaW5saW5lIiwibGV2ZWwiLCJfYzciXSwic291cmNlUm9vdCI6IiJ9