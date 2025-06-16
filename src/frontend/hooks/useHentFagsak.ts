import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentFagsak } from '../api/hentFagsak';
import { useAppContext } from '../context/AppContext';
import type { IMinimalFagsak } from '../typer/fagsak';
import { type IGrunnlagPerson, PersonType } from '../typer/person';

export const FAGSAK_QUERY_KEY_PREFIX = 'fagsak';

function sammenlignFødselsdato<T extends { fødselsdato?: string; person?: IGrunnlagPerson }>(
    a: T,
    b: T
) {
    if (a.person && b.person) return b.person.fødselsdato.localeCompare(a.person.fødselsdato);
    if (a.fødselsdato && b.fødselsdato) return b.fødselsdato.localeCompare(a.fødselsdato);
    return 0;
}

// TODO : Refactor so it does not mutate fagsak object, but return a new object instead
function obfuskerFagsak(fagsak: IMinimalFagsak) {
    fagsak.gjeldendeUtbetalingsperioder?.forEach(gup => {
        let indeks = 1;
        gup.utbetalingsperiodeDetaljer?.sort(sammenlignFødselsdato).forEach(upd => {
            if (upd.person.type === PersonType.SØKER) {
                upd.person.navn = 'Søker Søkersen';
            } else {
                upd.person.navn = '[' + indeks++ + '] Barn Barnesen';
            }
        });
    });
}

export function useHentFagsak(fagsakId: string | undefined) {
    const { request } = useHttp();
    const queryClient = useQueryClient();
    const { skalObfuskereData } = useAppContext();
    return useQuery({
        queryKey: [FAGSAK_QUERY_KEY_PREFIX, fagsakId],
        queryFn: async () => {
            if (fagsakId === undefined) {
                return Promise.reject(new Error('Kan ikke hente fagsak uten fagsakId.'));
            }
            const fagsak = await hentFagsak(request, fagsakId);
            queryClient.invalidateQueries({
                queryKey: ['fagsak', fagsak.søkerFødselsnummer],
            });
            return Promise.resolve(fagsak);
        },
        select: fagsak => {
            if (!skalObfuskereData) {
                obfuskerFagsak(fagsak);
            }
            return fagsak;
        },
        enabled: fagsakId !== undefined,
    });
}
