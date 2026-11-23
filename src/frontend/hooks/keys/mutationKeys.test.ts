import { type MutationKey, QueryClient } from '@tanstack/react-query';
import { describe, expect, test } from 'vitest';

import { mutationKeys } from './mutationKeys';

const grupper = [
    {
        navn: 'fagsak',
        operasjoner: [mutationKeys.forhåndsvisBrevPåFagsak, mutationKeys.sendInformasjonsbrev],
    },
    {
        navn: 'behandling',
        operasjoner: [mutationKeys.opprettSammensattKontrollsak, mutationKeys.slettSammensattKontrollsak],
    },
    {
        navn: 'vedtaksperiode',
        operasjoner: [
            mutationKeys.oppdaterVedtaksperiodeMedBegrunnelser,
            mutationKeys.oppdaterVedtaksperiodeMedFritekster,
        ],
    },
    {
        navn: 'endret utbetaling',
        operasjoner: [mutationKeys.oppdaterEndretUtbetalingAndel, mutationKeys.slettEndretUtbetalingAndel],
    },
    {
        navn: 'refusjon EØS',
        operasjoner: [mutationKeys.slettRefusjonEøs],
    },
    {
        navn: 'feilutbetalt valuta',
        operasjoner: [mutationKeys.slettFeilutbetaltValuta],
    },
];

const frittståendeOperasjoner = [
    mutationKeys.hentFagsakPåPerson,
    mutationKeys.hentFagsakerPåPerson,
    mutationKeys.slettBrevmottaker,
    mutationKeys.slettVilkårResultat,
    mutationKeys.opprettForhåndsvisbarTilbakekrevingVarselbrevPdf,
];

const frittståendeNøkler = frittståendeOperasjoner.map(operasjon => operasjon());

function leggTilMutasjoner(queryClient: QueryClient, nøkler: MutationKey[]) {
    return nøkler.map(mutationKey => queryClient.getMutationCache().build(queryClient, { mutationKey }));
}

describe('mutationKeys', () => {
    test.each(grupper)('skal skille mellom operasjoner og ressurser for $navn', ({ operasjoner }) => {
        const queryClient = new QueryClient();
        const nøkler = operasjoner.map(operasjon => operasjon(1));
        const mutasjoner = leggTilMutasjoner(queryClient, nøkler);
        leggTilMutasjoner(queryClient, [
            ...grupper.flatMap(gruppe => gruppe.operasjoner.map(operasjon => operasjon(2))),
            ...grupper
                .filter(gruppe => gruppe.operasjoner !== operasjoner)
                .flatMap(gruppe => gruppe.operasjoner.map(operasjon => operasjon(1))),
            ...frittståendeNøkler,
        ]);

        for (const [indeks, mutationKey] of nøkler.entries()) {
            expect(queryClient.getMutationCache().findAll({ mutationKey })).toEqual([mutasjoner[indeks]]);
        }
    });

    test('skal skille mellom frittstående mutasjoner', () => {
        const queryClient = new QueryClient();
        const mutasjoner = leggTilMutasjoner(queryClient, frittståendeNøkler);

        for (const [indeks, mutationKey] of frittståendeNøkler.entries()) {
            expect(queryClient.getMutationCache().findAll({ mutationKey })).toEqual([mutasjoner[indeks]]);
        }
    });

    test('skal teste alle nøkler i mutationKeys', () => {
        const testedeOperasjoner = new Set<unknown>([
            ...grupper.flatMap<unknown>(gruppe => gruppe.operasjoner),
            ...frittståendeOperasjoner,
        ]);

        const utestedeNøkler = Object.entries(mutationKeys)
            .filter(([, operasjon]) => !testedeOperasjoner.has(operasjon))
            .map(([navn]) => navn);

        expect(utestedeNøkler).toEqual([]);
    });
});
