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
  _s2();
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
  function onSubmitNew(_x) {
    return _onSubmitNew.apply(this, arguments);
  }
  function _onSubmitNew() {
    var _s = __webpack_require__.$Refresh$.signature();
    _onSubmitNew = _s(_asyncToGenerator(_s(/*#__PURE__*/_regenerator().m(function _callee(values) {
      var _useHentSamhandlerdat, samhandlerdata, samhandlerdataLaster, samhandlerdataError;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _s();
            _useHentSamhandlerdat = (0,_hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_8__.useHentSamhandlerdataForOrgNrConfig)(values.orgNr), samhandlerdata = _useHentSamhandlerdat.data, samhandlerdataLaster = _useHentSamhandlerdat.isPending, samhandlerdataError = _useHentSamhandlerdat.error;
          case 1:
            return _context.a(2);
        }
      }, _callee);
    }), "BmAl2Ap3vn0iro5MbdWcv9atsM0=", false, function () {
      return [_hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_8__.useHentSamhandlerdataForOrgNrConfig];
    })), "BmAl2Ap3vn0iro5MbdWcv9atsM0=", false, function () {
      return [_hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_8__.useHentSamhandlerdataForOrgNrConfig];
    });
    return _onSubmitNew.apply(this, arguments);
  }
  var onSubmitWrapper = function onSubmitWrapper() {
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
  return {
    form: form,
    onSubmit: onSubmitNew,
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
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(behandlingIdEllerOrgnr) {
      var config;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            config = erIEnBehandling ? hentSamhandlerdataForBehandlingConfig(behandlingIdEllerOrgnr) : hentSamhandlerdataForOrgNrConfig(behandlingIdEllerOrgnr);
            return _context2.a(2, request(config).then(function (ressurs) {
              return ressurs;
            })["catch"](function (_error) {
              return (0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__.byggFeiletRessurs)('Ukjent feil ved innhenting av samhandlerinfo');
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
/******/ 	__webpack_require__.h = () => ("ac0738ca1bf0317372ea")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi42YjhmNGYxNGY2MTFkYWU4ODZlNy5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFDQSx1S0FBQUEsQ0FBQSxFQUFBQyxDQUFBLEVBQUFDLENBQUEsd0JBQUFDLE1BQUEsR0FBQUEsTUFBQSxPQUFBQyxDQUFBLEdBQUFGLENBQUEsQ0FBQUcsUUFBQSxrQkFBQUMsQ0FBQSxHQUFBSixDQUFBLENBQUFLLFdBQUEsOEJBQUFDLEVBQUFOLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUMsQ0FBQSxHQUFBTCxDQUFBLElBQUFBLENBQUEsQ0FBQU0sU0FBQSxZQUFBQyxTQUFBLEdBQUFQLENBQUEsR0FBQU8sU0FBQSxFQUFBQyxDQUFBLEdBQUFDLE1BQUEsQ0FBQUMsTUFBQSxDQUFBTCxDQUFBLENBQUFDLFNBQUEsVUFBQUssbUJBQUEsQ0FBQUgsQ0FBQSx1QkFBQVYsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUUsQ0FBQSxFQUFBQyxDQUFBLEVBQUFHLENBQUEsRUFBQUksQ0FBQSxNQUFBQyxDQUFBLEdBQUFYLENBQUEsUUFBQVksQ0FBQSxPQUFBQyxDQUFBLEtBQUFGLENBQUEsS0FBQWIsQ0FBQSxLQUFBZ0IsQ0FBQSxFQUFBcEIsQ0FBQSxFQUFBcUIsQ0FBQSxFQUFBQyxDQUFBLEVBQUFOLENBQUEsRUFBQU0sQ0FBQSxDQUFBQyxJQUFBLENBQUF2QixDQUFBLE1BQUFzQixDQUFBLFdBQUFBLEVBQUFyQixDQUFBLEVBQUFDLENBQUEsV0FBQU0sQ0FBQSxHQUFBUCxDQUFBLEVBQUFRLENBQUEsTUFBQUcsQ0FBQSxHQUFBWixDQUFBLEVBQUFtQixDQUFBLENBQUFmLENBQUEsR0FBQUYsQ0FBQSxFQUFBbUIsQ0FBQSxnQkFBQUMsRUFBQXBCLENBQUEsRUFBQUUsQ0FBQSxTQUFBSyxDQUFBLEdBQUFQLENBQUEsRUFBQVUsQ0FBQSxHQUFBUixD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R25DO0VBQ25ELENBQUM7QUFDTCxDQUFDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzVIRCxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL2tvbXBvbmVudGVyL1NhbWhhbmRsZXIvdXNlU2FtaGFuZGxlci50cyIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgQXhpb3NFcnJvciB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IHVzZUZvcm0gfSBmcm9tICdyZWFjdC1ob29rLWZvcm0nO1xuXG5pbXBvcnQgdHlwZSB7IEZhbWlsaWVSZXF1ZXN0Q29uZmlnIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLWh0dHAnO1xuaW1wb3J0IHsgdXNlSHR0cCB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS1odHRwJztcbmltcG9ydCB7IHVzZUZlbHQsIHVzZVNramVtYSB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS1za2plbWEnO1xuaW1wb3J0IHR5cGUgeyBSZXNzdXJzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcbmltcG9ydCB7IGJ5Z2dGZWlsZXRSZXNzdXJzLCBieWdnSGVudGVyUmVzc3VycywgYnlnZ1RvbVJlc3N1cnMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuaW1wb3J0IHsgUmVzc3Vyc1N0YXR1cyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlci9kaXN0L3Jlc3N1cnMnO1xuXG5pbXBvcnQgeyB1c2VBcHBDb250ZXh0IH0gZnJvbSAnLi4vLi4vY29udGV4dC9BcHBDb250ZXh0JztcbmltcG9ydCB7IHVzZUhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIH0gZnJvbSAnLi4vLi4vaG9va3MvdXNlU2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyc7XG5pbXBvcnQgdHlwZSB7IElTYW1oYW5kbGVySW5mbywgSVNhbWhhbmRsZXJJbmZvUmVxdWVzdCB9IGZyb20gJy4uLy4uL3R5cGVyL3NhbWhhbmRsZXInO1xuaW1wb3J0IHsgb2JmdXNrZXJTYW1oYW5kbGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvb2JmdXNrZXJEYXRhJztcbmltcG9ydCB7IG9yZ251bW1lclZhbGlkYXRvciB9IGZyb20gJy4uLy4uL3V0aWxzL3ZhbGlkYXRvcnMnO1xuXG5leHBvcnQgZW51bSBGaWVsZHMge1xuICAgIE9SR19OUiA9ICdvcmducicsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybVZhbHVlcyB7XG4gICAgW0ZpZWxkcy5PUkdfTlJdOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCB1c2VTYW1oYW5kbGVyU2tqZW1hID0gKG9uU3VjY2Vzcz86ICgpID0+IHZvaWQsIG9uRXJyb3I/OiAoZXJyb3I6IHN0cmluZykgPT4gdm9pZCkgPT4ge1xuICAgIGNvbnN0IHsgb25TdWJtaXQsIHNldHRTdWJtaXRSZXNzdXJzLCBza2plbWEgfSA9IHVzZVNramVtYTxJU2FtaGFuZGxlckluZm9SZXF1ZXN0LCBJU2FtaGFuZGxlckluZm8+KHtcbiAgICAgICAgZmVsdGVyOiB7XG4gICAgICAgICAgICBvcmducjogdXNlRmVsdCh7XG4gICAgICAgICAgICAgICAgdmVyZGk6ICcnLFxuICAgICAgICAgICAgICAgIHZhbGlkZXJpbmdzZnVua3Nqb246IG9yZ251bW1lclZhbGlkYXRvcixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgICBza2plbWFuYXZuOiAnaGVudFNhbWhhbmRsZXInLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZm9ybSA9IHVzZUZvcm08Rm9ybVZhbHVlcz4oe1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIFtGaWVsZHMuT1JHX05SXTogJycsXG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBhc3luYyBmdW5jdGlvbiBvblN1Ym1pdE5ldyh2YWx1ZXM6IEZvcm1WYWx1ZXMpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgZGF0YTogc2FtaGFuZGxlcmRhdGEsXG4gICAgICAgICAgICBpc1BlbmRpbmc6IHNhbWhhbmRsZXJkYXRhTGFzdGVyLFxuICAgICAgICAgICAgZXJyb3I6IHNhbWhhbmRsZXJkYXRhRXJyb3IsXG4gICAgICAgIH0gPSB1c2VIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyh2YWx1ZXMub3JnTnIpO1xuICAgIH1cblxuICAgIGNvbnN0IG9uU3VibWl0V3JhcHBlciA9ICgpID0+IHtcbiAgICAgICAgb25TdWJtaXQoXG4gICAgICAgICAgICBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyhza2plbWEuZmVsdGVyLm9yZ25yLnZlcmRpKSxcbiAgICAgICAgICAgIChyZXNzdXJzOiBSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4pID0+IHtcbiAgICAgICAgICAgICAgICBzZXR0U3VibWl0UmVzc3VycyhyZXNzdXJzKTtcbiAgICAgICAgICAgICAgICBpZiAob25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uU3VjY2VzcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvbkVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5GVU5LU0pPTkVMTF9GRUlMKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IoZXJyb3IuZnJvbnRlbmRGZWlsbWVsZGluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmb3JtLFxuICAgICAgICBvblN1Ym1pdDogb25TdWJtaXROZXcsXG4gICAgICAgIG9uU3VibWl0V3JhcHBlcixcbiAgICAgICAgc2FtaGFuZGxlclNramVtYTogc2tqZW1hLFxuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3QgdXNlU2FtaGFuZGxlclJlcXVlc3QgPSAoZXJJRW5CZWhhbmRsaW5nOiBib29sZWFuKSA9PiB7XG4gICAgY29uc3QgeyByZXF1ZXN0IH0gPSB1c2VIdHRwKCk7XG4gICAgY29uc3QgW3NhbWhhbmRsZXJSZXNzdXJzLCBzZXR0U2FtaGFuZGxlclJlc3N1cnNdID0gdXNlU3RhdGU8UmVzc3VyczxJU2FtaGFuZGxlckluZm8+PihieWdnVG9tUmVzc3VycygpKTtcblxuICAgIGNvbnN0IHsgc2thbE9iZnVza2VyZURhdGEgfSA9IHVzZUFwcENvbnRleHQoKTtcblxuICAgIGNvbnN0IGhlbnRPZ1NldHRTYW1oYW5kbGVyID0gKGJlaGFuZGxpbmdJZEVsbGVyT3JnbnI6IHN0cmluZyB8IG51bWJlcikgPT4ge1xuICAgICAgICBzZXR0U2FtaGFuZGxlclJlc3N1cnMoYnlnZ0hlbnRlclJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPigpKTtcbiAgICAgICAgaGVudFNhbWhhbmRsZXIoU3RyaW5nKGJlaGFuZGxpbmdJZEVsbGVyT3JnbnIpKS50aGVuKChyZXNzdXJzOiBSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4pID0+IHtcbiAgICAgICAgICAgIGlmIChza2FsT2JmdXNrZXJlRGF0YSkge1xuICAgICAgICAgICAgICAgIG9iZnVza2VyU2FtaGFuZGxlcihyZXNzdXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldHRTYW1oYW5kbGVyUmVzc3VycyhyZXNzdXJzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhlbnRTYW1oYW5kbGVyID0gYXN5bmMgKGJlaGFuZGxpbmdJZEVsbGVyT3JnbnI6IHN0cmluZyk6IFByb21pc2U8UmVzc3VyczxJU2FtaGFuZGxlckluZm8+PiA9PiB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IGVySUVuQmVoYW5kbGluZ1xuICAgICAgICAgICAgPyBoZW50U2FtaGFuZGxlcmRhdGFGb3JCZWhhbmRsaW5nQ29uZmlnKGJlaGFuZGxpbmdJZEVsbGVyT3JnbnIpXG4gICAgICAgICAgICA6IGhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnKGJlaGFuZGxpbmdJZEVsbGVyT3JnbnIpO1xuICAgICAgICByZXR1cm4gcmVxdWVzdDxJU2FtaGFuZGxlckluZm9SZXF1ZXN0LCBJU2FtaGFuZGxlckluZm8+KGNvbmZpZylcbiAgICAgICAgICAgIC50aGVuKChyZXNzdXJzOiBSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzc3VycztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKF9lcnJvcjogQXhpb3NFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBieWdnRmVpbGV0UmVzc3VycygnVWtqZW50IGZlaWwgdmVkIGlubmhlbnRpbmcgYXYgc2FtaGFuZGxlcmluZm8nKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBoZW50U2FtaGFuZGxlcixcbiAgICAgICAgaGVudE9nU2V0dFNhbWhhbmRsZXIsXG4gICAgICAgIHNhbWhhbmRsZXJSZXNzdXJzLFxuICAgIH07XG59O1xuXG5jb25zdCBoZW50U2FtaGFuZGxlcmRhdGFGb3JCZWhhbmRsaW5nQ29uZmlnID0gKGJlaGFuZGxpbmdJZDogc3RyaW5nKTogRmFtaWxpZVJlcXVlc3RDb25maWc8SVNhbWhhbmRsZXJJbmZvUmVxdWVzdD4gPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogJy9mYW1pbGllLWJhLXNhay9hcGkvc2FtaGFuZGxlci9iZWhhbmRsaW5nLycgKyBiZWhhbmRsaW5nSWQsXG4gICAgfTtcbn07XG5cbmNvbnN0IGhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnID0gKG9yZ05yOiBzdHJpbmcpOiBGYW1pbGllUmVxdWVzdENvbmZpZzxJU2FtaGFuZGxlckluZm9SZXF1ZXN0PiA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgdXJsOiAnL2ZhbWlsaWUtYmEtc2FrL2FwaS9zYW1oYW5kbGVyL29yZ25yLycgKyBvcmdOcixcbiAgICB9O1xufTtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImFjMDczOGNhMWJmMDMxNzM3MmVhXCIpIl0sIm5hbWVzIjpbImUiLCJ0IiwiciIsIlN5bWJvbCIsIm4iLCJpdGVyYXRvciIsIm8iLCJ0b1N0cmluZ1RhZyIsImkiLCJjIiwicHJvdG90eXBlIiwiR2VuZXJhdG9yIiwidSIsIk9iamVjdCIsImNyZWF0ZSIsIl9yZWdlbmVyYXRvckRlZmluZTIiLCJmIiwicCIsInkiLCJHIiwidiIsImEiLCJkIiwiYmluZCIsImxlbmd0aCIsImwiLCJUeXBlRXJyb3IiLCJjYWxsIiwiZG9uZSIsInZhbHVlIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJkaXNwbGF5TmFtZSIsIl9yZWdlbmVyYXRvciIsInciLCJtIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVnZW5lcmF0b3JEZWZpbmUiLCJfaW52b2tlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiX2RlZmluZVByb3BlcnR5IiwiX3RvUHJvcGVydHlLZXkiLCJfdG9QcmltaXRpdmUiLCJfdHlwZW9mIiwidG9QcmltaXRpdmUiLCJTdHJpbmciLCJOdW1iZXIiLCJ1c2VTdGF0ZSIsInVzZUZvcm0iLCJ1c2VIdHRwIiwidXNlRmVsdCIsInVzZVNramVtYSIsImJ5Z2dGZWlsZXRSZXNzdXJzIiwiYnlnZ0hlbnRlclJlc3N1cnMiLCJieWdnVG9tUmVzc3VycyIsIlJlc3N1cnNTdGF0dXMiLCJ1c2VBcHBDb250ZXh0IiwidXNlSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWciLCJvYmZ1c2tlclNhbWhhbmRsZXIiLCJvcmdudW1tZXJWYWxpZGF0b3IiLCJGaWVsZHMiLCJ1c2VTYW1oYW5kbGVyU2tqZW1hIiwib25TdWNjZXNzIiwib25FcnJvciIsIl9zMiIsIl91c2VTa2plbWEiLCJmZWx0ZXIiLCJvcmduciIsInZlcmRpIiwidmFsaWRlcmluZ3NmdW5rc2pvbiIsInNramVtYW5hdm4iLCJvblN1Ym1pdCIsInNldHRTdWJtaXRSZXNzdXJzIiwic2tqZW1hIiwiZm9ybSIsInZhbHVlcyIsIk9SR19OUiIsIm9uU3VibWl0TmV3IiwiX3giLCJfb25TdWJtaXROZXciLCJfcyIsIiRSZWZyZXNoU2lnJCIsIl9jYWxsZWUiLCJfdXNlSGVudFNhbWhhbmRsZXJkYXQiLCJzYW1oYW5kbGVyZGF0YSIsInNhbWhhbmRsZXJkYXRhTGFzdGVyIiwic2FtaGFuZGxlcmRhdGFFcnJvciIsIl9jb250ZXh0Iiwib3JnTnIiLCJkYXRhIiwiaXNQZW5kaW5nIiwiZXJyb3IiLCJvblN1Ym1pdFdyYXBwZXIiLCJoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyIsInJlc3N1cnMiLCJzdGF0dXMiLCJGVU5LU0pPTkVMTF9GRUlMIiwiZnJvbnRlbmRGZWlsbWVsZGluZyIsInNhbWhhbmRsZXJTa2plbWEiLCJ1c2VTYW1oYW5kbGVyUmVxdWVzdCIsImVySUVuQmVoYW5kbGluZyIsIl9zMyIsIl91c2VIdHRwIiwicmVxdWVzdCIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInNhbWhhbmRsZXJSZXNzdXJzIiwic2V0dFNhbWhhbmRsZXJSZXNzdXJzIiwiX3VzZUFwcENvbnRleHQiLCJza2FsT2JmdXNrZXJlRGF0YSIsImhlbnRPZ1NldHRTYW1oYW5kbGVyIiwiYmVoYW5kbGluZ0lkRWxsZXJPcmduciIsImhlbnRTYW1oYW5kbGVyIiwiX3JlZiIsIl9jYWxsZWUyIiwiY29uZmlnIiwiX2NvbnRleHQyIiwiaGVudFNhbWhhbmRsZXJkYXRhRm9yQmVoYW5kbGluZ0NvbmZpZyIsIl9lcnJvciIsIl94MiIsImJlaGFuZGxpbmdJZCIsIm1ldGhvZCIsInVybCJdLCJzb3VyY2VSb290IjoiIn0=