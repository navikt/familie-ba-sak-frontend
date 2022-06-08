import type { IJournalpost } from '@navikt/familie-typer';

import type { BehandlingKategori, BehandlingUnderkategori } from './behandlingstema';
import type { INøkkelPar } from './common';
import type { IMinimalFagsak } from './fagsak';
import type { IOppgave } from './oppgave';
import type { IPersonInfo } from './person';

export interface IDataForManuellJournalføring {
    journalpost: IJournalpost;
    oppgave: IOppgave;
    person?: IPersonInfo;
    minimalFagsak?: IMinimalFagsak;
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
    tilknyttedeBehandlingIder: number[];
    logiskeVedlegg: ILogiskVedlegg[];
    navIdent: string;
}

export interface IRestJournalpostDokument {
    dokumentTittel?: string;
    dokumentInfoId: string;
    brevkode?: string;
    logiskeVedlegg?: ILogiskVedlegg[];
    eksisterendeLogiskeVedlegg?: ILogiskVedlegg[];
}

export interface IRestJournalføring {
    avsender: INavnOgIdent;
    bruker: INavnOgIdent;
    datoMottatt?: string;
    journalpostTittel?: string;
    dokumenter?: IRestJournalpostDokument[];
    knyttTilFagsak: boolean;
    tilknyttedeBehandlingIder: number[];
    opprettOgKnyttTilNyBehandling: boolean;
    navIdent: string;
    kategori: BehandlingKategori | null;
    underkategori: BehandlingUnderkategori | null;
    erEnsligMindreårig: boolean;
    erPåInstitusjon: boolean;
}

export interface ILogiskVedlegg {
    logiskVedleggId: string;
    tittel: string;
}

export interface INavnOgIdent {
    navn: string;
    id: string;
}

export enum JournalpostTittel {
    SØKNAD_OM_BARNETRYGD_ORDINÆR = 'Søknad om barnetrygd ordinær',
    SØKNAD_OM_UTVIDET_BARNETRYGD = 'Søknad om utvidet barnetrygd',
    ETTERSENDELSE_TIL_SØKNAD_OM_BARNETRYGD_ORDINÆR = 'Ettersendelse til søknad om barnetrygd ordinær',
    ETTERSENDELSE_TIL_SØKNAD_OM_UTVIDET_BARNETRYGD = 'Ettersendelse til søknad om utvidet barnetrygd',
    TILLEGGSSKJEMA_VED_KRAV_OM_UTBETALING = 'Tilleggskjema EØS',
}

export const BrevkodeMap = new Map<string | undefined, string>([
    [JournalpostTittel.SØKNAD_OM_BARNETRYGD_ORDINÆR.toString(), 'NAV 33-00.07'],
    [JournalpostTittel.SØKNAD_OM_UTVIDET_BARNETRYGD.toString(), 'NAV 33-00.09'],
    [JournalpostTittel.ETTERSENDELSE_TIL_SØKNAD_OM_BARNETRYGD_ORDINÆR.toString(), 'NAVe 33-00.07'],
    [JournalpostTittel.ETTERSENDELSE_TIL_SØKNAD_OM_UTVIDET_BARNETRYGD.toString(), 'NAVe 33-00.09'],
    [JournalpostTittel.TILLEGGSSKJEMA_VED_KRAV_OM_UTBETALING.toString(), 'NAV 34-00.15'],
]);

export enum DokumentTittel {
    AVTALE_OM_DELT_BOSTED = 'Avtale om delt bosted',
    AVTALE_OM_FAST_BOSTED_SAMVÆR = 'Avtale om fast bosted/samvær',
    ARBEIDSAVTALE = 'Arbeidsavtale',
    BEKREFTELSE_FRA_BARNEVERNET = 'Bekreftelse fra barnevernet',
    BEKREFTELSE_PÅ_UTENLANDSOPPHOLD = 'Bekreftelse på utenlandsopphold',
    BEKREFTELSE_PÅ_OPPHOLDSTILLATELSE = 'Bekreftelse på oppholdstillatelse',
    BEKREFTELSE_PÅ_ASYLSTATUS = 'Bekreftelse på asylstatus',
    DOKUMENTASJON_PÅ_FOSTERFORHOLD = 'Dokumentasjon på fosterforhold',
    DOKUMENTASJON_PÅ_PLASSERING_I_BARNEVERNSINSTITUSJON = 'Dokumentasjon på plassering i barnevernsinstitusjon',
    DOKUMENTASJON_PÅ_DATO_FOR_OVERTAKELSE_AV_OMSORG = 'Dokumentasjon på dato for overtakelse av omsorg',
    DOKUMENTASJON_PÅ_ADOPSJON = 'Dokumentasjon på adopsjon',
    DOKUMENTASJON_PÅ_EGNE_MIDLER = 'Dokumentasjon på egne midler',
    DOKUMENTASJON_PÅ_EGEN_HUSHOLDNING = 'Dokumentasjon på egen husholdning',
    DOKUMENTASJON_PÅ_FENGSELSOPPHOLD = 'Dokumentasjon på fengselsopphold',
    DOKUMENTASJON_PÅ_FORSVINNING = 'Dokumentasjon på forsvinning',
    ERKLÆRING_OM_SAMLIVSBRUDD = 'Erklæring om samlivsbrudd',
    ENDRING_I_SIVILSTAND = 'Endring i sivilstand',
    EØS_REGISTERINGSBEVIS = 'EØS registreringsbevis',
    EØS_VARIG_OPPHOLDBEVIS = 'EØS varig oppholdbevis',
    F001 = 'F001',
    F002 = 'F002',
    FØDSELSATTEST = 'Fødselsattest',
    KONTOOPPLYSNINGER = 'Kontoopplysninger',
    MEKLINGSATTEST = 'Meklingsattest',
    MELDING_FRA_SKOLE_OM_FRAVÆR = 'Melding fra skole om fravær',
    PASS_ID_PAPIRER = 'Pass/ID-papirer',
    REGISTERUTSKRIFT_FRA_BRØNNØYSUNDREGISTRENE = 'Registerutskrift fra Brønnøysundregistrene',
    RETTSKJENNELSE_BARNEFORDELINGSSAKER = 'Rettskjennelse - barnefordelingssaker',
    SKILSMISSE_ELLER_SEPARASJONSBEVILLING = 'Skilsmisse- eller separasjonsbevilling',
    UTTALELSE = 'Uttalelse',
    UTTALELSE_TILBAKEKREVING = 'Uttalelse tilbakekreving',
    VERGEFULLMAKT = 'Vergefullmakt',
}

export enum JournalpostKanal {
    NAV_NO = 'NAV_NO',
    SCAN_IM = 'SCAN_IM',
}
