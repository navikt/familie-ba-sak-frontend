import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentKlagebehandlinger } from '../api/hentKlagebehandlinger';

export function utledKlagebehandlingerQueryKey(fagsakId: number) {
    return ['klagebehandlinger', fagsakId];
}

export function useHentKlagebehandlinger(fagsakId: number) {
    const { request } = useHttp();
    const query = useQuery({
        queryKey: utledKlagebehandlingerQueryKey(fagsakId),
        queryFn: () => hentKlagebehandlinger(request, fagsakId),
    });
    return { ...query };
}
