import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentInfotrygdSaker } from './hentInfotrygdSaker';

export const INFOTRYGD_SAKER_QUERY_KEY_PREFIX = 'infotrygdSaker';

export function useHentInfotrygdSaker(ident: string) {
    const { request } = useHttp();
    return useQuery({
        queryKey: [INFOTRYGD_SAKER_QUERY_KEY_PREFIX, ident],
        queryFn: () => hentInfotrygdSaker(request, ident),
    });
}
