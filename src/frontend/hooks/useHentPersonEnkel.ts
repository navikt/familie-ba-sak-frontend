import { hentPersonEnkel } from '@api/hentPersonEnkel';
import { type DefaultError, type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { IPersonInfo } from '@typer/person';

export const HentPersonEnkelQueryKeyFactory = {
    personEnkel: (ident: string) => ['person_enkel', ident],
};

type Options = Omit<UseQueryOptions<IPersonInfo, DefaultError, IPersonInfo>, 'queryKey' | 'queryFn' | 'gcTime'>;

export function useHentPersonEnkel(ident: string, options?: Options) {
    return useQuery({
        queryKey: HentPersonEnkelQueryKeyFactory.personEnkel(ident),
        queryFn: () => hentPersonEnkel({ ident }),
        gcTime: 0,
        ...options,
    });
}
