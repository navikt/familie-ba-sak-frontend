import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentAlleBegrunnelser } from '../api/hentAlleBegrunnelser';

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
