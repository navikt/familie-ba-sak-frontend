"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BehandlingKategori;
(function (BehandlingKategori) {
    BehandlingKategori["NASJONAL"] = "NASJONAL";
    BehandlingKategori["E\u00D8S"] = "E\u00D8S";
})(BehandlingKategori = exports.BehandlingKategori || (exports.BehandlingKategori = {}));
var BehandlingUnderkategori;
(function (BehandlingUnderkategori) {
    BehandlingUnderkategori["ORDIN\u00C6R"] = "ORDIN\u00C6R";
    BehandlingUnderkategori["UTVIDET"] = "UTVIDET";
})(BehandlingUnderkategori = exports.BehandlingUnderkategori || (exports.BehandlingUnderkategori = {}));
var BehandlingSteg;
(function (BehandlingSteg) {
    BehandlingSteg[BehandlingSteg["REGISTRERE_S\u00D8KNAD"] = 1] = "REGISTRERE_S\u00D8KNAD";
    BehandlingSteg[BehandlingSteg["REGISTRERE_PERSONGRUNNLAG"] = 1] = "REGISTRERE_PERSONGRUNNLAG";
    BehandlingSteg[BehandlingSteg["VILK\u00C5RSVURDERING"] = 2] = "VILK\u00C5RSVURDERING";
    BehandlingSteg[BehandlingSteg["SEND_TIL_BESLUTTER"] = 3] = "SEND_TIL_BESLUTTER";
    BehandlingSteg[BehandlingSteg["GODKJENNE_VEDTAK"] = 4] = "GODKJENNE_VEDTAK";
    BehandlingSteg[BehandlingSteg["FERDIGSTILLE_BEHANDLING"] = 5] = "FERDIGSTILLE_BEHANDLING";
    BehandlingSteg[BehandlingSteg["BEHANDLING_AVSLUTTET"] = 6] = "BEHANDLING_AVSLUTTET";
})(BehandlingSteg = exports.BehandlingSteg || (exports.BehandlingSteg = {}));
var BehandlingStatus;
(function (BehandlingStatus) {
    BehandlingStatus["OPPRETTET"] = "OPPRETTET";
    BehandlingStatus["UNDER_BEHANDLING"] = "UNDER_BEHANDLING";
    BehandlingStatus["SENDT_TIL_BESLUTTER"] = "SENDT_TIL_BESLUTTER";
    BehandlingStatus["GODKJENT"] = "GODKJENT";
    BehandlingStatus["LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG"] = "LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG";
    BehandlingStatus["SENDT_TIL_IVERKSETTING"] = "SENDT_TIL_IVERKSETTING";
    BehandlingStatus["IVERKSATT"] = "IVERKSATT";
    BehandlingStatus["FERDIGSTILT"] = "FERDIGSTILT";
})(BehandlingStatus = exports.BehandlingStatus || (exports.BehandlingStatus = {}));
var Behandlingstype;
(function (Behandlingstype) {
    Behandlingstype["F\u00D8RSTEGANGSBEHANDLING"] = "F\u00D8RSTEGANGSBEHANDLING";
    Behandlingstype["MIGRERING_FRA_INFOTRYGD"] = "MIGRERING_FRA_INFOTRYGD";
    Behandlingstype["REVURDERING"] = "REVURDERING";
})(Behandlingstype = exports.Behandlingstype || (exports.Behandlingstype = {}));
var BehandlingResultat;
(function (BehandlingResultat) {
    BehandlingResultat["AVSL\u00C5TT"] = "AVSL\u00C5TT";
    BehandlingResultat["IKKE_VURDERT"] = "IKKE_VURDERT";
    BehandlingResultat["INNVILGET"] = "INNVILGET";
    BehandlingResultat["OPPH\u00D8RT"] = "OPPH\u00D8RT";
})(BehandlingResultat = exports.BehandlingResultat || (exports.BehandlingResultat = {}));
var BehandlerRolle;
(function (BehandlerRolle) {
    BehandlerRolle[BehandlerRolle["SYSTEM"] = 0] = "SYSTEM";
    BehandlerRolle[BehandlerRolle["SAKSBEHANDLER"] = 1] = "SAKSBEHANDLER";
    BehandlerRolle[BehandlerRolle["BESLUTTER"] = 2] = "BESLUTTER";
})(BehandlerRolle = exports.BehandlerRolle || (exports.BehandlerRolle = {}));
exports.behandlingstyper = {
    FØRSTEGANGSBEHANDLING: {
        id: 'FØRSTEGANGSBEHANDLING',
        navn: 'Førstegangsbehandling',
    },
    MIGRERING_FRA_INFOTRYGD: {
        id: 'MIGRERING_FRA_INFOTRYGD',
        navn: 'Migrering fra infotrygd',
    },
    REVURDERING: {
        id: 'REVURDERING',
        navn: 'Revurdering',
    },
};
exports.kategorier = {
    NASJONAL: {
        id: 'NASJONAL',
        navn: 'Nasjonal',
    },
    EØS: {
        id: 'EØS',
        navn: 'EØS',
    },
};
exports.underkategorier = {
    ORDINÆR: {
        id: 'ORDINÆR',
        navn: 'Ordinær barnetrygd',
    },
    UTVIDET: {
        id: 'UTVIDET',
        navn: 'Utvidet barnetrygd',
    },
};
exports.behandlingsresultater = {
    INNVILGET: { id: 'INNVILGET', navn: 'Innvilget' },
    AVSLÅTT: { id: 'AVSLÅTT', navn: 'Avslått' },
    OPPHØRT: { id: 'OPPHØRT', navn: 'Opphørt' },
};
exports.behandlingsstatuser = {
    OPPRETTET: { id: 'OPPRETTET', navn: 'Opprettet' },
    UNDER_BEHANDLING: { id: 'UNDER_BEHANDLING', navn: 'Under behandling' },
    SENDT_TIL_BESLUTTER: { id: 'SENDT_TIL_BESLUTTER', navn: 'Sendt til beslutter' },
    GODKJENT: { id: 'GODKJENT', navn: 'Godkjent' },
    LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG: {
        id: 'LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG',
        navn: 'Lagt på kø for sending mot oppdrag',
    },
    SENDT_TIL_IVERKSETTING: { id: 'SENDT_TIL_IVERKSETTING', navn: 'Sendt til iverksetting' },
    IVERKSATT: { id: 'IVERKSATT', navn: 'Iverksatt' },
    FERDIGSTILT: { id: 'FERDIGSTILT', navn: 'Ferdigstilt' },
};
//# sourceMappingURL=behandling.js.map