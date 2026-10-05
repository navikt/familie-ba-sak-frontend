import { hentGenererteBrevbegrunnelser } from '@api/hentGenererteBrevbegrunnelser';
import { type DefaultError, type UseQueryOptions, useQuery } from '@tanstack/react-query';

export const HentGenererteBrevbegrunnelserQueryKeyFactory = {
    vedtaksperiode: (vedtaksperiodeId: number) => ['genererteBrevbegrunnelser', vedtaksperiodeId],
};

type Options = Omit<UseQueryOptions<string[], DefaultError, string[]>, 'queryKey' | 'queryFn'>;

export function useHentGenererteBrevbegrunnelser(vedtaksperiodeId: number, options?: Options) {
    return useQuery({
        queryKey: HentGenererteBrevbegrunnelserQueryKeyFactory.vedtaksperiode(vedtaksperiodeId),
        queryFn: () => hentGenererteBrevbegrunnelser(vedtaksperiodeId),
        ...options,
    });
}
