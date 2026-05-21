import { hentSammensattKontrollsak } from '@api/hentSammensattKontrollsak';
import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

export const HentSammensattKontrollsakQueryKeyFactory = {
    behandling: (behandlingId: number) => ['sammensatt-kontrollsak', behandlingId],
};

export function useHentSammensattKontrollsak(behandlingId: number) {
    const { request } = useHttp();
    return useQuery({
        queryKey: HentSammensattKontrollsakQueryKeyFactory.behandling(behandlingId),
        queryFn: () => hentSammensattKontrollsak(request, behandlingId),
    });
}
