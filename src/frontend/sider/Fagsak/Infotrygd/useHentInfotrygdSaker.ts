import { queryKeys } from '@hooks/keys/queryKeys';
import { useHttp } from '@navikt/familie-http';
import { useQuery } from '@tanstack/react-query';

import { hentInfotrygdSaker } from './hentInfotrygdSaker';

export function useHentInfotrygdSaker(ident: string) {
    const { request } = useHttp();
    return useQuery({
        queryKey: queryKeys.infotrygdSaker(ident),
        queryFn: () => hentInfotrygdSaker(request, ident),
    });
}
