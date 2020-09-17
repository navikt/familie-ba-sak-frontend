import { INøkkelPar } from './common';
import { ISaksbehandler } from '@navikt/familie-typer';

export interface IFinnOppgaveRequest {
    behandlingstema?: string;
    oppgavetype?: string;
    enhet?: string;
    journalpostId?: string;
    opprettetFomTidspunkt?: string;
    opprettetTomTidspunkt?: string;
    fristFomDato?: string;
    fristTomDato?: string;
    aktivFomDato?: string;
    aktivTomDato?: string;
    tilordnetRessurs?: string;
    tildeltRessurs?: boolean;
    limit?: number;
    offset?: number;
}

export interface IHentOppgaveDto {
    antallTreffTotalt: number;
    oppgaver: IOppgave[];
}

export interface IOppgave {
    // eslint-disable-next-line
    [key: string]: any;
    id: string;
    identer: IOppgaveIdent[];
    tildeltEnhetsnr: string;
    journalpostId: string;
    saksreferanse: string;
    aktoerId: string;
    behandlingstema: string;
    beskrivelse: string;
    fristFerdigstillelse: string;
    oppgavetype: string;
    opprettetTidspunkt: string;
    prioritet: string;
    status: string;
    tilordnetRessurs: string;
}

export interface IOppgaveIdent {
    ident: string;
    gruppe: IdentGruppe;
}

export enum IdentGruppe {
    AKTOERID = 'AKTOERID',
    FOLKEREGISTERIDENT = 'FOLKEREGISTERIDENT',
    NPID = 'NPID',
    ORGNR = 'ORGNR',
    SAMHANDLERNR = 'SAMHANDLERNR',
}

export enum EnhetFilter {
    ALLE = 'ALLE',
    E4806 = 'E4806',
    E4811 = 'E4811',
    E4820 = 'E4820',
    E4833 = 'E4833',
    E4842 = 'E4842',
    E4847 = 'E4847',
}

export const enhetFilter: INøkkelPar = {
    ALLE: { id: 'ALLE', navn: 'Alle' },
    E4806: { id: 'E4806', navn: '4806 Drammen' },
    E4811: { id: 'E4811', navn: '4811 Sandnes' },
    E4820: { id: 'E4820', navn: '4820 Vadsø' },
    E4833: { id: 'E4833', navn: '4833 Oslo' },
    E4842: { id: 'E4842', navn: '4842 Stord' },
    E4847: { id: 'E4847', navn: '4847 Levanger-Steinkjer' },
};

export enum SaksbehandlerFilter {
    INNLOGGET = 'INNLOGGET',
    ALLE = 'ALLE',
    FORDELTE = 'FORDELTE',
    UFORDELTE = 'UFORDELTE',
}

export const saksbehandlerFilter = (
    innloggetSaksbehandler: ISaksbehandler | undefined
): INøkkelPar => ({
    INNLOGGET: { id: 'INNLOGGET', navn: innloggetSaksbehandler?.displayName ?? 'INNLOGGET' },
    ALLE: { id: 'ALLE', navn: 'Alle' },
    FORDELTE: { id: 'FORDELTE', navn: 'Fordelte' },
    UFORDELTE: { id: 'UFORDELTE', navn: 'Ufordelte' },
});

export enum GjelderFilter {
    ALLE = 'ALLE',
    ab0270 = 'ab0270',
    ab0180 = 'ab0180',
    ab0096 = 'ab0096',
    ab0058 = 'ab0058',
}

export const gjelderFilter: INøkkelPar = {
    ALLE: { id: 'ALLE', navn: 'Alle' },
    ab0270: { id: 'ab0270', navn: 'Uspesifisert' },
    ab0180: { id: 'ab0180', navn: 'Ordinær' },
    ab0096: { id: 'ab0096', navn: 'Utvidet' },
    ab0058: { id: 'ab0058', navn: 'EØS' },
};

export enum OppgavetypeFilter {
    ALLE = 'ALLE',
    RETUR = 'RETUR',
    BEH_SAK = 'BEH_SAK',
    BEH_SED = 'BEH_SED',
    BEH_UND_VED = 'BEH_UND_VED',
    FDR = 'FDR',
    FDR_SED = 'FDR_SED',
    FREM = 'FREM',
    GEN = 'GEN',
    GOD_VED = 'GOD_VED',
    INNH_DOK = 'INNH_DOK',
    JFR = 'JFR',
    JFR_UT = 'JFR_UT',
    KONT_BRUK = 'KONT_BRUK',
    KON_UTG_SCA_DOK = 'KON_UTG_SCA_DOK',
    SVAR_IK_MOT = 'SVAR_IK_MOT',
    VUR = 'VUR',
    VURD_HENV = 'VURD_HENV',
    VUR_KONS_YTE = 'VUR_KONS_YTE',
    VUR_SVAR = 'VUR_SVAR',
}

export const oppgaveTypeFilter: INøkkelPar = {
    ALLE: { id: 'ALLE', navn: 'Alle' },
    RETUR: { id: 'RETUR', navn: 'Behandle returpost' },
    BEH_SAK: { id: 'BEH_SAK', navn: 'Behandle sak' },
    BEH_SED: { id: 'BEH_SED', navn: 'Behandle SED' },
    BEH_UND_VED: { id: 'BEH_UND_VED', navn: 'Behandle underkjent vedtak' },
    FDR: { id: 'FDR', navn: 'Fordeling' },
    FDR_SED: { id: 'FDR_SED', navn: 'Fordeling SED' },
    FREM: { id: 'FREM', navn: 'Fremlegg' },
    GEN: { id: 'GEN', navn: 'Generell' },
    GOD_VED: { id: 'GOD_VED', navn: 'Godkjenne vedtak' },
    INNH_DOK: { id: 'INNH_DOK', navn: 'Innhent dokumentasjon' },
    JFR: { id: 'JFR', navn: 'Journalføring' },
    JFR_UT: { id: 'JFR_UT', navn: 'Journalføring utgående' },
    KONT_BRUK: { id: 'KONT_BRUK', navn: 'Kontakt bruker' },
    KON_UTG_SCA_DOK: { id: 'KON_UTG_SCA_DOK', navn: 'Kontroller utgående skannet dokument' },
    SVAR_IK_MOT: { id: 'SVAR_IK_MOT', navn: 'Svar ikke mottatt' },
    VUR: { id: 'VUR', navn: 'Vurder dokument' },
    VURD_HENV: { id: 'VURD_HENV', navn: 'Vurder henvendelse' },
    VUR_KONS_YTE: { id: 'VUR_KONS_YTE', navn: 'Vurder konsekvens for ytelse' },
    VUR_SVAR: { id: 'VUR_SVAR', navn: 'Vurder svar' },
};

export enum EnhetsmappeFilter {
    ALLE = 'ALLE',
    Uplasserte = 'Uplasserte',
    EM10 = '10 Søknader-klar til behandling',
    EM20 = '20 Avventer dokumentasjon',
    EM30 = '30 Klager klar til behandling',
    EM40 = '40 Revurdering klar til behandling',
    EM41 = '41 Revurdering',
    EM50 = '50 Tilbakekreving klar til behandling',
}

export enum PrioritetFilter {
    ALLE = 'ALLE',
    NORM = 'Normal',
    HOY = 'Høy',
    LAV = 'Lav',
}
