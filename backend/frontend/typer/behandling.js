export const MIDLERTIDIG_BEHANDLENDE_ENHET_ID = '4863';
export var HenleggÅrsak;
(function (HenleggÅrsak) {
    HenleggÅrsak["S\u00D8KNAD_TRUKKET"] = "S\u00D8KNAD_TRUKKET";
    HenleggÅrsak["FEILAKTIG_OPPRETTET"] = "FEILAKTIG_OPPRETTET";
    HenleggÅrsak["F\u00D8DSELSHENDELSE_UGYLDIG_UTFALL"] = "F\u00D8DSELSHENDELSE_UGYLDIG_UTFALL";
    HenleggÅrsak["TEKNISK_VEDLIKEHOLD"] = "TEKNISK_VEDLIKEHOLD";
})(HenleggÅrsak || (HenleggÅrsak = {}));
export const henleggÅrsak = {
    SØKNAD_TRUKKET: 'Søknaden er trukket',
    FEILAKTIG_OPPRETTET: 'Behandlingen er feilaktig opprettet',
    FØDSELSHENDELSE_UGYLDIG_UTFALL: 'Automatisk henlagt på grunn av ugyldig utfall fra fødselshendelse',
    TEKNISK_VEDLIKEHOLD: 'Teknisk vedlikehold',
};
export var BehandlingÅrsak;
(function (BehandlingÅrsak) {
    BehandlingÅrsak["S\u00D8KNAD"] = "S\u00D8KNAD";
    BehandlingÅrsak["F\u00D8DSELSHENDELSE"] = "F\u00D8DSELSHENDELSE";
    BehandlingÅrsak["\u00C5RLIG_KONTROLL"] = "\u00C5RLIG_KONTROLL";
    BehandlingÅrsak["D\u00D8DSFALL_BRUKER"] = "D\u00D8DSFALL_BRUKER";
    BehandlingÅrsak["NYE_OPPLYSNINGER"] = "NYE_OPPLYSNINGER";
    BehandlingÅrsak["KLAGE"] = "KLAGE";
    BehandlingÅrsak["TEKNISK_OPPH\u00D8R"] = "TEKNISK_OPPH\u00D8R";
    BehandlingÅrsak["TEKNISK_ENDRING"] = "TEKNISK_ENDRING";
    BehandlingÅrsak["KORREKSJON_VEDTAKSBREV"] = "KORREKSJON_VEDTAKSBREV";
    BehandlingÅrsak["OMREGNING_6\u00C5R"] = "OMREGNING_6\u00C5R";
    BehandlingÅrsak["OMREGNING_18\u00C5R"] = "OMREGNING_18\u00C5R";
    BehandlingÅrsak["SM\u00C5BARNSTILLEGG"] = "SM\u00C5BARNSTILLEGG";
    BehandlingÅrsak["SATSENDRING"] = "SATSENDRING";
    BehandlingÅrsak["MIGRERING"] = "MIGRERING";
    BehandlingÅrsak["ENDRE_MIGRERINGSDATO"] = "ENDRE_MIGRERINGSDATO";
    BehandlingÅrsak["HELMANUELL_MIGRERING"] = "HELMANUELL_MIGRERING";
    BehandlingÅrsak["OMREGNING_SM\u00C5BARNSTILLEGG"] = "OMREGNING_SM\u00C5BARNSTILLEGG";
    BehandlingÅrsak["SM\u00C5BARNSTILLEGG_ENDRING_FRAM_I_TID"] = "SM\u00C5BARNSTILLEGG_ENDRING_FRAM_I_TID";
    BehandlingÅrsak["M\u00C5NEDLIG_VALUTAJUSTERING"] = "M\u00C5NEDLIG_VALUTAJUSTERING";
    BehandlingÅrsak["IVERKSETTE_KA_VEDTAK"] = "IVERKSETTE_KA_VEDTAK";
    BehandlingÅrsak["FINNMARKSTILLEGG"] = "FINNMARKSTILLEGG";
    BehandlingÅrsak["SVALBARDTILLEGG"] = "SVALBARDTILLEGG";
    BehandlingÅrsak["FALSK_IDENTITET"] = "FALSK_IDENTITET";
})(BehandlingÅrsak || (BehandlingÅrsak = {}));
export const behandlingÅrsak = {
    SØKNAD: 'Søknad',
    FØDSELSHENDELSE: 'Fødselshendelse',
    ÅRLIG_KONTROLL: 'Årlig kontroll',
    DØDSFALL_BRUKER: 'Dødsfall bruker',
    NYE_OPPLYSNINGER: 'Nye opplysninger',
    KLAGE: 'Klage',
    TEKNISK_OPPHØR: 'Teknisk opphør',
    TEKNISK_ENDRING: 'Teknisk endring',
    KORREKSJON_VEDTAKSBREV: 'Korrigere vedtak med egen brevmal',
    OMREGNING_6ÅR: 'Omregning 6 år',
    OMREGNING_18ÅR: 'Omregning 18 år',
    OMREGNING_SMÅBARNSTILLEGG: 'Omregning småbarnstillegg',
    SMÅBARNSTILLEGG: 'Småbarnstillegg',
    SMÅBARNSTILLEGG_ENDRING_FRAM_I_TID: 'Småbarnstillegg med endring fram i tid',
    SATSENDRING: 'Satsendring',
    MIGRERING: 'Migrering',
    ENDRE_MIGRERINGSDATO: 'Endre migreringsdato',
    HELMANUELL_MIGRERING: 'Manuell migrering',
    /** De neste er revurderingsårsaker for tilbakekrevingsbehandlinger **/
    REVURDERING_KLAGE_NFP: 'Klage tilbakekreving',
    REVURDERING_KLAGE_KA: 'Klage omgjort av KA',
    REVURDERING_OPPLYSNINGER_OM_VILKÅR: 'Nye opplysninger',
    REVURDERING_OPPLYSNINGER_OM_FORELDELSE: 'Nye opplysninger',
    REVURDERING_FEILUTBETALT_BELØP_HELT_ELLER_DELVIS_BORTFALT: 'Feilutbetalt beløp helt eller delvis bortfalt',
    MÅNEDLIG_VALUTAJUSTERING: 'Månedlig valutajustering',
    IVERKSETTE_KA_VEDTAK: 'Iverksette KA-vedtak',
    FINNMARKSTILLEGG: 'Finnmarkstillegg',
    SVALBARDTILLEGG: 'Svalbardtillegg',
    FALSK_IDENTITET: 'Falsk identitet',
    /** Klage: **/
    ANNET: 'Annet',
    FEIL_ELLER_ENDRET_FAKTA: 'Feil eller endret fakta',
    FEIL_I_LOVANDVENDELSE: 'Feil i lovanvendelse',
    FEIL_PROSESSUELL: 'Prosessuell feil',
    FEIL_REGELVERKSFORSTÅELSE: 'Feil regelverksforståelse',
    IKKE_UTREDET_NOK: 'Ikke utredet nok',
    KØET_BEHANDLING: 'Køet behandling',
};
export var BehandlingSteg;
(function (BehandlingSteg) {
    BehandlingSteg["HENLEGG_BEHANDLING"] = "HENLEGG_BEHANDLING";
    BehandlingSteg["REGISTRERE_INSTITUSJON"] = "REGISTRERE_INSTITUSJON";
    BehandlingSteg["REGISTRERE_S\u00D8KNAD"] = "REGISTRERE_S\u00D8KNAD";
    BehandlingSteg["REGISTRERE_PERSONGRUNNLAG"] = "REGISTRERE_PERSONGRUNNLAG";
    BehandlingSteg["FILTRERING_F\u00D8DSELSHENDELSER"] = "FILTRERING_F\u00D8DSELSHENDELSER";
    BehandlingSteg["VILK\u00C5RSVURDERING"] = "VILK\u00C5RSVURDERING";
    BehandlingSteg["BEHANDLINGSRESULTAT"] = "BEHANDLINGSRESULTAT";
    BehandlingSteg["VURDER_TILBAKEKREVING"] = "VURDER_TILBAKEKREVING";
    BehandlingSteg["SEND_TIL_BESLUTTER"] = "SEND_TIL_BESLUTTER";
    BehandlingSteg["BESLUTTE_VEDTAK"] = "BESLUTTE_VEDTAK";
    BehandlingSteg["IVERKSETT_MOT_OPPDRAG"] = "IVERKSETT_MOT_OPPDRAG";
    BehandlingSteg["VENTE_P\u00C5_STATUS_FRA_\u00D8KONOMI"] = "VENTE_P\u00C5_STATUS_FRA_\u00D8KONOMI";
    BehandlingSteg["JOURNALF\u00D8R_VEDTAKSBREV"] = "JOURNALF\u00D8R_VEDTAKSBREV";
    BehandlingSteg["DISTRIBUER_VEDTAKSBREV"] = "DISTRIBUER_VEDTAKSBREV";
    BehandlingSteg["FERDIGSTILLE_BEHANDLING"] = "FERDIGSTILLE_BEHANDLING";
    BehandlingSteg["BEHANDLING_AVSLUTTET"] = "BEHANDLING_AVSLUTTET";
})(BehandlingSteg || (BehandlingSteg = {}));
export function erPåHenleggbartSteg(steg) {
    return [
        BehandlingSteg.REGISTRERE_SØKNAD,
        BehandlingSteg.REGISTRERE_PERSONGRUNNLAG,
        BehandlingSteg.VILKÅRSVURDERING,
        BehandlingSteg.BEHANDLINGSRESULTAT,
        BehandlingSteg.VURDER_TILBAKEKREVING,
        BehandlingSteg.SEND_TIL_BESLUTTER,
    ].includes(steg);
}
export var BehandlingStegStatus;
(function (BehandlingStegStatus) {
    BehandlingStegStatus["UTF\u00D8RT"] = "UTF\u00D8RT";
    BehandlingStegStatus["IKKE_UTF\u00D8RT"] = "IKKE_UTF\u00D8RT";
})(BehandlingStegStatus || (BehandlingStegStatus = {}));
export const hentStegNummer = (steg) => {
    switch (steg) {
        case BehandlingSteg.REGISTRERE_SØKNAD:
            return 1;
        case BehandlingSteg.REGISTRERE_PERSONGRUNNLAG:
            return 1;
        case BehandlingSteg.FILTRERING_FØDSELSHENDELSER:
            return 2;
        case BehandlingSteg.VILKÅRSVURDERING:
            return 3;
        case BehandlingSteg.BEHANDLINGSRESULTAT:
            return 4;
        case BehandlingSteg.VURDER_TILBAKEKREVING:
            return 5;
        case BehandlingSteg.SEND_TIL_BESLUTTER:
            return 6;
        case BehandlingSteg.BESLUTTE_VEDTAK:
            return 7;
        case BehandlingSteg.IVERKSETT_MOT_OPPDRAG:
            return 8;
        case BehandlingSteg.VENTE_PÅ_STATUS_FRA_ØKONOMI:
            return 9;
        case BehandlingSteg.JOURNALFØR_VEDTAKSBREV:
            return 10;
        case BehandlingSteg.DISTRIBUER_VEDTAKSBREV:
            return 11;
        case BehandlingSteg.FERDIGSTILLE_BEHANDLING:
            return 12;
        case BehandlingSteg.BEHANDLING_AVSLUTTET:
            return 13;
        default:
            return 0;
    }
};
export var BehandlingStatus;
(function (BehandlingStatus) {
    BehandlingStatus["UTREDES"] = "UTREDES";
    BehandlingStatus["SATT_P\u00C5_VENT"] = "SATT_P\u00C5_VENT";
    BehandlingStatus["SATT_P\u00C5_MASKINELL_VENT"] = "SATT_P\u00C5_MASKINELL_VENT";
    BehandlingStatus["FATTER_VEDTAK"] = "FATTER_VEDTAK";
    BehandlingStatus["IVERKSETTER_VEDTAK"] = "IVERKSETTER_VEDTAK";
    BehandlingStatus["AVSLUTTET"] = "AVSLUTTET";
})(BehandlingStatus || (BehandlingStatus = {}));
export var Behandlingstype;
(function (Behandlingstype) {
    Behandlingstype["F\u00D8RSTEGANGSBEHANDLING"] = "F\u00D8RSTEGANGSBEHANDLING";
    Behandlingstype["MIGRERING_FRA_INFOTRYGD"] = "MIGRERING_FRA_INFOTRYGD";
    Behandlingstype["REVURDERING"] = "REVURDERING";
    Behandlingstype["TEKNISK_OPPH\u00D8R"] = "TEKNISK_OPPH\u00D8R";
    Behandlingstype["TEKNISK_ENDRING"] = "TEKNISK_ENDRING";
})(Behandlingstype || (Behandlingstype = {}));
export var BehandlingResultat;
(function (BehandlingResultat) {
    BehandlingResultat["INNVILGET"] = "INNVILGET";
    BehandlingResultat["INNVILGET_OG_OPPH\u00D8RT"] = "INNVILGET_OG_OPPH\u00D8RT";
    BehandlingResultat["INNVILGET_OG_ENDRET"] = "INNVILGET_OG_ENDRET";
    BehandlingResultat["INNVILGET_ENDRET_OG_OPPH\u00D8RT"] = "INNVILGET_ENDRET_OG_OPPH\u00D8RT";
    BehandlingResultat["ENDRET_OG_FORTSATT_INNVILGET"] = "ENDRET_OG_FORTSATT_INNVILGET";
    BehandlingResultat["DELVIS_INNVILGET"] = "DELVIS_INNVILGET";
    BehandlingResultat["DELVIS_INNVILGET_OG_OPPH\u00D8RT"] = "DELVIS_INNVILGET_OG_OPPH\u00D8RT";
    BehandlingResultat["DELVIS_INNVILGET_OG_ENDRET"] = "DELVIS_INNVILGET_OG_ENDRET";
    BehandlingResultat["DELVIS_INNVILGET_ENDRET_OG_OPPH\u00D8RT"] = "DELVIS_INNVILGET_ENDRET_OG_OPPH\u00D8RT";
    BehandlingResultat["AVSL\u00C5TT"] = "AVSL\u00C5TT";
    BehandlingResultat["AVSL\u00C5TT_OG_OPPH\u00D8RT"] = "AVSL\u00C5TT_OG_OPPH\u00D8RT";
    BehandlingResultat["AVSL\u00C5TT_OG_ENDRET"] = "AVSL\u00C5TT_OG_ENDRET";
    BehandlingResultat["AVSL\u00C5TT_ENDRET_OG_OPPH\u00D8RT"] = "AVSL\u00C5TT_ENDRET_OG_OPPH\u00D8RT";
    BehandlingResultat["ENDRET_UTBETALING"] = "ENDRET_UTBETALING";
    BehandlingResultat["ENDRET_UTEN_UTBETALING"] = "ENDRET_UTEN_UTBETALING";
    BehandlingResultat["ENDRET_OG_OPPH\u00D8RT"] = "ENDRET_OG_OPPH\u00D8RT";
    BehandlingResultat["ENDRET_OG_FORTSATT_OPPH\u00D8RT"] = "ENDRET_OG_FORTSATT_OPPH\u00D8RT";
    BehandlingResultat["OPPH\u00D8RT"] = "OPPH\u00D8RT";
    BehandlingResultat["FORTSATT_OPPH\u00D8RT"] = "FORTSATT_OPPH\u00D8RT";
    BehandlingResultat["FORTSATT_INNVILGET"] = "FORTSATT_INNVILGET";
    BehandlingResultat["HENLAGT_FEILAKTIG_OPPRETTET"] = "HENLAGT_FEILAKTIG_OPPRETTET";
    BehandlingResultat["HENLAGT_S\u00D8KNAD_TRUKKET"] = "HENLAGT_S\u00D8KNAD_TRUKKET";
    BehandlingResultat["HENLAGT_AUTOMATISK_F\u00D8DSELSHENDELSE"] = "HENLAGT_AUTOMATISK_F\u00D8DSELSHENDELSE";
    BehandlingResultat["HENLAGT_AUTOMATISK_SM\u00C5BARNSTILLEGG"] = "HENLAGT_AUTOMATISK_SM\u00C5BARNSTILLEGG";
    BehandlingResultat["HENLAGT_TEKNISK_VEDLIKEHOLD"] = "HENLAGT_TEKNISK_VEDLIKEHOLD";
    BehandlingResultat["IKKE_VURDERT"] = "IKKE_VURDERT";
})(BehandlingResultat || (BehandlingResultat = {}));
export const erBehandlingAvslått = (behandlingsResultat) => {
    return [
        BehandlingResultat.AVSLÅTT,
        BehandlingResultat.AVSLÅTT_OG_ENDRET,
        BehandlingResultat.AVSLÅTT_ENDRET_OG_OPPHØRT,
        BehandlingResultat.AVSLÅTT_OG_OPPHØRT,
    ].some(resultat => resultat === behandlingsResultat);
};
export const erBehandlingFortsattInnvilget = (behandlingsResultat) => {
    return behandlingsResultat === BehandlingResultat.FORTSATT_INNVILGET;
};
export const erBehandlingHenlagt = (behandlingsresultat) => {
    return (behandlingsresultat === BehandlingResultat.HENLAGT_FEILAKTIG_OPPRETTET ||
        behandlingsresultat === BehandlingResultat.HENLAGT_SØKNAD_TRUKKET ||
        behandlingsresultat === BehandlingResultat.HENLAGT_AUTOMATISK_FØDSELSHENDELSE ||
        behandlingsresultat === BehandlingResultat.HENLAGT_AUTOMATISK_SMÅBARNSTILLEGG ||
        behandlingsresultat === BehandlingResultat.HENLAGT_TEKNISK_VEDLIKEHOLD);
};
export var BehandlerRolle;
(function (BehandlerRolle) {
    BehandlerRolle[BehandlerRolle["UKJENT"] = 0] = "UKJENT";
    BehandlerRolle[BehandlerRolle["VEILEDER"] = 1] = "VEILEDER";
    BehandlerRolle[BehandlerRolle["SAKSBEHANDLER"] = 2] = "SAKSBEHANDLER";
    BehandlerRolle[BehandlerRolle["BESLUTTER"] = 3] = "BESLUTTER";
    BehandlerRolle[BehandlerRolle["SYSTEM"] = 4] = "SYSTEM";
})(BehandlerRolle || (BehandlerRolle = {}));
export var VurderingsstrategiForValutakurser;
(function (VurderingsstrategiForValutakurser) {
    VurderingsstrategiForValutakurser["MANUELL"] = "MANUELL";
    VurderingsstrategiForValutakurser["AUTOMATISK"] = "AUTOMATISK";
})(VurderingsstrategiForValutakurser || (VurderingsstrategiForValutakurser = {}));
export const behandlerRoller = {
    SYSTEM: { id: 'SYSTEM', navn: 'System' },
    VEILEDER: { id: 'VEILEDER', navn: 'Veileder' },
    SAKSBEHANDLER: { id: 'SAKSBEHANDLER', navn: 'Saksbehandler' },
    BESLUTTER: { id: 'BESLUTTER', navn: 'Beslutter' },
};
export const behandlingstyper = {
    FØRSTEGANGSBEHANDLING: {
        id: 'FØRSTEGANGSBEHANDLING',
        navn: 'Førstegangsbehandling',
    },
    MIGRERING_FRA_INFOTRYGD: {
        id: 'MIGRERING_FRA_INFOTRYGD',
        navn: 'Migrering fra infotrygd',
    },
    MIGRERING_FRA_INFOTRYGD_OPPHØRT: {
        id: 'MIGRERING_FRA_INFOTRYGD',
        navn: 'Opphør migrering fra infotrygd',
    },
    REVURDERING: {
        id: 'REVURDERING',
        navn: 'Revurdering',
    },
    TEKNISK_OPPHØR: {
        id: 'TEKNISK_OPPHØR',
        navn: 'Teknisk opphør',
    },
    TEKNISK_ENDRING: {
        id: 'TEKNISK_ENDRING',
        navn: 'Teknisk endring',
    },
    KLAGE: {
        id: 'KLAGE',
        navn: 'Klage',
    },
    /** Behandlingstyper for tilbakekreving **/
    TILBAKEKREVING: {
        id: 'TILBAKEKREVING',
        navn: 'Tilbakekreving',
    },
    REVURDERING_TILBAKEKREVING: {
        id: 'REVURDERING_TILBAKEKREVING',
        navn: 'Revurdering tilbakekreving',
    },
};
export const behandlingsresultater = {
    INNVILGET: 'Innvilget',
    INNVILGET_OG_OPPHØRT: 'Innvilget og opphørt',
    INNVILGET_OG_ENDRET: 'Innvilget og endret',
    INNVILGET_ENDRET_OG_OPPHØRT: 'Innvilget, endret og opphørt',
    ENDRET_OG_FORTSATT_INNVILGET: 'Endret og fortsatt innvilget',
    DELVIS_INNVILGET: 'Delvis innvilget',
    DELVIS_INNVILGET_OG_OPPHØRT: 'Delvis innvilget og opphørt',
    DELVIS_INNVILGET_OG_ENDRET: 'Delvis innvilget og endret',
    DELVIS_INNVILGET_ENDRET_OG_OPPHØRT: 'Delvis innvilget, endret og opphørt',
    AVSLÅTT: 'Avslått',
    AVSLÅTT_OG_OPPHØRT: 'Avslått og opphørt',
    AVSLÅTT_OG_ENDRET: 'Avslått og endret',
    AVSLÅTT_ENDRET_OG_OPPHØRT: 'Avslått, endret og opphørt',
    ENDRET_UTBETALING: 'Endret',
    ENDRET_UTEN_UTBETALING: 'Endret',
    ENDRET_OG_OPPHØRT: 'Endret og opphørt',
    ENDRET_OG_FORTSATT_OPPHØRT: 'Endret og fortsatt opphørt',
    OPPHØRT: 'Opphørt',
    FORTSATT_OPPHØRT: 'Fortsatt opphørt',
    FORTSATT_INNVILGET: 'Fortsatt innvilget',
    HENLAGT_FEILAKTIG_OPPRETTET: 'Henlagt (feilaktig opprettet)',
    HENLAGT_SØKNAD_TRUKKET: 'Henlagt (søknad trukket)',
    HENLAGT_AUTOMATISK_FØDSELSHENDELSE: 'Henlagt automatisk fødselshendelse',
    HENLAGT_AUTOMATISK_SMÅBARNSTILLEGG: 'Henlagt automatisk småbarnstillegg',
    HENLAGT_TEKNISK_VEDLIKEHOLD: 'Henlagt teknisk vedlikehold',
    IKKE_VURDERT: 'Ikke vurdert',
    /** De neste er resultat for tilbakekrevingsbehandlinger **/
    IKKE_FASTSATT: 'Ikke fastsatt',
    INGEN_TILBAKEBETALING: 'Ingen tilbakebetaling',
    DELVIS_TILBAKEBETALING: 'Delvis tilbakebetaling',
    FULL_TILBAKEBETALING: 'Full tilbakebetaling',
    HENLAGT: 'Henlagt',
    /** For klagebehandlinger: **/
    IKKE_MEDHOLD: 'Oversendt til KA',
    IKKE_MEDHOLD_FORMKRAV_AVVIST: 'Ikke medhold formkrav avvist',
    IKKE_SATT: 'Ikke satt',
    MEDHOLD: 'Medhold',
};
export const behandlingsstatuser = {
    UTREDES: 'Utredes',
    SATT_PÅ_VENT: 'Satt på vent',
    SATT_PÅ_MASKINELL_VENT: 'Satt på maskinell vent',
    FATTER_VEDTAK: 'Fatter vedtak',
    IVERKSETTER_VEDTAK: 'Iverksetter vedtak',
    AVSLUTTET: 'Avsluttet',
    /** For klagebehandlinger: **/
    OPPRETTET: 'Opprettet',
    VENTER: 'Venter',
    FERDIGSTILT: 'Ferdigstilt',
};
export var SettPåVentÅrsak;
(function (SettPåVentÅrsak) {
    SettPåVentÅrsak["AVVENTER_DOKUMENTASJON"] = "AVVENTER_DOKUMENTASJON";
    SettPåVentÅrsak["AVVENTER_SAMTYKKE_ULOVFESTET_MOTREGNING"] = "AVVENTER_SAMTYKKE_ULOVFESTET_MOTREGNING";
})(SettPåVentÅrsak || (SettPåVentÅrsak = {}));
export const settPåVentÅrsaker = {
    AVVENTER_DOKUMENTASJON: 'Avventer dokumentasjon',
    AVVENTER_SAMTYKKE_ULOVFESTET_MOTREGNING: 'Avventer samtykke om ulovfestet motregning etter unntaksregel',
};
export function sjekkErBehandleneEnhetMidlertidig(behandling) {
    return behandling.arbeidsfordelingPåBehandling.behandlendeEnhetId === MIDLERTIDIG_BEHANDLENDE_ENHET_ID;
}
