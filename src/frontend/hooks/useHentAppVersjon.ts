import { type DefaultError, useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentAppVersjon } from '../api/hentAppVersjon';

const FEM_MINUTTER = 300_000;

export const HentVersjonQueryKeyFactory = {
    versjon: () => ['versjon'],
};

type Options = Omit<UseQueryOptions<string, DefaultError, string>, 'queryKey' | 'queryFn' | 'gcTime' | 'staleTime'>;

export function useHentAppVersjon(options?: Options) {
    const { request } = useHttp();
    return useQuery({
        queryKey: HentVersjonQueryKeyFactory.versjon(),
        queryFn: () => hentAppVersjon(request),
        gcTime: 0,
        staleTime: 0,
        refetchIntervalInBackground: true,
        refetchInterval: FEM_MINUTTER,
        ...options,
    });
}
