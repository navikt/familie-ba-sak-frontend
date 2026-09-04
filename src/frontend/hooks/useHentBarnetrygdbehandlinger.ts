import { hentBarnetrygdbehandlinger } from '@api/hentBarnetrygdbehandlinger';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export const HentBarnetrygdbehandlingerQueryKeyFactory = {
    fagsak: (fagsakId: number) => ['barnetrygdbehandlinger', fagsakId],
};

export function useHentBarnetrygdbehandlinger(fagsakId: number) {
    return useQuery({
        queryKey: HentBarnetrygdbehandlingerQueryKeyFactory.fagsak(fagsakId),
        queryFn: () => hentBarnetrygdbehandlinger(fagsakId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
