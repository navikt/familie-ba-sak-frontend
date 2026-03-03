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
  var _useSamhandlerForm = (0,_komponenter_Modal_fagsak_hooks_useSamhandlerForm__WEBPACK_IMPORTED_MODULE_8__.useSamhandlerForm)({
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
      form.setValue(_komponenter_Modal_fagsak_form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_7__.SamhandlerFeltnavn.ORGNR, state.bruker);
      handleSubmit(_onSubmit)();
    }
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(SamhandlerContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Heading, {
    size: 'large',
    level: '1'
  }, "S\xF8k samhandler"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_2__.FormProvider, form, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      if (!/^\d{9}$/.test(form.getValues()[_komponenter_Modal_fagsak_form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_7__.SamhandlerFeltnavn.ORGNR].replace(' ', ''))) {
        setValideringFeilmelding('Orgnummer har ikke 9 tall');
      } else {
        handleSubmit(_onSubmit)(e);
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.HStack, {
    marginBlock: 'space-32',
    gridColumn: '1 / -1',
    align: 'start'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Fieldset, {
    error: ((_errors$root = errors.root) === null || _errors$root === void 0 ? void 0 : _errors$root.onSubmitError.message) || valideringFeilmelding,
    legend: "S\xF8k samhandler",
    hideLegend: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_HentSamhandlerFelt__WEBPACK_IMPORTED_MODULE_6__.HentSamhandlerFelt, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HentSakerButton, {
    variant: 'primary',
    type: 'submit',
    onClick: function onClick() {
      if (form.getValues()[_komponenter_Modal_fagsak_form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_7__.SamhandlerFeltnavn.ORGNR] !== (samhandler === null || samhandler === void 0 ? void 0 : samhandler.orgNummer)) {
        setSamhandler(null);
      }
      setValideringFeilmelding('');
      form.clearErrors();
    },
    loading: isSubmitting,
    disabled: isSubmitting
  }, "Hent samhandler")))), samhandler !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Heading, {
    size: 'large'
  }, samhandler.tssEksternId, " ", samhandler.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), samhandler.adresser[0].adresseType, " ", samhandler.adresser[0].postSted));
};
_s(Samhandler, "VQ9CVrdRkUR79hXJWXHqQb7DLK0=", false, function () {
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
/******/ 	__webpack_require__.h = () => ("82de6f94544702bf14ac")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDBEQUFBLFdBQUssQ0FBQyxFQUNqRDRCLFVBQVUsQ0FBQzZDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsV0FBVyxFQUFDLEdBQUMsRUFBQzlDLFVBQVUsQ0FBQzZDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0UsUUFDeEQsQ0FFSSxDQUFDO0FBRTlCLENBQUM7QUFBQ3JELEVBQUEsQ0EzRVdELFVBQW9CO0VBQUEsUUFDWmpCLHFEQUFXLEVBSURRLGdHQUFpQjtBQUFBO0FBQUFnRSxHQUFBLEdBTG5DdkQsVUFBb0I7QUFBQSxJQUFBSixFQUFBLEVBQUFHLEdBQUEsRUFBQXdELEdBQUE7QUFBQUMsc0NBQUEsQ0FBQTVELEVBQUE7QUFBQTRELHNDQUFBLENBQUF6RCxHQUFBO0FBQUF5RCxzQ0FBQSxDQUFBRCxHQUFBLGdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUMxQmpDLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvU2FtaGFuZGxlci9TYW1oYW5kbGVyLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEZvcm1Qcm92aWRlciB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5pbXBvcnQgeyB1c2VMb2NhdGlvbiB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQnV0dG9uLCBGaWVsZHNldCwgSGVhZGluZywgSFN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5cbmltcG9ydCB7IEhlbnRTYW1oYW5kbGVyRmVsdCB9IGZyb20gJy4vSGVudFNhbWhhbmRsZXJGZWx0JztcbmltcG9ydCB7IFNhbWhhbmRsZXJGZWx0bmF2biB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL01vZGFsL2ZhZ3Nhay9mb3JtL1NhbWhhbmRsZXJGb3JtJztcbmltcG9ydCB7IHVzZVNhbWhhbmRsZXJGb3JtIH0gZnJvbSAnLi4vLi4va29tcG9uZW50ZXIvTW9kYWwvZmFnc2FrL2hvb2tzL3VzZVNhbWhhbmRsZXJGb3JtJztcbmltcG9ydCB0eXBlIHsgSVNhbWhhbmRsZXJJbmZvIH0gZnJvbSAnLi4vLi4vdHlwZXIvc2FtaGFuZGxlcic7XG5cbmNvbnN0IFNhbWhhbmRsZXJDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gNTBweCk7XG5gO1xuXG5jb25zdCBIZW50U2FrZXJCdXR0b24gPSBzdHlsZWQoQnV0dG9uKWBcbiAgICBtYXJnaW4tbGVmdDogMXJlbTtcbiAgICBtYXJnaW4tdG9wOiAycmVtO1xuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XG4gICAgaGVpZ2h0OiAzcmVtO1xuYDtcblxuZXhwb3J0IGNvbnN0IFNhbWhhbmRsZXI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgICBjb25zdCBbc2FtaGFuZGxlciwgc2V0U2FtaGFuZGxlcl0gPSB1c2VTdGF0ZTxJU2FtaGFuZGxlckluZm8gfCBudWxsPihudWxsKTtcbiAgICBjb25zdCBbdmFsaWRlcmluZ0ZlaWxtZWxkaW5nLCBzZXRWYWxpZGVyaW5nRmVpbG1lbGRpbmddID0gdXNlU3RhdGU8c3RyaW5nPignJyk7XG5cbiAgICBjb25zdCB7IGZvcm0sIG9uU3VibWl0IH0gPSB1c2VTYW1oYW5kbGVyRm9ybSh7XG4gICAgICAgIHNldHRTYW1oYW5kbGVyOiBzYW1oYW5kbGVyID0+IHtcbiAgICAgICAgICAgIHNldFNhbWhhbmRsZXIoc2FtaGFuZGxlcik7XG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIGhhbmRsZVN1Ym1pdCxcbiAgICAgICAgZm9ybVN0YXRlOiB7IGlzU3VibWl0dGluZywgZXJyb3JzIH0sXG4gICAgfSA9IGZvcm07XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAobG9jYXRpb24uc3RhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gbG9jYXRpb24uc3RhdGUgYXMgeyBicnVrZXI6IHN0cmluZyB9O1xuICAgICAgICAgICAgZm9ybS5zZXRWYWx1ZShTYW1oYW5kbGVyRmVsdG5hdm4uT1JHTlIsIHN0YXRlLmJydWtlcik7XG4gICAgICAgICAgICBoYW5kbGVTdWJtaXQob25TdWJtaXQpKCk7XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8U2FtaGFuZGxlckNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9IGxldmVsPXsnMSd9PlxuICAgICAgICAgICAgICAgIFPDuGsgc2FtaGFuZGxlclxuICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgPEZvcm1Qcm92aWRlciB7Li4uZm9ybX0+XG4gICAgICAgICAgICAgICAgPGZvcm1cbiAgICAgICAgICAgICAgICAgICAgb25TdWJtaXQ9e2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEvXlxcZHs5fSQvLnRlc3QoZm9ybS5nZXRWYWx1ZXMoKVtTYW1oYW5kbGVyRmVsdG5hdm4uT1JHTlJdLnJlcGxhY2UoJyAnLCAnJykpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFsaWRlcmluZ0ZlaWxtZWxkaW5nKCdPcmdudW1tZXIgaGFyIGlra2UgOSB0YWxsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVN1Ym1pdChvblN1Ym1pdCkoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8SFN0YWNrIG1hcmdpbkJsb2NrPXsnc3BhY2UtMzInfSBncmlkQ29sdW1uPXsnMSAvIC0xJ30gYWxpZ249eydzdGFydCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZpZWxkc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I9e2Vycm9ycy5yb290Py5vblN1Ym1pdEVycm9yLm1lc3NhZ2UgfHwgdmFsaWRlcmluZ0ZlaWxtZWxkaW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZD1cIlPDuGsgc2FtaGFuZGxlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUxlZ2VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxIZW50U2FtaGFuZGxlckZlbHQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNha2VyQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD17J3ByaW1hcnknfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9eydzdWJtaXQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm0uZ2V0VmFsdWVzKClbU2FtaGFuZGxlckZlbHRuYXZuLk9SR05SXSAhPT0gc2FtaGFuZGxlcj8ub3JnTnVtbWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTYW1oYW5kbGVyKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbGlkZXJpbmdGZWlsbWVsZGluZygnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uY2xlYXJFcnJvcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e2lzU3VibWl0dGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNTdWJtaXR0aW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlbnQgc2FtaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9IZW50U2FrZXJCdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvSFN0YWNrPlxuICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIDwvRm9ybVByb3ZpZGVyPlxuXG4gICAgICAgICAgICB7c2FtaGFuZGxlciAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyLnRzc0Vrc3Rlcm5JZH0ge3NhbWhhbmRsZXIubmF2bn0gPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyLmFkcmVzc2VyWzBdLmFkcmVzc2VUeXBlfSB7c2FtaGFuZGxlci5hZHJlc3NlclswXS5wb3N0U3RlZH1cbiAgICAgICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICApfVxuICAgICAgICA8L1NhbWhhbmRsZXJDb250YWluZXI+XG4gICAgKTtcbn07XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI4MmRlNmY5NDU0NDcwMmJmMTRhY1wiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiRm9ybVByb3ZpZGVyIiwidXNlTG9jYXRpb24iLCJzdHlsZWQiLCJCdXR0b24iLCJGaWVsZHNldCIsIkhlYWRpbmciLCJIU3RhY2siLCJIZW50U2FtaGFuZGxlckZlbHQiLCJTYW1oYW5kbGVyRmVsdG5hdm4iLCJ1c2VTYW1oYW5kbGVyRm9ybSIsIlNhbWhhbmRsZXJDb250YWluZXIiLCJkaXYiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiX2MiLCJIZW50U2FrZXJCdXR0b24iLCJfdGVtcGxhdGVPYmplY3QyIiwiX2MyIiwiU2FtaGFuZGxlciIsIl9zIiwiX2Vycm9ycyRyb290IiwibG9jYXRpb24iLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJzYW1oYW5kbGVyIiwic2V0U2FtaGFuZGxlciIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0IiwidmFsaWRlcmluZ0ZlaWxtZWxkaW5nIiwic2V0VmFsaWRlcmluZ0ZlaWxtZWxkaW5nIiwiX3VzZVNhbWhhbmRsZXJGb3JtIiwic2V0dFNhbWhhbmRsZXIiLCJmb3JtIiwib25TdWJtaXQiLCJoYW5kbGVTdWJtaXQiLCJfZm9ybSRmb3JtU3RhdGUiLCJmb3JtU3RhdGUiLCJpc1N1Ym1pdHRpbmciLCJlcnJvcnMiLCJzdGF0ZSIsInNldFZhbHVlIiwiT1JHTlIiLCJicnVrZXIiLCJjcmVhdGVFbGVtZW50Iiwic2l6ZSIsImxldmVsIiwiZSIsInByZXZlbnREZWZhdWx0IiwidGVzdCIsImdldFZhbHVlcyIsInJlcGxhY2UiLCJtYXJnaW5CbG9jayIsImdyaWRDb2x1bW4iLCJhbGlnbiIsImVycm9yIiwicm9vdCIsIm9uU3VibWl0RXJyb3IiLCJtZXNzYWdlIiwibGVnZW5kIiwiaGlkZUxlZ2VuZCIsInZhcmlhbnQiLCJ0eXBlIiwib25DbGljayIsIm9yZ051bW1lciIsImNsZWFyRXJyb3JzIiwibG9hZGluZyIsImRpc2FibGVkIiwidHNzRWtzdGVybklkIiwibmF2biIsImFkcmVzc2VyIiwiYWRyZXNzZVR5cGUiLCJwb3N0U3RlZCIsIl9jMyIsIiRSZWZyZXNoUmVnJCJdLCJzb3VyY2VSb290IjoiIn0=