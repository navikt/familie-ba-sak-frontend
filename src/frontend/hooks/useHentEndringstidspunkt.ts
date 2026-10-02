import { hentEndringstidspunkt } from '@api/hentEndringstidspunkt';
import { useQuery } from '@tanstack/react-query';

export const HentEndringstidspunktQueryKeyFactory = {
    endringstidspunkt: (behandlingId: number) => ['endringstidspunkt', behandlingId],
};

export function useHentEndringstidspunkt(behandlingId: number) {
    return useQuery({
        queryKey: HentEndringstidspunktQueryKeyFactory.endringstidspunkt(behandlingId),
        queryFn: () => hentEndringstidspunkt(behandlingId),
    });
}
