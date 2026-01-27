import { type DefaultError, useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentGenererteBrevbegrunnelser } from '../api/hentGenererteBrevbegrunnelser';

export const HentGenererteBrevbegrunnelserQueryKeyFactory = {
    vedtaksperiode: (vedtaksperiodeId: number) => ['genererteBrevbegrunnelser', vedtaksperiodeId],
};

type Options = Omit<UseQueryOptions<string[], DefaultError, string[]>, 'queryKey' | 'queryFn' | 'gcTime'> & {
    vedtaksperiodeId: number;
};

export function useHentGenererteBrevbegrunnelser({ vedtaksperiodeId, ...options }: Options) {
    const { request } = useHttp();
    return useQuery({
        queryKey: HentGenererteBrevbegrunnelserQueryKeyFactory.vedtaksperiode(vedtaksperiodeId),
        queryFn: () => hentGenererteBrevbegrunnelser(request, vedtaksperiodeId),
        ...options,
    });
}
