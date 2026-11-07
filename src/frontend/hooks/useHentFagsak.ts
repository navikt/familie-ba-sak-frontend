import { hentFagsak } from '@api/hentFagsak';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export const HentFagsakQueryKeyFactory = {
    fagsak: (fagsakId: number | undefined) => ['fagsak', fagsakId],
};

export function useHentFagsak(fagsakId: number | undefined) {
    return useQuery({
        queryKey: HentFagsakQueryKeyFactory.fagsak(fagsakId),
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
