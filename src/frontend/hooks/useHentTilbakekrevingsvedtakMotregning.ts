import { hentTilbakekrevingsvedtakMotregning } from '@api/hentTilbakekrevingsvedtakMotregning';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { TilbakekrevingsvedtakMotregningDTO } from '@typer/tilbakekrevingsvedtakMotregning';

type Options = Omit<UseQueryOptions<TilbakekrevingsvedtakMotregningDTO | null>, 'queryKey' | 'queryFn'>;

export function useHentTilbakekrevingsvedtakMotregning(behandlingId: number, options?: Options) {
    return useQuery({
        queryKey: queryKeys.tilbakekrevingsvedtakMotregning(behandlingId),
        queryFn: () => hentTilbakekrevingsvedtakMotregning(behandlingId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        gcTime: 0, // Deaktiver cache slik at skjemaet ikke rendres på et utdatert svar ved retur til steget (kan overskrives).
        ...options,
    });
}
