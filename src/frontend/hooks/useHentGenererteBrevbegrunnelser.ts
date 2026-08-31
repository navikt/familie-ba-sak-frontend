import { hentGenererteBrevbegrunnelser } from '@api/hentGenererteBrevbegrunnelser';
import { useHttp } from '@navikt/familie-http';
import { type DefaultError, type UseQueryOptions, useQuery } from '@tanstack/react-query';

export const HentGenererteBrevbegrunnelserQueryKeyFactory = {
    vedtaksperiode: (vedtaksperiodeId: number) => ['genererteBrevbegrunnelser', vedtaksperiodeId],
};

type Options = Omit<UseQueryOptions<string[], DefaultError, string[]>, 'queryKey' | 'queryFn'>;

export function useHentGenererteBrevbegrunnelser(vedtaksperiodeId: number, options?: Options) {
    const { request } = useHttp();
    return useQuery({
        queryKey: HentGenererteBrevbegrunnelserQueryKeyFactory.vedtaksperiode(vedtaksperiodeId),
        queryFn: () => hentGenererteBrevbegrunnelser(request, vedtaksperiodeId),
        ...options,
    });
}
