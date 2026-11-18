import { validerBehandlingsresultat } from '@api/validerBehandlingsresultat';
import { queryKeys } from '@hooks/keys/queryKeys';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

type Options = Omit<UseQueryOptions<boolean>, 'queryKey' | 'queryFn'>;

export function useValiderBehandlingsresultat(behandlingId: number, options?: Options) {
    return useQuery({
        queryKey: queryKeys.validerBehandlingsresultat(behandlingId),
        queryFn: () => validerBehandlingsresultat(behandlingId),
        ...options,
    });
}
