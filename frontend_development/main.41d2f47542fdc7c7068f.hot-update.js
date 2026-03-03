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
/* harmony import */ var _api_hentSamhandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../api/hentSamhandler */ "./src/frontend/api/hentSamhandler.ts");
/* harmony import */ var _hooks_useOnFormSubmitSuccessful__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../hooks/useOnFormSubmitSuccessful */ "./src/frontend/hooks/useOnFormSubmitSuccessful.ts");
/* harmony import */ var _form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../form/SamhandlerForm */ "./src/frontend/komponenter/Modal/fagsak/form/SamhandlerForm.tsx");
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
    defaultValues: _defineProperty({}, _form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_6__.SamhandlerFeltnavn.ORGNR, '')
  });
  var control = form.control,
    setError = form.setError,
    reset = form.reset;
  (0,_hooks_useOnFormSubmitSuccessful__WEBPACK_IMPORTED_MODULE_5__.useOnFormSubmitSuccessful)(control, function () {
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
            orgnr = values[_form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_6__.SamhandlerFeltnavn.ORGNR];
            if (/^\d{9}$/.test(orgnr.replace(' ', ''))) {
              _context.n = 1;
              break;
            }
            throw new Error('Orgnummer har ikke 9 tall');
          case 1:
            _context.n = 2;
            return queryClient.fetchQuery({
              queryKey: ['samhandler', values.orgnr],
              queryFn: function queryFn() {
                return (0,_api_hentSamhandler__WEBPACK_IMPORTED_MODULE_4__.hentSamhandler)(request, values.orgnr, påvirkerSystemLaster);
              }
            }).then(function (samhandler) {
              return settSamhandler(samhandler);
            })["catch"](function (error) {
              var _message;
              var message = (_message = error === null || error === void 0 ? void 0 : error.message) !== null && _message !== void 0 ? _message : 'En feil oppstod ved henting av institusjon.';
              setError(_form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_6__.SamhandlerFormServerErrors.onSubmitError.id, {
                message: message
              });
            });
          case 2:
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
  return [_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQueryClient, _navikt_familie_http__WEBPACK_IMPORTED_MODULE_3__.useHttp, react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useForm, _hooks_useOnFormSubmitSuccessful__WEBPACK_IMPORTED_MODULE_5__.useOnFormSubmitSuccessful];
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
/******/ 	__webpack_require__.h = () => ("9f5bbff28e15e2127885")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzdCO0FBQUNYLEVBQUEsQ0FoQ2VGLGlCQUFpQjtFQUFBLFFBQ1RSLGlFQUFjLEVBQ2RFLHlEQUFPLEVBRWRELG9EQUFPLEVBUXBCRyx1RkFBeUI7QUFBQSxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUM1QjdCLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQva29tcG9uZW50ZXIvTW9kYWwvZmFnc2FrL2hvb2tzL3VzZVNhbWhhbmRsZXJGb3JtLnRzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VRdWVyeUNsaWVudCB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XG5pbXBvcnQgeyB1c2VGb3JtIH0gZnJvbSAncmVhY3QtaG9vay1mb3JtJztcblxuaW1wb3J0IHsgdXNlSHR0cCB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS1odHRwJztcblxuaW1wb3J0IHsgaGVudFNhbWhhbmRsZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9hcGkvaGVudFNhbWhhbmRsZXInO1xuaW1wb3J0IHsgdXNlT25Gb3JtU3VibWl0U3VjY2Vzc2Z1bCB9IGZyb20gJy4uLy4uLy4uLy4uL2hvb2tzL3VzZU9uRm9ybVN1Ym1pdFN1Y2Nlc3NmdWwnO1xuaW1wb3J0IHR5cGUgeyBJU2FtaGFuZGxlckluZm8gfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlci9zYW1oYW5kbGVyJztcbmltcG9ydCB7IFNhbWhhbmRsZXJGZWx0bmF2biwgU2FtaGFuZGxlckZvcm1TZXJ2ZXJFcnJvcnMsIHR5cGUgU2FtaGFuZGxlckZvcm1WYWx1ZXMgfSBmcm9tICcuLi9mb3JtL1NhbWhhbmRsZXJGb3JtJztcblxuY29uc3QgcMOldmlya2VyU3lzdGVtTGFzdGVyID0gZmFsc2U7XG5cbmludGVyZmFjZSBQcm9wcyB7XG4gICAgc2V0dFNhbWhhbmRsZXI6IChzYW1oYW5kbGVyOiBJU2FtaGFuZGxlckluZm8pID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VTYW1oYW5kbGVyRm9ybSh7IHNldHRTYW1oYW5kbGVyIH06IFByb3BzKSB7XG4gICAgY29uc3QgcXVlcnlDbGllbnQgPSB1c2VRdWVyeUNsaWVudCgpO1xuICAgIGNvbnN0IHsgcmVxdWVzdCB9ID0gdXNlSHR0cCgpO1xuXG4gICAgY29uc3QgZm9ybSA9IHVzZUZvcm08U2FtaGFuZGxlckZvcm1WYWx1ZXM+KHtcbiAgICAgICAgZGVmYXVsdFZhbHVlczoge1xuICAgICAgICAgICAgW1NhbWhhbmRsZXJGZWx0bmF2bi5PUkdOUl06ICcnLFxuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgeyBjb250cm9sLCBzZXRFcnJvciwgcmVzZXQgfSA9IGZvcm07XG5cbiAgICB1c2VPbkZvcm1TdWJtaXRTdWNjZXNzZnVsKGNvbnRyb2wsICgpID0+IHJlc2V0KCkpO1xuXG4gICAgYXN5bmMgZnVuY3Rpb24gb25TdWJtaXQodmFsdWVzOiBTYW1oYW5kbGVyRm9ybVZhbHVlcykge1xuICAgICAgICBjb25zdCBvcmduciA9IHZhbHVlc1tTYW1oYW5kbGVyRmVsdG5hdm4uT1JHTlJdO1xuICAgICAgICBpZiAoIS9eXFxkezl9JC8udGVzdChvcmduci5yZXBsYWNlKCcgJywgJycpKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPcmdudW1tZXIgaGFyIGlra2UgOSB0YWxsJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF3YWl0IHF1ZXJ5Q2xpZW50XG4gICAgICAgICAgICAuZmV0Y2hRdWVyeSh7XG4gICAgICAgICAgICAgICAgcXVlcnlLZXk6IFsnc2FtaGFuZGxlcicsIHZhbHVlcy5vcmducl0sXG4gICAgICAgICAgICAgICAgcXVlcnlGbjogKCkgPT4gaGVudFNhbWhhbmRsZXIocmVxdWVzdCwgdmFsdWVzLm9yZ25yLCBww6V2aXJrZXJTeXN0ZW1MYXN0ZXIpLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHNhbWhhbmRsZXIgPT4gc2V0dFNhbWhhbmRsZXIoc2FtaGFuZGxlcikpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAoZXJyb3IgYXMgRXJyb3IpPy5tZXNzYWdlID8/ICdFbiBmZWlsIG9wcHN0b2QgdmVkIGhlbnRpbmcgYXYgaW5zdGl0dXNqb24uJztcbiAgICAgICAgICAgICAgICBzZXRFcnJvcihTYW1oYW5kbGVyRm9ybVNlcnZlckVycm9ycy5vblN1Ym1pdEVycm9yLmlkLCB7IG1lc3NhZ2UgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBmb3JtLCBvblN1Ym1pdCB9O1xufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiOWY1YmJmZjI4ZTE1ZTIxMjc4ODVcIikiXSwibmFtZXMiOlsiZSIsInQiLCJyIiwiU3ltYm9sIiwibiIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsImYiLCJwIiwieSIsIkciLCJ2IiwiYSIsImQiLCJiaW5kIiwibGVuZ3RoIiwibCIsIlR5cGVFcnJvciIsImNhbGwiLCJkb25lIiwidmFsdWUiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImRpc3BsYXlOYW1lIiwiX3JlZ2VuZXJhdG9yIiwidyIsIm0iLCJkZWZpbmVQcm9wZXJ0eSIsIl9yZWdlbmVyYXRvckRlZmluZSIsIl9pbnZva2UiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3VtZW50cyIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJfZGVmaW5lUHJvcGVydHkiLCJfdG9Qcm9wZXJ0eUtleSIsIl90b1ByaW1pdGl2ZSIsIl90eXBlb2YiLCJ0b1ByaW1pdGl2ZSIsIlN0cmluZyIsIk51bWJlciIsInVzZVF1ZXJ5Q2xpZW50IiwidXNlRm9ybSIsInVzZUh0dHAiLCJoZW50U2FtaGFuZGxlciIsInVzZU9uRm9ybVN1Ym1pdFN1Y2Nlc3NmdWwiLCJTYW1oYW5kbGVyRmVsdG5hdm4iLCJTYW1oYW5kbGVyRm9ybVNlcnZlckVycm9ycyIsInDDpXZpcmtlclN5c3RlbUxhc3RlciIsInVzZVNhbWhhbmRsZXJGb3JtIiwiX3JlZiIsIl9zIiwic2V0dFNhbWhhbmRsZXIiLCJxdWVyeUNsaWVudCIsIl91c2VIdHRwIiwicmVxdWVzdCIsImZvcm0iLCJkZWZhdWx0VmFsdWVzIiwiT1JHTlIiLCJjb250cm9sIiwic2V0RXJyb3IiLCJyZXNldCIsIm9uU3VibWl0IiwiX3giLCJfb25TdWJtaXQiLCJfY2FsbGVlIiwidmFsdWVzIiwib3JnbnIiLCJfY29udGV4dCIsInRlc3QiLCJyZXBsYWNlIiwiRXJyb3IiLCJmZXRjaFF1ZXJ5IiwicXVlcnlLZXkiLCJxdWVyeUZuIiwic2FtaGFuZGxlciIsImVycm9yIiwiX21lc3NhZ2UiLCJtZXNzYWdlIiwib25TdWJtaXRFcnJvciIsImlkIl0sInNvdXJjZVJvb3QiOiIifQ==