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
    disabled: orgNr
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
/******/ 	__webpack_require__.h = () => ("a25125ad49c190b4c3e5")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi40OWQ4NzgyNTdhOGQ2NTc0OGJlMi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaUQ7QUFFRjtBQUU0QztBQUVwRixJQUFNRywrQ0FBK0MsR0FBRztFQUMzREMsR0FBRyxFQUFFLFNBQUxBLEdBQUdBLENBQUdDLEtBQWE7SUFBQSxPQUFLLENBQUMsOEJBQThCLEVBQUVBLEtBQUssQ0FBQztFQUFBO0FBQ25FLENBQUM7QUFFTSxTQUFTQyxtQ0FBbUNBLENBQUNELEtBQWEsRUFBRTtFQUFBRSxFQUFBO0VBQy9ELElBQUFDLFFBQUEsR0FBb0JQLDZEQUFPLENBQUMsQ0FBQztJQUFyQlEsT0FBTyxHQUFBRCxRQUFBLENBQVBDLE9BQU87RUFDZixPQUFPVCwrREFBUSxDQUFDO0lBQ1pVLFFBQVEsRUFBRVAsK0NBQStDLENBQUNDLEdBQUcsQ0FBQ0MsS0FBSyxDQUFDO0lBQ3BFTSxPQUFPLEVBQUUsU0FBVEEsT0FBT0EsQ0FBQTtNQUFBLE9BQVFULHVHQUFnQyxDQUFDTyxPQUFPLEVBQUVKLEtBQUssQ0FBQztJQUFBO0lBQy9ETyxRQUFRLEVBQUVQO0VBQ2QsQ0FBQyxDQUFDO0FBQ047QUFBQ0UsRUFBQSxDQVBlRCxtQ0FBbUM7RUFBQSxRQUMzQkwseURBQU8sRUFDcEJELDJEQUFRO0FBQUEsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDWm5CLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvaG9va3MvdXNlU2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZy50cyIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlUXVlcnkgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknO1xuXG5pbXBvcnQgeyB1c2VIdHRwIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLWh0dHAnO1xuXG5pbXBvcnQgeyBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyB9IGZyb20gJy4uL2FwaS9oZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeSA9IHtcbiAgICBvcmc6IChvcmdOcjogc3RyaW5nKSA9PiBbJ3NhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcnLCBvcmdOcl0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWcob3JnTnI6IHN0cmluZykge1xuICAgIGNvbnN0IHsgcmVxdWVzdCB9ID0gdXNlSHR0cCgpO1xuICAgIHJldHVybiB1c2VRdWVyeSh7XG4gICAgICAgIHF1ZXJ5S2V5OiBIZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZ1F1ZXJ5S2V5RmFjdG9yeS5vcmcob3JnTnIpLFxuICAgICAgICBxdWVyeUZuOiAoKSA9PiBoZW50U2FtaGFuZGxlcmRhdGFGb3JPcmdOckNvbmZpZyhyZXF1ZXN0LCBvcmdOciksXG4gICAgICAgIGRpc2FibGVkOiBvcmdOcixcbiAgICB9KTtcbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImEyNTEyNWFkNDljMTkwYjRjM2U1XCIpIl0sIm5hbWVzIjpbInVzZVF1ZXJ5IiwidXNlSHR0cCIsImhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIiwiSGVudFNhbWhhbmRsZXJkYXRhRm9yT3JnTnJDb25maWdRdWVyeUtleUZhY3RvcnkiLCJvcmciLCJvcmdOciIsInVzZUhlbnRTYW1oYW5kbGVyZGF0YUZvck9yZ05yQ29uZmlnIiwiX3MiLCJfdXNlSHR0cCIsInJlcXVlc3QiLCJxdWVyeUtleSIsInF1ZXJ5Rm4iLCJkaXNhYmxlZCJdLCJzb3VyY2VSb290IjoiIn0=