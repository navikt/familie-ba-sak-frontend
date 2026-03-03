import { behandlingsresultater } from './behandling';
export var KlageÅrsak;
(function (KlageÅrsak) {
    KlageÅrsak["FEIL_I_LOVANDVENDELSE"] = "FEIL_I_LOVANDVENDELSE";
    KlageÅrsak["FEIL_REGELVERKSFORST\u00C5ELSE"] = "FEIL_REGELVERKSFORST\u00C5ELSE";
    KlageÅrsak["FEIL_ELLER_ENDRET_FAKTA"] = "FEIL_ELLER_ENDRET_FAKTA";
    KlageÅrsak["FEIL_PROSESSUELL"] = "FEIL_PROSESSUELL";
    KlageÅrsak["IKKE_UTREDET_NOK"] = "IKKE_UTREDET_NOK";
    KlageÅrsak["K\u00D8ET_BEHANDLING"] = "K\u00D8ET_BEHANDLING";
    KlageÅrsak["ANNET"] = "ANNET";
})(KlageÅrsak || (KlageÅrsak = {}));
export var KlageResultat;
(function (KlageResultat) {
    KlageResultat["MEDHOLD"] = "MEDHOLD";
    KlageResultat["IKKE_MEDHOLD"] = "IKKE_MEDHOLD";
    KlageResultat["IKKE_MEDHOLD_FORMKRAV_AVVIST"] = "IKKE_MEDHOLD_FORMKRAV_AVVIST";
    KlageResultat["IKKE_SATT"] = "IKKE_SATT";
    KlageResultat["HENLAGT"] = "HENLAGT";
})(KlageResultat || (KlageResultat = {}));
export var KlageinstansUtfall;
(function (KlageinstansUtfall) {
    KlageinstansUtfall["TRUKKET"] = "TRUKKET";
    KlageinstansUtfall["RETUR"] = "RETUR";
    KlageinstansUtfall["OPPHEVET"] = "OPPHEVET";
    KlageinstansUtfall["MEDHOLD"] = "MEDHOLD";
    KlageinstansUtfall["DELVIS_MEDHOLD"] = "DELVIS_MEDHOLD";
    KlageinstansUtfall["STADFESTELSE"] = "STADFESTELSE";
    KlageinstansUtfall["UGUNST"] = "UGUNST";
    KlageinstansUtfall["AVVIST"] = "AVVIST";
    KlageinstansUtfall["INNSTILLING_STADFESTELSE"] = "INNSTILLING_STADFESTELSE";
    KlageinstansUtfall["INNSTILLING_AVVIST"] = "INNSTILLING_AVVIST";
})(KlageinstansUtfall || (KlageinstansUtfall = {}));
export var KlageinstansEventType;
(function (KlageinstansEventType) {
    KlageinstansEventType["KLAGEBEHANDLING_AVSLUTTET"] = "KLAGEBEHANDLING_AVSLUTTET";
    KlageinstansEventType["ANKEBEHANDLING_OPPRETTET"] = "ANKEBEHANDLING_OPPRETTET";
    KlageinstansEventType["ANKEBEHANDLING_AVSLUTTET"] = "ANKEBEHANDLING_AVSLUTTET";
    KlageinstansEventType["BEHANDLING_FEILREGISTRERT"] = "BEHANDLING_FEILREGISTRERT";
    KlageinstansEventType["ANKE_I_TRYGDERETTENBEHANDLING_OPPRETTET"] = "ANKE_I_TRYGDERETTENBEHANDLING_OPPRETTET";
})(KlageinstansEventType || (KlageinstansEventType = {}));
export var KlageStatus;
(function (KlageStatus) {
    KlageStatus["OPPRETTET"] = "OPPRETTET";
    KlageStatus["UTREDES"] = "UTREDES";
    KlageStatus["VENTER"] = "VENTER";
    KlageStatus["FERDIGSTILT"] = "FERDIGSTILT";
})(KlageStatus || (KlageStatus = {}));
export var Klagebehandlingstype;
(function (Klagebehandlingstype) {
    Klagebehandlingstype["KLAGE"] = "KLAGE";
})(Klagebehandlingstype || (Klagebehandlingstype = {}));
export const klageinstansUtfallTilTekst = {
    TRUKKET: 'Trukket KA',
    RETUR: 'Retur KA',
    OPPHEVET: 'Opphevet KA',
    MEDHOLD: 'Medhold KA',
    DELVIS_MEDHOLD: 'Delvis medhold KA',
    STADFESTELSE: 'Stadfestelse KA',
    UGUNST: 'Ugunst (Ugyldig) KA',
    AVVIST: 'Avvist KA',
    INNSTILLING_STADFESTELSE: 'Innstilling om stadfestelse til trygderetten fra KA',
    INNSTILLING_AVVIST: 'Innstilling om avist til trygderetten fra KA',
};
export function harAnkeEksistertPåKlagebehandling(behandling) {
    return behandling.klageinstansResultat.some(resultat => resultat.type === KlageinstansEventType.ANKEBEHANDLING_OPPRETTET ||
        resultat.type === KlageinstansEventType.ANKEBEHANDLING_AVSLUTTET ||
        resultat.type === KlageinstansEventType.ANKE_I_TRYGDERETTENBEHANDLING_OPPRETTET);
}
export function erKlageFeilregistrertAvKA(behandling) {
    return behandling.klageinstansResultat.some(resultat => resultat.type == KlageinstansEventType.BEHANDLING_FEILREGISTRERT);
}
function finnAvsluttetKlagebehandlingUtfall(behandling) {
    var _a;
    return (_a = behandling.klageinstansResultat.find(resultat => resultat.utfall && resultat.type === KlageinstansEventType.KLAGEBEHANDLING_AVSLUTTET)) === null || _a === void 0 ? void 0 : _a.utfall;
}
export function utledKlagebehandlingResultattekst(behandling) {
    const klageBehandlingAvsluttetUtfall = finnAvsluttetKlagebehandlingUtfall(behandling);
    if (klageBehandlingAvsluttetUtfall) {
        return klageinstansUtfallTilTekst[klageBehandlingAvsluttetUtfall];
    }
    if (erKlageFeilregistrertAvKA(behandling)) {
        return 'Feilregistrert (KA)';
    }
    if (behandling.resultat) {
        return behandlingsresultater[behandling.resultat];
    }
    return 'Ikke satt';
}
