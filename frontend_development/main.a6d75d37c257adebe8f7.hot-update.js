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
/******/ 	__webpack_require__.h = () => ("4107dde44b9492f31bd5")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0ksQ0FDVixDQUFDLEVBRVJYLFVBQVUsS0FBSzRCLFNBQVMsaUJBQ3JCdkQsMERBQUEsQ0FBQ1EscURBQU87SUFBQ3NDLElBQUksRUFBRTtFQUFRLEdBQ2xCbkIsVUFBVSxDQUFDNkIsWUFBWSxFQUFDLEdBQUMsRUFBQzdCLFVBQVUsQ0FBQzhCLElBQUksRUFBQyxHQUFDLGVBQUF6RCwwREFBQSxXQUFLLENBQUMsRUFDakQyQixVQUFVLENBQUMrQixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsRUFBQyxHQUFDLEVBQUNoQyxVQUFVLENBQUMrQixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNFLFFBQ3hELENBRUksQ0FBQztBQUU5QixDQUFDO0FBQUN0QyxFQUFBLENBM0RXRCxVQUFvQjtFQUFBLFFBQ1pqQixxREFBVyxFQUlEUSxnR0FBaUI7QUFBQTtBQUFBaUQsR0FBQSxHQUxuQ3hDLFVBQW9CO0FBQUEsSUFBQUosRUFBQSxFQUFBRyxHQUFBLEVBQUF5QyxHQUFBO0FBQUFDLHNDQUFBLENBQUE3QyxFQUFBO0FBQUE2QyxzQ0FBQSxDQUFBMUMsR0FBQTtBQUFBMEMsc0NBQUEsQ0FBQUQsR0FBQSxnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDMUJqQyxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL1NhbWhhbmRsZXIvU2FtaGFuZGxlci50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBGb3JtUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1ob29rLWZvcm0nO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24gfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEJ1dHRvbiwgRmllbGRzZXQsIEhlYWRpbmcsIEhTdGFjayB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuXG5pbXBvcnQgeyBIZW50U2FtaGFuZGxlckZlbHQgfSBmcm9tICcuL0hlbnRTYW1oYW5kbGVyRmVsdCc7XG5pbXBvcnQgeyBTYW1oYW5kbGVyRmVsdG5hdm4gfSBmcm9tICcuLi8uLi9rb21wb25lbnRlci9Nb2RhbC9mYWdzYWsvZm9ybS9TYW1oYW5kbGVyRm9ybSc7XG5pbXBvcnQgeyB1c2VTYW1oYW5kbGVyRm9ybSB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL01vZGFsL2ZhZ3Nhay9ob29rcy91c2VTYW1oYW5kbGVyRm9ybSc7XG5pbXBvcnQgdHlwZSB7IElTYW1oYW5kbGVySW5mbyB9IGZyb20gJy4uLy4uL3R5cGVyL3NhbWhhbmRsZXInO1xuXG5jb25zdCBTYW1oYW5kbGVyQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIGhlaWdodDogY2FsYygxMDB2aCAtIDUwcHgpO1xuYDtcblxuY29uc3QgSGVudFNha2VyQnV0dG9uID0gc3R5bGVkKEJ1dHRvbilgXG4gICAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gICAgbWFyZ2luLXRvcDogMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiBhdXRvO1xuICAgIGhlaWdodDogM3JlbTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTYW1oYW5kbGVyOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gICAgY29uc3QgW3NhbWhhbmRsZXIsIHNldFNhbWhhbmRsZXJdID0gdXNlU3RhdGU8SVNhbWhhbmRsZXJJbmZvIHwgbnVsbD4obnVsbCk7XG4gICAgY29uc29sZS5sb2coc2FtaGFuZGxlcik7XG5cbiAgICBjb25zdCB7IGZvcm0sIG9uU3VibWl0IH0gPSB1c2VTYW1oYW5kbGVyRm9ybSh7XG4gICAgICAgIHNldHRTYW1oYW5kbGVyOiBzYW1oYW5kbGVyID0+IHtcbiAgICAgICAgICAgIHNldFNhbWhhbmRsZXIoc2FtaGFuZGxlcik7XG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIGhhbmRsZVN1Ym1pdCxcbiAgICAgICAgZm9ybVN0YXRlOiB7IGlzU3VibWl0dGluZywgZXJyb3JzIH0sXG4gICAgfSA9IGZvcm07XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAobG9jYXRpb24uc3RhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gbG9jYXRpb24uc3RhdGUgYXMgeyBicnVrZXI6IHN0cmluZyB9O1xuICAgICAgICAgICAgZm9ybS5zZXRWYWx1ZShTYW1oYW5kbGVyRmVsdG5hdm4uT1JHTlIsIHN0YXRlLmJydWtlcik7XG4gICAgICAgICAgICBoYW5kbGVTdWJtaXQob25TdWJtaXQpKGZvcm0uZ2V0VmFsdWVzKCkpO1xuICAgICAgICB9XG4gICAgfSwgW10pO1xuXG4gICAgY29uc29sZS5sb2coZXJyb3JzKTtcbiAgICByZXR1cm4gKFxuICAgICAgICA8U2FtaGFuZGxlckNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9IGxldmVsPXsnMSd9PlxuICAgICAgICAgICAgICAgIFPDuGsgc2FtaGFuZGxlclxuICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgPEhTdGFjayBtYXJnaW5CbG9jaz17J3NwYWNlLTMyJ30+XG4gICAgICAgICAgICAgICAgPEZvcm1Qcm92aWRlciB7Li4uZm9ybX0+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXQob25TdWJtaXQpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZHNldCAvL2Vycm9yPXtlcnJvcnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kPVwiU8O4ayBzYW1oYW5kbGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlTGVnZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEhlbnRTYW1oYW5kbGVyRmVsdCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9GaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxIZW50U2FrZXJCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PXsncHJpbWFyeSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17J3N1Ym1pdCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZz17aXNTdWJtaXR0aW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc1N1Ym1pdHRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVudCBzYW1oYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0hlbnRTYWtlckJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgIDwvRm9ybVByb3ZpZGVyPlxuICAgICAgICAgICAgPC9IU3RhY2s+XG5cbiAgICAgICAgICAgIHtzYW1oYW5kbGVyICE9PSB1bmRlZmluZWQgJiYgKFxuICAgICAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9PlxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlci50c3NFa3N0ZXJuSWR9IHtzYW1oYW5kbGVyLm5hdm59IDxiciAvPlxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlci5hZHJlc3NlclswXS5hZHJlc3NlVHlwZX0ge3NhbWhhbmRsZXIuYWRyZXNzZXJbMF0ucG9zdFN0ZWR9XG4gICAgICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9TYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICk7XG59O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiNDEwN2RkZTQ0Yjk0OTJmMzFiZDVcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkZvcm1Qcm92aWRlciIsInVzZUxvY2F0aW9uIiwic3R5bGVkIiwiQnV0dG9uIiwiRmllbGRzZXQiLCJIZWFkaW5nIiwiSFN0YWNrIiwiSGVudFNhbWhhbmRsZXJGZWx0IiwiU2FtaGFuZGxlckZlbHRuYXZuIiwidXNlU2FtaGFuZGxlckZvcm0iLCJTYW1oYW5kbGVyQ29udGFpbmVyIiwiZGl2IiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbCIsIl9jIiwiSGVudFNha2VyQnV0dG9uIiwiX3RlbXBsYXRlT2JqZWN0MiIsIl9jMiIsIlNhbWhhbmRsZXIiLCJfcyIsImxvY2F0aW9uIiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5Iiwic2FtaGFuZGxlciIsInNldFNhbWhhbmRsZXIiLCJjb25zb2xlIiwibG9nIiwiX3VzZVNhbWhhbmRsZXJGb3JtIiwic2V0dFNhbWhhbmRsZXIiLCJmb3JtIiwib25TdWJtaXQiLCJoYW5kbGVTdWJtaXQiLCJfZm9ybSRmb3JtU3RhdGUiLCJmb3JtU3RhdGUiLCJpc1N1Ym1pdHRpbmciLCJlcnJvcnMiLCJzdGF0ZSIsInNldFZhbHVlIiwiT1JHTlIiLCJicnVrZXIiLCJnZXRWYWx1ZXMiLCJjcmVhdGVFbGVtZW50Iiwic2l6ZSIsImxldmVsIiwibWFyZ2luQmxvY2siLCJsZWdlbmQiLCJoaWRlTGVnZW5kIiwidmFyaWFudCIsInR5cGUiLCJsb2FkaW5nIiwiZGlzYWJsZWQiLCJ1bmRlZmluZWQiLCJ0c3NFa3N0ZXJuSWQiLCJuYXZuIiwiYWRyZXNzZXIiLCJhZHJlc3NlVHlwZSIsInBvc3RTdGVkIiwiX2MzIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==