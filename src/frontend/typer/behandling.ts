import type { ISODateString } from '@navikt/familie-form-elements';

import type { BehandlingKategori, BehandlingUnderkategori } from './behandlingstema';
import type { IPersonMedAndelerTilkjentYtelse } from './beregning';
import type { INøkkelPar } from './common';
import type { IRestValutakurs } from './eøsPerioder';
import type { IRestKompetanse, IRestUtenlandskPeriodeBeløp } from './eøsPerioder';
import type { IFødselshendelsefiltreringResultat } from './fødselshendelser';
import type { IVerge } from './institusjon-og-verge';
import type { IGrunnlagPerson } from './person';
import type { ITilbakekreving } from './simulering';
import type { ISøknadDTO } from './søknad';
import type {
    TilbakekrevingsbehandlingResultat,
    TilbakekrevingsbehandlingÅrsak,
} from './tilbakekrevingsbehandling';
import type { ITotrinnskontroll } from './totrinnskontroll';
import type { IRestEndretUtbetalingAndel } from './utbetalingAndel';
import type { IRestKorrigertEtterbetaling, IVedtakForBehandling } from './vedtak';
import type { Utbetalingsperiode } from './vedtaksperiode';
import type { IRestPersonResultat, IRestStegTilstand } from './vilkår';

export interface IRestNyBehandling {
    kategori: BehandlingKategori | null;
    underkategori: BehandlingUnderkategori | null;
    søkersIdent: string;
    behandlingType: Behandlingstype;
    journalpostID?: string;
    behandlingÅrsak?: BehandlingÅrsak;
    skalBehandlesAutomatisk?: boolean;
    navIdent?: string;
    barnasIdenter?: string[];
}

export enum HenleggÅrsak {
    SØKNAD_TRUKKET = 'SØKNAD_TRUKKET',
    FEILAKTIG_OPPRETTET = 'FEILAKTIG_OPPRETTET',
    FØDSELSHENDELSE_UGYLDIG_UTFALL = 'FØDSELSHENDELSE_UGYLDIG_UTFALL',
    TEKNISK_VEDLIKEHOLD = 'TEKNISK_VEDLIKEHOLD',
}

export const henleggÅrsak: Record<HenleggÅrsak, string> = {
    SØKNAD_TRUKKET: 'Søknaden er trukket',
    FEILAKTIG_OPPRETTET: 'Behandlingen er feilaktig opprettet',
    FØDSELSHENDELSE_UGYLDIG_UTFALL:
        'Automatisk henlagt på grunn av ugyldig utfall fra fødselshendelse',
    TEKNISK_VEDLIKEHOLD: 'Teknisk vedlikehold',
};

export enum BehandlingÅrsak {
    SØKNAD = 'SØKNAD',
    FØDSELSHENDELSE = 'FØDSELSHENDELSE',
    ÅRLIG_KONTROLL = 'ÅRLIG_KONTROLL',
    DØDSFALL_BRUKER = 'DØDSFALL_BRUKER',
    NYE_OPPLYSNINGER = 'NYE_OPPLYSNINGER',
    KLAGE = 'KLAGE',
    TEKNISK_OPPHØR = 'TEKNISK_OPPHØR',
    TEKNISK_ENDRING = 'TEKNISK_ENDRING',
    KORREKSJON_VEDTAKSBREV = 'KORREKSJON_VEDTAKSBREV',
    OMREGNING_6ÅR = 'OMREGNING_6ÅR',
    OMREGNING_18ÅR = 'OMREGNING_18ÅR',
    SMÅBARNSTILLEGG = 'SMÅBARNSTILLEGG',
    SATSENDRING = 'SATSENDRING',
    MIGRERING = 'MIGRERING',
    ENDRE_MIGRERINGSDATO = 'ENDRE_MIGRERINGSDATO',
    HELMANUELL_MIGRERING = 'HELMANUELL_MIGRERING',
    OMREGNING_SMÅBARNSTILLEGG = 'OMREGNING_SMÅBARNSTILLEGG',
}

export const behandlingÅrsak: Record<BehandlingÅrsak | TilbakekrevingsbehandlingÅrsak, string> = {
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
    SATSENDRING: 'Satsendring',
    MIGRERING: 'Migrering',
    ENDRE_MIGRERINGSDATO: 'Endre migreringsdato',
    HELMANUELL_MIGRERING: 'Manuell migrering',
    /** De neste er revurderingsårsaker for tilbakekrevingsbehandlinger **/
    REVURDERING_KLAGE_NFP: 'Klage tilbakekreving',
    REVURDERING_KLAGE_KA: 'Klage omgjort av KA',
    REVURDERING_OPPLYSNINGER_OM_VILKÅR: 'Nye opplysninger',
    REVURDERING_OPPLYSNINGER_OM_FORELDELSE: 'Nye opplysninger',
    REVURDERING_FEILUTBETALT_BELØP_HELT_ELLER_DELVIS_BORTFALT:
        'Feilutbetalt beløp helt eller delvis bortfalt',
};

export enum BehandlingSteg {
    HENLEGG_BEHANDLING = 'HENLEGG_BEHANDLING',
    REGISTRERE_INSTITUSJON_OG_VERGE = 'REGISTRERE_INSTITUSJON_OG_VERGE',
    REGISTRERE_SØKNAD = 'REGISTRERE_SØKNAD',
    REGISTRERE_PERSONGRUNNLAG = 'REGISTRERE_PERSONGRUNNLAG',
    FILTRERING_FØDSELSHENDELSER = 'FILTRERING_FØDSELSHENDELSER',
    VILKÅRSVURDERING = 'VILKÅRSVURDERING',
    BEHANDLINGSRESULTAT = 'BEHANDLINGSRESULTAT',
    VURDER_TILBAKEKREVING = 'VURDER_TILBAKEKREVING',
    SEND_TIL_BESLUTTER = 'SEND_TIL_BESLUTTER',
    BESLUTTE_VEDTAK = 'BESLUTTE_VEDTAK',
    IVERKSETT_MOT_OPPDRAG = 'IVERKSETT_MOT_OPPDRAG',
    VENTE_PÅ_STATUS_FRA_ØKONOMI = 'VENTE_PÅ_STATUS_FRA_ØKONOMI',
    JOURNALFØR_VEDTAKSBREV = 'JOURNALFØR_VEDTAKSBREV',
    DISTRIBUER_VEDTAKSBREV = 'DISTRIBUER_VEDTAKSBREV',
    FERDIGSTILLE_BEHANDLING = 'FERDIGSTILLE_BEHANDLING',
    BEHANDLING_AVSLUTTET = 'BEHANDLING_AVSLUTTET',
}

export enum BehandlingStegStatus {
    UTFØRT = 'UTFØRT',
    IKKE_UTFØRT = 'IKKE_UTFØRT',
}

export const hentStegNummer = (steg: BehandlingSteg): number => {
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

export enum BehandlingStatus {
    OPPRETTET = 'OPPRETTET',
    UTREDES = 'UTREDES',
    FATTER_VEDTAK = 'FATTER_VEDTAK',
    IVERKSETTER_VEDTAK = 'IVERKSETTER_VEDTAK',
    AVSLUTTET = 'AVSLUTTET',
}

export enum Behandlingstype {
    FØRSTEGANGSBEHANDLING = 'FØRSTEGANGSBEHANDLING',
    MIGRERING_FRA_INFOTRYGD = 'MIGRERING_FRA_INFOTRYGD',
    REVURDERING = 'REVURDERING',
    TEKNISK_OPPHØR = 'TEKNISK_OPPHØR',
    TEKNISK_ENDRING = 'TEKNISK_ENDRING',
}

export enum BehandlingResultat {
    INNVILGET = 'INNVILGET',
    INNVILGET_OG_OPPHØRT = 'INNVILGET_OG_OPPHØRT',
    INNVILGET_OG_ENDRET = 'INNVILGET_OG_ENDRET',
    INNVILGET_ENDRET_OG_OPPHØRT = 'INNVILGET_ENDRET_OG_OPPHØRT',
    DELVIS_INNVILGET = 'DELVIS_INNVILGET',
    DELVIS_INNVILGET_OG_OPPHØRT = 'DELVIS_INNVILGET_OG_OPPHØRT',
    DELVIS_INNVILGET_OG_ENDRET = 'DELVIS_INNVILGET_OG_ENDRET',
    DELVIS_INNVILGET_ENDRET_OG_OPPHØRT = 'DELVIS_INNVILGET_ENDRET_OG_OPPHØRT',
    AVSLÅTT = 'AVSLÅTT',
    AVSLÅTT_OG_OPPHØRT = 'AVSLÅTT_OG_OPPHØRT',
    AVSLÅTT_OG_ENDRET = 'AVSLÅTT_OG_ENDRET',
    AVSLÅTT_ENDRET_OG_OPPHØRT = 'AVSLÅTT_ENDRET_OG_OPPHØRT',
    ENDRET_UTBETALING = 'ENDRET_UTBETALING',
    ENDRET_UTEN_UTBETALING = 'ENDRET_UTEN_UTBETALING',
    ENDRET_OG_OPPHØRT = 'ENDRET_OG_OPPHØRT',
    OPPHØRT = 'OPPHØRT',
    FORTSATT_OPPHØRT = 'FORTSATT_OPPHØRT',
    FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
    HENLAGT_FEILAKTIG_OPPRETTET = 'HENLAGT_FEILAKTIG_OPPRETTET',
    HENLAGT_SØKNAD_TRUKKET = 'HENLAGT_SØKNAD_TRUKKET',
    IKKE_VURDERT = 'IKKE_VURDERT',
    HENLAGT_AUTOMATISK_FØDSELSHENDELSE = 'HENLAGT_AUTOMATISK_FØDSELSHENDELSE',
    HENLAGT_TEKNISK_VEDLIKEHOLD = 'HENLAGT_TEKNISK_VEDLIKEHOLD',
}

export const erBehandlingHenlagt = (behandlingsresultat?: BehandlingResultat) => {
    return (
        behandlingsresultat === BehandlingResultat.HENLAGT_FEILAKTIG_OPPRETTET ||
        behandlingsresultat === BehandlingResultat.HENLAGT_SØKNAD_TRUKKET ||
        behandlingsresultat === BehandlingResultat.HENLAGT_AUTOMATISK_FØDSELSHENDELSE ||
        behandlingsresultat === BehandlingResultat.HENLAGT_TEKNISK_VEDLIKEHOLD
    );
};

export enum BehandlerRolle {
    UKJENT = 0,
    VEILEDER = 1,
    SAKSBEHANDLER = 2,
    BESLUTTER = 3,
    SYSTEM = 4,
}

export interface IBehandling {
    arbeidsfordelingPåBehandling: IArbeidsfordelingPåBehandling;
    behandlingId: number;
    endretAv: string;
    kategori: BehandlingKategori;
    underkategori: BehandlingUnderkategori;
    opprettetTidspunkt: string;
    personResultater: IRestPersonResultat[];
    personer: IGrunnlagPerson[];
    resultat: BehandlingResultat;
    status: BehandlingStatus;
    steg: BehandlingSteg;
    stegTilstand: IRestStegTilstand[];
    søknadsgrunnlag?: ISøknadDTO;
    totrinnskontroll?: ITotrinnskontroll;
    type: Behandlingstype;
    fødselshendelsefiltreringResultater: IFødselshendelsefiltreringResultat[];
    vedtak?: IVedtakForBehandling;
    utbetalingsperioder: Utbetalingsperiode[];
    endretUtbetalingAndeler: IRestEndretUtbetalingAndel[];
    personerMedAndelerTilkjentYtelse: IPersonMedAndelerTilkjentYtelse[];
    årsak: BehandlingÅrsak;
    skalBehandlesAutomatisk: boolean;
    tilbakekreving?: ITilbakekreving;
    aktivSettPåVent?: ISettPåVent;
    migreringsdato?: string;
    søknadMottattDato?: string;
    endringstidspunkt?: string;
    kompetanser: IRestKompetanse[];
    utenlandskePeriodebeløp: IRestUtenlandskPeriodeBeløp[];
    valutakurser: IRestValutakurs[];
    verge?: IVerge;
    korrigertEtterbetaling?: IRestKorrigertEtterbetaling;
}

export interface IArbeidsfordelingPåBehandling {
    behandlendeEnhetId: string;
    behandlendeEnhetNavn: string;
    manueltOverstyrt: boolean;
}

export interface IOpprettBehandlingData {
    behandlingType: Behandlingstype;
    behandlingÅrsak: BehandlingÅrsak;
    kategori: BehandlingKategori;
    navIdent?: string;
    søkersIdent: string;
    underkategori: BehandlingUnderkategori;
}

export const behandlerRoller: INøkkelPar = {
    SYSTEM: { id: 'SYSTEM', navn: 'System' },
    VEILEDER: { id: 'VEILEDER', navn: 'Veileder' },
    SAKSBEHANDLER: { id: 'SAKSBEHANDLER', navn: 'Saksbehandler' },
    BESLUTTER: { id: 'BESLUTTER', navn: 'Beslutter' },
};

export const behandlingstyper: INøkkelPar = {
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

export const behandlingsresultater: Record<
    BehandlingResultat | TilbakekrevingsbehandlingResultat,
    string
> = {
    INNVILGET: 'Innvilget',
    INNVILGET_OG_OPPHØRT: 'Innvilget og opphørt',
    INNVILGET_OG_ENDRET: 'Innvilget og endret',
    INNVILGET_ENDRET_OG_OPPHØRT: 'Innvilget, endret og opphørt',
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
    OPPHØRT: 'Opphørt',
    FORTSATT_OPPHØRT: 'Fortsatt opphørt',
    FORTSATT_INNVILGET: 'Fortsatt innvilget',
    HENLAGT_FEILAKTIG_OPPRETTET: 'Henlagt (feilaktig opprettet)',
    HENLAGT_SØKNAD_TRUKKET: 'Henlagt (søknad trukket)',
    HENLAGT_AUTOMATISK_FØDSELSHENDELSE: 'Henlagt automatisk fødselshendelse',
    HENLAGT_TEKNISK_VEDLIKEHOLD: 'Henlagt teknisk vedlikehold',
    IKKE_VURDERT: 'Ikke vurdert',
    /** De neste er resultat for tilbakekrevingsbehandlinger **/
    IKKE_FASTSATT: 'Ikke fastsatt',
    INGEN_TILBAKEBETALING: 'Ingen tilbakebetaling',
    DELVIS_TILBAKEBETALING: 'Delvis tilbakebetaling',
    FULL_TILBAKEBETALING: 'Full tilbakebetaling',
    HENLAGT: 'Henlagt',
};

export const behandlingsstatuser: Record<BehandlingStatus, string> = {
    OPPRETTET: 'Opprettet',
    UTREDES: 'Utredes',
    FATTER_VEDTAK: 'Fatter vedtak',
    IVERKSETTER_VEDTAK: 'Iverksetter vedtak',
    AVSLUTTET: 'Avsluttet',
};

export interface ISettPåVent {
    frist: ISODateString;
    årsak: SettPåVentÅrsak;
}

export enum SettPåVentÅrsak {
    AVVENTER_DOKUMENTASJON = 'AVVENTER_DOKUMENTASJON',
}

export const settPåVentÅrsaker: Record<SettPåVentÅrsak, string> = {
    AVVENTER_DOKUMENTASJON: 'Avventer dokumentasjon',
};
