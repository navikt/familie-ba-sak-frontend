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
    pins: [{
      date: new Date()
    }],
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
/******/ 	__webpack_require__.h = () => ("da917abc2bb5429187ab")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5hNDM1NTJhYWM1MjBmMGU1MmIzNS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNhO0FBQ0g7QUFDeUI7QUFDSztBQUNsRSwrQkFBK0IseURBQU07QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix5REFBTTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixtRUFBUTtBQUM5QixnQ0FBZ0MsbUVBQVE7QUFDeEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixtRUFBUTtBQUM5QixnQ0FBZ0MsbUVBQVE7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDZEQUFNO0FBQ2pDO0FBQ0EsNkJBQTZCLG1FQUFRLENBQUM7QUFDdEMsOEJBQThCLG1FQUFRO0FBQ3RDO0FBQ0EsNkJBQTZCLDZEQUFNO0FBQ25DLGtCQUFrQixrRUFBTztBQUN6QjtBQUNPLCtCQUErQiwyREFBMkQ7QUFDakcsa0JBQWtCLDBFQUFrQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxZQUFZLDBEQUFtQiwyQkFBMkIscUNBQXFDO0FBQy9GLFFBQVEsMERBQW1CLHVCQUF1QixXQUFXLGlEQUFVLHNDQUFzQztBQUM3RztBQUNPLGlDQUFpQywyREFBMkQ7QUFDbkcsa0JBQWtCLDBFQUFrQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxZQUFZLDBEQUFtQiwyQkFBMkIscUNBQXFDO0FBQy9GLFFBQVEsMERBQW1CLHlCQUF5QixXQUFXLGlEQUFVLHdDQUF3QztBQUNqSDtBQUNBLHlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRjBCO0FBQ0E7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Q0FBMkMsZ0JBQWdCLHdCQUF3QixHQUFHLEc7Ozs7Ozs7Ozs7QUNBdjZNLGVBQWUsS0FBb0Qsa0JBQWtCLG1CQUFPLENBQUMsZ0RBQU8sR0FBRyxDQUEwSSxDQUFDLG1CQUFtQixhQUFhLGNBQWMsK0NBQStDLFdBQVcsY0FBYyx3WUFBd1ksYUFBYSxrQ0FBa0MsK0hBQStILGVBQWUseUxBQXlMLHFDQUFxQyxHOzs7Ozs7Ozs7O0FDQTNvQyxlQUFlLEtBQW9ELG9CQUFvQixDQUFvSSxDQUFDLGtCQUFrQixhQUFhLHFCQUFxQix3Q0FBd0MsNkNBQTZDLEc7Ozs7Ozs7Ozs7QUNBclcsZUFBZSxLQUFvRCxvQkFBb0IsQ0FBcUksQ0FBQyxrQkFBa0IsYUFBYSxxQkFBcUIseUNBQXlDLDhDQUE4QyxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0F4VztBQUMwRTtBQUNyQjtBQUM5QztBQUNBO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFVBQVUsK0RBQWlCO0FBQzNCO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzVCTztBQUNQOzs7Ozs7Ozs7VUNEQSxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vbm9kZV9tb2R1bGVzL0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUvZGlzdC9jb21wb25lbnRzL3RpZHNsaW5qZS9Ba3RpdnRVdHNuaXR0LmpzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vbm9kZV9tb2R1bGVzL0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUvZGlzdC9jb21wb25lbnRzL3RpZHNsaW5qZS9BeGlzTGFiZWxzLmpzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vbm9kZV9tb2R1bGVzL0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUvZGlzdC9jb21wb25lbnRzL3RpZHNsaW5qZS9QaW5zLmpzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vbm9kZV9tb2R1bGVzL0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUvZGlzdC9jb21wb25lbnRzL3RpZHNsaW5qZS9UaWRzbGluamUuanMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvQG5hdmlrdC9mYW1pbGllLXRpZHNsaW5qZS9kaXN0L2NvbXBvbmVudHMvdGlkc2xpbmplL1RpbWVsaW5lUGVyaW9kLmpzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vbm9kZV9tb2R1bGVzL0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUvZGlzdC9jb21wb25lbnRzL3RpZHNsaW5qZS9UaW1lbGluZVJvdy5qcyIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9AbmF2aWt0L2ZhbWlsaWUtdGlkc2xpbmplL2Rpc3QvY29tcG9uZW50cy90aWRzbGluamUvVG9vbHRpcC5qcyIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9AbmF2aWt0L2ZhbWlsaWUtdGlkc2xpbmplL2Rpc3QvY29tcG9uZW50cy90aWRzbGluamUvY2FsYy5qcyIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9AbmF2aWt0L2ZhbWlsaWUtdGlkc2xpbmplL2Rpc3QvY29tcG9uZW50cy90aWRzbGluamUvZmlsdGVyLmpzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vbm9kZV9tb2R1bGVzL0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUvZGlzdC9jb21wb25lbnRzL3RpZHNsaW5qZS9zb3J0LmpzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vbm9kZV9tb2R1bGVzL0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUvZGlzdC9jb21wb25lbnRzL3RpZHNsaW5qZS91c2VQb3NpdGlvbkFuZFNpemUuanMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvQG5hdmlrdC9mYW1pbGllLXRpZHNsaW5qZS9kaXN0L2NvbXBvbmVudHMvdGlkc2xpbmplL3VzZVRpZHNsaW5qZXJhZGVyLmpzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vbm9kZV9tb2R1bGVzL0BuYXZpa3QvZmFtaWxpZS10aWRzbGluamUvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9rb21wb25lbnRlci9UaWRzbGluamUvVGlkc2xpbmplRXRpa2V0dC50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQva29tcG9uZW50ZXIvVGlkc2xpbmplL1ZpbmR1VmVsZ2VyLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9GYWdzYWsvQmVoYW5kbGluZy9TaWRlci9CZWhhbmRsaW5nc3Jlc3VsdGF0L1RpbGtqZW50WXRlbHNlVGlkc2xpbmplLnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9kYXlqcy9kYXlqcy5taW4uanMiLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvZGF5anMvbG9jYWxlL25iLmpzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi9pc1NhbWVPckFmdGVyLmpzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi9pc1NhbWVPckJlZm9yZS5qcyIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9AbmF2aWt0L2ZhbWlsaWUtdGlkc2xpbmplL25vZGVfbW9kdWxlcy9uYW5vaWQvaW5kZXguYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9AbmF2aWt0L2ZhbWlsaWUtdGlkc2xpbmplL25vZGVfbW9kdWxlcy9uYW5vaWQvdXJsLWFscGhhYmV0L2luZGV4LmpzIiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IHVzZVBvc2l0aW9uQW5kU2l6ZSB9IGZyb20gJy4vdXNlUG9zaXRpb25BbmRTaXplLmpzJztcbmltcG9ydCB7IEFCbHVlNTAsIEFCbHVlNTAwIH0gZnJvbSAnQG5hdmlrdC9kcy10b2tlbnMvZGlzdC90b2tlbnMnO1xuY29uc3QgQWt0aXZ0VXRzbml0dENvbnRhaW5lciA9IHN0eWxlZC5kaXYgYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuYDtcbmNvbnN0IEFrdGl2UGVyaW9kZSA9IHN0eWxlZC5kaXYgYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgcGFkZGluZzogMDtcblxuICAgICY6Oi1tb3otZm9jdXMtaW5uZXIge1xuICAgICAgICBib3JkZXI6IDA7XG4gICAgfVxuXG4gICAgJjpob3ZlcixcbiAgICAmOmZvY3VzIHtcbiAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICB9XG5cbiAgICAmOmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogLTJweDtcbiAgICAgICAgd2lkdGg6IDNweDtcbiAgICAgICAgaGVpZ2h0OiAzcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYmFja2dyb3VuZDogJHtBQmx1ZTUwMH07XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDFweCAke0FCbHVlNTAwfTtcbiAgICAgICAgbGVmdDogLTFweDtcbiAgICB9XG5cbiAgICAmOmFmdGVyIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAtMnB4O1xuICAgICAgICB3aWR0aDogM3B4O1xuICAgICAgICBoZWlnaHQ6IDNweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBiYWNrZ3JvdW5kOiAke0FCbHVlNTAwfTtcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgMXB4ICR7QUJsdWU1MDB9O1xuICAgICAgICByaWdodDogLTFweDtcbiAgICB9XG5gO1xuY29uc3QgQWt0aXZQZXJpb2RlQm9yZGVyID0gc3R5bGVkKEFrdGl2UGVyaW9kZSkgYFxuICAgIGJveC1zaGFkb3c6XG4gICAgICAgIGluc2V0IDJweCAwIDAgLTFweCAke0FCbHVlNTAwfSxcbiAgICAgICAgaW5zZXQgLTJweCAwIDAgLTFweCAke0FCbHVlNTAwfTtcbmA7XG5jb25zdCBBa3RpdlBlcmlvZGVCYWtncnVubiA9IHN0eWxlZChBa3RpdlBlcmlvZGUpIGBcbiAgICBiYWNrZ3JvdW5kOiAke0FCbHVlNTB9O1xuYDtcbmV4cG9ydCBjb25zdCBBa3RpdnRVdHNuaXR0Qm9yZGVyID0gKHsgYWt0aXZ0VXRzbml0dCwgdGlkc2xpbmplc3RhcnQsIHRpZHNsaW5qZXNsdXR0LCBkaXJlY3Rpb24sIH0pID0+IHtcbiAgICBjb25zdCBzdHlsZSA9IHVzZVBvc2l0aW9uQW5kU2l6ZSh7XG4gICAgICAgIHBlcmlvZGU6IGFrdGl2dFV0c25pdHQsXG4gICAgICAgIHRpZHNsaW5qZXN0YXJ0LFxuICAgICAgICB0aWRzbGluamVzbHV0dCxcbiAgICAgICAgZGlyZWN0aW9uLFxuICAgIH0pO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChBa3RpdnRVdHNuaXR0Q29udGFpbmVyLCB7IGNsYXNzTmFtZTogJ2FrdGl2dFV0c25pdHRDb250YWluZXInIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQWt0aXZQZXJpb2RlQm9yZGVyLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lcygnYWt0aXZQZXJpb2RlQm9yZGVyJyksIHN0eWxlOiBzdHlsZSB9KSkpO1xufTtcbmV4cG9ydCBjb25zdCBBa3RpdnRVdHNuaXR0QmFrZ3J1bm4gPSAoeyBha3RpdnRVdHNuaXR0LCB0aWRzbGluamVzdGFydCwgdGlkc2xpbmplc2x1dHQsIGRpcmVjdGlvbiwgfSkgPT4ge1xuICAgIGNvbnN0IHN0eWxlID0gdXNlUG9zaXRpb25BbmRTaXplKHtcbiAgICAgICAgcGVyaW9kZTogYWt0aXZ0VXRzbml0dCxcbiAgICAgICAgdGlkc2xpbmplc3RhcnQsXG4gICAgICAgIHRpZHNsaW5qZXNsdXR0LFxuICAgICAgICBkaXJlY3Rpb24sXG4gICAgfSk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEFrdGl2dFV0c25pdHRDb250YWluZXIsIHsgY2xhc3NOYW1lOiAnYWt0aXZ0VXRzbml0dENvbnRhaW5lcicgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChBa3RpdlBlcmlvZGVCYWtncnVubiwgeyBjbGFzc05hbWU6IGNsYXNzTmFtZXMoJ2FrdGl2UGVyaW9kZUJha2dydW5uJyksIHN0eWxlOiBzdHlsZSB9KSkpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFrdGl2dFV0c25pdHQuanMubWFwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgZXJTeW5saWcgfSBmcm9tICcuL2ZpbHRlci5qcyc7XG5pbXBvcnQgeyBob3Jpem9udGFsUG9zaXRpb25BbmRXaWR0aCB9IGZyb20gJy4vY2FsYy5qcyc7XG5pbXBvcnQgJ2RheWpzL2xvY2FsZS9uYic7XG5pbXBvcnQgeyBBR3JheTYwMCwgQVNwYWNpbmc0IH0gZnJvbSAnQG5hdmlrdC9kcy10b2tlbnMvZGlzdC90b2tlbnMnO1xuZGF5anMubG9jYWxlKCduYicpO1xuY29uc3QgZm9ybWF0ZXJ0RGFnID0gKGRhdG8pID0+IGRhdG8uZm9ybWF0KCdERC5NTScpO1xuY29uc3QgZm9ybWF0ZXJ0TcOlbmVkID0gKGRhdG8pID0+IHtcbiAgICBjb25zdCBtw6VuZWRMYWJlbCA9IGRhdG8uZm9ybWF0KCdNTU0nKTtcbiAgICByZXR1cm4gbcOlbmVkTGFiZWxbMF0udG9VcHBlckNhc2UoKS5jb25jYXQobcOlbmVkTGFiZWwuc2xpY2UoMSwgMykpO1xufTtcbmNvbnN0IGZvcm1hdGVydMOFciA9IChkYXRvKSA9PiBgJHtkYXRvLnllYXIoKX1gO1xuZXhwb3J0IGNvbnN0IGRhZ3NldGlrZXR0ZXIgPSAoc3RhcnQsIHNsdXR0LCB0b3RhbHRBbnRhbGxEYWdlciwgZGlyZWN0aW9uKSA9PiB7XG4gICAgY29uc3QgaW5rcmVtZW50ID0gTWF0aC5jZWlsKHRvdGFsdEFudGFsbERhZ2VyIC8gMTApO1xuICAgIGNvbnN0IHNpc3RlRGFnID0gc2x1dHQuc3RhcnRPZignZGF5Jyk7XG4gICAgcmV0dXJuIG5ldyBBcnJheSh0b3RhbHRBbnRhbGxEYWdlcilcbiAgICAgICAgLmZpbGwoc2lzdGVEYWcpXG4gICAgICAgIC5tYXAoKGRlbm5lRGFnZW4sIGkpID0+IHtcbiAgICAgICAgaWYgKGkgJSBpbmtyZW1lbnQgIT09IDApXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgZGFnID0gZGVubmVEYWdlbi5zdWJ0cmFjdChpLCAnZGF5Jyk7XG4gICAgICAgIGNvbnN0IHsgaG9yaXpvbnRhbFBvc2l0aW9uLCB3aWR0aCB9ID0gaG9yaXpvbnRhbFBvc2l0aW9uQW5kV2lkdGgoZGFnLCBkYWcuYWRkKDEsICdkYXknKSwgc3RhcnQsIHNsdXR0KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uLFxuICAgICAgICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uOiBob3Jpem9udGFsUG9zaXRpb24sXG4gICAgICAgICAgICBsYWJlbDogZm9ybWF0ZXJ0RGFnKGRhZyksXG4gICAgICAgICAgICBkYXRlOiBkYWcudG9EYXRlKCksXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgIH07XG4gICAgfSlcbiAgICAgICAgLmZpbHRlcihldGlrZXR0ID0+IGV0aWtldHQgIT09IG51bGwpO1xufTtcbmV4cG9ydCBjb25zdCBtw6VuZWRzZXRpa2V0dGVyID0gKHN0YXJ0LCBzbHV0dCwgZGlyZWN0aW9uKSA9PiB7XG4gICAgY29uc3Qgc3RhcnRtw6VuZWQgPSBzdGFydC5zdGFydE9mKCdtb250aCcpO1xuICAgIGNvbnN0IHNsdXR0bcOlbmVkID0gc2x1dHQuZW5kT2YoJ21vbnRoJyk7XG4gICAgY29uc3QgYW50YWxsTcOlbmVkZXIgPSBzbHV0dG3DpW5lZC5kaWZmKHN0YXJ0bcOlbmVkLCAnbW9udGgnKSArIDE7XG4gICAgcmV0dXJuIG5ldyBBcnJheShhbnRhbGxNw6VuZWRlcikuZmlsbChzdGFydG3DpW5lZCkubWFwKChkZW5uZU3DpW5lZGVuLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IG3DpW5lZCA9IGRlbm5lTcOlbmVkZW4uYWRkKGksICdtb250aCcpO1xuICAgICAgICBjb25zdCB7IGhvcml6b250YWxQb3NpdGlvbiwgd2lkdGggfSA9IGhvcml6b250YWxQb3NpdGlvbkFuZFdpZHRoKG3DpW5lZCwgbcOlbmVkLmFkZCgxLCAnbW9udGgnKSwgc3RhcnQsIHNsdXR0KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uLFxuICAgICAgICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uOiBob3Jpem9udGFsUG9zaXRpb24sXG4gICAgICAgICAgICBsYWJlbDogZm9ybWF0ZXJ0TcOlbmVkKG3DpW5lZCksXG4gICAgICAgICAgICBkYXRlOiBtw6VuZWQudG9EYXRlKCksXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgIH07XG4gICAgfSk7XG59O1xuZXhwb3J0IGNvbnN0IMOlcnNldGlrZXR0ZXIgPSAoc3RhcnQsIHNsdXR0LCBkaXJlY3Rpb24pID0+IHtcbiAgICBjb25zdCBmw7hyc3Rlw4VyID0gc3RhcnQuc3RhcnRPZigneWVhcicpO1xuICAgIGNvbnN0IHNpc3Rlw4VyID0gc2x1dHQuZW5kT2YoJ3llYXInKTtcbiAgICBjb25zdCBhbnRhbGzDhXIgPSBzaXN0ZcOFci5kaWZmKHN0YXJ0LCAneWVhcicpICsgMTtcbiAgICByZXR1cm4gbmV3IEFycmF5KGFudGFsbMOFcikuZmlsbChmw7hyc3Rlw4VyKS5tYXAoKGRldHRlw4VyZXQsIGkpID0+IHtcbiAgICAgICAgY29uc3Qgw6VyID0gZGV0dGXDhXJldC5hZGQoaSwgJ3llYXInKTtcbiAgICAgICAgY29uc3QgeyBob3Jpem9udGFsUG9zaXRpb24sIHdpZHRoIH0gPSBob3Jpem9udGFsUG9zaXRpb25BbmRXaWR0aCjDpXIsIMOlci5hZGQoMSwgJ3llYXInKSwgc3RhcnQsIHNsdXR0KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uLFxuICAgICAgICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uOiBob3Jpem9udGFsUG9zaXRpb24sXG4gICAgICAgICAgICBsYWJlbDogZm9ybWF0ZXJ0w4VyKMOlciksXG4gICAgICAgICAgICBkYXRlOiDDpXIudG9EYXRlKCksXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgIH07XG4gICAgfSk7XG59O1xuY29uc3QgYXhpc0xhYmVscyA9IChzdGFydCwgc2x1dHQsIGRpcmVjdGlvbikgPT4ge1xuICAgIGNvbnN0IHRvdGFsdEFudGFsbERhZ2VyID0gc2x1dHQuZGlmZihzdGFydCwgJ2RheScpO1xuICAgIGlmICh0b3RhbHRBbnRhbGxEYWdlciA8IDQwKSB7XG4gICAgICAgIHJldHVybiBkYWdzZXRpa2V0dGVyKHN0YXJ0LCBzbHV0dCwgdG90YWx0QW50YWxsRGFnZXIsIGRpcmVjdGlvbik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRvdGFsdEFudGFsbERhZ2VyIDwgMzcwKSB7XG4gICAgICAgIHJldHVybiBtw6VuZWRzZXRpa2V0dGVyKHN0YXJ0LCBzbHV0dCwgZGlyZWN0aW9uKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiDDpXJzZXRpa2V0dGVyKHN0YXJ0LCBzbHV0dCwgZGlyZWN0aW9uKTtcbiAgICB9XG59O1xuY29uc3QgRXRpa2V0dGVyID0gc3R5bGVkLmRpdiBgXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMXJlbTtcbiAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgICBtYXJnaW4tYm90dG9tOiAke0FTcGFjaW5nNH07XG5cbiAgICA+ICoge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgICAgICBjb2xvcjogJHtBR3JheTYwMH07XG4gICAgfVxuYDtcbmV4cG9ydCBjb25zdCBBeGlzTGFiZWxzID0gKHsgc3RhcnQsIHNsdXR0LCBkaXJlY3Rpb24gPSAnbGVmdCcsIGV0aWtldHRSZW5kZXIsIH0pID0+IHtcbiAgICBjb25zdCBsYWJlbHMgPSBheGlzTGFiZWxzKHN0YXJ0LCBzbHV0dCwgZGlyZWN0aW9uKS5maWx0ZXIoZXJTeW5saWcpO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChFdGlrZXR0ZXIsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWVzKCdldGlrZXR0ZXInKSB9LCBsYWJlbHMubWFwKGV0aWtldHQgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGtleTogZXRpa2V0dC5sYWJlbCwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6IGRpcmVjdGlvbiA9PT0gJ2xlZnQnID8gJ2ZsZXgtc3RhcnQnIDogJ2ZsZXgtZW5kJyxcbiAgICAgICAgICAgICAgICBbZGlyZWN0aW9uXTogYCR7ZXRpa2V0dC5ob3Jpem9udGFsUG9zaXRpb259JWAsXG4gICAgICAgICAgICAgICAgd2lkdGg6IGAke2V0aWtldHQud2lkdGh9JWAsXG4gICAgICAgICAgICB9IH0sIChfYSA9IGV0aWtldHRSZW5kZXIgPT09IG51bGwgfHwgZXRpa2V0dFJlbmRlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXRpa2V0dFJlbmRlcihldGlrZXR0KSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZXRpa2V0dC5sYWJlbCkpO1xuICAgIH0pKSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXhpc0xhYmVscy5qcy5tYXAiLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnO1xuaW1wb3J0IHsgcG9zaXRpb24gfSBmcm9tICcuL2NhbGMuanMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBUb29sdGlwIH0gZnJvbSAnLi9Ub29sdGlwLmpzJztcbmltcG9ydCB7IEFSZWQ1MDAgfSBmcm9tICdAbmF2aWt0L2RzLXRva2Vucy9kaXN0L3Rva2Vucyc7XG5jb25zdCBTdHlsZWRUb29sdGlwID0gc3R5bGVkKFRvb2x0aXApIGBcbiAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICB0b3A6IC0xMHB4O1xuYDtcbmNvbnN0IFBpblZpZXcgPSAoeyByZW5kZXIgfSkgPT4ge1xuICAgIGNvbnN0IFtzaG93UmVuZGVyLCBzZXRTaG93UmVuZGVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGluU3R5bGUsIHsgY2xhc3NOYW1lOiAncGluJywgb25Nb3VzZU92ZXI6ICgpID0+IHNldFNob3dSZW5kZXIodHJ1ZSksIG9uTW91c2VMZWF2ZTogKCkgPT4gc2V0U2hvd1JlbmRlcihmYWxzZSkgfSwgc2hvd1JlbmRlciAmJiByZW5kZXIgJiYgUmVhY3QuY3JlYXRlRWxlbWVudChTdHlsZWRUb29sdGlwLCB7IGNsYXNzTmFtZTogJ3Rvb2x0aXAnIH0sIHJlbmRlcikpKTtcbn07XG5jb25zdCBQaW5zU3R5bGUgPSBzdHlsZWQuZGl2IGBcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuYDtcbmNvbnN0IFBpblN0eWxlID0gc3R5bGVkLmRpdiBgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGhlaWdodDogY2FsYygxMDAlICsgMTBweCk7XG4gICAgdG9wOiAtMjJweDtcbiAgICB3aWR0aDogMXB4O1xuICAgIGJhY2tncm91bmQ6ICMwMDAwMDA7XG5cbiAgICAmOmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgd2lkdGg6IDE4cHg7XG4gICAgICAgIGhlaWdodDogMThweDtcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgICAgICAgYm9yZGVyOiA2cHggc29saWQgJHtBUmVkNTAwfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtOC41cHgsIC05LjVweCk7XG4gICAgfVxuYDtcbmNvbnN0IFBpbkNvbnRhaW5lciA9IHN0eWxlZC5zcGFuIGBcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuYDtcbmV4cG9ydCBjb25zdCBQaW5zID0gKHsgcGlucywgc3RhcnQsIHNsdXR0LCBkaXJlY3Rpb24gfSkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGluc1N0eWxlLCB7IGNsYXNzTmFtZTogJ3BpbnMnIH0sIHBpbnMubWFwKCh7IGRhdGUsIHJlbmRlciB9LCBpKSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChQaW5Db250YWluZXIsIHsga2V5OiBpLCBjbGFzc05hbWU6ICdjb250YWluZXInLCBzdHlsZTogeyBbZGlyZWN0aW9uXTogYCR7cG9zaXRpb24oZGF5anMoZGF0ZSksIHN0YXJ0LCBzbHV0dCl9JWAgfSB9LFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGluVmlldywgeyByZW5kZXI6IHJlbmRlciB9KSkpKSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UGlucy5qcy5tYXAiLCJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgQWt0aXZ0VXRzbml0dEJha2dydW5uLCBBa3RpdnRVdHNuaXR0Qm9yZGVyIH0gZnJvbSAnLi9Ba3RpdnRVdHNuaXR0LmpzJztcbmltcG9ydCB7IEF4aXNMYWJlbHMgfSBmcm9tICcuL0F4aXNMYWJlbHMuanMnO1xuaW1wb3J0IHsgRW1wdHlUaW1lbGluZVJvdywgVGltZWxpbmVSb3cgfSBmcm9tICcuL1RpbWVsaW5lUm93LmpzJztcbmltcG9ydCB7IHVzZVNlbmVzdGVEYXRvLCB1c2VUaWRsaWdzdGVEYXRvLCB1c2VUaWRzbGluamVyYWRlciB9IGZyb20gJy4vdXNlVGlkc2xpbmplcmFkZXIuanMnO1xuaW1wb3J0IHsgUGlucyB9IGZyb20gJy4vUGlucy5qcyc7XG5pbXBvcnQgeyBBU3BhY2luZzMsIEFTcGFjaW5nNCB9IGZyb20gJ0BuYXZpa3QvZHMtdG9rZW5zL2Rpc3QvdG9rZW5zJztcbmNvbnN0IFRpZHNsaW5qZVN0eWxlID0gc3R5bGVkLmRpdiBgXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHBhZGRpbmc6ICR7QVNwYWNpbmczfSAwO1xuICAgIG1hcmdpbjogMCAke0FTcGFjaW5nNH07XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGZsZXg6IDE7XG5gO1xuY29uc3QgVGlkc2xpbmplUmFkU3R5bGUgPSBzdHlsZWQuZGl2IGBcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgcGFkZGluZzogMDtcbiAgICBib3JkZXItdG9wOiAke3Byb3BzID0+IGAke3Byb3BzLiRrb21wYWt0ID8gJ25vbmUnIDogJzFweCBzb2xpZCAjZTdlOWU5J31gfTtcblxuICAgIC50aWRzbGluamVyYWQuZsO4cnN0ZXJhZCxcbiAgICBoci5mw7hyc3RlcmFkIHtcbiAgICAgICAgbWFyZ2luLXRvcDogJHtwcm9wcyA9PiBgJHtwcm9wcy4ka29tcGFrdCA/ICcwcmVtJyA6ICcxLjU2cmVtJ31gfTtcbiAgICB9XG5gO1xuY29uc3QgRW1wdHlSb3dzU3R5bGUgPSBzdHlsZWQuZGl2IGBcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuYDtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9kaXNwbGF5LW5hbWVcbmNvbnN0IFRpbWVsaW5lID0gUmVhY3QubWVtbygoeyBwaW5zLCByb3dzLCBzdGFydCwgZW5kSW5jbHVzaXZlLCBvblNlbGVjdFBlcmlvZCwgYWt0aXZ0VXRzbml0dCwgYWN0aXZlUm93LCBkaXJlY3Rpb24sIGF4aXNMYWJlbFJlbmRlcmVyLCBrb21wYWt0ID0gZmFsc2UsIH0pID0+IHtcbiAgICBjb25zdCBvblNlbGVjdFBlcmlvZGVXcmFwcGVyID0gb25TZWxlY3RQZXJpb2QgJiZcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL3J1bGVzLW9mLWhvb2tzXG4gICAgICAgIHVzZUNhbGxiYWNrKChwZXJpb2RlKSA9PiB7XG4gICAgICAgICAgICBvblNlbGVjdFBlcmlvZCA9PT0gbnVsbCB8fCBvblNlbGVjdFBlcmlvZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogb25TZWxlY3RQZXJpb2Qoe1xuICAgICAgICAgICAgICAgIGlkOiBwZXJpb2RlLmlkLFxuICAgICAgICAgICAgICAgIGZvbTogcGVyaW9kZS5zdGFydC50b0RhdGUoKSxcbiAgICAgICAgICAgICAgICB0b206IHBlcmlvZGUuZW5kSW5jbHVzaXZlLnRvRGF0ZSgpLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBwZXJpb2RlLmRpc2FibGVkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogcGVyaW9kZS5zdGF0dXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgW29uU2VsZWN0UGVyaW9kXSk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFRpZHNsaW5qZVN0eWxlLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lcygndGlkc2xpbmplJykgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChBeGlzTGFiZWxzLCB7IHN0YXJ0OiBzdGFydCwgc2x1dHQ6IGVuZEluY2x1c2l2ZSwgZGlyZWN0aW9uOiBkaXJlY3Rpb24sIGV0aWtldHRSZW5kZXI6IGF4aXNMYWJlbFJlbmRlcmVyIH0pLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRpZHNsaW5qZVJhZFN0eWxlLCB7IFwiJGtvbXBha3RcIjoga29tcGFrdCwgY2xhc3NOYW1lOiBjbGFzc05hbWVzKCd0aWRzbGluamVyYWRlcicpIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEVtcHR5Um93c1N0eWxlLCBudWxsLCByb3dzLm1hcCgoXywgaSkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRW1wdHlUaW1lbGluZVJvdywgeyBrb21wYWt0OiBrb21wYWt0LCBjbGFzc05hbWU6IGNsYXNzTmFtZXMoaSA9PT0gMCAmJiAnZsO4cnN0ZXJhZCcpLCBrZXk6IGksIGFjdGl2ZTogaSA9PT0gYWN0aXZlUm93IH0pKSkpLFxuICAgICAgICAgICAgcGlucyAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChQaW5zLCB7IHBpbnM6IHBpbnMsIHN0YXJ0OiBzdGFydCwgc2x1dHQ6IGVuZEluY2x1c2l2ZSwgZGlyZWN0aW9uOiBkaXJlY3Rpb24gfSkpLFxuICAgICAgICAgICAgYWt0aXZ0VXRzbml0dCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChBa3RpdnRVdHNuaXR0QmFrZ3J1bm4sIHsgdGlkc2xpbmplc3RhcnQ6IHN0YXJ0LCB0aWRzbGluamVzbHV0dDogZW5kSW5jbHVzaXZlLCBha3RpdnRVdHNuaXR0OiBha3RpdnRVdHNuaXR0LCBkaXJlY3Rpb246IGRpcmVjdGlvbiB9KSksXG4gICAgICAgICAgICByb3dzLm1hcCgodGlkc2xpbmplLCBpKSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChUaW1lbGluZVJvdywgT2JqZWN0LmFzc2lnbih7IGtleTogdGlkc2xpbmplLmlkLCBjbGFzc05hbWU6IGNsYXNzTmFtZXMoaSA9PT0gMCAmJiAnZsO4cnN0ZXJhZCcpIH0sIHRpZHNsaW5qZSwgeyBvblNlbGVjdFBlcmlvZDogb25TZWxlY3RQZXJpb2RlV3JhcHBlciwgYWN0aXZlOiBpID09PSBhY3RpdmVSb3csIGtvbXBha3Q6IGtvbXBha3QgfSkpKSksXG4gICAgICAgICAgICBha3RpdnRVdHNuaXR0ICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KEFrdGl2dFV0c25pdHRCb3JkZXIsIHsgdGlkc2xpbmplc3RhcnQ6IHN0YXJ0LCB0aWRzbGluamVzbHV0dDogZW5kSW5jbHVzaXZlLCBha3RpdnRVdHNuaXR0OiBha3RpdnRVdHNuaXR0LCBkaXJlY3Rpb246IGRpcmVjdGlvbiB9KSkpKSk7XG59KTtcbi8qKlxuICogVmlzZXIgcGVyaW9kZXIgaSBlbiB0aWRzbGluamUuXG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9kaXNwbGF5LW5hbWVcbmV4cG9ydCBjb25zdCBUaWRzbGluamUgPSBSZWFjdC5tZW1vKCh7IHBpbnMsIHJhZGVyLCBha3RpdlJhZCwgc3RhcnREYXRvLCBzbHV0dERhdG8sIGV0aWtldHRSZW5kZXIsIG9uU2VsZWN0UGVyaW9kZSwgYWt0aXZ0VXRzbml0dCwgcmV0bmluZyA9ICdzdGlnZW5kZScsIGtvbXBha3QgPSBmYWxzZSwgfSkgPT4ge1xuICAgIGlmICghcmFkZXIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGlkc2xpbmplbiBtYW5nbGVyIHJhZGVyLicpO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IHJldG5pbmcgPT09ICdzdGlnZW5kZScgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgIGNvbnN0IHN0YXJ0ID0gdXNlVGlkbGlnc3RlRGF0byh7IHN0YXJ0RGF0bywgcmFkZXIgfSkuc3RhcnRPZignZGF5Jyk7XG4gICAgY29uc3QgZW5kSW5jbHVzaXZlID0gdXNlU2VuZXN0ZURhdG8oeyBzbHV0dERhdG8sIHJhZGVyIH0pLmVuZE9mKCdkYXknKTtcbiAgICBjb25zdCByb3dzID0gdXNlVGlkc2xpbmplcmFkZXIocmFkZXIsIHN0YXJ0LCBlbmRJbmNsdXNpdmUsIGRpcmVjdGlvbik7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFRpbWVsaW5lLCB7IHJvd3M6IHJvd3MsIHN0YXJ0OiBzdGFydCwgYWN0aXZlUm93OiBha3RpdlJhZCwgZGlyZWN0aW9uOiBkaXJlY3Rpb24sIGVuZEluY2x1c2l2ZTogZW5kSW5jbHVzaXZlLCBvblNlbGVjdFBlcmlvZDogb25TZWxlY3RQZXJpb2RlLCBha3RpdnRVdHNuaXR0OiBha3RpdnRVdHNuaXR0LCBheGlzTGFiZWxSZW5kZXJlcjogZXRpa2V0dFJlbmRlciwgcGluczogcGlucywga29tcGFrdDoga29tcGFrdCB9KSk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRpZHNsaW5qZS5qcy5tYXAiLCJpbXBvcnQgUmVhY3QsIHsgdXNlTGF5b3V0RWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlLCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgVG9vbHRpcCB9IGZyb20gJy4vVG9vbHRpcC5qcyc7XG5pbXBvcnQgc3R5bGVkLCB7IGNzcyB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmNvbnN0IGZlbGxlc1BlcmlvZGVTdHlsZSA9IGNzcyBgXG4gICAgYmFja2dyb3VuZDogI2U3ZTllOTtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgIzU5NTE0YjtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzU5NTE0YjtcblxuICAgIGJvcmRlci1yYWRpdXM6IDEuNXJlbTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAwLjFzIGVhc2U7XG4gICAgcGFkZGluZzogMDtcblxuICAgICYubWluaSB7XG4gICAgICAgIG1pbi13aWR0aDogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAmLm1pbmk6YmVmb3JlIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG5cbiAgICAmLmFkdmFyc2VsIHtcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZTljYztcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2ZmOTEwMDtcbiAgICB9XG5cbiAgICAmLmZlaWwge1xuICAgICAgICBiYWNrZ3JvdW5kOiAjZjFkOGQ0O1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjYmEzYTI2O1xuICAgIH1cblxuICAgICYuaW5ha3RpdiB7XG4gICAgICAgIGJhY2tncm91bmQ6ICNlN2U5ZTk7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICM3ODcwNmE7XG4gICAgfVxuXG4gICAgJi5zdWtzZXNzIHtcbiAgICAgICAgYmFja2dyb3VuZDogI2NkZTdkODtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgIzExNzkzODtcbiAgICB9XG5cbiAgICAmLnNhbW1lbmhlbmdlbmRlRnJhSMO4eXJlIHtcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDA7XG4gICAgICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwO1xuICAgIH1cblxuICAgICYuc2FtbWVuaGVuZ2VuZGVGcmFWZW5zdHJlIHtcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDtcbiAgICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMDtcbiAgICB9XG5cbiAgICAmLnNhbW1lbmhlbmdlbmRlRnJhQmVnZ2Uge1xuICAgICAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMDtcbiAgICAgICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDA7XG4gICAgICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDA7XG4gICAgICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDA7XG4gICAgfVxuXG4gICAgJi5jcm9wcGVkSMO4eXJlIHtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiBub25lO1xuICAgIH1cblxuICAgICYuY3JvcHBlZFZlbnN0cmUge1xuICAgICAgICBib3JkZXItbGVmdDogbm9uZTtcbiAgICB9XG5cbiAgICAmLmNyb3BwZWRCZWdnZSB7XG4gICAgICAgIGJvcmRlci1sZWZ0OiBub25lO1xuICAgICAgICBib3JkZXItcmlnaHQ6IG5vbmU7XG4gICAgfVxuYDtcbmNvbnN0IEluZm9QaW4gPSBzdHlsZWQuZGl2IGBcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYmFja2dyb3VuZDogIzAwNjdjNTtcbiAgICBoZWlnaHQ6IDZweDtcbiAgICB3aWR0aDogMnB4O1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiA1MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTFweCwgLTdweCk7XG5cbiAgICAmOmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgd2lkdGg6IDEwcHg7XG4gICAgICAgIGhlaWdodDogMTBweDtcbiAgICAgICAgYmFja2dyb3VuZDogIzAwNjdjNTtcbiAgICAgICAgdHJhbnNmb3JtOiAke3Byb3BzID0+IGB0cmFuc2xhdGUoLSR7cHJvcHMuJHDDpVBlcmlvZGVLbmFwcCA/IDUgOiA0fXB4LCAtMTAwJSlgfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIH1cbmA7XG5jb25zdCBQZXJpb2RlSW5uaG9sZCA9IHN0eWxlZC5kaXYgYFxuICAgIG1hcmdpbjogJHtwcm9wcyA9PiBgJHtwcm9wcy4ka29tcGFrdCA/IDAgOiAwLjN9cmVtIDAuM3JlbWB9O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB0ZXh0LW92ZXJmbG93OiBjbGlwO1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHRvcDogJHtwcm9wcyA9PiBgJHtwcm9wcy4ka29tcGFrdCA/IDAgOiAtMn1weGB9O1xuYDtcbmNvbnN0IFBlcmlvZGVLbmFwcCA9IHN0eWxlZC5idXR0b24gYFxuICAgIGhlaWdodDogJHtwcm9wcyA9PiBgJHtwcm9wcy4ka29tcGFrdCA/IDEuNSA6IDJ9cmVtYH07XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICAgJi5hZHZhcnNlbCB7XG4gICAgICAgICY6aG92ZXIsXG4gICAgICAgICYuYWN0aXZlLFxuICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZWQ3YTM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAmLmZlaWwge1xuICAgICAgICAmOmhvdmVyLFxuICAgICAgICAmLmFjdGl2ZSxcbiAgICAgICAgJjpmb2N1cyB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZTNiMGE4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJi5pbmFrdGl2IHtcbiAgICAgICAgJjpob3ZlcixcbiAgICAgICAgJi5hY3RpdmUsXG4gICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogI2MzYzNjMztcbiAgICAgICAgfVxuICAgIH1cblxuICAgICYuc3Vrc2VzcyB7XG4gICAgICAgICY6aG92ZXIsXG4gICAgICAgICYuYWN0aXZlLFxuICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICM5YmQwYjA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtmZWxsZXNQZXJpb2RlU3R5bGV9XG5gO1xuY29uc3QgUGVyaW9kZURpdiA9IHN0eWxlZC5kaXYgYFxuICAgIGhlaWdodDogJHtwcm9wcyA9PiBgJHtwcm9wcy4ka29tcGFrdCA/IDEuNSA6IDJ9cmVtYH07XG4gICAgJHtmZWxsZXNQZXJpb2RlU3R5bGV9XG5gO1xuY29uc3QgYXJpYUxhYmVsID0gKHBlcmlvZCkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0ID0gcGVyaW9kLnN0YXJ0LmZvcm1hdCgnREQuTU0uWVlZWScpO1xuICAgIGNvbnN0IGVuZCA9IHBlcmlvZC5lbmRJbmNsdXNpdmUuZm9ybWF0KCdERC5NTS5ZWVlZJyk7XG4gICAgcmV0dXJuIGAke3BlcmlvZC5zdGF0dXN9IGZyYSAke3N0YXJ0fSB0aWwgb2cgbWVkICR7ZW5kfWA7XG59O1xuY29uc3Qgc3R5bGUgPSAocGVyaW9kKSA9PiAoe1xuICAgIFtwZXJpb2QuZGlyZWN0aW9uXTogYCR7cGVyaW9kLmhvcml6b250YWxQb3NpdGlvbn0lYCxcbiAgICB3aWR0aDogYCR7cGVyaW9kLndpZHRofSVgLFxufSk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QvZGlzcGxheS1uYW1lXG5jb25zdCBDbGlja2FibGVQZXJpb2QgPSBSZWFjdC5tZW1vKCh7IGJ1dHRvblJlZiwgcGVyaW9kLCBjbGFzc05hbWUsIG9uU2VsZWN0UGVyaW9kLCBrb21wYWt0IH0pID0+IHtcbiAgICBjb25zdCBbc2hvd0hvdmVyTGFiZWwsIHNldFNob3dIb3ZlckxhYmVsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBvbkNsaWNrID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXBlcmlvZC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgb25TZWxlY3RQZXJpb2QgPT09IG51bGwgfHwgb25TZWxlY3RQZXJpb2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9uU2VsZWN0UGVyaW9kKHBlcmlvZCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGVuYWJsZUhvdmVyTGFiZWwgPSAoKSA9PiB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnVzZWQtZXhwcmVzc2lvblxuICAgICAgICBwZXJpb2QuaG92ZXJMYWJlbCAmJiBzZXRTaG93SG92ZXJMYWJlbCh0cnVlKTtcbiAgICB9O1xuICAgIGNvbnN0IGRpc2FibGVIb3ZlckxhYmVsID0gKCkgPT4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW51c2VkLWV4cHJlc3Npb25cbiAgICAgICAgcGVyaW9kLmhvdmVyTGFiZWwgJiYgc2V0U2hvd0hvdmVyTGFiZWwoZmFsc2UpO1xuICAgIH07XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFBlcmlvZGVLbmFwcCwgeyBcIiRrb21wYWt0XCI6IGtvbXBha3QsIHJlZjogYnV0dG9uUmVmLCBjbGFzc05hbWU6IGNsYXNzTmFtZSwgb25DbGljazogb25DbGljaywgb25Nb3VzZUVudGVyOiBlbmFibGVIb3ZlckxhYmVsLCBvbk1vdXNlTGVhdmU6IGRpc2FibGVIb3ZlckxhYmVsLCBcImFyaWEtbGFiZWxcIjogYXJpYUxhYmVsKHBlcmlvZCksIHN0eWxlOiBzdHlsZShwZXJpb2QpIH0sXG4gICAgICAgIHBlcmlvZC5ob3ZlckxhYmVsICYmIHNob3dIb3ZlckxhYmVsICYmIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVG9vbHRpcCwgbnVsbCwgcGVyaW9kLmhvdmVyTGFiZWwpLFxuICAgICAgICBwZXJpb2QuaW5mb1BpbiAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KEluZm9QaW4sIHsgXCIkcFxcdTAwRTVQZXJpb2RlS25hcHBcIjogdHJ1ZSwgY2xhc3NOYW1lOiAnaW5mb1BpbicgfSksXG4gICAgICAgIHBlcmlvZC5jaGlsZHJlbiAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChQZXJpb2RlSW5uaG9sZCwgeyBcIiRrb21wYWt0XCI6IGtvbXBha3QgfSwgcGVyaW9kLmNoaWxkcmVuKSkpKTtcbn0pO1xuY29uc3QgTm9uQ2xpY2thYmxlUGVyaW9kID0gKHsgZGl2UmVmLCBwZXJpb2QsIGNsYXNzTmFtZSwga29tcGFrdCB9KSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChQZXJpb2RlRGl2LCB7IFwiJGtvbXBha3RcIjoga29tcGFrdCwgcmVmOiBkaXZSZWYsIGNsYXNzTmFtZTogY2xhc3NOYW1lLCBcImFyaWEtbGFiZWxcIjogYXJpYUxhYmVsKHBlcmlvZCksIHN0eWxlOiBzdHlsZShwZXJpb2QpIH0sXG4gICAgcGVyaW9kLmluZm9QaW4gJiYgUmVhY3QuY3JlYXRlRWxlbWVudChJbmZvUGluLCB7IGNsYXNzTmFtZTogJ2luZm9QaW4nIH0pLFxuICAgIHBlcmlvZC5jaGlsZHJlbiAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KFBlcmlvZGVJbm5ob2xkLCB7IFwiJGtvbXBha3RcIjoga29tcGFrdCB9LCBwZXJpb2QuY2hpbGRyZW4pKSk7XG5jb25zdCBmaW5uQ2xhc3NuYW1lcyA9IChwZXJpb2QsIGFjdGl2ZSwgaXNNaW5pKSA9PiB7XG4gICAgY29uc3QgbmV3Q2xhc3NOYW1lcyA9IFtdO1xuICAgIHN3aXRjaCAocGVyaW9kLmNyb3BwZWQpIHtcbiAgICAgICAgY2FzZSAnYm90aCc6XG4gICAgICAgICAgICBuZXdDbGFzc05hbWVzLnB1c2goJ2Nyb3BwZWRCZWdnZScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgaWYgKHBlcmlvZC5kaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgIG5ld0NsYXNzTmFtZXMucHVzaCgnY3JvcHBlZFZlbnN0cmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0NsYXNzTmFtZXMucHVzaCgnY3JvcHBlZEjDuHlyZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgIGlmIChwZXJpb2QuZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICBuZXdDbGFzc05hbWVzLnB1c2goJ2Nyb3BwZWRIw7h5cmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0NsYXNzTmFtZXMucHVzaCgnY3JvcHBlZFZlbnN0cmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHN3aXRjaCAocGVyaW9kLmNvbm5lY3RpbmdFZGdlKSB7XG4gICAgICAgIGNhc2UgJ2JvdGgnOlxuICAgICAgICAgICAgbmV3Q2xhc3NOYW1lcy5wdXNoKCdzYW1tZW5oZW5nZW5kZUZyYUJlZ2dlJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICBpZiAocGVyaW9kLmRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgbmV3Q2xhc3NOYW1lcy5wdXNoKCdzYW1tZW5oZW5nZW5kZUZyYVZlbnN0cmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0NsYXNzTmFtZXMucHVzaCgnc2FtbWVuaGVuZ2VuZGVGcmFIw7h5cmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICBpZiAocGVyaW9kLmRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgbmV3Q2xhc3NOYW1lcy5wdXNoKCdzYW1tZW5oZW5nZW5kZUZyYUjDuHlyZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3Q2xhc3NOYW1lcy5wdXNoKCdzYW1tZW5oZW5nZW5kZUZyYVZlbnN0cmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgbmV3Q2xhc3NOYW1lcy5wdXNoKCdhY3RpdmUnKTtcbiAgICB9XG4gICAgaWYgKGlzTWluaSkge1xuICAgICAgICBuZXdDbGFzc05hbWVzLnB1c2goJ21pbmknKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0NsYXNzTmFtZXM7XG59O1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L2Rpc3BsYXktbmFtZVxuZXhwb3J0IGNvbnN0IFRpbWVsaW5lUGVyaW9kID0gUmVhY3QubWVtbygoeyBwZXJpb2QsIG9uU2VsZWN0UGVyaW9kLCBhY3RpdmUsIGtvbXBha3QgfSkgPT4ge1xuICAgIGNvbnN0IHJlZiA9IHVzZVJlZihudWxsKTtcbiAgICBjb25zdCBbaXNNaW5pLCBzZXRJc01pbmldID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoJ3BlcmlvZGUnLCBmaW5uQ2xhc3NuYW1lcyhwZXJpb2QsIGFjdGl2ZSwgaXNNaW5pKSwgcGVyaW9kLnN0YXR1cywgcGVyaW9kLmNsYXNzTmFtZSk7XG4gICAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBjdXJyZW50V2lkdGggPSAoX2EgPSByZWYuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm9mZnNldFdpZHRoO1xuICAgICAgICBpZiAoY3VycmVudFdpZHRoICYmIGN1cnJlbnRXaWR0aCA8IDMwKSB7XG4gICAgICAgICAgICBzZXRJc01pbmkodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xuICAgIH0sIFtyZWYuY3VycmVudF0pO1xuICAgIHJldHVybiBvblNlbGVjdFBlcmlvZCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KENsaWNrYWJsZVBlcmlvZCwgeyBidXR0b25SZWY6IHJlZiwgcGVyaW9kOiBwZXJpb2QsIG9uU2VsZWN0UGVyaW9kOiBvblNlbGVjdFBlcmlvZCwgY2xhc3NOYW1lOiBjbGFzc05hbWUsIGtvbXBha3Q6IGtvbXBha3QgfSkpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTm9uQ2xpY2thYmxlUGVyaW9kLCB7IGRpdlJlZjogcmVmLCBwZXJpb2Q6IHBlcmlvZCwgY2xhc3NOYW1lOiBjbGFzc05hbWUsIGtvbXBha3Q6IGtvbXBha3QgfSkpO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UaW1lbGluZVBlcmlvZC5qcy5tYXAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IFRpbWVsaW5lUGVyaW9kIH0gZnJvbSAnLi9UaW1lbGluZVBlcmlvZC5qcyc7XG5pbXBvcnQgeyBBQmx1ZTUwLCBBR3JheTUwLCBBU3BhY2luZzQsIEFTcGFjaW5nNiwgQVNwYWNpbmc4IH0gZnJvbSAnQG5hdmlrdC9kcy10b2tlbnMvZGlzdC90b2tlbnMnO1xuY29uc3QgVGltZWxpbmVSb3dTdHlsZSA9IHN0eWxlZC5kaXYgYFxuICAgIGZsZXg6IDE7XG4gICAgaGVpZ2h0OiAke3Byb3BzID0+IGAke3Byb3BzLiRrb21wYWt0ID8gQVNwYWNpbmc2IDogQVNwYWNpbmc4fWB9O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbWFyZ2luLWJvdHRvbTogJHtwcm9wcyA9PiBgJHtwcm9wcy4ka29tcGFrdCA/IEFTcGFjaW5nNCA6IEFTcGFjaW5nNn1gfTtcbmA7XG5jb25zdCBFbXB0eVJvd0hyID0gc3R5bGVkLmhyIGBcbiAgICBmbGV4OiAxO1xuICAgIGhlaWdodDogJHtwcm9wcyA9PiBgJHtwcm9wcy4ka29tcGFrdCA/IEFTcGFjaW5nNiA6IEFTcGFjaW5nOH1gfTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtBR3JheTUwfTtcbiAgICBtYXJnaW4tYm90dG9tOiAke3Byb3BzID0+IGAke3Byb3BzLiRrb21wYWt0ID8gQVNwYWNpbmc0IDogQVNwYWNpbmc2fWB9O1xuXG4gICAgJi5ha3RpdlJhZCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7QUJsdWU1MH07XG4gICAgfVxuYDtcbmV4cG9ydCBjb25zdCBFbXB0eVRpbWVsaW5lUm93ID0gKHsgYWN0aXZlID0gZmFsc2UsIGtvbXBha3QgPSBmYWxzZSwgY2xhc3NOYW1lLCB9KSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChFbXB0eVJvd0hyLCB7IFwiJGtvbXBha3RcIjoga29tcGFrdCwgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGFjdGl2ZSAmJiAnYWt0aXZSYWQnLCBjbGFzc05hbWUpIH0pKTtcbmV4cG9ydCBjb25zdCBUaW1lbGluZVJvdyA9ICh7IHBlcmlvZHMsIG9uU2VsZWN0UGVyaW9kLCBhY3RpdmUgPSBmYWxzZSwga29tcGFrdCA9IGZhbHNlLCBjbGFzc05hbWUsIH0pID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFRpbWVsaW5lUm93U3R5bGUsIHsgXCIka29tcGFrdFwiOiBrb21wYWt0LCBjbGFzc05hbWU6IGNsYXNzTmFtZXMoJ3RpZHNsaW5qZXJhZCcsIGFjdGl2ZSAmJiAnYWt0aXZSYWQnLCBjbGFzc05hbWUpIH0sIHBlcmlvZHMubWFwKHBlcmlvZCA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChUaW1lbGluZVBlcmlvZCwgeyBrZXk6IHBlcmlvZC5pZCwgcGVyaW9kOiBwZXJpb2QsIG9uU2VsZWN0UGVyaW9kOiBvblNlbGVjdFBlcmlvZCwgYWN0aXZlOiBwZXJpb2QuYWN0aXZlLCBrb21wYWt0OiBrb21wYWt0IH0pKSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRpbWVsaW5lUm93LmpzLm1hcCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgQUdyYXk0MDAsIEFHcmF5NjAwLCBBR3JheTgwMCwgQVNwYWNpbmcyLCBBU3BhY2luZzQgfSBmcm9tICdAbmF2aWt0L2RzLXRva2Vucy9kaXN0L3Rva2Vucyc7XG5jb25zdCBUb29sdGlwQ29udGFpbmVyID0gc3R5bGVkLmRpdiBgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHBhZGRpbmc6ICR7QVNwYWNpbmcyfSAke0FTcGFjaW5nNH07XG4gICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgJHtBR3JheTYwMH07XG4gICAgY29sb3I6ICR7QUdyYXk4MDB9O1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiA1MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoY2FsYygtMTAwJSAtIDEwcHgpKTtcbiAgICBib3gtc2hhZG93OiAwIDJweCAycHggMCAke0FHcmF5NDAwfTtcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDAuMDVzO1xuICAgIGFuaW1hdGlvbi1uYW1lOiBmYWRlSW47XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgIHotaW5kZXg6IDEwMDA7XG5cbiAgICAmOmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAxMHB4O1xuICAgICAgICBoZWlnaHQ6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgYm90dG9tOiAtMXB4O1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHtBR3JheTYwMH07XG4gICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICR7QUdyYXk2MDB9O1xuICAgICAgICBib3gtc2hhZG93OiAycHggMnB4IDJweCAke0FHcmF5NDAwfTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoNTAlKSByb3RhdGUoNDVkZWcpO1xuICAgIH1cblxuICAgICY6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMnB4O1xuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm90dG9tOiAtMTJweDtcbiAgICAgICAgbGVmdDogMDtcbiAgICB9XG5gO1xuZXhwb3J0IGNvbnN0IFRvb2x0aXAgPSAoeyBjaGlsZHJlbiwgY2xhc3NOYW1lIH0pID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2x0aXBDb250YWluZXIsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSkgfSwgY2hpbGRyZW4pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRvb2x0aXAuanMubWFwIiwiaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJztcbmltcG9ydCBpc1NhbWVPckJlZm9yZSBmcm9tICdkYXlqcy9wbHVnaW4vaXNTYW1lT3JCZWZvcmUnO1xuaW1wb3J0IGlzU2FtZU9yQWZ0ZXIgZnJvbSAnZGF5anMvcGx1Z2luL2lzU2FtZU9yQWZ0ZXInO1xuZGF5anMuZXh0ZW5kKGlzU2FtZU9yQmVmb3JlKTtcbmRheWpzLmV4dGVuZChpc1NhbWVPckFmdGVyKTtcbmV4cG9ydCBjb25zdCBwb3NpdGlvbiA9IChkYXRlLCBzdGFydCwgZW5kSW5jbHVzaXZlKSA9PiB7XG4gICAgY29uc3QgZGlmZiA9IGVuZEluY2x1c2l2ZS5kaWZmKHN0YXJ0KTtcbiAgICByZXR1cm4gKGRhdGUuZGlmZihzdGFydCkgLyBkaWZmKSAqIDEwMDtcbn07XG5leHBvcnQgY29uc3QgaG9yaXpvbnRhbFBvc2l0aW9uQW5kV2lkdGggPSAoc3RhcnQsIGVuZEluY2x1c2l2ZSwgdGltZWxpbmVTdGFydCwgdGltZWxpbmVFbmRJbmNsdXNpdmUpID0+IHtcbiAgICBjb25zdCBob3Jpem9udGFsUG9zaXRpb24gPSBwb3NpdGlvbihzdGFydCwgdGltZWxpbmVTdGFydCwgdGltZWxpbmVFbmRJbmNsdXNpdmUpO1xuICAgIGNvbnN0IHdpZHRoID0gcG9zaXRpb24oZW5kSW5jbHVzaXZlLCB0aW1lbGluZVN0YXJ0LCB0aW1lbGluZUVuZEluY2x1c2l2ZSkgLSBob3Jpem9udGFsUG9zaXRpb247XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uOiBob3Jpem9udGFsUG9zaXRpb24sXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICB9O1xufTtcbmV4cG9ydCBjb25zdCBpc091dE9mQm91bmRzID0gKHBvc2l0aW9uLCB3aWR0aCkgPT4gcG9zaXRpb24gPj0gMTAwIHx8IHBvc2l0aW9uICsgd2lkdGggPCAwO1xuZXhwb3J0IGNvbnN0IGJyZWRkZU1lbGxvbURhdG9lciA9IChzdGFydCwgc2x1dHQsIHRvdGFsdEFudGFsbERhdG9lcikgPT4ge1xuICAgIGNvbnN0IGRhZ2VyTWVsbG9tRGF0b2VyID0gc2x1dHQuZGlmZihzdGFydCwgJ21pbnV0ZScpIC8gNjAgLyAyNDtcbiAgICByZXR1cm4gKGRhZ2VyTWVsbG9tRGF0b2VyIC8gdG90YWx0QW50YWxsRGF0b2VyKSAqIDEwMDtcbn07XG5leHBvcnQgY29uc3QgZXJMaWtlID0gKHAxLCBwMikgPT4gcDIgJiYgcDEuc3RhcnQuaXNTYW1lKHAyLnN0YXJ0KSAmJiBwMS5lbmRJbmNsdXNpdmUuaXNTYW1lKHAyLmVuZEluY2x1c2l2ZSk7XG5leHBvcnQgY29uc3QgZXJEZWxBdiA9IChwMSwgcDIpID0+IHAyICYmIHAxLnN0YXJ0LmlzQmVmb3JlKHAyLnN0YXJ0KSAmJiBwMS5lbmRJbmNsdXNpdmUuaXNBZnRlcihwMi5lbmRJbmNsdXNpdmUpO1xuZXhwb3J0IGNvbnN0IG92ZXJsYXBwZXIgPSAocDEsIHAyKSA9PiBwMiAmJiBwMS5zdGFydC5pc1NhbWVPckJlZm9yZShwMi5zdGFydCkgJiYgcDEuZW5kSW5jbHVzaXZlLmlzU2FtZU9yQWZ0ZXIocDIuZW5kSW5jbHVzaXZlKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNhbGMuanMubWFwIiwiZXhwb3J0IGNvbnN0IGVyU3lubGlnID0gKHsgaG9yaXpvbnRhbFBvc2l0aW9uIH0pID0+IGhvcml6b250YWxQb3NpdGlvbiA8PSAxMDAgJiYgaG9yaXpvbnRhbFBvc2l0aW9uID49IDA7XG5leHBvcnQgY29uc3QgaW5uZW5FdETDuGduID0gKGRhdG8xLCBkYXRvMikgPT4gTWF0aC5hYnMoZGF0bzEuZGlmZihkYXRvMiwgJ2RheScpKSA8PSAxO1xuZXhwb3J0IGNvbnN0IGludmlzaWJsZVBlcmlvZHMgPSAoeyBob3Jpem9udGFsUG9zaXRpb24sIHdpZHRoIH0pID0+IGhvcml6b250YWxQb3NpdGlvbiA+PSAwICYmIGhvcml6b250YWxQb3NpdGlvbiA8PSAxMDAgJiYgd2lkdGggPiAwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsdGVyLmpzLm1hcCIsImV4cG9ydCBjb25zdCBzaXN0ZURhdG8gPSAoYSwgYikgPT4gYi5kaWZmKGEpO1xuZXhwb3J0IGNvbnN0IHNpc3RlUGVyaW9kZSA9IChhLCBiKSA9PiBhLmhvcml6b250YWxQb3NpdGlvbiAtIGIuaG9yaXpvbnRhbFBvc2l0aW9uO1xuZXhwb3J0IGNvbnN0IHNpc3RlRW5rbGVQZXJpb2RlID0gKGEsIGIpID0+IGIuZW5kSW5jbHVzaXZlLmRpZmYoYS5lbmRJbmNsdXNpdmUpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c29ydC5qcy5tYXAiLCJpbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnO1xuaW1wb3J0IHsgaG9yaXpvbnRhbFBvc2l0aW9uQW5kV2lkdGggfSBmcm9tICcuL2NhbGMuanMnO1xuY29uc3QgY29uc3RyYWluID0gKHZhbHVlLCBtaW4sIG1heCkgPT4gdmFsdWUgPj0gbWF4ID8gbWF4IDogdmFsdWUgPCBtaW4gPyBtaW4gOiB2YWx1ZTtcbmV4cG9ydCBjb25zdCB1c2VQb3NpdGlvbkFuZFNpemUgPSAoeyBwZXJpb2RlLCB0aWRzbGluamVzdGFydCwgdGlkc2xpbmplc2x1dHQsIGRpcmVjdGlvbiwgfSkgPT4ge1xuICAgIGNvbnN0IGZvbSA9IGRheWpzKHBlcmlvZGUuZm9tKS5zdGFydE9mKCdkYXknKTtcbiAgICBjb25zdCB0b20gPSBkYXlqcyhwZXJpb2RlLnRvbSkuZW5kT2YoJ2RheScpO1xuICAgIGNvbnN0IHsgaG9yaXpvbnRhbFBvc2l0aW9uLCB3aWR0aCB9ID0gaG9yaXpvbnRhbFBvc2l0aW9uQW5kV2lkdGgoZm9tLCB0b20sIHRpZHNsaW5qZXN0YXJ0LCB0aWRzbGluamVzbHV0dCk7XG4gICAgY29uc3QgYWRqdXN0ZWRIb3Jpem9udGFsUG9zaXRpb24gPSBjb25zdHJhaW4oaG9yaXpvbnRhbFBvc2l0aW9uLCAwLCAxMDApO1xuICAgIGNvbnN0IGFkanVzdGVkV2lkdGggPSBhZGp1c3RlZEhvcml6b250YWxQb3NpdGlvbiArIHdpZHRoID49IDEwMFxuICAgICAgICA/IDEwMCAtIGFkanVzdGVkSG9yaXpvbnRhbFBvc2l0aW9uXG4gICAgICAgIDogYWRqdXN0ZWRIb3Jpem9udGFsUG9zaXRpb24gKyB3aWR0aCAhPT0gaG9yaXpvbnRhbFBvc2l0aW9uICsgd2lkdGhcbiAgICAgICAgICAgID8gd2lkdGggKyBob3Jpem9udGFsUG9zaXRpb25cbiAgICAgICAgICAgIDogd2lkdGg7XG4gICAgaWYgKGhvcml6b250YWxQb3NpdGlvbiA+PSAxMDAgfHwgYWRqdXN0ZWRXaWR0aCA8PSAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBbZGlyZWN0aW9uXTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIGlmIChob3Jpem9udGFsUG9zaXRpb24gPCAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBbZGlyZWN0aW9uXTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBgJHthZGp1c3RlZFdpZHRofSVgLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFtkaXJlY3Rpb25dOiBgJHthZGp1c3RlZEhvcml6b250YWxQb3NpdGlvbn0lYCxcbiAgICAgICAgICAgIHdpZHRoOiBgJHthZGp1c3RlZFdpZHRofSVgLFxuICAgICAgICAgICAgZGlzcGxheTogaG9yaXpvbnRhbFBvc2l0aW9uID4gMTAwID8gJ25vbmUnIDogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuICAgIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VQb3NpdGlvbkFuZFNpemUuanMubWFwIiwiaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJztcbmltcG9ydCB7IG5hbm9pZCB9IGZyb20gJ25hbm9pZCc7XG5pbXBvcnQgeyBob3Jpem9udGFsUG9zaXRpb25BbmRXaWR0aCB9IGZyb20gJy4vY2FsYy5qcyc7XG5pbXBvcnQgeyBpbm5lbkV0RMO4Z24sIGludmlzaWJsZVBlcmlvZHMgfSBmcm9tICcuL2ZpbHRlci5qcyc7XG5pbXBvcnQgeyBzaXN0ZVBlcmlvZGUgfSBmcm9tICcuL3NvcnQuanMnO1xuaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gJ3JlYWN0JztcbmNvbnN0IHNwYXRpYWxQZXJpb2QgPSAocGVyaW9kLCB0aW1lbGluZVN0YXJ0LCB0aW1lbGluZUVuZEluY2x1c2l2ZSwgZGlyZWN0aW9uID0gJ2xlZnQnKSA9PiB7XG4gICAgY29uc3Qgc3RhcnQgPSBkYXlqcyhwZXJpb2QuZm9tKTtcbiAgICBjb25zdCBlbmRJbmNsdXNpdmUgPSBkYXlqcyhwZXJpb2QudG9tKTtcbiAgICBjb25zdCB7IGhvcml6b250YWxQb3NpdGlvbiwgd2lkdGggfSA9IGhvcml6b250YWxQb3NpdGlvbkFuZFdpZHRoKHN0YXJ0LnN0YXJ0T2YoJ2RheScpLCBlbmRJbmNsdXNpdmUuZW5kT2YoJ2RheScpLCB0aW1lbGluZVN0YXJ0LCB0aW1lbGluZUVuZEluY2x1c2l2ZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHBlcmlvZC5pZCB8fCBuYW5vaWQoKSxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICBlbmRJbmNsdXNpdmU6IGVuZEluY2x1c2l2ZSxcbiAgICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uOiBob3Jpem9udGFsUG9zaXRpb24sXG4gICAgICAgIGhvdmVyTGFiZWw6IHBlcmlvZC5ob3ZlckxhYmVsLFxuICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbixcbiAgICAgICAgY2xhc3NOYW1lOiBwZXJpb2QuY2xhc3NOYW1lLFxuICAgICAgICBkaXNhYmxlZDogcGVyaW9kLmRpc2FibGVkLFxuICAgICAgICBzdGF0dXM6IHBlcmlvZC5zdGF0dXMsXG4gICAgICAgIGFjdGl2ZTogcGVyaW9kLmFjdGl2ZSxcbiAgICAgICAgaW5mb1BpbjogcGVyaW9kLmluZm9QaW4sXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgY2hpbGRyZW46IHBlcmlvZC5jaGlsZHJlbixcbiAgICB9O1xufTtcbmNvbnN0IGFkanVzdGVkRWRnZXMgPSAocGVyaW9kLCBpLCBhbGxQZXJpb2RzKSA9PiB7XG4gICAgY29uc3QgbGVmdCA9IGkgPiAwICYmIGlubmVuRXREw7hnbihhbGxQZXJpb2RzW2kgLSAxXS5lbmRJbmNsdXNpdmUsIHBlcmlvZC5zdGFydCk7XG4gICAgY29uc3QgcmlnaHQgPSBpIDwgYWxsUGVyaW9kcy5sZW5ndGggLSAxICYmIGlubmVuRXREw7hnbihwZXJpb2QuZW5kSW5jbHVzaXZlLCBhbGxQZXJpb2RzW2kgKyAxXS5zdGFydCk7XG4gICAgcmV0dXJuIGxlZnQgJiYgcmlnaHRcbiAgICAgICAgPyBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHBlcmlvZCksIHsgY29ubmVjdGluZ0VkZ2U6ICdib3RoJyB9KSA6IGxlZnRcbiAgICAgICAgPyBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHBlcmlvZCksIHsgY29ubmVjdGluZ0VkZ2U6ICdsZWZ0JyB9KSA6IHJpZ2h0XG4gICAgICAgID8gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwZXJpb2QpLCB7IGNvbm5lY3RpbmdFZGdlOiAncmlnaHQnIH0pIDogcGVyaW9kO1xufTtcbmNvbnN0IHRyaW1tZWRQZXJpb2RzID0gKHBlcmlvZCkgPT4ge1xuICAgIGxldCB7IGhvcml6b250YWxQb3NpdGlvbiwgd2lkdGgsIGNvbm5lY3RpbmdFZGdlIH0gPSBwZXJpb2Q7XG4gICAgbGV0IGNyb3BwZWQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKGhvcml6b250YWxQb3NpdGlvbiArIHdpZHRoID4gMTAwKSB7XG4gICAgICAgIHdpZHRoID0gMTAwIC0gaG9yaXpvbnRhbFBvc2l0aW9uO1xuICAgICAgICBjcm9wcGVkID0gJ3JpZ2h0JztcbiAgICAgICAgY29ubmVjdGluZ0VkZ2UgPSBjb25uZWN0aW5nRWRnZSA9PT0gJ2xlZnQnIHx8IGNvbm5lY3RpbmdFZGdlID09PSAnYm90aCcgPyAnYm90aCcgOiAncmlnaHQnO1xuICAgIH1cbiAgICBpZiAoaG9yaXpvbnRhbFBvc2l0aW9uIDwgMCAmJiBob3Jpem9udGFsUG9zaXRpb24gKyB3aWR0aCA+IDApIHtcbiAgICAgICAgd2lkdGggPSBob3Jpem9udGFsUG9zaXRpb24gKyB3aWR0aDtcbiAgICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uID0gMDtcbiAgICAgICAgY3JvcHBlZCA9IGNyb3BwZWQgPT09ICdyaWdodCcgPyAnYm90aCcgOiAnbGVmdCc7XG4gICAgICAgIGNvbm5lY3RpbmdFZGdlID0gY29ubmVjdGluZ0VkZ2UgPT09ICdyaWdodCcgfHwgY29ubmVjdGluZ0VkZ2UgPT09ICdib3RoJyA/ICdib3RoJyA6ICdsZWZ0JztcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcGVyaW9kKSwgeyB3aWR0aDogd2lkdGgsIGhvcml6b250YWxQb3NpdGlvbjogaG9yaXpvbnRhbFBvc2l0aW9uLCBjb25uZWN0aW5nRWRnZTogY29ubmVjdGluZ0VkZ2UsIGNyb3BwZWQ6IGNyb3BwZWQgfSk7XG59O1xuZXhwb3J0IGNvbnN0IHVzZVRpZHNsaW5qZXJhZGVyID0gKHJhZGVyLCBzdGFydERhdG8sIHNsdXR0RGF0bywgZGlyZWN0aW9uKSA9PiB1c2VNZW1vKCgpID0+IHJhZGVyLm1hcChwZXJpb2RlciA9PiB7XG4gICAgY29uc3QgdGlkc2xpbmplcGVyaW9kZXIgPSBwZXJpb2RlclxuICAgICAgICAubWFwKChwZXJpb2RlKSA9PiBzcGF0aWFsUGVyaW9kKHBlcmlvZGUsIHN0YXJ0RGF0bywgc2x1dHREYXRvLCBkaXJlY3Rpb24pKVxuICAgICAgICAuc29ydChzaXN0ZVBlcmlvZGUpXG4gICAgICAgIC5tYXAoYWRqdXN0ZWRFZGdlcylcbiAgICAgICAgLm1hcCh0cmltbWVkUGVyaW9kcylcbiAgICAgICAgLmZpbHRlcihpbnZpc2libGVQZXJpb2RzKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBpZDogbmFub2lkKCksXG4gICAgICAgIHBlcmlvZHM6IGRpcmVjdGlvbiA9PT0gJ2xlZnQnID8gdGlkc2xpbmplcGVyaW9kZXIgOiB0aWRzbGluamVwZXJpb2Rlci5yZXZlcnNlKCksXG4gICAgfTtcbn0pLCBbcmFkZXIsIHN0YXJ0RGF0bywgc2x1dHREYXRvLCBkaXJlY3Rpb25dKTtcbmNvbnN0IHRpZGxpZ3N0ZURhdG8gPSAodGlkbGlnc3QsIHBlcmlvZGUpID0+IHBlcmlvZGUuZm9tIDwgdGlkbGlnc3QgPyBwZXJpb2RlLmZvbSA6IHRpZGxpZ3N0O1xuY29uc3QgdGlkbGlnc3RlRm9tRGF0byA9IChyYWRlcikgPT4gcmFkZXIuZmxhdCgpLnJlZHVjZSh0aWRsaWdzdGVEYXRvLCBuZXcgRGF0ZSgpKTtcbmV4cG9ydCBjb25zdCB1c2VUaWRsaWdzdGVEYXRvID0gKHsgc3RhcnREYXRvLCByYWRlciB9KSA9PiB1c2VNZW1vKCgpID0+IChzdGFydERhdG8gPyBkYXlqcyhzdGFydERhdG8pIDogZGF5anModGlkbGlnc3RlRm9tRGF0byhyYWRlcikpKSwgW3N0YXJ0RGF0bywgcmFkZXJdKTtcbmNvbnN0IHNlbmVzdGVEYXRvID0gKHNlbmVzdCwgcGVyaW9kZSkgPT4gcGVyaW9kZS50b20gPiBzZW5lc3QgPyBwZXJpb2RlLnRvbSA6IHNlbmVzdDtcbmNvbnN0IHNlbmVzdGVUb21EYXRvID0gKHJhZGVyKSA9PiByYWRlci5mbGF0KCkucmVkdWNlKHNlbmVzdGVEYXRvLCBuZXcgRGF0ZSgwKSk7XG5leHBvcnQgY29uc3QgdXNlU2VuZXN0ZURhdG8gPSAoeyBzbHV0dERhdG8sIHJhZGVyIH0pID0+IHVzZU1lbW8oKCkgPT4gKHNsdXR0RGF0byA/IGRheWpzKHNsdXR0RGF0bykgOiBkYXlqcyhzZW5lc3RlVG9tRGF0byhyYWRlcikpLmFkZCgxLCAnZGF5JykpLCBbc2x1dHREYXRvLCByYWRlcl0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlVGlkc2xpbmplcmFkZXIuanMubWFwIiwiaW1wb3J0IHsgVGlkc2xpbmplIH0gZnJvbSAnLi9jb21wb25lbnRzL3RpZHNsaW5qZS9UaWRzbGluamUuanMnO1xuZXhwb3J0IHsgVGlkc2xpbmplIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHtcbiAgICBCZ05ldXRyYWxTdHJvbmdQcmVzc2VkLFxuICAgIEJvcmRlck5ldXRyYWxTdWJ0bGUsXG4gICAgVGV4dEFjY2VudCxcbiAgICBUZXh0TmV1dHJhbCxcbiAgICBUZXh0TmV1dHJhbFN1YnRsZSxcbn0gZnJvbSAnQG5hdmlrdC9kcy10b2tlbnMvZGlzdC90b2tlbnMnO1xuaW1wb3J0IHR5cGUgeyBFdGlrZXR0IH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXRpZHNsaW5qZSc7XG5cbmltcG9ydCB7IFRpZHNsaW5qZVZpbmR1LCB1c2VUaWRzbGluamVDb250ZXh0IH0gZnJvbSAnLi9UaWRzbGluamVDb250ZXh0JztcbmltcG9ydCBGYW1pbGllQmFzZUtuYXBwIGZyb20gJy4uL0ZhbWlsaWVCYXNlS25hcHAnO1xuXG5pbnRlcmZhY2UgSUV0aWtldHRQcm9wIHtcbiAgICBldGlrZXR0OiBFdGlrZXR0O1xufVxuXG5jb25zdCBFdGlrZXR0S25hcHAgPSBzdHlsZWQoRmFtaWxpZUJhc2VLbmFwcCk8eyBkaXNhYmxlZDogYm9vbGVhbjsgJHZhbGd0OiBib29sZWFuIH0+YFxuICAgIHBhZGRpbmc6IDNweCAzcHggM3B4ICR7KHsgJHZhbGd0IH0pID0+ICgkdmFsZ3QgPyAnNXB4JyA6ICczcHgnKX07XG4gICAgd2lkdGg6IDkwJTtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIGN1cnNvcjogJHsoeyBkaXNhYmxlZCB9KSA9PiAoZGlzYWJsZWQgPyAnZGVmYXVsdCcgOiAncG9pbnRlcicpfTtcbiAgICBib3JkZXItbGVmdDogJHsoeyAkdmFsZ3QgfSkgPT4gKCR2YWxndCA/IGAxcHggc29saWQgJHtCb3JkZXJOZXV0cmFsU3VidGxlfWAgOiAnbm9uZScpfTtcblxuICAgID4gc3BhbiB7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHsoeyBkaXNhYmxlZCwgJHZhbGd0IH0pID0+IChkaXNhYmxlZCB8fCAkdmFsZ3QgPyAnbm9uZScgOiAndW5kZXJsaW5lJyl9O1xuICAgICAgICBmb250LXdlaWdodDogJHsoeyAkdmFsZ3QgfSkgPT4gKCR2YWxndCA/ICdib2xkJyA6ICdub3JtYWwnKX07XG4gICAgICAgIGNvbG9yOiAkeyh7IGRpc2FibGVkLCAkdmFsZ3QgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRpc2FibGVkKSByZXR1cm4gVGV4dE5ldXRyYWxTdWJ0bGU7XG4gICAgICAgICAgICBlbHNlIGlmICgkdmFsZ3QpIHJldHVybiBUZXh0TmV1dHJhbDtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIFRleHRBY2NlbnQ7XG4gICAgICAgIH19O1xuICAgIH1cblxuICAgIDpob3ZlciB7XG4gICAgICAgID4gc3BhbiB7XG4gICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICA6Zm9jdXMsXG4gICAgOmFjdGl2ZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7QmdOZXV0cmFsU3Ryb25nUHJlc3NlZH07XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgIH1cbmA7XG5cbmNvbnN0IFRpZHNsaW5qZUV0aWtldHQ6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PElFdGlrZXR0UHJvcD4gPSAoeyBldGlrZXR0IH0pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIGFrdGl2RXRpa2V0dCxcbiAgICAgICAgc2V0dEFrdGl2RXRpa2V0dCxcbiAgICAgICAgYWt0aXZ0VGlkc2xpbmplVmluZHUsXG4gICAgICAgIGluaXRpZWxsQWt0aXZFdGlrZXR0RXJTYXR0LFxuICAgICAgICBzZXRJbml0aWVsbEFrdGl2RXRpa2V0dEVyU2F0dCxcbiAgICB9ID0gdXNlVGlkc2xpbmplQ29udGV4dCgpO1xuXG4gICAgY29uc3Qgb25FdGlrZXR0Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHNldHRBa3RpdkV0aWtldHQoZXRpa2V0dCk7XG4gICAgfTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICFpbml0aWVsbEFrdGl2RXRpa2V0dEVyU2F0dCAmJlxuICAgICAgICAgICAgZXRpa2V0dC5kYXRlLmdldEZ1bGxZZWFyKCkgPT09IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgICAgICAgZXRpa2V0dC5kYXRlLmdldE1vbnRoKCkgPT09IG5ldyBEYXRlKCkuZ2V0TW9udGgoKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHNldHRBa3RpdkV0aWtldHQoZXRpa2V0dCk7XG4gICAgICAgICAgICBzZXRJbml0aWVsbEFrdGl2RXRpa2V0dEVyU2F0dCh0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sIFtldGlrZXR0XSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8RXRpa2V0dEtuYXBwXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtldGlrZXR0LmxhYmVsfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2FrdGl2dFRpZHNsaW5qZVZpbmR1LnZpbmR1LmlkID09PSBUaWRzbGluamVWaW5kdS5UUkVfw4VSfVxuICAgICAgICAgICAgJHZhbGd0PXshIWFrdGl2RXRpa2V0dCAmJiBha3RpdkV0aWtldHQuZGF0ZS50b0RhdGVTdHJpbmcoKSA9PT0gZXRpa2V0dC5kYXRlLnRvRGF0ZVN0cmluZygpfVxuICAgICAgICAgICAgb25DbGljaz17b25FdGlrZXR0Q2xpY2t9XG4gICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuPntldGlrZXR0LmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgPC9FdGlrZXR0S25hcHA+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRpZHNsaW5qZUV0aWtldHQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBUb2dnbGVHcm91cCB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuXG5pbXBvcnQgeyB1c2VUaWRzbGluamVDb250ZXh0IH0gZnJvbSAnLi9UaWRzbGluamVDb250ZXh0JztcblxuY29uc3QgVmluZHV2ZWxnZXI6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdGlkc2xpbmplVmluZHVlciwgZW5kcmVUaWRzbGluamVWaW5kdSwgYWt0aXZ0VGlkc2xpbmplVmluZHUgfSA9IHVzZVRpZHNsaW5qZUNvbnRleHQoKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxUb2dnbGVHcm91cFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtha3RpdnRUaWRzbGluamVWaW5kdS52aW5kdS5pZC50b1N0cmluZygpfVxuICAgICAgICAgICAgc2l6ZT1cInNtYWxsXCJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJuZXV0cmFsXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt2aW5kdUlkID0+IGVuZHJlVGlkc2xpbmplVmluZHUodGlkc2xpbmplVmluZHVlcltOdW1iZXIodmluZHVJZCldKX1cbiAgICAgICAgPlxuICAgICAgICAgICAge3RpZHNsaW5qZVZpbmR1ZXIubWFwKHZpbmR1ID0+IChcbiAgICAgICAgICAgICAgICA8VG9nZ2xlR3JvdXAuSXRlbSBrZXk9e3ZpbmR1LmlkfSB2YWx1ZT17dmluZHUuaWQudG9TdHJpbmcoKX0+XG4gICAgICAgICAgICAgICAgICAgIHt2aW5kdS5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L1RvZ2dsZUdyb3VwLkl0ZW0+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9Ub2dnbGVHcm91cD5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVmluZHV2ZWxnZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBlbmRPZk1vbnRoIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEJvZHlTaG9ydCwgSGVhZGluZyB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBFdGlrZXR0IH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXRpZHNsaW5qZSc7XG5pbXBvcnQgeyBUaWRzbGluamUgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdGlkc2xpbmplJztcblxuaW1wb3J0IHsgdXNlVGlkc2xpbmplQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2tvbXBvbmVudGVyL1RpZHNsaW5qZS9UaWRzbGluamVDb250ZXh0JztcbmltcG9ydCBUaWRzbGluamVFdGlrZXR0IGZyb20gJy4uLy4uLy4uLy4uLy4uL2tvbXBvbmVudGVyL1RpZHNsaW5qZS9UaWRzbGluamVFdGlrZXR0JztcbmltcG9ydCBUaWRzbGluamVOYXZpZ2VyaW5nIGZyb20gJy4uLy4uLy4uLy4uLy4uL2tvbXBvbmVudGVyL1RpZHNsaW5qZS9UaWRzbGluamVOYXZpZ2VyaW5nJztcbmltcG9ydCBWaW5kdXZlbGdlciBmcm9tICcuLi8uLi8uLi8uLi8uLi9rb21wb25lbnRlci9UaWRzbGluamUvVmluZHVWZWxnZXInO1xuaW1wb3J0IHR5cGUgeyBJUGVyc29uTWVkQW5kZWxlclRpbGtqZW50WXRlbHNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvYmVyZWduaW5nJztcbmltcG9ydCB0eXBlIHsgRmFnc2FrVHlwZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL2ZhZ3Nhayc7XG5pbXBvcnQgdHlwZSB7IElHcnVubmxhZ1BlcnNvbiB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL3BlcnNvbic7XG5pbXBvcnQgeyBmb3JtYXRlcklkZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvZm9ybWF0dGVyJztcblxuY29uc3QgVGlkc2xpbmplSGVhZGVyID0gc3R5bGVkLmRpdmBcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbmA7XG5cbmNvbnN0IFRpZHNsaW5qZUNvbnRyb2xzID0gc3R5bGVkLmRpdmBcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuXG4gICAgPiBkaXY6Zmlyc3QtY2hpbGQge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgIH1cbmA7XG5cbmNvbnN0IFRpZHNsaW5qZUNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gICAgZGlzcGxheTogZmxleDtcblxuICAgICYgLnRpZHNsaW5qZSB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgIH1cblxuICAgICYgLmFrc2VsLWJvZHktc2hvcnQge1xuICAgICAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDQuOHJlbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICYgLmFrc2VsLWJvZHktc2hvcnQge1xuICAgICAgICAmOm5vdCg6Zmlyc3QtY2hpbGQpIHtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDIuMTI1cmVtO1xuICAgICAgICB9XG4gICAgfVxuYDtcblxuY29uc3QgVGlkc2xpbmplTGFiZWxzID0gc3R5bGVkLmRpdmBcbiAgICBtaW4td2lkdGg6IDdyZW07XG5gO1xuXG5pbnRlcmZhY2UgSVByb3BzIHtcbiAgICBncnVubmxhZ1BlcnNvbmVyOiBJR3J1bm5sYWdQZXJzb25bXTtcbiAgICB0aWRzbGluamVQZXJzb25lcjogSVBlcnNvbk1lZEFuZGVsZXJUaWxramVudFl0ZWxzZVtdO1xuICAgIGZhZ3Nha1R5cGU/OiBGYWdzYWtUeXBlO1xufVxuXG5jb25zdCBUaWxramVudFl0ZWxzZVRpZHNsaW5qZTogUmVhY3QuRkM8SVByb3BzPiA9ICh7IGdydW5ubGFnUGVyc29uZXIsIHRpZHNsaW5qZVBlcnNvbmVyLCBmYWdzYWtUeXBlIH0pID0+IHtcbiAgICBjb25zdCB7IGdlbmVyZXJGb3JtYXRlcnTDhXJzdGFsbCwgZ2VuZXJlclJhZGVyLCBha3RpdkV0aWtldHQsIGFrdGl2dFRpZHNsaW5qZVZpbmR1LCBuYXZpZ2VyIH0gPVxuICAgICAgICB1c2VUaWRzbGluamVDb250ZXh0KCk7XG4gICAgY29uc3QgdGlkc2xpbmplUmFkZXIgPSBnZW5lcmVyUmFkZXIoZmFnc2FrVHlwZSwgdGlkc2xpbmplUGVyc29uZXIpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxUaWRzbGluamVIZWFkZXI+XG4gICAgICAgICAgICAgICAgPEhlYWRpbmcgc2l6ZT17J3NtYWxsJ30gbGV2ZWw9eycyJ30+XG4gICAgICAgICAgICAgICAgICAgIHtnZW5lcmVyRm9ybWF0ZXJ0w4Vyc3RhbGwoKX1cbiAgICAgICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICAgICAgPFRpZHNsaW5qZUNvbnRyb2xzPlxuICAgICAgICAgICAgICAgICAgICA8VmluZHV2ZWxnZXIgLz5cbiAgICAgICAgICAgICAgICAgICAgPFRpZHNsaW5qZU5hdmlnZXJpbmcgbmF2aWdlcj17bmF2aWdlcn0gLz5cbiAgICAgICAgICAgICAgICA8L1RpZHNsaW5qZUNvbnRyb2xzPlxuICAgICAgICAgICAgPC9UaWRzbGluamVIZWFkZXI+XG4gICAgICAgICAgICA8VGlkc2xpbmplQ29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxUaWRzbGluamVMYWJlbHM+XG4gICAgICAgICAgICAgICAgICAgIHtncnVubmxhZ1BlcnNvbmVyLm1hcCgocGVyc29uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9keVNob3J0IGtleT17aW5kZXh9IHRpdGxlPXtwZXJzb24ubmF2bn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmb3JtYXRlcklkZW50KHBlcnNvbi5wZXJzb25JZGVudCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb2R5U2hvcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L1RpZHNsaW5qZUxhYmVscz5cbiAgICAgICAgICAgICAgICA8VGlkc2xpbmplXG4gICAgICAgICAgICAgICAgICAgIHJhZGVyPXt0aWRzbGluamVSYWRlcn1cbiAgICAgICAgICAgICAgICAgICAgZXRpa2V0dFJlbmRlcj17KGV0aWtldHQ6IEV0aWtldHQpID0+IDxUaWRzbGluamVFdGlrZXR0IGV0aWtldHQ9e2V0aWtldHR9IC8+fVxuICAgICAgICAgICAgICAgICAgICBzdGFydERhdG89e2FrdGl2dFRpZHNsaW5qZVZpbmR1LnN0YXJ0RGF0b31cbiAgICAgICAgICAgICAgICAgICAgc2x1dHREYXRvPXtha3RpdnRUaWRzbGluamVWaW5kdS5zbHV0dERhdG99XG4gICAgICAgICAgICAgICAgICAgIHBpbnM9e1t7IGRhdGU6IG5ldyBEYXRlKCkgfV19XG4gICAgICAgICAgICAgICAgICAgIGFrdGl2dFV0c25pdHQ9e1xuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZFdGlrZXR0ICYmIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb206IGFrdGl2RXRpa2V0dC5kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvbTogZW5kT2ZNb250aChha3RpdkV0aWtldHQuZGF0ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9UaWRzbGluamVDb250YWluZXI+XG4gICAgICAgIDwvPlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUaWxramVudFl0ZWxzZVRpZHNsaW5qZTtcbiIsIiFmdW5jdGlvbih0LGUpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGUpOih0PVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6dHx8c2VsZikuZGF5anM9ZSgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciB0PTFlMyxlPTZlNCxuPTM2ZTUscj1cIm1pbGxpc2Vjb25kXCIsaT1cInNlY29uZFwiLHM9XCJtaW51dGVcIix1PVwiaG91clwiLGE9XCJkYXlcIixvPVwid2Vla1wiLGY9XCJtb250aFwiLGg9XCJxdWFydGVyXCIsYz1cInllYXJcIixkPVwiZGF0ZVwiLCQ9XCJJbnZhbGlkIERhdGVcIixsPS9eKFxcZHs0fSlbLS9dPyhcXGR7MSwyfSk/Wy0vXT8oXFxkezAsMn0pW1R0XFxzXSooXFxkezEsMn0pPzo/KFxcZHsxLDJ9KT86PyhcXGR7MSwyfSk/Wy46XT8oXFxkKyk/JC8seT0vXFxbKFteXFxdXSspXXxZezEsNH18TXsxLDR9fER7MSwyfXxkezEsNH18SHsxLDJ9fGh7MSwyfXxhfEF8bXsxLDJ9fHN7MSwyfXxaezEsMn18U1NTL2csTT17bmFtZTpcImVuXCIsd2Vla2RheXM6XCJTdW5kYXlfTW9uZGF5X1R1ZXNkYXlfV2VkbmVzZGF5X1RodXJzZGF5X0ZyaWRheV9TYXR1cmRheVwiLnNwbGl0KFwiX1wiKSxtb250aHM6XCJKYW51YXJ5X0ZlYnJ1YXJ5X01hcmNoX0FwcmlsX01heV9KdW5lX0p1bHlfQXVndXN0X1NlcHRlbWJlcl9PY3RvYmVyX05vdmVtYmVyX0RlY2VtYmVyXCIuc3BsaXQoXCJfXCIpfSxtPWZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1TdHJpbmcodCk7cmV0dXJuIXJ8fHIubGVuZ3RoPj1lP3Q6XCJcIitBcnJheShlKzEtci5sZW5ndGgpLmpvaW4obikrdH0sZz17czptLHo6ZnVuY3Rpb24odCl7dmFyIGU9LXQudXRjT2Zmc2V0KCksbj1NYXRoLmFicyhlKSxyPU1hdGguZmxvb3Iobi82MCksaT1uJTYwO3JldHVybihlPD0wP1wiK1wiOlwiLVwiKSttKHIsMixcIjBcIikrXCI6XCIrbShpLDIsXCIwXCIpfSxtOmZ1bmN0aW9uIHQoZSxuKXtpZihlLmRhdGUoKTxuLmRhdGUoKSlyZXR1cm4tdChuLGUpO3ZhciByPTEyKihuLnllYXIoKS1lLnllYXIoKSkrKG4ubW9udGgoKS1lLm1vbnRoKCkpLGk9ZS5jbG9uZSgpLmFkZChyLGYpLHM9bi1pPDAsdT1lLmNsb25lKCkuYWRkKHIrKHM/LTE6MSksZik7cmV0dXJuKygtKHIrKG4taSkvKHM/aS11OnUtaSkpfHwwKX0sYTpmdW5jdGlvbih0KXtyZXR1cm4gdDwwP01hdGguY2VpbCh0KXx8MDpNYXRoLmZsb29yKHQpfSxwOmZ1bmN0aW9uKHQpe3JldHVybntNOmYseTpjLHc6byxkOmEsRDpkLGg6dSxtOnMsczppLG1zOnIsUTpofVt0XXx8U3RyaW5nKHR8fFwiXCIpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvcyQvLFwiXCIpfSx1OmZ1bmN0aW9uKHQpe3JldHVybiB2b2lkIDA9PT10fX0sdj1cImVuXCIsRD17fTtEW3ZdPU07dmFyIHA9ZnVuY3Rpb24odCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBffSxTPWZ1bmN0aW9uIHQoZSxuLHIpe3ZhciBpO2lmKCFlKXJldHVybiB2O2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlKXt2YXIgcz1lLnRvTG93ZXJDYXNlKCk7RFtzXSYmKGk9cyksbiYmKERbc109bixpPXMpO3ZhciB1PWUuc3BsaXQoXCItXCIpO2lmKCFpJiZ1Lmxlbmd0aD4xKXJldHVybiB0KHVbMF0pfWVsc2V7dmFyIGE9ZS5uYW1lO0RbYV09ZSxpPWF9cmV0dXJuIXImJmkmJih2PWkpLGl8fCFyJiZ2fSx3PWZ1bmN0aW9uKHQsZSl7aWYocCh0KSlyZXR1cm4gdC5jbG9uZSgpO3ZhciBuPVwib2JqZWN0XCI9PXR5cGVvZiBlP2U6e307cmV0dXJuIG4uZGF0ZT10LG4uYXJncz1hcmd1bWVudHMsbmV3IF8obil9LE89ZztPLmw9UyxPLmk9cCxPLnc9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdyh0LHtsb2NhbGU6ZS4kTCx1dGM6ZS4kdSx4OmUuJHgsJG9mZnNldDplLiRvZmZzZXR9KX07dmFyIF89ZnVuY3Rpb24oKXtmdW5jdGlvbiBNKHQpe3RoaXMuJEw9Uyh0LmxvY2FsZSxudWxsLCEwKSx0aGlzLnBhcnNlKHQpfXZhciBtPU0ucHJvdG90eXBlO3JldHVybiBtLnBhcnNlPWZ1bmN0aW9uKHQpe3RoaXMuJGQ9ZnVuY3Rpb24odCl7dmFyIGU9dC5kYXRlLG49dC51dGM7aWYobnVsbD09PWUpcmV0dXJuIG5ldyBEYXRlKE5hTik7aWYoTy51KGUpKXJldHVybiBuZXcgRGF0ZTtpZihlIGluc3RhbmNlb2YgRGF0ZSlyZXR1cm4gbmV3IERhdGUoZSk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUmJiEvWiQvaS50ZXN0KGUpKXt2YXIgcj1lLm1hdGNoKGwpO2lmKHIpe3ZhciBpPXJbMl0tMXx8MCxzPShyWzddfHxcIjBcIikuc3Vic3RyaW5nKDAsMyk7cmV0dXJuIG4/bmV3IERhdGUoRGF0ZS5VVEMoclsxXSxpLHJbM118fDEscls0XXx8MCxyWzVdfHwwLHJbNl18fDAscykpOm5ldyBEYXRlKHJbMV0saSxyWzNdfHwxLHJbNF18fDAscls1XXx8MCxyWzZdfHwwLHMpfX1yZXR1cm4gbmV3IERhdGUoZSl9KHQpLHRoaXMuJHg9dC54fHx7fSx0aGlzLmluaXQoKX0sbS5pbml0PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy4kZDt0aGlzLiR5PXQuZ2V0RnVsbFllYXIoKSx0aGlzLiRNPXQuZ2V0TW9udGgoKSx0aGlzLiREPXQuZ2V0RGF0ZSgpLHRoaXMuJFc9dC5nZXREYXkoKSx0aGlzLiRIPXQuZ2V0SG91cnMoKSx0aGlzLiRtPXQuZ2V0TWludXRlcygpLHRoaXMuJHM9dC5nZXRTZWNvbmRzKCksdGhpcy4kbXM9dC5nZXRNaWxsaXNlY29uZHMoKX0sbS4kdXRpbHM9ZnVuY3Rpb24oKXtyZXR1cm4gT30sbS5pc1ZhbGlkPWZ1bmN0aW9uKCl7cmV0dXJuISh0aGlzLiRkLnRvU3RyaW5nKCk9PT0kKX0sbS5pc1NhbWU9ZnVuY3Rpb24odCxlKXt2YXIgbj13KHQpO3JldHVybiB0aGlzLnN0YXJ0T2YoZSk8PW4mJm48PXRoaXMuZW5kT2YoZSl9LG0uaXNBZnRlcj1mdW5jdGlvbih0LGUpe3JldHVybiB3KHQpPHRoaXMuc3RhcnRPZihlKX0sbS5pc0JlZm9yZT1mdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLmVuZE9mKGUpPHcodCl9LG0uJGc9ZnVuY3Rpb24odCxlLG4pe3JldHVybiBPLnUodCk/dGhpc1tlXTp0aGlzLnNldChuLHQpfSxtLnVuaXg9ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC5mbG9vcih0aGlzLnZhbHVlT2YoKS8xZTMpfSxtLnZhbHVlT2Y9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kZC5nZXRUaW1lKCl9LG0uc3RhcnRPZj1mdW5jdGlvbih0LGUpe3ZhciBuPXRoaXMscj0hIU8udShlKXx8ZSxoPU8ucCh0KSwkPWZ1bmN0aW9uKHQsZSl7dmFyIGk9Ty53KG4uJHU/RGF0ZS5VVEMobi4keSxlLHQpOm5ldyBEYXRlKG4uJHksZSx0KSxuKTtyZXR1cm4gcj9pOmkuZW5kT2YoYSl9LGw9ZnVuY3Rpb24odCxlKXtyZXR1cm4gTy53KG4udG9EYXRlKClbdF0uYXBwbHkobi50b0RhdGUoXCJzXCIpLChyP1swLDAsMCwwXTpbMjMsNTksNTksOTk5XSkuc2xpY2UoZSkpLG4pfSx5PXRoaXMuJFcsTT10aGlzLiRNLG09dGhpcy4kRCxnPVwic2V0XCIrKHRoaXMuJHU/XCJVVENcIjpcIlwiKTtzd2l0Y2goaCl7Y2FzZSBjOnJldHVybiByPyQoMSwwKTokKDMxLDExKTtjYXNlIGY6cmV0dXJuIHI/JCgxLE0pOiQoMCxNKzEpO2Nhc2Ugbzp2YXIgdj10aGlzLiRsb2NhbGUoKS53ZWVrU3RhcnR8fDAsRD0oeTx2P3krNzp5KS12O3JldHVybiAkKHI/bS1EOm0rKDYtRCksTSk7Y2FzZSBhOmNhc2UgZDpyZXR1cm4gbChnK1wiSG91cnNcIiwwKTtjYXNlIHU6cmV0dXJuIGwoZytcIk1pbnV0ZXNcIiwxKTtjYXNlIHM6cmV0dXJuIGwoZytcIlNlY29uZHNcIiwyKTtjYXNlIGk6cmV0dXJuIGwoZytcIk1pbGxpc2Vjb25kc1wiLDMpO2RlZmF1bHQ6cmV0dXJuIHRoaXMuY2xvbmUoKX19LG0uZW5kT2Y9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuc3RhcnRPZih0LCExKX0sbS4kc2V0PWZ1bmN0aW9uKHQsZSl7dmFyIG4sbz1PLnAodCksaD1cInNldFwiKyh0aGlzLiR1P1wiVVRDXCI6XCJcIiksJD0obj17fSxuW2FdPWgrXCJEYXRlXCIsbltkXT1oK1wiRGF0ZVwiLG5bZl09aCtcIk1vbnRoXCIsbltjXT1oK1wiRnVsbFllYXJcIixuW3VdPWgrXCJIb3Vyc1wiLG5bc109aCtcIk1pbnV0ZXNcIixuW2ldPWgrXCJTZWNvbmRzXCIsbltyXT1oK1wiTWlsbGlzZWNvbmRzXCIsbilbb10sbD1vPT09YT90aGlzLiREKyhlLXRoaXMuJFcpOmU7aWYobz09PWZ8fG89PT1jKXt2YXIgeT10aGlzLmNsb25lKCkuc2V0KGQsMSk7eS4kZFskXShsKSx5LmluaXQoKSx0aGlzLiRkPXkuc2V0KGQsTWF0aC5taW4odGhpcy4kRCx5LmRheXNJbk1vbnRoKCkpKS4kZH1lbHNlICQmJnRoaXMuJGRbJF0obCk7cmV0dXJuIHRoaXMuaW5pdCgpLHRoaXN9LG0uc2V0PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuY2xvbmUoKS4kc2V0KHQsZSl9LG0uZ2V0PWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzW08ucCh0KV0oKX0sbS5hZGQ9ZnVuY3Rpb24ocixoKXt2YXIgZCwkPXRoaXM7cj1OdW1iZXIocik7dmFyIGw9Ty5wKGgpLHk9ZnVuY3Rpb24odCl7dmFyIGU9dygkKTtyZXR1cm4gTy53KGUuZGF0ZShlLmRhdGUoKStNYXRoLnJvdW5kKHQqcikpLCQpfTtpZihsPT09ZilyZXR1cm4gdGhpcy5zZXQoZix0aGlzLiRNK3IpO2lmKGw9PT1jKXJldHVybiB0aGlzLnNldChjLHRoaXMuJHkrcik7aWYobD09PWEpcmV0dXJuIHkoMSk7aWYobD09PW8pcmV0dXJuIHkoNyk7dmFyIE09KGQ9e30sZFtzXT1lLGRbdV09bixkW2ldPXQsZClbbF18fDEsbT10aGlzLiRkLmdldFRpbWUoKStyKk07cmV0dXJuIE8udyhtLHRoaXMpfSxtLnN1YnRyYWN0PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuYWRkKC0xKnQsZSl9LG0uZm9ybWF0PWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMsbj10aGlzLiRsb2NhbGUoKTtpZighdGhpcy5pc1ZhbGlkKCkpcmV0dXJuIG4uaW52YWxpZERhdGV8fCQ7dmFyIHI9dHx8XCJZWVlZLU1NLUREVEhIOm1tOnNzWlwiLGk9Ty56KHRoaXMpLHM9dGhpcy4kSCx1PXRoaXMuJG0sYT10aGlzLiRNLG89bi53ZWVrZGF5cyxmPW4ubW9udGhzLGg9ZnVuY3Rpb24odCxuLGkscyl7cmV0dXJuIHQmJih0W25dfHx0KGUscikpfHxpW25dLnNsaWNlKDAscyl9LGM9ZnVuY3Rpb24odCl7cmV0dXJuIE8ucyhzJTEyfHwxMix0LFwiMFwiKX0sZD1uLm1lcmlkaWVtfHxmdW5jdGlvbih0LGUsbil7dmFyIHI9dDwxMj9cIkFNXCI6XCJQTVwiO3JldHVybiBuP3IudG9Mb3dlckNhc2UoKTpyfSxsPXtZWTpTdHJpbmcodGhpcy4keSkuc2xpY2UoLTIpLFlZWVk6dGhpcy4keSxNOmErMSxNTTpPLnMoYSsxLDIsXCIwXCIpLE1NTTpoKG4ubW9udGhzU2hvcnQsYSxmLDMpLE1NTU06aChmLGEpLEQ6dGhpcy4kRCxERDpPLnModGhpcy4kRCwyLFwiMFwiKSxkOlN0cmluZyh0aGlzLiRXKSxkZDpoKG4ud2Vla2RheXNNaW4sdGhpcy4kVyxvLDIpLGRkZDpoKG4ud2Vla2RheXNTaG9ydCx0aGlzLiRXLG8sMyksZGRkZDpvW3RoaXMuJFddLEg6U3RyaW5nKHMpLEhIOk8ucyhzLDIsXCIwXCIpLGg6YygxKSxoaDpjKDIpLGE6ZChzLHUsITApLEE6ZChzLHUsITEpLG06U3RyaW5nKHUpLG1tOk8ucyh1LDIsXCIwXCIpLHM6U3RyaW5nKHRoaXMuJHMpLHNzOk8ucyh0aGlzLiRzLDIsXCIwXCIpLFNTUzpPLnModGhpcy4kbXMsMyxcIjBcIiksWjppfTtyZXR1cm4gci5yZXBsYWNlKHksKGZ1bmN0aW9uKHQsZSl7cmV0dXJuIGV8fGxbdF18fGkucmVwbGFjZShcIjpcIixcIlwiKX0pKX0sbS51dGNPZmZzZXQ9ZnVuY3Rpb24oKXtyZXR1cm4gMTUqLU1hdGgucm91bmQodGhpcy4kZC5nZXRUaW1lem9uZU9mZnNldCgpLzE1KX0sbS5kaWZmPWZ1bmN0aW9uKHIsZCwkKXt2YXIgbCx5PU8ucChkKSxNPXcociksbT0oTS51dGNPZmZzZXQoKS10aGlzLnV0Y09mZnNldCgpKSplLGc9dGhpcy1NLHY9Ty5tKHRoaXMsTSk7cmV0dXJuIHY9KGw9e30sbFtjXT12LzEyLGxbZl09dixsW2hdPXYvMyxsW29dPShnLW0pLzYwNDhlNSxsW2FdPShnLW0pLzg2NGU1LGxbdV09Zy9uLGxbc109Zy9lLGxbaV09Zy90LGwpW3ldfHxnLCQ/djpPLmEodil9LG0uZGF5c0luTW9udGg9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbmRPZihmKS4kRH0sbS4kbG9jYWxlPWZ1bmN0aW9uKCl7cmV0dXJuIERbdGhpcy4kTF19LG0ubG9jYWxlPWZ1bmN0aW9uKHQsZSl7aWYoIXQpcmV0dXJuIHRoaXMuJEw7dmFyIG49dGhpcy5jbG9uZSgpLHI9Uyh0LGUsITApO3JldHVybiByJiYobi4kTD1yKSxufSxtLmNsb25lPWZ1bmN0aW9uKCl7cmV0dXJuIE8udyh0aGlzLiRkLHRoaXMpfSxtLnRvRGF0ZT1mdW5jdGlvbigpe3JldHVybiBuZXcgRGF0ZSh0aGlzLnZhbHVlT2YoKSl9LG0udG9KU09OPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuaXNWYWxpZCgpP3RoaXMudG9JU09TdHJpbmcoKTpudWxsfSxtLnRvSVNPU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJGQudG9JU09TdHJpbmcoKX0sbS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLiRkLnRvVVRDU3RyaW5nKCl9LE19KCksVD1fLnByb3RvdHlwZTtyZXR1cm4gdy5wcm90b3R5cGU9VCxbW1wiJG1zXCIscl0sW1wiJHNcIixpXSxbXCIkbVwiLHNdLFtcIiRIXCIsdV0sW1wiJFdcIixhXSxbXCIkTVwiLGZdLFtcIiR5XCIsY10sW1wiJERcIixkXV0uZm9yRWFjaCgoZnVuY3Rpb24odCl7VFt0WzFdXT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy4kZyhlLHRbMF0sdFsxXSl9fSkpLHcuZXh0ZW5kPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQuJGl8fCh0KGUsXyx3KSx0LiRpPSEwKSx3fSx3LmxvY2FsZT1TLHcuaXNEYXlqcz1wLHcudW5peD1mdW5jdGlvbih0KXtyZXR1cm4gdygxZTMqdCl9LHcuZW49RFt2XSx3LkxzPUQsdy5wPXt9LHd9KSk7IiwiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dChyZXF1aXJlKFwiZGF5anNcIikpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW1wiZGF5anNcIl0sdCk6KGU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczplfHxzZWxmKS5kYXlqc19sb2NhbGVfbmI9dChlLmRheWpzKX0odGhpcywoZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdChlKXtyZXR1cm4gZSYmXCJvYmplY3RcIj09dHlwZW9mIGUmJlwiZGVmYXVsdFwiaW4gZT9lOntkZWZhdWx0OmV9fXZhciBuPXQoZSksYT17bmFtZTpcIm5iXCIsd2Vla2RheXM6XCJzw7huZGFnX21hbmRhZ190aXJzZGFnX29uc2RhZ190b3JzZGFnX2ZyZWRhZ19sw7hyZGFnXCIuc3BsaXQoXCJfXCIpLHdlZWtkYXlzU2hvcnQ6XCJzw7guX21hLl90aS5fb24uX3RvLl9mci5fbMO4LlwiLnNwbGl0KFwiX1wiKSx3ZWVrZGF5c01pbjpcInPDuF9tYV90aV9vbl90b19mcl9sw7hcIi5zcGxpdChcIl9cIiksbW9udGhzOlwiamFudWFyX2ZlYnJ1YXJfbWFyc19hcHJpbF9tYWlfanVuaV9qdWxpX2F1Z3VzdF9zZXB0ZW1iZXJfb2t0b2Jlcl9ub3ZlbWJlcl9kZXNlbWJlclwiLnNwbGl0KFwiX1wiKSxtb250aHNTaG9ydDpcImphbi5fZmViLl9tYXJzX2FwcmlsX21haV9qdW5pX2p1bGlfYXVnLl9zZXAuX29rdC5fbm92Ll9kZXMuXCIuc3BsaXQoXCJfXCIpLG9yZGluYWw6ZnVuY3Rpb24oZSl7cmV0dXJuIGUrXCIuXCJ9LHdlZWtTdGFydDoxLHllYXJTdGFydDo0LGZvcm1hdHM6e0xUOlwiSEg6bW1cIixMVFM6XCJISDptbTpzc1wiLEw6XCJERC5NTS5ZWVlZXCIsTEw6XCJELiBNTU1NIFlZWVlcIixMTEw6XCJELiBNTU1NIFlZWVkgW2tsLl0gSEg6bW1cIixMTExMOlwiZGRkZCBELiBNTU1NIFlZWVkgW2tsLl0gSEg6bW1cIn0scmVsYXRpdmVUaW1lOntmdXR1cmU6XCJvbSAlc1wiLHBhc3Q6XCIlcyBzaWRlblwiLHM6XCJub2VuIHNla3VuZGVyXCIsbTpcImV0dCBtaW51dHRcIixtbTpcIiVkIG1pbnV0dGVyXCIsaDpcImVuIHRpbWVcIixoaDpcIiVkIHRpbWVyXCIsZDpcImVuIGRhZ1wiLGRkOlwiJWQgZGFnZXJcIixNOlwiZW4gbcOlbmVkXCIsTU06XCIlZCBtw6VuZWRlclwiLHk6XCJldHQgw6VyXCIseXk6XCIlZCDDpXJcIn19O3JldHVybiBuLmRlZmF1bHQubG9jYWxlKGEsbnVsbCwhMCksYX0pKTsiLCIhZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZSh0KTooZT1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOmV8fHNlbGYpLmRheWpzX3BsdWdpbl9pc1NhbWVPckFmdGVyPXQoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtyZXR1cm4gZnVuY3Rpb24oZSx0KXt0LnByb3RvdHlwZS5pc1NhbWVPckFmdGVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuaXNTYW1lKGUsdCl8fHRoaXMuaXNBZnRlcihlLHQpfX19KSk7IiwiIWZ1bmN0aW9uKGUsaSl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9aSgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoaSk6KGU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczplfHxzZWxmKS5kYXlqc19wbHVnaW5faXNTYW1lT3JCZWZvcmU9aSgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3JldHVybiBmdW5jdGlvbihlLGkpe2kucHJvdG90eXBlLmlzU2FtZU9yQmVmb3JlPWZ1bmN0aW9uKGUsaSl7cmV0dXJuIHRoaXMuaXNTYW1lKGUsaSl8fHRoaXMuaXNCZWZvcmUoZSxpKX19fSkpOyIsIi8qIEB0cy1zZWxmLXR5cGVzPVwiLi9pbmRleC5kLnRzXCIgKi9cbmltcG9ydCB7IHVybEFscGhhYmV0IGFzIHNjb3BlZFVybEFscGhhYmV0IH0gZnJvbSAnLi91cmwtYWxwaGFiZXQvaW5kZXguanMnXG5leHBvcnQgeyB1cmxBbHBoYWJldCB9IGZyb20gJy4vdXJsLWFscGhhYmV0L2luZGV4LmpzJ1xuZXhwb3J0IGxldCByYW5kb20gPSBieXRlcyA9PiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KGJ5dGVzKSlcbmV4cG9ydCBsZXQgY3VzdG9tUmFuZG9tID0gKGFscGhhYmV0LCBkZWZhdWx0U2l6ZSwgZ2V0UmFuZG9tKSA9PiB7XG4gIGxldCBtYXNrID0gKDIgPDwgTWF0aC5sb2cyKGFscGhhYmV0Lmxlbmd0aCAtIDEpKSAtIDFcbiAgbGV0IHN0ZXAgPSAtfigoMS42ICogbWFzayAqIGRlZmF1bHRTaXplKSAvIGFscGhhYmV0Lmxlbmd0aClcbiAgcmV0dXJuIChzaXplID0gZGVmYXVsdFNpemUpID0+IHtcbiAgICBsZXQgaWQgPSAnJ1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBsZXQgYnl0ZXMgPSBnZXRSYW5kb20oc3RlcClcbiAgICAgIGxldCBqID0gc3RlcCB8IDBcbiAgICAgIHdoaWxlIChqLS0pIHtcbiAgICAgICAgaWQgKz0gYWxwaGFiZXRbYnl0ZXNbal0gJiBtYXNrXSB8fCAnJ1xuICAgICAgICBpZiAoaWQubGVuZ3RoID49IHNpemUpIHJldHVybiBpZFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuZXhwb3J0IGxldCBjdXN0b21BbHBoYWJldCA9IChhbHBoYWJldCwgc2l6ZSA9IDIxKSA9PlxuICBjdXN0b21SYW5kb20oYWxwaGFiZXQsIHNpemUgfCAwLCByYW5kb20pXG5leHBvcnQgbGV0IG5hbm9pZCA9IChzaXplID0gMjEpID0+IHtcbiAgbGV0IGlkID0gJydcbiAgbGV0IGJ5dGVzID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgoc2l6ZSB8PSAwKSkpXG4gIHdoaWxlIChzaXplLS0pIHtcbiAgICBpZCArPSBzY29wZWRVcmxBbHBoYWJldFtieXRlc1tzaXplXSAmIDYzXVxuICB9XG4gIHJldHVybiBpZFxufVxuIiwiZXhwb3J0IGNvbnN0IHVybEFscGhhYmV0ID1cbiAgJ3VzZWFuZG9tLTI2VDE5ODM0MFBYNzVweEpBQ0tWRVJZTUlOREJVU0hXT0xGX0dRWmJmZ2hqa2xxdnd5enJpY3QnXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJkYTkxN2FiYzJiYjU0MjkxODdhYlwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInN0eWxlZCIsIkJnTmV1dHJhbFN0cm9uZ1ByZXNzZWQiLCJCb3JkZXJOZXV0cmFsU3VidGxlIiwiVGV4dEFjY2VudCIsIlRleHROZXV0cmFsIiwiVGV4dE5ldXRyYWxTdWJ0bGUiLCJUaWRzbGluamVWaW5kdSIsInVzZVRpZHNsaW5qZUNvbnRleHQiLCJGYW1pbGllQmFzZUtuYXBwIiwiRXRpa2V0dEtuYXBwIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbCIsIl9yZWYiLCIkdmFsZ3QiLCJfcmVmMiIsImRpc2FibGVkIiwiX3JlZjMiLCJjb25jYXQiLCJfcmVmNCIsIl9yZWY1IiwiX3JlZjYiLCJfYyIsIlRpZHNsaW5qZUV0aWtldHQiLCJfcmVmNyIsIl9zIiwiZXRpa2V0dCIsIl91c2VUaWRzbGluamVDb250ZXh0IiwiYWt0aXZFdGlrZXR0Iiwic2V0dEFrdGl2RXRpa2V0dCIsImFrdGl2dFRpZHNsaW5qZVZpbmR1IiwiaW5pdGllbGxBa3RpdkV0aWtldHRFclNhdHQiLCJzZXRJbml0aWVsbEFrdGl2RXRpa2V0dEVyU2F0dCIsIm9uRXRpa2V0dENsaWNrIiwiZGF0ZSIsImdldEZ1bGxZZWFyIiwiRGF0ZSIsImdldE1vbnRoIiwiY3JlYXRlRWxlbWVudCIsImxhYmVsIiwidmluZHUiLCJpZCIsIlRSRV/DhVIiLCJ0b0RhdGVTdHJpbmciLCJvbkNsaWNrIiwiX2MyIiwiJFJlZnJlc2hSZWckIiwiVG9nZ2xlR3JvdXAiLCJWaW5kdXZlbGdlciIsInRpZHNsaW5qZVZpbmR1ZXIiLCJlbmRyZVRpZHNsaW5qZVZpbmR1IiwiZGVmYXVsdFZhbHVlIiwidG9TdHJpbmciLCJzaXplIiwidmFyaWFudCIsIm9uQ2hhbmdlIiwidmluZHVJZCIsIk51bWJlciIsIm1hcCIsIkl0ZW0iLCJrZXkiLCJ2YWx1ZSIsImVuZE9mTW9udGgiLCJCb2R5U2hvcnQiLCJIZWFkaW5nIiwiVGlkc2xpbmplIiwiVGlkc2xpbmplTmF2aWdlcmluZyIsImZvcm1hdGVySWRlbnQiLCJUaWRzbGluamVIZWFkZXIiLCJkaXYiLCJUaWRzbGluamVDb250cm9scyIsIl90ZW1wbGF0ZU9iamVjdDIiLCJUaWRzbGluamVDb250YWluZXIiLCJfdGVtcGxhdGVPYmplY3QzIiwiX2MzIiwiVGlkc2xpbmplTGFiZWxzIiwiX3RlbXBsYXRlT2JqZWN0NCIsIl9jNCIsIlRpbGtqZW50WXRlbHNlVGlkc2xpbmplIiwiZ3J1bm5sYWdQZXJzb25lciIsInRpZHNsaW5qZVBlcnNvbmVyIiwiZmFnc2FrVHlwZSIsImdlbmVyZXJGb3JtYXRlcnTDhXJzdGFsbCIsImdlbmVyZXJSYWRlciIsIm5hdmlnZXIiLCJ0aWRzbGluamVSYWRlciIsIkZyYWdtZW50IiwibGV2ZWwiLCJwZXJzb24iLCJpbmRleCIsInRpdGxlIiwibmF2biIsInBlcnNvbklkZW50IiwicmFkZXIiLCJldGlrZXR0UmVuZGVyIiwic3RhcnREYXRvIiwic2x1dHREYXRvIiwicGlucyIsImFrdGl2dFV0c25pdHQiLCJmb20iLCJ0b20iLCJfYzUiXSwic291cmNlUm9vdCI6IiJ9