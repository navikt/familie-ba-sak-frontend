import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentKlagebehandlinger } from '../api/hentKlagebehandlinger';

export function useHentKlagebehandlinger(fagsakId: number) {
    const { request } = useHttp();
    return useQuery({
        queryKey: ['klagebehandlinger', fagsakId],
        queryFn: () => hentKlagebehandlinger(request, fagsakId),
    });
}
