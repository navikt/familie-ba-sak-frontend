import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentBarnetrygdbehandlinger } from '../api/hentBarnetrygdbehandlinger';

export const BARNETRYGDBEHANDLINGER_QUERY_KEY_PREFIX = 'barnetrygdbehandlinger';

export function useHentBarnetrygdbehandlinger(fagsakId: number) {
    const { request } = useHttp();
    return useQuery({
        queryKey: [BARNETRYGDBEHANDLINGER_QUERY_KEY_PREFIX, fagsakId],
        queryFn: () => hentBarnetrygdbehandlinger(request, fagsakId),
    });
}
