import { hentKorrigertVedtak } from '@api/hentKorrigertVedtak';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export function useHentKorrigertVedtak(behandlingId: number) {
    return useQuery({
        queryKey: queryKeys.korrigertVedtak(behandlingId),
        queryFn: () => hentKorrigertVedtak(behandlingId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
