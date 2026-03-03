import type { IKlagebehandling } from '../frontend/typer/klage';
export declare const oppgaveMock: {
    data: {
        antallTreffTotalt: number;
        oppgaver: ({
            id: number;
            identer: {
                ident: string;
                gruppe: string;
            }[];
            tildeltEnhetsnr: string;
            journalpostId: string;
            behandlesAvApplikasjon: string;
            aktoerId: string;
            beskrivelse: string;
            tema: string;
            behandlingstema: string;
            oppgavetype: string;
            fristFerdigstillelse: string;
            opprettetTidspunkt: string;
            prioritet: string;
            status: string;
            tilordnetRessurs?: undefined;
        } | {
            id: number;
            identer: {
                ident: string;
                gruppe: string;
            }[];
            tildeltEnhetsnr: string;
            journalpostId: string;
            behandlesAvApplikasjon: string;
            aktoerId: string;
            tilordnetRessurs: string;
            beskrivelse: string;
            tema: string;
            behandlingstema: string;
            oppgavetype: string;
            fristFerdigstillelse: string;
            opprettetTidspunkt: string;
            prioritet: string;
            status: string;
        })[];
    };
    status: string;
    melding: string;
    frontendFeilmelding: null;
    stacktrace: null;
};
export declare const fagsakMock: {
    data: {
        opprettetTidspunkt: string;
        id: number;
        søkerFødselsnummer: string;
        status: string;
        underBehandling: boolean;
        behandlinger: never[];
        gjeldendeUtbetalingsperioder: never[];
        tilbakekrevingsbehandlinger: never[];
    };
    status: string;
    melding: string;
    frontendFeilmelding: null;
    stacktrace: null;
};
export declare const personMock: {
    data: {
        personIdent: string;
        fødselsdato: string;
        navn: string;
        kjønn: string;
        adressebeskyttelseGradering: null;
        harTilgang: boolean;
        forelderBarnRelasjon: never[];
        forelderBarnRelasjonMaskert: never[];
        kommunenummer: string;
    };
    status: string;
    melding: string;
    frontendFeilmelding: null;
    stacktrace: null;
};
export declare const profileMock: {
    displayName: string;
    email: string;
    enhet: string;
    identifier: string;
    navIdent: string;
    groups: string[];
};
export declare const klagebehandlingFixture: (overstyrendeVerdier?: Partial<IKlagebehandling>) => IKlagebehandling;
