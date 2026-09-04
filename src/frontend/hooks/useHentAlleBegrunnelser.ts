import { hentAlleBegrunnelser } from '@api/hentAlleBegrunnelser';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export const HentAlleBegrunnelserQueryKeyFactory = {
    alleBegrunnelser: () => ['alleBegrunnelser'],
};

export function useHentAlleBegrunnelser() {
    return useQuery({
        queryKey: HentAlleBegrunnelserQueryKeyFactory.alleBegrunnelser(),
        queryFn: () => hentAlleBegrunnelser(),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
