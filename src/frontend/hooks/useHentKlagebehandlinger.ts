import { hentKlagebehandlinger } from '@api/hentKlagebehandlinger';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export const HentKlagebehandlingerQueryKeyFactory = {
    fagsak: (fagsakId: number) => ['klagebehandlinger', fagsakId],
};

export function useHentKlagebehandlinger(fagsakId: number) {
    return useQuery({
        queryKey: HentKlagebehandlingerQueryKeyFactory.fagsak(fagsakId),
        queryFn: () => hentKlagebehandlinger(fagsakId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
