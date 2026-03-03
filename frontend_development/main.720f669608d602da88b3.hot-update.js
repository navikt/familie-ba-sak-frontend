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
  var _samhandlerdataCache;
  var _useSamhandlerSkjema = (0,_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_10__.useSamhandlerSkjema)(),
    form = _useSamhandlerSkjema.form,
    onSubmit = _useSamhandlerSkjema.onSubmit,
    onSubmitWrapper = _useSamhandlerSkjema.onSubmitWrapper,
    samhandlerSkjema = _useSamhandlerSkjema.samhandlerSkjema;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}),
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
    onSubmit: form.handleSubmit(function () {
      return setQueryData(queryClient.getQueryData(_hooks_useSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_9__.HentSamhandlerdataForOrgNrConfigQueryKeyFactory.org(form.getValues(_komponenter_Samhandler_useSamhandler__WEBPACK_IMPORTED_MODULE_10__.Fields.ORG_NR))));
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
  }, samhandlerSkjema.submitRessurs.data.tssEksternId, " ", samhandlerSkjema.submitRessurs.data.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), samhandlerSkjema.submitRessurs.data.adresser[0].adresseType, ' ', samhandlerSkjema.submitRessurs.data.adresser[0].postSted) : undefined, ((_samhandlerdataCache = samhandlerdataCache) === null || _samhandlerdataCache === void 0 ? void 0 : _samhandlerdataCache.status) === 'success' && samhandlerdataCache.data !== null && samhandlerdataCache.data !== undefined && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Heading, {
    size: 'large'
  }, samhandlerdataCache.data.tssEksternId, " ", samhandlerdataCache.data.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), samhandlerdataCache.data.adresser[0].adresseType, ' ', samhandlerdataCache.data.adresser[0].postSted));
};
_s(Samhandler, "zAVvFXKluuE49Kgjl60xZE00mmU=", false, function () {
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
/******/ 	__webpack_require__.h = () => ("312f4dbf389b93a9789e")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi43MjBmNjY5NjA4ZDYwMmRhODhiMy5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFFSTtBQUNSO0FBQ0o7QUFDSjtBQUV5QztBQUMxQjtBQUVJO0FBQ29EO0FBQ3JCO0FBRXRCO0FBRW5FLElBQU1rQixtQkFBbUIsR0FBR1oseURBQU0sQ0FBQ2EsR0FBRyxDQUFBQyxlQUFBLEtBQUFBLGVBQUEsR0FBQUMsc0JBQUEsb0ZBSXJDO0FBQUNDLEVBQUEsR0FKSUosbUJBQW1CO0FBTXpCLElBQU1LLGVBQWUsR0FBR2pCLDZEQUFNLENBQUNDLG9EQUFNLENBQUMsQ0FBQWlCLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFILHNCQUFBLHNHQUtyQztBQUFDSSxHQUFBLEdBTElGLGVBQWU7QUFPZCxJQUFNRyxVQUFvQixHQUFHLFNBQXZCQSxVQUFvQkEsQ0FBQSxFQUFTO0VBQUFDLEVBQUE7RUFBQSxJQUFBQyxvQkFBQTtFQUN0QyxJQUFBQyxvQkFBQSxHQUE4RGIsMkZBQW1CLENBQUMsQ0FBQztJQUEzRWMsSUFBSSxHQUFBRCxvQkFBQSxDQUFKQyxJQUFJO0lBQUVDLFFBQVEsR0FBQUYsb0JBQUEsQ0FBUkUsUUFBUTtJQUFFQyxlQUFlLEdBQUFILG9CQUFBLENBQWZHLGVBQWU7SUFBRUMsZ0JBQWdCLEdBQUFKLG9CQUFBLENBQWhCSSxnQkFBZ0I7RUFDekQsSUFBQUMsU0FBQSxHQUFrQ2hDLCtDQUFRLENBQWtCLENBQUMsQ0FBQyxDQUFDO0lBQUFpQyxVQUFBLEdBQUFDLGNBQUEsQ0FBQUYsU0FBQTtJQUF4REcsU0FBUyxHQUFBRixVQUFBO0lBQUVHLFlBQVksR0FBQUgsVUFBQTtFQUM5QixJQUFNSSxXQUFXLEdBQUdwQyxxRUFBYyxDQUFDLENBQUM7RUFFcENxQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0osU0FBUyxDQUFDO0VBRXRCLElBQU1LLFFBQVEsR0FBR3JDLHlEQUFXLENB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SSxLQUFLLElBQUksSUFDakNPLG1CQUFtQixDQUFDUCxJQUFJLEtBQUtNLFNBQVMsaUJBQ2xDakYsMERBQUEsQ0FBQ1MscURBQU87SUFBQzRDLElBQUksRUFBRTtFQUFRLEdBQ2xCNkIsbUJBQW1CLENBQUNQLElBQUksQ0FBQ0MsWUFBWSxFQUFDLEdBQUMsRUFBQ00sbUJBQW1CLENBQUNQLElBQUksQ0FBQ0UsSUFBSSxFQUFDLEdBQUMsZUFBQTdFLDBEQUFBLFdBQUssQ0FBQyxFQUM3RWtGLG1CQUFtQixDQUFDUCxJQUFJLENBQUNHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsV0FBVyxFQUFFLEdBQUcsRUFDckRHLG1CQUFtQixDQUFDUCxJQUFJLENBQUNHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0UsUUFDakMsQ0FFQSxDQUFDO0FBRTlCLENBQUM7QUFBQ3JELEVBQUEsQ0E3RVdELFVBQW9CO0VBQUEsUUFDaUNWLHVGQUFtQixFQUU3RGIsaUVBQWMsRUFJakJFLHFEQUFXO0FBQUE7QUFBQThFLEdBQUEsR0FQbkJ6RCxVQUFvQjtBQUFBLElBQUFKLEVBQUEsRUFBQUcsR0FBQSxFQUFBMEQsR0FBQTtBQUFBQyxzQ0FBQSxDQUFBOUQsRUFBQTtBQUFBOEQsc0NBQUEsQ0FBQTNELEdBQUE7QUFBQTJELHNDQUFBLENBQUFELEdBQUEsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzdCakMsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9TYW1oYW5kbGVyL1NhbWhhbmRsZXIudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlUXVlcnlDbGllbnQgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknO1xuaW1wb3J0IHsgRm9ybVByb3ZpZGVyIH0gZnJvbSAncmVhY3QtaG9vay1mb3JtJztcbmltcG9ydCB7IHVzZUxvY2F0aW9uIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBCdXR0b24sIEZpZWxkc2V0LCBIZWFkaW5nLCBIU3RhY2ssIFRleHRGaWVsZCB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHsgUmVzc3Vyc1N0YXR1cyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5cbmltcG9ydCB7IEhlbnRTYW1oYW5kbGVyRmVsdCB9IGZyb20gJy4vSGVudFNhbWhhbmRsZXJGZWx0JztcbmltcG9ydCB7IEhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5IH0gZnJvbSAnLi4vLi4vaG9va3MvdXNlU2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyc7XG5pbXBvcnQgeyBGaWVsZHMsIHVzZVNhbWhhbmRsZXJTa2plbWEgfSBmcm9tICcuLi8uLi9rb21wb25lbnRlci9TYW1oYW5kbGVyL3VzZVNhbWhhbmRsZXInO1xuaW1wb3J0IHR5cGUgeyBJU2FtaGFuZGxlckluZm8gfSBmcm9tICcuLi8uLi90eXBlci9zYW1oYW5kbGVyJztcbmltcG9ydCB7IGhlbnRGcm9udGVuZEZlaWxtZWxkaW5nIH0gZnJvbSAnLi4vLi4vdXRpbHMvcmVzc3Vyc1V0aWxzJztcblxuY29uc3QgU2FtaGFuZGxlckNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA1MHB4KTtcbmA7XG5cbmNvbnN0IEhlbnRTYWtlckJ1dHRvbiA9IHN0eWxlZChCdXR0b24pYFxuICAgIG1hcmdpbi1sZWZ0OiAxcmVtO1xuICAgIG1hcmdpbi10b3A6IDJyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcbiAgICBoZWlnaHQ6IDNyZW07XG5gO1xuXG5leHBvcnQgY29uc3QgU2FtaGFuZGxlcjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBmb3JtLCBvblN1Ym1pdCwgb25TdWJtaXRXcmFwcGVyLCBzYW1oYW5kbGVyU2tqZW1hIH0gPSB1c2VTYW1oYW5kbGVyU2tqZW1hKCk7XG4gICAgY29uc3QgW3F1ZXJ5RGF0YSwgc2V0UXVlcnlEYXRhXSA9IHVzZVN0YXRlPElTYW1oYW5kbGVySW5mbz4oe30pO1xuICAgIGNvbnN0IHF1ZXJ5Q2xpZW50ID0gdXNlUXVlcnlDbGllbnQoKTtcblxuICAgIGNvbnNvbGUubG9nKHF1ZXJ5RGF0YSk7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnN0YXRlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlIGFzIHsgYnJ1a2VyOiBzdHJpbmcgfTtcbiAgICAgICAgICAgIHNhbWhhbmRsZXJTa2plbWEuZmVsdGVyLm9yZ25yLnZhbGlkZXJPZ1NldHRGZWx0KHN0YXRlLmJydWtlcik7XG4gICAgICAgICAgICBvblN1Ym1pdFdyYXBwZXIoKTtcbiAgICAgICAgfVxuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IHNramVtYUVyTMOlc3QgPSBzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLkhFTlRFUjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxTYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30gbGV2ZWw9eycxJ30+XG4gICAgICAgICAgICAgICAgU8O4ayBzYW1oYW5kbGVyXG4gICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICA8SFN0YWNrIG1hcmdpbkJsb2NrPXsnc3BhY2UtMzInfT5cbiAgICAgICAgICAgICAgICA8Rm9ybVByb3ZpZGVyIHsuLi5mb3JtfT5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VibWl0PXtmb3JtLmhhbmRsZVN1Ym1pdCgoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFF1ZXJ5RGF0YShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlDbGllbnQuZ2V0UXVlcnlEYXRhKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3Rvcnkub3JnKGZvcm0uZ2V0VmFsdWVzKEZpZWxkcy5PUkdfTlIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZpZWxkc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I9e2hlbnRGcm9udGVuZEZlaWxtZWxkaW5nKHNhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kPVwiU8O4ayBzYW1oYW5kbGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlTGVnZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4uc2FtaGFuZGxlclNramVtYS5mZWx0ZXIub3JnbnIuaGVudE5hdklucHV0UHJvcHMoc2FtaGFuZGxlclNramVtYS52aXNGZWlsbWVsZGluZ2VyKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9eydoZW50LXNhbWhhbmRsZXInfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17J1Nrcml2IGlubiBvcmducid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCJtZWRpdW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17J29yZ25yJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxIZW50U2FtaGFuZGxlckZlbHQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNha2VyQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD17J3ByaW1hcnknfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9eydzdWJtaXQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e3NramVtYUVyTMOlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3NramVtYUVyTMOlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVudCBzYW1oYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0hlbnRTYWtlckJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgIDwvRm9ybVByb3ZpZGVyPlxuICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5TVUtTRVNTID8gKFxuICAgICAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9PlxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEudHNzRWtzdGVybklkfSB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEubmF2bn0gPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuZGF0YS5hZHJlc3NlclswXS5hZHJlc3NlVHlwZX17JyAnfVxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEuYWRyZXNzZXJbMF0ucG9zdFN0ZWR9XG4gICAgICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgKSA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIHtzYW1oYW5kbGVyZGF0YUNhY2hlPy5zdGF0dXMgPT09ICdzdWNjZXNzJyAmJlxuICAgICAgICAgICAgICAgIHNhbWhhbmRsZXJkYXRhQ2FjaGUuZGF0YSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIHNhbWhhbmRsZXJkYXRhQ2FjaGUuZGF0YSAhPT0gdW5kZWZpbmVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlcmRhdGFDYWNoZS5kYXRhLnRzc0Vrc3Rlcm5JZH0ge3NhbWhhbmRsZXJkYXRhQ2FjaGUuZGF0YS5uYXZufSA8YnIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyZGF0YUNhY2hlLmRhdGEuYWRyZXNzZXJbMF0uYWRyZXNzZVR5cGV9eycgJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzYW1oYW5kbGVyZGF0YUNhY2hlLmRhdGEuYWRyZXNzZXJbMF0ucG9zdFN0ZWR9XG4gICAgICAgICAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICA8L1NhbWhhbmRsZXJDb250YWluZXI+XG4gICAgKTtcbn07XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIzMTJmNGRiZjM4OWI5M2E5Nzg5ZVwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwidXNlUXVlcnlDbGllbnQiLCJGb3JtUHJvdmlkZXIiLCJ1c2VMb2NhdGlvbiIsInN0eWxlZCIsIkJ1dHRvbiIsIkZpZWxkc2V0IiwiSGVhZGluZyIsIkhTdGFjayIsIlRleHRGaWVsZCIsIlJlc3N1cnNTdGF0dXMiLCJIZW50U2FtaGFuZGxlckZlbHQiLCJIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeSIsIkZpZWxkcyIsInVzZVNhbWhhbmRsZXJTa2plbWEiLCJoZW50RnJvbnRlbmRGZWlsbWVsZGluZyIsIlNhbWhhbmRsZXJDb250YWluZXIiLCJkaXYiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiX2MiLCJIZW50U2FrZXJCdXR0b24iLCJfdGVtcGxhdGVPYmplY3QyIiwiX2MyIiwiU2FtaGFuZGxlciIsIl9zIiwiX3NhbWhhbmRsZXJkYXRhQ2FjaGUiLCJfdXNlU2FtaGFuZGxlclNramVtYSIsImZvcm0iLCJvblN1Ym1pdCIsIm9uU3VibWl0V3JhcHBlciIsInNhbWhhbmRsZXJTa2plbWEiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJxdWVyeURhdGEiLCJzZXRRdWVyeURhdGEiLCJxdWVyeUNsaWVudCIsImNvbnNvbGUiLCJsb2ciLCJsb2NhdGlvbiIsInN0YXRlIiwiZmVsdGVyIiwib3JnbnIiLCJ2YWxpZGVyT2dTZXR0RmVsdCIsImJydWtlciIsInNramVtYUVyTMOlc3QiLCJzdWJtaXRSZXNzdXJzIiwic3RhdHVzIiwiSEVOVEVSIiwiY3JlYXRlRWxlbWVudCIsInNpemUiLCJsZXZlbCIsIm1hcmdpbkJsb2NrIiwiaGFuZGxlU3VibWl0IiwiZ2V0UXVlcnlEYXRhIiwib3JnIiwiZ2V0VmFsdWVzIiwiT1JHX05SIiwiZXJyb3IiLCJsZWdlbmQiLCJoaWRlTGVnZW5kIiwiX2V4dGVuZHMiLCJoZW50TmF2SW5wdXRQcm9wcyIsInZpc0ZlaWxtZWxkaW5nZXIiLCJpZCIsImxhYmVsIiwicGxhY2Vob2xkZXIiLCJ2YXJpYW50IiwidHlwZSIsImxvYWRpbmciLCJkaXNhYmxlZCIsIlNVS1NFU1MiLCJkYXRhIiwidHNzRWtzdGVybklkIiwibmF2biIsImFkcmVzc2VyIiwiYWRyZXNzZVR5cGUiLCJwb3N0U3RlZCIsInVuZGVmaW5lZCIsInNhbWhhbmRsZXJkYXRhQ2FjaGUiLCJfYzMiLCIkUmVmcmVzaFJlZyQiXSwic291cmNlUm9vdCI6IiJ9