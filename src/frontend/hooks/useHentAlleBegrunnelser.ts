import { hentAlleBegrunnelser } from '@api/hentAlleBegrunnelser';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export function useHentAlleBegrunnelser() {
    return useQuery({
        queryKey: queryKeys.alleBegrunnelser(),
        queryFn: () => hentAlleBegrunnelser(),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
