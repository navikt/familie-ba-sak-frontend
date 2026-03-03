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
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/familie-typer */ "./node_modules/@navikt/familie-typer/dist/index.js");
/* harmony import */ var _komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../komponenter/Samhandler/useSamhandler */ "./src/frontend/komponenter/Samhandler/useSamhandler.ts");
/* harmony import */ var _utils_ressursUtils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/ressursUtils */ "./src/frontend/utils/ressursUtils.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject,
  _templateObject2,
  _templateObject3,
  _s = __webpack_require__.$Refresh$.signature();
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }







var SamhandlerContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    padding: 1rem;\n    overflow: auto;\n    height: calc(100vh - 50px);\n"])));
_c = SamhandlerContainer;
var HentSakerFlex = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    margin-top: 2rem;\n    margin-bottom: 2rem;\n    display: flex;\n"])));
_c2 = HentSakerFlex;
var HentSakerButton = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Button)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    margin-left: 1rem;\n    margin-top: 2rem;\n    margin-bottom: auto;\n    height: 3rem;\n"])));
_c3 = HentSakerButton;
var Samhandler = function Samhandler() {
  _s();
  var _useSamhandlerSkjema = (0,_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_6__.useSamhandlerSkjema)(),
    form = _useSamhandlerSkjema.form,
    onSubmitWrapper = _useSamhandlerSkjema.onSubmitWrapper,
    samhandlerSkjema = _useSamhandlerSkjema.samhandlerSkjema;
  var location = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (location.state) {
      var state = location.state;
      samhandlerSkjema.felter.orgnr.validerOgSettFelt(state.bruker);
      onSubmitWrapper();
    }
  }, []);
  var skjemaErLåst = samhandlerSkjema.submitRessurs.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__.RessursStatus.HENTER;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(SamhandlerContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Heading, {
    size: 'large',
    level: '1'
  }, "S\xF8k samhandler"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HentSakerFlex, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Fieldset, {
    error: (0,_utils_ressursUtils__WEBPACK_IMPORTED_MODULE_7__.hentFrontendFeilmelding)(samhandlerSkjema.submitRessurs),
    legend: "S\xF8k samhandler",
    hideLegend: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.TextField, _extends({}, samhandlerSkjema.felter.orgnr.hentNavInputProps(samhandlerSkjema.visFeilmeldinger), {
    id: 'hent-samhandler',
    label: 'Skriv inn orgnr',
    size: "medium",
    placeholder: 'orgnr'
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HentSakerButton, {
    variant: 'primary',
    loading: skjemaErLåst,
    disabled: skjemaErLåst,
    onClick: onSubmitWrapper
  }, "Hent samhandler")), samhandlerSkjema.submitRessurs.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__.RessursStatus.SUKSESS ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Heading, {
    size: 'large'
  }, samhandlerSkjema.submitRessurs.data.tssEksternId, " ", samhandlerSkjema.submitRessurs.data.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), samhandlerSkjema.submitRessurs.data.adresser[0].adresseType, ' ', samhandlerSkjema.submitRessurs.data.adresser[0].postSted) : undefined);
};
_s(Samhandler, "N3iZuxkuez30GBU+8c4H32rBw24=", false, function () {
  return [_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_6__.useSamhandlerSkjema, react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation];
});
_c4 = Samhandler;
var _c, _c2, _c3, _c4;
__webpack_require__.$Refresh$.register(_c, "SamhandlerContainer");
__webpack_require__.$Refresh$.register(_c2, "HentSakerFlex");
__webpack_require__.$Refresh$.register(_c3, "HentSakerButton");
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
/******/ 	__webpack_require__.h = () => ("1391133209e9aad0acbd")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksQ0FBQ0MsWUFBWSxFQUFDLEdBQUMsRUFBQzdCLGdCQUFnQixDQUFDUSxhQUFhLENBQUNvQixJQUFJLENBQUNFLElBQUksRUFBQyxHQUFDLGVBQUF6RCwwREFBQSxXQUFLLENBQUMsRUFDbkcyQixnQkFBZ0IsQ0FBQ1EsYUFBYSxDQUFDb0IsSUFBSSxDQUFDRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsRUFBRSxHQUFHLEVBQ2hFaEMsZ0JBQWdCLENBQUNRLGFBQWEsQ0FBQ29CLElBQUksQ0FBQ0csUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDRSxRQUM1QyxDQUFDLEdBQ1ZDLFNBQ2EsQ0FBQztBQUU5QixDQUFDO0FBQUN0QyxFQUFBLENBbkRXRCxVQUFvQjtFQUFBLFFBQ3VCYixzRkFBbUIsRUFFdERQLHFEQUFXO0FBQUE7QUFBQTRELEdBQUEsR0FIbkJ4QyxVQUFvQjtBQUFBLElBQUFQLEVBQUEsRUFBQUcsR0FBQSxFQUFBRyxHQUFBLEVBQUF5QyxHQUFBO0FBQUFDLHNDQUFBLENBQUFoRCxFQUFBO0FBQUFnRCxzQ0FBQSxDQUFBN0MsR0FBQTtBQUFBNkMsc0NBQUEsQ0FBQTFDLEdBQUE7QUFBQTBDLHNDQUFBLENBQUFELEdBQUEsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzlCakMsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9TYW1oYW5kbGVyL1NhbWhhbmRsZXIudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB1c2VMb2NhdGlvbiB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQnV0dG9uLCBGaWVsZHNldCwgSGVhZGluZywgVGV4dEZpZWxkIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcblxuaW1wb3J0IHsgdXNlU2FtaGFuZGxlclNramVtYSB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL1NhbWhhbmRsZXIvdXNlU2FtaGFuZGxlcic7XG5pbXBvcnQgeyBoZW50RnJvbnRlbmRGZWlsbWVsZGluZyB9IGZyb20gJy4uLy4uL3V0aWxzL3Jlc3N1cnNVdGlscyc7XG5cbmNvbnN0IFNhbWhhbmRsZXJDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gNTBweCk7XG5gO1xuXG5jb25zdCBIZW50U2FrZXJGbGV4ID0gc3R5bGVkLmRpdmBcbiAgICBtYXJnaW4tdG9wOiAycmVtO1xuICAgIG1hcmdpbi1ib3R0b206IDJyZW07XG4gICAgZGlzcGxheTogZmxleDtcbmA7XG5cbmNvbnN0IEhlbnRTYWtlckJ1dHRvbiA9IHN0eWxlZChCdXR0b24pYFxuICAgIG1hcmdpbi1sZWZ0OiAxcmVtO1xuICAgIG1hcmdpbi10b3A6IDJyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcbiAgICBoZWlnaHQ6IDNyZW07XG5gO1xuXG5leHBvcnQgY29uc3QgU2FtaGFuZGxlcjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBmb3JtLCBvblN1Ym1pdFdyYXBwZXIsIHNhbWhhbmRsZXJTa2plbWEgfSA9IHVzZVNhbWhhbmRsZXJTa2plbWEoKTtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAobG9jYXRpb24uc3RhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gbG9jYXRpb24uc3RhdGUgYXMgeyBicnVrZXI6IHN0cmluZyB9O1xuICAgICAgICAgICAgc2FtaGFuZGxlclNramVtYS5mZWx0ZXIub3JnbnIudmFsaWRlck9nU2V0dEZlbHQoc3RhdGUuYnJ1a2VyKTtcbiAgICAgICAgICAgIG9uU3VibWl0V3JhcHBlcigpO1xuICAgICAgICB9XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3Qgc2tqZW1hRXJMw6VzdCA9IHNhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuSEVOVEVSO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPFNhbWhhbmRsZXJDb250YWluZXI+XG4gICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnbGFyZ2UnfSBsZXZlbD17JzEnfT5cbiAgICAgICAgICAgICAgICBTw7hrIHNhbWhhbmRsZXJcbiAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgIDxIZW50U2FrZXJGbGV4PlxuICAgICAgICAgICAgICAgIDxGaWVsZHNldFxuICAgICAgICAgICAgICAgICAgICBlcnJvcj17aGVudEZyb250ZW5kRmVpbG1lbGRpbmcoc2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzKX1cbiAgICAgICAgICAgICAgICAgICAgbGVnZW5kPVwiU8O4ayBzYW1oYW5kbGVyXCJcbiAgICAgICAgICAgICAgICAgICAgaGlkZUxlZ2VuZFxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnNhbWhhbmRsZXJTa2plbWEuZmVsdGVyLm9yZ25yLmhlbnROYXZJbnB1dFByb3BzKHNhbWhhbmRsZXJTa2plbWEudmlzRmVpbG1lbGRpbmdlcil9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZD17J2hlbnQtc2FtaGFuZGxlcid9XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17J1Nrcml2IGlubiBvcmducid9XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwibWVkaXVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXsnb3JnbnInfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvRmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgPEhlbnRTYWtlckJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB2YXJpYW50PXsncHJpbWFyeSd9XG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e3NramVtYUVyTMOlc3R9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtza2plbWFFckzDpXN0fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvblN1Ym1pdFdyYXBwZXJ9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBIZW50IHNhbWhhbmRsZXJcbiAgICAgICAgICAgICAgICA8L0hlbnRTYWtlckJ1dHRvbj5cbiAgICAgICAgICAgIDwvSGVudFNha2VyRmxleD5cbiAgICAgICAgICAgIHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLlNVS1NFU1MgPyAoXG4gICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS50c3NFa3N0ZXJuSWR9IHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS5uYXZufSA8YnIgLz5cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5kYXRhLmFkcmVzc2VyWzBdLmFkcmVzc2VUeXBlfXsnICd9XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS5hZHJlc3NlclswXS5wb3N0U3RlZH1cbiAgICAgICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICApIDogdW5kZWZpbmVkfVxuICAgICAgICA8L1NhbWhhbmRsZXJDb250YWluZXI+XG4gICAgKTtcbn07XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIxMzkxMTMzMjA5ZTlhYWQwYWNiZFwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZUxvY2F0aW9uIiwic3R5bGVkIiwiQnV0dG9uIiwiRmllbGRzZXQiLCJIZWFkaW5nIiwiVGV4dEZpZWxkIiwiUmVzc3Vyc1N0YXR1cyIsInVzZVNhbWhhbmRsZXJTa2plbWEiLCJoZW50RnJvbnRlbmRGZWlsbWVsZGluZyIsIlNhbWhhbmRsZXJDb250YWluZXIiLCJkaXYiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiX2MiLCJIZW50U2FrZXJGbGV4IiwiX3RlbXBsYXRlT2JqZWN0MiIsIl9jMiIsIkhlbnRTYWtlckJ1dHRvbiIsIl90ZW1wbGF0ZU9iamVjdDMiLCJfYzMiLCJTYW1oYW5kbGVyIiwiX3MiLCJfdXNlU2FtaGFuZGxlclNramVtYSIsImZvcm0iLCJvblN1Ym1pdFdyYXBwZXIiLCJzYW1oYW5kbGVyU2tqZW1hIiwibG9jYXRpb24iLCJzdGF0ZSIsImZlbHRlciIsIm9yZ25yIiwidmFsaWRlck9nU2V0dEZlbHQiLCJicnVrZXIiLCJza2plbWFFckzDpXN0Iiwic3VibWl0UmVzc3VycyIsInN0YXR1cyIsIkhFTlRFUiIsImNyZWF0ZUVsZW1lbnQiLCJzaXplIiwibGV2ZWwiLCJlcnJvciIsImxlZ2VuZCIsImhpZGVMZWdlbmQiLCJfZXh0ZW5kcyIsImhlbnROYXZJbnB1dFByb3BzIiwidmlzRmVpbG1lbGRpbmdlciIsImlkIiwibGFiZWwiLCJwbGFjZWhvbGRlciIsInZhcmlhbnQiLCJsb2FkaW5nIiwiZGlzYWJsZWQiLCJvbkNsaWNrIiwiU1VLU0VTUyIsImRhdGEiLCJ0c3NFa3N0ZXJuSWQiLCJuYXZuIiwiYWRyZXNzZXIiLCJhZHJlc3NlVHlwZSIsInBvc3RTdGVkIiwidW5kZWZpbmVkIiwiX2M0IiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==