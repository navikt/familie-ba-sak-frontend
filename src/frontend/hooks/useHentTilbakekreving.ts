import { hentTilbakekreving } from '@api/hentTilbakekreving';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { ITilbakekreving } from '@typer/simulering';

type Options = Omit<UseQueryOptions<ITilbakekreving | null>, 'queryKey' | 'queryFn'>;

export function useHentTilbakekreving(behandlingId: number, options?: Options) {
    return useQuery({
        queryKey: queryKeys.tilbakekreving(behandlingId),
        queryFn: () => hentTilbakekreving(behandlingId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        gcTime: 0, // Deaktiver cache slik at skjemaet ikke rendres på et utdatert svar ved retur til steget (kan overskrives).
        ...options,
    });
}
