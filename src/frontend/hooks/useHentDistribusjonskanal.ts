import { hentDistribusjonskanal } from '@api/hentDistribusjonskanal';
import { type DefaultError, useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { Distribusjonskanal } from '@typer/dokument';

import { useHttp } from '@navikt/familie-http';

type Options = Omit<UseQueryOptions<Distribusjonskanal, DefaultError>, 'queryKey' | 'queryFn'>;

export const HentDistribusjonskanalQueryKeyFactory = {
    distribusjonskanal: (personIdent: string) => ['hentDistribusjonskanal', personIdent],
};

export function useHentDistribusjonskanal(personIdent: string, options?: Options) {
    const { request } = useHttp();
    return useQuery({
        queryKey: HentDistribusjonskanalQueryKeyFactory.distribusjonskanal(personIdent),
        queryFn: () => hentDistribusjonskanal(request, personIdent),
        ...options,
    });
}
