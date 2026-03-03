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
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_familie_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @navikt/familie-http */ "./node_modules/@navikt/familie-http/dist/index.js");
/* harmony import */ var _HentSamhandlerFelt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HentSamhandlerFelt */ "./src/frontend/sider/Samhandler/HentSamhandlerFelt.tsx");
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../api/hentSamhandlerdataForOrgNrConfig'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../hooks/useSamhandlerdataForOrgNrConfig'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _komponenter_Modal_fagsak_form_OpprettFagsakForm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../komponenter/Modal/fagsak/form/OpprettFagsakForm */ "./src/frontend/komponenter/Modal/fagsak/form/OpprettFagsakForm.tsx");
/* harmony import */ var _komponenter_Modal_fagsak_hooks_useSamhandlerForm__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../komponenter/Modal/fagsak/hooks/useSamhandlerForm */ "./src/frontend/komponenter/Modal/fagsak/hooks/useSamhandlerForm.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject,
  _templateObject2,
  _s = __webpack_require__.$Refresh$.signature();
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }











var SamhandlerContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    padding: 1rem;\n    overflow: auto;\n    height: calc(100vh - 50px);\n"])));
_c = SamhandlerContainer;
var HentSakerButton = (0,styled_components__WEBPACK_IMPORTED_MODULE_4__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Button)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    margin-left: 1rem;\n    margin-top: 2rem;\n    margin-bottom: auto;\n    height: 3rem;\n"])));
_c2 = HentSakerButton;
var Samhandler = function Samhandler() {
  _s();
  var location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(location.state.bruker ? location.state.bruker : undefined),
    _useState2 = _slicedToArray(_useState, 2),
    queryData = _useState2[0],
    setQueryData = _useState2[1];
  var _useSamhandlerForm = (0,_komponenter_Modal_fagsak_hooks_useSamhandlerForm__WEBPACK_IMPORTED_MODULE_10__.useSamhandlerForm)({
      settSamhandler: function settSamhandler(samhandler) {
        opprettFagsakForm.setValue(_komponenter_Modal_fagsak_form_OpprettFagsakForm__WEBPACK_IMPORTED_MODULE_9__.OpprettFagsakFeltnavn.SAMHANDLER, samhandler);
      }
    }),
    form = _useSamhandlerForm.form,
    onSubmit = _useSamhandlerForm.onSubmit;
  var _useHttp = (0,_navikt_familie_http__WEBPACK_IMPORTED_MODULE_6__.useHttp)(),
    request = _useHttp.request;
  var skjemaErLåst = false; //samhandlerSkjema.submitRessurs.status === RessursStatus.HENTER;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(SamhandlerContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Heading, {
    size: 'large',
    level: '1'
  }, "S\xF8k samhandler"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.HStack, {
    marginBlock: 'space-32'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_2__.FormProvider, form, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
    onSubmit: form.handleSubmit(function (formValues) {
      return queryClient.fetchQuery({
        queryKey: Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../hooks/useSamhandlerdataForOrgNrConfig'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).org(formValues.orgnr),
        queryFn: function queryFn() {
          return Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../api/hentSamhandlerdataForOrgNrConfig'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(request, formValues.orgnr);
        }
      }).then(function (r) {
        return setQueryData(r);
      });
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Fieldset
  //error={hentFrontendFeilmelding(samhandlerSkjema.submitRessurs)}
  , {
    legend: "S\xF8k samhandler",
    hideLegend: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_HentSamhandlerFelt__WEBPACK_IMPORTED_MODULE_7__.HentSamhandlerFelt, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HentSakerButton, {
    variant: 'primary',
    type: 'submit',
    loading: skjemaErLåst,
    disabled: skjemaErLåst
  }, "Hent samhandler")))), queryData !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Heading, {
    size: 'large'
  }, queryData.tssEksternId, " ", queryData.navn, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), queryData.adresser[0].adresseType, " ", queryData.adresser[0].postSted));
};
_s(Samhandler, "pGJmbYCrWwmroM0LTkZh74yDtJE=", false, function () {
  return [react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation, _komponenter_Modal_fagsak_hooks_useSamhandlerForm__WEBPACK_IMPORTED_MODULE_10__.useSamhandlerForm, _navikt_familie_http__WEBPACK_IMPORTED_MODULE_6__.useHttp];
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
/******/ 	__webpack_require__.h = () => ("12d67957e97c51256800")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxPQUFPLEVBQUVuQixZQUFhO0lBQ3RCb0IsUUFBUSxFQUFFcEI7RUFBYSxHQUMxQixpQkFFZ0IsQ0FDZixDQUNJLENBQ1YsQ0FBQyxFQUVSWixTQUFTLEtBQUssSUFBSSxpQkFDZmhDLDBEQUFBLENBQUNPLHFEQUFPO0lBQUN1QyxJQUFJLEVBQUU7RUFBUSxHQUNsQmQsU0FBUyxDQUFDaUMsWUFBWSxFQUFDLEdBQUMsRUFBQ2pDLFNBQVMsQ0FBQ2tDLElBQUksRUFBQyxHQUFDLGVBQUFsRSwwREFBQSxXQUFLLENBQUMsRUFDL0NnQyxTQUFTLENBQUNtQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsRUFBQyxHQUFDLEVBQUNwQyxTQUFTLENBQUNtQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNFLFFBQ3RELENBRUksQ0FBQztBQUU5QixDQUFDO0FBQUM3QyxFQUFBLENBNURXRCxVQUFvQjtFQUFBLFFBRVpwQixxREFBVyxFQUtEVyxpR0FBaUIsRUFLeEJMLHlEQUFPO0FBQUE7QUFBQTZELEdBQUEsR0FabEIvQyxVQUFvQjtBQUFBLElBQUFKLEVBQUEsRUFBQUcsR0FBQSxFQUFBZ0QsR0FBQTtBQUFBQyxzQ0FBQSxDQUFBcEQsRUFBQTtBQUFBb0Qsc0NBQUEsQ0FBQWpELEdBQUE7QUFBQWlELHNDQUFBLENBQUFELEdBQUEsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzlCakMsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9TYW1oYW5kbGVyL1NhbWhhbmRsZXIudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHVzZVF1ZXJ5Q2xpZW50IH0gZnJvbSAnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5JztcbmltcG9ydCB7IEZvcm1Qcm92aWRlciB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5pbXBvcnQgeyB1c2VMb2NhdGlvbiB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQnV0dG9uLCBGaWVsZHNldCwgSGVhZGluZywgSFN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgeyB1c2VIdHRwIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLWh0dHAnO1xuXG5pbXBvcnQgeyBIZW50U2FtaGFuZGxlckZlbHQgfSBmcm9tICcuL0hlbnRTYW1oYW5kbGVyRmVsdCc7XG5pbXBvcnQgeyBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyB9IGZyb20gJy4uLy4uL2FwaS9oZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyc7XG5pbXBvcnQgeyBIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeSB9IGZyb20gJy4uLy4uL2hvb2tzL3VzZVNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcnO1xuaW1wb3J0IHsgT3BwcmV0dEZhZ3Nha0ZlbHRuYXZuIH0gZnJvbSAnLi4vLi4va29tcG9uZW50ZXIvTW9kYWwvZmFnc2FrL2Zvcm0vT3BwcmV0dEZhZ3Nha0Zvcm0nO1xuaW1wb3J0IHsgdXNlU2FtaGFuZGxlckZvcm0gfSBmcm9tICcuLi8uLi9rb21wb25lbnRlci9Nb2RhbC9mYWdzYWsvaG9va3MvdXNlU2FtaGFuZGxlckZvcm0nO1xuaW1wb3J0IHR5cGUgeyBJU2FtaGFuZGxlckluZm8gfSBmcm9tICcuLi8uLi90eXBlci9zYW1oYW5kbGVyJztcblxuY29uc3QgU2FtaGFuZGxlckNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA1MHB4KTtcbmA7XG5cbmNvbnN0IEhlbnRTYWtlckJ1dHRvbiA9IHN0eWxlZChCdXR0b24pYFxuICAgIG1hcmdpbi1sZWZ0OiAxcmVtO1xuICAgIG1hcmdpbi10b3A6IDJyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcbiAgICBoZWlnaHQ6IDNyZW07XG5gO1xuXG5leHBvcnQgY29uc3QgU2FtaGFuZGxlcjogUmVhY3QuRkMgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gICAgY29uc3QgW3F1ZXJ5RGF0YSwgc2V0UXVlcnlEYXRhXSA9IHVzZVN0YXRlPElTYW1oYW5kbGVySW5mbyB8IG51bGw+KFxuICAgICAgICBsb2NhdGlvbi5zdGF0ZS5icnVrZXIgPyBsb2NhdGlvbi5zdGF0ZS5icnVrZXIgOiB1bmRlZmluZWRcbiAgICApO1xuXG4gICAgY29uc3QgeyBmb3JtLCBvblN1Ym1pdCB9ID0gdXNlU2FtaGFuZGxlckZvcm0oe1xuICAgICAgICBzZXR0U2FtaGFuZGxlcjogc2FtaGFuZGxlciA9PiB7XG4gICAgICAgICAgICBvcHByZXR0RmFnc2FrRm9ybS5zZXRWYWx1ZShPcHByZXR0RmFnc2FrRmVsdG5hdm4uU0FNSEFORExFUiwgc2FtaGFuZGxlcik7XG4gICAgICAgIH0sXG4gICAgfSk7XG4gICAgY29uc3QgeyByZXF1ZXN0IH0gPSB1c2VIdHRwKCk7XG5cbiAgICBjb25zdCBza2plbWFFckzDpXN0ID0gZmFsc2U7IC8vc2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5IRU5URVI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8U2FtaGFuZGxlckNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9IGxldmVsPXsnMSd9PlxuICAgICAgICAgICAgICAgIFPDuGsgc2FtaGFuZGxlclxuICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgPEhTdGFjayBtYXJnaW5CbG9jaz17J3NwYWNlLTMyJ30+XG4gICAgICAgICAgICAgICAgPEZvcm1Qcm92aWRlciB7Li4uZm9ybX0+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICBvblN1Ym1pdD17Zm9ybS5oYW5kbGVTdWJtaXQoZm9ybVZhbHVlcyA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5Q2xpZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mZXRjaFF1ZXJ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5S2V5OiBIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeS5vcmcoZm9ybVZhbHVlcy5vcmduciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeUZuOiAoKSA9PiBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyhyZXF1ZXN0LCBmb3JtVmFsdWVzLm9yZ25yKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ociA9PiBzZXRRdWVyeURhdGEocikpXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RmllbGRzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Vycm9yPXtoZW50RnJvbnRlbmRGZWlsbWVsZGluZyhzYW1oYW5kbGVyU2tqZW1hLnN1Ym1pdFJlc3N1cnMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZD1cIlPDuGsgc2FtaGFuZGxlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUxlZ2VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxIZW50U2FtaGFuZGxlckZlbHQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNha2VyQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD17J3ByaW1hcnknfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9eydzdWJtaXQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e3NramVtYUVyTMOlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3NramVtYUVyTMOlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVudCBzYW1oYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0hlbnRTYWtlckJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgIDwvRm9ybVByb3ZpZGVyPlxuICAgICAgICAgICAgPC9IU3RhY2s+XG5cbiAgICAgICAgICAgIHtxdWVyeURhdGEgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgICAgIDxIZWFkaW5nIHNpemU9eydsYXJnZSd9PlxuICAgICAgICAgICAgICAgICAgICB7cXVlcnlEYXRhLnRzc0Vrc3Rlcm5JZH0ge3F1ZXJ5RGF0YS5uYXZufSA8YnIgLz5cbiAgICAgICAgICAgICAgICAgICAge3F1ZXJ5RGF0YS5hZHJlc3NlclswXS5hZHJlc3NlVHlwZX0ge3F1ZXJ5RGF0YS5hZHJlc3NlclswXS5wb3N0U3RlZH1cbiAgICAgICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICApfVxuICAgICAgICA8L1NhbWhhbmRsZXJDb250YWluZXI+XG4gICAgKTtcbn07XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIxMmQ2Nzk1N2U5N2M1MTI1NjgwMFwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwiRm9ybVByb3ZpZGVyIiwidXNlTG9jYXRpb24iLCJzdHlsZWQiLCJCdXR0b24iLCJGaWVsZHNldCIsIkhlYWRpbmciLCJIU3RhY2siLCJ1c2VIdHRwIiwiSGVudFNhbWhhbmRsZXJGZWx0IiwiaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWciLCJIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeSIsIk9wcHJldHRGYWdzYWtGZWx0bmF2biIsInVzZVNhbWhhbmRsZXJGb3JtIiwiU2FtaGFuZGxlckNvbnRhaW5lciIsImRpdiIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJfYyIsIkhlbnRTYWtlckJ1dHRvbiIsIl90ZW1wbGF0ZU9iamVjdDIiLCJfYzIiLCJTYW1oYW5kbGVyIiwiX3MiLCJsb2NhdGlvbiIsIl91c2VTdGF0ZSIsInN0YXRlIiwiYnJ1a2VyIiwidW5kZWZpbmVkIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5IiwicXVlcnlEYXRhIiwic2V0UXVlcnlEYXRhIiwiX3VzZVNhbWhhbmRsZXJGb3JtIiwic2V0dFNhbWhhbmRsZXIiLCJzYW1oYW5kbGVyIiwib3BwcmV0dEZhZ3Nha0Zvcm0iLCJzZXRWYWx1ZSIsIlNBTUhBTkRMRVIiLCJmb3JtIiwib25TdWJtaXQiLCJfdXNlSHR0cCIsInJlcXVlc3QiLCJza2plbWFFckzDpXN0IiwiY3JlYXRlRWxlbWVudCIsInNpemUiLCJsZXZlbCIsIm1hcmdpbkJsb2NrIiwiaGFuZGxlU3VibWl0IiwiZm9ybVZhbHVlcyIsInF1ZXJ5Q2xpZW50IiwiZmV0Y2hRdWVyeSIsInF1ZXJ5S2V5Iiwib3JnIiwib3JnbnIiLCJxdWVyeUZuIiwidGhlbiIsInIiLCJsZWdlbmQiLCJoaWRlTGVnZW5kIiwidmFyaWFudCIsInR5cGUiLCJsb2FkaW5nIiwiZGlzYWJsZWQiLCJ0c3NFa3N0ZXJuSWQiLCJuYXZuIiwiYWRyZXNzZXIiLCJhZHJlc3NlVHlwZSIsInBvc3RTdGVkIiwiX2MzIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==