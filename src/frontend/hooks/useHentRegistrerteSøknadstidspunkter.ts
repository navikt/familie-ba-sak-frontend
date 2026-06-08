import {
    hentRegistrerteSøknadstidspunkter,
    type RegistrertSøknadstidspunkt,
} from '@api/hentRegistrerteSøknadstidspunkter';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

export const HentRegistrerteSøknadstidspunkterQueryKeyFactory = {
    registrerteSøknadstidspunkter: (behandlingId: number) => ['registrerte-soknadstidspunkter', behandlingId],
};

type Options = Omit<UseQueryOptions<RegistrertSøknadstidspunkt[]>, 'queryKey' | 'queryFn'>;

export function useHentRegistrerteSøknadstidspunkter(behandlingId: number, options?: Options) {
    return useQuery({
        queryKey: HentRegistrerteSøknadstidspunkterQueryKeyFactory.registrerteSøknadstidspunkter(behandlingId),
        queryFn: () => hentRegistrerteSøknadstidspunkter(behandlingId),
        ...options,
    });
}
