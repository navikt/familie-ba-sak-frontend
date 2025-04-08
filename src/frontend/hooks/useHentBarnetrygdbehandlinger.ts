import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentBarnetrygdbehandlinger } from '../api/hentBarnetrygdbehandlinger';

export function useHentBarnetrygdbehandlinger(fagsakId: number) {
    const { request } = useHttp();
    return useQuery({
        queryKey: ['barnetrygdbehandlinger', fagsakId],
        queryFn: () => hentBarnetrygdbehandlinger(request, fagsakId),
    });
}
