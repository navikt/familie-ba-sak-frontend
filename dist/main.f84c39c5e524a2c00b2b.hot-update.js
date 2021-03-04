self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/komponenter/ManuellJournalfør/KnyttJournalpostTilBehandling.tsx":
/*!**************************************************************************************!*\
  !*** ./src/frontend/komponenter/ManuellJournalfør/KnyttJournalpostTilBehandling.tsx ***!
  \**************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KnyttJournalpostTilBehandling": () => (/* binding */ KnyttJournalpostTilBehandling)
/* harmony export */ });
/* harmony import */ var _Users_henninghaakonsen_nav_familie_familie_ba_sak_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var nav_frontend_alertstriper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nav-frontend-alertstriper */ "./node_modules/nav-frontend-alertstriper/lib/alertstripe.js");
/* harmony import */ var nav_frontend_alertstriper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nav_frontend_alertstriper__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var nav_frontend_typografi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nav-frontend-typografi */ "./node_modules/nav-frontend-typografi/lib/index.js");
/* harmony import */ var nav_frontend_typografi__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nav_frontend_typografi__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _navikt_familie_form_elements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/familie-form-elements */ "./node_modules/@navikt/familie-form-elements/dist/index.js");
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/familie-typer */ "./node_modules/@navikt/familie-typer/dist/index.js");
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _context_ManuellJournalf_rContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../context/ManuellJournalførContext */ "./src/frontend/context/ManuellJournalførContext.tsx");
/* harmony import */ var _utils_familieDayjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/familieDayjs */ "./src/frontend/utils/familieDayjs.ts");
/* harmony import */ var _utils_formatter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/formatter */ "./src/frontend/utils/formatter.ts");
/* harmony import */ var _KnyttTilNyBehandling__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./KnyttTilNyBehandling */ "./src/frontend/komponenter/ManuellJournalfør/KnyttTilNyBehandling.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.id);



var _this = undefined,
    _jsxFileName = "/Users/henninghaakonsen/nav/familie/familie-ba-sak-frontend/src/frontend/komponenter/ManuellJournalf\xF8r/KnyttJournalpostTilBehandling.tsx",
    _s = __webpack_require__.$Refresh$.signature();











var KnyttDiv = styled_components__WEBPACK_IMPORTED_MODULE_10__.default.div.withConfig({
  displayName: "KnyttJournalpostTilBehandling__KnyttDiv",
  componentId: "fgzvpc-0"
})(["margin-top:20px;"]);
_c = KnyttDiv;
var BehandlingstypeTd = styled_components__WEBPACK_IMPORTED_MODULE_10__.default.td.withConfig({
  displayName: "KnyttJournalpostTilBehandling__BehandlingstypeTd",
  componentId: "fgzvpc-1"
})(["min-width:12rem;label{text-indent:2rem !important;}"]);
_c2 = BehandlingstypeTd;
var KnyttTilBehandlingTd = styled_components__WEBPACK_IMPORTED_MODULE_10__.default.td.withConfig({
  displayName: "KnyttJournalpostTilBehandling__KnyttTilBehandlingTd",
  componentId: "fgzvpc-2"
})(["width:2rem;"]);
_c3 = KnyttTilBehandlingTd;
var GenerellSakInfoStripeTittel = styled_components__WEBPACK_IMPORTED_MODULE_10__.default.div.withConfig({
  displayName: "KnyttJournalpostTilBehandling__GenerellSakInfoStripeTittel",
  componentId: "fgzvpc-3"
})(["font-weight:bold;"]);
_c4 = GenerellSakInfoStripeTittel;
var KnyttJournalpostTilBehandling = function KnyttJournalpostTilBehandling() {
  _s();

  var _dataForManuellJourna;

  var _useManuellJournalfør = (0,_context_ManuellJournalf_rContext__WEBPACK_IMPORTED_MODULE_6__["useManuellJournalfør"])(),
      settTilknyttedeBehandlingIder = _useManuellJournalfør.settTilknyttedeBehandlingIder,
      dataForManuellJournalføring = _useManuellJournalfør.dataForManuellJournalføring,
      hentSorterteBehandlinger = _useManuellJournalfør.hentSorterteBehandlinger,
      tilknyttedeBehandlingIder = _useManuellJournalfør.tilknyttedeBehandlingIder,
      visKnyttTilNyBehandling = _useManuellJournalfør.visKnyttTilNyBehandling,
      knyttTilNyBehandling = _useManuellJournalfør.knyttTilNyBehandling;

  if (dataForManuellJournalføring.status !== _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__.RessursStatus.SUKSESS) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null);
  }

  var visGenerellSakInfoStripe = tilknyttedeBehandlingIder.length === 0 && !knyttTilNyBehandling;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(KnyttDiv, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 9
    }
  }, !!((_dataForManuellJourna = dataForManuellJournalføring.data.fagsak) === null || _dataForManuellJourna === void 0 ? void 0 : _dataForManuellJourna.behandlinger.length) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(nav_frontend_typografi__WEBPACK_IMPORTED_MODULE_3__.Undertittel, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 21
    }
  }, "Knytt til tidligere behandling(er)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("table", {
    className: "tabell",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("thead", {
    className: "tabell__head",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", {
    className: "tabell__head__tr",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 33
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 33
    }
  }, 'Dato'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 33
    }
  }, 'Årsak'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 33
    }
  }, 'Behandlingstype'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 33
    }
  }, 'Status'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("tbody", {
    className: "tabell__body",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 25
    }
  }, hentSorterteBehandlinger().map(function (behandling) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", {
      key: behandling.behandlingId,
      className: tilknyttedeBehandlingIder.includes(behandling.behandlingId) ? 'tabell__tr--valgt' : '',
      "aria-selected": tilknyttedeBehandlingIder.includes(behandling.behandlingId),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68,
        columnNumber: 33
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(KnyttTilBehandlingTd, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 79,
        columnNumber: 37
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_familie_form_elements__WEBPACK_IMPORTED_MODULE_4__.FamilieCheckbox, {
      erLesevisning: false,
      label: '-',
      checked: tilknyttedeBehandlingIder.includes(behandling.behandlingId),
      onChange: function onChange() {
        settTilknyttedeBehandlingIder([].concat((0,_Users_henninghaakonsen_nav_familie_familie_ba_sak_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__.default)(tilknyttedeBehandlingIder.filter(function (it) {
          return it !== behandling.behandlingId;
        })), (0,_Users_henninghaakonsen_nav_familie_familie_ba_sak_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__.default)(tilknyttedeBehandlingIder.includes(behandling.behandlingId) ? [] : [behandling.behandlingId])));
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 80,
        columnNumber: 41
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 37
      }
    }, (0,_utils_formatter__WEBPACK_IMPORTED_MODULE_8__.formaterDato)((0,_utils_familieDayjs__WEBPACK_IMPORTED_MODULE_7__.default)(behandling.opprettetTidspunkt), _utils_formatter__WEBPACK_IMPORTED_MODULE_8__.datoformat.DATO_FORKORTTET)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 106,
        columnNumber: 37
      }
    }, (0,_utils_formatter__WEBPACK_IMPORTED_MODULE_8__["formaterTilKunFørstBokstavStor"])(behandling.årsak)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(BehandlingstypeTd, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 37
      }
    }, (0,_utils_formatter__WEBPACK_IMPORTED_MODULE_8__["formaterTilKunFørstBokstavStor"])(behandling.type)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 110,
        columnNumber: 37
      }
    }, (0,_utils_formatter__WEBPACK_IMPORTED_MODULE_8__["formaterTilKunFørstBokstavStor"])(behandlingsstatuser[behandling.status])));
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("br", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 21
    }
  })), visKnyttTilNyBehandling && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_KnyttTilNyBehandling__WEBPACK_IMPORTED_MODULE_9__.KnyttTilNyBehandling, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122,
      columnNumber: 41
    }
  }), visGenerellSakInfoStripe && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("br", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement((nav_frontend_alertstriper__WEBPACK_IMPORTED_MODULE_2___default()), {
    type: "info",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(GenerellSakInfoStripeTittel, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127,
      columnNumber: 25
    }
  }, hentSorterteBehandlinger().length > 0 ? "Du velger \xE5 journalf\xF8re uten \xE5 knytte til behandling(er)." : "Du velger \xE5 journalf\xF8re uten \xE5 knytte til ny behandling."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 25
    }
  }, "Journalposten knyttes kun til person (tilsvarende \"Knytt til generell\n                            sak\" i Gosys)"))));
};

_s(KnyttJournalpostTilBehandling, "wYsSp4wzPPT6vM0HL4JNojg8KKw=", false, function () {
  return [_context_ManuellJournalf_rContext__WEBPACK_IMPORTED_MODULE_6__["useManuellJournalfør"]];
});

_c5 = KnyttJournalpostTilBehandling;

var _c, _c2, _c3, _c4, _c5;

__webpack_require__.$Refresh$.register(_c, "KnyttDiv");
__webpack_require__.$Refresh$.register(_c2, "BehandlingstypeTd");
__webpack_require__.$Refresh$.register(_c3, "KnyttTilBehandlingTd");
__webpack_require__.$Refresh$.register(_c4, "GenerellSakInfoStripeTittel");
__webpack_require__.$Refresh$.register(_c5, "KnyttJournalpostTilBehandling");

const currentExports = __react_refresh_utils__.getModuleExports(module.id);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.id);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.id].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("bf6b7ffae2609c367378")
/******/ 	})();
/******/ 	
/******/ }
);
//# sourceMappingURL=main.f84c39c5e524a2c00b2b.hot-update.js.map