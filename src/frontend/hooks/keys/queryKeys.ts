import type { FagsakId } from '@typer/fagsak';

function personQueryKey(ident: string | undefined) {
    return ['person', ident] as const;
}

function fagsakQueryKey(fagsakId: FagsakId | undefined) {
    return ['fagsak', fagsakId] as const;
}

function behandlingQueryKey(behandlingId: number | undefined) {
    return ['behandling', behandlingId] as const;
}

function vedtaksperioderQueryKey(behandlingId: number) {
    return [...behandlingQueryKey(behandlingId), 'vedtaksperioder'] as const;
}

export const queryKeys = {
    // Frittstående
    alleBegrunnelser: () => {
        return ['alle-begrunnelser'] as const;
    },
    featureToggles: () => {
        return ['feature-toggles'] as const;
    },
    saksbehandler: () => {
        return ['saksbehandler'] as const;
    },
    versjonsinfoFrontend: () => {
        return ['versjonsinfo', 'frontend'] as const;
    },
    versjonsinfoBackend: () => {
        return ['versjonsinfo', 'backend'] as const;
    },
    infotrygdSaker: (ident: string) => {
        return ['infotrygd-saker', ident] as const;
    },
    samhandler: (orgnr: string) => {
        return ['samhandler', orgnr] as const;
    },

    // Person
    person: personQueryKey,
    personEnkel: (ident: string) => {
        return ['person-enkel', ident] as const;
    },
    distribusjonskanal: (personIdent: string | undefined) => {
        return [...personQueryKey(personIdent), 'distribusjonskanal'] as const;
    },
    fagsaker: (personIdent: string) => {
        return [...personQueryKey(personIdent), 'fagsaker'] as const;
    },

    // Fagsak
    fagsak: fagsakQueryKey,
    barnetrygdbehandlinger: (fagsakId: FagsakId) => {
        return [...fagsakQueryKey(fagsakId), 'barnetrygdbehandlinger'] as const;
    },
    gjeldendeUtbetalingsperioder: (fagsakId: FagsakId) => {
        return [...fagsakQueryKey(fagsakId), 'gjeldende-utbetalingsperioder'] as const;
    },
    harÅpenTilbakekreving: (fagsakId: FagsakId) => {
        return [...fagsakQueryKey(fagsakId), 'har-apen-tilbakekreving'] as const;
    },
    klagebehandlinger: (fagsakId: FagsakId) => {
        return [...fagsakQueryKey(fagsakId), 'klagebehandlinger'] as const;
    },
    tilbakekrevingsbehandlinger: (fagsakId: FagsakId) => {
        return [...fagsakQueryKey(fagsakId), 'tilbakekrevingsbehandlinger'] as const;
    },

    // Behandling
    behandling: behandlingQueryKey,
    endringstidspunkt: (behandlingId: number) => {
        return [...behandlingQueryKey(behandlingId), 'endringstidspunkt'] as const;
    },
    feilutbetaltValuta: (behandlingId: number) => {
        return [...behandlingQueryKey(behandlingId), 'feilutbetalt-valuta'] as const;
    },
    filtreringsresultater: (behandlingId: number) => {
        return [...behandlingQueryKey(behandlingId), 'filtreringsresultater'] as const;
    },
    historikkinnslag: (behandlingId: number) => {
        return [...behandlingQueryKey(behandlingId), 'historikkinnslag'] as const;
    },
    korrigertEtterbetaling: (behandlingId: number) => {
        return [...behandlingQueryKey(behandlingId), 'korrigert-etterbetaling'] as const;
    },
    korrigertVedtak: (behandlingId: number) => {
        return [...behandlingQueryKey(behandlingId), 'korrigert-vedtak'] as const;
    },
    personerMedUgyldigEtterbetalingsperiode: (behandlingId: number) => {
        return [...behandlingQueryKey(behandlingId), 'personer-med-ugyldig-etterbetalingsperiode'] as const;
    },
    refusjonEøs: (behandlingId: number) => {
        return [...behandlingQueryKey(behandlingId), 'refusjon-eos'] as const;
    },
    registrerteSøknadstidspunkter: (behandlingId: number) => {
        return [...behandlingQueryKey(behandlingId), 'registrerte-soknadstidspunkter'] as const;
    },
    sammensattKontrollsak: (behandlingId: number) => {
        return [...behandlingQueryKey(behandlingId), 'sammensatt-kontrollsak'] as const;
    },
    simulering: (behandlingId: number) => {
        return [...behandlingQueryKey(behandlingId), 'simulering'] as const;
    },
    validerBehandlingsresultat: (behandlingId: number) => {
        return [...behandlingQueryKey(behandlingId), 'valider-behandlingsresultat'] as const;
    },

    // Vedtaksperioder
    vedtaksperioder: vedtaksperioderQueryKey,
    genererteBrevbegrunnelser: (behandlingId: number, vedtaksperiodeId: number) => {
        return [...vedtaksperioderQueryKey(behandlingId), vedtaksperiodeId, 'genererte-brevbegrunnelser'] as const;
    },
};
