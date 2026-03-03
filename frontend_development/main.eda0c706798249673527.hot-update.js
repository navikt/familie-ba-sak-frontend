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
var HentSakerButton = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Button)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    margin-left: 1rem;\n    margin-top: 2rem;\n    margin-bottom: auto;\n    height: 3rem;\n"])));
_c2 = HentSakerButton;
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
  }, "S\xF8k samhandler"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.HStack, {
    marginInline: 'space-32'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Fieldset, {
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
/******/ 	__webpack_require__.h = () => ("35ca55890eff33277ef1")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxDQUFDQyxZQUFZLEVBQUMsR0FBQyxFQUFDOUIsZ0JBQWdCLENBQUNRLGFBQWEsQ0FBQ3FCLElBQUksQ0FBQ0UsSUFBSSxFQUFDLEdBQUMsZUFBQTFELDBEQUFBLFdBQUssQ0FBQyxFQUNuRzJCLGdCQUFnQixDQUFDUSxhQUFhLENBQUNxQixJQUFJLENBQUNHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsV0FBVyxFQUFFLEdBQUcsRUFDaEVqQyxnQkFBZ0IsQ0FBQ1EsYUFBYSxDQUFDcUIsSUFBSSxDQUFDRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNFLFFBQzVDLENBQUMsR0FDVkMsU0FDYSxDQUFDO0FBRTlCLENBQUM7QUFBQ3ZDLEVBQUEsQ0FuRFdELFVBQW9CO0VBQUEsUUFDdUJaLHNGQUFtQixFQUV0RFIscURBQVc7QUFBQTtBQUFBNkQsR0FBQSxHQUhuQnpDLFVBQW9CO0FBQUEsSUFBQU4sRUFBQSxFQUFBSyxHQUFBLEVBQUEwQyxHQUFBO0FBQUFDLHNDQUFBLENBQUFoRCxFQUFBO0FBQUFnRCxzQ0FBQSxDQUFBM0MsR0FBQTtBQUFBMkMsc0NBQUEsQ0FBQUQsR0FBQSxnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDOUJqQyxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL1NhbWhhbmRsZXIvU2FtaGFuZGxlci50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHVzZUxvY2F0aW9uIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBCdXR0b24sIEZpZWxkc2V0LCBIZWFkaW5nLCBIU3RhY2ssIFRleHRGaWVsZCB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHsgUmVzc3Vyc1N0YXR1cyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5cbmltcG9ydCB7IHVzZVNhbWhhbmRsZXJTa2plbWEgfSBmcm9tICcuLi8uLi9rb21wb25lbnRlci9TYW1oYW5kbGVyL3VzZVNhbWhhbmRsZXInO1xuaW1wb3J0IHsgaGVudEZyb250ZW5kRmVpbG1lbGRpbmcgfSBmcm9tICcuLi8uLi91dGlscy9yZXNzdXJzVXRpbHMnO1xuXG5jb25zdCBTYW1oYW5kbGVyQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIGhlaWdodDogY2FsYygxMDB2aCAtIDUwcHgpO1xuYDtcblxuY29uc3QgSGVudFNha2VyRmxleCA9IHN0eWxlZC5kaXZgXG4gICAgbWFyZ2luLXRvcDogMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xuICAgIGRpc3BsYXk6IGZsZXg7XG5gO1xuXG5jb25zdCBIZW50U2FrZXJCdXR0b24gPSBzdHlsZWQoQnV0dG9uKWBcbiAgICBtYXJnaW4tbGVmdDogMXJlbTtcbiAgICBtYXJnaW4tdG9wOiAycmVtO1xuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XG4gICAgaGVpZ2h0OiAzcmVtO1xuYDtcblxuZXhwb3J0IGNvbnN0IFNhbWhhbmRsZXI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZm9ybSwgb25TdWJtaXRXcmFwcGVyLCBzYW1oYW5kbGVyU2tqZW1hIH0gPSB1c2VTYW1oYW5kbGVyU2tqZW1hKCk7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnN0YXRlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlIGFzIHsgYnJ1a2VyOiBzdHJpbmcgfTtcbiAgICAgICAgICAgIHNhbWhhbmRsZXJTa2plbWEuZmVsdGVyLm9yZ25yLnZhbGlkZXJPZ1NldHRGZWx0KHN0YXRlLmJydWtlcik7XG4gICAgICAgICAgICBvblN1Ym1pdFdyYXBwZXIoKTtcbiAgICAgICAgfVxuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IHNramVtYUVyTMOlc3QgPSBzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLkhFTlRFUjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxTYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30gbGV2ZWw9eycxJ30+XG4gICAgICAgICAgICAgICAgU8O4ayBzYW1oYW5kbGVyXG4gICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICA8SFN0YWNrIG1hcmdpbklubGluZT17J3NwYWNlLTMyJ30+XG4gICAgICAgICAgICAgICAgPEZpZWxkc2V0XG4gICAgICAgICAgICAgICAgICAgIGVycm9yPXtoZW50RnJvbnRlbmRGZWlsbWVsZGluZyhzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMpfVxuICAgICAgICAgICAgICAgICAgICBsZWdlbmQ9XCJTw7hrIHNhbWhhbmRsZXJcIlxuICAgICAgICAgICAgICAgICAgICBoaWRlTGVnZW5kXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4uc2FtaGFuZGxlclNramVtYS5mZWx0ZXIub3JnbnIuaGVudE5hdklucHV0UHJvcHMoc2FtaGFuZGxlclNramVtYS52aXNGZWlsbWVsZGluZ2VyKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPXsnaGVudC1zYW1oYW5kbGVyJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXsnU2tyaXYgaW5uIG9yZ25yJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCJtZWRpdW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9eydvcmducid9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9GaWVsZHNldD5cbiAgICAgICAgICAgICAgICA8SGVudFNha2VyQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9eydwcmltYXJ5J31cbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZz17c2tqZW1hRXJMw6VzdH1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3NramVtYUVyTMOlc3R9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uU3VibWl0V3JhcHBlcn1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIEhlbnQgc2FtaGFuZGxlclxuICAgICAgICAgICAgICAgIDwvSGVudFNha2VyQnV0dG9uPlxuICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5TVUtTRVNTID8gKFxuICAgICAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9PlxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEudHNzRWtzdGVybklkfSB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEubmF2bn0gPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS5hZHJlc3NlclswXS5hZHJlc3NlVHlwZX17JyAnfVxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEuYWRyZXNzZXJbMF0ucG9zdFN0ZWR9XG4gICAgICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgKSA6IHVuZGVmaW5lZH1cbiAgICAgICAgPC9TYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICk7XG59O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMzVjYTU1ODkwZWZmMzMyNzdlZjFcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VMb2NhdGlvbiIsInN0eWxlZCIsIkJ1dHRvbiIsIkZpZWxkc2V0IiwiSGVhZGluZyIsIkhTdGFjayIsIlRleHRGaWVsZCIsIlJlc3N1cnNTdGF0dXMiLCJ1c2VTYW1oYW5kbGVyU2tqZW1hIiwiaGVudEZyb250ZW5kRmVpbG1lbGRpbmciLCJTYW1oYW5kbGVyQ29udGFpbmVyIiwiZGl2IiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbCIsIl9jIiwiSGVudFNha2VyRmxleCIsIl90ZW1wbGF0ZU9iamVjdDIiLCJIZW50U2FrZXJCdXR0b24iLCJfdGVtcGxhdGVPYmplY3QzIiwiX2MyIiwiU2FtaGFuZGxlciIsIl9zIiwiX3VzZVNhbWhhbmRsZXJTa2plbWEiLCJmb3JtIiwib25TdWJtaXRXcmFwcGVyIiwic2FtaGFuZGxlclNramVtYSIsImxvY2F0aW9uIiwic3RhdGUiLCJmZWx0ZXIiLCJvcmduciIsInZhbGlkZXJPZ1NldHRGZWx0IiwiYnJ1a2VyIiwic2tqZW1hRXJMw6VzdCIsInN1Ym1pdFJlc3N1cnMiLCJzdGF0dXMiLCJIRU5URVIiLCJjcmVhdGVFbGVtZW50Iiwic2l6ZSIsImxldmVsIiwibWFyZ2luSW5saW5lIiwiZXJyb3IiLCJsZWdlbmQiLCJoaWRlTGVnZW5kIiwiX2V4dGVuZHMiLCJoZW50TmF2SW5wdXRQcm9wcyIsInZpc0ZlaWxtZWxkaW5nZXIiLCJpZCIsImxhYmVsIiwicGxhY2Vob2xkZXIiLCJ2YXJpYW50IiwibG9hZGluZyIsImRpc2FibGVkIiwib25DbGljayIsIlNVS1NFU1MiLCJkYXRhIiwidHNzRWtzdGVybklkIiwibmF2biIsImFkcmVzc2VyIiwiYWRyZXNzZVR5cGUiLCJwb3N0U3RlZCIsInVuZGVmaW5lZCIsIl9jMyIsIiRSZWZyZXNoUmVnJCJdLCJzb3VyY2VSb290IjoiIn0=