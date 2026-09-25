import { hentEndringstidspunkt } from '@api/hentEndringstidspunkt';
import { useHttp } from '@navikt/familie-http';
import { useQuery } from '@tanstack/react-query';

export const HentEndringstidspunktQueryKeyFactory = {
    endringstidspunkt: (behandlingId: number) => ['endringstidspunkt', behandlingId],
};

interface Options {
    enabled?: boolean;
}

export function useHentEndringstidspunkt(behandlingId: number, options?: Options) {
    const { request } = useHttp();
    return useQuery({
        queryKey: HentEndringstidspunktQueryKeyFactory.endringstidspunkt(behandlingId),
        queryFn: () => hentEndringstidspunkt(request, behandlingId),
        ...options,
    });
}
