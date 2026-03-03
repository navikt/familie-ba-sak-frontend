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
      handleSubmit(onSubmit)();
    }
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(SamhandlerContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Heading, {
    size: 'large',
    level: '1'
  }, "S\xF8k samhandler"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_2__.FormProvider, form, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.HStack, {
    marginBlock: 'space-32'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Fieldset, {
    error: (_errors$root = errors.root) === null || _errors$root === void 0 ? void 0 : _errors$root.onSubmitError.message,
    legend: "S\xF8k samhandler",
    hideLegend: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_HentSamhandlerFelt__WEBPACK_IMPORTED_MODULE_6__.HentSamhandlerFelt, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HentSakerButton, {
    variant: 'primary',
    type: 'submit',
    onClick: function onClick() {
      if (form.getValues()[_komponenter_Modal_fagsak_form_SamhandlerForm__WEBPACK_IMPORTED_MODULE_7__.SamhandlerFeltnavn.ORGNR] !== (samhandler === null || samhandler === void 0 ? void 0 : samhandler.orgNummer)) {
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
/******/ 	__webpack_require__.h = () => ("da5aed9f782a3e3f6cb5")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQzdDLDZGQUFrQixDQUFDOEIsS0FBSyxDQUFDLE1BQUtiLFVBQVUsYUFBVkEsVUFBVSx1QkFBVkEsVUFBVSxDQUFFNkIsU0FBUyxHQUFFO1FBQ3RFNUIsYUFBYSxDQUFDLElBQUksQ0FBQztNQUN2QjtNQUNBRyxJQUFJLENBQUMwQixXQUFXLENBQUMsQ0FBQztJQUN0QixDQUFFO0lBQ0ZDLE9BQU8sRUFBRXRCLFlBQWE7SUFDdEJ1QixRQUFRLEVBQUV2QjtFQUFhLEdBQzFCLGlCQUVnQixDQUNiLENBQ04sQ0FDSSxDQUFDLEVBRWRULFVBQVUsS0FBSyxJQUFJLGlCQUNoQjVCLDBEQUFBLENBQUNRLHFEQUFPO0lBQUNvQyxJQUFJLEVBQUU7RUFBUSxHQUNsQmhCLFVBQVUsQ0FBQ2lDLFlBQVksRUFBQyxHQUFDLEVBQUNqQyxVQUFVLENBQUNrQyxJQUFJLEVBQUMsR0FBQyxlQUFBOUQsMERBQUEsV0FBSyxDQUFDLEVBQ2pENEIsVUFBVSxDQUFDbUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDQyxXQUFXLEVBQUMsR0FBQyxFQUFDcEMsVUFBVSxDQUFDbUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDRSxRQUN4RCxDQUVJLENBQUM7QUFFOUIsQ0FBQztBQUFDM0MsRUFBQSxDQTVEV0QsVUFBb0I7RUFBQSxRQUNaakIscURBQVcsRUFHRFEsZ0dBQWlCO0FBQUE7QUFBQXNELEdBQUEsR0FKbkM3QyxVQUFvQjtBQUFBLElBQUFKLEVBQUEsRUFBQUcsR0FBQSxFQUFBOEMsR0FBQTtBQUFBQyxzQ0FBQSxDQUFBbEQsRUFBQTtBQUFBa0Qsc0NBQUEsQ0FBQS9DLEdBQUE7QUFBQStDLHNDQUFBLENBQUFELEdBQUEsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzFCakMsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9TYW1oYW5kbGVyL1NhbWhhbmRsZXIudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgRm9ybVByb3ZpZGVyIH0gZnJvbSAncmVhY3QtaG9vay1mb3JtJztcbmltcG9ydCB7IHVzZUxvY2F0aW9uIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBCdXR0b24sIEZpZWxkc2V0LCBIZWFkaW5nLCBIU3RhY2sgfSBmcm9tICdAbmF2aWt0L2RzLXJlYWN0JztcblxuaW1wb3J0IHsgSGVudFNhbWhhbmRsZXJGZWx0IH0gZnJvbSAnLi9IZW50U2FtaGFuZGxlckZlbHQnO1xuaW1wb3J0IHsgU2FtaGFuZGxlckZlbHRuYXZuIH0gZnJvbSAnLi4vLi4va29tcG9uZW50ZXIvTW9kYWwvZmFnc2FrL2Zvcm0vU2FtaGFuZGxlckZvcm0nO1xuaW1wb3J0IHsgdXNlU2FtaGFuZGxlckZvcm0gfSBmcm9tICcuLi8uLi9rb21wb25lbnRlci9Nb2RhbC9mYWdzYWsvaG9va3MvdXNlU2FtaGFuZGxlckZvcm0nO1xuaW1wb3J0IHR5cGUgeyBJU2FtaGFuZGxlckluZm8gfSBmcm9tICcuLi8uLi90eXBlci9zYW1oYW5kbGVyJztcblxuY29uc3QgU2FtaGFuZGxlckNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA1MHB4KTtcbmA7XG5cbmNvbnN0IEhlbnRTYWtlckJ1dHRvbiA9IHN0eWxlZChCdXR0b24pYFxuICAgIG1hcmdpbi1sZWZ0OiAxcmVtO1xuICAgIG1hcmdpbi10b3A6IDJyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcbiAgICBoZWlnaHQ6IDNyZW07XG5gO1xuXG5leHBvcnQgY29uc3QgU2FtaGFuZGxlcjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gICAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICAgIGNvbnN0IFtzYW1oYW5kbGVyLCBzZXRTYW1oYW5kbGVyXSA9IHVzZVN0YXRlPElTYW1oYW5kbGVySW5mbyB8IG51bGw+KG51bGwpO1xuXG4gICAgY29uc3QgeyBmb3JtLCBvblN1Ym1pdCB9ID0gdXNlU2FtaGFuZGxlckZvcm0oe1xuICAgICAgICBzZXR0U2FtaGFuZGxlcjogc2FtaGFuZGxlciA9PiB7XG4gICAgICAgICAgICBzZXRTYW1oYW5kbGVyKHNhbWhhbmRsZXIpO1xuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3Qge1xuICAgICAgICBoYW5kbGVTdWJtaXQsXG4gICAgICAgIGZvcm1TdGF0ZTogeyBpc1N1Ym1pdHRpbmcsIGVycm9ycyB9LFxuICAgIH0gPSBmb3JtO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnN0YXRlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlIGFzIHsgYnJ1a2VyOiBzdHJpbmcgfTtcbiAgICAgICAgICAgIGZvcm0uc2V0VmFsdWUoU2FtaGFuZGxlckZlbHRuYXZuLk9SR05SLCBzdGF0ZS5icnVrZXIpO1xuICAgICAgICAgICAgaGFuZGxlU3VibWl0KG9uU3VibWl0KSgpO1xuICAgICAgICB9XG4gICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPFNhbWhhbmRsZXJDb250YWluZXI+XG4gICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnbGFyZ2UnfSBsZXZlbD17JzEnfT5cbiAgICAgICAgICAgICAgICBTw7hrIHNhbWhhbmRsZXJcbiAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgIDxGb3JtUHJvdmlkZXIgey4uLmZvcm19PlxuICAgICAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXQob25TdWJtaXQpfT5cbiAgICAgICAgICAgICAgICAgICAgPEhTdGFjayBtYXJnaW5CbG9jaz17J3NwYWNlLTMyJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RmllbGRzZXQgZXJyb3I9e2Vycm9ycy5yb290Py5vblN1Ym1pdEVycm9yLm1lc3NhZ2V9IGxlZ2VuZD1cIlPDuGsgc2FtaGFuZGxlclwiIGhpZGVMZWdlbmQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEhlbnRTYW1oYW5kbGVyRmVsdCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9GaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxIZW50U2FrZXJCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PXsncHJpbWFyeSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17J3N1Ym1pdCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybS5nZXRWYWx1ZXMoKVtTYW1oYW5kbGVyRmVsdG5hdm4uT1JHTlJdICE9PSBzYW1oYW5kbGVyPy5vcmdOdW1tZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNhbWhhbmRsZXIobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNsZWFyRXJyb3JzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nPXtpc1N1Ym1pdHRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzU3VibWl0dGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZW50IHNhbWhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvSGVudFNha2VyQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8L0Zvcm1Qcm92aWRlcj5cblxuICAgICAgICAgICAge3NhbWhhbmRsZXIgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9PlxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlci50c3NFa3N0ZXJuSWR9IHtzYW1oYW5kbGVyLm5hdm59IDxiciAvPlxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlci5hZHJlc3NlclswXS5hZHJlc3NlVHlwZX0ge3NhbWhhbmRsZXIuYWRyZXNzZXJbMF0ucG9zdFN0ZWR9XG4gICAgICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9TYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICk7XG59O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZGE1YWVkOWY3ODJhM2UzZjZjYjVcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkZvcm1Qcm92aWRlciIsInVzZUxvY2F0aW9uIiwic3R5bGVkIiwiQnV0dG9uIiwiRmllbGRzZXQiLCJIZWFkaW5nIiwiSFN0YWNrIiwiSGVudFNhbWhhbmRsZXJGZWx0IiwiU2FtaGFuZGxlckZlbHRuYXZuIiwidXNlU2FtaGFuZGxlckZvcm0iLCJTYW1oYW5kbGVyQ29udGFpbmVyIiwiZGl2IiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbCIsIl9jIiwiSGVudFNha2VyQnV0dG9uIiwiX3RlbXBsYXRlT2JqZWN0MiIsIl9jMiIsIlNhbWhhbmRsZXIiLCJfcyIsIl9lcnJvcnMkcm9vdCIsImxvY2F0aW9uIiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5Iiwic2FtaGFuZGxlciIsInNldFNhbWhhbmRsZXIiLCJfdXNlU2FtaGFuZGxlckZvcm0iLCJzZXR0U2FtaGFuZGxlciIsImZvcm0iLCJvblN1Ym1pdCIsImhhbmRsZVN1Ym1pdCIsIl9mb3JtJGZvcm1TdGF0ZSIsImZvcm1TdGF0ZSIsImlzU3VibWl0dGluZyIsImVycm9ycyIsInN0YXRlIiwic2V0VmFsdWUiLCJPUkdOUiIsImJydWtlciIsImNyZWF0ZUVsZW1lbnQiLCJzaXplIiwibGV2ZWwiLCJtYXJnaW5CbG9jayIsImVycm9yIiwicm9vdCIsIm9uU3VibWl0RXJyb3IiLCJtZXNzYWdlIiwibGVnZW5kIiwiaGlkZUxlZ2VuZCIsInZhcmlhbnQiLCJ0eXBlIiwib25DbGljayIsImdldFZhbHVlcyIsIm9yZ051bW1lciIsImNsZWFyRXJyb3JzIiwibG9hZGluZyIsImRpc2FibGVkIiwidHNzRWtzdGVybklkIiwibmF2biIsImFkcmVzc2VyIiwiYWRyZXNzZVR5cGUiLCJwb3N0U3RlZCIsIl9jMyIsIiRSZWZyZXNoUmVnJCJdLCJzb3VyY2VSb290IjoiIn0=