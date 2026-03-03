"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

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
/* harmony import */ var _komponenter_Modal_fagsak_form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../komponenter/Modal/fagsak/form/SamhandlerForm */ "./src/frontend/komponenter/Modal/fagsak/form/SamhandlerForm.tsx");
/* harmony import */ var _komponenter_Modal_fagsak_hooks_useSamhandlerForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../komponenter/Modal/fagsak/hooks/useSamhandlerForm */ "./src/frontend/komponenter/Modal/fagsak/hooks/useSamhandlerForm.ts");
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
  var _errors$root;
  var location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    samhandler = _useState2[0],
    setSamhandler = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    valideringFeilmelding = _useState4[0],
    setValideringFeilmelding = _useState4[1];
  var _useSamhandlerForm = (0,_komponenter_Modal_fagsak_hooks_useSamhandlerForm__WEBPACK_IMPORTED_MODULE_7__.useSamhandlerForm)({
      settSamhandler: function settSamhandler(samhandler) {
        setSamhandler(samhandler);
      }
    }),
    form = _useSamhandlerForm.form,
    _onSubmit = _useSamhandlerForm.onSubmit;
  var handleSubmit = form.handleSubmit,
    _form$formState = form.formState,
    isSubmitting = _form$formState.isSubmitting,
    errors = _form$formState.errors;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (location.state) {
      var state = location.state;
      form.setValue(_komponenter_Modal_fagsak_form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_6__.SamhandlerFeltnavn.ORGNR, state.bruker);
      handleSubmit(_onSubmit)();
    }
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(SamhandlerContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Heading, {
    size: 'large',
    level: '1'
  }, "S\xF8k samhandler"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_2__.FormProvider, form, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
    onSubmit: function onSubmit() {
      if (!/^\d{9}$/.test(form.getValues()[_komponenter_Modal_fagsak_form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_6__.SamhandlerFeltnavn.ORGNR].replace(' ', ''))) {
        throw new Error('Orgnummer har ikke 9 tall');
      } else {
        handleSubmit(_onSubmit);
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HStack, {
    marginBlock: 'space-32'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Fieldset, {
    error: (_errors$root = errors.root) === null || _errors$root === void 0 ? void 0 : _errors$root.onSubmitError.message,
    legend: "S\xF8k samhandler",
    hideLegend: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HentSamhandlerFelt, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HentSakerButton, {
    variant: 'primary',
    type: 'submit',
    onClick: function onClick() {
      if (form.getValues()[_komponenter_Modal_fagsak_form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_6__.SamhandlerFeltnavn.ORGNR] !== (samhandler === null || samhandler === void 0 ? void 0 : samhandler.orgNummer)) {
        setSamhandler(null);
      }
      form.clearErrors();
    },
    loading: isSubmitting,
    disabled: isSubmitting
  }, "Hent samhandler")))), samhandler !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Heading, {
    size: 'large'
  }, samhandler.tssEksternId, " ", samhandler.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), samhandler.adresser[0].adresseType, " ", samhandler.adresser[0].postSted));
};
_s(Samhandler, "VQ9CVrdRkUR79hXJWXHqQb7DLK0=", false, function () {
  return [react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation, _komponenter_Modal_fagsak_hooks_useSamhandlerForm__WEBPACK_IMPORTED_MODULE_7__.useSamhandlerForm];
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
/******/ 	__webpack_require__.h = () => ("fa9d3aa362c28c92e722")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDckQsRUFBQSxDQXJFV0QsVUFBb0I7RUFBQSxRQUNaZCxxREFBVyxFQUlESyxnR0FBaUI7QUFBQTtBQUFBZ0UsR0FBQSxHQUxuQ3ZELFVBQW9CO0FBQUEsSUFBQUosRUFBQSxFQUFBRyxHQUFBLEVBQUF3RCxHQUFBO0FBQUFDLHNDQUFBLENBQUE1RCxFQUFBO0FBQUE0RCxzQ0FBQSxDQUFBekQsR0FBQTtBQUFBeUQsc0NBQUEsQ0FBQUQsR0FBQSxnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDekJqQyxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL1NhbWhhbmRsZXIvU2FtaGFuZGxlci50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBGb3JtUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1ob29rLWZvcm0nO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24gfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEJ1dHRvbiwgSGVhZGluZyB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuXG5pbXBvcnQgeyBTYW1oYW5kbGVyRmVsdG5hdm4gfSBmcm9tICcuLi8uLi9rb21wb25lbnRlci9Nb2RhbC9mYWdzYWsvZm9ybS9TYW1oYW5kbGVyRm9ybSc7XG5pbXBvcnQgeyB1c2VTYW1oYW5kbGVyRm9ybSB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL01vZGFsL2ZhZ3Nhay9ob29rcy91c2VTYW1oYW5kbGVyRm9ybSc7XG5pbXBvcnQgdHlwZSB7IElTYW1oYW5kbGVySW5mbyB9IGZyb20gJy4uLy4uL3R5cGVyL3NhbWhhbmRsZXInO1xuXG5jb25zdCBTYW1oYW5kbGVyQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIGhlaWdodDogY2FsYygxMDB2aCAtIDUwcHgpO1xuYDtcblxuY29uc3QgSGVudFNha2VyQnV0dG9uID0gc3R5bGVkKEJ1dHRvbilgXG4gICAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gICAgbWFyZ2luLXRvcDogMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiBhdXRvO1xuICAgIGhlaWdodDogM3JlbTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTYW1oYW5kbGVyOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gICAgY29uc3QgW3NhbWhhbmRsZXIsIHNldFNhbWhhbmRsZXJdID0gdXNlU3RhdGU8SVNhbWhhbmRsZXJJbmZvIHwgbnVsbD4obnVsbCk7XG4gICAgY29uc3QgW3ZhbGlkZXJpbmdGZWlsbWVsZGluZywgc2V0VmFsaWRlcmluZ0ZlaWxtZWxkaW5nXSA9IHVzZVN0YXRlPHN0cmluZz4oJycpO1xuXG4gICAgY29uc3QgeyBmb3JtLCBvblN1Ym1pdCB9ID0gdXNlU2FtaGFuZGxlckZvcm0oe1xuICAgICAgICBzZXR0U2FtaGFuZGxlcjogc2FtaGFuZGxlciA9PiB7XG4gICAgICAgICAgICBzZXRTYW1oYW5kbGVyKHNhbWhhbmRsZXIpO1xuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3Qge1xuICAgICAgICBoYW5kbGVTdWJtaXQsXG4gICAgICAgIGZvcm1TdGF0ZTogeyBpc1N1Ym1pdHRpbmcsIGVycm9ycyB9LFxuICAgIH0gPSBmb3JtO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnN0YXRlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlIGFzIHsgYnJ1a2VyOiBzdHJpbmcgfTtcbiAgICAgICAgICAgIGZvcm0uc2V0VmFsdWUoU2FtaGFuZGxlckZlbHRuYXZuLk9SR05SLCBzdGF0ZS5icnVrZXIpO1xuICAgICAgICAgICAgaGFuZGxlU3VibWl0KG9uU3VibWl0KSgpO1xuICAgICAgICB9XG4gICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPFNhbWhhbmRsZXJDb250YWluZXI+XG4gICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnbGFyZ2UnfSBsZXZlbD17JzEnfT5cbiAgICAgICAgICAgICAgICBTw7hrIHNhbWhhbmRsZXJcbiAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgIDxGb3JtUHJvdmlkZXIgey4uLmZvcm19PlxuICAgICAgICAgICAgICAgIDxmb3JtXG4gICAgICAgICAgICAgICAgICAgIG9uU3VibWl0PXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIS9eXFxkezl9JC8udGVzdChmb3JtLmdldFZhbHVlcygpW1NhbWhhbmRsZXJGZWx0bmF2bi5PUkdOUl0ucmVwbGFjZSgnICcsICcnKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09yZ251bW1lciBoYXIgaWtrZSA5IHRhbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlU3VibWl0KG9uU3VibWl0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxIU3RhY2sgbWFyZ2luQmxvY2s9eydzcGFjZS0zMid9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZpZWxkc2V0IGVycm9yPXtlcnJvcnMucm9vdD8ub25TdWJtaXRFcnJvci5tZXNzYWdlfSBsZWdlbmQ9XCJTw7hrIHNhbWhhbmRsZXJcIiBoaWRlTGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxIZW50U2FtaGFuZGxlckZlbHQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNha2VyQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD17J3ByaW1hcnknfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9eydzdWJtaXQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm0uZ2V0VmFsdWVzKClbU2FtaGFuZGxlckZlbHRuYXZuLk9SR05SXSAhPT0gc2FtaGFuZGxlcj8ub3JnTnVtbWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTYW1oYW5kbGVyKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uY2xlYXJFcnJvcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e2lzU3VibWl0dGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNTdWJtaXR0aW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlbnQgc2FtaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9IZW50U2FrZXJCdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvSFN0YWNrPlxuICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIDwvRm9ybVByb3ZpZGVyPlxuXG4gICAgICAgICAgICB7c2FtaGFuZGxlciAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyLnRzc0Vrc3Rlcm5JZH0ge3NhbWhhbmRsZXIubmF2bn0gPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyLmFkcmVzc2VyWzBdLmFkcmVzc2VUeXBlfSB7c2FtaGFuZGxlci5hZHJlc3NlclswXS5wb3N0U3RlZH1cbiAgICAgICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICApfVxuICAgICAgICA8L1NhbWhhbmRsZXJDb250YWluZXI+XG4gICAgKTtcbn07XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJmYTlkM2FhMzYyYzI4YzkyZTcyMlwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiRm9ybVByb3ZpZGVyIiwidXNlTG9jYXRpb24iLCJzdHlsZWQiLCJCdXR0b24iLCJIZWFkaW5nIiwiU2FtaGFuZGxlckZlbHRuYXZuIiwidXNlU2FtaGFuZGxlckZvcm0iLCJTYW1oYW5kbGVyQ29udGFpbmVyIiwiZGl2IiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbCIsIl9jIiwiSGVudFNha2VyQnV0dG9uIiwiX3RlbXBsYXRlT2JqZWN0MiIsIl9jMiIsIlNhbWhhbmRsZXIiLCJfcyIsIl9lcnJvcnMkcm9vdCIsImxvY2F0aW9uIiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5Iiwic2FtaGFuZGxlciIsInNldFNhbWhhbmRsZXIiLCJfdXNlU3RhdGUzIiwiX3VzZVN0YXRlNCIsInZhbGlkZXJpbmdGZWlsbWVsZGluZyIsInNldFZhbGlkZXJpbmdGZWlsbWVsZGluZyIsIl91c2VTYW1oYW5kbGVyRm9ybSIsInNldHRTYW1oYW5kbGVyIiwiZm9ybSIsIm9uU3VibWl0IiwiaGFuZGxlU3VibWl0IiwiX2Zvcm0kZm9ybVN0YXRlIiwiZm9ybVN0YXRlIiwiaXNTdWJtaXR0aW5nIiwiZXJyb3JzIiwic3RhdGUiLCJzZXRWYWx1ZSIsIk9SR05SIiwiYnJ1a2VyIiwiY3JlYXRlRWxlbWVudCIsInNpemUiLCJsZXZlbCIsInRlc3QiLCJnZXRWYWx1ZXMiLCJyZXBsYWNlIiwiRXJyb3IiLCJIU3RhY2siLCJtYXJnaW5CbG9jayIsIkZpZWxkc2V0IiwiZXJyb3IiLCJyb290Iiwib25TdWJtaXRFcnJvciIsIm1lc3NhZ2UiLCJsZWdlbmQiLCJoaWRlTGVnZW5kIiwiSGVudFNhbWhhbmRsZXJGZWx0IiwidmFyaWFudCIsInR5cGUiLCJvbkNsaWNrIiwib3JnTnVtbWVyIiwiY2xlYXJFcnJvcnMiLCJsb2FkaW5nIiwiZGlzYWJsZWQiLCJ0c3NFa3N0ZXJuSWQiLCJuYXZuIiwiYWRyZXNzZXIiLCJhZHJlc3NlVHlwZSIsInBvc3RTdGVkIiwiX2MzIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==