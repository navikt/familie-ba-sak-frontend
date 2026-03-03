"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/komponenter/Modal/fagsak/hooks/useSamhandlerForm.ts"
/*!**************************************************************************!*\
  !*** ./src/frontend/komponenter/Modal/fagsak/hooks/useSamhandlerForm.ts ***!
  \**************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSamhandlerForm: () => (/* binding */ useSamhandlerForm)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _navikt_familie_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @navikt/familie-http */ "./node_modules/@navikt/familie-http/dist/index.js");
/* harmony import */ var _navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/familie-skjema */ "./node_modules/@navikt/familie-skjema/dist/index.js");
/* harmony import */ var _api_hentSamhandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../api/hentSamhandler */ "./src/frontend/api/hentSamhandler.ts");
/* harmony import */ var _hooks_useOnFormSubmitSuccessful__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../hooks/useOnFormSubmitSuccessful */ "./src/frontend/hooks/useOnFormSubmitSuccessful.ts");
/* harmony import */ var _form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../form/SamhandlerForm */ "./src/frontend/komponenter/Modal/fagsak/form/SamhandlerForm.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _s = __webpack_require__.$Refresh$.signature();
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }







var påvirkerSystemLaster = false;
function useSamhandlerForm(_ref) {
  _s();
  var settSamhandler = _ref.settSamhandler;
  var queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)();
  var _useHttp = (0,_navikt_familie_http__WEBPACK_IMPORTED_MODULE_3__.useHttp)(),
    request = _useHttp.request;
  var form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useForm)({
    defaultValues: _defineProperty({}, _form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_7__.SamhandlerFeltnavn.ORGNR, '')
  });
  var control = form.control,
    setError = form.setError,
    reset = form.reset;
  (0,_hooks_useOnFormSubmitSuccessful__WEBPACK_IMPORTED_MODULE_6__.useOnFormSubmitSuccessful)(control, function () {
    return reset();
  });
  function onSubmit(_x) {
    return _onSubmit.apply(this, arguments);
  }
  function _onSubmit() {
    _onSubmit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(values) {
      var orgnr;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            orgnr = values[_form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_7__.SamhandlerFeltnavn.ORGNR];
            if (!/^\d{9}$/.test(orgnr.replace(' ', ''))) {
              (0,_navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_4__.ok)(felt);
              (0,_navikt_familie_skjema__WEBPACK_IMPORTED_MODULE_4__.feil)(felt, 'Orgnummer har ikke 9 tall');
            }
            _context.n = 1;
            return queryClient.fetchQuery({
              queryKey: ['samhandler', values.orgnr],
              queryFn: function queryFn() {
                return (0,_api_hentSamhandler__WEBPACK_IMPORTED_MODULE_5__.hentSamhandler)(request, values.orgnr, påvirkerSystemLaster);
              }
            }).then(function (samhandler) {
              return settSamhandler(samhandler);
            })["catch"](function (error) {
              var _message;
              var message = (_message = error === null || error === void 0 ? void 0 : error.message) !== null && _message !== void 0 ? _message : 'En feil oppstod ved henting av institusjon.';
              setError(_form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_7__.SamhandlerFormServerErrors.onSubmitError.id, {
                message: message
              });
            });
          case 1:
            return _context.a(2, _context.v);
        }
      }, _callee);
    }));
    return _onSubmit.apply(this, arguments);
  }
  return {
    form: form,
    onSubmit: onSubmit
  };
}
_s(useSamhandlerForm, "BUivk8ExZrrgCJENP1RjAIMRrHI=", false, function () {
  return [_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQueryClient, _navikt_familie_http__WEBPACK_IMPORTED_MODULE_3__.useHttp, react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useForm, _hooks_useOnFormSubmitSuccessful__WEBPACK_IMPORTED_MODULE_6__.useOnFormSubmitSuccessful];
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

/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("41d2f47542fdc7c7068f")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5mMTk5MzIxN2M5YWJiZTYzMzdlNC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUNBLHVLQUFBQSxDQUFBLEVBQUFDLENBQUEsRUFBQUMsQ0FBQSx3QkFBQUMsTUFBQSxHQUFBQSxNQUFBLE9BQUFDLENBQUEsR0FBQUYsQ0FBQSxDQUFBRyxRQUFBLGtCQUFBQyxDQUFBLEdBQUFKLENBQUEsQ0FBQUssV0FBQSw4QkFBQUMsRUFBQU4sQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBQyxDQUFBLEdBQUFMLENBQUEsSUFBQUEsQ0FBQSxDQUFBTSxTQUFBLFlBQUFDLFNBQUEsR0FBQVAsQ0FBQSxHQUFBTyxTQUFBLEVBQUFDLENBQUEsR0FBQUMsTUFBQSxDQUFBQyxNQUFBLENBQUFMLENBQUEsQ0FBQUMsU0FBQSxVQUFBSyxtQkFBQSxDQUFBSCxDQUFBLHVCQUFBVixDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBRSxDQUFBLEVBQUFDLENBQUEsRUFBQUcsQ0FBQSxFQUFBSSxDQUFBLE1BQUFDLENBQUEsR0FBQVgsQ0FBQSxRQUFBWSxDQUFBLE9BQUFDLENBQUEsS0FBQUYsQ0FBQSxLQUFBYixDQUFBLEtBQUFnQixDQUFBLEVBQUFwQixDQUFBLEVBQUFxQixDQUFBLEVBQUFDLENBQUEsRUFBQU4sQ0FBQSxFQUFBTSxDQUFBLENBQUFDLElBQUEsQ0FBQXZCLENBQUEsTUFBQXNCLENBQUEsV0FBQUEsRUFBQXJCLENBQUEsRUFBQUMsQ0FBQSxXQUFBTSxDQUFBLEdBQUFQLENBQUEsRUFBQVEsQ0FBQSxNQUFBRyxDQUFBLEdBQUFaLENBQUEsRUFBQW1CLENBQUEsQ0FBQWYsQ0FBQSxHQUFBRixDQUFBLEVBQUFtQixDQUFBLGdCQUFBQyxFQUFBcEIsQ0FBQSxFQUFBRSxDQUFBLFNBQUFLLENBQUEsR0FBQVAsQ0FBQSxFQUFBVSxDQUFBLEdBQUFSLENBQUEsRUFBQUgsQ0FB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QUFSQTtFQUFTLENBQUM7QUFDN0I7QUFBQ1gsRUFBQSxDQWxDZUYsaUJBQWlCO0VBQUEsUUFDVFYsaUVBQWMsRUFDZEUseURBQU8sRUFFZEQsb0RBQU8sRUFRcEJLLHVGQUF5QjtBQUFBLEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzdCN0Isc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9rb21wb25lbnRlci9Nb2RhbC9mYWdzYWsvaG9va3MvdXNlU2FtaGFuZGxlckZvcm0udHMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVF1ZXJ5Q2xpZW50IH0gZnJvbSAnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5JztcbmltcG9ydCB7IHVzZUZvcm0gfSBmcm9tICdyZWFjdC1ob29rLWZvcm0nO1xuXG5pbXBvcnQgeyB1c2VIdHRwIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLWh0dHAnO1xuaW1wb3J0IHsgZmVpbCwgb2sgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtc2tqZW1hJztcblxuaW1wb3J0IHsgaGVudFNhbWhhbmRsZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9hcGkvaGVudFNhbWhhbmRsZXInO1xuaW1wb3J0IHsgdXNlT25Gb3JtU3VibWl0U3VjY2Vzc2Z1bCB9IGZyb20gJy4uLy4uLy4uLy4uL2hvb2tzL3VzZU9uRm9ybVN1Ym1pdFN1Y2Nlc3NmdWwnO1xuaW1wb3J0IHR5cGUgeyBJU2FtaGFuZGxlckluZm8gfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlci9zYW1oYW5kbGVyJztcbmltcG9ydCB7IFNhbWhhbmRsZXJGZWx0bmF2biwgU2FtaGFuZGxlckZvcm1TZXJ2ZXJFcnJvcnMsIHR5cGUgU2FtaGFuZGxlckZvcm1WYWx1ZXMgfSBmcm9tICcuLi9mb3JtL1NhbWhhbmRsZXJGb3JtJztcblxuY29uc3QgcMOldmlya2VyU3lzdGVtTGFzdGVyID0gZmFsc2U7XG5cbmludGVyZmFjZSBQcm9wcyB7XG4gICAgc2V0dFNhbWhhbmRsZXI6IChzYW1oYW5kbGVyOiBJU2FtaGFuZGxlckluZm8pID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VTYW1oYW5kbGVyRm9ybSh7IHNldHRTYW1oYW5kbGVyIH06IFByb3BzKSB7XG4gICAgY29uc3QgcXVlcnlDbGllbnQgPSB1c2VRdWVyeUNsaWVudCgpO1xuICAgIGNvbnN0IHsgcmVxdWVzdCB9ID0gdXNlSHR0cCgpO1xuXG4gICAgY29uc3QgZm9ybSA9IHVzZUZvcm08U2FtaGFuZGxlckZvcm1WYWx1ZXM+KHtcbiAgICAgICAgZGVmYXVsdFZhbHVlczoge1xuICAgICAgICAgICAgW1NhbWhhbmRsZXJGZWx0bmF2bi5PUkdOUl06ICcnLFxuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgeyBjb250cm9sLCBzZXRFcnJvciwgcmVzZXQgfSA9IGZvcm07XG5cbiAgICB1c2VPbkZvcm1TdWJtaXRTdWNjZXNzZnVsKGNvbnRyb2wsICgpID0+IHJlc2V0KCkpO1xuXG4gICAgYXN5bmMgZnVuY3Rpb24gb25TdWJtaXQodmFsdWVzOiBTYW1oYW5kbGVyRm9ybVZhbHVlcykge1xuICAgICAgICBjb25zdCBvcmduciA9IHZhbHVlc1tTYW1oYW5kbGVyRmVsdG5hdm4uT1JHTlJdO1xuICAgICAgICBpZiAoIS9eXFxkezl9JC8udGVzdChvcmduci5yZXBsYWNlKCcgJywgJycpKSkge1xuICAgICAgICAgICAgb2soZmVsdCk7XG5cbiAgICAgICAgICAgIGZlaWwoZmVsdCwgJ09yZ251bW1lciBoYXIgaWtrZSA5IHRhbGwnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXdhaXQgcXVlcnlDbGllbnRcbiAgICAgICAgICAgIC5mZXRjaFF1ZXJ5KHtcbiAgICAgICAgICAgICAgICBxdWVyeUtleTogWydzYW1oYW5kbGVyJywgdmFsdWVzLm9yZ25yXSxcbiAgICAgICAgICAgICAgICBxdWVyeUZuOiAoKSA9PiBoZW50U2FtaGFuZGxlcihyZXF1ZXN0LCB2YWx1ZXMub3JnbnIsIHDDpXZpcmtlclN5c3RlbUxhc3RlciksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oc2FtaGFuZGxlciA9PiBzZXR0U2FtaGFuZGxlcihzYW1oYW5kbGVyKSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IChlcnJvciBhcyBFcnJvcik/Lm1lc3NhZ2UgPz8gJ0VuIGZlaWwgb3Bwc3RvZCB2ZWQgaGVudGluZyBhdiBpbnN0aXR1c2pvbi4nO1xuICAgICAgICAgICAgICAgIHNldEVycm9yKFNhbWhhbmRsZXJGb3JtU2VydmVyRXJyb3JzLm9uU3VibWl0RXJyb3IuaWQsIHsgbWVzc2FnZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7IGZvcm0sIG9uU3VibWl0IH07XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI0MWQyZjQ3NTQyZmRjN2M3MDY4ZlwiKSJdLCJuYW1lcyI6WyJlIiwidCIsInIiLCJTeW1ib2wiLCJuIiwiaXRlcmF0b3IiLCJvIiwidG9TdHJpbmdUYWciLCJpIiwiYyIsInByb3RvdHlwZSIsIkdlbmVyYXRvciIsInUiLCJPYmplY3QiLCJjcmVhdGUiLCJfcmVnZW5lcmF0b3JEZWZpbmUyIiwiZiIsInAiLCJ5IiwiRyIsInYiLCJhIiwiZCIsImJpbmQiLCJsZW5ndGgiLCJsIiwiVHlwZUVycm9yIiwiY2FsbCIsImRvbmUiLCJ2YWx1ZSIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiZGlzcGxheU5hbWUiLCJfcmVnZW5lcmF0b3IiLCJ3IiwibSIsImRlZmluZVByb3BlcnR5IiwiX3JlZ2VuZXJhdG9yRGVmaW5lIiwiX2ludm9rZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsIl9kZWZpbmVQcm9wZXJ0eSIsIl90b1Byb3BlcnR5S2V5IiwiX3RvUHJpbWl0aXZlIiwiX3R5cGVvZiIsInRvUHJpbWl0aXZlIiwiU3RyaW5nIiwiTnVtYmVyIiwidXNlUXVlcnlDbGllbnQiLCJ1c2VGb3JtIiwidXNlSHR0cCIsImZlaWwiLCJvayIsImhlbnRTYW1oYW5kbGVyIiwidXNlT25Gb3JtU3VibWl0U3VjY2Vzc2Z1bCIsIlNhbWhhbmRsZXJGZWx0bmF2biIsIlNhbWhhbmRsZXJGb3JtU2VydmVyRXJyb3JzIiwicMOldmlya2VyU3lzdGVtTGFzdGVyIiwidXNlU2FtaGFuZGxlckZvcm0iLCJfcmVmIiwiX3MiLCJzZXR0U2FtaGFuZGxlciIsInF1ZXJ5Q2xpZW50IiwiX3VzZUh0dHAiLCJyZXF1ZXN0IiwiZm9ybSIsImRlZmF1bHRWYWx1ZXMiLCJPUkdOUiIsImNvbnRyb2wiLCJzZXRFcnJvciIsInJlc2V0Iiwib25TdWJtaXQiLCJfeCIsIl9vblN1Ym1pdCIsIl9jYWxsZWUiLCJ2YWx1ZXMiLCJvcmduciIsIl9jb250ZXh0IiwidGVzdCIsInJlcGxhY2UiLCJmZWx0IiwiZmV0Y2hRdWVyeSIsInF1ZXJ5S2V5IiwicXVlcnlGbiIsInNhbWhhbmRsZXIiLCJlcnJvciIsIl9tZXNzYWdlIiwibWVzc2FnZSIsIm9uU3VibWl0RXJyb3IiLCJpZCJdLCJzb3VyY2VSb290IjoiIn0=