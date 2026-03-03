"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/Varsel/ManglendeSvalbardmerkingVarsel.tsx"
/*!***************************************************************************************************************!*\
  !*** ./src/frontend/sider/Fagsak/Behandling/Sider/Vilkårsvurdering/Varsel/ManglendeSvalbardmerkingVarsel.tsx ***!
  \***************************************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ManglendeSvalbardmerkingVarsel: () => (/* binding */ ManglendeSvalbardmerkingVarsel)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _utils_dato__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../utils/dato */ "./src/frontend/utils/dato/index.ts");
/* harmony import */ var _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../context/BehandlingContext */ "./src/frontend/sider/Fagsak/Behandling/context/BehandlingContext.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _s = __webpack_require__.$Refresh$.signature();




function ManglendeSvalbardmerkingVarsel() {
  _s();
  var _useBehandlingContext = (0,_context_BehandlingContext__WEBPACK_IMPORTED_MODULE_4__.useBehandlingContext)(),
    behandling = _useBehandlingContext.behandling;
  var skalViseVarsel = behandling.manglendeSvalbardmerking.length > 0;
  if (!skalViseVarsel) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.Alert, {
    variant: 'warning',
    contentMaxWidth: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    spacing: true,
    size: 'small',
    level: '3'
  }, "Bosatt p\xE5 Svalbard"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.VStack, {
    gap: 'space-8'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.BodyLong, null, "Personer i behandlingen har oppholdsadresse p\xE5 Svalbard i en periode hvor \xABBosatt p\xE5 Svalbard\xBB ikke er lagt til i \"Bosatt i riket\"-vilk\xE5ret. Dette gjelder:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.Table, {
    size: 'small',
    style: {
      width: '20rem'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.Table.Header, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.Table.Row, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.Table.HeaderCell, {
    scope: 'col'
  }, "Person"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.Table.HeaderCell, {
    scope: 'col'
  }, "Periode"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.Table.Body, null, behandling.manglendeSvalbardmerking.map(function (manglendeSvalbardmerking) {
    return manglendeSvalbardmerking.manglendeFinnmarkSvalbardMerkingPerioder.map(function (manglendeSvalbardmerkingPeriode, i) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.Table.Row, {
        key: i + manglendeSvalbardmerking.ident,
        shadeOnHover: false
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.Table.DataCell, null, manglendeSvalbardmerking.ident), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.Table.DataCell, null, (0,_utils_dato__WEBPACK_IMPORTED_MODULE_3__.isoDatoPeriodeTilFormatertString)({
        fom: manglendeSvalbardmerkingPeriode.fom,
        tom: manglendeSvalbardmerkingPeriode.tom
      })));
    });
  })))));
}
_s(ManglendeSvalbardmerkingVarsel, "mj3KjOaBlj+/xnmu/JObkPxXLJc=", false, function () {
  return [_context_BehandlingContext__WEBPACK_IMPORTED_MODULE_4__.useBehandlingContext];
});
_c = ManglendeSvalbardmerkingVarsel;
var _c;
__webpack_require__.$Refresh$.register(_c, "ManglendeSvalbardmerkingVarsel");

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
/******/ 	__webpack_require__.h = () => ("1eea09ba4d3f361a4792")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi43ZDRiZjNjYjk4ZjdhODAzNTc4Yi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBRWlEO0FBRUs7QUFDTjtBQUVuRSxTQUFTUSw4QkFBOEJBLENBQUEsRUFBRztFQUFBQyxFQUFBO0VBQzdDLElBQUFDLHFCQUFBLEdBQXVCSCxnRkFBb0IsQ0FBQyxDQUFDO0lBQXJDSSxVQUFVLEdBQUFELHFCQUFBLENBQVZDLFVBQVU7RUFFbEIsSUFBTUMsY0FBYyxHQUFHRCxVQUFVLENBQUNFLHdCQUF3QixDQUFDQyxNQUFNLEdBQUcsQ0FBQztFQUVyRSxJQUFJLENBQUNGLGNBQWMsRUFBRTtJQUNqQixPQUFPLElBQUk7RUFDZjtFQUVBLG9CQUNJWiwwREFBQSxDQUFDQyxtREFBSztJQUFDZSxPQUFPLEVBQUUsU0FBVTtJQUFDQyxlQUFlLEVBQUU7RUFBTSxnQkFDOUNqQiwwREFBQSxDQUFDRyxxREFBTztJQUFDZSxPQUFPLEVBQUUsSUFBSztJQUFDQyxJQUFJLEVBQUUsT0FBUTtJQUFDQyxLQUFLLEVBQUU7RUFBSSxHQUFDLHVCQUUxQyxDQUFDLGVBQ1ZwQiwwREFBQSxDQUFDSyxvREFBTTtJQUFDZ0IsR0FBRyxFQUFFO0VBQVUsZ0JBQ25CckIsMERBQUEsQ0FBQ0Usc0RBQVEsUUFBQyw4S0FHQSxDQUFDLGVBQ1hGLDBEQUFBLENBQUNJLG1EQUFLO0lBQUNlLElBQUksRUFBRSxPQUFRO0lBQUNHLEtBQUssRUFBRTtNQUFFQyxLQUFLLEVBQUU7SUFBUTtFQUFFLGdCQUM1Q3ZCLDBEQUFBLENBQUNJLG1EQUFLLENBQUNvQixNQUFNLHFCQUNUeEIsMERBQUEsQ0FBQ0ksbURBQUssQ0FBQ3FCLEdBQUcscUJBQ056QiwwREFBQSxDQUFDSSxtREFBSyxDQUFDc0IsVUFBVTtJQUFDQyxLQUFLLEVBQUU7RUFBTSxHQUFDLFFBQXdCLENBQUMsZUFDekQzQiwwREFBQSxDQUFDSSxtREFBSyxDQUFDc0IsVUFBVTtJQUFDQyxLQUFLLEVBQUU7RUFBTSxHQUFDLFNBQXlCLENBQ2xELENBQ0QsQ0FBQyxlQUNmM0IsMERBQUEsQ0FBQ0ksbURBQUssQ0FBQ3dCLElBQUksUUFDTmpCLFVBQVUsQ0FBQ0Usd0JBQXdCLENBQUNnQixHQUFHLENBQUMsVUFBQWhCLHdCQUF3QixFQUFJO0lBQ2pFLE9BQU9BLHdCQUF3QixDQUFDaUIsd0NBQXdDLENBQUNELEdBQUcsQ0FDeEUsVUFBQ0UsK0JBQStCLEVBQUVDLENBQUMsRUFBSztNQUNwQyxvQkFDSWhDLDBEQUFBLENBQUNJLG1EQUFLLENBQUNxQixHQUFHO1FBQUNRLEdBQUcsRUFBRUQsQ0FBQyxHQUFHbkIsd0JBQXdCLENBQUNxQixLQUFNO1FBQUNDLFlBQVksRUFBRTtNQUFNLGdCQUNwRW5DLDBEQUFBLENBQUNJLG1EQUFLLENBQUNnQyxRQUFRLFFBQUV2Qix3QkFBd0IsQ0FBQ3FCLEtBQXNCLENBQUMsZUFDakVsQywwREFBQSxDQUFDSSxtREFBSyxDQUFDZ0MsUUFBUSxRQUNWOUIsNkVBQWdDLENBQUM7UUFDOUIrQixHQUFHLEVBQUVOLCtCQUErQixDQUFDTSxHQUFHO1FBQ3hDQyxHQUFHLEVBQUVQLCtCQUErQixDQUFDTztNQUN6QyxDQUFDLENBQ1csQ0FDVCxDQUFDO0lBRXBCLENBQ0osQ0FBQztFQUNMLENBQUMsQ0FDTyxDQUNULENBQ0gsQ0FDTCxDQUFDO0FBRWhCO0FBQUM3QixFQUFBLENBakRlRCw4QkFBOEI7RUFBQSxRQUNuQkQsNEVBQW9CO0FBQUE7QUFBQWdDLEVBQUEsR0FEL0IvQiw4QkFBOEI7QUFBQSxJQUFBK0IsRUFBQTtBQUFBQyxzQ0FBQSxDQUFBRCxFQUFBLG9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNQOUMsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9GYWdzYWsvQmVoYW5kbGluZy9TaWRlci9WaWxrw6Vyc3Z1cmRlcmluZy9WYXJzZWwvTWFuZ2xlbmRlU3ZhbGJhcmRtZXJraW5nVmFyc2VsLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQWxlcnQsIEJvZHlMb25nLCBIZWFkaW5nLCBUYWJsZSwgVlN0YWNrIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5cbmltcG9ydCB7IGlzb0RhdG9QZXJpb2RlVGlsRm9ybWF0ZXJ0U3RyaW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vdXRpbHMvZGF0byc7XG5pbXBvcnQgeyB1c2VCZWhhbmRsaW5nQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uL2NvbnRleHQvQmVoYW5kbGluZ0NvbnRleHQnO1xuXG5leHBvcnQgZnVuY3Rpb24gTWFuZ2xlbmRlU3ZhbGJhcmRtZXJraW5nVmFyc2VsKCkge1xuICAgIGNvbnN0IHsgYmVoYW5kbGluZyB9ID0gdXNlQmVoYW5kbGluZ0NvbnRleHQoKTtcblxuICAgIGNvbnN0IHNrYWxWaXNlVmFyc2VsID0gYmVoYW5kbGluZy5tYW5nbGVuZGVTdmFsYmFyZG1lcmtpbmcubGVuZ3RoID4gMDtcblxuICAgIGlmICghc2thbFZpc2VWYXJzZWwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEFsZXJ0IHZhcmlhbnQ9eyd3YXJuaW5nJ30gY29udGVudE1heFdpZHRoPXtmYWxzZX0+XG4gICAgICAgICAgICA8SGVhZGluZyBzcGFjaW5nPXt0cnVlfSBzaXplPXsnc21hbGwnfSBsZXZlbD17JzMnfT5cbiAgICAgICAgICAgICAgICBCb3NhdHQgcMOlIFN2YWxiYXJkXG4gICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICA8VlN0YWNrIGdhcD17J3NwYWNlLTgnfT5cbiAgICAgICAgICAgICAgICA8Qm9keUxvbmc+XG4gICAgICAgICAgICAgICAgICAgIFBlcnNvbmVyIGkgYmVoYW5kbGluZ2VuIGhhciBvcHBob2xkc2FkcmVzc2UgcMOlIFN2YWxiYXJkIGkgZW4gcGVyaW9kZSBodm9yIMKrQm9zYXR0IHDDpSBTdmFsYmFyZMK7IGlra2VcbiAgICAgICAgICAgICAgICAgICAgZXIgbGFndCB0aWwgaSBcIkJvc2F0dCBpIHJpa2V0XCItdmlsa8OlcmV0LiBEZXR0ZSBnamVsZGVyOlxuICAgICAgICAgICAgICAgIDwvQm9keUxvbmc+XG4gICAgICAgICAgICAgICAgPFRhYmxlIHNpemU9eydzbWFsbCd9IHN0eWxlPXt7IHdpZHRoOiAnMjByZW0nIH19PlxuICAgICAgICAgICAgICAgICAgICA8VGFibGUuSGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRhYmxlLlJvdz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGFibGUuSGVhZGVyQ2VsbCBzY29wZT17J2NvbCd9PlBlcnNvbjwvVGFibGUuSGVhZGVyQ2VsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGFibGUuSGVhZGVyQ2VsbCBzY29wZT17J2NvbCd9PlBlcmlvZGU8L1RhYmxlLkhlYWRlckNlbGw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L1RhYmxlLlJvdz5cbiAgICAgICAgICAgICAgICAgICAgPC9UYWJsZS5IZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZS5Cb2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAge2JlaGFuZGxpbmcubWFuZ2xlbmRlU3ZhbGJhcmRtZXJraW5nLm1hcChtYW5nbGVuZGVTdmFsYmFyZG1lcmtpbmcgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYW5nbGVuZGVTdmFsYmFyZG1lcmtpbmcubWFuZ2xlbmRlRmlubm1hcmtTdmFsYmFyZE1lcmtpbmdQZXJpb2Rlci5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtYW5nbGVuZGVTdmFsYmFyZG1lcmtpbmdQZXJpb2RlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZS5Sb3cga2V5PXtpICsgbWFuZ2xlbmRlU3ZhbGJhcmRtZXJraW5nLmlkZW50fSBzaGFkZU9uSG92ZXI9e2ZhbHNlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRhYmxlLkRhdGFDZWxsPnttYW5nbGVuZGVTdmFsYmFyZG1lcmtpbmcuaWRlbnR9PC9UYWJsZS5EYXRhQ2VsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRhYmxlLkRhdGFDZWxsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzb0RhdG9QZXJpb2RlVGlsRm9ybWF0ZXJ0U3RyaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb206IG1hbmdsZW5kZVN2YWxiYXJkbWVya2luZ1BlcmlvZGUuZm9tLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvbTogbWFuZ2xlbmRlU3ZhbGJhcmRtZXJraW5nUGVyaW9kZS50b20sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UYWJsZS5EYXRhQ2VsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RhYmxlLlJvdz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIDwvVGFibGUuQm9keT5cbiAgICAgICAgICAgICAgICA8L1RhYmxlPlxuICAgICAgICAgICAgPC9WU3RhY2s+XG4gICAgICAgIDwvQWxlcnQ+XG4gICAgKTtcbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjFlZWEwOWJhNGQzZjM2MWE0NzkyXCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwiQWxlcnQiLCJCb2R5TG9uZyIsIkhlYWRpbmciLCJUYWJsZSIsIlZTdGFjayIsImlzb0RhdG9QZXJpb2RlVGlsRm9ybWF0ZXJ0U3RyaW5nIiwidXNlQmVoYW5kbGluZ0NvbnRleHQiLCJNYW5nbGVuZGVTdmFsYmFyZG1lcmtpbmdWYXJzZWwiLCJfcyIsIl91c2VCZWhhbmRsaW5nQ29udGV4dCIsImJlaGFuZGxpbmciLCJza2FsVmlzZVZhcnNlbCIsIm1hbmdsZW5kZVN2YWxiYXJkbWVya2luZyIsImxlbmd0aCIsImNyZWF0ZUVsZW1lbnQiLCJ2YXJpYW50IiwiY29udGVudE1heFdpZHRoIiwic3BhY2luZyIsInNpemUiLCJsZXZlbCIsImdhcCIsInN0eWxlIiwid2lkdGgiLCJIZWFkZXIiLCJSb3ciLCJIZWFkZXJDZWxsIiwic2NvcGUiLCJCb2R5IiwibWFwIiwibWFuZ2xlbmRlRmlubm1hcmtTdmFsYmFyZE1lcmtpbmdQZXJpb2RlciIsIm1hbmdsZW5kZVN2YWxiYXJkbWVya2luZ1BlcmlvZGUiLCJpIiwia2V5IiwiaWRlbnQiLCJzaGFkZU9uSG92ZXIiLCJEYXRhQ2VsbCIsImZvbSIsInRvbSIsIl9jIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==