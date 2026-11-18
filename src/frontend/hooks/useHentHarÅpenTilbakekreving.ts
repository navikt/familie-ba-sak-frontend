import { hentHarÅpenTilbakekreving } from '@api/hentHarÅpenTilbakekreving';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

type Options = Omit<UseQueryOptions<boolean>, 'queryKey' | 'queryFn'>;

export function useHentHarÅpenTilbakekreving(fagsakId: number, options?: Options) {
    return useQuery({
        queryKey: queryKeys.harÅpenTilbakekreving(fagsakId),
        queryFn: () => hentHarÅpenTilbakekreving(fagsakId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        gcTime: 0, // Deaktiver cache slik at skjemaet ikke rendres på et utdatert svar ved retur til steget (kan overskrives).
        ...options,
    });
}
