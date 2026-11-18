import { hentTilbakekrevingsbehandlinger } from '@api/hentTilbakekrevingsbehandlinger';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export function useHentTilbakekrevingsbehandlinger(fagsakId: number) {
    return useQuery({
        queryKey: queryKeys.tilbakekrevingsbehandlinger(fagsakId),
        queryFn: () => hentTilbakekrevingsbehandlinger(fagsakId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
