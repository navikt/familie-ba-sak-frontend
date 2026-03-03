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
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject,
  _templateObject2,
  _s = __webpack_require__.$Refresh$.signature();
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }








var SamhandlerContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    padding: 1rem;\n    overflow: auto;\n    height: calc(100vh - 50px);\n"])));
_c = SamhandlerContainer;
var HentSakerButton = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Button)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    margin-left: 1rem;\n    margin-top: 2rem;\n    margin-bottom: auto;\n    height: 3rem;\n"])));
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
    marginBlock: 'space-32'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_8__.FormProvider, form, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Fieldset, {
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
    type: 'submit',
    loading: skjemaErLåst,
    disabled: skjemaErLåst,
    onClick: onSubmitWrapper
  }, "Hent samhandler")))), samhandlerSkjema.submitRessurs.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__.RessursStatus.SUKSESS ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Heading, {
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
/******/ 	__webpack_require__.h = () => ("11053b26e6e0a1a39cc7")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixJQUFJLENBQUNDLFlBQVksRUFBQyxHQUFDLEVBQUMvQixnQkFBZ0IsQ0FBQ1EsYUFBYSxDQUFDc0IsSUFBSSxDQUFDRSxJQUFJLEVBQUMsR0FBQyxlQUFBMUQsMERBQUEsV0FBSyxDQUFDLEVBQ25HMEIsZ0JBQWdCLENBQUNRLGFBQWEsQ0FBQ3NCLElBQUksQ0FBQ0csUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDQyxXQUFXLEVBQUUsR0FBRyxFQUNoRWxDLGdCQUFnQixDQUFDUSxhQUFhLENBQUNzQixJQUFJLENBQUNHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0UsUUFDNUMsQ0FBQyxHQUNWQyxTQUNhLENBQUM7QUFFOUIsQ0FBQztBQUFDeEMsRUFBQSxDQXhEV0QsVUFBb0I7RUFBQSxRQUN1Qlgsc0ZBQW1CLEVBRXREUixxREFBVztBQUFBO0FBQUE2RCxHQUFBLEdBSG5CMUMsVUFBb0I7QUFBQSxJQUFBSixFQUFBLEVBQUFHLEdBQUEsRUFBQTJDLEdBQUE7QUFBQUMsc0NBQUEsQ0FBQS9DLEVBQUE7QUFBQStDLHNDQUFBLENBQUE1QyxHQUFBO0FBQUE0QyxzQ0FBQSxDQUFBRCxHQUFBLGdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUN6QmpDLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvU2FtaGFuZGxlci9TYW1oYW5kbGVyLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlTG9jYXRpb24gfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEJ1dHRvbiwgRmllbGRzZXQsIEhlYWRpbmcsIEhTdGFjaywgVGV4dEZpZWxkIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcblxuaW1wb3J0IHsgdXNlU2FtaGFuZGxlclNramVtYSB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL1NhbWhhbmRsZXIvdXNlU2FtaGFuZGxlcic7XG5pbXBvcnQgeyBoZW50RnJvbnRlbmRGZWlsbWVsZGluZyB9IGZyb20gJy4uLy4uL3V0aWxzL3Jlc3N1cnNVdGlscyc7XG5pbXBvcnQgeyBGb3JtUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1ob29rLWZvcm0nO1xuXG5jb25zdCBTYW1oYW5kbGVyQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIGhlaWdodDogY2FsYygxMDB2aCAtIDUwcHgpO1xuYDtcblxuY29uc3QgSGVudFNha2VyQnV0dG9uID0gc3R5bGVkKEJ1dHRvbilgXG4gICAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gICAgbWFyZ2luLXRvcDogMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiBhdXRvO1xuICAgIGhlaWdodDogM3JlbTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTYW1oYW5kbGVyOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGZvcm0sIG9uU3VibWl0V3JhcHBlciwgc2FtaGFuZGxlclNramVtYSB9ID0gdXNlU2FtaGFuZGxlclNramVtYSgpO1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zdGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZSBhcyB7IGJydWtlcjogc3RyaW5nIH07XG4gICAgICAgICAgICBzYW1oYW5kbGVyU2tqZW1hLmZlbHRlci5vcmduci52YWxpZGVyT2dTZXR0RmVsdChzdGF0ZS5icnVrZXIpO1xuICAgICAgICAgICAgb25TdWJtaXRXcmFwcGVyKCk7XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBza2plbWFFckzDpXN0ID0gc2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5IRU5URVI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8U2FtaGFuZGxlckNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9IGxldmVsPXsnMSd9PlxuICAgICAgICAgICAgICAgIFPDuGsgc2FtaGFuZGxlclxuICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgPEhTdGFjayBtYXJnaW5CbG9jaz17J3NwYWNlLTMyJ30+XG4gICAgICAgICAgICAgICAgPEZvcm1Qcm92aWRlciB7Li4uZm9ybX0+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZpZWxkc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I9e2hlbnRGcm9udGVuZEZlaWxtZWxkaW5nKHNhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kPVwiU8O4ayBzYW1oYW5kbGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlTGVnZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4uc2FtaGFuZGxlclNramVtYS5mZWx0ZXIub3JnbnIuaGVudE5hdklucHV0UHJvcHMoc2FtaGFuZGxlclNramVtYS52aXNGZWlsbWVsZGluZ2VyKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9eydoZW50LXNhbWhhbmRsZXInfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17J1Nrcml2IGlubiBvcmducid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCJtZWRpdW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17J29yZ25yJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9GaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxIZW50U2FrZXJCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PXsncHJpbWFyeSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17J3N1Ym1pdCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZz17c2tqZW1hRXJMw6VzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17c2tqZW1hRXJMw6VzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvblN1Ym1pdFdyYXBwZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVudCBzYW1oYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0hlbnRTYWtlckJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgIDwvRm9ybVByb3ZpZGVyPlxuICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5TVUtTRVNTID8gKFxuICAgICAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9PlxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEudHNzRWtzdGVybklkfSB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEubmF2bn0gPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS5hZHJlc3NlclswXS5hZHJlc3NlVHlwZX17JyAnfVxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEuYWRyZXNzZXJbMF0ucG9zdFN0ZWR9XG4gICAgICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgKSA6IHVuZGVmaW5lZH1cbiAgICAgICAgPC9TYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICk7XG59O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMTEwNTNiMjZlNmUwYTFhMzljYzdcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VMb2NhdGlvbiIsInN0eWxlZCIsIkJ1dHRvbiIsIkZpZWxkc2V0IiwiSGVhZGluZyIsIkhTdGFjayIsIlRleHRGaWVsZCIsIlJlc3N1cnNTdGF0dXMiLCJ1c2VTYW1oYW5kbGVyU2tqZW1hIiwiaGVudEZyb250ZW5kRmVpbG1lbGRpbmciLCJGb3JtUHJvdmlkZXIiLCJTYW1oYW5kbGVyQ29udGFpbmVyIiwiZGl2IiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbCIsIl9jIiwiSGVudFNha2VyQnV0dG9uIiwiX3RlbXBsYXRlT2JqZWN0MiIsIl9jMiIsIlNhbWhhbmRsZXIiLCJfcyIsIl91c2VTYW1oYW5kbGVyU2tqZW1hIiwiZm9ybSIsIm9uU3VibWl0V3JhcHBlciIsInNhbWhhbmRsZXJTa2plbWEiLCJsb2NhdGlvbiIsInN0YXRlIiwiZmVsdGVyIiwib3JnbnIiLCJ2YWxpZGVyT2dTZXR0RmVsdCIsImJydWtlciIsInNramVtYUVyTMOlc3QiLCJzdWJtaXRSZXNzdXJzIiwic3RhdHVzIiwiSEVOVEVSIiwiY3JlYXRlRWxlbWVudCIsInNpemUiLCJsZXZlbCIsIm1hcmdpbkJsb2NrIiwiZXJyb3IiLCJsZWdlbmQiLCJoaWRlTGVnZW5kIiwiX2V4dGVuZHMiLCJoZW50TmF2SW5wdXRQcm9wcyIsInZpc0ZlaWxtZWxkaW5nZXIiLCJpZCIsImxhYmVsIiwicGxhY2Vob2xkZXIiLCJ2YXJpYW50IiwidHlwZSIsImxvYWRpbmciLCJkaXNhYmxlZCIsIm9uQ2xpY2siLCJTVUtTRVNTIiwiZGF0YSIsInRzc0Vrc3Rlcm5JZCIsIm5hdm4iLCJhZHJlc3NlciIsImFkcmVzc2VUeXBlIiwicG9zdFN0ZWQiLCJ1bmRlZmluZWQiLCJfYzMiLCIkUmVmcmVzaFJlZyQiXSwic291cmNlUm9vdCI6IiJ9