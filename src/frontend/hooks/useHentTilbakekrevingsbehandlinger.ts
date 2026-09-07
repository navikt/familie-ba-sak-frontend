import { hentTilbakekrevingsbehandlinger } from '@api/hentTilbakekrevingsbehandlinger';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export const HentTilbakekrevingsbehandlingerQueryKeyFactory = {
    fagsak: (fagsakId: number) => ['tilbakekrevingsbehandlinger', fagsakId],
};

export function useHentTilbakekrevingsbehandlinger(fagsakId: number) {
    return useQuery({
        queryKey: HentTilbakekrevingsbehandlingerQueryKeyFactory.fagsak(fagsakId),
        queryFn: () => hentTilbakekrevingsbehandlinger(fagsakId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
