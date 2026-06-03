import {
    hentRegistrertSøknadstidspunktPåPerson,
    type IRegistrertSøknadstidspunktPåPersonDto,
} from '@api/hentRegistrertSøknadstidspunktPåPerson';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

export const HentRegistrertSøknadstidspunktPåPersonQueryKeyFactory = {
    registrertSøknadstidspunkt: (behandlingId: number) => ['registrert-soknadstidspunkt-paa-person', behandlingId],
};

type Options = Omit<UseQueryOptions<IRegistrertSøknadstidspunktPåPersonDto[]>, 'queryKey' | 'queryFn'>;

export function useHentRegistrertSøknadstidspunktPåPerson(behandlingId: number, options?: Options) {
    const { request } = useHttp();

    return useQuery({
        queryKey: HentRegistrertSøknadstidspunktPåPersonQueryKeyFactory.registrertSøknadstidspunkt(behandlingId),
        queryFn: () => hentRegistrertSøknadstidspunktPåPerson(request, behandlingId),
        ...options,
    });
}
