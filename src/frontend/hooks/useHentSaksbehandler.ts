import { type DefaultError, useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { hentSaksbehandler } from '../api/hentSaksbehandler';
import type { Saksbehandler } from '../typer/saksbehandler';

type Options = Omit<
    UseQueryOptions<Saksbehandler, DefaultError, Saksbehandler>,
    'queryKey' | 'queryFn' | 'gcTime' | 'staleTime'
>;

export function useHentSaksbehandler(options?: Options) {
    return useQuery({
        queryKey: ['saksbehandler'],
        queryFn: () => hentSaksbehandler(),
        gcTime: 0,
        staleTime: 0,
        ...options,
    });
}
