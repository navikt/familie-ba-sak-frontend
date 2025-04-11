import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentTilbakekrevingsbehandlinger } from '../api/hentTilbakekrevingsbehandlinger';

export function useHentTilbakekrevingsbehandlinger(fagsakId: number) {
    const { request } = useHttp();
    return useQuery({
        queryKey: ['tilbakekrevingsbehandlinger', fagsakId],
        queryFn: () => hentTilbakekrevingsbehandlinger(request, fagsakId),
    });
}
