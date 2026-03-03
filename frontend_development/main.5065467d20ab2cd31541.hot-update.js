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
/* harmony import */ var _utils_obfuskerData__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/obfuskerData */ "./src/frontend/utils/obfuskerData.ts");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/validators */ "./src/frontend/utils/validators.ts");
/* harmony import */ var _hooks_useHentBarnetrygdbehandlinger__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../hooks/useHentBarnetrygdbehandlinger */ "./src/frontend/hooks/useHentBarnetrygdbehandlinger.ts");
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
          valideringsfunksjon: _utils_validators__WEBPACK_IMPORTED_MODULE_9__.orgnummerValidator
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
      var _useHentBarnetrygdbeh, barnetrygdbehandlinger, barnetrygdbehandlingerLaster, barnetrygdbehandlingerError;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _s();
            _useHentBarnetrygdbeh = (0,_hooks_useHentBarnetrygdbehandlinger__WEBPACK_IMPORTED_MODULE_10__.useHentBarnetrygdbehandlinger)(values.orgNr), barnetrygdbehandlinger = _useHentBarnetrygdbeh.data, barnetrygdbehandlingerLaster = _useHentBarnetrygdbeh.isPending, barnetrygdbehandlingerError = _useHentBarnetrygdbeh.error;
          case 1:
            return _context.a(2);
        }
      }, _callee);
    }), "14P7ceM8uFbmdGfwyqzor2XFZnM=", false, function () {
      return [_hooks_useHentBarnetrygdbehandlinger__WEBPACK_IMPORTED_MODULE_10__.useHentBarnetrygdbehandlinger];
    })), "14P7ceM8uFbmdGfwyqzor2XFZnM=", false, function () {
      return [_hooks_useHentBarnetrygdbehandlinger__WEBPACK_IMPORTED_MODULE_10__.useHentBarnetrygdbehandlinger];
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
        (0,_utils_obfuskerData__WEBPACK_IMPORTED_MODULE_8__.obfuskerSamhandler)(ressurs);
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
/******/ 	__webpack_require__.h = () => ("5b93ad3b7885e72a9a65")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi41MDY1NDY3ZDIwYWIyY2QzMTU0MS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFDQSx1S0FBQUEsQ0FBQSxFQUFBQyxDQUFBLEVBQUFDLENBQUEsd0JBQUFDLE1BQUEsR0FBQUEsTUFBQSxPQUFBQyxDQUFBLEdBQUFGLENBQUEsQ0FBQUcsUUFBQSxrQkFBQUMsQ0FBQSxHQUFBSixDQUFBLENBQUFLLFdBQUEsOEJBQUFDLEVBQUFOLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUMsQ0FBQSxHQUFBTCxDQUFBLElBQUFBLENBQUEsQ0FBQU0sU0FBQSxZQUFBQyxTQUFBLEdBQUFQLENBQUEsR0FBQU8sU0FBQSxFQUFBQyxDQUFBLEdBQUFDLE1BQUEsQ0FBQUMsTUFBQSxDQUFBTCxDQUFBLENBQUFDLFNBQUEsVUFBQUssbUJBQUEsQ0FBQUgsQ0FBQSx1QkFBQVYsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUUsQ0FBQSxFQUFBQyxDQUFBLEVBQUFHLENBQUEsRUFBQUksQ0FBQSxNQUFBQyxDQUFBLEdBQUFYLENBQUEsUUFBQVksQ0FBQSxPQUFBQyxDQUFBLEtBQUFGLENBQUEsS0FBQWIsQ0FBQSxLQUFBZ0IsQ0FBQSxFQUFBcEIsQ0FBQSxFQUFBcUIsQ0FBQSxFQUFBQyxDQUFBLEVBQUFOLENBQUEsRUFBQU0sQ0FBQSxDQUFBQyxJQUFBLENBQUF2QixDQUFBLE1BQUFzQixDQUFBLFdBQUFBLEVBQUFyQixDQUFBLEVBQUFDLENBQUEsV0FBQU0sQ0FBQSxHQUFBUCxDQUFBLEVBQUFRLENBQUEsTUFBQUcsQ0FBQSxHQUFBWixDQUFBLEVBQUFtQixDQUFBLENBQUFmLENBQUEsR0FBQUYsQ0FBQSxFQUFBbUIsQ0FBQSxnQkFBQUMsRUFBQXBCLENBQUEsRUFBQUUsQ0FBQSxTQUFBSyxDQUFBLEdBQUFQLENBQUEsRUFBQVUsQ0FBQSxHQUFBUixD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QUFHbkM7RUFDbkQsQ0FBQztBQUNMLENBQUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDN0hELHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQva29tcG9uZW50ZXIvU2FtaGFuZGxlci91c2VTYW1oYW5kbGVyLnRzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBBeGlvc0Vycm9yIH0gZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgdXNlRm9ybSB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5cbmltcG9ydCB0eXBlIHsgRmFtaWxpZVJlcXVlc3RDb25maWcgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtaHR0cCc7XG5pbXBvcnQgeyB1c2VIdHRwIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLWh0dHAnO1xuaW1wb3J0IHsgdXNlRmVsdCwgdXNlU2tqZW1hIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXNramVtYSc7XG5pbXBvcnQgdHlwZSB7IFJlc3N1cnMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuaW1wb3J0IHsgYnlnZ0ZlaWxldFJlc3N1cnMsIGJ5Z2dIZW50ZXJSZXNzdXJzLCBieWdnVG9tUmVzc3VycyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyL2Rpc3QvcmVzc3Vycyc7XG5cbmltcG9ydCB7IHVzZUFwcENvbnRleHQgfSBmcm9tICcuLi8uLi9jb250ZXh0L0FwcENvbnRleHQnO1xuaW1wb3J0IHR5cGUgeyBJU2FtaGFuZGxlckluZm8sIElTYW1oYW5kbGVySW5mb1JlcXVlc3QgfSBmcm9tICcuLi8uLi90eXBlci9zYW1oYW5kbGVyJztcbmltcG9ydCB7IG9iZnVza2VyU2FtaGFuZGxlciB9IGZyb20gJy4uLy4uL3V0aWxzL29iZnVza2VyRGF0YSc7XG5pbXBvcnQgeyBvcmdudW1tZXJWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi91dGlscy92YWxpZGF0b3JzJztcbmltcG9ydCB7IHVzZUhlbnRCYXJuZXRyeWdkYmVoYW5kbGluZ2VyIH0gZnJvbSAnLi4vLi4vaG9va3MvdXNlSGVudEJhcm5ldHJ5Z2RiZWhhbmRsaW5nZXInO1xuXG5leHBvcnQgZW51bSBGaWVsZHMge1xuICAgIE9SR19OUiA9ICdvcmducicsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybVZhbHVlcyB7XG4gICAgW0ZpZWxkcy5PUkdfTlJdOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCB1c2VTYW1oYW5kbGVyU2tqZW1hID0gKG9uU3VjY2Vzcz86ICgpID0+IHZvaWQsIG9uRXJyb3I/OiAoZXJyb3I6IHN0cmluZykgPT4gdm9pZCkgPT4ge1xuICAgIGNvbnN0IHsgb25TdWJtaXQsIHNldHRTdWJtaXRSZXNzdXJzLCBza2plbWEgfSA9IHVzZVNramVtYTxJU2FtaGFuZGxlckluZm9SZXF1ZXN0LCBJU2FtaGFuZGxlckluZm8+KHtcbiAgICAgICAgZmVsdGVyOiB7XG4gICAgICAgICAgICBvcmducjogdXNlRmVsdCh7XG4gICAgICAgICAgICAgICAgdmVyZGk6ICcnLFxuICAgICAgICAgICAgICAgIHZhbGlkZXJpbmdzZnVua3Nqb246IG9yZ251bW1lclZhbGlkYXRvcixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgICBza2plbWFuYXZuOiAnaGVudFNhbWhhbmRsZXInLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZm9ybSA9IHVzZUZvcm08Rm9ybVZhbHVlcz4oe1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIFtGaWVsZHMuT1JHX05SXTogJycsXG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBhc3luYyBmdW5jdGlvbiBvblN1Ym1pdE5ldyh2YWx1ZXM6IEZvcm1WYWx1ZXMpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgZGF0YTogYmFybmV0cnlnZGJlaGFuZGxpbmdlcixcbiAgICAgICAgICAgIGlzUGVuZGluZzogYmFybmV0cnlnZGJlaGFuZGxpbmdlckxhc3RlcixcbiAgICAgICAgICAgIGVycm9yOiBiYXJuZXRyeWdkYmVoYW5kbGluZ2VyRXJyb3IsXG4gICAgICAgIH0gPSB1c2VIZW50QmFybmV0cnlnZGJlaGFuZGxpbmdlcih2YWx1ZXMub3JnTnIpO1xuXG4gICAgfVxuXG4gICAgY29uc3Qgb25TdWJtaXRXcmFwcGVyID0gKCkgPT4ge1xuICAgICAgICBvblN1Ym1pdChcbiAgICAgICAgICAgIGhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnKHNramVtYS5mZWx0ZXIub3JnbnIudmVyZGkpLFxuICAgICAgICAgICAgKHJlc3N1cnM6IFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPikgPT4ge1xuICAgICAgICAgICAgICAgIHNldHRTdWJtaXRSZXNzdXJzKHJlc3N1cnMpO1xuICAgICAgICAgICAgICAgIGlmIChvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcjogUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9uRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLkZVTktTSk9ORUxMX0ZFSUwpIHtcbiAgICAgICAgICAgICAgICAgICAgb25FcnJvcihlcnJvci5mcm9udGVuZEZlaWxtZWxkaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGZvcm0sXG4gICAgICAgIG9uU3VibWl0OiBvblN1Ym1pdE5ldyxcbiAgICAgICAgb25TdWJtaXRXcmFwcGVyLFxuICAgICAgICBzYW1oYW5kbGVyU2tqZW1hOiBza2plbWEsXG4gICAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VTYW1oYW5kbGVyUmVxdWVzdCA9IChlcklFbkJlaGFuZGxpbmc6IGJvb2xlYW4pID0+IHtcbiAgICBjb25zdCB7IHJlcXVlc3QgfSA9IHVzZUh0dHAoKTtcbiAgICBjb25zdCBbc2FtaGFuZGxlclJlc3N1cnMsIHNldHRTYW1oYW5kbGVyUmVzc3Vyc10gPSB1c2VTdGF0ZTxSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4+KGJ5Z2dUb21SZXNzdXJzKCkpO1xuXG4gICAgY29uc3QgeyBza2FsT2JmdXNrZXJlRGF0YSB9ID0gdXNlQXBwQ29udGV4dCgpO1xuXG4gICAgY29uc3QgaGVudE9nU2V0dFNhbWhhbmRsZXIgPSAoYmVoYW5kbGluZ0lkRWxsZXJPcmducjogc3RyaW5nIHwgbnVtYmVyKSA9PiB7XG4gICAgICAgIHNldHRTYW1oYW5kbGVyUmVzc3VycyhieWdnSGVudGVyUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KCkpO1xuICAgICAgICBoZW50U2FtaGFuZGxlcihTdHJpbmcoYmVoYW5kbGluZ0lkRWxsZXJPcmducikpLnRoZW4oKHJlc3N1cnM6IFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPikgPT4ge1xuICAgICAgICAgICAgaWYgKHNrYWxPYmZ1c2tlcmVEYXRhKSB7XG4gICAgICAgICAgICAgICAgb2JmdXNrZXJTYW1oYW5kbGVyKHJlc3N1cnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0dFNhbWhhbmRsZXJSZXNzdXJzKHJlc3N1cnMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGVudFNhbWhhbmRsZXIgPSBhc3luYyAoYmVoYW5kbGluZ0lkRWxsZXJPcmducjogc3RyaW5nKTogUHJvbWlzZTxSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4+ID0+IHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gZXJJRW5CZWhhbmRsaW5nXG4gICAgICAgICAgICA/IGhlbnRTYW1oYW5kbGVyZGF0YUZvckJlaGFuZGxpbmdDb25maWcoYmVoYW5kbGluZ0lkRWxsZXJPcmducilcbiAgICAgICAgICAgIDogaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcoYmVoYW5kbGluZ0lkRWxsZXJPcmducik7XG4gICAgICAgIHJldHVybiByZXF1ZXN0PElTYW1oYW5kbGVySW5mb1JlcXVlc3QsIElTYW1oYW5kbGVySW5mbz4oY29uZmlnKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3N1cnM6IFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNzdXJzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoX2Vycm9yOiBBeGlvc0Vycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ5Z2dGZWlsZXRSZXNzdXJzKCdVa2plbnQgZmVpbCB2ZWQgaW5uaGVudGluZyBhdiBzYW1oYW5kbGVyaW5mbycpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGhlbnRTYW1oYW5kbGVyLFxuICAgICAgICBoZW50T2dTZXR0U2FtaGFuZGxlcixcbiAgICAgICAgc2FtaGFuZGxlclJlc3N1cnMsXG4gICAgfTtcbn07XG5cbmNvbnN0IGhlbnRTYW1oYW5kbGVyZGF0YUZvckJlaGFuZGxpbmdDb25maWcgPSAoYmVoYW5kbGluZ0lkOiBzdHJpbmcpOiBGYW1pbGllUmVxdWVzdENvbmZpZzxJU2FtaGFuZGxlckluZm9SZXF1ZXN0PiA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgdXJsOiAnL2ZhbWlsaWUtYmEtc2FrL2FwaS9zYW1oYW5kbGVyL2JlaGFuZGxpbmcvJyArIGJlaGFuZGxpbmdJZCxcbiAgICB9O1xufTtcblxuY29uc3QgaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcgPSAob3JnTnI6IHN0cmluZyk6IEZhbWlsaWVSZXF1ZXN0Q29uZmlnPElTYW1oYW5kbGVySW5mb1JlcXVlc3Q+ID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6ICcvZmFtaWxpZS1iYS1zYWsvYXBpL3NhbWhhbmRsZXIvb3JnbnIvJyArIG9yZ05yLFxuICAgIH07XG59O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiNWI5M2FkM2I3ODg1ZTcyYTlhNjVcIikiXSwibmFtZXMiOlsiZSIsInQiLCJyIiwiU3ltYm9sIiwibiIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsImYiLCJwIiwieSIsIkciLCJ2IiwiYSIsImQiLCJiaW5kIiwibGVuZ3RoIiwibCIsIlR5cGVFcnJvciIsImNhbGwiLCJkb25lIiwidmFsdWUiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImRpc3BsYXlOYW1lIiwiX3JlZ2VuZXJhdG9yIiwidyIsIm0iLCJkZWZpbmVQcm9wZXJ0eSIsIl9yZWdlbmVyYXRvckRlZmluZSIsIl9pbnZva2UiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3VtZW50cyIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJfZGVmaW5lUHJvcGVydHkiLCJfdG9Qcm9wZXJ0eUtleSIsIl90b1ByaW1pdGl2ZSIsIl90eXBlb2YiLCJ0b1ByaW1pdGl2ZSIsIlN0cmluZyIsIk51bWJlciIsInVzZVN0YXRlIiwidXNlRm9ybSIsInVzZUh0dHAiLCJ1c2VGZWx0IiwidXNlU2tqZW1hIiwiYnlnZ0ZlaWxldFJlc3N1cnMiLCJieWdnSGVudGVyUmVzc3VycyIsImJ5Z2dUb21SZXNzdXJzIiwiUmVzc3Vyc1N0YXR1cyIsInVzZUFwcENvbnRleHQiLCJvYmZ1c2tlclNhbWhhbmRsZXIiLCJvcmdudW1tZXJWYWxpZGF0b3IiLCJ1c2VIZW50QmFybmV0cnlnZGJlaGFuZGxpbmdlciIsIkZpZWxkcyIsInVzZVNhbWhhbmRsZXJTa2plbWEiLCJvblN1Y2Nlc3MiLCJvbkVycm9yIiwiX3MyIiwiX3VzZVNramVtYSIsImZlbHRlciIsIm9yZ25yIiwidmVyZGkiLCJ2YWxpZGVyaW5nc2Z1bmtzam9uIiwic2tqZW1hbmF2biIsIm9uU3VibWl0Iiwic2V0dFN1Ym1pdFJlc3N1cnMiLCJza2plbWEiLCJmb3JtIiwidmFsdWVzIiwiT1JHX05SIiwib25TdWJtaXROZXciLCJfeCIsIl9vblN1Ym1pdE5ldyIsIl9zIiwiJFJlZnJlc2hTaWckIiwiX2NhbGxlZSIsIl91c2VIZW50QmFybmV0cnlnZGJlaCIsImJhcm5ldHJ5Z2RiZWhhbmRsaW5nZXIiLCJiYXJuZXRyeWdkYmVoYW5kbGluZ2VyTGFzdGVyIiwiYmFybmV0cnlnZGJlaGFuZGxpbmdlckVycm9yIiwiX2NvbnRleHQiLCJvcmdOciIsImRhdGEiLCJpc1BlbmRpbmciLCJlcnJvciIsIm9uU3VibWl0V3JhcHBlciIsImhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIiwicmVzc3VycyIsInN0YXR1cyIsIkZVTktTSk9ORUxMX0ZFSUwiLCJmcm9udGVuZEZlaWxtZWxkaW5nIiwic2FtaGFuZGxlclNramVtYSIsInVzZVNhbWhhbmRsZXJSZXF1ZXN0IiwiZXJJRW5CZWhhbmRsaW5nIiwiX3MzIiwiX3VzZUh0dHAiLCJyZXF1ZXN0IiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5Iiwic2FtaGFuZGxlclJlc3N1cnMiLCJzZXR0U2FtaGFuZGxlclJlc3N1cnMiLCJfdXNlQXBwQ29udGV4dCIsInNrYWxPYmZ1c2tlcmVEYXRhIiwiaGVudE9nU2V0dFNhbWhhbmRsZXIiLCJiZWhhbmRsaW5nSWRFbGxlck9yZ25yIiwiaGVudFNhbWhhbmRsZXIiLCJfcmVmIiwiX2NhbGxlZTIiLCJjb25maWciLCJfY29udGV4dDIiLCJoZW50U2FtaGFuZGxlcmRhdGFGb3JCZWhhbmRsaW5nQ29uZmlnIiwiX2Vycm9yIiwiX3gyIiwiYmVoYW5kbGluZ0lkIiwibWV0aG9kIiwidXJsIl0sInNvdXJjZVJvb3QiOiIifQ==