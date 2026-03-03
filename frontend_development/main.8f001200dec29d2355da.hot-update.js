"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/sider/Fagsak/Saksoversikt/FagsakLenkepanel.tsx"
/*!*********************************************************************!*\
  !*** ./src/frontend/sider/Fagsak/Saksoversikt/FagsakLenkepanel.tsx ***!
  \*********************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FagsakLenkepanel: () => (/* binding */ FagsakLenkepanel),
/* harmony export */   SaksoversiktPanelBredde: () => (/* binding */ SaksoversiktPanelBredde)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/ds-tokens/dist/tokens */ "./node_modules/@navikt/ds-tokens/dist/tokens.js");
/* harmony import */ var _typer_behandling__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../typer/behandling */ "./src/frontend/typer/behandling.ts");
/* harmony import */ var _typer_behandlingstema__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../typer/behandlingstema */ "./src/frontend/typer/behandlingstema.ts");
/* harmony import */ var _typer_fagsak__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../typer/fagsak */ "./src/frontend/typer/fagsak.ts");
/* harmony import */ var _utils_fagsak__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../utils/fagsak */ "./src/frontend/utils/fagsak.ts");
/* harmony import */ var _FagsakContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../FagsakContext */ "./src/frontend/sider/Fagsak/FagsakContext.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject,
  _templateObject2,
  _templateObject3,
  _s = __webpack_require__.$Refresh$.signature(),
  _s2 = __webpack_require__.$Refresh$.signature(),
  _s3 = __webpack_require__.$Refresh$.signature();
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }










var SaksoversiktPanelBredde = "calc(10 * var(--ax-space-64))";
var HeaderTekst = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.BodyShort)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    font-size: ", ";\n"])), _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.FontSizeXlarge);
_c = HeaderTekst;
var BodyTekst = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.BodyShort)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    font-size: ", ";\n"])), _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.FontSizeHeadingMedium);
_c2 = BodyTekst;
var StyledAlert = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Alert)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    width: ", ";\n    margin-top: var(--ax-space-64);\n"])), SaksoversiktPanelBredde);
_c3 = StyledAlert;
function Innholdstabell() {
  _s();
  var _useFagsakContext = (0,_FagsakContext__WEBPACK_IMPORTED_MODULE_10__.useFagsakContext)(),
    fagsak = _useFagsakContext.fagsak;
  var behandlingstema = fagsak.løpendeKategori && fagsak.løpendeUnderkategori && (0,_typer_behandlingstema__WEBPACK_IMPORTED_MODULE_7__.tilBehandlingstema)(fagsak.løpendeKategori, fagsak.løpendeUnderkategori);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.HStack, {
    gap: "space-80"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HeaderTekst, {
    spacing: true
  }, "Behandlingstema"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(BodyTekst, {
    weight: "semibold"
  }, behandlingstema ? behandlingstema.navn : '-')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HeaderTekst, {
    spacing: true
  }, "Status"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(BodyTekst, {
    weight: "semibold"
  }, (0,_utils_fagsak__WEBPACK_IMPORTED_MODULE_9__.hentFagsakStatusVisning)(fagsak))));
}
_s(Innholdstabell, "NmVWkbSz3QO78WcsHKyBp5UQ2ig=", false, function () {
  return [_FagsakContext__WEBPACK_IMPORTED_MODULE_10__.useFagsakContext];
});
_c4 = Innholdstabell;
function FagsakTypeLabel() {
  _s2();
  var _useFagsakContext2 = (0,_FagsakContext__WEBPACK_IMPORTED_MODULE_10__.useFagsakContext)(),
    fagsak = _useFagsakContext2.fagsak;
  switch (fagsak.fagsakType) {
    case _typer_fagsak__WEBPACK_IMPORTED_MODULE_8__.FagsakType.INSTITUSJON:
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(StyledAlert, {
        variant: 'info'
      }, "Dette er en institusjonssak");
    case _typer_fagsak__WEBPACK_IMPORTED_MODULE_8__.FagsakType.BARN_ENSLIG_MINDREÅRIG:
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(StyledAlert, {
        variant: 'info'
      }, "Dette er en enslig mindre\xE5rig-sak");
    case _typer_fagsak__WEBPACK_IMPORTED_MODULE_8__.FagsakType.SKJERMET_BARN:
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(StyledAlert, {
        variant: 'info'
      }, "Dette er en skjermet barn-sak");
    default:
      return null;
  }
}
_s2(FagsakTypeLabel, "NmVWkbSz3QO78WcsHKyBp5UQ2ig=", false, function () {
  return [_FagsakContext__WEBPACK_IMPORTED_MODULE_10__.useFagsakContext];
});
_c5 = FagsakTypeLabel;
var genererHoverTekst = function genererHoverTekst(behandling) {
  return behandling.status === _typer_behandling__WEBPACK_IMPORTED_MODULE_6__.BehandlingStatus.AVSLUTTET ? 'Gå til gjeldende vedtak' : 'Gå til åpen behandling';
};
function FagsakLenkepanel() {
  _s3();
  var _useFagsakContext3 = (0,_FagsakContext__WEBPACK_IMPORTED_MODULE_10__.useFagsakContext)(),
    fagsak = _useFagsakContext3.fagsak;
  var aktivBehandling = (0,_utils_fagsak__WEBPACK_IMPORTED_MODULE_9__["hentAktivBehandlingPåMinimalFagsak"])(fagsak);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, aktivBehandling ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Box, {
    width: SaksoversiktPanelBredde,
    marginBlock: 'space-32 space-0'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.LinkCard, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.LinkCard.Title, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.LinkCard.Anchor, {
    asChild: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Link, {
    as: react_router__WEBPACK_IMPORTED_MODULE_2__.Link,
    to: "/fagsak/".concat(fagsak.id, "/").concat(aktivBehandling.behandlingId)
  }, genererHoverTekst(aktivBehandling)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.LinkCard.Description, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.VStack, {
    paddingBlock: 'space-16 space-0'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Innholdstabell, null))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_4__.Box, {
    width: SaksoversiktPanelBredde,
    marginBlock: 'space-32 space-0',
    borderColor: "neutral-strong",
    borderWidth: "1",
    borderRadius: "2",
    padding: "space-32"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Innholdstabell, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(FagsakTypeLabel, null));
}
_s3(FagsakLenkepanel, "NmVWkbSz3QO78WcsHKyBp5UQ2ig=", false, function () {
  return [_FagsakContext__WEBPACK_IMPORTED_MODULE_10__.useFagsakContext];
});
_c6 = FagsakLenkepanel;
var _c, _c2, _c3, _c4, _c5, _c6;
__webpack_require__.$Refresh$.register(_c, "HeaderTekst");
__webpack_require__.$Refresh$.register(_c2, "BodyTekst");
__webpack_require__.$Refresh$.register(_c3, "StyledAlert");
__webpack_require__.$Refresh$.register(_c4, "Innholdstabell");
__webpack_require__.$Refresh$.register(_c5, "FagsakTypeLabel");
__webpack_require__.$Refresh$.register(_c6, "FagsakLenkepanel");

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
/******/ 	__webpack_require__.h = () => ("bb1753cdf35375087d0d")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y0FBYyxNQUFFLENBQ2IsQ0FDVSxDQUNoQixDQUNULENBQUMsZ0JBRU43QiwwREFBQSxDQUFDTSxpREFBRztJQUNBc0QsS0FBSyxFQUFFMUMsdUJBQXdCO0lBQy9CMkMsV0FBVyxFQUFFLGtCQUFtQjtJQUNoQ1csV0FBVyxFQUFDLGdCQUFnQjtJQUM1QkMsV0FBVyxFQUFDLEdBQUc7SUFDZkMsWUFBWSxFQUFDLEdBQUc7SUFDaEJDLE9BQU8sRUFBQztFQUFVLGdCQUVsQjNFLDBEQUFBLENBQUM2QixjQUFjLE1BQUUsQ0FDaEIsQ0FDUixlQUNEN0IsMERBQUEsQ0FBQzBDLGVBQWUsTUFBRSxDQUNwQixDQUFDO0FBRVg7QUFBQ2MsR0FBQSxDQXRDZUQsZ0JBQWdCO0VBQUEsUUFDVHRDLDZEQUFnQjtBQUFBO0FBQUEyRCxHQUFBLEdBRHZCckIsZ0JBQWdCO0FBQUEsSUFBQWpDLEVBQUEsRUFBQUcsR0FBQSxFQUFBRyxHQUFBLEVBQUFhLEdBQUEsRUFBQVMsR0FBQSxFQUFBMEIsR0FBQTtBQUFBQyxzQ0FBQSxDQUFBdkQsRUFBQTtBQUFBdUQsc0NBQUEsQ0FBQXBELEdBQUE7QUFBQW9ELHNDQUFBLENBQUFqRCxHQUFBO0FBQUFpRCxzQ0FBQSxDQUFBcEMsR0FBQTtBQUFBb0Msc0NBQUEsQ0FBQTNCLEdBQUE7QUFBQTJCLHNDQUFBLENBQUFELEdBQUEsc0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ3RFaEMsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9GYWdzYWsvU2Frc292ZXJzaWt0L0ZhZ3Nha0xlbmtlcGFuZWwudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBMaW5rIGFzIFJlYWN0Um91dGVyTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQWxlcnQsIEJvZHlTaG9ydCwgQm94LCBIU3RhY2ssIExpbmssIExpbmtDYXJkLCBWU3RhY2sgfSBmcm9tICdAbmF2aWt0L2RzLXJlYWN0JztcbmltcG9ydCB7IEZvbnRTaXplSGVhZGluZ01lZGl1bSwgRm9udFNpemVYbGFyZ2UgfSBmcm9tICdAbmF2aWt0L2RzLXRva2Vucy9kaXN0L3Rva2Vucyc7XG5cbmltcG9ydCB0eXBlIHsgVmlzbmluZ0JlaGFuZGxpbmcgfSBmcm9tICcuL3Zpc25pbmdCZWhhbmRsaW5nJztcbmltcG9ydCB7IEJlaGFuZGxpbmdTdGF0dXMgfSBmcm9tICcuLi8uLi8uLi90eXBlci9iZWhhbmRsaW5nJztcbmltcG9ydCB0eXBlIHsgSUJlaGFuZGxpbmdzdGVtYSB9IGZyb20gJy4uLy4uLy4uL3R5cGVyL2JlaGFuZGxpbmdzdGVtYSc7XG5pbXBvcnQgeyB0aWxCZWhhbmRsaW5nc3RlbWEgfSBmcm9tICcuLi8uLi8uLi90eXBlci9iZWhhbmRsaW5nc3RlbWEnO1xuaW1wb3J0IHsgRmFnc2FrVHlwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVyL2ZhZ3Nhayc7XG5pbXBvcnQgeyBoZW50QWt0aXZCZWhhbmRsaW5nUMOlTWluaW1hbEZhZ3NhaywgaGVudEZhZ3Nha1N0YXR1c1Zpc25pbmcgfSBmcm9tICcuLi8uLi8uLi91dGlscy9mYWdzYWsnO1xuaW1wb3J0IHsgdXNlRmFnc2FrQ29udGV4dCB9IGZyb20gJy4uL0ZhZ3Nha0NvbnRleHQnO1xuXG5leHBvcnQgY29uc3QgU2Frc292ZXJzaWt0UGFuZWxCcmVkZGUgPSBgY2FsYygxMCAqIHZhcigtLWF4LXNwYWNlLTY0KSlgO1xuXG5jb25zdCBIZWFkZXJUZWtzdCA9IHN0eWxlZChCb2R5U2hvcnQpYFxuICAgIGZvbnQtc2l6ZTogJHtGb250U2l6ZVhsYXJnZX07XG5gO1xuXG5jb25zdCBCb2R5VGVrc3QgPSBzdHlsZWQoQm9keVNob3J0KWBcbiAgICBmb250LXNpemU6ICR7Rm9udFNpemVIZWFkaW5nTWVkaXVtfTtcbmA7XG5cbmNvbnN0IFN0eWxlZEFsZXJ0ID0gc3R5bGVkKEFsZXJ0KWBcbiAgICB3aWR0aDogJHtTYWtzb3ZlcnNpa3RQYW5lbEJyZWRkZX07XG4gICAgbWFyZ2luLXRvcDogdmFyKC0tYXgtc3BhY2UtNjQpO1xuYDtcblxuZnVuY3Rpb24gSW5uaG9sZHN0YWJlbGwoKSB7XG4gICAgY29uc3QgeyBmYWdzYWsgfSA9IHVzZUZhZ3Nha0NvbnRleHQoKTtcblxuICAgIGNvbnN0IGJlaGFuZGxpbmdzdGVtYTogSUJlaGFuZGxpbmdzdGVtYSB8IHVuZGVmaW5lZCA9XG4gICAgICAgIGZhZ3Nhay5sw7hwZW5kZUthdGVnb3JpICYmXG4gICAgICAgIGZhZ3Nhay5sw7hwZW5kZVVuZGVya2F0ZWdvcmkgJiZcbiAgICAgICAgdGlsQmVoYW5kbGluZ3N0ZW1hKGZhZ3Nhay5sw7hwZW5kZUthdGVnb3JpLCBmYWdzYWsubMO4cGVuZGVVbmRlcmthdGVnb3JpKTtcbiAgICByZXR1cm4gKFxuICAgICAgICA8SFN0YWNrIGdhcD1cInNwYWNlLTgwXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxIZWFkZXJUZWtzdCBzcGFjaW5nPkJlaGFuZGxpbmdzdGVtYTwvSGVhZGVyVGVrc3Q+XG4gICAgICAgICAgICAgICAgPEJvZHlUZWtzdCB3ZWlnaHQ9XCJzZW1pYm9sZFwiPntiZWhhbmRsaW5nc3RlbWEgPyBiZWhhbmRsaW5nc3RlbWEubmF2biA6ICctJ308L0JvZHlUZWtzdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8SGVhZGVyVGVrc3Qgc3BhY2luZz5TdGF0dXM8L0hlYWRlclRla3N0PlxuICAgICAgICAgICAgICAgIDxCb2R5VGVrc3Qgd2VpZ2h0PVwic2VtaWJvbGRcIj57aGVudEZhZ3Nha1N0YXR1c1Zpc25pbmcoZmFnc2FrKX08L0JvZHlUZWtzdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0hTdGFjaz5cbiAgICApO1xufVxuXG5mdW5jdGlvbiBGYWdzYWtUeXBlTGFiZWwoKSB7XG4gICAgY29uc3QgeyBmYWdzYWsgfSA9IHVzZUZhZ3Nha0NvbnRleHQoKTtcbiAgICBzd2l0Y2ggKGZhZ3Nhay5mYWdzYWtUeXBlKSB7XG4gICAgICAgIGNhc2UgRmFnc2FrVHlwZS5JTlNUSVRVU0pPTjpcbiAgICAgICAgICAgIHJldHVybiA8U3R5bGVkQWxlcnQgdmFyaWFudD17J2luZm8nfT5EZXR0ZSBlciBlbiBpbnN0aXR1c2pvbnNzYWs8L1N0eWxlZEFsZXJ0PjtcbiAgICAgICAgY2FzZSBGYWdzYWtUeXBlLkJBUk5fRU5TTElHX01JTkRSRcOFUklHOlxuICAgICAgICAgICAgcmV0dXJuIDxTdHlsZWRBbGVydCB2YXJpYW50PXsnaW5mbyd9PkRldHRlIGVyIGVuIGVuc2xpZyBtaW5kcmXDpXJpZy1zYWs8L1N0eWxlZEFsZXJ0PjtcbiAgICAgICAgY2FzZSBGYWdzYWtUeXBlLlNLSkVSTUVUX0JBUk46XG4gICAgICAgICAgICByZXR1cm4gPFN0eWxlZEFsZXJ0IHZhcmlhbnQ9eydpbmZvJ30+RGV0dGUgZXIgZW4gc2tqZXJtZXQgYmFybi1zYWs8L1N0eWxlZEFsZXJ0PjtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuY29uc3QgZ2VuZXJlckhvdmVyVGVrc3QgPSAoYmVoYW5kbGluZzogVmlzbmluZ0JlaGFuZGxpbmcpID0+IHtcbiAgICByZXR1cm4gYmVoYW5kbGluZy5zdGF0dXMgPT09IEJlaGFuZGxpbmdTdGF0dXMuQVZTTFVUVEVUID8gJ0fDpSB0aWwgZ2plbGRlbmRlIHZlZHRhaycgOiAnR8OlIHRpbCDDpXBlbiBiZWhhbmRsaW5nJztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBGYWdzYWtMZW5rZXBhbmVsKCkge1xuICAgIGNvbnN0IHsgZmFnc2FrIH0gPSB1c2VGYWdzYWtDb250ZXh0KCk7XG4gICAgY29uc3QgYWt0aXZCZWhhbmRsaW5nOiBWaXNuaW5nQmVoYW5kbGluZyB8IHVuZGVmaW5lZCA9IGhlbnRBa3RpdkJlaGFuZGxpbmdQw6VNaW5pbWFsRmFnc2FrKGZhZ3Nhayk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgICAge2FrdGl2QmVoYW5kbGluZyA/IChcbiAgICAgICAgICAgICAgICA8Qm94IHdpZHRoPXtTYWtzb3ZlcnNpa3RQYW5lbEJyZWRkZX0gbWFyZ2luQmxvY2s9eydzcGFjZS0zMiBzcGFjZS0wJ30+XG4gICAgICAgICAgICAgICAgICAgIDxMaW5rQ2FyZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rQ2FyZC5UaXRsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGlua0NhcmQuQW5jaG9yIGFzQ2hpbGQ9e3RydWV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGluayBhcz17UmVhY3RSb3V0ZXJMaW5rfSB0bz17YC9mYWdzYWsvJHtmYWdzYWsuaWR9LyR7YWt0aXZCZWhhbmRsaW5nLmJlaGFuZGxpbmdJZH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZW5lcmVySG92ZXJUZWtzdChha3RpdkJlaGFuZGxpbmcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rQ2FyZC5BbmNob3I+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0xpbmtDYXJkLlRpdGxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExpbmtDYXJkLkRlc2NyaXB0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWU3RhY2sgcGFkZGluZ0Jsb2NrPXsnc3BhY2UtMTYgc3BhY2UtMCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5uaG9sZHN0YWJlbGwgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ZTdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlua0NhcmQuRGVzY3JpcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvTGlua0NhcmQ+XG4gICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9e1Nha3NvdmVyc2lrdFBhbmVsQnJlZGRlfVxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5CbG9jaz17J3NwYWNlLTMyIHNwYWNlLTAnfVxuICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcj1cIm5ldXRyYWwtc3Ryb25nXCJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyV2lkdGg9XCIxXCJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiMlwiXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc9XCJzcGFjZS0zMlwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8SW5uaG9sZHN0YWJlbGwgLz5cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8RmFnc2FrVHlwZUxhYmVsIC8+XG4gICAgICAgIDwvPlxuICAgICk7XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJiYjE3NTNjZGYzNTM3NTA4N2QwZFwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsIkxpbmsiLCJSZWFjdFJvdXRlckxpbmsiLCJzdHlsZWQiLCJBbGVydCIsIkJvZHlTaG9ydCIsIkJveCIsIkhTdGFjayIsIkxpbmtDYXJkIiwiVlN0YWNrIiwiRm9udFNpemVIZWFkaW5nTWVkaXVtIiwiRm9udFNpemVYbGFyZ2UiLCJCZWhhbmRsaW5nU3RhdHVzIiwidGlsQmVoYW5kbGluZ3N0ZW1hIiwiRmFnc2FrVHlwZSIsImhlbnRBa3RpdkJlaGFuZGxpbmdQw6VNaW5pbWFsRmFnc2FrIiwiaGVudEZhZ3Nha1N0YXR1c1Zpc25pbmciLCJ1c2VGYWdzYWtDb250ZXh0IiwiU2Frc292ZXJzaWt0UGFuZWxCcmVkZGUiLCJIZWFkZXJUZWtzdCIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJfYyIsIkJvZHlUZWtzdCIsIl90ZW1wbGF0ZU9iamVjdDIiLCJfYzIiLCJTdHlsZWRBbGVydCIsIl90ZW1wbGF0ZU9iamVjdDMiLCJfYzMiLCJJbm5ob2xkc3RhYmVsbCIsIl9zIiwiX3VzZUZhZ3Nha0NvbnRleHQiLCJmYWdzYWsiLCJiZWhhbmRsaW5nc3RlbWEiLCJsw7hwZW5kZUthdGVnb3JpIiwibMO4cGVuZGVVbmRlcmthdGVnb3JpIiwiY3JlYXRlRWxlbWVudCIsImdhcCIsInNwYWNpbmciLCJ3ZWlnaHQiLCJuYXZuIiwiX2M0IiwiRmFnc2FrVHlwZUxhYmVsIiwiX3MyIiwiX3VzZUZhZ3Nha0NvbnRleHQyIiwiZmFnc2FrVHlwZSIsIklOU1RJVFVTSk9OIiwidmFyaWFudCIsIkJBUk5fRU5TTElHX01JTkRSRcOFUklHIiwiU0tKRVJNRVRfQkFSTiIsIl9jNSIsImdlbmVyZXJIb3ZlclRla3N0IiwiYmVoYW5kbGluZyIsInN0YXR1cyIsIkFWU0xVVFRFVCIsIkZhZ3Nha0xlbmtlcGFuZWwiLCJfczMiLCJfdXNlRmFnc2FrQ29udGV4dDMiLCJha3RpdkJlaGFuZGxpbmciLCJGcmFnbWVudCIsIndpZHRoIiwibWFyZ2luQmxvY2siLCJUaXRsZSIsIkFuY2hvciIsImFzQ2hpbGQiLCJhcyIsInRvIiwiY29uY2F0IiwiaWQiLCJiZWhhbmRsaW5nSWQiLCJEZXNjcmlwdGlvbiIsInBhZGRpbmdCbG9jayIsImJvcmRlckNvbG9yIiwiYm9yZGVyV2lkdGgiLCJib3JkZXJSYWRpdXMiLCJwYWRkaW5nIiwiX2M2IiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==