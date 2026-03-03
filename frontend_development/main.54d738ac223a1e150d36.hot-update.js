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
  _templateObject3,
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
var StyledFieldset = (0,styled_components__WEBPACK_IMPORTED_MODULE_4__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Fieldset)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    max-width: var(--a-spacing-18);\n"])));
_c3 = StyledFieldset;
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
    align: 'start'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(StyledFieldset, {
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
_c4 = Samhandler;
var _c, _c2, _c3, _c4;
__webpack_require__.$Refresh$.register(_c, "SamhandlerContainer");
__webpack_require__.$Refresh$.register(_c2, "HentSakerButton");
__webpack_require__.$Refresh$.register(_c3, "StyledFieldset");
__webpack_require__.$Refresh$.register(_c4, "Samhandler");

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
/******/ 	__webpack_require__.h = () => ("3d57f3fca0ba64904b9a")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi41NGQ3MzhhYzIyM2ExZTE1MGQzNi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFFSjtBQUNKO0FBQ0o7QUFFOEI7QUFFWDtBQUM4QjtBQUNHO0FBRzNGLElBQU1hLG1CQUFtQixHQUFHUix5REFBTSxDQUFDUyxHQUFHLENBQUFDLGVBQUEsS0FBQUEsZUFBQSxHQUFBQyxzQkFBQSxvRkFJckM7QUFBQ0MsRUFBQSxHQUpJSixtQkFBbUI7QUFNekIsSUFBTUssZUFBZSxHQUFHYiw2REFBTSxDQUFDQyxvREFBTSxDQUFDLENBQUFhLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFILHNCQUFBLHNHQUtyQztBQUFDSSxHQUFBLEdBTElGLGVBQWU7QUFPckIsSUFBTUcsY0FBYyxHQUFHaEIsNkRBQU0sQ0FBQ0Usc0RBQVEsQ0FBQyxDQUFBZSxnQkFBQSxLQUFBQSxnQkFBQSxHQUFBTixzQkFBQSwrQ0FFdEM7QUFBQ08sR0FBQSxHQUZJRixjQUFjO0FBSWIsSUFBTUcsVUFBb0IsR0FBRyxTQUF2QkEsVUFBb0JBLENBQUEsRUFBUztFQUFBQyxFQUFBO0VBQUEsSUFBQUMsWUFBQTtFQUN0QyxJQUFNQyxRQUFRLEdBQUd2Qix5REFBVyxDQUFDLENBQUM7RUFDOUIsSUFBQXdCLFNBQUEsR0FBb0MxQiwrQ0FBUSxDQUF5QixJQUFJLENBQUM7SUFBQTJCLFVBQUEsR0FBQUMsY0FBQSxDQUFBRixTQUFBO0lBQW5FRyxVQUFVLEdBQUFGLFVBQUE7SUFBRUcsYUFBYSxHQUFBSCxVQUFBO0VBQ2hDLElBQUFJLFVBQUEsR0FBMEQvQiwrQ0FBUSxDQUFTLEVBQUUsQ0FBQztJQUFBZ0MsVUFBQSxHQUFBSixjQUFBLENBQUFHLFVBQUE7SUFBdkVFLHFCQUFxQixHQUFBRCxVQUFBO0lBQUVFLHdCQUF3QixHQUFBRixVQUFBO0VBRXRELElBQUFHLGtCQUFBLEdBQTJCekIsb0dBQWlCLENBQUM7TUFDekMw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MkMsSUFBSSxFQUFFO0VBQVEsR0FDbEJwQixVQUFVLENBQUMwQyxZQUFZLEVBQUMsR0FBQyxFQUFDMUMsVUFBVSxDQUFDMkMsSUFBSSxFQUFDLEdBQUMsZUFBQTFFLDBEQUFBLFdBQUssQ0FBQyxFQUNqRCtCLFVBQVUsQ0FBQzRDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsV0FBVyxFQUFDLEdBQUMsRUFBQzdDLFVBQVUsQ0FBQzRDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0UsUUFDeEQsQ0FFSSxDQUFDO0FBRTlCLENBQUM7QUFBQ3BELEVBQUEsQ0EzRVdELFVBQW9CO0VBQUEsUUFDWnBCLHFEQUFXLEVBSURRLGdHQUFpQjtBQUFBO0FBQUFrRSxHQUFBLEdBTG5DdEQsVUFBb0I7QUFBQSxJQUFBUCxFQUFBLEVBQUFHLEdBQUEsRUFBQUcsR0FBQSxFQUFBdUQsR0FBQTtBQUFBQyxzQ0FBQSxDQUFBOUQsRUFBQTtBQUFBOEQsc0NBQUEsQ0FBQTNELEdBQUE7QUFBQTJELHNDQUFBLENBQUF4RCxHQUFBO0FBQUF3RCxzQ0FBQSxDQUFBRCxHQUFBLGdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUM5QmpDLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvU2FtaGFuZGxlci9TYW1oYW5kbGVyLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEZvcm1Qcm92aWRlciB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5pbXBvcnQgeyB1c2VMb2NhdGlvbiB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQnV0dG9uLCBGaWVsZHNldCwgSGVhZGluZywgSFN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5cbmltcG9ydCB7IEhlbnRTYW1oYW5kbGVyRmVsdCB9IGZyb20gJy4vSGVudFNhbWhhbmRsZXJGZWx0JztcbmltcG9ydCB7IFNhbWhhbmRsZXJGZWx0bmF2biB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL01vZGFsL2ZhZ3Nhay9mb3JtL1NhbWhhbmRsZXJGb3JtJztcbmltcG9ydCB7IHVzZVNhbWhhbmRsZXJGb3JtIH0gZnJvbSAnLi4vLi4va29tcG9uZW50ZXIvTW9kYWwvZmFnc2FrL2hvb2tzL3VzZVNhbWhhbmRsZXJGb3JtJztcbmltcG9ydCB0eXBlIHsgSVNhbWhhbmRsZXJJbmZvIH0gZnJvbSAnLi4vLi4vdHlwZXIvc2FtaGFuZGxlcic7XG5cbmNvbnN0IFNhbWhhbmRsZXJDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gNTBweCk7XG5gO1xuXG5jb25zdCBIZW50U2FrZXJCdXR0b24gPSBzdHlsZWQoQnV0dG9uKWBcbiAgICBtYXJnaW4tbGVmdDogMXJlbTtcbiAgICBtYXJnaW4tdG9wOiAycmVtO1xuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XG4gICAgaGVpZ2h0OiAzcmVtO1xuYDtcblxuY29uc3QgU3R5bGVkRmllbGRzZXQgPSBzdHlsZWQoRmllbGRzZXQpYFxuICAgIG1heC13aWR0aDogdmFyKC0tYS1zcGFjaW5nLTE4KTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTYW1oYW5kbGVyOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gICAgY29uc3QgW3NhbWhhbmRsZXIsIHNldFNhbWhhbmRsZXJdID0gdXNlU3RhdGU8SVNhbWhhbmRsZXJJbmZvIHwgbnVsbD4obnVsbCk7XG4gICAgY29uc3QgW3ZhbGlkZXJpbmdGZWlsbWVsZGluZywgc2V0VmFsaWRlcmluZ0ZlaWxtZWxkaW5nXSA9IHVzZVN0YXRlPHN0cmluZz4oJycpO1xuXG4gICAgY29uc3QgeyBmb3JtLCBvblN1Ym1pdCB9ID0gdXNlU2FtaGFuZGxlckZvcm0oe1xuICAgICAgICBzZXR0U2FtaGFuZGxlcjogc2FtaGFuZGxlciA9PiB7XG4gICAgICAgICAgICBzZXRTYW1oYW5kbGVyKHNhbWhhbmRsZXIpO1xuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3Qge1xuICAgICAgICBoYW5kbGVTdWJtaXQsXG4gICAgICAgIGZvcm1TdGF0ZTogeyBpc1N1Ym1pdHRpbmcsIGVycm9ycyB9LFxuICAgIH0gPSBmb3JtO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnN0YXRlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlIGFzIHsgYnJ1a2VyOiBzdHJpbmcgfTtcbiAgICAgICAgICAgIGZvcm0uc2V0VmFsdWUoU2FtaGFuZGxlckZlbHRuYXZuLk9SR05SLCBzdGF0ZS5icnVrZXIpO1xuICAgICAgICAgICAgaGFuZGxlU3VibWl0KG9uU3VibWl0KSgpO1xuICAgICAgICB9XG4gICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPFNhbWhhbmRsZXJDb250YWluZXI+XG4gICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnbGFyZ2UnfSBsZXZlbD17JzEnfT5cbiAgICAgICAgICAgICAgICBTw7hrIHNhbWhhbmRsZXJcbiAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgIDxGb3JtUHJvdmlkZXIgey4uLmZvcm19PlxuICAgICAgICAgICAgICAgIDxmb3JtXG4gICAgICAgICAgICAgICAgICAgIG9uU3VibWl0PXtlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghL15cXGR7OX0kLy50ZXN0KGZvcm0uZ2V0VmFsdWVzKClbU2FtaGFuZGxlckZlbHRuYXZuLk9SR05SXS5yZXBsYWNlKCcgJywgJycpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbGlkZXJpbmdGZWlsbWVsZGluZygnT3JnbnVtbWVyIGhhciBpa2tlIDkgdGFsbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVTdWJtaXQob25TdWJtaXQpKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEhTdGFjayBtYXJnaW5CbG9jaz17J3NwYWNlLTMyJ30gYWxpZ249eydzdGFydCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0eWxlZEZpZWxkc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I9e2Vycm9ycy5yb290Py5vblN1Ym1pdEVycm9yLm1lc3NhZ2UgfHwgdmFsaWRlcmluZ0ZlaWxtZWxkaW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZD1cIlPDuGsgc2FtaGFuZGxlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUxlZ2VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxIZW50U2FtaGFuZGxlckZlbHQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvU3R5bGVkRmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNha2VyQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD17J3ByaW1hcnknfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9eydzdWJtaXQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm0uZ2V0VmFsdWVzKClbU2FtaGFuZGxlckZlbHRuYXZuLk9SR05SXSAhPT0gc2FtaGFuZGxlcj8ub3JnTnVtbWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTYW1oYW5kbGVyKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbGlkZXJpbmdGZWlsbWVsZGluZygnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uY2xlYXJFcnJvcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e2lzU3VibWl0dGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNTdWJtaXR0aW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlbnQgc2FtaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9IZW50U2FrZXJCdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvSFN0YWNrPlxuICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIDwvRm9ybVByb3ZpZGVyPlxuXG4gICAgICAgICAgICB7c2FtaGFuZGxlciAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyLnRzc0Vrc3Rlcm5JZH0ge3NhbWhhbmRsZXIubmF2bn0gPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyLmFkcmVzc2VyWzBdLmFkcmVzc2VUeXBlfSB7c2FtaGFuZGxlci5hZHJlc3NlclswXS5wb3N0U3RlZH1cbiAgICAgICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICApfVxuICAgICAgICA8L1NhbWhhbmRsZXJDb250YWluZXI+XG4gICAgKTtcbn07XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIzZDU3ZjNmY2EwYmE2NDkwNGI5YVwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiRm9ybVByb3ZpZGVyIiwidXNlTG9jYXRpb24iLCJzdHlsZWQiLCJCdXR0b24iLCJGaWVsZHNldCIsIkhlYWRpbmciLCJIU3RhY2siLCJIZW50U2FtaGFuZGxlckZlbHQiLCJTYW1oYW5kbGVyRmVsdG5hdm4iLCJ1c2VTYW1oYW5kbGVyRm9ybSIsIlNhbWhhbmRsZXJDb250YWluZXIiLCJkaXYiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiX2MiLCJIZW50U2FrZXJCdXR0b24iLCJfdGVtcGxhdGVPYmplY3QyIiwiX2MyIiwiU3R5bGVkRmllbGRzZXQiLCJfdGVtcGxhdGVPYmplY3QzIiwiX2MzIiwiU2FtaGFuZGxlciIsIl9zIiwiX2Vycm9ycyRyb290IiwibG9jYXRpb24iLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJzYW1oYW5kbGVyIiwic2V0U2FtaGFuZGxlciIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0IiwidmFsaWRlcmluZ0ZlaWxtZWxkaW5nIiwic2V0VmFsaWRlcmluZ0ZlaWxtZWxkaW5nIiwiX3VzZVNhbWhhbmRsZXJGb3JtIiwic2V0dFNhbWhhbmRsZXIiLCJmb3JtIiwib25TdWJtaXQiLCJoYW5kbGVTdWJtaXQiLCJfZm9ybSRmb3JtU3RhdGUiLCJmb3JtU3RhdGUiLCJpc1N1Ym1pdHRpbmciLCJlcnJvcnMiLCJzdGF0ZSIsInNldFZhbHVlIiwiT1JHTlIiLCJicnVrZXIiLCJjcmVhdGVFbGVtZW50Iiwic2l6ZSIsImxldmVsIiwiZSIsInByZXZlbnREZWZhdWx0IiwidGVzdCIsImdldFZhbHVlcyIsInJlcGxhY2UiLCJtYXJnaW5CbG9jayIsImFsaWduIiwiZXJyb3IiLCJyb290Iiwib25TdWJtaXRFcnJvciIsIm1lc3NhZ2UiLCJsZWdlbmQiLCJoaWRlTGVnZW5kIiwidmFyaWFudCIsInR5cGUiLCJvbkNsaWNrIiwib3JnTnVtbWVyIiwiY2xlYXJFcnJvcnMiLCJsb2FkaW5nIiwiZGlzYWJsZWQiLCJ0c3NFa3N0ZXJuSWQiLCJuYXZuIiwiYWRyZXNzZXIiLCJhZHJlc3NlVHlwZSIsInBvc3RTdGVkIiwiX2M0IiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==