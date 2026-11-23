import { hentFiltreringsresultater } from '@api/hentFiltreringsresultater';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export function useHentFiltreringsresultater(behandlingId: number) {
    return useQuery({
        queryKey: queryKeys.filtreringsresultater(behandlingId),
        queryFn: () => hentFiltreringsresultater(behandlingId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        staleTime: Infinity,
    });
}
