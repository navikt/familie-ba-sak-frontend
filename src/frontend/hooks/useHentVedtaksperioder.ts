import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentVedtaksperioder } from '../api/hentVedtaksperioder';

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
