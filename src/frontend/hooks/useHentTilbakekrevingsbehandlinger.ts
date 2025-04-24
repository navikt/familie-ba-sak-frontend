import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentTilbakekrevingsbehandlinger } from '../api/hentTilbakekrevingsbehandlinger';

export const TILBAKEKREVINGSBEHANDLINGER_QUERY_KEY_PREFIX = 'tilbakekrevingsbehandlinger';

export function useHentTilbakekrevingsbehandlinger(fagsakId: number) {
    const { request } = useHttp();
    return useQuery({
        queryKey: [TILBAKEKREVINGSBEHANDLINGER_QUERY_KEY_PREFIX, fagsakId],
        queryFn: () => hentTilbakekrevingsbehandlinger(request, fagsakId),
    });
}
