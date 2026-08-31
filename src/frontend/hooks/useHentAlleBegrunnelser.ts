import { hentAlleBegrunnelser } from '@api/hentAlleBegrunnelser';
import { useHttp } from '@navikt/familie-http';
import { useQuery } from '@tanstack/react-query';

export const HentAlleBegrunnelserQueryKeyFactory = {
    alleBegrunnelser: () => ['alleBegrunnelser'],
};

export function useHentAlleBegrunnelser() {
    const { request } = useHttp();
    return useQuery({
        queryKey: HentAlleBegrunnelserQueryKeyFactory.alleBegrunnelser(),
        queryFn: () => hentAlleBegrunnelser(request),
    });
}
