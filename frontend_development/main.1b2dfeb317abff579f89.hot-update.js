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
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @navikt/familie-typer */ "./node_modules/@navikt/familie-typer/dist/index.js");
/* harmony import */ var _HentSamhandlerFelt__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HentSamhandlerFelt */ "./src/frontend/sider/Samhandler/HentSamhandlerFelt.tsx");
/* harmony import */ var _hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../hooks/useSamhandlerdataForOrgNrConfig */ "./src/frontend/hooks/useSamhandlerdataForOrgNrConfig.ts");
/* harmony import */ var _komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../komponenter/Samhandler/useSamhandler */ "./src/frontend/komponenter/Samhandler/useSamhandler.ts");
/* harmony import */ var _utils_ressursUtils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/ressursUtils */ "./src/frontend/utils/ressursUtils.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject,
  _templateObject2,
  _s = __webpack_require__.$Refresh$.signature();
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }











var SamhandlerContainer = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    padding: 1rem;\n    overflow: auto;\n    height: calc(100vh - 50px);\n"])));
_c = SamhandlerContainer;
var HentSakerButton = (0,styled_components__WEBPACK_IMPORTED_MODULE_5__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Button)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    margin-left: 1rem;\n    margin-top: 2rem;\n    margin-bottom: auto;\n    height: 3rem;\n"])));
_c2 = HentSakerButton;
var Samhandler = function Samhandler() {
  _s();
  var _useSamhandlerSkjema = (0,_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_10__.useSamhandlerSkjema)(),
    form = _useSamhandlerSkjema.form,
    onSubmit = _useSamhandlerSkjema.onSubmit,
    onSubmitWrapper = _useSamhandlerSkjema.onSubmitWrapper,
    samhandlerSkjema = _useSamhandlerSkjema.samhandlerSkjema;
  var queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();
  var samhandlerdata = queryClient.getQueryState(_hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_9__.HentSamhandlerdataForOrgNrConfigQueryKeyFactory.org(form.getValues(_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_10__.Fields.ORG_NR)));
  var location = (0,react_router__WEBPACK_IMPORTED_MODULE_4__.useLocation)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (location.state) {
      var state = location.state;
      samhandlerSkjema.felter.orgnr.validerOgSettFelt(state.bruker);
      onSubmitWrapper();
    }
  }, []);
  var skjemaErLåst = samhandlerSkjema.submitRessurs.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_7__.RessursStatus.HENTER;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(SamhandlerContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Heading, {
    size: 'large',
    level: '1'
  }, "S\xF8k samhandler"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.HStack, {
    marginBlock: 'space-32'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.FormProvider, form, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
    onSubmit: form.handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Fieldset, {
    error: (0,_utils_ressursUtils__WEBPACK_IMPORTED_MODULE_11__.hentFrontendFeilmelding)(samhandlerSkjema.submitRessurs),
    legend: "S\xF8k samhandler",
    hideLegend: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.TextField, _extends({}, samhandlerSkjema.felter.orgnr.hentNavInputProps(samhandlerSkjema.visFeilmeldinger), {
    id: 'hent-samhandler',
    label: 'Skriv inn orgnr',
    size: "medium",
    placeholder: 'orgnr'
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_HentSamhandlerFelt__WEBPACK_IMPORTED_MODULE_8__.HentSamhandlerFelt, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HentSakerButton, {
    variant: 'primary',
    type: 'submit',
    loading: skjemaErLåst,
    disabled: skjemaErLåst
  }, "Hent samhandler")))), samhandlerSkjema.submitRessurs.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_7__.RessursStatus.SUKSESS ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Heading, {
    size: 'large'
  }, samhandlerSkjema.submitRessurs.data.tssEksternId, " ", samhandlerSkjema.submitRessurs.data.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), samhandlerSkjema.submitRessurs.data.adresser[0].adresseType, ' ', samhandlerSkjema.submitRessurs.data.adresser[0].postSted) : undefined);
};
_s(Samhandler, "80jwHW1D/8GGHU+37PbqWBbHCoY=", false, function () {
  return [_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_10__.useSamhandlerSkjema, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient, react_router__WEBPACK_IMPORTED_MODULE_4__.useLocation];
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
/******/ 	__webpack_require__.h = () => ("b910e78c7a4a87894085")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvU2FtaGFuZGxlci9TYW1oYW5kbGVyLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlUXVlcnlDbGllbnQgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknO1xuaW1wb3J0IHsgRm9ybVByb3ZpZGVyIH0gZnJvbSAncmVhY3QtaG9vay1mb3JtJztcbmltcG9ydCB7IHVzZUxvY2F0aW9uIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBCdXR0b24sIEZpZWxkc2V0LCBIZWFkaW5nLCBIU3RhY2ssIFRleHRGaWVsZCB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHsgUmVzc3Vyc1N0YXR1cyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5cbmltcG9ydCB7IEhlbnRTYW1oYW5kbGVyRmVsdCB9IGZyb20gJy4vSGVudFNhbWhhbmRsZXJGZWx0JztcbmltcG9ydCB7IEhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5IH0gZnJvbSAnLi4vLi4vaG9va3MvdXNlU2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyc7XG5pbXBvcnQgeyBGaWVsZHMsIHVzZVNhbWhhbmRsZXJTa2plbWEgfSBmcm9tICcuLi8uLi9rb21wb25lbnRlci9TYW1oYW5kbGVyL3VzZVNhbWhhbmRsZXInO1xuaW1wb3J0IHsgaGVudEZyb250ZW5kRmVpbG1lbGRpbmcgfSBmcm9tICcuLi8uLi91dGlscy9yZXNzdXJzVXRpbHMnO1xuXG5jb25zdCBTYW1oYW5kbGVyQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIGhlaWdodDogY2FsYygxMDB2aCAtIDUwcHgpO1xuYDtcblxuY29uc3QgSGVudFNha2VyQnV0dG9uID0gc3R5bGVkKEJ1dHRvbilgXG4gICAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gICAgbWFyZ2luLXRvcDogMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiBhdXRvO1xuICAgIGhlaWdodDogM3JlbTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTYW1oYW5kbGVyOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGZvcm0sIG9uU3VibWl0LCBvblN1Ym1pdFdyYXBwZXIsIHNhbWhhbmRsZXJTa2plbWEgfSA9IHVzZVNhbWhhbmRsZXJTa2plbWEoKTtcbiAgICBjb25zdCBxdWVyeUNsaWVudCA9IHVzZVF1ZXJ5Q2xpZW50KCk7XG5cbiAgICBjb25zdCBzYW1oYW5kbGVyZGF0YSA9IHF1ZXJ5Q2xpZW50LmdldFF1ZXJ5U3RhdGUoXG4gICAgICAgIEhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5Lm9yZyhmb3JtLmdldFZhbHVlcyhGaWVsZHMuT1JHX05SKSlcbiAgICApO1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zdGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZSBhcyB7IGJydWtlcjogc3RyaW5nIH07XG4gICAgICAgICAgICBzYW1oYW5kbGVyU2tqZW1hLmZlbHRlci5vcmduci52YWxpZGVyT2dTZXR0RmVsdChzdGF0ZS5icnVrZXIpO1xuICAgICAgICAgICAgb25TdWJtaXRXcmFwcGVyKCk7XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBza2plbWFFckzDpXN0ID0gc2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5IRU5URVI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8U2FtaGFuZGxlckNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9IGxldmVsPXsnMSd9PlxuICAgICAgICAgICAgICAgIFPDuGsgc2FtaGFuZGxlclxuICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgPEhTdGFjayBtYXJnaW5CbG9jaz17J3NwYWNlLTMyJ30+XG4gICAgICAgICAgICAgICAgPEZvcm1Qcm92aWRlciB7Li4uZm9ybX0+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtmb3JtLmhhbmRsZVN1Ym1pdChvblN1Ym1pdCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZpZWxkc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I9e2hlbnRGcm9udGVuZEZlaWxtZWxkaW5nKHNhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kPVwiU8O4ayBzYW1oYW5kbGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlTGVnZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4uc2FtaGFuZGxlclNramVtYS5mZWx0ZXIub3JnbnIuaGVudE5hdklucHV0UHJvcHMoc2FtaGFuZGxlclNramVtYS52aXNGZWlsbWVsZGluZ2VyKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9eydoZW50LXNhbWhhbmRsZXInfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17J1Nrcml2IGlubiBvcmducid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCJtZWRpdW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17J29yZ25yJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxIZW50U2FtaGFuZGxlckZlbHQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNha2VyQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD17J3ByaW1hcnknfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9eydzdWJtaXQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e3NramVtYUVyTMOlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3NramVtYUVyTMOlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVudCBzYW1oYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0hlbnRTYWtlckJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgIDwvRm9ybVByb3ZpZGVyPlxuICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5TVUtTRVNTID8gKFxuICAgICAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9PlxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEudHNzRWtzdGVybklkfSB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEubmF2bn0gPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS5hZHJlc3NlclswXS5hZHJlc3NlVHlwZX17JyAnfVxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEuYWRyZXNzZXJbMF0ucG9zdFN0ZWR9XG4gICAgICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgKSA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIHsvKnNhbWhhbmRsZXJkYXRhICE9PSB1bmRlZmluZWQgPyAoXG4gICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyZGF0YS50c3NFa3N0ZXJuSWR9IHtzYW1oYW5kbGVyZGF0YS5uYXZufSA8YnIgLz5cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJkYXRhLmFkcmVzc2VyWzBdLmFkcmVzc2VUeXBlfSB7c2FtaGFuZGxlcmRhdGEuYWRyZXNzZXJbMF0ucG9zdFN0ZWR9XG4gICAgICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgKSA6IHVuZGVmaW5lZCAqL31cbiAgICAgICAgPC9TYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICk7XG59O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiYjkxMGU3OGM3YTRhODc4OTQwODVcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VRdWVyeUNsaWVudCIsIkZvcm1Qcm92aWRlciIsInVzZUxvY2F0aW9uIiwic3R5bGVkIiwiQnV0dG9uIiwiRmllbGRzZXQiLCJIZWFkaW5nIiwiSFN0YWNrIiwiVGV4dEZpZWxkIiwiUmVzc3Vyc1N0YXR1cyIsIkhlbnRTYW1oYW5kbGVyRmVsdCIsIkhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5IiwiRmllbGRzIiwidXNlU2FtaGFuZGxlclNramVtYSIsImhlbnRGcm9udGVuZEZlaWxtZWxkaW5nIiwiU2FtaGFuZGxlckNvbnRhaW5lciIsImRpdiIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJfYyIsIkhlbnRTYWtlckJ1dHRvbiIsIl90ZW1wbGF0ZU9iamVjdDIiLCJfYzIiLCJTYW1oYW5kbGVyIiwiX3MiLCJfdXNlU2FtaGFuZGxlclNramVtYSIsImZvcm0iLCJvblN1Ym1pdCIsIm9uU3VibWl0V3JhcHBlciIsInNhbWhhbmRsZXJTa2plbWEiLCJxdWVyeUNsaWVudCIsInNhbWhhbmRsZXJkYXRhIiwiZ2V0UXVlcnlTdGF0ZSIsIm9yZyIsImdldFZhbHVlcyIsIk9SR19OUiIsImxvY2F0aW9uIiwic3RhdGUiLCJmZWx0ZXIiLCJvcmduciIsInZhbGlkZXJPZ1NldHRGZWx0IiwiYnJ1a2VyIiwic2tqZW1hRXJMw6VzdCIsInN1Ym1pdFJlc3N1cnMiLCJzdGF0dXMiLCJIRU5URVIiLCJjcmVhdGVFbGVtZW50Iiwic2l6ZSIsImxldmVsIiwibWFyZ2luQmxvY2siLCJoYW5kbGVTdWJtaXQiLCJlcnJvciIsImxlZ2VuZCIsImhpZGVMZWdlbmQiLCJfZXh0ZW5kcyIsImhlbnROYXZJbnB1dFByb3BzIiwidmlzRmVpbG1lbGRpbmdlciIsImlkIiwibGFiZWwiLCJwbGFjZWhvbGRlciIsInZhcmlhbnQiLCJ0eXBlIiwibG9hZGluZyIsImRpc2FibGVkIiwiU1VLU0VTUyIsImRhdGEiLCJ0c3NFa3N0ZXJuSWQiLCJuYXZuIiwiYWRyZXNzZXIiLCJhZHJlc3NlVHlwZSIsInBvc3RTdGVkIiwidW5kZWZpbmVkIiwiX2MzIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==