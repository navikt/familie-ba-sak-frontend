import { hentVedtaksperioder } from '@api/hentVedtaksperioder';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export function useHentVedtaksperioder(behandlingId: number) {
    return useQuery({
        queryKey: queryKeys.vedtaksperioder(behandlingId),
        queryFn: () => hentVedtaksperioder(behandlingId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
