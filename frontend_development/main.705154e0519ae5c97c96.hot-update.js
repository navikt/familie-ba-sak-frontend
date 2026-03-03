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

var _s = __webpack_require__.$Refresh$.signature(),
  _s2 = __webpack_require__.$Refresh$.signature();
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
  _s();
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
  var _useHentSamhandlerdat = (0,_hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_8__.useHentSamhandlerdataForOrgNrConfig)(orgNr),
    samhandlerdata = _useHentSamhandlerdat.data,
    isPendingFSamhandlerdata = _useHentSamhandlerdat.isPending,
    SamhandlerdataError = _useHentSamhandlerdat.error;
  var form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useForm)({
    values: _defineProperty({}, Fields.ORG_NR, '')
  });
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
    onSubmitWrapper: onSubmitWrapper,
    samhandlerSkjema: skjema
  };
};
_s(useSamhandlerSkjema, "vk/AebbaGQWfbhSMmBjE54Ib2j8=", false, function () {
  return [_navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_4__.useSkjema, _navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_4__.useFelt, _hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_8__.useHentSamhandlerdataForOrgNrConfig, react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useForm];
});
var useSamhandlerRequest = function useSamhandlerRequest(erIEnBehandling) {
  _s2();
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
_s2(useSamhandlerRequest, "dRxWGifiNKLsipHB8DUasmyDPx8=", false, function () {
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
/******/ 	__webpack_require__.h = () => ("05102d96c8282f584b6a")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi43MDUxNTRlMDUxOWFlNWM5N2M5Ni5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFDQSx1S0FBQUEsQ0FBQSxFQUFBQyxDQUFBLEVBQUFDLENBQUEsd0JBQUFDLE1BQUEsR0FBQUEsTUFBQSxPQUFBQyxDQUFBLEdBQUFGLENBQUEsQ0FBQUcsUUFBQSxrQkFBQUMsQ0FBQSxHQUFBSixDQUFBLENBQUFLLFdBQUEsOEJBQUFDLEVBQUFOLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUMsQ0FBQSxHQUFBTCxDQUFBLElBQUFBLENBQUEsQ0FBQU0sU0FBQSxZQUFBQyxTQUFBLEdBQUFQLENBQUEsR0FBQU8sU0FBQSxFQUFBQyxDQUFBLEdBQUFDLE1BQUEsQ0FBQUMsTUFBQSxDQUFBTCxDQUFBLENBQUFDLFNBQUEsVUFBQUssbUJBQUEsQ0FBQUgsQ0FBQSx1QkFBQVYsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUUsQ0FBQSxFQUFBQyxDQUFBLEVBQUFHLENBQUEsRUFBQUksQ0FBQSxNQUFBQyxDQUFBLEdBQUFYLENBQUEsUUFBQVksQ0FBQSxPQUFBQyxDQUFBLEtBQUFGLENBQUEsS0FBQWIsQ0FBQSxLQUFBZ0IsQ0FBQSxFQUFBcEIsQ0FBQSxFQUFBcUIsQ0FBQSxFQUFBQyxDQUFBLEVBQUFOLENBQUEsRUFBQU0sQ0FBQSxDQUFBQyxJQUFBLENBQUF2QixDQUFBLE1BQUFzQixDQUFBLFdBQUFBLEVBQUFyQixDQUFBLEVBQUFDLENBQUEsV0FBQU0sQ0FBQSxHQUFBUCxDQUFBLEVBQUFRLENBQUEsTUFBQUcsQ0FBQSxHQUFBWixDQUFBLEVBQUFtQixDQUFBLENBQUFmLENBQUEsR0FBQUYsQ0FBQSxFQUFBbUIsQ0FBQSxnQkFBQUMsRUFBQXBCLENBQUEsRUFBQUUsQ0FBQSxTQUFBSyxDQUFBLEdBQUFQLENBQUEsRUFBQVUsQ0FBQSxHQUFBUixDQUFBLEVB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QWdDLEdBQUcsU0FBbkNBLGdDQUFnQ0EsQ0FBSXhCLEtBQWEsRUFBbUQ7RUFDdEcsT0FBTztJQUNIb0QsTUFBTSxFQUFFLEtBQUs7SUFDYkMsR0FBRyxFQUFFLHVDQUF1QyxHQUFHckQ7RUFDbkQsQ0FBQztBQUNMLENBQUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDcEhELHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQva29tcG9uZW50ZXIvU2FtaGFuZGxlci91c2VTYW1oYW5kbGVyLnRzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBBeGlvc0Vycm9yIH0gZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgdXNlRm9ybSB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5cbmltcG9ydCB0eXBlIHsgRmFtaWxpZVJlcXVlc3RDb25maWcgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtaHR0cCc7XG5pbXBvcnQgeyB1c2VIdHRwIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLWh0dHAnO1xuaW1wb3J0IHsgdXNlRmVsdCwgdXNlU2tqZW1hIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXNramVtYSc7XG5pbXBvcnQgdHlwZSB7IFJlc3N1cnMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuaW1wb3J0IHsgYnlnZ0ZlaWxldFJlc3N1cnMsIGJ5Z2dIZW50ZXJSZXNzdXJzLCBieWdnVG9tUmVzc3VycyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyL2Rpc3QvcmVzc3Vycyc7XG5cbmltcG9ydCB7IHVzZUFwcENvbnRleHQgfSBmcm9tICcuLi8uLi9jb250ZXh0L0FwcENvbnRleHQnO1xuaW1wb3J0IHsgdXNlSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcgfSBmcm9tICcuLi8uLi9ob29rcy91c2VTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnJztcbmltcG9ydCB0eXBlIHsgSVNhbWhhbmRsZXJJbmZvLCBJU2FtaGFuZGxlckluZm9SZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdHlwZXIvc2FtaGFuZGxlcic7XG5pbXBvcnQgeyBvYmZ1c2tlclNhbWhhbmRsZXIgfSBmcm9tICcuLi8uLi91dGlscy9vYmZ1c2tlckRhdGEnO1xuaW1wb3J0IHsgb3JnbnVtbWVyVmFsaWRhdG9yIH0gZnJvbSAnLi4vLi4vdXRpbHMvdmFsaWRhdG9ycyc7XG5cbmV4cG9ydCBlbnVtIEZpZWxkcyB7XG4gICAgT1JHX05SID0gJ29yZ25yJyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtVmFsdWVzIHtcbiAgICBbRmllbGRzLk9SR19OUl06IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVNhbWhhbmRsZXJTa2plbWEgPSAob3JnTnI6IHN0cmluZywgb25TdWNjZXNzPzogKCkgPT4gdm9pZCwgb25FcnJvcj86IChlcnJvcjogc3RyaW5nKSA9PiB2b2lkKSA9PiB7XG4gICAgY29uc3QgeyBvblN1Ym1pdCwgc2V0dFN1Ym1pdFJlc3N1cnMsIHNramVtYSB9ID0gdXNlU2tqZW1hPElTYW1oYW5kbGVySW5mb1JlcXVlc3QsIElTYW1oYW5kbGVySW5mbz4oe1xuICAgICAgICBmZWx0ZXI6IHtcbiAgICAgICAgICAgIG9yZ25yOiB1c2VGZWx0KHtcbiAgICAgICAgICAgICAgICB2ZXJkaTogJycsXG4gICAgICAgICAgICAgICAgdmFsaWRlcmluZ3NmdW5rc2pvbjogb3JnbnVtbWVyVmFsaWRhdG9yLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIH0sXG4gICAgICAgIHNramVtYW5hdm46ICdoZW50U2FtaGFuZGxlcicsXG4gICAgfSk7XG4gICAgY29uc3QgeyBkYXRhOiBzYW1oYW5kbGVyZGF0YSwgaXNQZW5kaW5nOiBpc1BlbmRpbmdGU2FtaGFuZGxlcmRhdGEsIGVycm9yOiBTYW1oYW5kbGVyZGF0YUVycm9yIH0gPSB1c2VIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyhvcmdOcik7XG5cbiAgICBjb25zdCBmb3JtID0gdXNlRm9ybTxGb3JtVmFsdWVzPih7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgW0ZpZWxkcy5PUkdfTlJdOiAnJyxcbiAgICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IG9uU3VibWl0V3JhcHBlciA9ICgpID0+IHtcbiAgICAgICAgb25TdWJtaXQoXG4gICAgICAgICAgICBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyhza2plbWEuZmVsdGVyLm9yZ25yLnZlcmRpKSxcbiAgICAgICAgICAgIChyZXNzdXJzOiBSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4pID0+IHtcbiAgICAgICAgICAgICAgICBzZXR0U3VibWl0UmVzc3VycyhyZXNzdXJzKTtcbiAgICAgICAgICAgICAgICBpZiAob25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uU3VjY2VzcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvbkVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5GVU5LU0pPTkVMTF9GRUlMKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IoZXJyb3IuZnJvbnRlbmRGZWlsbWVsZGluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmb3JtLFxuICAgICAgICBvblN1Ym1pdFdyYXBwZXIsXG4gICAgICAgIHNhbWhhbmRsZXJTa2plbWE6IHNramVtYSxcbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZVNhbWhhbmRsZXJSZXF1ZXN0ID0gKGVySUVuQmVoYW5kbGluZzogYm9vbGVhbikgPT4ge1xuICAgIGNvbnN0IHsgcmVxdWVzdCB9ID0gdXNlSHR0cCgpO1xuICAgIGNvbnN0IFtzYW1oYW5kbGVyUmVzc3Vycywgc2V0dFNhbWhhbmRsZXJSZXNzdXJzXSA9IHVzZVN0YXRlPFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPj4oYnlnZ1RvbVJlc3N1cnMoKSk7XG5cbiAgICBjb25zdCB7IHNrYWxPYmZ1c2tlcmVEYXRhIH0gPSB1c2VBcHBDb250ZXh0KCk7XG5cbiAgICBjb25zdCBoZW50T2dTZXR0U2FtaGFuZGxlciA9IChiZWhhbmRsaW5nSWRFbGxlck9yZ25yOiBzdHJpbmcgfCBudW1iZXIpID0+IHtcbiAgICAgICAgc2V0dFNhbWhhbmRsZXJSZXNzdXJzKGJ5Z2dIZW50ZXJSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4oKSk7XG4gICAgICAgIGhlbnRTYW1oYW5kbGVyKFN0cmluZyhiZWhhbmRsaW5nSWRFbGxlck9yZ25yKSkudGhlbigocmVzc3VyczogUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KSA9PiB7XG4gICAgICAgICAgICBpZiAoc2thbE9iZnVza2VyZURhdGEpIHtcbiAgICAgICAgICAgICAgICBvYmZ1c2tlclNhbWhhbmRsZXIocmVzc3Vycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXR0U2FtaGFuZGxlclJlc3N1cnMocmVzc3Vycyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBoZW50U2FtaGFuZGxlciA9IGFzeW5jIChiZWhhbmRsaW5nSWRFbGxlck9yZ25yOiBzdHJpbmcpOiBQcm9taXNlPFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPj4gPT4ge1xuICAgICAgICBjb25zdCBjb25maWcgPSBlcklFbkJlaGFuZGxpbmdcbiAgICAgICAgICAgID8gaGVudFNhbWhhbmRsZXJkYXRhRm9yQmVoYW5kbGluZ0NvbmZpZyhiZWhhbmRsaW5nSWRFbGxlck9yZ25yKVxuICAgICAgICAgICAgOiBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyhiZWhhbmRsaW5nSWRFbGxlck9yZ25yKTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3Q8SVNhbWhhbmRsZXJJbmZvUmVxdWVzdCwgSVNhbWhhbmRsZXJJbmZvPihjb25maWcpXG4gICAgICAgICAgICAudGhlbigocmVzc3VyczogUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3N1cnM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChfZXJyb3I6IEF4aW9zRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnlnZ0ZlaWxldFJlc3N1cnMoJ1VramVudCBmZWlsIHZlZCBpbm5oZW50aW5nIGF2IHNhbWhhbmRsZXJpbmZvJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVudFNhbWhhbmRsZXIsXG4gICAgICAgIGhlbnRPZ1NldHRTYW1oYW5kbGVyLFxuICAgICAgICBzYW1oYW5kbGVyUmVzc3VycyxcbiAgICB9O1xufTtcblxuY29uc3QgaGVudFNhbWhhbmRsZXJkYXRhRm9yQmVoYW5kbGluZ0NvbmZpZyA9IChiZWhhbmRsaW5nSWQ6IHN0cmluZyk6IEZhbWlsaWVSZXF1ZXN0Q29uZmlnPElTYW1oYW5kbGVySW5mb1JlcXVlc3Q+ID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6ICcvZmFtaWxpZS1iYS1zYWsvYXBpL3NhbWhhbmRsZXIvYmVoYW5kbGluZy8nICsgYmVoYW5kbGluZ0lkLFxuICAgIH07XG59O1xuXG5jb25zdCBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyA9IChvcmdOcjogc3RyaW5nKTogRmFtaWxpZVJlcXVlc3RDb25maWc8SVNhbWhhbmRsZXJJbmZvUmVxdWVzdD4gPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogJy9mYW1pbGllLWJhLXNhay9hcGkvc2FtaGFuZGxlci9vcmduci8nICsgb3JnTnIsXG4gICAgfTtcbn07XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIwNTEwMmQ5NmM4MjgyZjU4NGI2YVwiKSJdLCJuYW1lcyI6WyJlIiwidCIsInIiLCJTeW1ib2wiLCJuIiwiaXRlcmF0b3IiLCJvIiwidG9TdHJpbmdUYWciLCJpIiwiYyIsInByb3RvdHlwZSIsIkdlbmVyYXRvciIsInUiLCJPYmplY3QiLCJjcmVhdGUiLCJfcmVnZW5lcmF0b3JEZWZpbmUyIiwiZiIsInAiLCJ5IiwiRyIsInYiLCJhIiwiZCIsImJpbmQiLCJsZW5ndGgiLCJsIiwiVHlwZUVycm9yIiwiY2FsbCIsImRvbmUiLCJ2YWx1ZSIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiZGlzcGxheU5hbWUiLCJfcmVnZW5lcmF0b3IiLCJ3IiwibSIsImRlZmluZVByb3BlcnR5IiwiX3JlZ2VuZXJhdG9yRGVmaW5lIiwiX2ludm9rZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsIl9zbGljZWRUb0FycmF5IiwiX2FycmF5V2l0aEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheUxpbWl0IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwiX25vbkl0ZXJhYmxlUmVzdCIsIl9hcnJheUxpa2VUb0FycmF5IiwidG9TdHJpbmciLCJzbGljZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsIkFycmF5IiwiZnJvbSIsInRlc3QiLCJuZXh0IiwicHVzaCIsImlzQXJyYXkiLCJfZGVmaW5lUHJvcGVydHkiLCJfdG9Qcm9wZXJ0eUtleSIsIl90b1ByaW1pdGl2ZSIsIl90eXBlb2YiLCJ0b1ByaW1pdGl2ZSIsIlN0cmluZyIsIk51bWJlciIsInVzZVN0YXRlIiwidXNlRm9ybSIsInVzZUh0dHAiLCJ1c2VGZWx0IiwidXNlU2tqZW1hIiwiYnlnZ0ZlaWxldFJlc3N1cnMiLCJieWdnSGVudGVyUmVzc3VycyIsImJ5Z2dUb21SZXNzdXJzIiwiUmVzc3Vyc1N0YXR1cyIsInVzZUFwcENvbnRleHQiLCJ1c2VIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyIsIm9iZnVza2VyU2FtaGFuZGxlciIsIm9yZ251bW1lclZhbGlkYXRvciIsIkZpZWxkcyIsInVzZVNhbWhhbmRsZXJTa2plbWEiLCJvcmdOciIsIm9uU3VjY2VzcyIsIm9uRXJyb3IiLCJfcyIsIl91c2VTa2plbWEiLCJmZWx0ZXIiLCJvcmduciIsInZlcmRpIiwidmFsaWRlcmluZ3NmdW5rc2pvbiIsInNramVtYW5hdm4iLCJvblN1Ym1pdCIsInNldHRTdWJtaXRSZXNzdXJzIiwic2tqZW1hIiwiX3VzZUhlbnRTYW1oYW5kbGVyZGF0Iiwic2FtaGFuZGxlcmRhdGEiLCJkYXRhIiwiaXNQZW5kaW5nRlNhbWhhbmRsZXJkYXRhIiwiaXNQZW5kaW5nIiwiU2FtaGFuZGxlcmRhdGFFcnJvciIsImVycm9yIiwiZm9ybSIsInZhbHVlcyIsIk9SR19OUiIsIm9uU3VibWl0V3JhcHBlciIsImhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIiwicmVzc3VycyIsInN0YXR1cyIsIkZVTktTSk9ORUxMX0ZFSUwiLCJmcm9udGVuZEZlaWxtZWxkaW5nIiwic2FtaGFuZGxlclNramVtYSIsInVzZVNhbWhhbmRsZXJSZXF1ZXN0IiwiZXJJRW5CZWhhbmRsaW5nIiwiX3MyIiwiX3VzZUh0dHAiLCJyZXF1ZXN0IiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsInNhbWhhbmRsZXJSZXNzdXJzIiwic2V0dFNhbWhhbmRsZXJSZXNzdXJzIiwiX3VzZUFwcENvbnRleHQiLCJza2FsT2JmdXNrZXJlRGF0YSIsImhlbnRPZ1NldHRTYW1oYW5kbGVyIiwiYmVoYW5kbGluZ0lkRWxsZXJPcmduciIsImhlbnRTYW1oYW5kbGVyIiwiX3JlZiIsIl9jYWxsZWUiLCJjb25maWciLCJfY29udGV4dCIsImhlbnRTYW1oYW5kbGVyZGF0YUZvckJlaGFuZGxpbmdDb25maWciLCJfZXJyb3IiLCJfeCIsImJlaGFuZGxpbmdJZCIsIm1ldGhvZCIsInVybCJdLCJzb3VyY2VSb290IjoiIn0=