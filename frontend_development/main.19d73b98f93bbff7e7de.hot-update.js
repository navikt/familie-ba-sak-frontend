self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/AktivtUtsnitt.js"
/*!*******************************************************************************************!*\
  !*** ./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/AktivtUtsnitt.js ***!
  \*******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AktivtUtsnittBakgrunn: () => (/* binding */ AktivtUtsnittBakgrunn),
/* harmony export */   AktivtUtsnittBorder: () => (/* binding */ AktivtUtsnittBorder)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _usePositionAndSize_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./usePositionAndSize.js */ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/usePositionAndSize.js");
/* harmony import */ var _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/ds-tokens/dist/tokens */ "./node_modules/@navikt/ds-tokens/dist/tokens.js");





const AktivtUtsnittContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div `
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    user-select: none;
    pointer-events: none;
`;
const AktivPeriode = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div `
    position: absolute;
    height: 100%;
    border: none;
    background: none;
    padding: 0;

    &::-moz-focus-inner {
        border: 0;
    }

    &:hover,
    &:focus {
        outline: none;
    }

    &:before {
        content: '';
        position: absolute;
        top: -2px;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.ABlue500};
        box-shadow: 0 0 0 1px ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.ABlue500};
        left: -1px;
    }

    &:after {
        content: '';
        position: absolute;
        top: -2px;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.ABlue500};
        box-shadow: 0 0 0 1px ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.ABlue500};
        right: -1px;
    }
`;
const AktivPeriodeBorder = (0,styled_components__WEBPACK_IMPORTED_MODULE_1__["default"])(AktivPeriode) `
    box-shadow:
        inset 2px 0 0 -1px ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.ABlue500},
        inset -2px 0 0 -1px ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.ABlue500};
`;
const AktivPeriodeBakgrunn = (0,styled_components__WEBPACK_IMPORTED_MODULE_1__["default"])(AktivPeriode) `
    background: ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.ABlue50};
`;
const AktivtUtsnittBorder = ({ aktivtUtsnitt, tidslinjestart, tidslinjeslutt, direction, }) => {
    const style = (0,_usePositionAndSize_js__WEBPACK_IMPORTED_MODULE_3__.usePositionAndSize)({
        periode: aktivtUtsnitt,
        tidslinjestart,
        tidslinjeslutt,
        direction,
    });
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(AktivtUtsnittContainer, { className: 'aktivtUtsnittContainer' },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(AktivPeriodeBorder, { className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('aktivPeriodeBorder'), style: style })));
};
const AktivtUtsnittBakgrunn = ({ aktivtUtsnitt, tidslinjestart, tidslinjeslutt, direction, }) => {
    const style = (0,_usePositionAndSize_js__WEBPACK_IMPORTED_MODULE_3__.usePositionAndSize)({
        periode: aktivtUtsnitt,
        tidslinjestart,
        tidslinjeslutt,
        direction,
    });
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(AktivtUtsnittContainer, { className: 'aktivtUtsnittContainer' },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(AktivPeriodeBakgrunn, { className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('aktivPeriodeBakgrunn'), style: style })));
};
//# sourceMappingURL=AktivtUtsnitt.js.map

/***/ },

/***/ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/AxisLabels.js"
/*!****************************************************************************************!*\
  !*** ./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/AxisLabels.js ***!
  \****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AxisLabels: () => (/* binding */ AxisLabels),
/* harmony export */   dagsetiketter: () => (/* binding */ dagsetiketter),
/* harmony export */   "månedsetiketter": () => (/* binding */ månedsetiketter),
/* harmony export */   "årsetiketter": () => (/* binding */ årsetiketter)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./filter.js */ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/filter.js");
/* harmony import */ var _calc_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./calc.js */ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/calc.js");
/* harmony import */ var dayjs_locale_nb__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! dayjs/locale/nb */ "./node_modules/dayjs/locale/nb.js");
/* harmony import */ var dayjs_locale_nb__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(dayjs_locale_nb__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @navikt/ds-tokens/dist/tokens */ "./node_modules/@navikt/ds-tokens/dist/tokens.js");








dayjs__WEBPACK_IMPORTED_MODULE_1___default().locale('nb');
const formatertDag = (dato) => dato.format('DD.MM');
const formatertMåned = (dato) => {
    const månedLabel = dato.format('MMM');
    return månedLabel[0].toUpperCase().concat(månedLabel.slice(1, 3));
};
const formatertÅr = (dato) => `${dato.year()}`;
const dagsetiketter = (start, slutt, totaltAntallDager, direction) => {
    const inkrement = Math.ceil(totaltAntallDager / 10);
    const sisteDag = slutt.startOf('day');
    return new Array(totaltAntallDager)
        .fill(sisteDag)
        .map((denneDagen, i) => {
        if (i % inkrement !== 0)
            return null;
        const dag = denneDagen.subtract(i, 'day');
        const { horizontalPosition, width } = (0,_calc_js__WEBPACK_IMPORTED_MODULE_5__.horizontalPositionAndWidth)(dag, dag.add(1, 'day'), start, slutt);
        return {
            direction: direction,
            horizontalPosition: horizontalPosition,
            label: formatertDag(dag),
            date: dag.toDate(),
            width: width,
        };
    })
        .filter(etikett => etikett !== null);
};
const månedsetiketter = (start, slutt, direction) => {
    const startmåned = start.startOf('month');
    const sluttmåned = slutt.endOf('month');
    const antallMåneder = sluttmåned.diff(startmåned, 'month') + 1;
    return new Array(antallMåneder).fill(startmåned).map((denneMåneden, i) => {
        const måned = denneMåneden.add(i, 'month');
        const { horizontalPosition, width } = (0,_calc_js__WEBPACK_IMPORTED_MODULE_5__.horizontalPositionAndWidth)(måned, måned.add(1, 'month'), start, slutt);
        return {
            direction: direction,
            horizontalPosition: horizontalPosition,
            label: formatertMåned(måned),
            date: måned.toDate(),
            width: width,
        };
    });
};
const årsetiketter = (start, slutt, direction) => {
    const førsteÅr = start.startOf('year');
    const sisteÅr = slutt.endOf('year');
    const antallÅr = sisteÅr.diff(start, 'year') + 1;
    return new Array(antallÅr).fill(førsteÅr).map((detteÅret, i) => {
        const år = detteÅret.add(i, 'year');
        const { horizontalPosition, width } = (0,_calc_js__WEBPACK_IMPORTED_MODULE_5__.horizontalPositionAndWidth)(år, år.add(1, 'year'), start, slutt);
        return {
            direction: direction,
            horizontalPosition: horizontalPosition,
            label: formatertÅr(år),
            date: år.toDate(),
            width: width,
        };
    });
};
const axisLabels = (start, slutt, direction) => {
    const totaltAntallDager = slutt.diff(start, 'day');
    if (totaltAntallDager < 40) {
        return dagsetiketter(start, slutt, totaltAntallDager, direction);
    }
    else if (totaltAntallDager < 370) {
        return månedsetiketter(start, slutt, direction);
    }
    else {
        return årsetiketter(start, slutt, direction);
    }
};
const Etiketter = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div `
    position: relative;
    width: 100%;
    height: 1rem;
    box-sizing: content-box;
    margin-bottom: ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_7__.ASpacing4};

    > * {
        position: absolute;
        font-size: 0.8rem;
        color: ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_7__.AGray600};
    }
`;
const AxisLabels = ({ start, slutt, direction = 'left', etikettRender, }) => {
    const labels = axisLabels(start, slutt, direction).filter(_filter_js__WEBPACK_IMPORTED_MODULE_4__.erSynlig);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Etiketter, { className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('etiketter') }, labels.map(etikett => {
        var _a;
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { key: etikett.label, style: {
                display: 'flex',
                justifyContent: direction === 'left' ? 'flex-start' : 'flex-end',
                [direction]: `${etikett.horizontalPosition}%`,
                width: `${etikett.width}%`,
            } }, (_a = etikettRender === null || etikettRender === void 0 ? void 0 : etikettRender(etikett)) !== null && _a !== void 0 ? _a : etikett.label));
    })));
};
//# sourceMappingURL=AxisLabels.js.map

/***/ },

/***/ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/Pins.js"
/*!**********************************************************************************!*\
  !*** ./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/Pins.js ***!
  \**********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pins: () => (/* binding */ Pins)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _calc_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calc.js */ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/calc.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _Tooltip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tooltip.js */ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/Tooltip.js");
/* harmony import */ var _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/ds-tokens/dist/tokens */ "./node_modules/@navikt/ds-tokens/dist/tokens.js");






const StyledTooltip = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_Tooltip_js__WEBPACK_IMPORTED_MODULE_4__.Tooltip)) `
    font-size: 0.8rem;
    top: -10px;
`;
const PinView = ({ render }) => {
    const [showRender, setShowRender] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PinStyle, { className: 'pin', onMouseOver: () => setShowRender(true), onMouseLeave: () => setShowRender(false) }, showRender && render && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledTooltip, { className: 'tooltip' }, render)));
};
const PinsStyle = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div `
    position: absolute;
    width: 100%;
    height: 100%;
`;
const PinStyle = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div `
    position: absolute;
    height: calc(100% + 10px);
    top: -22px;
    width: 1px;
    background: #000000;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 18px;
        height: 18px;
        background: #ffffff;
        border: 6px solid ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_5__.ARed500};
        border-radius: 50%;
        transform: translate(-8.5px, -9.5px);
    }
`;
const PinContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].span `
    position: absolute;
    height: 100%;
`;
const Pins = ({ pins, start, slutt, direction }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PinsStyle, { className: 'pins' }, pins.map(({ date, render }, i) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PinContainer, { key: i, className: 'container', style: { [direction]: `${(0,_calc_js__WEBPACK_IMPORTED_MODULE_2__.position)(dayjs__WEBPACK_IMPORTED_MODULE_1___default()(date), start, slutt)}%` } },
    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PinView, { render: render }))))));
//# sourceMappingURL=Pins.js.map

/***/ },

/***/ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/Tidslinje.js"
/*!***************************************************************************************!*\
  !*** ./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/Tidslinje.js ***!
  \***************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tidslinje: () => (/* binding */ Tidslinje)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _AktivtUtsnitt_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AktivtUtsnitt.js */ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/AktivtUtsnitt.js");
/* harmony import */ var _AxisLabels_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AxisLabels.js */ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/AxisLabels.js");
/* harmony import */ var _TimelineRow_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TimelineRow.js */ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/TimelineRow.js");
/* harmony import */ var _useTidslinjerader_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./useTidslinjerader.js */ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/useTidslinjerader.js");
/* harmony import */ var _Pins_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Pins.js */ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/Pins.js");
/* harmony import */ var _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @navikt/ds-tokens/dist/tokens */ "./node_modules/@navikt/ds-tokens/dist/tokens.js");









const TidslinjeStyle = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div `
    position: relative;
    padding: ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_8__.ASpacing3} 0;
    margin: 0 ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_8__.ASpacing4};
    display: flex;
    flex-direction: column;
    flex: 1;
`;
const TidslinjeRadStyle = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div `
    position: relative;
    padding: 0;
    border-top: ${props => `${props.$kompakt ? 'none' : '1px solid #e7e9e9'}`};

    .tidslinjerad.førsterad,
    hr.førsterad {
        margin-top: ${props => `${props.$kompakt ? '0rem' : '1.56rem'}`};
    }
`;
const EmptyRowsStyle = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div `
    position: absolute;
    height: 100%;
    width: 100%;
`;
// eslint-disable-next-line react/display-name
const Timeline = react__WEBPACK_IMPORTED_MODULE_0___default().memo(({ pins, rows, start, endInclusive, onSelectPeriod, aktivtUtsnitt, activeRow, direction, axisLabelRenderer, kompakt = false, }) => {
    const onSelectPeriodeWrapper = onSelectPeriod &&
        // eslint-disable-next-line react-hooks/rules-of-hooks
        (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((periode) => {
            onSelectPeriod === null || onSelectPeriod === void 0 ? void 0 : onSelectPeriod({
                id: periode.id,
                fom: periode.start.toDate(),
                tom: periode.endInclusive.toDate(),
                disabled: periode.disabled,
                status: periode.status,
            });
        }, [onSelectPeriod]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TidslinjeStyle, { className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('tidslinje') },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AxisLabels_js__WEBPACK_IMPORTED_MODULE_4__.AxisLabels, { start: start, slutt: endInclusive, direction: direction, etikettRender: axisLabelRenderer }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TidslinjeRadStyle, { "$kompakt": kompakt, className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('tidslinjerader') },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(EmptyRowsStyle, null, rows.map((_, i) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_TimelineRow_js__WEBPACK_IMPORTED_MODULE_5__.EmptyTimelineRow, { kompakt: kompakt, className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(i === 0 && 'førsterad'), key: i, active: i === activeRow })))),
            pins && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Pins_js__WEBPACK_IMPORTED_MODULE_7__.Pins, { pins: pins, start: start, slutt: endInclusive, direction: direction })),
            aktivtUtsnitt && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AktivtUtsnitt_js__WEBPACK_IMPORTED_MODULE_3__.AktivtUtsnittBakgrunn, { tidslinjestart: start, tidslinjeslutt: endInclusive, aktivtUtsnitt: aktivtUtsnitt, direction: direction })),
            rows.map((tidslinje, i) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_TimelineRow_js__WEBPACK_IMPORTED_MODULE_5__.TimelineRow, Object.assign({ key: tidslinje.id, className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(i === 0 && 'førsterad') }, tidslinje, { onSelectPeriod: onSelectPeriodeWrapper, active: i === activeRow, kompakt: kompakt })))),
            aktivtUtsnitt && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AktivtUtsnitt_js__WEBPACK_IMPORTED_MODULE_3__.AktivtUtsnittBorder, { tidslinjestart: start, tidslinjeslutt: endInclusive, aktivtUtsnitt: aktivtUtsnitt, direction: direction })))));
});
/**
 * Viser perioder i en tidslinje.
 */
// eslint-disable-next-line react/display-name
const Tidslinje = react__WEBPACK_IMPORTED_MODULE_0___default().memo(({ pins, rader, aktivRad, startDato, sluttDato, etikettRender, onSelectPeriode, aktivtUtsnitt, retning = 'stigende', kompakt = false, }) => {
    if (!rader)
        throw new Error('Tidslinjen mangler rader.');
    const direction = retning === 'stigende' ? 'left' : 'right';
    const start = (0,_useTidslinjerader_js__WEBPACK_IMPORTED_MODULE_6__.useTidligsteDato)({ startDato, rader }).startOf('day');
    const endInclusive = (0,_useTidslinjerader_js__WEBPACK_IMPORTED_MODULE_6__.useSenesteDato)({ sluttDato, rader }).endOf('day');
    const rows = (0,_useTidslinjerader_js__WEBPACK_IMPORTED_MODULE_6__.useTidslinjerader)(rader, start, endInclusive, direction);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Timeline, { rows: rows, start: start, activeRow: aktivRad, direction: direction, endInclusive: endInclusive, onSelectPeriod: onSelectPeriode, aktivtUtsnitt: aktivtUtsnitt, axisLabelRenderer: etikettRender, pins: pins, kompakt: kompakt }));
});
//# sourceMappingURL=Tidslinje.js.map

/***/ },

/***/ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/TimelinePeriod.js"
/*!********************************************************************************************!*\
  !*** ./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/TimelinePeriod.js ***!
  \********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TimelinePeriod: () => (/* binding */ TimelinePeriod)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Tooltip_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tooltip.js */ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/Tooltip.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");




const fellesPeriodeStyle = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__.css) `
    background: #e7e9e9;
    border-top: 1px solid #59514b;
    border-bottom: 1px solid #59514b;

    border-radius: 1.5rem;
    position: absolute;
    transition: box-shadow 0.1s ease;
    padding: 0;

    &.mini {
        min-width: 0;
        padding: 0;
        &:before {
            display: none;
        }
    }
    &.mini:before {
        display: none;
    }

    &.advarsel {
        background: #ffe9cc;
        border: 1px solid #ff9100;
    }

    &.feil {
        background: #f1d8d4;
        border: 1px solid #ba3a26;
    }

    &.inaktiv {
        background: #e7e9e9;
        border: 1px solid #78706a;
    }

    &.suksess {
        background: #cde7d8;
        border: 1px solid #117938;
    }

    &.sammenhengendeFraHøyre {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
    }

    &.sammenhengendeFraVenstre {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
    }

    &.sammenhengendeFraBegge {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
    }

    &.croppedHøyre {
        border-right: none;
    }

    &.croppedVenstre {
        border-left: none;
    }

    &.croppedBegge {
        border-left: none;
        border-right: none;
    }
`;
const InfoPin = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div `
    position: absolute;
    background: #0067c5;
    height: 6px;
    width: 2px;
    top: 0;
    left: 50%;
    transform: translate(-1px, -7px);

    &:before {
        content: '';
        position: absolute;
        top: 0;
        width: 10px;
        height: 10px;
        background: #0067c5;
        transform: ${props => `translate(-${props.$påPeriodeKnapp ? 5 : 4}px, -100%)`};
        border-radius: 50%;
    }
`;
const PeriodeInnhold = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div `
    margin: ${props => `${props.$kompakt ? 0 : 0.3}rem 0.3rem`};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: clip;
    text-align: left;
    position: relative;
    top: ${props => `${props.$kompakt ? 0 : -2}px`};
`;
const PeriodeKnapp = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].button `
    height: ${props => `${props.$kompakt ? 1.5 : 2}rem`};
    cursor: pointer;

    &.advarsel {
        &:hover,
        &.active,
        &:focus {
            background: #fed7a3;
        }
    }

    &.feil {
        &:hover,
        &.active,
        &:focus {
            background: #e3b0a8;
        }
    }

    &.inaktiv {
        &:hover,
        &.active,
        &:focus {
            background: #c3c3c3;
        }
    }

    &.suksess {
        &:hover,
        &.active,
        &:focus {
            background: #9bd0b0;
        }
    }
    ${fellesPeriodeStyle}
`;
const PeriodeDiv = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div `
    height: ${props => `${props.$kompakt ? 1.5 : 2}rem`};
    ${fellesPeriodeStyle}
`;
const ariaLabel = (period) => {
    const start = period.start.format('DD.MM.YYYY');
    const end = period.endInclusive.format('DD.MM.YYYY');
    return `${period.status} fra ${start} til og med ${end}`;
};
const style = (period) => ({
    [period.direction]: `${period.horizontalPosition}%`,
    width: `${period.width}%`,
});
// eslint-disable-next-line react/display-name
const ClickablePeriod = react__WEBPACK_IMPORTED_MODULE_0___default().memo(({ buttonRef, period, className, onSelectPeriod, kompakt }) => {
    const [showHoverLabel, setShowHoverLabel] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const onClick = () => {
        if (!period.disabled) {
            onSelectPeriod === null || onSelectPeriod === void 0 ? void 0 : onSelectPeriod(period);
        }
    };
    const enableHoverLabel = () => {
        // tslint:disable-next-line:no-unused-expression
        period.hoverLabel && setShowHoverLabel(true);
    };
    const disableHoverLabel = () => {
        // tslint:disable-next-line:no-unused-expression
        period.hoverLabel && setShowHoverLabel(false);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PeriodeKnapp, { "$kompakt": kompakt, ref: buttonRef, className: className, onClick: onClick, onMouseEnter: enableHoverLabel, onMouseLeave: disableHoverLabel, "aria-label": ariaLabel(period), style: style(period) },
        period.hoverLabel && showHoverLabel && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Tooltip_js__WEBPACK_IMPORTED_MODULE_2__.Tooltip, null, period.hoverLabel),
        period.infoPin && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InfoPin, { "$p\u00E5PeriodeKnapp": true, className: 'infoPin' }),
        period.children && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PeriodeInnhold, { "$kompakt": kompakt }, period.children))));
});
const NonClickablePeriod = ({ divRef, period, className, kompakt }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PeriodeDiv, { "$kompakt": kompakt, ref: divRef, className: className, "aria-label": ariaLabel(period), style: style(period) },
    period.infoPin && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InfoPin, { className: 'infoPin' }),
    period.children && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PeriodeInnhold, { "$kompakt": kompakt }, period.children)));
const finnClassnames = (period, active, isMini) => {
    const newClassNames = [];
    switch (period.cropped) {
        case 'both':
            newClassNames.push('croppedBegge');
            break;
        case 'left':
            if (period.direction === 'left') {
                newClassNames.push('croppedVenstre');
            }
            else {
                newClassNames.push('croppedHøyre');
            }
            break;
        case 'right':
            if (period.direction === 'left') {
                newClassNames.push('croppedHøyre');
            }
            else {
                newClassNames.push('croppedVenstre');
            }
            break;
        default:
            break;
    }
    switch (period.connectingEdge) {
        case 'both':
            newClassNames.push('sammenhengendeFraBegge');
            break;
        case 'left':
            if (period.direction === 'left') {
                newClassNames.push('sammenhengendeFraVenstre');
            }
            else {
                newClassNames.push('sammenhengendeFraHøyre');
            }
            break;
        case 'right':
            if (period.direction === 'left') {
                newClassNames.push('sammenhengendeFraHøyre');
            }
            else {
                newClassNames.push('sammenhengendeFraVenstre');
            }
            break;
        default:
            break;
    }
    if (active) {
        newClassNames.push('active');
    }
    if (isMini) {
        newClassNames.push('mini');
    }
    return newClassNames;
};
// eslint-disable-next-line react/display-name
const TimelinePeriod = react__WEBPACK_IMPORTED_MODULE_0___default().memo(({ period, onSelectPeriod, active, kompakt }) => {
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [isMini, setIsMini] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const className = classnames__WEBPACK_IMPORTED_MODULE_1___default()('periode', finnClassnames(period, active, isMini), period.status, period.className);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
        var _a;
        const currentWidth = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.offsetWidth;
        if (currentWidth && currentWidth < 30) {
            setIsMini(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref.current]);
    return onSelectPeriod ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ClickablePeriod, { buttonRef: ref, period: period, onSelectPeriod: onSelectPeriod, className: className, kompakt: kompakt })) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NonClickablePeriod, { divRef: ref, period: period, className: className, kompakt: kompakt }));
});
//# sourceMappingURL=TimelinePeriod.js.map

/***/ },

/***/ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/TimelineRow.js"
/*!*****************************************************************************************!*\
  !*** ./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/TimelineRow.js ***!
  \*****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EmptyTimelineRow: () => (/* binding */ EmptyTimelineRow),
/* harmony export */   TimelineRow: () => (/* binding */ TimelineRow)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _TimelinePeriod_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TimelinePeriod.js */ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/TimelinePeriod.js");
/* harmony import */ var _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/ds-tokens/dist/tokens */ "./node_modules/@navikt/ds-tokens/dist/tokens.js");





const TimelineRowStyle = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div `
    flex: 1;
    height: ${props => `${props.$kompakt ? _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.ASpacing6 : _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.ASpacing8}`};
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: ${props => `${props.$kompakt ? _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.ASpacing4 : _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.ASpacing6}`};
`;
const EmptyRowHr = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].hr `
    flex: 1;
    height: ${props => `${props.$kompakt ? _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.ASpacing6 : _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.ASpacing8}`};
    width: 100%;
    border: none;
    background-color: ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.AGray50};
    margin-bottom: ${props => `${props.$kompakt ? _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.ASpacing4 : _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.ASpacing6}`};

    &.aktivRad {
        background-color: ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_4__.ABlue50};
    }
`;
const EmptyTimelineRow = ({ active = false, kompakt = false, className, }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(EmptyRowHr, { "$kompakt": kompakt, className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(active && 'aktivRad', className) }));
const TimelineRow = ({ periods, onSelectPeriod, active = false, kompakt = false, className, }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TimelineRowStyle, { "$kompakt": kompakt, className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('tidslinjerad', active && 'aktivRad', className) }, periods.map(period => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_TimelinePeriod_js__WEBPACK_IMPORTED_MODULE_3__.TimelinePeriod, { key: period.id, period: period, onSelectPeriod: onSelectPeriod, active: period.active, kompakt: kompakt })))));
//# sourceMappingURL=TimelineRow.js.map

/***/ },

/***/ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/Tooltip.js"
/*!*************************************************************************************!*\
  !*** ./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/Tooltip.js ***!
  \*************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tooltip: () => (/* binding */ Tooltip)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @navikt/ds-tokens/dist/tokens */ "./node_modules/@navikt/ds-tokens/dist/tokens.js");




const TooltipContainer = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div `
    position: absolute;
    padding: ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__.ASpacing2} ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__.ASpacing4};
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__.AGray600};
    color: ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__.AGray800};
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(calc(-100% - 10px));
    box-shadow: 0 2px 2px 0 ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__.AGray400};
    animation-timing-function: ease-out;
    animation-duration: 0.05s;
    animation-name: fadeIn;
    cursor: default;
    z-index: 1000;

    &:before {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background: #ffffff;
        left: 50%;
        bottom: -1px;
        border-bottom: 1px solid ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__.AGray600};
        border-right: 1px solid ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__.AGray600};
        box-shadow: 2px 2px 2px ${_navikt_ds_tokens_dist_tokens__WEBPACK_IMPORTED_MODULE_3__.AGray400};
        transform: translateX(-50%) translateY(50%) rotate(45deg);
    }

    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 12px;
        background: transparent;
        bottom: -12px;
        left: 0;
    }
`;
const Tooltip = ({ children, className }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TooltipContainer, { className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className) }, children));
//# sourceMappingURL=Tooltip.js.map

/***/ },

/***/ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/calc.js"
/*!**********************************************************************************!*\
  !*** ./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/calc.js ***!
  \**********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   breddeMellomDatoer: () => (/* binding */ breddeMellomDatoer),
/* harmony export */   erDelAv: () => (/* binding */ erDelAv),
/* harmony export */   erLike: () => (/* binding */ erLike),
/* harmony export */   horizontalPositionAndWidth: () => (/* binding */ horizontalPositionAndWidth),
/* harmony export */   isOutOfBounds: () => (/* binding */ isOutOfBounds),
/* harmony export */   overlapper: () => (/* binding */ overlapper),
/* harmony export */   position: () => (/* binding */ position)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs/plugin/isSameOrBefore */ "./node_modules/dayjs/plugin/isSameOrBefore.js");
/* harmony import */ var dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dayjs_plugin_isSameOrAfter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs/plugin/isSameOrAfter */ "./node_modules/dayjs/plugin/isSameOrAfter.js");
/* harmony import */ var dayjs_plugin_isSameOrAfter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_isSameOrAfter__WEBPACK_IMPORTED_MODULE_2__);



dayjs__WEBPACK_IMPORTED_MODULE_0___default().extend((dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_1___default()));
dayjs__WEBPACK_IMPORTED_MODULE_0___default().extend((dayjs_plugin_isSameOrAfter__WEBPACK_IMPORTED_MODULE_2___default()));
const position = (date, start, endInclusive) => {
    const diff = endInclusive.diff(start);
    return (date.diff(start) / diff) * 100;
};
const horizontalPositionAndWidth = (start, endInclusive, timelineStart, timelineEndInclusive) => {
    const horizontalPosition = position(start, timelineStart, timelineEndInclusive);
    const width = position(endInclusive, timelineStart, timelineEndInclusive) - horizontalPosition;
    return {
        horizontalPosition: horizontalPosition,
        width: width,
    };
};
const isOutOfBounds = (position, width) => position >= 100 || position + width < 0;
const breddeMellomDatoer = (start, slutt, totaltAntallDatoer) => {
    const dagerMellomDatoer = slutt.diff(start, 'minute') / 60 / 24;
    return (dagerMellomDatoer / totaltAntallDatoer) * 100;
};
const erLike = (p1, p2) => p2 && p1.start.isSame(p2.start) && p1.endInclusive.isSame(p2.endInclusive);
const erDelAv = (p1, p2) => p2 && p1.start.isBefore(p2.start) && p1.endInclusive.isAfter(p2.endInclusive);
const overlapper = (p1, p2) => p2 && p1.start.isSameOrBefore(p2.start) && p1.endInclusive.isSameOrAfter(p2.endInclusive);
//# sourceMappingURL=calc.js.map

/***/ },

/***/ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/filter.js"
/*!************************************************************************************!*\
  !*** ./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/filter.js ***!
  \************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   erSynlig: () => (/* binding */ erSynlig),
/* harmony export */   "innenEtDøgn": () => (/* binding */ innenEtDøgn),
/* harmony export */   invisiblePeriods: () => (/* binding */ invisiblePeriods)
/* harmony export */ });
const erSynlig = ({ horizontalPosition }) => horizontalPosition <= 100 && horizontalPosition >= 0;
const innenEtDøgn = (dato1, dato2) => Math.abs(dato1.diff(dato2, 'day')) <= 1;
const invisiblePeriods = ({ horizontalPosition, width }) => horizontalPosition >= 0 && horizontalPosition <= 100 && width > 0;
//# sourceMappingURL=filter.js.map

/***/ },

/***/ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/sort.js"
/*!**********************************************************************************!*\
  !*** ./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/sort.js ***!
  \**********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sisteDato: () => (/* binding */ sisteDato),
/* harmony export */   sisteEnklePeriode: () => (/* binding */ sisteEnklePeriode),
/* harmony export */   sistePeriode: () => (/* binding */ sistePeriode)
/* harmony export */ });
const sisteDato = (a, b) => b.diff(a);
const sistePeriode = (a, b) => a.horizontalPosition - b.horizontalPosition;
const sisteEnklePeriode = (a, b) => b.endInclusive.diff(a.endInclusive);
//# sourceMappingURL=sort.js.map

/***/ },

/***/ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/usePositionAndSize.js"
/*!************************************************************************************************!*\
  !*** ./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/usePositionAndSize.js ***!
  \************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   usePositionAndSize: () => (/* binding */ usePositionAndSize)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _calc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calc.js */ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/calc.js");


const constrain = (value, min, max) => value >= max ? max : value < min ? min : value;
const usePositionAndSize = ({ periode, tidslinjestart, tidslinjeslutt, direction, }) => {
    const fom = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(periode.fom).startOf('day');
    const tom = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(periode.tom).endOf('day');
    const { horizontalPosition, width } = (0,_calc_js__WEBPACK_IMPORTED_MODULE_1__.horizontalPositionAndWidth)(fom, tom, tidslinjestart, tidslinjeslutt);
    const adjustedHorizontalPosition = constrain(horizontalPosition, 0, 100);
    const adjustedWidth = adjustedHorizontalPosition + width >= 100
        ? 100 - adjustedHorizontalPosition
        : adjustedHorizontalPosition + width !== horizontalPosition + width
            ? width + horizontalPosition
            : width;
    if (horizontalPosition >= 100 || adjustedWidth <= 0) {
        return {
            [direction]: 0,
            width: 0,
            display: 'none',
        };
    }
    else if (horizontalPosition < 0) {
        return {
            [direction]: 0,
            width: `${adjustedWidth}%`,
        };
    }
    else {
        return {
            [direction]: `${adjustedHorizontalPosition}%`,
            width: `${adjustedWidth}%`,
            display: horizontalPosition > 100 ? 'none' : undefined,
        };
    }
};
//# sourceMappingURL=usePositionAndSize.js.map

/***/ },

/***/ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/useTidslinjerader.js"
/*!***********************************************************************************************!*\
  !*** ./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/useTidslinjerader.js ***!
  \***********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSenesteDato: () => (/* binding */ useSenesteDato),
/* harmony export */   useTidligsteDato: () => (/* binding */ useTidligsteDato),
/* harmony export */   useTidslinjerader: () => (/* binding */ useTidslinjerader)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "./node_modules/@navikt/familie-tidslinje/node_modules/nanoid/index.browser.js");
/* harmony import */ var _calc_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calc.js */ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/calc.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./filter.js */ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/filter.js");
/* harmony import */ var _sort_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sort.js */ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/sort.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);






const spatialPeriod = (period, timelineStart, timelineEndInclusive, direction = 'left') => {
    const start = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(period.fom);
    const endInclusive = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(period.tom);
    const { horizontalPosition, width } = (0,_calc_js__WEBPACK_IMPORTED_MODULE_2__.horizontalPositionAndWidth)(start.startOf('day'), endInclusive.endOf('day'), timelineStart, timelineEndInclusive);
    return {
        id: period.id || (0,nanoid__WEBPACK_IMPORTED_MODULE_1__.nanoid)(),
        start: start,
        endInclusive: endInclusive,
        horizontalPosition: horizontalPosition,
        hoverLabel: period.hoverLabel,
        direction: direction,
        className: period.className,
        disabled: period.disabled,
        status: period.status,
        active: period.active,
        infoPin: period.infoPin,
        width: width,
        children: period.children,
    };
};
const adjustedEdges = (period, i, allPeriods) => {
    const left = i > 0 && (0,_filter_js__WEBPACK_IMPORTED_MODULE_3__["innenEtDøgn"])(allPeriods[i - 1].endInclusive, period.start);
    const right = i < allPeriods.length - 1 && (0,_filter_js__WEBPACK_IMPORTED_MODULE_3__["innenEtDøgn"])(period.endInclusive, allPeriods[i + 1].start);
    return left && right
        ? Object.assign(Object.assign({}, period), { connectingEdge: 'both' }) : left
        ? Object.assign(Object.assign({}, period), { connectingEdge: 'left' }) : right
        ? Object.assign(Object.assign({}, period), { connectingEdge: 'right' }) : period;
};
const trimmedPeriods = (period) => {
    let { horizontalPosition, width, connectingEdge } = period;
    let cropped = undefined;
    if (horizontalPosition + width > 100) {
        width = 100 - horizontalPosition;
        cropped = 'right';
        connectingEdge = connectingEdge === 'left' || connectingEdge === 'both' ? 'both' : 'right';
    }
    if (horizontalPosition < 0 && horizontalPosition + width > 0) {
        width = horizontalPosition + width;
        horizontalPosition = 0;
        cropped = cropped === 'right' ? 'both' : 'left';
        connectingEdge = connectingEdge === 'right' || connectingEdge === 'both' ? 'both' : 'left';
    }
    return Object.assign(Object.assign({}, period), { width: width, horizontalPosition: horizontalPosition, connectingEdge: connectingEdge, cropped: cropped });
};
const useTidslinjerader = (rader, startDato, sluttDato, direction) => (0,react__WEBPACK_IMPORTED_MODULE_5__.useMemo)(() => rader.map(perioder => {
    const tidslinjeperioder = perioder
        .map((periode) => spatialPeriod(periode, startDato, sluttDato, direction))
        .sort(_sort_js__WEBPACK_IMPORTED_MODULE_4__.sistePeriode)
        .map(adjustedEdges)
        .map(trimmedPeriods)
        .filter(_filter_js__WEBPACK_IMPORTED_MODULE_3__.invisiblePeriods);
    return {
        id: (0,nanoid__WEBPACK_IMPORTED_MODULE_1__.nanoid)(),
        periods: direction === 'left' ? tidslinjeperioder : tidslinjeperioder.reverse(),
    };
}), [rader, startDato, sluttDato, direction]);
const tidligsteDato = (tidligst, periode) => periode.fom < tidligst ? periode.fom : tidligst;
const tidligsteFomDato = (rader) => rader.flat().reduce(tidligsteDato, new Date());
const useTidligsteDato = ({ startDato, rader }) => (0,react__WEBPACK_IMPORTED_MODULE_5__.useMemo)(() => (startDato ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()(startDato) : dayjs__WEBPACK_IMPORTED_MODULE_0___default()(tidligsteFomDato(rader))), [startDato, rader]);
const senesteDato = (senest, periode) => periode.tom > senest ? periode.tom : senest;
const senesteTomDato = (rader) => rader.flat().reduce(senesteDato, new Date(0));
const useSenesteDato = ({ sluttDato, rader }) => (0,react__WEBPACK_IMPORTED_MODULE_5__.useMemo)(() => (sluttDato ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()(sluttDato) : dayjs__WEBPACK_IMPORTED_MODULE_0___default()(senesteTomDato(rader)).add(1, 'day')), [sluttDato, rader]);
//# sourceMappingURL=useTidslinjerader.js.map

/***/ },

/***/ "./node_modules/@navikt/familie-tidslinje/dist/index.js"
/*!**************************************************************!*\
  !*** ./node_modules/@navikt/familie-tidslinje/dist/index.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tidslinje: () => (/* reexport safe */ _components_tidslinje_Tidslinje_js__WEBPACK_IMPORTED_MODULE_0__.Tidslinje)
/* harmony export */ });
/* harmony import */ var _components_tidslinje_Tidslinje_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/tidslinje/Tidslinje.js */ "./node_modules/@navikt/familie-tidslinje/dist/components/tidslinje/Tidslinje.js");


//# sourceMappingURL=index.js.map

/***/ },

/***/ "./src/frontend/komponenter/Tidslinje/TidslinjeEtikett.tsx"
/*!*****************************************************************!*\
  !*** ./src/frontend/komponenter/Tidslinje/TidslinjeEtikett.tsx ***!
  \*****************************************************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
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





var EtikettKnapp = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_FamilieBaseKnapp__WEBPACK_IMPORTED_MODULE_5__["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    padding: 3px 3px 3px ", ";\n    width: 90%;\n    text-align: left;\n    cursor: ", ";\n    border-left: ", ";\n\n    > span {\n        text-decoration: ", ";\n        font-weight: ", ";\n        color: ", ";\n    }\n\n    :hover {\n        > span {\n            text-decoration: none;\n        }\n    }\n\n    :focus,\n    :active {\n        background-color: ", ";\n        color: #fff;\n    }\n"])), function (_ref) {
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

/***/ },

/***/ "./src/frontend/komponenter/Tidslinje/VinduVelger.tsx"
/*!************************************************************!*\
  !*** ./src/frontend/komponenter/Tidslinje/VinduVelger.tsx ***!
  \************************************************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _TidslinjeContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TidslinjeContext */ "./src/frontend/komponenter/Tidslinje/TidslinjeContext.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _s = __webpack_require__.$Refresh$.signature();



var Vinduvelger = function Vinduvelger() {
  _s();
  var _useTidslinjeContext = (0,_TidslinjeContext__WEBPACK_IMPORTED_MODULE_3__.useTidslinjeContext)(),
    tidslinjeVinduer = _useTidslinjeContext.tidslinjeVinduer,
    endreTidslinjeVindu = _useTidslinjeContext.endreTidslinjeVindu,
    aktivtTidslinjeVindu = _useTidslinjeContext.aktivtTidslinjeVindu;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.ToggleGroup, {
    defaultValue: aktivtTidslinjeVindu.vindu.id.toString(),
    size: "small",
    variant: "neutral",
    onChange: function onChange(vinduId) {
      return endreTidslinjeVindu(tidslinjeVinduer[Number(vinduId)]);
    }
  }, tidslinjeVinduer.map(function (vindu) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_2__.ToggleGroup.Item, {
      key: vindu.id,
      value: vindu.id.toString()
    }, vindu.label);
  }));
};
_s(Vinduvelger, "TuVPT7tkDvwNrIrqg4XmIPo8VUc=", false, function () {
  return [_TidslinjeContext__WEBPACK_IMPORTED_MODULE_3__.useTidslinjeContext];
});
_c = Vinduvelger;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vinduvelger);
var _c;
__webpack_require__.$Refresh$.register(_c, "Vinduvelger");

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

/***/ },

/***/ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/TilkjentYtelseTidslinje.tsx"
/*!****************************************************************************************************!*\
  !*** ./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/TilkjentYtelseTidslinje.tsx ***!
  \****************************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    pins: new Date(),
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

/***/ },

/***/ "./node_modules/dayjs/dayjs.min.js"
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},v="en",D={};D[v]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return v;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(v=i),i||!r&&v},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var v=this.$locale().weekStart||0,D=(y<v?y+7:y)-v;return $(r?m-D:m+(6-D),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,v=O.m(this,M);return v=(l={},l[c]=v/12,l[f]=v,l[h]=v/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?v:O.a(v)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),T=_.prototype;return w.prototype=T,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[v],w.Ls=D,w.p={},w}));

/***/ },

/***/ "./node_modules/dayjs/locale/nb.js"
/*!*****************************************!*\
  !*** ./node_modules/dayjs/locale/nb.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js")):0}(this,(function(e){"use strict";function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var n=t(e),a={name:"nb",weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"sø._ma._ti._on._to._fr._lø.".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),ordinal:function(e){return e+"."},weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] HH:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},relativeTime:{future:"om %s",past:"%s siden",s:"noen sekunder",m:"ett minutt",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dager",M:"en måned",MM:"%d måneder",y:"ett år",yy:"%d år"}};return n.default.locale(a,null,!0),a}));

/***/ },

/***/ "./node_modules/dayjs/plugin/isSameOrAfter.js"
/*!****************************************************!*\
  !*** ./node_modules/dayjs/plugin/isSameOrAfter.js ***!
  \****************************************************/
(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";return function(e,t){t.prototype.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)}}}));

/***/ },

/***/ "./node_modules/dayjs/plugin/isSameOrBefore.js"
/*!*****************************************************!*\
  !*** ./node_modules/dayjs/plugin/isSameOrBefore.js ***!
  \*****************************************************/
(module) {

!function(e,i){ true?module.exports=i():0}(this,(function(){"use strict";return function(e,i){i.prototype.isSameOrBefore=function(e,i){return this.isSame(e,i)||this.isBefore(e,i)}}}));

/***/ },

/***/ "./node_modules/@navikt/familie-tidslinje/node_modules/nanoid/index.browser.js"
/*!*************************************************************************************!*\
  !*** ./node_modules/@navikt/familie-tidslinje/node_modules/nanoid/index.browser.js ***!
  \*************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   customAlphabet: () => (/* binding */ customAlphabet),
/* harmony export */   customRandom: () => (/* binding */ customRandom),
/* harmony export */   nanoid: () => (/* binding */ nanoid),
/* harmony export */   random: () => (/* binding */ random),
/* harmony export */   urlAlphabet: () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet)
/* harmony export */ });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "./node_modules/@navikt/familie-tidslinje/node_modules/nanoid/url-alphabet/index.js");
/* @ts-self-types="./index.d.ts" */


let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << Math.log2(alphabet.length - 1)) - 1
  let step = -~((1.6 * mask * defaultSize) / alphabet.length)
  return (size = defaultSize) => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step | 0
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length >= size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size = 21) =>
  customRandom(alphabet, size | 0, random)
let nanoid = (size = 21) => {
  let id = ''
  let bytes = crypto.getRandomValues(new Uint8Array((size |= 0)))
  while (size--) {
    id += _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet[bytes[size] & 63]
  }
  return id
}


/***/ },

/***/ "./node_modules/@navikt/familie-tidslinje/node_modules/nanoid/url-alphabet/index.js"
/*!******************************************************************************************!*\
  !*** ./node_modules/@navikt/familie-tidslinje/node_modules/nanoid/url-alphabet/index.js ***!
  \******************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   urlAlphabet: () => (/* binding */ urlAlphabet)
/* harmony export */ });
const urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'


/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2629916216576e3235e2")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4xOWQ3M2I5OGY5M2JiZmY3ZTdkZS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNhO0FBQ0g7QUFDeUI7QUFDSztBQUNsRSwrQkFBK0IseURBQU07QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix5REFBTTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixtRUFBUTtBQUM5QixnQ0FBZ0MsbUVBQVE7QUFDeEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixtRUFBUTtBQUM5QixnQ0FBZ0MsbUVBQVE7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDZEQUFNO0FBQ2pDO0FBQ0EsNkJBQTZCLG1FQUFRLENBQUM7QUFDdEMsOEJBQThCLG1FQUFRO0FBQ3RDO0FBQ0EsNkJBQTZCLDZEQUFNO0FBQ25DLGtCQUFrQixrRUFBTztBQUN6QjtBQUNPLCtCQUErQiwyREFBMkQ7QUFDakcsa0JBQWtCLDBFQUFrQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxZQUFZLDBEQUFtQiwyQkFBMkIscUNBQXFDO0FBQy9GLFFBQVEsMERBQW1CLHVCQUF1QixXQUFXLGlEQUFVLHNDQUFzQztBQUM3RztBQUNPLGlDQUFpQywyREFBMkQ7QUFDbkcsa0JBQWtCLDBFQUFrQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxZQUFZLDBEQUFtQiwyQkFBMkIscUNBQXFDO0FBQy9GLFFBQVEsMERBQW1CLHlCQUF5QixXQUFXLGlEQUFVLHdDQUF3QztBQUNqSDtBQUNBLHlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRjBCO0FBQ0E7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Ozs7OztBQ0F2Nk0sZUFBZSxLQUFvRCxrQkFBa0IsbUJBQU8sQ0FBQyxnREFBTyxHQUFHLENBQTBJLENBQUMsbUJBQW1CLGFBQWEsY0FBYywrQ0FBK0MsV0FBVyxjQUFjLHdZQUF3WSxhQUFhLGtDQUFrQywrSEFBK0gsZUFBZSx5TEFBeUwscUNBQXFDLEc7Ozs7Ozs7Ozs7QUNBM29DLGVBQWUsS0FBb0Qsb0JBQW9CLENBQW9JLENBQUMsa0JBQWtCLGFBQWEscUJBQXFCLHdDQUF3Qyw2Q0FBNkMsRzs7Ozs7Ozs7OztBQ0FyVyxlQUFlLEtBQW9ELG9CQUFvQixDQUFxSSxDQUFDLGtCQUFrQixhQUFhLHFCQUFxQix5Q0FBeUMsOENBQThDLEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQXhXO0FBQzBFO0FBQ3JCO0FBQzlDO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsVUFBVSwrREFBaUI7QUFDM0I7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUJPO0FBQ1A7Ozs7Ozs7OztVQ0RBLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvQG5hdmlrdC9mYW1pbGllLXRpZHNsaW5qZS9kaXN0L2NvbXBvbmVudHMvdGlkc2xpbmplL0FrdGl2dFV0c25pdHQuanMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvQG5hdmlrdC9mYW1pbGllLXRpZHNsaW5qZS9kaXN0L2NvbXBvbmVudHMvdGlkc2xpbmplL0F4aXNMYWJlbHMuanMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvQG5hdmlrdC9mYW1pbGllLXRpZHNsaW5qZS9kaXN0L2NvbXBvbmVudHMvdGlkc2xpbmplL1BpbnMuanMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvQG5hdmlrdC9mYW1pbGllLXRpZHNsaW5qZS9kaXN0L2NvbXBvbmVudHMvdGlkc2xpbmplL1RpZHNsaW5qZS5qcyIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9AbmF2aWt0L2ZhbWlsaWUtdGlkc2xpbmplL2Rpc3QvY29tcG9uZW50cy90aWRzbGluamUvVGltZWxpbmVQZXJpb2QuanMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvQG5hdmlrdC9mYW1pbGllLXRpZHNsaW5qZS9kaXN0L2NvbXBvbmVudHMvdGlkc2xpbmplL1RpbWVsaW5lUm93LmpzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vbm9kZV9tb2R1bGVzL0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUvZGlzdC9jb21wb25lbnRzL3RpZHNsaW5qZS9Ub29sdGlwLmpzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vbm9kZV9tb2R1bGVzL0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUvZGlzdC9jb21wb25lbnRzL3RpZHNsaW5qZS9jYWxjLmpzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vbm9kZV9tb2R1bGVzL0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUvZGlzdC9jb21wb25lbnRzL3RpZHNsaW5qZS9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvQG5hdmlrdC9mYW1pbGllLXRpZHNsaW5qZS9kaXN0L2NvbXBvbmVudHMvdGlkc2xpbmplL3NvcnQuanMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvQG5hdmlrdC9mYW1pbGllLXRpZHNsaW5qZS9kaXN0L2NvbXBvbmVudHMvdGlkc2xpbmplL3VzZVBvc2l0aW9uQW5kU2l6ZS5qcyIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9AbmF2aWt0L2ZhbWlsaWUtdGlkc2xpbmplL2Rpc3QvY29tcG9uZW50cy90aWRzbGluamUvdXNlVGlkc2xpbmplcmFkZXIuanMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvQG5hdmlrdC9mYW1pbGllLXRpZHNsaW5qZS9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL2tvbXBvbmVudGVyL1RpZHNsaW5qZS9UaWRzbGluamVFdGlrZXR0LnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9rb21wb25lbnRlci9UaWRzbGluamUvVmluZHVWZWxnZXIudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL0ZhZ3Nhay9CZWhhbmRsaW5nL1NpZGVyL0JlaGFuZGxpbmdzcmVzdWx0YXQvVGlsa2plbnRZdGVsc2VUaWRzbGluamUudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vbm9kZV9tb2R1bGVzL2RheWpzL2RheWpzLm1pbi5qcyIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9kYXlqcy9sb2NhbGUvbmIuanMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL2lzU2FtZU9yQWZ0ZXIuanMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL2lzU2FtZU9yQmVmb3JlLmpzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vbm9kZV9tb2R1bGVzL0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUvbm9kZV9tb2R1bGVzL25hbm9pZC9pbmRleC5icm93c2VyLmpzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vbm9kZV9tb2R1bGVzL0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUvbm9kZV9tb2R1bGVzL25hbm9pZC91cmwtYWxwaGFiZXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgdXNlUG9zaXRpb25BbmRTaXplIH0gZnJvbSAnLi91c2VQb3NpdGlvbkFuZFNpemUuanMnO1xuaW1wb3J0IHsgQUJsdWU1MCwgQUJsdWU1MDAgfSBmcm9tICdAbmF2aWt0L2RzLXRva2Vucy9kaXN0L3Rva2Vucyc7XG5jb25zdCBBa3RpdnRVdHNuaXR0Q29udGFpbmVyID0gc3R5bGVkLmRpdiBgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogMDtcbiAgICByaWdodDogMDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG5gO1xuY29uc3QgQWt0aXZQZXJpb2RlID0gc3R5bGVkLmRpdiBgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICBwYWRkaW5nOiAwO1xuXG4gICAgJjo6LW1vei1mb2N1cy1pbm5lciB7XG4gICAgICAgIGJvcmRlcjogMDtcbiAgICB9XG5cbiAgICAmOmhvdmVyLFxuICAgICY6Zm9jdXMge1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgIH1cblxuICAgICY6YmVmb3JlIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAtMnB4O1xuICAgICAgICB3aWR0aDogM3B4O1xuICAgICAgICBoZWlnaHQ6IDNweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBiYWNrZ3JvdW5kOiAke0FCbHVlNTAwfTtcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgMXB4ICR7QUJsdWU1MDB9O1xuICAgICAgICBsZWZ0OiAtMXB4O1xuICAgIH1cblxuICAgICY6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IC0ycHg7XG4gICAgICAgIHdpZHRoOiAzcHg7XG4gICAgICAgIGhlaWdodDogM3B4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGJhY2tncm91bmQ6ICR7QUJsdWU1MDB9O1xuICAgICAgICBib3gtc2hhZG93OiAwIDAgMCAxcHggJHtBQmx1ZTUwMH07XG4gICAgICAgIHJpZ2h0OiAtMXB4O1xuICAgIH1cbmA7XG5jb25zdCBBa3RpdlBlcmlvZGVCb3JkZXIgPSBzdHlsZWQoQWt0aXZQZXJpb2RlKSBgXG4gICAgYm94LXNoYWRvdzpcbiAgICAgICAgaW5zZXQgMnB4IDAgMCAtMXB4ICR7QUJsdWU1MDB9LFxuICAgICAgICBpbnNldCAtMnB4IDAgMCAtMXB4ICR7QUJsdWU1MDB9O1xuYDtcbmNvbnN0IEFrdGl2UGVyaW9kZUJha2dydW5uID0gc3R5bGVkKEFrdGl2UGVyaW9kZSkgYFxuICAgIGJhY2tncm91bmQ6ICR7QUJsdWU1MH07XG5gO1xuZXhwb3J0IGNvbnN0IEFrdGl2dFV0c25pdHRCb3JkZXIgPSAoeyBha3RpdnRVdHNuaXR0LCB0aWRzbGluamVzdGFydCwgdGlkc2xpbmplc2x1dHQsIGRpcmVjdGlvbiwgfSkgPT4ge1xuICAgIGNvbnN0IHN0eWxlID0gdXNlUG9zaXRpb25BbmRTaXplKHtcbiAgICAgICAgcGVyaW9kZTogYWt0aXZ0VXRzbml0dCxcbiAgICAgICAgdGlkc2xpbmplc3RhcnQsXG4gICAgICAgIHRpZHNsaW5qZXNsdXR0LFxuICAgICAgICBkaXJlY3Rpb24sXG4gICAgfSk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEFrdGl2dFV0c25pdHRDb250YWluZXIsIHsgY2xhc3NOYW1lOiAnYWt0aXZ0VXRzbml0dENvbnRhaW5lcicgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChBa3RpdlBlcmlvZGVCb3JkZXIsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWVzKCdha3RpdlBlcmlvZGVCb3JkZXInKSwgc3R5bGU6IHN0eWxlIH0pKSk7XG59O1xuZXhwb3J0IGNvbnN0IEFrdGl2dFV0c25pdHRCYWtncnVubiA9ICh7IGFrdGl2dFV0c25pdHQsIHRpZHNsaW5qZXN0YXJ0LCB0aWRzbGluamVzbHV0dCwgZGlyZWN0aW9uLCB9KSA9PiB7XG4gICAgY29uc3Qgc3R5bGUgPSB1c2VQb3NpdGlvbkFuZFNpemUoe1xuICAgICAgICBwZXJpb2RlOiBha3RpdnRVdHNuaXR0LFxuICAgICAgICB0aWRzbGluamVzdGFydCxcbiAgICAgICAgdGlkc2xpbmplc2x1dHQsXG4gICAgICAgIGRpcmVjdGlvbixcbiAgICB9KTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQWt0aXZ0VXRzbml0dENvbnRhaW5lciwgeyBjbGFzc05hbWU6ICdha3RpdnRVdHNuaXR0Q29udGFpbmVyJyB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEFrdGl2UGVyaW9kZUJha2dydW5uLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lcygnYWt0aXZQZXJpb2RlQmFrZ3J1bm4nKSwgc3R5bGU6IHN0eWxlIH0pKSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QWt0aXZ0VXRzbml0dC5qcy5tYXAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBlclN5bmxpZyB9IGZyb20gJy4vZmlsdGVyLmpzJztcbmltcG9ydCB7IGhvcml6b250YWxQb3NpdGlvbkFuZFdpZHRoIH0gZnJvbSAnLi9jYWxjLmpzJztcbmltcG9ydCAnZGF5anMvbG9jYWxlL25iJztcbmltcG9ydCB7IEFHcmF5NjAwLCBBU3BhY2luZzQgfSBmcm9tICdAbmF2aWt0L2RzLXRva2Vucy9kaXN0L3Rva2Vucyc7XG5kYXlqcy5sb2NhbGUoJ25iJyk7XG5jb25zdCBmb3JtYXRlcnREYWcgPSAoZGF0bykgPT4gZGF0by5mb3JtYXQoJ0RELk1NJyk7XG5jb25zdCBmb3JtYXRlcnRNw6VuZWQgPSAoZGF0bykgPT4ge1xuICAgIGNvbnN0IG3DpW5lZExhYmVsID0gZGF0by5mb3JtYXQoJ01NTScpO1xuICAgIHJldHVybiBtw6VuZWRMYWJlbFswXS50b1VwcGVyQ2FzZSgpLmNvbmNhdChtw6VuZWRMYWJlbC5zbGljZSgxLCAzKSk7XG59O1xuY29uc3QgZm9ybWF0ZXJ0w4VyID0gKGRhdG8pID0+IGAke2RhdG8ueWVhcigpfWA7XG5leHBvcnQgY29uc3QgZGFnc2V0aWtldHRlciA9IChzdGFydCwgc2x1dHQsIHRvdGFsdEFudGFsbERhZ2VyLCBkaXJlY3Rpb24pID0+IHtcbiAgICBjb25zdCBpbmtyZW1lbnQgPSBNYXRoLmNlaWwodG90YWx0QW50YWxsRGFnZXIgLyAxMCk7XG4gICAgY29uc3Qgc2lzdGVEYWcgPSBzbHV0dC5zdGFydE9mKCdkYXknKTtcbiAgICByZXR1cm4gbmV3IEFycmF5KHRvdGFsdEFudGFsbERhZ2VyKVxuICAgICAgICAuZmlsbChzaXN0ZURhZylcbiAgICAgICAgLm1hcCgoZGVubmVEYWdlbiwgaSkgPT4ge1xuICAgICAgICBpZiAoaSAlIGlua3JlbWVudCAhPT0gMClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBkYWcgPSBkZW5uZURhZ2VuLnN1YnRyYWN0KGksICdkYXknKTtcbiAgICAgICAgY29uc3QgeyBob3Jpem9udGFsUG9zaXRpb24sIHdpZHRoIH0gPSBob3Jpem9udGFsUG9zaXRpb25BbmRXaWR0aChkYWcsIGRhZy5hZGQoMSwgJ2RheScpLCBzdGFydCwgc2x1dHQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb24sXG4gICAgICAgICAgICBob3Jpem9udGFsUG9zaXRpb246IGhvcml6b250YWxQb3NpdGlvbixcbiAgICAgICAgICAgIGxhYmVsOiBmb3JtYXRlcnREYWcoZGFnKSxcbiAgICAgICAgICAgIGRhdGU6IGRhZy50b0RhdGUoKSxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgfTtcbiAgICB9KVxuICAgICAgICAuZmlsdGVyKGV0aWtldHQgPT4gZXRpa2V0dCAhPT0gbnVsbCk7XG59O1xuZXhwb3J0IGNvbnN0IG3DpW5lZHNldGlrZXR0ZXIgPSAoc3RhcnQsIHNsdXR0LCBkaXJlY3Rpb24pID0+IHtcbiAgICBjb25zdCBzdGFydG3DpW5lZCA9IHN0YXJ0LnN0YXJ0T2YoJ21vbnRoJyk7XG4gICAgY29uc3Qgc2x1dHRtw6VuZWQgPSBzbHV0dC5lbmRPZignbW9udGgnKTtcbiAgICBjb25zdCBhbnRhbGxNw6VuZWRlciA9IHNsdXR0bcOlbmVkLmRpZmYoc3RhcnRtw6VuZWQsICdtb250aCcpICsgMTtcbiAgICByZXR1cm4gbmV3IEFycmF5KGFudGFsbE3DpW5lZGVyKS5maWxsKHN0YXJ0bcOlbmVkKS5tYXAoKGRlbm5lTcOlbmVkZW4sIGkpID0+IHtcbiAgICAgICAgY29uc3QgbcOlbmVkID0gZGVubmVNw6VuZWRlbi5hZGQoaSwgJ21vbnRoJyk7XG4gICAgICAgIGNvbnN0IHsgaG9yaXpvbnRhbFBvc2l0aW9uLCB3aWR0aCB9ID0gaG9yaXpvbnRhbFBvc2l0aW9uQW5kV2lkdGgobcOlbmVkLCBtw6VuZWQuYWRkKDEsICdtb250aCcpLCBzdGFydCwgc2x1dHQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb24sXG4gICAgICAgICAgICBob3Jpem9udGFsUG9zaXRpb246IGhvcml6b250YWxQb3NpdGlvbixcbiAgICAgICAgICAgIGxhYmVsOiBmb3JtYXRlcnRNw6VuZWQobcOlbmVkKSxcbiAgICAgICAgICAgIGRhdGU6IG3DpW5lZC50b0RhdGUoKSxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgfTtcbiAgICB9KTtcbn07XG5leHBvcnQgY29uc3Qgw6Vyc2V0aWtldHRlciA9IChzdGFydCwgc2x1dHQsIGRpcmVjdGlvbikgPT4ge1xuICAgIGNvbnN0IGbDuHJzdGXDhXIgPSBzdGFydC5zdGFydE9mKCd5ZWFyJyk7XG4gICAgY29uc3Qgc2lzdGXDhXIgPSBzbHV0dC5lbmRPZigneWVhcicpO1xuICAgIGNvbnN0IGFudGFsbMOFciA9IHNpc3Rlw4VyLmRpZmYoc3RhcnQsICd5ZWFyJykgKyAxO1xuICAgIHJldHVybiBuZXcgQXJyYXkoYW50YWxsw4VyKS5maWxsKGbDuHJzdGXDhXIpLm1hcCgoZGV0dGXDhXJldCwgaSkgPT4ge1xuICAgICAgICBjb25zdCDDpXIgPSBkZXR0ZcOFcmV0LmFkZChpLCAneWVhcicpO1xuICAgICAgICBjb25zdCB7IGhvcml6b250YWxQb3NpdGlvbiwgd2lkdGggfSA9IGhvcml6b250YWxQb3NpdGlvbkFuZFdpZHRoKMOlciwgw6VyLmFkZCgxLCAneWVhcicpLCBzdGFydCwgc2x1dHQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb24sXG4gICAgICAgICAgICBob3Jpem9udGFsUG9zaXRpb246IGhvcml6b250YWxQb3NpdGlvbixcbiAgICAgICAgICAgIGxhYmVsOiBmb3JtYXRlcnTDhXIow6VyKSxcbiAgICAgICAgICAgIGRhdGU6IMOlci50b0RhdGUoKSxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgfTtcbiAgICB9KTtcbn07XG5jb25zdCBheGlzTGFiZWxzID0gKHN0YXJ0LCBzbHV0dCwgZGlyZWN0aW9uKSA9PiB7XG4gICAgY29uc3QgdG90YWx0QW50YWxsRGFnZXIgPSBzbHV0dC5kaWZmKHN0YXJ0LCAnZGF5Jyk7XG4gICAgaWYgKHRvdGFsdEFudGFsbERhZ2VyIDwgNDApIHtcbiAgICAgICAgcmV0dXJuIGRhZ3NldGlrZXR0ZXIoc3RhcnQsIHNsdXR0LCB0b3RhbHRBbnRhbGxEYWdlciwgZGlyZWN0aW9uKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodG90YWx0QW50YWxsRGFnZXIgPCAzNzApIHtcbiAgICAgICAgcmV0dXJuIG3DpW5lZHNldGlrZXR0ZXIoc3RhcnQsIHNsdXR0LCBkaXJlY3Rpb24pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIMOlcnNldGlrZXR0ZXIoc3RhcnQsIHNsdXR0LCBkaXJlY3Rpb24pO1xuICAgIH1cbn07XG5jb25zdCBFdGlrZXR0ZXIgPSBzdHlsZWQuZGl2IGBcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxcmVtO1xuICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICAgIG1hcmdpbi1ib3R0b206ICR7QVNwYWNpbmc0fTtcblxuICAgID4gKiB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICAgIGNvbG9yOiAke0FHcmF5NjAwfTtcbiAgICB9XG5gO1xuZXhwb3J0IGNvbnN0IEF4aXNMYWJlbHMgPSAoeyBzdGFydCwgc2x1dHQsIGRpcmVjdGlvbiA9ICdsZWZ0JywgZXRpa2V0dFJlbmRlciwgfSkgPT4ge1xuICAgIGNvbnN0IGxhYmVscyA9IGF4aXNMYWJlbHMoc3RhcnQsIHNsdXR0LCBkaXJlY3Rpb24pLmZpbHRlcihlclN5bmxpZyk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEV0aWtldHRlciwgeyBjbGFzc05hbWU6IGNsYXNzTmFtZXMoJ2V0aWtldHRlcicpIH0sIGxhYmVscy5tYXAoZXRpa2V0dCA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsga2V5OiBldGlrZXR0LmxhYmVsLCBzdHlsZToge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogZGlyZWN0aW9uID09PSAnbGVmdCcgPyAnZmxleC1zdGFydCcgOiAnZmxleC1lbmQnLFxuICAgICAgICAgICAgICAgIFtkaXJlY3Rpb25dOiBgJHtldGlrZXR0Lmhvcml6b250YWxQb3NpdGlvbn0lYCxcbiAgICAgICAgICAgICAgICB3aWR0aDogYCR7ZXRpa2V0dC53aWR0aH0lYCxcbiAgICAgICAgICAgIH0gfSwgKF9hID0gZXRpa2V0dFJlbmRlciA9PT0gbnVsbCB8fCBldGlrZXR0UmVuZGVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBldGlrZXR0UmVuZGVyKGV0aWtldHQpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBldGlrZXR0LmxhYmVsKSk7XG4gICAgfSkpKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BeGlzTGFiZWxzLmpzLm1hcCIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcyc7XG5pbXBvcnQgeyBwb3NpdGlvbiB9IGZyb20gJy4vY2FsYy5qcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IFRvb2x0aXAgfSBmcm9tICcuL1Rvb2x0aXAuanMnO1xuaW1wb3J0IHsgQVJlZDUwMCB9IGZyb20gJ0BuYXZpa3QvZHMtdG9rZW5zL2Rpc3QvdG9rZW5zJztcbmNvbnN0IFN0eWxlZFRvb2x0aXAgPSBzdHlsZWQoVG9vbHRpcCkgYFxuICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgIHRvcDogLTEwcHg7XG5gO1xuY29uc3QgUGluVmlldyA9ICh7IHJlbmRlciB9KSA9PiB7XG4gICAgY29uc3QgW3Nob3dSZW5kZXIsIHNldFNob3dSZW5kZXJdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChQaW5TdHlsZSwgeyBjbGFzc05hbWU6ICdwaW4nLCBvbk1vdXNlT3ZlcjogKCkgPT4gc2V0U2hvd1JlbmRlcih0cnVlKSwgb25Nb3VzZUxlYXZlOiAoKSA9PiBzZXRTaG93UmVuZGVyKGZhbHNlKSB9LCBzaG93UmVuZGVyICYmIHJlbmRlciAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KFN0eWxlZFRvb2x0aXAsIHsgY2xhc3NOYW1lOiAndG9vbHRpcCcgfSwgcmVuZGVyKSkpO1xufTtcbmNvbnN0IFBpbnNTdHlsZSA9IHN0eWxlZC5kaXYgYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG5gO1xuY29uc3QgUGluU3R5bGUgPSBzdHlsZWQuZGl2IGBcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgKyAxMHB4KTtcbiAgICB0b3A6IC0yMnB4O1xuICAgIHdpZHRoOiAxcHg7XG4gICAgYmFja2dyb3VuZDogIzAwMDAwMDtcblxuICAgICY6YmVmb3JlIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB3aWR0aDogMThweDtcbiAgICAgICAgaGVpZ2h0OiAxOHB4O1xuICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICAgICAgICBib3JkZXI6IDZweCBzb2xpZCAke0FSZWQ1MDB9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC04LjVweCwgLTkuNXB4KTtcbiAgICB9XG5gO1xuY29uc3QgUGluQ29udGFpbmVyID0gc3R5bGVkLnNwYW4gYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBoZWlnaHQ6IDEwMCU7XG5gO1xuZXhwb3J0IGNvbnN0IFBpbnMgPSAoeyBwaW5zLCBzdGFydCwgc2x1dHQsIGRpcmVjdGlvbiB9KSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChQaW5zU3R5bGUsIHsgY2xhc3NOYW1lOiAncGlucycgfSwgcGlucy5tYXAoKHsgZGF0ZSwgcmVuZGVyIH0sIGkpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFBpbkNvbnRhaW5lciwgeyBrZXk6IGksIGNsYXNzTmFtZTogJ2NvbnRhaW5lcicsIHN0eWxlOiB7IFtkaXJlY3Rpb25dOiBgJHtwb3NpdGlvbihkYXlqcyhkYXRlKSwgc3RhcnQsIHNsdXR0KX0lYCB9IH0sXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChQaW5WaWV3LCB7IHJlbmRlcjogcmVuZGVyIH0pKSkpKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1QaW5zLmpzLm1hcCIsImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBBa3RpdnRVdHNuaXR0QmFrZ3J1bm4sIEFrdGl2dFV0c25pdHRCb3JkZXIgfSBmcm9tICcuL0FrdGl2dFV0c25pdHQuanMnO1xuaW1wb3J0IHsgQXhpc0xhYmVscyB9IGZyb20gJy4vQXhpc0xhYmVscy5qcyc7XG5pbXBvcnQgeyBFbXB0eVRpbWVsaW5lUm93LCBUaW1lbGluZVJvdyB9IGZyb20gJy4vVGltZWxpbmVSb3cuanMnO1xuaW1wb3J0IHsgdXNlU2VuZXN0ZURhdG8sIHVzZVRpZGxpZ3N0ZURhdG8sIHVzZVRpZHNsaW5qZXJhZGVyIH0gZnJvbSAnLi91c2VUaWRzbGluamVyYWRlci5qcyc7XG5pbXBvcnQgeyBQaW5zIH0gZnJvbSAnLi9QaW5zLmpzJztcbmltcG9ydCB7IEFTcGFjaW5nMywgQVNwYWNpbmc0IH0gZnJvbSAnQG5hdmlrdC9kcy10b2tlbnMvZGlzdC90b2tlbnMnO1xuY29uc3QgVGlkc2xpbmplU3R5bGUgPSBzdHlsZWQuZGl2IGBcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgcGFkZGluZzogJHtBU3BhY2luZzN9IDA7XG4gICAgbWFyZ2luOiAwICR7QVNwYWNpbmc0fTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZmxleDogMTtcbmA7XG5jb25zdCBUaWRzbGluamVSYWRTdHlsZSA9IHN0eWxlZC5kaXYgYFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGJvcmRlci10b3A6ICR7cHJvcHMgPT4gYCR7cHJvcHMuJGtvbXBha3QgPyAnbm9uZScgOiAnMXB4IHNvbGlkICNlN2U5ZTknfWB9O1xuXG4gICAgLnRpZHNsaW5qZXJhZC5mw7hyc3RlcmFkLFxuICAgIGhyLmbDuHJzdGVyYWQge1xuICAgICAgICBtYXJnaW4tdG9wOiAke3Byb3BzID0+IGAke3Byb3BzLiRrb21wYWt0ID8gJzByZW0nIDogJzEuNTZyZW0nfWB9O1xuICAgIH1cbmA7XG5jb25zdCBFbXB0eVJvd3NTdHlsZSA9IHN0eWxlZC5kaXYgYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG5gO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L2Rpc3BsYXktbmFtZVxuY29uc3QgVGltZWxpbmUgPSBSZWFjdC5tZW1vKCh7IHBpbnMsIHJvd3MsIHN0YXJ0LCBlbmRJbmNsdXNpdmUsIG9uU2VsZWN0UGVyaW9kLCBha3RpdnRVdHNuaXR0LCBhY3RpdmVSb3csIGRpcmVjdGlvbiwgYXhpc0xhYmVsUmVuZGVyZXIsIGtvbXBha3QgPSBmYWxzZSwgfSkgPT4ge1xuICAgIGNvbnN0IG9uU2VsZWN0UGVyaW9kZVdyYXBwZXIgPSBvblNlbGVjdFBlcmlvZCAmJlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvcnVsZXMtb2YtaG9va3NcbiAgICAgICAgdXNlQ2FsbGJhY2soKHBlcmlvZGUpID0+IHtcbiAgICAgICAgICAgIG9uU2VsZWN0UGVyaW9kID09PSBudWxsIHx8IG9uU2VsZWN0UGVyaW9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvblNlbGVjdFBlcmlvZCh7XG4gICAgICAgICAgICAgICAgaWQ6IHBlcmlvZGUuaWQsXG4gICAgICAgICAgICAgICAgZm9tOiBwZXJpb2RlLnN0YXJ0LnRvRGF0ZSgpLFxuICAgICAgICAgICAgICAgIHRvbTogcGVyaW9kZS5lbmRJbmNsdXNpdmUudG9EYXRlKCksXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHBlcmlvZGUuZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBwZXJpb2RlLnN0YXR1cyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBbb25TZWxlY3RQZXJpb2RdKTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGlkc2xpbmplU3R5bGUsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWVzKCd0aWRzbGluamUnKSB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEF4aXNMYWJlbHMsIHsgc3RhcnQ6IHN0YXJ0LCBzbHV0dDogZW5kSW5jbHVzaXZlLCBkaXJlY3Rpb246IGRpcmVjdGlvbiwgZXRpa2V0dFJlbmRlcjogYXhpc0xhYmVsUmVuZGVyZXIgfSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGlkc2xpbmplUmFkU3R5bGUsIHsgXCIka29tcGFrdFwiOiBrb21wYWt0LCBjbGFzc05hbWU6IGNsYXNzTmFtZXMoJ3RpZHNsaW5qZXJhZGVyJykgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRW1wdHlSb3dzU3R5bGUsIG51bGwsIHJvd3MubWFwKChfLCBpKSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChFbXB0eVRpbWVsaW5lUm93LCB7IGtvbXBha3Q6IGtvbXBha3QsIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhpID09PSAwICYmICdmw7hyc3RlcmFkJyksIGtleTogaSwgYWN0aXZlOiBpID09PSBhY3RpdmVSb3cgfSkpKSksXG4gICAgICAgICAgICBwaW5zICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KFBpbnMsIHsgcGluczogcGlucywgc3RhcnQ6IHN0YXJ0LCBzbHV0dDogZW5kSW5jbHVzaXZlLCBkaXJlY3Rpb246IGRpcmVjdGlvbiB9KSksXG4gICAgICAgICAgICBha3RpdnRVdHNuaXR0ICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KEFrdGl2dFV0c25pdHRCYWtncnVubiwgeyB0aWRzbGluamVzdGFydDogc3RhcnQsIHRpZHNsaW5qZXNsdXR0OiBlbmRJbmNsdXNpdmUsIGFrdGl2dFV0c25pdHQ6IGFrdGl2dFV0c25pdHQsIGRpcmVjdGlvbjogZGlyZWN0aW9uIH0pKSxcbiAgICAgICAgICAgIHJvd3MubWFwKCh0aWRzbGluamUsIGkpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFRpbWVsaW5lUm93LCBPYmplY3QuYXNzaWduKHsga2V5OiB0aWRzbGluamUuaWQsIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhpID09PSAwICYmICdmw7hyc3RlcmFkJykgfSwgdGlkc2xpbmplLCB7IG9uU2VsZWN0UGVyaW9kOiBvblNlbGVjdFBlcmlvZGVXcmFwcGVyLCBhY3RpdmU6IGkgPT09IGFjdGl2ZVJvdywga29tcGFrdDoga29tcGFrdCB9KSkpKSxcbiAgICAgICAgICAgIGFrdGl2dFV0c25pdHQgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQWt0aXZ0VXRzbml0dEJvcmRlciwgeyB0aWRzbGluamVzdGFydDogc3RhcnQsIHRpZHNsaW5qZXNsdXR0OiBlbmRJbmNsdXNpdmUsIGFrdGl2dFV0c25pdHQ6IGFrdGl2dFV0c25pdHQsIGRpcmVjdGlvbjogZGlyZWN0aW9uIH0pKSkpKTtcbn0pO1xuLyoqXG4gKiBWaXNlciBwZXJpb2RlciBpIGVuIHRpZHNsaW5qZS5cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L2Rpc3BsYXktbmFtZVxuZXhwb3J0IGNvbnN0IFRpZHNsaW5qZSA9IFJlYWN0Lm1lbW8oKHsgcGlucywgcmFkZXIsIGFrdGl2UmFkLCBzdGFydERhdG8sIHNsdXR0RGF0bywgZXRpa2V0dFJlbmRlciwgb25TZWxlY3RQZXJpb2RlLCBha3RpdnRVdHNuaXR0LCByZXRuaW5nID0gJ3N0aWdlbmRlJywga29tcGFrdCA9IGZhbHNlLCB9KSA9PiB7XG4gICAgaWYgKCFyYWRlcilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaWRzbGluamVuIG1hbmdsZXIgcmFkZXIuJyk7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gcmV0bmluZyA9PT0gJ3N0aWdlbmRlJyA/ICdsZWZ0JyA6ICdyaWdodCc7XG4gICAgY29uc3Qgc3RhcnQgPSB1c2VUaWRsaWdzdGVEYXRvKHsgc3RhcnREYXRvLCByYWRlciB9KS5zdGFydE9mKCdkYXknKTtcbiAgICBjb25zdCBlbmRJbmNsdXNpdmUgPSB1c2VTZW5lc3RlRGF0byh7IHNsdXR0RGF0bywgcmFkZXIgfSkuZW5kT2YoJ2RheScpO1xuICAgIGNvbnN0IHJvd3MgPSB1c2VUaWRzbGluamVyYWRlcihyYWRlciwgc3RhcnQsIGVuZEluY2x1c2l2ZSwgZGlyZWN0aW9uKTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGltZWxpbmUsIHsgcm93czogcm93cywgc3RhcnQ6IHN0YXJ0LCBhY3RpdmVSb3c6IGFrdGl2UmFkLCBkaXJlY3Rpb246IGRpcmVjdGlvbiwgZW5kSW5jbHVzaXZlOiBlbmRJbmNsdXNpdmUsIG9uU2VsZWN0UGVyaW9kOiBvblNlbGVjdFBlcmlvZGUsIGFrdGl2dFV0c25pdHQ6IGFrdGl2dFV0c25pdHQsIGF4aXNMYWJlbFJlbmRlcmVyOiBldGlrZXR0UmVuZGVyLCBwaW5zOiBwaW5zLCBrb21wYWt0OiBrb21wYWt0IH0pKTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGlkc2xpbmplLmpzLm1hcCIsImltcG9ydCBSZWFjdCwgeyB1c2VMYXlvdXRFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUsIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBUb29sdGlwIH0gZnJvbSAnLi9Ub29sdGlwLmpzJztcbmltcG9ydCBzdHlsZWQsIHsgY3NzIH0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuY29uc3QgZmVsbGVzUGVyaW9kZVN0eWxlID0gY3NzIGBcbiAgICBiYWNrZ3JvdW5kOiAjZTdlOWU5O1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNTk1MTRiO1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjNTk1MTRiO1xuXG4gICAgYm9yZGVyLXJhZGl1czogMS41cmVtO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDAuMXMgZWFzZTtcbiAgICBwYWRkaW5nOiAwO1xuXG4gICAgJi5taW5pIHtcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG4gICAgfVxuICAgICYubWluaTpiZWZvcmUge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgICYuYWR2YXJzZWwge1xuICAgICAgICBiYWNrZ3JvdW5kOiAjZmZlOWNjO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZmY5MTAwO1xuICAgIH1cblxuICAgICYuZmVpbCB7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmMWQ4ZDQ7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNiYTNhMjY7XG4gICAgfVxuXG4gICAgJi5pbmFrdGl2IHtcbiAgICAgICAgYmFja2dyb3VuZDogI2U3ZTllOTtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgIzc4NzA2YTtcbiAgICB9XG5cbiAgICAmLnN1a3Nlc3Mge1xuICAgICAgICBiYWNrZ3JvdW5kOiAjY2RlN2Q4O1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjMTE3OTM4O1xuICAgIH1cblxuICAgICYuc2FtbWVuaGVuZ2VuZGVGcmFIw7h5cmUge1xuICAgICAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMDtcbiAgICAgICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDA7XG4gICAgfVxuXG4gICAgJi5zYW1tZW5oZW5nZW5kZUZyYVZlbnN0cmUge1xuICAgICAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwO1xuICAgICAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwO1xuICAgIH1cblxuICAgICYuc2FtbWVuaGVuZ2VuZGVGcmFCZWdnZSB7XG4gICAgICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwO1xuICAgICAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDtcbiAgICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMDtcbiAgICB9XG5cbiAgICAmLmNyb3BwZWRIw7h5cmUge1xuICAgICAgICBib3JkZXItcmlnaHQ6IG5vbmU7XG4gICAgfVxuXG4gICAgJi5jcm9wcGVkVmVuc3RyZSB7XG4gICAgICAgIGJvcmRlci1sZWZ0OiBub25lO1xuICAgIH1cblxuICAgICYuY3JvcHBlZEJlZ2dlIHtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IG5vbmU7XG4gICAgICAgIGJvcmRlci1yaWdodDogbm9uZTtcbiAgICB9XG5gO1xuY29uc3QgSW5mb1BpbiA9IHN0eWxlZC5kaXYgYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBiYWNrZ3JvdW5kOiAjMDA2N2M1O1xuICAgIGhlaWdodDogNnB4O1xuICAgIHdpZHRoOiAycHg7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMXB4LCAtN3B4KTtcblxuICAgICY6YmVmb3JlIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB3aWR0aDogMTBweDtcbiAgICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kOiAjMDA2N2M1O1xuICAgICAgICB0cmFuc2Zvcm06ICR7cHJvcHMgPT4gYHRyYW5zbGF0ZSgtJHtwcm9wcy4kcMOlUGVyaW9kZUtuYXBwID8gNSA6IDR9cHgsIC0xMDAlKWB9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgfVxuYDtcbmNvbnN0IFBlcmlvZGVJbm5ob2xkID0gc3R5bGVkLmRpdiBgXG4gICAgbWFyZ2luOiAke3Byb3BzID0+IGAke3Byb3BzLiRrb21wYWt0ID8gMCA6IDAuM31yZW0gMC4zcmVtYH07XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIHRleHQtb3ZlcmZsb3c6IGNsaXA7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdG9wOiAke3Byb3BzID0+IGAke3Byb3BzLiRrb21wYWt0ID8gMCA6IC0yfXB4YH07XG5gO1xuY29uc3QgUGVyaW9kZUtuYXBwID0gc3R5bGVkLmJ1dHRvbiBgXG4gICAgaGVpZ2h0OiAke3Byb3BzID0+IGAke3Byb3BzLiRrb21wYWt0ID8gMS41IDogMn1yZW1gfTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAmLmFkdmFyc2VsIHtcbiAgICAgICAgJjpob3ZlcixcbiAgICAgICAgJi5hY3RpdmUsXG4gICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZlZDdhMztcbiAgICAgICAgfVxuICAgIH1cblxuICAgICYuZmVpbCB7XG4gICAgICAgICY6aG92ZXIsXG4gICAgICAgICYuYWN0aXZlLFxuICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNlM2IwYTg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAmLmluYWt0aXYge1xuICAgICAgICAmOmhvdmVyLFxuICAgICAgICAmLmFjdGl2ZSxcbiAgICAgICAgJjpmb2N1cyB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjYzNjM2MzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJi5zdWtzZXNzIHtcbiAgICAgICAgJjpob3ZlcixcbiAgICAgICAgJi5hY3RpdmUsXG4gICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogIzliZDBiMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAke2ZlbGxlc1BlcmlvZGVTdHlsZX1cbmA7XG5jb25zdCBQZXJpb2RlRGl2ID0gc3R5bGVkLmRpdiBgXG4gICAgaGVpZ2h0OiAke3Byb3BzID0+IGAke3Byb3BzLiRrb21wYWt0ID8gMS41IDogMn1yZW1gfTtcbiAgICAke2ZlbGxlc1BlcmlvZGVTdHlsZX1cbmA7XG5jb25zdCBhcmlhTGFiZWwgPSAocGVyaW9kKSA9PiB7XG4gICAgY29uc3Qgc3RhcnQgPSBwZXJpb2Quc3RhcnQuZm9ybWF0KCdERC5NTS5ZWVlZJyk7XG4gICAgY29uc3QgZW5kID0gcGVyaW9kLmVuZEluY2x1c2l2ZS5mb3JtYXQoJ0RELk1NLllZWVknKTtcbiAgICByZXR1cm4gYCR7cGVyaW9kLnN0YXR1c30gZnJhICR7c3RhcnR9IHRpbCBvZyBtZWQgJHtlbmR9YDtcbn07XG5jb25zdCBzdHlsZSA9IChwZXJpb2QpID0+ICh7XG4gICAgW3BlcmlvZC5kaXJlY3Rpb25dOiBgJHtwZXJpb2QuaG9yaXpvbnRhbFBvc2l0aW9ufSVgLFxuICAgIHdpZHRoOiBgJHtwZXJpb2Qud2lkdGh9JWAsXG59KTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9kaXNwbGF5LW5hbWVcbmNvbnN0IENsaWNrYWJsZVBlcmlvZCA9IFJlYWN0Lm1lbW8oKHsgYnV0dG9uUmVmLCBwZXJpb2QsIGNsYXNzTmFtZSwgb25TZWxlY3RQZXJpb2QsIGtvbXBha3QgfSkgPT4ge1xuICAgIGNvbnN0IFtzaG93SG92ZXJMYWJlbCwgc2V0U2hvd0hvdmVyTGFiZWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGlmICghcGVyaW9kLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBvblNlbGVjdFBlcmlvZCA9PT0gbnVsbCB8fCBvblNlbGVjdFBlcmlvZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogb25TZWxlY3RQZXJpb2QocGVyaW9kKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZW5hYmxlSG92ZXJMYWJlbCA9ICgpID0+IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVudXNlZC1leHByZXNzaW9uXG4gICAgICAgIHBlcmlvZC5ob3ZlckxhYmVsICYmIHNldFNob3dIb3ZlckxhYmVsKHRydWUpO1xuICAgIH07XG4gICAgY29uc3QgZGlzYWJsZUhvdmVyTGFiZWwgPSAoKSA9PiB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnVzZWQtZXhwcmVzc2lvblxuICAgICAgICBwZXJpb2QuaG92ZXJMYWJlbCAmJiBzZXRTaG93SG92ZXJMYWJlbChmYWxzZSk7XG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGVyaW9kZUtuYXBwLCB7IFwiJGtvbXBha3RcIjoga29tcGFrdCwgcmVmOiBidXR0b25SZWYsIGNsYXNzTmFtZTogY2xhc3NOYW1lLCBvbkNsaWNrOiBvbkNsaWNrLCBvbk1vdXNlRW50ZXI6IGVuYWJsZUhvdmVyTGFiZWwsIG9uTW91c2VMZWF2ZTogZGlzYWJsZUhvdmVyTGFiZWwsIFwiYXJpYS1sYWJlbFwiOiBhcmlhTGFiZWwocGVyaW9kKSwgc3R5bGU6IHN0eWxlKHBlcmlvZCkgfSxcbiAgICAgICAgcGVyaW9kLmhvdmVyTGFiZWwgJiYgc2hvd0hvdmVyTGFiZWwgJiYgUmVhY3QuY3JlYXRlRWxlbWVudChUb29sdGlwLCBudWxsLCBwZXJpb2QuaG92ZXJMYWJlbCksXG4gICAgICAgIHBlcmlvZC5pbmZvUGluICYmIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5mb1BpbiwgeyBcIiRwXFx1MDBFNVBlcmlvZGVLbmFwcFwiOiB0cnVlLCBjbGFzc05hbWU6ICdpbmZvUGluJyB9KSxcbiAgICAgICAgcGVyaW9kLmNoaWxkcmVuICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KFBlcmlvZGVJbm5ob2xkLCB7IFwiJGtvbXBha3RcIjoga29tcGFrdCB9LCBwZXJpb2QuY2hpbGRyZW4pKSkpO1xufSk7XG5jb25zdCBOb25DbGlja2FibGVQZXJpb2QgPSAoeyBkaXZSZWYsIHBlcmlvZCwgY2xhc3NOYW1lLCBrb21wYWt0IH0pID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFBlcmlvZGVEaXYsIHsgXCIka29tcGFrdFwiOiBrb21wYWt0LCByZWY6IGRpdlJlZiwgY2xhc3NOYW1lOiBjbGFzc05hbWUsIFwiYXJpYS1sYWJlbFwiOiBhcmlhTGFiZWwocGVyaW9kKSwgc3R5bGU6IHN0eWxlKHBlcmlvZCkgfSxcbiAgICBwZXJpb2QuaW5mb1BpbiAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KEluZm9QaW4sIHsgY2xhc3NOYW1lOiAnaW5mb1BpbicgfSksXG4gICAgcGVyaW9kLmNoaWxkcmVuICYmIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGVyaW9kZUlubmhvbGQsIHsgXCIka29tcGFrdFwiOiBrb21wYWt0IH0sIHBlcmlvZC5jaGlsZHJlbikpKTtcbmNvbnN0IGZpbm5DbGFzc25hbWVzID0gKHBlcmlvZCwgYWN0aXZlLCBpc01pbmkpID0+IHtcbiAgICBjb25zdCBuZXdDbGFzc05hbWVzID0gW107XG4gICAgc3dpdGNoIChwZXJpb2QuY3JvcHBlZCkge1xuICAgICAgICBjYXNlICdib3RoJzpcbiAgICAgICAgICAgIG5ld0NsYXNzTmFtZXMucHVzaCgnY3JvcHBlZEJlZ2dlJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICBpZiAocGVyaW9kLmRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgbmV3Q2xhc3NOYW1lcy5wdXNoKCdjcm9wcGVkVmVuc3RyZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3Q2xhc3NOYW1lcy5wdXNoKCdjcm9wcGVkSMO4eXJlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgaWYgKHBlcmlvZC5kaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgIG5ld0NsYXNzTmFtZXMucHVzaCgnY3JvcHBlZEjDuHlyZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3Q2xhc3NOYW1lcy5wdXNoKCdjcm9wcGVkVmVuc3RyZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgc3dpdGNoIChwZXJpb2QuY29ubmVjdGluZ0VkZ2UpIHtcbiAgICAgICAgY2FzZSAnYm90aCc6XG4gICAgICAgICAgICBuZXdDbGFzc05hbWVzLnB1c2goJ3NhbW1lbmhlbmdlbmRlRnJhQmVnZ2UnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgIGlmIChwZXJpb2QuZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICBuZXdDbGFzc05hbWVzLnB1c2goJ3NhbW1lbmhlbmdlbmRlRnJhVmVuc3RyZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3Q2xhc3NOYW1lcy5wdXNoKCdzYW1tZW5oZW5nZW5kZUZyYUjDuHlyZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgIGlmIChwZXJpb2QuZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICBuZXdDbGFzc05hbWVzLnB1c2goJ3NhbW1lbmhlbmdlbmRlRnJhSMO4eXJlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdDbGFzc05hbWVzLnB1c2goJ3NhbW1lbmhlbmdlbmRlRnJhVmVuc3RyZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICBuZXdDbGFzc05hbWVzLnB1c2goJ2FjdGl2ZScpO1xuICAgIH1cbiAgICBpZiAoaXNNaW5pKSB7XG4gICAgICAgIG5ld0NsYXNzTmFtZXMucHVzaCgnbWluaScpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3Q2xhc3NOYW1lcztcbn07XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QvZGlzcGxheS1uYW1lXG5leHBvcnQgY29uc3QgVGltZWxpbmVQZXJpb2QgPSBSZWFjdC5tZW1vKCh7IHBlcmlvZCwgb25TZWxlY3RQZXJpb2QsIGFjdGl2ZSwga29tcGFrdCB9KSA9PiB7XG4gICAgY29uc3QgcmVmID0gdXNlUmVmKG51bGwpO1xuICAgIGNvbnN0IFtpc01pbmksIHNldElzTWluaV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gY2xhc3NOYW1lcygncGVyaW9kZScsIGZpbm5DbGFzc25hbWVzKHBlcmlvZCwgYWN0aXZlLCBpc01pbmkpLCBwZXJpb2Quc3RhdHVzLCBwZXJpb2QuY2xhc3NOYW1lKTtcbiAgICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRXaWR0aCA9IChfYSA9IHJlZi5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub2Zmc2V0V2lkdGg7XG4gICAgICAgIGlmIChjdXJyZW50V2lkdGggJiYgY3VycmVudFdpZHRoIDwgMzApIHtcbiAgICAgICAgICAgIHNldElzTWluaSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG4gICAgfSwgW3JlZi5jdXJyZW50XSk7XG4gICAgcmV0dXJuIG9uU2VsZWN0UGVyaW9kID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ2xpY2thYmxlUGVyaW9kLCB7IGJ1dHRvblJlZjogcmVmLCBwZXJpb2Q6IHBlcmlvZCwgb25TZWxlY3RQZXJpb2Q6IG9uU2VsZWN0UGVyaW9kLCBjbGFzc05hbWU6IGNsYXNzTmFtZSwga29tcGFrdDoga29tcGFrdCB9KSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChOb25DbGlja2FibGVQZXJpb2QsIHsgZGl2UmVmOiByZWYsIHBlcmlvZDogcGVyaW9kLCBjbGFzc05hbWU6IGNsYXNzTmFtZSwga29tcGFrdDoga29tcGFrdCB9KSk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRpbWVsaW5lUGVyaW9kLmpzLm1hcCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgVGltZWxpbmVQZXJpb2QgfSBmcm9tICcuL1RpbWVsaW5lUGVyaW9kLmpzJztcbmltcG9ydCB7IEFCbHVlNTAsIEFHcmF5NTAsIEFTcGFjaW5nNCwgQVNwYWNpbmc2LCBBU3BhY2luZzggfSBmcm9tICdAbmF2aWt0L2RzLXRva2Vucy9kaXN0L3Rva2Vucyc7XG5jb25zdCBUaW1lbGluZVJvd1N0eWxlID0gc3R5bGVkLmRpdiBgXG4gICAgZmxleDogMTtcbiAgICBoZWlnaHQ6ICR7cHJvcHMgPT4gYCR7cHJvcHMuJGtvbXBha3QgPyBBU3BhY2luZzYgOiBBU3BhY2luZzh9YH07XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXJnaW4tYm90dG9tOiAke3Byb3BzID0+IGAke3Byb3BzLiRrb21wYWt0ID8gQVNwYWNpbmc0IDogQVNwYWNpbmc2fWB9O1xuYDtcbmNvbnN0IEVtcHR5Um93SHIgPSBzdHlsZWQuaHIgYFxuICAgIGZsZXg6IDE7XG4gICAgaGVpZ2h0OiAke3Byb3BzID0+IGAke3Byb3BzLiRrb21wYWt0ID8gQVNwYWNpbmc2IDogQVNwYWNpbmc4fWB9O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke0FHcmF5NTB9O1xuICAgIG1hcmdpbi1ib3R0b206ICR7cHJvcHMgPT4gYCR7cHJvcHMuJGtvbXBha3QgPyBBU3BhY2luZzQgOiBBU3BhY2luZzZ9YH07XG5cbiAgICAmLmFrdGl2UmFkIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtBQmx1ZTUwfTtcbiAgICB9XG5gO1xuZXhwb3J0IGNvbnN0IEVtcHR5VGltZWxpbmVSb3cgPSAoeyBhY3RpdmUgPSBmYWxzZSwga29tcGFrdCA9IGZhbHNlLCBjbGFzc05hbWUsIH0pID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KEVtcHR5Um93SHIsIHsgXCIka29tcGFrdFwiOiBrb21wYWt0LCBjbGFzc05hbWU6IGNsYXNzTmFtZXMoYWN0aXZlICYmICdha3RpdlJhZCcsIGNsYXNzTmFtZSkgfSkpO1xuZXhwb3J0IGNvbnN0IFRpbWVsaW5lUm93ID0gKHsgcGVyaW9kcywgb25TZWxlY3RQZXJpb2QsIGFjdGl2ZSA9IGZhbHNlLCBrb21wYWt0ID0gZmFsc2UsIGNsYXNzTmFtZSwgfSkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGltZWxpbmVSb3dTdHlsZSwgeyBcIiRrb21wYWt0XCI6IGtvbXBha3QsIGNsYXNzTmFtZTogY2xhc3NOYW1lcygndGlkc2xpbmplcmFkJywgYWN0aXZlICYmICdha3RpdlJhZCcsIGNsYXNzTmFtZSkgfSwgcGVyaW9kcy5tYXAocGVyaW9kID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFRpbWVsaW5lUGVyaW9kLCB7IGtleTogcGVyaW9kLmlkLCBwZXJpb2Q6IHBlcmlvZCwgb25TZWxlY3RQZXJpb2Q6IG9uU2VsZWN0UGVyaW9kLCBhY3RpdmU6IHBlcmlvZC5hY3RpdmUsIGtvbXBha3Q6IGtvbXBha3QgfSkpKSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGltZWxpbmVSb3cuanMubWFwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBBR3JheTQwMCwgQUdyYXk2MDAsIEFHcmF5ODAwLCBBU3BhY2luZzIsIEFTcGFjaW5nNCB9IGZyb20gJ0BuYXZpa3QvZHMtdG9rZW5zL2Rpc3QvdG9rZW5zJztcbmNvbnN0IFRvb2x0aXBDb250YWluZXIgPSBzdHlsZWQuZGl2IGBcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcGFkZGluZzogJHtBU3BhY2luZzJ9ICR7QVNwYWNpbmc0fTtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAke0FHcmF5NjAwfTtcbiAgICBjb2xvcjogJHtBR3JheTgwMH07XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWShjYWxjKC0xMDAlIC0gMTBweCkpO1xuICAgIGJveC1zaGFkb3c6IDAgMnB4IDJweCAwICR7QUdyYXk0MDB9O1xuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMC4wNXM7XG4gICAgYW5pbWF0aW9uLW5hbWU6IGZhZGVJbjtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgei1pbmRleDogMTAwMDtcblxuICAgICY6YmVmb3JlIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDEwcHg7XG4gICAgICAgIGhlaWdodDogMTBweDtcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgICAgICAgbGVmdDogNTAlO1xuICAgICAgICBib3R0b206IC0xcHg7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke0FHcmF5NjAwfTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgJHtBR3JheTYwMH07XG4gICAgICAgIGJveC1zaGFkb3c6IDJweCAycHggMnB4ICR7QUdyYXk0MDB9O1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSg1MCUpIHJvdGF0ZSg0NWRlZyk7XG4gICAgfVxuXG4gICAgJjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEycHg7XG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3R0b206IC0xMnB4O1xuICAgICAgICBsZWZ0OiAwO1xuICAgIH1cbmA7XG5leHBvcnQgY29uc3QgVG9vbHRpcCA9ICh7IGNoaWxkcmVuLCBjbGFzc05hbWUgfSkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVG9vbHRpcENvbnRhaW5lciwgeyBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lKSB9LCBjaGlsZHJlbikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VG9vbHRpcC5qcy5tYXAiLCJpbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnO1xuaW1wb3J0IGlzU2FtZU9yQmVmb3JlIGZyb20gJ2RheWpzL3BsdWdpbi9pc1NhbWVPckJlZm9yZSc7XG5pbXBvcnQgaXNTYW1lT3JBZnRlciBmcm9tICdkYXlqcy9wbHVnaW4vaXNTYW1lT3JBZnRlcic7XG5kYXlqcy5leHRlbmQoaXNTYW1lT3JCZWZvcmUpO1xuZGF5anMuZXh0ZW5kKGlzU2FtZU9yQWZ0ZXIpO1xuZXhwb3J0IGNvbnN0IHBvc2l0aW9uID0gKGRhdGUsIHN0YXJ0LCBlbmRJbmNsdXNpdmUpID0+IHtcbiAgICBjb25zdCBkaWZmID0gZW5kSW5jbHVzaXZlLmRpZmYoc3RhcnQpO1xuICAgIHJldHVybiAoZGF0ZS5kaWZmKHN0YXJ0KSAvIGRpZmYpICogMTAwO1xufTtcbmV4cG9ydCBjb25zdCBob3Jpem9udGFsUG9zaXRpb25BbmRXaWR0aCA9IChzdGFydCwgZW5kSW5jbHVzaXZlLCB0aW1lbGluZVN0YXJ0LCB0aW1lbGluZUVuZEluY2x1c2l2ZSkgPT4ge1xuICAgIGNvbnN0IGhvcml6b250YWxQb3NpdGlvbiA9IHBvc2l0aW9uKHN0YXJ0LCB0aW1lbGluZVN0YXJ0LCB0aW1lbGluZUVuZEluY2x1c2l2ZSk7XG4gICAgY29uc3Qgd2lkdGggPSBwb3NpdGlvbihlbmRJbmNsdXNpdmUsIHRpbWVsaW5lU3RhcnQsIHRpbWVsaW5lRW5kSW5jbHVzaXZlKSAtIGhvcml6b250YWxQb3NpdGlvbjtcbiAgICByZXR1cm4ge1xuICAgICAgICBob3Jpem9udGFsUG9zaXRpb246IGhvcml6b250YWxQb3NpdGlvbixcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgIH07XG59O1xuZXhwb3J0IGNvbnN0IGlzT3V0T2ZCb3VuZHMgPSAocG9zaXRpb24sIHdpZHRoKSA9PiBwb3NpdGlvbiA+PSAxMDAgfHwgcG9zaXRpb24gKyB3aWR0aCA8IDA7XG5leHBvcnQgY29uc3QgYnJlZGRlTWVsbG9tRGF0b2VyID0gKHN0YXJ0LCBzbHV0dCwgdG90YWx0QW50YWxsRGF0b2VyKSA9PiB7XG4gICAgY29uc3QgZGFnZXJNZWxsb21EYXRvZXIgPSBzbHV0dC5kaWZmKHN0YXJ0LCAnbWludXRlJykgLyA2MCAvIDI0O1xuICAgIHJldHVybiAoZGFnZXJNZWxsb21EYXRvZXIgLyB0b3RhbHRBbnRhbGxEYXRvZXIpICogMTAwO1xufTtcbmV4cG9ydCBjb25zdCBlckxpa2UgPSAocDEsIHAyKSA9PiBwMiAmJiBwMS5zdGFydC5pc1NhbWUocDIuc3RhcnQpICYmIHAxLmVuZEluY2x1c2l2ZS5pc1NhbWUocDIuZW5kSW5jbHVzaXZlKTtcbmV4cG9ydCBjb25zdCBlckRlbEF2ID0gKHAxLCBwMikgPT4gcDIgJiYgcDEuc3RhcnQuaXNCZWZvcmUocDIuc3RhcnQpICYmIHAxLmVuZEluY2x1c2l2ZS5pc0FmdGVyKHAyLmVuZEluY2x1c2l2ZSk7XG5leHBvcnQgY29uc3Qgb3ZlcmxhcHBlciA9IChwMSwgcDIpID0+IHAyICYmIHAxLnN0YXJ0LmlzU2FtZU9yQmVmb3JlKHAyLnN0YXJ0KSAmJiBwMS5lbmRJbmNsdXNpdmUuaXNTYW1lT3JBZnRlcihwMi5lbmRJbmNsdXNpdmUpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2FsYy5qcy5tYXAiLCJleHBvcnQgY29uc3QgZXJTeW5saWcgPSAoeyBob3Jpem9udGFsUG9zaXRpb24gfSkgPT4gaG9yaXpvbnRhbFBvc2l0aW9uIDw9IDEwMCAmJiBob3Jpem9udGFsUG9zaXRpb24gPj0gMDtcbmV4cG9ydCBjb25zdCBpbm5lbkV0RMO4Z24gPSAoZGF0bzEsIGRhdG8yKSA9PiBNYXRoLmFicyhkYXRvMS5kaWZmKGRhdG8yLCAnZGF5JykpIDw9IDE7XG5leHBvcnQgY29uc3QgaW52aXNpYmxlUGVyaW9kcyA9ICh7IGhvcml6b250YWxQb3NpdGlvbiwgd2lkdGggfSkgPT4gaG9yaXpvbnRhbFBvc2l0aW9uID49IDAgJiYgaG9yaXpvbnRhbFBvc2l0aW9uIDw9IDEwMCAmJiB3aWR0aCA+IDA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1maWx0ZXIuanMubWFwIiwiZXhwb3J0IGNvbnN0IHNpc3RlRGF0byA9IChhLCBiKSA9PiBiLmRpZmYoYSk7XG5leHBvcnQgY29uc3Qgc2lzdGVQZXJpb2RlID0gKGEsIGIpID0+IGEuaG9yaXpvbnRhbFBvc2l0aW9uIC0gYi5ob3Jpem9udGFsUG9zaXRpb247XG5leHBvcnQgY29uc3Qgc2lzdGVFbmtsZVBlcmlvZGUgPSAoYSwgYikgPT4gYi5lbmRJbmNsdXNpdmUuZGlmZihhLmVuZEluY2x1c2l2ZSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zb3J0LmpzLm1hcCIsImltcG9ydCBkYXlqcyBmcm9tICdkYXlqcyc7XG5pbXBvcnQgeyBob3Jpem9udGFsUG9zaXRpb25BbmRXaWR0aCB9IGZyb20gJy4vY2FsYy5qcyc7XG5jb25zdCBjb25zdHJhaW4gPSAodmFsdWUsIG1pbiwgbWF4KSA9PiB2YWx1ZSA+PSBtYXggPyBtYXggOiB2YWx1ZSA8IG1pbiA/IG1pbiA6IHZhbHVlO1xuZXhwb3J0IGNvbnN0IHVzZVBvc2l0aW9uQW5kU2l6ZSA9ICh7IHBlcmlvZGUsIHRpZHNsaW5qZXN0YXJ0LCB0aWRzbGluamVzbHV0dCwgZGlyZWN0aW9uLCB9KSA9PiB7XG4gICAgY29uc3QgZm9tID0gZGF5anMocGVyaW9kZS5mb20pLnN0YXJ0T2YoJ2RheScpO1xuICAgIGNvbnN0IHRvbSA9IGRheWpzKHBlcmlvZGUudG9tKS5lbmRPZignZGF5Jyk7XG4gICAgY29uc3QgeyBob3Jpem9udGFsUG9zaXRpb24sIHdpZHRoIH0gPSBob3Jpem9udGFsUG9zaXRpb25BbmRXaWR0aChmb20sIHRvbSwgdGlkc2xpbmplc3RhcnQsIHRpZHNsaW5qZXNsdXR0KTtcbiAgICBjb25zdCBhZGp1c3RlZEhvcml6b250YWxQb3NpdGlvbiA9IGNvbnN0cmFpbihob3Jpem9udGFsUG9zaXRpb24sIDAsIDEwMCk7XG4gICAgY29uc3QgYWRqdXN0ZWRXaWR0aCA9IGFkanVzdGVkSG9yaXpvbnRhbFBvc2l0aW9uICsgd2lkdGggPj0gMTAwXG4gICAgICAgID8gMTAwIC0gYWRqdXN0ZWRIb3Jpem9udGFsUG9zaXRpb25cbiAgICAgICAgOiBhZGp1c3RlZEhvcml6b250YWxQb3NpdGlvbiArIHdpZHRoICE9PSBob3Jpem9udGFsUG9zaXRpb24gKyB3aWR0aFxuICAgICAgICAgICAgPyB3aWR0aCArIGhvcml6b250YWxQb3NpdGlvblxuICAgICAgICAgICAgOiB3aWR0aDtcbiAgICBpZiAoaG9yaXpvbnRhbFBvc2l0aW9uID49IDEwMCB8fCBhZGp1c3RlZFdpZHRoIDw9IDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFtkaXJlY3Rpb25dOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKGhvcml6b250YWxQb3NpdGlvbiA8IDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFtkaXJlY3Rpb25dOiAwLFxuICAgICAgICAgICAgd2lkdGg6IGAke2FkanVzdGVkV2lkdGh9JWAsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgW2RpcmVjdGlvbl06IGAke2FkanVzdGVkSG9yaXpvbnRhbFBvc2l0aW9ufSVgLFxuICAgICAgICAgICAgd2lkdGg6IGAke2FkanVzdGVkV2lkdGh9JWAsXG4gICAgICAgICAgICBkaXNwbGF5OiBob3Jpem9udGFsUG9zaXRpb24gPiAxMDAgPyAnbm9uZScgOiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZVBvc2l0aW9uQW5kU2l6ZS5qcy5tYXAiLCJpbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnO1xuaW1wb3J0IHsgbmFub2lkIH0gZnJvbSAnbmFub2lkJztcbmltcG9ydCB7IGhvcml6b250YWxQb3NpdGlvbkFuZFdpZHRoIH0gZnJvbSAnLi9jYWxjLmpzJztcbmltcG9ydCB7IGlubmVuRXREw7hnbiwgaW52aXNpYmxlUGVyaW9kcyB9IGZyb20gJy4vZmlsdGVyLmpzJztcbmltcG9ydCB7IHNpc3RlUGVyaW9kZSB9IGZyb20gJy4vc29ydC5qcyc7XG5pbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuY29uc3Qgc3BhdGlhbFBlcmlvZCA9IChwZXJpb2QsIHRpbWVsaW5lU3RhcnQsIHRpbWVsaW5lRW5kSW5jbHVzaXZlLCBkaXJlY3Rpb24gPSAnbGVmdCcpID0+IHtcbiAgICBjb25zdCBzdGFydCA9IGRheWpzKHBlcmlvZC5mb20pO1xuICAgIGNvbnN0IGVuZEluY2x1c2l2ZSA9IGRheWpzKHBlcmlvZC50b20pO1xuICAgIGNvbnN0IHsgaG9yaXpvbnRhbFBvc2l0aW9uLCB3aWR0aCB9ID0gaG9yaXpvbnRhbFBvc2l0aW9uQW5kV2lkdGgoc3RhcnQuc3RhcnRPZignZGF5JyksIGVuZEluY2x1c2l2ZS5lbmRPZignZGF5JyksIHRpbWVsaW5lU3RhcnQsIHRpbWVsaW5lRW5kSW5jbHVzaXZlKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBpZDogcGVyaW9kLmlkIHx8IG5hbm9pZCgpLFxuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZEluY2x1c2l2ZTogZW5kSW5jbHVzaXZlLFxuICAgICAgICBob3Jpem9udGFsUG9zaXRpb246IGhvcml6b250YWxQb3NpdGlvbixcbiAgICAgICAgaG92ZXJMYWJlbDogcGVyaW9kLmhvdmVyTGFiZWwsXG4gICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uLFxuICAgICAgICBjbGFzc05hbWU6IHBlcmlvZC5jbGFzc05hbWUsXG4gICAgICAgIGRpc2FibGVkOiBwZXJpb2QuZGlzYWJsZWQsXG4gICAgICAgIHN0YXR1czogcGVyaW9kLnN0YXR1cyxcbiAgICAgICAgYWN0aXZlOiBwZXJpb2QuYWN0aXZlLFxuICAgICAgICBpbmZvUGluOiBwZXJpb2QuaW5mb1BpbixcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICBjaGlsZHJlbjogcGVyaW9kLmNoaWxkcmVuLFxuICAgIH07XG59O1xuY29uc3QgYWRqdXN0ZWRFZGdlcyA9IChwZXJpb2QsIGksIGFsbFBlcmlvZHMpID0+IHtcbiAgICBjb25zdCBsZWZ0ID0gaSA+IDAgJiYgaW5uZW5FdETDuGduKGFsbFBlcmlvZHNbaSAtIDFdLmVuZEluY2x1c2l2ZSwgcGVyaW9kLnN0YXJ0KTtcbiAgICBjb25zdCByaWdodCA9IGkgPCBhbGxQZXJpb2RzLmxlbmd0aCAtIDEgJiYgaW5uZW5FdETDuGduKHBlcmlvZC5lbmRJbmNsdXNpdmUsIGFsbFBlcmlvZHNbaSArIDFdLnN0YXJ0KTtcbiAgICByZXR1cm4gbGVmdCAmJiByaWdodFxuICAgICAgICA/IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcGVyaW9kKSwgeyBjb25uZWN0aW5nRWRnZTogJ2JvdGgnIH0pIDogbGVmdFxuICAgICAgICA/IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcGVyaW9kKSwgeyBjb25uZWN0aW5nRWRnZTogJ2xlZnQnIH0pIDogcmlnaHRcbiAgICAgICAgPyBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHBlcmlvZCksIHsgY29ubmVjdGluZ0VkZ2U6ICdyaWdodCcgfSkgOiBwZXJpb2Q7XG59O1xuY29uc3QgdHJpbW1lZFBlcmlvZHMgPSAocGVyaW9kKSA9PiB7XG4gICAgbGV0IHsgaG9yaXpvbnRhbFBvc2l0aW9uLCB3aWR0aCwgY29ubmVjdGluZ0VkZ2UgfSA9IHBlcmlvZDtcbiAgICBsZXQgY3JvcHBlZCA9IHVuZGVmaW5lZDtcbiAgICBpZiAoaG9yaXpvbnRhbFBvc2l0aW9uICsgd2lkdGggPiAxMDApIHtcbiAgICAgICAgd2lkdGggPSAxMDAgLSBob3Jpem9udGFsUG9zaXRpb247XG4gICAgICAgIGNyb3BwZWQgPSAncmlnaHQnO1xuICAgICAgICBjb25uZWN0aW5nRWRnZSA9IGNvbm5lY3RpbmdFZGdlID09PSAnbGVmdCcgfHwgY29ubmVjdGluZ0VkZ2UgPT09ICdib3RoJyA/ICdib3RoJyA6ICdyaWdodCc7XG4gICAgfVxuICAgIGlmIChob3Jpem9udGFsUG9zaXRpb24gPCAwICYmIGhvcml6b250YWxQb3NpdGlvbiArIHdpZHRoID4gMCkge1xuICAgICAgICB3aWR0aCA9IGhvcml6b250YWxQb3NpdGlvbiArIHdpZHRoO1xuICAgICAgICBob3Jpem9udGFsUG9zaXRpb24gPSAwO1xuICAgICAgICBjcm9wcGVkID0gY3JvcHBlZCA9PT0gJ3JpZ2h0JyA/ICdib3RoJyA6ICdsZWZ0JztcbiAgICAgICAgY29ubmVjdGluZ0VkZ2UgPSBjb25uZWN0aW5nRWRnZSA9PT0gJ3JpZ2h0JyB8fCBjb25uZWN0aW5nRWRnZSA9PT0gJ2JvdGgnID8gJ2JvdGgnIDogJ2xlZnQnO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwZXJpb2QpLCB7IHdpZHRoOiB3aWR0aCwgaG9yaXpvbnRhbFBvc2l0aW9uOiBob3Jpem9udGFsUG9zaXRpb24sIGNvbm5lY3RpbmdFZGdlOiBjb25uZWN0aW5nRWRnZSwgY3JvcHBlZDogY3JvcHBlZCB9KTtcbn07XG5leHBvcnQgY29uc3QgdXNlVGlkc2xpbmplcmFkZXIgPSAocmFkZXIsIHN0YXJ0RGF0bywgc2x1dHREYXRvLCBkaXJlY3Rpb24pID0+IHVzZU1lbW8oKCkgPT4gcmFkZXIubWFwKHBlcmlvZGVyID0+IHtcbiAgICBjb25zdCB0aWRzbGluamVwZXJpb2RlciA9IHBlcmlvZGVyXG4gICAgICAgIC5tYXAoKHBlcmlvZGUpID0+IHNwYXRpYWxQZXJpb2QocGVyaW9kZSwgc3RhcnREYXRvLCBzbHV0dERhdG8sIGRpcmVjdGlvbikpXG4gICAgICAgIC5zb3J0KHNpc3RlUGVyaW9kZSlcbiAgICAgICAgLm1hcChhZGp1c3RlZEVkZ2VzKVxuICAgICAgICAubWFwKHRyaW1tZWRQZXJpb2RzKVxuICAgICAgICAuZmlsdGVyKGludmlzaWJsZVBlcmlvZHMpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBuYW5vaWQoKSxcbiAgICAgICAgcGVyaW9kczogZGlyZWN0aW9uID09PSAnbGVmdCcgPyB0aWRzbGluamVwZXJpb2RlciA6IHRpZHNsaW5qZXBlcmlvZGVyLnJldmVyc2UoKSxcbiAgICB9O1xufSksIFtyYWRlciwgc3RhcnREYXRvLCBzbHV0dERhdG8sIGRpcmVjdGlvbl0pO1xuY29uc3QgdGlkbGlnc3RlRGF0byA9ICh0aWRsaWdzdCwgcGVyaW9kZSkgPT4gcGVyaW9kZS5mb20gPCB0aWRsaWdzdCA/IHBlcmlvZGUuZm9tIDogdGlkbGlnc3Q7XG5jb25zdCB0aWRsaWdzdGVGb21EYXRvID0gKHJhZGVyKSA9PiByYWRlci5mbGF0KCkucmVkdWNlKHRpZGxpZ3N0ZURhdG8sIG5ldyBEYXRlKCkpO1xuZXhwb3J0IGNvbnN0IHVzZVRpZGxpZ3N0ZURhdG8gPSAoeyBzdGFydERhdG8sIHJhZGVyIH0pID0+IHVzZU1lbW8oKCkgPT4gKHN0YXJ0RGF0byA/IGRheWpzKHN0YXJ0RGF0bykgOiBkYXlqcyh0aWRsaWdzdGVGb21EYXRvKHJhZGVyKSkpLCBbc3RhcnREYXRvLCByYWRlcl0pO1xuY29uc3Qgc2VuZXN0ZURhdG8gPSAoc2VuZXN0LCBwZXJpb2RlKSA9PiBwZXJpb2RlLnRvbSA+IHNlbmVzdCA/IHBlcmlvZGUudG9tIDogc2VuZXN0O1xuY29uc3Qgc2VuZXN0ZVRvbURhdG8gPSAocmFkZXIpID0+IHJhZGVyLmZsYXQoKS5yZWR1Y2Uoc2VuZXN0ZURhdG8sIG5ldyBEYXRlKDApKTtcbmV4cG9ydCBjb25zdCB1c2VTZW5lc3RlRGF0byA9ICh7IHNsdXR0RGF0bywgcmFkZXIgfSkgPT4gdXNlTWVtbygoKSA9PiAoc2x1dHREYXRvID8gZGF5anMoc2x1dHREYXRvKSA6IGRheWpzKHNlbmVzdGVUb21EYXRvKHJhZGVyKSkuYWRkKDEsICdkYXknKSksIFtzbHV0dERhdG8sIHJhZGVyXSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VUaWRzbGluamVyYWRlci5qcy5tYXAiLCJpbXBvcnQgeyBUaWRzbGluamUgfSBmcm9tICcuL2NvbXBvbmVudHMvdGlkc2xpbmplL1RpZHNsaW5qZS5qcyc7XG5leHBvcnQgeyBUaWRzbGluamUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQge1xuICAgIEJnTmV1dHJhbFN0cm9uZ1ByZXNzZWQsXG4gICAgQm9yZGVyTmV1dHJhbFN1YnRsZSxcbiAgICBUZXh0QWNjZW50LFxuICAgIFRleHROZXV0cmFsLFxuICAgIFRleHROZXV0cmFsU3VidGxlLFxufSBmcm9tICdAbmF2aWt0L2RzLXRva2Vucy9kaXN0L3Rva2Vucyc7XG5pbXBvcnQgdHlwZSB7IEV0aWtldHQgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdGlkc2xpbmplJztcblxuaW1wb3J0IHsgVGlkc2xpbmplVmluZHUsIHVzZVRpZHNsaW5qZUNvbnRleHQgfSBmcm9tICcuL1RpZHNsaW5qZUNvbnRleHQnO1xuaW1wb3J0IEZhbWlsaWVCYXNlS25hcHAgZnJvbSAnLi4vRmFtaWxpZUJhc2VLbmFwcCc7XG5cbmludGVyZmFjZSBJRXRpa2V0dFByb3Age1xuICAgIGV0aWtldHQ6IEV0aWtldHQ7XG59XG5cbmNvbnN0IEV0aWtldHRLbmFwcCA9IHN0eWxlZChGYW1pbGllQmFzZUtuYXBwKTx7IGRpc2FibGVkOiBib29sZWFuOyAkdmFsZ3Q6IGJvb2xlYW4gfT5gXG4gICAgcGFkZGluZzogM3B4IDNweCAzcHggJHsoeyAkdmFsZ3QgfSkgPT4gKCR2YWxndCA/ICc1cHgnIDogJzNweCcpfTtcbiAgICB3aWR0aDogOTAlO1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgY3Vyc29yOiAkeyh7IGRpc2FibGVkIH0pID0+IChkaXNhYmxlZCA/ICdkZWZhdWx0JyA6ICdwb2ludGVyJyl9O1xuICAgIGJvcmRlci1sZWZ0OiAkeyh7ICR2YWxndCB9KSA9PiAoJHZhbGd0ID8gYDFweCBzb2xpZCAke0JvcmRlck5ldXRyYWxTdWJ0bGV9YCA6ICdub25lJyl9O1xuXG4gICAgPiBzcGFuIHtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiAkeyh7IGRpc2FibGVkLCAkdmFsZ3QgfSkgPT4gKGRpc2FibGVkIHx8ICR2YWxndCA/ICdub25lJyA6ICd1bmRlcmxpbmUnKX07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkeyh7ICR2YWxndCB9KSA9PiAoJHZhbGd0ID8gJ2JvbGQnIDogJ25vcm1hbCcpfTtcbiAgICAgICAgY29sb3I6ICR7KHsgZGlzYWJsZWQsICR2YWxndCB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHJldHVybiBUZXh0TmV1dHJhbFN1YnRsZTtcbiAgICAgICAgICAgIGVsc2UgaWYgKCR2YWxndCkgcmV0dXJuIFRleHROZXV0cmFsO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gVGV4dEFjY2VudDtcbiAgICAgICAgfX07XG4gICAgfVxuXG4gICAgOmhvdmVyIHtcbiAgICAgICAgPiBzcGFuIHtcbiAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIDpmb2N1cyxcbiAgICA6YWN0aXZlIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtCZ05ldXRyYWxTdHJvbmdQcmVzc2VkfTtcbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgfVxuYDtcblxuY29uc3QgVGlkc2xpbmplRXRpa2V0dDogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8SUV0aWtldHRQcm9wPiA9ICh7IGV0aWtldHQgfSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgICAgYWt0aXZFdGlrZXR0LFxuICAgICAgICBzZXR0QWt0aXZFdGlrZXR0LFxuICAgICAgICBha3RpdnRUaWRzbGluamVWaW5kdSxcbiAgICAgICAgaW5pdGllbGxBa3RpdkV0aWtldHRFclNhdHQsXG4gICAgICAgIHNldEluaXRpZWxsQWt0aXZFdGlrZXR0RXJTYXR0LFxuICAgIH0gPSB1c2VUaWRzbGluamVDb250ZXh0KCk7XG5cbiAgICBjb25zdCBvbkV0aWtldHRDbGljayA9ICgpID0+IHtcbiAgICAgICAgc2V0dEFrdGl2RXRpa2V0dChldGlrZXR0KTtcbiAgICB9O1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIWluaXRpZWxsQWt0aXZFdGlrZXR0RXJTYXR0ICYmXG4gICAgICAgICAgICBldGlrZXR0LmRhdGUuZ2V0RnVsbFllYXIoKSA9PT0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpICYmXG4gICAgICAgICAgICBldGlrZXR0LmRhdGUuZ2V0TW9udGgoKSA9PT0gbmV3IERhdGUoKS5nZXRNb250aCgpXG4gICAgICAgICkge1xuICAgICAgICAgICAgc2V0dEFrdGl2RXRpa2V0dChldGlrZXR0KTtcbiAgICAgICAgICAgIHNldEluaXRpZWxsQWt0aXZFdGlrZXR0RXJTYXR0KHRydWUpO1xuICAgICAgICB9XG4gICAgfSwgW2V0aWtldHRdKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxFdGlrZXR0S25hcHBcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2V0aWtldHQubGFiZWx9XG4gICAgICAgICAgICBkaXNhYmxlZD17YWt0aXZ0VGlkc2xpbmplVmluZHUudmluZHUuaWQgPT09IFRpZHNsaW5qZVZpbmR1LlRSRV/DhVJ9XG4gICAgICAgICAgICAkdmFsZ3Q9eyEhYWt0aXZFdGlrZXR0ICYmIGFrdGl2RXRpa2V0dC5kYXRlLnRvRGF0ZVN0cmluZygpID09PSBldGlrZXR0LmRhdGUudG9EYXRlU3RyaW5nKCl9XG4gICAgICAgICAgICBvbkNsaWNrPXtvbkV0aWtldHRDbGlja31cbiAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4+e2V0aWtldHQubGFiZWx9PC9zcGFuPlxuICAgICAgICA8L0V0aWtldHRLbmFwcD5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVGlkc2xpbmplRXRpa2V0dDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IFRvZ2dsZUdyb3VwIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5cbmltcG9ydCB7IHVzZVRpZHNsaW5qZUNvbnRleHQgfSBmcm9tICcuL1RpZHNsaW5qZUNvbnRleHQnO1xuXG5jb25zdCBWaW5kdXZlbGdlcjogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB0aWRzbGluamVWaW5kdWVyLCBlbmRyZVRpZHNsaW5qZVZpbmR1LCBha3RpdnRUaWRzbGluamVWaW5kdSB9ID0gdXNlVGlkc2xpbmplQ29udGV4dCgpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPFRvZ2dsZUdyb3VwXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2FrdGl2dFRpZHNsaW5qZVZpbmR1LnZpbmR1LmlkLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgICAgdmFyaWFudD1cIm5ldXRyYWxcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e3ZpbmR1SWQgPT4gZW5kcmVUaWRzbGluamVWaW5kdSh0aWRzbGluamVWaW5kdWVyW051bWJlcih2aW5kdUlkKV0pfVxuICAgICAgICA+XG4gICAgICAgICAgICB7dGlkc2xpbmplVmluZHVlci5tYXAodmluZHUgPT4gKFxuICAgICAgICAgICAgICAgIDxUb2dnbGVHcm91cC5JdGVtIGtleT17dmluZHUuaWR9IHZhbHVlPXt2aW5kdS5pZC50b1N0cmluZygpfT5cbiAgICAgICAgICAgICAgICAgICAge3ZpbmR1LmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvVG9nZ2xlR3JvdXAuSXRlbT5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L1RvZ2dsZUdyb3VwPlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBWaW5kdXZlbGdlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGVuZE9mTW9udGggfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgQm9keVNob3J0LCBIZWFkaW5nIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgdHlwZSB7IEV0aWtldHQgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdGlkc2xpbmplJztcbmltcG9ydCB7IFRpZHNsaW5qZSB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUnO1xuXG5pbXBvcnQgeyB1c2VUaWRzbGluamVDb250ZXh0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4va29tcG9uZW50ZXIvVGlkc2xpbmplL1RpZHNsaW5qZUNvbnRleHQnO1xuaW1wb3J0IFRpZHNsaW5qZUV0aWtldHQgZnJvbSAnLi4vLi4vLi4vLi4vLi4va29tcG9uZW50ZXIvVGlkc2xpbmplL1RpZHNsaW5qZUV0aWtldHQnO1xuaW1wb3J0IFRpZHNsaW5qZU5hdmlnZXJpbmcgZnJvbSAnLi4vLi4vLi4vLi4vLi4va29tcG9uZW50ZXIvVGlkc2xpbmplL1RpZHNsaW5qZU5hdmlnZXJpbmcnO1xuaW1wb3J0IFZpbmR1dmVsZ2VyIGZyb20gJy4uLy4uLy4uLy4uLy4uL2tvbXBvbmVudGVyL1RpZHNsaW5qZS9WaW5kdVZlbGdlcic7XG5pbXBvcnQgdHlwZSB7IElQZXJzb25NZWRBbmRlbGVyVGlsa2plbnRZdGVsc2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlci9iZXJlZ25pbmcnO1xuaW1wb3J0IHR5cGUgeyBGYWdzYWtUeXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvZmFnc2FrJztcbmltcG9ydCB0eXBlIHsgSUdydW5ubGFnUGVyc29uIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvcGVyc29uJztcbmltcG9ydCB7IGZvcm1hdGVySWRlbnQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9mb3JtYXR0ZXInO1xuXG5jb25zdCBUaWRzbGluamVIZWFkZXIgPSBzdHlsZWQuZGl2YFxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuYDtcblxuY29uc3QgVGlkc2xpbmplQ29udHJvbHMgPSBzdHlsZWQuZGl2YFxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG5cbiAgICA+IGRpdjpmaXJzdC1jaGlsZCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgfVxuYDtcblxuY29uc3QgVGlkc2xpbmplQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgICBkaXNwbGF5OiBmbGV4O1xuXG4gICAgJiAudGlkc2xpbmplIHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XG4gICAgfVxuXG4gICAgJiAuYWtzZWwtYm9keS1zaG9ydCB7XG4gICAgICAgICY6Zmlyc3QtY2hpbGQge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogNC44cmVtO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJiAuYWtzZWwtYm9keS1zaG9ydCB7XG4gICAgICAgICY6bm90KDpmaXJzdC1jaGlsZCkge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMi4xMjVyZW07XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5jb25zdCBUaWRzbGluamVMYWJlbHMgPSBzdHlsZWQuZGl2YFxuICAgIG1pbi13aWR0aDogN3JlbTtcbmA7XG5cbmludGVyZmFjZSBJUHJvcHMge1xuICAgIGdydW5ubGFnUGVyc29uZXI6IElHcnVubmxhZ1BlcnNvbltdO1xuICAgIHRpZHNsaW5qZVBlcnNvbmVyOiBJUGVyc29uTWVkQW5kZWxlclRpbGtqZW50WXRlbHNlW107XG4gICAgZmFnc2FrVHlwZT86IEZhZ3Nha1R5cGU7XG59XG5cbmNvbnN0IFRpbGtqZW50WXRlbHNlVGlkc2xpbmplOiBSZWFjdC5GQzxJUHJvcHM+ID0gKHsgZ3J1bm5sYWdQZXJzb25lciwgdGlkc2xpbmplUGVyc29uZXIsIGZhZ3Nha1R5cGUgfSkgPT4ge1xuICAgIGNvbnN0IHsgZ2VuZXJlckZvcm1hdGVydMOFcnN0YWxsLCBnZW5lcmVyUmFkZXIsIGFrdGl2RXRpa2V0dCwgYWt0aXZ0VGlkc2xpbmplVmluZHUsIG5hdmlnZXIgfSA9XG4gICAgICAgIHVzZVRpZHNsaW5qZUNvbnRleHQoKTtcbiAgICBjb25zdCB0aWRzbGluamVSYWRlciA9IGdlbmVyZXJSYWRlcihmYWdzYWtUeXBlLCB0aWRzbGluamVQZXJzb25lcik7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgICAgPFRpZHNsaW5qZUhlYWRlcj5cbiAgICAgICAgICAgICAgICA8SGVhZGluZyBzaXplPXsnc21hbGwnfSBsZXZlbD17JzInfT5cbiAgICAgICAgICAgICAgICAgICAge2dlbmVyZXJGb3JtYXRlcnTDhXJzdGFsbCgpfVxuICAgICAgICAgICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgICAgICAgICA8VGlkc2xpbmplQ29udHJvbHM+XG4gICAgICAgICAgICAgICAgICAgIDxWaW5kdXZlbGdlciAvPlxuICAgICAgICAgICAgICAgICAgICA8VGlkc2xpbmplTmF2aWdlcmluZyBuYXZpZ2VyPXtuYXZpZ2VyfSAvPlxuICAgICAgICAgICAgICAgIDwvVGlkc2xpbmplQ29udHJvbHM+XG4gICAgICAgICAgICA8L1RpZHNsaW5qZUhlYWRlcj5cbiAgICAgICAgICAgIDxUaWRzbGluamVDb250YWluZXI+XG4gICAgICAgICAgICAgICAgPFRpZHNsaW5qZUxhYmVscz5cbiAgICAgICAgICAgICAgICAgICAge2dydW5ubGFnUGVyc29uZXIubWFwKChwZXJzb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb2R5U2hvcnQga2V5PXtpbmRleH0gdGl0bGU9e3BlcnNvbi5uYXZufT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2Zvcm1hdGVySWRlbnQocGVyc29uLnBlcnNvbklkZW50KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0JvZHlTaG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvVGlkc2xpbmplTGFiZWxzPlxuICAgICAgICAgICAgICAgIDxUaWRzbGluamVcbiAgICAgICAgICAgICAgICAgICAgcmFkZXI9e3RpZHNsaW5qZVJhZGVyfVxuICAgICAgICAgICAgICAgICAgICBldGlrZXR0UmVuZGVyPXsoZXRpa2V0dDogRXRpa2V0dCkgPT4gPFRpZHNsaW5qZUV0aWtldHQgZXRpa2V0dD17ZXRpa2V0dH0gLz59XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0bz17YWt0aXZ0VGlkc2xpbmplVmluZHUuc3RhcnREYXRvfVxuICAgICAgICAgICAgICAgICAgICBzbHV0dERhdG89e2FrdGl2dFRpZHNsaW5qZVZpbmR1LnNsdXR0RGF0b31cbiAgICAgICAgICAgICAgICAgICAgcGlucz17bmV3IERhdGUoKX1cbiAgICAgICAgICAgICAgICAgICAgYWt0aXZ0VXRzbml0dD17XG4gICAgICAgICAgICAgICAgICAgICAgICBha3RpdkV0aWtldHQgJiYge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbTogYWt0aXZFdGlrZXR0LmRhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9tOiBlbmRPZk1vbnRoKGFrdGl2RXRpa2V0dC5kYXRlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1RpZHNsaW5qZUNvbnRhaW5lcj5cbiAgICAgICAgPC8+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRpbGtqZW50WXRlbHNlVGlkc2xpbmplO1xuIiwiIWZ1bmN0aW9uKHQsZSl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9ZSgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZSk6KHQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczp0fHxzZWxmKS5kYXlqcz1lKCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9MWUzLGU9NmU0LG49MzZlNSxyPVwibWlsbGlzZWNvbmRcIixpPVwic2Vjb25kXCIscz1cIm1pbnV0ZVwiLHU9XCJob3VyXCIsYT1cImRheVwiLG89XCJ3ZWVrXCIsZj1cIm1vbnRoXCIsaD1cInF1YXJ0ZXJcIixjPVwieWVhclwiLGQ9XCJkYXRlXCIsJD1cIkludmFsaWQgRGF0ZVwiLGw9L14oXFxkezR9KVstL10/KFxcZHsxLDJ9KT9bLS9dPyhcXGR7MCwyfSlbVHRcXHNdKihcXGR7MSwyfSk/Oj8oXFxkezEsMn0pPzo/KFxcZHsxLDJ9KT9bLjpdPyhcXGQrKT8kLyx5PS9cXFsoW15cXF1dKyldfFl7MSw0fXxNezEsNH18RHsxLDJ9fGR7MSw0fXxIezEsMn18aHsxLDJ9fGF8QXxtezEsMn18c3sxLDJ9fFp7MSwyfXxTU1MvZyxNPXtuYW1lOlwiZW5cIix3ZWVrZGF5czpcIlN1bmRheV9Nb25kYXlfVHVlc2RheV9XZWRuZXNkYXlfVGh1cnNkYXlfRnJpZGF5X1NhdHVyZGF5XCIuc3BsaXQoXCJfXCIpLG1vbnRoczpcIkphbnVhcnlfRmVicnVhcnlfTWFyY2hfQXByaWxfTWF5X0p1bmVfSnVseV9BdWd1c3RfU2VwdGVtYmVyX09jdG9iZXJfTm92ZW1iZXJfRGVjZW1iZXJcIi5zcGxpdChcIl9cIil9LG09ZnVuY3Rpb24odCxlLG4pe3ZhciByPVN0cmluZyh0KTtyZXR1cm4hcnx8ci5sZW5ndGg+PWU/dDpcIlwiK0FycmF5KGUrMS1yLmxlbmd0aCkuam9pbihuKSt0fSxnPXtzOm0sejpmdW5jdGlvbih0KXt2YXIgZT0tdC51dGNPZmZzZXQoKSxuPU1hdGguYWJzKGUpLHI9TWF0aC5mbG9vcihuLzYwKSxpPW4lNjA7cmV0dXJuKGU8PTA/XCIrXCI6XCItXCIpK20ociwyLFwiMFwiKStcIjpcIittKGksMixcIjBcIil9LG06ZnVuY3Rpb24gdChlLG4pe2lmKGUuZGF0ZSgpPG4uZGF0ZSgpKXJldHVybi10KG4sZSk7dmFyIHI9MTIqKG4ueWVhcigpLWUueWVhcigpKSsobi5tb250aCgpLWUubW9udGgoKSksaT1lLmNsb25lKCkuYWRkKHIsZikscz1uLWk8MCx1PWUuY2xvbmUoKS5hZGQocisocz8tMToxKSxmKTtyZXR1cm4rKC0ocisobi1pKS8ocz9pLXU6dS1pKSl8fDApfSxhOmZ1bmN0aW9uKHQpe3JldHVybiB0PDA/TWF0aC5jZWlsKHQpfHwwOk1hdGguZmxvb3IodCl9LHA6ZnVuY3Rpb24odCl7cmV0dXJue006Zix5OmMsdzpvLGQ6YSxEOmQsaDp1LG06cyxzOmksbXM6cixROmh9W3RdfHxTdHJpbmcodHx8XCJcIikudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9zJC8sXCJcIil9LHU6ZnVuY3Rpb24odCl7cmV0dXJuIHZvaWQgMD09PXR9fSx2PVwiZW5cIixEPXt9O0Rbdl09TTt2YXIgcD1mdW5jdGlvbih0KXtyZXR1cm4gdCBpbnN0YW5jZW9mIF99LFM9ZnVuY3Rpb24gdChlLG4scil7dmFyIGk7aWYoIWUpcmV0dXJuIHY7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpe3ZhciBzPWUudG9Mb3dlckNhc2UoKTtEW3NdJiYoaT1zKSxuJiYoRFtzXT1uLGk9cyk7dmFyIHU9ZS5zcGxpdChcIi1cIik7aWYoIWkmJnUubGVuZ3RoPjEpcmV0dXJuIHQodVswXSl9ZWxzZXt2YXIgYT1lLm5hbWU7RFthXT1lLGk9YX1yZXR1cm4hciYmaSYmKHY9aSksaXx8IXImJnZ9LHc9ZnVuY3Rpb24odCxlKXtpZihwKHQpKXJldHVybiB0LmNsb25lKCk7dmFyIG49XCJvYmplY3RcIj09dHlwZW9mIGU/ZTp7fTtyZXR1cm4gbi5kYXRlPXQsbi5hcmdzPWFyZ3VtZW50cyxuZXcgXyhuKX0sTz1nO08ubD1TLE8uaT1wLE8udz1mdW5jdGlvbih0LGUpe3JldHVybiB3KHQse2xvY2FsZTplLiRMLHV0YzplLiR1LHg6ZS4keCwkb2Zmc2V0OmUuJG9mZnNldH0pfTt2YXIgXz1mdW5jdGlvbigpe2Z1bmN0aW9uIE0odCl7dGhpcy4kTD1TKHQubG9jYWxlLG51bGwsITApLHRoaXMucGFyc2UodCl9dmFyIG09TS5wcm90b3R5cGU7cmV0dXJuIG0ucGFyc2U9ZnVuY3Rpb24odCl7dGhpcy4kZD1mdW5jdGlvbih0KXt2YXIgZT10LmRhdGUsbj10LnV0YztpZihudWxsPT09ZSlyZXR1cm4gbmV3IERhdGUoTmFOKTtpZihPLnUoZSkpcmV0dXJuIG5ldyBEYXRlO2lmKGUgaW5zdGFuY2VvZiBEYXRlKXJldHVybiBuZXcgRGF0ZShlKTtpZihcInN0cmluZ1wiPT10eXBlb2YgZSYmIS9aJC9pLnRlc3QoZSkpe3ZhciByPWUubWF0Y2gobCk7aWYocil7dmFyIGk9clsyXS0xfHwwLHM9KHJbN118fFwiMFwiKS5zdWJzdHJpbmcoMCwzKTtyZXR1cm4gbj9uZXcgRGF0ZShEYXRlLlVUQyhyWzFdLGksclszXXx8MSxyWzRdfHwwLHJbNV18fDAscls2XXx8MCxzKSk6bmV3IERhdGUoclsxXSxpLHJbM118fDEscls0XXx8MCxyWzVdfHwwLHJbNl18fDAscyl9fXJldHVybiBuZXcgRGF0ZShlKX0odCksdGhpcy4keD10Lnh8fHt9LHRoaXMuaW5pdCgpfSxtLmluaXQ9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLiRkO3RoaXMuJHk9dC5nZXRGdWxsWWVhcigpLHRoaXMuJE09dC5nZXRNb250aCgpLHRoaXMuJEQ9dC5nZXREYXRlKCksdGhpcy4kVz10LmdldERheSgpLHRoaXMuJEg9dC5nZXRIb3VycygpLHRoaXMuJG09dC5nZXRNaW51dGVzKCksdGhpcy4kcz10LmdldFNlY29uZHMoKSx0aGlzLiRtcz10LmdldE1pbGxpc2Vjb25kcygpfSxtLiR1dGlscz1mdW5jdGlvbigpe3JldHVybiBPfSxtLmlzVmFsaWQ9ZnVuY3Rpb24oKXtyZXR1cm4hKHRoaXMuJGQudG9TdHJpbmcoKT09PSQpfSxtLmlzU2FtZT1mdW5jdGlvbih0LGUpe3ZhciBuPXcodCk7cmV0dXJuIHRoaXMuc3RhcnRPZihlKTw9biYmbjw9dGhpcy5lbmRPZihlKX0sbS5pc0FmdGVyPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHcodCk8dGhpcy5zdGFydE9mKGUpfSxtLmlzQmVmb3JlPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuZW5kT2YoZSk8dyh0KX0sbS4kZz1mdW5jdGlvbih0LGUsbil7cmV0dXJuIE8udSh0KT90aGlzW2VdOnRoaXMuc2V0KG4sdCl9LG0udW5peD1mdW5jdGlvbigpe3JldHVybiBNYXRoLmZsb29yKHRoaXMudmFsdWVPZigpLzFlMyl9LG0udmFsdWVPZj1mdW5jdGlvbigpe3JldHVybiB0aGlzLiRkLmdldFRpbWUoKX0sbS5zdGFydE9mPWZ1bmN0aW9uKHQsZSl7dmFyIG49dGhpcyxyPSEhTy51KGUpfHxlLGg9Ty5wKHQpLCQ9ZnVuY3Rpb24odCxlKXt2YXIgaT1PLncobi4kdT9EYXRlLlVUQyhuLiR5LGUsdCk6bmV3IERhdGUobi4keSxlLHQpLG4pO3JldHVybiByP2k6aS5lbmRPZihhKX0sbD1mdW5jdGlvbih0LGUpe3JldHVybiBPLncobi50b0RhdGUoKVt0XS5hcHBseShuLnRvRGF0ZShcInNcIiksKHI/WzAsMCwwLDBdOlsyMyw1OSw1OSw5OTldKS5zbGljZShlKSksbil9LHk9dGhpcy4kVyxNPXRoaXMuJE0sbT10aGlzLiRELGc9XCJzZXRcIisodGhpcy4kdT9cIlVUQ1wiOlwiXCIpO3N3aXRjaChoKXtjYXNlIGM6cmV0dXJuIHI/JCgxLDApOiQoMzEsMTEpO2Nhc2UgZjpyZXR1cm4gcj8kKDEsTSk6JCgwLE0rMSk7Y2FzZSBvOnZhciB2PXRoaXMuJGxvY2FsZSgpLndlZWtTdGFydHx8MCxEPSh5PHY/eSs3OnkpLXY7cmV0dXJuICQocj9tLUQ6bSsoNi1EKSxNKTtjYXNlIGE6Y2FzZSBkOnJldHVybiBsKGcrXCJIb3Vyc1wiLDApO2Nhc2UgdTpyZXR1cm4gbChnK1wiTWludXRlc1wiLDEpO2Nhc2UgczpyZXR1cm4gbChnK1wiU2Vjb25kc1wiLDIpO2Nhc2UgaTpyZXR1cm4gbChnK1wiTWlsbGlzZWNvbmRzXCIsMyk7ZGVmYXVsdDpyZXR1cm4gdGhpcy5jbG9uZSgpfX0sbS5lbmRPZj1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5zdGFydE9mKHQsITEpfSxtLiRzZXQ9ZnVuY3Rpb24odCxlKXt2YXIgbixvPU8ucCh0KSxoPVwic2V0XCIrKHRoaXMuJHU/XCJVVENcIjpcIlwiKSwkPShuPXt9LG5bYV09aCtcIkRhdGVcIixuW2RdPWgrXCJEYXRlXCIsbltmXT1oK1wiTW9udGhcIixuW2NdPWgrXCJGdWxsWWVhclwiLG5bdV09aCtcIkhvdXJzXCIsbltzXT1oK1wiTWludXRlc1wiLG5baV09aCtcIlNlY29uZHNcIixuW3JdPWgrXCJNaWxsaXNlY29uZHNcIixuKVtvXSxsPW89PT1hP3RoaXMuJEQrKGUtdGhpcy4kVyk6ZTtpZihvPT09Znx8bz09PWMpe3ZhciB5PXRoaXMuY2xvbmUoKS5zZXQoZCwxKTt5LiRkWyRdKGwpLHkuaW5pdCgpLHRoaXMuJGQ9eS5zZXQoZCxNYXRoLm1pbih0aGlzLiRELHkuZGF5c0luTW9udGgoKSkpLiRkfWVsc2UgJCYmdGhpcy4kZFskXShsKTtyZXR1cm4gdGhpcy5pbml0KCksdGhpc30sbS5zZXQ9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdGhpcy5jbG9uZSgpLiRzZXQodCxlKX0sbS5nZXQ9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXNbTy5wKHQpXSgpfSxtLmFkZD1mdW5jdGlvbihyLGgpe3ZhciBkLCQ9dGhpcztyPU51bWJlcihyKTt2YXIgbD1PLnAoaCkseT1mdW5jdGlvbih0KXt2YXIgZT13KCQpO3JldHVybiBPLncoZS5kYXRlKGUuZGF0ZSgpK01hdGgucm91bmQodCpyKSksJCl9O2lmKGw9PT1mKXJldHVybiB0aGlzLnNldChmLHRoaXMuJE0rcik7aWYobD09PWMpcmV0dXJuIHRoaXMuc2V0KGMsdGhpcy4keStyKTtpZihsPT09YSlyZXR1cm4geSgxKTtpZihsPT09bylyZXR1cm4geSg3KTt2YXIgTT0oZD17fSxkW3NdPWUsZFt1XT1uLGRbaV09dCxkKVtsXXx8MSxtPXRoaXMuJGQuZ2V0VGltZSgpK3IqTTtyZXR1cm4gTy53KG0sdGhpcyl9LG0uc3VidHJhY3Q9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdGhpcy5hZGQoLTEqdCxlKX0sbS5mb3JtYXQ9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcyxuPXRoaXMuJGxvY2FsZSgpO2lmKCF0aGlzLmlzVmFsaWQoKSlyZXR1cm4gbi5pbnZhbGlkRGF0ZXx8JDt2YXIgcj10fHxcIllZWVktTU0tRERUSEg6bW06c3NaXCIsaT1PLnoodGhpcykscz10aGlzLiRILHU9dGhpcy4kbSxhPXRoaXMuJE0sbz1uLndlZWtkYXlzLGY9bi5tb250aHMsaD1mdW5jdGlvbih0LG4saSxzKXtyZXR1cm4gdCYmKHRbbl18fHQoZSxyKSl8fGlbbl0uc2xpY2UoMCxzKX0sYz1mdW5jdGlvbih0KXtyZXR1cm4gTy5zKHMlMTJ8fDEyLHQsXCIwXCIpfSxkPW4ubWVyaWRpZW18fGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj10PDEyP1wiQU1cIjpcIlBNXCI7cmV0dXJuIG4/ci50b0xvd2VyQ2FzZSgpOnJ9LGw9e1lZOlN0cmluZyh0aGlzLiR5KS5zbGljZSgtMiksWVlZWTp0aGlzLiR5LE06YSsxLE1NOk8ucyhhKzEsMixcIjBcIiksTU1NOmgobi5tb250aHNTaG9ydCxhLGYsMyksTU1NTTpoKGYsYSksRDp0aGlzLiRELEREOk8ucyh0aGlzLiRELDIsXCIwXCIpLGQ6U3RyaW5nKHRoaXMuJFcpLGRkOmgobi53ZWVrZGF5c01pbix0aGlzLiRXLG8sMiksZGRkOmgobi53ZWVrZGF5c1Nob3J0LHRoaXMuJFcsbywzKSxkZGRkOm9bdGhpcy4kV10sSDpTdHJpbmcocyksSEg6Ty5zKHMsMixcIjBcIiksaDpjKDEpLGhoOmMoMiksYTpkKHMsdSwhMCksQTpkKHMsdSwhMSksbTpTdHJpbmcodSksbW06Ty5zKHUsMixcIjBcIiksczpTdHJpbmcodGhpcy4kcyksc3M6Ty5zKHRoaXMuJHMsMixcIjBcIiksU1NTOk8ucyh0aGlzLiRtcywzLFwiMFwiKSxaOml9O3JldHVybiByLnJlcGxhY2UoeSwoZnVuY3Rpb24odCxlKXtyZXR1cm4gZXx8bFt0XXx8aS5yZXBsYWNlKFwiOlwiLFwiXCIpfSkpfSxtLnV0Y09mZnNldD1mdW5jdGlvbigpe3JldHVybiAxNSotTWF0aC5yb3VuZCh0aGlzLiRkLmdldFRpbWV6b25lT2Zmc2V0KCkvMTUpfSxtLmRpZmY9ZnVuY3Rpb24ocixkLCQpe3ZhciBsLHk9Ty5wKGQpLE09dyhyKSxtPShNLnV0Y09mZnNldCgpLXRoaXMudXRjT2Zmc2V0KCkpKmUsZz10aGlzLU0sdj1PLm0odGhpcyxNKTtyZXR1cm4gdj0obD17fSxsW2NdPXYvMTIsbFtmXT12LGxbaF09di8zLGxbb109KGctbSkvNjA0OGU1LGxbYV09KGctbSkvODY0ZTUsbFt1XT1nL24sbFtzXT1nL2UsbFtpXT1nL3QsbClbeV18fGcsJD92Ok8uYSh2KX0sbS5kYXlzSW5Nb250aD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVuZE9mKGYpLiREfSxtLiRsb2NhbGU9ZnVuY3Rpb24oKXtyZXR1cm4gRFt0aGlzLiRMXX0sbS5sb2NhbGU9ZnVuY3Rpb24odCxlKXtpZighdClyZXR1cm4gdGhpcy4kTDt2YXIgbj10aGlzLmNsb25lKCkscj1TKHQsZSwhMCk7cmV0dXJuIHImJihuLiRMPXIpLG59LG0uY2xvbmU9ZnVuY3Rpb24oKXtyZXR1cm4gTy53KHRoaXMuJGQsdGhpcyl9LG0udG9EYXRlPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBEYXRlKHRoaXMudmFsdWVPZigpKX0sbS50b0pTT049ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pc1ZhbGlkKCk/dGhpcy50b0lTT1N0cmluZygpOm51bGx9LG0udG9JU09TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kZC50b0lTT1N0cmluZygpfSxtLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJGQudG9VVENTdHJpbmcoKX0sTX0oKSxUPV8ucHJvdG90eXBlO3JldHVybiB3LnByb3RvdHlwZT1ULFtbXCIkbXNcIixyXSxbXCIkc1wiLGldLFtcIiRtXCIsc10sW1wiJEhcIix1XSxbXCIkV1wiLGFdLFtcIiRNXCIsZl0sW1wiJHlcIixjXSxbXCIkRFwiLGRdXS5mb3JFYWNoKChmdW5jdGlvbih0KXtUW3RbMV1dPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLiRnKGUsdFswXSx0WzFdKX19KSksdy5leHRlbmQ9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC4kaXx8KHQoZSxfLHcpLHQuJGk9ITApLHd9LHcubG9jYWxlPVMsdy5pc0RheWpzPXAsdy51bml4PWZ1bmN0aW9uKHQpe3JldHVybiB3KDFlMyp0KX0sdy5lbj1EW3ZdLHcuTHM9RCx3LnA9e30sd30pKTsiLCIhZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KHJlcXVpcmUoXCJkYXlqc1wiKSk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXCJkYXlqc1wiXSx0KTooZT1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOmV8fHNlbGYpLmRheWpzX2xvY2FsZV9uYj10KGUuZGF5anMpfSh0aGlzLChmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KGUpe3JldHVybiBlJiZcIm9iamVjdFwiPT10eXBlb2YgZSYmXCJkZWZhdWx0XCJpbiBlP2U6e2RlZmF1bHQ6ZX19dmFyIG49dChlKSxhPXtuYW1lOlwibmJcIix3ZWVrZGF5czpcInPDuG5kYWdfbWFuZGFnX3RpcnNkYWdfb25zZGFnX3RvcnNkYWdfZnJlZGFnX2zDuHJkYWdcIi5zcGxpdChcIl9cIiksd2Vla2RheXNTaG9ydDpcInPDuC5fbWEuX3RpLl9vbi5fdG8uX2ZyLl9sw7guXCIuc3BsaXQoXCJfXCIpLHdlZWtkYXlzTWluOlwic8O4X21hX3RpX29uX3RvX2ZyX2zDuFwiLnNwbGl0KFwiX1wiKSxtb250aHM6XCJqYW51YXJfZmVicnVhcl9tYXJzX2FwcmlsX21haV9qdW5pX2p1bGlfYXVndXN0X3NlcHRlbWJlcl9va3RvYmVyX25vdmVtYmVyX2Rlc2VtYmVyXCIuc3BsaXQoXCJfXCIpLG1vbnRoc1Nob3J0OlwiamFuLl9mZWIuX21hcnNfYXByaWxfbWFpX2p1bmlfanVsaV9hdWcuX3NlcC5fb2t0Ll9ub3YuX2Rlcy5cIi5zcGxpdChcIl9cIiksb3JkaW5hbDpmdW5jdGlvbihlKXtyZXR1cm4gZStcIi5cIn0sd2Vla1N0YXJ0OjEseWVhclN0YXJ0OjQsZm9ybWF0czp7TFQ6XCJISDptbVwiLExUUzpcIkhIOm1tOnNzXCIsTDpcIkRELk1NLllZWVlcIixMTDpcIkQuIE1NTU0gWVlZWVwiLExMTDpcIkQuIE1NTU0gWVlZWSBba2wuXSBISDptbVwiLExMTEw6XCJkZGRkIEQuIE1NTU0gWVlZWSBba2wuXSBISDptbVwifSxyZWxhdGl2ZVRpbWU6e2Z1dHVyZTpcIm9tICVzXCIscGFzdDpcIiVzIHNpZGVuXCIsczpcIm5vZW4gc2VrdW5kZXJcIixtOlwiZXR0IG1pbnV0dFwiLG1tOlwiJWQgbWludXR0ZXJcIixoOlwiZW4gdGltZVwiLGhoOlwiJWQgdGltZXJcIixkOlwiZW4gZGFnXCIsZGQ6XCIlZCBkYWdlclwiLE06XCJlbiBtw6VuZWRcIixNTTpcIiVkIG3DpW5lZGVyXCIseTpcImV0dCDDpXJcIix5eTpcIiVkIMOlclwifX07cmV0dXJuIG4uZGVmYXVsdC5sb2NhbGUoYSxudWxsLCEwKSxhfSkpOyIsIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOihlPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6ZXx8c2VsZikuZGF5anNfcGx1Z2luX2lzU2FtZU9yQWZ0ZXI9dCgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3JldHVybiBmdW5jdGlvbihlLHQpe3QucHJvdG90eXBlLmlzU2FtZU9yQWZ0ZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5pc1NhbWUoZSx0KXx8dGhpcy5pc0FmdGVyKGUsdCl9fX0pKTsiLCIhZnVuY3Rpb24oZSxpKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1pKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShpKTooZT1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOmV8fHNlbGYpLmRheWpzX3BsdWdpbl9pc1NhbWVPckJlZm9yZT1pKCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7cmV0dXJuIGZ1bmN0aW9uKGUsaSl7aS5wcm90b3R5cGUuaXNTYW1lT3JCZWZvcmU9ZnVuY3Rpb24oZSxpKXtyZXR1cm4gdGhpcy5pc1NhbWUoZSxpKXx8dGhpcy5pc0JlZm9yZShlLGkpfX19KSk7IiwiLyogQHRzLXNlbGYtdHlwZXM9XCIuL2luZGV4LmQudHNcIiAqL1xuaW1wb3J0IHsgdXJsQWxwaGFiZXQgYXMgc2NvcGVkVXJsQWxwaGFiZXQgfSBmcm9tICcuL3VybC1hbHBoYWJldC9pbmRleC5qcydcbmV4cG9ydCB7IHVybEFscGhhYmV0IH0gZnJvbSAnLi91cmwtYWxwaGFiZXQvaW5kZXguanMnXG5leHBvcnQgbGV0IHJhbmRvbSA9IGJ5dGVzID0+IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoYnl0ZXMpKVxuZXhwb3J0IGxldCBjdXN0b21SYW5kb20gPSAoYWxwaGFiZXQsIGRlZmF1bHRTaXplLCBnZXRSYW5kb20pID0+IHtcbiAgbGV0IG1hc2sgPSAoMiA8PCBNYXRoLmxvZzIoYWxwaGFiZXQubGVuZ3RoIC0gMSkpIC0gMVxuICBsZXQgc3RlcCA9IC1+KCgxLjYgKiBtYXNrICogZGVmYXVsdFNpemUpIC8gYWxwaGFiZXQubGVuZ3RoKVxuICByZXR1cm4gKHNpemUgPSBkZWZhdWx0U2l6ZSkgPT4ge1xuICAgIGxldCBpZCA9ICcnXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGxldCBieXRlcyA9IGdldFJhbmRvbShzdGVwKVxuICAgICAgbGV0IGogPSBzdGVwIHwgMFxuICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICBpZCArPSBhbHBoYWJldFtieXRlc1tqXSAmIG1hc2tdIHx8ICcnXG4gICAgICAgIGlmIChpZC5sZW5ndGggPj0gc2l6ZSkgcmV0dXJuIGlkXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5leHBvcnQgbGV0IGN1c3RvbUFscGhhYmV0ID0gKGFscGhhYmV0LCBzaXplID0gMjEpID0+XG4gIGN1c3RvbVJhbmRvbShhbHBoYWJldCwgc2l6ZSB8IDAsIHJhbmRvbSlcbmV4cG9ydCBsZXQgbmFub2lkID0gKHNpemUgPSAyMSkgPT4ge1xuICBsZXQgaWQgPSAnJ1xuICBsZXQgYnl0ZXMgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KChzaXplIHw9IDApKSlcbiAgd2hpbGUgKHNpemUtLSkge1xuICAgIGlkICs9IHNjb3BlZFVybEFscGhhYmV0W2J5dGVzW3NpemVdICYgNjNdXG4gIH1cbiAgcmV0dXJuIGlkXG59XG4iLCJleHBvcnQgY29uc3QgdXJsQWxwaGFiZXQgPVxuICAndXNlYW5kb20tMjZUMTk4MzQwUFg3NXB4SkFDS1ZFUllNSU5EQlVTSFdPTEZfR1FaYmZnaGprbHF2d3l6cmljdCdcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjI2Mjk5MTYyMTY1NzZlMzIzNWUyXCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0Iiwic3R5bGVkIiwiQmdOZXV0cmFsU3Ryb25nUHJlc3NlZCIsIkJvcmRlck5ldXRyYWxTdWJ0bGUiLCJUZXh0QWNjZW50IiwiVGV4dE5ldXRyYWwiLCJUZXh0TmV1dHJhbFN1YnRsZSIsIlRpZHNsaW5qZVZpbmR1IiwidXNlVGlkc2xpbmplQ29udGV4dCIsIkZhbWlsaWVCYXNlS25hcHAiLCJFdGlrZXR0S25hcHAiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiX3JlZiIsIiR2YWxndCIsIl9yZWYyIiwiZGlzYWJsZWQiLCJfcmVmMyIsImNvbmNhdCIsIl9yZWY0IiwiX3JlZjUiLCJfcmVmNiIsIl9jIiwiVGlkc2xpbmplRXRpa2V0dCIsIl9yZWY3IiwiX3MiLCJldGlrZXR0IiwiX3VzZVRpZHNsaW5qZUNvbnRleHQiLCJha3RpdkV0aWtldHQiLCJzZXR0QWt0aXZFdGlrZXR0IiwiYWt0aXZ0VGlkc2xpbmplVmluZHUiLCJpbml0aWVsbEFrdGl2RXRpa2V0dEVyU2F0dCIsInNldEluaXRpZWxsQWt0aXZFdGlrZXR0RXJTYXR0Iiwib25FdGlrZXR0Q2xpY2siLCJkYXRlIiwiZ2V0RnVsbFllYXIiLCJEYXRlIiwiZ2V0TW9udGgiLCJjcmVhdGVFbGVtZW50IiwibGFiZWwiLCJ2aW5kdSIsImlkIiwiVFJFX8OFUiIsInRvRGF0ZVN0cmluZyIsIm9uQ2xpY2siLCJfYzIiLCIkUmVmcmVzaFJlZyQiLCJUb2dnbGVHcm91cCIsIlZpbmR1dmVsZ2VyIiwidGlkc2xpbmplVmluZHVlciIsImVuZHJlVGlkc2xpbmplVmluZHUiLCJkZWZhdWx0VmFsdWUiLCJ0b1N0cmluZyIsInNpemUiLCJ2YXJpYW50Iiwib25DaGFuZ2UiLCJ2aW5kdUlkIiwiTnVtYmVyIiwibWFwIiwiSXRlbSIsImtleSIsInZhbHVlIiwiZW5kT2ZNb250aCIsIkJvZHlTaG9ydCIsIkhlYWRpbmciLCJUaWRzbGluamUiLCJUaWRzbGluamVOYXZpZ2VyaW5nIiwiZm9ybWF0ZXJJZGVudCIsIlRpZHNsaW5qZUhlYWRlciIsImRpdiIsIlRpZHNsaW5qZUNvbnRyb2xzIiwiX3RlbXBsYXRlT2JqZWN0MiIsIlRpZHNsaW5qZUNvbnRhaW5lciIsIl90ZW1wbGF0ZU9iamVjdDMiLCJfYzMiLCJUaWRzbGluamVMYWJlbHMiLCJfdGVtcGxhdGVPYmplY3Q0IiwiX2M0IiwiVGlsa2plbnRZdGVsc2VUaWRzbGluamUiLCJncnVubmxhZ1BlcnNvbmVyIiwidGlkc2xpbmplUGVyc29uZXIiLCJmYWdzYWtUeXBlIiwiZ2VuZXJlckZvcm1hdGVydMOFcnN0YWxsIiwiZ2VuZXJlclJhZGVyIiwibmF2aWdlciIsInRpZHNsaW5qZVJhZGVyIiwiRnJhZ21lbnQiLCJsZXZlbCIsInBlcnNvbiIsImluZGV4IiwidGl0bGUiLCJuYXZuIiwicGVyc29uSWRlbnQiLCJyYWRlciIsImV0aWtldHRSZW5kZXIiLCJzdGFydERhdG8iLCJzbHV0dERhdG8iLCJwaW5zIiwiYWt0aXZ0VXRzbml0dCIsImZvbSIsInRvbSIsIl9jNSJdLCJzb3VyY2VSb290IjoiIn0=