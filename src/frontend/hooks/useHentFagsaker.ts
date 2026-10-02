import { hentFagsaker } from '@api/hentFagsaker';
import { type DefaultError, type UseQueryOptions, useQuery } from '@tanstack/react-query';
import { type IBaseFagsak, type IMinimalFagsak, mapMinimalFagsakTilBaseFagsak } from '@typer/fagsak';

export const HentFagsakerQueryKeyFactory = {
    fagsaker: (personIdent: string) => ['fagsaker', personIdent],
};

type Options = Omit<
    UseQueryOptions<IMinimalFagsak[], DefaultError, IBaseFagsak[]>,
    'queryKey' | 'queryFn' | 'select' | 'gcTime'
>;

export function useHentFagsaker(personIdent: string, options?: Options) {
    return useQuery({
        queryKey: HentFagsakerQueryKeyFactory.fagsaker(personIdent),
        queryFn: () => hentFagsaker({ personIdent }),
        select: fagsaker => fagsaker.map(mapMinimalFagsakTilBaseFagsak),
        gcTime: 0,
        ...options,
    });
}
