"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/Kompetanse/useKompetanse.ts"
/*!********************************************************************************************************!*\
  !*** ./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/Kompetanse/useKompetanse.ts ***!
  \********************************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useKompetanse: () => (/* binding */ useKompetanse)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _typer_e_sPerioder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../typer/eøsPerioder */ "./src/frontend/typer/eøsPerioder.ts");
/* harmony import */ var _utils_e_s__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../utils/eøs */ "./src/frontend/utils/eøs.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _s = __webpack_require__.$Refresh$.signature();
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var useKompetanse = function useKompetanse(_ref) {
  _s();
  var åpenBehandling = _ref.åpenBehandling;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    kompetanser = _useState2[0],
    settKompetanser = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (åpenBehandling.kompetanser.length > 0) {
      settKompetanser(åpenBehandling.kompetanser.sort(function (periodeA, periodeB) {
        return (0,_utils_e_s__WEBPACK_IMPORTED_MODULE_3__["sorterEøsPerioder"])(periodeA, periodeB, åpenBehandling.personer);
      }));
    }
  }, [åpenBehandling]);
  var erKompetanserGyldige = function erKompetanserGyldige() {
    return hentKompetanserMedFeil().length === 0;
  };
  var hentKompetanserMedFeil = function hentKompetanserMedFeil() {
    return [
    //TODO NGHI SLETT
    {
      id: 2,
      fom: '2025-12',
      barnIdenter: ['123123123'],
      status: _typer_e_sPerioder__WEBPACK_IMPORTED_MODULE_2__["EøsPeriodeStatus"].IKKE_UTFYLT
    }, {
      id: 2,
      fom: '2025-12',
      barnIdenter: ['123123123'],
      status: _typer_e_sPerioder__WEBPACK_IMPORTED_MODULE_2__["EøsPeriodeStatus"].IKKE_UTFYLT
    }];
    //return kompetanser.filter(kompetanse => kompetanse.status !== EøsPeriodeStatus.OK);
  };
  return {
    kompetanser: kompetanser,
    erKompetanserGyldige: erKompetanserGyldige,
    hentKompetanserMedFeil: hentKompetanserMedFeil
  };
};
_s(useKompetanse, "RKeHFnj8oQq5a/kqBa4XJapgYGo=");


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
/******/ 	__webpack_require__.h = () => ("5af6ff99f64e2d830aa5")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5iYzdjYzg4MmNmNjk4ZDJlZDM4YS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBNEM7QUFJOEI7QUFDUDtBQU1uRSxJQUFNSSxhQUFhLEdBQUcsU0FBaEJBLGFBQWFBLENBQUFDLElBQUEsRUFBbUM7RUFBQUMsRUFBQTtFQUFBLElBQTdCQyxjQUFjLEdBQUFGLElBQUEsQ0FBZEUsY0FBYztFQUNuQyxJQUFBQyxTQUFBLEdBQXVDUCwrQ0FBUSxDQUFvQixFQUFFLENBQUM7SUFBQVEsVUFBQSxHQUFBQyxjQUFBLENBQUFGLFNBQUE7SUFBL0RHLFdBQVcsR0FBQUYsVUFBQTtJQUFFRyxlQUFlLEdBQUFILFVBQUE7RUFFbkNULGdEQUFTLENBQUMsWUFBTTtJQUNaLElBQUlPLGNBQWMsQ0FBQ0ksV0FBVyxDQUFDRSxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQ3ZDRCxlQUFlLENBQ1hMLGNBQWMsQ0FBQ0ksV0FBVyxDQUFDRyxJQUFJLENBQUMsVUFBQ0MsUUFBUSxFQUFFQyxRQUFRO1FBQUEsT0FDL0NiLGdFQUFpQixDQUFDWSxRQUFRLEVBQUVDLFFBQVEsRUFBRVQsY0FBYyxDQUFDVSxRQUFRLENBQUM7TUFBQSxDQUNsRSxDQUNKLENBQUM7SUFDTDtFQUNKLENBQUMsRUFBRSxDQUFDVixjQUFjLENBQUMsQ0FBQztFQUVwQixJQUFNVyxvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQW9CQSxDQUFBLEVBQWtCO0lBQ3hDLE9BQU9DLHNCQUFzQixDQUFDLENBQUMsQ0FBQ04sTUFBTSxLQUFLLENBQUM7RUFDaEQsQ0FBQztFQUVELElBQU1NLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBc0JBLENBQUEsRUFBNEI7SUFDcEQsT0FBTztJQUNIO0lBQ0E7TUFDSUMsRUFBRSxFQUFFLENBQUM7TUFDTEMsR0FBRyxFQUFFLFNBQVM7TUFDZEMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDO01BQzFCQyxNQUFNLEVBQUVyQixtRUFBZ0IsQ0FBQ3NCO0lBQzdCLENBQUMsRUFDRDtNQUNJSixFQUFFLEVBQUUsQ0FBQztNQUNMQyxHQUFHLEVBQUUsU0FBUztNQUNkQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUM7TUFDMUJDLE1BQU0sRUFBRXJCLG1FQUFnQixDQUFDc0I7SUFDN0IsQ0FBQyxDQUNKO0lBQ0Q7RUFDSixDQUFDO0VBRUQsT0FBTztJQUNIYixXQUFXLEVBQVhBLFdBQVc7SUFDWE8sb0JBQW9CLEVBQXBCQSxvQkFBb0I7SUFDcEJDLHNCQUFzQixFQUF0QkE7RUFDSixDQUFDO0FBQ0wsQ0FBQztBQUFDYixFQUFBLENBekNJRixhQUFhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDWG5CLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvRmFnc2FrL0JlaGFuZGxpbmcvU2lkZXIvQmVoYW5kbGluZ3NyZXN1bHRhdC9Fw7hzL0tvbXBldGFuc2UvdXNlS29tcGV0YW5zZS50cyIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBJQmVoYW5kbGluZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uLy4uL3R5cGVyL2JlaGFuZGxpbmcnO1xuaW1wb3J0IHR5cGUgeyBJUmVzdEtvbXBldGFuc2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi8uLi90eXBlci9lw7hzUGVyaW9kZXInO1xuaW1wb3J0IHsgRcO4c1BlcmlvZGVTdGF0dXMgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi8uLi90eXBlci9lw7hzUGVyaW9kZXInO1xuaW1wb3J0IHsgc29ydGVyRcO4c1BlcmlvZGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vLi4vdXRpbHMvZcO4cyc7XG5cbmludGVyZmFjZSBJUHJvcHMge1xuICAgIMOlcGVuQmVoYW5kbGluZzogSUJlaGFuZGxpbmc7XG59XG5cbmNvbnN0IHVzZUtvbXBldGFuc2UgPSAoeyDDpXBlbkJlaGFuZGxpbmcgfTogSVByb3BzKSA9PiB7XG4gICAgY29uc3QgW2tvbXBldGFuc2VyLCBzZXR0S29tcGV0YW5zZXJdID0gdXNlU3RhdGU8SVJlc3RLb21wZXRhbnNlW10+KFtdKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmICjDpXBlbkJlaGFuZGxpbmcua29tcGV0YW5zZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2V0dEtvbXBldGFuc2VyKFxuICAgICAgICAgICAgICAgIMOlcGVuQmVoYW5kbGluZy5rb21wZXRhbnNlci5zb3J0KChwZXJpb2RlQSwgcGVyaW9kZUIpID0+XG4gICAgICAgICAgICAgICAgICAgIHNvcnRlckXDuHNQZXJpb2RlcihwZXJpb2RlQSwgcGVyaW9kZUIsIMOlcGVuQmVoYW5kbGluZy5wZXJzb25lcilcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSwgW8OlcGVuQmVoYW5kbGluZ10pO1xuXG4gICAgY29uc3QgZXJLb21wZXRhbnNlckd5bGRpZ2UgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIHJldHVybiBoZW50S29tcGV0YW5zZXJNZWRGZWlsKCkubGVuZ3RoID09PSAwO1xuICAgIH07XG5cbiAgICBjb25zdCBoZW50S29tcGV0YW5zZXJNZWRGZWlsID0gKCk6IElSZXN0S29tcGV0YW5zZVtdID0+IHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIC8vVE9ETyBOR0hJIFNMRVRUXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDIsXG4gICAgICAgICAgICAgICAgZm9tOiAnMjAyNS0xMicsXG4gICAgICAgICAgICAgICAgYmFybklkZW50ZXI6IFsnMTIzMTIzMTIzJ10sXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBFw7hzUGVyaW9kZVN0YXR1cy5JS0tFX1VURllMVCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDIsXG4gICAgICAgICAgICAgICAgZm9tOiAnMjAyNS0xMicsXG4gICAgICAgICAgICAgICAgYmFybklkZW50ZXI6IFsnMTIzMTIzMTIzJ10sXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBFw7hzUGVyaW9kZVN0YXR1cy5JS0tFX1VURllMVCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG4gICAgICAgIC8vcmV0dXJuIGtvbXBldGFuc2VyLmZpbHRlcihrb21wZXRhbnNlID0+IGtvbXBldGFuc2Uuc3RhdHVzICE9PSBFw7hzUGVyaW9kZVN0YXR1cy5PSyk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGtvbXBldGFuc2VyLFxuICAgICAgICBlcktvbXBldGFuc2VyR3lsZGlnZSxcbiAgICAgICAgaGVudEtvbXBldGFuc2VyTWVkRmVpbCxcbiAgICB9O1xufTtcblxuZXhwb3J0IHsgdXNlS29tcGV0YW5zZSB9O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiNWFmNmZmOTlmNjRlMmQ4MzBhYTVcIikiXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJFw7hzUGVyaW9kZVN0YXR1cyIsInNvcnRlckXDuHNQZXJpb2RlciIsInVzZUtvbXBldGFuc2UiLCJfcmVmIiwiX3MiLCLDpXBlbkJlaGFuZGxpbmciLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJrb21wZXRhbnNlciIsInNldHRLb21wZXRhbnNlciIsImxlbmd0aCIsInNvcnQiLCJwZXJpb2RlQSIsInBlcmlvZGVCIiwicGVyc29uZXIiLCJlcktvbXBldGFuc2VyR3lsZGlnZSIsImhlbnRLb21wZXRhbnNlck1lZEZlaWwiLCJpZCIsImZvbSIsImJhcm5JZGVudGVyIiwic3RhdHVzIiwiSUtLRV9VVEZZTFQiXSwic291cmNlUm9vdCI6IiJ9