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
/* harmony import */ var _api_hentSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../api/hentSamhandlerdataForOrgNrConfig */ "./src/frontend/api/hentSamhandlerdataForOrgNrConfig.ts");
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
                return (0,_api_hentSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_8__.hentSamhandlerdataForOrgNrConfig)(request, values.orgnr);
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

/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("99dcfe6b57c66443724e")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi43MzQ4MjhlOTU3MzMzNDg1NDMwMS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUNBLHVLQUFBQSxDQUFBLEVBQUFDLENBQUEsRUFBQUMsQ0FBQSx3QkFBQUMsTUFBQSxHQUFBQSxNQUFBLE9BQUFDLENBQUEsR0FBQUYsQ0FBQSxDQUFBRyxRQUFBLGtCQUFBQyxDQUFBLEdBQUFKLENBQUEsQ0FBQUssV0FBQSw4QkFBQUMsRUFBQU4sQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBQyxDQUFBLEdBQUFMLENBQUEsSUFBQUEsQ0FBQSxDQUFBTSxTQUFBLFlBQUFDLFNBQUEsR0FBQVAsQ0FBQSxHQUFBTyxTQUFBLEVBQUFDLENBQUEsR0FBQUMsTUFBQSxDQUFBQyxNQUFBLENBQUFMLENBQUEsQ0FBQUMsU0FBQSxVQUFBSyxtQkFBQSxDQUFBSCxDQUFBLHVCQUFBVixDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBRSxDQUFBLEVBQUFDLENBQUEsRUFBQUcsQ0FBQSxFQUFBSSxDQUFBLE1BQUFDLENBQUEsR0FBQVgsQ0FBQSxRQUFBWSxDQUFBLE9BQUFDLENBQUEsS0FBQUYsQ0FBQSxLQUFBYixDQUFBLEtBQUFnQixDQUFBLEVBQUFwQixDQUFBLEVBQUFxQixDQUFBLEVBQUFDLENBQUEsRUFBQU4sQ0FBQSxFQUFBTSxDQUFBLENBQUFDLElBQUEsQ0FBQXZCLENBQUEsTUFBQXNCLENBQUEsV0FBQUEsRUFBQXJCLENBQUEsRUFBQUMsQ0FBQSxXQUFBTSxDQUFBLEdBQUFQLENBQUEsRUFBQVEsQ0FBQSxNQUFBRyxDQUFBLEdBQUFaLENBQUEsRUFBQW1CLENBQUEsQ0FBQWYsQ0FBQSxHQUFBRixDQUFBLEVBQUFtQixDQUFBLGdCQUFBQyxFQUFBcEIsQ0FBQSxFQUFBRSxDQUFBLFNBQUFLLENBQUEsR0FBQVAsQ0FBQSxFQUFBVSxDQUFBLEdBQUFS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QU0sRUFBRSxLQUFLO0lBQ2JDLEdBQUcsRUFBRSx1Q0FBdUMsR0FBR0M7RUFDbkQsQ0FBQztBQUNMLENBQUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDaElELHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQva29tcG9uZW50ZXIvU2FtaGFuZGxlci91c2VTYW1oYW5kbGVyLnRzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlUXVlcnlDbGllbnQgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknO1xuaW1wb3J0IHR5cGUgeyBBeGlvc0Vycm9yIH0gZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgdXNlRm9ybSB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5cbmltcG9ydCB0eXBlIHsgRmFtaWxpZVJlcXVlc3RDb25maWcgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtaHR0cCc7XG5pbXBvcnQgeyB1c2VIdHRwIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLWh0dHAnO1xuaW1wb3J0IHsgdXNlRmVsdCwgdXNlU2tqZW1hIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXNramVtYSc7XG5pbXBvcnQgdHlwZSB7IFJlc3N1cnMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuaW1wb3J0IHsgYnlnZ0ZlaWxldFJlc3N1cnMsIGJ5Z2dIZW50ZXJSZXNzdXJzLCBieWdnVG9tUmVzc3VycyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyL2Rpc3QvcmVzc3Vycyc7XG5cbmltcG9ydCB7IGhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIH0gZnJvbSAnLi4vLi4vYXBpL2hlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnJztcbmltcG9ydCB7IHVzZUFwcENvbnRleHQgfSBmcm9tICcuLi8uLi9jb250ZXh0L0FwcENvbnRleHQnO1xuaW1wb3J0IHsgSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3RvcnkgfSBmcm9tICcuLi8uLi9ob29rcy91c2VTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnJztcbmltcG9ydCB0eXBlIHsgSVNhbWhhbmRsZXJJbmZvLCBJU2FtaGFuZGxlckluZm9SZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdHlwZXIvc2FtaGFuZGxlcic7XG5pbXBvcnQgeyBvYmZ1c2tlclNhbWhhbmRsZXIgfSBmcm9tICcuLi8uLi91dGlscy9vYmZ1c2tlckRhdGEnO1xuaW1wb3J0IHsgb3JnbnVtbWVyVmFsaWRhdG9yIH0gZnJvbSAnLi4vLi4vdXRpbHMvdmFsaWRhdG9ycyc7XG5cbmV4cG9ydCBlbnVtIEZpZWxkcyB7XG4gICAgT1JHX05SID0gJ29yZ25yJyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtVmFsdWVzIHtcbiAgICBbRmllbGRzLk9SR19OUl06IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVNhbWhhbmRsZXJTa2plbWEgPSAob25TdWNjZXNzPzogKCkgPT4gdm9pZCwgb25FcnJvcj86IChlcnJvcjogc3RyaW5nKSA9PiB2b2lkKSA9PiB7XG4gICAgY29uc3QgcXVlcnlDbGllbnQgPSB1c2VRdWVyeUNsaWVudCgpO1xuICAgIGNvbnN0IHsgb25TdWJtaXQsIHNldHRTdWJtaXRSZXNzdXJzLCBza2plbWEgfSA9IHVzZVNramVtYTxJU2FtaGFuZGxlckluZm9SZXF1ZXN0LCBJU2FtaGFuZGxlckluZm8+KHtcbiAgICAgICAgZmVsdGVyOiB7XG4gICAgICAgICAgICBvcmducjogdXNlRmVsdCh7XG4gICAgICAgICAgICAgICAgdmVyZGk6ICcnLFxuICAgICAgICAgICAgICAgIHZhbGlkZXJpbmdzZnVua3Nqb246IG9yZ251bW1lclZhbGlkYXRvcixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgICBza2plbWFuYXZuOiAnaGVudFNhbWhhbmRsZXInLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZm9ybSA9IHVzZUZvcm08Rm9ybVZhbHVlcz4oe1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIFtGaWVsZHMuT1JHX05SXTogJycsXG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCB7IHJlcXVlc3QgfSA9IHVzZUh0dHAoKTtcblxuICAgIGFzeW5jIGZ1bmN0aW9uIG9uU3VibWl0TmV3KHZhbHVlczogRm9ybVZhbHVlcykge1xuICAgICAgICBxdWVyeUNsaWVudC5mZXRjaFF1ZXJ5KHtcbiAgICAgICAgICAgIHF1ZXJ5S2V5OiBIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeS5vcmcodmFsdWVzLm9yZ25yKSxcbiAgICAgICAgICAgIHF1ZXJ5Rm46ICgpID0+IGhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnKHJlcXVlc3QsIHZhbHVlcy5vcmduciksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IG9uU3VibWl0V3JhcHBlciA9ICgpID0+IHtcbiAgICAgICAgb25TdWJtaXQoXG4gICAgICAgICAgICBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ05ldyhza2plbWEuZmVsdGVyLm9yZ25yLnZlcmRpKSxcbiAgICAgICAgICAgIChyZXNzdXJzOiBSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4pID0+IHtcbiAgICAgICAgICAgICAgICBzZXR0U3VibWl0UmVzc3VycyhyZXNzdXJzKTtcbiAgICAgICAgICAgICAgICBpZiAob25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uU3VjY2VzcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvbkVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5GVU5LU0pPTkVMTF9GRUlMKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IoZXJyb3IuZnJvbnRlbmRGZWlsbWVsZGluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmb3JtLFxuICAgICAgICBvblN1Ym1pdDogb25TdWJtaXROZXcsXG4gICAgICAgIG9uU3VibWl0V3JhcHBlcixcbiAgICAgICAgc2FtaGFuZGxlclNramVtYTogc2tqZW1hLFxuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3QgdXNlU2FtaGFuZGxlclJlcXVlc3QgPSAoZXJJRW5CZWhhbmRsaW5nOiBib29sZWFuKSA9PiB7XG4gICAgY29uc3QgeyByZXF1ZXN0IH0gPSB1c2VIdHRwKCk7XG4gICAgY29uc3QgW3NhbWhhbmRsZXJSZXNzdXJzLCBzZXR0U2FtaGFuZGxlclJlc3N1cnNdID0gdXNlU3RhdGU8UmVzc3VyczxJU2FtaGFuZGxlckluZm8+PihieWdnVG9tUmVzc3VycygpKTtcblxuICAgIGNvbnN0IHsgc2thbE9iZnVza2VyZURhdGEgfSA9IHVzZUFwcENvbnRleHQoKTtcblxuICAgIGNvbnN0IGhlbnRPZ1NldHRTYW1oYW5kbGVyID0gKGJlaGFuZGxpbmdJZEVsbGVyT3JnbnI6IHN0cmluZyB8IG51bWJlcikgPT4ge1xuICAgICAgICBzZXR0U2FtaGFuZGxlclJlc3N1cnMoYnlnZ0hlbnRlclJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPigpKTtcbiAgICAgICAgaGVudFNhbWhhbmRsZXIoU3RyaW5nKGJlaGFuZGxpbmdJZEVsbGVyT3JnbnIpKS50aGVuKChyZXNzdXJzOiBSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4pID0+IHtcbiAgICAgICAgICAgIGlmIChza2FsT2JmdXNrZXJlRGF0YSkge1xuICAgICAgICAgICAgICAgIG9iZnVza2VyU2FtaGFuZGxlcihyZXNzdXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldHRTYW1oYW5kbGVyUmVzc3VycyhyZXNzdXJzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhlbnRTYW1oYW5kbGVyID0gYXN5bmMgKGJlaGFuZGxpbmdJZEVsbGVyT3JnbnI6IHN0cmluZyk6IFByb21pc2U8UmVzc3VyczxJU2FtaGFuZGxlckluZm8+PiA9PiB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IGVySUVuQmVoYW5kbGluZ1xuICAgICAgICAgICAgPyBoZW50U2FtaGFuZGxlcmRhdGFGb3JCZWhhbmRsaW5nQ29uZmlnKGJlaGFuZGxpbmdJZEVsbGVyT3JnbnIpXG4gICAgICAgICAgICA6IGhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnTmV3KGJlaGFuZGxpbmdJZEVsbGVyT3JnbnIpO1xuICAgICAgICByZXR1cm4gcmVxdWVzdDxJU2FtaGFuZGxlckluZm9SZXF1ZXN0LCBJU2FtaGFuZGxlckluZm8+KGNvbmZpZylcbiAgICAgICAgICAgIC50aGVuKChyZXNzdXJzOiBSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzc3VycztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKF9lcnJvcjogQXhpb3NFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBieWdnRmVpbGV0UmVzc3VycygnVWtqZW50IGZlaWwgdmVkIGlubmhlbnRpbmcgYXYgc2FtaGFuZGxlcmluZm8nKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBoZW50U2FtaGFuZGxlcixcbiAgICAgICAgaGVudE9nU2V0dFNhbWhhbmRsZXIsXG4gICAgICAgIHNhbWhhbmRsZXJSZXNzdXJzLFxuICAgIH07XG59O1xuXG5jb25zdCBoZW50U2FtaGFuZGxlcmRhdGFGb3JCZWhhbmRsaW5nQ29uZmlnID0gKGJlaGFuZGxpbmdJZDogc3RyaW5nKTogRmFtaWxpZVJlcXVlc3RDb25maWc8SVNhbWhhbmRsZXJJbmZvUmVxdWVzdD4gPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogJy9mYW1pbGllLWJhLXNhay9hcGkvc2FtaGFuZGxlci9iZWhhbmRsaW5nLycgKyBiZWhhbmRsaW5nSWQsXG4gICAgfTtcbn07XG5cbmNvbnN0IGhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnTmV3ID0gKG9yZ05yOiBzdHJpbmcpOiBGYW1pbGllUmVxdWVzdENvbmZpZzxJU2FtaGFuZGxlckluZm9SZXF1ZXN0PiA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgdXJsOiAnL2ZhbWlsaWUtYmEtc2FrL2FwaS9zYW1oYW5kbGVyL29yZ25yLycgKyBvcmdOcixcbiAgICB9O1xufTtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjk5ZGNmZTZiNTdjNjY0NDM3MjRlXCIpIl0sIm5hbWVzIjpbImUiLCJ0IiwiciIsIlN5bWJvbCIsIm4iLCJpdGVyYXRvciIsIm8iLCJ0b1N0cmluZ1RhZyIsImkiLCJjIiwicHJvdG90eXBlIiwiR2VuZXJhdG9yIiwidSIsIk9iamVjdCIsImNyZWF0ZSIsIl9yZWdlbmVyYXRvckRlZmluZTIiLCJmIiwicCIsInkiLCJHIiwidiIsImEiLCJkIiwiYmluZCIsImxlbmd0aCIsImwiLCJUeXBlRXJyb3IiLCJjYWxsIiwiZG9uZSIsInZhbHVlIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJkaXNwbGF5TmFtZSIsIl9yZWdlbmVyYXRvciIsInciLCJtIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVnZW5lcmF0b3JEZWZpbmUiLCJfaW52b2tlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiX2RlZmluZVByb3BlcnR5IiwiX3RvUHJvcGVydHlLZXkiLCJfdG9QcmltaXRpdmUiLCJfdHlwZW9mIiwidG9QcmltaXRpdmUiLCJTdHJpbmciLCJOdW1iZXIiLCJ1c2VTdGF0ZSIsInVzZVF1ZXJ5Q2xpZW50IiwidXNlRm9ybSIsInVzZUh0dHAiLCJ1c2VGZWx0IiwidXNlU2tqZW1hIiwiYnlnZ0ZlaWxldFJlc3N1cnMiLCJieWdnSGVudGVyUmVzc3VycyIsImJ5Z2dUb21SZXNzdXJzIiwiUmVzc3Vyc1N0YXR1cyIsImhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIiwidXNlQXBwQ29udGV4dCIsIkhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5Iiwib2JmdXNrZXJTYW1oYW5kbGVyIiwib3JnbnVtbWVyVmFsaWRhdG9yIiwiRmllbGRzIiwidXNlU2FtaGFuZGxlclNramVtYSIsIm9uU3VjY2VzcyIsIm9uRXJyb3IiLCJfcyIsInF1ZXJ5Q2xpZW50IiwiX3VzZVNramVtYSIsImZlbHRlciIsIm9yZ25yIiwidmVyZGkiLCJ2YWxpZGVyaW5nc2Z1bmtzam9uIiwic2tqZW1hbmF2biIsIm9uU3VibWl0Iiwic2V0dFN1Ym1pdFJlc3N1cnMiLCJza2plbWEiLCJmb3JtIiwidmFsdWVzIiwiT1JHX05SIiwiX3VzZUh0dHAiLCJyZXF1ZXN0Iiwib25TdWJtaXROZXciLCJfeCIsIl9vblN1Ym1pdE5ldyIsIl9jYWxsZWUiLCJfY29udGV4dCIsImZldGNoUXVlcnkiLCJxdWVyeUtleSIsIm9yZyIsInF1ZXJ5Rm4iLCJvblN1Ym1pdFdyYXBwZXIiLCJoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ05ldyIsInJlc3N1cnMiLCJlcnJvciIsInN0YXR1cyIsIkZVTktTSk9ORUxMX0ZFSUwiLCJmcm9udGVuZEZlaWxtZWxkaW5nIiwic2FtaGFuZGxlclNramVtYSIsInVzZVNhbWhhbmRsZXJSZXF1ZXN0IiwiZXJJRW5CZWhhbmRsaW5nIiwiX3MyIiwiX3VzZUh0dHAyIiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5Iiwic2FtaGFuZGxlclJlc3N1cnMiLCJzZXR0U2FtaGFuZGxlclJlc3N1cnMiLCJfdXNlQXBwQ29udGV4dCIsInNrYWxPYmZ1c2tlcmVEYXRhIiwiaGVudE9nU2V0dFNhbWhhbmRsZXIiLCJiZWhhbmRsaW5nSWRFbGxlck9yZ25yIiwiaGVudFNhbWhhbmRsZXIiLCJfcmVmIiwiX2NhbGxlZTIiLCJjb25maWciLCJfY29udGV4dDIiLCJoZW50U2FtaGFuZGxlcmRhdGFGb3JCZWhhbmRsaW5nQ29uZmlnIiwiX2Vycm9yIiwiX3gyIiwiYmVoYW5kbGluZ0lkIiwibWV0aG9kIiwidXJsIiwib3JnTnIiXSwic291cmNlUm9vdCI6IiJ9