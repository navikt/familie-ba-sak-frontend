import {
    hentRegistrerteSøknadstidspunkter,
    type RegistrertSøknadstidspunkt,
} from '@api/hentRegistrerteSøknadstidspunkter';
import { queryKeys } from '@hooks/keys/queryKeys';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

type Options = Omit<UseQueryOptions<RegistrertSøknadstidspunkt[]>, 'queryKey' | 'queryFn'>;

export function useHentRegistrerteSøknadstidspunkter(behandlingId: number, options?: Options) {
    return useQuery({
        queryKey: queryKeys.registrerteSøknadstidspunkter(behandlingId),
        queryFn: () => hentRegistrerteSøknadstidspunkter(behandlingId),
        ...options,
    });
}
