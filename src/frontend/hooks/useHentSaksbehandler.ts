import { type DefaultError, useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { ISaksbehandler } from '@navikt/familie-typer';

import { hentSaksbehandler } from '../api/hentSaksbehandler';
import { mapISaksbehandlerTilSaksbehandler, type Saksbehandler } from '../typer/saksbehandler';

type Options = Omit<
    UseQueryOptions<ISaksbehandler, DefaultError, Saksbehandler>,
    'queryKey' | 'queryFn' | 'gcTime' | 'staleTime' | 'select'
>;

export function useHentSaksbehandler(options?: Options) {
    return useQuery({
        queryKey: ['saksbehandler'],
        queryFn: hentSaksbehandler,
        select: mapISaksbehandlerTilSaksbehandler,
        gcTime: 0,
        staleTime: 0,
        ...options,
    });
}
