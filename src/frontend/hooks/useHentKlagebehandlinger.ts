import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentKlagebehandlinger } from '../api/hentKlagebehandlinger';

export const KLAGEBEHANDLINGER_QUERY_KEY_PREFIX = 'klagebehandlinger';

export function useHentKlagebehandlinger(fagsakId: number) {
    const { request } = useHttp();
    return useQuery({
        queryKey: [KLAGEBEHANDLINGER_QUERY_KEY_PREFIX, fagsakId],
        queryFn: () => hentKlagebehandlinger(request, fagsakId),
    });
}
