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
/* harmony import */ var _navikt_familie_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @navikt/familie-http */ "./node_modules/@navikt/familie-http/dist/index.js");
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @navikt/familie-typer */ "./node_modules/@navikt/familie-typer/dist/index.js");
/* harmony import */ var _HentSamhandlerFelt__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./HentSamhandlerFelt */ "./src/frontend/sider/Samhandler/HentSamhandlerFelt.tsx");
/* harmony import */ var _api_hentSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../api/hentSamhandlerdataForOrgNrConfig */ "./src/frontend/api/hentSamhandlerdataForOrgNrConfig.ts");
/* harmony import */ var _hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../hooks/useSamhandlerdataForOrgNrConfig */ "./src/frontend/hooks/useSamhandlerdataForOrgNrConfig.ts");
/* harmony import */ var _komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../komponenter/Samhandler/useSamhandler */ "./src/frontend/komponenter/Samhandler/useSamhandler.ts");
/* harmony import */ var _utils_ressursUtils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../utils/ressursUtils */ "./src/frontend/utils/ressursUtils.ts");
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
  var _useSamhandlerSkjema = (0,_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_12__.useSamhandlerSkjema)(),
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
  var _useHttp = (0,_navikt_familie_http__WEBPACK_IMPORTED_MODULE_7__.useHttp)(),
    request = _useHttp.request;
  var skjemaErLåst = samhandlerSkjema.submitRessurs.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_8__.RessursStatus.HENTER;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(SamhandlerContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Heading, {
    size: 'large',
    level: '1'
  }, "S\xF8k samhandler"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.HStack, {
    marginBlock: 'space-32'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.FormProvider, form, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
    onSubmit: form.handleSubmit(function (formValues) {
      return queryClient.fetchQuery({
        queryKey: _hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_11__.HentSamhandlerdataForOrgNrConfigQueryKeyFactory.org(formValues.orgnr),
        queryFn: function queryFn() {
          return (0,_api_hentSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_10__.hentSamhandlerdataForOrgNrConfig)(request, form.getValues(_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_12__.Fields.ORG_NR));
        }
      }).then(function (r) {
        return setQueryData(r);
      });
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Fieldset, {
    error: (0,_utils_ressursUtils__WEBPACK_IMPORTED_MODULE_13__.hentFrontendFeilmelding)(samhandlerSkjema.submitRessurs),
    legend: "S\xF8k samhandler",
    hideLegend: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.TextField, _extends({}, samhandlerSkjema.felter.orgnr.hentNavInputProps(samhandlerSkjema.visFeilmeldinger), {
    id: 'hent-samhandler',
    label: 'Skriv inn orgnr',
    size: "medium",
    placeholder: 'orgnr'
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_HentSamhandlerFelt__WEBPACK_IMPORTED_MODULE_9__.HentSamhandlerFelt, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HentSakerButton, {
    variant: 'primary',
    type: 'submit',
    loading: skjemaErLåst,
    disabled: skjemaErLåst
  }, "Hent samhandler")))), samhandlerSkjema.submitRessurs.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_8__.RessursStatus.SUKSESS ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Heading, {
    size: 'large'
  }, samhandlerSkjema.submitRessurs.data.tssEksternId, " ", samhandlerSkjema.submitRessurs.data.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), samhandlerSkjema.submitRessurs.data.adresser[0].adresseType, ' ', samhandlerSkjema.submitRessurs.data.adresser[0].postSted) : undefined);
};
_s(Samhandler, "s9Bq/AqyzyGr3/F9Sc3Nd6zrMWs=", false, function () {
  return [_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_12__.useSamhandlerSkjema, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient, react_router__WEBPACK_IMPORTED_MODULE_4__.useLocation, _navikt_familie_http__WEBPACK_IMPORTED_MODULE_7__.useHttp];
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
/******/ 	__webpack_require__.h = () => ("f90c71d0b05b053125a1")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi45ZjIxYTViNGFmYjU0NGQ4N2JmOS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUV1QjtBQUVKO0FBRXdDO0FBRTlFLFNBQVNJLGtCQUFrQkEsQ0FBQSxFQUFHO0VBQUFDLEVBQUE7RUFBQSxJQUFBQyxxQkFBQTtFQUNqQyxJQUFBQyxlQUFBLEdBR0lOLCtEQUFjLENBQWEsQ0FBQztJQUY1Qk8sUUFBUSxHQUFBRCxlQUFBLENBQVJDLFFBQVE7SUFBQUMscUJBQUEsR0FBQUYsZUFBQSxDQUNSRyxTQUFTO0lBQUlDLFlBQVksR0FBQUYscUJBQUEsQ0FBWkUsWUFBWTtJQUFFQyxNQUFNLEdBQUFILHFCQUFBLENBQU5HLE1BQU07RUFFckMsb0JBQ0laLDBEQUFBLENBQUNFLHVEQUFTLEVBQUFZLFFBQUEsS0FDRk4sUUFBUSxDQUFDTCx5RUFBTSxDQUFDWSxNQUFNLEVBQUU7SUFDeEJDLFFBQVEsRUFBRTtFQUNkLENBQUMsQ0FBQztJQUNGQyxLQUFLLEdBQUFYLHFCQUFBLEdBQUVNLE1BQU0sQ0FBQ1QseUVBQU0sQ0FBQ1ksTUFBTSxDQUFDLGNBQUFULHFCQUFBLHVCQUFyQkEscUJBQUEsQ0FBdUJZLE9BQVE7SUFDdENDLEtBQUssRUFBRSxpQkFBa0I7SUFDekJDLElBQUksRUFBQyxRQUFRO0lBQ2JDLFFBQVEsRUFBRVYsWUFBYTtJQUN2QlcsV0FBVyxFQUFFO0VBQVEsRUFDeEIsQ0FBQztBQUVWO0FBQUNqQixFQUFBLENBakJlRCxrQkFBa0I7RUFBQSxRQUkxQkgsMkRBQWM7QUFBQTtBQUFBc0IsRUFBQSxHQUpObkIsa0JBQWtCO0FBQUEsSUFBQW1CLEVBQUE7QUFBQUMsc0NBQUEsQ0FBQUQsRUFBQSx3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSaUI7QUFFSTtBQUNSO0FBQ0o7QUFDSjtBQUV5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N0MsU0FVYSxDQUFDO0FBRTlCLENBQUM7QUFBQ2xELEVBQUEsQ0FoRlcyQyxVQUFvQjtFQUFBLFFBQ2lDVCx1RkFBbUIsRUFFN0RaLGlFQUFjLEVBSWpCRSxxREFBVyxFQVFSTSx5REFBTztBQUFBO0FBQUFrRSxHQUFBLEdBZmxCckQsVUFBb0I7QUFBQSxJQUFBekIsRUFBQSxFQUFBd0IsR0FBQSxFQUFBc0QsR0FBQTtBQUFBN0Usc0NBQUEsQ0FBQUQsRUFBQTtBQUFBQyxzQ0FBQSxDQUFBdUIsR0FBQTtBQUFBdkIsc0NBQUEsQ0FBQTZFLEdBQUEsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzlCakMsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9TYW1oYW5kbGVyL0hlbnRTYW1oYW5kbGVyRmVsdC50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvU2FtaGFuZGxlci9TYW1oYW5kbGVyLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlRm9ybUNvbnRleHQgfSBmcm9tICdyZWFjdC1ob29rLWZvcm0nO1xuXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICdAbmF2aWt0L2RzLXJlYWN0JztcblxuaW1wb3J0IHsgRmllbGRzLCB0eXBlIEZvcm1WYWx1ZXMgfSBmcm9tICcuLi8uLi9rb21wb25lbnRlci9TYW1oYW5kbGVyL3VzZVNhbWhhbmRsZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gSGVudFNhbWhhbmRsZXJGZWx0KCkge1xuICAgIGNvbnN0IHtcbiAgICAgICAgcmVnaXN0ZXIsXG4gICAgICAgIGZvcm1TdGF0ZTogeyBpc1N1Ym1pdHRpbmcsIGVycm9ycyB9LFxuICAgIH0gPSB1c2VGb3JtQ29udGV4dDxGb3JtVmFsdWVzPigpO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICAgIHsuLi5yZWdpc3RlcihGaWVsZHMuT1JHX05SLCB7XG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6ICdCZWdydW5uZWxzZSBmb3IgbWFudWVsbCByZWdpc3RyZXJpbmcgYXYgZMO4ZHNmYWxsIGVyIHDDpWtyZXZkLicsXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIGVycm9yPXtlcnJvcnNbRmllbGRzLk9SR19OUl0/Lm1lc3NhZ2V9XG4gICAgICAgICAgICBsYWJlbD17J1Nrcml2IGlubiBvcmducid9XG4gICAgICAgICAgICBzaXplPVwibWVkaXVtXCJcbiAgICAgICAgICAgIGRpc2FibGVkPXtpc1N1Ym1pdHRpbmd9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17J29yZ25yJ31cbiAgICAgICAgLz5cbiAgICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHVzZVF1ZXJ5Q2xpZW50IH0gZnJvbSAnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5JztcbmltcG9ydCB7IEZvcm1Qcm92aWRlciB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5pbXBvcnQgeyB1c2VMb2NhdGlvbiB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQnV0dG9uLCBGaWVsZHNldCwgSGVhZGluZywgSFN0YWNrLCBUZXh0RmllbGQgfSBmcm9tICdAbmF2aWt0L2RzLXJlYWN0JztcbmltcG9ydCB7IHVzZUh0dHAgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtaHR0cCc7XG5pbXBvcnQgeyBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcblxuaW1wb3J0IHsgSGVudFNhbWhhbmRsZXJGZWx0IH0gZnJvbSAnLi9IZW50U2FtaGFuZGxlckZlbHQnO1xuaW1wb3J0IHsgaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcgfSBmcm9tICcuLi8uLi9hcGkvaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcnO1xuaW1wb3J0IHsgSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3RvcnkgfSBmcm9tICcuLi8uLi9ob29rcy91c2VTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnJztcbmltcG9ydCB7IEZpZWxkcywgdXNlU2FtaGFuZGxlclNramVtYSB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL1NhbWhhbmRsZXIvdXNlU2FtaGFuZGxlcic7XG5pbXBvcnQgeyBoZW50RnJvbnRlbmRGZWlsbWVsZGluZyB9IGZyb20gJy4uLy4uL3V0aWxzL3Jlc3N1cnNVdGlscyc7XG5cbmNvbnN0IFNhbWhhbmRsZXJDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gNTBweCk7XG5gO1xuXG5jb25zdCBIZW50U2FrZXJCdXR0b24gPSBzdHlsZWQoQnV0dG9uKWBcbiAgICBtYXJnaW4tbGVmdDogMXJlbTtcbiAgICBtYXJnaW4tdG9wOiAycmVtO1xuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XG4gICAgaGVpZ2h0OiAzcmVtO1xuYDtcblxuZXhwb3J0IGNvbnN0IFNhbWhhbmRsZXI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZm9ybSwgb25TdWJtaXQsIG9uU3VibWl0V3JhcHBlciwgc2FtaGFuZGxlclNramVtYSB9ID0gdXNlU2FtaGFuZGxlclNramVtYSgpO1xuICAgIGNvbnN0IFtxdWVyeURhdGEsIHNldFF1ZXJ5RGF0YV0gPSB1c2VTdGF0ZSh1bmRlZmluZWQpO1xuICAgIGNvbnN0IHF1ZXJ5Q2xpZW50ID0gdXNlUXVlcnlDbGllbnQoKTtcblxuICAgIGNvbnNvbGUubG9nKHF1ZXJ5RGF0YSk7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnN0YXRlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlIGFzIHsgYnJ1a2VyOiBzdHJpbmcgfTtcbiAgICAgICAgICAgIHNhbWhhbmRsZXJTa2plbWEuZmVsdGVyLm9yZ25yLnZhbGlkZXJPZ1NldHRGZWx0KHN0YXRlLmJydWtlcik7XG4gICAgICAgICAgICBvblN1Ym1pdFdyYXBwZXIoKTtcbiAgICAgICAgfVxuICAgIH0sIFtdKTtcbiAgICBjb25zdCB7IHJlcXVlc3QgfSA9IHVzZUh0dHAoKTtcblxuICAgIGNvbnN0IHNramVtYUVyTMOlc3QgPSBzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLkhFTlRFUjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxTYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30gbGV2ZWw9eycxJ30+XG4gICAgICAgICAgICAgICAgU8O4ayBzYW1oYW5kbGVyXG4gICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICA8SFN0YWNrIG1hcmdpbkJsb2NrPXsnc3BhY2UtMzInfT5cbiAgICAgICAgICAgICAgICA8Rm9ybVByb3ZpZGVyIHsuLi5mb3JtfT5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VibWl0PXtmb3JtLmhhbmRsZVN1Ym1pdChmb3JtVmFsdWVzID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlDbGllbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZldGNoUXVlcnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlLZXk6IEhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5Lm9yZyhmb3JtVmFsdWVzLm9yZ25yKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5Rm46ICgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcocmVxdWVzdCwgZm9ybS5nZXRWYWx1ZXMoRmllbGRzLk9SR19OUikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyID0+IHNldFF1ZXJ5RGF0YShyKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZHNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yPXtoZW50RnJvbnRlbmRGZWlsbWVsZGluZyhzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZD1cIlPDuGsgc2FtaGFuZGxlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUxlZ2VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnNhbWhhbmRsZXJTa2plbWEuZmVsdGVyLm9yZ25yLmhlbnROYXZJbnB1dFByb3BzKHNhbWhhbmRsZXJTa2plbWEudmlzRmVpbG1lbGRpbmdlcil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXsnaGVudC1zYW1oYW5kbGVyJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9eydTa3JpdiBpbm4gb3JnbnInfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwibWVkaXVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9eydvcmducid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNhbWhhbmRsZXJGZWx0IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEhlbnRTYWtlckJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9eydwcmltYXJ5J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXsnc3VibWl0J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nPXtza2plbWFFckzDpXN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtza2plbWFFckzDpXN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlbnQgc2FtaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9IZW50U2FrZXJCdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICA8L0Zvcm1Qcm92aWRlcj5cbiAgICAgICAgICAgIDwvSFN0YWNrPlxuICAgICAgICAgICAge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuU1VLU0VTUyA/IChcbiAgICAgICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnbGFyZ2UnfT5cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5kYXRhLnRzc0Vrc3Rlcm5JZH0ge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5kYXRhLm5hdm59IDxiciAvPlxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEuYWRyZXNzZXJbMF0uYWRyZXNzZVR5cGV9eycgJ31cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5kYXRhLmFkcmVzc2VyWzBdLnBvc3RTdGVkfVxuICAgICAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgICkgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICB7LypzYW1oYW5kbGVyZGF0YUNhY2hlPy5zdGF0dXMgPT09ICdzdWNjZXNzJyAmJlxuICAgICAgICAgICAgICAgIHNhbWhhbmRsZXJkYXRhQ2FjaGUuZGF0YSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIHNhbWhhbmRsZXJkYXRhQ2FjaGUuZGF0YSAhPT0gdW5kZWZpbmVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlcmRhdGFDYWNoZS5kYXRhLnRzc0Vrc3Rlcm5JZH0ge3NhbWhhbmRsZXJkYXRhQ2FjaGUuZGF0YS5uYXZufSA8YnIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyZGF0YUNhY2hlLmRhdGEuYWRyZXNzZXJbMF0uYWRyZXNzZVR5cGV9eycgJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyZGF0YUNhY2hlLmRhdGEuYWRyZXNzZXJbMF0ucG9zdFN0ZWR9XG4gICAgICAgICAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgICAgICApKi99XG4gICAgICAgIDwvU2FtaGFuZGxlckNvbnRhaW5lcj5cbiAgICApO1xufTtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImY5MGM3MWQwYjA1YjA1MzEyNWExXCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRm9ybUNvbnRleHQiLCJUZXh0RmllbGQiLCJGaWVsZHMiLCJIZW50U2FtaGFuZGxlckZlbHQiLCJfcyIsIl9lcnJvcnMkRmllbGRzJE9SR19OUiIsIl91c2VGb3JtQ29udGV4dCIsInJlZ2lzdGVyIiwiX3VzZUZvcm1Db250ZXh0JGZvcm1TIiwiZm9ybVN0YXRlIiwiaXNTdWJtaXR0aW5nIiwiZXJyb3JzIiwiY3JlYXRlRWxlbWVudCIsIl9leHRlbmRzIiwiT1JHX05SIiwicmVxdWlyZWQiLCJlcnJvciIsIm1lc3NhZ2UiLCJsYWJlbCIsInNpemUiLCJkaXNhYmxlZCIsInBsYWNlaG9sZGVyIiwiX2MiLCIkUmVmcmVzaFJlZyQiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZVF1ZXJ5Q2xpZW50IiwiRm9ybVByb3ZpZGVyIiwidXNlTG9jYXRpb24iLCJzdHlsZWQiLCJCdXR0b24iLCJGaWVsZHNldCIsIkhlYWRpbmciLCJIU3RhY2siLCJ1c2VIdHRwIiwiUmVzc3Vyc1N0YXR1cyIsImhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIiwiSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3RvcnkiLCJ1c2VTYW1oYW5kbGVyU2tqZW1hIiwiaGVudEZyb250ZW5kRmVpbG1lbGRpbmciLCJTYW1oYW5kbGVyQ29udGFpbmVyIiwiZGl2IiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbCIsIkhlbnRTYWtlckJ1dHRvbiIsIl90ZW1wbGF0ZU9iamVjdDIiLCJfYzIiLCJTYW1oYW5kbGVyIiwiX3VzZVNhbWhhbmRsZXJTa2plbWEiLCJmb3JtIiwib25TdWJtaXQiLCJvblN1Ym1pdFdyYXBwZXIiLCJzYW1oYW5kbGVyU2tqZW1hIiwiX3VzZVN0YXRlIiwidW5kZWZpbmVkIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5IiwicXVlcnlEYXRhIiwic2V0UXVlcnlEYXRhIiwicXVlcnlDbGllbnQiLCJjb25zb2xlIiwibG9nIiwibG9jYXRpb24iLCJzdGF0ZSIsImZlbHRlciIsIm9yZ25yIiwidmFsaWRlck9nU2V0dEZlbHQiLCJicnVrZXIiLCJfdXNlSHR0cCIsInJlcXVlc3QiLCJza2plbWFFckzDpXN0Iiwic3VibWl0UmVzc3VycyIsInN0YXR1cyIsIkhFTlRFUiIsImxldmVsIiwibWFyZ2luQmxvY2siLCJoYW5kbGVTdWJtaXQiLCJmb3JtVmFsdWVzIiwiZmV0Y2hRdWVyeSIsInF1ZXJ5S2V5Iiwib3JnIiwicXVlcnlGbiIsImdldFZhbHVlcyIsInRoZW4iLCJyIiwibGVnZW5kIiwiaGlkZUxlZ2VuZCIsImhlbnROYXZJbnB1dFByb3BzIiwidmlzRmVpbG1lbGRpbmdlciIsImlkIiwidmFyaWFudCIsInR5cGUiLCJsb2FkaW5nIiwiU1VLU0VTUyIsImRhdGEiLCJ0c3NFa3N0ZXJuSWQiLCJuYXZuIiwiYWRyZXNzZXIiLCJhZHJlc3NlVHlwZSIsInBvc3RTdGVkIiwiX2MzIl0sInNvdXJjZVJvb3QiOiIifQ==