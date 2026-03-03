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
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _navikt_familie_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @navikt/familie-http */ "./node_modules/@navikt/familie-http/dist/index.js");
/* harmony import */ var _navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/familie-skjema */ "./node_modules/@navikt/familie-skjema/dist/index.js");
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/familie-typer */ "./node_modules/@navikt/familie-typer/dist/index.js");
/* harmony import */ var _navikt_familie_typer_dist_ressurs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @navikt/familie-typer/dist/ressurs */ "./node_modules/@navikt/familie-typer/dist/ressurs.js");
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../context/AppContext */ "./src/frontend/context/AppContext.tsx");
/* harmony import */ var _hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../hooks/useSamhandlerdataForOrgNrConfig */ "./src/frontend/hooks/useSamhandlerdataForOrgNrConfig.ts");
/* harmony import */ var _utils_obfuskerData__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/obfuskerData */ "./src/frontend/utils/obfuskerData.ts");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/validators */ "./src/frontend/utils/validators.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _s2 = __webpack_require__.$Refresh$.signature(),
  _s3 = __webpack_require__.$Refresh$.signature();
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }










var Fields = /*#__PURE__*/function (Fields) {
  Fields["ORG_NR"] = "orgnr";
  return Fields;
}({});
var useSamhandlerSkjema = function useSamhandlerSkjema(orgNr, onSuccess, onError) {
  _s2();
  var _s = __webpack_require__.$Refresh$.signature();
  var _useSkjema = (0,_navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_4__.useSkjema)({
      felter: {
        orgnr: (0,_navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_4__.useFelt)({
          verdi: '',
          valideringsfunksjon: _utils_validators__WEBPACK_IMPORTED_MODULE_10__.orgnummerValidator
        })
      },
      skjemanavn: 'hentSamhandler'
    }),
    onSubmit = _useSkjema.onSubmit,
    settSubmitRessurs = _useSkjema.settSubmitRessurs,
    skjema = _useSkjema.skjema;
  var form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useForm)({
    values: _defineProperty({}, Fields.ORG_NR, '')
  });
  var onSubmitWrapper = function onSubmitWrapper() {
    _s();
    var _useHentSamhandlerdat = (0,_hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_8__.useHentSamhandlerdataForOrgNrConfig)(form.getValues(Fields.ORG_NR)),
      samhandlerdata = _useHentSamhandlerdat.data,
      isPendingFSamhandlerdata = _useHentSamhandlerdat.isPending,
      samhandlerdataError = _useHentSamhandlerdat.error;
    onSubmit(hentSamhandlerdataForOrgNrConfig(skjema.felter.orgnr.verdi), function (ressurs) {
      settSubmitRessurs(ressurs);
      if (onSuccess) {
        onSuccess();
      }
    }, function (error) {
      if (onError && error.status === _navikt_familie_typer_dist_ressurs__WEBPACK_IMPORTED_MODULE_6__.RessursStatus.FUNKSJONELL_FEIL) {
        onError(error.frontendFeilmelding);
      }
    });
  };
  _s(onSubmitWrapper, "IrGNC2yVaDCuWx9j6m6X6CmPj0o=", false, function () {
    return [_hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_8__.useHentSamhandlerdataForOrgNrConfig];
  });
  return {
    form: form,
    onSubmitWrapper: onSubmitWrapper,
    samhandlerSkjema: skjema
  };
};
_s2(useSamhandlerSkjema, "VzJ0Fw0G01PxezNVdSRI9o4Io5A=", false, function () {
  return [_navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_4__.useSkjema, _navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_4__.useFelt, react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useForm];
});
var useSamhandlerRequest = function useSamhandlerRequest(erIEnBehandling) {
  _s3();
  var _useHttp = (0,_navikt_familie_http__WEBPACK_IMPORTED_MODULE_3__.useHttp)(),
    request = _useHttp.request;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__.byggTomRessurs)()),
    _useState2 = _slicedToArray(_useState, 2),
    samhandlerRessurs = _useState2[0],
    settSamhandlerRessurs = _useState2[1];
  var _useAppContext = (0,_context_AppContext__WEBPACK_IMPORTED_MODULE_7__.useAppContext)(),
    skalObfuskereData = _useAppContext.skalObfuskereData;
  var hentOgSettSamhandler = function hentOgSettSamhandler(behandlingIdEllerOrgnr) {
    settSamhandlerRessurs((0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__.byggHenterRessurs)());
    hentSamhandler(String(behandlingIdEllerOrgnr)).then(function (ressurs) {
      if (skalObfuskereData) {
        (0,_utils_obfuskerData__WEBPACK_IMPORTED_MODULE_9__.obfuskerSamhandler)(ressurs);
      }
      settSamhandlerRessurs(ressurs);
    });
  };
  var hentSamhandler = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(behandlingIdEllerOrgnr) {
      var config;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            config = erIEnBehandling ? hentSamhandlerdataForBehandlingConfig(behandlingIdEllerOrgnr) : hentSamhandlerdataForOrgNrConfig(behandlingIdEllerOrgnr);
            return _context.a(2, request(config).then(function (ressurs) {
              return ressurs;
            })["catch"](function (_error) {
              return (0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__.byggFeiletRessurs)('Ukjent feil ved innhenting av samhandlerinfo');
            }));
        }
      }, _callee);
    }));
    return function hentSamhandler(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  return {
    hentSamhandler: hentSamhandler,
    hentOgSettSamhandler: hentOgSettSamhandler,
    samhandlerRessurs: samhandlerRessurs
  };
};
_s3(useSamhandlerRequest, "dRxWGifiNKLsipHB8DUasmyDPx8=", false, function () {
  return [_navikt_familie_http__WEBPACK_IMPORTED_MODULE_3__.useHttp, _context_AppContext__WEBPACK_IMPORTED_MODULE_7__.useAppContext];
});
var hentSamhandlerdataForBehandlingConfig = function hentSamhandlerdataForBehandlingConfig(behandlingId) {
  return {
    method: 'GET',
    url: '/familie-ba-sak/api/samhandler/behandling/' + behandlingId
  };
};
var hentSamhandlerdataForOrgNrConfig = function hentSamhandlerdataForOrgNrConfig(orgNr) {
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

/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f3678ba72740c4254b37")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi45ZDI3ZmEwODBlNmY4NWY0OGZhMC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFDQSx1S0FBQUEsQ0FBQSxFQUFBQyxDQUFBLEVBQUFDLENBQUEsd0JBQUFDLE1BQUEsR0FBQUEsTUFBQSxPQUFBQyxDQUFBLEdBQUFGLENBQUEsQ0FBQUcsUUFBQSxrQkFBQUMsQ0FBQSxHQUFBSixDQUFBLENBQUFLLFdBQUEsOEJBQUFDLEVBQUFOLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUMsQ0FBQSxHQUFBTCxDQUFBLElBQUFBLENBQUEsQ0FBQU0sU0FBQSxZQUFBQyxTQUFBLEdBQUFQLENBQUEsR0FBQU8sU0FBQSxFQUFBQyxDQUFBLEdBQUFDLE1BQUEsQ0FBQUMsTUFBQSxDQUFBTCxDQUFBLENBQUFDLFNBQUEsVUFBQUssbUJBQUEsQ0FBQUgsQ0FBQSx1QkFBQVYsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUUsQ0FBQSxFQUFBQyxDQUFBLEVBQUFHLENBQUEsRUFBQUksQ0FBQSxNQUFBQyxDQUFBLEdBQUFYLENBQUEsUUFBQVksQ0FBQSxPQUFBQyxDQUFBLEtBQUFGLENBQUEsS0FBQWIsQ0FBQSxLQUFBZ0IsQ0FBQSxFQUFBcEIsQ0FBQSxFQUFBcUIsQ0FBQSxFQUFBQyxDQUFBLEVBQUFOLENBQUEsRUFBQU0sQ0FBQSxDQUFBQyxJQUFBLENBQUF2QixDQUFBLE1BQUFzQixDQUFBLFdBQUFBLEVBQUFyQixDQUFBLEVBQUFDLENBQUEsV0FBQU0sQ0FBQSxHQUFBUCxDQUFBLEVBQUFRLENBQUEsTUFBQUcsQ0FBQSxHQUFBWixDQUFBLEVBQUFtQixDQUFBLENBQUFmLENBQUEsR0FBQUYsQ0FBQSxFQUFBbUIsQ0FBQSxnQkFBQUMsRUFBQXBCLENBQUEsRUFBQUUsQ0FBQSxTQUFBSyxDQUFBLEdBQUFQLENBQUEsRUFBQVUsQ0FBQSxHQUFBUixDQUFBLEVB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QUlHLFlBQW9CLEVBQW1EO0VBQ2xILE9BQU87SUFDSEMsTUFBTSxFQUFFLEtBQUs7SUFDYkMsR0FBRyxFQUFFLDRDQUE0QyxHQUFHRjtFQUN4RCxDQUFDO0FBQ0wsQ0FBQztBQUVELElBQU0zQixnQ0FBZ0MsR0FBRyxTQUFuQ0EsZ0NBQWdDQSxDQUFJM0IsS0FBYSxFQUFtRDtFQUN0RyxPQUFPO0lBQ0h1RCxNQUFNLEVBQUUsS0FBSztJQUNiQyxHQUFHLEVBQUUsdUNBQXVDLEdBQUd4RDtFQUNuRCxDQUFDO0FBQ0wsQ0FBQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUN4SEQsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9rb21wb25lbnRlci9TYW1oYW5kbGVyL3VzZVNhbWhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7IEF4aW9zRXJyb3IgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyB1c2VGb3JtIH0gZnJvbSAncmVhY3QtaG9vay1mb3JtJztcblxuaW1wb3J0IHR5cGUgeyBGYW1pbGllUmVxdWVzdENvbmZpZyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS1odHRwJztcbmltcG9ydCB7IHVzZUh0dHAgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtaHR0cCc7XG5pbXBvcnQgeyB1c2VGZWx0LCB1c2VTa2plbWEgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtc2tqZW1hJztcbmltcG9ydCB0eXBlIHsgUmVzc3VycyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5pbXBvcnQgeyBieWdnRmVpbGV0UmVzc3VycywgYnlnZ0hlbnRlclJlc3N1cnMsIGJ5Z2dUb21SZXNzdXJzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcbmltcG9ydCB7IFJlc3N1cnNTdGF0dXMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXIvZGlzdC9yZXNzdXJzJztcblxuaW1wb3J0IHsgdXNlQXBwQ29udGV4dCB9IGZyb20gJy4uLy4uL2NvbnRleHQvQXBwQ29udGV4dCc7XG5pbXBvcnQgeyB1c2VIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyB9IGZyb20gJy4uLy4uL2hvb2tzL3VzZVNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcnO1xuaW1wb3J0IHR5cGUgeyBJU2FtaGFuZGxlckluZm8sIElTYW1oYW5kbGVySW5mb1JlcXVlc3QgfSBmcm9tICcuLi8uLi90eXBlci9zYW1oYW5kbGVyJztcbmltcG9ydCB7IG9iZnVza2VyU2FtaGFuZGxlciB9IGZyb20gJy4uLy4uL3V0aWxzL29iZnVza2VyRGF0YSc7XG5pbXBvcnQgeyBvcmdudW1tZXJWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi91dGlscy92YWxpZGF0b3JzJztcblxuZXhwb3J0IGVudW0gRmllbGRzIHtcbiAgICBPUkdfTlIgPSAnb3JnbnInLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1WYWx1ZXMge1xuICAgIFtGaWVsZHMuT1JHX05SXTogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgdXNlU2FtaGFuZGxlclNramVtYSA9IChvcmdOcjogc3RyaW5nLCBvblN1Y2Nlc3M/OiAoKSA9PiB2b2lkLCBvbkVycm9yPzogKGVycm9yOiBzdHJpbmcpID0+IHZvaWQpID0+IHtcbiAgICBjb25zdCB7IG9uU3VibWl0LCBzZXR0U3VibWl0UmVzc3Vycywgc2tqZW1hIH0gPSB1c2VTa2plbWE8SVNhbWhhbmRsZXJJbmZvUmVxdWVzdCwgSVNhbWhhbmRsZXJJbmZvPih7XG4gICAgICAgIGZlbHRlcjoge1xuICAgICAgICAgICAgb3JnbnI6IHVzZUZlbHQoe1xuICAgICAgICAgICAgICAgIHZlcmRpOiAnJyxcbiAgICAgICAgICAgICAgICB2YWxpZGVyaW5nc2Z1bmtzam9uOiBvcmdudW1tZXJWYWxpZGF0b3IsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgICAgc2tqZW1hbmF2bjogJ2hlbnRTYW1oYW5kbGVyJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IGZvcm0gPSB1c2VGb3JtPEZvcm1WYWx1ZXM+KHtcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICBbRmllbGRzLk9SR19OUl06ICcnLFxuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3Qgb25TdWJtaXRXcmFwcGVyID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBkYXRhOiBzYW1oYW5kbGVyZGF0YSxcbiAgICAgICAgICAgIGlzUGVuZGluZzogaXNQZW5kaW5nRlNhbWhhbmRsZXJkYXRhLFxuICAgICAgICAgICAgZXJyb3I6IHNhbWhhbmRsZXJkYXRhRXJyb3IsXG4gICAgICAgIH0gPSB1c2VIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyhmb3JtLmdldFZhbHVlcyhGaWVsZHMuT1JHX05SKSk7XG4gICAgICAgIG9uU3VibWl0KFxuICAgICAgICAgICAgaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcoc2tqZW1hLmZlbHRlci5vcmduci52ZXJkaSksXG4gICAgICAgICAgICAocmVzc3VyczogUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0dFN1Ym1pdFJlc3N1cnMocmVzc3Vycyk7XG4gICAgICAgICAgICAgICAgaWYgKG9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob25FcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuRlVOS1NKT05FTExfRkVJTCkge1xuICAgICAgICAgICAgICAgICAgICBvbkVycm9yKGVycm9yLmZyb250ZW5kRmVpbG1lbGRpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZm9ybSxcbiAgICAgICAgb25TdWJtaXRXcmFwcGVyLFxuICAgICAgICBzYW1oYW5kbGVyU2tqZW1hOiBza2plbWEsXG4gICAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VTYW1oYW5kbGVyUmVxdWVzdCA9IChlcklFbkJlaGFuZGxpbmc6IGJvb2xlYW4pID0+IHtcbiAgICBjb25zdCB7IHJlcXVlc3QgfSA9IHVzZUh0dHAoKTtcbiAgICBjb25zdCBbc2FtaGFuZGxlclJlc3N1cnMsIHNldHRTYW1oYW5kbGVyUmVzc3Vyc10gPSB1c2VTdGF0ZTxSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4+KGJ5Z2dUb21SZXNzdXJzKCkpO1xuXG4gICAgY29uc3QgeyBza2FsT2JmdXNrZXJlRGF0YSB9ID0gdXNlQXBwQ29udGV4dCgpO1xuXG4gICAgY29uc3QgaGVudE9nU2V0dFNhbWhhbmRsZXIgPSAoYmVoYW5kbGluZ0lkRWxsZXJPcmducjogc3RyaW5nIHwgbnVtYmVyKSA9PiB7XG4gICAgICAgIHNldHRTYW1oYW5kbGVyUmVzc3VycyhieWdnSGVudGVyUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KCkpO1xuICAgICAgICBoZW50U2FtaGFuZGxlcihTdHJpbmcoYmVoYW5kbGluZ0lkRWxsZXJPcmducikpLnRoZW4oKHJlc3N1cnM6IFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPikgPT4ge1xuICAgICAgICAgICAgaWYgKHNrYWxPYmZ1c2tlcmVEYXRhKSB7XG4gICAgICAgICAgICAgICAgb2JmdXNrZXJTYW1oYW5kbGVyKHJlc3N1cnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0dFNhbWhhbmRsZXJSZXNzdXJzKHJlc3N1cnMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGVudFNhbWhhbmRsZXIgPSBhc3luYyAoYmVoYW5kbGluZ0lkRWxsZXJPcmducjogc3RyaW5nKTogUHJvbWlzZTxSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4+ID0+IHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gZXJJRW5CZWhhbmRsaW5nXG4gICAgICAgICAgICA/IGhlbnRTYW1oYW5kbGVyZGF0YUZvckJlaGFuZGxpbmdDb25maWcoYmVoYW5kbGluZ0lkRWxsZXJPcmducilcbiAgICAgICAgICAgIDogaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcoYmVoYW5kbGluZ0lkRWxsZXJPcmducik7XG4gICAgICAgIHJldHVybiByZXF1ZXN0PElTYW1oYW5kbGVySW5mb1JlcXVlc3QsIElTYW1oYW5kbGVySW5mbz4oY29uZmlnKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3N1cnM6IFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNzdXJzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoX2Vycm9yOiBBeGlvc0Vycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ5Z2dGZWlsZXRSZXNzdXJzKCdVa2plbnQgZmVpbCB2ZWQgaW5uaGVudGluZyBhdiBzYW1oYW5kbGVyaW5mbycpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGhlbnRTYW1oYW5kbGVyLFxuICAgICAgICBoZW50T2dTZXR0U2FtaGFuZGxlcixcbiAgICAgICAgc2FtaGFuZGxlclJlc3N1cnMsXG4gICAgfTtcbn07XG5cbmNvbnN0IGhlbnRTYW1oYW5kbGVyZGF0YUZvckJlaGFuZGxpbmdDb25maWcgPSAoYmVoYW5kbGluZ0lkOiBzdHJpbmcpOiBGYW1pbGllUmVxdWVzdENvbmZpZzxJU2FtaGFuZGxlckluZm9SZXF1ZXN0PiA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgdXJsOiAnL2ZhbWlsaWUtYmEtc2FrL2FwaS9zYW1oYW5kbGVyL2JlaGFuZGxpbmcvJyArIGJlaGFuZGxpbmdJZCxcbiAgICB9O1xufTtcblxuY29uc3QgaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcgPSAob3JnTnI6IHN0cmluZyk6IEZhbWlsaWVSZXF1ZXN0Q29uZmlnPElTYW1oYW5kbGVySW5mb1JlcXVlc3Q+ID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6ICcvZmFtaWxpZS1iYS1zYWsvYXBpL3NhbWhhbmRsZXIvb3JnbnIvJyArIG9yZ05yLFxuICAgIH07XG59O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZjM2NzhiYTcyNzQwYzQyNTRiMzdcIikiXSwibmFtZXMiOlsiZSIsInQiLCJyIiwiU3ltYm9sIiwibiIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsImYiLCJwIiwieSIsIkciLCJ2IiwiYSIsImQiLCJiaW5kIiwibGVuZ3RoIiwibCIsIlR5cGVFcnJvciIsImNhbGwiLCJkb25lIiwidmFsdWUiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImRpc3BsYXlOYW1lIiwiX3JlZ2VuZXJhdG9yIiwidyIsIm0iLCJkZWZpbmVQcm9wZXJ0eSIsIl9yZWdlbmVyYXRvckRlZmluZSIsIl9pbnZva2UiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3VtZW50cyIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJfc2xpY2VkVG9BcnJheSIsIl9hcnJheVdpdGhIb2xlcyIsIl9pdGVyYWJsZVRvQXJyYXlMaW1pdCIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVJlc3QiLCJfYXJyYXlMaWtlVG9BcnJheSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJBcnJheSIsImZyb20iLCJ0ZXN0IiwibmV4dCIsInB1c2giLCJpc0FycmF5IiwiX2RlZmluZVByb3BlcnR5IiwiX3RvUHJvcGVydHlLZXkiLCJfdG9QcmltaXRpdmUiLCJfdHlwZW9mIiwidG9QcmltaXRpdmUiLCJTdHJpbmciLCJOdW1iZXIiLCJ1c2VTdGF0ZSIsInVzZUZvcm0iLCJ1c2VIdHRwIiwidXNlRmVsdCIsInVzZVNramVtYSIsImJ5Z2dGZWlsZXRSZXNzdXJzIiwiYnlnZ0hlbnRlclJlc3N1cnMiLCJieWdnVG9tUmVzc3VycyIsIlJlc3N1cnNTdGF0dXMiLCJ1c2VBcHBDb250ZXh0IiwidXNlSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWciLCJvYmZ1c2tlclNhbWhhbmRsZXIiLCJvcmdudW1tZXJWYWxpZGF0b3IiLCJGaWVsZHMiLCJ1c2VTYW1oYW5kbGVyU2tqZW1hIiwib3JnTnIiLCJvblN1Y2Nlc3MiLCJvbkVycm9yIiwiX3MyIiwiX3MiLCIkUmVmcmVzaFNpZyQiLCJfdXNlU2tqZW1hIiwiZmVsdGVyIiwib3JnbnIiLCJ2ZXJkaSIsInZhbGlkZXJpbmdzZnVua3Nqb24iLCJza2plbWFuYXZuIiwib25TdWJtaXQiLCJzZXR0U3VibWl0UmVzc3VycyIsInNramVtYSIsImZvcm0iLCJ2YWx1ZXMiLCJPUkdfTlIiLCJvblN1Ym1pdFdyYXBwZXIiLCJfdXNlSGVudFNhbWhhbmRsZXJkYXQiLCJnZXRWYWx1ZXMiLCJzYW1oYW5kbGVyZGF0YSIsImRhdGEiLCJpc1BlbmRpbmdGU2FtaGFuZGxlcmRhdGEiLCJpc1BlbmRpbmciLCJzYW1oYW5kbGVyZGF0YUVycm9yIiwiZXJyb3IiLCJoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyIsInJlc3N1cnMiLCJzdGF0dXMiLCJGVU5LU0pPTkVMTF9GRUlMIiwiZnJvbnRlbmRGZWlsbWVsZGluZyIsInNhbWhhbmRsZXJTa2plbWEiLCJ1c2VTYW1oYW5kbGVyUmVxdWVzdCIsImVySUVuQmVoYW5kbGluZyIsIl9zMyIsIl91c2VIdHRwIiwicmVxdWVzdCIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJzYW1oYW5kbGVyUmVzc3VycyIsInNldHRTYW1oYW5kbGVyUmVzc3VycyIsIl91c2VBcHBDb250ZXh0Iiwic2thbE9iZnVza2VyZURhdGEiLCJoZW50T2dTZXR0U2FtaGFuZGxlciIsImJlaGFuZGxpbmdJZEVsbGVyT3JnbnIiLCJoZW50U2FtaGFuZGxlciIsIl9yZWYiLCJfY2FsbGVlIiwiY29uZmlnIiwiX2NvbnRleHQiLCJoZW50U2FtaGFuZGxlcmRhdGFGb3JCZWhhbmRsaW5nQ29uZmlnIiwiX2Vycm9yIiwiX3giLCJiZWhhbmRsaW5nSWQiLCJtZXRob2QiLCJ1cmwiXSwic291cmNlUm9vdCI6IiJ9