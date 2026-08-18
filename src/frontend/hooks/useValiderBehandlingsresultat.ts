import { validerBehandlingsresultat } from '@api/validerBehandlingsresultat';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

type Options = Omit<UseQueryOptions<boolean>, 'queryKey' | 'queryFn'>;

export const ValiderBehandlingsresultatQueryKeyFactory = {
    validerBehandlingsresultat: (behandlingId: number) => ['validerBehandlingsresultat', behandlingId],
};

export function useValiderBehandlingsresultat(behandlingId: number, options?: Options) {
    return useQuery({
        queryKey: ValiderBehandlingsresultatQueryKeyFactory.validerBehandlingsresultat(behandlingId),
        queryFn: () => validerBehandlingsresultat(behandlingId),
        ...options,
    });
}
