export const oppgaveMock = {
    data: {
        antallTreffTotalt: 2,
        oppgaver: [
            {
                id: 1,
                identer: [{ ident: '11111111111', gruppe: 'FOLKEREGISTERIDENT' }],
                tildeltEnhetsnr: '4820',
                journalpostId: '1234',
                behandlesAvApplikasjon: 'FS22',
                aktoerId: '1234',
                beskrivelse: 'Her skal det komme mockdata peace',
                tema: 'BAR',
                behandlingstema: 'ab0180',
                oppgavetype: 'JFR',
                fristFerdigstillelse: '2020-02-01',
                opprettetTidspunkt: '2020-01-01',
                prioritet: 'NORM',
                status: 'OPPRETTET',
            },
            {
                id: 2,
                identer: [{ ident: '11111111111', gruppe: 'FOLKEREGISTERIDENT' }],
                tildeltEnhetsnr: '4820',
                journalpostId: '1234',
                behandlesAvApplikasjon: 'FS22',
                aktoerId: '1234',
                tilordnetRessurs: 'Z999999',
                beskrivelse: 'Beskrivelse for oppgave',
                tema: 'BAR',
                behandlingstema: 'ab0180',
                oppgavetype: 'BEH_SAK',
                fristFerdigstillelse: '2020-02-01',
                opprettetTidspunkt: '2020-01-01',
                prioritet: 'NORM',
                status: 'OPPRETTET',
            },
        ],
    },
    status: 'SUKSESS',
    melding: 'Finn oppgaver OK',
    frontendFeilmelding: null,
    stacktrace: null,
};

export const fagsakMock = {
    data: {
        opprettetTidspunkt: '2021-10-05T13:19:10.077',
        id: 1000001,
        søkerFødselsnummer: '23456789101',
        status: 'OPPRETTET',
        underBehandling: false,
        behandlinger: [],
        gjeldendeUtbetalingsperioder: [],
        tilbakekrevingsbehandlinger: [],
    },
    status: 'SUKSESS',
    melding: 'Innhenting av data var vellykket',
    frontendFeilmelding: null,
    stacktrace: null,
};

export const personMock = {
    data: {
        personIdent: '23456789101',
        fødselsdato: '1965-02-19',
        navn: 'Mor Integrasjon person',
        kjønn: 'KVINNE',
        adressebeskyttelseGradering: null,
        harTilgang: true,
        forelderBarnRelasjon: [],
        forelderBarnRelasjonMaskert: [],
        kommunenummer: 'ukjent',
    },
    status: 'SUKSESS',
    melding: 'Innhenting av data var vellykket',
    frontendFeilmelding: null,
    stacktrace: null,
};

export const profileMock = {
    displayName: 'testbruker',
    email: 'test@test.no',
    enhet: '2970',
    identifier: 'test@test.no',
    navIdent: 'Z123456',
    groups: [
        'd21e00a4-969d-4b28-8782-dc818abfae65',
        '93a26831-9866-4410-927b-74ff51a9107c',
        '9449c153-5a1e-44a7-84c6-7cc7a8867233',
    ],
};
