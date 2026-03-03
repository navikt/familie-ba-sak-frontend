"use strict";
self["webpackHotUpdatefamilie_ba_sak_frontend"]("main",{

/***/ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Behandlingsresultat.tsx"
/*!************************************************************************************************!*\
  !*** ./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Behandlingsresultat.tsx ***!
  \************************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @navikt/aksel-icons */ "./node_modules/@navikt/aksel-icons/dist/react/esm/index.js");
/* harmony import */ var _navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @navikt/ds-react */ "./node_modules/@navikt/ds-react/esm/index.js");
/* harmony import */ var _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @navikt/familie-typer */ "./node_modules/@navikt/familie-typer/dist/index.js");
/* harmony import */ var _EndretUtbetaling_EndretUtbetalingAndelTabell__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EndretUtbetaling/EndretUtbetalingAndelTabell */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/EndretUtbetaling/EndretUtbetalingAndelTabell.tsx");
/* harmony import */ var _E_s_Kompetanse_KompetanseSkjema__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Eøs/Kompetanse/KompetanseSkjema */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/Kompetanse/KompetanseSkjema.tsx");
/* harmony import */ var _E_s_Kompetanse_useKompetansePeriodeSkjema__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Eøs/Kompetanse/useKompetansePeriodeSkjema */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/Kompetanse/useKompetansePeriodeSkjema.ts");
/* harmony import */ var _E_s_useE_s__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Eøs/useEøs */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/useEøs.ts");
/* harmony import */ var _E_s_UtbetaltAnnetLand_useUtenlandskPeriodeBel_pSkjema__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Eøs/UtbetaltAnnetLand/useUtenlandskPeriodeBeløpSkjema */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/UtbetaltAnnetLand/useUtenlandskPeriodeBeløpSkjema.ts");
/* harmony import */ var _E_s_UtbetaltAnnetLand_UtbetaltAnnetLand__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Eøs/UtbetaltAnnetLand/UtbetaltAnnetLand */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/UtbetaltAnnetLand/UtbetaltAnnetLand.tsx");
/* harmony import */ var _E_s_Valutakurs_useOppdaterValutakursOgSimuleringP_BeslutterSteg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Eøs/Valutakurs/useOppdaterValutakursOgSimuleringPåBeslutterSteg */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/Valutakurs/useOppdaterValutakursOgSimuleringPåBeslutterSteg.ts");
/* harmony import */ var _E_s_Valutakurs_useValutakursSkjema__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Eøs/Valutakurs/useValutakursSkjema */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/Valutakurs/useValutakursSkjema.ts");
/* harmony import */ var _E_s_Valutakurs_Valutakurser__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Eøs/Valutakurs/Valutakurser */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Eøs/Valutakurs/Valutakurser.tsx");
/* harmony import */ var _MigreringInfoboks__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./MigreringInfoboks */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/MigreringInfoboks.tsx");
/* harmony import */ var _Oppsummeringsboks__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Oppsummeringsboks */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/Oppsummeringsboks.tsx");
/* harmony import */ var _TilkjentYtelseTidslinje__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./TilkjentYtelseTidslinje */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/TilkjentYtelseTidslinje.tsx");
/* harmony import */ var _useBehandlingsresultat__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./useBehandlingsresultat */ "./src/frontend/sider/Fagsak/Behandling/Sider/Behandlingsresultat/useBehandlingsresultat.ts");
/* harmony import */ var _hooks_useFagsakId__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../../hooks/useFagsakId */ "./src/frontend/hooks/useFagsakId.ts");
/* harmony import */ var _hooks_useOpprettEndretUtbetalingAndel__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../../hooks/useOpprettEndretUtbetalingAndel */ "./src/frontend/hooks/useOpprettEndretUtbetalingAndel.ts");
/* harmony import */ var _komponenter_Tidslinje_TidslinjeContext__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../../komponenter/Tidslinje/TidslinjeContext */ "./src/frontend/komponenter/Tidslinje/TidslinjeContext.tsx");
/* harmony import */ var _typer_behandling__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../../typer/behandling */ "./src/frontend/typer/behandling.ts");
/* harmony import */ var _utils_dato__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../../utils/dato */ "./src/frontend/utils/dato/index.ts");
/* harmony import */ var _utils_formatter__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../../../utils/formatter */ "./src/frontend/utils/formatter.ts");
/* harmony import */ var _utils_ressursUtils__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../../../utils/ressursUtils */ "./src/frontend/utils/ressursUtils.ts");
/* harmony import */ var _FagsakContext__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../FagsakContext */ "./src/frontend/sider/Fagsak/FagsakContext.tsx");
/* harmony import */ var _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../context/BehandlingContext */ "./src/frontend/sider/Fagsak/Behandling/context/BehandlingContext.tsx");
/* harmony import */ var _Skjemasteg__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../Skjemasteg */ "./src/frontend/sider/Fagsak/Behandling/Sider/Skjemasteg.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");

__webpack_require__.$Refresh$.runtime = /*#__PURE__*/ (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Users_Nghi_Nguyen_git_nav_baks_familie_ba_sak_frontend_node_modules_react_refresh_runtime_js__WEBPACK_IMPORTED_MODULE_0__, 2)));

var _templateObject,
  _templateObject2,
  _templateObject3,
  _templateObject4,
  _s = __webpack_require__.$Refresh$.signature();
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }






























var EndretUtbetalingAndel = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    display: flex;\n    justify-content: flex-end;\n    margin-bottom: 1rem;\n"])));
_c = EndretUtbetalingAndel;
var StyledEditIkon = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_aksel_icons__WEBPACK_IMPORTED_MODULE_4__.PencilIcon)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    font-size: 1.5rem;\n"])));
_c2 = StyledEditIkon;
var StyledAlert = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Alert)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    margin-bottom: 1rem;\n"])));
_c3 = StyledAlert;
var StyledErrorSummary = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.ErrorSummary)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    margin-top: 5rem;\n"])));
_c4 = StyledErrorSummary;
var Behandlingsresultat = function Behandlingsresultat(_ref) {
  _s();
  var _åpenBehandling$kompe, _åpenBehandling$utenl, _åpenBehandling$utenl2;
  var åpenBehandling = _ref.åpenBehandling;
  var navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
  var fagsakId = (0,_hooks_useFagsakId__WEBPACK_IMPORTED_MODULE_20__.useFagsakId)();
  var _useFagsakContext = (0,_FagsakContext__WEBPACK_IMPORTED_MODULE_27__.useFagsakContext)(),
    fagsak = _useFagsakContext.fagsak;
  var _useBehandlingContext = (0,_context_BehandlingContext__WEBPACK_IMPORTED_MODULE_28__.useBehandlingContext)(),
    settÅpenBehandling = _useBehandlingContext.settÅpenBehandling;
  var _useBehandlingsresult = (0,_useBehandlingsresultat__WEBPACK_IMPORTED_MODULE_19__.useBehandlingsresultat)(åpenBehandling),
    visFeilmeldinger = _useBehandlingsresult.visFeilmeldinger,
    settVisFeilmeldinger = _useBehandlingsresult.settVisFeilmeldinger,
    hentPersonerMedUgyldigEtterbetalingsperiode = _useBehandlingsresult.hentPersonerMedUgyldigEtterbetalingsperiode,
    personerMedUgyldigEtterbetalingsperiode = _useBehandlingsresult.personerMedUgyldigEtterbetalingsperiode;
  var _useOpprettEndretUtbe = (0,_hooks_useOpprettEndretUtbetalingAndel__WEBPACK_IMPORTED_MODULE_21__.useOpprettEndretUtbetalingAndel)({
      onSuccess: function onSuccess(behandling) {
        return settÅpenBehandling((0,_navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.byggDataRessurs)(behandling));
      }
    }),
    opprettEndretUtbetalingAndel = _useOpprettEndretUtbe.mutate,
    isOpprettEndretUtbetalingAndelPending = _useOpprettEndretUtbe.isPending,
    isOpprettEndretUtbetalingAndelError = _useOpprettEndretUtbe.isError,
    opprettEndretUtbetalingAndelError = _useOpprettEndretUtbe.error;
  var _useTidslinjeContext = (0,_komponenter_Tidslinje_TidslinjeContext__WEBPACK_IMPORTED_MODULE_22__.useTidslinjeContext)(),
    aktivEtikett = _useTidslinjeContext.aktivEtikett,
    filterOgSorterAndelPersonerIGrunnlag = _useTidslinjeContext.filterOgSorterAndelPersonerIGrunnlag,
    filterOgSorterGrunnlagPersonerMedAndeler = _useTidslinjeContext.filterOgSorterGrunnlagPersonerMedAndeler;
  (0,_E_s_Valutakurs_useOppdaterValutakursOgSimuleringP_BeslutterSteg__WEBPACK_IMPORTED_MODULE_13__["useOppdaterValutakursOgSimuleringPåBeslutterSteg"])();
  var _useBehandlingContext2 = (0,_context_BehandlingContext__WEBPACK_IMPORTED_MODULE_28__.useBehandlingContext)(),
    vurderErLesevisning = _useBehandlingContext2.vurderErLesevisning,
    behandlingresultatNesteOnClick = _useBehandlingContext2.behandlingresultatNesteOnClick,
    behandlingsstegSubmitressurs = _useBehandlingContext2.behandlingsstegSubmitressurs;
  var _useEøs = (0,_E_s_useE_s__WEBPACK_IMPORTED_MODULE_10__["useEøs"])(åpenBehandling),
    erEøsInformasjonGyldig = _useEøs.erEøsInformasjonGyldig,
    kompetanser = _useEøs.kompetanser,
    hentKompetanserMedFeil = _useEøs.hentKompetanserMedFeil,
    utbetaltAnnetLandBeløp = _useEøs.utbetaltAnnetLandBeløp,
    erUtbetaltAnnetLandBeløpGyldige = _useEøs.erUtbetaltAnnetLandBeløpGyldige,
    hentUtbetaltAnnetLandBeløpMedFeil = _useEøs.hentUtbetaltAnnetLandBeløpMedFeil,
    valutakurser = _useEøs.valutakurser,
    erValutakurserGyldige = _useEøs.erValutakurserGyldige,
    hentValutakurserMedFeil = _useEøs.hentValutakurserMedFeil;
  var erLesevisning = vurderErLesevisning();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    hentPersonerMedUgyldigEtterbetalingsperiode();
  }, [åpenBehandling]);
  var finnUtbetalingsperiodeForAktivEtikett = function finnUtbetalingsperiodeForAktivEtikett(utbetalingsperioder) {
    return aktivEtikett ? utbetalingsperioder.find(function (utbetalingsperiode) {
      return (0,_utils_dato__WEBPACK_IMPORTED_MODULE_24__.periodeOverlapperMedValgtDato)(utbetalingsperiode.periodeFom, utbetalingsperiode.periodeTom, aktivEtikett.date);
    }) : undefined;
  };
  var grunnlagPersoner = filterOgSorterGrunnlagPersonerMedAndeler(åpenBehandling.personer, åpenBehandling.personerMedAndelerTilkjentYtelse);
  var tidslinjePersoner = filterOgSorterAndelPersonerIGrunnlag(grunnlagPersoner, åpenBehandling.personerMedAndelerTilkjentYtelse);
  var erMigreringFraInfotrygd = åpenBehandling.type === _typer_behandling__WEBPACK_IMPORTED_MODULE_23__.Behandlingstype.MIGRERING_FRA_INFOTRYGD;
  var harKompetanser = ((_åpenBehandling$kompe = åpenBehandling.kompetanser) === null || _åpenBehandling$kompe === void 0 ? void 0 : _åpenBehandling$kompe.length) > 0;
  var harUtenlandskeBeløper = ((_åpenBehandling$utenl = åpenBehandling.utenlandskePeriodebeløp) === null || _åpenBehandling$utenl === void 0 ? void 0 : _åpenBehandling$utenl.length) > 0;
  var harValutakurser = ((_åpenBehandling$utenl2 = åpenBehandling.utenlandskePeriodebeløp) === null || _åpenBehandling$utenl2 === void 0 ? void 0 : _åpenBehandling$utenl2.length) > 0;
  var harEøs = harKompetanser || harUtenlandskeBeløper || harValutakurser;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Skjemasteg__WEBPACK_IMPORTED_MODULE_29__["default"], {
    senderInn: behandlingsstegSubmitressurs.status === _navikt_familie_typer__WEBPACK_IMPORTED_MODULE_6__.RessursStatus.HENTER,
    tittel: "Behandlingsresultat",
    className: "behandlingsresultat",
    forrigeOnClick: function forrigeOnClick() {
      return navigate("/fagsak/".concat(fagsakId, "/").concat(åpenBehandling.behandlingId, "/vilkaarsvurdering"));
    },
    nesteOnClick: function nesteOnClick() {
      if (erLesevisning) {
        navigate("/fagsak/".concat(fagsakId, "/").concat(åpenBehandling.behandlingId, "/simulering"));
      } else if (harEøs && !erEøsInformasjonGyldig()) {
        settVisFeilmeldinger(true);
      } else {
        behandlingresultatNesteOnClick();
      }
    },
    maxWidthStyle: '80rem',
    feilmelding: (0,_utils_ressursUtils__WEBPACK_IMPORTED_MODULE_26__.hentFrontendFeilmelding)(behandlingsstegSubmitressurs),
    steg: _typer_behandling__WEBPACK_IMPORTED_MODULE_23__.BehandlingSteg.BEHANDLINGSRESULTAT
  }, personerMedUgyldigEtterbetalingsperiode.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(StyledAlert, {
    variant: 'warning'
  }, "Du har perioder som kan f\xF8re til etterbetaling utover tre m\xE5neder for person", ' ', (0,_utils_formatter__WEBPACK_IMPORTED_MODULE_25__["slåSammenListeTilStreng"])(personerMedUgyldigEtterbetalingsperiode.map(function (ident) {
    return (0,_utils_formatter__WEBPACK_IMPORTED_MODULE_25__.formaterIdent)(ident);
  })), "."), erMigreringFraInfotrygd && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_MigreringInfoboks__WEBPACK_IMPORTED_MODULE_16__["default"], {
    behandlingId: åpenBehandling.behandlingId
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_TilkjentYtelseTidslinje__WEBPACK_IMPORTED_MODULE_18__["default"], {
    grunnlagPersoner: grunnlagPersoner,
    tidslinjePersoner: tidslinjePersoner,
    fagsakType: fagsak.fagsakType
  }), !erLesevisning && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(EndretUtbetalingAndel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Button, {
    variant: "tertiary",
    size: "small",
    onClick: function onClick() {
      return opprettEndretUtbetalingAndel();
    },
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(StyledEditIkon, null),
    disabled: isOpprettEndretUtbetalingAndelPending,
    loading: isOpprettEndretUtbetalingAndelPending
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Label, null, "Endre utbetalingsperiode")), isOpprettEndretUtbetalingAndelError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.ErrorMessage, null, opprettEndretUtbetalingAndelError.message)), aktivEtikett && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Oppsummeringsboks__WEBPACK_IMPORTED_MODULE_17__.Oppsummeringsboks, {
    utbetalingsperiode: finnUtbetalingsperiodeForAktivEtikett(åpenBehandling.utbetalingsperioder),
    aktivEtikett: aktivEtikett,
    kompetanser: kompetanser,
    utbetaltAnnetLandBeløp: utbetaltAnnetLandBeløp,
    valutakurser: valutakurser
  }), åpenBehandling.endretUtbetalingAndeler.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_EndretUtbetaling_EndretUtbetalingAndelTabell__WEBPACK_IMPORTED_MODULE_7__["default"], {
    åpenBehandling: åpenBehandling
  }), harKompetanser && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_E_s_Kompetanse_KompetanseSkjema__WEBPACK_IMPORTED_MODULE_8__["default"], {
    kompetanser: kompetanser,
    visFeilmeldinger: visFeilmeldinger,
    åpenBehandling: åpenBehandling
  }), harUtenlandskeBeløper && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_E_s_UtbetaltAnnetLand_UtbetaltAnnetLand__WEBPACK_IMPORTED_MODULE_12__["default"], {
    utbetaltAnnetLandBeløp: utbetaltAnnetLandBeløp,
    erUtbetaltAnnetLandBeløpGyldige: erUtbetaltAnnetLandBeløpGyldige,
    visFeilmeldinger: visFeilmeldinger,
    åpenBehandling: åpenBehandling
  }), harValutakurser && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_E_s_Valutakurs_Valutakurser__WEBPACK_IMPORTED_MODULE_15__["default"], {
    valutakurser: valutakurser,
    erValutakurserGyldige: erValutakurserGyldige,
    visFeilmeldinger: visFeilmeldinger,
    åpenBehandling: åpenBehandling
  }), visFeilmeldinger && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(StyledErrorSummary, {
    heading: 'For å gå videre må du rette opp følgende:'
  }, [].concat(_toConsumableArray(hentKompetanserMedFeil().map(function (kompetanse) {
    return {
      feilmelding: "Kompetanse barn: ".concat(kompetanse.barnIdenter, ", f.o.m.: ").concat(kompetanse.fom, " er ikke fullstendig."),
      skjemaelementId: (0,_E_s_Kompetanse_useKompetansePeriodeSkjema__WEBPACK_IMPORTED_MODULE_9__.kompetanseFeilmeldingId)(kompetanse)
    };
  })), _toConsumableArray(hentUtbetaltAnnetLandBeløpMedFeil().map(function (utenlandskPeriodeBeløp) {
    return {
      feilmelding: "Utenlandsk bel\xF8p barn: ".concat(utenlandskPeriodeBeløp.barnIdenter, ", f.o.m.: ").concat(utenlandskPeriodeBeløp.fom, " er ikke fullstendig."),
      skjemaelementId: (0,_E_s_UtbetaltAnnetLand_useUtenlandskPeriodeBel_pSkjema__WEBPACK_IMPORTED_MODULE_11__["utenlandskPeriodeBeløpFeilmeldingId"])(utenlandskPeriodeBeløp)
    };
  })), _toConsumableArray(hentValutakurserMedFeil().map(function (valutakurs) {
    return {
      feilmelding: "Valutakurs barn: ".concat(valutakurs.barnIdenter, ", f.o.m.: ").concat(valutakurs.fom, " er ikke fullstendig."),
      skjemaelementId: (0,_E_s_Valutakurs_useValutakursSkjema__WEBPACK_IMPORTED_MODULE_14__.valutakursFeilmeldingId)(valutakurs)
    };
  }))).map(function (item) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.ErrorSummary.Item, {
      href: "#".concat(item.skjemaelementId)
    }, item.feilmelding);
  })));
};
_s(Behandlingsresultat, "LaRtFE2pMmNbQNNPdD3TmTUA94I=", false, function () {
  return [react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate, _hooks_useFagsakId__WEBPACK_IMPORTED_MODULE_20__.useFagsakId, _FagsakContext__WEBPACK_IMPORTED_MODULE_27__.useFagsakContext, _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_28__.useBehandlingContext, _useBehandlingsresultat__WEBPACK_IMPORTED_MODULE_19__.useBehandlingsresultat, _hooks_useOpprettEndretUtbetalingAndel__WEBPACK_IMPORTED_MODULE_21__.useOpprettEndretUtbetalingAndel, _komponenter_Tidslinje_TidslinjeContext__WEBPACK_IMPORTED_MODULE_22__.useTidslinjeContext, _E_s_Valutakurs_useOppdaterValutakursOgSimuleringP_BeslutterSteg__WEBPACK_IMPORTED_MODULE_13__["useOppdaterValutakursOgSimuleringPåBeslutterSteg"], _context_BehandlingContext__WEBPACK_IMPORTED_MODULE_28__.useBehandlingContext, _E_s_useE_s__WEBPACK_IMPORTED_MODULE_10__["useEøs"]];
});
_c5 = Behandlingsresultat;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Behandlingsresultat);
var _c, _c2, _c3, _c4, _c5;
__webpack_require__.$Refresh$.register(_c, "EndretUtbetalingAndel");
__webpack_require__.$Refresh$.register(_c2, "StyledEditIkon");
__webpack_require__.$Refresh$.register(_c3, "StyledAlert");
__webpack_require__.$Refresh$.register(_c4, "StyledErrorSummary");
__webpack_require__.$Refresh$.register(_c5, "Behandlingsresultat");

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
/******/ 	__webpack_require__.h = () => ("2c0af1e602420ed0528e")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4xMDJlMmMwYTcyY2M0NjQ3NmY5Ni5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQStCO0FBQ0c7QUFFUztBQUNKO0FBRVU7QUFDbUM7QUFDYjtBQUVrQjtBQUN4QjtBQUNxQjtBQUNoRDtBQUN3RTtBQUNwQztBQUMyRDtBQUN0RDtBQUN0QjtBQUNMO0FBQ0k7QUFDUTtBQUNFO0FBQ0g7QUFDd0M7QUFDWDtBQUVWO0FBT1I7QUFDYztBQUNaO0FBQ2xCO0FBQ2E7QUFDaEM7QUFFdkMsSUFBTXFDLHFCQUFxQixHQUFHbEMseURBQU0sQ0FBQ21DLEdBQUcsQ0FBQUMsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLHNCQUFBLHdGQUl2QztBQUFDQyxFQUFBLEdBSklKLHFCQUFxQjtBQU0zQixJQUFNSyxjQUFjLEdBQUd2Qyw2REFBTSxDQUFDQywyREFBVSxDQUFDLENBQUF1QyxnQkFBQSxLQUFBQSxnQkFBQSxHQUFBSCxzQkFBQSxrQ0FFeEM7QUFBQ0ksR0FBQSxHQUZJRixjQUFjO0FBSXBCLElBQU1HLFdBQVcsR0FBRzFDLDZEQUFNLENBQUNFLG1EQUFLLENBQUMsQ0FBQXlDLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFOLHNCQUFBLG9DQUVoQztBQUFDTyxHQUFBLEdBRklGLFdBQVc7QUFJakIsSUFBTUcsa0JBQWtCLEdBQUc3Qyw2REFBTSxDQUFDSywwREFBWSxDQUFDLENBQUF5QyxnQkFBQSxLQUFBQSxnQkFBQSxHQUFBVCxzQkFBQSxpQ0FFOUM7QUFBQ1UsR0FBQSxHQUZJRixrQkFBa0I7QUFReEIsSUFBTUcsbUJBQXVFLEdBQUcsU0FBMUVBLG1CQUF1RUEsQ0FBQUMsSUFBQSxFQUEyQjtFQUFBQyxFQUFBO0VBQUEsSUFBQUMscUJBQUEsRUFBQUMscUJBQUEsRUFBQUMsc0JBQUE7RUFBQSxJQUFyQkMsY0FBYyxHQUFBTCxJQUFBLENBQWRLLGNBQWM7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MkI7SUFBQSxPQUFNO01BQy9EckIsV0FBVyxzQkFBQUosTUFBQSxDQUFzQnlCLFVBQVUsQ0FBQ0osV0FBVyxnQkFBQXJCLE1BQUEsQ0FBYXlCLFVBQVUsQ0FBQ0gsR0FBRywwQkFBdUI7TUFDekdDLGVBQWUsRUFBRW5JLDZGQUF1QixDQUFDcUksVUFBVTtJQUN2RCxDQUFDO0VBQUEsQ0FBQyxDQUFDLEdBQ0xqQixHQUFHLENBQUMsVUFBQWtCLElBQUk7SUFBQSxvQkFDTnpKLGdEQUFBLENBQUNRLDBEQUFZLENBQUNrSixJQUFJO01BQUNDLElBQUksTUFBQTVCLE1BQUEsQ0FBTTBCLElBQUksQ0FBQ0gsZUFBZTtJQUFHLEdBQUVHLElBQUksQ0FBQ3RCLFdBQStCLENBQUM7RUFBQSxDQUM5RixDQUNlLENBRWhCLENBQUM7QUFFckIsQ0FBQztBQUFDOUUsRUFBQSxDQTlMSUYsbUJBQXVFO0VBQUEsUUFDeERqRCxxREFBVyxFQUNYdUIsNERBQVcsRUFDVFMsNkRBQWdCLEVBQ0pDLDZFQUFvQixFQU8vQ1gsNEVBQXNCLEVBT3RCRSxvR0FBK0IsRUFLL0JDLHlGQUFtQixFQUV2QlQsa0pBQWdELEVBRzVDaUIsNkVBQW9CLEVBWXBCcEIsbURBQU07QUFBQTtBQUFBNkksR0FBQSxHQXhDUnpHLG1CQUF1RTtBQWdNN0UsaUVBQWVBLG1CQUFtQixFQUFDO0FBQUEsSUFBQVYsRUFBQSxFQUFBRyxHQUFBLEVBQUFHLEdBQUEsRUFBQUcsR0FBQSxFQUFBMEcsR0FBQTtBQUFBQyxzQ0FBQSxDQUFBcEgsRUFBQTtBQUFBb0gsc0NBQUEsQ0FBQWpILEdBQUE7QUFBQWlILHNDQUFBLENBQUE5RyxHQUFBO0FBQUE4RyxzQ0FBQSxDQUFBM0csR0FBQTtBQUFBMkcsc0NBQUEsQ0FBQUQsR0FBQSx5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDL1BuQyxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL0ZhZ3Nhay9CZWhhbmRsaW5nL1NpZGVyL0JlaGFuZGxpbmdzcmVzdWx0YXQvQmVoYW5kbGluZ3NyZXN1bHRhdC50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IFBlbmNpbEljb24gfSBmcm9tICdAbmF2aWt0L2Frc2VsLWljb25zJztcbmltcG9ydCB7IEFsZXJ0LCBCdXR0b24sIEVycm9yTWVzc2FnZSwgRXJyb3JTdW1tYXJ5LCBMYWJlbCB9IGZyb20gJ0BuYXZpa3QvZHMtcmVhY3QnO1xuaW1wb3J0IHsgYnlnZ0RhdGFSZXNzdXJzLCBSZXNzdXJzU3RhdHVzIH0gZnJvbSAnQG5hdmlrdC9mYW1pbGllLXR5cGVyJztcblxuaW1wb3J0IEVuZHJldFV0YmV0YWxpbmdBbmRlbFRhYmVsbCBmcm9tICcuL0VuZHJldFV0YmV0YWxpbmcvRW5kcmV0VXRiZXRhbGluZ0FuZGVsVGFiZWxsJztcbmltcG9ydCBLb21wZXRhbnNlU2tqZW1hIGZyb20gJy4vRcO4cy9Lb21wZXRhbnNlL0tvbXBldGFuc2VTa2plbWEnO1xuaW1wb3J0IHsga29tcGV0YW5zZUZlaWxtZWxkaW5nSWQgfSBmcm9tICcuL0XDuHMvS29tcGV0YW5zZS91c2VLb21wZXRhbnNlUGVyaW9kZVNramVtYSc7XG5pbXBvcnQgeyB1c2VFw7hzIH0gZnJvbSAnLi9Fw7hzL3VzZUXDuHMnO1xuaW1wb3J0IHsgdXRlbmxhbmRza1BlcmlvZGVCZWzDuHBGZWlsbWVsZGluZ0lkIH0gZnJvbSAnLi9Fw7hzL1V0YmV0YWx0QW5uZXRMYW5kL3VzZVV0ZW5sYW5kc2tQZXJpb2RlQmVsw7hwU2tqZW1hJztcbmltcG9ydCBVdGJldGFsdEFubmV0TGFuZCBmcm9tICcuL0XDuHMvVXRiZXRhbHRBbm5ldExhbmQvVXRiZXRhbHRBbm5ldExhbmQnO1xuaW1wb3J0IHsgdXNlT3BwZGF0ZXJWYWx1dGFrdXJzT2dTaW11bGVyaW5nUMOlQmVzbHV0dGVyU3RlZyB9IGZyb20gJy4vRcO4cy9WYWx1dGFrdXJzL3VzZU9wcGRhdGVyVmFsdXRha3Vyc09nU2ltdWxlcmluZ1DDpUJlc2x1dHRlclN0ZWcnO1xuaW1wb3J0IHsgdmFsdXRha3Vyc0ZlaWxtZWxkaW5nSWQgfSBmcm9tICcuL0XDuHMvVmFsdXRha3Vycy91c2VWYWx1dGFrdXJzU2tqZW1hJztcbmltcG9ydCBWYWx1dGFrdXJzZXIgZnJvbSAnLi9Fw7hzL1ZhbHV0YWt1cnMvVmFsdXRha3Vyc2VyJztcbmltcG9ydCBNaWdyZXJpbmdJbmZvYm9rcyBmcm9tICcuL01pZ3JlcmluZ0luZm9ib2tzJztcbmltcG9ydCB7IE9wcHN1bW1lcmluZ3Nib2tzIH0gZnJvbSAnLi9PcHBzdW1tZXJpbmdzYm9rcyc7XG5pbXBvcnQgVGlsa2plbnRZdGVsc2VUaWRzbGluamUgZnJvbSAnLi9UaWxramVudFl0ZWxzZVRpZHNsaW5qZSc7XG5pbXBvcnQgeyB1c2VCZWhhbmRsaW5nc3Jlc3VsdGF0IH0gZnJvbSAnLi91c2VCZWhhbmRsaW5nc3Jlc3VsdGF0JztcbmltcG9ydCB7IHVzZUZhZ3Nha0lkIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vaG9va3MvdXNlRmFnc2FrSWQnO1xuaW1wb3J0IHsgdXNlT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2hvb2tzL3VzZU9wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWwnO1xuaW1wb3J0IHsgdXNlVGlkc2xpbmplQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2tvbXBvbmVudGVyL1RpZHNsaW5qZS9UaWRzbGluamVDb250ZXh0JztcbmltcG9ydCB0eXBlIHsgSUJlaGFuZGxpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlci9iZWhhbmRsaW5nJztcbmltcG9ydCB7IEJlaGFuZGxpbmdTdGVnLCBCZWhhbmRsaW5nc3R5cGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlci9iZWhhbmRsaW5nJztcbmltcG9ydCB7XG4gICAgdHlwZSBJUmVzdEtvbXBldGFuc2UsXG4gICAgdHlwZSBJUmVzdFV0ZW5sYW5kc2tQZXJpb2RlQmVsw7hwLFxuICAgIHR5cGUgSVJlc3RWYWx1dGFrdXJzLFxufSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlci9lw7hzUGVyaW9kZXInO1xuaW1wb3J0IHR5cGUgeyBVdGJldGFsaW5nc3BlcmlvZGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlci92ZWR0YWtzcGVyaW9kZSc7XG5pbXBvcnQgeyBwZXJpb2RlT3ZlcmxhcHBlck1lZFZhbGd0RGF0byB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL2RhdG8nO1xuaW1wb3J0IHsgZm9ybWF0ZXJJZGVudCwgc2zDpVNhbW1lbkxpc3RlVGlsU3RyZW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvZm9ybWF0dGVyJztcbmltcG9ydCB7IGhlbnRGcm9udGVuZEZlaWxtZWxkaW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvcmVzc3Vyc1V0aWxzJztcbmltcG9ydCB7IHVzZUZhZ3Nha0NvbnRleHQgfSBmcm9tICcuLi8uLi8uLi9GYWdzYWtDb250ZXh0JztcbmltcG9ydCB7IHVzZUJlaGFuZGxpbmdDb250ZXh0IH0gZnJvbSAnLi4vLi4vY29udGV4dC9CZWhhbmRsaW5nQ29udGV4dCc7XG5pbXBvcnQgU2tqZW1hc3RlZyBmcm9tICcuLi9Ta2plbWFzdGVnJztcblxuY29uc3QgRW5kcmV0VXRiZXRhbGluZ0FuZGVsID0gc3R5bGVkLmRpdmBcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbmA7XG5cbmNvbnN0IFN0eWxlZEVkaXRJa29uID0gc3R5bGVkKFBlbmNpbEljb24pYFxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuYDtcblxuY29uc3QgU3R5bGVkQWxlcnQgPSBzdHlsZWQoQWxlcnQpYFxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG5gO1xuXG5jb25zdCBTdHlsZWRFcnJvclN1bW1hcnkgPSBzdHlsZWQoRXJyb3JTdW1tYXJ5KWBcbiAgICBtYXJnaW4tdG9wOiA1cmVtO1xuYDtcblxuaW50ZXJmYWNlIElCZWhhbmRsaW5nc3Jlc3VsdGF0UHJvcHMge1xuICAgIMOlcGVuQmVoYW5kbGluZzogSUJlaGFuZGxpbmc7XG59XG5cbmNvbnN0IEJlaGFuZGxpbmdzcmVzdWx0YXQ6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PElCZWhhbmRsaW5nc3Jlc3VsdGF0UHJvcHM+ID0gKHsgw6VwZW5CZWhhbmRsaW5nIH0pID0+IHtcbiAgICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gICAgY29uc3QgZmFnc2FrSWQgPSB1c2VGYWdzYWtJZCgpO1xuICAgIGNvbnN0IHsgZmFnc2FrIH0gPSB1c2VGYWdzYWtDb250ZXh0KCk7XG4gICAgY29uc3QgeyBzZXR0w4VwZW5CZWhhbmRsaW5nIH0gPSB1c2VCZWhhbmRsaW5nQ29udGV4dCgpO1xuXG4gICAgY29uc3Qge1xuICAgICAgICB2aXNGZWlsbWVsZGluZ2VyLFxuICAgICAgICBzZXR0VmlzRmVpbG1lbGRpbmdlcixcbiAgICAgICAgaGVudFBlcnNvbmVyTWVkVWd5bGRpZ0V0dGVyYmV0YWxpbmdzcGVyaW9kZSxcbiAgICAgICAgcGVyc29uZXJNZWRVZ3lsZGlnRXR0ZXJiZXRhbGluZ3NwZXJpb2RlLFxuICAgIH0gPSB1c2VCZWhhbmRsaW5nc3Jlc3VsdGF0KMOlcGVuQmVoYW5kbGluZyk7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIG11dGF0ZTogb3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbCxcbiAgICAgICAgaXNQZW5kaW5nOiBpc09wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxQZW5kaW5nLFxuICAgICAgICBpc0Vycm9yOiBpc09wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxFcnJvcixcbiAgICAgICAgZXJyb3I6IG9wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxFcnJvcixcbiAgICB9ID0gdXNlT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbCh7XG4gICAgICAgIG9uU3VjY2VzczogKGJlaGFuZGxpbmc6IElCZWhhbmRsaW5nKSA9PiBzZXR0w4VwZW5CZWhhbmRsaW5nKGJ5Z2dEYXRhUmVzc3VycyhiZWhhbmRsaW5nKSksXG4gICAgfSk7XG5cbiAgICBjb25zdCB7IGFrdGl2RXRpa2V0dCwgZmlsdGVyT2dTb3J0ZXJBbmRlbFBlcnNvbmVySUdydW5ubGFnLCBmaWx0ZXJPZ1NvcnRlckdydW5ubGFnUGVyc29uZXJNZWRBbmRlbGVyIH0gPVxuICAgICAgICB1c2VUaWRzbGluamVDb250ZXh0KCk7XG5cbiAgICB1c2VPcHBkYXRlclZhbHV0YWt1cnNPZ1NpbXVsZXJpbmdQw6VCZXNsdXR0ZXJTdGVnKCk7XG5cbiAgICBjb25zdCB7IHZ1cmRlckVyTGVzZXZpc25pbmcsIGJlaGFuZGxpbmdyZXN1bHRhdE5lc3RlT25DbGljaywgYmVoYW5kbGluZ3NzdGVnU3VibWl0cmVzc3VycyB9ID1cbiAgICAgICAgdXNlQmVoYW5kbGluZ0NvbnRleHQoKTtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgZXJFw7hzSW5mb3JtYXNqb25HeWxkaWcsXG4gICAgICAgIGtvbXBldGFuc2VyLFxuICAgICAgICBoZW50S29tcGV0YW5zZXJNZWRGZWlsLFxuICAgICAgICB1dGJldGFsdEFubmV0TGFuZEJlbMO4cCxcbiAgICAgICAgZXJVdGJldGFsdEFubmV0TGFuZEJlbMO4cEd5bGRpZ2UsXG4gICAgICAgIGhlbnRVdGJldGFsdEFubmV0TGFuZEJlbMO4cE1lZEZlaWwsXG4gICAgICAgIHZhbHV0YWt1cnNlcixcbiAgICAgICAgZXJWYWx1dGFrdXJzZXJHeWxkaWdlLFxuICAgICAgICBoZW50VmFsdXRha3Vyc2VyTWVkRmVpbCxcbiAgICB9ID0gdXNlRcO4cyjDpXBlbkJlaGFuZGxpbmcpO1xuXG4gICAgY29uc3QgZXJMZXNldmlzbmluZyA9IHZ1cmRlckVyTGVzZXZpc25pbmcoKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGhlbnRQZXJzb25lck1lZFVneWxkaWdFdHRlcmJldGFsaW5nc3BlcmlvZGUoKTtcbiAgICB9LCBbw6VwZW5CZWhhbmRsaW5nXSk7XG5cbiAgICBjb25zdCBmaW5uVXRiZXRhbGluZ3NwZXJpb2RlRm9yQWt0aXZFdGlrZXR0ID0gKFxuICAgICAgICB1dGJldGFsaW5nc3BlcmlvZGVyOiBVdGJldGFsaW5nc3BlcmlvZGVbXVxuICAgICk6IFV0YmV0YWxpbmdzcGVyaW9kZSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICAgIHJldHVybiBha3RpdkV0aWtldHRcbiAgICAgICAgICAgID8gdXRiZXRhbGluZ3NwZXJpb2Rlci5maW5kKCh1dGJldGFsaW5nc3BlcmlvZGU6IFV0YmV0YWxpbmdzcGVyaW9kZSkgPT5cbiAgICAgICAgICAgICAgICAgIHBlcmlvZGVPdmVybGFwcGVyTWVkVmFsZ3REYXRvKFxuICAgICAgICAgICAgICAgICAgICAgIHV0YmV0YWxpbmdzcGVyaW9kZS5wZXJpb2RlRm9tLFxuICAgICAgICAgICAgICAgICAgICAgIHV0YmV0YWxpbmdzcGVyaW9kZS5wZXJpb2RlVG9tLFxuICAgICAgICAgICAgICAgICAgICAgIGFrdGl2RXRpa2V0dC5kYXRlXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH07XG5cbiAgICBjb25zdCBncnVubmxhZ1BlcnNvbmVyID0gZmlsdGVyT2dTb3J0ZXJHcnVubmxhZ1BlcnNvbmVyTWVkQW5kZWxlcihcbiAgICAgICAgw6VwZW5CZWhhbmRsaW5nLnBlcnNvbmVyLFxuICAgICAgICDDpXBlbkJlaGFuZGxpbmcucGVyc29uZXJNZWRBbmRlbGVyVGlsa2plbnRZdGVsc2VcbiAgICApO1xuXG4gICAgY29uc3QgdGlkc2xpbmplUGVyc29uZXIgPSBmaWx0ZXJPZ1NvcnRlckFuZGVsUGVyc29uZXJJR3J1bm5sYWcoXG4gICAgICAgIGdydW5ubGFnUGVyc29uZXIsXG4gICAgICAgIMOlcGVuQmVoYW5kbGluZy5wZXJzb25lck1lZEFuZGVsZXJUaWxramVudFl0ZWxzZVxuICAgICk7XG5cbiAgICBjb25zdCBlck1pZ3JlcmluZ0ZyYUluZm90cnlnZCA9IMOlcGVuQmVoYW5kbGluZy50eXBlID09PSBCZWhhbmRsaW5nc3R5cGUuTUlHUkVSSU5HX0ZSQV9JTkZPVFJZR0Q7XG5cbiAgICBjb25zdCBoYXJLb21wZXRhbnNlciA9IMOlcGVuQmVoYW5kbGluZy5rb21wZXRhbnNlcj8ubGVuZ3RoID4gMDtcbiAgICBjb25zdCBoYXJVdGVubGFuZHNrZUJlbMO4cGVyID0gw6VwZW5CZWhhbmRsaW5nLnV0ZW5sYW5kc2tlUGVyaW9kZWJlbMO4cD8ubGVuZ3RoID4gMDtcbiAgICBjb25zdCBoYXJWYWx1dGFrdXJzZXIgPSDDpXBlbkJlaGFuZGxpbmcudXRlbmxhbmRza2VQZXJpb2RlYmVsw7hwPy5sZW5ndGggPiAwO1xuXG4gICAgY29uc3QgaGFyRcO4cyA9IGhhcktvbXBldGFuc2VyIHx8IGhhclV0ZW5sYW5kc2tlQmVsw7hwZXIgfHwgaGFyVmFsdXRha3Vyc2VyO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPFNramVtYXN0ZWdcbiAgICAgICAgICAgIHNlbmRlcklubj17YmVoYW5kbGluZ3NzdGVnU3VibWl0cmVzc3Vycy5zdGF0dXMgPT09IFJlc3N1cnNTdGF0dXMuSEVOVEVSfVxuICAgICAgICAgICAgdGl0dGVsPVwiQmVoYW5kbGluZ3NyZXN1bHRhdFwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJiZWhhbmRsaW5nc3Jlc3VsdGF0XCJcbiAgICAgICAgICAgIGZvcnJpZ2VPbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZShgL2ZhZ3Nhay8ke2ZhZ3Nha0lkfS8ke8OlcGVuQmVoYW5kbGluZy5iZWhhbmRsaW5nSWR9L3ZpbGthYXJzdnVyZGVyaW5nYCl9XG4gICAgICAgICAgICBuZXN0ZU9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJMZXNldmlzbmluZykge1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZShgL2ZhZ3Nhay8ke2ZhZ3Nha0lkfS8ke8OlcGVuQmVoYW5kbGluZy5iZWhhbmRsaW5nSWR9L3NpbXVsZXJpbmdgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhhckXDuHMgJiYgIWVyRcO4c0luZm9ybWFzam9uR3lsZGlnKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dFZpc0ZlaWxtZWxkaW5nZXIodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYmVoYW5kbGluZ3Jlc3VsdGF0TmVzdGVPbkNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG1heFdpZHRoU3R5bGU9eyc4MHJlbSd9XG4gICAgICAgICAgICBmZWlsbWVsZGluZz17aGVudEZyb250ZW5kRmVpbG1lbGRpbmcoYmVoYW5kbGluZ3NzdGVnU3VibWl0cmVzc3Vycyl9XG4gICAgICAgICAgICBzdGVnPXtCZWhhbmRsaW5nU3RlZy5CRUhBTkRMSU5HU1JFU1VMVEFUfVxuICAgICAgICA+XG4gICAgICAgICAgICB7cGVyc29uZXJNZWRVZ3lsZGlnRXR0ZXJiZXRhbGluZ3NwZXJpb2RlLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxTdHlsZWRBbGVydCB2YXJpYW50PXsnd2FybmluZyd9PlxuICAgICAgICAgICAgICAgICAgICBEdSBoYXIgcGVyaW9kZXIgc29tIGthbiBmw7hyZSB0aWwgZXR0ZXJiZXRhbGluZyB1dG92ZXIgdHJlIG3DpW5lZGVyIGZvciBwZXJzb257JyAnfVxuICAgICAgICAgICAgICAgICAgICB7c2zDpVNhbW1lbkxpc3RlVGlsU3RyZW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uZXJNZWRVZ3lsZGlnRXR0ZXJiZXRhbGluZ3NwZXJpb2RlLm1hcChpZGVudCA9PiBmb3JtYXRlcklkZW50KGlkZW50KSlcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgLlxuICAgICAgICAgICAgICAgIDwvU3R5bGVkQWxlcnQ+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2VyTWlncmVyaW5nRnJhSW5mb3RyeWdkICYmIDxNaWdyZXJpbmdJbmZvYm9rcyBiZWhhbmRsaW5nSWQ9e8OlcGVuQmVoYW5kbGluZy5iZWhhbmRsaW5nSWR9IC8+fVxuICAgICAgICAgICAgPFRpbGtqZW50WXRlbHNlVGlkc2xpbmplXG4gICAgICAgICAgICAgICAgZ3J1bm5sYWdQZXJzb25lcj17Z3J1bm5sYWdQZXJzb25lcn1cbiAgICAgICAgICAgICAgICB0aWRzbGluamVQZXJzb25lcj17dGlkc2xpbmplUGVyc29uZXJ9XG4gICAgICAgICAgICAgICAgZmFnc2FrVHlwZT17ZmFnc2FrLmZhZ3Nha1R5cGV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgeyFlckxlc2V2aXNuaW5nICYmIChcbiAgICAgICAgICAgICAgICA8RW5kcmV0VXRiZXRhbGluZ0FuZGVsPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwidGVydGlhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT1cInNtYWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWwoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGljb249ezxTdHlsZWRFZGl0SWtvbiAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc09wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxQZW5kaW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZz17aXNPcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsUGVuZGluZ31cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsPkVuZHJlIHV0YmV0YWxpbmdzcGVyaW9kZTwvTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICB7aXNPcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsRXJyb3IgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEVycm9yTWVzc2FnZT57b3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbEVycm9yLm1lc3NhZ2V9PC9FcnJvck1lc3NhZ2U+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9FbmRyZXRVdGJldGFsaW5nQW5kZWw+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2FrdGl2RXRpa2V0dCAmJiAoXG4gICAgICAgICAgICAgICAgPE9wcHN1bW1lcmluZ3Nib2tzXG4gICAgICAgICAgICAgICAgICAgIHV0YmV0YWxpbmdzcGVyaW9kZT17ZmlublV0YmV0YWxpbmdzcGVyaW9kZUZvckFrdGl2RXRpa2V0dCjDpXBlbkJlaGFuZGxpbmcudXRiZXRhbGluZ3NwZXJpb2Rlcil9XG4gICAgICAgICAgICAgICAgICAgIGFrdGl2RXRpa2V0dD17YWt0aXZFdGlrZXR0fVxuICAgICAgICAgICAgICAgICAgICBrb21wZXRhbnNlcj17a29tcGV0YW5zZXJ9XG4gICAgICAgICAgICAgICAgICAgIHV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwPXt1dGJldGFsdEFubmV0TGFuZEJlbMO4cH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdXRha3Vyc2VyPXt2YWx1dGFrdXJzZXJ9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7w6VwZW5CZWhhbmRsaW5nLmVuZHJldFV0YmV0YWxpbmdBbmRlbGVyLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxFbmRyZXRVdGJldGFsaW5nQW5kZWxUYWJlbGwgw6VwZW5CZWhhbmRsaW5nPXvDpXBlbkJlaGFuZGxpbmd9IC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2hhcktvbXBldGFuc2VyICYmIChcbiAgICAgICAgICAgICAgICA8S29tcGV0YW5zZVNramVtYVxuICAgICAgICAgICAgICAgICAgICBrb21wZXRhbnNlcj17a29tcGV0YW5zZXJ9XG4gICAgICAgICAgICAgICAgICAgIHZpc0ZlaWxtZWxkaW5nZXI9e3Zpc0ZlaWxtZWxkaW5nZXJ9XG4gICAgICAgICAgICAgICAgICAgIMOlcGVuQmVoYW5kbGluZz17w6VwZW5CZWhhbmRsaW5nfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2hhclV0ZW5sYW5kc2tlQmVsw7hwZXIgJiYgKFxuICAgICAgICAgICAgICAgIDxVdGJldGFsdEFubmV0TGFuZFxuICAgICAgICAgICAgICAgICAgICB1dGJldGFsdEFubmV0TGFuZEJlbMO4cD17dXRiZXRhbHRBbm5ldExhbmRCZWzDuHB9XG4gICAgICAgICAgICAgICAgICAgIGVyVXRiZXRhbHRBbm5ldExhbmRCZWzDuHBHeWxkaWdlPXtlclV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwR3lsZGlnZX1cbiAgICAgICAgICAgICAgICAgICAgdmlzRmVpbG1lbGRpbmdlcj17dmlzRmVpbG1lbGRpbmdlcn1cbiAgICAgICAgICAgICAgICAgICAgw6VwZW5CZWhhbmRsaW5nPXvDpXBlbkJlaGFuZGxpbmd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7aGFyVmFsdXRha3Vyc2VyICYmIChcbiAgICAgICAgICAgICAgICA8VmFsdXRha3Vyc2VyXG4gICAgICAgICAgICAgICAgICAgIHZhbHV0YWt1cnNlcj17dmFsdXRha3Vyc2VyfVxuICAgICAgICAgICAgICAgICAgICBlclZhbHV0YWt1cnNlckd5bGRpZ2U9e2VyVmFsdXRha3Vyc2VyR3lsZGlnZX1cbiAgICAgICAgICAgICAgICAgICAgdmlzRmVpbG1lbGRpbmdlcj17dmlzRmVpbG1lbGRpbmdlcn1cbiAgICAgICAgICAgICAgICAgICAgw6VwZW5CZWhhbmRsaW5nPXvDpXBlbkJlaGFuZGxpbmd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7dmlzRmVpbG1lbGRpbmdlciAmJiAoXG4gICAgICAgICAgICAgICAgPFN0eWxlZEVycm9yU3VtbWFyeSBoZWFkaW5nPXsnRm9yIMOlIGfDpSB2aWRlcmUgbcOlIGR1IHJldHRlIG9wcCBmw7hsZ2VuZGU6J30+XG4gICAgICAgICAgICAgICAgICAgIHtbXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5oZW50S29tcGV0YW5zZXJNZWRGZWlsKCkubWFwKChrb21wZXRhbnNlOiBJUmVzdEtvbXBldGFuc2UpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVpbG1lbGRpbmc6IGBLb21wZXRhbnNlIGJhcm46ICR7a29tcGV0YW5zZS5iYXJuSWRlbnRlcn0sIGYuby5tLjogJHtrb21wZXRhbnNlLmZvbX0gZXIgaWtrZSBmdWxsc3RlbmRpZy5gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNramVtYWVsZW1lbnRJZDoga29tcGV0YW5zZUZlaWxtZWxkaW5nSWQoa29tcGV0YW5zZSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5oZW50VXRiZXRhbHRBbm5ldExhbmRCZWzDuHBNZWRGZWlsKCkubWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh1dGVubGFuZHNrUGVyaW9kZUJlbMO4cDogSVJlc3RVdGVubGFuZHNrUGVyaW9kZUJlbMO4cCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVpbG1lbGRpbmc6IGBVdGVubGFuZHNrIGJlbMO4cCBiYXJuOiAke3V0ZW5sYW5kc2tQZXJpb2RlQmVsw7hwLmJhcm5JZGVudGVyfSwgZi5vLm0uOiAke3V0ZW5sYW5kc2tQZXJpb2RlQmVsw7hwLmZvbX0gZXIgaWtrZSBmdWxsc3RlbmRpZy5gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2plbWFlbGVtZW50SWQ6IHV0ZW5sYW5kc2tQZXJpb2RlQmVsw7hwRmVpbG1lbGRpbmdJZCh1dGVubGFuZHNrUGVyaW9kZUJlbMO4cCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5oZW50VmFsdXRha3Vyc2VyTWVkRmVpbCgpLm1hcCgodmFsdXRha3VyczogSVJlc3RWYWx1dGFrdXJzKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlaWxtZWxkaW5nOiBgVmFsdXRha3VycyBiYXJuOiAke3ZhbHV0YWt1cnMuYmFybklkZW50ZXJ9LCBmLm8ubS46ICR7dmFsdXRha3Vycy5mb219IGVyIGlra2UgZnVsbHN0ZW5kaWcuYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2plbWFlbGVtZW50SWQ6IHZhbHV0YWt1cnNGZWlsbWVsZGluZ0lkKHZhbHV0YWt1cnMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgICAgICBdLm1hcChpdGVtID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFcnJvclN1bW1hcnkuSXRlbSBocmVmPXtgIyR7aXRlbS5za2plbWFlbGVtZW50SWR9YH0+e2l0ZW0uZmVpbG1lbGRpbmd9PC9FcnJvclN1bW1hcnkuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9TdHlsZWRFcnJvclN1bW1hcnk+XG4gICAgICAgICAgICApfVxuICAgICAgICA8L1NramVtYXN0ZWc+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJlaGFuZGxpbmdzcmVzdWx0YXQ7XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIyYzBhZjFlNjAyNDIwZWQwNTI4ZVwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZU5hdmlnYXRlIiwic3R5bGVkIiwiUGVuY2lsSWNvbiIsIkFsZXJ0IiwiQnV0dG9uIiwiRXJyb3JNZXNzYWdlIiwiRXJyb3JTdW1tYXJ5IiwiTGFiZWwiLCJieWdnRGF0YVJlc3N1cnMiLCJSZXNzdXJzU3RhdHVzIiwiRW5kcmV0VXRiZXRhbGluZ0FuZGVsVGFiZWxsIiwiS29tcGV0YW5zZVNramVtYSIsImtvbXBldGFuc2VGZWlsbWVsZGluZ0lkIiwidXNlRcO4cyIsInV0ZW5sYW5kc2tQZXJpb2RlQmVsw7hwRmVpbG1lbGRpbmdJZCIsIlV0YmV0YWx0QW5uZXRMYW5kIiwidXNlT3BwZGF0ZXJWYWx1dGFrdXJzT2dTaW11bGVyaW5nUMOlQmVzbHV0dGVyU3RlZyIsInZhbHV0YWt1cnNGZWlsbWVsZGluZ0lkIiwiVmFsdXRha3Vyc2VyIiwiTWlncmVyaW5nSW5mb2Jva3MiLCJPcHBzdW1tZXJpbmdzYm9rcyIsIlRpbGtqZW50WXRlbHNlVGlkc2xpbmplIiwidXNlQmVoYW5kbGluZ3NyZXN1bHRhdCIsInVzZUZhZ3Nha0lkIiwidXNlT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbCIsInVzZVRpZHNsaW5qZUNvbnRleHQiLCJCZWhhbmRsaW5nU3RlZyIsIkJlaGFuZGxpbmdzdHlwZSIsInBlcmlvZGVPdmVybGFwcGVyTWVkVmFsZ3REYXRvIiwiZm9ybWF0ZXJJZGVudCIsInNsw6VTYW1tZW5MaXN0ZVRpbFN0cmVuZyIsImhlbnRGcm9udGVuZEZlaWxtZWxkaW5nIiwidXNlRmFnc2FrQ29udGV4dCIsInVzZUJlaGFuZGxpbmdDb250ZXh0IiwiU2tqZW1hc3RlZyIsIkVuZHJldFV0YmV0YWxpbmdBbmRlbCIsImRpdiIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWwiLCJfYyIsIlN0eWxlZEVkaXRJa29uIiwiX3RlbXBsYXRlT2JqZWN0MiIsIl9jMiIsIlN0eWxlZEFsZXJ0IiwiX3RlbXBsYXRlT2JqZWN0MyIsIl9jMyIsIlN0eWxlZEVycm9yU3VtbWFyeSIsIl90ZW1wbGF0ZU9iamVjdDQiLCJfYzQiLCJCZWhhbmRsaW5nc3Jlc3VsdGF0IiwiX3JlZiIsIl9zIiwiX8OlcGVuQmVoYW5kbGluZyRrb21wZSIsIl/DpXBlbkJlaGFuZGxpbmckdXRlbmwiLCJfw6VwZW5CZWhhbmRsaW5nJHV0ZW5sMiIsIsOlcGVuQmVoYW5kbGluZyIsIm5hdmlnYXRlIiwiZmFnc2FrSWQiLCJfdXNlRmFnc2FrQ29udGV4dCIsImZhZ3NhayIsIl91c2VCZWhhbmRsaW5nQ29udGV4dCIsInNldHTDhXBlbkJlaGFuZGxpbmciLCJfdXNlQmVoYW5kbGluZ3NyZXN1bHQiLCJ2aXNGZWlsbWVsZGluZ2VyIiwic2V0dFZpc0ZlaWxtZWxkaW5nZXIiLCJoZW50UGVyc29uZXJNZWRVZ3lsZGlnRXR0ZXJiZXRhbGluZ3NwZXJpb2RlIiwicGVyc29uZXJNZWRVZ3lsZGlnRXR0ZXJiZXRhbGluZ3NwZXJpb2RlIiwiX3VzZU9wcHJldHRFbmRyZXRVdGJlIiwib25TdWNjZXNzIiwiYmVoYW5kbGluZyIsIm9wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWwiLCJtdXRhdGUiLCJpc09wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxQZW5kaW5nIiwiaXNQZW5kaW5nIiwiaXNPcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsRXJyb3IiLCJpc0Vycm9yIiwib3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbEVycm9yIiwiZXJyb3IiLCJfdXNlVGlkc2xpbmplQ29udGV4dCIsImFrdGl2RXRpa2V0dCIsImZpbHRlck9nU29ydGVyQW5kZWxQZXJzb25lcklHcnVubmxhZyIsImZpbHRlck9nU29ydGVyR3J1bm5sYWdQZXJzb25lck1lZEFuZGVsZXIiLCJfdXNlQmVoYW5kbGluZ0NvbnRleHQyIiwidnVyZGVyRXJMZXNldmlzbmluZyIsImJlaGFuZGxpbmdyZXN1bHRhdE5lc3RlT25DbGljayIsImJlaGFuZGxpbmdzc3RlZ1N1Ym1pdHJlc3N1cnMiLCJfdXNlRcO4cyIsImVyRcO4c0luZm9ybWFzam9uR3lsZGlnIiwia29tcGV0YW5zZXIiLCJoZW50S29tcGV0YW5zZXJNZWRGZWlsIiwidXRiZXRhbHRBbm5ldExhbmRCZWzDuHAiLCJlclV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwR3lsZGlnZSIsImhlbnRVdGJldGFsdEFubmV0TGFuZEJlbMO4cE1lZEZlaWwiLCJ2YWx1dGFrdXJzZXIiLCJlclZhbHV0YWt1cnNlckd5bGRpZ2UiLCJoZW50VmFsdXRha3Vyc2VyTWVkRmVpbCIsImVyTGVzZXZpc25pbmciLCJmaW5uVXRiZXRhbGluZ3NwZXJpb2RlRm9yQWt0aXZFdGlrZXR0IiwidXRiZXRhbGluZ3NwZXJpb2RlciIsImZpbmQiLCJ1dGJldGFsaW5nc3BlcmlvZGUiLCJwZXJpb2RlRm9tIiwicGVyaW9kZVRvbSIsImRhdGUiLCJ1bmRlZmluZWQiLCJncnVubmxhZ1BlcnNvbmVyIiwicGVyc29uZXIiLCJwZXJzb25lck1lZEFuZGVsZXJUaWxramVudFl0ZWxzZSIsInRpZHNsaW5qZVBlcnNvbmVyIiwiZXJNaWdyZXJpbmdGcmFJbmZvdHJ5Z2QiLCJ0eXBlIiwiTUlHUkVSSU5HX0ZSQV9JTkZPVFJZR0QiLCJoYXJLb21wZXRhbnNlciIsImxlbmd0aCIsImhhclV0ZW5sYW5kc2tlQmVsw7hwZXIiLCJ1dGVubGFuZHNrZVBlcmlvZGViZWzDuHAiLCJoYXJWYWx1dGFrdXJzZXIiLCJoYXJFw7hzIiwiY3JlYXRlRWxlbWVudCIsInNlbmRlcklubiIsInN0YXR1cyIsIkhFTlRFUiIsInRpdHRlbCIsImNsYXNzTmFtZSIsImZvcnJpZ2VPbkNsaWNrIiwiY29uY2F0IiwiYmVoYW5kbGluZ0lkIiwibmVzdGVPbkNsaWNrIiwibWF4V2lkdGhTdHlsZSIsImZlaWxtZWxkaW5nIiwic3RlZyIsIkJFSEFORExJTkdTUkVTVUxUQVQiLCJ2YXJpYW50IiwibWFwIiwiaWRlbnQiLCJmYWdzYWtUeXBlIiwic2l6ZSIsIm9uQ2xpY2siLCJpY29uIiwiZGlzYWJsZWQiLCJsb2FkaW5nIiwibWVzc2FnZSIsImVuZHJldFV0YmV0YWxpbmdBbmRlbGVyIiwiaGVhZGluZyIsIl90b0NvbnN1bWFibGVBcnJheSIsImtvbXBldGFuc2UiLCJiYXJuSWRlbnRlciIsImZvbSIsInNramVtYWVsZW1lbnRJZCIsInV0ZW5sYW5kc2tQZXJpb2RlQmVsw7hwIiwidmFsdXRha3VycyIsIml0ZW0iLCJJdGVtIiwiaHJlZiIsIl9jNSIsIiRSZWZyZXNoUmVnJCJdLCJzb3VyY2VSb290IjoiIn0=