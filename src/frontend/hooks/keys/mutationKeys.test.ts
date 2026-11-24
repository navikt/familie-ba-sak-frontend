import { type MutationKey, QueryClient } from '@tanstack/react-query';
import { FagsakId } from '@typer/fagsak';
import { describe, expect, test } from 'vitest';

import { mutationKeys } from './mutationKeys';

function lagGruppe<Id>(navn: string, lagId: (id: number) => Id, operasjoner: ((id: Id) => MutationKey)[]) {
    return {
        navn,
        operasjoner,
        lagNøkler: (id: number) => operasjoner.map(operasjon => operasjon(lagId(id))),
    };
}

const somTall = (id: number) => id;

const grupper = [
    lagGruppe('fagsak', FagsakId.fra, [mutationKeys.forhåndsvisBrevPåFagsak, mutationKeys.sendInformasjonsbrev]),
    lagGruppe('behandling', somTall, [
        mutationKeys.opprettSammensattKontrollsak,
        mutationKeys.slettSammensattKontrollsak,
    ]),
    lagGruppe('vedtaksperiode', somTall, [
        mutationKeys.oppdaterVedtaksperiodeMedBegrunnelser,
        mutationKeys.oppdaterVedtaksperiodeMedFritekster,
    ]),
    lagGruppe('endret utbetaling', somTall, [
        mutationKeys.oppdaterEndretUtbetalingAndel,
        mutationKeys.slettEndretUtbetalingAndel,
    ]),
    lagGruppe('refusjon EØS', somTall, [mutationKeys.slettRefusjonEøs]),
    lagGruppe('feilutbetalt valuta', somTall, [mutationKeys.slettFeilutbetaltValuta]),
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
    test.each(grupper)('skal skille mellom operasjoner og ressurser for $navn', gjeldendeGruppe => {
        const queryClient = new QueryClient();
        const nøkler = gjeldendeGruppe.lagNøkler(1);
        const mutasjoner = leggTilMutasjoner(queryClient, nøkler);
        leggTilMutasjoner(queryClient, [
            ...grupper.flatMap(gruppe => gruppe.lagNøkler(2)),
            ...grupper.filter(gruppe => gruppe !== gjeldendeGruppe).flatMap(gruppe => gruppe.lagNøkler(1)),
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
