import { hentKlagebehandlinger } from '@api/hentKlagebehandlinger';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export function useHentKlagebehandlinger(fagsakId: number) {
    return useQuery({
        queryKey: queryKeys.klagebehandlinger(fagsakId),
        queryFn: () => hentKlagebehandlinger(fagsakId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
