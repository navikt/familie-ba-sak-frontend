import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentFagsak } from '../api/hentFagsak';
import { useAppContext } from '../context/AppContext';
import type { IMinimalFagsak } from '../typer/fagsak';
import { PersonType } from '../typer/person';

// TODO : Refactor so it does not mutate fagsak object, but return a new object instead
function obfuskerFagsak(fagsak: IMinimalFagsak) {
    fagsak.gjeldendeUtbetalingsperioder.forEach(gup => {
        let indeks = 1;
        gup.utbetalingsperiodeDetaljer
            .sort((a, b) => b.person.fødselsdato.localeCompare(a.person.fødselsdato))
            .forEach(upd => {
                if (upd.person.type === PersonType.SØKER) {
                    upd.person.navn = 'Søker Søkersen';
                } else {
                    upd.person.navn = '[' + indeks++ + '] Barn Barnesen';
                }
            });
    });
}

export const HentFagsakQueryKeyFactory = {
    fagsak: (fagsakId: number | undefined) => ['fagsak', fagsakId],
};

export function useHentFagsak(fagsakId: number | undefined) {
    const { request } = useHttp();
    const { skalObfuskereData } = useAppContext();
    return useQuery({
        queryKey: HentFagsakQueryKeyFactory.fagsak(fagsakId),
        queryFn: () => {
            if (fagsakId === undefined) {
                return Promise.reject(new Error('Kan ikke hente fagsak uten fagsakId.'));
            }
            return hentFagsak(request, fagsakId);
        },
        select: fagsak => {
            if (skalObfuskereData) {
                obfuskerFagsak(fagsak);
            }
            return fagsak;
        },
        enabled: fagsakId !== undefined,
    });
}
