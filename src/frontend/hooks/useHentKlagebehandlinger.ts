import { hentKlagebehandlinger } from '@api/hentKlagebehandlinger';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';
import type { FagsakId } from '@typer/fagsak';

export function useHentKlagebehandlinger(fagsakId: FagsakId) {
    return useQuery({
        queryKey: queryKeys.klagebehandlinger(fagsakId),
        queryFn: () => hentKlagebehandlinger(fagsakId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
