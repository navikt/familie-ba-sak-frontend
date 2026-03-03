"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/TilkjentYtelseTidslinje.tsx"
/*!****************************************************************************************************!*\
  !*** ./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/TilkjentYtelseTidslinje.tsx ***!
  \****************************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/endOfMonth.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_familie_tidslinje__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/familie-tidslinje */ "./node_modules/@navikt/familie-tidslinje/dist/index.js");
/* harmony import */ var _komponenter_Tidslinje_TidslinjeContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../komponenter/Tidslinje/TidslinjeContext */ "./src/frontend/komponenter/Tidslinje/TidslinjeContext.tsx");
/* harmony import */ var _komponenter_Tidslinje_TidslinjeEtikett__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../komponenter/Tidslinje/TidslinjeEtikett */ "./src/frontend/komponenter/Tidslinje/TidslinjeEtikett.tsx");
/* harmony import */ var _komponenter_Tidslinje_TidslinjeNavigering__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../komponenter/Tidslinje/TidslinjeNavigering */ "./src/frontend/komponenter/Tidslinje/TidslinjeNavigering.tsx");
/* harmony import */ var _komponenter_Tidslinje_VinduVelger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../komponenter/Tidslinje/VinduVelger */ "./src/frontend/komponenter/Tidslinje/VinduVelger.tsx");
/* harmony import */ var _utils_formatter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../utils/formatter */ "./src/frontend/utils/formatter.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject,
  _templateObject2,
  _templateObject3,
  _templateObject4,
  _s = __webpack_require__.$Refresh$.signature();
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }










var TidslinjeHeader = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-end;\n    margin-bottom: 1rem;\n"])));
_c = TidslinjeHeader;
var TidslinjeControls = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: column;\n    align-items: flex-end;\n\n    > div:first-child {\n        margin-bottom: 1rem;\n    }\n"])));
_c2 = TidslinjeControls;
var TidslinjeContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    display: flex;\n    & .tidslinje {\n        margin: 0;\n        overflow-x: hidden;\n    }\n\n    & .navds-body-short {\n        &:first-child {\n            margin-top: 4.8rem;\n        }\n    }\n\n    & .navds-body-short {\n        &:not(:first-child) {\n            margin-top: 2.125rem;\n        }\n    }\n"])));
_c3 = TidslinjeContainer;
var TidslinjeLabels = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    min-width: 7rem;\n"])));
_c4 = TidslinjeLabels;
var TilkjentYtelseTidslinje = function TilkjentYtelseTidslinje(_ref) {
  _s();
  var grunnlagPersoner = _ref.grunnlagPersoner,
    tidslinjePersoner = _ref.tidslinjePersoner,
    fagsakType = _ref.fagsakType;
  var _useTidslinjeContext = (0,_komponenter_Tidslinje_TidslinjeContext__WEBPACK_IMPORTED_MODULE_6__.useTidslinjeContext)(),
    genererFormatertÅrstall = _useTidslinjeContext.genererFormatertÅrstall,
    genererRader = _useTidslinjeContext.genererRader,
    aktivEtikett = _useTidslinjeContext.aktivEtikett,
    aktivtTidslinjeVindu = _useTidslinjeContext.aktivtTidslinjeVindu,
    naviger = _useTidslinjeContext.naviger;
  var tidslinjeRader = genererRader(fagsakType, tidslinjePersoner);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(TidslinjeHeader, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Heading, {
    size: 'small',
    level: '2'
  }, genererFormatertÅrstall()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(TidslinjeControls, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_komponenter_Tidslinje_VinduVelger__WEBPACK_IMPORTED_MODULE_9__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_komponenter_Tidslinje_TidslinjeNavigering__WEBPACK_IMPORTED_MODULE_8__["default"], {
    naviger: naviger
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(TidslinjeContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(TidslinjeLabels, null, grunnlagPersoner.map(function (person, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.BodyShort, {
      key: index,
      title: person.navn
    }, (0,_utils_formatter__WEBPACK_IMPORTED_MODULE_10__.formaterIdent)(person.personIdent));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_familie_tidslinje__WEBPACK_IMPORTED_MODULE_5__.Tidslinje, {
    rader: tidslinjeRader,
    etikettRender: function etikettRender(etikett) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_komponenter_Tidslinje_TidslinjeEtikett__WEBPACK_IMPORTED_MODULE_7__["default"], {
        etikett: etikett
      });
    },
    startDato: aktivtTidslinjeVindu.startDato,
    sluttDato: aktivtTidslinjeVindu.sluttDato,
    aktivtUtsnitt: aktivEtikett && {
      fom: aktivEtikett.date,
      tom: (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.endOfMonth)(aktivEtikett.date)
    }
  })));
};
_s(TilkjentYtelseTidslinje, "AORkNvBPqupKnGZrjef/iydTHV4=", false, function () {
  return [_komponenter_Tidslinje_TidslinjeContext__WEBPACK_IMPORTED_MODULE_6__.useTidslinjeContext];
});
_c5 = TilkjentYtelseTidslinje;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TilkjentYtelseTidslinje);
var _c, _c2, _c3, _c4, _c5;
__webpack_require__.$Refresh$.register(_c, "TidslinjeHeader");
__webpack_require__.$Refresh$.register(_c2, "TidslinjeControls");
__webpack_require__.$Refresh$.register(_c3, "TidslinjeContainer");
__webpack_require__.$Refresh$.register(_c4, "TidslinjeLabels");
__webpack_require__.$Refresh$.register(_c5, "TilkjentYtelseTidslinje");

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
/******/ 	__webpack_require__.h = () => ("c33ff818b7073672269f")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixDQUFDaUIsU0FBVTtJQUMxQ0MsU0FBUyxFQUFFbEIsb0JBQW9CLENBQUNrQixTQUFVO0lBQzFDQyxhQUFhLEVBQ1RwQixZQUFZLElBQUk7TUFDWnFCLEdBQUcsRUFBRXJCLFlBQVksQ0FBQ3NCLElBQUk7TUFDdEJDLEdBQUcsRUFBRXhELG9EQUFVLENBQUNpQyxZQUFZLENBQUNzQixJQUFJO0lBQ3JDO0VBQ0gsQ0FDSixDQUNlLENBQ3RCLENBQUM7QUFFWCxDQUFDO0FBQUM3QixFQUFBLENBekNJRix1QkFBeUM7RUFBQSxRQUV2Q25CLHdGQUFtQjtBQUFBO0FBQUFvRCxHQUFBLEdBRnJCakMsdUJBQXlDO0FBMkMvQyxpRUFBZUEsdUJBQXVCLEVBQUM7QUFBQSxJQUFBVixFQUFBLEVBQUFHLEdBQUEsRUFBQUcsR0FBQSxFQUFBRyxHQUFBLEVBQUFrQyxHQUFBO0FBQUFDLHNDQUFBLENBQUE1QyxFQUFBO0FBQUE0QyxzQ0FBQSxDQUFBekMsR0FBQTtBQUFBeUMsc0NBQUEsQ0FBQXRDLEdBQUE7QUFBQXNDLHNDQUFBLENBQUFuQyxHQUFBO0FBQUFtQyxzQ0FBQSxDQUFBRCxHQUFBLDZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUM1R3ZDLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvRmFnc2FrL0JlaGFuZGxpbmcvU2lkZXIvQmVoYW5kbGluZ3NyZXN1bHRhdC9UaWxramVudFl0ZWxzZVRpZHNsaW5qZS50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGVuZE9mTW9udGggfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQm9keVNob3J0LCBIZWFkaW5nIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgdHlwZSB7IEV0aWtldHQgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdGlkc2xpbmplJztcbmltcG9ydCB7IFRpZHNsaW5qZSB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUnO1xuXG5pbXBvcnQgeyB1c2VUaWRzbGluamVDb250ZXh0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4va29tcG9uZW50ZXIvVGlkc2xpbmplL1RpZHNsaW5qZUNvbnRleHQnO1xuaW1wb3J0IFRpZHNsaW5qZUV0aWtldHQgZnJvbSAnLi4vLi4vLi4vLi4vLi4va29tcG9uZW50ZXIvVGlkc2xpbmplL1RpZHNsaW5qZUV0aWtldHQnO1xuaW1wb3J0IFRpZHNsaW5qZU5hdmlnZXJpbmcgZnJvbSAnLi4vLi4vLi4vLi4vLi4va29tcG9uZW50ZXIvVGlkc2xpbmplL1RpZHNsaW5qZU5hdmlnZXJpbmcnO1xuaW1wb3J0IFZpbmR1dmVsZ2VyIGZyb20gJy4uLy4uLy4uLy4uLy4uL2tvbXBvbmVudGVyL1RpZHNsaW5qZS9WaW5kdVZlbGdlcic7XG5pbXBvcnQgdHlwZSB7IElQZXJzb25NZWRBbmRlbGVyVGlsa2plbnRZdGVsc2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlci9iZXJlZ25pbmcnO1xuaW1wb3J0IHR5cGUgeyBGYWdzYWtUeXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvZmFnc2FrJztcbmltcG9ydCB0eXBlIHsgSUdydW5ubGFnUGVyc29uIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvcGVyc29uJztcbmltcG9ydCB7IGZvcm1hdGVySWRlbnQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9mb3JtYXR0ZXInO1xuXG5jb25zdCBUaWRzbGluamVIZWFkZXIgPSBzdHlsZWQuZGl2YFxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuYDtcblxuY29uc3QgVGlkc2xpbmplQ29udHJvbHMgPSBzdHlsZWQuZGl2YFxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG5cbiAgICA+IGRpdjpmaXJzdC1jaGlsZCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgfVxuYDtcblxuY29uc3QgVGlkc2xpbmplQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgICYgLnRpZHNsaW5qZSB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgIH1cblxuICAgICYgLm5hdmRzLWJvZHktc2hvcnQge1xuICAgICAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDQuOHJlbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICYgLm5hdmRzLWJvZHktc2hvcnQge1xuICAgICAgICAmOm5vdCg6Zmlyc3QtY2hpbGQpIHtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDIuMTI1cmVtO1xuICAgICAgICB9XG4gICAgfVxuYDtcblxuY29uc3QgVGlkc2xpbmplTGFiZWxzID0gc3R5bGVkLmRpdmBcbiAgICBtaW4td2lkdGg6IDdyZW07XG5gO1xuXG5pbnRlcmZhY2UgSVByb3BzIHtcbiAgICBncnVubmxhZ1BlcnNvbmVyOiBJR3J1bm5sYWdQZXJzb25bXTtcbiAgICB0aWRzbGluamVQZXJzb25lcjogSVBlcnNvbk1lZEFuZGVsZXJUaWxramVudFl0ZWxzZVtdO1xuICAgIGZhZ3Nha1R5cGU/OiBGYWdzYWtUeXBlO1xufVxuXG5jb25zdCBUaWxramVudFl0ZWxzZVRpZHNsaW5qZTogUmVhY3QuRkM8SVByb3BzPiA9ICh7IGdydW5ubGFnUGVyc29uZXIsIHRpZHNsaW5qZVBlcnNvbmVyLCBmYWdzYWtUeXBlIH0pID0+IHtcbiAgICBjb25zdCB7IGdlbmVyZXJGb3JtYXRlcnTDhXJzdGFsbCwgZ2VuZXJlclJhZGVyLCBha3RpdkV0aWtldHQsIGFrdGl2dFRpZHNsaW5qZVZpbmR1LCBuYXZpZ2VyIH0gPVxuICAgICAgICB1c2VUaWRzbGluamVDb250ZXh0KCk7XG4gICAgY29uc3QgdGlkc2xpbmplUmFkZXIgPSBnZW5lcmVyUmFkZXIoZmFnc2FrVHlwZSwgdGlkc2xpbmplUGVyc29uZXIpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxUaWRzbGluamVIZWFkZXI+XG4gICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J3NtYWxsJ30gbGV2ZWw9eycyJ30+XG4gICAgICAgICAgICAgICAgICAgIHtnZW5lcmVyRm9ybWF0ZXJ0w4Vyc3RhbGwoKX1cbiAgICAgICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICAgICAgPFRpZHNsaW5qZUNvbnRyb2xzPlxuICAgICAgICAgICAgICAgICAgICA8VmluZHV2ZWxnZXIgLz5cbiAgICAgICAgICAgICAgICAgICAgPFRpZHNsaW5qZU5hdmlnZXJpbmcgbmF2aWdlcj17bmF2aWdlcn0gLz5cbiAgICAgICAgICAgICAgICA8L1RpZHNsaW5qZUNvbnRyb2xzPlxuICAgICAgICAgICAgPC9UaWRzbGluamVIZWFkZXI+XG4gICAgICAgICAgICA8VGlkc2xpbmplQ29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxUaWRzbGluamVMYWJlbHM+XG4gICAgICAgICAgICAgICAgICAgIHtncnVubmxhZ1BlcnNvbmVyLm1hcCgocGVyc29uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0IGtleT17aW5kZXh9IHRpdGxlPXtwZXJzb24ubmF2bn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmb3JtYXRlcklkZW50KHBlcnNvbi5wZXJzb25JZGVudCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L1RpZHNsaW5qZUxhYmVscz5cbiAgICAgICAgICAgICAgICA8VGlkc2xpbmplXG4gICAgICAgICAgICAgICAgICAgIHJhZGVyPXt0aWRzbGluamVSYWRlcn1cbiAgICAgICAgICAgICAgICAgICAgZXRpa2V0dFJlbmRlcj17KGV0aWtldHQ6IEV0aWtldHQpID0+IDxUaWRzbGluamVFdGlrZXR0IGV0aWtldHQ9e2V0aWtldHR9IC8+fVxuICAgICAgICAgICAgICAgICAgICBzdGFydERhdG89e2FrdGl2dFRpZHNsaW5qZVZpbmR1LnN0YXJ0RGF0b31cbiAgICAgICAgICAgICAgICAgICAgc2x1dHREYXRvPXtha3RpdnRUaWRzbGluamVWaW5kdS5zbHV0dERhdG99XG4gICAgICAgICAgICAgICAgICAgIGFrdGl2dFV0c25pdHQ9e1xuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZFdGlrZXR0ICYmIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb206IGFrdGl2RXRpa2V0dC5kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvbTogZW5kT2ZNb250aChha3RpdkV0aWtldHQuZGF0ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9UaWRzbGluamVDb250YWluZXI+XG4gICAgICAgIDwvPlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUaWxramVudFl0ZWxzZVRpZHNsaW5qZTtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImMzM2ZmODE4YjcwNzM2NzIyNjlmXCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwiZW5kT2ZNb250aCIsInN0eWxlZCIsIkJvZHlTaG9ydCIsIkhlYWRpbmciLCJUaWRzbGluamUiLCJ1c2VUaWRzbGluamVDb250ZXh0IiwiVGlkc2xpbmplRXRpa2V0dCIsIlRpZHNsaW5qZU5hdmlnZXJpbmciLCJWaW5kdXZlbGdlciIsImZvcm1hdGVySWRlbnQiLCJUaWRzbGluamVIZWFkZXIiLCJkaXYiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiX2MiLCJUaWRzbGluamVDb250cm9scyIsIl90ZW1wbGF0ZU9iamVjdDIiLCJfYzIiLCJUaWRzbGluamVDb250YWluZXIiLCJfdGVtcGxhdGVPYmplY3QzIiwiX2MzIiwiVGlkc2xpbmplTGFiZWxzIiwiX3RlbXBsYXRlT2JqZWN0NCIsIl9jNCIsIlRpbGtqZW50WXRlbHNlVGlkc2xpbmplIiwiX3JlZiIsIl9zIiwiZ3J1bm5sYWdQZXJzb25lciIsInRpZHNsaW5qZVBlcnNvbmVyIiwiZmFnc2FrVHlwZSIsIl91c2VUaWRzbGluamVDb250ZXh0IiwiZ2VuZXJlckZvcm1hdGVydMOFcnN0YWxsIiwiZ2VuZXJlclJhZGVyIiwiYWt0aXZFdGlrZXR0IiwiYWt0aXZ0VGlkc2xpbmplVmluZHUiLCJuYXZpZ2VyIiwidGlkc2xpbmplUmFkZXIiLCJjcmVhdGVFbGVtZW50IiwiRnJhZ21lbnQiLCJzaXplIiwibGV2ZWwiLCJtYXAiLCJwZXJzb24iLCJpbmRleCIsImtleSIsInRpdGxlIiwibmF2biIsInBlcnNvbklkZW50IiwicmFkZXIiLCJldGlrZXR0UmVuZGVyIiwiZXRpa2V0dCIsInN0YXJ0RGF0byIsInNsdXR0RGF0byIsImFrdGl2dFV0c25pdHQiLCJmb20iLCJkYXRlIiwidG9tIiwiX2M1IiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==