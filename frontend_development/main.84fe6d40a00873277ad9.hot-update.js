"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/komponenter/Tidslinje/TidslinjeEtikett.tsx"
/*!*****************************************************************!*\
  !*** ./src/frontend/komponenter/Tidslinje/TidslinjeEtikett.tsx ***!
  \*****************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @navikt/ds-tokens/dist/tokens */ "./node_modules/@navikt/ds-tokens/dist/tokens.js");
/* harmony import */ var _TidslinjeContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TidslinjeContext */ "./src/frontend/komponenter/Tidslinje/TidslinjeContext.tsx");
/* harmony import */ var _FamilieBaseKnapp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../FamilieBaseKnapp */ "./src/frontend/komponenter/FamilieBaseKnapp.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject,
  _s = __webpack_require__.$Refresh$.signature();
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }





var EtikettKnapp = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_FamilieBaseKnapp__WEBPACK_IMPORTED_MODULE_5__["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    padding: 3px 3px 3px ", ";\n    width: 90%;\n    text-align: left;\n    cursor: ", ";\n    border-left: ", ";\n\n    > span {\n        text-decoration: ", ";\n        font-weight: ", ";\n        color: ", ";\n    }\n\n    :hover {\n        > span {\n            text-decoration: none;\n        }\n    }\n\n    :focus,\n    :active {\n        background-color: ", "; //TODO NGHI hvorfor er en bakgrunnsfarge en borderFocus?\n        color: #fff;\n    }\n"])), function (_ref) {
  var $valgt = _ref.$valgt;
  return $valgt ? '5px' : '3px';
}, function (_ref2) {
  var disabled = _ref2.disabled;
  return disabled ? 'default' : 'pointer';
}, function (_ref3) {
  var $valgt = _ref3.$valgt;
  return $valgt ? "1px solid ".concat(_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__.BorderNeutralSubtle) : 'none';
}, function (_ref4) {
  var disabled = _ref4.disabled,
    $valgt = _ref4.$valgt;
  return disabled || $valgt ? 'none' : 'underline';
}, function (_ref5) {
  var $valgt = _ref5.$valgt;
  return $valgt ? 'bold' : 'normal';
}, function (_ref6) {
  var disabled = _ref6.disabled,
    $valgt = _ref6.$valgt;
  if (disabled) return _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__.TextNeutralSubtle;else if ($valgt) return _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__.TextNeutral;else return _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__.TextAccent;
}, BgNeutralStrongPressed);
_c = EtikettKnapp;
var TidslinjeEtikett = function TidslinjeEtikett(_ref7) {
  _s();
  var etikett = _ref7.etikett;
  var _useTidslinjeContext = (0,_TidslinjeContext__WEBPACK_IMPORTED_MODULE_4__.useTidslinjeContext)(),
    aktivEtikett = _useTidslinjeContext.aktivEtikett,
    settAktivEtikett = _useTidslinjeContext.settAktivEtikett,
    aktivtTidslinjeVindu = _useTidslinjeContext.aktivtTidslinjeVindu,
    initiellAktivEtikettErSatt = _useTidslinjeContext.initiellAktivEtikettErSatt,
    setInitiellAktivEtikettErSatt = _useTidslinjeContext.setInitiellAktivEtikettErSatt;
  var onEtikettClick = function onEtikettClick() {
    settAktivEtikett(etikett);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!initiellAktivEtikettErSatt && etikett.date.getFullYear() === new Date().getFullYear() && etikett.date.getMonth() === new Date().getMonth()) {
      settAktivEtikett(etikett);
      setInitiellAktivEtikettErSatt(true);
    }
  }, [etikett]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(EtikettKnapp, {
    "aria-label": etikett.label,
    disabled: aktivtTidslinjeVindu.vindu.id === _TidslinjeContext__WEBPACK_IMPORTED_MODULE_4__.TidslinjeVindu.TRE_ÅR,
    $valgt: !!aktivEtikett && aktivEtikett.date.toDateString() === etikett.date.toDateString(),
    onClick: onEtikettClick
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null, etikett.label));
};
_s(TidslinjeEtikett, "iyHybs1rN3X/a5mNSRP9n16dd5w=", false, function () {
  return [_TidslinjeContext__WEBPACK_IMPORTED_MODULE_4__.useTidslinjeContext];
});
_c2 = TidslinjeEtikett;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TidslinjeEtikett);
var _c, _c2;
__webpack_require__.$Refresh$.register(_c, "EtikettKnapp");
__webpack_require__.$Refresh$.register(_c2, "TidslinjeEtikett");

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
/******/ 	__webpack_require__.h = () => ("6cf45f949a313613d26d")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi44NGZlNmQ0MGEwMDg3MzI3N2FkOS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBRUY7QUFFeUU7QUFHdkM7QUFDdEI7QUFNbkQsSUFBTVUsWUFBWSxHQUFHUiw2REFBTSxDQUFDTyx5REFBZ0IsQ0FBQyxDQUFBRSxlQUFBLEtBQUFBLGVBQUEsR0FBQUMsc0JBQUEsb2RBQ2xCLFVBQUFDLElBQUE7RUFBQSxJQUFHQyxNQUFNLEdBQUFELElBQUEsQ0FBTkMsTUFBTTtFQUFBLE9BQVFBLE1BQU0sR0FBRyxLQUFLLEdBQUcsS0FBSztBQUFBLENBQUMsRUFHckQsVUFBQUMsS0FBQTtFQUFBLElBQUdDLFFBQVEsR0FBQUQsS0FBQSxDQUFSQyxRQUFRO0VBQUEsT0FBUUEsUUFBUSxHQUFHLFNBQVMsR0FBRyxTQUFTO0FBQUEsQ0FBQyxFQUMvQyxVQUFBQyxLQUFBO0VBQUEsSUFBR0gsTUFBTSxHQUFBRyxLQUFBLENBQU5ILE1BQU07RUFBQSxPQUFRQSxNQUFNLGdCQUFBSSxNQUFBLENBQWdCZiw4RUFBbUIsSUFBSyxNQUFNO0FBQUEsQ0FBQyxFQUc5RCxVQUFBZ0IsS0FBQTtFQUFBLElBQUdILFFBQVEsR0FBQUcsS0FBQSxDQUFSSCxRQUFRO0lBQUVGLE1BQU0sR0FBQUssS0FBQSxDQUFOTCxNQUFNO0VBQUEsT0FBUUUsUUFBUSxJQUFJRixNQUFNLEdBQUcsTUFBTSxHQUFHLFdBQVc7QUFBQSxDQUFDLEVBQ3pFLFVBQUFNLEtBQUE7RUFBQSxJQUFHTixNQUFNLEdBQUFNLEtBQUEsQ0FBTk4sTUFBTTtFQUFBLE9BQVFBLE1BQU0sR0FBRyxNQUFNLEdBQUcsUUFBUTtBQUFBLENBQUMsRUFDbEQsVUFBQU8sS0FBQSxFQUEwQjtFQUFBLElBQXZCTCxRQUFRLEdBQUFLLEtBQUEsQ0FBUkwsUUFBUTtJQUFFRixNQUFNLEdBQUFPLEtBQUEsQ0FBTlAsTUFBTTtFQUN4QixJQUFJRSxRQUFRLEVBQUUsT0FBT1YsNEVBQWlCLENBQUMsS0FDbEMsSUFBSVEsTUFBTSxFQUFFLE9BQU9ULHNFQUFXLENBQUMsS0FDL0IsT0FBT0QscUVBQVU7QUFDMUIsQ0FBQyxFQVdtQmtCLHNCQUFzQixDQUdqRDtBQUFDQyxFQUFBLEdBNUJJYixZQUFZO0FBOEJsQixJQUFNYyxnQkFBdUQsR0FBRyxTQUExREEsZ0JBQXVEQSxDQUFBQyxLQUFBLEVBQW9CO0VBQUFDLEVBQUE7RUFBQSxJQUFkQyxPQUFPLEdBQUFGLEtBQUEsQ0FBUEUsT0FBTztFQUN0RSxJQUFBQyxvQkFBQSxHQU1JcEIsc0VBQW1CLENBQUMsQ0FBQztJQUxyQnFCLFlBQVksR0FBQUQsb0JBQUEsQ0FBWkMsWUFBWTtJQUNaQyxnQkFBZ0IsR0FBQUYsb0JBQUEsQ0FBaEJFLGdCQUFnQjtJQUNoQkMsb0JBQW9CLEdBQUFILG9CQUFBLENBQXBCRyxvQkFBb0I7SUFDcEJDLDBCQUEwQixHQUFBSixvQkFBQSxDQUExQkksMEJBQTBCO0lBQzFCQyw2QkFBNkIsR0FBQUwsb0JBQUEsQ0FBN0JLLDZCQUE2QjtFQUdqQyxJQUFNQyxjQUFjLEdBQUcsU0FBakJBLGNBQWNBLENBQUEsRUFBUztJQUN6QkosZ0JBQWdCLENBQUNILE9BQU8sQ0FBQztFQUM3QixDQUFDO0VBRUQxQixnREFBUyxDQUFDLFlBQU07SUFDWixJQUNJLENBQUMrQiwwQkFBMEIsSUFDM0JMLE9BQU8sQ0FBQ1EsSUFBSSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxLQUFLLElBQUlDLElBQUksQ0FBQyxDQUFDLENBQUNELFdBQVcsQ0FBQyxDQUFDLElBQ3ZEVCxPQUFPLENBQUNRLElBQUksQ0FBQ0csUUFBUSxDQUFDLENBQUMsS0FBSyxJQUFJRCxJQUFJLENBQUMsQ0FBQyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxFQUNuRDtNQUNFUixnQkFBZ0IsQ0FBQ0gsT0FBTyxDQUFDO01BQ3pCTSw2QkFBNkIsQ0FBQyxJQUFJLENBQUM7SUFDdkM7RUFDSixDQUFDLEVBQUUsQ0FBQ04sT0FBTyxDQUFDLENBQUM7RUFFYixvQkFDSTNCLDBEQUFBLENBQUNVLFlBQVk7SUFDVCxjQUFZaUIsT0FBTyxDQUFDYSxLQUFNO0lBQzFCeEIsUUFBUSxFQUFFZSxvQkFBb0IsQ0FBQ1UsS0FBSyxDQUFDQyxFQUFFLEtBQUtuQyw2REFBYyxDQUFDb0MsTUFBTztJQUNsRTdCLE1BQU0sRUFBRSxDQUFDLENBQUNlLFlBQVksSUFBSUEsWUFBWSxDQUFDTSxJQUFJLENBQUNTLFlBQVksQ0FBQyxDQUFDLEtBQUtqQixPQUFPLENBQUNRLElBQUksQ0FBQ1MsWUFBWSxDQUFDLENBQUU7SUFDM0ZDLE9BQU8sRUFBRVg7RUFBZSxnQkFFeEJsQywwREFBQSxlQUFPMkIsT0FBTyxDQUFDYSxLQUFZLENBQ2pCLENBQUM7QUFFdkIsQ0FBQztBQUFDZCxFQUFBLENBbENJRixnQkFBdUQ7RUFBQSxRQU9yRGhCLGtFQUFtQjtBQUFBO0FBQUFzQyxHQUFBLEdBUHJCdEIsZ0JBQXVEO0FBb0M3RCxpRUFBZUEsZ0JBQWdCLEVBQUM7QUFBQSxJQUFBRCxFQUFBLEVBQUF1QixHQUFBO0FBQUFDLHNDQUFBLENBQUF4QixFQUFBO0FBQUF3QixzQ0FBQSxDQUFBRCxHQUFBLHNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNoRmhDLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQva29tcG9uZW50ZXIvVGlkc2xpbmplL1RpZHNsaW5qZUV0aWtldHQudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQm9yZGVyTmV1dHJhbFN1YnRsZSwgVGV4dEFjY2VudCwgVGV4dE5ldXRyYWwsIFRleHROZXV0cmFsU3VidGxlIH0gZnJvbSAnQG5hdmlrdC9kcy10b2tlbnMvZGlzdC90b2tlbnMnO1xuaW1wb3J0IHR5cGUgeyBFdGlrZXR0IH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXRpZHNsaW5qZSc7XG5cbmltcG9ydCB7IFRpZHNsaW5qZVZpbmR1LCB1c2VUaWRzbGluamVDb250ZXh0IH0gZnJvbSAnLi9UaWRzbGluamVDb250ZXh0JztcbmltcG9ydCBGYW1pbGllQmFzZUtuYXBwIGZyb20gJy4uL0ZhbWlsaWVCYXNlS25hcHAnO1xuXG5pbnRlcmZhY2UgSUV0aWtldHRQcm9wIHtcbiAgICBldGlrZXR0OiBFdGlrZXR0O1xufVxuXG5jb25zdCBFdGlrZXR0S25hcHAgPSBzdHlsZWQoRmFtaWxpZUJhc2VLbmFwcCk8eyBkaXNhYmxlZDogYm9vbGVhbjsgJHZhbGd0OiBib29sZWFuIH0+YFxuICAgIHBhZGRpbmc6IDNweCAzcHggM3B4ICR7KHsgJHZhbGd0IH0pID0+ICgkdmFsZ3QgPyAnNXB4JyA6ICczcHgnKX07XG4gICAgd2lkdGg6IDkwJTtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIGN1cnNvcjogJHsoeyBkaXNhYmxlZCB9KSA9PiAoZGlzYWJsZWQgPyAnZGVmYXVsdCcgOiAncG9pbnRlcicpfTtcbiAgICBib3JkZXItbGVmdDogJHsoeyAkdmFsZ3QgfSkgPT4gKCR2YWxndCA/IGAxcHggc29saWQgJHtCb3JkZXJOZXV0cmFsU3VidGxlfWAgOiAnbm9uZScpfTtcblxuICAgID4gc3BhbiB7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHsoeyBkaXNhYmxlZCwgJHZhbGd0IH0pID0+IChkaXNhYmxlZCB8fCAkdmFsZ3QgPyAnbm9uZScgOiAndW5kZXJsaW5lJyl9O1xuICAgICAgICBmb250LXdlaWdodDogJHsoeyAkdmFsZ3QgfSkgPT4gKCR2YWxndCA/ICdib2xkJyA6ICdub3JtYWwnKX07XG4gICAgICAgIGNvbG9yOiAkeyh7IGRpc2FibGVkLCAkdmFsZ3QgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRpc2FibGVkKSByZXR1cm4gVGV4dE5ldXRyYWxTdWJ0bGU7XG4gICAgICAgICAgICBlbHNlIGlmICgkdmFsZ3QpIHJldHVybiBUZXh0TmV1dHJhbDtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIFRleHRBY2NlbnQ7XG4gICAgICAgIH19O1xuICAgIH1cblxuICAgIDpob3ZlciB7XG4gICAgICAgID4gc3BhbiB7XG4gICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICA6Zm9jdXMsXG4gICAgOmFjdGl2ZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7QmdOZXV0cmFsU3Ryb25nUHJlc3NlZH07IC8vVE9ETyBOR0hJIGh2b3Jmb3IgZXIgZW4gYmFrZ3J1bm5zZmFyZ2UgZW4gYm9yZGVyRm9jdXM/XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgIH1cbmA7XG5cbmNvbnN0IFRpZHNsaW5qZUV0aWtldHQ6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PElFdGlrZXR0UHJvcD4gPSAoeyBldGlrZXR0IH0pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIGFrdGl2RXRpa2V0dCxcbiAgICAgICAgc2V0dEFrdGl2RXRpa2V0dCxcbiAgICAgICAgYWt0aXZ0VGlkc2xpbmplVmluZHUsXG4gICAgICAgIGluaXRpZWxsQWt0aXZFdGlrZXR0RXJTYXR0LFxuICAgICAgICBzZXRJbml0aWVsbEFrdGl2RXRpa2V0dEVyU2F0dCxcbiAgICB9ID0gdXNlVGlkc2xpbmplQ29udGV4dCgpO1xuXG4gICAgY29uc3Qgb25FdGlrZXR0Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHNldHRBa3RpdkV0aWtldHQoZXRpa2V0dCk7XG4gICAgfTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICFpbml0aWVsbEFrdGl2RXRpa2V0dEVyU2F0dCAmJlxuICAgICAgICAgICAgZXRpa2V0dC5kYXRlLmdldEZ1bGxZZWFyKCkgPT09IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgICAgICAgZXRpa2V0dC5kYXRlLmdldE1vbnRoKCkgPT09IG5ldyBEYXRlKCkuZ2V0TW9udGgoKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHNldHRBa3RpdkV0aWtldHQoZXRpa2V0dCk7XG4gICAgICAgICAgICBzZXRJbml0aWVsbEFrdGl2RXRpa2V0dEVyU2F0dCh0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sIFtldGlrZXR0XSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8RXRpa2V0dEtuYXBwXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtldGlrZXR0LmxhYmVsfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2FrdGl2dFRpZHNsaW5qZVZpbmR1LnZpbmR1LmlkID09PSBUaWRzbGluamVWaW5kdS5UUkVfw4VSfVxuICAgICAgICAgICAgJHZhbGd0PXshIWFrdGl2RXRpa2V0dCAmJiBha3RpdkV0aWtldHQuZGF0ZS50b0RhdGVTdHJpbmcoKSA9PT0gZXRpa2V0dC5kYXRlLnRvRGF0ZVN0cmluZygpfVxuICAgICAgICAgICAgb25DbGljaz17b25FdGlrZXR0Q2xpY2t9XG4gICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuPntldGlrZXR0LmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgPC9FdGlrZXR0S25hcHA+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRpZHNsaW5qZUV0aWtldHQ7XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI2Y2Y0NWY5NDlhMzEzNjEzZDI2ZFwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInN0eWxlZCIsIkJvcmRlck5ldXRyYWxTdWJ0bGUiLCJUZXh0QWNjZW50IiwiVGV4dE5ldXRyYWwiLCJUZXh0TmV1dHJhbFN1YnRsZSIsIlRpZHNsaW5qZVZpbmR1IiwidXNlVGlkc2xpbmplQ29udGV4dCIsIkZhbWlsaWVCYXNlS25hcHAiLCJFdGlrZXR0S25hcHAiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiX3JlZiIsIiR2YWxndCIsIl9yZWYyIiwiZGlzYWJsZWQiLCJfcmVmMyIsImNvbmNhdCIsIl9yZWY0IiwiX3JlZjUiLCJfcmVmNiIsIkJnTmV1dHJhbFN0cm9uZ1ByZXNzZWQiLCJfYyIsIlRpZHNsaW5qZUV0aWtldHQiLCJfcmVmNyIsIl9zIiwiZXRpa2V0dCIsIl91c2VUaWRzbGluamVDb250ZXh0IiwiYWt0aXZFdGlrZXR0Iiwic2V0dEFrdGl2RXRpa2V0dCIsImFrdGl2dFRpZHNsaW5qZVZpbmR1IiwiaW5pdGllbGxBa3RpdkV0aWtldHRFclNhdHQiLCJzZXRJbml0aWVsbEFrdGl2RXRpa2V0dEVyU2F0dCIsIm9uRXRpa2V0dENsaWNrIiwiZGF0ZSIsImdldEZ1bGxZZWFyIiwiRGF0ZSIsImdldE1vbnRoIiwiY3JlYXRlRWxlbWVudCIsImxhYmVsIiwidmluZHUiLCJpZCIsIlRSRV/DhVIiLCJ0b0RhdGVTdHJpbmciLCJvbkNsaWNrIiwiX2MyIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==