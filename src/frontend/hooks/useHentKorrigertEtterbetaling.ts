import { hentKorrigertEtterbetaling } from '@api/hentKorrigertEtterbetaling';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export function useHentKorrigertEtterbetaling(behandlingId: number) {
    return useQuery({
        queryKey: queryKeys.korrigertEtterbetaling(behandlingId),
        queryFn: () => hentKorrigertEtterbetaling(behandlingId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
