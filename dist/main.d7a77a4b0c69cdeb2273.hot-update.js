self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/komponenter/Fagsak/Vedtak/OppsummeringVedtak.tsx":
/*!***********************************************************************!*\
  !*** ./src/frontend/komponenter/Fagsak/Vedtak/OppsummeringVedtak.tsx ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_henninghaakonsen_nav_familie_familie_ba_sak_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var nav_frontend_alertstriper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nav-frontend-alertstriper */ "./node_modules/nav-frontend-alertstriper/lib/alertstripe.js");
/* harmony import */ var nav_frontend_alertstriper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nav_frontend_alertstriper__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var nav_frontend_knapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nav-frontend-knapper */ "./node_modules/nav-frontend-knapper/lib/index.js");
/* harmony import */ var nav_frontend_knapper__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nav_frontend_knapper__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nav_frontend_typografi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nav-frontend-typografi */ "./node_modules/nav-frontend-typografi/lib/index.js");
/* harmony import */ var nav_frontend_typografi__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nav_frontend_typografi__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _navikt_familie_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/familie-http */ "./node_modules/@navikt/familie-http/dist/index.js");
/* harmony import */ var _navikt_familie_http__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_navikt_familie_http__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @navikt/familie-typer */ "./node_modules/@navikt/familie-typer/dist/index.js");
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _api_fagsak__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../api/fagsak */ "./src/frontend/api/fagsak.ts");
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../context/AppContext */ "./src/frontend/context/AppContext.tsx");
/* harmony import */ var _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../context/BehandlingContext */ "./src/frontend/context/BehandlingContext.ts");
/* harmony import */ var _context_FagsakContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../context/FagsakContext */ "./src/frontend/context/FagsakContext.tsx");
/* harmony import */ var _context_VedtakBegrunnelseContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../context/VedtakBegrunnelseContext */ "./src/frontend/context/VedtakBegrunnelseContext.tsx");
/* harmony import */ var _typer_behandling__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../typer/behandling */ "./src/frontend/typer/behandling.ts");
/* harmony import */ var _utils_fagsak__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../utils/fagsak */ "./src/frontend/utils/fagsak.ts");
/* harmony import */ var _Felleskomponenter_Modal_UIModalWrapper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../Felleskomponenter/Modal/UIModalWrapper */ "./src/frontend/komponenter/Felleskomponenter/Modal/UIModalWrapper.tsx");
/* harmony import */ var _Felleskomponenter_PdfVisningModal_PdfVisningModal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../Felleskomponenter/PdfVisningModal/PdfVisningModal */ "./src/frontend/komponenter/Felleskomponenter/PdfVisningModal/PdfVisningModal.tsx");
/* harmony import */ var _Felleskomponenter_Skjemasteg_Skjemasteg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../Felleskomponenter/Skjemasteg/Skjemasteg */ "./src/frontend/komponenter/Felleskomponenter/Skjemasteg/Skjemasteg.tsx");
/* harmony import */ var _VedtakBegrunnelserTabell_VedtakBegrunnelser__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./VedtakBegrunnelserTabell/VedtakBegrunnelser */ "./src/frontend/komponenter/Fagsak/Vedtak/VedtakBegrunnelserTabell/VedtakBegrunnelser.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.id);



var _this = undefined,
    _jsxFileName = "/Users/henninghaakonsen/nav/familie/familie-ba-sak-frontend/src/frontend/komponenter/Fagsak/Vedtak/OppsummeringVedtak.tsx",
    _s = __webpack_require__.$Refresh$.signature();




















var StyledFeilmelding = (0,styled_components__WEBPACK_IMPORTED_MODULE_18__.default)(nav_frontend_typografi__WEBPACK_IMPORTED_MODULE_4__.Feilmelding).withConfig({
  displayName: "OppsummeringVedtak__StyledFeilmelding",
  componentId: "sc-1hkpvcz-0"
})(["margin-top:1rem;"]);
_c = StyledFeilmelding;

var OppsummeringVedtak = function OppsummeringVedtak(_ref) {
  _s();

  var fagsak = _ref.fagsak,
      åpenBehandling = _ref.åpenBehandling;

  var _useApp = (0,_context_AppContext__WEBPACK_IMPORTED_MODULE_8__.useApp)(),
      hentSaksbehandlerRolle = _useApp.hentSaksbehandlerRolle,
      innloggetSaksbehandler = _useApp.innloggetSaksbehandler;

  var _useHttp = (0,_navikt_familie_http__WEBPACK_IMPORTED_MODULE_5__.useHttp)(),
      request = _useHttp.request;

  var _useFagsakRessurser = (0,_context_FagsakContext__WEBPACK_IMPORTED_MODULE_10__.useFagsakRessurser)(),
      settFagsak = _useFagsakRessurser.settFagsak;

  var _useBehandling = (0,_context_BehandlingContext__WEBPACK_IMPORTED_MODULE_9__.useBehandling)(),
      erLesevisning = _useBehandling.erLesevisning;

  var history = (0,react_router__WEBPACK_IMPORTED_MODULE_19__.useHistory)();

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1__.useState(false),
      _React$useState2 = (0,_Users_henninghaakonsen_nav_familie_familie_ba_sak_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.default)(_React$useState, 2),
      visModal = _React$useState2[0],
      settVisModal = _React$useState2[1];

  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_1__.useState(false),
      _React$useState4 = (0,_Users_henninghaakonsen_nav_familie_familie_ba_sak_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.default)(_React$useState3, 2),
      visVedtaksbrev = _React$useState4[0],
      settVisVedtaksbrev = _React$useState4[1];

  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_1__.useState(''),
      _React$useState6 = (0,_Users_henninghaakonsen_nav_familie_familie_ba_sak_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.default)(_React$useState5, 2),
      submitFeil = _React$useState6[0],
      settSubmitFeil = _React$useState6[1];

  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_1__.useState(false),
      _React$useState8 = (0,_Users_henninghaakonsen_nav_familie_familie_ba_sak_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.default)(_React$useState7, 2),
      senderInn = _React$useState8[0],
      settSenderInn = _React$useState8[1];

  var _React$useState9 = react__WEBPACK_IMPORTED_MODULE_1__.useState((0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.byggTomRessurs)()),
      _React$useState10 = (0,_Users_henninghaakonsen_nav_familie_familie_ba_sak_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.default)(_React$useState9, 2),
      vedtaksbrev = _React$useState10[0],
      settVedtaksbrev = _React$useState10[1];

  var aktivVedtak = (0,_utils_fagsak__WEBPACK_IMPORTED_MODULE_13__["hentAktivVedtakPåBehandlig"])(åpenBehandling);
  var visSubmitKnapp = !erLesevisning() && (åpenBehandling === null || åpenBehandling === void 0 ? void 0 : åpenBehandling.status) === _typer_behandling__WEBPACK_IMPORTED_MODULE_12__.BehandlingStatus.UTREDES;

  var hentVedtaksbrev = function hentVedtaksbrev() {
    var aktivtVedtak = (0,_api_fagsak__WEBPACK_IMPORTED_MODULE_7__["aktivVedtakPåBehandling"])(åpenBehandling);
    var rolle = hentSaksbehandlerRolle();
    var genererBrevUnderBehandling = rolle && rolle > BehandlerRolle.VEILEDER && (0,_typer_behandling__WEBPACK_IMPORTED_MODULE_12__.hentStegNummer)(åpenBehandling.steg) < (0,_typer_behandling__WEBPACK_IMPORTED_MODULE_12__.hentStegNummer)(_typer_behandling__WEBPACK_IMPORTED_MODULE_12__.BehandlingSteg.BESLUTTE_VEDTAK);
    var genererBrevUnderBeslutning = rolle && rolle === BehandlerRolle.BESLUTTER && (0,_typer_behandling__WEBPACK_IMPORTED_MODULE_12__.hentStegNummer)(åpenBehandling.steg) === (0,_typer_behandling__WEBPACK_IMPORTED_MODULE_12__.hentStegNummer)(_typer_behandling__WEBPACK_IMPORTED_MODULE_12__.BehandlingSteg.BESLUTTE_VEDTAK);
    var httpMethod = genererBrevUnderBehandling || genererBrevUnderBeslutning ? 'POST' : 'GET';

    if (aktivtVedtak) {
      settVedtaksbrev((0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.byggHenterRessurs)());
      request({
        method: httpMethod,
        url: "/familie-ba-sak/api/dokument/vedtaksbrev/".concat(aktivtVedtak === null || aktivtVedtak === void 0 ? void 0 : aktivtVedtak.id)
      }).then(function (response) {
        if (response.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.RessursStatus.SUKSESS) {
          settVedtaksbrev((0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.byggDataRessurs)("data:application/pdf;base64,".concat(response.data)));
        } else if (response.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.RessursStatus.FEILET || response.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.RessursStatus.FUNKSJONELL_FEIL || response.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.RessursStatus.IKKE_TILGANG) {
          settVedtaksbrev(response);
        } else {
          settVedtaksbrev((0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.byggFeiletRessurs)('Ukjent feil, kunne ikke generere forhåndsvisning.'));
        }
      })["catch"](function (_error) {
        settVedtaksbrev((0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.byggFeiletRessurs)('Ukjent feil, kunne ikke generere forhåndsvisning.'));
      });
    } else {
      settVedtaksbrev((0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.byggFeiletRessurs)('Vi finner ingen aktive vedtak på behandlingen, vennligst gå tilbake og fastsett vedtak.'));
    }
  };

  var minstEnPeriodeErBegrunnet = function minstEnPeriodeErBegrunnet(vedtakBegrunnelser) {
    var begrunnelsenErUtfylt = function begrunnelsenErUtfylt(vedtakBegrunnelse) {
      return vedtakBegrunnelse.begrunnelseType && vedtakBegrunnelse.begrunnelse;
    };

    return vedtakBegrunnelser.filter(function (vedtakBegrunnelse) {
      return begrunnelsenErUtfylt(vedtakBegrunnelse);
    }).length > 0;
  };

  var sendInn = function sendInn() {
    if (aktivVedtak && minstEnPeriodeErBegrunnet(aktivVedtak.begrunnelser) || åpenBehandling.årsak === _typer_behandling__WEBPACK_IMPORTED_MODULE_12__["BehandlingÅrsak"]["TEKNISK_OPPHØR"]) {
      var _innloggetSaksbehandl;

      settSenderInn(true);
      settSubmitFeil('');
      request({
        method: 'POST',
        url: "/familie-ba-sak/api/fagsaker/".concat(fagsak.id, "/send-til-beslutter?behandlendeEnhet=").concat((_innloggetSaksbehandl = innloggetSaksbehandler === null || innloggetSaksbehandler === void 0 ? void 0 : innloggetSaksbehandler.enhet) !== null && _innloggetSaksbehandl !== void 0 ? _innloggetSaksbehandl : '9999')
      }).then(function (response) {
        settSenderInn(false);

        if (response.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.RessursStatus.SUKSESS) {
          settVisModal(true);
          settFagsak(response);
        } else if (response.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.RessursStatus.FEILET || response.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.RessursStatus.FUNKSJONELL_FEIL || response.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.RessursStatus.IKKE_TILGANG) {
          settSubmitFeil(response.frontendFeilmelding);
        }
      });
    } else {
      settSubmitFeil('Vedtaksbrevet mangler begrunnelse. Du må legge til minst én begrunnelse.');
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Felleskomponenter_Skjemasteg_Skjemasteg__WEBPACK_IMPORTED_MODULE_16__.default, {
    tittel: 'Vedtak',
    forrigeOnClick: function forrigeOnClick() {
      return history.push("/fagsak/".concat(fagsak.id, "/").concat(åpenBehandling === null || åpenBehandling === void 0 ? void 0 : åpenBehandling.behandlingId, "/tilkjent-ytelse"));
    },
    nesteOnClick: visSubmitKnapp ? sendInn : undefined,
    nesteKnappTittel: 'Til godkjenning',
    senderInn: senderInn,
    maxWidthStyle: "100%",
    className: 'vedtak',
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 166,
      columnNumber: 9
    }
  }, åpenBehandling.årsak !== _typer_behandling__WEBPACK_IMPORTED_MODULE_12__["BehandlingÅrsak"]["TEKNISK_OPPHØR"] ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Felleskomponenter_PdfVisningModal_PdfVisningModal__WEBPACK_IMPORTED_MODULE_15__.default, {
    onRequestOpen: function onRequestOpen() {
      if (vedtaksbrev.status !== _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.RessursStatus.HENTER) {
        hentVedtaksbrev();
      }
    },
    åpen: visVedtaksbrev,
    onRequestClose: function onRequestClose() {
      settVisVedtaksbrev(false);
      settVedtaksbrev((0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.byggTomRessurs)());
    },
    pdfdata: vedtaksbrev,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 179,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_context_VedtakBegrunnelseContext__WEBPACK_IMPORTED_MODULE_11__.VedtakBegrunnelserProvider, {
    fagsak: fagsak,
    aktivVedtak: aktivVedtak,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 193,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_VedtakBegrunnelserTabell_VedtakBegrunnelser__WEBPACK_IMPORTED_MODULE_17__.default, {
    åpenBehandling: åpenBehandling,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 194,
      columnNumber: 25
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(nav_frontend_knapper__WEBPACK_IMPORTED_MODULE_3__.Knapp, {
    mini: true,
    onClick: function onClick() {
      return settVisVedtaksbrev(!visVedtaksbrev);
    },
    children: 'Vis vedtaksbrev',
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 197,
      columnNumber: 21
    }
  }), submitFeil !== '' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(StyledFeilmelding, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 203,
      columnNumber: 43
    }
  }, submitFeil), visModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Felleskomponenter_Modal_UIModalWrapper__WEBPACK_IMPORTED_MODULE_14__.default, {
    modal: {
      tittel: 'Totrinnskontroll',
      lukkKnapp: false,
      visModal: visModal,
      actions: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(nav_frontend_knapper__WEBPACK_IMPORTED_MODULE_3__.Knapp, {
        key: 'saksoversikt',
        mini: true,
        onClick: function onClick() {
          settVisModal(false);
          history.push("/fagsak/".concat(fagsak.id, "/saksoversikt"));
          window.location.reload();
        },
        children: 'Gå til saksoversikten',
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 212,
          columnNumber: 37
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(nav_frontend_knapper__WEBPACK_IMPORTED_MODULE_3__.Knapp, {
        key: 'oppgavebenk',
        type: 'hoved',
        mini: true,
        onClick: function onClick() {
          settVisModal(false);
          history.push('/oppgaver');
        },
        children: 'Gå til oppgavebenken',
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 222,
          columnNumber: 37
        }
      })]
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 206,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(nav_frontend_typografi__WEBPACK_IMPORTED_MODULE_4__.Normaltekst, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 29
    }
  }, "Behandlingen er n\xE5 sendt til totrinnskontroll"))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(nav_frontend_alertstriper__WEBPACK_IMPORTED_MODULE_2__.AlertStripeInfo, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 240,
      columnNumber: 17
    }
  }, "Den forrige behandlingen er annullert, og det er ".concat(åpenBehandling.status === _typer_behandling__WEBPACK_IMPORTED_MODULE_12__.BehandlingStatus.AVSLUTTET ? 'ikke sendt ut brev til søker' : 'ikke generert brev')));
};

_s(OppsummeringVedtak, "fbUWrVEPbNa4UI8qJDxIQpxvUWw=", false, function () {
  return [_context_AppContext__WEBPACK_IMPORTED_MODULE_8__.useApp, _navikt_familie_http__WEBPACK_IMPORTED_MODULE_5__.useHttp, _context_FagsakContext__WEBPACK_IMPORTED_MODULE_10__.useFagsakRessurser, _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_9__.useBehandling, react_router__WEBPACK_IMPORTED_MODULE_19__.useHistory];
});

_c2 = OppsummeringVedtak;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OppsummeringVedtak);

var _c, _c2;

__webpack_require__.$Refresh$.register(_c, "StyledFeilmelding");
__webpack_require__.$Refresh$.register(_c2, "OppsummeringVedtak");

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
/******/ 		__webpack_require__.h = () => ("e5d8aa0dcd280aac91c3")
/******/ 	})();
/******/ 	
/******/ }
);
//# sourceMappingURL=main.d7a77a4b0c69cdeb2273.hot-update.js.map