import { hentPersonEnkel } from '@api/hentPersonEnkel';
import { type DefaultError, useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { IPersonInfo } from '@typer/person';

import { useHttp } from '@navikt/familie-http';

export const HentPersonEnkelQueryKeyFactory = {
    personEnkel: (personIdent: string) => ['person_enkel', personIdent],
};

type Parameters = Omit<UseQueryOptions<IPersonInfo, DefaultError, IPersonInfo>, 'queryKey' | 'queryFn' | 'gcTime'> & {
    personIdent: string;
};

export function useHentPersonEnkel({ personIdent, ...rest }: Parameters) {
    const { request } = useHttp();
    return useQuery({
        queryKey: HentPersonEnkelQueryKeyFactory.personEnkel(personIdent),
        queryFn: () => hentPersonEnkel(request, personIdent),
        gcTime: 0,
        ...rest,
    });
}
