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





var EtikettKnapp = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_FamilieBaseKnapp__WEBPACK_IMPORTED_MODULE_5__["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    padding: 3px 3px 3px ", ";\n    width: 90%;\n    text-align: left;\n    cursor: ", ";\n    border-left: ", ";\n\n    > span {\n        text-decoration: ", ";\n        font-weight: ", ";\n        color: ", ";\n    }\n\n    :hover {\n        > span {\n            text-decoration: none;\n        }\n    }\n\n    &:active {\n        background-color: red; //", "; //TODO NGHI hvorfor er en bakgrunnsfarge en borderFocus?\n        color: #fff;\n    }\n"])), function (_ref) {
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
}, _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__.BorderFocus);
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
/******/ 	__webpack_require__.h = () => ("4f3ee2b3d2deb1435dfc")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QiwwREFBQSxDQUFDVyxZQUFZO0lBQ1QsY0FBWWdCLE9BQU8sQ0FBQ2EsS0FBTTtJQUMxQnZCLFFBQVEsRUFBRWMsb0JBQW9CLENBQUNVLEtBQUssQ0FBQ0MsRUFBRSxLQUFLbEMsNkRBQWMsQ0FBQ21DLE1BQU87SUFDbEU1QixNQUFNLEVBQUUsQ0FBQyxDQUFDYyxZQUFZLElBQUlBLFlBQVksQ0FBQ00sSUFBSSxDQUFDUyxZQUFZLENBQUMsQ0FBQyxLQUFLakIsT0FBTyxDQUFDUSxJQUFJLENBQUNTLFlBQVksQ0FBQyxDQUFFO0lBQzNGQyxPQUFPLEVBQUVYO0VBQWUsZ0JBRXhCbEMsMERBQUEsZUFBTzJCLE9BQU8sQ0FBQ2EsS0FBWSxDQUNqQixDQUFDO0FBRXZCLENBQUM7QUFBQ2QsRUFBQSxDQWxDSUYsZ0JBQXVEO0VBQUEsUUFPckRmLGtFQUFtQjtBQUFBO0FBQUFxQyxHQUFBLEdBUHJCdEIsZ0JBQXVEO0FBb0M3RCxpRUFBZUEsZ0JBQWdCLEVBQUM7QUFBQSxJQUFBRCxFQUFBLEVBQUF1QixHQUFBO0FBQUFDLHNDQUFBLENBQUF4QixFQUFBO0FBQUF3QixzQ0FBQSxDQUFBRCxHQUFBLHNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNyRmhDLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQva29tcG9uZW50ZXIvVGlkc2xpbmplL1RpZHNsaW5qZUV0aWtldHQudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHtcbiAgICBCb3JkZXJGb2N1cyxcbiAgICBCb3JkZXJOZXV0cmFsU3VidGxlLFxuICAgIFRleHRBY2NlbnQsXG4gICAgVGV4dE5ldXRyYWwsXG4gICAgVGV4dE5ldXRyYWxTdWJ0bGUsXG59IGZyb20gJ0BuYXZpa3QvZHMtdG9rZW5zL2Rpc3QvdG9rZW5zJztcbmltcG9ydCB0eXBlIHsgRXRpa2V0dCB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUnO1xuXG5pbXBvcnQgeyBUaWRzbGluamVWaW5kdSwgdXNlVGlkc2xpbmplQ29udGV4dCB9IGZyb20gJy4vVGlkc2xpbmplQ29udGV4dCc7XG5pbXBvcnQgRmFtaWxpZUJhc2VLbmFwcCBmcm9tICcuLi9GYW1pbGllQmFzZUtuYXBwJztcblxuaW50ZXJmYWNlIElFdGlrZXR0UHJvcCB7XG4gICAgZXRpa2V0dDogRXRpa2V0dDtcbn1cblxuY29uc3QgRXRpa2V0dEtuYXBwID0gc3R5bGVkKEZhbWlsaWVCYXNlS25hcHApPHsgZGlzYWJsZWQ6IGJvb2xlYW47ICR2YWxndDogYm9vbGVhbiB9PmBcbiAgICBwYWRkaW5nOiAzcHggM3B4IDNweCAkeyh7ICR2YWxndCB9KSA9PiAoJHZhbGd0ID8gJzVweCcgOiAnM3B4Jyl9O1xuICAgIHdpZHRoOiA5MCU7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICBjdXJzb3I6ICR7KHsgZGlzYWJsZWQgfSkgPT4gKGRpc2FibGVkID8gJ2RlZmF1bHQnIDogJ3BvaW50ZXInKX07XG4gICAgYm9yZGVyLWxlZnQ6ICR7KHsgJHZhbGd0IH0pID0+ICgkdmFsZ3QgPyBgMXB4IHNvbGlkICR7Qm9yZGVyTmV1dHJhbFN1YnRsZX1gIDogJ25vbmUnKX07XG5cbiAgICA+IHNwYW4ge1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246ICR7KHsgZGlzYWJsZWQsICR2YWxndCB9KSA9PiAoZGlzYWJsZWQgfHwgJHZhbGd0ID8gJ25vbmUnIDogJ3VuZGVybGluZScpfTtcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7KHsgJHZhbGd0IH0pID0+ICgkdmFsZ3QgPyAnYm9sZCcgOiAnbm9ybWFsJyl9O1xuICAgICAgICBjb2xvcjogJHsoeyBkaXNhYmxlZCwgJHZhbGd0IH0pID0+IHtcbiAgICAgICAgICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuIFRleHROZXV0cmFsU3VidGxlO1xuICAgICAgICAgICAgZWxzZSBpZiAoJHZhbGd0KSByZXR1cm4gVGV4dE5ldXRyYWw7XG4gICAgICAgICAgICBlbHNlIHJldHVybiBUZXh0QWNjZW50O1xuICAgICAgICB9fTtcbiAgICB9XG5cbiAgICA6aG92ZXIge1xuICAgICAgICA+IHNwYW4ge1xuICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJjphY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7IC8vJHtCb3JkZXJGb2N1c307IC8vVE9ETyBOR0hJIGh2b3Jmb3IgZXIgZW4gYmFrZ3J1bm5zZmFyZ2UgZW4gYm9yZGVyRm9jdXM/XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgIH1cbmA7XG5cbmNvbnN0IFRpZHNsaW5qZUV0aWtldHQ6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PElFdGlrZXR0UHJvcD4gPSAoeyBldGlrZXR0IH0pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIGFrdGl2RXRpa2V0dCxcbiAgICAgICAgc2V0dEFrdGl2RXRpa2V0dCxcbiAgICAgICAgYWt0aXZ0VGlkc2xpbmplVmluZHUsXG4gICAgICAgIGluaXRpZWxsQWt0aXZFdGlrZXR0RXJTYXR0LFxuICAgICAgICBzZXRJbml0aWVsbEFrdGl2RXRpa2V0dEVyU2F0dCxcbiAgICB9ID0gdXNlVGlkc2xpbmplQ29udGV4dCgpO1xuXG4gICAgY29uc3Qgb25FdGlrZXR0Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHNldHRBa3RpdkV0aWtldHQoZXRpa2V0dCk7XG4gICAgfTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICFpbml0aWVsbEFrdGl2RXRpa2V0dEVyU2F0dCAmJlxuICAgICAgICAgICAgZXRpa2V0dC5kYXRlLmdldEZ1bGxZZWFyKCkgPT09IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgICAgICAgZXRpa2V0dC5kYXRlLmdldE1vbnRoKCkgPT09IG5ldyBEYXRlKCkuZ2V0TW9udGgoKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHNldHRBa3RpdkV0aWtldHQoZXRpa2V0dCk7XG4gICAgICAgICAgICBzZXRJbml0aWVsbEFrdGl2RXRpa2V0dEVyU2F0dCh0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sIFtldGlrZXR0XSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8RXRpa2V0dEtuYXBwXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtldGlrZXR0LmxhYmVsfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2FrdGl2dFRpZHNsaW5qZVZpbmR1LnZpbmR1LmlkID09PSBUaWRzbGluamVWaW5kdS5UUkVfw4VSfVxuICAgICAgICAgICAgJHZhbGd0PXshIWFrdGl2RXRpa2V0dCAmJiBha3RpdkV0aWtldHQuZGF0ZS50b0RhdGVTdHJpbmcoKSA9PT0gZXRpa2V0dC5kYXRlLnRvRGF0ZVN0cmluZygpfVxuICAgICAgICAgICAgb25DbGljaz17b25FdGlrZXR0Q2xpY2t9XG4gICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuPntldGlrZXR0LmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgPC9FdGlrZXR0S25hcHA+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRpZHNsaW5qZUV0aWtldHQ7XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI0ZjNlZTJiM2QyZGViMTQzNWRmY1wiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInN0eWxlZCIsIkJvcmRlckZvY3VzIiwiQm9yZGVyTmV1dHJhbFN1YnRsZSIsIlRleHRBY2NlbnQiLCJUZXh0TmV1dHJhbCIsIlRleHROZXV0cmFsU3VidGxlIiwiVGlkc2xpbmplVmluZHUiLCJ1c2VUaWRzbGluamVDb250ZXh0IiwiRmFtaWxpZUJhc2VLbmFwcCIsIkV0aWtldHRLbmFwcCIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJfcmVmIiwiJHZhbGd0IiwiX3JlZjIiLCJkaXNhYmxlZCIsIl9yZWYzIiwiY29uY2F0IiwiX3JlZjQiLCJfcmVmNSIsIl9yZWY2IiwiX2MiLCJUaWRzbGluamVFdGlrZXR0IiwiX3JlZjciLCJfcyIsImV0aWtldHQiLCJfdXNlVGlkc2xpbmplQ29udGV4dCIsImFrdGl2RXRpa2V0dCIsInNldHRBa3RpdkV0aWtldHQiLCJha3RpdnRUaWRzbGluamVWaW5kdSIsImluaXRpZWxsQWt0aXZFdGlrZXR0RXJTYXR0Iiwic2V0SW5pdGllbGxBa3RpdkV0aWtldHRFclNhdHQiLCJvbkV0aWtldHRDbGljayIsImRhdGUiLCJnZXRGdWxsWWVhciIsIkRhdGUiLCJnZXRNb250aCIsImNyZWF0ZUVsZW1lbnQiLCJsYWJlbCIsInZpbmR1IiwiaWQiLCJUUkVfw4VSIiwidG9EYXRlU3RyaW5nIiwib25DbGljayIsIl9jMiIsIiRSZWZyZXNoUmVnJCJdLCJzb3VyY2VSb290IjoiIn0=