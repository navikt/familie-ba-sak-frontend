"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/ikoner/StatusIkon.tsx"
/*!********************************************!*\
  !*** ./src/frontend/ikoner/StatusIkon.tsx ***!
  \********************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Status: () => (/* binding */ Status),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @navikt/aksel-icons */ "./node_modules/@navikt/aksel-icons/dist/react/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }



var Status = /*#__PURE__*/function (Status) {
  Status[Status["ADVARSEL"] = 0] = "ADVARSEL";
  Status[Status["FEIL"] = 1] = "FEIL";
  Status[Status["OK"] = 2] = "OK";
  Status[Status["INFO"] = 3] = "INFO";
  return Status;
}({});
var OkIkon = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__.CheckmarkCircleFillIcon)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    color: var(--ax-border-success);\n    font-size: 1.5rem;\n    min-width: 1.5rem;\n"])));
_c = OkIkon;
var FeilIkon = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__.XMarkOctagonFillIcon)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    color: var(--ax-border-danger);\n    font-size: 1.5rem;\n    min-width: 1.5rem;\n"])));
_c2 = FeilIkon;
var AdvarselIkon = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__.ExclamationmarkTriangleFillIcon)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    color: var(--ax-border-warning);\n    font-size: 1.5rem;\n    min-width: 1.5rem;\n"])));
_c3 = AdvarselIkon;
var InfoIkon = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_3__.InformationSquareFillIcon)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    color: var(--ax-border-info);\n    font-size: 1.5rem;\n    min-width: 1.5rem;\n"])));
_c4 = InfoIkon;
var StatusIkon = function StatusIkon(_ref) {
  var status = _ref.status,
    title = _ref.title;
  switch (status) {
    case Status.OK:
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(OkIkon, {
        title: title
      });
    case Status.FEIL:
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(FeilIkon, {
        title: title
      });
    case Status.ADVARSEL:
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(AdvarselIkon, {
        title: title
      });
    case Status.INFO:
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(InfoIkon, {
        title: title
      });
  }
};
_c5 = StatusIkon;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StatusIkon);
var _c, _c2, _c3, _c4, _c5;
__webpack_require__.$Refresh$.register(_c, "OkIkon");
__webpack_require__.$Refresh$.register(_c2, "FeilIkon");
__webpack_require__.$Refresh$.register(_c3, "AdvarselIkon");
__webpack_require__.$Refresh$.register(_c4, "InfoIkon");
__webpack_require__.$Refresh$.register(_c5, "StatusIkon");

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
/******/ 	__webpack_require__.h = () => ("6e294c60b84858364014")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi40OWNkY2QyMTI4YzMyNWVhZjMzZC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUErQjtBQUVRO0FBT1Y7QUFPdEIsSUFBS00sTUFBTSwwQkFBTkEsTUFBTTtFQUFOQSxNQUFNLENBQU5BLE1BQU07RUFBTkEsTUFBTSxDQUFOQSxNQUFNO0VBQU5BLE1BQU0sQ0FBTkEsTUFBTTtFQUFOQSxNQUFNLENBQU5BLE1BQU07RUFBQSxPQUFOQSxNQUFNO0FBQUE7QUFPbEIsSUFBTUMsTUFBTSxHQUFHTiw2REFBTSxDQUFDQyx3RUFBdUIsQ0FBQyxDQUFBTSxlQUFBLEtBQUFBLGVBQUEsR0FBQUMsc0JBQUEsZ0dBSTdDO0FBQUNDLEVBQUEsR0FKSUgsTUFBTTtBQU1aLElBQU1JLFFBQVEsR0FBR1YsNkRBQU0sQ0FBQ0kscUVBQW9CLENBQUMsQ0FBQU8sZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQUgsc0JBQUEsK0ZBSTVDO0FBQUNJLEdBQUEsR0FKSUYsUUFBUTtBQU1kLElBQU1HLFlBQVksR0FBR2IsNkRBQU0sQ0FBQ0UsZ0ZBQStCLENBQUMsQ0FBQVksZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQU4sc0JBQUEsZ0dBSTNEO0FBQUNPLEdBQUEsR0FKSUYsWUFBWTtBQU1sQixJQUFNRyxRQUFRLEdBQUdoQiw2REFBTSxDQUFDRywwRUFBeUIsQ0FBQyxDQUFBYyxnQkFBQSxLQUFBQSxnQkFBQSxHQUFBVCxzQkFBQSw2RkFJakQ7QUFBQ1UsR0FBQSxHQUpJRixRQUFRO0FBTWQsSUFBTUcsVUFBNEIsR0FBRyxTQUEvQkEsVUFBNEJBLENBQUFDLElBQUEsRUFBMEI7RUFBQSxJQUFwQkMsTUFBTSxHQUFBRCxJQUFBLENBQU5DLE1BQU07SUFBRUMsS0FBSyxHQUFBRixJQUFBLENBQUxFLEtBQUs7RUFDakQsUUFBUUQsTUFBTTtJQUNWLEtBQUtoQixNQUFNLENBQUNrQixFQUFFO01BQ1Ysb0JBQU94QixnREFBQSxDQUFDTyxNQUFNO1FBQUNnQixLQUFLLEVBQUVBO01BQU0sQ0FBRSxDQUFDO0lBQ25DLEtBQUtqQixNQUFNLENBQUNvQixJQUFJO01BQ1osb0JBQU8xQixnREFBQSxDQUFDVyxRQUFRO1FBQUNZLEtBQUssRUFBRUE7TUFBTSxDQUFFLENBQUM7SUFDckMsS0FBS2pCLE1BQU0sQ0FBQ3FCLFFBQVE7TUFDaEIsb0JBQU8zQixnREFBQSxDQUFDYyxZQUFZO1FBQUNTLEtBQUssRUFBRUE7TUFBTSxDQUFFLENBQUM7SUFDekMsS0FBS2pCLE1BQU0sQ0FBQ3NCLElBQUk7TUFDWixvQkFBTzVCLGdEQUFBLENBQUNpQixRQUFRO1FBQUNNLEtBQUssRUFBRUE7TUFBTSxDQUFFLENBQUM7RUFDekM7QUFDSixDQUFDO0FBQUNNLEdBQUEsR0FYSVQsVUFBNEI7QUFZbEMsaUVBQWVBLFVBQVUsRUFBQztBQUFBLElBQUFWLEVBQUEsRUFBQUcsR0FBQSxFQUFBRyxHQUFBLEVBQUFHLEdBQUEsRUFBQVUsR0FBQTtBQUFBQyxzQ0FBQSxDQUFBcEIsRUFBQTtBQUFBb0Isc0NBQUEsQ0FBQWpCLEdBQUE7QUFBQWlCLHNDQUFBLENBQUFkLEdBQUE7QUFBQWMsc0NBQUEsQ0FBQVgsR0FBQTtBQUFBVyxzQ0FBQSxDQUFBRCxHQUFBLGdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUMzRDFCLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvaWtvbmVyL1N0YXR1c0lrb24udHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQge1xuICAgIENoZWNrbWFya0NpcmNsZUZpbGxJY29uLFxuICAgIEV4Y2xhbWF0aW9ubWFya1RyaWFuZ2xlRmlsbEljb24sXG4gICAgSW5mb3JtYXRpb25TcXVhcmVGaWxsSWNvbixcbiAgICBYTWFya09jdGFnb25GaWxsSWNvbixcbn0gZnJvbSAnQG5hdmlrdC9ha3NlbC1pY29ucyc7XG5cbmludGVyZmFjZSBJUHJvcHMge1xuICAgIHN0YXR1czogU3RhdHVzO1xuICAgIHRpdGxlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBTdGF0dXMge1xuICAgIEFEVkFSU0VMLFxuICAgIEZFSUwsXG4gICAgT0ssXG4gICAgSU5GTyxcbn1cblxuY29uc3QgT2tJa29uID0gc3R5bGVkKENoZWNrbWFya0NpcmNsZUZpbGxJY29uKWBcbiAgICBjb2xvcjogdmFyKC0tYXgtYm9yZGVyLXN1Y2Nlc3MpO1xuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgIG1pbi13aWR0aDogMS41cmVtO1xuYDtcblxuY29uc3QgRmVpbElrb24gPSBzdHlsZWQoWE1hcmtPY3RhZ29uRmlsbEljb24pYFxuICAgIGNvbG9yOiB2YXIoLS1heC1ib3JkZXItZGFuZ2VyKTtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICBtaW4td2lkdGg6IDEuNXJlbTtcbmA7XG5cbmNvbnN0IEFkdmFyc2VsSWtvbiA9IHN0eWxlZChFeGNsYW1hdGlvbm1hcmtUcmlhbmdsZUZpbGxJY29uKWBcbiAgICBjb2xvcjogdmFyKC0tYXgtYm9yZGVyLXdhcm5pbmcpO1xuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgIG1pbi13aWR0aDogMS41cmVtO1xuYDtcblxuY29uc3QgSW5mb0lrb24gPSBzdHlsZWQoSW5mb3JtYXRpb25TcXVhcmVGaWxsSWNvbilgXG4gICAgY29sb3I6IHZhcigtLWF4LWJvcmRlci1pbmZvKTtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICBtaW4td2lkdGg6IDEuNXJlbTtcbmA7XG5cbmNvbnN0IFN0YXR1c0lrb246IFJlYWN0LkZDPElQcm9wcz4gPSAoeyBzdGF0dXMsIHRpdGxlIH0pID0+IHtcbiAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICBjYXNlIFN0YXR1cy5PSzpcbiAgICAgICAgICAgIHJldHVybiA8T2tJa29uIHRpdGxlPXt0aXRsZX0gLz47XG4gICAgICAgIGNhc2UgU3RhdHVzLkZFSUw6XG4gICAgICAgICAgICByZXR1cm4gPEZlaWxJa29uIHRpdGxlPXt0aXRsZX0gLz47XG4gICAgICAgIGNhc2UgU3RhdHVzLkFEVkFSU0VMOlxuICAgICAgICAgICAgcmV0dXJuIDxBZHZhcnNlbElrb24gdGl0bGU9e3RpdGxlfSAvPjtcbiAgICAgICAgY2FzZSBTdGF0dXMuSU5GTzpcbiAgICAgICAgICAgIHJldHVybiA8SW5mb0lrb24gdGl0bGU9e3RpdGxlfSAvPjtcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgU3RhdHVzSWtvbjtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjZlMjk0YzYwYjg0ODU4MzY0MDE0XCIpIl0sIm5hbWVzIjpbIlJlYWN0Iiwic3R5bGVkIiwiQ2hlY2ttYXJrQ2lyY2xlRmlsbEljb24iLCJFeGNsYW1hdGlvbm1hcmtUcmlhbmdsZUZpbGxJY29uIiwiSW5mb3JtYXRpb25TcXVhcmVGaWxsSWNvbiIsIlhNYXJrT2N0YWdvbkZpbGxJY29uIiwiU3RhdHVzIiwiT2tJa29uIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbCIsIl9jIiwiRmVpbElrb24iLCJfdGVtcGxhdGVPYmplY3QyIiwiX2MyIiwiQWR2YXJzZWxJa29uIiwiX3RlbXBsYXRlT2JqZWN0MyIsIl9jMyIsIkluZm9Ja29uIiwiX3RlbXBsYXRlT2JqZWN0NCIsIl9jNCIsIlN0YXR1c0lrb24iLCJfcmVmIiwic3RhdHVzIiwidGl0bGUiLCJPSyIsImNyZWF0ZUVsZW1lbnQiLCJGRUlMIiwiQURWQVJTRUwiLCJJTkZPIiwiX2M1IiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==