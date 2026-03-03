"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/komponenter/Samhandler/useSamhandler.ts"
/*!**************************************************************!*\
  !*** ./src/frontend/komponenter/Samhandler/useSamhandler.ts ***!
  \**************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fields: () => (/* binding */ Fields),
/* harmony export */   useSamhandlerRequest: () => (/* binding */ useSamhandlerRequest),
/* harmony export */   useSamhandlerSkjema: () => (/* binding */ useSamhandlerSkjema)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _navikt_familie_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/familie-http */ "./node_modules/@navikt/familie-http/dist/index.js");
/* harmony import */ var _navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/familie-skjema */ "./node_modules/@navikt/familie-skjema/dist/index.js");
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @navikt/familie-typer */ "./node_modules/@navikt/familie-typer/dist/index.js");
/* harmony import */ var _navikt_familie_typer_dist_ressurs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @navikt/familie-typer/dist/ressurs */ "./node_modules/@navikt/familie-typer/dist/ressurs.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../api/hentSamhandlerdataForOrgNrConfig'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../context/AppContext */ "./src/frontend/context/AppContext.tsx");
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../hooks/useSamhandlerdataForOrgNrConfig'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _utils_obfuskerData__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/obfuskerData */ "./src/frontend/utils/obfuskerData.ts");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/validators */ "./src/frontend/utils/validators.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _s = __webpack_require__.$Refresh$.signature(),
  _s2 = __webpack_require__.$Refresh$.signature();
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }












var Fields = /*#__PURE__*/function (Fields) {
  Fields["ORG_NR"] = "orgnr";
  return Fields;
}({});
var useSamhandlerSkjema = function useSamhandlerSkjema(onSuccess, onError) {
  _s();
  var queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();
  var _useSkjema = (0,_navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_5__.useSkjema)({
      felter: {
        orgnr: (0,_navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_5__.useFelt)({
          verdi: '',
          valideringsfunksjon: _utils_validators__WEBPACK_IMPORTED_MODULE_11__.orgnummerValidator
        })
      },
      skjemanavn: 'hentSamhandler'
    }),
    onSubmit = _useSkjema.onSubmit,
    settSubmitRessurs = _useSkjema.settSubmitRessurs,
    skjema = _useSkjema.skjema;
  var form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_3__.useForm)({
    values: _defineProperty({}, Fields.ORG_NR, '')
  });
  var _useHttp = (0,_navikt_familie_http__WEBPACK_IMPORTED_MODULE_4__.useHttp)(),
    request = _useHttp.request;
  function onSubmitNew(_x) {
    return _onSubmitNew.apply(this, arguments);
  }
  function _onSubmitNew() {
    _onSubmitNew = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(values) {
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            queryClient.fetchQuery({
              queryKey: Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../hooks/useSamhandlerdataForOrgNrConfig'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).org(values.orgnr),
              queryFn: function queryFn() {
                return Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../api/hentSamhandlerdataForOrgNrConfig'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(request, values.orgnr);
              }
            });
          case 1:
            return _context.a(2);
        }
      }, _callee);
    }));
    return _onSubmitNew.apply(this, arguments);
  }
  var onSubmitWrapper = function onSubmitWrapper() {
    onSubmit(hentSamhandlerdataForOrgNrConfigNew(skjema.felter.orgnr.verdi), function (ressurs) {
      settSubmitRessurs(ressurs);
      if (onSuccess) {
        onSuccess();
      }
    }, function (error) {
      if (onError && error.status === _navikt_familie_typer_dist_ressurs__WEBPACK_IMPORTED_MODULE_7__.RessursStatus.FUNKSJONELL_FEIL) {
        onError(error.frontendFeilmelding);
      }
    });
  };
  return {
    form: form,
    onSubmit: onSubmitNew,
    onSubmitWrapper: onSubmitWrapper,
    samhandlerSkjema: skjema
  };
};
_s(useSamhandlerSkjema, "DuIHqVqnGc3P59KiIy1ttsaHkjY=", false, function () {
  return [_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient, _navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_5__.useSkjema, _navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_5__.useFelt, react_hook_form__WEBPACK_IMPORTED_MODULE_3__.useForm, _navikt_familie_http__WEBPACK_IMPORTED_MODULE_4__.useHttp];
});
var useSamhandlerRequest = function useSamhandlerRequest(erIEnBehandling) {
  _s2();
  var _useHttp2 = (0,_navikt_familie_http__WEBPACK_IMPORTED_MODULE_4__.useHttp)(),
    request = _useHttp2.request;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.byggTomRessurs)()),
    _useState2 = _slicedToArray(_useState, 2),
    samhandlerRessurs = _useState2[0],
    settSamhandlerRessurs = _useState2[1];
  var _useAppContext = (0,_context_AppContext__WEBPACK_IMPORTED_MODULE_9__.useAppContext)(),
    skalObfuskereData = _useAppContext.skalObfuskereData;
  var hentOgSettSamhandler = function hentOgSettSamhandler(behandlingIdEllerOrgnr) {
    settSamhandlerRessurs((0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.byggHenterRessurs)());
    hentSamhandler(String(behandlingIdEllerOrgnr)).then(function (ressurs) {
      if (skalObfuskereData) {
        (0,_utils_obfuskerData__WEBPACK_IMPORTED_MODULE_10__.obfuskerSamhandler)(ressurs);
      }
      settSamhandlerRessurs(ressurs);
    });
  };
  var hentSamhandler = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(behandlingIdEllerOrgnr) {
      var config;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            config = erIEnBehandling ? hentSamhandlerdataForBehandlingConfig(behandlingIdEllerOrgnr) : hentSamhandlerdataForOrgNrConfigNew(behandlingIdEllerOrgnr);
            return _context2.a(2, request(config).then(function (ressurs) {
              return ressurs;
            })["catch"](function (_error) {
              return (0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.byggFeiletRessurs)('Ukjent feil ved innhenting av samhandlerinfo');
            }));
        }
      }, _callee2);
    }));
    return function hentSamhandler(_x2) {
      return _ref.apply(this, arguments);
    };
  }();
  return {
    hentSamhandler: hentSamhandler,
    hentOgSettSamhandler: hentOgSettSamhandler,
    samhandlerRessurs: samhandlerRessurs
  };
};
_s2(useSamhandlerRequest, "dRxWGifiNKLsipHB8DUasmyDPx8=", false, function () {
  return [_navikt_familie_http__WEBPACK_IMPORTED_MODULE_4__.useHttp, _context_AppContext__WEBPACK_IMPORTED_MODULE_9__.useAppContext];
});
var hentSamhandlerdataForBehandlingConfig = function hentSamhandlerdataForBehandlingConfig(behandlingId) {
  return {
    method: 'GET',
    url: '/familie-ba-sak/api/samhandler/behandling/' + behandlingId
  };
};
var hentSamhandlerdataForOrgNrConfigNew = function hentSamhandlerdataForOrgNrConfigNew(orgNr) {
  return {
    method: 'GET',
    url: '/familie-ba-sak/api/samhandler/orgnr/' + orgNr
  };
};

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

/***/ "./src/frontend/sider/Samhandler/Samhandler.tsx"
/*!******************************************************!*\
  !*** ./src/frontend/sider/Samhandler/Samhandler.tsx ***!
  \******************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Samhandler: () => (/* binding */ Samhandler)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_familie_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @navikt/familie-http */ "./node_modules/@navikt/familie-http/dist/index.js");
/* harmony import */ var _HentSamhandlerFelt__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HentSamhandlerFelt */ "./src/frontend/sider/Samhandler/HentSamhandlerFelt.tsx");
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../api/hentSamhandlerdataForOrgNrConfig'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../hooks/useSamhandlerdataForOrgNrConfig'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../komponenter/Samhandler/useSamhandler */ "./src/frontend/komponenter/Samhandler/useSamhandler.ts");
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











var SamhandlerContainer = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    padding: 1rem;\n    overflow: auto;\n    height: calc(100vh - 50px);\n"])));
_c = SamhandlerContainer;
var HentSakerButton = (0,styled_components__WEBPACK_IMPORTED_MODULE_5__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Button)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    margin-left: 1rem;\n    margin-top: 2rem;\n    margin-bottom: auto;\n    height: 3rem;\n"])));
_c2 = HentSakerButton;
var Samhandler = function Samhandler() {
  _s();
  var _queryClient$getQuery;
  var _useSamhandlerSkjema = (0,_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_10__.useSamhandlerSkjema)(),
    form = _useSamhandlerSkjema.form;
  var location = (0,react_router__WEBPACK_IMPORTED_MODULE_4__.useLocation)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(location.state.bruker ? location.state.bruker : undefined),
    _useState2 = _slicedToArray(_useState, 2),
    queryData = _useState2[0],
    setQueryData = _useState2[1];
  var queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();
  (_queryClient$getQuery = queryClient.getQueryState(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../hooks/useSamhandlerdataForOrgNrConfig'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).org(''))) === null || _queryClient$getQuery === void 0 || _queryClient$getQuery.data;
  var _useHttp = (0,_navikt_familie_http__WEBPACK_IMPORTED_MODULE_7__.useHttp)(),
    request = _useHttp.request;
  var skjemaErLåst = false; //samhandlerSkjema.submitRessurs.status === RessursStatus.HENTER;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(SamhandlerContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Heading, {
    size: 'large',
    level: '1'
  }, "S\xF8k samhandler"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.HStack, {
    marginBlock: 'space-32'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.FormProvider, form, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
    onSubmit: form.handleSubmit(function (formValues) {
      return queryClient.fetchQuery({
        queryKey: Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../hooks/useSamhandlerdataForOrgNrConfig'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).org(formValues.orgnr),
        queryFn: function queryFn() {
          return Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../api/hentSamhandlerdataForOrgNrConfig'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(request, formValues.orgnr);
        }
      }).then(function (r) {
        return setQueryData(r);
      });
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Fieldset
  //error={hentFrontendFeilmelding(samhandlerSkjema.submitRessurs)}
  , {
    legend: "S\xF8k samhandler",
    hideLegend: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_HentSamhandlerFelt__WEBPACK_IMPORTED_MODULE_8__.HentSamhandlerFelt, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HentSakerButton, {
    variant: 'primary',
    type: 'submit',
    loading: skjemaErLåst,
    disabled: skjemaErLåst
  }, "Hent samhandler")))), queryData !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Heading, {
    size: 'large'
  }, queryData.tssEksternId, " ", queryData.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), queryData.adresser[0].adresseType, " ", queryData.adresser[0].postSted));
};
_s(Samhandler, "yCBd88QvDXV7N4oQYcl3pbe5Yls=", false, function () {
  return [_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_10__.useSamhandlerSkjema, react_router__WEBPACK_IMPORTED_MODULE_4__.useLocation, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient, _navikt_familie_http__WEBPACK_IMPORTED_MODULE_7__.useHttp];
});
_c3 = Samhandler;
var _c, _c2, _c3;
__webpack_require__.$Refresh$.register(_c, "SamhandlerContainer");
__webpack_require__.$Refresh$.register(_c2, "HentSakerButton");
__webpack_require__.$Refresh$.register(_c3, "Samhandler");

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
/******/ 	__webpack_require__.h = () => ("a120d45f95e48182c19a")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4wMDBmZmYzZTM4ZjA5ZTcyZWIyZi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUNBLHVLQUFBQSxDQUFBLEVBQUFDLENBQUEsRUFBQUMsQ0FBQSx3QkFBQUMsTUFBQSxHQUFBQSxNQUFBLE9BQUFDLENBQUEsR0FBQUYsQ0FBQSxDQUFBRyxRQUFBLGtCQUFBQyxDQUFBLEdBQUFKLENBQUEsQ0FBQUssV0FBQSw4QkFBQUMsRUFBQU4sQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBQyxDQUFBLEdBQUFMLENBQUEsSUFBQUEsQ0FBQSxDQUFBTSxTQUFBLFlBQUFDLFNBQUEsR0FBQVAsQ0FBQSxHQUFBTyxTQUFBLEVBQUFDLENBQUEsR0FBQUMsTUFBQSxDQUFBQyxNQUFBLENBQUFMLENBQUEsQ0FBQUMsU0FBQSxVQUFBSyxtQkFBQSxDQUFBSCxDQUFBLHVCQUFBVixDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBRSxDQUFBLEVBQUFDLENBQUEsRUFBQUcsQ0FBQSxFQUFBSSxDQUFBLE1BQUFDLENBQUEsR0FBQVgsQ0FBQSxRQUFBWSxDQUFBLE9BQUFDLENBQUEsS0FBQUYsQ0FBQSxLQUFBYixDQUFBLEtBQUFnQixDQUFBLEVBQUFwQixDQUFBLEVBQUFxQixDQUFBLEVBQUFDLENBQUEsRUFBQU4sQ0FBQSxFQUFBTSxDQUFBLENBQUFDLElBQUEsQ0FBQXZCLENBQUEsTUFBQXNCLENBQUEsV0FBQUEsRUFBQXJCLENBQUEsRUFBQUMsQ0FBQSxXQUFBTSxDQUFBLEdBQUFQLENBQUEsRUFBQVEsQ0FBQSxNQUFBRyxDQUFBLEdBQUFaLENBQUEsRUFBQW1CLENBQUEsQ0FBQWYsQ0FBQSxHQUFBRixDQUFBLEVBQUFtQixDQUFBLGdCQUFBQyxFQUFBcEIsQ0FBQSxFQUFBRSxDQUFBLFNBQUFLLENBQUEsR0FBQVAsQ0FBQSxFQUFBVSxDQUFBLEdBQUFS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QUFBLENBQUNjLGVBQWU7SUFDWnVCLE9BQU8sRUFBRSxTQUFVO0lBQ25CQyxJQUFJLEVBQUUsUUFBUztJQUNmQyxPQUFPLEVBQUVYLFlBQWE7SUFDdEJZLFFBQVEsRUFBRVo7RUFBYSxHQUMxQixpQkFFZ0IsQ0FDZixDQUNJLENBQ1YsQ0FBQyxFQUVSSixTQUFTLEtBQUssSUFBSSxpQkFDZnhCLDBEQUFBLENBQUNNLHFEQUFPO0lBQUN3QixJQUFJLEVBQUU7RUFBUSxHQUNsQk4sU0FBUyxDQUFDaUIsWUFBWSxFQUFDLEdBQUMsRUFBQ2pCLFNBQVMsQ0FBQ2tCLElBQUksRUFBQyxHQUFDLGVBQUExQywwREFBQSxXQUFLLENBQUMsRUFDL0N3QixTQUFTLENBQUNtQixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsRUFBQyxHQUFDLEVBQUNwQixTQUFTLENBQUNtQixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNFLFFBQ3RELENBRUksQ0FBQztBQUU5QixDQUFDO0FBQUN2RyxFQUFBLENBMURXMkUsVUFBb0I7RUFBQSxRQUNaOUUsdUZBQW1CLEVBQ25CK0QscURBQVcsRUFJUjlFLGlFQUFjLEVBSWRFLHlEQUFPO0FBQUE7QUFBQXdILEdBQUEsR0FWbEI3QixVQUFvQjtBQUFBLElBQUFKLEVBQUEsRUFBQUcsR0FBQSxFQUFBOEIsR0FBQTtBQUFBQyxzQ0FBQSxDQUFBbEMsRUFBQTtBQUFBa0Msc0NBQUEsQ0FBQS9CLEdBQUE7QUFBQStCLHNDQUFBLENBQUFELEdBQUEsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzdCakMsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9rb21wb25lbnRlci9TYW1oYW5kbGVyL3VzZVNhbWhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvU2FtaGFuZGxlci9TYW1oYW5kbGVyLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHVzZVF1ZXJ5Q2xpZW50IH0gZnJvbSAnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5JztcbmltcG9ydCB0eXBlIHsgQXhpb3NFcnJvciB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IHVzZUZvcm0gfSBmcm9tICdyZWFjdC1ob29rLWZvcm0nO1xuXG5pbXBvcnQgdHlwZSB7IEZhbWlsaWVSZXF1ZXN0Q29uZmlnIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLWh0dHAnO1xuaW1wb3J0IHsgdXNlSHR0cCB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS1odHRwJztcbmltcG9ydCB7IHVzZUZlbHQsIHVzZVNramVtYSB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS1za2plbWEnO1xuaW1wb3J0IHR5cGUgeyBSZXNzdXJzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcbmltcG9ydCB7IGJ5Z2dGZWlsZXRSZXNzdXJzLCBieWdnSGVudGVyUmVzc3VycywgYnlnZ1RvbVJlc3N1cnMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuaW1wb3J0IHsgUmVzc3Vyc1N0YXR1cyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlci9kaXN0L3Jlc3N1cnMnO1xuXG5pbXBvcnQgeyBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyB9IGZyb20gJy4uLy4uL2FwaS9oZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyc7XG5pbXBvcnQgeyB1c2VBcHBDb250ZXh0IH0gZnJvbSAnLi4vLi4vY29udGV4dC9BcHBDb250ZXh0JztcbmltcG9ydCB7IEhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5IH0gZnJvbSAnLi4vLi4vaG9va3MvdXNlU2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyc7XG5pbXBvcnQgdHlwZSB7IElTYW1oYW5kbGVySW5mbywgSVNhbWhhbmRsZXJJbmZvUmVxdWVzdCB9IGZyb20gJy4uLy4uL3R5cGVyL3NhbWhhbmRsZXInO1xuaW1wb3J0IHsgb2JmdXNrZXJTYW1oYW5kbGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvb2JmdXNrZXJEYXRhJztcbmltcG9ydCB7IG9yZ251bW1lclZhbGlkYXRvciB9IGZyb20gJy4uLy4uL3V0aWxzL3ZhbGlkYXRvcnMnO1xuXG5leHBvcnQgZW51bSBGaWVsZHMge1xuICAgIE9SR19OUiA9ICdvcmducicsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybVZhbHVlcyB7XG4gICAgW0ZpZWxkcy5PUkdfTlJdOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCB1c2VTYW1oYW5kbGVyU2tqZW1hID0gKG9uU3VjY2Vzcz86ICgpID0+IHZvaWQsIG9uRXJyb3I/OiAoZXJyb3I6IHN0cmluZykgPT4gdm9pZCkgPT4ge1xuICAgIGNvbnN0IHF1ZXJ5Q2xpZW50ID0gdXNlUXVlcnlDbGllbnQoKTtcbiAgICBjb25zdCB7IG9uU3VibWl0LCBzZXR0U3VibWl0UmVzc3Vycywgc2tqZW1hIH0gPSB1c2VTa2plbWE8SVNhbWhhbmRsZXJJbmZvUmVxdWVzdCwgSVNhbWhhbmRsZXJJbmZvPih7XG4gICAgICAgIGZlbHRlcjoge1xuICAgICAgICAgICAgb3JnbnI6IHVzZUZlbHQoe1xuICAgICAgICAgICAgICAgIHZlcmRpOiAnJyxcbiAgICAgICAgICAgICAgICB2YWxpZGVyaW5nc2Z1bmtzam9uOiBvcmdudW1tZXJWYWxpZGF0b3IsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgICAgc2tqZW1hbmF2bjogJ2hlbnRTYW1oYW5kbGVyJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IGZvcm0gPSB1c2VGb3JtPEZvcm1WYWx1ZXM+KHtcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICBbRmllbGRzLk9SR19OUl06ICcnLFxuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgeyByZXF1ZXN0IH0gPSB1c2VIdHRwKCk7XG5cbiAgICBhc3luYyBmdW5jdGlvbiBvblN1Ym1pdE5ldyh2YWx1ZXM6IEZvcm1WYWx1ZXMpIHtcbiAgICAgICAgcXVlcnlDbGllbnQuZmV0Y2hRdWVyeSh7XG4gICAgICAgICAgICBxdWVyeUtleTogSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3Rvcnkub3JnKHZhbHVlcy5vcmduciksXG4gICAgICAgICAgICBxdWVyeUZuOiAoKSA9PiBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyhyZXF1ZXN0LCB2YWx1ZXMub3JnbnIpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBvblN1Ym1pdFdyYXBwZXIgPSAoKSA9PiB7XG4gICAgICAgIG9uU3VibWl0KFxuICAgICAgICAgICAgaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdOZXcoc2tqZW1hLmZlbHRlci5vcmduci52ZXJkaSksXG4gICAgICAgICAgICAocmVzc3VyczogUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0dFN1Ym1pdFJlc3N1cnMocmVzc3Vycyk7XG4gICAgICAgICAgICAgICAgaWYgKG9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob25FcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuRlVOS1NKT05FTExfRkVJTCkge1xuICAgICAgICAgICAgICAgICAgICBvbkVycm9yKGVycm9yLmZyb250ZW5kRmVpbG1lbGRpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZm9ybSxcbiAgICAgICAgb25TdWJtaXQ6IG9uU3VibWl0TmV3LFxuICAgICAgICBvblN1Ym1pdFdyYXBwZXIsXG4gICAgICAgIHNhbWhhbmRsZXJTa2plbWE6IHNramVtYSxcbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZVNhbWhhbmRsZXJSZXF1ZXN0ID0gKGVySUVuQmVoYW5kbGluZzogYm9vbGVhbikgPT4ge1xuICAgIGNvbnN0IHsgcmVxdWVzdCB9ID0gdXNlSHR0cCgpO1xuICAgIGNvbnN0IFtzYW1oYW5kbGVyUmVzc3Vycywgc2V0dFNhbWhhbmRsZXJSZXNzdXJzXSA9IHVzZVN0YXRlPFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPj4oYnlnZ1RvbVJlc3N1cnMoKSk7XG5cbiAgICBjb25zdCB7IHNrYWxPYmZ1c2tlcmVEYXRhIH0gPSB1c2VBcHBDb250ZXh0KCk7XG5cbiAgICBjb25zdCBoZW50T2dTZXR0U2FtaGFuZGxlciA9IChiZWhhbmRsaW5nSWRFbGxlck9yZ25yOiBzdHJpbmcgfCBudW1iZXIpID0+IHtcbiAgICAgICAgc2V0dFNhbWhhbmRsZXJSZXNzdXJzKGJ5Z2dIZW50ZXJSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4oKSk7XG4gICAgICAgIGhlbnRTYW1oYW5kbGVyKFN0cmluZyhiZWhhbmRsaW5nSWRFbGxlck9yZ25yKSkudGhlbigocmVzc3VyczogUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KSA9PiB7XG4gICAgICAgICAgICBpZiAoc2thbE9iZnVza2VyZURhdGEpIHtcbiAgICAgICAgICAgICAgICBvYmZ1c2tlclNhbWhhbmRsZXIocmVzc3Vycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXR0U2FtaGFuZGxlclJlc3N1cnMocmVzc3Vycyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBoZW50U2FtaGFuZGxlciA9IGFzeW5jIChiZWhhbmRsaW5nSWRFbGxlck9yZ25yOiBzdHJpbmcpOiBQcm9taXNlPFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPj4gPT4ge1xuICAgICAgICBjb25zdCBjb25maWcgPSBlcklFbkJlaGFuZGxpbmdcbiAgICAgICAgICAgID8gaGVudFNhbWhhbmRsZXJkYXRhRm9yQmVoYW5kbGluZ0NvbmZpZyhiZWhhbmRsaW5nSWRFbGxlck9yZ25yKVxuICAgICAgICAgICAgOiBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ05ldyhiZWhhbmRsaW5nSWRFbGxlck9yZ25yKTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3Q8SVNhbWhhbmRsZXJJbmZvUmVxdWVzdCwgSVNhbWhhbmRsZXJJbmZvPihjb25maWcpXG4gICAgICAgICAgICAudGhlbigocmVzc3VyczogUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3N1cnM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChfZXJyb3I6IEF4aW9zRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnlnZ0ZlaWxldFJlc3N1cnMoJ1VramVudCBmZWlsIHZlZCBpbm5oZW50aW5nIGF2IHNhbWhhbmRsZXJpbmZvJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVudFNhbWhhbmRsZXIsXG4gICAgICAgIGhlbnRPZ1NldHRTYW1oYW5kbGVyLFxuICAgICAgICBzYW1oYW5kbGVyUmVzc3VycyxcbiAgICB9O1xufTtcblxuY29uc3QgaGVudFNhbWhhbmRsZXJkYXRhRm9yQmVoYW5kbGluZ0NvbmZpZyA9IChiZWhhbmRsaW5nSWQ6IHN0cmluZyk6IEZhbWlsaWVSZXF1ZXN0Q29uZmlnPElTYW1oYW5kbGVySW5mb1JlcXVlc3Q+ID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6ICcvZmFtaWxpZS1iYS1zYWsvYXBpL3NhbWhhbmRsZXIvYmVoYW5kbGluZy8nICsgYmVoYW5kbGluZ0lkLFxuICAgIH07XG59O1xuXG5jb25zdCBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ05ldyA9IChvcmdOcjogc3RyaW5nKTogRmFtaWxpZVJlcXVlc3RDb25maWc8SVNhbWhhbmRsZXJJbmZvUmVxdWVzdD4gPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogJy9mYW1pbGllLWJhLXNhay9hcGkvc2FtaGFuZGxlci9vcmduci8nICsgb3JnTnIsXG4gICAgfTtcbn07XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHVzZVF1ZXJ5Q2xpZW50IH0gZnJvbSAnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5JztcbmltcG9ydCB7IEZvcm1Qcm92aWRlciB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5pbXBvcnQgeyB1c2VMb2NhdGlvbiB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQnV0dG9uLCBGaWVsZHNldCwgSGVhZGluZywgSFN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgeyB1c2VIdHRwIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLWh0dHAnO1xuXG5pbXBvcnQgeyBIZW50U2FtaGFuZGxlckZlbHQgfSBmcm9tICcuL0hlbnRTYW1oYW5kbGVyRmVsdCc7XG5pbXBvcnQgeyBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyB9IGZyb20gJy4uLy4uL2FwaS9oZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyc7XG5pbXBvcnQgeyBIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeSB9IGZyb20gJy4uLy4uL2hvb2tzL3VzZVNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcnO1xuaW1wb3J0IHsgdXNlU2FtaGFuZGxlclNramVtYSB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL1NhbWhhbmRsZXIvdXNlU2FtaGFuZGxlcic7XG5pbXBvcnQgdHlwZSB7IElTYW1oYW5kbGVySW5mbyB9IGZyb20gJy4uLy4uL3R5cGVyL3NhbWhhbmRsZXInO1xuXG5jb25zdCBTYW1oYW5kbGVyQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIGhlaWdodDogY2FsYygxMDB2aCAtIDUwcHgpO1xuYDtcblxuY29uc3QgSGVudFNha2VyQnV0dG9uID0gc3R5bGVkKEJ1dHRvbilgXG4gICAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gICAgbWFyZ2luLXRvcDogMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiBhdXRvO1xuICAgIGhlaWdodDogM3JlbTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTYW1oYW5kbGVyOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGZvcm0gfSA9IHVzZVNhbWhhbmRsZXJTa2plbWEoKTtcbiAgICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gICAgY29uc3QgW3F1ZXJ5RGF0YSwgc2V0UXVlcnlEYXRhXSA9IHVzZVN0YXRlPElTYW1oYW5kbGVySW5mbyB8IG51bGw+KFxuICAgICAgICBsb2NhdGlvbi5zdGF0ZS5icnVrZXIgPyBsb2NhdGlvbi5zdGF0ZS5icnVrZXIgOiB1bmRlZmluZWRcbiAgICApO1xuICAgIGNvbnN0IHF1ZXJ5Q2xpZW50ID0gdXNlUXVlcnlDbGllbnQoKTtcblxuICAgIHF1ZXJ5Q2xpZW50LmdldFF1ZXJ5U3RhdGUoSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3Rvcnkub3JnKCcnKSk/LmRhdGE7XG5cbiAgICBjb25zdCB7IHJlcXVlc3QgfSA9IHVzZUh0dHAoKTtcblxuICAgIGNvbnN0IHNramVtYUVyTMOlc3QgPSBmYWxzZTsgLy9zYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLkhFTlRFUjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxTYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30gbGV2ZWw9eycxJ30+XG4gICAgICAgICAgICAgICAgU8O4ayBzYW1oYW5kbGVyXG4gICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICA8SFN0YWNrIG1hcmdpbkJsb2NrPXsnc3BhY2UtMzInfT5cbiAgICAgICAgICAgICAgICA8Rm9ybVByb3ZpZGVyIHsuLi5mb3JtfT5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VibWl0PXtmb3JtLmhhbmRsZVN1Ym1pdChmb3JtVmFsdWVzID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlDbGllbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZldGNoUXVlcnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlLZXk6IEhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5Lm9yZyhmb3JtVmFsdWVzLm9yZ25yKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5Rm46ICgpID0+IGhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnKHJlcXVlc3QsIGZvcm1WYWx1ZXMub3JnbnIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyID0+IHNldFF1ZXJ5RGF0YShyKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZHNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZXJyb3I9e2hlbnRGcm9udGVuZEZlaWxtZWxkaW5nKHNhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kPVwiU8O4ayBzYW1oYW5kbGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlTGVnZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEhlbnRTYW1oYW5kbGVyRmVsdCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9GaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxIZW50U2FrZXJCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PXsncHJpbWFyeSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17J3N1Ym1pdCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZz17c2tqZW1hRXJMw6VzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17c2tqZW1hRXJMw6VzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZW50IHNhbWhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvSGVudFNha2VyQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgPC9Gb3JtUHJvdmlkZXI+XG4gICAgICAgICAgICA8L0hTdGFjaz5cblxuICAgICAgICAgICAge3F1ZXJ5RGF0YSAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30+XG4gICAgICAgICAgICAgICAgICAgIHtxdWVyeURhdGEudHNzRWtzdGVybklkfSB7cXVlcnlEYXRhLm5hdm59IDxiciAvPlxuICAgICAgICAgICAgICAgICAgICB7cXVlcnlEYXRhLmFkcmVzc2VyWzBdLmFkcmVzc2VUeXBlfSB7cXVlcnlEYXRhLmFkcmVzc2VyWzBdLnBvc3RTdGVkfVxuICAgICAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvU2FtaGFuZGxlckNvbnRhaW5lcj5cbiAgICApO1xufTtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImExMjBkNDVmOTVlNDgxODJjMTlhXCIpIl0sIm5hbWVzIjpbImUiLCJ0IiwiciIsIlN5bWJvbCIsIm4iLCJpdGVyYXRvciIsIm8iLCJ0b1N0cmluZ1RhZyIsImkiLCJjIiwicHJvdG90eXBlIiwiR2VuZXJhdG9yIiwidSIsIk9iamVjdCIsImNyZWF0ZSIsIl9yZWdlbmVyYXRvckRlZmluZTIiLCJmIiwicCIsInkiLCJHIiwidiIsImEiLCJkIiwiYmluZCIsImxlbmd0aCIsImwiLCJUeXBlRXJyb3IiLCJjYWxsIiwiZG9uZSIsInZhbHVlIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJkaXNwbGF5TmFtZSIsIl9yZWdlbmVyYXRvciIsInciLCJtIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVnZW5lcmF0b3JEZWZpbmUiLCJfaW52b2tlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiX2RlZmluZVByb3BlcnR5IiwiX3RvUHJvcGVydHlLZXkiLCJfdG9QcmltaXRpdmUiLCJfdHlwZW9mIiwidG9QcmltaXRpdmUiLCJTdHJpbmciLCJOdW1iZXIiLCJ1c2VTdGF0ZSIsInVzZVF1ZXJ5Q2xpZW50IiwidXNlRm9ybSIsInVzZUh0dHAiLCJ1c2VGZWx0IiwidXNlU2tqZW1hIiwiYnlnZ0ZlaWxldFJlc3N1cnMiLCJieWdnSGVudGVyUmVzc3VycyIsImJ5Z2dUb21SZXNzdXJzIiwiUmVzc3Vyc1N0YXR1cyIsImhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIiwidXNlQXBwQ29udGV4dCIsIkhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5Iiwib2JmdXNrZXJTYW1oYW5kbGVyIiwib3JnbnVtbWVyVmFsaWRhdG9yIiwiRmllbGRzIiwidXNlU2FtaGFuZGxlclNramVtYSIsIm9uU3VjY2VzcyIsIm9uRXJyb3IiLCJfcyIsInF1ZXJ5Q2xpZW50IiwiX3VzZVNramVtYSIsImZlbHRlciIsIm9yZ25yIiwidmVyZGkiLCJ2YWxpZGVyaW5nc2Z1bmtzam9uIiwic2tqZW1hbmF2biIsIm9uU3VibWl0Iiwic2V0dFN1Ym1pdFJlc3N1cnMiLCJza2plbWEiLCJmb3JtIiwidmFsdWVzIiwiT1JHX05SIiwiX3VzZUh0dHAiLCJyZXF1ZXN0Iiwib25TdWJtaXROZXciLCJfeCIsIl9vblN1Ym1pdE5ldyIsIl9jYWxsZWUiLCJfY29udGV4dCIsImZldGNoUXVlcnkiLCJxdWVyeUtleSIsIm9yZyIsInF1ZXJ5Rm4iLCJvblN1Ym1pdFdyYXBwZXIiLCJoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ05ldyIsInJlc3N1cnMiLCJlcnJvciIsInN0YXR1cyIsIkZVTktTSk9ORUxMX0ZFSUwiLCJmcm9udGVuZEZlaWxtZWxkaW5nIiwic2FtaGFuZGxlclNramVtYSIsInVzZVNhbWhhbmRsZXJSZXF1ZXN0IiwiZXJJRW5CZWhhbmRsaW5nIiwiX3MyIiwiX3VzZUh0dHAyIiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5Iiwic2FtaGFuZGxlclJlc3N1cnMiLCJzZXR0U2FtaGFuZGxlclJlc3N1cnMiLCJfdXNlQXBwQ29udGV4dCIsInNrYWxPYmZ1c2tlcmVEYXRhIiwiaGVudE9nU2V0dFNhbWhhbmRsZXIiLCJiZWhhbmRsaW5nSWRFbGxlck9yZ25yIiwiaGVudFNhbWhhbmRsZXIiLCJfcmVmIiwiX2NhbGxlZTIiLCJjb25maWciLCJfY29udGV4dDIiLCJoZW50U2FtaGFuZGxlcmRhdGFGb3JCZWhhbmRsaW5nQ29uZmlnIiwiX2Vycm9yIiwiX3gyIiwiYmVoYW5kbGluZ0lkIiwibWV0aG9kIiwidXJsIiwib3JnTnIiLCJSZWFjdCIsIkZvcm1Qcm92aWRlciIsInVzZUxvY2F0aW9uIiwic3R5bGVkIiwiQnV0dG9uIiwiRmllbGRzZXQiLCJIZWFkaW5nIiwiSFN0YWNrIiwiSGVudFNhbWhhbmRsZXJGZWx0IiwiU2FtaGFuZGxlckNvbnRhaW5lciIsImRpdiIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJfYyIsIkhlbnRTYWtlckJ1dHRvbiIsIl90ZW1wbGF0ZU9iamVjdDIiLCJfYzIiLCJTYW1oYW5kbGVyIiwiX3F1ZXJ5Q2xpZW50JGdldFF1ZXJ5IiwiX3VzZVNhbWhhbmRsZXJTa2plbWEiLCJsb2NhdGlvbiIsInN0YXRlIiwiYnJ1a2VyIiwidW5kZWZpbmVkIiwicXVlcnlEYXRhIiwic2V0UXVlcnlEYXRhIiwiZ2V0UXVlcnlTdGF0ZSIsImRhdGEiLCJza2plbWFFckzDpXN0IiwiY3JlYXRlRWxlbWVudCIsInNpemUiLCJsZXZlbCIsIm1hcmdpbkJsb2NrIiwiaGFuZGxlU3VibWl0IiwiZm9ybVZhbHVlcyIsImxlZ2VuZCIsImhpZGVMZWdlbmQiLCJ2YXJpYW50IiwidHlwZSIsImxvYWRpbmciLCJkaXNhYmxlZCIsInRzc0Vrc3Rlcm5JZCIsIm5hdm4iLCJhZHJlc3NlciIsImFkcmVzc2VUeXBlIiwicG9zdFN0ZWQiLCJfYzMiLCIkUmVmcmVzaFJlZyQiXSwic291cmNlUm9vdCI6IiJ9