import { QueryClient, type QueryKey } from '@tanstack/react-query';
import { FagsakId } from '@typer/fagsak';
import { beforeEach, describe, expect, test } from 'vitest';

import { queryKeys } from './queryKeys';

const ident = '12345678910';
const annenIdent = '10987654321';
const fagsakId = FagsakId.fra(1);
const annenFagsakId = FagsakId.fra(2);
const behandlingId = 10;
const annenBehandlingId = 20;
const vedtaksperiodeId = 100;
const annenVedtaksperiodeId = 200;

const personnøkler = {
    distribusjonskanal: queryKeys.distribusjonskanal(ident),
    fagsaker: queryKeys.fagsaker(ident),
};

const fagsaknøkler = {
    barnetrygdbehandlinger: queryKeys.barnetrygdbehandlinger(fagsakId),
    gjeldendeUtbetalingsperioder: queryKeys.gjeldendeUtbetalingsperioder(fagsakId),
    harÅpenTilbakekreving: queryKeys.harÅpenTilbakekreving(fagsakId),
    klagebehandlinger: queryKeys.klagebehandlinger(fagsakId),
    tilbakekrevingsbehandlinger: queryKeys.tilbakekrevingsbehandlinger(fagsakId),
};

const behandlingsnøkler = {
    endringstidspunkt: queryKeys.endringstidspunkt(behandlingId),
    feilutbetaltValuta: queryKeys.feilutbetaltValuta(behandlingId),
    filtreringsresultater: queryKeys.filtreringsresultater(behandlingId),
    genererteBrevbegrunnelser: queryKeys.genererteBrevbegrunnelser(behandlingId, vedtaksperiodeId),
    historikkinnslag: queryKeys.historikkinnslag(behandlingId),
    korrigertEtterbetaling: queryKeys.korrigertEtterbetaling(behandlingId),
    korrigertVedtak: queryKeys.korrigertVedtak(behandlingId),
    personerMedUgyldigEtterbetalingsperiode: queryKeys.personerMedUgyldigEtterbetalingsperiode(behandlingId),
    registrerteSøknadstidspunkter: queryKeys.registrerteSøknadstidspunkter(behandlingId),
    sammensattKontrollsak: queryKeys.sammensattKontrollsak(behandlingId),
    simulering: queryKeys.simulering(behandlingId),
    validerBehandlingsresultat: queryKeys.validerBehandlingsresultat(behandlingId),
    vedtaksperioder: queryKeys.vedtaksperioder(behandlingId),
};

const frittståendeNøkler = {
    alleBegrunnelser: queryKeys.alleBegrunnelser(),
    featureToggles: queryKeys.featureToggles(),
    infotrygdSaker: queryKeys.infotrygdSaker(ident),
    personEnkel: queryKeys.personEnkel(ident),
    saksbehandler: queryKeys.saksbehandler(),
    samhandler: queryKeys.samhandler('889640782'),
    versjonsinfoBackend: queryKeys.versjonsinfoBackend(),
    versjonsinfoFrontend: queryKeys.versjonsinfoFrontend(),
};

describe('queryKeys', () => {
    let queryClient: QueryClient;

    function leggTilQueries(...nøkler: QueryKey[]) {
        for (const nøkkel of nøkler) {
            queryClient.setQueryData(nøkkel, 'data');
        }
    }

    function erInvalidert(nøkkel: QueryKey) {
        const state = queryClient.getQueryState(nøkkel);
        if (!state) {
            throw new Error(`Query ${JSON.stringify(nøkkel)} finnes ikke i QueryClient`);
        }
        return state.isInvalidated;
    }

    beforeEach(() => {
        queryClient = new QueryClient();
    });

    test.each(Object.entries(personnøkler))('skal invalidere %s når personen invalideres', async (_, nøkkel) => {
        leggTilQueries(queryKeys.person(ident), nøkkel);

        await queryClient.invalidateQueries({ queryKey: queryKeys.person(ident) });

        expect(erInvalidert(nøkkel)).toBe(true);
    });

    test.each(Object.entries(fagsaknøkler))('skal invalidere %s når fagsaken invalideres', async (_, nøkkel) => {
        leggTilQueries(queryKeys.fagsak(fagsakId), nøkkel);

        await queryClient.invalidateQueries({ queryKey: queryKeys.fagsak(fagsakId) });

        expect(erInvalidert(nøkkel)).toBe(true);
    });

    test.each(Object.entries(behandlingsnøkler))(
        'skal invalidere %s når behandlingen invalideres',
        async (_, nøkkel) => {
            leggTilQueries(queryKeys.behandling(behandlingId), nøkkel);

            await queryClient.invalidateQueries({ queryKey: queryKeys.behandling(behandlingId) });

            expect(erInvalidert(nøkkel)).toBe(true);
        }
    );

    test('skal invalidere genererte brevbegrunnelser for alle vedtaksperioder når vedtaksperiodene invalideres', async () => {
        const brevbegrunnelser = queryKeys.genererteBrevbegrunnelser(behandlingId, vedtaksperiodeId);
        const andreBrevbegrunnelser = queryKeys.genererteBrevbegrunnelser(behandlingId, annenVedtaksperiodeId);
        leggTilQueries(
            queryKeys.behandling(behandlingId),
            queryKeys.vedtaksperioder(behandlingId),
            brevbegrunnelser,
            andreBrevbegrunnelser
        );

        await queryClient.invalidateQueries({ queryKey: queryKeys.vedtaksperioder(behandlingId) });

        expect(erInvalidert(brevbegrunnelser)).toBe(true);
        expect(erInvalidert(andreBrevbegrunnelser)).toBe(true);
        expect(erInvalidert(queryKeys.behandling(behandlingId))).toBe(false);
    });

    test('skal kun invalidere genererte brevbegrunnelser for én vedtaksperiode', async () => {
        const brevbegrunnelser = queryKeys.genererteBrevbegrunnelser(behandlingId, vedtaksperiodeId);
        const andreBrevbegrunnelser = queryKeys.genererteBrevbegrunnelser(behandlingId, annenVedtaksperiodeId);
        leggTilQueries(
            queryKeys.behandling(behandlingId),
            queryKeys.vedtaksperioder(behandlingId),
            brevbegrunnelser,
            andreBrevbegrunnelser
        );

        await queryClient.invalidateQueries({ queryKey: brevbegrunnelser });

        expect(erInvalidert(brevbegrunnelser)).toBe(true);
        expect(erInvalidert(andreBrevbegrunnelser)).toBe(false);
        expect(erInvalidert(queryKeys.vedtaksperioder(behandlingId))).toBe(false);
        expect(erInvalidert(queryKeys.behandling(behandlingId))).toBe(false);
    });

    test('skal ikke invalidere forelder når en underliggende nøkkel invalideres', async () => {
        leggTilQueries(queryKeys.person(ident), queryKeys.fagsak(fagsakId), queryKeys.behandling(behandlingId));

        await queryClient.invalidateQueries({ queryKey: personnøkler.fagsaker });
        await queryClient.invalidateQueries({ queryKey: fagsaknøkler.klagebehandlinger });
        await queryClient.invalidateQueries({ queryKey: behandlingsnøkler.simulering });

        expect(erInvalidert(queryKeys.person(ident))).toBe(false);
        expect(erInvalidert(queryKeys.fagsak(fagsakId))).toBe(false);
        expect(erInvalidert(queryKeys.behandling(behandlingId))).toBe(false);
    });

    test('skal ikke invalidere nøkler for andre personer, fagsaker eller behandlinger', async () => {
        const annenPersonsFagsaker = queryKeys.fagsaker(annenIdent);
        const annenFagsaksKlagebehandlinger = queryKeys.klagebehandlinger(annenFagsakId);
        const annenBehandlingsSimulering = queryKeys.simulering(annenBehandlingId);
        leggTilQueries(annenPersonsFagsaker, annenFagsaksKlagebehandlinger, annenBehandlingsSimulering);

        await queryClient.invalidateQueries({ queryKey: queryKeys.person(ident) });
        await queryClient.invalidateQueries({ queryKey: queryKeys.fagsak(fagsakId) });
        await queryClient.invalidateQueries({ queryKey: queryKeys.behandling(behandlingId) });

        expect(erInvalidert(annenPersonsFagsaker)).toBe(false);
        expect(erInvalidert(annenFagsaksKlagebehandlinger)).toBe(false);
        expect(erInvalidert(annenBehandlingsSimulering)).toBe(false);
    });

    test('skal ikke invalidere frittstående nøkler når person, fagsak eller behandling invalideres', async () => {
        leggTilQueries(...Object.values(frittståendeNøkler));

        await queryClient.invalidateQueries({ queryKey: queryKeys.person(ident) });
        await queryClient.invalidateQueries({ queryKey: queryKeys.fagsak(fagsakId) });
        await queryClient.invalidateQueries({ queryKey: queryKeys.behandling(behandlingId) });

        for (const nøkkel of Object.values(frittståendeNøkler)) {
            expect(erInvalidert(nøkkel)).toBe(false);
        }
    });

    test('skal ha unike nøkler', () => {
        const alleNøkler = [
            queryKeys.person(ident),
            queryKeys.fagsak(fagsakId),
            queryKeys.behandling(behandlingId),
            ...Object.values(personnøkler),
            ...Object.values(fagsaknøkler),
            ...Object.values(behandlingsnøkler),
            ...Object.values(frittståendeNøkler),
        ].map(nøkkel => JSON.stringify(nøkkel));

        expect(new Set(alleNøkler).size).toBe(alleNøkler.length);
    });

    test('skal teste alle nøkler i queryKeys', () => {
        const testedeNøkler = [
            'person',
            'fagsak',
            'behandling',
            ...Object.keys(personnøkler),
            ...Object.keys(fagsaknøkler),
            ...Object.keys(behandlingsnøkler),
            ...Object.keys(frittståendeNøkler),
        ];

        expect(testedeNøkler.sort()).toEqual(Object.keys(queryKeys).sort());
    });
});
