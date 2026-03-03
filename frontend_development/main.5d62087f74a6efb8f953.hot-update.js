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
  var _useFormContext = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useFormContext)(),
    register = _useFormContext.register,
    _useFormContext$formS = _useFormContext.formState,
    isSubmitting = _useFormContext$formS.isSubmitting,
    errors = _useFormContext$formS.errors;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.TextField, _extends({}, register(_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_4__.Fields.ORG_NR, {
    required: 'Begrunnelse for manuell registrering av dødsfall er påkrevd.'
  }), {
    label: 'Skriv inn orgnr',
    size: "medium",
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
/* harmony import */ var _hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../hooks/useSamhandlerdataForOrgNrConfig */ "./src/frontend/hooks/useSamhandlerdataForOrgNrConfig.ts");
/* harmony import */ var _komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../komponenter/Samhandler/useSamhandler */ "./src/frontend/komponenter/Samhandler/useSamhandler.ts");
/* harmony import */ var _utils_ressursUtils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/ressursUtils */ "./src/frontend/utils/ressursUtils.ts");
/* harmony import */ var _HentSamhandlerFelt__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./HentSamhandlerFelt */ "./src/frontend/sider/Samhandler/HentSamhandlerFelt.tsx");
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
  var _useSamhandlerSkjema = (0,_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_9__.useSamhandlerSkjema)(),
    form = _useSamhandlerSkjema.form,
    onSubmit = _useSamhandlerSkjema.onSubmit,
    onSubmitWrapper = _useSamhandlerSkjema.onSubmitWrapper,
    samhandlerSkjema = _useSamhandlerSkjema.samhandlerSkjema;
  var queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();
  var samhandlerdata = queryClient.getQueryData({
    queryKey: [_hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_8__.HentSamhandlerdataForOrgNrConfigQueryKeyFactory.org(samhandlerSkjema.felter.orgnr.verdi)]
  });
  console.log({
    form: form.getValues([_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_9__.Fields.ORG_NR]),
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
  console.log({
    samhandlerdata: samhandlerdata
  });
  var skjemaErLåst = samhandlerSkjema.submitRessurs.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_7__.RessursStatus.HENTER;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(SamhandlerContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Heading, {
    size: 'large',
    level: '1'
  }, "S\xF8k samhandler"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.HStack, {
    marginBlock: 'space-32'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.FormProvider, form, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
    onSubmit: form.handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Fieldset, {
    error: (0,_utils_ressursUtils__WEBPACK_IMPORTED_MODULE_10__.hentFrontendFeilmelding)(samhandlerSkjema.submitRessurs),
    legend: "S\xF8k samhandler",
    hideLegend: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.TextField, _extends({}, samhandlerSkjema.felter.orgnr.hentNavInputProps(samhandlerSkjema.visFeilmeldinger), {
    id: 'hent-samhandler',
    label: 'Skriv inn orgnr',
    size: "medium",
    placeholder: 'orgnr'
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_HentSamhandlerFelt__WEBPACK_IMPORTED_MODULE_11__.HentSamhandlerFelt, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HentSakerButton, {
    variant: 'primary',
    type: 'submit',
    loading: skjemaErLåst,
    disabled: skjemaErLåst,
    onClick: onSubmitWrapper
  }, "Hent samhandler")))), samhandlerSkjema.submitRessurs.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_7__.RessursStatus.SUKSESS ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Heading, {
    size: 'large'
  }, samhandlerSkjema.submitRessurs.data.tssEksternId, " ", samhandlerSkjema.submitRessurs.data.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), samhandlerSkjema.submitRessurs.data.adresser[0].adresseType, ' ', samhandlerSkjema.submitRessurs.data.adresser[0].postSted) : undefined);
};
_s(Samhandler, "80jwHW1D/8GGHU+37PbqWBbHCoY=", false, function () {
  return [_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_9__.useSamhandlerSkjema, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient, react_router__WEBPACK_IMPORTED_MODULE_4__.useLocation];
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
/******/ 	__webpack_require__.h = () => ("2b8fa55db343b7d9365f")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi41ZDYyMDg3Zjc0YTZlZmI4Zjk1My5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUV1QjtBQUVKO0FBRXdDO0FBRTlFLFNBQVNJLGtCQUFrQkEsQ0FBQSxFQUFHO0VBQUFDLEVBQUE7RUFDakMsSUFBQUMsZUFBQSxHQUdJTCwrREFBYyxDQUFhLENBQUM7SUFGNUJNLFFBQVEsR0FBQUQsZUFBQSxDQUFSQyxRQUFRO0lBQUFDLHFCQUFBLEdBQUFGLGVBQUEsQ0FDUkcsU0FBUztJQUFJQyxZQUFZLEdBQUFGLHFCQUFBLENBQVpFLFlBQVk7SUFBRUMsTUFBTSxHQUFBSCxxQkFBQSxDQUFORyxNQUFNO0VBRXJDLG9CQUNJWCwwREFBQSxDQUFDRSx1REFBUyxFQUFBVyxRQUFBLEtBQ0ZOLFFBQVEsQ0FBQ0oseUVBQU0sQ0FBQ1csTUFBTSxFQUFFO0lBQ3hCQyxRQUFRLEVBQUU7RUFDZCxDQUFDLENBQUM7SUFDRkMsS0FBSyxFQUFFLGlCQUFrQjtJQUN6QkMsSUFBSSxFQUFDLFFBQVE7SUFDYkMsV0FBVyxFQUFFO0VBQVEsRUFDeEIsQ0FBQztBQUVWO0FBQUNiLEVBQUEsQ0FmZUQsa0JBQWtCO0VBQUEsUUFJMUJILDJEQUFjO0FBQUE7QUFBQWtCLEVBQUEsR0FKTmYsa0JBQWtCO0FBQUEsSUFBQWUsRUFBQTtBQUFBQyxzQ0FBQSxDQUFBRCxFQUFBLHdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSTztBQUVjO0FBQ1I7QUFDSjtBQUNKO0FBRXlDO0FBQzFCO0FBRXdEO0FBQ3JCO0FBQ3RCO0FBQ1Q7QUFFMUQsSUFBTWUsbUJBQW1CLEdBQUdULHlEQUFNLENBQUNVLEdBQUcsQ0FBQUMsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLHNCQUFBLG9GQUlyQztBQUFDbEIsRUFBQSxHQUpJZSxtQkFBbUI7QUFNekIsSUFBTUksZUFB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ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL1NhbWhhbmRsZXIvSGVudFNhbWhhbmRsZXJGZWx0LnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9TYW1oYW5kbGVyL1NhbWhhbmRsZXIudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB1c2VGb3JtQ29udGV4dCB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5cbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuXG5pbXBvcnQgeyBGaWVsZHMsIHR5cGUgRm9ybVZhbHVlcyB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL1NhbWhhbmRsZXIvdXNlU2FtaGFuZGxlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBIZW50U2FtaGFuZGxlckZlbHQoKSB7XG4gICAgY29uc3Qge1xuICAgICAgICByZWdpc3RlcixcbiAgICAgICAgZm9ybVN0YXRlOiB7IGlzU3VibWl0dGluZywgZXJyb3JzIH0sXG4gICAgfSA9IHVzZUZvcm1Db250ZXh0PEZvcm1WYWx1ZXM+KCk7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgey4uLnJlZ2lzdGVyKEZpZWxkcy5PUkdfTlIsIHtcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogJ0JlZ3J1bm5lbHNlIGZvciBtYW51ZWxsIHJlZ2lzdHJlcmluZyBhdiBkw7hkc2ZhbGwgZXIgcMOla3JldmQuJyxcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgbGFiZWw9eydTa3JpdiBpbm4gb3JnbnInfVxuICAgICAgICAgICAgc2l6ZT1cIm1lZGl1bVwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17J29yZ25yJ31cbiAgICAgICAgLz5cbiAgICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlUXVlcnlDbGllbnQgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknO1xuaW1wb3J0IHsgRm9ybVByb3ZpZGVyIH0gZnJvbSAncmVhY3QtaG9vay1mb3JtJztcbmltcG9ydCB7IHVzZUxvY2F0aW9uIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBCdXR0b24sIEZpZWxkc2V0LCBIZWFkaW5nLCBIU3RhY2ssIFRleHRGaWVsZCB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHsgUmVzc3Vyc1N0YXR1cyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5cbmltcG9ydCB7IEhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5IH0gZnJvbSAnLi4vLi4vaG9va3MvdXNlU2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyc7XG5pbXBvcnQgeyBGaWVsZHMsIHVzZVNhbWhhbmRsZXJTa2plbWEgfSBmcm9tICcuLi8uLi9rb21wb25lbnRlci9TYW1oYW5kbGVyL3VzZVNhbWhhbmRsZXInO1xuaW1wb3J0IHsgaGVudEZyb250ZW5kRmVpbG1lbGRpbmcgfSBmcm9tICcuLi8uLi91dGlscy9yZXNzdXJzVXRpbHMnO1xuaW1wb3J0IHsgSGVudFNhbWhhbmRsZXJGZWx0IH0gZnJvbSAnLi9IZW50U2FtaGFuZGxlckZlbHQnO1xuXG5jb25zdCBTYW1oYW5kbGVyQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIGhlaWdodDogY2FsYygxMDB2aCAtIDUwcHgpO1xuYDtcblxuY29uc3QgSGVudFNha2VyQnV0dG9uID0gc3R5bGVkKEJ1dHRvbilgXG4gICAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gICAgbWFyZ2luLXRvcDogMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiBhdXRvO1xuICAgIGhlaWdodDogM3JlbTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTYW1oYW5kbGVyOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGZvcm0sIG9uU3VibWl0LCBvblN1Ym1pdFdyYXBwZXIsIHNhbWhhbmRsZXJTa2plbWEgfSA9IHVzZVNhbWhhbmRsZXJTa2plbWEoKTtcbiAgICBjb25zdCBxdWVyeUNsaWVudCA9IHVzZVF1ZXJ5Q2xpZW50KCk7XG5cbiAgICBjb25zdCBzYW1oYW5kbGVyZGF0YSA9IHF1ZXJ5Q2xpZW50LmdldFF1ZXJ5RGF0YSh7XG4gICAgICAgIHF1ZXJ5S2V5OiBbSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3Rvcnkub3JnKHNhbWhhbmRsZXJTa2plbWEuZmVsdGVyLm9yZ25yLnZlcmRpKV0sXG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZyh7IGZvcm06IGZvcm0uZ2V0VmFsdWVzKFtGaWVsZHMuT1JHX05SXSksIHNramVtYTogc2FtaGFuZGxlclNramVtYS5mZWx0ZXIub3JnbnIudmVyZGkgfSk7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnN0YXRlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlIGFzIHsgYnJ1a2VyOiBzdHJpbmcgfTtcbiAgICAgICAgICAgIHNhbWhhbmRsZXJTa2plbWEuZmVsdGVyLm9yZ25yLnZhbGlkZXJPZ1NldHRGZWx0KHN0YXRlLmJydWtlcik7XG4gICAgICAgICAgICBvblN1Ym1pdFdyYXBwZXIoKTtcbiAgICAgICAgfVxuICAgIH0sIFtdKTtcblxuICAgIGNvbnNvbGUubG9nKHtcbiAgICAgICAgc2FtaGFuZGxlcmRhdGEsXG4gICAgfSk7XG4gICAgY29uc3Qgc2tqZW1hRXJMw6VzdCA9IHNhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuSEVOVEVSO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPFNhbWhhbmRsZXJDb250YWluZXI+XG4gICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnbGFyZ2UnfSBsZXZlbD17JzEnfT5cbiAgICAgICAgICAgICAgICBTw7hrIHNhbWhhbmRsZXJcbiAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgIDxIU3RhY2sgbWFyZ2luQmxvY2s9eydzcGFjZS0zMid9PlxuICAgICAgICAgICAgICAgIDxGb3JtUHJvdmlkZXIgey4uLmZvcm19PlxuICAgICAgICAgICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17Zm9ybS5oYW5kbGVTdWJtaXQob25TdWJtaXQpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZHNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yPXtoZW50RnJvbnRlbmRGZWlsbWVsZGluZyhzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZD1cIlPDuGsgc2FtaGFuZGxlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUxlZ2VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnNhbWhhbmRsZXJTa2plbWEuZmVsdGVyLm9yZ25yLmhlbnROYXZJbnB1dFByb3BzKHNhbWhhbmRsZXJTa2plbWEudmlzRmVpbG1lbGRpbmdlcil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXsnaGVudC1zYW1oYW5kbGVyJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9eydTa3JpdiBpbm4gb3JnbnInfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwibWVkaXVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9eydvcmducid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNhbWhhbmRsZXJGZWx0Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNha2VyQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD17J3ByaW1hcnknfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9eydzdWJtaXQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e3NramVtYUVyTMOlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3NramVtYUVyTMOlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25TdWJtaXRXcmFwcGVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlbnQgc2FtaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9IZW50U2FrZXJCdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICA8L0Zvcm1Qcm92aWRlcj5cbiAgICAgICAgICAgIDwvSFN0YWNrPlxuICAgICAgICAgICAge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuU1VLU0VTUyA/IChcbiAgICAgICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnbGFyZ2UnfT5cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5kYXRhLnRzc0Vrc3Rlcm5JZH0ge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5kYXRhLm5hdm59IDxiciAvPlxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEuYWRyZXNzZXJbMF0uYWRyZXNzZVR5cGV9eycgJ31cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5kYXRhLmFkcmVzc2VyWzBdLnBvc3RTdGVkfVxuICAgICAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgICkgOiB1bmRlZmluZWR9XG4gICAgICAgIDwvU2FtaGFuZGxlckNvbnRhaW5lcj5cbiAgICApO1xufTtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjJiOGZhNTVkYjM0M2I3ZDkzNjVmXCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRm9ybUNvbnRleHQiLCJUZXh0RmllbGQiLCJGaWVsZHMiLCJIZW50U2FtaGFuZGxlckZlbHQiLCJfcyIsIl91c2VGb3JtQ29udGV4dCIsInJlZ2lzdGVyIiwiX3VzZUZvcm1Db250ZXh0JGZvcm1TIiwiZm9ybVN0YXRlIiwiaXNTdWJtaXR0aW5nIiwiZXJyb3JzIiwiY3JlYXRlRWxlbWVudCIsIl9leHRlbmRzIiwiT1JHX05SIiwicmVxdWlyZWQiLCJsYWJlbCIsInNpemUiLCJwbGFjZWhvbGRlciIsIl9jIiwiJFJlZnJlc2hSZWckIiwidXNlRWZmZWN0IiwidXNlUXVlcnlDbGllbnQiLCJGb3JtUHJvdmlkZXIiLCJ1c2VMb2NhdGlvbiIsInN0eWxlZCIsIkJ1dHRvbiIsIkZpZWxkc2V0IiwiSGVhZGluZyIsIkhTdGFjayIsIlJlc3N1cnNTdGF0dXMiLCJIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeSIsInVzZVNhbWhhbmRsZXJTa2plbWEiLCJoZW50RnJvbnRlbmRGZWlsbWVsZGluZyIsIlNhbWhhbmRsZXJDb250YWluZXIiLCJkaXYiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiSGVudFNha2VyQnV0dG9uIiwiX3RlbXBsYXRlT2JqZWN0MiIsIl9jMiIsIlNhbWhhbmRsZXIiLCJfdXNlU2FtaGFuZGxlclNramVtYSIsImZvcm0iLCJvblN1Ym1pdCIsIm9uU3VibWl0V3JhcHBlciIsInNhbWhhbmRsZXJTa2plbWEiLCJxdWVyeUNsaWVudCIsInNhbWhhbmRsZXJkYXRhIiwiZ2V0UXVlcnlEYXRhIiwicXVlcnlLZXkiLCJvcmciLCJmZWx0ZXIiLCJvcmduciIsInZlcmRpIiwiY29uc29sZSIsImxvZyIsImdldFZhbHVlcyIsInNramVtYSIsImxvY2F0aW9uIiwic3RhdGUiLCJ2YWxpZGVyT2dTZXR0RmVsdCIsImJydWtlciIsInNramVtYUVyTMOlc3QiLCJzdWJtaXRSZXNzdXJzIiwic3RhdHVzIiwiSEVOVEVSIiwibGV2ZWwiLCJtYXJnaW5CbG9jayIsImhhbmRsZVN1Ym1pdCIsImVycm9yIiwibGVnZW5kIiwiaGlkZUxlZ2VuZCIsImhlbnROYXZJbnB1dFByb3BzIiwidmlzRmVpbG1lbGRpbmdlciIsImlkIiwidmFyaWFudCIsInR5cGUiLCJsb2FkaW5nIiwiZGlzYWJsZWQiLCJvbkNsaWNrIiwiU1VLU0VTUyIsImRhdGEiLCJ0c3NFa3N0ZXJuSWQiLCJuYXZuIiwiYWRyZXNzZXIiLCJhZHJlc3NlVHlwZSIsInBvc3RTdGVkIiwidW5kZWZpbmVkIiwiX2MzIl0sInNvdXJjZVJvb3QiOiIifQ==