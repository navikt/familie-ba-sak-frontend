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
var TidslinjeContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    display: flex;\n\n    & .tidslinje {\n        margin: 0;\n        overflow-x: hidden;\n    }\n\n    & .aksel-body-short {\n        &:first-child {\n            margin-top: 4.8rem;\n        }\n    }\n\n    & .aksel-body-short {\n        &:not(:first-child) {\n            margin-top: 2.125rem;\n        }\n    }\n"])));
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
/******/ 	__webpack_require__.h = () => ("6b51638471d9c1619c0d")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixDQUFDaUIsU0FBVTtJQUMxQ0MsU0FBUyxFQUFFbEIsb0JBQW9CLENBQUNrQixTQUFVO0lBQzFDQyxhQUFhLEVBQ1RwQixZQUFZLElBQUk7TUFDWnFCLEdBQUcsRUFBRXJCLFlBQVksQ0FBQ3NCLElBQUk7TUFDdEJDLEdBQUcsRUFBRXhELG9EQUFVLENBQUNpQyxZQUFZLENBQUNzQixJQUFJO0lBQ3JDO0VBQ0gsQ0FDSixDQUNlLENBQ3RCLENBQUM7QUFFWCxDQUFDO0FBQUM3QixFQUFBLENBekNJRix1QkFBeUM7RUFBQSxRQUV2Q25CLHdGQUFtQjtBQUFBO0FBQUFvRCxHQUFBLEdBRnJCakMsdUJBQXlDO0FBMkMvQyxpRUFBZUEsdUJBQXVCLEVBQUM7QUFBQSxJQUFBVixFQUFBLEVBQUFHLEdBQUEsRUFBQUcsR0FBQSxFQUFBRyxHQUFBLEVBQUFrQyxHQUFBO0FBQUFDLHNDQUFBLENBQUE1QyxFQUFBO0FBQUE0QyxzQ0FBQSxDQUFBekMsR0FBQTtBQUFBeUMsc0NBQUEsQ0FBQXRDLEdBQUE7QUFBQXNDLHNDQUFBLENBQUFuQyxHQUFBO0FBQUFtQyxzQ0FBQSxDQUFBRCxHQUFBLDZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUM3R3ZDLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvRmFnc2FrL0JlaGFuZGxpbmcvU2lkZXIvQmVoYW5kbGluZ3NyZXN1bHRhdC9UaWxramVudFl0ZWxzZVRpZHNsaW5qZS50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGVuZE9mTW9udGggfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQm9keVNob3J0LCBIZWFkaW5nIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgdHlwZSB7IEV0aWtldHQgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdGlkc2xpbmplJztcbmltcG9ydCB7IFRpZHNsaW5qZSB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUnO1xuXG5pbXBvcnQgeyB1c2VUaWRzbGluamVDb250ZXh0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4va29tcG9uZW50ZXIvVGlkc2xpbmplL1RpZHNsaW5qZUNvbnRleHQnO1xuaW1wb3J0IFRpZHNsaW5qZUV0aWtldHQgZnJvbSAnLi4vLi4vLi4vLi4vLi4va29tcG9uZW50ZXIvVGlkc2xpbmplL1RpZHNsaW5qZUV0aWtldHQnO1xuaW1wb3J0IFRpZHNsaW5qZU5hdmlnZXJpbmcgZnJvbSAnLi4vLi4vLi4vLi4vLi4va29tcG9uZW50ZXIvVGlkc2xpbmplL1RpZHNsaW5qZU5hdmlnZXJpbmcnO1xuaW1wb3J0IFZpbmR1dmVsZ2VyIGZyb20gJy4uLy4uLy4uLy4uLy4uL2tvbXBvbmVudGVyL1RpZHNsaW5qZS9WaW5kdVZlbGdlcic7XG5pbXBvcnQgdHlwZSB7IElQZXJzb25NZWRBbmRlbGVyVGlsa2plbnRZdGVsc2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlci9iZXJlZ25pbmcnO1xuaW1wb3J0IHR5cGUgeyBGYWdzYWtUeXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvZmFnc2FrJztcbmltcG9ydCB0eXBlIHsgSUdydW5ubGFnUGVyc29uIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvcGVyc29uJztcbmltcG9ydCB7IGZvcm1hdGVySWRlbnQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9mb3JtYXR0ZXInO1xuXG5jb25zdCBUaWRzbGluamVIZWFkZXIgPSBzdHlsZWQuZGl2YFxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuYDtcblxuY29uc3QgVGlkc2xpbmplQ29udHJvbHMgPSBzdHlsZWQuZGl2YFxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG5cbiAgICA+IGRpdjpmaXJzdC1jaGlsZCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgfVxuYDtcblxuY29uc3QgVGlkc2xpbmplQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgICBkaXNwbGF5OiBmbGV4O1xuXG4gICAgJiAudGlkc2xpbmplIHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XG4gICAgfVxuXG4gICAgJiAuYWtzZWwtYm9keS1zaG9ydCB7XG4gICAgICAgICY6Zmlyc3QtY2hpbGQge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogNC44cmVtO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJiAuYWtzZWwtYm9keS1zaG9ydCB7XG4gICAgICAgICY6bm90KDpmaXJzdC1jaGlsZCkge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMi4xMjVyZW07XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5jb25zdCBUaWRzbGluamVMYWJlbHMgPSBzdHlsZWQuZGl2YFxuICAgIG1pbi13aWR0aDogN3JlbTtcbmA7XG5cbmludGVyZmFjZSBJUHJvcHMge1xuICAgIGdydW5ubGFnUGVyc29uZXI6IElHcnVubmxhZ1BlcnNvbltdO1xuICAgIHRpZHNsaW5qZVBlcnNvbmVyOiBJUGVyc29uTWVkQW5kZWxlclRpbGtqZW50WXRlbHNlW107XG4gICAgZmFnc2FrVHlwZT86IEZhZ3Nha1R5cGU7XG59XG5cbmNvbnN0IFRpbGtqZW50WXRlbHNlVGlkc2xpbmplOiBSZWFjdC5GQzxJUHJvcHM+ID0gKHsgZ3J1bm5sYWdQZXJzb25lciwgdGlkc2xpbmplUGVyc29uZXIsIGZhZ3Nha1R5cGUgfSkgPT4ge1xuICAgIGNvbnN0IHsgZ2VuZXJlckZvcm1hdGVydMOFcnN0YWxsLCBnZW5lcmVyUmFkZXIsIGFrdGl2RXRpa2V0dCwgYWt0aXZ0VGlkc2xpbmplVmluZHUsIG5hdmlnZXIgfSA9XG4gICAgICAgIHVzZVRpZHNsaW5qZUNvbnRleHQoKTtcbiAgICBjb25zdCB0aWRzbGluamVSYWRlciA9IGdlbmVyZXJSYWRlcihmYWdzYWtUeXBlLCB0aWRzbGluamVQZXJzb25lcik7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgICAgPFRpZHNsaW5qZUhlYWRlcj5cbiAgICAgICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnc21hbGwnfSBsZXZlbD17JzInfT5cbiAgICAgICAgICAgICAgICAgICAge2dlbmVyZXJGb3JtYXRlcnTDhXJzdGFsbCgpfVxuICAgICAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgICAgICA8VGlkc2xpbmplQ29udHJvbHM+XG4gICAgICAgICAgICAgICAgICAgIDxWaW5kdXZlbGdlciAvPlxuICAgICAgICAgICAgICAgICAgICA8VGlkc2xpbmplTmF2aWdlcmluZyBuYXZpZ2VyPXtuYXZpZ2VyfSAvPlxuICAgICAgICAgICAgICAgIDwvVGlkc2xpbmplQ29udHJvbHM+XG4gICAgICAgICAgICA8L1RpZHNsaW5qZUhlYWRlcj5cbiAgICAgICAgICAgIDxUaWRzbGluamVDb250YWluZXI+XG4gICAgICAgICAgICAgICAgPFRpZHNsaW5qZUxhYmVscz5cbiAgICAgICAgICAgICAgICAgICAge2dydW5ubGFnUGVyc29uZXIubWFwKChwZXJzb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQga2V5PXtpbmRleH0gdGl0bGU9e3BlcnNvbi5uYXZufT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2Zvcm1hdGVySWRlbnQocGVyc29uLnBlcnNvbklkZW50KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvVGlkc2xpbmplTGFiZWxzPlxuICAgICAgICAgICAgICAgIDxUaWRzbGluamVcbiAgICAgICAgICAgICAgICAgICAgcmFkZXI9e3RpZHNsaW5qZVJhZGVyfVxuICAgICAgICAgICAgICAgICAgICBldGlrZXR0UmVuZGVyPXsoZXRpa2V0dDogRXRpa2V0dCkgPT4gPFRpZHNsaW5qZUV0aWtldHQgZXRpa2V0dD17ZXRpa2V0dH0gLz59XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0bz17YWt0aXZ0VGlkc2xpbmplVmluZHUuc3RhcnREYXRvfVxuICAgICAgICAgICAgICAgICAgICBzbHV0dERhdG89e2FrdGl2dFRpZHNsaW5qZVZpbmR1LnNsdXR0RGF0b31cbiAgICAgICAgICAgICAgICAgICAgYWt0aXZ0VXRzbml0dD17XG4gICAgICAgICAgICAgICAgICAgICAgICBha3RpdkV0aWtldHQgJiYge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbTogYWt0aXZFdGlrZXR0LmRhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9tOiBlbmRPZk1vbnRoKGFrdGl2RXRpa2V0dC5kYXRlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1RpZHNsaW5qZUNvbnRhaW5lcj5cbiAgICAgICAgPC8+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRpbGtqZW50WXRlbHNlVGlkc2xpbmplO1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiNmI1MTYzODQ3MWQ5YzE2MTljMGRcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJlbmRPZk1vbnRoIiwic3R5bGVkIiwiQm9keVNob3J0IiwiSGVhZGluZyIsIlRpZHNsaW5qZSIsInVzZVRpZHNsaW5qZUNvbnRleHQiLCJUaWRzbGluamVFdGlrZXR0IiwiVGlkc2xpbmplTmF2aWdlcmluZyIsIlZpbmR1dmVsZ2VyIiwiZm9ybWF0ZXJJZGVudCIsIlRpZHNsaW5qZUhlYWRlciIsImRpdiIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJfYyIsIlRpZHNsaW5qZUNvbnRyb2xzIiwiX3RlbXBsYXRlT2JqZWN0MiIsIl9jMiIsIlRpZHNsaW5qZUNvbnRhaW5lciIsIl90ZW1wbGF0ZU9iamVjdDMiLCJfYzMiLCJUaWRzbGluamVMYWJlbHMiLCJfdGVtcGxhdGVPYmplY3Q0IiwiX2M0IiwiVGlsa2plbnRZdGVsc2VUaWRzbGluamUiLCJfcmVmIiwiX3MiLCJncnVubmxhZ1BlcnNvbmVyIiwidGlkc2xpbmplUGVyc29uZXIiLCJmYWdzYWtUeXBlIiwiX3VzZVRpZHNsaW5qZUNvbnRleHQiLCJnZW5lcmVyRm9ybWF0ZXJ0w4Vyc3RhbGwiLCJnZW5lcmVyUmFkZXIiLCJha3RpdkV0aWtldHQiLCJha3RpdnRUaWRzbGluamVWaW5kdSIsIm5hdmlnZXIiLCJ0aWRzbGluamVSYWRlciIsImNyZWF0ZUVsZW1lbnQiLCJGcmFnbWVudCIsInNpemUiLCJsZXZlbCIsIm1hcCIsInBlcnNvbiIsImluZGV4Iiwia2V5IiwidGl0bGUiLCJuYXZuIiwicGVyc29uSWRlbnQiLCJyYWRlciIsImV0aWtldHRSZW5kZXIiLCJldGlrZXR0Iiwic3RhcnREYXRvIiwic2x1dHREYXRvIiwiYWt0aXZ0VXRzbml0dCIsImZvbSIsImRhdGUiLCJ0b20iLCJfYzUiLCIkUmVmcmVzaFJlZyQiXSwic291cmNlUm9vdCI6IiJ9