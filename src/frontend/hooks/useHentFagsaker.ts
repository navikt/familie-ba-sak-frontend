import { type DefaultError, useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentFagsaker } from '../api/hentFagsaker';
import {
    type IBaseFagsak,
    type IMinimalFagsak,
    mapMinimalFagsakTilBaseFagsak,
} from '../typer/fagsak';

export const HentFagsakerQueryKeyFactory = {
    fagsaker: (personIdent: string) => ['fagsaker', personIdent],
};

type Parameters = Omit<
    UseQueryOptions<IMinimalFagsak[], DefaultError, IBaseFagsak[]>,
    'queryKey' | 'queryFn' | 'select'
> & {
    personIdent: string;
    påvirkerSystemLaster?: boolean;
};

export function useHentFagsaker({
    personIdent,
    påvirkerSystemLaster = false,
    ...rest
}: Parameters) {
    const { request } = useHttp();
    return useQuery({
        queryKey: HentFagsakerQueryKeyFactory.fagsaker(personIdent),
        queryFn: () => hentFagsaker(request, personIdent, påvirkerSystemLaster),
        select: fagsaker => fagsaker.map(mapMinimalFagsakTilBaseFagsak),
        gcTime: 0, // deaktiver cache da "påvirkerSystemLaster" er false (kan overskrives).
        ...rest,
    });
}
