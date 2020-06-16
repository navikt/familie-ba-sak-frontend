import { INøkkelPar } from './common';
import { IOppgave } from './oppgave';
import { IPerson } from './person';

export interface IDataForManuellJournalføring {
    journalpost: IJournalpost;
    oppgave: IOppgave;
    person?: IPerson;
}

export interface IJournalpost {
    datoMottatt?: string;
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
    dokumentInfoId?: string;
    dokumentstatus?: Dokumentstatus;
    dokumentvarianter?: IDokumentvariant[];
    logiskeVedlegg: ILogiskVedlegg[];
}

export interface IDokumentvariant {
    variantformat: string;
}

enum Journalposttype {
    I,
    U,
    N,
}

export enum Journalstatus {
    MOTTATT = 'MOTTATT',
    JOURNALFOERT = 'JOURNALFOERT',
    FERDIGSTILT = 'FERDIGSTILT',
    EKSPEDERT = 'EKSPEDERT',
    UNDER_ARBEID = 'UNDER_ARBEID',
    FEILREGISTRERT = 'FEILREGISTRERT',
    UTGAAR = 'UTGAAR',
    AVBRUTT = 'AVBRUTT',
    UKJENT_BRUKER = 'UKJENT_BRUKER',
    RESERVERT = 'RESERVERT',
    OPPLASTING_DOKUMENT = 'OPPLASTING_DOKUMENT',
    UKJENT = 'UKJENT',
}

enum Dokumentstatus {
    FERDIGSTILT,
    AVBRUTT,
    UNDER_REDIGERING,
    KASSERT,
}

export enum Dokumenttype {
    SØKNAD_OM_ORDINÆR_BARNETRYGD = 'SØKNAD_OM_ORDINÆR_BARNETRYGD',
    SØKNAD_OM_UTVIDET_BARNETRYGD = 'SØKNAD_OM_UTVIDET_BARNETRYGD',
}

export enum LogiskeVedleggTyper {
    OPPHOLDSTILLATELSE = 'OPPHOLDSTILLATELSE',
    PASS_OG_ID_PAPIRER = 'PASS_OG_ID_PAPIRER',
}

export const dokumenttyper: INøkkelPar = {
    SØKNAD_OM_ORDINÆR_BARNETRYGD: {
        id: 'SØKNAD_OM_ORDINÆR_BARNETRYGD',
        navn: 'Søknad om ordinær barnetrygd',
    },
    SØKNAD_OM_UTVIDET_BARNETRYGD: {
        id: 'SØKNAD_OM_UTVIDET_BARNETRYGD',
        navn: 'Søknad om utvidet barnetrygd',
    },
};

export const logiskeVedleggTyper: INøkkelPar = {
    OPPHOLDSTILLATELSE: {
        id: 'OPPHOLDSTILLATELSE',
        navn: 'Oppholdstillatelse',
    },
    PASS_OG_ID_PAPIRER: {
        id: 'PASS_OG_ID_PAPIRER',
        navn: 'Pass/ID-papirer og annet',
    },
};

export interface IRestOppdaterJournalpost {
    avsender: INavnOgIdent;
    bruker: INavnOgIdent;
    datoMottatt?: string;
    dokumentTittel: string;
    dokumentInfoId: string;
    eksisterendeLogiskeVedlegg: ILogiskVedlegg[];
    knyttTilFagsak: boolean;
    logiskeVedlegg: ILogiskVedlegg[];
    navIdent: string;
}

export interface ILogiskVedlegg {
    logiskVedleggId: string;
    tittel: string;
}

export interface INavnOgIdent {
    navn: string;
    id: string;
}
