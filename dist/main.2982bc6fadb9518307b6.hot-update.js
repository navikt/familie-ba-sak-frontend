self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/index.tsx":
/*!********************************!*\
  !*** ./src/frontend/index.tsx ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
var react__WEBPACK_IMPORTED_MODULE_2___namespace_cache;
var react_dom__WEBPACK_IMPORTED_MODULE_4___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.less */ "./src/frontend/index.less");
/* harmony import */ var nav_frontend_tabell_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nav-frontend-tabell-style */ "./node_modules/nav-frontend-tabell-style/src/index.less");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _sentry_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/browser */ "./node_modules/@sentry/browser/esm/sdk.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'react-axe'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _komponenter_App__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./komponenter/App */ "./src/frontend/komponenter/App.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.id);

var _this = undefined,
    _jsxFileName = "/Users/henninghaakonsen/nav/familie/familie-ba-sak-frontend/src/frontend/index.tsx";









var environment = window.location.hostname;
(0,_sentry_browser__WEBPACK_IMPORTED_MODULE_6__.init)({
  dsn: 'https://10239ce4baed4db79d080d85f08b5878@sentry.gc.nav.no/26',
  environment: environment,
  release: '1.0.0',
  enabled: "development" !== 'development'
});

if (true) {
  Object(function webpackMissingModule() { var e = new Error("Cannot find module 'react-axe'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(/*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_2___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_2___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_2__, 2))), /*#__PURE__*/ (react_dom__WEBPACK_IMPORTED_MODULE_4___namespace_cache || (react_dom__WEBPACK_IMPORTED_MODULE_4___namespace_cache = __webpack_require__.t(react_dom__WEBPACK_IMPORTED_MODULE_4__, 2))), 1000);
}

var rootElement = document.getElementById('app');

var renderApp = function renderApp(Component) {
  react_dom__WEBPACK_IMPORTED_MODULE_4__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.StrictMode, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(Component, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 13
    }
  })), rootElement);
};

renderApp((0,react_hot_loader__WEBPACK_IMPORTED_MODULE_7__.hot)(module)(_komponenter_App__WEBPACK_IMPORTED_MODULE_5__.default));

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

/***/ }),

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
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
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
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../../../../node_dist/frontend/typer/behandling'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _api_fagsak__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../api/fagsak */ "./src/frontend/api/fagsak.ts");
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../context/AppContext */ "./src/frontend/context/AppContext.tsx");
/* harmony import */ var _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../context/BehandlingContext */ "./src/frontend/context/BehandlingContext.ts");
/* harmony import */ var _context_FagsakContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../context/FagsakContext */ "./src/frontend/context/FagsakContext.tsx");
/* harmony import */ var _context_VedtakBegrunnelseContext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../context/VedtakBegrunnelseContext */ "./src/frontend/context/VedtakBegrunnelseContext.tsx");
/* harmony import */ var _typer_behandling__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../typer/behandling */ "./src/frontend/typer/behandling.ts");
/* harmony import */ var _utils_fagsak__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../utils/fagsak */ "./src/frontend/utils/fagsak.ts");
/* harmony import */ var _Felleskomponenter_Modal_UIModalWrapper__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../Felleskomponenter/Modal/UIModalWrapper */ "./src/frontend/komponenter/Felleskomponenter/Modal/UIModalWrapper.tsx");
/* harmony import */ var _Felleskomponenter_PdfVisningModal_PdfVisningModal__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../Felleskomponenter/PdfVisningModal/PdfVisningModal */ "./src/frontend/komponenter/Felleskomponenter/PdfVisningModal/PdfVisningModal.tsx");
/* harmony import */ var _Felleskomponenter_Skjemasteg_Skjemasteg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../Felleskomponenter/Skjemasteg/Skjemasteg */ "./src/frontend/komponenter/Felleskomponenter/Skjemasteg/Skjemasteg.tsx");
/* harmony import */ var _VedtakBegrunnelserTabell_VedtakBegrunnelser__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./VedtakBegrunnelserTabell/VedtakBegrunnelser */ "./src/frontend/komponenter/Fagsak/Vedtak/VedtakBegrunnelserTabell/VedtakBegrunnelser.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.id);



var _this = undefined,
    _jsxFileName = "/Users/henninghaakonsen/nav/familie/familie-ba-sak-frontend/src/frontend/komponenter/Fagsak/Vedtak/OppsummeringVedtak.tsx",
    _s = __webpack_require__.$Refresh$.signature();





















var StyledFeilmelding = (0,styled_components__WEBPACK_IMPORTED_MODULE_19__.default)(nav_frontend_typografi__WEBPACK_IMPORTED_MODULE_4__.Feilmelding).withConfig({
  displayName: "OppsummeringVedtak__StyledFeilmelding",
  componentId: "sc-1hkpvcz-0"
})(["margin-top:1rem;"]);
_c = StyledFeilmelding;

var OppsummeringVedtak = function OppsummeringVedtak(_ref) {
  _s();

  var fagsak = _ref.fagsak,
      åpenBehandling = _ref.åpenBehandling;

  var _useApp = (0,_context_AppContext__WEBPACK_IMPORTED_MODULE_9__.useApp)(),
      hentSaksbehandlerRolle = _useApp.hentSaksbehandlerRolle,
      innloggetSaksbehandler = _useApp.innloggetSaksbehandler;

  var _useHttp = (0,_navikt_familie_http__WEBPACK_IMPORTED_MODULE_5__.useHttp)(),
      request = _useHttp.request;

  var _useFagsakRessurser = (0,_context_FagsakContext__WEBPACK_IMPORTED_MODULE_11__.useFagsakRessurser)(),
      settFagsak = _useFagsakRessurser.settFagsak;

  var _useBehandling = (0,_context_BehandlingContext__WEBPACK_IMPORTED_MODULE_10__.useBehandling)(),
      erLesevisning = _useBehandling.erLesevisning;

  var history = (0,react_router__WEBPACK_IMPORTED_MODULE_20__.useHistory)();

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

  var aktivVedtak = (0,_utils_fagsak__WEBPACK_IMPORTED_MODULE_14__["hentAktivVedtakPåBehandlig"])(åpenBehandling);
  var visSubmitKnapp = !erLesevisning() && (åpenBehandling === null || åpenBehandling === void 0 ? void 0 : åpenBehandling.status) === _typer_behandling__WEBPACK_IMPORTED_MODULE_13__.BehandlingStatus.UTREDES;

  var hentVedtaksbrev = function hentVedtaksbrev() {
    var aktivtVedtak = (0,_api_fagsak__WEBPACK_IMPORTED_MODULE_8__["aktivVedtakPåBehandling"])(åpenBehandling);
    var rolle = hentSaksbehandlerRolle();
    var genererBrevUnderBehandling = rolle && rolle > Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../../../../node_dist/frontend/typer/behandling'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) && (0,_typer_behandling__WEBPACK_IMPORTED_MODULE_13__.hentStegNummer)(åpenBehandling.steg) < (0,_typer_behandling__WEBPACK_IMPORTED_MODULE_13__.hentStegNummer)(_typer_behandling__WEBPACK_IMPORTED_MODULE_13__.BehandlingSteg.BESLUTTE_VEDTAK);
    var genererBrevUnderBeslutning = rolle && rolle === Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../../../../node_dist/frontend/typer/behandling'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) && (0,_typer_behandling__WEBPACK_IMPORTED_MODULE_13__.hentStegNummer)(åpenBehandling.steg) === (0,_typer_behandling__WEBPACK_IMPORTED_MODULE_13__.hentStegNummer)(_typer_behandling__WEBPACK_IMPORTED_MODULE_13__.BehandlingSteg.BESLUTTE_VEDTAK);
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
    if (aktivVedtak && minstEnPeriodeErBegrunnet(aktivVedtak.begrunnelser) || åpenBehandling.årsak === _typer_behandling__WEBPACK_IMPORTED_MODULE_13__["BehandlingÅrsak"]["TEKNISK_OPPHØR"]) {
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

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Felleskomponenter_Skjemasteg_Skjemasteg__WEBPACK_IMPORTED_MODULE_17__.default, {
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
      lineNumber: 167,
      columnNumber: 9
    }
  }, åpenBehandling.årsak !== _typer_behandling__WEBPACK_IMPORTED_MODULE_13__["BehandlingÅrsak"]["TEKNISK_OPPHØR"] ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Felleskomponenter_PdfVisningModal_PdfVisningModal__WEBPACK_IMPORTED_MODULE_16__.default, {
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
      lineNumber: 180,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_context_VedtakBegrunnelseContext__WEBPACK_IMPORTED_MODULE_12__.VedtakBegrunnelserProvider, {
    fagsak: fagsak,
    aktivVedtak: aktivVedtak,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 194,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_VedtakBegrunnelserTabell_VedtakBegrunnelser__WEBPACK_IMPORTED_MODULE_18__.default, {
    åpenBehandling: åpenBehandling,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 195,
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
      lineNumber: 198,
      columnNumber: 21
    }
  }), submitFeil !== '' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(StyledFeilmelding, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 204,
      columnNumber: 43
    }
  }, submitFeil), visModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Felleskomponenter_Modal_UIModalWrapper__WEBPACK_IMPORTED_MODULE_15__.default, {
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
          lineNumber: 213,
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
          lineNumber: 223,
          columnNumber: 37
        }
      })]
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 207,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(nav_frontend_typografi__WEBPACK_IMPORTED_MODULE_4__.Normaltekst, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 236,
      columnNumber: 29
    }
  }, "Behandlingen er n\xE5 sendt til totrinnskontroll"))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(nav_frontend_alertstriper__WEBPACK_IMPORTED_MODULE_2__.AlertStripeInfo, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 241,
      columnNumber: 17
    }
  }, "Den forrige behandlingen er annullert, og det er ".concat(åpenBehandling.status === _typer_behandling__WEBPACK_IMPORTED_MODULE_13__.BehandlingStatus.AVSLUTTET ? 'ikke sendt ut brev til søker' : 'ikke generert brev')));
};

_s(OppsummeringVedtak, "fbUWrVEPbNa4UI8qJDxIQpxvUWw=", false, function () {
  return [_context_AppContext__WEBPACK_IMPORTED_MODULE_9__.useApp, _navikt_familie_http__WEBPACK_IMPORTED_MODULE_5__.useHttp, _context_FagsakContext__WEBPACK_IMPORTED_MODULE_11__.useFagsakRessurser, _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_10__.useBehandling, react_router__WEBPACK_IMPORTED_MODULE_20__.useHistory];
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

/***/ }),

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
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var nav_frontend_alertstriper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nav-frontend-alertstriper */ "./node_modules/nav-frontend-alertstriper/lib/alertstripe.js");
/* harmony import */ var nav_frontend_alertstriper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nav_frontend_alertstriper__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var nav_frontend_typografi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nav-frontend-typografi */ "./node_modules/nav-frontend-typografi/lib/index.js");
/* harmony import */ var nav_frontend_typografi__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nav_frontend_typografi__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _navikt_familie_form_elements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/familie-form-elements */ "./node_modules/@navikt/familie-form-elements/dist/index.js");
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/familie-typer */ "./node_modules/@navikt/familie-typer/dist/index.js");
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_5__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../../../node_dist/frontend/typer/behandling'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _context_ManuellJournalf_rContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../context/ManuellJournalførContext */ "./src/frontend/context/ManuellJournalførContext.tsx");
/* harmony import */ var _utils_familieDayjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/familieDayjs */ "./src/frontend/utils/familieDayjs.ts");
/* harmony import */ var _utils_formatter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/formatter */ "./src/frontend/utils/formatter.ts");
/* harmony import */ var _KnyttTilNyBehandling__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./KnyttTilNyBehandling */ "./src/frontend/komponenter/ManuellJournalfør/KnyttTilNyBehandling.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.id);



var _this = undefined,
    _jsxFileName = "/Users/henninghaakonsen/nav/familie/familie-ba-sak-frontend/src/frontend/komponenter/ManuellJournalf\xF8r/KnyttJournalpostTilBehandling.tsx",
    _s = __webpack_require__.$Refresh$.signature();












var KnyttDiv = styled_components__WEBPACK_IMPORTED_MODULE_11__.default.div.withConfig({
  displayName: "KnyttJournalpostTilBehandling__KnyttDiv",
  componentId: "fgzvpc-0"
})(["margin-top:20px;"]);
_c = KnyttDiv;
var BehandlingstypeTd = styled_components__WEBPACK_IMPORTED_MODULE_11__.default.td.withConfig({
  displayName: "KnyttJournalpostTilBehandling__BehandlingstypeTd",
  componentId: "fgzvpc-1"
})(["min-width:12rem;label{text-indent:2rem !important;}"]);
_c2 = BehandlingstypeTd;
var KnyttTilBehandlingTd = styled_components__WEBPACK_IMPORTED_MODULE_11__.default.td.withConfig({
  displayName: "KnyttJournalpostTilBehandling__KnyttTilBehandlingTd",
  componentId: "fgzvpc-2"
})(["width:2rem;"]);
_c3 = KnyttTilBehandlingTd;
var GenerellSakInfoStripeTittel = styled_components__WEBPACK_IMPORTED_MODULE_11__.default.div.withConfig({
  displayName: "KnyttJournalpostTilBehandling__GenerellSakInfoStripeTittel",
  componentId: "fgzvpc-3"
})(["font-weight:bold;"]);
_c4 = GenerellSakInfoStripeTittel;
var KnyttJournalpostTilBehandling = function KnyttJournalpostTilBehandling() {
  _s();

  var _dataForManuellJourna;

  var _useManuellJournalfør = (0,_context_ManuellJournalf_rContext__WEBPACK_IMPORTED_MODULE_7__["useManuellJournalfør"])(),
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
      lineNumber: 53,
      columnNumber: 9
    }
  }, !!((_dataForManuellJourna = dataForManuellJournalføring.data.fagsak) === null || _dataForManuellJourna === void 0 ? void 0 : _dataForManuellJourna.behandlinger.length) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(nav_frontend_typografi__WEBPACK_IMPORTED_MODULE_3__.Undertittel, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 21
    }
  }, "Knytt til tidligere behandling(er)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("table", {
    className: "tabell",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("thead", {
    className: "tabell__head",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", {
    className: "tabell__head__tr",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 33
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 33
    }
  }, 'Dato'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 33
    }
  }, 'Årsak'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 33
    }
  }, 'Behandlingstype'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 33
    }
  }, 'Status'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("tbody", {
    className: "tabell__body",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
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
        lineNumber: 69,
        columnNumber: 33
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(KnyttTilBehandlingTd, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 80,
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
        lineNumber: 81,
        columnNumber: 41
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 101,
        columnNumber: 37
      }
    }, (0,_utils_formatter__WEBPACK_IMPORTED_MODULE_9__.formaterDato)((0,_utils_familieDayjs__WEBPACK_IMPORTED_MODULE_8__.default)(behandling.opprettetTidspunkt), _utils_formatter__WEBPACK_IMPORTED_MODULE_9__.datoformat.DATO_FORKORTTET)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 37
      }
    }, (0,_utils_formatter__WEBPACK_IMPORTED_MODULE_9__["formaterTilKunFørstBokstavStor"])(behandling.årsak)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(BehandlingstypeTd, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 108,
        columnNumber: 37
      }
    }, (0,_utils_formatter__WEBPACK_IMPORTED_MODULE_9__["formaterTilKunFørstBokstavStor"])(behandling.type)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 111,
        columnNumber: 37
      }
    }, (0,_utils_formatter__WEBPACK_IMPORTED_MODULE_9__["formaterTilKunFørstBokstavStor"])(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../../../node_dist/frontend/typer/behandling'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())[behandling.status])));
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("br", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 21
    }
  })), visKnyttTilNyBehandling && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_KnyttTilNyBehandling__WEBPACK_IMPORTED_MODULE_10__.KnyttTilNyBehandling, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123,
      columnNumber: 41
    }
  }), visGenerellSakInfoStripe && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("br", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement((nav_frontend_alertstriper__WEBPACK_IMPORTED_MODULE_2___default()), {
    type: "info",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(GenerellSakInfoStripeTittel, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 25
    }
  }, hentSorterteBehandlinger().length > 0 ? "Du velger \xE5 journalf\xF8re uten \xE5 knytte til behandling(er)." : "Du velger \xE5 journalf\xF8re uten \xE5 knytte til ny behandling."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 25
    }
  }, "Journalposten knyttes kun til person (tilsvarende \"Knytt til generell\n                            sak\" i Gosys)"))));
};

_s(KnyttJournalpostTilBehandling, "wYsSp4wzPPT6vM0HL4JNojg8KKw=", false, function () {
  return [_context_ManuellJournalf_rContext__WEBPACK_IMPORTED_MODULE_7__["useManuellJournalfør"]];
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
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach(key => def[key] = () => value[key]);
/******/ 			}
/******/ 			def['default'] = () => value;
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("8cbdfba5a7377c4a457e")
/******/ 	})();
/******/ 	
/******/ }
);
//# sourceMappingURL=main.2982bc6fadb9518307b6.hot-update.js.map