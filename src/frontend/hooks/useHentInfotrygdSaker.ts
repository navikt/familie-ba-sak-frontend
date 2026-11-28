import { hentInfotrygdSaker } from '@api/hentInfotrygdSaker';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export function useHentInfotrygdSaker(ident: string) {
    return useQuery({
        queryKey: queryKeys.infotrygdSaker(ident),
        queryFn: () => hentInfotrygdSaker(ident),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
