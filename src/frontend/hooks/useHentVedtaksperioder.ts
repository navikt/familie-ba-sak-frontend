import { hentVedtaksperioder } from '@api/hentVedtaksperioder';
import { useHttp } from '@navikt/familie-http';
import { useQuery } from '@tanstack/react-query';

export const HentVedtaksperioderQueryKeyFactory = {
    behandling: (behandlingId: number) => ['vedtaksperioder', behandlingId],
};

export function useHentVedtaksperioder(behandlingId: number) {
    const { request } = useHttp();
    return useQuery({
        queryKey: HentVedtaksperioderQueryKeyFactory.behandling(behandlingId),
        queryFn: () => hentVedtaksperioder(request, behandlingId),
    });
}
