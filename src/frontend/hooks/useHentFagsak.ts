import { hentFagsak } from '@api/hentFagsak';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';
import type { FagsakId } from '@typer/fagsak';

export function useHentFagsak(fagsakId: FagsakId | undefined) {
    return useQuery({
        queryKey: queryKeys.fagsak(fagsakId),
        queryFn: () => {
            if (fagsakId === undefined) {
                throw new Error('Kan ikke hente fagsak uten fagsakId.');
            }
            return hentFagsak(fagsakId);
        },
        enabled: fagsakId !== undefined,
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
