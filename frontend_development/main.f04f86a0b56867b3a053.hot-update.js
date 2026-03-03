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
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../context/AppContext */ "./src/frontend/context/AppContext.tsx");
/* harmony import */ var _hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../hooks/useSamhandlerdataForOrgNrConfig */ "./src/frontend/hooks/useSamhandlerdataForOrgNrConfig.ts");
/* harmony import */ var _utils_obfuskerData__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/obfuskerData */ "./src/frontend/utils/obfuskerData.ts");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/validators */ "./src/frontend/utils/validators.ts");
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
  function onSubmitNew(values) {
    console.log('test: ' + values.orgnr);
    queryClient.refetchQueries({
      queryKey: _hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_9__.HentSamhandlerdataForOrgNrConfigQueryKeyFactory.org(values.orgnr)
    }).then(function (results) {
      return console.log({
        results: results
      });
    });
  }
  var onSubmitWrapper = function onSubmitWrapper() {
    onSubmit(hentSamhandlerdataForOrgNrConfig(skjema.felter.orgnr.verdi), function (ressurs) {
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
_s(useSamhandlerSkjema, "+eQNN1bPMWp+pDDgD8S69ZoWulM=", false, function () {
  return [_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient, _navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_5__.useSkjema, _navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_5__.useFelt, react_hook_form__WEBPACK_IMPORTED_MODULE_3__.useForm];
});
var useSamhandlerRequest = function useSamhandlerRequest(erIEnBehandling) {
  _s2();
  var _useHttp = (0,_navikt_familie_http__WEBPACK_IMPORTED_MODULE_4__.useHttp)(),
    request = _useHttp.request;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.byggTomRessurs)()),
    _useState2 = _slicedToArray(_useState, 2),
    samhandlerRessurs = _useState2[0],
    settSamhandlerRessurs = _useState2[1];
  var _useAppContext = (0,_context_AppContext__WEBPACK_IMPORTED_MODULE_8__.useAppContext)(),
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
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(behandlingIdEllerOrgnr) {
      var config;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            config = erIEnBehandling ? hentSamhandlerdataForBehandlingConfig(behandlingIdEllerOrgnr) : hentSamhandlerdataForOrgNrConfig(behandlingIdEllerOrgnr);
            return _context.a(2, request(config).then(function (ressurs) {
              return ressurs;
            })["catch"](function (_error) {
              return (0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.byggFeiletRessurs)('Ukjent feil ved innhenting av samhandlerinfo');
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
  return [_navikt_familie_http__WEBPACK_IMPORTED_MODULE_4__.useHttp, _context_AppContext__WEBPACK_IMPORTED_MODULE_8__.useAppContext];
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
/******/ 	__webpack_require__.h = () => ("30c256010a91f4d6eac5")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bENXRixvQkFBb0I7RUFBQSxRQUNUNUMseURBQU8sRUFHR08sOERBQWE7QUFBQTtBQWdDL0MsSUFBTXVELHFDQUFxQyxHQUFHLFNBQXhDQSxxQ0FBcUNBLENBQUlHLFlBQW9CLEVBQW1EO0VBQ2xILE9BQU87SUFDSEMsTUFBTSxFQUFFLEtBQUs7SUFDYkMsR0FBRyxFQUFFLDRDQUE0QyxHQUFHRjtFQUN4RCxDQUFDO0FBQ0wsQ0FBQztBQUVELElBQU01QixnQ0FBZ0MsR0FBRyxTQUFuQ0EsZ0NBQWdDQSxDQUFJK0IsS0FBYSxFQUFtRDtFQUN0RyxPQUFPO0lBQ0hGLE1BQU0sRUFBRSxLQUFLO0lBQ2JDLEdBQUcsRUFBRSx1Q0FBdUMsR0FBR0M7RUFDbkQsQ0FBQztBQUNMLENBQUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDM0hELHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQva29tcG9uZW50ZXIvU2FtaGFuZGxlci91c2VTYW1oYW5kbGVyLnRzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlUXVlcnlDbGllbnQgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknO1xuaW1wb3J0IHR5cGUgeyBBeGlvc0Vycm9yIH0gZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgdXNlRm9ybSB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5cbmltcG9ydCB0eXBlIHsgRmFtaWxpZVJlcXVlc3RDb25maWcgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtaHR0cCc7XG5pbXBvcnQgeyB1c2VIdHRwIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLWh0dHAnO1xuaW1wb3J0IHsgdXNlRmVsdCwgdXNlU2tqZW1hIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXNramVtYSc7XG5pbXBvcnQgdHlwZSB7IFJlc3N1cnMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuaW1wb3J0IHsgYnlnZ0ZlaWxldFJlc3N1cnMsIGJ5Z2dIZW50ZXJSZXNzdXJzLCBieWdnVG9tUmVzc3VycyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyL2Rpc3QvcmVzc3Vycyc7XG5cbmltcG9ydCB7IHVzZUFwcENvbnRleHQgfSBmcm9tICcuLi8uLi9jb250ZXh0L0FwcENvbnRleHQnO1xuaW1wb3J0IHsgSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3RvcnkgfSBmcm9tICcuLi8uLi9ob29rcy91c2VTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnJztcbmltcG9ydCB0eXBlIHsgSVNhbWhhbmRsZXJJbmZvLCBJU2FtaGFuZGxlckluZm9SZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdHlwZXIvc2FtaGFuZGxlcic7XG5pbXBvcnQgeyBvYmZ1c2tlclNhbWhhbmRsZXIgfSBmcm9tICcuLi8uLi91dGlscy9vYmZ1c2tlckRhdGEnO1xuaW1wb3J0IHsgb3JnbnVtbWVyVmFsaWRhdG9yIH0gZnJvbSAnLi4vLi4vdXRpbHMvdmFsaWRhdG9ycyc7XG5cbmV4cG9ydCBlbnVtIEZpZWxkcyB7XG4gICAgT1JHX05SID0gJ29yZ25yJyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtVmFsdWVzIHtcbiAgICBbRmllbGRzLk9SR19OUl06IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVNhbWhhbmRsZXJTa2plbWEgPSAob25TdWNjZXNzPzogKCkgPT4gdm9pZCwgb25FcnJvcj86IChlcnJvcjogc3RyaW5nKSA9PiB2b2lkKSA9PiB7XG4gICAgY29uc3QgcXVlcnlDbGllbnQgPSB1c2VRdWVyeUNsaWVudCgpO1xuICAgIGNvbnN0IHsgb25TdWJtaXQsIHNldHRTdWJtaXRSZXNzdXJzLCBza2plbWEgfSA9IHVzZVNramVtYTxJU2FtaGFuZGxlckluZm9SZXF1ZXN0LCBJU2FtaGFuZGxlckluZm8+KHtcbiAgICAgICAgZmVsdGVyOiB7XG4gICAgICAgICAgICBvcmducjogdXNlRmVsdCh7XG4gICAgICAgICAgICAgICAgdmVyZGk6ICcnLFxuICAgICAgICAgICAgICAgIHZhbGlkZXJpbmdzZnVua3Nqb246IG9yZ251bW1lclZhbGlkYXRvcixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgICBza2plbWFuYXZuOiAnaGVudFNhbWhhbmRsZXInLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZm9ybSA9IHVzZUZvcm08Rm9ybVZhbHVlcz4oe1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIFtGaWVsZHMuT1JHX05SXTogJycsXG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBvblN1Ym1pdE5ldyh2YWx1ZXM6IEZvcm1WYWx1ZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Rlc3Q6ICcgKyB2YWx1ZXMub3JnbnIpO1xuICAgICAgICBxdWVyeUNsaWVudC5yZWZldGNoUXVlcmllcyh7IHF1ZXJ5S2V5OiBIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeS5vcmcodmFsdWVzLm9yZ25yKSB9KS50aGVuKHJlc3VsdHMgPT4gY29uc29sZS5sb2coe3Jlc3VsdHMgfSkpO1xuICAgIH1cblxuICAgIGNvbnN0IG9uU3VibWl0V3JhcHBlciA9ICgpID0+IHtcbiAgICAgICAgb25TdWJtaXQoXG4gICAgICAgICAgICBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyhza2plbWEuZmVsdGVyLm9yZ25yLnZlcmRpKSxcbiAgICAgICAgICAgIChyZXNzdXJzOiBSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4pID0+IHtcbiAgICAgICAgICAgICAgICBzZXR0U3VibWl0UmVzc3VycyhyZXNzdXJzKTtcbiAgICAgICAgICAgICAgICBpZiAob25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uU3VjY2VzcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IFJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvbkVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5GVU5LU0pPTkVMTF9GRUlMKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IoZXJyb3IuZnJvbnRlbmRGZWlsbWVsZGluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmb3JtLFxuICAgICAgICBvblN1Ym1pdDogb25TdWJtaXROZXcsXG4gICAgICAgIG9uU3VibWl0V3JhcHBlcixcbiAgICAgICAgc2FtaGFuZGxlclNramVtYTogc2tqZW1hLFxuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3QgdXNlU2FtaGFuZGxlclJlcXVlc3QgPSAoZXJJRW5CZWhhbmRsaW5nOiBib29sZWFuKSA9PiB7XG4gICAgY29uc3QgeyByZXF1ZXN0IH0gPSB1c2VIdHRwKCk7XG4gICAgY29uc3QgW3NhbWhhbmRsZXJSZXNzdXJzLCBzZXR0U2FtaGFuZGxlclJlc3N1cnNdID0gdXNlU3RhdGU8UmVzc3VyczxJU2FtaGFuZGxlckluZm8+PihieWdnVG9tUmVzc3VycygpKTtcblxuICAgIGNvbnN0IHsgc2thbE9iZnVza2VyZURhdGEgfSA9IHVzZUFwcENvbnRleHQoKTtcblxuICAgIGNvbnN0IGhlbnRPZ1NldHRTYW1oYW5kbGVyID0gKGJlaGFuZGxpbmdJZEVsbGVyT3JnbnI6IHN0cmluZyB8IG51bWJlcikgPT4ge1xuICAgICAgICBzZXR0U2FtaGFuZGxlclJlc3N1cnMoYnlnZ0hlbnRlclJlc3N1cnM8SVNhbWhhbmRsZXJJbmZvPigpKTtcbiAgICAgICAgaGVudFNhbWhhbmRsZXIoU3RyaW5nKGJlaGFuZGxpbmdJZEVsbGVyT3JnbnIpKS50aGVuKChyZXNzdXJzOiBSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4pID0+IHtcbiAgICAgICAgICAgIGlmIChza2FsT2JmdXNrZXJlRGF0YSkge1xuICAgICAgICAgICAgICAgIG9iZnVza2VyU2FtaGFuZGxlcihyZXNzdXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldHRTYW1oYW5kbGVyUmVzc3VycyhyZXNzdXJzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhlbnRTYW1oYW5kbGVyID0gYXN5bmMgKGJlaGFuZGxpbmdJZEVsbGVyT3JnbnI6IHN0cmluZyk6IFByb21pc2U8UmVzc3VyczxJU2FtaGFuZGxlckluZm8+PiA9PiB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IGVySUVuQmVoYW5kbGluZ1xuICAgICAgICAgICAgPyBoZW50U2FtaGFuZGxlcmRhdGFGb3JCZWhhbmRsaW5nQ29uZmlnKGJlaGFuZGxpbmdJZEVsbGVyT3JnbnIpXG4gICAgICAgICAgICA6IGhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnKGJlaGFuZGxpbmdJZEVsbGVyT3JnbnIpO1xuICAgICAgICByZXR1cm4gcmVxdWVzdDxJU2FtaGFuZGxlckluZm9SZXF1ZXN0LCBJU2FtaGFuZGxlckluZm8+KGNvbmZpZylcbiAgICAgICAgICAgIC50aGVuKChyZXNzdXJzOiBSZXNzdXJzPElTYW1oYW5kbGVySW5mbz4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzc3VycztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKF9lcnJvcjogQXhpb3NFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBieWdnRmVpbGV0UmVzc3VycygnVWtqZW50IGZlaWwgdmVkIGlubmhlbnRpbmcgYXYgc2FtaGFuZGxlcmluZm8nKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBoZW50U2FtaGFuZGxlcixcbiAgICAgICAgaGVudE9nU2V0dFNhbWhhbmRsZXIsXG4gICAgICAgIHNhbWhhbmRsZXJSZXNzdXJzLFxuICAgIH07XG59O1xuXG5jb25zdCBoZW50U2FtaGFuZGxlcmRhdGFGb3JCZWhhbmRsaW5nQ29uZmlnID0gKGJlaGFuZGxpbmdJZDogc3RyaW5nKTogRmFtaWxpZVJlcXVlc3RDb25maWc8SVNhbWhhbmRsZXJJbmZvUmVxdWVzdD4gPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogJy9mYW1pbGllLWJhLXNhay9hcGkvc2FtaGFuZGxlci9iZWhhbmRsaW5nLycgKyBiZWhhbmRsaW5nSWQsXG4gICAgfTtcbn07XG5cbmNvbnN0IGhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnID0gKG9yZ05yOiBzdHJpbmcpOiBGYW1pbGllUmVxdWVzdENvbmZpZzxJU2FtaGFuZGxlckluZm9SZXF1ZXN0PiA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgdXJsOiAnL2ZhbWlsaWUtYmEtc2FrL2FwaS9zYW1oYW5kbGVyL29yZ25yLycgKyBvcmdOcixcbiAgICB9O1xufTtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjMwYzI1NjAxMGE5MWY0ZDZlYWM1XCIpIl0sIm5hbWVzIjpbImUiLCJ0IiwiciIsIlN5bWJvbCIsIm4iLCJpdGVyYXRvciIsIm8iLCJ0b1N0cmluZ1RhZyIsImkiLCJjIiwicHJvdG90eXBlIiwiR2VuZXJhdG9yIiwidSIsIk9iamVjdCIsImNyZWF0ZSIsIl9yZWdlbmVyYXRvckRlZmluZTIiLCJmIiwicCIsInkiLCJHIiwidiIsImEiLCJkIiwiYmluZCIsImxlbmd0aCIsImwiLCJUeXBlRXJyb3IiLCJjYWxsIiwiZG9uZSIsInZhbHVlIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJkaXNwbGF5TmFtZSIsIl9yZWdlbmVyYXRvciIsInciLCJtIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVnZW5lcmF0b3JEZWZpbmUiLCJfaW52b2tlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiX3NsaWNlZFRvQXJyYXkiLCJfYXJyYXlXaXRoSG9sZXMiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJfbm9uSXRlcmFibGVSZXN0IiwiX2FycmF5TGlrZVRvQXJyYXkiLCJ0b1N0cmluZyIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiQXJyYXkiLCJmcm9tIiwidGVzdCIsIm5leHQiLCJwdXNoIiwiaXNBcnJheSIsIl9kZWZpbmVQcm9wZXJ0eSIsIl90b1Byb3BlcnR5S2V5IiwiX3RvUHJpbWl0aXZlIiwiX3R5cGVvZiIsInRvUHJpbWl0aXZlIiwiU3RyaW5nIiwiTnVtYmVyIiwidXNlU3RhdGUiLCJ1c2VRdWVyeUNsaWVudCIsInVzZUZvcm0iLCJ1c2VIdHRwIiwidXNlRmVsdCIsInVzZVNramVtYSIsImJ5Z2dGZWlsZXRSZXNzdXJzIiwiYnlnZ0hlbnRlclJlc3N1cnMiLCJieWdnVG9tUmVzc3VycyIsIlJlc3N1cnNTdGF0dXMiLCJ1c2VBcHBDb250ZXh0IiwiSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3RvcnkiLCJvYmZ1c2tlclNhbWhhbmRsZXIiLCJvcmdudW1tZXJWYWxpZGF0b3IiLCJGaWVsZHMiLCJ1c2VTYW1oYW5kbGVyU2tqZW1hIiwib25TdWNjZXNzIiwib25FcnJvciIsIl9zIiwicXVlcnlDbGllbnQiLCJfdXNlU2tqZW1hIiwiZmVsdGVyIiwib3JnbnIiLCJ2ZXJkaSIsInZhbGlkZXJpbmdzZnVua3Nqb24iLCJza2plbWFuYXZuIiwib25TdWJtaXQiLCJzZXR0U3VibWl0UmVzc3VycyIsInNramVtYSIsImZvcm0iLCJ2YWx1ZXMiLCJPUkdfTlIiLCJvblN1Ym1pdE5ldyIsImNvbnNvbGUiLCJsb2ciLCJyZWZldGNoUXVlcmllcyIsInF1ZXJ5S2V5Iiwib3JnIiwicmVzdWx0cyIsIm9uU3VibWl0V3JhcHBlciIsImhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIiwicmVzc3VycyIsImVycm9yIiwic3RhdHVzIiwiRlVOS1NKT05FTExfRkVJTCIsImZyb250ZW5kRmVpbG1lbGRpbmciLCJzYW1oYW5kbGVyU2tqZW1hIiwidXNlU2FtaGFuZGxlclJlcXVlc3QiLCJlcklFbkJlaGFuZGxpbmciLCJfczIiLCJfdXNlSHR0cCIsInJlcXVlc3QiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwic2FtaGFuZGxlclJlc3N1cnMiLCJzZXR0U2FtaGFuZGxlclJlc3N1cnMiLCJfdXNlQXBwQ29udGV4dCIsInNrYWxPYmZ1c2tlcmVEYXRhIiwiaGVudE9nU2V0dFNhbWhhbmRsZXIiLCJiZWhhbmRsaW5nSWRFbGxlck9yZ25yIiwiaGVudFNhbWhhbmRsZXIiLCJfcmVmIiwiX2NhbGxlZSIsImNvbmZpZyIsIl9jb250ZXh0IiwiaGVudFNhbWhhbmRsZXJkYXRhRm9yQmVoYW5kbGluZ0NvbmZpZyIsIl9lcnJvciIsIl94IiwiYmVoYW5kbGluZ0lkIiwibWV0aG9kIiwidXJsIiwib3JnTnIiXSwic291cmNlUm9vdCI6IiJ9