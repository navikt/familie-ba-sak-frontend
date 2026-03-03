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
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @navikt/familie-typer */ "./node_modules/@navikt/familie-typer/dist/index.js");
/* harmony import */ var _komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../komponenter/Samhandler/useSamhandler */ "./src/frontend/komponenter/Samhandler/useSamhandler.ts");
/* harmony import */ var _utils_ressursUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/ressursUtils */ "./src/frontend/utils/ressursUtils.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject,
  _templateObject2,
  _s = __webpack_require__.$Refresh$.signature();
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }








var SamhandlerContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    padding: 1rem;\n    overflow: auto;\n    height: calc(100vh - 50px);\n"])));
_c = SamhandlerContainer;
var HentSakerButton = (0,styled_components__WEBPACK_IMPORTED_MODULE_4__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Button)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    margin-left: 1rem;\n    margin-top: 2rem;\n    margin-bottom: auto;\n    height: 3rem;\n"])));
_c2 = HentSakerButton;
var Samhandler = function Samhandler() {
  _s();
  var _useSamhandlerSkjema = (0,_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_7__.useSamhandlerSkjema)(),
    form = _useSamhandlerSkjema.form,
    onSubmit = _useSamhandlerSkjema.onSubmit,
    samhandlerdata = _useSamhandlerSkjema.samhandlerdata,
    samhandlerdataLaster = _useSamhandlerSkjema.samhandlerdataLaster,
    samhandlerdataError = _useSamhandlerSkjema.samhandlerdataError,
    onSubmitWrapper = _useSamhandlerSkjema.onSubmitWrapper,
    samhandlerSkjema = _useSamhandlerSkjema.samhandlerSkjema;
  var location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (location.state) {
      var state = location.state;
      samhandlerSkjema.felter.orgnr.validerOgSettFelt(state.bruker);
      onSubmitWrapper();
    }
  }, []);
  console.log(samhandlerdata);
  var skjemaErLåst = samhandlerSkjema.submitRessurs.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.RessursStatus.HENTER;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(SamhandlerContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Heading, {
    size: 'large',
    level: '1'
  }, "S\xF8k samhandler"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.HStack, {
    marginBlock: 'space-32'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_2__.FormProvider, form, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
    onSubmit: form.handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Fieldset, {
    error: (0,_utils_ressursUtils__WEBPACK_IMPORTED_MODULE_8__.hentFrontendFeilmelding)(samhandlerSkjema.submitRessurs),
    legend: "S\xF8k samhandler",
    hideLegend: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.TextField, _extends({}, samhandlerSkjema.felter.orgnr.hentNavInputProps(samhandlerSkjema.visFeilmeldinger), {
    id: 'hent-samhandler',
    label: 'Skriv inn orgnr',
    size: "medium",
    placeholder: 'orgnr'
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HentSakerButton, {
    variant: 'primary',
    type: 'submit',
    loading: skjemaErLåst,
    disabled: skjemaErLåst,
    onClick: onSubmitWrapper
  }, "Hent samhandler")))), samhandlerSkjema.submitRessurs.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.RessursStatus.SUKSESS ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Heading, {
    size: 'large'
  }, samhandlerSkjema.submitRessurs.data.tssEksternId, " ", samhandlerSkjema.submitRessurs.data.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), samhandlerSkjema.submitRessurs.data.adresser[0].adresseType, ' ', samhandlerSkjema.submitRessurs.data.adresser[0].postSted) : undefined);
};
_s(Samhandler, "DJL/9/1BWhYJxNKTjeqt7L0vn54=", false, function () {
  return [_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_7__.useSamhandlerSkjema, react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation];
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
/******/ 	__webpack_require__.h = () => ("7fd58864539b5ac220f0")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxPQUFPLEVBQUVwQixZQUFhO0lBQ3RCcUIsUUFBUSxFQUFFckIsWUFBYTtJQUN2QnNCLE9BQU8sRUFBRWhDO0VBQWdCLEdBQzVCLGlCQUVnQixDQUNmLENBQ0ksQ0FDVixDQUFDLEVBQ1JDLGdCQUFnQixDQUFDVSxhQUFhLENBQUNDLE1BQU0sS0FBSy9CLGdFQUFhLENBQUNvRCxPQUFPLGdCQUM1RDlELDBEQUFBLENBQUNPLHFEQUFPO0lBQUNxQyxJQUFJLEVBQUU7RUFBUSxHQUNsQmQsZ0JBQWdCLENBQUNVLGFBQWEsQ0FBQ3VCLElBQUksQ0FBQ0MsWUFBWSxFQUFDLEdBQUMsRUFBQ2xDLGdCQUFnQixDQUFDVSxhQUFhLENBQUN1QixJQUFJLENBQUNFLElBQUksRUFBQyxHQUFDLGVBQUFqRSwwREFBQSxXQUFLLENBQUMsRUFDbkc4QixnQkFBZ0IsQ0FBQ1UsYUFBYSxDQUFDdUIsSUFBSSxDQUFDRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsRUFBRSxHQUFHLEVBQ2hFckMsZ0JBQWdCLENBQUNVLGFBQWEsQ0FBQ3VCLElBQUksQ0FBQ0csUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDRSxRQUM1QyxDQUFDLEdBQ1ZDLFNBQ2EsQ0FBQztBQUU5QixDQUFDO0FBQUMvQyxFQUFBLENBakVXRCxVQUFvQjtFQUFBLFFBU3pCVixzRkFBbUIsRUFFTlIscURBQVc7QUFBQTtBQUFBbUUsR0FBQSxHQVhuQmpELFVBQW9CO0FBQUEsSUFBQUosRUFBQSxFQUFBRyxHQUFBLEVBQUFrRCxHQUFBO0FBQUFDLHNDQUFBLENBQUF0RCxFQUFBO0FBQUFzRCxzQ0FBQSxDQUFBbkQsR0FBQTtBQUFBbUQsc0NBQUEsQ0FBQUQsR0FBQSxnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDekJqQyxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL1NhbWhhbmRsZXIvU2FtaGFuZGxlci50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEZvcm1Qcm92aWRlciB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5pbXBvcnQgeyB1c2VMb2NhdGlvbiB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQnV0dG9uLCBGaWVsZHNldCwgSGVhZGluZywgSFN0YWNrLCBUZXh0RmllbGQgfSBmcm9tICdAbmF2aWt0L2RzLXJlYWN0JztcbmltcG9ydCB7IFJlc3N1cnNTdGF0dXMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuXG5pbXBvcnQgeyB1c2VTYW1oYW5kbGVyU2tqZW1hIH0gZnJvbSAnLi4vLi4va29tcG9uZW50ZXIvU2FtaGFuZGxlci91c2VTYW1oYW5kbGVyJztcbmltcG9ydCB7IGhlbnRGcm9udGVuZEZlaWxtZWxkaW5nIH0gZnJvbSAnLi4vLi4vdXRpbHMvcmVzc3Vyc1V0aWxzJztcblxuY29uc3QgU2FtaGFuZGxlckNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA1MHB4KTtcbmA7XG5cbmNvbnN0IEhlbnRTYWtlckJ1dHRvbiA9IHN0eWxlZChCdXR0b24pYFxuICAgIG1hcmdpbi1sZWZ0OiAxcmVtO1xuICAgIG1hcmdpbi10b3A6IDJyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcbiAgICBoZWlnaHQ6IDNyZW07XG5gO1xuXG5leHBvcnQgY29uc3QgU2FtaGFuZGxlcjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgICBmb3JtLFxuICAgICAgICBvblN1Ym1pdCxcbiAgICAgICAgc2FtaGFuZGxlcmRhdGEsXG4gICAgICAgIHNhbWhhbmRsZXJkYXRhTGFzdGVyLFxuICAgICAgICBzYW1oYW5kbGVyZGF0YUVycm9yLFxuICAgICAgICBvblN1Ym1pdFdyYXBwZXIsXG4gICAgICAgIHNhbWhhbmRsZXJTa2plbWEsXG4gICAgfSA9IHVzZVNhbWhhbmRsZXJTa2plbWEoKTtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAobG9jYXRpb24uc3RhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gbG9jYXRpb24uc3RhdGUgYXMgeyBicnVrZXI6IHN0cmluZyB9O1xuICAgICAgICAgICAgc2FtaGFuZGxlclNramVtYS5mZWx0ZXIub3JnbnIudmFsaWRlck9nU2V0dEZlbHQoc3RhdGUuYnJ1a2VyKTtcbiAgICAgICAgICAgIG9uU3VibWl0V3JhcHBlcigpO1xuICAgICAgICB9XG4gICAgfSwgW10pO1xuXG4gICAgY29uc29sZS5sb2coc2FtaGFuZGxlcmRhdGEpO1xuICAgIGNvbnN0IHNramVtYUVyTMOlc3QgPSBzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLkhFTlRFUjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxTYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30gbGV2ZWw9eycxJ30+XG4gICAgICAgICAgICAgICAgU8O4ayBzYW1oYW5kbGVyXG4gICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICA8SFN0YWNrIG1hcmdpbkJsb2NrPXsnc3BhY2UtMzInfT5cbiAgICAgICAgICAgICAgICA8Rm9ybVByb3ZpZGVyIHsuLi5mb3JtfT5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2Zvcm0uaGFuZGxlU3VibWl0KG9uU3VibWl0KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RmllbGRzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcj17aGVudEZyb250ZW5kRmVpbG1lbGRpbmcoc2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmQ9XCJTw7hrIHNhbWhhbmRsZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVMZWdlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5zYW1oYW5kbGVyU2tqZW1hLmZlbHRlci5vcmduci5oZW50TmF2SW5wdXRQcm9wcyhzYW1oYW5kbGVyU2tqZW1hLnZpc0ZlaWxtZWxkaW5nZXIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17J2hlbnQtc2FtaGFuZGxlcid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXsnU2tyaXYgaW5uIG9yZ25yJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT1cIm1lZGl1bVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXsnb3JnbnInfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEhlbnRTYWtlckJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9eydwcmltYXJ5J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXsnc3VibWl0J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nPXtza2plbWFFckzDpXN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtza2plbWFFckzDpXN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uU3VibWl0V3JhcHBlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZW50IHNhbWhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvSGVudFNha2VyQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgPC9Gb3JtUHJvdmlkZXI+XG4gICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgIHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLlNVS1NFU1MgPyAoXG4gICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS50c3NFa3N0ZXJuSWR9IHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS5uYXZufSA8YnIgLz5cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5kYXRhLmFkcmVzc2VyWzBdLmFkcmVzc2VUeXBlfXsnICd9XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS5hZHJlc3NlclswXS5wb3N0U3RlZH1cbiAgICAgICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICApIDogdW5kZWZpbmVkfVxuICAgICAgICA8L1NhbWhhbmRsZXJDb250YWluZXI+XG4gICAgKTtcbn07XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI3ZmQ1ODg2NDUzOWI1YWMyMjBmMFwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsIkZvcm1Qcm92aWRlciIsInVzZUxvY2F0aW9uIiwic3R5bGVkIiwiQnV0dG9uIiwiRmllbGRzZXQiLCJIZWFkaW5nIiwiSFN0YWNrIiwiVGV4dEZpZWxkIiwiUmVzc3Vyc1N0YXR1cyIsInVzZVNhbWhhbmRsZXJTa2plbWEiLCJoZW50RnJvbnRlbmRGZWlsbWVsZGluZyIsIlNhbWhhbmRsZXJDb250YWluZXIiLCJkaXYiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiX2MiLCJIZW50U2FrZXJCdXR0b24iLCJfdGVtcGxhdGVPYmplY3QyIiwiX2MyIiwiU2FtaGFuZGxlciIsIl9zIiwiX3VzZVNhbWhhbmRsZXJTa2plbWEiLCJmb3JtIiwib25TdWJtaXQiLCJzYW1oYW5kbGVyZGF0YSIsInNhbWhhbmRsZXJkYXRhTGFzdGVyIiwic2FtaGFuZGxlcmRhdGFFcnJvciIsIm9uU3VibWl0V3JhcHBlciIsInNhbWhhbmRsZXJTa2plbWEiLCJsb2NhdGlvbiIsInN0YXRlIiwiZmVsdGVyIiwib3JnbnIiLCJ2YWxpZGVyT2dTZXR0RmVsdCIsImJydWtlciIsImNvbnNvbGUiLCJsb2ciLCJza2plbWFFckzDpXN0Iiwic3VibWl0UmVzc3VycyIsInN0YXR1cyIsIkhFTlRFUiIsImNyZWF0ZUVsZW1lbnQiLCJzaXplIiwibGV2ZWwiLCJtYXJnaW5CbG9jayIsImhhbmRsZVN1Ym1pdCIsImVycm9yIiwibGVnZW5kIiwiaGlkZUxlZ2VuZCIsIl9leHRlbmRzIiwiaGVudE5hdklucHV0UHJvcHMiLCJ2aXNGZWlsbWVsZGluZ2VyIiwiaWQiLCJsYWJlbCIsInBsYWNlaG9sZGVyIiwidmFyaWFudCIsInR5cGUiLCJsb2FkaW5nIiwiZGlzYWJsZWQiLCJvbkNsaWNrIiwiU1VLU0VTUyIsImRhdGEiLCJ0c3NFa3N0ZXJuSWQiLCJuYXZuIiwiYWRyZXNzZXIiLCJhZHJlc3NlVHlwZSIsInBvc3RTdGVkIiwidW5kZWZpbmVkIiwiX2MzIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==