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
    return [{
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
/******/ 	__webpack_require__.h = () => ("250b71a8cc5312faac06")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5hNDczNGU3NjNiZjRiOTZiOTRhYy5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBNEM7QUFJOEI7QUFDUDtBQU1uRSxJQUFNSSxhQUFhLEdBQUcsU0FBaEJBLGFBQWFBLENBQUFDLElBQUEsRUFBbUM7RUFBQUMsRUFBQTtFQUFBLElBQTdCQyxjQUFjLEdBQUFGLElBQUEsQ0FBZEUsY0FBYztFQUNuQyxJQUFBQyxTQUFBLEdBQXVDUCwrQ0FBUSxDQUFvQixFQUFFLENBQUM7SUFBQVEsVUFBQSxHQUFBQyxjQUFBLENBQUFGLFNBQUE7SUFBL0RHLFdBQVcsR0FBQUYsVUFBQTtJQUFFRyxlQUFlLEdBQUFILFVBQUE7RUFFbkNULGdEQUFTLENBQUMsWUFBTTtJQUNaLElBQUlPLGNBQWMsQ0FBQ0ksV0FBVyxDQUFDRSxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQ3ZDRCxlQUFlLENBQ1hMLGNBQWMsQ0FBQ0ksV0FBVyxDQUFDRyxJQUFJLENBQUMsVUFBQ0MsUUFBUSxFQUFFQyxRQUFRO1FBQUEsT0FDL0NiLGdFQUFpQixDQUFDWSxRQUFRLEVBQUVDLFFBQVEsRUFBRVQsY0FBYyxDQUFDVSxRQUFRLENBQUM7TUFBQSxDQUNsRSxDQUNKLENBQUM7SUFDTDtFQUNKLENBQUMsRUFBRSxDQUFDVixjQUFjLENBQUMsQ0FBQztFQUVwQixJQUFNVyxvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQW9CQSxDQUFBLEVBQWtCO0lBQ3hDLE9BQU9DLHNCQUFzQixDQUFDLENBQUMsQ0FBQ04sTUFBTSxLQUFLLENBQUM7RUFDaEQsQ0FBQztFQUVELElBQU1NLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBc0JBLENBQUEsRUFBNEI7SUFDcEQsT0FBTyxDQUNIO01BQ0lDLEVBQUUsRUFBRSxDQUFDO01BQ0xDLEdBQUcsRUFBRSxTQUFTO01BQ2RDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQztNQUMxQkMsTUFBTSxFQUFFckIsbUVBQWdCLENBQUNzQjtJQUM3QixDQUFDLEVBQ0Q7TUFDSUosRUFBRSxFQUFFLENBQUM7TUFDTEMsR0FBRyxFQUFFLFNBQVM7TUFDZEMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDO01BQzFCQyxNQUFNLEVBQUVyQixtRUFBZ0IsQ0FBQ3NCO0lBQzdCLENBQUMsQ0FDSjtJQUNEO0VBQ0osQ0FBQztFQUVELE9BQU87SUFDSGIsV0FBVyxFQUFYQSxXQUFXO0lBQ1hPLG9CQUFvQixFQUFwQkEsb0JBQW9CO0lBQ3BCQyxzQkFBc0IsRUFBdEJBO0VBQ0osQ0FBQztBQUNMLENBQUM7QUFBQ2IsRUFBQSxDQXhDSUYsYUFBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ1huQixzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL0ZhZ3Nhay9CZWhhbmRsaW5nL1NpZGVyL0JlaGFuZGxpbmdzcmVzdWx0YXQvRcO4cy9Lb21wZXRhbnNlL3VzZUtvbXBldGFuc2UudHMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgSUJlaGFuZGxpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi8uLi90eXBlci9iZWhhbmRsaW5nJztcbmltcG9ydCB0eXBlIHsgSVJlc3RLb21wZXRhbnNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvZcO4c1BlcmlvZGVyJztcbmltcG9ydCB7IEXDuHNQZXJpb2RlU3RhdHVzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvZcO4c1BlcmlvZGVyJztcbmltcG9ydCB7IHNvcnRlckXDuHNQZXJpb2RlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uLy4uL3V0aWxzL2XDuHMnO1xuXG5pbnRlcmZhY2UgSVByb3BzIHtcbiAgICDDpXBlbkJlaGFuZGxpbmc6IElCZWhhbmRsaW5nO1xufVxuXG5jb25zdCB1c2VLb21wZXRhbnNlID0gKHsgw6VwZW5CZWhhbmRsaW5nIH06IElQcm9wcykgPT4ge1xuICAgIGNvbnN0IFtrb21wZXRhbnNlciwgc2V0dEtvbXBldGFuc2VyXSA9IHVzZVN0YXRlPElSZXN0S29tcGV0YW5zZVtdPihbXSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAow6VwZW5CZWhhbmRsaW5nLmtvbXBldGFuc2VyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNldHRLb21wZXRhbnNlcihcbiAgICAgICAgICAgICAgICDDpXBlbkJlaGFuZGxpbmcua29tcGV0YW5zZXIuc29ydCgocGVyaW9kZUEsIHBlcmlvZGVCKSA9PlxuICAgICAgICAgICAgICAgICAgICBzb3J0ZXJFw7hzUGVyaW9kZXIocGVyaW9kZUEsIHBlcmlvZGVCLCDDpXBlbkJlaGFuZGxpbmcucGVyc29uZXIpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0sIFvDpXBlbkJlaGFuZGxpbmddKTtcblxuICAgIGNvbnN0IGVyS29tcGV0YW5zZXJHeWxkaWdlID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICByZXR1cm4gaGVudEtvbXBldGFuc2VyTWVkRmVpbCgpLmxlbmd0aCA9PT0gMDtcbiAgICB9O1xuXG4gICAgY29uc3QgaGVudEtvbXBldGFuc2VyTWVkRmVpbCA9ICgpOiBJUmVzdEtvbXBldGFuc2VbXSA9PiB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDIsXG4gICAgICAgICAgICAgICAgZm9tOiAnMjAyNS0xMicsXG4gICAgICAgICAgICAgICAgYmFybklkZW50ZXI6IFsnMTIzMTIzMTIzJ10sXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBFw7hzUGVyaW9kZVN0YXR1cy5JS0tFX1VURllMVCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDIsXG4gICAgICAgICAgICAgICAgZm9tOiAnMjAyNS0xMicsXG4gICAgICAgICAgICAgICAgYmFybklkZW50ZXI6IFsnMTIzMTIzMTIzJ10sXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBFw7hzUGVyaW9kZVN0YXR1cy5JS0tFX1VURllMVCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG4gICAgICAgIC8vcmV0dXJuIGtvbXBldGFuc2VyLmZpbHRlcihrb21wZXRhbnNlID0+IGtvbXBldGFuc2Uuc3RhdHVzICE9PSBFw7hzUGVyaW9kZVN0YXR1cy5PSyk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGtvbXBldGFuc2VyLFxuICAgICAgICBlcktvbXBldGFuc2VyR3lsZGlnZSxcbiAgICAgICAgaGVudEtvbXBldGFuc2VyTWVkRmVpbCxcbiAgICB9O1xufTtcblxuZXhwb3J0IHsgdXNlS29tcGV0YW5zZSB9O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMjUwYjcxYThjYzUzMTJmYWFjMDZcIikiXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJFw7hzUGVyaW9kZVN0YXR1cyIsInNvcnRlckXDuHNQZXJpb2RlciIsInVzZUtvbXBldGFuc2UiLCJfcmVmIiwiX3MiLCLDpXBlbkJlaGFuZGxpbmciLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJrb21wZXRhbnNlciIsInNldHRLb21wZXRhbnNlciIsImxlbmd0aCIsInNvcnQiLCJwZXJpb2RlQSIsInBlcmlvZGVCIiwicGVyc29uZXIiLCJlcktvbXBldGFuc2VyR3lsZGlnZSIsImhlbnRLb21wZXRhbnNlck1lZEZlaWwiLCJpZCIsImZvbSIsImJhcm5JZGVudGVyIiwic3RhdHVzIiwiSUtLRV9VVEZZTFQiXSwic291cmNlUm9vdCI6IiJ9