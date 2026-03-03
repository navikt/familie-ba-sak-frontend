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
  }, samhandlerSkjema.submitRessurs.data.tssEksternId, " ", samhandlerSkjema.submitRessurs.data.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), samhandlerSkjema.submitRessurs.data.adresser[0].adresseType, ' ', samhandlerSkjema.submitRessurs.data.adresser[0].postSted) : undefined, samhandlerdata !== undefined ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Heading, {
    size: 'large'
  }, samhandlerdata.tssEksternId, " ", samhandlerdata.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), samhandlerdata.adresser[0].adresseType, " ", samhandlerdata.adresser[0].postSted) : undefined);
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
/******/ 	__webpack_require__.h = () => ("c87106e77dd0c64806b7")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FuRVdELFVBQW9CO0VBQUEsUUFDaUNWLHVGQUFtQixFQUM3RGIsaUVBQWMsRUFNakJFLHFEQUFXO0FBQUE7QUFBQXNFLEdBQUEsR0FSbkJqRCxVQUFvQjtBQUFBLElBQUFKLEVBQUEsRUFBQUcsR0FBQSxFQUFBa0QsR0FBQTtBQUFBQyxzQ0FBQSxDQUFBdEQsRUFBQTtBQUFBc0Qsc0NBQUEsQ0FBQW5ELEdBQUE7QUFBQW1ELHNDQUFBLENBQUFELEdBQUEsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzVCakMsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9TYW1oYW5kbGVyL1NhbWhhbmRsZXIudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB1c2VRdWVyeUNsaWVudCB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XG5pbXBvcnQgeyBGb3JtUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1ob29rLWZvcm0nO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24gfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEJ1dHRvbiwgRmllbGRzZXQsIEhlYWRpbmcsIEhTdGFjaywgVGV4dEZpZWxkIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcblxuaW1wb3J0IHsgSGVudFNhbWhhbmRsZXJGZWx0IH0gZnJvbSAnLi9IZW50U2FtaGFuZGxlckZlbHQnO1xuaW1wb3J0IHsgSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3RvcnkgfSBmcm9tICcuLi8uLi9ob29rcy91c2VTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnJztcbmltcG9ydCB7IEZpZWxkcywgdXNlU2FtaGFuZGxlclNramVtYSB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL1NhbWhhbmRsZXIvdXNlU2FtaGFuZGxlcic7XG5pbXBvcnQgeyBoZW50RnJvbnRlbmRGZWlsbWVsZGluZyB9IGZyb20gJy4uLy4uL3V0aWxzL3Jlc3N1cnNVdGlscyc7XG5cbmNvbnN0IFNhbWhhbmRsZXJDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gNTBweCk7XG5gO1xuXG5jb25zdCBIZW50U2FrZXJCdXR0b24gPSBzdHlsZWQoQnV0dG9uKWBcbiAgICBtYXJnaW4tbGVmdDogMXJlbTtcbiAgICBtYXJnaW4tdG9wOiAycmVtO1xuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XG4gICAgaGVpZ2h0OiAzcmVtO1xuYDtcblxuZXhwb3J0IGNvbnN0IFNhbWhhbmRsZXI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZm9ybSwgb25TdWJtaXQsIG9uU3VibWl0V3JhcHBlciwgc2FtaGFuZGxlclNramVtYSB9ID0gdXNlU2FtaGFuZGxlclNramVtYSgpO1xuICAgIGNvbnN0IHF1ZXJ5Q2xpZW50ID0gdXNlUXVlcnlDbGllbnQoKTtcblxuICAgIGNvbnN0IHNhbWhhbmRsZXJkYXRhID0gcXVlcnlDbGllbnQuZ2V0UXVlcnlTdGF0ZShcbiAgICAgICAgSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3Rvcnkub3JnKGZvcm0uZ2V0VmFsdWVzKEZpZWxkcy5PUkdfTlIpKVxuICAgICk7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnN0YXRlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlIGFzIHsgYnJ1a2VyOiBzdHJpbmcgfTtcbiAgICAgICAgICAgIHNhbWhhbmRsZXJTa2plbWEuZmVsdGVyLm9yZ25yLnZhbGlkZXJPZ1NldHRGZWx0KHN0YXRlLmJydWtlcik7XG4gICAgICAgICAgICBvblN1Ym1pdFdyYXBwZXIoKTtcbiAgICAgICAgfVxuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IHNramVtYUVyTMOlc3QgPSBzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLkhFTlRFUjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxTYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30gbGV2ZWw9eycxJ30+XG4gICAgICAgICAgICAgICAgU8O4ayBzYW1oYW5kbGVyXG4gICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICA8SFN0YWNrIG1hcmdpbkJsb2NrPXsnc3BhY2UtMzInfT5cbiAgICAgICAgICAgICAgICA8Rm9ybVByb3ZpZGVyIHsuLi5mb3JtfT5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2Zvcm0uaGFuZGxlU3VibWl0KG9uU3VibWl0KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RmllbGRzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcj17aGVudEZyb250ZW5kRmVpbG1lbGRpbmcoc2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmQ9XCJTw7hrIHNhbWhhbmRsZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVMZWdlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5zYW1oYW5kbGVyU2tqZW1hLmZlbHRlci5vcmduci5oZW50TmF2SW5wdXRQcm9wcyhzYW1oYW5kbGVyU2tqZW1hLnZpc0ZlaWxtZWxkaW5nZXIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17J2hlbnQtc2FtaGFuZGxlcid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXsnU2tyaXYgaW5uIG9yZ25yJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT1cIm1lZGl1bVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXsnb3JnbnInfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEhlbnRTYW1oYW5kbGVyRmVsdCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9GaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxIZW50U2FrZXJCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PXsncHJpbWFyeSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17J3N1Ym1pdCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZz17c2tqZW1hRXJMw6VzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17c2tqZW1hRXJMw6VzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZW50IHNhbWhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvSGVudFNha2VyQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgPC9Gb3JtUHJvdmlkZXI+XG4gICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgIHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLlNVS1NFU1MgPyAoXG4gICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS50c3NFa3N0ZXJuSWR9IHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS5uYXZufSA8YnIgLz5cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5kYXRhLmFkcmVzc2VyWzBdLmFkcmVzc2VUeXBlfXsnICd9XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS5hZHJlc3NlclswXS5wb3N0U3RlZH1cbiAgICAgICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICApIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAge3NhbWhhbmRsZXJkYXRhICE9PSB1bmRlZmluZWQgPyAoXG4gICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyZGF0YS50c3NFa3N0ZXJuSWR9IHtzYW1oYW5kbGVyZGF0YS5uYXZufSA8YnIgLz5cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJkYXRhLmFkcmVzc2VyWzBdLmFkcmVzc2VUeXBlfSB7c2FtaGFuZGxlcmRhdGEuYWRyZXNzZXJbMF0ucG9zdFN0ZWR9XG4gICAgICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgKSA6IHVuZGVmaW5lZH1cbiAgICAgICAgPC9TYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICk7XG59O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiYzg3MTA2ZTc3ZGQwYzY0ODA2YjdcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VRdWVyeUNsaWVudCIsIkZvcm1Qcm92aWRlciIsInVzZUxvY2F0aW9uIiwic3R5bGVkIiwiQnV0dG9uIiwiRmllbGRzZXQiLCJIZWFkaW5nIiwiSFN0YWNrIiwiVGV4dEZpZWxkIiwiUmVzc3Vyc1N0YXR1cyIsIkhlbnRTYW1oYW5kbGVyRmVsdCIsIkhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5IiwiRmllbGRzIiwidXNlU2FtaGFuZGxlclNramVtYSIsImhlbnRGcm9udGVuZEZlaWxtZWxkaW5nIiwiU2FtaGFuZGxlckNvbnRhaW5lciIsImRpdiIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJfYyIsIkhlbnRTYWtlckJ1dHRvbiIsIl90ZW1wbGF0ZU9iamVjdDIiLCJfYzIiLCJTYW1oYW5kbGVyIiwiX3MiLCJfdXNlU2FtaGFuZGxlclNramVtYSIsImZvcm0iLCJvblN1Ym1pdCIsIm9uU3VibWl0V3JhcHBlciIsInNhbWhhbmRsZXJTa2plbWEiLCJxdWVyeUNsaWVudCIsInNhbWhhbmRsZXJkYXRhIiwiZ2V0UXVlcnlTdGF0ZSIsIm9yZyIsImdldFZhbHVlcyIsIk9SR19OUiIsImxvY2F0aW9uIiwic3RhdGUiLCJmZWx0ZXIiLCJvcmduciIsInZhbGlkZXJPZ1NldHRGZWx0IiwiYnJ1a2VyIiwic2tqZW1hRXJMw6VzdCIsInN1Ym1pdFJlc3N1cnMiLCJzdGF0dXMiLCJIRU5URVIiLCJjcmVhdGVFbGVtZW50Iiwic2l6ZSIsImxldmVsIiwibWFyZ2luQmxvY2siLCJoYW5kbGVTdWJtaXQiLCJlcnJvciIsImxlZ2VuZCIsImhpZGVMZWdlbmQiLCJfZXh0ZW5kcyIsImhlbnROYXZJbnB1dFByb3BzIiwidmlzRmVpbG1lbGRpbmdlciIsImlkIiwibGFiZWwiLCJwbGFjZWhvbGRlciIsInZhcmlhbnQiLCJ0eXBlIiwibG9hZGluZyIsImRpc2FibGVkIiwiU1VLU0VTUyIsImRhdGEiLCJ0c3NFa3N0ZXJuSWQiLCJuYXZuIiwiYWRyZXNzZXIiLCJhZHJlc3NlVHlwZSIsInBvc3RTdGVkIiwidW5kZWZpbmVkIiwiX2MzIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==