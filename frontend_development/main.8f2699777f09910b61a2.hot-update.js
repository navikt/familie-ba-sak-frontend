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
          valideringsfunksjon: _utils_validators__WEBPACK_IMPORTED_MODULE_10__.orgnummerValidator
        })
      },
      skjemanavn: 'hentSamhandler'
    }),
    onSubmit = _useSkjema.onSubmit,
    settSubmitRessurs = _useSkjema.settSubmitRessurs,
    skjema = _useSkjema.skjema;
  var _useHentSamhandlerdat = (0,_hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_8__.useHentSamhandlerdataForOrgNrConfig)(values[Fields.ORG_NR]),
    samhandlerdata = _useHentSamhandlerdat.data,
    samhandlerdataLaster = _useHentSamhandlerdat.isPending,
    samhandlerdataError = _useHentSamhandlerdat.error;
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
_s(useSamhandlerSkjema, "wMVdMrNvWjUiiD5AylyZNWwvL9Q=", false, function () {
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
/******/ 	__webpack_require__.h = () => ("9da827419fb1a4960666")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi44ZjI2OTk3NzdmMDk5MTBiNjFhMi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFDQSx1S0FBQUEsQ0FBQSxFQUFBQyxDQUFBLEVBQUFDLENBQUEsd0JBQUFDLE1BQUEsR0FBQUEsTUFBQSxPQUFBQyxDQUFBLEdBQUFGLENBQUEsQ0FBQUcsUUFBQSxrQkFBQUMsQ0FBQSxHQUFBSixDQUFBLENBQUFLLFdBQUEsOEJBQUFDLEVBQUFOLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUMsQ0FBQSxHQUFBTCxDQUFBLElBQUFBLENBQUEsQ0FBQU0sU0FBQSxZQUFBQyxTQUFBLEdBQUFQLENBQUEsR0FBQU8sU0FBQSxFQUFBQyxDQUFBLEdBQUFDLE1BQUEsQ0FBQUMsTUFBQSxDQUFBTCxDQUFBLENBQUFDLFNBQUEsVUFBQUssbUJBQUEsQ0FBQUgsQ0FBQSx1QkFBQVYsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUUsQ0FBQSxFQUFBQyxDQUFBLEVBQUFHLENBQUEsRUFBQUksQ0FBQSxNQUFBQyxDQUFBLEdBQUFYLENBQUEsUUFBQVksQ0FBQSxPQUFBQyxDQUFBLEtBQUFGLENBQUEsS0FBQWIsQ0FBQSxLQUFBZ0IsQ0FBQSxFQUFBcEIsQ0FBQSxFQUFBcUIsQ0FBQSxFQUFBQyxDQUFBLEVBQUFOLENBQUEsRUFBQU0sQ0FBQSxDQUFBQyxJQUFBLENBQUF2QixDQUFBLE1BQUFzQixDQUFBLFdBQUFBLEVBQUFyQixDQUFBLEVBQUFDLENBQUEsV0FBQU0sQ0FBQSxHQUFBUCxDQUFBLEVBQUFRLENBQUEsTUFBQUcsQ0FBQSxHQUFBWixDQUFBLEVBQUFtQixDQUFBLENBQUFmLENBQUEsR0FBQUYsQ0FBQSxFQUFBbUIsQ0FBQSxnQkFBQUMsRUFBQXBCLENBQUEsRUFBQUUsQ0FBQSxTQUFBSyxDQUFBLEdBQUFQLENBQUEsRUFBQVUsQ0FBQSxHQUFBUixDQUFBLEVBQUFILENBQUEsT0FBQWlCLENBQUEsSUFBQUYsQ0FBQSxLQUFBVixDQUFBLElBQUFMLENBQUEsR0FBQWdCLENBQUEsQ0FBQU8sTUFBQSxFQUFBdkIsQ0FBQSxVQUFBSyxDQUFBLEVBQUFFLENBQUEsR0FBQVMsQ0FBQSxDQUFBaEIsQ0FBQSxHQUFBcUIsQ0FBQSxHQUFBSCxDQUFBLENBQUFGLENBQUEsRUFBQVEsQ0FBQSxHQUFBakIsQ0FBQSxLQUFBTixDQUFBLFFBQUFJLENBQUEsR0FBQW1CLENBQUEsS0FBQXJCLENBQUEsTUFBQVEsQ0FBQSxHQUFBSixDQUFBLEVBQUFDLENBQUEsR0FBQUQsQ0FBQSxZQUFBQyxDQUFBLFdBQUFELENBQUEsTUFBQUEsQ0FBQSxNQUFBUixDQUFBLElBQUFRLENBQUEsT0FBQWMsQ0FBQSxNQUFBaEIsQ0FBQSxHQUFBSixDQUFBLFFBQUFvQixDQUFBLEdBQUFkLENBQUEsUUFBQUMsQ0FBQSxNQUFBVSxDQUFBLENBQUFDLENBQUEsR0FBQWhCLENBQUEsRUFBQWUsQ0FBQSxDQUFBZixDQUFBLEdBQUFJLENBQUEsT0FBQWMsQ0FBQSxHQUFBRyxDQUFBLEtBQUFuQixDQUFBLEdBQUFKLENBQUEsUUFBQU0sQ0FBQSxNQUFBSixDQUFBLElBQUFBLENBQUEsR0FBQXFCLENBQUEsTUFBQWpCLENBQUEsTUFBQU4sQ0FBQSxFQUFBTSxDQUFBLE1BQUFKLENBQUEsRUFBQWUsQ0FBQSxDQUFBZixDQUFBLEdBQUFxQixDQUFBLEVBQUFoQixDQUFBLGNBQUFILENBQUEsSUFBQUosQ0FBQSxhQUFBbUIsQ0FBQSxRQUFBSCxDQUFBLE9BQUFkLENBQUEscUJBQUFFLENBQUEsRUFBQVcsQ0FBQSxFQUFBUSxDQUFBLFFBQUFULENBQUEsWUFBQVUsU0FBQSx1Q0FBQVIsQ0FBQSxVQUFBRCxDQUFBLElBQUFLLENBQUEsQ0FBQUwsQ0FBQSxFQUFBUSxDQUFBLEdBQUFoQixDQUFBLEdBQUFRLENBQUEsRUFBQUwsQ0FBQSxHQUFBYSxDQUFBLEdBQUF4QixDQUFBLEdBQUFRLENBQUEsT0FBQVQsQ0FBQSxHQUFBWSxDQUFBLE1BQUFNLENBQUEsS0FBQVYsQ0FBQSxLQUFBQyxDQUFBLEdBQUFBLENBQUEsUUFBQUEsQ0FBQSxTQUFBVSxDQUFBLENBQUFmLENBQUEsUUFBQWtCLENBQUEsQ0FBQWIsQ0FBQSxFQUFBRyxDQUFBLEtBQUFPLENBQUEsQ0FBQWYsQ0FBQSxHQUFBUSxDQUFBLEdBQUFPLENBQUEsQ0FBQUMsQ0FBQSxHQUFBUixDQUFBLGFBQUFJLENBQUEsTUFBQVIsQ0FBQSxRQUFBQyxDQUFBLEtBQUFILENBQUEsWUFBQUwsQ0FBQSxHQUFBTyxDQUFBLENBQUFGLENBQUEsV0FBQUwsQ0FBQSxHQUFBQSxDQUFBLENBQUEwQixJQUFBLENBQUFuQixDQUFBLEVBQUFJLENBQUEsVUFBQWMsU0FBQSwyQ0FBQXpCLENBQUEsQ0FBQTJCLElBQUEsU0FBQTNCLENBQUEsRUFBQVcsQ0FBQSxHQUFBWCxDQUFBLENBQUE0QixLQUFBLEVBQUFwQixDQUFBLFNBQUFBLENBQUEsb0JBQUFBLENBQUEsS0FBQVIsQ0FBQSxHQUFBTyxDQUFBLGVBQUFQLENBQUEsQ0FBQTBCLElBQUEsQ0FBQW5CLENBQUEsR0FBQUMsQ0FBQSxTQUFBRyxDQUFBLEdBQUFjLFNBQUEsdUNBQUFwQixDQUFBLGdCQUFBRyxDQUFBLE9BQUFELENBQUEsR0FBQVIsQ0FBQSxjQUFBQyxDQUFBLElBQUFpQixDQUFBLEdBQUFDLENBQUEsQ0FBQWYsQ0FBQSxRQUFBUSxDQUFBLEdBQUFWLENBQUEsQ0FBQXlCLElBQUEsQ0FBQXZCLENBQUEsRUFBQWUsQ0FBQSxPQUFBRSxDQUFBLGtCQUFBcEIsQ0FBQSxJQUFBTyxDQUFBLEdBQUFSLENBQUEsRUFBQVMsQ0FBQSxNQUFBRyxDQUFBLEdBQUFYLENBQUEsY0FBQWUsQ0FBQSxtQkFBQWEsS0FBQSxFQUFBNUIsQ0FBQSxFQUFBMkIsSUFBQSxFQUFBVixDQUFBLFNBQUFoQixDQUFBLEVBQUFJLENBQUEsRUFBQUUsQ0FBQSxRQUFBSSxDQUFBLFFBQUFTLENBQUEsZ0JBQUFWLFVBQUEsY0FBQW1CLGtCQUFBLGNBQUFDLDJCQUFBLEtBQUE5QixDQUFBLEdBQUFZLE1BQUEsQ0FBQW1CLGNBQUEsTUFBQXZCLENBQUEsTUFBQUwsQ0FBQSxJQUFBSCxDQUFBLENBQUFBLENBQUEsSUFBQUcsQ0FBQSxTQUFBVyxtQkFBQSxDQUFBZCxDQUFBLE9BQUFHLENBQUEsaUNBQUFILENBQUEsR0FBQVcsQ0FBQSxHQUFBbUIsMEJBQUEsQ0FBQXJCLFNBQUEsR0FBQUMsU0FBQSxDQUFBRCxTQUFBLEdBQUFHLE1BQUEsQ0FBQUMsTUFBQSxDQUFBTCxDQUFBLFlBQUFPLEVBQUFoQixDQUFBLFdBQUFhLE1BQUEsQ0FBQW9CLGNBQUEsR0FBQXBCLE1BQUEsQ0FBQW9CLGNBQUEsQ0FBQWpDLENBQUEsRUFBQStCLDBCQUFBLEtBQUEvQixDQUFBLENBQUFrQyxTQUFBLEdBQUFILDBCQUFBLEVBQUFoQixtQkFBQSxDQUFBZixDQUFBLEVBQUFNLENBQUEseUJBQUFOLENBQUEsQ0FBQVUsU0FBQSxHQUFBRyxNQUFBLENBQUFDLE1BQUEsQ0FBQUYsQ0FBQSxHQUFBWixDQUFBLFdBQUE4QixpQkFBQSxDQUFBcEIsU0FBQSxHQUFBcUIsMEJBQUEsRUFBQWhCLG1CQUFBLENBQUFILENBQUEsaUJBQUFtQiwwQkFBQSxHQUFBaEIsbUJBQUEsQ0FBQWdCLDBCQUFBLGlCQUFBRCxpQkFBQSxHQUFBQSxpQkFBQSxDQUFBSyxXQUFBLHdCQUFBcEIsbUJBQUEsQ0FBQWdCLDBCQUFBLEVBQUF6QixDQUFBLHdCQUFBUyxtQkFBQSxDQUFBSCxDQUFBLEdBQUFHLG1CQUFBLENBQUFILENBQUEsRUFBQU4sQ0FBQSxnQkFBQVMsbUJBQUEsQ0FBQUgsQ0FBQSxFQUFBUixDQUFBLGlDQUFBVyxtQkFBQSxDQUFBSCxDQUFBLDhEQUFBd0IsWUFBQSxZQUFBQSxhQUFBLGFBQUFDLENBQUEsRUFBQTdCLENBQUEsRUFBQThCLENBQUEsRUFBQXRCLENBQUE7QUFBQSxTQUFBRCxvQkFBQWYsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUgsQ0FBQSxRQUFBTyxDQUFBLEdBQUFLLE1BQUEsQ0FBQTBCLGNBQUEsUUFBQS9CLENBQUEsdUJBQUFSLENBQUEsSUFBQVEsQ0FBQSxRQUFBTyxtQkFBQSxZQUFBeUIsbUJBQUF4QyxDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxFQUFBSCxDQUFBLGFBQUFLLEVBQUFKLENBQUEsRUFBQUUsQ0FBQSxJQUFBVyxtQkFBQSxDQUFBZixDQUFBLEVBQUFFLENBQUEsWUFBQUYsQ0FBQSxnQkFBQXlDLE9BQUEsQ0FBQXZDLENBQUEsRUFBQUUsQ0FBQSxFQUFBSixDQUFBLFNBQUFFLENBQUEsR0FBQU0sQ0FBQSxHQUFBQSxDQUFBLENBQUFSLENBQUEsRUFBQUUsQ0FBQSxJQUFBMkIsS0FBQSxFQUFBekIsQ0FBQSxFQUFBc0MsVUFBQSxHQUFBekMsQ0FBQSxFQUFBMEMsWUFBQSxHQUFBMUMsQ0FBQSxFQUFBMkMsUUFBQSxHQUFBM0MsQ0FBQSxNQUFBRCxDQUFBLENBQUFFLENBQUEsSUFBQUUsQ0FBQSxJQUFBRSxDQUFBLGFBQUFBLENBQUEsY0FBQUEsQ0FBQSxtQkFBQVMsbUJBQUEsQ0FBQWYsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUgsQ0FBQTtBQUFBLFNBQUE0QyxtQkFBQXpDLENBQUEsRUFBQUgsQ0FBQSxFQUFBRCxDQUFBLEVBQUFFLENBQUEsRUFBQUksQ0FBQSxFQUFBZSxDQUFBLEVBQUFaLENBQUEsY0FBQUQsQ0FBQSxHQUFBSixDQUFBLENBQUFpQixDQUFBLEVBQUFaLENBQUEsR0FBQUcsQ0FBQSxHQUFBSixDQUFBLENBQUFxQixLQUFBLFdBQUF6QixDQUFBLGdCQUFBSixDQUFBLENBQUFJLENBQUEsS0FBQUksQ0FBQSxDQUFBb0IsSUFBQSxHQUFBM0IsQ0FBQSxDQUFBVyxDQUFBLElBQUFrQyxPQUFBLENBQUFDLE9BQUEsQ0FBQW5DLENBQUEsRUFBQW9DLElBQUEsQ0FBQTlDLENBQUEsRUFBQUksQ0FBQTtBQUFBLFNBQUEyQyxrQkFBQTdDLENBQUEsNkJBQUFILENBQUEsU0FBQUQsQ0FBQSxHQUFBa0QsU0FBQSxhQUFBSixPQUFBLFdBQUE1QyxDQUFBLEVBQUFJLENBQUEsUUFBQWUsQ0FBQSxHQUFBakIsQ0FBQSxDQUFBK0MsS0FBQSxDQUFBbEQsQ0FBQSxFQUFBRCxDQUFBLFlBQUFvRCxNQUFBaEQsQ0FBQSxJQUFBeUMsa0JBQUEsQ0FBQXhCLENBQUEsRUFBQW5CLENBQUEsRUFBQUksQ0FBQSxFQUFBOEMsS0FBQSxFQUFBQyxNQUFBLFVBQUFqRCxDQUFBLGNBQUFpRCxPQUFBakQsQ0FBQSxJQUFBeUMsa0JBQUEsQ0FBQXhCLENBQUEsRUFBQW5CLENBQUEsRUFBQUksQ0FBQSxFQUFBOEMsS0FBQSxFQUFBQyxNQUFBLFdBQUFqRCxDQUFBLEtBQUFnRCxLQUFBO0FBQUEsU0FBQUUsZ0JBQUF0RCxDQUFBLEVBQUFFLENBQUEsRUFBQUQsQ0FBQSxZQUFBQyxDQUFBLEdBQUFxRCxjQUFBLENBQUFyRCxDQUFBLE1BQUFGLENBQUEsR0FBQWEsTUFBQSxDQUFBMEIsY0FBQSxDQUFBdkMsQ0FBQSxFQUFBRSxDQUFBLElBQUEyQixLQUFBLEVBQUE1QixDQUFBLEVBQUF5QyxVQUFBLE1BQUFDLFlBQUEsTUFBQUMsUUFBQSxVQUFBNUMsQ0FBQSxDQUFBRSxDQUFBLElBQUFELENBQUEsRUFBQUQsQ0FBQTtBQUFBLFNBQUF1RCxlQUFBdEQsQ0FBQSxRQUFBTyxDQUFBLEdBQUFnRCxZQUFBLENBQUF2RCxDQUFBLGdDQUFBd0QsT0FBQSxDQUFBakQsQ0FBQSxJQUFBQSxDQUFBLEdBQUFBLENBQUE7QUFBQSxTQUFBZ0QsYUFBQXZELENBQUEsRUFBQUMsQ0FBQSxvQkFBQXVELE9BQUEsQ0FBQXhELENBQUEsTUFBQUEsQ0FBQSxTQUFBQSxDQUFBLE1BQUFELENBQUEsR0FBQUMsQ0FBQSxDQUFBRSxNQUFBLENBQUF1RCxXQUFBLGtCQUFBMUQsQ0FBQSxRQUFBUSxDQUFBLEdBQUFSLENBQUEsQ0FBQTJCLElBQUEsQ0FBQTFCLENBQUEsRUFBQUMsQ0FBQSxnQ0FBQXVELE9BQUEsQ0FBQWpELENBQUEsVUFBQUEsQ0FBQSxZQUFBa0IsU0FBQSx5RUFBQXhCLENBQUEsR0FBQXlELE1BQUEsR0FBQUMsTUFBQSxFQUFBM0QsQ0FBQTtBQURpQztBQUdTO0FBR0s7QUFDYTtBQUVpQztBQUMxQjtBQUVWO0FBQ3lDO0FBRXBDO0FBQ0Y7QUFFckQsSUFBS3lFLE1BQU0sMEJBQU5BLE1BQU07RUFBTkEsTUFBTTtFQUFBLE9BQU5BLE1BQU07QUFBQTtBQVFYLElBQU1DLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBbUJBLENBQUlDLFNBQXNCLEVBQUVDLE9BQWlDLEVBQUs7RUFBQUMsRUFBQTtFQUM5RixJQUFBQyxVQUFBLEdBQWdEZCxpRUFBUyxDQUEwQztNQUMvRmUsTUFBTSxFQUFFO1FBQ0pDLEtBQUssRUFBRWpCLCtEQUFPLENBQUM7VUFDWGtCLEtBQUssRUFBRSxFQUFFO1VBQ1RDLG1CQUFtQixFQUFFVixrRUFBa0JBO1FBQzNDLENBQUM7TUFDTCxDQUFDO01BQ0RXLFVBQVUsRUFBRTtJQUNoQixDQUFDLENBQUM7SUFSTUMsUUFBUSxHQUFBTixVQUFBLENBQVJNLFFBQVE7SUFBRUMsaUJBQWlCLEdBQUFQLFVBQUEsQ0FBakJPLGlCQUFpQjtJQUFFQyxNQUFNLEdBQUFSLFVBQUEsQ0FBTlEsTUFBTTtFQVMzQyxJQUFBQyxxQkFBQSxHQUlJakIsMkdBQW1DLENBQUNrQixNQUFNLENBQUNmLE1BQU0sQ0FBQ2dCLE1BQU0sQ0FBQyxDQUFDO0lBSHBEQyxjQUFjLEdBQUFILHFCQUFBLENBQXBCSSxJQUFJO0lBQ09DLG9CQUFvQixHQUFBTCxxQkFBQSxDQUEvQk0sU0FBUztJQUNGQyxtQkFBbUIsR0FBQVAscUJBQUEsQ0FBMUJRLEtBQUs7RUFHVCxJQUFNQyxJQUFJLEdBQUduQyx3REFBTyxDQUFhO0lBQzdCMkIsTUFBTSxFQUFBbkMsZUFBQSxLQUNEb0IsTUFBTSxDQUFDZ0IsTUFBTSxFQUFHLEVBQUU7RUFFM0IsQ0FBQyxDQUFDO0VBQUMsU0FFWVEsV0FBV0EsQ0FBQUMsRUFBQTtJQUFBLE9BQUFDLFlBQUEsQ0FBQWpELEtBQUEsT0FBQUQsU0FBQTtFQUFBO0VBQUEsU0FBQWtELGFBQUE7SUFBQUEsWUFBQSxHQUFBbkQsaUJBQUEsY0FBQWIsWUFBQSxHQUFBRSxDQUFBLENBQTFCLFNBQUErRCxRQUEyQlosTUFBa0I7TUFBQSxPQUFBckQsWUFBQSxHQUFBQyxDQUFBLFdBQUFpRSxRQUFBO1FBQUEsa0JBQUFBLFFBQUEsQ0FBQWxHLENBQUE7VUFBQTtZQUFBLE9BQUFrRyxRQUFBLENBQUFqRixDQUFBO1FBQUE7TUFBQSxHQUFBZ0YsT0FBQTtJQUFBLENBQzVDO0lBQUEsT0FBQUQsWUFBQSxDQUFBakQsS0FBQSxPQUFBRCxTQUFBO0VBQUE7RUFFRCxJQUFNcUQsZUFBZSxHQUFHLFNBQWxCQSxlQUFlQSxDQUFBLEVBQVM7SUFDMUJsQixRQUFRLENBQ0ptQixnQ0FBZ0MsQ0FBQ2pCLE1BQU0sQ0FBQ1AsTUFBTSxDQUFDQyxLQUFLLENBQUNDLEtBQUssQ0FBQyxFQUMzRCxVQUFDdUIsT0FBaUMsRUFBSztNQUNuQ25CLGlCQUFpQixDQUFDbUIsT0FBTyxDQUFDO01BQzFCLElBQUk3QixTQUFTLEVBQUU7UUFDWEEsU0FBUyxDQUFDLENBQUM7TUFDZjtJQUNKLENBQUMsRUFDRCxVQUFDb0IsS0FBK0IsRUFBSztNQUNqQyxJQUFJbkIsT0FBTyxJQUFJbUIsS0FBSyxDQUFDVSxNQUFNLEtBQUtyQyw2RUFBYSxDQUFDc0MsZ0JBQWdCLEVBQUU7UUFDNUQ5QixPQUFPLENBQUNtQixLQUFLLENBQUNZLG1CQUFtQixDQUFDO01BQ3RDO0lBQ0osQ0FDSixDQUFDO0VBQ0wsQ0FBQztFQUVELE9BQU87SUFDSFgsSUFBSSxFQUFKQSxJQUFJO0lBQ0paLFFBQVEsRUFBRWEsV0FBVztJQUNyQkssZUFBZSxFQUFmQSxlQUFlO0lBQ2ZNLGdCQUFnQixFQUFFdEI7RUFDdEIsQ0FBQztBQUNMLENBQUM7QUFBQ1QsRUFBQSxDQWhEV0gsbUJBQW1CO0VBQUEsUUFDb0JWLDZEQUFTLEVBRTFDRCwyREFBTyxFQVdsQk8sdUdBQW1DLEVBRTFCVCxvREFBTztBQUFBO0FBa0NqQixJQUFNZ0Qsb0JBQW9CLEdBQUcsU0FBdkJBLG9CQUFvQkEsQ0FBSUMsZUFBd0IsRUFBSztFQUFBQyxHQUFBO0VBQzlELElBQUFDLFFBQUEsR0FBb0JsRCw2REFBTyxDQUFDLENBQUM7SUFBckJtRCxPQUFPLEdBQUFELFFBQUEsQ0FBUEMsT0FBTztFQUNmLElBQUFDLFNBQUEsR0FBbUR0RCwrQ0FBUSxDQUEyQk8scUVBQWMsQ0FBQyxDQUFDLENBQUM7SUFBQWdELFVBQUEsR0FBQUMsY0FBQSxDQUFBRixTQUFBO0lBQWhHRyxpQkFBaUIsR0FBQUYsVUFBQTtJQUFFRyxxQkFBcUIsR0FBQUgsVUFBQTtFQUUvQyxJQUFBSSxjQUFBLEdBQThCbEQsa0VBQWEsQ0FBQyxDQUFDO0lBQXJDbUQsaUJBQWlCLEdBQUFELGNBQUEsQ0FBakJDLGlCQUFpQjtFQUV6QixJQUFNQyxvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQW9CQSxDQUFJQyxzQkFBdUMsRUFBSztJQUN0RUoscUJBQXFCLENBQUNwRCx3RUFBaUIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzNEeUQsY0FBYyxDQUFDakUsTUFBTSxDQUFDZ0Usc0JBQXNCLENBQUMsQ0FBQyxDQUFDM0UsSUFBSSxDQUFDLFVBQUN5RCxPQUFpQyxFQUFLO01BQ3ZGLElBQUlnQixpQkFBaUIsRUFBRTtRQUNuQmpELHVFQUFrQixDQUFDaUMsT0FBTyxDQUFDO01BQy9CO01BQ0FjLHFCQUFxQixDQUFDZCxPQUFPLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUVELElBQU1tQixjQUFjO0lBQUEsSUFBQUMsSUFBQSxHQUFBNUUsaUJBQUEsY0FBQWIsWUFBQSxHQUFBRSxDQUFBLENBQUcsU0FBQXdGLFNBQU9ILHNCQUE4QjtNQUFBLElBQUFJLE1BQUE7TUFBQSxPQUFBM0YsWUFBQSxHQUFBQyxDQUFBLFdBQUEyRixTQUFBO1FBQUEsa0JBQUFBLFNBQUEsQ0FBQTVILENBQUE7VUFBQTtZQUNsRDJILE1BQU0sR0FBR2hCLGVBQWUsR0FDeEJrQixxQ0FBcUMsQ0FBQ04sc0JBQXNCLENBQUMsR0FDN0RuQixnQ0FBZ0MsQ0FBQ21CLHNCQUFzQixDQUFDO1lBQUEsT0FBQUssU0FBQSxDQUFBM0csQ0FBQSxJQUN2RDZGLE9BQU8sQ0FBMENhLE1BQU0sQ0FBQyxDQUMxRC9FLElBQUksQ0FBQyxVQUFDeUQsT0FBaUMsRUFBSztjQUN6QyxPQUFPQSxPQUFPO1lBQ2xCLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBQ3lCLE1BQWtCLEVBQUs7Y0FDM0IsT0FBT2hFLHdFQUFpQixDQUFDLDhDQUE4QyxDQUFDO1lBQzVFLENBQUMsQ0FBQztRQUFBO01BQUEsR0FBQTRELFFBQUE7SUFBQSxDQUNUO0lBQUEsZ0JBWEtGLGNBQWNBLENBQUFPLEdBQUE7TUFBQSxPQUFBTixJQUFBLENBQUExRSxLQUFBLE9BQUFELFNBQUE7SUFBQTtFQUFBLEdBV25CO0VBRUQsT0FBTztJQUNIMEUsY0FBYyxFQUFkQSxjQUFjO0lBQ2RGLG9CQUFvQixFQUFwQkEsb0JBQW9CO0lBQ3BCSixpQkFBaUIsRUFBakJBO0VBQ0osQ0FBQztBQUNMLENBQUM7QUFBQ04sR0FBQSxDQWxDV0Ysb0JBQW9CO0VBQUEsUUFDVC9DLHlEQUFPLEVBR0dPLDhEQUFhO0FBQUE7QUFnQy9DLElBQU0yRCxxQ0FBcUMsR0FBRyxTQUF4Q0EscUNBQXFDQSxDQUFJRyxZQUFvQixFQUFtRDtFQUNsSCxPQUFPO0lBQ0hDLE1BQU0sRUFBRSxLQUFLO0lBQ2JDLEdBQUcsRUFBRSw0Q0FBNEMsR0FBR0Y7RUFDeEQsQ0FBQztBQUNMLENBQUM7QUFFRCxJQUFNNUIsZ0NBQWdDLEdBQUcsU0FBbkNBLGdDQUFnQ0EsQ0FBSStCLEtBQWEsRUFBbUQ7RUFDdEcsT0FBTztJQUNIRixNQUFNLEVBQUUsS0FBSztJQUNiQyxHQUFHLEVBQUUsdUNBQXVDLEdBQUdDO0VBQ25ELENBQUM7QUFDTCxDQUFDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzVIRCxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL2tvbXBvbmVudGVyL1NhbWhhbmRsZXIvdXNlU2FtaGFuZGxlci50cyIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgQXhpb3NFcnJvciB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IHVzZUZvcm0gfSBmcm9tICdyZWFjdC1ob29rLWZvcm0nO1xuXG5pbXBvcnQgdHlwZSB7IEZhbWlsaWVSZXF1ZXN0Q29uZmlnIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLWh0dHAnO1xuaW1wb3J0IHsgdXNlSHR0cCB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS1odHRwJztcbmltcG9ydCB7IHVzZUZlbHQsIHVzZVNramVtYSB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS1za2plbWEnO1xuaW1wb3J0IHR5cGUgeyBSZXNzdXJzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcbmltcG9ydCB7IGJ5Z2dGZWlsZXRSZXNzdXJzLCBieWdnSGVudGVyUmVzc3VycywgYnlnZ1RvbVJlc3N1cnMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuaW1wb3J0IHsgUmVzc3Vyc1N0YXR1cyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlci9kaXN0L3Jlc3N1cnMnO1xuXG5pbXBvcnQgeyB1c2VBcHBDb250ZXh0IH0gZnJvbSAnLi4vLi4vY29udGV4dC9BcHBDb250ZXh0JztcbmltcG9ydCB7IHVzZUhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIH0gZnJvbSAnLi4vLi4vaG9va3MvdXNlU2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyc7XG5pbXBvcnQgdHlwZSB7IElTYW1oYW5kbGVySW5mbywgSVNhbWhhbmRsZXJJbmZvUmVxdWVzdCB9IGZyb20gJy4uLy4uL3R5cGVyL3NhbWhhbmRsZXInO1xuaW1wb3J0IHsgb2JmdXNrZXJTYW1oYW5kbGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvb2JmdXNrZXJEYXRhJztcbmltcG9ydCB7IG9yZ251bW1lclZhbGlkYXRvciB9IGZyb20gJy4uLy4uL3V0aWxzL3ZhbGlkYXRvcnMnO1xuXG5leHBvcnQgZW51bSBGaWVsZHMge1xuICAgIE9SR19OUiA9ICdvcmducicsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybVZhbHVlcyB7XG4gICAgW0ZpZWxkcy5PUkdfTlJdOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCB1c2VTYW1oYW5kbGVyU2tqZW1hID0gKG9uU3VjY2Vzcz86ICgpID0+IHZvaWQsIG9uRXJyb3I/OiAoZXJyb3I6IHN0cmluZykgPT4gdm9pZCkgPT4ge1xuICAgIGNvbnN0IHsgb25TdWJtaXQsIHNldHRTdWJtaXRSZXNzdXJzLCBza2plbWEgfSA9IHVzZVNramVtYTxJU2FtaGFuZGxlckluZm9SZXF1ZXN0LCBJU2FtaGFuZGxlckluZm8+KHtcbiAgICAgICAgZmVsdGVyOiB7XG4gICAgICAgICAgICBvcmducjogdXNlRmVsdCh7XG4gICAgICAgICAgICAgICAgdmVyZGk6ICcnLFxuICAgICAgICAgICAgICAgIHZhbGlkZXJpbmdzZnVua3Nqb246IG9yZ251bW1lclZhbGlkYXRvcixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgICBza2plbWFuYXZuOiAnaGVudFNhbWhhbmRsZXInLFxuICAgIH0pO1xuICAgIGNvbnN0IHtcbiAgICAgICAgZGF0YTogc2FtaGFuZGxlcmRhdGEsXG4gICAgICAgIGlzUGVuZGluZzogc2FtaGFuZGxlcmRhdGFMYXN0ZXIsXG4gICAgICAgIGVycm9yOiBzYW1oYW5kbGVyZGF0YUVycm9yLFxuICAgIH0gPSB1c2VIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyh2YWx1ZXNbRmllbGRzLk9SR19OUl0pO1xuXG4gICAgY29uc3QgZm9ybSA9IHVzZUZvcm08Rm9ybVZhbHVlcz4oe1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIFtGaWVsZHMuT1JHX05SXTogJycsXG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBhc3luYyBmdW5jdGlvbiBvblN1Ym1pdE5ldyh2YWx1ZXM6IEZvcm1WYWx1ZXMpIHtcbiAgICB9XG5cbiAgICBjb25zdCBvblN1Ym1pdFdyYXBwZXIgPSAoKSA9PiB7XG4gICAgICAgIG9uU3VibWl0KFxuICAgICAgICAgICAgaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcoc2tqZW1hLmZlbHRlci5vcmduci52ZXJkaSksXG4gICAgICAgICAgICAocmVzc3VyczogUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0dFN1Ym1pdFJlc3N1cnMocmVzc3Vycyk7XG4gICAgICAgICAgICAgICAgaWYgKG9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob25FcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuRlVOS1NKT05FTExfRkVJTCkge1xuICAgICAgICAgICAgICAgICAgICBvbkVycm9yKGVycm9yLmZyb250ZW5kRmVpbG1lbGRpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZm9ybSxcbiAgICAgICAgb25TdWJtaXQ6IG9uU3VibWl0TmV3LFxuICAgICAgICBvblN1Ym1pdFdyYXBwZXIsXG4gICAgICAgIHNhbWhhbmRsZXJTa2plbWE6IHNramVtYSxcbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZVNhbWhhbmRsZXJSZXF1ZXN0ID0gKGVySUVuQmVoYW5kbGluZzogYm9vbGVhbikgPT4ge1xuICAgIGNvbnN0IHsgcmVxdWVzdCB9ID0gdXNlSHR0cCgpO1xuICAgIGNvbnN0IFtzYW1oYW5kbGVyUmVzc3Vycywgc2V0dFNhbWhhbmRsZXJSZXNzdXJzXSA9IHVzZVN0YXRlPFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPj4oYnlnZ1RvbVJlc3N1cnMoKSk7XG5cbiAgICBjb25zdCB7IHNrYWxPYmZ1c2tlcmVEYXRhIH0gPSB1c2VBcHBDb250ZXh0KCk7XG5cbiAgICBjb25zdCBoZW50T2dTZXR0U2FtaGFuZGxlciA9IChiZWhhbmRsaW5nSWRFbGxlck9yZ25yOiBzdHJpbmcgfCBudW1iZXIpID0+IHtcbiAgICAgICAgc2V0dFNhbWhhbmRsZXJSZXNzdXJzKGJ5Z2dIZW50ZXJSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4oKSk7XG4gICAgICAgIGhlbnRTYW1oYW5kbGVyKFN0cmluZyhiZWhhbmRsaW5nSWRFbGxlck9yZ25yKSkudGhlbigocmVzc3VyczogUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KSA9PiB7XG4gICAgICAgICAgICBpZiAoc2thbE9iZnVza2VyZURhdGEpIHtcbiAgICAgICAgICAgICAgICBvYmZ1c2tlclNhbWhhbmRsZXIocmVzc3Vycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXR0U2FtaGFuZGxlclJlc3N1cnMocmVzc3Vycyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBoZW50U2FtaGFuZGxlciA9IGFzeW5jIChiZWhhbmRsaW5nSWRFbGxlck9yZ25yOiBzdHJpbmcpOiBQcm9taXNlPFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPj4gPT4ge1xuICAgICAgICBjb25zdCBjb25maWcgPSBlcklFbkJlaGFuZGxpbmdcbiAgICAgICAgICAgID8gaGVudFNhbWhhbmRsZXJkYXRhRm9yQmVoYW5kbGluZ0NvbmZpZyhiZWhhbmRsaW5nSWRFbGxlck9yZ25yKVxuICAgICAgICAgICAgOiBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyhiZWhhbmRsaW5nSWRFbGxlck9yZ25yKTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3Q8SVNhbWhhbmRsZXJJbmZvUmVxdWVzdCwgSVNhbWhhbmRsZXJJbmZvPihjb25maWcpXG4gICAgICAgICAgICAudGhlbigocmVzc3VyczogUmVzc3VyczxJU2FtaGFuZGxlckluZm8+KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3N1cnM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChfZXJyb3I6IEF4aW9zRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnlnZ0ZlaWxldFJlc3N1cnMoJ1VramVudCBmZWlsIHZlZCBpbm5oZW50aW5nIGF2IHNhbWhhbmRsZXJpbmZvJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVudFNhbWhhbmRsZXIsXG4gICAgICAgIGhlbnRPZ1NldHRTYW1oYW5kbGVyLFxuICAgICAgICBzYW1oYW5kbGVyUmVzc3VycyxcbiAgICB9O1xufTtcblxuY29uc3QgaGVudFNhbWhhbmRsZXJkYXRhRm9yQmVoYW5kbGluZ0NvbmZpZyA9IChiZWhhbmRsaW5nSWQ6IHN0cmluZyk6IEZhbWlsaWVSZXF1ZXN0Q29uZmlnPElTYW1oYW5kbGVySW5mb1JlcXVlc3Q+ID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6ICcvZmFtaWxpZS1iYS1zYWsvYXBpL3NhbWhhbmRsZXIvYmVoYW5kbGluZy8nICsgYmVoYW5kbGluZ0lkLFxuICAgIH07XG59O1xuXG5jb25zdCBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyA9IChvcmdOcjogc3RyaW5nKTogRmFtaWxpZVJlcXVlc3RDb25maWc8SVNhbWhhbmRsZXJJbmZvUmVxdWVzdD4gPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogJy9mYW1pbGllLWJhLXNhay9hcGkvc2FtaGFuZGxlci9vcmduci8nICsgb3JnTnIsXG4gICAgfTtcbn07XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI5ZGE4Mjc0MTlmYjFhNDk2MDY2NlwiKSJdLCJuYW1lcyI6WyJlIiwidCIsInIiLCJTeW1ib2wiLCJuIiwiaXRlcmF0b3IiLCJvIiwidG9TdHJpbmdUYWciLCJpIiwiYyIsInByb3RvdHlwZSIsIkdlbmVyYXRvciIsInUiLCJPYmplY3QiLCJjcmVhdGUiLCJfcmVnZW5lcmF0b3JEZWZpbmUyIiwiZiIsInAiLCJ5IiwiRyIsInYiLCJhIiwiZCIsImJpbmQiLCJsZW5ndGgiLCJsIiwiVHlwZUVycm9yIiwiY2FsbCIsImRvbmUiLCJ2YWx1ZSIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiZGlzcGxheU5hbWUiLCJfcmVnZW5lcmF0b3IiLCJ3IiwibSIsImRlZmluZVByb3BlcnR5IiwiX3JlZ2VuZXJhdG9yRGVmaW5lIiwiX2ludm9rZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsIl9kZWZpbmVQcm9wZXJ0eSIsIl90b1Byb3BlcnR5S2V5IiwiX3RvUHJpbWl0aXZlIiwiX3R5cGVvZiIsInRvUHJpbWl0aXZlIiwiU3RyaW5nIiwiTnVtYmVyIiwidXNlU3RhdGUiLCJ1c2VGb3JtIiwidXNlSHR0cCIsInVzZUZlbHQiLCJ1c2VTa2plbWEiLCJieWdnRmVpbGV0UmVzc3VycyIsImJ5Z2dIZW50ZXJSZXNzdXJzIiwiYnlnZ1RvbVJlc3N1cnMiLCJSZXNzdXJzU3RhdHVzIiwidXNlQXBwQ29udGV4dCIsInVzZUhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIiwib2JmdXNrZXJTYW1oYW5kbGVyIiwib3JnbnVtbWVyVmFsaWRhdG9yIiwiRmllbGRzIiwidXNlU2FtaGFuZGxlclNramVtYSIsIm9uU3VjY2VzcyIsIm9uRXJyb3IiLCJfcyIsIl91c2VTa2plbWEiLCJmZWx0ZXIiLCJvcmduciIsInZlcmRpIiwidmFsaWRlcmluZ3NmdW5rc2pvbiIsInNramVtYW5hdm4iLCJvblN1Ym1pdCIsInNldHRTdWJtaXRSZXNzdXJzIiwic2tqZW1hIiwiX3VzZUhlbnRTYW1oYW5kbGVyZGF0IiwidmFsdWVzIiwiT1JHX05SIiwic2FtaGFuZGxlcmRhdGEiLCJkYXRhIiwic2FtaGFuZGxlcmRhdGFMYXN0ZXIiLCJpc1BlbmRpbmciLCJzYW1oYW5kbGVyZGF0YUVycm9yIiwiZXJyb3IiLCJmb3JtIiwib25TdWJtaXROZXciLCJfeCIsIl9vblN1Ym1pdE5ldyIsIl9jYWxsZWUiLCJfY29udGV4dCIsIm9uU3VibWl0V3JhcHBlciIsImhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIiwicmVzc3VycyIsInN0YXR1cyIsIkZVTktTSk9ORUxMX0ZFSUwiLCJmcm9udGVuZEZlaWxtZWxkaW5nIiwic2FtaGFuZGxlclNramVtYSIsInVzZVNhbWhhbmRsZXJSZXF1ZXN0IiwiZXJJRW5CZWhhbmRsaW5nIiwiX3MyIiwiX3VzZUh0dHAiLCJyZXF1ZXN0IiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5Iiwic2FtaGFuZGxlclJlc3N1cnMiLCJzZXR0U2FtaGFuZGxlclJlc3N1cnMiLCJfdXNlQXBwQ29udGV4dCIsInNrYWxPYmZ1c2tlcmVEYXRhIiwiaGVudE9nU2V0dFNhbWhhbmRsZXIiLCJiZWhhbmRsaW5nSWRFbGxlck9yZ25yIiwiaGVudFNhbWhhbmRsZXIiLCJfcmVmIiwiX2NhbGxlZTIiLCJjb25maWciLCJfY29udGV4dDIiLCJoZW50U2FtaGFuZGxlcmRhdGFGb3JCZWhhbmRsaW5nQ29uZmlnIiwiX2Vycm9yIiwiX3gyIiwiYmVoYW5kbGluZ0lkIiwibWV0aG9kIiwidXJsIiwib3JnTnIiXSwic291cmNlUm9vdCI6IiJ9