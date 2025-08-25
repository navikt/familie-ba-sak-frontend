import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentBarnetrygdbehandlinger } from '../api/hentBarnetrygdbehandlinger';

export const HentBarnetrygdbehandlingerQueryKeyFactory = {
    fagsak: (fagsakId: number) => ['barnetrygdbehandlinger', fagsakId],
};

export function useHentBarnetrygdbehandlinger(fagsakId: number) {
    const { request } = useHttp();
    return useQuery({
        queryKey: HentBarnetrygdbehandlingerQueryKeyFactory.fagsak(fagsakId),
        queryFn: () => hentBarnetrygdbehandlinger(request, fagsakId),
    });
}
