import { hentVedtaksperioder } from '@api/hentVedtaksperioder';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export const HentVedtaksperioderQueryKeyFactory = {
    behandling: (behandlingId: number) => ['vedtaksperioder', behandlingId],
};

export function useHentVedtaksperioder(behandlingId: number) {
    return useQuery({
        queryKey: HentVedtaksperioderQueryKeyFactory.behandling(behandlingId),
        queryFn: () => hentVedtaksperioder(behandlingId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
