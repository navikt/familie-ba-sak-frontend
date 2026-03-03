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
/******/ 	__webpack_require__.h = () => ("348c1ebcf7a7f4a7bb13")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RDJCLFVBQVUsQ0FBQzZDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsV0FBVyxFQUFDLEdBQUMsRUFBQzlDLFVBQVUsQ0FBQzZDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0UsUUFDeEQsQ0FFSSxDQUFDO0FBRTlCLENBQUM7QUFBQ3JELEVBQUEsQ0EzRVdELFVBQW9CO0VBQUEsUUFDWmhCLHFEQUFXLEVBSURPLGdHQUFpQjtBQUFBO0FBQUFnRSxHQUFBLEdBTG5DdkQsVUFBb0I7QUFBQSxJQUFBSixFQUFBLEVBQUFHLEdBQUEsRUFBQXdELEdBQUE7QUFBQUMsc0NBQUEsQ0FBQTVELEVBQUE7QUFBQTRELHNDQUFBLENBQUF6RCxHQUFBO0FBQUF5RCxzQ0FBQSxDQUFBRCxHQUFBLGdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUMxQmpDLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvU2FtaGFuZGxlci9TYW1oYW5kbGVyLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEZvcm1Qcm92aWRlciB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5pbXBvcnQgeyB1c2VMb2NhdGlvbiB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQnV0dG9uLCBIZWFkaW5nLCBIU3RhY2sgfSBmcm9tICdAbmF2aWt0L2RzLXJlYWN0JztcblxuaW1wb3J0IHsgSGVudFNhbWhhbmRsZXJGZWx0IH0gZnJvbSAnLi9IZW50U2FtaGFuZGxlckZlbHQnO1xuaW1wb3J0IHsgU2FtaGFuZGxlckZlbHRuYXZuIH0gZnJvbSAnLi4vLi4va29tcG9uZW50ZXIvTW9kYWwvZmFnc2FrL2Zvcm0vU2FtaGFuZGxlckZvcm0nO1xuaW1wb3J0IHsgdXNlU2FtaGFuZGxlckZvcm0gfSBmcm9tICcuLi8uLi9rb21wb25lbnRlci9Nb2RhbC9mYWdzYWsvaG9va3MvdXNlU2FtaGFuZGxlckZvcm0nO1xuaW1wb3J0IHR5cGUgeyBJU2FtaGFuZGxlckluZm8gfSBmcm9tICcuLi8uLi90eXBlci9zYW1oYW5kbGVyJztcblxuY29uc3QgU2FtaGFuZGxlckNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA1MHB4KTtcbmA7XG5cbmNvbnN0IEhlbnRTYWtlckJ1dHRvbiA9IHN0eWxlZChCdXR0b24pYFxuICAgIG1hcmdpbi1sZWZ0OiAxcmVtO1xuICAgIG1hcmdpbi10b3A6IDJyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcbiAgICBoZWlnaHQ6IDNyZW07XG5gO1xuXG5leHBvcnQgY29uc3QgU2FtaGFuZGxlcjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gICAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICAgIGNvbnN0IFtzYW1oYW5kbGVyLCBzZXRTYW1oYW5kbGVyXSA9IHVzZVN0YXRlPElTYW1oYW5kbGVySW5mbyB8IG51bGw+KG51bGwpO1xuICAgIGNvbnN0IFt2YWxpZGVyaW5nRmVpbG1lbGRpbmcsIHNldFZhbGlkZXJpbmdGZWlsbWVsZGluZ10gPSB1c2VTdGF0ZTxzdHJpbmc+KCcnKTtcblxuICAgIGNvbnN0IHsgZm9ybSwgb25TdWJtaXQgfSA9IHVzZVNhbWhhbmRsZXJGb3JtKHtcbiAgICAgICAgc2V0dFNhbWhhbmRsZXI6IHNhbWhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgc2V0U2FtaGFuZGxlcihzYW1oYW5kbGVyKTtcbiAgICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgaGFuZGxlU3VibWl0LFxuICAgICAgICBmb3JtU3RhdGU6IHsgaXNTdWJtaXR0aW5nLCBlcnJvcnMgfSxcbiAgICB9ID0gZm9ybTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zdGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZSBhcyB7IGJydWtlcjogc3RyaW5nIH07XG4gICAgICAgICAgICBmb3JtLnNldFZhbHVlKFNhbWhhbmRsZXJGZWx0bmF2bi5PUkdOUiwgc3RhdGUuYnJ1a2VyKTtcbiAgICAgICAgICAgIGhhbmRsZVN1Ym1pdChvblN1Ym1pdCkoKTtcbiAgICAgICAgfVxuICAgIH0sIFtdKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxTYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30gbGV2ZWw9eycxJ30+XG4gICAgICAgICAgICAgICAgU8O4ayBzYW1oYW5kbGVyXG4gICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICA8Rm9ybVByb3ZpZGVyIHsuLi5mb3JtfT5cbiAgICAgICAgICAgICAgICA8Zm9ybVxuICAgICAgICAgICAgICAgICAgICBvblN1Ym1pdD17ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIS9eXFxkezl9JC8udGVzdChmb3JtLmdldFZhbHVlcygpW1NhbWhhbmRsZXJGZWx0bmF2bi5PUkdOUl0ucmVwbGFjZSgnICcsICcnKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYWxpZGVyaW5nRmVpbG1lbGRpbmcoJ09yZ251bW1lciBoYXIgaWtrZSA5IHRhbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlU3VibWl0KG9uU3VibWl0KShlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxIU3RhY2sgbWFyZ2luQmxvY2s9eydzcGFjZS0zMid9IGFsaWduPXsnc3RhcnQnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdHlsZWRGaWVsZHNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yPXtlcnJvcnMucm9vdD8ub25TdWJtaXRFcnJvci5tZXNzYWdlIHx8IHZhbGlkZXJpbmdGZWlsbWVsZGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmQ9XCJTw7hrIHNhbWhhbmRsZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVMZWdlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNhbWhhbmRsZXJGZWx0IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L1N0eWxlZEZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEhlbnRTYWtlckJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9eydwcmltYXJ5J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXsnc3VibWl0J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtLmdldFZhbHVlcygpW1NhbWhhbmRsZXJGZWx0bmF2bi5PUkdOUl0gIT09IHNhbWhhbmRsZXI/Lm9yZ051bW1lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2FtaGFuZGxlcihudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYWxpZGVyaW5nRmVpbG1lbGRpbmcoJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNsZWFyRXJyb3JzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nPXtpc1N1Ym1pdHRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzU3VibWl0dGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZW50IHNhbWhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvSGVudFNha2VyQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8L0Zvcm1Qcm92aWRlcj5cblxuICAgICAgICAgICAge3NhbWhhbmRsZXIgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9PlxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlci50c3NFa3N0ZXJuSWR9IHtzYW1oYW5kbGVyLm5hdm59IDxiciAvPlxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlci5hZHJlc3NlclswXS5hZHJlc3NlVHlwZX0ge3NhbWhhbmRsZXIuYWRyZXNzZXJbMF0ucG9zdFN0ZWR9XG4gICAgICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9TYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICk7XG59O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMzQ4YzFlYmNmN2E3ZjRhN2JiMTNcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkZvcm1Qcm92aWRlciIsInVzZUxvY2F0aW9uIiwic3R5bGVkIiwiQnV0dG9uIiwiSGVhZGluZyIsIkhTdGFjayIsIkhlbnRTYW1oYW5kbGVyRmVsdCIsIlNhbWhhbmRsZXJGZWx0bmF2biIsInVzZVNhbWhhbmRsZXJGb3JtIiwiU2FtaGFuZGxlckNvbnRhaW5lciIsImRpdiIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJfYyIsIkhlbnRTYWtlckJ1dHRvbiIsIl90ZW1wbGF0ZU9iamVjdDIiLCJfYzIiLCJTYW1oYW5kbGVyIiwiX3MiLCJfZXJyb3JzJHJvb3QiLCJsb2NhdGlvbiIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInNhbWhhbmRsZXIiLCJzZXRTYW1oYW5kbGVyIiwiX3VzZVN0YXRlMyIsIl91c2VTdGF0ZTQiLCJ2YWxpZGVyaW5nRmVpbG1lbGRpbmciLCJzZXRWYWxpZGVyaW5nRmVpbG1lbGRpbmciLCJfdXNlU2FtaGFuZGxlckZvcm0iLCJzZXR0U2FtaGFuZGxlciIsImZvcm0iLCJvblN1Ym1pdCIsImhhbmRsZVN1Ym1pdCIsIl9mb3JtJGZvcm1TdGF0ZSIsImZvcm1TdGF0ZSIsImlzU3VibWl0dGluZyIsImVycm9ycyIsInN0YXRlIiwic2V0VmFsdWUiLCJPUkdOUiIsImJydWtlciIsImNyZWF0ZUVsZW1lbnQiLCJzaXplIiwibGV2ZWwiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0ZXN0IiwiZ2V0VmFsdWVzIiwicmVwbGFjZSIsIm1hcmdpbkJsb2NrIiwiYWxpZ24iLCJTdHlsZWRGaWVsZHNldCIsImVycm9yIiwicm9vdCIsIm9uU3VibWl0RXJyb3IiLCJtZXNzYWdlIiwibGVnZW5kIiwiaGlkZUxlZ2VuZCIsInZhcmlhbnQiLCJ0eXBlIiwib25DbGljayIsIm9yZ051bW1lciIsImNsZWFyRXJyb3JzIiwibG9hZGluZyIsImRpc2FibGVkIiwidHNzRWtzdGVybklkIiwibmF2biIsImFkcmVzc2VyIiwiYWRyZXNzZVR5cGUiLCJwb3N0U3RlZCIsIl9jMyIsIiRSZWZyZXNoUmVnJCJdLCJzb3VyY2VSb290IjoiIn0=