import { hentBarnetrygdbehandlinger } from '@api/hentBarnetrygdbehandlinger';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export function useHentBarnetrygdbehandlinger(fagsakId: number) {
    return useQuery({
        queryKey: queryKeys.barnetrygdbehandlinger(fagsakId),
        queryFn: () => hentBarnetrygdbehandlinger(fagsakId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
