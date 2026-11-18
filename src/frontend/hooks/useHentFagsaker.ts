import { hentFagsaker } from '@api/hentFagsaker';
import { queryKeys } from '@hooks/keys/queryKeys';
import { type DefaultError, type UseQueryOptions, useQuery } from '@tanstack/react-query';
import { type IBaseFagsak, type IMinimalFagsak, mapMinimalFagsakTilBaseFagsak } from '@typer/fagsak';

type Options = Omit<
    UseQueryOptions<IMinimalFagsak[], DefaultError, IBaseFagsak[]>,
    'queryKey' | 'queryFn' | 'select' | 'gcTime'
>;

export function useHentFagsaker(personIdent: string, options?: Options) {
    return useQuery({
        queryKey: queryKeys.fagsaker(personIdent),
        queryFn: () => hentFagsaker({ personIdent }),
        select: fagsaker => fagsaker.map(mapMinimalFagsakTilBaseFagsak),
        gcTime: 0,
        ...options,
    });
}
