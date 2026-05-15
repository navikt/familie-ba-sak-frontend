import { hentGenererteBrevbegrunnelser } from '@api/hentGenererteBrevbegrunnelser';
import { type DefaultError, useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

export const HentGenererteBrevbegrunnelserQueryKeyFactory = {
    vedtaksperiode: (vedtaksperiodeId: number) => ['genererteBrevbegrunnelser', vedtaksperiodeId],
};

type Options = Omit<UseQueryOptions<string[], DefaultError, string[]>, 'queryKey' | 'queryFn' | 'select'>;

export function useHentGenererteBrevbegrunnelser(vedtaksperiodeId: number, options?: Options) {
    const { request } = useHttp();
    return useQuery({
        queryKey: HentGenererteBrevbegrunnelserQueryKeyFactory.vedtaksperiode(vedtaksperiodeId),
        queryFn: () => hentGenererteBrevbegrunnelser(request, vedtaksperiodeId),
        select: data => data.toSorted(),
        ...options,
    });
}
