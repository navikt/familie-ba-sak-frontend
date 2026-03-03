"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/sider/Samhandler/HentSamhandlerFelt.tsx"
/*!**************************************************************!*\
  !*** ./src/frontend/sider/Samhandler/HentSamhandlerFelt.tsx ***!
  \**************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HentSamhandlerFelt: () => (/* binding */ HentSamhandlerFelt)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../komponenter/Samhandler/useSamhandler */ "./src/frontend/komponenter/Samhandler/useSamhandler.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _s = __webpack_require__.$Refresh$.signature();
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }




function HentSamhandlerFelt() {
  _s();
  var _errors$Fields$ORG_NR;
  var _useFormContext = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useFormContext)(),
    register = _useFormContext.register,
    _useFormContext$formS = _useFormContext.formState,
    isSubmitting = _useFormContext$formS.isSubmitting,
    errors = _useFormContext$formS.errors;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.TextField, _extends({}, register(_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_4__.Fields.ORG_NR, {
    required: 'Begrunnelse for manuell registrering av dødsfall er påkrevd.'
  }), {
    error: (_errors$Fields$ORG_NR = errors[_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_4__.Fields.ORG_NR]) === null || _errors$Fields$ORG_NR === void 0 ? void 0 : _errors$Fields$ORG_NR.message,
    label: 'Skriv inn orgnr',
    size: "medium",
    disabled: isSubmitting,
    placeholder: 'orgnr'
  }));
}
_s(HentSamhandlerFelt, "ARa5kCWf5RlKjRnwkQ6cOXvMGRY=", false, function () {
  return [react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useFormContext];
});
_c = HentSamhandlerFelt;
var _c;
__webpack_require__.$Refresh$.register(_c, "HentSamhandlerFelt");

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

/***/ },

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
  var queryData = queryClient.getQueryData(_hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_9__.HentSamhandlerdataForOrgNrConfigQueryKeyFactory.org(form.getValues(_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_10__.Fields.ORG_NR)));
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
  }, samhandlerSkjema.submitRessurs.data.tssEksternId, " ", samhandlerSkjema.submitRessurs.data.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), samhandlerSkjema.submitRessurs.data.adresser[0].adresseType, ' ', samhandlerSkjema.submitRessurs.data.adresser[0].postSted) : undefined, queryData !== null && queryData !== void 0 && queryData.data ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Heading, {
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
/******/ 	__webpack_require__.h = () => ("b33b9f76838ddc7caab7")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5kNTI2MzQ2ZTliY2Y3ZjYxNjg3MC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUV1QjtBQUVKO0FBRXdDO0FBRTlFLFNBQVNJLGtCQUFrQkEsQ0FBQSxFQUFHO0VBQUFDLEVBQUE7RUFBQSxJQUFBQyxxQkFBQTtFQUNqQyxJQUFBQyxlQUFBLEdBR0lOLCtEQUFjLENBQWEsQ0FBQztJQUY1Qk8sUUFBUSxHQUFBRCxlQUFBLENBQVJDLFFBQVE7SUFBQUMscUJBQUEsR0FBQUYsZUFBQSxDQUNSRyxTQUFTO0lBQUlDLFlBQVksR0FBQUYscUJBQUEsQ0FBWkUsWUFBWTtJQUFFQyxNQUFNLEdBQUFILHFCQUFBLENBQU5HLE1BQU07RUFFckMsb0JBQ0laLDBEQUFBLENBQUNFLHVEQUFTLEVBQUFZLFFBQUEsS0FDRk4sUUFBUSxDQUFDTCx5RUFBTSxDQUFDWSxNQUFNLEVBQUU7SUFDeEJDLFFBQVEsRUFBRTtFQUNkLENBQUMsQ0FBQztJQUNGQyxLQUFLLEdBQUFYLHFCQUFBLEdBQUVNLE1BQU0sQ0FBQ1QseUVBQU0sQ0FBQ1ksTUFBTSxDQUFDLGNBQUFULHFCQUFBLHVCQUFyQkEscUJBQUEsQ0FBdUJZLE9BQVE7SUFDdENDLEtBQUssRUFBRSxpQkFBa0I7SUFDekJDLElBQUksRUFBQyxRQUFRO0lBQ2JDLFFBQVEsRUFBRVYsWUFBYTtJQUN2QlcsV0FBVyxFQUFFO0VBQVEsRUFDeEIsQ0FBQztBQUVWO0FBQUNqQixFQUFBLENBakJlRCxrQkFBa0I7RUFBQSxRQUkxQkgsMkRBQWM7QUFBQTtBQUFBc0IsRUFBQSxHQUpObkIsa0JBQWtCO0FBQUEsSUFBQW1CLEVBQUE7QUFBQUMsc0NBQUEsQ0FBQUQsRUFBQSx3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUk87QUFFYztBQUNSO0FBQ0o7QUFDSjtBQUV5QztBQUMxQjtB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QUFXLEVBQUUsR0FBRyxFQUNoRXBDLGdCQUFnQixDQUFDaUIsYUFBYSxDQUFDZSxJQUFJLENBQUNHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0UsUUFDNUMsQ0FBQyxHQUNWQyxTQUNhLENBQUM7QUFFOUIsQ0FBQztBQUFDbkYsRUFBQSxDQXRFV3dDLFVBQW9CO0VBQUEsUUFDaUNULHVGQUFtQixFQUM3RFYsaUVBQWMsRUFRakJFLHFEQUFXO0FBQUE7QUFBQTZELEdBQUEsR0FWbkI1QyxVQUFvQjtBQUFBLElBQUF0QixFQUFBLEVBQUFxQixHQUFBLEVBQUE2QyxHQUFBO0FBQUFqRSxzQ0FBQSxDQUFBRCxFQUFBO0FBQUFDLHNDQUFBLENBQUFvQixHQUFBO0FBQUFwQixzQ0FBQSxDQUFBaUUsR0FBQSxnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDNUJqQyxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL1NhbWhhbmRsZXIvSGVudFNhbWhhbmRsZXJGZWx0LnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9TYW1oYW5kbGVyL1NhbWhhbmRsZXIudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB1c2VGb3JtQ29udGV4dCB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5cbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuXG5pbXBvcnQgeyBGaWVsZHMsIHR5cGUgRm9ybVZhbHVlcyB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL1NhbWhhbmRsZXIvdXNlU2FtaGFuZGxlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBIZW50U2FtaGFuZGxlckZlbHQoKSB7XG4gICAgY29uc3Qge1xuICAgICAgICByZWdpc3RlcixcbiAgICAgICAgZm9ybVN0YXRlOiB7IGlzU3VibWl0dGluZywgZXJyb3JzIH0sXG4gICAgfSA9IHVzZUZvcm1Db250ZXh0PEZvcm1WYWx1ZXM+KCk7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgey4uLnJlZ2lzdGVyKEZpZWxkcy5PUkdfTlIsIHtcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogJ0JlZ3J1bm5lbHNlIGZvciBtYW51ZWxsIHJlZ2lzdHJlcmluZyBhdiBkw7hkc2ZhbGwgZXIgcMOla3JldmQuJyxcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgZXJyb3I9e2Vycm9yc1tGaWVsZHMuT1JHX05SXT8ubWVzc2FnZX1cbiAgICAgICAgICAgIGxhYmVsPXsnU2tyaXYgaW5uIG9yZ25yJ31cbiAgICAgICAgICAgIHNpemU9XCJtZWRpdW1cIlxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzU3VibWl0dGluZ31cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXsnb3JnbnInfVxuICAgICAgICAvPlxuICAgICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB1c2VRdWVyeUNsaWVudCB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XG5pbXBvcnQgeyBGb3JtUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1ob29rLWZvcm0nO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24gfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEJ1dHRvbiwgRmllbGRzZXQsIEhlYWRpbmcsIEhTdGFjaywgVGV4dEZpZWxkIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcblxuaW1wb3J0IHsgSGVudFNhbWhhbmRsZXJGZWx0IH0gZnJvbSAnLi9IZW50U2FtaGFuZGxlckZlbHQnO1xuaW1wb3J0IHsgSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3RvcnkgfSBmcm9tICcuLi8uLi9ob29rcy91c2VTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnJztcbmltcG9ydCB7IEZpZWxkcywgdXNlU2FtaGFuZGxlclNramVtYSB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL1NhbWhhbmRsZXIvdXNlU2FtaGFuZGxlcic7XG5pbXBvcnQgeyBoZW50RnJvbnRlbmRGZWlsbWVsZGluZyB9IGZyb20gJy4uLy4uL3V0aWxzL3Jlc3N1cnNVdGlscyc7XG5cbmNvbnN0IFNhbWhhbmRsZXJDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gNTBweCk7XG5gO1xuXG5jb25zdCBIZW50U2FrZXJCdXR0b24gPSBzdHlsZWQoQnV0dG9uKWBcbiAgICBtYXJnaW4tbGVmdDogMXJlbTtcbiAgICBtYXJnaW4tdG9wOiAycmVtO1xuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XG4gICAgaGVpZ2h0OiAzcmVtO1xuYDtcblxuZXhwb3J0IGNvbnN0IFNhbWhhbmRsZXI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZm9ybSwgb25TdWJtaXQsIG9uU3VibWl0V3JhcHBlciwgc2FtaGFuZGxlclNramVtYSB9ID0gdXNlU2FtaGFuZGxlclNramVtYSgpO1xuICAgIGNvbnN0IHF1ZXJ5Q2xpZW50ID0gdXNlUXVlcnlDbGllbnQoKTtcblxuICAgIGNvbnN0IHF1ZXJ5RGF0YSA9IHF1ZXJ5Q2xpZW50LmdldFF1ZXJ5RGF0YShcbiAgICAgICAgSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3Rvcnkub3JnKGZvcm0uZ2V0VmFsdWVzKEZpZWxkcy5PUkdfTlIpKVxuICAgICk7XG5cbiAgICBjb25zb2xlLmxvZyh7IGZvcm06IGZvcm0uZ2V0VmFsdWVzKEZpZWxkcy5PUkdfTlIpLCBza2plbWE6IHNhbWhhbmRsZXJTa2plbWEuZmVsdGVyLm9yZ25yLnZlcmRpIH0pO1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zdGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZSBhcyB7IGJydWtlcjogc3RyaW5nIH07XG4gICAgICAgICAgICBzYW1oYW5kbGVyU2tqZW1hLmZlbHRlci5vcmduci52YWxpZGVyT2dTZXR0RmVsdChzdGF0ZS5icnVrZXIpO1xuICAgICAgICAgICAgb25TdWJtaXRXcmFwcGVyKCk7XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBza2plbWFFckzDpXN0ID0gc2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5IRU5URVI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8U2FtaGFuZGxlckNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9IGxldmVsPXsnMSd9PlxuICAgICAgICAgICAgICAgIFPDuGsgc2FtaGFuZGxlclxuICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgPEhTdGFjayBtYXJnaW5CbG9jaz17J3NwYWNlLTMyJ30+XG4gICAgICAgICAgICAgICAgPEZvcm1Qcm92aWRlciB7Li4uZm9ybX0+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtmb3JtLmhhbmRsZVN1Ym1pdChvblN1Ym1pdCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZpZWxkc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I9e2hlbnRGcm9udGVuZEZlaWxtZWxkaW5nKHNhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kPVwiU8O4ayBzYW1oYW5kbGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlTGVnZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4uc2FtaGFuZGxlclNramVtYS5mZWx0ZXIub3JnbnIuaGVudE5hdklucHV0UHJvcHMoc2FtaGFuZGxlclNramVtYS52aXNGZWlsbWVsZGluZ2VyKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9eydoZW50LXNhbWhhbmRsZXInfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17J1Nrcml2IGlubiBvcmducid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCJtZWRpdW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17J29yZ25yJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxIZW50U2FtaGFuZGxlckZlbHQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNha2VyQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD17J3ByaW1hcnknfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9eydzdWJtaXQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e3NramVtYUVyTMOlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3NramVtYUVyTMOlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVudCBzYW1oYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0hlbnRTYWtlckJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgIDwvRm9ybVByb3ZpZGVyPlxuICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5TVUtTRVNTID8gKFxuICAgICAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9PlxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEudHNzRWtzdGVybklkfSB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEubmF2bn0gPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS5hZHJlc3NlclswXS5hZHJlc3NlVHlwZX17JyAnfVxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEuYWRyZXNzZXJbMF0ucG9zdFN0ZWR9XG4gICAgICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgKSA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIHtxdWVyeURhdGE/LmRhdGEgPyAoXG4gICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS50c3NFa3N0ZXJuSWR9IHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS5uYXZufSA8YnIgLz5cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5kYXRhLmFkcmVzc2VyWzBdLmFkcmVzc2VUeXBlfXsnICd9XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS5hZHJlc3NlclswXS5wb3N0U3RlZH1cbiAgICAgICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICApIDogdW5kZWZpbmVkfVxuICAgICAgICA8L1NhbWhhbmRsZXJDb250YWluZXI+XG4gICAgKTtcbn07XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJiMzNiOWY3NjgzOGRkYzdjYWFiN1wiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUZvcm1Db250ZXh0IiwiVGV4dEZpZWxkIiwiRmllbGRzIiwiSGVudFNhbWhhbmRsZXJGZWx0IiwiX3MiLCJfZXJyb3JzJEZpZWxkcyRPUkdfTlIiLCJfdXNlRm9ybUNvbnRleHQiLCJyZWdpc3RlciIsIl91c2VGb3JtQ29udGV4dCRmb3JtUyIsImZvcm1TdGF0ZSIsImlzU3VibWl0dGluZyIsImVycm9ycyIsImNyZWF0ZUVsZW1lbnQiLCJfZXh0ZW5kcyIsIk9SR19OUiIsInJlcXVpcmVkIiwiZXJyb3IiLCJtZXNzYWdlIiwibGFiZWwiLCJzaXplIiwiZGlzYWJsZWQiLCJwbGFjZWhvbGRlciIsIl9jIiwiJFJlZnJlc2hSZWckIiwidXNlRWZmZWN0IiwidXNlUXVlcnlDbGllbnQiLCJGb3JtUHJvdmlkZXIiLCJ1c2VMb2NhdGlvbiIsInN0eWxlZCIsIkJ1dHRvbiIsIkZpZWxkc2V0IiwiSGVhZGluZyIsIkhTdGFjayIsIlJlc3N1cnNTdGF0dXMiLCJIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeSIsInVzZVNhbWhhbmRsZXJTa2plbWEiLCJoZW50RnJvbnRlbmRGZWlsbWVsZGluZyIsIlNhbWhhbmRsZXJDb250YWluZXIiLCJkaXYiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiSGVudFNha2VyQnV0dG9uIiwiX3RlbXBsYXRlT2JqZWN0MiIsIl9jMiIsIlNhbWhhbmRsZXIiLCJfdXNlU2FtaGFuZGxlclNramVtYSIsImZvcm0iLCJvblN1Ym1pdCIsIm9uU3VibWl0V3JhcHBlciIsInNhbWhhbmRsZXJTa2plbWEiLCJxdWVyeUNsaWVudCIsInF1ZXJ5RGF0YSIsImdldFF1ZXJ5RGF0YSIsIm9yZyIsImdldFZhbHVlcyIsImNvbnNvbGUiLCJsb2ciLCJza2plbWEiLCJmZWx0ZXIiLCJvcmduciIsInZlcmRpIiwibG9jYXRpb24iLCJzdGF0ZSIsInZhbGlkZXJPZ1NldHRGZWx0IiwiYnJ1a2VyIiwic2tqZW1hRXJMw6VzdCIsInN1Ym1pdFJlc3N1cnMiLCJzdGF0dXMiLCJIRU5URVIiLCJsZXZlbCIsIm1hcmdpbkJsb2NrIiwiaGFuZGxlU3VibWl0IiwibGVnZW5kIiwiaGlkZUxlZ2VuZCIsImhlbnROYXZJbnB1dFByb3BzIiwidmlzRmVpbG1lbGRpbmdlciIsImlkIiwidmFyaWFudCIsInR5cGUiLCJsb2FkaW5nIiwiU1VLU0VTUyIsImRhdGEiLCJ0c3NFa3N0ZXJuSWQiLCJuYXZuIiwiYWRyZXNzZXIiLCJhZHJlc3NlVHlwZSIsInBvc3RTdGVkIiwidW5kZWZpbmVkIiwiX2MzIl0sInNvdXJjZVJvb3QiOiIifQ==