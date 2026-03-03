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
  var samhandlerdata = queryClient.getQueryData(_hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_9__.HentSamhandlerdataForOrgNrConfigQueryKeyFactory.org(form.getValues(_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_10__.Fields.ORG_NR)));
  console.log({
    form: form.getValues(_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_10__.Fields.ORG_NR),
    skjema: samhandlerSkjema.felter.orgnr.verdi
  });
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
  }, samhandlerdata.tssEksternId, " ", samhandlerdata.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), samhandlerdata.adresser[0].adresseType, ' ', samhandlerdata.adresser[0].postSted) : undefined);
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
/******/ 	__webpack_require__.h = () => ("1bb7c9fb77fdb66ba679")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUEsV0FBSyxDQUFDLEVBQ3pEaUMsY0FBYyxDQUFDeUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDQyxXQUFXLEVBQUUsR0FBRyxFQUMzQzFDLGNBQWMsQ0FBQ3lDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0UsUUFDdkIsQ0FBQyxHQUNWQyxTQUNhLENBQUM7QUFFOUIsQ0FBQztBQUFDbkQsRUFBQSxDQXRFV0QsVUFBb0I7RUFBQSxRQUNpQ1YsdUZBQW1CLEVBQzdEYixpRUFBYyxFQVFqQkUscURBQVc7QUFBQTtBQUFBMEUsR0FBQSxHQVZuQnJELFVBQW9CO0FBQUEsSUFBQUosRUFBQSxFQUFBRyxHQUFBLEVBQUFzRCxHQUFBO0FBQUFDLHNDQUFBLENBQUExRCxFQUFBO0FBQUEwRCxzQ0FBQSxDQUFBdkQsR0FBQTtBQUFBdUQsc0NBQUEsQ0FBQUQsR0FBQSxnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDNUJqQyxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL1NhbWhhbmRsZXIvU2FtaGFuZGxlci50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHVzZVF1ZXJ5Q2xpZW50IH0gZnJvbSAnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5JztcbmltcG9ydCB7IEZvcm1Qcm92aWRlciB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5pbXBvcnQgeyB1c2VMb2NhdGlvbiB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQnV0dG9uLCBGaWVsZHNldCwgSGVhZGluZywgSFN0YWNrLCBUZXh0RmllbGQgfSBmcm9tICdAbmF2aWt0L2RzLXJlYWN0JztcbmltcG9ydCB7IFJlc3N1cnNTdGF0dXMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuXG5pbXBvcnQgeyBIZW50U2FtaGFuZGxlckZlbHQgfSBmcm9tICcuL0hlbnRTYW1oYW5kbGVyRmVsdCc7XG5pbXBvcnQgeyBIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeSB9IGZyb20gJy4uLy4uL2hvb2tzL3VzZVNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcnO1xuaW1wb3J0IHsgRmllbGRzLCB1c2VTYW1oYW5kbGVyU2tqZW1hIH0gZnJvbSAnLi4vLi4va29tcG9uZW50ZXIvU2FtaGFuZGxlci91c2VTYW1oYW5kbGVyJztcbmltcG9ydCB7IGhlbnRGcm9udGVuZEZlaWxtZWxkaW5nIH0gZnJvbSAnLi4vLi4vdXRpbHMvcmVzc3Vyc1V0aWxzJztcblxuY29uc3QgU2FtaGFuZGxlckNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA1MHB4KTtcbmA7XG5cbmNvbnN0IEhlbnRTYWtlckJ1dHRvbiA9IHN0eWxlZChCdXR0b24pYFxuICAgIG1hcmdpbi1sZWZ0OiAxcmVtO1xuICAgIG1hcmdpbi10b3A6IDJyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcbiAgICBoZWlnaHQ6IDNyZW07XG5gO1xuXG5leHBvcnQgY29uc3QgU2FtaGFuZGxlcjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBmb3JtLCBvblN1Ym1pdCwgb25TdWJtaXRXcmFwcGVyLCBzYW1oYW5kbGVyU2tqZW1hIH0gPSB1c2VTYW1oYW5kbGVyU2tqZW1hKCk7XG4gICAgY29uc3QgcXVlcnlDbGllbnQgPSB1c2VRdWVyeUNsaWVudCgpO1xuXG4gICAgY29uc3Qgc2FtaGFuZGxlcmRhdGEgPSBxdWVyeUNsaWVudC5nZXRRdWVyeURhdGEoXG4gICAgICAgIEhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5Lm9yZyhmb3JtLmdldFZhbHVlcyhGaWVsZHMuT1JHX05SKSlcbiAgICApO1xuXG4gICAgY29uc29sZS5sb2coeyBmb3JtOiBmb3JtLmdldFZhbHVlcyhGaWVsZHMuT1JHX05SKSwgc2tqZW1hOiBzYW1oYW5kbGVyU2tqZW1hLmZlbHRlci5vcmduci52ZXJkaSB9KTtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAobG9jYXRpb24uc3RhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gbG9jYXRpb24uc3RhdGUgYXMgeyBicnVrZXI6IHN0cmluZyB9O1xuICAgICAgICAgICAgc2FtaGFuZGxlclNramVtYS5mZWx0ZXIub3JnbnIudmFsaWRlck9nU2V0dEZlbHQoc3RhdGUuYnJ1a2VyKTtcbiAgICAgICAgICAgIG9uU3VibWl0V3JhcHBlcigpO1xuICAgICAgICB9XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3Qgc2tqZW1hRXJMw6VzdCA9IHNhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuSEVOVEVSO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPFNhbWhhbmRsZXJDb250YWluZXI+XG4gICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnbGFyZ2UnfSBsZXZlbD17JzEnfT5cbiAgICAgICAgICAgICAgICBTw7hrIHNhbWhhbmRsZXJcbiAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgIDxIU3RhY2sgbWFyZ2luQmxvY2s9eydzcGFjZS0zMid9PlxuICAgICAgICAgICAgICAgIDxGb3JtUHJvdmlkZXIgey4uLmZvcm19PlxuICAgICAgICAgICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17Zm9ybS5oYW5kbGVTdWJtaXQob25TdWJtaXQpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZHNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yPXtoZW50RnJvbnRlbmRGZWlsbWVsZGluZyhzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZD1cIlPDuGsgc2FtaGFuZGxlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUxlZ2VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnNhbWhhbmRsZXJTa2plbWEuZmVsdGVyLm9yZ25yLmhlbnROYXZJbnB1dFByb3BzKHNhbWhhbmRsZXJTa2plbWEudmlzRmVpbG1lbGRpbmdlcil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXsnaGVudC1zYW1oYW5kbGVyJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9eydTa3JpdiBpbm4gb3JnbnInfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwibWVkaXVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9eydvcmducid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNhbWhhbmRsZXJGZWx0IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEhlbnRTYWtlckJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9eydwcmltYXJ5J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXsnc3VibWl0J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nPXtza2plbWFFckzDpXN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtza2plbWFFckzDpXN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlbnQgc2FtaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9IZW50U2FrZXJCdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICA8L0Zvcm1Qcm92aWRlcj5cbiAgICAgICAgICAgIDwvSFN0YWNrPlxuICAgICAgICAgICAge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuU1VLU0VTUyA/IChcbiAgICAgICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnbGFyZ2UnfT5cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5kYXRhLnRzc0Vrc3Rlcm5JZH0ge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5kYXRhLm5hdm59IDxiciAvPlxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEuYWRyZXNzZXJbMF0uYWRyZXNzZVR5cGV9eycgJ31cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5kYXRhLmFkcmVzc2VyWzBdLnBvc3RTdGVkfVxuICAgICAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgICkgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICB7c2FtaGFuZGxlcmRhdGEgIT09IHVuZGVmaW5lZCA/IChcbiAgICAgICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnbGFyZ2UnfT5cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJkYXRhLnRzc0Vrc3Rlcm5JZH0ge3NhbWhhbmRsZXJkYXRhLm5hdm59IDxiciAvPlxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlcmRhdGEuYWRyZXNzZXJbMF0uYWRyZXNzZVR5cGV9eycgJ31cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJkYXRhLmFkcmVzc2VyWzBdLnBvc3RTdGVkfVxuICAgICAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgICkgOiB1bmRlZmluZWR9XG4gICAgICAgIDwvU2FtaGFuZGxlckNvbnRhaW5lcj5cbiAgICApO1xufTtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjFiYjdjOWZiNzdmZGI2NmJhNjc5XCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlUXVlcnlDbGllbnQiLCJGb3JtUHJvdmlkZXIiLCJ1c2VMb2NhdGlvbiIsInN0eWxlZCIsIkJ1dHRvbiIsIkZpZWxkc2V0IiwiSGVhZGluZyIsIkhTdGFjayIsIlRleHRGaWVsZCIsIlJlc3N1cnNTdGF0dXMiLCJIZW50U2FtaGFuZGxlckZlbHQiLCJIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeSIsIkZpZWxkcyIsInVzZVNhbWhhbmRsZXJTa2plbWEiLCJoZW50RnJvbnRlbmRGZWlsbWVsZGluZyIsIlNhbWhhbmRsZXJDb250YWluZXIiLCJkaXYiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiX2MiLCJIZW50U2FrZXJCdXR0b24iLCJfdGVtcGxhdGVPYmplY3QyIiwiX2MyIiwiU2FtaGFuZGxlciIsIl9zIiwiX3VzZVNhbWhhbmRsZXJTa2plbWEiLCJmb3JtIiwib25TdWJtaXQiLCJvblN1Ym1pdFdyYXBwZXIiLCJzYW1oYW5kbGVyU2tqZW1hIiwicXVlcnlDbGllbnQiLCJzYW1oYW5kbGVyZGF0YSIsImdldFF1ZXJ5RGF0YSIsIm9yZyIsImdldFZhbHVlcyIsIk9SR19OUiIsImNvbnNvbGUiLCJsb2ciLCJza2plbWEiLCJmZWx0ZXIiLCJvcmduciIsInZlcmRpIiwibG9jYXRpb24iLCJzdGF0ZSIsInZhbGlkZXJPZ1NldHRGZWx0IiwiYnJ1a2VyIiwic2tqZW1hRXJMw6VzdCIsInN1Ym1pdFJlc3N1cnMiLCJzdGF0dXMiLCJIRU5URVIiLCJjcmVhdGVFbGVtZW50Iiwic2l6ZSIsImxldmVsIiwibWFyZ2luQmxvY2siLCJoYW5kbGVTdWJtaXQiLCJlcnJvciIsImxlZ2VuZCIsImhpZGVMZWdlbmQiLCJfZXh0ZW5kcyIsImhlbnROYXZJbnB1dFByb3BzIiwidmlzRmVpbG1lbGRpbmdlciIsImlkIiwibGFiZWwiLCJwbGFjZWhvbGRlciIsInZhcmlhbnQiLCJ0eXBlIiwibG9hZGluZyIsImRpc2FibGVkIiwiU1VLU0VTUyIsImRhdGEiLCJ0c3NFa3N0ZXJuSWQiLCJuYXZuIiwiYWRyZXNzZXIiLCJhZHJlc3NlVHlwZSIsInBvc3RTdGVkIiwidW5kZWZpbmVkIiwiX2MzIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==