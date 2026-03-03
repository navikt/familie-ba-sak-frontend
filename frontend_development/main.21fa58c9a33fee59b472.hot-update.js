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
  var location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    samhandler = _useState2[0],
    setSamhandler = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    bruker = _useState4[0],
    setBruker = _useState4[1];
  console.log(samhandler);
  var _useSamhandlerForm = (0,_komponenter_Modal_fagsak_hooks_useSamhandlerForm__WEBPACK_IMPORTED_MODULE_7__.useSamhandlerForm)({
      settSamhandler: function settSamhandler(samhandler) {
        setSamhandler(samhandler);
      }
    }),
    form = _useSamhandlerForm.form,
    onSubmit = _useSamhandlerForm.onSubmit;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (location.state) {
      var state = location.state;
      setBruker(state.bruker);
      handleSubmit(onSubmit)();
    }
  }, []);
  var handleSubmit = form.handleSubmit,
    _form$formState = form.formState,
    isSubmitting = _form$formState.isSubmitting,
    errors = _form$formState.errors;
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
_s(Samhandler, "O95LDrl7Bc5HW4vhzXFzl1UcReo=", false, function () {
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
/******/ 	__webpack_require__.h = () => ("19e75f093096119f44a3")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFVixZQUFhO0lBQ3RCVyxRQUFRLEVBQUVYO0VBQWEsR0FDMUIsaUJBRWdCLENBQ2YsQ0FDSSxDQUNWLENBQUMsRUFFUmhCLFVBQVUsS0FBSzRCLFNBQVMsaUJBQ3JCdEQsMERBQUEsQ0FBQ1EscURBQU87SUFBQ3FDLElBQUksRUFBRTtFQUFRLEdBQ2xCbkIsVUFBVSxDQUFDNkIsWUFBWSxFQUFDLEdBQUMsRUFBQzdCLFVBQVUsQ0FBQzhCLElBQUksRUFBQyxHQUFDLGVBQUF4RCwwREFBQSxXQUFLLENBQUMsRUFDakQwQixVQUFVLENBQUMrQixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsRUFBQyxHQUFDLEVBQUNoQyxVQUFVLENBQUMrQixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNFLFFBQ3hELENBRUksQ0FBQztBQUU5QixDQUFDO0FBQUN0QyxFQUFBLENBMURXRCxVQUFvQjtFQUFBLFFBQ1poQixxREFBVyxFQUtETyxnR0FBaUI7QUFBQTtBQUFBaUQsR0FBQSxHQU5uQ3hDLFVBQW9CO0FBQUEsSUFBQUosRUFBQSxFQUFBRyxHQUFBLEVBQUF5QyxHQUFBO0FBQUFDLHNDQUFBLENBQUE3QyxFQUFBO0FBQUE2QyxzQ0FBQSxDQUFBMUMsR0FBQTtBQUFBMEMsc0NBQUEsQ0FBQUQsR0FBQSxnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDekJqQyxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL1NhbWhhbmRsZXIvU2FtaGFuZGxlci50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBGb3JtUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1ob29rLWZvcm0nO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24gfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEJ1dHRvbiwgRmllbGRzZXQsIEhlYWRpbmcsIEhTdGFjayB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuXG5pbXBvcnQgeyBIZW50U2FtaGFuZGxlckZlbHQgfSBmcm9tICcuL0hlbnRTYW1oYW5kbGVyRmVsdCc7XG5pbXBvcnQgeyB1c2VTYW1oYW5kbGVyRm9ybSB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL01vZGFsL2ZhZ3Nhay9ob29rcy91c2VTYW1oYW5kbGVyRm9ybSc7XG5pbXBvcnQgdHlwZSB7IElTYW1oYW5kbGVySW5mbyB9IGZyb20gJy4uLy4uL3R5cGVyL3NhbWhhbmRsZXInO1xuXG5jb25zdCBTYW1oYW5kbGVyQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIGhlaWdodDogY2FsYygxMDB2aCAtIDUwcHgpO1xuYDtcblxuY29uc3QgSGVudFNha2VyQnV0dG9uID0gc3R5bGVkKEJ1dHRvbilgXG4gICAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gICAgbWFyZ2luLXRvcDogMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiBhdXRvO1xuICAgIGhlaWdodDogM3JlbTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTYW1oYW5kbGVyOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gICAgY29uc3QgW3NhbWhhbmRsZXIsIHNldFNhbWhhbmRsZXJdID0gdXNlU3RhdGU8SVNhbWhhbmRsZXJJbmZvIHwgbnVsbD4obnVsbCk7XG4gICAgY29uc3QgW2JydWtlciwgc2V0QnJ1a2VyXSA9IHVzZVN0YXRlPHN0cmluZz4oJycpO1xuICAgIGNvbnNvbGUubG9nKHNhbWhhbmRsZXIpO1xuXG4gICAgY29uc3QgeyBmb3JtLCBvblN1Ym1pdCB9ID0gdXNlU2FtaGFuZGxlckZvcm0oe1xuICAgICAgICBzZXR0U2FtaGFuZGxlcjogc2FtaGFuZGxlciA9PiB7XG4gICAgICAgICAgICBzZXRTYW1oYW5kbGVyKHNhbWhhbmRsZXIpO1xuICAgICAgICB9LFxuICAgIH0pO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zdGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZSBhcyB7IGJydWtlcjogc3RyaW5nIH07XG4gICAgICAgICAgICBzZXRCcnVrZXIoc3RhdGUuYnJ1a2VyKTtcbiAgICAgICAgICAgIGhhbmRsZVN1Ym1pdChvblN1Ym1pdCkoKTtcbiAgICAgICAgfVxuICAgIH0sIFtdKTtcbiAgICBjb25zdCB7XG4gICAgICAgIGhhbmRsZVN1Ym1pdCxcbiAgICAgICAgZm9ybVN0YXRlOiB7IGlzU3VibWl0dGluZywgZXJyb3JzIH0sXG4gICAgfSA9IGZvcm07XG5cbiAgICBjb25zb2xlLmxvZyhlcnJvcnMpO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxTYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30gbGV2ZWw9eycxJ30+XG4gICAgICAgICAgICAgICAgU8O4ayBzYW1oYW5kbGVyXG4gICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICA8SFN0YWNrIG1hcmdpbkJsb2NrPXsnc3BhY2UtMzInfT5cbiAgICAgICAgICAgICAgICA8Rm9ybVByb3ZpZGVyIHsuLi5mb3JtfT5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdChvblN1Ym1pdCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZpZWxkc2V0IC8vZXJyb3I9e2Vycm9yc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmQ9XCJTw7hrIHNhbWhhbmRsZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVMZWdlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNhbWhhbmRsZXJGZWx0IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEhlbnRTYWtlckJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9eydwcmltYXJ5J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXsnc3VibWl0J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nPXtpc1N1Ym1pdHRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzU3VibWl0dGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZW50IHNhbWhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvSGVudFNha2VyQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgPC9Gb3JtUHJvdmlkZXI+XG4gICAgICAgICAgICA8L0hTdGFjaz5cblxuICAgICAgICAgICAge3NhbWhhbmRsZXIgIT09IHVuZGVmaW5lZCAmJiAoXG4gICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyLnRzc0Vrc3Rlcm5JZH0ge3NhbWhhbmRsZXIubmF2bn0gPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyLmFkcmVzc2VyWzBdLmFkcmVzc2VUeXBlfSB7c2FtaGFuZGxlci5hZHJlc3NlclswXS5wb3N0U3RlZH1cbiAgICAgICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICApfVxuICAgICAgICA8L1NhbWhhbmRsZXJDb250YWluZXI+XG4gICAgKTtcbn07XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIxOWU3NWYwOTMwOTYxMTlmNDRhM1wiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiRm9ybVByb3ZpZGVyIiwidXNlTG9jYXRpb24iLCJzdHlsZWQiLCJCdXR0b24iLCJGaWVsZHNldCIsIkhlYWRpbmciLCJIU3RhY2siLCJIZW50U2FtaGFuZGxlckZlbHQiLCJ1c2VTYW1oYW5kbGVyRm9ybSIsIlNhbWhhbmRsZXJDb250YWluZXIiLCJkaXYiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiX2MiLCJIZW50U2FrZXJCdXR0b24iLCJfdGVtcGxhdGVPYmplY3QyIiwiX2MyIiwiU2FtaGFuZGxlciIsIl9zIiwibG9jYXRpb24iLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJzYW1oYW5kbGVyIiwic2V0U2FtaGFuZGxlciIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0IiwiYnJ1a2VyIiwic2V0QnJ1a2VyIiwiY29uc29sZSIsImxvZyIsIl91c2VTYW1oYW5kbGVyRm9ybSIsInNldHRTYW1oYW5kbGVyIiwiZm9ybSIsIm9uU3VibWl0Iiwic3RhdGUiLCJoYW5kbGVTdWJtaXQiLCJfZm9ybSRmb3JtU3RhdGUiLCJmb3JtU3RhdGUiLCJpc1N1Ym1pdHRpbmciLCJlcnJvcnMiLCJjcmVhdGVFbGVtZW50Iiwic2l6ZSIsImxldmVsIiwibWFyZ2luQmxvY2siLCJsZWdlbmQiLCJoaWRlTGVnZW5kIiwidmFyaWFudCIsInR5cGUiLCJsb2FkaW5nIiwiZGlzYWJsZWQiLCJ1bmRlZmluZWQiLCJ0c3NFa3N0ZXJuSWQiLCJuYXZuIiwiYWRyZXNzZXIiLCJhZHJlc3NlVHlwZSIsInBvc3RTdGVkIiwiX2MzIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==