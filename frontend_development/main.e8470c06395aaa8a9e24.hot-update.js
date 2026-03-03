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
  })), "test");
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
/******/ 	__webpack_require__.h = () => ("102e2c0a72cc46476f96")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5lODQ3MGMwNjM5NWFhYThhOWUyNC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQStCO0FBQ0c7QUFFUztBQUNKO0FBRVU7QUFDbUM7QUFDYjtBQUVrQjtBQUN4QjtBQUNxQjtBQUNoRDtBQUN3RTtBQUNwQztBQUMyRDtBQUN0RDtBQUN0QjtBQUNMO0FBQ0k7QUFDUTtBQUNFO0FBQ0g7QUFDd0M7QUFDWDtBQUVWO0FBT1I7QUFDYztBQUNaO0FBQ2xCO0FBQ2E7QUFDaEM7QUFFdkMsSUFBTXFDLHFCQUFxQixHQUFHbEMseURBQU0sQ0FBQ21DLEdBQUcsQ0FBQUMsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLHNCQUFBLHdGQUl2QztBQUFDQyxFQUFBLEdBSklKLHFCQUFxQjtBQU0zQixJQUFNSyxjQUFjLEdBQUd2Qyw2REFBTSxDQUFDQywyREFBVSxDQUFDLENBQUF1QyxnQkFBQSxLQUFBQSxnQkFBQSxHQUFBSCxzQkFBQSxrQ0FFeEM7QUFBQ0ksR0FBQSxHQUZJRixjQUFjO0FBSXBCLElBQU1HLFdBQVcsR0FBRzFDLDZEQUFNLENBQUNFLG1EQUFLLENBQUMsQ0FBQXlDLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFOLHNCQUFBLG9DQUVoQztBQUFDTyxHQUFBLEdBRklGLFdBQVc7QUFJakIsSUFBTUcsa0JBQWtCLEdBQUc3Qyw2REFBTSxDQUFDSywwREFBWSxDQUFDLENBQUF5QyxnQkFBQSxLQUFBQSxnQkFBQSxHQUFBVCxzQkFBQSxpQ0FFOUM7QUFBQ1UsR0FBQSxHQUZJRixrQkFBa0I7QUFReEIsSUFBTUcsbUJBQXVFLEdBQUcsU0FBMUVBLG1CQUF1RUEsQ0FBQUMsSUFBQSxFQUEyQjtFQUFBQyxFQUFBO0VBQUEsSUFBQUMscUJBQUEsRUFBQUMscUJBQUEsRUFBQUMsc0JBQUE7RUFBQSxJQUFyQkMsY0FBYyxHQUFBTCxJQUFBLENBQWRLLGNBQWM7RUFDN0YsSUFBTUMsUUFBUSxHQUFHeEQseURBQVcsQ0FBQyxDQUFDO0VBQzlCLElBQU15RCxRQUFRLEdBQUdsQyxnRUFBVyxDQUFDLENBQUM7RUFDOUIsSUFBQW1DLGlCQUFBLEdBQW1CMUIsaUVBQWdCLENBQUMsQ0FBQztJQUE3QjJCLE1BQU0sR0FBQUQsaUJBQUEsQ0FBTkMsTUFBTTtFQUNkLElBQUFDLHFCQUFBLEdBQStCM0IsaUZBQW9CLENBQUMsQ0FBQztJQUE3QzRCLGtCQUFrQixHQUFBRCxxQkFBQSxDQUFsQkMsa0JBQWtCO0VBRTFCLElBQUFDLHFCQUFBLEdBS0l4QyxnRkFBc0IsQ0FBQ2lDLGNBQWMsQ0FBQztJQUp0Q1EsZ0JBQWdCLEdBQUFELHFCQUFBLENBQWhCQyxnQkFBZ0I7SUFDaEJDLG9CQUFvQixHQUFBRixxQkFBQSxDQUFwQkUsb0JBQW9CO0lBQ3BCQywyQ0FBMkMsR0FBQUgscUJBQUEsQ0FBM0NHLDJDQUEyQztJQUMzQ0MsdUNBQXVDLEdBQUFKLHFCQUFBLENBQXZDSSx1Q0FBdUM7RUFHM0MsSUFBQUMscUJBQUEsR0FLSTNDLHdHQUErQixDQUFDO01BQ2hDNEMsU0FBUyxFQUFFLFNBQVhBLFNBQVNBLENBQUdDLFVBQXVCO1FBQUEsT0FBS1Isa0JBQWtCLENBQUNyRCxzRUFBZSxDQUFDNkQsVUFBVSxDQUFDLENBQUM7TUFBQTtJQUMzRixDQUFDLENBQUM7SUFOVUMsNEJBQTRCLEdBQUFILHFCQUFBLENBQXBDSSxNQUFNO0lBQ0tDLHFDQUFxQyxHQUFBTCxxQkFBQSxDQUFoRE0sU0FBUztJQUNBQyxtQ0FBbUMsR0FBQVAscUJBQUEsQ0FBNUNRLE9BQU87SUFDQUMsaUNBQWlDLEdBQUFULHFCQUFBLENBQXhDVSxLQUFLO0VBS1QsSUFBQUMsb0JBQUEsR0FDSXJELDZGQUFtQixDQUFDLENBQUM7SUFEakJzRCxZQUFZLEdBQUFELG9CQUFBLENBQVpDLFlBQVk7SUFBRUMsb0NBQW9DLEdBQUFGLG9CQUFBLENBQXBDRSxvQ0FBb0M7SUFBRUMsd0NBQXdDLEdBQUFILG9CQUFBLENBQXhDRyx3Q0FBd0M7RUFHcEdqRSxzSkFBZ0QsQ0FBQyxDQUFDO0VBRWxELElBQUFrRSxzQkFBQSxHQUNJakQsaUZBQW9CLENBQUMsQ0FBQztJQURsQmtELG1CQUFtQixHQUFBRCxzQkFBQSxDQUFuQkMsbUJBQW1CO0lBQUVDLDhCQUE4QixHQUFBRixzQkFBQSxDQUE5QkUsOEJBQThCO0lBQUVDLDRCQUE0QixHQUFBSCxzQkFBQSxDQUE1QkcsNEJBQTRCO0VBR3pGLElBQUFDLE9BQUEsR0FVSXpFLHVEQUFNLENBQUMwQyxjQUFjLENBQUM7SUFUdEJnQyxzQkFBc0IsR0FBQUQsT0FBQSxDQUF0QkMsc0JBQXNCO0lBQ3RCQyxXQUFXLEdBQUFGLE9BQUEsQ0FBWEUsV0FBVztJQUNYQyxzQkFBc0IsR0FBQUgsT0FBQSxDQUF0Qkcsc0JBQXNCO0lBQ3RCQyxzQkFBc0IsR0FBQUosT0FBQSxDQUF0Qkksc0JBQXNCO0lBQ3RCQywrQkFBK0IsR0FBQUwsT0FBQSxDQUEvQkssK0JBQStCO0lBQy9CQyxpQ0FBaUMsR0FBQU4sT0FBQSxDQUFqQ00saUNBQWlDO0lBQ2pDQyxZQUFZLEdBQUFQLE9BQUEsQ0FBWk8sWUFBWTtJQUNaQyxxQkFBcUIsR0FBQVIsT0FBQSxDQUFyQlEscUJBQXFCO0lBQ3JCQyx1QkFBdUIsR0FBQVQsT0FBQSxDQUF2QlMsdUJBQXVCO0VBRzNCLElBQU1DLGFBQWEsR0FBR2IsbUJBQW1CLENBQUMsQ0FBQztFQUUzQ3BGLGdEQUFTLENBQUMsWUFBTTtJQUNaa0UsMkNBQTJDLENBQUMsQ0FBQztFQUNqRCxDQUFDLEVBQUUsQ0FBQ1YsY0FBYyxDQUFDLENBQUM7RUFFcEIsSUFBTTBDLHFDQUFxQyxHQUFHLFNBQXhDQSxxQ0FBcUNBLENBQ3ZDQyxtQkFBeUMsRUFDUjtJQUNqQyxPQUFPbkIsWUFBWSxHQUNibUIsbUJBQW1CLENBQUNDLElBQUksQ0FBQyxVQUFDQyxrQkFBc0M7TUFBQSxPQUM1RHhFLDJFQUE2QixDQUN6QndFLGtCQUFrQixDQUFDQyxVQUFVLEVBQzdCRCxrQkFBa0IsQ0FBQ0UsVUFBVSxFQUM3QnZCLFlBQVksQ0FBQ3dCLElBQ2pCLENBQUM7SUFBQSxDQUNMLENBQUMsR0FDREMsU0FBUztFQUNuQixDQUFDO0VBRUQsSUFBTUMsZ0JBQWdCLEdBQUd4Qix3Q0FBd0MsQ0FDN0QxQixjQUFjLENBQUNtRCxRQUFRLEVBQ3ZCbkQsY0FBYyxDQUFDb0QsZ0NBQ25CLENBQUM7RUFFRCxJQUFNQyxpQkFBaUIsR0FBRzVCLG9DQUFvQyxDQUMxRHlCLGdCQUFnQixFQUNoQmxELGNBQWMsQ0FBQ29ELGdDQUNuQixDQUFDO0VBRUQsSUFBTUUsdUJBQXVCLEdBQUd0RCxjQUFjLENBQUN1RCxJQUFJLEtBQUtuRiwrREFBZSxDQUFDb0YsdUJBQXVCO0VBRS9GLElBQU1DLGNBQWMsR0FBRyxFQUFBNUQscUJBQUEsR0FBQUcsY0FBYyxDQUFDaUMsV0FBVyxjQUFBcEMscUJBQUEsdUJBQTFCQSxxQkFBQSxDQUE0QjZELE1BQU0sSUFBRyxDQUFDO0VBQzdELElBQU1DLHFCQUFxQixHQUFHLEVBQUE3RCxxQkFBQSxHQUFBRSxjQUFjLENBQUM0RCx1QkFBdUIsY0FBQTlELHFCQUFBLHVCQUF0Q0EscUJBQUEsQ0FBd0M0RCxNQUFNLElBQUcsQ0FBQztFQUNoRixJQUFNRyxlQUFlLEdBQUcsRUFBQTlELHNCQUFBLEdBQUFDLGNBQWMsQ0FBQzRELHVCQUF1QixjQUFBN0Qsc0JBQUEsdUJBQXRDQSxzQkFBQSxDQUF3QzJELE1BQU0sSUFBRyxDQUFDO0VBRTFFLElBQU1JLE1BQU0sR0FBR0wsY0FBYyxJQUFJRSxxQkFBcUIsSUFBSUUsZUFBZTtFQUV6RSxvQkFDSXRILGdEQUFBLENBQUNvQyxvREFBVTtJQUNQcUYsU0FBUyxFQUFFbEMsNEJBQTRCLENBQUNtQyxNQUFNLEtBQUsvRyxnRUFBYSxDQUFDZ0gsTUFBTztJQUN4RUMsTUFBTSxFQUFDLHFCQUFxQjtJQUM1QkMsU0FBUyxFQUFDLHFCQUFxQjtJQUMvQkMsY0FBYyxFQUFFLFNBQWhCQSxjQUFjQSxDQUFBO01BQUEsT0FBUXBFLFFBQVEsWUFBQXFFLE1BQUEsQ0FBWXBFLFFBQVEsT0FBQW9FLE1BQUEsQ0FBSXRFLGNBQWMsQ0FBQ3VFLFlBQVksdUJBQW9CLENBQUM7SUFBQSxDQUFDO0lBQ3ZHQyxZQUFZLEVBQUUsU0FBZEEsWUFBWUEsQ0FBQSxFQUFRO01BQ2hCLElBQUkvQixhQUFhLEVBQUU7UUFDZnhDLFFBQVEsWUFBQXFFLE1BQUEsQ0FBWXBFLFFBQVEsT0FBQW9FLE1BQUEsQ0FBSXRFLGNBQWMsQ0FBQ3VFLFlBQVksZ0JBQWEsQ0FBQztNQUM3RSxDQUFDLE1BQU0sSUFBSVQsTUFBTSxJQUFJLENBQUM5QixzQkFBc0IsQ0FBQyxDQUFDLEVBQUU7UUFDNUN2QixvQkFBb0IsQ0FBQyxJQUFJLENBQUM7TUFDOUIsQ0FBQyxNQUFNO1FBQ0hvQiw4QkFBOEIsQ0FBQyxDQUFDO01BQ3BDO0lBQ0osQ0FBRTtJQUNGNEMsYUFBYSxFQUFFLE9BQVE7SUFDdkJDLFdBQVcsRUFBRWxHLDZFQUF1QixDQUFDc0QsNEJBQTRCLENBQUU7SUFDbkU2QyxJQUFJLEVBQUV4Ryw4REFBYyxDQUFDeUc7RUFBb0IsR0FFeENqRSx1Q0FBdUMsQ0FBQytDLE1BQU0sR0FBRyxDQUFDLGlCQUMvQ25ILGdEQUFBLENBQUM2QyxXQUFXO0lBQUN5RixPQUFPLEVBQUU7RUFBVSxHQUFDLG9GQUMrQyxFQUFDLEdBQUcsRUFDL0V0Ryw2RUFBdUIsQ0FDcEJvQyx1Q0FBdUMsQ0FBQ21FLEdBQUcsQ0FBQyxVQUFBQyxLQUFLO0lBQUEsT0FBSXpHLGdFQUFhLENBQUN5RyxLQUFLLENBQUM7RUFBQSxFQUM3RSxDQUFDLEVBQUMsR0FFTyxDQUNoQixFQUNBekIsdUJBQXVCLGlCQUFJL0csZ0RBQUEsQ0FBQ3FCLDJEQUFpQjtJQUFDMkcsWUFBWSxFQUFFdkUsY0FBYyxDQUFDdUU7RUFBYSxDQUFFLENBQUMsZUFDNUZoSSxnREFBQSxDQUFDdUIsaUVBQXVCO0lBQ3BCb0YsZ0JBQWdCLEVBQUVBLGdCQUFpQjtJQUNuQ0csaUJBQWlCLEVBQUVBLGlCQUFrQjtJQUNyQzJCLFVBQVUsRUFBRTVFLE1BQU0sQ0FBQzRFO0VBQVcsQ0FDakMsQ0FBQyxFQUNELENBQUN2QyxhQUFhLGlCQUNYbEcsZ0RBQUEsQ0FBQ3FDLHFCQUFxQixxQkFDbEJyQyxnREFBQSxDQUFDTSxvREFBTTtJQUNIZ0ksT0FBTyxFQUFDLFVBQVU7SUFDbEJJLElBQUksRUFBQyxPQUFPO0lBQ1pDLE9BQU8sRUFBRSxTQUFUQSxPQUFPQSxDQUFBO01BQUEsT0FBUW5FLDRCQUE0QixDQUFDLENBQUM7SUFBQSxDQUFDO0lBQzlDb0UsSUFBSSxlQUFFNUksZ0RBQUEsQ0FBQzBDLGNBQWMsTUFBRSxDQUFFO0lBQ3pCbUcsUUFBUSxFQUFFbkUscUNBQXNDO0lBQ2hEb0UsT0FBTyxFQUFFcEU7RUFBc0MsZ0JBRS9DMUUsZ0RBQUEsQ0FBQ1MsbURBQUssUUFBQywwQkFBK0IsQ0FDbEMsQ0FBQyxFQUNSbUUsbUNBQW1DLGlCQUNoQzVFLGdEQUFBLENBQUNPLDBEQUFZLFFBQUV1RSxpQ0FBaUMsQ0FBQ2lFLE9BQXNCLENBRXhELENBQzFCLEVBQ0E5RCxZQUFZLGlCQUNUakYsZ0RBQUEsQ0FBQ3NCLGtFQUFpQjtJQUNkZ0Ysa0JBQWtCLEVBQUVILHFDQUFxQyxDQUFDMUMsY0FBYyxDQUFDMkMsbUJBQW1CLENBQUU7SUFDOUZuQixZQUFZLEVBQUVBLFlBQWE7SUFDM0JTLFdBQVcsRUFBRUEsV0FBWTtJQUN6QkUsc0JBQXNCLEVBQUVBLHNCQUF1QjtJQUMvQ0csWUFBWSxFQUFFQTtFQUFhLENBQzlCLENBQ0osRUFDQXRDLGNBQWMsQ0FBQ3VGLHVCQUF1QixDQUFDN0IsTUFBTSxHQUFHLENBQUMsaUJBQzlDbkgsZ0RBQUEsQ0FBQ1kscUZBQTJCO0lBQUM2QyxjQUFjLEVBQUVBO0VBQWUsQ0FBRSxDQUNqRSxFQUNBeUQsY0FBYyxpQkFDWGxILGdEQUFBLENBQUNhLHdFQUFnQjtJQUNiNkUsV0FBVyxFQUFFQSxXQUFZO0lBQ3pCekIsZ0JBQWdCLEVBQUVBLGdCQUFpQjtJQUNuQ1IsY0FBYyxFQUFFQTtFQUFlLENBQ2xDLENBQ0osRUFDQTJELHFCQUFxQixpQkFDbEJwSCxnREFBQSxDQUFDaUIsaUZBQWlCO0lBQ2QyRSxzQkFBc0IsRUFBRUEsc0JBQXVCO0lBQy9DQywrQkFBK0IsRUFBRUEsK0JBQWdDO0lBQ2pFNUIsZ0JBQWdCLEVBQUVBLGdCQUFpQjtJQUNuQ1IsY0FBYyxFQUFFQTtFQUFlLENBQ2xDLENBQ0osRUFDQTZELGVBQWUsaUJBQ1p0SCxnREFBQSxDQUFDb0IscUVBQVk7SUFDVDJFLFlBQVksRUFBRUEsWUFBYTtJQUMzQkMscUJBQXFCLEVBQUVBLHFCQUFzQjtJQUM3Qy9CLGdCQUFnQixFQUFFQSxnQkFBaUI7SUFDbkNSLGNBQWMsRUFBRUE7RUFBZSxDQUNsQyxDQUNKLEVBQ0FRLGdCQUFnQixpQkFDYmpFLGdEQUFBLENBQUNnRCxrQkFBa0I7SUFBQ2lHLE9BQU8sRUFBRTtFQUE0QyxHQUNwRSxHQUFBbEIsTUFBQSxDQUFBbUIsa0JBQUEsQ0FDTXZELHNCQUFzQixDQUFDLENBQUMsQ0FBQzRDLEdBQUcsQ0FBQyxVQUFDWSxVQUEyQjtJQUFBLE9BQU07TUFDOURoQixXQUFXLHNCQUFBSixNQUFBLENBQXNCb0IsVUFBVSxDQUFDQyxXQUFXLGdCQUFBckIsTUFBQSxDQUFhb0IsVUFBVSxDQUFDRSxHQUFHLDBCQUF1QjtNQUN6R0MsZUFBZSxFQUFFeEksbUdBQXVCLENBQUNxSSxVQUFVO0lBQ3ZELENBQUM7RUFBQSxDQUFDLENBQUMsR0FBQUQsa0JBQUEsQ0FDQXBELGlDQUFpQyxDQUFDLENBQUMsQ0FBQ3lDLEdBQUcsQ0FDdEMsVUFBQ2dCLHNCQUFtRDtJQUFBLE9BQU07TUFDdERwQixXQUFXLCtCQUFBSixNQUFBLENBQTRCd0Isc0JBQXNCLENBQUNILFdBQVcsZ0JBQUFyQixNQUFBLENBQWF3QixzQkFBc0IsQ0FBQ0YsR0FBRywwQkFBdUI7TUFDdklDLGVBQWUsRUFBRXRJLCtIQUFtQyxDQUFDdUksc0JBQXNCO0lBQy9FLENBQUM7RUFBQSxDQUNMLENBQUMsR0FBQUwsa0JBQUEsQ0FDRWpELHVCQUF1QixDQUFDLENBQUMsQ0FBQ3NDLEdBQUcsQ0FBQyxVQUFDaUIsVUFBMkI7SUFBQSxPQUFNO01BQy9EckIsV0FBVyxzQkFBQUosTUFBQSxDQUFzQnlCLFVBQVUsQ0FBQ0osV0FBVyxnQkFBQXJCLE1BQUEsQ0FBYXlCLFVBQVUsQ0FBQ0gsR0FBRywwQkFBdUI7TUFDekdDLGVBQWUsRUFBRW5JLDZGQUF1QixDQUFDcUksVUFBVTtJQUN2RCxDQUFDO0VBQUEsQ0FBQyxDQUFDLEdBQ0xqQixHQUFHLENBQUMsVUFBQWtCLElBQUk7SUFBQSxvQkFDTnpKLGdEQUFBLENBQUNRLDBEQUFZLENBQUNrSixJQUFJO01BQUNDLElBQUksTUFBQTVCLE1BQUEsQ0FBTTBCLElBQUksQ0FBQ0gsZUFBZTtJQUFHLEdBQUVHLElBQUksQ0FBQ3RCLFdBQStCLENBQUM7RUFBQSxDQUM5RixDQUNlLENBQ3ZCLEVBQUMsTUFFTSxDQUFDO0FBRXJCLENBQUM7QUFBQzlFLEVBQUEsQ0EvTElGLG1CQUF1RTtFQUFBLFFBQ3hEakQscURBQVcsRUFDWHVCLDREQUFXLEVBQ1RTLDZEQUFnQixFQUNKQyw2RUFBb0IsRUFPL0NYLDRFQUFzQixFQU90QkUsb0dBQStCLEVBSy9CQyx5RkFBbUIsRUFFdkJULGtKQUFnRCxFQUc1Q2lCLDZFQUFvQixFQVlwQnBCLG1EQUFNO0FBQUE7QUFBQTZJLEdBQUEsR0F4Q1J6RyxtQkFBdUU7QUFpTTdFLGlFQUFlQSxtQkFBbUIsRUFBQztBQUFBLElBQUFWLEVBQUEsRUFBQUcsR0FBQSxFQUFBRyxHQUFBLEVBQUFHLEdBQUEsRUFBQTBHLEdBQUE7QUFBQUMsc0NBQUEsQ0FBQXBILEVBQUE7QUFBQW9ILHNDQUFBLENBQUFqSCxHQUFBO0FBQUFpSCxzQ0FBQSxDQUFBOUcsR0FBQTtBQUFBOEcsc0NBQUEsQ0FBQTNHLEdBQUE7QUFBQTJHLHNDQUFBLENBQUFELEdBQUEseUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ2hRbkMsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC8uL3NyYy9mcm9udGVuZC9zaWRlci9GYWdzYWsvQmVoYW5kbGluZy9TaWRlci9CZWhhbmRsaW5nc3Jlc3VsdGF0L0JlaGFuZGxpbmdzcmVzdWx0YXQudHN4Iiwid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHVzZU5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBQZW5jaWxJY29uIH0gZnJvbSAnQG5hdmlrdC9ha3NlbC1pY29ucyc7XG5pbXBvcnQgeyBBbGVydCwgQnV0dG9uLCBFcnJvck1lc3NhZ2UsIEVycm9yU3VtbWFyeSwgTGFiZWwgfSBmcm9tICdAbmF2aWt0L2RzLXJlYWN0JztcbmltcG9ydCB7IGJ5Z2dEYXRhUmVzc3VycywgUmVzc3Vyc1N0YXR1cyB9IGZyb20gJ0BuYXZpa3QvZmFtaWxpZS10eXBlcic7XG5cbmltcG9ydCBFbmRyZXRVdGJldGFsaW5nQW5kZWxUYWJlbGwgZnJvbSAnLi9FbmRyZXRVdGJldGFsaW5nL0VuZHJldFV0YmV0YWxpbmdBbmRlbFRhYmVsbCc7XG5pbXBvcnQgS29tcGV0YW5zZVNramVtYSBmcm9tICcuL0XDuHMvS29tcGV0YW5zZS9Lb21wZXRhbnNlU2tqZW1hJztcbmltcG9ydCB7IGtvbXBldGFuc2VGZWlsbWVsZGluZ0lkIH0gZnJvbSAnLi9Fw7hzL0tvbXBldGFuc2UvdXNlS29tcGV0YW5zZVBlcmlvZGVTa2plbWEnO1xuaW1wb3J0IHsgdXNlRcO4cyB9IGZyb20gJy4vRcO4cy91c2VFw7hzJztcbmltcG9ydCB7IHV0ZW5sYW5kc2tQZXJpb2RlQmVsw7hwRmVpbG1lbGRpbmdJZCB9IGZyb20gJy4vRcO4cy9VdGJldGFsdEFubmV0TGFuZC91c2VVdGVubGFuZHNrUGVyaW9kZUJlbMO4cFNramVtYSc7XG5pbXBvcnQgVXRiZXRhbHRBbm5ldExhbmQgZnJvbSAnLi9Fw7hzL1V0YmV0YWx0QW5uZXRMYW5kL1V0YmV0YWx0QW5uZXRMYW5kJztcbmltcG9ydCB7IHVzZU9wcGRhdGVyVmFsdXRha3Vyc09nU2ltdWxlcmluZ1DDpUJlc2x1dHRlclN0ZWcgfSBmcm9tICcuL0XDuHMvVmFsdXRha3Vycy91c2VPcHBkYXRlclZhbHV0YWt1cnNPZ1NpbXVsZXJpbmdQw6VCZXNsdXR0ZXJTdGVnJztcbmltcG9ydCB7IHZhbHV0YWt1cnNGZWlsbWVsZGluZ0lkIH0gZnJvbSAnLi9Fw7hzL1ZhbHV0YWt1cnMvdXNlVmFsdXRha3Vyc1NramVtYSc7XG5pbXBvcnQgVmFsdXRha3Vyc2VyIGZyb20gJy4vRcO4cy9WYWx1dGFrdXJzL1ZhbHV0YWt1cnNlcic7XG5pbXBvcnQgTWlncmVyaW5nSW5mb2Jva3MgZnJvbSAnLi9NaWdyZXJpbmdJbmZvYm9rcyc7XG5pbXBvcnQgeyBPcHBzdW1tZXJpbmdzYm9rcyB9IGZyb20gJy4vT3Bwc3VtbWVyaW5nc2Jva3MnO1xuaW1wb3J0IFRpbGtqZW50WXRlbHNlVGlkc2xpbmplIGZyb20gJy4vVGlsa2plbnRZdGVsc2VUaWRzbGluamUnO1xuaW1wb3J0IHsgdXNlQmVoYW5kbGluZ3NyZXN1bHRhdCB9IGZyb20gJy4vdXNlQmVoYW5kbGluZ3NyZXN1bHRhdCc7XG5pbXBvcnQgeyB1c2VGYWdzYWtJZCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2hvb2tzL3VzZUZhZ3Nha0lkJztcbmltcG9ydCB7IHVzZU9wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWwgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9ob29rcy91c2VPcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsJztcbmltcG9ydCB7IHVzZVRpZHNsaW5qZUNvbnRleHQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9rb21wb25lbnRlci9UaWRzbGluamUvVGlkc2xpbmplQ29udGV4dCc7XG5pbXBvcnQgdHlwZSB7IElCZWhhbmRsaW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvYmVoYW5kbGluZyc7XG5pbXBvcnQgeyBCZWhhbmRsaW5nU3RlZywgQmVoYW5kbGluZ3N0eXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvYmVoYW5kbGluZyc7XG5pbXBvcnQge1xuICAgIHR5cGUgSVJlc3RLb21wZXRhbnNlLFxuICAgIHR5cGUgSVJlc3RVdGVubGFuZHNrUGVyaW9kZUJlbMO4cCxcbiAgICB0eXBlIElSZXN0VmFsdXRha3Vycyxcbn0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvZcO4c1BlcmlvZGVyJztcbmltcG9ydCB0eXBlIHsgVXRiZXRhbGluZ3NwZXJpb2RlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXIvdmVkdGFrc3BlcmlvZGUnO1xuaW1wb3J0IHsgcGVyaW9kZU92ZXJsYXBwZXJNZWRWYWxndERhdG8gfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9kYXRvJztcbmltcG9ydCB7IGZvcm1hdGVySWRlbnQsIHNsw6VTYW1tZW5MaXN0ZVRpbFN0cmVuZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL2Zvcm1hdHRlcic7XG5pbXBvcnQgeyBoZW50RnJvbnRlbmRGZWlsbWVsZGluZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL3Jlc3N1cnNVdGlscyc7XG5pbXBvcnQgeyB1c2VGYWdzYWtDb250ZXh0IH0gZnJvbSAnLi4vLi4vLi4vRmFnc2FrQ29udGV4dCc7XG5pbXBvcnQgeyB1c2VCZWhhbmRsaW5nQ29udGV4dCB9IGZyb20gJy4uLy4uL2NvbnRleHQvQmVoYW5kbGluZ0NvbnRleHQnO1xuaW1wb3J0IFNramVtYXN0ZWcgZnJvbSAnLi4vU2tqZW1hc3RlZyc7XG5cbmNvbnN0IEVuZHJldFV0YmV0YWxpbmdBbmRlbCA9IHN0eWxlZC5kaXZgXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG5gO1xuXG5jb25zdCBTdHlsZWRFZGl0SWtvbiA9IHN0eWxlZChQZW5jaWxJY29uKWBcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbmA7XG5cbmNvbnN0IFN0eWxlZEFsZXJ0ID0gc3R5bGVkKEFsZXJ0KWBcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuYDtcblxuY29uc3QgU3R5bGVkRXJyb3JTdW1tYXJ5ID0gc3R5bGVkKEVycm9yU3VtbWFyeSlgXG4gICAgbWFyZ2luLXRvcDogNXJlbTtcbmA7XG5cbmludGVyZmFjZSBJQmVoYW5kbGluZ3NyZXN1bHRhdFByb3BzIHtcbiAgICDDpXBlbkJlaGFuZGxpbmc6IElCZWhhbmRsaW5nO1xufVxuXG5jb25zdCBCZWhhbmRsaW5nc3Jlc3VsdGF0OiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxJQmVoYW5kbGluZ3NyZXN1bHRhdFByb3BzPiA9ICh7IMOlcGVuQmVoYW5kbGluZyB9KSA9PiB7XG4gICAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICAgIGNvbnN0IGZhZ3Nha0lkID0gdXNlRmFnc2FrSWQoKTtcbiAgICBjb25zdCB7IGZhZ3NhayB9ID0gdXNlRmFnc2FrQ29udGV4dCgpO1xuICAgIGNvbnN0IHsgc2V0dMOFcGVuQmVoYW5kbGluZyB9ID0gdXNlQmVoYW5kbGluZ0NvbnRleHQoKTtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgdmlzRmVpbG1lbGRpbmdlcixcbiAgICAgICAgc2V0dFZpc0ZlaWxtZWxkaW5nZXIsXG4gICAgICAgIGhlbnRQZXJzb25lck1lZFVneWxkaWdFdHRlcmJldGFsaW5nc3BlcmlvZGUsXG4gICAgICAgIHBlcnNvbmVyTWVkVWd5bGRpZ0V0dGVyYmV0YWxpbmdzcGVyaW9kZSxcbiAgICB9ID0gdXNlQmVoYW5kbGluZ3NyZXN1bHRhdCjDpXBlbkJlaGFuZGxpbmcpO1xuXG4gICAgY29uc3Qge1xuICAgICAgICBtdXRhdGU6IG9wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWwsXG4gICAgICAgIGlzUGVuZGluZzogaXNPcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsUGVuZGluZyxcbiAgICAgICAgaXNFcnJvcjogaXNPcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsRXJyb3IsXG4gICAgICAgIGVycm9yOiBvcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsRXJyb3IsXG4gICAgfSA9IHVzZU9wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWwoe1xuICAgICAgICBvblN1Y2Nlc3M6IChiZWhhbmRsaW5nOiBJQmVoYW5kbGluZykgPT4gc2V0dMOFcGVuQmVoYW5kbGluZyhieWdnRGF0YVJlc3N1cnMoYmVoYW5kbGluZykpLFxuICAgIH0pO1xuXG4gICAgY29uc3QgeyBha3RpdkV0aWtldHQsIGZpbHRlck9nU29ydGVyQW5kZWxQZXJzb25lcklHcnVubmxhZywgZmlsdGVyT2dTb3J0ZXJHcnVubmxhZ1BlcnNvbmVyTWVkQW5kZWxlciB9ID1cbiAgICAgICAgdXNlVGlkc2xpbmplQ29udGV4dCgpO1xuXG4gICAgdXNlT3BwZGF0ZXJWYWx1dGFrdXJzT2dTaW11bGVyaW5nUMOlQmVzbHV0dGVyU3RlZygpO1xuXG4gICAgY29uc3QgeyB2dXJkZXJFckxlc2V2aXNuaW5nLCBiZWhhbmRsaW5ncmVzdWx0YXROZXN0ZU9uQ2xpY2ssIGJlaGFuZGxpbmdzc3RlZ1N1Ym1pdHJlc3N1cnMgfSA9XG4gICAgICAgIHVzZUJlaGFuZGxpbmdDb250ZXh0KCk7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIGVyRcO4c0luZm9ybWFzam9uR3lsZGlnLFxuICAgICAgICBrb21wZXRhbnNlcixcbiAgICAgICAgaGVudEtvbXBldGFuc2VyTWVkRmVpbCxcbiAgICAgICAgdXRiZXRhbHRBbm5ldExhbmRCZWzDuHAsXG4gICAgICAgIGVyVXRiZXRhbHRBbm5ldExhbmRCZWzDuHBHeWxkaWdlLFxuICAgICAgICBoZW50VXRiZXRhbHRBbm5ldExhbmRCZWzDuHBNZWRGZWlsLFxuICAgICAgICB2YWx1dGFrdXJzZXIsXG4gICAgICAgIGVyVmFsdXRha3Vyc2VyR3lsZGlnZSxcbiAgICAgICAgaGVudFZhbHV0YWt1cnNlck1lZEZlaWwsXG4gICAgfSA9IHVzZUXDuHMow6VwZW5CZWhhbmRsaW5nKTtcblxuICAgIGNvbnN0IGVyTGVzZXZpc25pbmcgPSB2dXJkZXJFckxlc2V2aXNuaW5nKCk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBoZW50UGVyc29uZXJNZWRVZ3lsZGlnRXR0ZXJiZXRhbGluZ3NwZXJpb2RlKCk7XG4gICAgfSwgW8OlcGVuQmVoYW5kbGluZ10pO1xuXG4gICAgY29uc3QgZmlublV0YmV0YWxpbmdzcGVyaW9kZUZvckFrdGl2RXRpa2V0dCA9IChcbiAgICAgICAgdXRiZXRhbGluZ3NwZXJpb2RlcjogVXRiZXRhbGluZ3NwZXJpb2RlW11cbiAgICApOiBVdGJldGFsaW5nc3BlcmlvZGUgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgICByZXR1cm4gYWt0aXZFdGlrZXR0XG4gICAgICAgICAgICA/IHV0YmV0YWxpbmdzcGVyaW9kZXIuZmluZCgodXRiZXRhbGluZ3NwZXJpb2RlOiBVdGJldGFsaW5nc3BlcmlvZGUpID0+XG4gICAgICAgICAgICAgICAgICBwZXJpb2RlT3ZlcmxhcHBlck1lZFZhbGd0RGF0byhcbiAgICAgICAgICAgICAgICAgICAgICB1dGJldGFsaW5nc3BlcmlvZGUucGVyaW9kZUZvbSxcbiAgICAgICAgICAgICAgICAgICAgICB1dGJldGFsaW5nc3BlcmlvZGUucGVyaW9kZVRvbSxcbiAgICAgICAgICAgICAgICAgICAgICBha3RpdkV0aWtldHQuZGF0ZVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB9O1xuXG4gICAgY29uc3QgZ3J1bm5sYWdQZXJzb25lciA9IGZpbHRlck9nU29ydGVyR3J1bm5sYWdQZXJzb25lck1lZEFuZGVsZXIoXG4gICAgICAgIMOlcGVuQmVoYW5kbGluZy5wZXJzb25lcixcbiAgICAgICAgw6VwZW5CZWhhbmRsaW5nLnBlcnNvbmVyTWVkQW5kZWxlclRpbGtqZW50WXRlbHNlXG4gICAgKTtcblxuICAgIGNvbnN0IHRpZHNsaW5qZVBlcnNvbmVyID0gZmlsdGVyT2dTb3J0ZXJBbmRlbFBlcnNvbmVySUdydW5ubGFnKFxuICAgICAgICBncnVubmxhZ1BlcnNvbmVyLFxuICAgICAgICDDpXBlbkJlaGFuZGxpbmcucGVyc29uZXJNZWRBbmRlbGVyVGlsa2plbnRZdGVsc2VcbiAgICApO1xuXG4gICAgY29uc3QgZXJNaWdyZXJpbmdGcmFJbmZvdHJ5Z2QgPSDDpXBlbkJlaGFuZGxpbmcudHlwZSA9PT0gQmVoYW5kbGluZ3N0eXBlLk1JR1JFUklOR19GUkFfSU5GT1RSWUdEO1xuXG4gICAgY29uc3QgaGFyS29tcGV0YW5zZXIgPSDDpXBlbkJlaGFuZGxpbmcua29tcGV0YW5zZXI/Lmxlbmd0aCA+IDA7XG4gICAgY29uc3QgaGFyVXRlbmxhbmRza2VCZWzDuHBlciA9IMOlcGVuQmVoYW5kbGluZy51dGVubGFuZHNrZVBlcmlvZGViZWzDuHA/Lmxlbmd0aCA+IDA7XG4gICAgY29uc3QgaGFyVmFsdXRha3Vyc2VyID0gw6VwZW5CZWhhbmRsaW5nLnV0ZW5sYW5kc2tlUGVyaW9kZWJlbMO4cD8ubGVuZ3RoID4gMDtcblxuICAgIGNvbnN0IGhhckXDuHMgPSBoYXJLb21wZXRhbnNlciB8fCBoYXJVdGVubGFuZHNrZUJlbMO4cGVyIHx8IGhhclZhbHV0YWt1cnNlcjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxTa2plbWFzdGVnXG4gICAgICAgICAgICBzZW5kZXJJbm49e2JlaGFuZGxpbmdzc3RlZ1N1Ym1pdHJlc3N1cnMuc3RhdHVzID09PSBSZXNzdXJzU3RhdHVzLkhFTlRFUn1cbiAgICAgICAgICAgIHRpdHRlbD1cIkJlaGFuZGxpbmdzcmVzdWx0YXRcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmVoYW5kbGluZ3NyZXN1bHRhdFwiXG4gICAgICAgICAgICBmb3JyaWdlT25DbGljaz17KCkgPT4gbmF2aWdhdGUoYC9mYWdzYWsvJHtmYWdzYWtJZH0vJHvDpXBlbkJlaGFuZGxpbmcuYmVoYW5kbGluZ0lkfS92aWxrYWFyc3Z1cmRlcmluZ2ApfVxuICAgICAgICAgICAgbmVzdGVPbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVyTGVzZXZpc25pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGUoYC9mYWdzYWsvJHtmYWdzYWtJZH0vJHvDpXBlbkJlaGFuZGxpbmcuYmVoYW5kbGluZ0lkfS9zaW11bGVyaW5nYCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXJFw7hzICYmICFlckXDuHNJbmZvcm1hc2pvbkd5bGRpZygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRWaXNGZWlsbWVsZGluZ2VyKHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJlaGFuZGxpbmdyZXN1bHRhdE5lc3RlT25DbGljaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBtYXhXaWR0aFN0eWxlPXsnODByZW0nfVxuICAgICAgICAgICAgZmVpbG1lbGRpbmc9e2hlbnRGcm9udGVuZEZlaWxtZWxkaW5nKGJlaGFuZGxpbmdzc3RlZ1N1Ym1pdHJlc3N1cnMpfVxuICAgICAgICAgICAgc3RlZz17QmVoYW5kbGluZ1N0ZWcuQkVIQU5ETElOR1NSRVNVTFRBVH1cbiAgICAgICAgPlxuICAgICAgICAgICAge3BlcnNvbmVyTWVkVWd5bGRpZ0V0dGVyYmV0YWxpbmdzcGVyaW9kZS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8U3R5bGVkQWxlcnQgdmFyaWFudD17J3dhcm5pbmcnfT5cbiAgICAgICAgICAgICAgICAgICAgRHUgaGFyIHBlcmlvZGVyIHNvbSBrYW4gZsO4cmUgdGlsIGV0dGVyYmV0YWxpbmcgdXRvdmVyIHRyZSBtw6VuZWRlciBmb3IgcGVyc29ueycgJ31cbiAgICAgICAgICAgICAgICAgICAge3Nsw6VTYW1tZW5MaXN0ZVRpbFN0cmVuZyhcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmVyTWVkVWd5bGRpZ0V0dGVyYmV0YWxpbmdzcGVyaW9kZS5tYXAoaWRlbnQgPT4gZm9ybWF0ZXJJZGVudChpZGVudCkpXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIC5cbiAgICAgICAgICAgICAgICA8L1N0eWxlZEFsZXJ0PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtlck1pZ3JlcmluZ0ZyYUluZm90cnlnZCAmJiA8TWlncmVyaW5nSW5mb2Jva3MgYmVoYW5kbGluZ0lkPXvDpXBlbkJlaGFuZGxpbmcuYmVoYW5kbGluZ0lkfSAvPn1cbiAgICAgICAgICAgIDxUaWxramVudFl0ZWxzZVRpZHNsaW5qZVxuICAgICAgICAgICAgICAgIGdydW5ubGFnUGVyc29uZXI9e2dydW5ubGFnUGVyc29uZXJ9XG4gICAgICAgICAgICAgICAgdGlkc2xpbmplUGVyc29uZXI9e3RpZHNsaW5qZVBlcnNvbmVyfVxuICAgICAgICAgICAgICAgIGZhZ3Nha1R5cGU9e2ZhZ3Nhay5mYWdzYWtUeXBlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHshZXJMZXNldmlzbmluZyAmJiAoXG4gICAgICAgICAgICAgICAgPEVuZHJldFV0YmV0YWxpbmdBbmRlbD5cbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInRlcnRpYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uPXs8U3R5bGVkRWRpdElrb24gLz59XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNPcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsUGVuZGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e2lzT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbFBlbmRpbmd9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbD5FbmRyZSB1dGJldGFsaW5nc3BlcmlvZGU8L0xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAge2lzT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbEVycm9yICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFcnJvck1lc3NhZ2U+e29wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxFcnJvci5tZXNzYWdlfTwvRXJyb3JNZXNzYWdlPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvRW5kcmV0VXRiZXRhbGluZ0FuZGVsPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtha3RpdkV0aWtldHQgJiYgKFxuICAgICAgICAgICAgICAgIDxPcHBzdW1tZXJpbmdzYm9rc1xuICAgICAgICAgICAgICAgICAgICB1dGJldGFsaW5nc3BlcmlvZGU9e2Zpbm5VdGJldGFsaW5nc3BlcmlvZGVGb3JBa3RpdkV0aWtldHQow6VwZW5CZWhhbmRsaW5nLnV0YmV0YWxpbmdzcGVyaW9kZXIpfVxuICAgICAgICAgICAgICAgICAgICBha3RpdkV0aWtldHQ9e2FrdGl2RXRpa2V0dH1cbiAgICAgICAgICAgICAgICAgICAga29tcGV0YW5zZXI9e2tvbXBldGFuc2VyfVxuICAgICAgICAgICAgICAgICAgICB1dGJldGFsdEFubmV0TGFuZEJlbMO4cD17dXRiZXRhbHRBbm5ldExhbmRCZWzDuHB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHV0YWt1cnNlcj17dmFsdXRha3Vyc2VyfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge8OlcGVuQmVoYW5kbGluZy5lbmRyZXRVdGJldGFsaW5nQW5kZWxlci5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8RW5kcmV0VXRiZXRhbGluZ0FuZGVsVGFiZWxsIMOlcGVuQmVoYW5kbGluZz17w6VwZW5CZWhhbmRsaW5nfSAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtoYXJLb21wZXRhbnNlciAmJiAoXG4gICAgICAgICAgICAgICAgPEtvbXBldGFuc2VTa2plbWFcbiAgICAgICAgICAgICAgICAgICAga29tcGV0YW5zZXI9e2tvbXBldGFuc2VyfVxuICAgICAgICAgICAgICAgICAgICB2aXNGZWlsbWVsZGluZ2VyPXt2aXNGZWlsbWVsZGluZ2VyfVxuICAgICAgICAgICAgICAgICAgICDDpXBlbkJlaGFuZGxpbmc9e8OlcGVuQmVoYW5kbGluZ31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtoYXJVdGVubGFuZHNrZUJlbMO4cGVyICYmIChcbiAgICAgICAgICAgICAgICA8VXRiZXRhbHRBbm5ldExhbmRcbiAgICAgICAgICAgICAgICAgICAgdXRiZXRhbHRBbm5ldExhbmRCZWzDuHA9e3V0YmV0YWx0QW5uZXRMYW5kQmVsw7hwfVxuICAgICAgICAgICAgICAgICAgICBlclV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwR3lsZGlnZT17ZXJVdGJldGFsdEFubmV0TGFuZEJlbMO4cEd5bGRpZ2V9XG4gICAgICAgICAgICAgICAgICAgIHZpc0ZlaWxtZWxkaW5nZXI9e3Zpc0ZlaWxtZWxkaW5nZXJ9XG4gICAgICAgICAgICAgICAgICAgIMOlcGVuQmVoYW5kbGluZz17w6VwZW5CZWhhbmRsaW5nfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2hhclZhbHV0YWt1cnNlciAmJiAoXG4gICAgICAgICAgICAgICAgPFZhbHV0YWt1cnNlclxuICAgICAgICAgICAgICAgICAgICB2YWx1dGFrdXJzZXI9e3ZhbHV0YWt1cnNlcn1cbiAgICAgICAgICAgICAgICAgICAgZXJWYWx1dGFrdXJzZXJHeWxkaWdlPXtlclZhbHV0YWt1cnNlckd5bGRpZ2V9XG4gICAgICAgICAgICAgICAgICAgIHZpc0ZlaWxtZWxkaW5nZXI9e3Zpc0ZlaWxtZWxkaW5nZXJ9XG4gICAgICAgICAgICAgICAgICAgIMOlcGVuQmVoYW5kbGluZz17w6VwZW5CZWhhbmRsaW5nfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge3Zpc0ZlaWxtZWxkaW5nZXIgJiYgKFxuICAgICAgICAgICAgICAgIDxTdHlsZWRFcnJvclN1bW1hcnkgaGVhZGluZz17J0ZvciDDpSBnw6UgdmlkZXJlIG3DpSBkdSByZXR0ZSBvcHAgZsO4bGdlbmRlOid9PlxuICAgICAgICAgICAgICAgICAgICB7W1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uaGVudEtvbXBldGFuc2VyTWVkRmVpbCgpLm1hcCgoa29tcGV0YW5zZTogSVJlc3RLb21wZXRhbnNlKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlaWxtZWxkaW5nOiBgS29tcGV0YW5zZSBiYXJuOiAke2tvbXBldGFuc2UuYmFybklkZW50ZXJ9LCBmLm8ubS46ICR7a29tcGV0YW5zZS5mb219IGVyIGlra2UgZnVsbHN0ZW5kaWcuYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2plbWFlbGVtZW50SWQ6IGtvbXBldGFuc2VGZWlsbWVsZGluZ0lkKGtvbXBldGFuc2UpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uaGVudFV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwTWVkRmVpbCgpLm1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodXRlbmxhbmRza1BlcmlvZGVCZWzDuHA6IElSZXN0VXRlbmxhbmRza1BlcmlvZGVCZWzDuHApID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlaWxtZWxkaW5nOiBgVXRlbmxhbmRzayBiZWzDuHAgYmFybjogJHt1dGVubGFuZHNrUGVyaW9kZUJlbMO4cC5iYXJuSWRlbnRlcn0sIGYuby5tLjogJHt1dGVubGFuZHNrUGVyaW9kZUJlbMO4cC5mb219IGVyIGlra2UgZnVsbHN0ZW5kaWcuYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tqZW1hZWxlbWVudElkOiB1dGVubGFuZHNrUGVyaW9kZUJlbMO4cEZlaWxtZWxkaW5nSWQodXRlbmxhbmRza1BlcmlvZGVCZWzDuHApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uaGVudFZhbHV0YWt1cnNlck1lZEZlaWwoKS5tYXAoKHZhbHV0YWt1cnM6IElSZXN0VmFsdXRha3VycykgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWlsbWVsZGluZzogYFZhbHV0YWt1cnMgYmFybjogJHt2YWx1dGFrdXJzLmJhcm5JZGVudGVyfSwgZi5vLm0uOiAke3ZhbHV0YWt1cnMuZm9tfSBlciBpa2tlIGZ1bGxzdGVuZGlnLmAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tqZW1hZWxlbWVudElkOiB2YWx1dGFrdXJzRmVpbG1lbGRpbmdJZCh2YWx1dGFrdXJzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgXS5tYXAoaXRlbSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8RXJyb3JTdW1tYXJ5Lkl0ZW0gaHJlZj17YCMke2l0ZW0uc2tqZW1hZWxlbWVudElkfWB9PntpdGVtLmZlaWxtZWxkaW5nfTwvRXJyb3JTdW1tYXJ5Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvU3R5bGVkRXJyb3JTdW1tYXJ5PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHRlc3RcbiAgICAgICAgPC9Ta2plbWFzdGVnPlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCZWhhbmRsaW5nc3Jlc3VsdGF0O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMTAyZTJjMGE3MmNjNDY0NzZmOTZcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VOYXZpZ2F0ZSIsInN0eWxlZCIsIlBlbmNpbEljb24iLCJBbGVydCIsIkJ1dHRvbiIsIkVycm9yTWVzc2FnZSIsIkVycm9yU3VtbWFyeSIsIkxhYmVsIiwiYnlnZ0RhdGFSZXNzdXJzIiwiUmVzc3Vyc1N0YXR1cyIsIkVuZHJldFV0YmV0YWxpbmdBbmRlbFRhYmVsbCIsIktvbXBldGFuc2VTa2plbWEiLCJrb21wZXRhbnNlRmVpbG1lbGRpbmdJZCIsInVzZUXDuHMiLCJ1dGVubGFuZHNrUGVyaW9kZUJlbMO4cEZlaWxtZWxkaW5nSWQiLCJVdGJldGFsdEFubmV0TGFuZCIsInVzZU9wcGRhdGVyVmFsdXRha3Vyc09nU2ltdWxlcmluZ1DDpUJlc2x1dHRlclN0ZWciLCJ2YWx1dGFrdXJzRmVpbG1lbGRpbmdJZCIsIlZhbHV0YWt1cnNlciIsIk1pZ3JlcmluZ0luZm9ib2tzIiwiT3Bwc3VtbWVyaW5nc2Jva3MiLCJUaWxramVudFl0ZWxzZVRpZHNsaW5qZSIsInVzZUJlaGFuZGxpbmdzcmVzdWx0YXQiLCJ1c2VGYWdzYWtJZCIsInVzZU9wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWwiLCJ1c2VUaWRzbGluamVDb250ZXh0IiwiQmVoYW5kbGluZ1N0ZWciLCJCZWhhbmRsaW5nc3R5cGUiLCJwZXJpb2RlT3ZlcmxhcHBlck1lZFZhbGd0RGF0byIsImZvcm1hdGVySWRlbnQiLCJzbMOlU2FtbWVuTGlzdGVUaWxTdHJlbmciLCJoZW50RnJvbnRlbmRGZWlsbWVsZGluZyIsInVzZUZhZ3Nha0NvbnRleHQiLCJ1c2VCZWhhbmRsaW5nQ29udGV4dCIsIlNramVtYXN0ZWciLCJFbmRyZXRVdGJldGFsaW5nQW5kZWwiLCJkaXYiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiX2MiLCJTdHlsZWRFZGl0SWtvbiIsIl90ZW1wbGF0ZU9iamVjdDIiLCJfYzIiLCJTdHlsZWRBbGVydCIsIl90ZW1wbGF0ZU9iamVjdDMiLCJfYzMiLCJTdHlsZWRFcnJvclN1bW1hcnkiLCJfdGVtcGxhdGVPYmplY3Q0IiwiX2M0IiwiQmVoYW5kbGluZ3NyZXN1bHRhdCIsIl9yZWYiLCJfcyIsIl/DpXBlbkJlaGFuZGxpbmcka29tcGUiLCJfw6VwZW5CZWhhbmRsaW5nJHV0ZW5sIiwiX8OlcGVuQmVoYW5kbGluZyR1dGVubDIiLCLDpXBlbkJlaGFuZGxpbmciLCJuYXZpZ2F0ZSIsImZhZ3Nha0lkIiwiX3VzZUZhZ3Nha0NvbnRleHQiLCJmYWdzYWsiLCJfdXNlQmVoYW5kbGluZ0NvbnRleHQiLCJzZXR0w4VwZW5CZWhhbmRsaW5nIiwiX3VzZUJlaGFuZGxpbmdzcmVzdWx0IiwidmlzRmVpbG1lbGRpbmdlciIsInNldHRWaXNGZWlsbWVsZGluZ2VyIiwiaGVudFBlcnNvbmVyTWVkVWd5bGRpZ0V0dGVyYmV0YWxpbmdzcGVyaW9kZSIsInBlcnNvbmVyTWVkVWd5bGRpZ0V0dGVyYmV0YWxpbmdzcGVyaW9kZSIsIl91c2VPcHByZXR0RW5kcmV0VXRiZSIsIm9uU3VjY2VzcyIsImJlaGFuZGxpbmciLCJvcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsIiwibXV0YXRlIiwiaXNPcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsUGVuZGluZyIsImlzUGVuZGluZyIsImlzT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbEVycm9yIiwiaXNFcnJvciIsIm9wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxFcnJvciIsImVycm9yIiwiX3VzZVRpZHNsaW5qZUNvbnRleHQiLCJha3RpdkV0aWtldHQiLCJmaWx0ZXJPZ1NvcnRlckFuZGVsUGVyc29uZXJJR3J1bm5sYWciLCJmaWx0ZXJPZ1NvcnRlckdydW5ubGFnUGVyc29uZXJNZWRBbmRlbGVyIiwiX3VzZUJlaGFuZGxpbmdDb250ZXh0MiIsInZ1cmRlckVyTGVzZXZpc25pbmciLCJiZWhhbmRsaW5ncmVzdWx0YXROZXN0ZU9uQ2xpY2siLCJiZWhhbmRsaW5nc3N0ZWdTdWJtaXRyZXNzdXJzIiwiX3VzZUXDuHMiLCJlckXDuHNJbmZvcm1hc2pvbkd5bGRpZyIsImtvbXBldGFuc2VyIiwiaGVudEtvbXBldGFuc2VyTWVkRmVpbCIsInV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwIiwiZXJVdGJldGFsdEFubmV0TGFuZEJlbMO4cEd5bGRpZ2UiLCJoZW50VXRiZXRhbHRBbm5ldExhbmRCZWzDuHBNZWRGZWlsIiwidmFsdXRha3Vyc2VyIiwiZXJWYWx1dGFrdXJzZXJHeWxkaWdlIiwiaGVudFZhbHV0YWt1cnNlck1lZEZlaWwiLCJlckxlc2V2aXNuaW5nIiwiZmlublV0YmV0YWxpbmdzcGVyaW9kZUZvckFrdGl2RXRpa2V0dCIsInV0YmV0YWxpbmdzcGVyaW9kZXIiLCJmaW5kIiwidXRiZXRhbGluZ3NwZXJpb2RlIiwicGVyaW9kZUZvbSIsInBlcmlvZGVUb20iLCJkYXRlIiwidW5kZWZpbmVkIiwiZ3J1bm5sYWdQZXJzb25lciIsInBlcnNvbmVyIiwicGVyc29uZXJNZWRBbmRlbGVyVGlsa2plbnRZdGVsc2UiLCJ0aWRzbGluamVQZXJzb25lciIsImVyTWlncmVyaW5nRnJhSW5mb3RyeWdkIiwidHlwZSIsIk1JR1JFUklOR19GUkFfSU5GT1RSWUdEIiwiaGFyS29tcGV0YW5zZXIiLCJsZW5ndGgiLCJoYXJVdGVubGFuZHNrZUJlbMO4cGVyIiwidXRlbmxhbmRza2VQZXJpb2RlYmVsw7hwIiwiaGFyVmFsdXRha3Vyc2VyIiwiaGFyRcO4cyIsImNyZWF0ZUVsZW1lbnQiLCJzZW5kZXJJbm4iLCJzdGF0dXMiLCJIRU5URVIiLCJ0aXR0ZWwiLCJjbGFzc05hbWUiLCJmb3JyaWdlT25DbGljayIsImNvbmNhdCIsImJlaGFuZGxpbmdJZCIsIm5lc3RlT25DbGljayIsIm1heFdpZHRoU3R5bGUiLCJmZWlsbWVsZGluZyIsInN0ZWciLCJCRUhBTkRMSU5HU1JFU1VMVEFUIiwidmFyaWFudCIsIm1hcCIsImlkZW50IiwiZmFnc2FrVHlwZSIsInNpemUiLCJvbkNsaWNrIiwiaWNvbiIsImRpc2FibGVkIiwibG9hZGluZyIsIm1lc3NhZ2UiLCJlbmRyZXRVdGJldGFsaW5nQW5kZWxlciIsImhlYWRpbmciLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJrb21wZXRhbnNlIiwiYmFybklkZW50ZXIiLCJmb20iLCJza2plbWFlbGVtZW50SWQiLCJ1dGVubGFuZHNrUGVyaW9kZUJlbMO4cCIsInZhbHV0YWt1cnMiLCJpdGVtIiwiSXRlbSIsImhyZWYiLCJfYzUiLCIkUmVmcmVzaFJlZyQiXSwic291cmNlUm9vdCI6IiJ9