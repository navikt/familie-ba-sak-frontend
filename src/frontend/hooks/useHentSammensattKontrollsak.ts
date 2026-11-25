import { hentSammensattKontrollsak } from '@api/hentSammensattKontrollsak';
import { queryKeys } from '@hooks/keys/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useHentSammensattKontrollsak(behandlingId: number) {
    return useQuery({
        queryKey: queryKeys.sammensattKontrollsak(behandlingId),
        queryFn: () => hentSammensattKontrollsak(behandlingId),
    });
}
