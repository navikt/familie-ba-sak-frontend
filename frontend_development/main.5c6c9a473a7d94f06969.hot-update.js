"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/komponenter/Modal/fagsak/form/SamhandlerForm.tsx"
/*!***********************************************************************!*\
  !*** ./src/frontend/komponenter/Modal/fagsak/form/SamhandlerForm.tsx ***!
  \***********************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SamhandlerFeltnavn: () => (/* binding */ SamhandlerFeltnavn),
/* harmony export */   SamhandlerForm: () => (/* binding */ SamhandlerForm),
/* harmony export */   SamhandlerFormServerErrors: () => (/* binding */ SamhandlerFormServerErrors)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _felt_OrganisasjonsnummerFelt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../felt/OrganisasjonsnummerFelt */ "./src/frontend/komponenter/Modal/fagsak/felt/OrganisasjonsnummerFelt.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));





var SamhandlerFormServerErrors = {
  onSubmitError: {
    id: 'root.onSubmitError',
    lookup: function lookup(errors) {
      var _errors$root;
      return errors === null || errors === void 0 || (_errors$root = errors.root) === null || _errors$root === void 0 || (_errors$root = _errors$root.onSubmitError) === null || _errors$root === void 0 ? void 0 : _errors$root.message;
    }
  }
};
var SamhandlerFeltnavn = /*#__PURE__*/function (SamhandlerFeltnavn) {
  SamhandlerFeltnavn["ORGNR"] = "orgnr";
  return SamhandlerFeltnavn;
}({});
function SamhandlerForm(_ref) {
  var form = _ref.form,
    onSubmit = _ref.onSubmit;
  var handleSubmit = form.handleSubmit,
    _form$formState = form.formState,
    isSubmitting = _form$formState.isSubmitting,
    errors = _form$formState.errors,
    clearErrors = form.clearErrors;
  var onSubmitFeilmelding = SamhandlerFormServerErrors.onSubmitError.lookup(errors);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_2__.FormProvider, form, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.HGrid, {
    columns: 2,
    gap: '4',
    align: 'start'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_felt_OrganisasjonsnummerFelt__WEBPACK_IMPORTED_MODULE_4__.OrganisasjonsnummerFelt, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.Box, {
    as: 'div',
    marginBlock: 'space-28'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.Button, {
    type: 'submit',
    variant: 'secondary',
    size: 'small',
    loading: isSubmitting
  }, "Hent institusjon"))), onSubmitFeilmelding && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_3__.Alert, {
    variant: 'error',
    closeButton: true,
    onClose: function onClose() {
      return clearErrors(SamhandlerFormServerErrors.onSubmitError.id);
    }
  }, onSubmitFeilmelding)));
}
_c = SamhandlerForm;
var _c;
__webpack_require__.$Refresh$.register(_c, "SamhandlerForm");

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
/******/ 	__webpack_require__.h = () => ("80d8cf0b9c822ced97c5")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi41YzZjOWE0NzNhN2Q5NGYwNjk2OS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUUrRTtBQUU1QztBQUVhO0FBRW5FLElBQU1PLDBCQU1aLEdBQUc7RUFDQUMsYUFBYSxFQUFFO0lBQ1hDLEVBQUUsRUFBRSxvQkFBb0I7SUFDeEJDLE1BQU0sRUFBRSxTQUFSQSxNQUFNQSxDQUFFQyxNQUFNO01BQUEsSUFBQUMsWUFBQTtNQUFBLE9BQUlELE1BQU0sYUFBTkEsTUFBTSxnQkFBQUMsWUFBQSxHQUFORCxNQUFNLENBQUVFLElBQUksY0FBQUQsWUFBQSxnQkFBQUEsWUFBQSxHQUFaQSxZQUFBLENBQWNKLGFBQWEsY0FBQUksWUFBQSx1QkFBM0JBLFlBQUEsQ0FBNkJFLE9BQU87SUFBQTtFQUMxRDtBQUNKLENBQUM7QUFNTSxJQUFLQyxrQkFBa0IsMEJBQWxCQSxrQkFBa0I7RUFBbEJBLGtCQUFrQjtFQUFBLE9BQWxCQSxrQkFBa0I7QUFBQTtBQVN2QixTQUFTQyxjQUFjQSxDQUFBQyxJQUFBLEVBQTRCO0VBQUEsSUFBekJDLElBQUksR0FBQUQsSUFBQSxDQUFKQyxJQUFJO0lBQUVDLFFBQVEsR0FBQUYsSUFBQSxDQUFSRSxRQUFRO0VBQzNDLElBQ0lDLFlBQVksR0FHWkYsSUFBSSxDQUhKRSxZQUFZO0lBQUFDLGVBQUEsR0FHWkgsSUFBSSxDQUZKSSxTQUFTO0lBQUlDLFlBQVksR0FBQUYsZUFBQSxDQUFaRSxZQUFZO0lBQUVaLE1BQU0sR0FBQVUsZUFBQSxDQUFOVixNQUFNO0lBQ2pDYSxXQUFXLEdBQ1hOLElBQUksQ0FESk0sV0FBVztFQUdmLElBQU1DLG1CQUFtQixHQUFHbEIsMEJBQTBCLENBQUNDLGFBQWEsQ0FBQ0UsTUFBTSxDQUFDQyxNQUFNLENBQUM7RUFFbkYsb0JBQ0lYLDBEQUFBLENBQUNDLHlEQUFZLEVBQUtpQixJQUFJLGVBQ2xCbEIsMERBQUE7SUFBTW1CLFFBQVEsRUFBRUMsWUFBWSxDQUFDRCxRQUFRO0VBQUUsZ0JBQ25DbkIsMERBQUEsQ0FBQ0ssbURBQUs7SUFBQ3NCLE9BQU8sRUFBRSxDQUFFO0lBQUNDLEdBQUcsRUFBRSxHQUFJO0lBQUNDLEtBQUssRUFBRTtFQUFRLGdCQUN4QzdCLDBEQUFBLENBQUNNLGtGQUF1QixNQUFFLENBQUMsZUFDM0JOLDBEQUFBLENBQUNHLGlEQUFHO0lBQUMyQixFQUFFLEVBQUUsS0FBTTtJQUFDQyxXQUFXLEVBQUU7RUFBVyxnQkFDcEMvQiwwREFBQSxDQUFDSSxvREFBTTtJQUFDNEIsSUFBSSxFQUFFLFFBQVM7SUFBQ0MsT0FBTyxFQUFFLFdBQVk7SUFBQ0MsSUFBSSxFQUFFLE9BQVE7SUFBQ0MsT0FBTyxFQUFFWjtFQUFhLEdBQUMsa0JBRTVFLENBQ1AsQ0FDRixDQUFDLEVBQ1BFLG1CQUFtQixpQkFDaEJ6QiwwREFBQSxDQUFDRSxtREFBSztJQUNGK0IsT0FBTyxFQUFFLE9BQVE7SUFDakJHLFdBQVcsRUFBRSxJQUFLO0lBQ2xCQyxPQUFPLEVBQUUsU0FBVEEsT0FBT0EsQ0FBQTtNQUFBLE9BQVFiLFdBQVcsQ0FBQ2pCLDBCQUEwQixDQUFDQyxhQUFhLENBQUNDLEVBQUUsQ0FBQztJQUFBO0VBQUMsR0FFdkVnQixtQkFDRSxDQUVULENBQ0ksQ0FBQztBQUV2QjtBQUFDYSxFQUFBLEdBaENldEIsY0FBYztBQUFBLElBQUFzQixFQUFBO0FBQUFDLHNDQUFBLENBQUFELEVBQUEsb0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ2xDOUIsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9rb21wb25lbnRlci9Nb2RhbC9mYWdzYWsvZm9ybS9TYW1oYW5kbGVyRm9ybS50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHR5cGUgRmllbGRFcnJvcnMsIEZvcm1Qcm92aWRlciwgdHlwZSBTdWJtaXRIYW5kbGVyLCB0eXBlIFVzZUZvcm1SZXR1cm4gfSBmcm9tICdyZWFjdC1ob29rLWZvcm0nO1xuXG5pbXBvcnQgeyBBbGVydCwgQm94LCBCdXR0b24sIEhHcmlkIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5cbmltcG9ydCB7IE9yZ2FuaXNhc2pvbnNudW1tZXJGZWx0IH0gZnJvbSAnLi4vZmVsdC9PcmdhbmlzYXNqb25zbnVtbWVyRmVsdCc7XG5cbmV4cG9ydCBjb25zdCBTYW1oYW5kbGVyRm9ybVNlcnZlckVycm9yczogUmVjb3JkPFxuICAgICdvblN1Ym1pdEVycm9yJyxcbiAgICB7XG4gICAgICAgIGlkOiBgcm9vdC4ke3N0cmluZ31gO1xuICAgICAgICBsb29rdXA6IChlcnJvcnM6IEZpZWxkRXJyb3JzPFNhbWhhbmRsZXJGb3JtVmFsdWVzPikgPT4gc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIH1cbj4gPSB7XG4gICAgb25TdWJtaXRFcnJvcjoge1xuICAgICAgICBpZDogJ3Jvb3Qub25TdWJtaXRFcnJvcicsXG4gICAgICAgIGxvb2t1cDogZXJyb3JzID0+IGVycm9ycz8ucm9vdD8ub25TdWJtaXRFcnJvcj8ubWVzc2FnZSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGludGVyZmFjZSBTYW1oYW5kbGVyRm9ybVZhbHVlcyB7XG4gICAgW1NhbWhhbmRsZXJGZWx0bmF2bi5PUkdOUl06IHN0cmluZztcbn1cblxuZXhwb3J0IGVudW0gU2FtaGFuZGxlckZlbHRuYXZuIHtcbiAgICBPUkdOUiA9ICdvcmducicsXG59XG5cbmludGVyZmFjZSBQcm9wcyB7XG4gICAgZm9ybTogVXNlRm9ybVJldHVybjxTYW1oYW5kbGVyRm9ybVZhbHVlcz47XG4gICAgb25TdWJtaXQ6IFN1Ym1pdEhhbmRsZXI8U2FtaGFuZGxlckZvcm1WYWx1ZXM+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU2FtaGFuZGxlckZvcm0oeyBmb3JtLCBvblN1Ym1pdCB9OiBQcm9wcykge1xuICAgIGNvbnN0IHtcbiAgICAgICAgaGFuZGxlU3VibWl0LFxuICAgICAgICBmb3JtU3RhdGU6IHsgaXNTdWJtaXR0aW5nLCBlcnJvcnMgfSxcbiAgICAgICAgY2xlYXJFcnJvcnMsXG4gICAgfSA9IGZvcm07XG5cbiAgICBjb25zdCBvblN1Ym1pdEZlaWxtZWxkaW5nID0gU2FtaGFuZGxlckZvcm1TZXJ2ZXJFcnJvcnMub25TdWJtaXRFcnJvci5sb29rdXAoZXJyb3JzKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxGb3JtUHJvdmlkZXIgey4uLmZvcm19PlxuICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdChvblN1Ym1pdCl9PlxuICAgICAgICAgICAgICAgIDxIR3JpZCBjb2x1bW5zPXsyfSBnYXA9eyc0J30gYWxpZ249eydzdGFydCd9PlxuICAgICAgICAgICAgICAgICAgICA8T3JnYW5pc2Fzam9uc251bW1lckZlbHQgLz5cbiAgICAgICAgICAgICAgICAgICAgPEJveCBhcz17J2Rpdid9IG1hcmdpbkJsb2NrPXsnc3BhY2UtMjgnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdHlwZT17J3N1Ym1pdCd9IHZhcmlhbnQ9eydzZWNvbmRhcnknfSBzaXplPXsnc21hbGwnfSBsb2FkaW5nPXtpc1N1Ym1pdHRpbmd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlbnQgaW5zdGl0dXNqb25cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICA8L0hHcmlkPlxuICAgICAgICAgICAgICAgIHtvblN1Ym1pdEZlaWxtZWxkaW5nICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEFsZXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PXsnZXJyb3InfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VCdXR0b249e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBjbGVhckVycm9ycyhTYW1oYW5kbGVyRm9ybVNlcnZlckVycm9ycy5vblN1Ym1pdEVycm9yLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge29uU3VibWl0RmVpbG1lbGRpbmd9XG4gICAgICAgICAgICAgICAgICAgIDwvQWxlcnQ+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9Gb3JtUHJvdmlkZXI+XG4gICAgKTtcbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjgwZDhjZjBiOWM4MjJjZWQ5N2M1XCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwiRm9ybVByb3ZpZGVyIiwiQWxlcnQiLCJCb3giLCJCdXR0b24iLCJIR3JpZCIsIk9yZ2FuaXNhc2pvbnNudW1tZXJGZWx0IiwiU2FtaGFuZGxlckZvcm1TZXJ2ZXJFcnJvcnMiLCJvblN1Ym1pdEVycm9yIiwiaWQiLCJsb29rdXAiLCJlcnJvcnMiLCJfZXJyb3JzJHJvb3QiLCJyb290IiwibWVzc2FnZSIsIlNhbWhhbmRsZXJGZWx0bmF2biIsIlNhbWhhbmRsZXJGb3JtIiwiX3JlZiIsImZvcm0iLCJvblN1Ym1pdCIsImhhbmRsZVN1Ym1pdCIsIl9mb3JtJGZvcm1TdGF0ZSIsImZvcm1TdGF0ZSIsImlzU3VibWl0dGluZyIsImNsZWFyRXJyb3JzIiwib25TdWJtaXRGZWlsbWVsZGluZyIsImNyZWF0ZUVsZW1lbnQiLCJjb2x1bW5zIiwiZ2FwIiwiYWxpZ24iLCJhcyIsIm1hcmdpbkJsb2NrIiwidHlwZSIsInZhcmlhbnQiLCJzaXplIiwibG9hZGluZyIsImNsb3NlQnV0dG9uIiwib25DbG9zZSIsIl9jIiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==