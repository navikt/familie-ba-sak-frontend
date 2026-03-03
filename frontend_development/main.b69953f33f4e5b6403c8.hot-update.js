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
  }), "test", visFeilmeldinger && !erEøsInformasjonGyldig() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(StyledErrorSummary, {
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
/******/ 	__webpack_require__.h = () => ("0c2196ee6ee43755671d")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5iNjk5NTNmMzNmNGU1YjY0MDNjOC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQStCO0FBQ0c7QUFFUztBQUNKO0FBRVU7QUFDbUM7QUFDYjtBQUVrQjtBQUN4QjtBQUNxQjtBQUNoRDtBQUN3RTtBQUNwQztBQUMyRDtBQUN0RDtBQUN0QjtBQUNMO0FBQ0k7QUFDUTtBQUNFO0FBQ0g7QUFDd0M7QUFDWDtBQUVWO0FBT1I7QUFDYztBQUNaO0FBQ2xCO0FBQ2E7QUFDaEM7QUFFdkMsSUFBTXFDLHFCQUFxQixHQUFHbEMseURBQU0sQ0FBQ21DLEdBQUcsQ0FBQUMsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLHNCQUFBLHdGQUl2QztBQUFDQyxFQUFBLEdBSklKLHFCQUFxQjtBQU0zQixJQUFNSyxjQUFjLEdBQUd2Qyw2REFBTSxDQUFDQywyREFBVSxDQUFDLENBQUF1QyxnQkFBQSxLQUFBQSxnQkFBQSxHQUFBSCxzQkFBQSxrQ0FFeEM7QUFBQ0ksR0FBQSxHQUZJRixjQUFjO0FBSXBCLElBQU1HLFdBQVcsR0FBRzFDLDZEQUFNLENBQUNFLG1EQUFLLENBQUMsQ0FBQXlDLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFOLHNCQUFBLG9DQUVoQztBQUFDTyxHQUFBLEdBRklGLFdBQVc7QUFJakIsSUFBTUcsa0JBQWtCLEdBQUc3Qyw2REFBTSxDQUFDSywwREFBWSxDQUFDLENBQUF5QyxnQkFBQSxLQUFBQSxnQkFBQSxHQUFBVCxzQkFBQSxpQ0FFOUM7QUFBQ1UsR0FBQSxHQUZJRixrQkFBa0I7QUFReEIsSUFBTUcsbUJBQXVFLEdBQUcsU0FBMUVBLG1CQUF1RUEsQ0FBQUMsSUFBQSxFQUEyQjtFQUFBQyxFQUFBO0VBQUEsSUFBQUMscUJBQUEsRUFBQUMscUJBQUEsRUFBQUMsc0JBQUE7RUFBQSxJQUFyQkMsY0FBYyxHQUFBTCxJQUFBLENBQWRLLGNBQWM7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ZS1iYS1zYWstZnJvbnRlbmQvLi9zcmMvZnJvbnRlbmQvc2lkZXIvRmFnc2FrL0JlaGFuZGxpbmcvU2lkZXIvQmVoYW5kbGluZ3NyZXN1bHRhdC9CZWhhbmRsaW5nc3Jlc3VsdGF0LnRzeCIsIndlYnBhY2s6Ly9mYW1pbGllLWJhLXNhay1mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgUGVuY2lsSWNvbiB9IGZyb20gJ0BuYXZpa3QvYWtzZWwtaWNvbnMnO1xuaW1wb3J0IHsgQWxlcnQsIEJ1dHRvbiwgRXJyb3JNZXNzYWdlLCBFcnJvclN1bW1hcnksIExhYmVsIH0gZnJvbSAnQG5hdmlrdC9kcy1yZWFjdCc7XG5pbXBvcnQgeyBieWdnRGF0YVJlc3N1cnMsIFJlc3N1cnNTdGF0dXMgfSBmcm9tICdAbmF2aWt0L2ZhbWlsaWUtdHlwZXInO1xuXG5pbXBvcnQgRW5kcmV0VXRiZXRhbGluZ0FuZGVsVGFiZWxsIGZyb20gJy4vRW5kcmV0VXRiZXRhbGluZy9FbmRyZXRVdGJldGFsaW5nQW5kZWxUYWJlbGwnO1xuaW1wb3J0IEtvbXBldGFuc2VTa2plbWEgZnJvbSAnLi9Fw7hzL0tvbXBldGFuc2UvS29tcGV0YW5zZVNramVtYSc7XG5pbXBvcnQgeyBrb21wZXRhbnNlRmVpbG1lbGRpbmdJZCB9IGZyb20gJy4vRcO4cy9Lb21wZXRhbnNlL3VzZUtvbXBldGFuc2VQZXJpb2RlU2tqZW1hJztcbmltcG9ydCB7IHVzZUXDuHMgfSBmcm9tICcuL0XDuHMvdXNlRcO4cyc7XG5pbXBvcnQgeyB1dGVubGFuZHNrUGVyaW9kZUJlbMO4cEZlaWxtZWxkaW5nSWQgfSBmcm9tICcuL0XDuHMvVXRiZXRhbHRBbm5ldExhbmQvdXNlVXRlbmxhbmRza1BlcmlvZGVCZWzDuHBTa2plbWEnO1xuaW1wb3J0IFV0YmV0YWx0QW5uZXRMYW5kIGZyb20gJy4vRcO4cy9VdGJldGFsdEFubmV0TGFuZC9VdGJldGFsdEFubmV0TGFuZCc7XG5pbXBvcnQgeyB1c2VPcHBkYXRlclZhbHV0YWt1cnNPZ1NpbXVsZXJpbmdQw6VCZXNsdXR0ZXJTdGVnIH0gZnJvbSAnLi9Fw7hzL1ZhbHV0YWt1cnMvdXNlT3BwZGF0ZXJWYWx1dGFrdXJzT2dTaW11bGVyaW5nUMOlQmVzbHV0dGVyU3RlZyc7XG5pbXBvcnQgeyB2YWx1dGFrdXJzRmVpbG1lbGRpbmdJZCB9IGZyb20gJy4vRcO4cy9WYWx1dGFrdXJzL3VzZVZhbHV0YWt1cnNTa2plbWEnO1xuaW1wb3J0IFZhbHV0YWt1cnNlciBmcm9tICcuL0XDuHMvVmFsdXRha3Vycy9WYWx1dGFrdXJzZXInO1xuaW1wb3J0IE1pZ3JlcmluZ0luZm9ib2tzIGZyb20gJy4vTWlncmVyaW5nSW5mb2Jva3MnO1xuaW1wb3J0IHsgT3Bwc3VtbWVyaW5nc2Jva3MgfSBmcm9tICcuL09wcHN1bW1lcmluZ3Nib2tzJztcbmltcG9ydCBUaWxramVudFl0ZWxzZVRpZHNsaW5qZSBmcm9tICcuL1RpbGtqZW50WXRlbHNlVGlkc2xpbmplJztcbmltcG9ydCB7IHVzZUJlaGFuZGxpbmdzcmVzdWx0YXQgfSBmcm9tICcuL3VzZUJlaGFuZGxpbmdzcmVzdWx0YXQnO1xuaW1wb3J0IHsgdXNlRmFnc2FrSWQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9ob29rcy91c2VGYWdzYWtJZCc7XG5pbXBvcnQgeyB1c2VPcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vaG9va3MvdXNlT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbCc7XG5pbXBvcnQgeyB1c2VUaWRzbGluamVDb250ZXh0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4va29tcG9uZW50ZXIvVGlkc2xpbmplL1RpZHNsaW5qZUNvbnRleHQnO1xuaW1wb3J0IHR5cGUgeyBJQmVoYW5kbGluZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL2JlaGFuZGxpbmcnO1xuaW1wb3J0IHsgQmVoYW5kbGluZ1N0ZWcsIEJlaGFuZGxpbmdzdHlwZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL2JlaGFuZGxpbmcnO1xuaW1wb3J0IHtcbiAgICB0eXBlIElSZXN0S29tcGV0YW5zZSxcbiAgICB0eXBlIElSZXN0VXRlbmxhbmRza1BlcmlvZGVCZWzDuHAsXG4gICAgdHlwZSBJUmVzdFZhbHV0YWt1cnMsXG59IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL2XDuHNQZXJpb2Rlcic7XG5pbXBvcnQgdHlwZSB7IFV0YmV0YWxpbmdzcGVyaW9kZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVyL3ZlZHRha3NwZXJpb2RlJztcbmltcG9ydCB7IHBlcmlvZGVPdmVybGFwcGVyTWVkVmFsZ3REYXRvIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvZGF0byc7XG5pbXBvcnQgeyBmb3JtYXRlcklkZW50LCBzbMOlU2FtbWVuTGlzdGVUaWxTdHJlbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9mb3JtYXR0ZXInO1xuaW1wb3J0IHsgaGVudEZyb250ZW5kRmVpbG1lbGRpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9yZXNzdXJzVXRpbHMnO1xuaW1wb3J0IHsgdXNlRmFnc2FrQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uL0ZhZ3Nha0NvbnRleHQnO1xuaW1wb3J0IHsgdXNlQmVoYW5kbGluZ0NvbnRleHQgfSBmcm9tICcuLi8uLi9jb250ZXh0L0JlaGFuZGxpbmdDb250ZXh0JztcbmltcG9ydCBTa2plbWFzdGVnIGZyb20gJy4uL1NramVtYXN0ZWcnO1xuXG5jb25zdCBFbmRyZXRVdGJldGFsaW5nQW5kZWwgPSBzdHlsZWQuZGl2YFxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuYDtcblxuY29uc3QgU3R5bGVkRWRpdElrb24gPSBzdHlsZWQoUGVuY2lsSWNvbilgXG4gICAgZm9udC1zaXplOiAxLjVyZW07XG5gO1xuXG5jb25zdCBTdHlsZWRBbGVydCA9IHN0eWxlZChBbGVydClgXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbmA7XG5cbmNvbnN0IFN0eWxlZEVycm9yU3VtbWFyeSA9IHN0eWxlZChFcnJvclN1bW1hcnkpYFxuICAgIG1hcmdpbi10b3A6IDVyZW07XG5gO1xuXG5pbnRlcmZhY2UgSUJlaGFuZGxpbmdzcmVzdWx0YXRQcm9wcyB7XG4gICAgw6VwZW5CZWhhbmRsaW5nOiBJQmVoYW5kbGluZztcbn1cblxuY29uc3QgQmVoYW5kbGluZ3NyZXN1bHRhdDogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8SUJlaGFuZGxpbmdzcmVzdWx0YXRQcm9wcz4gPSAoeyDDpXBlbkJlaGFuZGxpbmcgfSkgPT4ge1xuICAgIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgICBjb25zdCBmYWdzYWtJZCA9IHVzZUZhZ3Nha0lkKCk7XG4gICAgY29uc3QgeyBmYWdzYWsgfSA9IHVzZUZhZ3Nha0NvbnRleHQoKTtcbiAgICBjb25zdCB7IHNldHTDhXBlbkJlaGFuZGxpbmcgfSA9IHVzZUJlaGFuZGxpbmdDb250ZXh0KCk7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIHZpc0ZlaWxtZWxkaW5nZXIsXG4gICAgICAgIHNldHRWaXNGZWlsbWVsZGluZ2VyLFxuICAgICAgICBoZW50UGVyc29uZXJNZWRVZ3lsZGlnRXR0ZXJiZXRhbGluZ3NwZXJpb2RlLFxuICAgICAgICBwZXJzb25lck1lZFVneWxkaWdFdHRlcmJldGFsaW5nc3BlcmlvZGUsXG4gICAgfSA9IHVzZUJlaGFuZGxpbmdzcmVzdWx0YXQow6VwZW5CZWhhbmRsaW5nKTtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgbXV0YXRlOiBvcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsLFxuICAgICAgICBpc1BlbmRpbmc6IGlzT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbFBlbmRpbmcsXG4gICAgICAgIGlzRXJyb3I6IGlzT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbEVycm9yLFxuICAgICAgICBlcnJvcjogb3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbEVycm9yLFxuICAgIH0gPSB1c2VPcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsKHtcbiAgICAgICAgb25TdWNjZXNzOiAoYmVoYW5kbGluZzogSUJlaGFuZGxpbmcpID0+IHNldHTDhXBlbkJlaGFuZGxpbmcoYnlnZ0RhdGFSZXNzdXJzKGJlaGFuZGxpbmcpKSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHsgYWt0aXZFdGlrZXR0LCBmaWx0ZXJPZ1NvcnRlckFuZGVsUGVyc29uZXJJR3J1bm5sYWcsIGZpbHRlck9nU29ydGVyR3J1bm5sYWdQZXJzb25lck1lZEFuZGVsZXIgfSA9XG4gICAgICAgIHVzZVRpZHNsaW5qZUNvbnRleHQoKTtcblxuICAgIHVzZU9wcGRhdGVyVmFsdXRha3Vyc09nU2ltdWxlcmluZ1DDpUJlc2x1dHRlclN0ZWcoKTtcblxuICAgIGNvbnN0IHsgdnVyZGVyRXJMZXNldmlzbmluZywgYmVoYW5kbGluZ3Jlc3VsdGF0TmVzdGVPbkNsaWNrLCBiZWhhbmRsaW5nc3N0ZWdTdWJtaXRyZXNzdXJzIH0gPVxuICAgICAgICB1c2VCZWhhbmRsaW5nQ29udGV4dCgpO1xuXG4gICAgY29uc3Qge1xuICAgICAgICBlckXDuHNJbmZvcm1hc2pvbkd5bGRpZyxcbiAgICAgICAga29tcGV0YW5zZXIsXG4gICAgICAgIGhlbnRLb21wZXRhbnNlck1lZEZlaWwsXG4gICAgICAgIHV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwLFxuICAgICAgICBlclV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwR3lsZGlnZSxcbiAgICAgICAgaGVudFV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwTWVkRmVpbCxcbiAgICAgICAgdmFsdXRha3Vyc2VyLFxuICAgICAgICBlclZhbHV0YWt1cnNlckd5bGRpZ2UsXG4gICAgICAgIGhlbnRWYWx1dGFrdXJzZXJNZWRGZWlsLFxuICAgIH0gPSB1c2VFw7hzKMOlcGVuQmVoYW5kbGluZyk7XG5cbiAgICBjb25zdCBlckxlc2V2aXNuaW5nID0gdnVyZGVyRXJMZXNldmlzbmluZygpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaGVudFBlcnNvbmVyTWVkVWd5bGRpZ0V0dGVyYmV0YWxpbmdzcGVyaW9kZSgpO1xuICAgIH0sIFvDpXBlbkJlaGFuZGxpbmddKTtcblxuICAgIGNvbnN0IGZpbm5VdGJldGFsaW5nc3BlcmlvZGVGb3JBa3RpdkV0aWtldHQgPSAoXG4gICAgICAgIHV0YmV0YWxpbmdzcGVyaW9kZXI6IFV0YmV0YWxpbmdzcGVyaW9kZVtdXG4gICAgKTogVXRiZXRhbGluZ3NwZXJpb2RlIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgICAgcmV0dXJuIGFrdGl2RXRpa2V0dFxuICAgICAgICAgICAgPyB1dGJldGFsaW5nc3BlcmlvZGVyLmZpbmQoKHV0YmV0YWxpbmdzcGVyaW9kZTogVXRiZXRhbGluZ3NwZXJpb2RlKSA9PlxuICAgICAgICAgICAgICAgICAgcGVyaW9kZU92ZXJsYXBwZXJNZWRWYWxndERhdG8oXG4gICAgICAgICAgICAgICAgICAgICAgdXRiZXRhbGluZ3NwZXJpb2RlLnBlcmlvZGVGb20sXG4gICAgICAgICAgICAgICAgICAgICAgdXRiZXRhbGluZ3NwZXJpb2RlLnBlcmlvZGVUb20sXG4gICAgICAgICAgICAgICAgICAgICAgYWt0aXZFdGlrZXR0LmRhdGVcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfTtcblxuICAgIGNvbnN0IGdydW5ubGFnUGVyc29uZXIgPSBmaWx0ZXJPZ1NvcnRlckdydW5ubGFnUGVyc29uZXJNZWRBbmRlbGVyKFxuICAgICAgICDDpXBlbkJlaGFuZGxpbmcucGVyc29uZXIsXG4gICAgICAgIMOlcGVuQmVoYW5kbGluZy5wZXJzb25lck1lZEFuZGVsZXJUaWxramVudFl0ZWxzZVxuICAgICk7XG5cbiAgICBjb25zdCB0aWRzbGluamVQZXJzb25lciA9IGZpbHRlck9nU29ydGVyQW5kZWxQZXJzb25lcklHcnVubmxhZyhcbiAgICAgICAgZ3J1bm5sYWdQZXJzb25lcixcbiAgICAgICAgw6VwZW5CZWhhbmRsaW5nLnBlcnNvbmVyTWVkQW5kZWxlclRpbGtqZW50WXRlbHNlXG4gICAgKTtcblxuICAgIGNvbnN0IGVyTWlncmVyaW5nRnJhSW5mb3RyeWdkID0gw6VwZW5CZWhhbmRsaW5nLnR5cGUgPT09IEJlaGFuZGxpbmdzdHlwZS5NSUdSRVJJTkdfRlJBX0lORk9UUllHRDtcblxuICAgIGNvbnN0IGhhcktvbXBldGFuc2VyID0gw6VwZW5CZWhhbmRsaW5nLmtvbXBldGFuc2VyPy5sZW5ndGggPiAwO1xuICAgIGNvbnN0IGhhclV0ZW5sYW5kc2tlQmVsw7hwZXIgPSDDpXBlbkJlaGFuZGxpbmcudXRlbmxhbmRza2VQZXJpb2RlYmVsw7hwPy5sZW5ndGggPiAwO1xuICAgIGNvbnN0IGhhclZhbHV0YWt1cnNlciA9IMOlcGVuQmVoYW5kbGluZy51dGVubGFuZHNrZVBlcmlvZGViZWzDuHA/Lmxlbmd0aCA+IDA7XG5cbiAgICBjb25zdCBoYXJFw7hzID0gaGFyS29tcGV0YW5zZXIgfHwgaGFyVXRlbmxhbmRza2VCZWzDuHBlciB8fCBoYXJWYWx1dGFrdXJzZXI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8U2tqZW1hc3RlZ1xuICAgICAgICAgICAgc2VuZGVySW5uPXtiZWhhbmRsaW5nc3N0ZWdTdWJtaXRyZXNzdXJzLnN0YXR1cyA9PT0gUmVzc3Vyc1N0YXR1cy5IRU5URVJ9XG4gICAgICAgICAgICB0aXR0ZWw9XCJCZWhhbmRsaW5nc3Jlc3VsdGF0XCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJlaGFuZGxpbmdzcmVzdWx0YXRcIlxuICAgICAgICAgICAgZm9ycmlnZU9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKGAvZmFnc2FrLyR7ZmFnc2FrSWR9LyR7w6VwZW5CZWhhbmRsaW5nLmJlaGFuZGxpbmdJZH0vdmlsa2FhcnN2dXJkZXJpbmdgKX1cbiAgICAgICAgICAgIG5lc3RlT25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlckxlc2V2aXNuaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlKGAvZmFnc2FrLyR7ZmFnc2FrSWR9LyR7w6VwZW5CZWhhbmRsaW5nLmJlaGFuZGxpbmdJZH0vc2ltdWxlcmluZ2ApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFyRcO4cyAmJiAhZXJFw7hzSW5mb3JtYXNqb25HeWxkaWcoKSkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0VmlzRmVpbG1lbGRpbmdlcih0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBiZWhhbmRsaW5ncmVzdWx0YXROZXN0ZU9uQ2xpY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgbWF4V2lkdGhTdHlsZT17JzgwcmVtJ31cbiAgICAgICAgICAgIGZlaWxtZWxkaW5nPXtoZW50RnJvbnRlbmRGZWlsbWVsZGluZyhiZWhhbmRsaW5nc3N0ZWdTdWJtaXRyZXNzdXJzKX1cbiAgICAgICAgICAgIHN0ZWc9e0JlaGFuZGxpbmdTdGVnLkJFSEFORExJTkdTUkVTVUxUQVR9XG4gICAgICAgID5cbiAgICAgICAgICAgIHtwZXJzb25lck1lZFVneWxkaWdFdHRlcmJldGFsaW5nc3BlcmlvZGUubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPFN0eWxlZEFsZXJ0IHZhcmlhbnQ9eyd3YXJuaW5nJ30+XG4gICAgICAgICAgICAgICAgICAgIER1IGhhciBwZXJpb2RlciBzb20ga2FuIGbDuHJlIHRpbCBldHRlcmJldGFsaW5nIHV0b3ZlciB0cmUgbcOlbmVkZXIgZm9yIHBlcnNvbnsnICd9XG4gICAgICAgICAgICAgICAgICAgIHtzbMOlU2FtbWVuTGlzdGVUaWxTdHJlbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25lck1lZFVneWxkaWdFdHRlcmJldGFsaW5nc3BlcmlvZGUubWFwKGlkZW50ID0+IGZvcm1hdGVySWRlbnQoaWRlbnQpKVxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAuXG4gICAgICAgICAgICAgICAgPC9TdHlsZWRBbGVydD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7ZXJNaWdyZXJpbmdGcmFJbmZvdHJ5Z2QgJiYgPE1pZ3JlcmluZ0luZm9ib2tzIGJlaGFuZGxpbmdJZD17w6VwZW5CZWhhbmRsaW5nLmJlaGFuZGxpbmdJZH0gLz59XG4gICAgICAgICAgICA8VGlsa2plbnRZdGVsc2VUaWRzbGluamVcbiAgICAgICAgICAgICAgICBncnVubmxhZ1BlcnNvbmVyPXtncnVubmxhZ1BlcnNvbmVyfVxuICAgICAgICAgICAgICAgIHRpZHNsaW5qZVBlcnNvbmVyPXt0aWRzbGluamVQZXJzb25lcn1cbiAgICAgICAgICAgICAgICBmYWdzYWtUeXBlPXtmYWdzYWsuZmFnc2FrVHlwZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7IWVyTGVzZXZpc25pbmcgJiYgKFxuICAgICAgICAgICAgICAgIDxFbmRyZXRVdGJldGFsaW5nQW5kZWw+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJ0ZXJ0aWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj17PFN0eWxlZEVkaXRJa29uIC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbFBlbmRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nPXtpc09wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxQZW5kaW5nfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWw+RW5kcmUgdXRiZXRhbGluZ3NwZXJpb2RlPC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIHtpc09wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxFcnJvciAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8RXJyb3JNZXNzYWdlPntvcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsRXJyb3IubWVzc2FnZX08L0Vycm9yTWVzc2FnZT5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L0VuZHJldFV0YmV0YWxpbmdBbmRlbD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7YWt0aXZFdGlrZXR0ICYmIChcbiAgICAgICAgICAgICAgICA8T3Bwc3VtbWVyaW5nc2Jva3NcbiAgICAgICAgICAgICAgICAgICAgdXRiZXRhbGluZ3NwZXJpb2RlPXtmaW5uVXRiZXRhbGluZ3NwZXJpb2RlRm9yQWt0aXZFdGlrZXR0KMOlcGVuQmVoYW5kbGluZy51dGJldGFsaW5nc3BlcmlvZGVyKX1cbiAgICAgICAgICAgICAgICAgICAgYWt0aXZFdGlrZXR0PXtha3RpdkV0aWtldHR9XG4gICAgICAgICAgICAgICAgICAgIGtvbXBldGFuc2VyPXtrb21wZXRhbnNlcn1cbiAgICAgICAgICAgICAgICAgICAgdXRiZXRhbHRBbm5ldExhbmRCZWzDuHA9e3V0YmV0YWx0QW5uZXRMYW5kQmVsw7hwfVxuICAgICAgICAgICAgICAgICAgICB2YWx1dGFrdXJzZXI9e3ZhbHV0YWt1cnNlcn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHvDpXBlbkJlaGFuZGxpbmcuZW5kcmV0VXRiZXRhbGluZ0FuZGVsZXIubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPEVuZHJldFV0YmV0YWxpbmdBbmRlbFRhYmVsbCDDpXBlbkJlaGFuZGxpbmc9e8OlcGVuQmVoYW5kbGluZ30gLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7aGFyS29tcGV0YW5zZXIgJiYgKFxuICAgICAgICAgICAgICAgIDxLb21wZXRhbnNlU2tqZW1hXG4gICAgICAgICAgICAgICAgICAgIGtvbXBldGFuc2VyPXtrb21wZXRhbnNlcn1cbiAgICAgICAgICAgICAgICAgICAgdmlzRmVpbG1lbGRpbmdlcj17dmlzRmVpbG1lbGRpbmdlcn1cbiAgICAgICAgICAgICAgICAgICAgw6VwZW5CZWhhbmRsaW5nPXvDpXBlbkJlaGFuZGxpbmd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7aGFyVXRlbmxhbmRza2VCZWzDuHBlciAmJiAoXG4gICAgICAgICAgICAgICAgPFV0YmV0YWx0QW5uZXRMYW5kXG4gICAgICAgICAgICAgICAgICAgIHV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwPXt1dGJldGFsdEFubmV0TGFuZEJlbMO4cH1cbiAgICAgICAgICAgICAgICAgICAgZXJVdGJldGFsdEFubmV0TGFuZEJlbMO4cEd5bGRpZ2U9e2VyVXRiZXRhbHRBbm5ldExhbmRCZWzDuHBHeWxkaWdlfVxuICAgICAgICAgICAgICAgICAgICB2aXNGZWlsbWVsZGluZ2VyPXt2aXNGZWlsbWVsZGluZ2VyfVxuICAgICAgICAgICAgICAgICAgICDDpXBlbkJlaGFuZGxpbmc9e8OlcGVuQmVoYW5kbGluZ31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtoYXJWYWx1dGFrdXJzZXIgJiYgKFxuICAgICAgICAgICAgICAgIDxWYWx1dGFrdXJzZXJcbiAgICAgICAgICAgICAgICAgICAgdmFsdXRha3Vyc2VyPXt2YWx1dGFrdXJzZXJ9XG4gICAgICAgICAgICAgICAgICAgIGVyVmFsdXRha3Vyc2VyR3lsZGlnZT17ZXJWYWx1dGFrdXJzZXJHeWxkaWdlfVxuICAgICAgICAgICAgICAgICAgICB2aXNGZWlsbWVsZGluZ2VyPXt2aXNGZWlsbWVsZGluZ2VyfVxuICAgICAgICAgICAgICAgICAgICDDpXBlbkJlaGFuZGxpbmc9e8OlcGVuQmVoYW5kbGluZ31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHRlc3RcbiAgICAgICAgICAgIHt2aXNGZWlsbWVsZGluZ2VyICYmICFlckXDuHNJbmZvcm1hc2pvbkd5bGRpZygpICYmIChcbiAgICAgICAgICAgICAgICA8U3R5bGVkRXJyb3JTdW1tYXJ5IGhlYWRpbmc9eydGb3Igw6UgZ8OlIHZpZGVyZSBtw6UgZHUgcmV0dGUgb3BwIGbDuGxnZW5kZTonfT5cbiAgICAgICAgICAgICAgICAgICAge1tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmhlbnRLb21wZXRhbnNlck1lZEZlaWwoKS5tYXAoKGtvbXBldGFuc2U6IElSZXN0S29tcGV0YW5zZSkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWlsbWVsZGluZzogYEtvbXBldGFuc2UgYmFybjogJHtrb21wZXRhbnNlLmJhcm5JZGVudGVyfSwgZi5vLm0uOiAke2tvbXBldGFuc2UuZm9tfSBlciBpa2tlIGZ1bGxzdGVuZGlnLmAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tqZW1hZWxlbWVudElkOiBrb21wZXRhbnNlRmVpbG1lbGRpbmdJZChrb21wZXRhbnNlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmhlbnRVdGJldGFsdEFubmV0TGFuZEJlbMO4cE1lZEZlaWwoKS5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHV0ZW5sYW5kc2tQZXJpb2RlQmVsw7hwOiBJUmVzdFV0ZW5sYW5kc2tQZXJpb2RlQmVsw7hwKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWlsbWVsZGluZzogYFV0ZW5sYW5kc2sgYmVsw7hwIGJhcm46ICR7dXRlbmxhbmRza1BlcmlvZGVCZWzDuHAuYmFybklkZW50ZXJ9LCBmLm8ubS46ICR7dXRlbmxhbmRza1BlcmlvZGVCZWzDuHAuZm9tfSBlciBpa2tlIGZ1bGxzdGVuZGlnLmAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNramVtYWVsZW1lbnRJZDogdXRlbmxhbmRza1BlcmlvZGVCZWzDuHBGZWlsbWVsZGluZ0lkKHV0ZW5sYW5kc2tQZXJpb2RlQmVsw7hwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmhlbnRWYWx1dGFrdXJzZXJNZWRGZWlsKCkubWFwKCh2YWx1dGFrdXJzOiBJUmVzdFZhbHV0YWt1cnMpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVpbG1lbGRpbmc6IGBWYWx1dGFrdXJzIGJhcm46ICR7dmFsdXRha3Vycy5iYXJuSWRlbnRlcn0sIGYuby5tLjogJHt2YWx1dGFrdXJzLmZvbX0gZXIgaWtrZSBmdWxsc3RlbmRpZy5gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNramVtYWVsZW1lbnRJZDogdmFsdXRha3Vyc0ZlaWxtZWxkaW5nSWQodmFsdXRha3VycyksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgICAgIF0ubWFwKGl0ZW0gPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEVycm9yU3VtbWFyeS5JdGVtIGhyZWY9e2AjJHtpdGVtLnNramVtYWVsZW1lbnRJZH1gfT57aXRlbS5mZWlsbWVsZGluZ308L0Vycm9yU3VtbWFyeS5JdGVtPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L1N0eWxlZEVycm9yU3VtbWFyeT5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB0ZXN0XG4gICAgICAgIDwvU2tqZW1hc3RlZz5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQmVoYW5kbGluZ3NyZXN1bHRhdDtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjBjMjE5NmVlNmVlNDM3NTU2NzFkXCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlTmF2aWdhdGUiLCJzdHlsZWQiLCJQZW5jaWxJY29uIiwiQWxlcnQiLCJCdXR0b24iLCJFcnJvck1lc3NhZ2UiLCJFcnJvclN1bW1hcnkiLCJMYWJlbCIsImJ5Z2dEYXRhUmVzc3VycyIsIlJlc3N1cnNTdGF0dXMiLCJFbmRyZXRVdGJldGFsaW5nQW5kZWxUYWJlbGwiLCJLb21wZXRhbnNlU2tqZW1hIiwia29tcGV0YW5zZUZlaWxtZWxkaW5nSWQiLCJ1c2VFw7hzIiwidXRlbmxhbmRza1BlcmlvZGVCZWzDuHBGZWlsbWVsZGluZ0lkIiwiVXRiZXRhbHRBbm5ldExhbmQiLCJ1c2VPcHBkYXRlclZhbHV0YWt1cnNPZ1NpbXVsZXJpbmdQw6VCZXNsdXR0ZXJTdGVnIiwidmFsdXRha3Vyc0ZlaWxtZWxkaW5nSWQiLCJWYWx1dGFrdXJzZXIiLCJNaWdyZXJpbmdJbmZvYm9rcyIsIk9wcHN1bW1lcmluZ3Nib2tzIiwiVGlsa2plbnRZdGVsc2VUaWRzbGluamUiLCJ1c2VCZWhhbmRsaW5nc3Jlc3VsdGF0IiwidXNlRmFnc2FrSWQiLCJ1c2VPcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsIiwidXNlVGlkc2xpbmplQ29udGV4dCIsIkJlaGFuZGxpbmdTdGVnIiwiQmVoYW5kbGluZ3N0eXBlIiwicGVyaW9kZU92ZXJsYXBwZXJNZWRWYWxndERhdG8iLCJmb3JtYXRlcklkZW50Iiwic2zDpVNhbW1lbkxpc3RlVGlsU3RyZW5nIiwiaGVudEZyb250ZW5kRmVpbG1lbGRpbmciLCJ1c2VGYWdzYWtDb250ZXh0IiwidXNlQmVoYW5kbGluZ0NvbnRleHQiLCJTa2plbWFzdGVnIiwiRW5kcmV0VXRiZXRhbGluZ0FuZGVsIiwiZGl2IiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbCIsIl9jIiwiU3R5bGVkRWRpdElrb24iLCJfdGVtcGxhdGVPYmplY3QyIiwiX2MyIiwiU3R5bGVkQWxlcnQiLCJfdGVtcGxhdGVPYmplY3QzIiwiX2MzIiwiU3R5bGVkRXJyb3JTdW1tYXJ5IiwiX3RlbXBsYXRlT2JqZWN0NCIsIl9jNCIsIkJlaGFuZGxpbmdzcmVzdWx0YXQiLCJfcmVmIiwiX3MiLCJfw6VwZW5CZWhhbmRsaW5nJGtvbXBlIiwiX8OlcGVuQmVoYW5kbGluZyR1dGVubCIsIl/DpXBlbkJlaGFuZGxpbmckdXRlbmwyIiwiw6VwZW5CZWhhbmRsaW5nIiwibmF2aWdhdGUiLCJmYWdzYWtJZCIsIl91c2VGYWdzYWtDb250ZXh0IiwiZmFnc2FrIiwiX3VzZUJlaGFuZGxpbmdDb250ZXh0Iiwic2V0dMOFcGVuQmVoYW5kbGluZyIsIl91c2VCZWhhbmRsaW5nc3Jlc3VsdCIsInZpc0ZlaWxtZWxkaW5nZXIiLCJzZXR0VmlzRmVpbG1lbGRpbmdlciIsImhlbnRQZXJzb25lck1lZFVneWxkaWdFdHRlcmJldGFsaW5nc3BlcmlvZGUiLCJwZXJzb25lck1lZFVneWxkaWdFdHRlcmJldGFsaW5nc3BlcmlvZGUiLCJfdXNlT3BwcmV0dEVuZHJldFV0YmUiLCJvblN1Y2Nlc3MiLCJiZWhhbmRsaW5nIiwib3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbCIsIm11dGF0ZSIsImlzT3BwcmV0dEVuZHJldFV0YmV0YWxpbmdBbmRlbFBlbmRpbmciLCJpc1BlbmRpbmciLCJpc09wcHJldHRFbmRyZXRVdGJldGFsaW5nQW5kZWxFcnJvciIsImlzRXJyb3IiLCJvcHByZXR0RW5kcmV0VXRiZXRhbGluZ0FuZGVsRXJyb3IiLCJlcnJvciIsIl91c2VUaWRzbGluamVDb250ZXh0IiwiYWt0aXZFdGlrZXR0IiwiZmlsdGVyT2dTb3J0ZXJBbmRlbFBlcnNvbmVySUdydW5ubGFnIiwiZmlsdGVyT2dTb3J0ZXJHcnVubmxhZ1BlcnNvbmVyTWVkQW5kZWxlciIsIl91c2VCZWhhbmRsaW5nQ29udGV4dDIiLCJ2dXJkZXJFckxlc2V2aXNuaW5nIiwiYmVoYW5kbGluZ3Jlc3VsdGF0TmVzdGVPbkNsaWNrIiwiYmVoYW5kbGluZ3NzdGVnU3VibWl0cmVzc3VycyIsIl91c2VFw7hzIiwiZXJFw7hzSW5mb3JtYXNqb25HeWxkaWciLCJrb21wZXRhbnNlciIsImhlbnRLb21wZXRhbnNlck1lZEZlaWwiLCJ1dGJldGFsdEFubmV0TGFuZEJlbMO4cCIsImVyVXRiZXRhbHRBbm5ldExhbmRCZWzDuHBHeWxkaWdlIiwiaGVudFV0YmV0YWx0QW5uZXRMYW5kQmVsw7hwTWVkRmVpbCIsInZhbHV0YWt1cnNlciIsImVyVmFsdXRha3Vyc2VyR3lsZGlnZSIsImhlbnRWYWx1dGFrdXJzZXJNZWRGZWlsIiwiZXJMZXNldmlzbmluZyIsImZpbm5VdGJldGFsaW5nc3BlcmlvZGVGb3JBa3RpdkV0aWtldHQiLCJ1dGJldGFsaW5nc3BlcmlvZGVyIiwiZmluZCIsInV0YmV0YWxpbmdzcGVyaW9kZSIsInBlcmlvZGVGb20iLCJwZXJpb2RlVG9tIiwiZGF0ZSIsInVuZGVmaW5lZCIsImdydW5ubGFnUGVyc29uZXIiLCJwZXJzb25lciIsInBlcnNvbmVyTWVkQW5kZWxlclRpbGtqZW50WXRlbHNlIiwidGlkc2xpbmplUGVyc29uZXIiLCJlck1pZ3JlcmluZ0ZyYUluZm90cnlnZCIsInR5cGUiLCJNSUdSRVJJTkdfRlJBX0lORk9UUllHRCIsImhhcktvbXBldGFuc2VyIiwibGVuZ3RoIiwiaGFyVXRlbmxhbmRza2VCZWzDuHBlciIsInV0ZW5sYW5kc2tlUGVyaW9kZWJlbMO4cCIsImhhclZhbHV0YWt1cnNlciIsImhhckXDuHMiLCJjcmVhdGVFbGVtZW50Iiwic2VuZGVySW5uIiwic3RhdHVzIiwiSEVOVEVSIiwidGl0dGVsIiwiY2xhc3NOYW1lIiwiZm9ycmlnZU9uQ2xpY2siLCJjb25jYXQiLCJiZWhhbmRsaW5nSWQiLCJuZXN0ZU9uQ2xpY2siLCJtYXhXaWR0aFN0eWxlIiwiZmVpbG1lbGRpbmciLCJzdGVnIiwiQkVIQU5ETElOR1NSRVNVTFRBVCIsInZhcmlhbnQiLCJtYXAiLCJpZGVudCIsImZhZ3Nha1R5cGUiLCJzaXplIiwib25DbGljayIsImljb24iLCJkaXNhYmxlZCIsImxvYWRpbmciLCJtZXNzYWdlIiwiZW5kcmV0VXRiZXRhbGluZ0FuZGVsZXIiLCJoZWFkaW5nIiwiX3RvQ29uc3VtYWJsZUFycmF5Iiwia29tcGV0YW5zZSIsImJhcm5JZGVudGVyIiwiZm9tIiwic2tqZW1hZWxlbWVudElkIiwidXRlbmxhbmRza1BlcmlvZGVCZWzDuHAiLCJ2YWx1dGFrdXJzIiwiaXRlbSIsIkl0ZW0iLCJocmVmIiwiX2M1IiwiJFJlZnJlc2hSZWckIl0sInNvdXJjZVJvb3QiOiIifQ==