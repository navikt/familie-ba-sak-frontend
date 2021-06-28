import { FamilieIsoDate } from '../utils/kalender';

export type JournalpostType = 'I' | 'U' | 'M';

export interface Journalpost {
    journalpostId: string;
    tittel: string;
    journalposttype: JournalpostType;
    behandlingstema: string;
    behandlingstemanavn: string;
    sak: { fagsaksystem: string; tema: string };
    avsenderMottaker: { navn: string };
    datoMottatt: FamilieIsoDate;
    journalstatus: string;
    dokumenter: { logiskeVedlegg: { tittel: string; logiskVedleggId: string } };
}
