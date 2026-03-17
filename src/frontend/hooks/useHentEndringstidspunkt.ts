import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentEndringstidspunkt } from '../api/hentEndringstidspunkt';

export const HentEndringstidspunktQueryKeyFactory = {
    endringstidspunkt: (behandlingId: number) => ['endringstidspunkt', behandlingId],
};

export function useHentEndringstidspunkt(behandlingId: number) {
    const { request } = useHttp();
    return useQuery({
        queryKey: HentEndringstidspunktQueryKeyFactory.endringstidspunkt(behandlingId),
        queryFn: () => hentEndringstidspunkt(request, behandlingId),
    });
}
