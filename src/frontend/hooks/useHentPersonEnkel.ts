import { hentPersonEnkel } from '@api/hentPersonEnkel';
import { useHttp } from '@navikt/familie-http';
import { type DefaultError, type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { IPersonInfo } from '@typer/person';

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
