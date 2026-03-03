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
    _onSubmitNew = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(values) {
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            return _context.a(2);
        }
      }, _callee);
    }));
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
_s(useSamhandlerSkjema, "VzJ0Fw0G01PxezNVdSRI9o4Io5A=", false, function () {
  return [_navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_4__.useSkjema, _navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_4__.useFelt, react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useForm];
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
/******/ 	__webpack_require__.h = () => ("7f447726158663300c28")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi41MzVlZTc2NWRlYTQ2NDc3NmExNS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUNBLHVLQUFBQSxDQUFBLEVBQUFDLENBQUEsRUFBQUMsQ0FBQSx3QkFBQUMsTUFBQSxHQUFBQSxNQUFBLE9BQUFDLENBQUEsR0FBQUYsQ0FBQSxDQUFBRyxRQUFBLGtCQUFBQyxDQUFBLEdBQUFKLENBQUEsQ0FBQUssV0FBQSw4QkFBQUMsRUFBQU4sQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBQyxDQUFBLEdBQUFMLENBQUEsSUFBQUEsQ0FBQSxDQUFBTSxTQUFBLFlBQUFDLFNBQUEsR0FBQVAsQ0FBQSxHQUFBTyxTQUFBLEVBQUFDLENBQUEsR0FBQUMsTUFBQSxDQUFBQyxNQUFBLENBQUFMLENBQUEsQ0FBQUMsU0FBQSxVQUFBSyxtQkFBQSxDQUFBSCxDQUFBLHVCQUFBVixDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBRSxDQUFBLEVBQUFDLENBQUEsRUFBQUcsQ0FBQSxFQUFBSSxDQUFBLE1BQUFDLENBQUEsR0FBQVgsQ0FBQSxRQUFBWSxDQUFBLE9BQUFDLENBQUEsS0FBQUYsQ0FBQSxLQUFBYixDQUFBLEtBQUFnQixDQUFBLEVBQUFwQixDQUFBLEVBQUFxQixDQUFBLEVBQUFDLENBQUEsRUFBQU4sQ0FBQSxFQUFBTSxDQUFBLENBQUFDLElBQUEsQ0FBQXZCLENBQUEsTUFBQXNCLENBQUEsV0FBQUEsRUFBQXJCLENBQUEsRUFBQUMsQ0FBQSxXQUFBTSxDQUFBLEdBQUFQLENBQUEsRUFBQVEsQ0FBQSxNQUFBRyxDQUFBLEdBQUFaLENBQUEsRUFBQW1CLENBQUEsQ0FBQWYsQ0FBQSxHQUFBRixDQUFBLEVBQUFtQixDQUFBLGdCQUFBQyxFQUFBcEIsQ0FBQSxFQUFBRSxDQUFBLFNBQUFLLENBQUEsR0FBQVAsQ0FBQSxFQUFBVSxDQUFBLEdBQUFSLENB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QUM7WUFDNUUsQ0FBQyxDQUFDO1FBQUE7TUFBQSxHQUFBcUQsUUFBQTtJQUFBLENBQ1Q7SUFBQSxnQkFYS0YsY0FBY0EsQ0FBQU8sR0FBQTtNQUFBLE9BQUFOLElBQUEsQ0FBQW5FLEtBQUEsT0FBQUQsU0FBQTtJQUFBO0VBQUEsR0FXbkI7RUFFRCxPQUFPO0lBQ0htRSxjQUFjLEVBQWRBLGNBQWM7SUFDZEYsb0JBQW9CLEVBQXBCQSxvQkFBb0I7SUFDcEJKLGlCQUFpQixFQUFqQkE7RUFDSixDQUFDO0FBQ0wsQ0FBQztBQUFDTixHQUFBLENBbENXRixvQkFBb0I7RUFBQSxRQUNUeEMseURBQU8sRUFHR08sOERBQWE7QUFBQTtBQWdDL0MsSUFBTW9ELHFDQUFxQyxHQUFHLFNBQXhDQSxxQ0FBcUNBLENBQUlHLFlBQW9CLEVBQW1EO0VBQ2xILE9BQU87SUFDSEMsTUFBTSxFQUFFLEtBQUs7SUFDYkMsR0FBRyxFQUFFLDRDQUE0QyxHQUFHRjtFQUN4RCxDQUFDO0FBQ0wsQ0FBQztBQUVELElBQU03QixnQ0FBZ0MsR0FBRyxTQUFuQ0EsZ0NBQWdDQSxDQUFJZ0MsS0FBYSxFQUFtRDtFQUN0RyxPQUFPO0lBQ0hGLE1BQU0sRUFBRSxLQUFLO0lBQ2JDLEdBQUcsRUFBRSx1Q0FBdUMsR0FBR0M7RUFDbkQsQ0FBQztBQUNMLENBQUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDdkhELHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQva29tcG9uZW50ZXIvU2FtaGFuZGxlci91c2VTYW1oYW5kbGVyLnRzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBBeGlvc0Vycm9yIH0gZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgdXNlRm9ybSB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5cbmltcG9ydCB0eXBlIHsgRmFtaWxpZVJlcXVlc3RDb25maWcgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtaHR0cCc7XG5pbXBvcnQgeyB1c2VIdHRwIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLWh0dHAnO1xuaW1wb3J0IHsgdXNlRmVsdCwgdXNlU2tqZW1hIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXNramVtYSc7XG5pbXBvcnQgdHlwZSB7IFJlc3N1cnMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuaW1wb3J0IHsgYnlnZ0ZlaWxldFJlc3N1cnMsIGJ5Z2dIZW50ZXJSZXNzdXJzLCBieWdnVG9tUmVzc3VycyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyL2Rpc3QvcmVzc3Vycyc7XG5cbmltcG9ydCB7IHVzZUFwcENvbnRleHQgfSBmcm9tICcuLi8uLi9jb250ZXh0L0FwcENvbnRleHQnO1xuaW1wb3J0IHR5cGUgeyBJU2FtaGFuZGxlckluZm8sIElTYW1oYW5kbGVySW5mb1JlcXVlc3QgfSBmcm9tICcuLi8uLi90eXBlci9zYW1oYW5kbGVyJztcbmltcG9ydCB7IG9iZnVza2VyU2FtaGFuZGxlciB9IGZyb20gJy4uLy4uL3V0aWxzL29iZnVza2VyRGF0YSc7XG5pbXBvcnQgeyBvcmdudW1tZXJWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi91dGlscy92YWxpZGF0b3JzJztcblxuZXhwb3J0IGVudW0gRmllbGRzIHtcbiAgICBPUkdfTlIgPSAnb3JnbnInLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1WYWx1ZXMge1xuICAgIFtGaWVsZHMuT1JHX05SXTogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgdXNlU2FtaGFuZGxlclNramVtYSA9IChvblN1Y2Nlc3M/OiAoKSA9PiB2b2lkLCBvbkVycm9yPzogKGVycm9yOiBzdHJpbmcpID0+IHZvaWQpID0+IHtcbiAgICBjb25zdCB7IG9uU3VibWl0LCBzZXR0U3VibWl0UmVzc3Vycywgc2tqZW1hIH0gPSB1c2VTa2plbWE8SVNhbWhhbmRsZXJJbmZvUmVxdWVzdCwgSVNhbWhhbmRsZXJJbmZvPih7XG4gICAgICAgIGZlbHRlcjoge1xuICAgICAgICAgICAgb3JnbnI6IHVzZUZlbHQoe1xuICAgICAgICAgICAgICAgIHZlcmRpOiAnJyxcbiAgICAgICAgICAgICAgICB2YWxpZGVyaW5nc2Z1bmtzam9uOiBvcmdudW1tZXJWYWxpZGF0b3IsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgICAgc2tqZW1hbmF2bjogJ2hlbnRTYW1oYW5kbGVyJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IGZvcm0gPSB1c2VGb3JtPEZvcm1WYWx1ZXM+KHtcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICBbRmllbGRzLk9SR19OUl06ICcnLFxuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgYXN5bmMgZnVuY3Rpb24gb25TdWJtaXROZXcodmFsdWVzOiBGb3JtVmFsdWVzKSB7XG5cbiAgICB9XG5cbiAgICBjb25zdCBvblN1Ym1pdFdyYXBwZXIgPSAoKSA9PiB7XG4gICAgICAgIG9uU3VibWl0KFxuICAgICAgICAgICAgaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcoc2tqZW1hLmZlbHRlci5vcmduci52ZXJkaSksXG4gICAgICAgICAgICAocmVzc3VyczogUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0dFN1Ym1pdFJlc3N1cnMocmVzc3Vycyk7XG4gICAgICAgICAgICAgICAgaWYgKG9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob25FcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuRlVOS1NKT05FTExfRkVJTCkge1xuICAgICAgICAgICAgICAgICAgICBvbkVycm9yKGVycm9yLmZyb250ZW5kRmVpbG1lbGRpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZm9ybSxcbiAgICAgICAgb25TdWJtaXQ6IG9uU3VibWl0TmV3LFxuICAgICAgICBvblN1Ym1pdFdyYXBwZXIsXG4gICAgICAgIHNhbWhhbmRsZXJTa2plbWE6IHNramVtYSxcbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZVNhbWhhbmRsZXJSZXF1ZXN0ID0gKGVySUVuQmVoYW5kbGluZzogYm9vbGVhbikgPT4ge1xuICAgIGNvbnN0IHsgcmVxdWVzdCB9ID0gdXNlSHR0cCgpO1xuICAgIGNvbnN0IFtzYW1oYW5kbGVyUmVzc3Vycywgc2V0dFNhbWhhbmRsZXJSZXNzdXJzXSA9IHVzZVN0YXRlPFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPj4oYnlnZ1RvbVJlc3N1cnMoKSk7XG5cbiAgICBjb25zdCB7IHNrYWxPYmZ1c2tlcmVEYXRhIH0gPSB1c2VBcHBDb250ZXh0KCk7XG5cbiAgICBjb25zdCBoZW50T2dTZXR0U2FtaGFuZGxlciA9IChiZWhhbmRsaW5nSWRFbGxlck9yZ25yOiBzdHJpbmcgfCBudW1iZXIpID0+IHtcbiAgICAgICAgc2V0dFNhbWhhbmRsZXJSZXNzdXJzKGJ5Z2dIZW50ZXJSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4oKSk7XG4gICAgICAgIGhlbnRTYW1oYW5kbGVyKFN0cmluZyhiZWhhbmRsaW5nSWRFbGxlck9yZ25yKSkudGhlbigocmVzc3VyczogUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KSA9PiB7XG4gICAgICAgICAgICBpZiAoc2thbE9iZnVza2VyZURhdGEpIHtcbiAgICAgICAgICAgICAgICBvYmZ1c2tlclNhbWhhbmRsZXIocmVzc3Vycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXR0U2FtaGFuZGxlclJlc3N1cnMocmVzc3Vycyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBoZW50U2FtaGFuZGxlciA9IGFzeW5jIChiZWhhbmRsaW5nSWRFbGxlck9yZ25yOiBzdHJpbmcpOiBQcm9taXNlPFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPj4gPT4ge1xuICAgICAgICBjb25zdCBjb25maWcgPSBlcklFbkJlaGFuZGxpbmdcbiAgICAgICAgICAgID8gaGVudFNhbWhhbmRsZXJkYXRhRm9yQmVoYW5kbGluZ0NvbmZpZyhiZWhhbmRsaW5nSWRFbGxlck9yZ25yKVxuICAgICAgICAgICAgOiBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyhiZWhhbmRsaW5nSWRFbGxlck9yZ25yKTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3Q8SVNhbWhhbmRsZXJJbmZvUmVxdWVzdCwgSVNhbWhhbmRsZXJJbmZvPihjb25maWcpXG4gICAgICAgICAgICAudGhlbigocmVzc3VyczogUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3N1cnM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChfZXJyb3I6IEF4aW9zRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnlnZ0ZlaWxldFJlc3N1cnMoJ1VramVudCBmZWlsIHZlZCBpbm5oZW50aW5nIGF2IHNhbWhhbmRsZXJpbmZvJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVudFNhbWhhbmRsZXIsXG4gICAgICAgIGhlbnRPZ1NldHRTYW1oYW5kbGVyLFxuICAgICAgICBzYW1oYW5kbGVyUmVzc3VycyxcbiAgICB9O1xufTtcblxuY29uc3QgaGVudFNhbWhhbmRsZXJkYXRhRm9yQmVoYW5kbGluZ0NvbmZpZyA9IChiZWhhbmRsaW5nSWQ6IHN0cmluZyk6IEZhbWlsaWVSZXF1ZXN0Q29uZmlnPElTYW1oYW5kbGVySW5mb1JlcXVlc3Q+ID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6ICcvZmFtaWxpZS1iYS1zYWsvYXBpL3NhbWhhbmRsZXIvYmVoYW5kbGluZy8nICsgYmVoYW5kbGluZ0lkLFxuICAgIH07XG59O1xuXG5jb25zdCBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyA9IChvcmdOcjogc3RyaW5nKTogRmFtaWxpZVJlcXVlc3RDb25maWc8SVNhbWhhbmRsZXJJbmZvUmVxdWVzdD4gPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogJy9mYW1pbGllLWJhLXNhay9hcGkvc2FtaGFuZGxlci9vcmduci8nICsgb3JnTnIsXG4gICAgfTtcbn07XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI3ZjQ0NzcyNjE1ODY2MzMwMGMyOFwiKSJdLCJuYW1lcyI6WyJlIiwidCIsInIiLCJTeW1ib2wiLCJuIiwiaXRlcmF0b3IiLCJvIiwidG9TdHJpbmdUYWciLCJpIiwiYyIsInByb3RvdHlwZSIsIkdlbmVyYXRvciIsInUiLCJPYmplY3QiLCJjcmVhdGUiLCJfcmVnZW5lcmF0b3JEZWZpbmUyIiwiZiIsInAiLCJ5IiwiRyIsInYiLCJhIiwiZCIsImJpbmQiLCJsZW5ndGgiLCJsIiwiVHlwZUVycm9yIiwiY2FsbCIsImRvbmUiLCJ2YWx1ZSIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiZGlzcGxheU5hbWUiLCJfcmVnZW5lcmF0b3IiLCJ3IiwibSIsImRlZmluZVByb3BlcnR5IiwiX3JlZ2VuZXJhdG9yRGVmaW5lIiwiX2ludm9rZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsIl9kZWZpbmVQcm9wZXJ0eSIsIl90b1Byb3BlcnR5S2V5IiwiX3RvUHJpbWl0aXZlIiwiX3R5cGVvZiIsInRvUHJpbWl0aXZlIiwiU3RyaW5nIiwiTnVtYmVyIiwidXNlU3RhdGUiLCJ1c2VGb3JtIiwidXNlSHR0cCIsInVzZUZlbHQiLCJ1c2VTa2plbWEiLCJieWdnRmVpbGV0UmVzc3VycyIsImJ5Z2dIZW50ZXJSZXNzdXJzIiwiYnlnZ1RvbVJlc3N1cnMiLCJSZXNzdXJzU3RhdHVzIiwidXNlQXBwQ29udGV4dCIsIm9iZnVza2VyU2FtaGFuZGxlciIsIm9yZ251bW1lclZhbGlkYXRvciIsIkZpZWxkcyIsInVzZVNhbWhhbmRsZXJTa2plbWEiLCJvblN1Y2Nlc3MiLCJvbkVycm9yIiwiX3MiLCJfdXNlU2tqZW1hIiwiZmVsdGVyIiwib3JnbnIiLCJ2ZXJkaSIsInZhbGlkZXJpbmdzZnVua3Nqb24iLCJza2plbWFuYXZuIiwib25TdWJtaXQiLCJzZXR0U3VibWl0UmVzc3VycyIsInNramVtYSIsImZvcm0iLCJ2YWx1ZXMiLCJPUkdfTlIiLCJvblN1Ym1pdE5ldyIsIl94IiwiX29uU3VibWl0TmV3IiwiX2NhbGxlZSIsIl9jb250ZXh0Iiwib25TdWJtaXRXcmFwcGVyIiwiaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWciLCJyZXNzdXJzIiwiZXJyb3IiLCJzdGF0dXMiLCJGVU5LU0pPTkVMTF9GRUlMIiwiZnJvbnRlbmRGZWlsbWVsZGluZyIsInNhbWhhbmRsZXJTa2plbWEiLCJ1c2VTYW1oYW5kbGVyUmVxdWVzdCIsImVySUVuQmVoYW5kbGluZyIsIl9zMiIsIl91c2VIdHRwIiwicmVxdWVzdCIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInNhbWhhbmRsZXJSZXNzdXJzIiwic2V0dFNhbWhhbmRsZXJSZXNzdXJzIiwiX3VzZUFwcENvbnRleHQiLCJza2FsT2JmdXNrZXJlRGF0YSIsImhlbnRPZ1NldHRTYW1oYW5kbGVyIiwiYmVoYW5kbGluZ0lkRWxsZXJPcmduciIsImhlbnRTYW1oYW5kbGVyIiwiX3JlZiIsIl9jYWxsZWUyIiwiY29uZmlnIiwiX2NvbnRleHQyIiwiaGVudFNhbWhhbmRsZXJkYXRhRm9yQmVoYW5kbGluZ0NvbmZpZyIsIl9lcnJvciIsIl94MiIsImJlaGFuZGxpbmdJZCIsIm1ldGhvZCIsInVybCIsIm9yZ05yIl0sInNvdXJjZVJvb3QiOiIifQ==