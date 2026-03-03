"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/sider/Samhandler/HentSamhandlerFelt.tsx"
/*!**************************************************************!*\
  !*** ./src/frontend/sider/Samhandler/HentSamhandlerFelt.tsx ***!
  \**************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HentSamhandlerFelt: () => (/* binding */ HentSamhandlerFelt)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../komponenter/Samhandler/useSamhandler */ "./src/frontend/komponenter/Samhandler/useSamhandler.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _s = __webpack_require__.$Refresh$.signature();
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }




function HentSamhandlerFelt() {
  _s();
  var _errors$Fields$ORG_NR;
  var _useFormContext = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useFormContext)(),
    register = _useFormContext.register,
    _useFormContext$formS = _useFormContext.formState,
    isSubmitting = _useFormContext$formS.isSubmitting,
    errors = _useFormContext$formS.errors;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.TextField, _extends({}, register(_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_4__.Fields.ORG_NR, {
    required: 'Begrunnelse for manuell registrering av dødsfall er påkrevd.'
  }), {
    error: (_errors$Fields$ORG_NR = errors[_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_4__.Fields.ORG_NR]) === null || _errors$Fields$ORG_NR === void 0 ? void 0 : _errors$Fields$ORG_NR.message,
    label: 'Skriv inn orgnr',
    size: "medium",
    disabled: isSubmitting,
    placeholder: 'orgnr'
  }));
}
_s(HentSamhandlerFelt, "ARa5kCWf5RlKjRnwkQ6cOXvMGRY=", false, function () {
  return [react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useFormContext];
});
_c = HentSamhandlerFelt;
var _c;
__webpack_require__.$Refresh$.register(_c, "HentSamhandlerFelt");

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

/***/ },

/***/ "./src/frontend/sider/Samhandler/Samhandler.tsx"
/*!******************************************************!*\
  !*** ./src/frontend/sider/Samhandler/Samhandler.tsx ***!
  \******************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Samhandler: () => (/* binding */ Samhandler)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _HentSamhandlerFelt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HentSamhandlerFelt */ "./src/frontend/sider/Samhandler/HentSamhandlerFelt.tsx");
/* harmony import */ var _komponenter_Modal_fagsak_form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../komponenter/Modal/fagsak/form/SamhandlerForm */ "./src/frontend/komponenter/Modal/fagsak/form/SamhandlerForm.tsx");
/* harmony import */ var _komponenter_Modal_fagsak_hooks_useSamhandlerForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../komponenter/Modal/fagsak/hooks/useSamhandlerForm */ "./src/frontend/komponenter/Modal/fagsak/hooks/useSamhandlerForm.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject,
  _templateObject2,
  _s = __webpack_require__.$Refresh$.signature();
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }








var SamhandlerContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    padding: 1rem;\n    overflow: auto;\n    height: calc(100vh - 50px);\n"])));
_c = SamhandlerContainer;
var HentSakerButton = (0,styled_components__WEBPACK_IMPORTED_MODULE_4__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Button)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    margin-left: 1rem;\n    margin-top: 2rem;\n    margin-bottom: auto;\n    height: 3rem;\n"])));
_c2 = HentSakerButton;
var Samhandler = function Samhandler() {
  _s();
  var location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    samhandler = _useState2[0],
    setSamhandler = _useState2[1];
  console.log(samhandler);
  var _useSamhandlerForm = (0,_komponenter_Modal_fagsak_hooks_useSamhandlerForm__WEBPACK_IMPORTED_MODULE_8__.useSamhandlerForm)({
      settSamhandler: function settSamhandler(samhandler) {
        setSamhandler(samhandler);
      }
    }),
    form = _useSamhandlerForm.form,
    onSubmit = _useSamhandlerForm.onSubmit;
  var handleSubmit = form.handleSubmit,
    _form$formState = form.formState,
    isSubmitting = _form$formState.isSubmitting,
    errors = _form$formState.errors;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (location.state) {
      var state = location.state;
      form.setValue(_komponenter_Modal_fagsak_form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_7__.SamhandlerFeltnavn.ORGNR, state.bruker);
      handleSubmit(onSubmit)(form.getValues());
    }
  }, []);
  console.log(errors);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(SamhandlerContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Heading, {
    size: 'large',
    level: '1'
  }, "S\xF8k samhandler"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.HStack, {
    marginBlock: 'space-32'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_2__.FormProvider, form, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Fieldset //error={errors}
  , {
    legend: "S\xF8k samhandler",
    hideLegend: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_HentSamhandlerFelt__WEBPACK_IMPORTED_MODULE_6__.HentSamhandlerFelt, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HentSakerButton, {
    variant: 'primary',
    type: 'submit',
    loading: isSubmitting,
    disabled: isSubmitting
  }, "Hent samhandler")))), samhandler !== undefined && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Heading, {
    size: 'large'
  }, samhandler.tssEksternId, " ", samhandler.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), samhandler.adresser[0].adresseType, " ", samhandler.adresser[0].postSted));
};
_s(Samhandler, "4/xUo/AgxkJnm7UshL4WVBzPK4Y=", false, function () {
  return [react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation, _komponenter_Modal_fagsak_hooks_useSamhandlerForm__WEBPACK_IMPORTED_MODULE_8__.useSamhandlerForm];
});
_c3 = Samhandler;
var _c, _c2, _c3;
__webpack_require__.$Refresh$.register(_c, "SamhandlerContainer");
__webpack_require__.$Refresh$.register(_c2, "HentSakerButton");
__webpack_require__.$Refresh$.register(_c3, "Samhandler");

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
/******/ 	__webpack_require__.h = () => ("240436be32b1fc885370")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4zMTJhMWNjNzdkNzZhMDE3MjUyNy5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUV1QjtBQUVKO0FBRXdDO0FBRTlFLFNBQVNJLGtCQUFrQkEsQ0FBQSxFQUFHO0VBQUFDLEVBQUE7RUFBQSxJQUFBQyxxQkFBQTtFQUNqQyxJQUFBQyxlQUFBLEdBR0lOLCtEQUFjLENBQWEsQ0FBQztJQUY1Qk8sUUFBUSxHQUFBRCxlQUFBLENBQVJDLFFBQVE7SUFBQUMscUJBQUEsR0FBQUYsZUFBQSxDQUNSRyxTQUFTO0lBQUlDLFlBQVksR0FBQUYscUJBQUEsQ0FBWkUsWUFBWTtJQUFFQyxNQUFNLEdBQUFILHFCQUFBLENBQU5HLE1BQU07RUFFckMsb0JBQ0laLDBEQUFBLENBQUNFLHVEQUFTLEVBQUFZLFFBQUEsS0FDRk4sUUFBUSxDQUFDTCx5RUFBTSxDQUFDWSxNQUFNLEVBQUU7SUFDeEJDLFFBQVEsRUFBRTtFQUNkLENBQUMsQ0FBQztJQUNGQyxLQUFLLEdBQUFYLHFCQUFBLEdBQUVNLE1BQU0sQ0FBQ1QseUVBQU0sQ0FBQ1ksTUFBTSxDQUFDLGNBQUFULHFCQUFBLHVCQUFyQkEscUJBQUEsQ0FBdUJZLE9BQVE7SUFDdENDLEtBQUssRUFBRSxpQkFBa0I7SUFDekJDLElBQUksRUFBQyxRQUFRO0lBQ2JDLFFBQVEsRUFBRVYsWUFBYTtJQUN2QlcsV0FBVyxFQUFFO0VBQVEsRUFDeEIsQ0FBQztBQUVWO0FBQUNqQixFQUFBLENBakJlRCxrQkFBa0I7RUFBQSxRQUkxQkgsMkRBQWM7QUFBQTtBQUFBc0IsRUFBQSxHQUpObkIsa0JBQWtCO0FBQUEsSUFBQW1CLEVBQUE7QUFBQUMsc0NBQUEsQ0FBQUQsRUFBQSx3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSaUI7QUFFSjtBQUNKO0FBQ0o7QUFFOEI7QUFFWDtBQUM4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SUFBSSxFQUFDLEdBQUMsZUFBQXhFLDBEQUFBLFdBQUssQ0FBQyxFQUNqRGdELFVBQVUsQ0FBQ3lCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsV0FBVyxFQUFDLEdBQUMsRUFBQzFCLFVBQVUsQ0FBQ3lCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0UsUUFDeEQsQ0FFSSxDQUFDO0FBRTlCLENBQUM7QUFBQ3RFLEVBQUEsQ0EzRFdzQyxVQUFvQjtFQUFBLFFBQ1pmLHFEQUFXLEVBSURPLGdHQUFpQjtBQUFBO0FBQUF5QyxHQUFBLEdBTG5DakMsVUFBb0I7QUFBQSxJQUFBcEIsRUFBQSxFQUFBbUIsR0FBQSxFQUFBa0MsR0FBQTtBQUFBcEQsc0NBQUEsQ0FBQUQsRUFBQTtBQUFBQyxzQ0FBQSxDQUFBa0IsR0FBQTtBQUFBbEIsc0NBQUEsQ0FBQW9ELEdBQUEsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzFCakMsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9TYW1oYW5kbGVyL0hlbnRTYW1oYW5kbGVyRmVsdC50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvU2FtaGFuZGxlci9TYW1oYW5kbGVyLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlRm9ybUNvbnRleHQgfSBmcm9tICdyZWFjdC1ob29rLWZvcm0nO1xuXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICdAbmF2aWt0L2RzLXJlYWN0JztcblxuaW1wb3J0IHsgRmllbGRzLCB0eXBlIEZvcm1WYWx1ZXMgfSBmcm9tICcuLi8uLi9rb21wb25lbnRlci9TYW1oYW5kbGVyL3VzZVNhbWhhbmRsZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gSGVudFNhbWhhbmRsZXJGZWx0KCkge1xuICAgIGNvbnN0IHtcbiAgICAgICAgcmVnaXN0ZXIsXG4gICAgICAgIGZvcm1TdGF0ZTogeyBpc1N1Ym1pdHRpbmcsIGVycm9ycyB9LFxuICAgIH0gPSB1c2VGb3JtQ29udGV4dDxGb3JtVmFsdWVzPigpO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICAgIHsuLi5yZWdpc3RlcihGaWVsZHMuT1JHX05SLCB7XG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6ICdCZWdydW5uZWxzZSBmb3IgbWFudWVsbCByZWdpc3RyZXJpbmcgYXYgZMO4ZHNmYWxsIGVyIHDDpWtyZXZkLicsXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIGVycm9yPXtlcnJvcnNbRmllbGRzLk9SR19OUl0/Lm1lc3NhZ2V9XG4gICAgICAgICAgICBsYWJlbD17J1Nrcml2IGlubiBvcmducid9XG4gICAgICAgICAgICBzaXplPVwibWVkaXVtXCJcbiAgICAgICAgICAgIGRpc2FibGVkPXtpc1N1Ym1pdHRpbmd9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17J29yZ25yJ31cbiAgICAgICAgLz5cbiAgICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEZvcm1Qcm92aWRlciB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5pbXBvcnQgeyB1c2VMb2NhdGlvbiB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQnV0dG9uLCBGaWVsZHNldCwgSGVhZGluZywgSFN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5cbmltcG9ydCB7IEhlbnRTYW1oYW5kbGVyRmVsdCB9IGZyb20gJy4vSGVudFNhbWhhbmRsZXJGZWx0JztcbmltcG9ydCB7IFNhbWhhbmRsZXJGZWx0bmF2biB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL01vZGFsL2ZhZ3Nhay9mb3JtL1NhbWhhbmRsZXJGb3JtJztcbmltcG9ydCB7IHVzZVNhbWhhbmRsZXJGb3JtIH0gZnJvbSAnLi4vLi4va29tcG9uZW50ZXIvTW9kYWwvZmFnc2FrL2hvb2tzL3VzZVNhbWhhbmRsZXJGb3JtJztcbmltcG9ydCB0eXBlIHsgSVNhbWhhbmRsZXJJbmZvIH0gZnJvbSAnLi4vLi4vdHlwZXIvc2FtaGFuZGxlcic7XG5cbmNvbnN0IFNhbWhhbmRsZXJDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gNTBweCk7XG5gO1xuXG5jb25zdCBIZW50U2FrZXJCdXR0b24gPSBzdHlsZWQoQnV0dG9uKWBcbiAgICBtYXJnaW4tbGVmdDogMXJlbTtcbiAgICBtYXJnaW4tdG9wOiAycmVtO1xuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XG4gICAgaGVpZ2h0OiAzcmVtO1xuYDtcblxuZXhwb3J0IGNvbnN0IFNhbWhhbmRsZXI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgICBjb25zdCBbc2FtaGFuZGxlciwgc2V0U2FtaGFuZGxlcl0gPSB1c2VTdGF0ZTxJU2FtaGFuZGxlckluZm8gfCBudWxsPihudWxsKTtcbiAgICBjb25zb2xlLmxvZyhzYW1oYW5kbGVyKTtcblxuICAgIGNvbnN0IHsgZm9ybSwgb25TdWJtaXQgfSA9IHVzZVNhbWhhbmRsZXJGb3JtKHtcbiAgICAgICAgc2V0dFNhbWhhbmRsZXI6IHNhbWhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgc2V0U2FtaGFuZGxlcihzYW1oYW5kbGVyKTtcbiAgICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgaGFuZGxlU3VibWl0LFxuICAgICAgICBmb3JtU3RhdGU6IHsgaXNTdWJtaXR0aW5nLCBlcnJvcnMgfSxcbiAgICB9ID0gZm9ybTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zdGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZSBhcyB7IGJydWtlcjogc3RyaW5nIH07XG4gICAgICAgICAgICBmb3JtLnNldFZhbHVlKFNhbWhhbmRsZXJGZWx0bmF2bi5PUkdOUiwgc3RhdGUuYnJ1a2VyKTtcbiAgICAgICAgICAgIGhhbmRsZVN1Ym1pdChvblN1Ym1pdCkoZm9ybS5nZXRWYWx1ZXMoKSk7XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICBjb25zb2xlLmxvZyhlcnJvcnMpO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxTYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30gbGV2ZWw9eycxJ30+XG4gICAgICAgICAgICAgICAgU8O4ayBzYW1oYW5kbGVyXG4gICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICA8SFN0YWNrIG1hcmdpbkJsb2NrPXsnc3BhY2UtMzInfT5cbiAgICAgICAgICAgICAgICA8Rm9ybVByb3ZpZGVyIHsuLi5mb3JtfT5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdChvblN1Ym1pdCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZpZWxkc2V0IC8vZXJyb3I9e2Vycm9yc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmQ9XCJTw7hrIHNhbWhhbmRsZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVMZWdlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNhbWhhbmRsZXJGZWx0IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEhlbnRTYWtlckJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9eydwcmltYXJ5J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXsnc3VibWl0J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nPXtpc1N1Ym1pdHRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzU3VibWl0dGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZW50IHNhbWhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvSGVudFNha2VyQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgPC9Gb3JtUHJvdmlkZXI+XG4gICAgICAgICAgICA8L0hTdGFjaz5cblxuICAgICAgICAgICAge3NhbWhhbmRsZXIgIT09IHVuZGVmaW5lZCAmJiAoXG4gICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyLnRzc0Vrc3Rlcm5JZH0ge3NhbWhhbmRsZXIubmF2bn0gPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyLmFkcmVzc2VyWzBdLmFkcmVzc2VUeXBlfSB7c2FtaGFuZGxlci5hZHJlc3NlclswXS5wb3N0U3RlZH1cbiAgICAgICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICApfVxuICAgICAgICA8L1NhbWhhbmRsZXJDb250YWluZXI+XG4gICAgKTtcbn07XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIyNDA0MzZiZTMyYjFmYzg4NTM3MFwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUZvcm1Db250ZXh0IiwiVGV4dEZpZWxkIiwiRmllbGRzIiwiSGVudFNhbWhhbmRsZXJGZWx0IiwiX3MiLCJfZXJyb3JzJEZpZWxkcyRPUkdfTlIiLCJfdXNlRm9ybUNvbnRleHQiLCJyZWdpc3RlciIsIl91c2VGb3JtQ29udGV4dCRmb3JtUyIsImZvcm1TdGF0ZSIsImlzU3VibWl0dGluZyIsImVycm9ycyIsImNyZWF0ZUVsZW1lbnQiLCJfZXh0ZW5kcyIsIk9SR19OUiIsInJlcXVpcmVkIiwiZXJyb3IiLCJtZXNzYWdlIiwibGFiZWwiLCJzaXplIiwiZGlzYWJsZWQiLCJwbGFjZWhvbGRlciIsIl9jIiwiJFJlZnJlc2hSZWckIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJGb3JtUHJvdmlkZXIiLCJ1c2VMb2NhdGlvbiIsInN0eWxlZCIsIkJ1dHRvbiIsIkZpZWxkc2V0IiwiSGVhZGluZyIsIkhTdGFjayIsIlNhbWhhbmRsZXJGZWx0bmF2biIsInVzZVNhbWhhbmRsZXJGb3JtIiwiU2FtaGFuZGxlckNvbnRhaW5lciIsImRpdiIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJIZW50U2FrZXJCdXR0b24iLCJfdGVtcGxhdGVPYmplY3QyIiwiX2MyIiwiU2FtaGFuZGxlciIsImxvY2F0aW9uIiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5Iiwic2FtaGFuZGxlciIsInNldFNhbWhhbmRsZXIiLCJjb25zb2xlIiwibG9nIiwiX3VzZVNhbWhhbmRsZXJGb3JtIiwic2V0dFNhbWhhbmRsZXIiLCJmb3JtIiwib25TdWJtaXQiLCJoYW5kbGVTdWJtaXQiLCJfZm9ybSRmb3JtU3RhdGUiLCJzdGF0ZSIsInNldFZhbHVlIiwiT1JHTlIiLCJicnVrZXIiLCJnZXRWYWx1ZXMiLCJsZXZlbCIsIm1hcmdpbkJsb2NrIiwibGVnZW5kIiwiaGlkZUxlZ2VuZCIsInZhcmlhbnQiLCJ0eXBlIiwibG9hZGluZyIsInVuZGVmaW5lZCIsInRzc0Vrc3Rlcm5JZCIsIm5hdm4iLCJhZHJlc3NlciIsImFkcmVzc2VUeXBlIiwicG9zdFN0ZWQiLCJfYzMiXSwic291cmNlUm9vdCI6IiJ9