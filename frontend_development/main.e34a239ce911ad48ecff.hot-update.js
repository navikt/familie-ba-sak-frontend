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
    form = _useSamhandlerSkjema.form;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    queryData = _useState2[0],
    setQueryData = _useState2[1];
  var queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();
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
          return (0,_api_hentSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_10__.hentSamhandlerdataForOrgNrConfig)(request, formValues.orgnr);
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
  }, samhandlerSkjema.submitRessurs.data.tssEksternId, " ", samhandlerSkjema.submitRessurs.data.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), samhandlerSkjema.submitRessurs.data.adresser[0].adresseType, ' ', samhandlerSkjema.submitRessurs.data.adresser[0].postSted) : undefined, queryData !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_6__.Heading, {
    size: 'large'
  }, queryData.tssEksternId, " ", queryData.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), queryData.adresser[0].adresseType, " ", queryData.adresser[0].postSted));
};
_s(Samhandler, "bi28S9Bv+usI1DMnud9g6OnefrM=", false, function () {
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
/******/ 	__webpack_require__.h = () => ("72f2642ee6b18de359cd")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5lMzRhMjM5Y2U5MTFhZDQ4ZWNmZi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFtRDtBQUVJO0FBQ1I7QUFDSjtBQUNKO0FBRXlDO0FBQ2pDO0FBQ087QUFFSTtBQUNvQztBQUNnQjtBQUM3QjtBQUVkO0FBRW5FLElBQU1tQixtQkFBbUIsR0FBR2IseURBQU0sQ0FBQ2MsR0FBRyxDQUFBQyxlQUFBLEtBQUFBLGVBQUEsR0FBQUMsc0JBQUEsb0ZBSXJDO0FBQUNDLEVBQUEsR0FKSUosbUJBQW1CO0FBTXpCLElBQU1LLGVBQWUsR0FBR2xCLDZEQUFNLENBQUNDLG9EQUFNLENBQUMsQ0FBQWtCLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFILHNCQUFBLHNHQUtyQztBQUFDSSxHQUFBLEdBTElGLGVBQWU7QUFPZCxJQUFNRyxVQUFvQixHQUFHLFNBQXZCQSxVQUFvQkEsQ0FBQSxFQUFTO0VBQUFDLEVBQUE7RUFDdEMsSUFBQUMsb0JBQUEsR0FBaUJaLDJGQUFtQixDQUFDLENBQUM7SUFBOUJhLElBQUksR0FBQUQsb0JBQUEsQ0FBSkMsSUFBSTtFQUNaLElBQUFDLFNBQUEsR0FBa0M3QiwrQ0FBUSxDQUF5QixJQUFJLENBQUM7SUFBQThCLFVBQUEsR0FBQUMsY0FBQSxDQUFBRixTQUFBO0lBQWpFRyxTQUFTLEdBQUFGLFVBQUE7SUFBRUcsWUFBWSxHQUFBSCxVQUFBO0VBQzlCLElBQU1JLFdBQVcsR0FBR2pDLHFFQUFjLENBQUMsQ0FBQztFQUVwQyxJQUFNa0MsUUFBUSxHQUFHaEMseURBQVcsQ0FBQyxDQUFDO0VBQzlCSixnREFBUyxDQUFDLFlBQU07SUFDWixJQUFJb0MsUUFBUSxDQUFDQyxLQUFLLEVBQUU7TUFDaEIsSUFBTUEsS0FBSyxHQUFHRCxRQUFRLENBQUNDLEtBQTJCO01BQ2xEQyxnQkFBZ0IsQ0FBQ0MsTUFBTSxDQUFDQyxLQUFLLENBQUNDLGlCQUFpQixDQUFD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QUEsQ0FBQ1MscURBQU87SUFBQzJDLElBQUksRUFBRTtFQUFRLEdBQ2xCbEIsU0FBUyxDQUFDNkMsWUFBWSxFQUFDLEdBQUMsRUFBQzdDLFNBQVMsQ0FBQzhDLElBQUksRUFBQyxHQUFDLGVBQUFoRiwwREFBQSxXQUFLLENBQUMsRUFDL0NrQyxTQUFTLENBQUMrQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsRUFBQyxHQUFDLEVBQUNoRCxTQUFTLENBQUMrQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNFLFFBQ3RELENBRUksQ0FBQztBQUU5QixDQUFDO0FBQUN2RCxFQUFBLENBM0VXRCxVQUFvQjtFQUFBLFFBQ1pWLHVGQUFtQixFQUVoQmQsaUVBQWMsRUFFakJFLHFEQUFXLEVBU1JPLHlEQUFPO0FBQUE7QUFBQXlFLEdBQUEsR0FkbEIxRCxVQUFvQjtBQUFBLElBQUFKLEVBQUEsRUFBQUcsR0FBQSxFQUFBMkQsR0FBQTtBQUFBQyxzQ0FBQSxDQUFBL0QsRUFBQTtBQUFBK0Qsc0NBQUEsQ0FBQTVELEdBQUE7QUFBQTRELHNDQUFBLENBQUFELEdBQUEsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQy9CakMsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9TYW1oYW5kbGVyL1NhbWhhbmRsZXIudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlUXVlcnlDbGllbnQgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknO1xuaW1wb3J0IHsgRm9ybVByb3ZpZGVyIH0gZnJvbSAncmVhY3QtaG9vay1mb3JtJztcbmltcG9ydCB7IHVzZUxvY2F0aW9uIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBCdXR0b24sIEZpZWxkc2V0LCBIZWFkaW5nLCBIU3RhY2ssIFRleHRGaWVsZCB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHsgdXNlSHR0cCB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS1odHRwJztcbmltcG9ydCB7IFJlc3N1cnNTdGF0dXMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuXG5pbXBvcnQgeyBIZW50U2FtaGFuZGxlckZlbHQgfSBmcm9tICcuL0hlbnRTYW1oYW5kbGVyRmVsdCc7XG5pbXBvcnQgeyBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyB9IGZyb20gJy4uLy4uL2FwaS9oZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyc7XG5pbXBvcnQgeyBIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeSB9IGZyb20gJy4uLy4uL2hvb2tzL3VzZVNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcnO1xuaW1wb3J0IHsgdXNlU2FtaGFuZGxlclNramVtYSB9IGZyb20gJy4uLy4uL2tvbXBvbmVudGVyL1NhbWhhbmRsZXIvdXNlU2FtaGFuZGxlcic7XG5pbXBvcnQgdHlwZSB7IElTYW1oYW5kbGVySW5mbyB9IGZyb20gJy4uLy4uL3R5cGVyL3NhbWhhbmRsZXInO1xuaW1wb3J0IHsgaGVudEZyb250ZW5kRmVpbG1lbGRpbmcgfSBmcm9tICcuLi8uLi91dGlscy9yZXNzdXJzVXRpbHMnO1xuXG5jb25zdCBTYW1oYW5kbGVyQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIGhlaWdodDogY2FsYygxMDB2aCAtIDUwcHgpO1xuYDtcblxuY29uc3QgSGVudFNha2VyQnV0dG9uID0gc3R5bGVkKEJ1dHRvbilgXG4gICAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gICAgbWFyZ2luLXRvcDogMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiBhdXRvO1xuICAgIGhlaWdodDogM3JlbTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTYW1oYW5kbGVyOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGZvcm0gfSA9IHVzZVNhbWhhbmRsZXJTa2plbWEoKTtcbiAgICBjb25zdCBbcXVlcnlEYXRhLCBzZXRRdWVyeURhdGFdID0gdXNlU3RhdGU8SVNhbWhhbmRsZXJJbmZvIHwgbnVsbD4obnVsbCk7XG4gICAgY29uc3QgcXVlcnlDbGllbnQgPSB1c2VRdWVyeUNsaWVudCgpO1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zdGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZSBhcyB7IGJydWtlcjogc3RyaW5nIH07XG4gICAgICAgICAgICBzYW1oYW5kbGVyU2tqZW1hLmZlbHRlci5vcmduci52YWxpZGVyT2dTZXR0RmVsdChzdGF0ZS5icnVrZXIpO1xuICAgICAgICAgICAgb25TdWJtaXRXcmFwcGVyKCk7XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCB7IHJlcXVlc3QgfSA9IHVzZUh0dHAoKTtcblxuICAgIGNvbnN0IHNramVtYUVyTMOlc3QgPSBzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLkhFTlRFUjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxTYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J2xhcmdlJ30gbGV2ZWw9eycxJ30+XG4gICAgICAgICAgICAgICAgU8O4ayBzYW1oYW5kbGVyXG4gICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICA8SFN0YWNrIG1hcmdpbkJsb2NrPXsnc3BhY2UtMzInfT5cbiAgICAgICAgICAgICAgICA8Rm9ybVByb3ZpZGVyIHsuLi5mb3JtfT5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VibWl0PXtmb3JtLmhhbmRsZVN1Ym1pdChmb3JtVmFsdWVzID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlDbGllbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZldGNoUXVlcnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlLZXk6IEhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5Lm9yZyhmb3JtVmFsdWVzLm9yZ25yKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5Rm46ICgpID0+IGhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnKHJlcXVlc3QsIGZvcm1WYWx1ZXMub3JnbnIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyID0+IHNldFF1ZXJ5RGF0YShyKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZHNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yPXtoZW50RnJvbnRlbmRGZWlsbWVsZGluZyhzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZD1cIlPDuGsgc2FtaGFuZGxlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUxlZ2VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnNhbWhhbmRsZXJTa2plbWEuZmVsdGVyLm9yZ25yLmhlbnROYXZJbnB1dFByb3BzKHNhbWhhbmRsZXJTa2plbWEudmlzRmVpbG1lbGRpbmdlcil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXsnaGVudC1zYW1oYW5kbGVyJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9eydTa3JpdiBpbm4gb3JnbnInfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwibWVkaXVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9eydvcmducid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNhbWhhbmRsZXJGZWx0IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEhlbnRTYWtlckJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9eydwcmltYXJ5J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXsnc3VibWl0J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nPXtza2plbWFFckzDpXN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtza2plbWFFckzDpXN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlbnQgc2FtaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9IZW50U2FrZXJCdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICA8L0Zvcm1Qcm92aWRlcj5cbiAgICAgICAgICAgIDwvSFN0YWNrPlxuICAgICAgICAgICAge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuU1VLU0VTUyA/IChcbiAgICAgICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnbGFyZ2UnfT5cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5kYXRhLnRzc0Vrc3Rlcm5JZH0ge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5kYXRhLm5hdm59IDxiciAvPlxuICAgICAgICAgICAgICAgICAgICB7c2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLmRhdGEuYWRyZXNzZXJbMF0uYWRyZXNzZVR5cGV9eycgJ31cbiAgICAgICAgICAgICAgICAgICAge3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5kYXRhLmFkcmVzc2VyWzBdLnBvc3RTdGVkfVxuICAgICAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgICkgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICB7cXVlcnlEYXRhICE9PSBudWxsICYmIChcbiAgICAgICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnbGFyZ2UnfT5cbiAgICAgICAgICAgICAgICAgICAge3F1ZXJ5RGF0YS50c3NFa3N0ZXJuSWR9IHtxdWVyeURhdGEubmF2bn0gPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgIHtxdWVyeURhdGEuYWRyZXNzZXJbMF0uYWRyZXNzZVR5cGV9IHtxdWVyeURhdGEuYWRyZXNzZXJbMF0ucG9zdFN0ZWR9XG4gICAgICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9TYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICk7XG59O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiNzJmMjY0MmVlNmIxOGRlMzU5Y2RcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZVF1ZXJ5Q2xpZW50IiwiRm9ybVByb3ZpZGVyIiwidXNlTG9jYXRpb24iLCJzdHlsZWQiLCJCdXR0b24iLCJGaWVsZHNldCIsIkhlYWRpbmciLCJIU3RhY2siLCJUZXh0RmllbGQiLCJ1c2VIdHRwIiwiUmVzc3Vyc1N0YXR1cyIsIkhlbnRTYW1oYW5kbGVyRmVsdCIsImhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIiwiSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3RvcnkiLCJ1c2VTYW1oYW5kbGVyU2tqZW1hIiwiaGVudEZyb250ZW5kRmVpbG1lbGRpbmciLCJTYW1oYW5kbGVyQ29udGFpbmVyIiwiZGl2IiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbCIsIl9jIiwiSGVudFNha2VyQnV0dG9uIiwiX3RlbXBsYXRlT2JqZWN0MiIsIl9jMiIsIlNhbWhhbmRsZXIiLCJfcyIsIl91c2VTYW1oYW5kbGVyU2tqZW1hIiwiZm9ybSIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInF1ZXJ5RGF0YSIsInNldFF1ZXJ5RGF0YSIsInF1ZXJ5Q2xpZW50IiwibG9jYXRpb24iLCJzdGF0ZSIsInNhbWhhbmRsZXJTa2plbWEiLCJmZWx0ZXIiLCJvcmduciIsInZhbGlkZXJPZ1NldHRGZWx0IiwiYnJ1a2VyIiwib25TdWJtaXRXcmFwcGVyIiwiX3VzZUh0dHAiLCJyZXF1ZXN0Iiwic2tqZW1hRXJMw6VzdCIsInN1Ym1pdFJlc3N1cnMiLCJzdGF0dXMiLCJIRU5URVIiLCJjcmVhdGVFbGVtZW50Iiwic2l6ZSIsImxldmVsIiwibWFyZ2luQmxvY2siLCJvblN1Ym1pdCIsImhhbmRsZVN1Ym1pdCIsImZvcm1WYWx1ZXMiLCJmZXRjaFF1ZXJ5IiwicXVlcnlLZXkiLCJvcmciLCJxdWVyeUZuIiwidGhlbiIsInIiLCJlcnJvciIsImxlZ2VuZCIsImhpZGVMZWdlbmQiLCJfZXh0ZW5kcyIsImhlbnROYXZJbnB1dFByb3BzIiwidmlzRmVpbG1lbGRpbmdlciIsImlkIiwibGFiZWwiLCJwbGFjZWhvbGRlciIsInZhcmlhbnQiLCJ0eXBlIiwibG9hZGluZyIsImRpc2FibGVkIiwiU1VLU0VTUyIsImRhdGEiLCJ0c3NFa3N0ZXJuSWQiLCJuYXZuIiwiYWRyZXNzZXIiLCJhZHJlc3NlVHlwZSIsInBvc3RTdGVkIiwidW5kZWZpbmVkIiwiX2MzIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==