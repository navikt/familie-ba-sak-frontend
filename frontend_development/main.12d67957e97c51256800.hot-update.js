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
/******/ 	__webpack_require__.h = () => ("2a2ebc42896565aaf4f0")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxPQUFPLEVBQUVuQixZQUFhO0lBQ3RCb0IsUUFBUSxFQUFFcEI7RUFBYSxHQUMxQixpQkFFZ0IsQ0FDZixDQUNJLENBQ1YsQ0FBQyxFQUVSWixTQUFTLEtBQUssSUFBSSxpQkFDZmhDLDBEQUFBLENBQUNPLHFEQUFPO0lBQUN1QyxJQUFJLEVBQUU7RUFBUSxHQUNsQmQsU0FBUyxDQUFDaUMsWUFBWSxFQUFDLEdBQUMsRUFBQ2pDLFNBQVMsQ0FBQ2tDLElBQUksRUFBQyxHQUFDLGVBQUFsRSwwREFBQSxXQUFLLENBQUMsRUFDL0NnQyxTQUFTLENBQUNtQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsRUFBQyxHQUFDLEVBQUNwQyxTQUFTLENBQUNtQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNFLFFBQ3RELENBRUksQ0FBQztBQUU5QixDQUFDO0FBQUM3QyxFQUFBLENBM0RXRCxVQUFvQjtFQUFBLFFBQ1pwQixxREFBVyxFQUtEVyxpR0FBaUIsRUFLeEJMLHlEQUFPO0FBQUE7QUFBQTZELEdBQUEsR0FYbEIvQyxVQUFvQjtBQUFBLElBQUFKLEVBQUEsRUFBQUcsR0FBQSxFQUFBZ0QsR0FBQTtBQUFBQyxzQ0FBQSxDQUFBcEQsRUFBQTtBQUFBb0Qsc0NBQUEsQ0FBQWpELEdBQUE7QUFBQWlELHNDQUFBLENBQUFELEdBQUEsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzdCakMsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9TYW1oYW5kbGVyL1NhbWhhbmRsZXIudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEZvcm1Qcm92aWRlciB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5pbXBvcnQgeyB1c2VMb2NhdGlvbiB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQnV0dG9uLCBGaWVsZHNldCwgSGVhZGluZywgSFN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgeyB1c2VIdHRwIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLWh0dHAnO1xuXG5pbXBvcnQgeyBIZW50U2FtaGFuZGxlckZlbHQgfSBmcm9tICcuL0hlbnRTYW1oYW5kbGVyRmVsdCc7XG5pbXBvcnQgeyBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyB9IGZyb20gJy4uLy4uL2FwaS9oZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyc7XG5pbXBvcnQgeyBIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeSB9IGZyb20gJy4uLy4uL2hvb2tzL3VzZVNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcnO1xuaW1wb3J0IHsgT3BwcmV0dEZhZ3Nha0ZlbHRuYXZuIH0gZnJvbSAnLi4vLi4va29tcG9uZW50ZXIvTW9kYWwvZmFnc2FrL2Zvcm0vT3BwcmV0dEZhZ3Nha0Zvcm0nO1xuaW1wb3J0IHsgdXNlU2FtaGFuZGxlckZvcm0gfSBmcm9tICcuLi8uLi9rb21wb25lbnRlci9Nb2RhbC9mYWdzYWsvaG9va3MvdXNlU2FtaGFuZGxlckZvcm0nO1xuaW1wb3J0IHR5cGUgeyBJU2FtaGFuZGxlckluZm8gfSBmcm9tICcuLi8uLi90eXBlci9zYW1oYW5kbGVyJztcblxuY29uc3QgU2FtaGFuZGxlckNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA1MHB4KTtcbmA7XG5cbmNvbnN0IEhlbnRTYWtlckJ1dHRvbiA9IHN0eWxlZChCdXR0b24pYFxuICAgIG1hcmdpbi1sZWZ0OiAxcmVtO1xuICAgIG1hcmdpbi10b3A6IDJyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcbiAgICBoZWlnaHQ6IDNyZW07XG5gO1xuXG5leHBvcnQgY29uc3QgU2FtaGFuZGxlcjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gICAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICAgIGNvbnN0IFtxdWVyeURhdGEsIHNldFF1ZXJ5RGF0YV0gPSB1c2VTdGF0ZTxJU2FtaGFuZGxlckluZm8gfCBudWxsPihcbiAgICAgICAgbG9jYXRpb24uc3RhdGUuYnJ1a2VyID8gbG9jYXRpb24uc3RhdGUuYnJ1a2VyIDogdW5kZWZpbmVkXG4gICAgKTtcblxuICAgIGNvbnN0IHsgZm9ybSwgb25TdWJtaXQgfSA9IHVzZVNhbWhhbmRsZXJGb3JtKHtcbiAgICAgICAgc2V0dFNhbWhhbmRsZXI6IHNhbWhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgb3BwcmV0dEZhZ3Nha0Zvcm0uc2V0VmFsdWUoT3BwcmV0dEZhZ3Nha0ZlbHRuYXZuLlNBTUhBTkRMRVIsIHNhbWhhbmRsZXIpO1xuICAgICAgICB9LFxuICAgIH0pO1xuICAgIGNvbnN0IHsgcmVxdWVzdCB9ID0gdXNlSHR0cCgpO1xuXG4gICAgY29uc3Qgc2tqZW1hRXJMw6VzdCA9IGZhbHNlOyAvL3NhbWhhbmRsZXJTa2plbWEuc3VibWl0UmVzc3Vycy5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuSEVOVEVSO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPFNhbWhhbmRsZXJDb250YWluZXI+XG4gICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnbGFyZ2UnfSBsZXZlbD17JzEnfT5cbiAgICAgICAgICAgICAgICBTw7hrIHNhbWhhbmRsZXJcbiAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgIDxIU3RhY2sgbWFyZ2luQmxvY2s9eydzcGFjZS0zMid9PlxuICAgICAgICAgICAgICAgIDxGb3JtUHJvdmlkZXIgey4uLmZvcm19PlxuICAgICAgICAgICAgICAgICAgICA8Zm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgb25TdWJtaXQ9e2Zvcm0uaGFuZGxlU3VibWl0KGZvcm1WYWx1ZXMgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeUNsaWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmV0Y2hRdWVyeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeUtleTogSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3Rvcnkub3JnKGZvcm1WYWx1ZXMub3JnbnIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlGbjogKCkgPT4gaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcocmVxdWVzdCwgZm9ybVZhbHVlcy5vcmduciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHIgPT4gc2V0UXVlcnlEYXRhKHIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZpZWxkc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9lcnJvcj17aGVudEZyb250ZW5kRmVpbG1lbGRpbmcoc2FtaGFuZGxlclNramVtYS5zdWJtaXRSZXNzdXJzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmQ9XCJTw7hrIHNhbWhhbmRsZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVMZWdlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SGVudFNhbWhhbmRsZXJGZWx0IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEhlbnRTYWtlckJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9eydwcmltYXJ5J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXsnc3VibWl0J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nPXtza2plbWFFckzDpXN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtza2plbWFFckzDpXN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlbnQgc2FtaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9IZW50U2FrZXJCdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICA8L0Zvcm1Qcm92aWRlcj5cbiAgICAgICAgICAgIDwvSFN0YWNrPlxuXG4gICAgICAgICAgICB7cXVlcnlEYXRhICE9PSBudWxsICYmIChcbiAgICAgICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnbGFyZ2UnfT5cbiAgICAgICAgICAgICAgICAgICAge3F1ZXJ5RGF0YS50c3NFa3N0ZXJuSWR9IHtxdWVyeURhdGEubmF2bn0gPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgIHtxdWVyeURhdGEuYWRyZXNzZXJbMF0uYWRyZXNzZVR5cGV9IHtxdWVyeURhdGEuYWRyZXNzZXJbMF0ucG9zdFN0ZWR9XG4gICAgICAgICAgICAgICAgPC9IZWFkaW5nPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9TYW1oYW5kbGVyQ29udGFpbmVyPlxuICAgICk7XG59O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMmEyZWJjNDI4OTY1NjVhYWY0ZjBcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIkZvcm1Qcm92aWRlciIsInVzZUxvY2F0aW9uIiwic3R5bGVkIiwiQnV0dG9uIiwiRmllbGRzZXQiLCJIZWFkaW5nIiwiSFN0YWNrIiwidXNlSHR0cCIsIkhlbnRTYW1oYW5kbGVyRmVsdCIsImhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIiwiSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3RvcnkiLCJPcHByZXR0RmFnc2FrRmVsdG5hdm4iLCJ1c2VTYW1oYW5kbGVyRm9ybSIsIlNhbWhhbmRsZXJDb250YWluZXIiLCJkaXYiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiX2MiLCJIZW50U2FrZXJCdXR0b24iLCJfdGVtcGxhdGVPYmplY3QyIiwiX2MyIiwiU2FtaGFuZGxlciIsIl9zIiwibG9jYXRpb24iLCJfdXNlU3RhdGUiLCJzdGF0ZSIsImJydWtlciIsInVuZGVmaW5lZCIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInF1ZXJ5RGF0YSIsInNldFF1ZXJ5RGF0YSIsIl91c2VTYW1oYW5kbGVyRm9ybSIsInNldHRTYW1oYW5kbGVyIiwic2FtaGFuZGxlciIsIm9wcHJldHRGYWdzYWtGb3JtIiwic2V0VmFsdWUiLCJTQU1IQU5ETEVSIiwiZm9ybSIsIm9uU3VibWl0IiwiX3VzZUh0dHAiLCJyZXF1ZXN0Iiwic2tqZW1hRXJMw6VzdCIsImNyZWF0ZUVsZW1lbnQiLCJzaXplIiwibGV2ZWwiLCJtYXJnaW5CbG9jayIsImhhbmRsZVN1Ym1pdCIsImZvcm1WYWx1ZXMiLCJxdWVyeUNsaWVudCIsImZldGNoUXVlcnkiLCJxdWVyeUtleSIsIm9yZyIsIm9yZ25yIiwicXVlcnlGbiIsInRoZW4iLCJyIiwibGVnZW5kIiwiaGlkZUxlZ2VuZCIsInZhcmlhbnQiLCJ0eXBlIiwibG9hZGluZyIsImRpc2FibGVkIiwidHNzRWtzdGVybklkIiwibmF2biIsImFkcmVzc2VyIiwiYWRyZXNzZVR5cGUiLCJwb3N0U3RlZCIsIl9jMyIsIiRSZWZyZXNoUmVnJCJdLCJzb3VyY2VSb290IjoiIn0=