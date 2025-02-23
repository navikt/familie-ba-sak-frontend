import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentTilbakekrevingbehandlinger } from '../api/hentTilbakekrevingbehandlinger';

export function utledTilbakekrevingsbehandlingerQueryKey(fagsakId: number) {
    return ['tilbakekrevingsbehandlinger', fagsakId];
}

export function useHentTilbakekrevingsbehandlinger(fagsakId: number) {
    const { request } = useHttp();
    const query = useQuery({
        queryKey: utledTilbakekrevingsbehandlingerQueryKey(fagsakId),
        queryFn: () => hentTilbakekrevingbehandlinger(request, fagsakId),
    });
    return { ...query };
}
