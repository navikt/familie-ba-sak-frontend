import { hentGenererteBrevbegrunnelser } from '@api/hentGenererteBrevbegrunnelser';
import { queryKeys } from '@hooks/keys/queryKeys';
import { type DefaultError, type UseQueryOptions, useQuery } from '@tanstack/react-query';

type Options = Omit<UseQueryOptions<string[], DefaultError, string[]>, 'queryKey' | 'queryFn'>;

export function useHentGenererteBrevbegrunnelser(behandlingId: number, vedtaksperiodeId: number, options?: Options) {
    return useQuery({
        queryKey: queryKeys.genererteBrevbegrunnelser(behandlingId, vedtaksperiodeId),
        queryFn: () => hentGenererteBrevbegrunnelser(vedtaksperiodeId),
        ...options,
    });
}
