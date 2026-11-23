import { hentPersonerMedUgyldigEtterbetalingsperiode } from '@api/hentPersonerMedUgyldigEtterbetalingsperiode';
import { queryKeys } from '@hooks/keys/queryKeys';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

type Options = Omit<UseQueryOptions<string[]>, 'queryKey' | 'queryFn'>;

export function useHentPersonerMedUgyldigEtterbetalingsperiode(behandlingId: number, options?: Options) {
    return useQuery({
        queryKey: queryKeys.personerMedUgyldigEtterbetalingsperiode(behandlingId),
        queryFn: () => hentPersonerMedUgyldigEtterbetalingsperiode(behandlingId),
        ...options,
    });
}
