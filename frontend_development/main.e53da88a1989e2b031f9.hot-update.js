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
    enabled: !!orgNr
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
/******/ 	__webpack_require__.h = () => ("45a4490142da82486ef3")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5lNTNkYTg4YTE5ODllMmIwMzFmOS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaUQ7QUFFRjtBQUU0QztBQUVwRixJQUFNRywrQ0FBK0MsR0FBRztFQUMzREMsR0FBRyxFQUFFLFNBQUxBLEdBQUdBLENBQUdDLEtBQWE7SUFBQSxPQUFLLENBQUMsOEJBQThCLEVBQUVBLEtBQUssQ0FBQztFQUFBO0FBQ25FLENBQUM7QUFFTSxTQUFTQyxtQ0FBbUNBLENBQUNELEtBQWEsRUFBRTtFQUFBRSxFQUFBO0VBQy9ELElBQUFDLFFBQUEsR0FBb0JQLDZEQUFPLENBQUMsQ0FBQztJQUFyQlEsT0FBTyxHQUFBRCxRQUFBLENBQVBDLE9BQU87RUFDZixPQUFPVCwrREFBUSxDQUFDO0lBQ1pVLFFBQVEsRUFBRVAsK0NBQStDLENBQUNDLEdBQUcsQ0FBQ0MsS0FBSyxDQUFDO0lBQ3BFTSxPQUFPLEVBQUUsU0FBVEEsT0FBT0EsQ0FBQTtNQUFBLE9BQVFULHVHQUFnQyxDQUFDTyxPQUFPLEVBQUVKLEtBQUssQ0FBQztJQUFBO0lBQy9ETyxPQUFPLEVBQUUsQ0FBQyxDQUFDUDtFQUNmLENBQUMsQ0FBQztBQUNOO0FBQUNFLEVBQUEsQ0FQZUQsbUNBQW1DO0VBQUEsUUFDM0JMLHlEQUFPLEVBQ3BCRCwyREFBUTtBQUFBLEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ1puQixzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL2hvb2tzL3VzZVNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcudHMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVF1ZXJ5IH0gZnJvbSAnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5JztcblxuaW1wb3J0IHsgdXNlSHR0cCB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS1odHRwJztcblxuaW1wb3J0IHsgaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcgfSBmcm9tICcuLi9hcGkvaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcnO1xuXG5leHBvcnQgY29uc3QgSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3RvcnkgPSB7XG4gICAgb3JnOiAob3JnTnI6IHN0cmluZykgPT4gWydzYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnJywgb3JnTnJdLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnKG9yZ05yOiBzdHJpbmcpIHtcbiAgICBjb25zdCB7IHJlcXVlc3QgfSA9IHVzZUh0dHAoKTtcbiAgICByZXR1cm4gdXNlUXVlcnkoe1xuICAgICAgICBxdWVyeUtleTogSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3Rvcnkub3JnKG9yZ05yKSxcbiAgICAgICAgcXVlcnlGbjogKCkgPT4gaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcocmVxdWVzdCwgb3JnTnIpLFxuICAgICAgICBlbmFibGVkOiAhIW9yZ05yLFxuICAgIH0pO1xufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiNDVhNDQ5MDE0MmRhODI0ODZlZjNcIikiXSwibmFtZXMiOlsidXNlUXVlcnkiLCJ1c2VIdHRwIiwiaGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWciLCJIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeSIsIm9yZyIsIm9yZ05yIiwidXNlSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWciLCJfcyIsIl91c2VIdHRwIiwicmVxdWVzdCIsInF1ZXJ5S2V5IiwicXVlcnlGbiIsImVuYWJsZWQiXSwic291cmNlUm9vdCI6IiJ9