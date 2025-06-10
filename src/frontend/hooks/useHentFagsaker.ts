import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentFagsaker } from '../api/hentFagsaker';
import { mapMinimalFagsakTilBaseFagsak } from '../typer/fagsak';

export const FAGSAKER_QUERY_KEY_PREFIX = 'fagsaker';

interface Props {
    personIdent: string | undefined;
}

export function useHentFagsaker({ personIdent }: Props) {
    const { request } = useHttp();
    return useQuery({
        queryKey: [FAGSAKER_QUERY_KEY_PREFIX, personIdent],
        queryFn: () => {
            if (personIdent === undefined) {
                return Promise.reject(
                    new Error('Kan ikke hente fagsaker når personens ident ikke er satt.')
                );
            }
            return hentFagsaker(request, personIdent);
        },
        select: fagsaker => fagsaker.map(mapMinimalFagsakTilBaseFagsak),
        enabled: personIdent !== undefined,
    });
}
