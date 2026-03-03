import type { BehandlingKategori, BehandlingUnderkategori } from './behandlingstema';
import type { IPersonMedAndelerTilkjentYtelse } from './beregning';
import type { INøkkelPar } from './common';
import type { IRestFeilutbetaltValuta } from './eøs-feilutbetalt-valuta';
import type { IRestKompetanse, IRestUtenlandskPeriodeBeløp, IRestValutakurs } from './eøsPerioder';
import type { IFødselshendelsefiltreringResultat } from './fødselshendelser';
import type { KlageResultat, KlageStatus, KlageÅrsak } from './klage';
import type { ManglendeFinnmarkSvalbardMerking } from './ManglendeFinnmarkSvalbardMerking';
import type { IGrunnlagPerson } from './person';
import type { IRestRefusjonEøs } from './refusjon-eøs';
import type { ITilbakekreving } from './simulering';
import type { ISøknadDTO } from './søknad';
import type { Behandlingsstatus, TilbakekrevingsbehandlingResultat, TilbakekrevingsbehandlingÅrsak } from './tilbakekrevingsbehandling';
import type { TilbakekrevingsvedtakMotregningDTO } from './tilbakekrevingsvedtakMotregning';
import type { ITotrinnskontroll } from './totrinnskontroll';
import type { IRestEndretUtbetalingAndel } from './utbetalingAndel';
import type { IRestKorrigertEtterbetaling, IRestKorrigertVedtak, IVedtakForBehandling } from './vedtak';
import type { Utbetalingsperiode } from './vedtaksperiode';
import type { IRestPersonResultat, IRestStegTilstand } from './vilkår';
import type { IRestBrevmottaker } from '../komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import type { IsoDatoString } from '../utils/dato';
export declare const MIDLERTIDIG_BEHANDLENDE_ENHET_ID = "4863";
export interface IRestNyBehandling {
    kategori: BehandlingKategori | null;
    underkategori: BehandlingUnderkategori | null;
    behandlingType: Behandlingstype;
    journalpostID?: string;
    behandlingÅrsak?: BehandlingÅrsak;
    skalBehandlesAutomatisk?: boolean;
    navIdent?: string;
    barnasIdenter?: string[];
    nyMigreringsdato?: IsoDatoString;
    søknadMottattDato?: IsoDatoString;
    fagsakId: number;
}
export declare enum HenleggÅrsak {
    SØKNAD_TRUKKET = "S\u00D8KNAD_TRUKKET",
    FEILAKTIG_OPPRETTET = "FEILAKTIG_OPPRETTET",
    FØDSELSHENDELSE_UGYLDIG_UTFALL = "F\u00D8DSELSHENDELSE_UGYLDIG_UTFALL",
    TEKNISK_VEDLIKEHOLD = "TEKNISK_VEDLIKEHOLD"
}
export declare const henleggÅrsak: Record<HenleggÅrsak, string>;
export declare enum BehandlingÅrsak {
    SØKNAD = "S\u00D8KNAD",
    FØDSELSHENDELSE = "F\u00D8DSELSHENDELSE",
    ÅRLIG_KONTROLL = "\u00C5RLIG_KONTROLL",
    DØDSFALL_BRUKER = "D\u00D8DSFALL_BRUKER",
    NYE_OPPLYSNINGER = "NYE_OPPLYSNINGER",
    KLAGE = "KLAGE",
    TEKNISK_OPPHØR = "TEKNISK_OPPH\u00D8R",
    TEKNISK_ENDRING = "TEKNISK_ENDRING",
    KORREKSJON_VEDTAKSBREV = "KORREKSJON_VEDTAKSBREV",
    OMREGNING_6ÅR = "OMREGNING_6\u00C5R",
    OMREGNING_18ÅR = "OMREGNING_18\u00C5R",
    SMÅBARNSTILLEGG = "SM\u00C5BARNSTILLEGG",
    SATSENDRING = "SATSENDRING",
    MIGRERING = "MIGRERING",
    ENDRE_MIGRERINGSDATO = "ENDRE_MIGRERINGSDATO",
    HELMANUELL_MIGRERING = "HELMANUELL_MIGRERING",
    OMREGNING_SMÅBARNSTILLEGG = "OMREGNING_SM\u00C5BARNSTILLEGG",
    SMÅBARNSTILLEGG_ENDRING_FRAM_I_TID = "SM\u00C5BARNSTILLEGG_ENDRING_FRAM_I_TID",
    MÅNEDLIG_VALUTAJUSTERING = "M\u00C5NEDLIG_VALUTAJUSTERING",
    IVERKSETTE_KA_VEDTAK = "IVERKSETTE_KA_VEDTAK",
    FINNMARKSTILLEGG = "FINNMARKSTILLEGG",
    SVALBARDTILLEGG = "SVALBARDTILLEGG",
    FALSK_IDENTITET = "FALSK_IDENTITET"
}
export declare const behandlingÅrsak: Record<BehandlingÅrsak | TilbakekrevingsbehandlingÅrsak | KlageÅrsak, string>;
export declare enum BehandlingSteg {
    HENLEGG_BEHANDLING = "HENLEGG_BEHANDLING",
    REGISTRERE_INSTITUSJON = "REGISTRERE_INSTITUSJON",
    REGISTRERE_SØKNAD = "REGISTRERE_S\u00D8KNAD",
    REGISTRERE_PERSONGRUNNLAG = "REGISTRERE_PERSONGRUNNLAG",
    FILTRERING_FØDSELSHENDELSER = "FILTRERING_F\u00D8DSELSHENDELSER",
    VILKÅRSVURDERING = "VILK\u00C5RSVURDERING",
    BEHANDLINGSRESULTAT = "BEHANDLINGSRESULTAT",
    VURDER_TILBAKEKREVING = "VURDER_TILBAKEKREVING",
    SEND_TIL_BESLUTTER = "SEND_TIL_BESLUTTER",
    BESLUTTE_VEDTAK = "BESLUTTE_VEDTAK",
    IVERKSETT_MOT_OPPDRAG = "IVERKSETT_MOT_OPPDRAG",
    VENTE_PÅ_STATUS_FRA_ØKONOMI = "VENTE_P\u00C5_STATUS_FRA_\u00D8KONOMI",
    JOURNALFØR_VEDTAKSBREV = "JOURNALF\u00D8R_VEDTAKSBREV",
    DISTRIBUER_VEDTAKSBREV = "DISTRIBUER_VEDTAKSBREV",
    FERDIGSTILLE_BEHANDLING = "FERDIGSTILLE_BEHANDLING",
    BEHANDLING_AVSLUTTET = "BEHANDLING_AVSLUTTET"
}
export declare function erPåHenleggbartSteg(steg: BehandlingSteg): boolean;
export declare enum BehandlingStegStatus {
    UTFØRT = "UTF\u00D8RT",
    IKKE_UTFØRT = "IKKE_UTF\u00D8RT"
}
export declare const hentStegNummer: (steg: BehandlingSteg) => number;
export declare enum BehandlingStatus {
    UTREDES = "UTREDES",
    SATT_PÅ_VENT = "SATT_P\u00C5_VENT",
    SATT_PÅ_MASKINELL_VENT = "SATT_P\u00C5_MASKINELL_VENT",
    FATTER_VEDTAK = "FATTER_VEDTAK",
    IVERKSETTER_VEDTAK = "IVERKSETTER_VEDTAK",
    AVSLUTTET = "AVSLUTTET"
}
export declare enum Behandlingstype {
    FØRSTEGANGSBEHANDLING = "F\u00D8RSTEGANGSBEHANDLING",
    MIGRERING_FRA_INFOTRYGD = "MIGRERING_FRA_INFOTRYGD",
    REVURDERING = "REVURDERING",
    TEKNISK_OPPHØR = "TEKNISK_OPPH\u00D8R",
    TEKNISK_ENDRING = "TEKNISK_ENDRING"
}
export declare enum BehandlingResultat {
    INNVILGET = "INNVILGET",
    INNVILGET_OG_OPPHØRT = "INNVILGET_OG_OPPH\u00D8RT",
    INNVILGET_OG_ENDRET = "INNVILGET_OG_ENDRET",
    INNVILGET_ENDRET_OG_OPPHØRT = "INNVILGET_ENDRET_OG_OPPH\u00D8RT",
    ENDRET_OG_FORTSATT_INNVILGET = "ENDRET_OG_FORTSATT_INNVILGET",
    DELVIS_INNVILGET = "DELVIS_INNVILGET",
    DELVIS_INNVILGET_OG_OPPHØRT = "DELVIS_INNVILGET_OG_OPPH\u00D8RT",
    DELVIS_INNVILGET_OG_ENDRET = "DELVIS_INNVILGET_OG_ENDRET",
    DELVIS_INNVILGET_ENDRET_OG_OPPHØRT = "DELVIS_INNVILGET_ENDRET_OG_OPPH\u00D8RT",
    AVSLÅTT = "AVSL\u00C5TT",
    AVSLÅTT_OG_OPPHØRT = "AVSL\u00C5TT_OG_OPPH\u00D8RT",
    AVSLÅTT_OG_ENDRET = "AVSL\u00C5TT_OG_ENDRET",
    AVSLÅTT_ENDRET_OG_OPPHØRT = "AVSL\u00C5TT_ENDRET_OG_OPPH\u00D8RT",
    ENDRET_UTBETALING = "ENDRET_UTBETALING",
    ENDRET_UTEN_UTBETALING = "ENDRET_UTEN_UTBETALING",
    ENDRET_OG_OPPHØRT = "ENDRET_OG_OPPH\u00D8RT",
    ENDRET_OG_FORTSATT_OPPHØRT = "ENDRET_OG_FORTSATT_OPPH\u00D8RT",
    OPPHØRT = "OPPH\u00D8RT",
    FORTSATT_OPPHØRT = "FORTSATT_OPPH\u00D8RT",
    FORTSATT_INNVILGET = "FORTSATT_INNVILGET",
    HENLAGT_FEILAKTIG_OPPRETTET = "HENLAGT_FEILAKTIG_OPPRETTET",
    HENLAGT_SØKNAD_TRUKKET = "HENLAGT_S\u00D8KNAD_TRUKKET",
    HENLAGT_AUTOMATISK_FØDSELSHENDELSE = "HENLAGT_AUTOMATISK_F\u00D8DSELSHENDELSE",
    HENLAGT_AUTOMATISK_SMÅBARNSTILLEGG = "HENLAGT_AUTOMATISK_SM\u00C5BARNSTILLEGG",
    HENLAGT_TEKNISK_VEDLIKEHOLD = "HENLAGT_TEKNISK_VEDLIKEHOLD",
    IKKE_VURDERT = "IKKE_VURDERT"
}
export declare const erBehandlingAvslått: (behandlingsResultat?: BehandlingResultat) => boolean;
export declare const erBehandlingFortsattInnvilget: (behandlingsResultat?: BehandlingResultat) => boolean;
export declare const erBehandlingHenlagt: (behandlingsresultat?: BehandlingResultat) => behandlingsresultat is BehandlingResultat.HENLAGT_FEILAKTIG_OPPRETTET | BehandlingResultat.HENLAGT_SØKNAD_TRUKKET | BehandlingResultat.HENLAGT_AUTOMATISK_FØDSELSHENDELSE | BehandlingResultat.HENLAGT_AUTOMATISK_SMÅBARNSTILLEGG | BehandlingResultat.HENLAGT_TEKNISK_VEDLIKEHOLD;
export declare enum BehandlerRolle {
    UKJENT = 0,
    VEILEDER = 1,
    SAKSBEHANDLER = 2,
    BESLUTTER = 3,
    SYSTEM = 4
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
    kompetanser: IRestKompetanse[];
    utenlandskePeriodebeløp: IRestUtenlandskPeriodeBeløp[];
    valutakurser: IRestValutakurs[];
    korrigertEtterbetaling?: IRestKorrigertEtterbetaling;
    korrigertVedtak?: IRestKorrigertVedtak;
    feilutbetaltValuta: IRestFeilutbetaltValuta[];
    refusjonEøs: IRestRefusjonEøs[];
    brevmottakere: IRestBrevmottaker[];
    vurderingsstrategiForValutakurser: VurderingsstrategiForValutakurser | null;
    tilbakekrevingsvedtakMotregning: TilbakekrevingsvedtakMotregningDTO | null;
    manglendeSvalbardmerking: ManglendeFinnmarkSvalbardMerking[];
    manglendeFinnmarkmerking?: ManglendeFinnmarkSvalbardMerking;
}
export declare enum VurderingsstrategiForValutakurser {
    MANUELL = "MANUELL",
    AUTOMATISK = "AUTOMATISK"
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
    underkategori: BehandlingUnderkategori;
}
export declare const behandlerRoller: INøkkelPar;
export declare const behandlingstyper: INøkkelPar;
export declare const behandlingsresultater: Record<BehandlingResultat | TilbakekrevingsbehandlingResultat | KlageResultat, string>;
export declare const behandlingsstatuser: Record<BehandlingStatus | Behandlingsstatus | KlageStatus, string>;
export interface ISettPåVent {
    frist: IsoDatoString;
    årsak: SettPåVentÅrsak;
}
export declare enum SettPåVentÅrsak {
    AVVENTER_DOKUMENTASJON = "AVVENTER_DOKUMENTASJON",
    AVVENTER_SAMTYKKE_ULOVFESTET_MOTREGNING = "AVVENTER_SAMTYKKE_ULOVFESTET_MOTREGNING"
}
export declare const settPåVentÅrsaker: Record<SettPåVentÅrsak, string>;
export declare function sjekkErBehandleneEnhetMidlertidig(behandling: IBehandling): boolean;
