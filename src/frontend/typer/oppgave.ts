import { IPerson } from './person';

export interface IDataForManuellJournalføring {
    journalpost: IJournalpost;
    oppgave: IOppgave;
    person?: IPerson;
}

export interface IJournalpost {
    journalpostId: string;
    journalposttype: Journalposttype;
    journalstatus: Journalstatus;
    tema?: string;
    behandlingstema?: string;
    sak?: IJournalpostSak;
    bruker?: IJournalpostBruker;
    journalforendeEnhet?: string;
    kanal?: string;
    dokumenter?: IDokumentInfo[];
}

export interface IJournalpostSak {
    arkivsaksnummer?: string;
    arkivsaksystem?: string;
    fagsakId?: string;
    fagsaksystem?: string;
}

export interface IJournalpostBruker {
    id: string;
}

export interface IDokumentInfo {
    tittel?: string;
    brevkode?: string;
    dokumentstatus?: Dokumentstatus;
    dokumentvarianter?: IDokumentvariant[];
}

export interface IDokumentvariant {
    variantformat: string;
}

enum Journalposttype {
    I,
    U,
    N,
}

enum Journalstatus {
    MOTTATT,
    JOURNALFOERT,
    FERDIGSTILT,
    EKSPEDERT,
    UNDER_ARBEID,
    FEILREGISTRERT,
    UTGAAR,
    AVBRUTT,
    UKJENT_BRUKER,
    RESERVERT,
    OPPLASTING_DOKUMENT,
    UKJENT,
}

enum Dokumentstatus {
    FERDIGSTILT,
    AVBRUTT,
    UNDER_REDIGERING,
    KASSERT,
}

export interface IOppgave {
    id: string;
    tildeltEnhetsnr: string;
    journalpostId: string;
    saksreferanse: string;
    aktoerId: string;
    tilordnetRessurs: string;
    beskrivelse: string;
    behandlingstema: string;
    oppgavetype: string;
    fristFerdigstillelse: string;
    opprettetTidspunkt: string;
    prioritet: string;
    status: string;
}

export enum EnhetFilter {
    Alle = 'Alle',
    E4806 = '4806 Drammen',
    E4811 = '4811 Sandnes',
    E4820 = '4820 Vadsø',
    E4833 = '4833 Oslo',
    E4842 = '4842 Stord',
    E4847 = '4847 Levanger-Steinkjer',
}

export enum SaksbehandlerFilter {
    Alle = 'Alle (fordelte og ufordelte)',
    AlleUfordelte = 'Alle (ufordelte)',
}

export enum GjelderFilter {
    Alle = 'Alle',
    ab0270 = 'Uspesifisert',
    ab0180 = 'Ordinær',
    ab0096 = 'Utvidet',
    ab0058 = 'EØS',
}

export enum OppgavetypeFilter {
    Alle = 'Alle',
    RETUR = 'Behandle returpost',
    BEH_SAK = 'Behandle sak',
    BEH_SED = 'Behandle SED',
    BEH_UND_VED = 'Behandle underkjent vedtak',
    FDR = 'Fordeling',
    FDR_SED = 'Fordeling SED',
    FREM = 'Fremlegg',
    GEN = 'Generell',
    GOD_VED = 'Godkjenne vedtak',
    INNH_DOK = 'Innhent dokumentasjon',
    JFR = 'Journalføring',
    JFR_UT = 'Journalføring utgående',
    KONT_BRUK = 'Kontakt bruker',
    KON_UTG_SCA_DOK = 'Kontroller utgående skannet dokument',
    SVAR_IK_MOT = 'Svar ikke mottatt',
    VUR = 'Vurder dokument',
    VURD_HENV = 'Vurder henvendelse',
    VUR_KONS_YTE = 'Vurder konsekvens for ytelse',
    VUR_SVAR = 'Vurder svar',
}

export enum EnhetsmappeFilter {
    Alle = 'Alle',
    Uplasserte = 'Uplasserte',
    EM10 = '10 Søknader-klar til behandling',
    EM20 = '20 Avventer dokumentasjon',
    EM30 = '30 Klager klar til behandling',
    EM40 = '40 Revurdering klar til behandling',
    EM41 = '41 Revurdering',
    EM50 = '50 Tilbakekreving klar til behandling',
}

export enum PrioritetFilter {
    Alle = 'Alle',
    NORM = 'Normal',
    HOY = 'Høy',
    LAV = 'Lav',
}

export enum DokumentType {
    TEST,
}

export interface IRestOppdaterJournalpost {
    bruker: INavnOgIdent;
    avsender: INavnOgIdent;
    dokumentType: string;
    mottattDato: string;
    annetInnhold: string;
    knyttTilFagsak: boolean;
}

export interface INavnOgIdent {
    navn: string;
    id: string;
}
