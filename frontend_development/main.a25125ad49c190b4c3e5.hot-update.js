"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/hooks/useSamhandlerdataForOrgNrConfig.ts"
/*!***************************************************************!*\
  !*** ./src/frontend/hooks/useSamhandlerdataForOrgNrConfig.ts ***!
  \***************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HentSamhandlerdataForOrgNrConfigQueryKeyFactory: () => (/* binding */ HentSamhandlerdataForOrgNrConfigQueryKeyFactory),
/* harmony export */   useHentSamhandlerdataForOrgNrConfig: () => (/* binding */ useHentSamhandlerdataForOrgNrConfig)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _navikt_familie_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @navikt/familie-http */ "./node_modules/@navikt/familie-http/dist/index.js");
/* harmony import */ var _api_hentSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/hentSamhandlerdataForOrgNrConfig */ "./src/frontend/api/hentSamhandlerdataForOrgNrConfig.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _s = __webpack_require__.$Refresh$.signature();



var HentSamhandlerdataForOrgNrConfigQueryKeyFactory = {
  org: function org(orgNr) {
    return ['samhandlerdataForOrgNrConfig', orgNr];
  }
};
function useHentSamhandlerdataForOrgNrConfig(orgNr) {
  _s();
  var _useHttp = (0,_navikt_familie_http__WEBPACK_IMPORTED_MODULE_2__.useHttp)(),
    request = _useHttp.request;
  return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)({
    queryKey: HentSamhandlerdataForOrgNrConfigQueryKeyFactory.org(orgNr),
    queryFn: function queryFn() {
      return (0,_api_hentSamhandlerdataForOrgNrConfig__WEBPACK_IMPORTED_MODULE_3__.hentSamhandlerdataForOrgNrConfig)(request, orgNr);
    },
    disabled: !!orgNr
  });
}
_s(useHentSamhandlerdataForOrgNrConfig, "lcuUbhob9cfw89HtFnoznSywVy4=", false, function () {
  return [_navikt_familie_http__WEBPACK_IMPORTED_MODULE_2__.useHttp, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery];
});

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
/******/ 	__webpack_require__.h = () => ("e53da88a1989e2b031f9")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5hMjUxMjVhZDQ5YzE5MGI0YzNlNS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaUQ7QUFFRjtBQUU0QztBQUVwRixJQUFNRywrQ0FBK0MsR0FBRztFQUMzREMsR0FBRyxFQUFFLFNBQUxBLEdBQUdBLENBQUdDLEtBQWE7SUFBQSxPQUFLLENBQUMsOEJBQThCLEVBQUVBLEtBQUssQ0FBQztFQUFBO0FBQ25FLENBQUM7QUFFTSxTQUFTQyxtQ0FBbUNBLENBQUNELEtBQWEsRUFBRTtFQUFBRSxFQUFBO0VBQy9ELElBQUFDLFFBQUEsR0FBb0JQLDZEQUFPLENBQUMsQ0FBQztJQUFyQlEsT0FBTyxHQUFBRCxRQUFBLENBQVBDLE9BQU87RUFDZixPQUFPVCwrREFBUSxDQUFDO0lBQ1pVLFFBQVEsRUFBRVAsK0NBQStDLENBQUNDLEdBQUcsQ0FBQ0MsS0FBSyxDQUFDO0lBQ3BFTSxPQUFPLEVBQUUsU0FBVEEsT0FBT0EsQ0FBQTtNQUFBLE9BQVFULHVHQUFnQyxDQUFDTyxPQUFPLEVBQUVKLEtBQUssQ0FBQztJQUFBO0lBQy9ETyxRQUFRLEVBQUUsQ0FBQyxDQUFDUDtFQUNoQixDQUFDLENBQUM7QUFDTjtBQUFDRSxFQUFBLENBUGVELG1DQUFtQztFQUFBLFFBQzNCTCx5REFBTyxFQUNwQkQsMkRBQVE7QUFBQSxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNabkIsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9ob29rcy91c2VTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnLnRzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VRdWVyeSB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XG5cbmltcG9ydCB7IHVzZUh0dHAgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtaHR0cCc7XG5cbmltcG9ydCB7IGhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIH0gZnJvbSAnLi4vYXBpL2hlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnJztcblxuZXhwb3J0IGNvbnN0IEhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5ID0ge1xuICAgIG9yZzogKG9yZ05yOiBzdHJpbmcpID0+IFsnc2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZycsIG9yZ05yXSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyhvcmdOcjogc3RyaW5nKSB7XG4gICAgY29uc3QgeyByZXF1ZXN0IH0gPSB1c2VIdHRwKCk7XG4gICAgcmV0dXJuIHVzZVF1ZXJ5KHtcbiAgICAgICAgcXVlcnlLZXk6IEhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5Lm9yZyhvcmdOciksXG4gICAgICAgIHF1ZXJ5Rm46ICgpID0+IGhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnKHJlcXVlc3QsIG9yZ05yKSxcbiAgICAgICAgZGlzYWJsZWQ6ICEhb3JnTnIsXG4gICAgfSk7XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJlNTNkYTg4YTE5ODllMmIwMzFmOVwiKSJdLCJuYW1lcyI6WyJ1c2VRdWVyeSIsInVzZUh0dHAiLCJoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyIsIkhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnUXVlcnlLZXlGYWN0b3J5Iiwib3JnIiwib3JnTnIiLCJ1c2VIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyIsIl9zIiwiX3VzZUh0dHAiLCJyZXF1ZXN0IiwicXVlcnlLZXkiLCJxdWVyeUZuIiwiZGlzYWJsZWQiXSwic291cmNlUm9vdCI6IiJ9