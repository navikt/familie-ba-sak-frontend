self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/index.tsx":
/*!********************************!*\
  !*** ./src/frontend/index.tsx ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.less */ "./src/frontend/index.less");
/* harmony import */ var nav_frontend_tabell_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nav-frontend-tabell-style */ "./node_modules/nav-frontend-tabell-style/src/index.less");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _sentry_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/browser */ "./node_modules/@sentry/browser/esm/sdk.js");
/* harmony import */ var axe_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axe-core */ "./node_modules/axe-core/axe.js");
/* harmony import */ var axe_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axe_core__WEBPACK_IMPORTED_MODULE_3__);
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








 // eslint-disable-next-line

var packageConfig = __webpack_require__(/*! ../../package.json */ "./package.json");

var environment = window.location.hostname;
(0,_sentry_browser__WEBPACK_IMPORTED_MODULE_6__.init)({
  dsn: 'https://10239ce4baed4db79d080d85f08b5878@sentry.gc.nav.no/26',
  environment: environment,
  release: packageConfig.version,
  enabled: "development" !== 'development'
});

if (true) {
  axe_core__WEBPACK_IMPORTED_MODULE_3___default().run().then(function (results) {
    if (results.violations.length) {
      results.violations.forEach(function (violation) {
        console.log("Axe feil: ".concat(violation.description, " (").concat(violation.helpUrl, ") som p\xE5virker: "));
        violation.nodes.forEach(function (node) {
          console.log("".concat(node.failureSummary));
        });
      });
    }
  })["catch"](function (err) {
    console.error('Something bad happened:', err.message);
  });
}

var rootElement = document.getElementById('app');

var renderApp = function renderApp(Component) {
  react_dom__WEBPACK_IMPORTED_MODULE_4__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.StrictMode, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(Component, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
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

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("f84c39c5e524a2c00b2b")
/******/ 	})();
/******/ 	
/******/ }
);
//# sourceMappingURL=main.1f3a98dd4f391a0822bf.hot-update.js.map