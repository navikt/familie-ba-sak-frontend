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
/******/ 	__webpack_require__.h = () => ("a4734e763bf4b96b94ac")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4yMjI1YjNlMTU2NjdiNDY1ZWVkNC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBNEM7QUFJOEI7QUFDUDtBQU1uRSxJQUFNSSxhQUFhLEdBQUcsU0FBaEJBLGFBQWFBLENBQUFDLElBQUEsRUFBbUM7RUFBQUMsRUFBQTtFQUFBLElBQTdCQyxjQUFjLEdBQUFGLElBQUEsQ0FBZEUsY0FBYztFQUNuQyxJQUFBQyxTQUFBLEdBQXVDUCwrQ0FBUSxDQUFvQixFQUFFLENBQUM7SUFBQVEsVUFBQSxHQUFBQyxjQUFBLENBQUFGLFNBQUE7SUFBL0RHLFdBQVcsR0FBQUYsVUFBQTtJQUFFRyxlQUFlLEdBQUFILFVBQUE7RUFFbkNULGdEQUFTLENBQUMsWUFBTTtJQUNaLElBQUlPLGNBQWMsQ0FBQ0ksV0FBVyxDQUFDRSxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQ3ZDRCxlQUFlLENBQ1hMLGNBQWMsQ0FBQ0ksV0FBVyxDQUFDRyxJQUFJLENBQUMsVUFBQ0MsUUFBUSxFQUFFQyxRQUFRO1FBQUEsT0FDL0NiLGdFQUFpQixDQUFDWSxRQUFRLEVBQUVDLFFBQVEsRUFBRVQsY0FBYyxDQUFDVSxRQUFRLENBQUM7TUFBQSxDQUNsRSxDQUNKLENBQUM7SUFDTDtFQUNKLENBQUMsRUFBRSxDQUFDVixjQUFjLENBQUMsQ0FBQztFQUVwQixJQUFNVyxvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQW9CQSxDQUFBLEVBQWtCO0lBQ3hDLE9BQU9DLHNCQUFzQixDQUFDLENBQUMsQ0FBQ04sTUFBTSxLQUFLLENBQUM7RUFDaEQsQ0FBQztFQUVELElBQU1NLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBc0JBLENBQUEsRUFBNEI7SUFDcEQsT0FBTyxDQUNIO01BQ0lDLEVBQUUsRUFBRSxDQUFDO01BQ0xDLEdBQUcsRUFBRSxTQUFTO01BQ2RDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQztNQUMxQkMsTUFBTSxFQUFFckIsbUVBQWdCLENBQUNzQjtJQUM3QixDQUFDLENBQ0o7SUFDRDtFQUNKLENBQUM7RUFFRCxPQUFPO0lBQ0hiLFdBQVcsRUFBWEEsV0FBVztJQUNYTyxvQkFBb0IsRUFBcEJBLG9CQUFvQjtJQUNwQkMsc0JBQXNCLEVBQXRCQTtFQUNKLENBQUM7QUFDTCxDQUFDO0FBQUNiLEVBQUEsQ0FsQ0lGLGFBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNYbkIsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9GYWdzYWsvQmVoYW5kbGluZy9TaWRlci9CZWhhbmRsaW5nc3Jlc3VsdGF0L0XDuHMvS29tcGV0YW5zZS91c2VLb21wZXRhbnNlLnRzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7IElCZWhhbmRsaW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXIvYmVoYW5kbGluZyc7XG5pbXBvcnQgdHlwZSB7IElSZXN0S29tcGV0YW5zZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uLy4uL3R5cGVyL2XDuHNQZXJpb2Rlcic7XG5pbXBvcnQgeyBFw7hzUGVyaW9kZVN0YXR1cyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uLy4uL3R5cGVyL2XDuHNQZXJpb2Rlcic7XG5pbXBvcnQgeyBzb3J0ZXJFw7hzUGVyaW9kZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi8uLi91dGlscy9lw7hzJztcblxuaW50ZXJmYWNlIElQcm9wcyB7XG4gICAgw6VwZW5CZWhhbmRsaW5nOiBJQmVoYW5kbGluZztcbn1cblxuY29uc3QgdXNlS29tcGV0YW5zZSA9ICh7IMOlcGVuQmVoYW5kbGluZyB9OiBJUHJvcHMpID0+IHtcbiAgICBjb25zdCBba29tcGV0YW5zZXIsIHNldHRLb21wZXRhbnNlcl0gPSB1c2VTdGF0ZTxJUmVzdEtvbXBldGFuc2VbXT4oW10pO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKMOlcGVuQmVoYW5kbGluZy5rb21wZXRhbnNlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzZXR0S29tcGV0YW5zZXIoXG4gICAgICAgICAgICAgICAgw6VwZW5CZWhhbmRsaW5nLmtvbXBldGFuc2VyLnNvcnQoKHBlcmlvZGVBLCBwZXJpb2RlQikgPT5cbiAgICAgICAgICAgICAgICAgICAgc29ydGVyRcO4c1BlcmlvZGVyKHBlcmlvZGVBLCBwZXJpb2RlQiwgw6VwZW5CZWhhbmRsaW5nLnBlcnNvbmVyKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9LCBbw6VwZW5CZWhhbmRsaW5nXSk7XG5cbiAgICBjb25zdCBlcktvbXBldGFuc2VyR3lsZGlnZSA9ICgpOiBib29sZWFuID0+IHtcbiAgICAgICAgcmV0dXJuIGhlbnRLb21wZXRhbnNlck1lZEZlaWwoKS5sZW5ndGggPT09IDA7XG4gICAgfTtcblxuICAgIGNvbnN0IGhlbnRLb21wZXRhbnNlck1lZEZlaWwgPSAoKTogSVJlc3RLb21wZXRhbnNlW10gPT4ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgICAgIGZvbTogJzIwMjUtMTInLFxuICAgICAgICAgICAgICAgIGJhcm5JZGVudGVyOiBbJzEyMzEyMzEyMyddLFxuICAgICAgICAgICAgICAgIHN0YXR1czogRcO4c1BlcmlvZGVTdGF0dXMuSUtLRV9VVEZZTFQsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgICAgICAvL3JldHVybiBrb21wZXRhbnNlci5maWx0ZXIoa29tcGV0YW5zZSA9PiBrb21wZXRhbnNlLnN0YXR1cyAhPT0gRcO4c1BlcmlvZGVTdGF0dXMuT0spO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBrb21wZXRhbnNlcixcbiAgICAgICAgZXJLb21wZXRhbnNlckd5bGRpZ2UsXG4gICAgICAgIGhlbnRLb21wZXRhbnNlck1lZEZlaWwsXG4gICAgfTtcbn07XG5cbmV4cG9ydCB7IHVzZUtvbXBldGFuc2UgfTtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImE0NzM0ZTc2M2JmNGI5NmI5NGFjXCIpIl0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiRcO4c1BlcmlvZGVTdGF0dXMiLCJzb3J0ZXJFw7hzUGVyaW9kZXIiLCJ1c2VLb21wZXRhbnNlIiwiX3JlZiIsIl9zIiwiw6VwZW5CZWhhbmRsaW5nIiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5Iiwia29tcGV0YW5zZXIiLCJzZXR0S29tcGV0YW5zZXIiLCJsZW5ndGgiLCJzb3J0IiwicGVyaW9kZUEiLCJwZXJpb2RlQiIsInBlcnNvbmVyIiwiZXJLb21wZXRhbnNlckd5bGRpZ2UiLCJoZW50S29tcGV0YW5zZXJNZWRGZWlsIiwiaWQiLCJmb20iLCJiYXJuSWRlbnRlciIsInN0YXR1cyIsIklLS0VfVVRGWUxUIl0sInNvdXJjZVJvb3QiOiIifQ==