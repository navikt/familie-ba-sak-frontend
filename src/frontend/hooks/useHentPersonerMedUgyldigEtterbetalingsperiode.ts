import { hentPersonerMedUgyldigEtterbetalingsperiode } from '@api/hentPersonerMedUgyldigEtterbetalingsperiode';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

type Options = Omit<UseQueryOptions<string[]>, 'queryKey' | 'queryFn'>;

export const HentPersonerMedUgyldigEtterbetalingsperiodeQueryKeyFactory = {
    personerMedUgyldigEtterbetalingsperiode: (behandlingId: number) => [
        'personerMedUgyldigEtterbetalingsperiode',
        behandlingId,
    ],
};

export function useHentPersonerMedUgyldigEtterbetalingsperiode(behandlingId: number, options?: Options) {
    return useQuery({
        queryKey:
            HentPersonerMedUgyldigEtterbetalingsperiodeQueryKeyFactory.personerMedUgyldigEtterbetalingsperiode(
                behandlingId
            ),
        queryFn: () => hentPersonerMedUgyldigEtterbetalingsperiode(behandlingId),
        ...options,
    });
}
