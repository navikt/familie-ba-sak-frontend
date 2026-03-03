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
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-JZWAC4HX.mjs");
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
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.HStack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Button, null, "test"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Button, null, "test"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Button, null, "test"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Button, null, "test"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Button, null, "test"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_navikt_ds_react__WEBPACK_IMPORTED_MODULE_5__.Button, null, "test")), personerMedUgyldigEtterbetalingsperiode.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(StyledAlert, {
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
  }), visFeilmeldinger && !erEøsInformasjonGyldig() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(StyledErrorSummary, {
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
/******/ 	__webpack_require__.h = () => ("649d60b14b82e51cc699")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5lNGExM2I0MjljODMwMjQ2YzYzNS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQStCO0FBQ0c7QUFFUztBQUNKO0FBRVU7QUFDMkM7QUFDckI7QUFFa0I7QUFDeEI7QUFDcUI7QUFDaEQ7QUFDd0U7QUFDcEM7QUFDMkQ7QUFDdEQ7QUFDdEI7QUFDTDtBQUNJO0FBQ1E7QUFDRTtBQUNIO0FBQ3dDO0FBQ1g7QUFFVjtBQU9SO0FBQ2M7QUFDWjtBQUNsQjtBQUNhO0FBQ2hDO0FBRXZDLElBQU1zQyxxQkFBcUIsR0FBR25DLHlEQUFNLENBQUNvQyxHQUFHLENBQUFDLGVBQUEsS0FBQUEsZUFBQSxHQUFBQyxzQkFBQSx3RkFJdkM7QUFBQ0MsRUFBQSxHQUpJSixxQkFBcUI7QUFNM0IsSUFBTUssY0FBYyxHQUFHeEMsNkRBQU0sQ0FBQ0MsMkRBQVUsQ0FBQyxDQUFBd0MsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQUgsc0JBQUEsa0NBRXhDO0FBQUNJLEdBQUEsR0FGSUYsY0FBYztBQUlwQixJQUFNRyxXQUFXLEdBQUczQyw2REFBTSxDQUFDRSxtREFBSyxDQUFDLENBQUEwQyxnQkFBQSxLQUFBQSxnQkFBQSxHQUFBTixzQkFBQSxvQ0FFaEM7QUFBQ08sR0FBQSxHQUZJRixXQUFXO0FBSWpCLElBQU1HLGtCQUFrQixHQUFHOUMsNkRBQU0sQ0FBQ0ssMERBQVksQ0FBQyxDQUFBMEMsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQVQsc0JBQUEsaUNBRTlDO0FBQUNVLEdBQUEsR0FGSUYsa0JBQWtCO0FBUXhCLElBQU1HLG1CQUF1RSxHQUFHLFNBQTFFQSxtQkFBdUVBLENBQUFDLElBQUEsRUFBMkI7RUFBQUMsRUFBQTtFQUFBLElBQUFDLHFCQUFBLEVBQUFDLHFCQUFBLEVBQUFDLHNCQUFBO0VBQUEsSUFBckJDLGNBQWMsR0FBQUwsSUFBQSxDQUFkSyxjQUFj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RUFBQSxFQUFBRyxHQUFBLEVBQUFHLEdBQUEsRUFBQUcsR0FBQSxFQUFBMEcsR0FBQTtBQUFBQyxzQ0FBQSxDQUFBcEgsRUFBQTtBQUFBb0gsc0NBQUEsQ0FBQWpILEdBQUE7QUFBQWlILHNDQUFBLENBQUE5RyxHQUFBO0FBQUE4RyxzQ0FBQSxDQUFBM0csR0FBQTtBQUFBMkcsc0NBQUEsQ0FBQUQsR0FBQSx5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDeFFuQyxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlsaWUtYmEtc2FrLWZyb250ZW5kLy4vc3JjL2Zyb250ZW5kL3NpZGVyL0ZhZ3Nhay9CZWhhbmRsaW5nL1NpZGVyL0JlaGFuZGxpbmdzcmVzdWx0YXQvQmVoYW5kbGluZ3NyZXN1bHRhdC50c3giLCJ3ZWJwYWNrOi8vZmFtaWxpZS1iYS1zYWstZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IFBlbmNpbEljb24gfSBmcm9tICdAbmF2aWt0L2Frc2VsLWljb25zJztcbmltcG9ydCB7IEFsZXJ0LCBCdXR0b24sIEVycm9yTWVzc2FnZSwgRXJyb3JTdW1tYXJ5LCBIU3RhY2ssIExhYmVsIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgeyBieWdnRGF0YVJlc3N1cnMsIFJlc3N1cnNTdGF0dXMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuXG5pbXBvcnQgRW5kcmV0VXRiZXRhbGluZ0FuZGVsVGFiZWxsIGZyb20gJy4vRW5kcmV0VXRiZXRhbGluZy9FbmRyZXRVdGJldGFsaW5nQW5kZWxUYWJlbGwnO1xuaW1wb3J0IEtvbXBldGFuc2VTa2plbWEgZnJvbSAnLi9Fw7hzL0tvbXBldGFuc2UvS29tcGV0YW5zZVNramVtYSc7XG5pbXBvcnQgeyBrb21wZXRhbnNlRmVpbG1lbGRpbmdJZCB9IGZyb20gJy4vRcO4cy9Lb21wZXRhbnNlL3VzZUtvbXBldGFuc2VQZXJpb2RlU2tqZW1hJztcbmltcG9ydCB7IHVzZUXDuHMgfSBmcm9tICcuL0XDuHMvdXNlRcO4cyc7XG5pbXBvcnQgeyB1dGVubGFuZHNrUGVyaW9kZUJlbMO4cEZlaWxtZWxkaW5nSWQgfSBmcm9tICcuL0XDuHMvVXRiZXRhbHRBbm5ldExhbmQvdXNlVXRlbmxhbmRza1BlcmlvZGVCZWzDuHBTa2plbWEnO1xuaW1wb3J0IFV0YmV0YWx0QW5uZXRMYW5kIGZyb20gJy4vRcO4cy9VdGJldGFsdEFubmV0TGFuZC9VdGJldGFsdEFubmV0TGFuZCc7XG5pbXBvcnQgeyB1c2VPcHBkYXRlclZhbHV0YWt1cnNPZ1NpbXVsZXJpbmdQw6VCZXNsdXR0ZXJTdGVnIH0gZnJvbSAnLi9Fw7hzL1ZhbHV0YWt1cnMvdXNlT3BwZGF0ZXJWYWx1dGFrdXJzT2dTaW11bGVyaW5nUMOlQmVzbHV0dGVyU3RlZyc7XG5pbXBvcnQgeyB2YWx1dGFrdXJzRmVpbG1lbGRpbmdJZCB9IGZyb20gJy4vRcO4cy9WYWx1dGFrdXJzL3VzZVZhbHV0YWt1cnNTa2plbWEnO1xuaW1wb3J0IFZhbHV0YWt1cnNlciBmcm9tICcuL0XDuHMvVmFsdXRha3Vycy9WYWx1dGFrdXJzZXInO1xuaW1wb3J0IE1pZ3JlcmluZ0luZm9ib2tzIGZyb20gJy4vTWlncmVyaW5nSW5mb2Jva3MnO1xuaW1wb3J0IHsgT3Bwc3VtbWVyaW5nc2Jva3MgfSBmcm9tICcuL09wcHN1bW1lcmluZ3Nib2tzJztcbmltcG9ydCBUaWxramVudFl0ZWxzZVRpZHNsaW5qZSBmcm9tICcuL1RpbGtqZW50WXRlbHNlVGlkc2xpbmplJztcbmltcG9ydCB7IHVzZUJlaGFuZGxpbmdzcmVzdWx0YXQgfSBmcm9tICcuL3VzZUJlaGFuZGxpbmdzcmVzdWx0YXQnO1xuaW1wb3J0IHsgdXNlRmFnc2FrSWQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9ob29rcy91c2VGYWdzYWtJZCc7XG5pbXBvcnQgeyB1c2VPcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vaG9va3MvdXNlT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbCc7XG5pbXBvcnQgeyB1c2VUaWRzbGluamVDb250ZXh0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4va29tcG9uZW50ZXIvVGlkc2xpbmplL1RpZHNsaW5qZUNvbnRleHQnO1xuaW1wb3J0IHR5cGUgeyBJQmVoYW5kbGluZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL2JlaGFuZGxpbmcnO1xuaW1wb3J0IHsgQmVoYW5kbGluZ1N0ZWcsIEJlaGFuZGxpbmdzdHlwZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL2JlaGFuZGxpbmcnO1xuaW1wb3J0IHtcbiAgICB0eXBlIElSZXN0S29tcGV0YW5zZSxcbiAgICB0eXBlIElSZXN0VXRlbmxhbmRza1BlcmlvZGVCZWzDuHAsXG4gICAgdHlwZSBJUmVzdFZhbHV0YWt1cnMsXG59IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL2XDuHNQZXJpb2Rlcic7XG5pbXBvcnQgdHlwZSB7IFV0YmV0YWxpbmdzcGVyaW9kZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL3ZlZHRha3NwZXJpb2RlJztcbmltcG9ydCB7IHBlcmlvZGVPdmVybGFwcGVyTWVkVmFsZ3REYXRvIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvZGF0byc7XG5pbXBvcnQgeyBmb3JtYXRlcklkZW50LCBzbMOlU2FtbWVuTGlzdGVUaWxTdHJlbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9mb3JtYXR0ZXInO1xuaW1wb3J0IHsgaGVudEZyb250ZW5kRmVpbG1lbGRpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9yZXNzdXJzVXRpbHMnO1xuaW1wb3J0IHsgdXNlRmFnc2FrQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uL0ZhZ3Nha0NvbnRleHQnO1xuaW1wb3J0IHsgdXNlQmVoYW5kbGluZ0NvbnRleHQgfSBmcm9tICcuLi8uLi9jb250ZXh0L0JlaGFuZGxpbmdDb250ZXh0JztcbmltcG9ydCBTa2plbWFzdGVnIGZyb20gJy4uL1NramVtYXN0ZWcnO1xuXG5jb25zdCBFbmRyZXRVdGJldGFsaW5nQW5kZWwgPSBzdHlsZWQuZGl2YFxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuYDtcblxuY29uc3QgU3R5bGVkRWRpdElrb24gPSBzdHlsZWQoUGVuY2lsSWNvbilgXG4gICAgZm9udC1zaXplOiAxLjVyZW07XG5gO1xuXG5jb25zdCBTdHlsZWRBbGVydCA9IHN0eWxlZChBbGVydClgXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbmA7XG5cbmNvbnN0IFN0eWxlZEVycm9yU3VtbWFyeSA9IHN0eWxlZChFcnJvclN1bW1hcnkpYFxuICAgIG1hcmdpbi10b3A6IDVyZW07XG5gO1xuXG5pbnRlcmZhY2UgSUJlaGFuZGxpbmdzcmVzdWx0YXRQcm9wcyB7XG4gICAgw6VwZW5CZWhhbmRsaW5nOiBJQmVoYW5kbGluZztcbn1cblxuY29uc3QgQmVoYW5kbGluZ3NyZXN1bHRhdDogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8SUJlaGFuZGxpbmdzcmVzdWx0YXRQcm9wcz4gPSAoeyDDpXBlbkJlaGFuZGxpbmcgfSkgPT4ge1xuICAgIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgICBjb25zdCBmYWdzYWtJZCA9IHVzZUZhZ3Nha0lkKCk7XG4gICAgY29uc3QgeyBmYWdzYWsgfSA9IHVzZUZhZ3Nha0NvbnRleHQoKTtcbiAgICBjb25zdCB7IHNldHTDhXBlbkJlaGFuZGxpbmcgfSA9IHVzZUJlaGFuZGxpbmdDb250ZXh0KCk7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIHZpc0ZlaWxtZWxkaW5nZXIsXG4gICAgICAgIHNldHRWaXNGZWlsbWVsZGluZ2VyLFxuICAgICAgICBoZW50UGVyc29uZXJNZWRVZ3lsZGlnRXR0ZXJiZXRhbGluZ3NwZXJpb2RlLFxuICAgICAgICBwZXJzb25lck1lZFVneWxkaWdFdHRlcmJldGFsaW5nc3BlcmlvZGUsXG4gICAgfSA9IHVzZUJlaGFuZGxpbmdzcmVzdWx0YXQow6VwZW5CZWhhbmRsaW5nKTtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgbXV0YXRlOiBvcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsLFxuICAgICAgICBpc1BlbmRpbmc6IGlzT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbFBlbmRpbmcsXG4gICAgICAgIGlzRXJyb3I6IGlzT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbEVycm9yLFxuICAgICAgICBlcnJvcjogb3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbEVycm9yLFxuICAgIH0gPSB1c2VPcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsKHtcbiAgICAgICAgb25TdWNjZXNzOiAoYmVoYW5kbGluZzogSUJlaGFuZGxpbmcpID0+IHNldHTDhXBlbkJlaGFuZGxpbmcoYnlnZ0RhdGFSZXNzdXJzKGJlaGFuZGxpbmcpKSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHsgYWt0aXZFdGlrZXR0LCBmaWx0ZXJPZ1NvcnRlckFuZGVsUGVyc29uZXJJR3J1bm5sYWcsIGZpbHRlck9nU29ydGVyR3J1bm5sYWdQZXJzb25lck1lZEFuZGVsZXIgfSA9XG4gICAgICAgIHVzZVRpZHNsaW5qZUNvbnRleHQoKTtcblxuICAgIHVzZU9wcGRhdGVyVmFsdXRha3Vyc09nU2ltdWxlcmluZ1DDpUJlc2x1dHRlclN0ZWcoKTtcblxuICAgIGNvbnN0IHsgdnVyZGVyRXJMZXNldmlzbmluZywgYmVoYW5kbGluZ3Jlc3VsdGF0TmVzdGVPbkNsaWNrLCBiZWhhbmRsaW5nc3N0ZWdTdWJtaXRyZXNzdXJzIH0gPVxuICAgICAgICB1c2VCZWhhbmRsaW5nQ29udGV4dCgpO1xuXG4gICAgY29uc3Qge1xuICAgICAgICBlckXDuHNJbmZvcm1hc2pvbkd5bGRpZyxcbiAgICAgICAga29tcGV0YW5zZXIsXG4gICAgICAgIGhlbnRLb21wZXRhbnNlck1lZEZlaWwsXG4gICAgICAgIHV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwLFxuICAgICAgICBlclV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwR3lsZGlnZSxcbiAgICAgICAgaGVudFV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwTWVkRmVpbCxcbiAgICAgICAgdmFsdXRha3Vyc2VyLFxuICAgICAgICBlclZhbHV0YWt1cnNlckd5bGRpZ2UsXG4gICAgICAgIGhlbnRWYWx1dGFrdXJzZXJNZWRGZWlsLFxuICAgIH0gPSB1c2VFw7hzKMOlcGVuQmVoYW5kbGluZyk7XG5cbiAgICBjb25zdCBlckxlc2V2aXNuaW5nID0gdnVyZGVyRXJMZXNldmlzbmluZygpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaGVudFBlcnNvbmVyTWVkVWd5bGRpZ0V0dGVyYmV0YWxpbmdzcGVyaW9kZSgpO1xuICAgIH0sIFvDpXBlbkJlaGFuZGxpbmddKTtcblxuICAgIGNvbnN0IGZpbm5VdGJldGFsaW5nc3BlcmlvZGVGb3JBa3RpdkV0aWtldHQgPSAoXG4gICAgICAgIHV0YmV0YWxpbmdzcGVyaW9kZXI6IFV0YmV0YWxpbmdzcGVyaW9kZVtdXG4gICAgKTogVXRiZXRhbGluZ3NwZXJpb2RlIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgICAgcmV0dXJuIGFrdGl2RXRpa2V0dFxuICAgICAgICAgICAgPyB1dGJldGFsaW5nc3BlcmlvZGVyLmZpbmQoKHV0YmV0YWxpbmdzcGVyaW9kZTogVXRiZXRhbGluZ3NwZXJpb2RlKSA9PlxuICAgICAgICAgICAgICAgICAgcGVyaW9kZU92ZXJsYXBwZXJNZWRWYWxndERhdG8oXG4gICAgICAgICAgICAgICAgICAgICAgdXRiZXRhbGluZ3NwZXJpb2RlLnBlcmlvZGVGb20sXG4gICAgICAgICAgICAgICAgICAgICAgdXRiZXRhbGluZ3NwZXJpb2RlLnBlcmlvZGVUb20sXG4gICAgICAgICAgICAgICAgICAgICAgYWt0aXZFdGlrZXR0LmRhdGVcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfTtcblxuICAgIGNvbnN0IGdydW5ubGFnUGVyc29uZXIgPSBmaWx0ZXJPZ1NvcnRlckdydW5ubGFnUGVyc29uZXJNZWRBbmRlbGVyKFxuICAgICAgICDDpXBlbkJlaGFuZGxpbmcucGVyc29uZXIsXG4gICAgICAgIMOlcGVuQmVoYW5kbGluZy5wZXJzb25lck1lZEFuZGVsZXJUaWxramVudFl0ZWxzZVxuICAgICk7XG5cbiAgICBjb25zdCB0aWRzbGluamVQZXJzb25lciA9IGZpbHRlck9nU29ydGVyQW5kZWxQZXJzb25lcklHcnVubmxhZyhcbiAgICAgICAgZ3J1bm5sYWdQZXJzb25lcixcbiAgICAgICAgw6VwZW5CZWhhbmRsaW5nLnBlcnNvbmVyTWVkQW5kZWxlclRpbGtqZW50WXRlbHNlXG4gICAgKTtcblxuICAgIGNvbnN0IGVyTWlncmVyaW5nRnJhSW5mb3RyeWdkID0gw6VwZW5CZWhhbmRsaW5nLnR5cGUgPT09IEJlaGFuZGxpbmdzdHlwZS5NSUdSRVJJTkdfRlJBX0lORk9UUllHRDtcblxuICAgIGNvbnN0IGhhcktvbXBldGFuc2VyID0gw6VwZW5CZWhhbmRsaW5nLmtvbXBldGFuc2VyPy5sZW5ndGggPiAwO1xuICAgIGNvbnN0IGhhclV0ZW5sYW5kc2tlQmVsw7hwZXIgPSDDpXBlbkJlaGFuZGxpbmcudXRlbmxhbmRza2VQZXJpb2RlYmVsw7hwPy5sZW5ndGggPiAwO1xuICAgIGNvbnN0IGhhclZhbHV0YWt1cnNlciA9IMOlcGVuQmVoYW5kbGluZy51dGVubGFuZHNrZVBlcmlvZGViZWzDuHA/Lmxlbmd0aCA+IDA7XG5cbiAgICBjb25zdCBoYXJFw7hzID0gaGFyS29tcGV0YW5zZXIgfHwgaGFyVXRlbmxhbmRza2VCZWzDuHBlciB8fCBoYXJWYWx1dGFrdXJzZXI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8U2tqZW1hc3RlZ1xuICAgICAgICAgICAgc2VuZGVySW5uPXtiZWhhbmRsaW5nc3N0ZWdTdWJtaXRyZXNzdXJzLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5IRU5URVJ9XG4gICAgICAgICAgICB0aXR0ZWw9XCJCZWhhbmRsaW5nc3Jlc3VsdGF0XCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJlaGFuZGxpbmdzcmVzdWx0YXRcIlxuICAgICAgICAgICAgZm9ycmlnZU9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKGAvZmFnc2FrLyR7ZmFnc2FrSWR9LyR7w6VwZW5CZWhhbmRsaW5nLmJlaGFuZGxpbmdJZH0vdmlsa2FhcnN2dXJkZXJpbmdgKX1cbiAgICAgICAgICAgIG5lc3RlT25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlckxlc2V2aXNuaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlKGAvZmFnc2FrLyR7ZmFnc2FrSWR9LyR7w6VwZW5CZWhhbmRsaW5nLmJlaGFuZGxpbmdJZH0vc2ltdWxlcmluZ2ApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFyRcO4cyAmJiAhZXJFw7hzSW5mb3JtYXNqb25HeWxkaWcoKSkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0VmlzRmVpbG1lbGRpbmdlcih0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBiZWhhbmRsaW5ncmVzdWx0YXROZXN0ZU9uQ2xpY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgbWF4V2lkdGhTdHlsZT17JzgwcmVtJ31cbiAgICAgICAgICAgIGZlaWxtZWxkaW5nPXtoZW50RnJvbnRlbmRGZWlsbWVsZGluZyhiZWhhbmRsaW5nc3N0ZWdTdWJtaXRyZXNzdXJzKX1cbiAgICAgICAgICAgIHN0ZWc9e0JlaGFuZGxpbmdTdGVnLkJFSEFORExJTkdTUkVTVUxUQVR9XG4gICAgICAgID5cbiAgICAgICAgICAgIDxIU3RhY2s+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbj50ZXN0PC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbj50ZXN0PC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbj50ZXN0PC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbj50ZXN0PC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbj50ZXN0PC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbj50ZXN0PC9CdXR0b24+XG4gICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICAgIHtwZXJzb25lck1lZFVneWxkaWdFdHRlcmJldGFsaW5nc3BlcmlvZGUubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPFN0eWxlZEFsZXJ0IHZhcmlhbnQ9eyd3YXJuaW5nJ30+XG4gICAgICAgICAgICAgICAgICAgIER1IGhhciBwZXJpb2RlciBzb20ga2FuIGbDuHJlIHRpbCBldHRlcmJldGFsaW5nIHV0b3ZlciB0cmUgbcOlbmVkZXIgZm9yIHBlcnNvbnsnICd9XG4gICAgICAgICAgICAgICAgICAgIHtzbMOlU2FtbWVuTGlzdGVUaWxTdHJlbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25lck1lZFVneWxkaWdFdHRlcmJldGFsaW5nc3BlcmlvZGUubWFwKGlkZW50ID0+IGZvcm1hdGVySWRlbnQoaWRlbnQpKVxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAuXG4gICAgICAgICAgICAgICAgPC9TdHlsZWRBbGVydD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7ZXJNaWdyZXJpbmdGcmFJbmZvdHJ5Z2QgJiYgPE1pZ3JlcmluZ0luZm9ib2tzIGJlaGFuZGxpbmdJZD17w6VwZW5CZWhhbmRsaW5nLmJlaGFuZGxpbmdJZH0gLz59XG5cbiAgICAgICAgICAgIDxUaWxramVudFl0ZWxzZVRpZHNsaW5qZVxuICAgICAgICAgICAgICAgIGdydW5ubGFnUGVyc29uZXI9e2dydW5ubGFnUGVyc29uZXJ9XG4gICAgICAgICAgICAgICAgdGlkc2xpbmplUGVyc29uZXI9e3RpZHNsaW5qZVBlcnNvbmVyfVxuICAgICAgICAgICAgICAgIGZhZ3Nha1R5cGU9e2ZhZ3Nhay5mYWdzYWtUeXBlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHshZXJMZXNldmlzbmluZyAmJiAoXG4gICAgICAgICAgICAgICAgPEVuZHJldFV0YmV0YWxpbmdBbmRlbD5cbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInRlcnRpYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uPXs8U3R5bGVkRWRpdElrb24gLz59XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNPcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsUGVuZGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e2lzT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbFBlbmRpbmd9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbD5FbmRyZSB1dGJldGFsaW5nc3BlcmlvZGU8L0xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAge2lzT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbEVycm9yICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFcnJvck1lc3NhZ2U+e29wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxFcnJvci5tZXNzYWdlfTwvRXJyb3JNZXNzYWdlPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvRW5kcmV0VXRiZXRhbGluZ0FuZGVsPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtha3RpdkV0aWtldHQgJiYgKFxuICAgICAgICAgICAgICAgIDxPcHBzdW1tZXJpbmdzYm9rc1xuICAgICAgICAgICAgICAgICAgICB1dGJldGFsaW5nc3BlcmlvZGU9e2Zpbm5VdGJldGFsaW5nc3BlcmlvZGVGb3JBa3RpdkV0aWtldHQow6VwZW5CZWhhbmRsaW5nLnV0YmV0YWxpbmdzcGVyaW9kZXIpfVxuICAgICAgICAgICAgICAgICAgICBha3RpdkV0aWtldHQ9e2FrdGl2RXRpa2V0dH1cbiAgICAgICAgICAgICAgICAgICAga29tcGV0YW5zZXI9e2tvbXBldGFuc2VyfVxuICAgICAgICAgICAgICAgICAgICB1dGJldGFsdEFubmV0TGFuZEJlbMO4cD17dXRiZXRhbHRBbm5ldExhbmRCZWzDuHB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHV0YWt1cnNlcj17dmFsdXRha3Vyc2VyfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge8OlcGVuQmVoYW5kbGluZy5lbmRyZXRVdGJldGFsaW5nQW5kZWxlci5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8RW5kcmV0VXRiZXRhbGluZ0FuZGVsVGFiZWxsIMOlcGVuQmVoYW5kbGluZz17w6VwZW5CZWhhbmRsaW5nfSAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtoYXJLb21wZXRhbnNlciAmJiAoXG4gICAgICAgICAgICAgICAgPEtvbXBldGFuc2VTa2plbWFcbiAgICAgICAgICAgICAgICAgICAga29tcGV0YW5zZXI9e2tvbXBldGFuc2VyfVxuICAgICAgICAgICAgICAgICAgICB2aXNGZWlsbWVsZGluZ2VyPXt2aXNGZWlsbWVsZGluZ2VyfVxuICAgICAgICAgICAgICAgICAgICDDpXBlbkJlaGFuZGxpbmc9e8OlcGVuQmVoYW5kbGluZ31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtoYXJVdGVubGFuZHNrZUJlbMO4cGVyICYmIChcbiAgICAgICAgICAgICAgICA8VXRiZXRhbHRBbm5ldExhbmRcbiAgICAgICAgICAgICAgICAgICAgdXRiZXRhbHRBbm5ldExhbmRCZWzDuHA9e3V0YmV0YWx0QW5uZXRMYW5kQmVsw7hwfVxuICAgICAgICAgICAgICAgICAgICBlclV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwR3lsZGlnZT17ZXJVdGJldGFsdEFubmV0TGFuZEJlbMO4cEd5bGRpZ2V9XG4gICAgICAgICAgICAgICAgICAgIHZpc0ZlaWxtZWxkaW5nZXI9e3Zpc0ZlaWxtZWxkaW5nZXJ9XG4gICAgICAgICAgICAgICAgICAgIMOlcGVuQmVoYW5kbGluZz17w6VwZW5CZWhhbmRsaW5nfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2hhclZhbHV0YWt1cnNlciAmJiAoXG4gICAgICAgICAgICAgICAgPFZhbHV0YWt1cnNlclxuICAgICAgICAgICAgICAgICAgICB2YWx1dGFrdXJzZXI9e3ZhbHV0YWt1cnNlcn1cbiAgICAgICAgICAgICAgICAgICAgZXJWYWx1dGFrdXJzZXJHeWxkaWdlPXtlclZhbHV0YWt1cnNlckd5bGRpZ2V9XG4gICAgICAgICAgICAgICAgICAgIHZpc0ZlaWxtZWxkaW5nZXI9e3Zpc0ZlaWxtZWxkaW5nZXJ9XG4gICAgICAgICAgICAgICAgICAgIMOlcGVuQmVoYW5kbGluZz17w6VwZW5CZWhhbmRsaW5nfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge3Zpc0ZlaWxtZWxkaW5nZXIgJiYgIWVyRcO4c0luZm9ybWFzam9uR3lsZGlnKCkgJiYgKFxuICAgICAgICAgICAgICAgIDxTdHlsZWRFcnJvclN1bW1hcnkgaGVhZGluZz17J0ZvciDDpSBnw6UgdmlkZXJlIG3DpSBkdSByZXR0ZSBvcHAgZsO4bGdlbmRlOid9PlxuICAgICAgICAgICAgICAgICAgICB7W1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uaGVudEtvbXBldGFuc2VyTWVkRmVpbCgpLm1hcCgoa29tcGV0YW5zZTogSVJlc3RLb21wZXRhbnNlKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlaWxtZWxkaW5nOiBgS29tcGV0YW5zZSBiYXJuOiAke2tvbXBldGFuc2UuYmFybklkZW50ZXJ9LCBmLm8ubS46ICR7a29tcGV0YW5zZS5mb219IGVyIGlra2UgZnVsbHN0ZW5kaWcuYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2plbWFlbGVtZW50SWQ6IGtvbXBldGFuc2VGZWlsbWVsZGluZ0lkKGtvbXBldGFuc2UpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uaGVudFV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwTWVkRmVpbCgpLm1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodXRlbmxhbmRza1BlcmlvZGVCZWzDuHA6IElSZXN0VXRlbmxhbmRza1BlcmlvZGVCZWzDuHApID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlaWxtZWxkaW5nOiBgVXRlbmxhbmRzayBiZWzDuHAgYmFybjogJHt1dGVubGFuZHNrUGVyaW9kZUJlbMO4cC5iYXJuSWRlbnRlcn0sIGYuby5tLjogJHt1dGVubGFuZHNrUGVyaW9kZUJlbMO4cC5mb219IGVyIGlra2UgZnVsbHN0ZW5kaWcuYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tqZW1hZWxlbWVudElkOiB1dGVubGFuZHNrUGVyaW9kZUJlbMO4cEZlaWxtZWxkaW5nSWQodXRlbmxhbmRza1BlcmlvZGVCZWzDuHApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uaGVudFZhbHV0YWt1cnNlck1lZEZlaWwoKS5tYXAoKHZhbHV0YWt1cnM6IElSZXN0VmFsdXRha3VycykgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWlsbWVsZGluZzogYFZhbHV0YWt1cnMgYmFybjogJHt2YWx1dGFrdXJzLmJhcm5JZGVudGVyfSwgZi5vLm0uOiAke3ZhbHV0YWt1cnMuZm9tfSBlciBpa2tlIGZ1bGxzdGVuZGlnLmAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tqZW1hZWxlbWVudElkOiB2YWx1dGFrdXJzRmVpbG1lbGRpbmdJZCh2YWx1dGFrdXJzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgXS5tYXAoaXRlbSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8RXJyb3JTdW1tYXJ5Lkl0ZW0gaHJlZj17YCMke2l0ZW0uc2tqZW1hZWxlbWVudElkfWB9PntpdGVtLmZlaWxtZWxkaW5nfTwvRXJyb3JTdW1tYXJ5Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvU3R5bGVkRXJyb3JTdW1tYXJ5PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9Ta2plbWFzdGVnPlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCZWhhbmRsaW5nc3Jlc3VsdGF0O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiNjQ5ZDYwYjE0YjgyZTUxY2M2OTlcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VOYXZpZ2F0ZSIsInN0eWxlZCIsIlBlbmNpbEljb24iLCJBbGVydCIsIkJ1dHRvbiIsIkVycm9yTWVzc2FnZSIsIkVycm9yU3VtbWFyeSIsIkhTdGFjayIsIkxhYmVsIiwiYnlnZ0RhdGFSZXNzdXJzIiwiUmVzc3Vyc1N0YXR1cyIsIkVuZHJldFV0YmV0YWxpbmdBbmRlbFRhYmVsbCIsIktvbXBldGFuc2VTa2plbWEiLCJrb21wZXRhbnNlRmVpbG1lbGRpbmdJZCIsInVzZUXDuHMiLCJ1dGVubGFuZHNrUGVyaW9kZUJlbMO4cEZlaWxtZWxkaW5nSWQiLCJVdGJldGFsdEFubmV0TGFuZCIsInVzZU9wcGRhdGVyVmFsdXRha3Vyc09nU2ltdWxlcmluZ1DDpUJlc2x1dHRlclN0ZWciLCJ2YWx1dGFrdXJzRmVpbG1lbGRpbmdJZCIsIlZhbHV0YWt1cnNlciIsIk1pZ3JlcmluZ0luZm9ib2tzIiwiT3Bwc3VtbWVyaW5nc2Jva3MiLCJUaWxramVudFl0ZWxzZVRpZHNsaW5qZSIsInVzZUJlaGFuZGxpbmdzcmVzdWx0YXQiLCJ1c2VGYWdzYWtJZCIsInVzZU9wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWwiLCJ1c2VUaWRzbGluamVDb250ZXh0IiwiQmVoYW5kbGluZ1N0ZWciLCJCZWhhbmRsaW5nc3R5cGUiLCJwZXJpb2RlT3ZlcmxhcHBlck1lZFZhbGd0RGF0byIsImZvcm1hdGVySWRlbnQiLCJzbMOlU2FtbWVuTGlzdGVUaWxTdHJlbmciLCJoZW50RnJvbnRlbmRGZWlsbWVsZGluZyIsInVzZUZhZ3Nha0NvbnRleHQiLCJ1c2VCZWhhbmRsaW5nQ29udGV4dCIsIlNramVtYXN0ZWciLCJFbmRyZXRVdGJldGFsaW5nQW5kZWwiLCJkaXYiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiX2MiLCJTdHlsZWRFZGl0SWtvbiIsIl90ZW1wbGF0ZU9iamVjdDIiLCJfYzIiLCJTdHlsZWRBbGVydCIsIl90ZW1wbGF0ZU9iamVjdDMiLCJfYzMiLCJTdHlsZWRFcnJvclN1bW1hcnkiLCJfdGVtcGxhdGVPYmplY3Q0IiwiX2M0IiwiQmVoYW5kbGluZ3NyZXN1bHRhdCIsIl9yZWYiLCJfcyIsIl/DpXBlbkJlaGFuZGxpbmcka29tcGUiLCJfw6VwZW5CZWhhbmRsaW5nJHV0ZW5sIiwiX8OlcGVuQmVoYW5kbGluZyR1dGVubDIiLCLDpXBlbkJlaGFuZGxpbmciLCJuYXZpZ2F0ZSIsImZhZ3Nha0lkIiwiX3VzZUZhZ3Nha0NvbnRleHQiLCJmYWdzYWsiLCJfdXNlQmVoYW5kbGluZ0NvbnRleHQiLCJzZXR0w4VwZW5CZWhhbmRsaW5nIiwiX3VzZUJlaGFuZGxpbmdzcmVzdWx0IiwidmlzRmVpbG1lbGRpbmdlciIsInNldHRWaXNGZWlsbWVsZGluZ2VyIiwiaGVudFBlcnNvbmVyTWVkVWd5bGRpZ0V0dGVyYmV0YWxpbmdzcGVyaW9kZSIsInBlcnNvbmVyTWVkVWd5bGRpZ0V0dGVyYmV0YWxpbmdzcGVyaW9kZSIsIl91c2VPcHByZXR0RW5kcmV0VXRiZSIsIm9uU3VjY2VzcyIsImJlaGFuZGxpbmciLCJvcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsIiwibXV0YXRlIiwiaXNPcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsUGVuZGluZyIsImlzUGVuZGluZyIsImlzT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbEVycm9yIiwiaXNFcnJvciIsIm9wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxFcnJvciIsImVycm9yIiwiX3VzZVRpZHNsaW5qZUNvbnRleHQiLCJha3RpdkV0aWtldHQiLCJmaWx0ZXJPZ1NvcnRlckFuZGVsUGVyc29uZXJJR3J1bm5sYWciLCJmaWx0ZXJPZ1NvcnRlckdydW5ubGFnUGVyc29uZXJNZWRBbmRlbGVyIiwiX3VzZUJlaGFuZGxpbmdDb250ZXh0MiIsInZ1cmRlckVyTGVzZXZpc25pbmciLCJiZWhhbmRsaW5ncmVzdWx0YXROZXN0ZU9uQ2xpY2siLCJiZWhhbmRsaW5nc3N0ZWdTdWJtaXRyZXNzdXJzIiwiX3VzZUXDuHMiLCJlckXDuHNJbmZvcm1hc2pvbkd5bGRpZyIsImtvbXBldGFuc2VyIiwiaGVudEtvbXBldGFuc2VyTWVkRmVpbCIsInV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwIiwiZXJVdGJldGFsdEFubmV0TGFuZEJlbMO4cEd5bGRpZ2UiLCJoZW50VXRiZXRhbHRBbm5ldExhbmRCZWzDuHBNZWRGZWlsIiwidmFsdXRha3Vyc2VyIiwiZXJWYWx1dGFrdXJzZXJHeWxkaWdlIiwiaGVudFZhbHV0YWt1cnNlck1lZEZlaWwiLCJlckxlc2V2aXNuaW5nIiwiZmlublV0YmV0YWxpbmdzcGVyaW9kZUZvckFrdGl2RXRpa2V0dCIsInV0YmV0YWxpbmdzcGVyaW9kZXIiLCJmaW5kIiwidXRiZXRhbGluZ3NwZXJpb2RlIiwicGVyaW9kZUZvbSIsInBlcmlvZGVUb20iLCJkYXRlIiwidW5kZWZpbmVkIiwiZ3J1bm5sYWdQZXJzb25lciIsInBlcnNvbmVyIiwicGVyc29uZXJNZWRBbmRlbGVyVGlsa2plbnRZdGVsc2UiLCJ0aWRzbGluamVQZXJzb25lciIsImVyTWlncmVyaW5nRnJhSW5mb3RyeWdkIiwidHlwZSIsIk1JR1JFUklOR19GUkFfSU5GT1RSWUdEIiwiaGFyS29tcGV0YW5zZXIiLCJsZW5ndGgiLCJoYXJVdGVubGFuZHNrZUJlbMO4cGVyIiwidXRlbmxhbmRza2VQZXJpb2RlYmVsw7hwIiwiaGFyVmFsdXRha3Vyc2VyIiwiaGFyRcO4cyIsImNyZWF0ZUVsZW1lbnQiLCJzZW5kZXJJbm4iLCJzdGF0dXMiLCJIRU5URVIiLCJ0aXR0ZWwiLCJjbGFzc05hbWUiLCJmb3JyaWdlT25DbGljayIsImNvbmNhdCIsImJlaGFuZGxpbmdJZCIsIm5lc3RlT25DbGljayIsIm1heFdpZHRoU3R5bGUiLCJmZWlsbWVsZGluZyIsInN0ZWciLCJCRUhBTkRMSU5HU1JFU1VMVEFUIiwidmFyaWFudCIsIm1hcCIsImlkZW50IiwiZmFnc2FrVHlwZSIsInNpemUiLCJvbkNsaWNrIiwiaWNvbiIsImRpc2FibGVkIiwibG9hZGluZyIsIm1lc3NhZ2UiLCJlbmRyZXRVdGJldGFsaW5nQW5kZWxlciIsImhlYWRpbmciLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJrb21wZXRhbnNlIiwiYmFybklkZW50ZXIiLCJmb20iLCJza2plbWFlbGVtZW50SWQiLCJ1dGVubGFuZHNrUGVyaW9kZUJlbMO4cCIsInZhbHV0YWt1cnMiLCJpdGVtIiwiSXRlbSIsImhyZWYiLCJfYzUiLCIkUmVmcmVzaFJlZyQiXSwic291cmNlUm9vdCI6IiJ9