import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentAInntektUrl } from '../api/hentAInntektUrl';

const A_INNTEKT_URL_QUERY_KEY_PREFIX = 'aInntektUrl';

export function useHentAInntektUrl(ident: string) {
    const { request } = useHttp();
    return useQuery({
        queryKey: [A_INNTEKT_URL_QUERY_KEY_PREFIX, ident],
        queryFn: () => hentAInntektUrl(request, ident),
    });
}
