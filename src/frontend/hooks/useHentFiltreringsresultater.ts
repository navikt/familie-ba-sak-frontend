import { hentFiltreringsresultater } from '@api/hentFiltreringsresultater';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export const HentFiltreringsresultaterQueryKeyFactory = {
    filtreringsresultater: (behandlingId: number) => ['filtreringsresultater', behandlingId],
};

export function useHentFiltreringsresultater(behandlingId: number) {
    return useQuery({
        queryKey: HentFiltreringsresultaterQueryKeyFactory.filtreringsresultater(behandlingId),
        queryFn: () => hentFiltreringsresultater(behandlingId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        staleTime: Infinity,
    });
}
