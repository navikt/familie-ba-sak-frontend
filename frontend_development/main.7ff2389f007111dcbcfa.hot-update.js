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
var StyledFieldset = (0,styled_components__WEBPACK_IMPORTED_MODULE_4__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Fieldset)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    width: 69%:\n"])));
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
/******/ 	__webpack_require__.h = () => ("873b98eb8320fecfe033")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi43ZmYyMzg5ZjAwNzExMWRjYmNmYS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFFSjtBQUNKO0FBQ0o7QUFFOEI7QUFFWDtBQUM4QjtBQUNHO0FBRzNGLElBQU1hLG1CQUFtQixHQUFHUix5REFBTSxDQUFDUyxHQUFHLENBQUFDLGVBQUEsS0FBQUEsZUFBQSxHQUFBQyxzQkFBQSxvRkFJckM7QUFBQ0MsRUFBQSxHQUpJSixtQkFBbUI7QUFNekIsSUFBTUssZUFBZSxHQUFHYiw2REFBTSxDQUFDQyxvREFBTSxDQUFDLENBQUFhLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFILHNCQUFBLHNHQUtyQztBQUFDSSxHQUFBLEdBTElGLGVBQWU7QUFPckIsSUFBTUcsY0FBYyxHQUFHaEIsNkRBQU0sQ0FBQ0Usc0RBQVEsQ0FBQyxDQUFBZSxnQkFBQSxLQUFBQSxnQkFBQSxHQUFBTixzQkFBQSwyQkFFdEM7QUFFTSxJQUFNTyxVQUFvQixHQUFHLFNBQXZCQSxVQUFvQkEsQ0FBQSxFQUFTO0VBQUFDLEVBQUE7RUFBQSxJQUFBQyxZQUFBO0VBQ3RDLElBQU1DLFFBQVEsR0FBR3RCLHlEQUFXLENBQUMsQ0FBQztFQUM5QixJQUFBdUIsU0FBQSxHQUFvQ3pCLCtDQUFRLENBQXlCLElBQUksQ0FBQztJQUFBMEIsVUFBQSxHQUFBQyxjQUFBLENBQUFGLFNBQUE7SUFBbkVHLFVBQVUsR0FBQUYsVUFBQTtJQUFFRyxhQUFhLEdBQUFILFVBQUE7RUFDaEMsSUFBQUksVUFBQSxHQUEwRDlCLCtDQUFRLENBQVMsRUFBRSxDQUFDO0lBQUErQixVQUFBLEdBQUFKLGNBQUEsQ0FBQUcsVUFBQTtJQUF2RUUscUJBQXFCLEdBQUFELFVBQUE7SUFBRUUsd0JBQXdCLEdBQUFGLFVBQUE7RUFFdEQsSUFBQUcsa0JBQUEsR0FBMkJ4QixvR0FBaUIsQ0FBQztNQUN6Q3lCLGNBQWMsRUFBRSxTQUFoQkEsY0FB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cEIsVUFBVSxDQUFDMEMsWUFBWSxFQUFDLEdBQUMsRUFBQzFDLFVBQVUsQ0FBQzJDLElBQUksRUFBQyxHQUFDLGVBQUF6RSwwREFBQSxXQUFLLENBQUMsRUFDakQ4QixVQUFVLENBQUM0QyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsRUFBQyxHQUFDLEVBQUM3QyxVQUFVLENBQUM0QyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNFLFFBQ3hELENBRUksQ0FBQztBQUU5QixDQUFDO0FBQUNwRCxFQUFBLENBM0VXRCxVQUFvQjtFQUFBLFFBQ1puQixxREFBVyxFQUlEUSxnR0FBaUI7QUFBQTtBQUFBaUUsR0FBQSxHQUxuQ3RELFVBQW9CO0FBQUEsSUFBQU4sRUFBQSxFQUFBRyxHQUFBLEVBQUF5RCxHQUFBO0FBQUFDLHNDQUFBLENBQUE3RCxFQUFBO0FBQUE2RCxzQ0FBQSxDQUFBMUQsR0FBQTtBQUFBMEQsc0NBQUEsQ0FBQUQsR0FBQSxnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDOUJqQyxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL1NhbWhhbmRsZXIvU2FtaGFuZGxlci50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBGb3JtUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1ob29rLWZvcm0nO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24gfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEJ1dHRvbiwgRmllbGRzZXQsIEhlYWRpbmcsIEhTdGFjayB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuXG5pbXBvcnQgeyBIZW50U2FtaGFuZGxlckZlbHQgfSBmcm9tICcuL0hlbnRTYW1oYW5kbGVyRmVsdCc7XG5pbXBvcnQgeyBTYW1oYW5kbGVyRmVsdG5hdm4gfSBmcm9tICcuLi8uLi9rb21wb25lbnRlci9Nb2RhbC9mYWdzYWsvZm9ybS9TYW1oYW5kbGVyRm9ybSc7XG5pbXBvcnQgeyB1c2VTYW1oYW5kbGVyRm9ybSB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL01vZGFsL2ZhZ3Nhay9ob29rcy91c2VTYW1oYW5kbGVyRm9ybSc7XG5pbXBvcnQgdHlwZSB7IElTYW1oYW5kbGVySW5mbyB9IGZyb20gJy4uLy4uL3R5cGVyL3NhbWhhbmRsZXInO1xuXG5jb25zdCBTYW1oYW5kbGVyQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIGhlaWdodDogY2FsYygxMDB2aCAtIDUwcHgpO1xuYDtcblxuY29uc3QgSGVudFNha2VyQnV0dG9uID0gc3R5bGVkKEJ1dHRvbilgXG4gICAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gICAgbWFyZ2luLXRvcDogMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiBhdXRvO1xuICAgIGhlaWdodDogM3JlbTtcbmA7XG5cbmNvbnN0IFN0eWxlZEZpZWxkc2V0ID0gc3R5bGVkKEZpZWxkc2V0KWBcbiAgICB3aWR0aDogNjklOlxuYDtcblxuZXhwb3J0IGNvbnN0IFNhbWhhbmRsZXI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgICBjb25zdCBbc2FtaGFuZGxlciwgc2V0U2FtaGFuZGxlcl0gPSB1c2VTdGF0ZTxJU2FtaGFuZGxlckluZm8gfCBudWxsPihudWxsKTtcbiAgICBjb25zdCBbdmFsaWRlcmluZ0ZlaWxtZWxkaW5nLCBzZXRWYWxpZGVyaW5nRmVpbG1lbGRpbmddID0gdXNlU3RhdGU8c3RyaW5nPignJyk7XG5cbiAgICBjb25zdCB7IGZvcm0sIG9uU3VibWl0IH0gPSB1c2VTYW1oYW5kbGVyRm9ybSh7XG4gICAgICAgIHNldHRTYW1oYW5kbGVyOiBzYW1oYW5kbGVyID0+IHtcbiAgICAgICAgICAgIHNldFNhbWhhbmRsZXIoc2FtaGFuZGxlcik7XG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIGhhbmRsZVN1Ym1pdCxcbiAgICAgICAgZm9ybVN0YXRlOiB7IGlzU3VibWl0dGluZywgZXJyb3JzIH0sXG4gICAgfSA9IGZvcm07XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAobG9jYXRpb24uc3RhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gbG9jYXRpb24uc3RhdGUgYXMgeyBicnVrZXI6IHN0cmluZyB9O1xuICAgICAgICAgICAgZm9ybS5zZXRWYWx1ZShTYW1oYW5kbGVyRmVsdG5hdm4uT1JHTlIsIHN0YXRlLmJydWtlcik7XG4gICAgICAgICAgICBoYW5kbGVTdWJtaXQob25TdWJtaXQpKCk7XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8U2FtaGFuZGxlckNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9IGxldmVsPXsnMSd9PlxuICAgICAgICAgICAgICAgIFPDuGsgc2FtaGFuZGxlclxuICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgPEZvcm1Qcm92aWRlciB7Li4uZm9ybX0+XG4gICAgICAgICAgICAgICAgPGZvcm1cbiAgICAgICAgICAgICAgICAgICAgb25TdWJtaXQ9e2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEvXlxcZHs5fSQvLnRlc3QoZm9ybS5nZXRWYWx1ZXMoKVtTYW1oYW5kbGVyRmVsdG5hdm4uT1JHTlJdLnJlcGxhY2UoJyAnLCAnJykpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFsaWRlcmluZ0ZlaWxtZWxkaW5nKCdPcmdudW1tZXIgaGFyIGlra2UgOSB0YWxsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVN1Ym1pdChvblN1Ym1pdCkoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8SFN0YWNrIG1hcmdpbkJsb2NrPXsnc3BhY2UtMzInfSBhbGlnbj17J3N0YXJ0J30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RmllbGRzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcj17ZXJyb3JzLnJvb3Q/Lm9uU3VibWl0RXJyb3IubWVzc2FnZSB8fCB2YWxpZGVyaW5nRmVpbG1lbGRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kPVwiU8O4ayBzYW1oYW5kbGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlTGVnZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEhlbnRTYW1oYW5kbGVyRmVsdCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9GaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxIZW50U2FrZXJCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PXsncHJpbWFyeSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17J3N1Ym1pdCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybS5nZXRWYWx1ZXMoKVtTYW1oYW5kbGVyRmVsdG5hdm4uT1JHTlJdICE9PSBzYW1oYW5kbGVyPy5vcmdOdW1tZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNhbWhhbmRsZXIobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFsaWRlcmluZ0ZlaWxtZWxkaW5nKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5jbGVhckVycm9ycygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZz17aXNTdWJtaXR0aW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc1N1Ym1pdHRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVudCBzYW1oYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0hlbnRTYWtlckJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgPC9Gb3JtUHJvdmlkZXI+XG5cbiAgICAgICAgICAgIHtzYW1oYW5kbGVyICE9PSBudWxsICYmIChcbiAgICAgICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnbGFyZ2UnfT5cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXIudHNzRWtzdGVybklkfSB7c2FtaGFuZGxlci5uYXZufSA8YnIgLz5cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXIuYWRyZXNzZXJbMF0uYWRyZXNzZVR5cGV9IHtzYW1oYW5kbGVyLmFkcmVzc2VyWzBdLnBvc3RTdGVkfVxuICAgICAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvU2FtaGFuZGxlckNvbnRhaW5lcj5cbiAgICApO1xufTtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjg3M2I5OGViODMyMGZlY2ZlMDMzXCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJGb3JtUHJvdmlkZXIiLCJ1c2VMb2NhdGlvbiIsInN0eWxlZCIsIkJ1dHRvbiIsIkZpZWxkc2V0IiwiSGVhZGluZyIsIkhTdGFjayIsIkhlbnRTYW1oYW5kbGVyRmVsdCIsIlNhbWhhbmRsZXJGZWx0bmF2biIsInVzZVNhbWhhbmRsZXJGb3JtIiwiU2FtaGFuZGxlckNvbnRhaW5lciIsImRpdiIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJfYyIsIkhlbnRTYWtlckJ1dHRvbiIsIl90ZW1wbGF0ZU9iamVjdDIiLCJfYzIiLCJTdHlsZWRGaWVsZHNldCIsIl90ZW1wbGF0ZU9iamVjdDMiLCJTYW1oYW5kbGVyIiwiX3MiLCJfZXJyb3JzJHJvb3QiLCJsb2NhdGlvbiIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInNhbWhhbmRsZXIiLCJzZXRTYW1oYW5kbGVyIiwiX3VzZVN0YXRlMyIsIl91c2VTdGF0ZTQiLCJ2YWxpZGVyaW5nRmVpbG1lbGRpbmciLCJzZXRWYWxpZGVyaW5nRmVpbG1lbGRpbmciLCJfdXNlU2FtaGFuZGxlckZvcm0iLCJzZXR0U2FtaGFuZGxlciIsImZvcm0iLCJvblN1Ym1pdCIsImhhbmRsZVN1Ym1pdCIsIl9mb3JtJGZvcm1TdGF0ZSIsImZvcm1TdGF0ZSIsImlzU3VibWl0dGluZyIsImVycm9ycyIsInN0YXRlIiwic2V0VmFsdWUiLCJPUkdOUiIsImJydWtlciIsImNyZWF0ZUVsZW1lbnQiLCJzaXplIiwibGV2ZWwiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0ZXN0IiwiZ2V0VmFsdWVzIiwicmVwbGFjZSIsIm1hcmdpbkJsb2NrIiwiYWxpZ24iLCJlcnJvciIsInJvb3QiLCJvblN1Ym1pdEVycm9yIiwibWVzc2FnZSIsImxlZ2VuZCIsImhpZGVMZWdlbmQiLCJ2YXJpYW50IiwidHlwZSIsIm9uQ2xpY2siLCJvcmdOdW1tZXIiLCJjbGVhckVycm9ycyIsImxvYWRpbmciLCJkaXNhYmxlZCIsInRzc0Vrc3Rlcm5JZCIsIm5hdm4iLCJhZHJlc3NlciIsImFkcmVzc2VUeXBlIiwicG9zdFN0ZWQiLCJfYzMiLCIkUmVmcmVzaFJlZyQiXSwic291cmNlUm9vdCI6IiJ9