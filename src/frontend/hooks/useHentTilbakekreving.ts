import { hentTilbakekreving } from '@api/hentTilbakekreving';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export function useHentTilbakekreving(behandlingId: number) {
    return useQuery({
        queryKey: queryKeys.tilbakekreving(behandlingId),
        queryFn: () => hentTilbakekreving(behandlingId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        gcTime: 0, // Deaktiver cache slik at skjemaet ikke rendres på et utdatert svar ved retur til steget.
    });
}
