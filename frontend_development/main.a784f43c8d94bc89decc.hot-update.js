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
/* harmony import */ var _api_hentSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../api/hentSamhandlerdataForOrgNrConfig */ "./src/frontend/api/hentSamhandlerdataForOrgNrConfig.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject,
  _templateObject2,
  _s = __webpack_require__.$Refresh$.signature();
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined),
    _useState2 = _slicedToArray(_useState, 2),
    queryData = _useState2[0],
    setQueryData = _useState2[1];
  var queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();
  console.log(queryData);
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
    onSubmit: form.handleSubmit(function (e) {
      return setQueryData(queryClient.fetchQuery({
        queryKey: _hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_9__.HentSamhandlerdataForOrgNrConfigQueryKeyFactory.org(form.getValues(_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_10__.Fields.ORG_NR)),
        queryFn: function queryFn() {
          return (0,_api_hentSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_12__.hentSamhandlerdataForOrgNrConfig)(request, form.getValues(_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_10__.Fields.ORG_NR));
        }
      }));
    })
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
_s(Samhandler, "hyYCp9lYQp8zPbiWKsz+YjKRhXI=", false, function () {
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
/******/ 	__webpack_require__.h = () => ("219696b4208c0a5547cc")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5hNzg0ZjQzYzhkOTRiYzg5ZGVjYy5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUV1QjtBQUVKO0FBRXdDO0FBRTlFLFNBQVNJLGtCQUFrQkEsQ0FBQSxFQUFHO0VBQUFDLEVBQUE7RUFBQSxJQUFBQyxxQkFBQTtFQUNqQyxJQUFBQyxlQUFBLEdBR0lOLCtEQUFjLENBQWEsQ0FBQztJQUY1Qk8sUUFBUSxHQUFBRCxlQUFBLENBQVJDLFFBQVE7SUFBQUMscUJBQUEsR0FBQUYsZUFBQSxDQUNSRyxTQUFTO0lBQUlDLFlBQVksR0FBQUYscUJBQUEsQ0FBWkUsWUFBWTtJQUFFQyxNQUFNLEdBQUFILHFCQUFBLENBQU5HLE1BQU07RUFFckMsb0JBQ0laLDBEQUFBLENBQUNFLHVEQUFTLEVBQUFZLFFBQUEsS0FDRk4sUUFBUSxDQUFDTCx5RUFBTSxDQUFDWSxNQUFNLEVBQUU7SUFDeEJDLFFBQVEsRUFBRTtFQUNkLENBQUMsQ0FBQztJQUNGQyxLQUFLLEdBQUFYLHFCQUFBLEdBQUVNLE1BQU0sQ0FBQ1QseUVBQU0sQ0FBQ1ksTUFBTSxDQUFDLGNBQUFULHFCQUFBLHVCQUFyQkEscUJBQUEsQ0FBdUJZLE9BQVE7SUFDdENDLEtBQUssRUFBRSxpQkFBa0I7SUFDekJDLElBQUksRUFBQyxRQUFRO0lBQ2JDLFFBQVEsRUFBRVYsWUFBYTtJQUN2QlcsV0FBVyxFQUFFO0VBQVEsRUFDeEIsQ0FBQztBQUVWO0FBQUNqQixFQUFBLENBakJlRCxrQkFBa0I7RUFBQSxRQUkxQkgsMkRBQWM7QUFBQTtBQUFBc0IsRUFBQSxHQUpObkIsa0JBQWtCO0FBQUEsSUFBQW1CLEVBQUE7QUFBQUMsc0NBQUEsQ0FBQUQsRUFBQSx3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1JpQjtBQUVJO0FBQ1I7QUFDSjtBQUNKO0FBRXlD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R0FBQSxHQVBuQmxELFVBQW9CO0FBQUEsSUFBQXhCLEVBQUEsRUFBQXVCLEdBQUEsRUFBQW1ELEdBQUE7QUFBQXpFLHNDQUFBLENBQUFELEVBQUE7QUFBQUMsc0NBQUEsQ0FBQXNCLEdBQUE7QUFBQXRCLHNDQUFBLENBQUF5RSxHQUFBLGdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUM3QmpDLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvU2FtaGFuZGxlci9IZW50U2FtaGFuZGxlckZlbHQudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL1NhbWhhbmRsZXIvU2FtaGFuZGxlci50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHVzZUZvcm1Db250ZXh0IH0gZnJvbSAncmVhY3QtaG9vay1mb3JtJztcblxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5cbmltcG9ydCB7IEZpZWxkcywgdHlwZSBGb3JtVmFsdWVzIH0gZnJvbSAnLi4vLi4va29tcG9uZW50ZXIvU2FtaGFuZGxlci91c2VTYW1oYW5kbGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIEhlbnRTYW1oYW5kbGVyRmVsdCgpIHtcbiAgICBjb25zdCB7XG4gICAgICAgIHJlZ2lzdGVyLFxuICAgICAgICBmb3JtU3RhdGU6IHsgaXNTdWJtaXR0aW5nLCBlcnJvcnMgfSxcbiAgICB9ID0gdXNlRm9ybUNvbnRleHQ8Rm9ybVZhbHVlcz4oKTtcbiAgICByZXR1cm4gKFxuICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICB7Li4ucmVnaXN0ZXIoRmllbGRzLk9SR19OUiwge1xuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiAnQmVncnVubmVsc2UgZm9yIG1hbnVlbGwgcmVnaXN0cmVyaW5nIGF2IGTDuGRzZmFsbCBlciBww6VrcmV2ZC4nLFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICBlcnJvcj17ZXJyb3JzW0ZpZWxkcy5PUkdfTlJdPy5tZXNzYWdlfVxuICAgICAgICAgICAgbGFiZWw9eydTa3JpdiBpbm4gb3JnbnInfVxuICAgICAgICAgICAgc2l6ZT1cIm1lZGl1bVwiXG4gICAgICAgICAgICBkaXNhYmxlZD17aXNTdWJtaXR0aW5nfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9eydvcmducid9XG4gICAgICAgIC8+XG4gICAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB1c2VRdWVyeUNsaWVudCB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XG5pbXBvcnQgeyBGb3JtUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1ob29rLWZvcm0nO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24gfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEJ1dHRvbiwgRmllbGRzZXQsIEhlYWRpbmcsIEhTdGFjaywgVGV4dEZpZWxkIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcblxuaW1wb3J0IHsgSGVudFNhbWhhbmRsZXJGZWx0IH0gZnJvbSAnLi9IZW50U2FtaGFuZGxlckZlbHQnO1xuaW1wb3J0IHsgSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3RvcnkgfSBmcm9tICcuLi8uLi9ob29rcy91c2VTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnJztcbmltcG9ydCB7IEZpZWxkcywgdXNlU2FtaGFuZGxlclNramVtYSB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL1NhbWhhbmRsZXIvdXNlU2FtaGFuZGxlcic7XG5pbXBvcnQgeyBoZW50RnJvbnRlbmRGZWlsbWVsZGluZyB9IGZyb20gJy4uLy4uL3V0aWxzL3Jlc3N1cnNVdGlscyc7XG5pbXBvcnQgeyBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyB9IGZyb20gJy4uLy4uL2FwaS9oZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyc7XG5cbmNvbnN0IFNhbWhhbmRsZXJDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gNTBweCk7XG5gO1xuXG5jb25zdCBIZW50U2FrZXJCdXR0b24gPSBzdHlsZWQoQnV0dG9uKWBcbiAgICBtYXJnaW4tbGVmdDogMXJlbTtcbiAgICBtYXJnaW4tdG9wOiAycmVtO1xuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XG4gICAgaGVpZ2h0OiAzcmVtO1xuYDtcblxuZXhwb3J0IGNvbnN0IFNhbWhhbmRsZXI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZm9ybSwgb25TdWJtaXQsIG9uU3VibWl0V3JhcHBlciwgc2FtaGFuZGxlclNramVtYSB9ID0gdXNlU2FtaGFuZGxlclNramVtYSgpO1xuICAgIGNvbnN0IFtxdWVyeURhdGEsIHNldFF1ZXJ5RGF0YV0gPSB1c2VTdGF0ZSh1bmRlZmluZWQpO1xuICAgIGNvbnN0IHF1ZXJ5Q2xpZW50ID0gdXNlUXVlcnlDbGllbnQoKTtcblxuICAgIGNvbnNvbGUubG9nKHF1ZXJ5RGF0YSk7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnN0YXRlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlIGFzIHsgYnJ1a2VyOiBzdHJpbmcgfTtcbiAgICAgICAgICAgIHNhbWhhbmRsZXJTa2plbWEuZmVsdGVyLm9yZ25yLnZhbGlkZXJPZ1NldHRGZWx0KHN0YXRlLmJydWtlcik7XG4gICAgICAgICAgICBvblN1Ym1pdFdyYXBwZXIoKTtcbiAgICAgICAgfVxuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IHNramVtYUVyTMOlc3QgPSBzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLkhFTlRFUjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxTYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30gbGV2ZWw9eycxJ30+XG4gICAgICAgICAgICAgICAgU8O4ayBzYW1oYW5kbGVyXG4gICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICA8SFN0YWNrIG1hcmdpbkJsb2NrPXsnc3BhY2UtMzInfT5cbiAgICAgICAgICAgICAgICA8Rm9ybVByb3ZpZGVyIHsuLi5mb3JtfT5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VibWl0PXtmb3JtLmhhbmRsZVN1Ym1pdCgoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRRdWVyeURhdGEoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5Q2xpZW50LmZldGNoUXVlcnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlLZXk6IEhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5Lm9yZyhmb3JtLmdldFZhbHVlcyhGaWVsZHMuT1JHX05SKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeUZuOiAoKSA9PiBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyhyZXF1ZXN0LCBmb3JtLmdldFZhbHVlcyhGaWVsZHMuT1JHX05SKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZpZWxkc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I9e2hlbnRGcm9udGVuZEZlaWxtZWxkaW5nKHNhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kPVwiU8O4ayBzYW1oYW5kbGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlTGVnZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4uc2FtaGFuZGxlclNramVtYS5mZWx0ZXIub3JnbnIuaGVudE5hdklucHV0UHJvcHMoc2FtaGFuZGxlclNramVtYS52aXNGZWlsbWVsZGluZ2VyKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9eydoZW50LXNhbWhhbmRsZXInfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17J1Nrcml2IGlubiBvcmducid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCJtZWRpdW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17J29yZ25yJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxIZW50U2FtaGFuZGxlckZlbHQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNha2VyQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD17J3ByaW1hcnknfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9eydzdWJtaXQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e3NramVtYUVyTMOlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3NramVtYUVyTMOlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVudCBzYW1oYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0hlbnRTYWtlckJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgIDwvRm9ybVByb3ZpZGVyPlxuICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5TVUtTRVNTID8gKFxuICAgICAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9PlxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEudHNzRWtzdGVybklkfSB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEubmF2bn0gPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS5hZHJlc3NlclswXS5hZHJlc3NlVHlwZX17JyAnfVxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEuYWRyZXNzZXJbMF0ucG9zdFN0ZWR9XG4gICAgICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgKSA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIHsvKnNhbWhhbmRsZXJkYXRhQ2FjaGU/LnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmXG4gICAgICAgICAgICAgICAgc2FtaGFuZGxlcmRhdGFDYWNoZS5kYXRhICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgc2FtaGFuZGxlcmRhdGFDYWNoZS5kYXRhICE9PSB1bmRlZmluZWQgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnbGFyZ2UnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyZGF0YUNhY2hlLmRhdGEudHNzRWtzdGVybklkfSB7c2FtaGFuZGxlcmRhdGFDYWNoZS5kYXRhLm5hdm59IDxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJkYXRhQ2FjaGUuZGF0YS5hZHJlc3NlclswXS5hZHJlc3NlVHlwZX17JyAnfVxuICAgICAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJkYXRhQ2FjaGUuZGF0YS5hZHJlc3NlclswXS5wb3N0U3RlZH1cbiAgICAgICAgICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgICAgICkqL31cbiAgICAgICAgPC9TYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICk7XG59O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMjE5Njk2YjQyMDhjMGE1NTQ3Y2NcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VGb3JtQ29udGV4dCIsIlRleHRGaWVsZCIsIkZpZWxkcyIsIkhlbnRTYW1oYW5kbGVyRmVsdCIsIl9zIiwiX2Vycm9ycyRGaWVsZHMkT1JHX05SIiwiX3VzZUZvcm1Db250ZXh0IiwicmVnaXN0ZXIiLCJfdXNlRm9ybUNvbnRleHQkZm9ybVMiLCJmb3JtU3RhdGUiLCJpc1N1Ym1pdHRpbmciLCJlcnJvcnMiLCJjcmVhdGVFbGVtZW50IiwiX2V4dGVuZHMiLCJPUkdfTlIiLCJyZXF1aXJlZCIsImVycm9yIiwibWVzc2FnZSIsImxhYmVsIiwic2l6ZSIsImRpc2FibGVkIiwicGxhY2Vob2xkZXIiLCJfYyIsIiRSZWZyZXNoUmVnJCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwidXNlUXVlcnlDbGllbnQiLCJGb3JtUHJvdmlkZXIiLCJ1c2VMb2NhdGlvbiIsInN0eWxlZCIsIkJ1dHRvbiIsIkZpZWxkc2V0IiwiSGVhZGluZyIsIkhTdGFjayIsIlJlc3N1cnNTdGF0dXMiLCJIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeSIsInVzZVNhbWhhbmRsZXJTa2plbWEiLCJoZW50RnJvbnRlbmRGZWlsbWVsZGluZyIsImhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIiwiU2FtaGFuZGxlckNvbnRhaW5lciIsImRpdiIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJIZW50U2FrZXJCdXR0b24iLCJfdGVtcGxhdGVPYmplY3QyIiwiX2MyIiwiU2FtaGFuZGxlciIsIl91c2VTYW1oYW5kbGVyU2tqZW1hIiwiZm9ybSIsIm9uU3VibWl0Iiwib25TdWJtaXRXcmFwcGVyIiwic2FtaGFuZGxlclNramVtYSIsIl91c2VTdGF0ZSIsInVuZGVmaW5lZCIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInF1ZXJ5RGF0YSIsInNldFF1ZXJ5RGF0YSIsInF1ZXJ5Q2xpZW50IiwiY29uc29sZSIsImxvZyIsImxvY2F0aW9uIiwic3RhdGUiLCJmZWx0ZXIiLCJvcmduciIsInZhbGlkZXJPZ1NldHRGZWx0IiwiYnJ1a2VyIiwic2tqZW1hRXJMw6VzdCIsInN1Ym1pdFJlc3N1cnMiLCJzdGF0dXMiLCJIRU5URVIiLCJsZXZlbCIsIm1hcmdpbkJsb2NrIiwiaGFuZGxlU3VibWl0IiwiZSIsImZldGNoUXVlcnkiLCJxdWVyeUtleSIsIm9yZyIsImdldFZhbHVlcyIsInF1ZXJ5Rm4iLCJyZXF1ZXN0IiwibGVnZW5kIiwiaGlkZUxlZ2VuZCIsImhlbnROYXZJbnB1dFByb3BzIiwidmlzRmVpbG1lbGRpbmdlciIsImlkIiwidmFyaWFudCIsInR5cGUiLCJsb2FkaW5nIiwiU1VLU0VTUyIsImRhdGEiLCJ0c3NFa3N0ZXJuSWQiLCJuYXZuIiwiYWRyZXNzZXIiLCJhZHJlc3NlVHlwZSIsInBvc3RTdGVkIiwiX2MzIl0sInNvdXJjZVJvb3QiOiIifQ==