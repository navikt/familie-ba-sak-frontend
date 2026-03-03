"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/hooks/useSamhandlerdataForOrgNrConfig.ts"
/*!***************************************************************!*\
  !*** ./src/frontend/hooks/useSamhandlerdataForOrgNrConfig.ts ***!
  \***************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HentSamhandlerdataForOrgNrConfigQueryKeyFactory: () => (/* binding */ HentSamhandlerdataForOrgNrConfigQueryKeyFactory),
/* harmony export */   useHentSamhandlerdataForOrgNrConfig: () => (/* binding */ useHentSamhandlerdataForOrgNrConfig)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _navikt_familie_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @navikt/familie-http */ "./node_modules/@navikt/familie-http/dist/index.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../api/hentSamhandlerdataForOrgNrConfig'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _s = __webpack_require__.$Refresh$.signature();



var HentSamhandlerdataForOrgNrConfigQueryKeyFactory = {
  org: function org(orgNr) {
    return ['samhandlerdataForOrgNrConfig', orgNr];
  }
};
function useHentSamhandlerdataForOrgNrConfig(orgNr) {
  _s();
  var _useHttp = (0,_navikt_familie_http__WEBPACK_IMPORTED_MODULE_2__.useHttp)(),
    request = _useHttp.request;
  return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)({
    queryKey: HentSamhandlerdataForOrgNrConfigQueryKeyFactory.org(orgNr),
    queryFn: function queryFn() {
      return Object(function webpackMissingModule() { var e = new Error("Cannot find module '../api/hentSamhandlerdataForOrgNrConfig'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(request, orgNr);
    },
    enabled: !!orgNr
  });
}
_s(useHentSamhandlerdataForOrgNrConfig, "lcuUbhob9cfw89HtFnoznSywVy4=", false, function () {
  return [_navikt_familie_http__WEBPACK_IMPORTED_MODULE_2__.useHttp, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery];
});

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
/* harmony import */ var _hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../hooks/useSamhandlerdataForOrgNrConfig */ "./src/frontend/hooks/useSamhandlerdataForOrgNrConfig.ts");
/* harmony import */ var _utils_obfuskerData__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/obfuskerData */ "./src/frontend/utils/obfuskerData.ts");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/validators */ "./src/frontend/utils/validators.ts");
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
          valideringsfunksjon: _utils_validators__WEBPACK_IMPORTED_MODULE_12__.orgnummerValidator
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
              queryKey: _hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_10__.HentSamhandlerdataForOrgNrConfigQueryKeyFactory.org(values.orgnr),
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
        (0,_utils_obfuskerData__WEBPACK_IMPORTED_MODULE_11__.obfuskerSamhandler)(ressurs);
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
/* harmony import */ var _hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../hooks/useSamhandlerdataForOrgNrConfig */ "./src/frontend/hooks/useSamhandlerdataForOrgNrConfig.ts");
/* harmony import */ var _komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../komponenter/Samhandler/useSamhandler */ "./src/frontend/komponenter/Samhandler/useSamhandler.ts");
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
  var _useSamhandlerSkjema = (0,_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_11__.useSamhandlerSkjema)(),
    form = _useSamhandlerSkjema.form;
  var location = (0,react_router__WEBPACK_IMPORTED_MODULE_4__.useLocation)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(location.state.bruker ? location.state.bruker : undefined),
    _useState2 = _slicedToArray(_useState, 2),
    queryData = _useState2[0],
    setQueryData = _useState2[1];
  var queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();
  (_queryClient$getQuery = queryClient.getQueryState(_hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_10__.HentSamhandlerdataForOrgNrConfigQueryKeyFactory.org(''))) === null || _queryClient$getQuery === void 0 || _queryClient$getQuery.data;
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
        queryKey: _hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_10__.HentSamhandlerdataForOrgNrConfigQueryKeyFactory.org(formValues.orgnr),
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
  return [_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_11__.useSamhandlerSkjema, react_router__WEBPACK_IMPORTED_MODULE_4__.useLocation, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient, _navikt_familie_http__WEBPACK_IMPORTED_MODULE_7__.useHttp];
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
/******/ 	__webpack_require__.h = () => ("000fff3e38f09e72eb2f")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi44ODE4YzI2NmI5ZGJlYmViZDExZS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaUQ7QUFFRjtBQUU0QztBQUVwRixJQUFNRywrQ0FBK0MsR0FBRztFQUMzREMsR0FBRyxFQUFFLFNBQUxBLEdBQUdBLENBQUdDLEtBQWE7SUFBQSxPQUFLLENBQUMsOEJBQThCLEVBQUVBLEtBQUssQ0FBQztFQUFBO0FBQ25FLENBQUM7QUFFTSxTQUFTQyxtQ0FBbUNBLENBQUNELEtBQWEsRUFBRTtFQUFBRSxFQUFBO0VBQy9ELElBQUFDLFFBQUEsR0FBb0JQLDZEQUFPLENBQUMsQ0FBQztJQUFyQlEsT0FBTyxHQUFBRCxRQUFBLENBQVBDLE9BQU87RUFDZixPQUFPVCwrREFBUSxDQUFDO0lBQ1pVLFFBQVEsRUFBRVAsK0NBQStDLENBQUNDLEdBQUcsQ0FBQ0MsS0FBSyxDQUFDO0lBQ3BFTSxPQUFPLEVBQUUsU0FBVEEsT0FBT0EsQ0FBQTtNQUFBLE9BQVFULHNLQUFnQyxDQUFDTyxPQUFPLEVBQUVKLEtBQUssQ0FBQztJQUFBO0lBQy9ETyxPQUFPLEVBQUUsQ0FBQyxDQUFDUDtFQUNmLENBQUMsQ0FBQztBQUNOO0FBQUNFLEVBQUEsQ0FQZUQsbUNBQW1DO0VBQUEsUUFDM0JMLHlEQUFPLEVBQ3BCRCwyREFBUTtBQUFBLEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJDWG5CLHVLQUFBYSxDQUFBLEVBQUFDLENBQUEsRUFBQUMsQ0FBQSx3QkFBQUMsTUFBQSxHQUFBQSxNQUFBLE9BQUFDLENBQUEsR0FBQUYsQ0FBQSxDQUFBRyxRQUFBLGtCQUFBQyxDQUFBLEdBQUFKLENBQUEsQ0FBQUssV0FBQSw4QkFBQUMsRUFBQU4sQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBQyxDQUFBLEdBQUFMLENBQUEs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LENBQUMsQ0FBQ0MsV0FBVyxFQUFDLEdBQUMsRUFBQ3BCLFNBQVMsQ0FBQ21CLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0UsUUFDdEQsQ0FFSSxDQUFDO0FBRTlCLENBQUM7QUFBQ25MLEVBQUEsQ0ExRFd1SixVQUFvQjtFQUFBLFFBQ1p2RSx1RkFBbUIsRUFDbkJ3RCxxREFBVyxFQUlScEUsaUVBQWMsRUFJZDFFLHlEQUFPO0FBQUE7QUFBQTBMLEdBQUEsR0FWbEI3QixVQUFvQjtBQUFBLElBQUFKLEVBQUEsRUFBQUcsR0FBQSxFQUFBOEIsR0FBQTtBQUFBQyxzQ0FBQSxDQUFBbEMsRUFBQTtBQUFBa0Msc0NBQUEsQ0FBQS9CLEdBQUE7QUFBQStCLHNDQUFBLENBQUFELEdBQUEsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzdCakMsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9ob29rcy91c2VTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnLnRzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL2tvbXBvbmVudGVyL1NhbWhhbmRsZXIvdXNlU2FtaGFuZGxlci50cyIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9TYW1oYW5kbGVyL1NhbWhhbmRsZXIudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VRdWVyeSB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XG5cbmltcG9ydCB7IHVzZUh0dHAgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtaHR0cCc7XG5cbmltcG9ydCB7IGhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIH0gZnJvbSAnLi4vYXBpL2hlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnJztcblxuZXhwb3J0IGNvbnN0IEhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5ID0ge1xuICAgIG9yZzogKG9yZ05yOiBzdHJpbmcpID0+IFsnc2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZycsIG9yZ05yXSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyhvcmdOcjogc3RyaW5nKSB7XG4gICAgY29uc3QgeyByZXF1ZXN0IH0gPSB1c2VIdHRwKCk7XG4gICAgcmV0dXJuIHVzZVF1ZXJ5KHtcbiAgICAgICAgcXVlcnlLZXk6IEhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5Lm9yZyhvcmdOciksXG4gICAgICAgIHF1ZXJ5Rm46ICgpID0+IGhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnKHJlcXVlc3QsIG9yZ05yKSxcbiAgICAgICAgZW5hYmxlZDogISFvcmdOcixcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB1c2VRdWVyeUNsaWVudCB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XG5pbXBvcnQgdHlwZSB7IEF4aW9zRXJyb3IgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyB1c2VGb3JtIH0gZnJvbSAncmVhY3QtaG9vay1mb3JtJztcblxuaW1wb3J0IHR5cGUgeyBGYW1pbGllUmVxdWVzdENvbmZpZyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS1odHRwJztcbmltcG9ydCB7IHVzZUh0dHAgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtaHR0cCc7XG5pbXBvcnQgeyB1c2VGZWx0LCB1c2VTa2plbWEgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtc2tqZW1hJztcbmltcG9ydCB0eXBlIHsgUmVzc3VycyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5pbXBvcnQgeyBieWdnRmVpbGV0UmVzc3VycywgYnlnZ0hlbnRlclJlc3N1cnMsIGJ5Z2dUb21SZXNzdXJzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcbmltcG9ydCB7IFJlc3N1cnNTdGF0dXMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXIvZGlzdC9yZXNzdXJzJztcblxuaW1wb3J0IHsgaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcgfSBmcm9tICcuLi8uLi9hcGkvaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcnO1xuaW1wb3J0IHsgdXNlQXBwQ29udGV4dCB9IGZyb20gJy4uLy4uL2NvbnRleHQvQXBwQ29udGV4dCc7XG5pbXBvcnQgeyBIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeSB9IGZyb20gJy4uLy4uL2hvb2tzL3VzZVNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcnO1xuaW1wb3J0IHR5cGUgeyBJU2FtaGFuZGxlckluZm8sIElTYW1oYW5kbGVySW5mb1JlcXVlc3QgfSBmcm9tICcuLi8uLi90eXBlci9zYW1oYW5kbGVyJztcbmltcG9ydCB7IG9iZnVza2VyU2FtaGFuZGxlciB9IGZyb20gJy4uLy4uL3V0aWxzL29iZnVza2VyRGF0YSc7XG5pbXBvcnQgeyBvcmdudW1tZXJWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi91dGlscy92YWxpZGF0b3JzJztcblxuZXhwb3J0IGVudW0gRmllbGRzIHtcbiAgICBPUkdfTlIgPSAnb3JnbnInLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1WYWx1ZXMge1xuICAgIFtGaWVsZHMuT1JHX05SXTogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgdXNlU2FtaGFuZGxlclNramVtYSA9IChvblN1Y2Nlc3M/OiAoKSA9PiB2b2lkLCBvbkVycm9yPzogKGVycm9yOiBzdHJpbmcpID0+IHZvaWQpID0+IHtcbiAgICBjb25zdCBxdWVyeUNsaWVudCA9IHVzZVF1ZXJ5Q2xpZW50KCk7XG4gICAgY29uc3QgeyBvblN1Ym1pdCwgc2V0dFN1Ym1pdFJlc3N1cnMsIHNramVtYSB9ID0gdXNlU2tqZW1hPElTYW1oYW5kbGVySW5mb1JlcXVlc3QsIElTYW1oYW5kbGVySW5mbz4oe1xuICAgICAgICBmZWx0ZXI6IHtcbiAgICAgICAgICAgIG9yZ25yOiB1c2VGZWx0KHtcbiAgICAgICAgICAgICAgICB2ZXJkaTogJycsXG4gICAgICAgICAgICAgICAgdmFsaWRlcmluZ3NmdW5rc2pvbjogb3JnbnVtbWVyVmFsaWRhdG9yLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIH0sXG4gICAgICAgIHNramVtYW5hdm46ICdoZW50U2FtaGFuZGxlcicsXG4gICAgfSk7XG5cbiAgICBjb25zdCBmb3JtID0gdXNlRm9ybTxGb3JtVmFsdWVzPih7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgW0ZpZWxkcy5PUkdfTlJdOiAnJyxcbiAgICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHsgcmVxdWVzdCB9ID0gdXNlSHR0cCgpO1xuXG4gICAgYXN5bmMgZnVuY3Rpb24gb25TdWJtaXROZXcodmFsdWVzOiBGb3JtVmFsdWVzKSB7XG4gICAgICAgIHF1ZXJ5Q2xpZW50LmZldGNoUXVlcnkoe1xuICAgICAgICAgICAgcXVlcnlLZXk6IEhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5Lm9yZyh2YWx1ZXMub3JnbnIpLFxuICAgICAgICAgICAgcXVlcnlGbjogKCkgPT4gaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcocmVxdWVzdCwgdmFsdWVzLm9yZ25yKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3Qgb25TdWJtaXRXcmFwcGVyID0gKCkgPT4ge1xuICAgICAgICBvblN1Ym1pdChcbiAgICAgICAgICAgIGhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnTmV3KHNramVtYS5mZWx0ZXIub3JnbnIudmVyZGkpLFxuICAgICAgICAgICAgKHJlc3N1cnM6IFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPikgPT4ge1xuICAgICAgICAgICAgICAgIHNldHRTdWJtaXRSZXNzdXJzKHJlc3N1cnMpO1xuICAgICAgICAgICAgICAgIGlmIChvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcjogUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9uRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLkZVTktTSk9ORUxMX0ZFSUwpIHtcbiAgICAgICAgICAgICAgICAgICAgb25FcnJvcihlcnJvci5mcm9udGVuZEZlaWxtZWxkaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGZvcm0sXG4gICAgICAgIG9uU3VibWl0OiBvblN1Ym1pdE5ldyxcbiAgICAgICAgb25TdWJtaXRXcmFwcGVyLFxuICAgICAgICBzYW1oYW5kbGVyU2tqZW1hOiBza2plbWEsXG4gICAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VTYW1oYW5kbGVyUmVxdWVzdCA9IChlcklFbkJlaGFuZGxpbmc6IGJvb2xlYW4pID0+IHtcbiAgICBjb25zdCB7IHJlcXVlc3QgfSA9IHVzZUh0dHAoKTtcbiAgICBjb25zdCBbc2FtaGFuZGxlclJlc3N1cnMsIHNldHRTYW1oYW5kbGVyUmVzc3Vyc10gPSB1c2VTdGF0ZTxSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4+KGJ5Z2dUb21SZXNzdXJzKCkpO1xuXG4gICAgY29uc3QgeyBza2FsT2JmdXNrZXJlRGF0YSB9ID0gdXNlQXBwQ29udGV4dCgpO1xuXG4gICAgY29uc3QgaGVudE9nU2V0dFNhbWhhbmRsZXIgPSAoYmVoYW5kbGluZ0lkRWxsZXJPcmducjogc3RyaW5nIHwgbnVtYmVyKSA9PiB7XG4gICAgICAgIHNldHRTYW1oYW5kbGVyUmVzc3VycyhieWdnSGVudGVyUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KCkpO1xuICAgICAgICBoZW50U2FtaGFuZGxlcihTdHJpbmcoYmVoYW5kbGluZ0lkRWxsZXJPcmducikpLnRoZW4oKHJlc3N1cnM6IFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPikgPT4ge1xuICAgICAgICAgICAgaWYgKHNrYWxPYmZ1c2tlcmVEYXRhKSB7XG4gICAgICAgICAgICAgICAgb2JmdXNrZXJTYW1oYW5kbGVyKHJlc3N1cnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0dFNhbWhhbmRsZXJSZXNzdXJzKHJlc3N1cnMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGVudFNhbWhhbmRsZXIgPSBhc3luYyAoYmVoYW5kbGluZ0lkRWxsZXJPcmducjogc3RyaW5nKTogUHJvbWlzZTxSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4+ID0+IHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gZXJJRW5CZWhhbmRsaW5nXG4gICAgICAgICAgICA/IGhlbnRTYW1oYW5kbGVyZGF0YUZvckJlaGFuZGxpbmdDb25maWcoYmVoYW5kbGluZ0lkRWxsZXJPcmducilcbiAgICAgICAgICAgIDogaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdOZXcoYmVoYW5kbGluZ0lkRWxsZXJPcmducik7XG4gICAgICAgIHJldHVybiByZXF1ZXN0PElTYW1oYW5kbGVySW5mb1JlcXVlc3QsIElTYW1oYW5kbGVySW5mbz4oY29uZmlnKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3N1cnM6IFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNzdXJzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoX2Vycm9yOiBBeGlvc0Vycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ5Z2dGZWlsZXRSZXNzdXJzKCdVa2plbnQgZmVpbCB2ZWQgaW5uaGVudGluZyBhdiBzYW1oYW5kbGVyaW5mbycpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGhlbnRTYW1oYW5kbGVyLFxuICAgICAgICBoZW50T2dTZXR0U2FtaGFuZGxlcixcbiAgICAgICAgc2FtaGFuZGxlclJlc3N1cnMsXG4gICAgfTtcbn07XG5cbmNvbnN0IGhlbnRTYW1oYW5kbGVyZGF0YUZvckJlaGFuZGxpbmdDb25maWcgPSAoYmVoYW5kbGluZ0lkOiBzdHJpbmcpOiBGYW1pbGllUmVxdWVzdENvbmZpZzxJU2FtaGFuZGxlckluZm9SZXF1ZXN0PiA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgdXJsOiAnL2ZhbWlsaWUtYmEtc2FrL2FwaS9zYW1oYW5kbGVyL2JlaGFuZGxpbmcvJyArIGJlaGFuZGxpbmdJZCxcbiAgICB9O1xufTtcblxuY29uc3QgaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdOZXcgPSAob3JnTnI6IHN0cmluZyk6IEZhbWlsaWVSZXF1ZXN0Q29uZmlnPElTYW1oYW5kbGVySW5mb1JlcXVlc3Q+ID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6ICcvZmFtaWxpZS1iYS1zYWsvYXBpL3NhbWhhbmRsZXIvb3JnbnIvJyArIG9yZ05yLFxuICAgIH07XG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB1c2VRdWVyeUNsaWVudCB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XG5pbXBvcnQgeyBGb3JtUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1ob29rLWZvcm0nO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24gfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEJ1dHRvbiwgRmllbGRzZXQsIEhlYWRpbmcsIEhTdGFjayB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHsgdXNlSHR0cCB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS1odHRwJztcblxuaW1wb3J0IHsgSGVudFNhbWhhbmRsZXJGZWx0IH0gZnJvbSAnLi9IZW50U2FtaGFuZGxlckZlbHQnO1xuaW1wb3J0IHsgaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcgfSBmcm9tICcuLi8uLi9hcGkvaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcnO1xuaW1wb3J0IHsgSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3RvcnkgfSBmcm9tICcuLi8uLi9ob29rcy91c2VTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnJztcbmltcG9ydCB7IHVzZVNhbWhhbmRsZXJTa2plbWEgfSBmcm9tICcuLi8uLi9rb21wb25lbnRlci9TYW1oYW5kbGVyL3VzZVNhbWhhbmRsZXInO1xuaW1wb3J0IHR5cGUgeyBJU2FtaGFuZGxlckluZm8gfSBmcm9tICcuLi8uLi90eXBlci9zYW1oYW5kbGVyJztcblxuY29uc3QgU2FtaGFuZGxlckNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA1MHB4KTtcbmA7XG5cbmNvbnN0IEhlbnRTYWtlckJ1dHRvbiA9IHN0eWxlZChCdXR0b24pYFxuICAgIG1hcmdpbi1sZWZ0OiAxcmVtO1xuICAgIG1hcmdpbi10b3A6IDJyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcbiAgICBoZWlnaHQ6IDNyZW07XG5gO1xuXG5leHBvcnQgY29uc3QgU2FtaGFuZGxlcjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBmb3JtIH0gPSB1c2VTYW1oYW5kbGVyU2tqZW1hKCk7XG4gICAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICAgIGNvbnN0IFtxdWVyeURhdGEsIHNldFF1ZXJ5RGF0YV0gPSB1c2VTdGF0ZTxJU2FtaGFuZGxlckluZm8gfCBudWxsPihcbiAgICAgICAgbG9jYXRpb24uc3RhdGUuYnJ1a2VyID8gbG9jYXRpb24uc3RhdGUuYnJ1a2VyIDogdW5kZWZpbmVkXG4gICAgKTtcbiAgICBjb25zdCBxdWVyeUNsaWVudCA9IHVzZVF1ZXJ5Q2xpZW50KCk7XG5cbiAgICBxdWVyeUNsaWVudC5nZXRRdWVyeVN0YXRlKEhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5Lm9yZygnJykpPy5kYXRhO1xuXG4gICAgY29uc3QgeyByZXF1ZXN0IH0gPSB1c2VIdHRwKCk7XG5cbiAgICBjb25zdCBza2plbWFFckzDpXN0ID0gZmFsc2U7IC8vc2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5IRU5URVI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8U2FtaGFuZGxlckNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9IGxldmVsPXsnMSd9PlxuICAgICAgICAgICAgICAgIFPDuGsgc2FtaGFuZGxlclxuICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgPEhTdGFjayBtYXJnaW5CbG9jaz17J3NwYWNlLTMyJ30+XG4gICAgICAgICAgICAgICAgPEZvcm1Qcm92aWRlciB7Li4uZm9ybX0+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICBvblN1Ym1pdD17Zm9ybS5oYW5kbGVTdWJtaXQoZm9ybVZhbHVlcyA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5Q2xpZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mZXRjaFF1ZXJ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5S2V5OiBIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeS5vcmcoZm9ybVZhbHVlcy5vcmduciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeUZuOiAoKSA9PiBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyhyZXF1ZXN0LCBmb3JtVmFsdWVzLm9yZ25yKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ociA9PiBzZXRRdWVyeURhdGEocikpXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RmllbGRzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Vycm9yPXtoZW50RnJvbnRlbmRGZWlsbWVsZGluZyhzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZD1cIlPDuGsgc2FtaGFuZGxlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUxlZ2VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxIZW50U2FtaGFuZGxlckZlbHQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNha2VyQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD17J3ByaW1hcnknfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9eydzdWJtaXQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e3NramVtYUVyTMOlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3NramVtYUVyTMOlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVudCBzYW1oYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0hlbnRTYWtlckJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgIDwvRm9ybVByb3ZpZGVyPlxuICAgICAgICAgICAgPC9IU3RhY2s+XG5cbiAgICAgICAgICAgIHtxdWVyeURhdGEgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9PlxuICAgICAgICAgICAgICAgICAgICB7cXVlcnlEYXRhLnRzc0Vrc3Rlcm5JZH0ge3F1ZXJ5RGF0YS5uYXZufSA8YnIgLz5cbiAgICAgICAgICAgICAgICAgICAge3F1ZXJ5RGF0YS5hZHJlc3NlclswXS5hZHJlc3NlVHlwZX0ge3F1ZXJ5RGF0YS5hZHJlc3NlclswXS5wb3N0U3RlZH1cbiAgICAgICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICApfVxuICAgICAgICA8L1NhbWhhbmRsZXJDb250YWluZXI+XG4gICAgKTtcbn07XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIwMDBmZmYzZTM4ZjA5ZTcyZWIyZlwiKSJdLCJuYW1lcyI6WyJ1c2VRdWVyeSIsInVzZUh0dHAiLCJoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyIsIkhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5Iiwib3JnIiwib3JnTnIiLCJ1c2VIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyIsIl9zIiwiX3VzZUh0dHAiLCJyZXF1ZXN0IiwicXVlcnlLZXkiLCJxdWVyeUZuIiwiZW5hYmxlZCIsImUiLCJ0IiwiciIsIlN5bWJvbCIsIm4iLCJpdGVyYXRvciIsIm8iLCJ0b1N0cmluZ1RhZyIsImkiLCJjIiwicHJvdG90eXBlIiwiR2VuZXJhdG9yIiwidSIsIk9iamVjdCIsImNyZWF0ZSIsIl9yZWdlbmVyYXRvckRlZmluZTIiLCJmIiwicCIsInkiLCJHIiwidiIsImEiLCJkIiwiYmluZCIsImxlbmd0aCIsImwiLCJUeXBlRXJyb3IiLCJjYWxsIiwiZG9uZSIsInZhbHVlIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJkaXNwbGF5TmFtZSIsIl9yZWdlbmVyYXRvciIsInciLCJtIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVnZW5lcmF0b3JEZWZpbmUiLCJfaW52b2tlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiX2RlZmluZVByb3BlcnR5IiwiX3RvUHJvcGVydHlLZXkiLCJfdG9QcmltaXRpdmUiLCJfdHlwZW9mIiwidG9QcmltaXRpdmUiLCJTdHJpbmciLCJOdW1iZXIiLCJ1c2VTdGF0ZSIsInVzZVF1ZXJ5Q2xpZW50IiwidXNlRm9ybSIsInVzZUZlbHQiLCJ1c2VTa2plbWEiLCJieWdnRmVpbGV0UmVzc3VycyIsImJ5Z2dIZW50ZXJSZXNzdXJzIiwiYnlnZ1RvbVJlc3N1cnMiLCJSZXNzdXJzU3RhdHVzIiwidXNlQXBwQ29udGV4dCIsIm9iZnVza2VyU2FtaGFuZGxlciIsIm9yZ251bW1lclZhbGlkYXRvciIsIkZpZWxkcyIsInVzZVNhbWhhbmRsZXJTa2plbWEiLCJvblN1Y2Nlc3MiLCJvbkVycm9yIiwicXVlcnlDbGllbnQiLCJfdXNlU2tqZW1hIiwiZmVsdGVyIiwib3JnbnIiLCJ2ZXJkaSIsInZhbGlkZXJpbmdzZnVua3Nqb24iLCJza2plbWFuYXZuIiwib25TdWJtaXQiLCJzZXR0U3VibWl0UmVzc3VycyIsInNramVtYSIsImZvcm0iLCJ2YWx1ZXMiLCJPUkdfTlIiLCJvblN1Ym1pdE5ldyIsIl94IiwiX29uU3VibWl0TmV3IiwiX2NhbGxlZSIsIl9jb250ZXh0IiwiZmV0Y2hRdWVyeSIsIm9uU3VibWl0V3JhcHBlciIsImhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnTmV3IiwicmVzc3VycyIsImVycm9yIiwic3RhdHVzIiwiRlVOS1NKT05FTExfRkVJTCIsImZyb250ZW5kRmVpbG1lbGRpbmciLCJzYW1oYW5kbGVyU2tqZW1hIiwidXNlU2FtaGFuZGxlclJlcXVlc3QiLCJlcklFbkJlaGFuZGxpbmciLCJfczIiLCJfdXNlSHR0cDIiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJzYW1oYW5kbGVyUmVzc3VycyIsInNldHRTYW1oYW5kbGVyUmVzc3VycyIsIl91c2VBcHBDb250ZXh0Iiwic2thbE9iZnVza2VyZURhdGEiLCJoZW50T2dTZXR0U2FtaGFuZGxlciIsImJlaGFuZGxpbmdJZEVsbGVyT3JnbnIiLCJoZW50U2FtaGFuZGxlciIsIl9yZWYiLCJfY2FsbGVlMiIsImNvbmZpZyIsIl9jb250ZXh0MiIsImhlbnRTYW1oYW5kbGVyZGF0YUZvckJlaGFuZGxpbmdDb25maWciLCJfZXJyb3IiLCJfeDIiLCJiZWhhbmRsaW5nSWQiLCJtZXRob2QiLCJ1cmwiLCJSZWFjdCIsIkZvcm1Qcm92aWRlciIsInVzZUxvY2F0aW9uIiwic3R5bGVkIiwiQnV0dG9uIiwiRmllbGRzZXQiLCJIZWFkaW5nIiwiSFN0YWNrIiwiSGVudFNhbWhhbmRsZXJGZWx0IiwiU2FtaGFuZGxlckNvbnRhaW5lciIsImRpdiIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJfYyIsIkhlbnRTYWtlckJ1dHRvbiIsIl90ZW1wbGF0ZU9iamVjdDIiLCJfYzIiLCJTYW1oYW5kbGVyIiwiX3F1ZXJ5Q2xpZW50JGdldFF1ZXJ5IiwiX3VzZVNhbWhhbmRsZXJTa2plbWEiLCJsb2NhdGlvbiIsInN0YXRlIiwiYnJ1a2VyIiwidW5kZWZpbmVkIiwicXVlcnlEYXRhIiwic2V0UXVlcnlEYXRhIiwiZ2V0UXVlcnlTdGF0ZSIsImRhdGEiLCJza2plbWFFckzDpXN0IiwiY3JlYXRlRWxlbWVudCIsInNpemUiLCJsZXZlbCIsIm1hcmdpbkJsb2NrIiwiaGFuZGxlU3VibWl0IiwiZm9ybVZhbHVlcyIsImxlZ2VuZCIsImhpZGVMZWdlbmQiLCJ2YXJpYW50IiwidHlwZSIsImxvYWRpbmciLCJkaXNhYmxlZCIsInRzc0Vrc3Rlcm5JZCIsIm5hdm4iLCJhZHJlc3NlciIsImFkcmVzc2VUeXBlIiwicG9zdFN0ZWQiLCJfYzMiLCIkUmVmcmVzaFJlZyQiXSwic291cmNlUm9vdCI6IiJ9