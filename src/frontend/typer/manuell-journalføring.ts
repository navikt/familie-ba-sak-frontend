import { INøkkelPar } from './common';
import { IOppgave } from './oppgave';
import { IPersonInfo } from './person';
import { IFagsak } from './fagsak';
import { IJournalpost } from '@navikt/familie-typer';

export interface IDataForManuellJournalføring {
    journalpost: IJournalpost;
    oppgave: IOppgave;
    person?: IPersonInfo;
    fagsak?: IFagsak;
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

export interface ILogiskVedlegg {
    logiskVedleggId: string;
    tittel: string;
}

export interface INavnOgIdent {
    navn: string;
    id: string;
}
