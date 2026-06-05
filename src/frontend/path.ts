type Id = string | number;

function appPathFactory() {
    return {
        root: '/',
        oppgaver: '/oppgaver',
        journalfør: (oppgaveId: Id) => `/oppgaver/journalfor/${oppgaveId}`,
        infotrygd: '/infotrygd',
        samhandler: '/samhandler',
    } as const;
}

function fagsakPathFactory(fagsakId: Id) {
    const root = `/fagsak/${fagsakId}`;
    return {
        root: root,
        saksoversikt: `${root}/saksoversikt`,
        dokumentutsending: `${root}/dokumentutsending`,
        dokumenter: `${root}/dokumenter`,
        infotrygd: `${root}/infotrygd`,
    } as const;
}

function behandlingPathFactory(fagsakId: Id) {
    return (behandlingId: Id) => {
        const base = `/fagsak/${fagsakId}/${behandlingId}`;
        return {
            root: base,
            registrerInstitusjon: `${base}/registrer-institusjon`,
            registrerSøknad: `${base}/registrer-soknad`,
            filtreringsregler: `${base}/filtreringsregler`,
            vilkårsvurdering: `${base}/vilkaarsvurdering`,
            tilkjentYtelse: `${base}/tilkjent-ytelse`,
            simulering: `${base}/simulering`,
            vedtak: `${base}/vedtak`,
        } as const;
    };
}
export const Path = {
    ...appPathFactory(),
    fagsak: (fagsakId: Id) => {
        return {
            ...fagsakPathFactory(fagsakId),
            behandling: behandlingPathFactory(fagsakId),
        } as const;
    },
} as const;
