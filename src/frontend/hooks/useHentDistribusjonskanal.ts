import { hentDistribusjonskanal } from '@api/hentDistribusjonskanal';
import { MetaKey } from '@hooks/meta/metaKey';
import { type DefaultError, useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { Distribusjonskanal } from '@typer/dokument';

type Options = Omit<UseQueryOptions<Distribusjonskanal, DefaultError>, 'queryKey' | 'queryFn'>;

export const HentDistribusjonskanalQueryKeyFactory = {
    distribusjonskanal: (personIdent: string | undefined) => ['hentDistribusjonskanal', personIdent],
};

export function useHentDistribusjonskanal(personIdent: string | undefined, options?: Options) {
    return useQuery({
        queryKey: HentDistribusjonskanalQueryKeyFactory.distribusjonskanal(personIdent),
        queryFn: () => {
            if (personIdent === undefined) {
                throw new Error('Kan ikke hente distribusjonskanal uten personIdent.');
            }
            return hentDistribusjonskanal(personIdent);
        },
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        ...options,
    });
}
