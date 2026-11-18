import { hentEndringstidspunkt } from '@api/hentEndringstidspunkt';
import { queryKeys } from '@hooks/keys/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useHentEndringstidspunkt(behandlingId: number) {
    return useQuery({
        queryKey: queryKeys.endringstidspunkt(behandlingId),
        queryFn: () => hentEndringstidspunkt(behandlingId),
    });
}
