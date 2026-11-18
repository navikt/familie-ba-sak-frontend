import { hentPersonEnkel } from '@api/hentPersonEnkel';
import { queryKeys } from '@hooks/keys/queryKeys';
import { type DefaultError, type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { IPersonInfo } from '@typer/person';

type Options = Omit<UseQueryOptions<IPersonInfo, DefaultError, IPersonInfo>, 'queryKey' | 'queryFn' | 'gcTime'>;

export function useHentPersonEnkel(ident: string, options?: Options) {
    return useQuery({
        queryKey: queryKeys.personEnkel(ident),
        queryFn: () => hentPersonEnkel({ ident }),
        gcTime: 0,
        ...options,
    });
}
