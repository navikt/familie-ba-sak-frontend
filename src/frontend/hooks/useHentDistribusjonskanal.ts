import { hentDistribusjonskanal } from '@api/hentDistribusjonskanal';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { Distribusjonskanal } from '@typer/dokument';

type Options = Omit<UseQueryOptions<Distribusjonskanal>, 'queryKey' | 'queryFn' | 'enabled'>;

export function useHentDistribusjonskanal(personIdent: string | undefined, options?: Options) {
    return useQuery({
        queryKey: queryKeys.distribusjonskanal(personIdent),
        queryFn: () => {
            if (personIdent === undefined) {
                throw new Error('Kan ikke hente distribusjonskanal uten personIdent.');
            }
            return hentDistribusjonskanal(personIdent);
        },
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        enabled: personIdent !== undefined,
        ...options,
    });
}
