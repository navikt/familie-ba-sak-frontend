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
}, _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__.BgNeutralStrongPressed);
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
/******/ 	__webpack_require__.h = () => ("7d6bf13859bebce8234c")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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M0IsMERBQUEsQ0FBQ1csWUFBWTtJQUNULGNBQVlnQixPQUFPLENBQUNhLEtBQU07SUFDMUJ2QixRQUFRLEVBQUVjLG9CQUFvQixDQUFDVSxLQUFLLENBQUNDLEVBQUUsS0FBS2xDLDZEQUFjLENBQUNtQyxNQUFPO0lBQ2xFNUIsTUFBTSxFQUFFLENBQUMsQ0FBQ2MsWUFBWSxJQUFJQSxZQUFZLENBQUNNLElBQUksQ0FBQ1MsWUFBWSxDQUFDLENBQUMsS0FBS2pCLE9BQU8sQ0FBQ1EsSUFBSSxDQUFDUyxZQUFZLENBQUMsQ0FBRTtJQUMzRkMsT0FBTyxFQUFFWDtFQUFlLGdCQUV4QmxDLDBEQUFBLGVBQU8yQixPQUFPLENBQUNhLEtBQVksQ0FDakIsQ0FBQztBQUV2QixDQUFDO0FBQUNkLEVBQUEsQ0FsQ0lGLGdCQUF1RDtFQUFBLFFBT3JEZixrRUFBbUI7QUFBQTtBQUFBcUMsR0FBQSxHQVByQnRCLGdCQUF1RDtBQW9DN0QsaUVBQWVBLGdCQUFnQixFQUFDO0FBQUEsSUFBQUQsRUFBQSxFQUFBdUIsR0FBQTtBQUFBQyxzQ0FBQSxDQUFBeEIsRUFBQTtBQUFBd0Isc0NBQUEsQ0FBQUQsR0FBQSxzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDdEZoQyxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL2tvbXBvbmVudGVyL1RpZHNsaW5qZS9UaWRzbGluamVFdGlrZXR0LnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7XG4gICAgQmdOZXV0cmFsU3Ryb25nUHJlc3NlZCxcbiAgICBCb3JkZXJOZXV0cmFsU3VidGxlLFxuICAgIFRleHRBY2NlbnQsXG4gICAgVGV4dE5ldXRyYWwsXG4gICAgVGV4dE5ldXRyYWxTdWJ0bGUsXG59IGZyb20gJ0BuYXZpa3QvZHMtdG9rZW5zL2Rpc3QvdG9rZW5zJztcbmltcG9ydCB0eXBlIHsgRXRpa2V0dCB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUnO1xuXG5pbXBvcnQgeyBUaWRzbGluamVWaW5kdSwgdXNlVGlkc2xpbmplQ29udGV4dCB9IGZyb20gJy4vVGlkc2xpbmplQ29udGV4dCc7XG5pbXBvcnQgRmFtaWxpZUJhc2VLbmFwcCBmcm9tICcuLi9GYW1pbGllQmFzZUtuYXBwJztcblxuaW50ZXJmYWNlIElFdGlrZXR0UHJvcCB7XG4gICAgZXRpa2V0dDogRXRpa2V0dDtcbn1cblxuY29uc3QgRXRpa2V0dEtuYXBwID0gc3R5bGVkKEZhbWlsaWVCYXNlS25hcHApPHsgZGlzYWJsZWQ6IGJvb2xlYW47ICR2YWxndDogYm9vbGVhbiB9PmBcbiAgICBwYWRkaW5nOiAzcHggM3B4IDNweCAkeyh7ICR2YWxndCB9KSA9PiAoJHZhbGd0ID8gJzVweCcgOiAnM3B4Jyl9O1xuICAgIHdpZHRoOiA5MCU7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICBjdXJzb3I6ICR7KHsgZGlzYWJsZWQgfSkgPT4gKGRpc2FibGVkID8gJ2RlZmF1bHQnIDogJ3BvaW50ZXInKX07XG4gICAgYm9yZGVyLWxlZnQ6ICR7KHsgJHZhbGd0IH0pID0+ICgkdmFsZ3QgPyBgMXB4IHNvbGlkICR7Qm9yZGVyTmV1dHJhbFN1YnRsZX1gIDogJ25vbmUnKX07XG5cbiAgICA+IHNwYW4ge1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246ICR7KHsgZGlzYWJsZWQsICR2YWxndCB9KSA9PiAoZGlzYWJsZWQgfHwgJHZhbGd0ID8gJ25vbmUnIDogJ3VuZGVybGluZScpfTtcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7KHsgJHZhbGd0IH0pID0+ICgkdmFsZ3QgPyAnYm9sZCcgOiAnbm9ybWFsJyl9O1xuICAgICAgICBjb2xvcjogJHsoeyBkaXNhYmxlZCwgJHZhbGd0IH0pID0+IHtcbiAgICAgICAgICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuIFRleHROZXV0cmFsU3VidGxlO1xuICAgICAgICAgICAgZWxzZSBpZiAoJHZhbGd0KSByZXR1cm4gVGV4dE5ldXRyYWw7XG4gICAgICAgICAgICBlbHNlIHJldHVybiBUZXh0QWNjZW50O1xuICAgICAgICB9fTtcbiAgICB9XG5cbiAgICA6aG92ZXIge1xuICAgICAgICA+IHNwYW4ge1xuICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgOmZvY3VzLFxuICAgIDphY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke0JnTmV1dHJhbFN0cm9uZ1ByZXNzZWR9OyAvL1RPRE8gTkdISSBodm9yZm9yIGVyIGVuIGJha2dydW5uc2ZhcmdlIGVuIGJvcmRlckZvY3VzP1xuICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICB9XG5gO1xuXG5jb25zdCBUaWRzbGluamVFdGlrZXR0OiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxJRXRpa2V0dFByb3A+ID0gKHsgZXRpa2V0dCB9KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgICBha3RpdkV0aWtldHQsXG4gICAgICAgIHNldHRBa3RpdkV0aWtldHQsXG4gICAgICAgIGFrdGl2dFRpZHNsaW5qZVZpbmR1LFxuICAgICAgICBpbml0aWVsbEFrdGl2RXRpa2V0dEVyU2F0dCxcbiAgICAgICAgc2V0SW5pdGllbGxBa3RpdkV0aWtldHRFclNhdHQsXG4gICAgfSA9IHVzZVRpZHNsaW5qZUNvbnRleHQoKTtcblxuICAgIGNvbnN0IG9uRXRpa2V0dENsaWNrID0gKCkgPT4ge1xuICAgICAgICBzZXR0QWt0aXZFdGlrZXR0KGV0aWtldHQpO1xuICAgIH07XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhaW5pdGllbGxBa3RpdkV0aWtldHRFclNhdHQgJiZcbiAgICAgICAgICAgIGV0aWtldHQuZGF0ZS5nZXRGdWxsWWVhcigpID09PSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgJiZcbiAgICAgICAgICAgIGV0aWtldHQuZGF0ZS5nZXRNb250aCgpID09PSBuZXcgRGF0ZSgpLmdldE1vbnRoKClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBzZXR0QWt0aXZFdGlrZXR0KGV0aWtldHQpO1xuICAgICAgICAgICAgc2V0SW5pdGllbGxBa3RpdkV0aWtldHRFclNhdHQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LCBbZXRpa2V0dF0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEV0aWtldHRLbmFwcFxuICAgICAgICAgICAgYXJpYS1sYWJlbD17ZXRpa2V0dC5sYWJlbH1cbiAgICAgICAgICAgIGRpc2FibGVkPXtha3RpdnRUaWRzbGluamVWaW5kdS52aW5kdS5pZCA9PT0gVGlkc2xpbmplVmluZHUuVFJFX8OFUn1cbiAgICAgICAgICAgICR2YWxndD17ISFha3RpdkV0aWtldHQgJiYgYWt0aXZFdGlrZXR0LmRhdGUudG9EYXRlU3RyaW5nKCkgPT09IGV0aWtldHQuZGF0ZS50b0RhdGVTdHJpbmcoKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uRXRpa2V0dENsaWNrfVxuICAgICAgICA+XG4gICAgICAgICAgICA8c3Bhbj57ZXRpa2V0dC5sYWJlbH08L3NwYW4+XG4gICAgICAgIDwvRXRpa2V0dEtuYXBwPlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUaWRzbGluamVFdGlrZXR0O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiN2Q2YmYxMzg1OWJlYmNlODIzNGNcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJzdHlsZWQiLCJCZ05ldXRyYWxTdHJvbmdQcmVzc2VkIiwiQm9yZGVyTmV1dHJhbFN1YnRsZSIsIlRleHRBY2NlbnQiLCJUZXh0TmV1dHJhbCIsIlRleHROZXV0cmFsU3VidGxlIiwiVGlkc2xpbmplVmluZHUiLCJ1c2VUaWRzbGluamVDb250ZXh0IiwiRmFtaWxpZUJhc2VLbmFwcCIsIkV0aWtldHRLbmFwcCIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJfcmVmIiwiJHZhbGd0IiwiX3JlZjIiLCJkaXNhYmxlZCIsIl9yZWYzIiwiY29uY2F0IiwiX3JlZjQiLCJfcmVmNSIsIl9yZWY2IiwiX2MiLCJUaWRzbGluamVFdGlrZXR0IiwiX3JlZjciLCJfcyIsImV0aWtldHQiLCJfdXNlVGlkc2xpbmplQ29udGV4dCIsImFrdGl2RXRpa2V0dCIsInNldHRBa3RpdkV0aWtldHQiLCJha3RpdnRUaWRzbGluamVWaW5kdSIsImluaXRpZWxsQWt0aXZFdGlrZXR0RXJTYXR0Iiwic2V0SW5pdGllbGxBa3RpdkV0aWtldHRFclNhdHQiLCJvbkV0aWtldHRDbGljayIsImRhdGUiLCJnZXRGdWxsWWVhciIsIkRhdGUiLCJnZXRNb250aCIsImNyZWF0ZUVsZW1lbnQiLCJsYWJlbCIsInZpbmR1IiwiaWQiLCJUUkVfw4VSIiwidG9EYXRlU3RyaW5nIiwib25DbGljayIsIl9jMiIsIiRSZWZyZXNoUmVnJCJdLCJzb3VyY2VSb290IjoiIn0=