import { hentSammensattKontrollsak } from '@api/hentSammensattKontrollsak';
import { queryKeys } from '@hooks/keys/queryKeys';
import { useHttp } from '@navikt/familie-http';
import { useQuery } from '@tanstack/react-query';

export function useHentSammensattKontrollsak(behandlingId: number) {
    const { request } = useHttp();
    return useQuery({
        queryKey: queryKeys.sammensattKontrollsak(behandlingId),
        queryFn: () => hentSammensattKontrollsak(request, behandlingId),
    });
}
