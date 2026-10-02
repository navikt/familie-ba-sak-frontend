import { hentPersonEnkel } from '@api/hentPersonEnkel';
import { type DefaultError, type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { IPersonInfo } from '@typer/person';

export const HentPersonEnkelQueryKeyFactory = {
    personEnkel: (personIdent: string) => ['person_enkel', personIdent],
};

type Options = Omit<UseQueryOptions<IPersonInfo, DefaultError, IPersonInfo>, 'queryKey' | 'queryFn' | 'gcTime'>;

export function useHentPersonEnkel(personIdent: string, options?: Options) {
    return useQuery({
        queryKey: HentPersonEnkelQueryKeyFactory.personEnkel(personIdent),
        queryFn: () => hentPersonEnkel({ ident: personIdent }),
        gcTime: 0,
        ...options,
    });
}
