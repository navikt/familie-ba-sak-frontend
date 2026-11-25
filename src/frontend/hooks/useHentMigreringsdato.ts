import { hentMigreringsdato } from '@api/hentMigreringsdato';
import { queryKeys } from '@hooks/keys/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useHentMigreringsdato(behandlingId: number) {
    return useQuery({
        queryKey: queryKeys.migreringsdato(behandlingId),
        queryFn: () => hentMigreringsdato(behandlingId),
    });
}
