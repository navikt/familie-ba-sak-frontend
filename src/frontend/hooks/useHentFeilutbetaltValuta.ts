import { hentFeilutbetaltValuta } from '@api/hentFeilutbetaltValuta';
import { queryKeys } from '@hooks/keys/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useHentFeilutbetaltValuta(behandlingId: number) {
    return useQuery({
        queryKey: queryKeys.feilutbetaltValuta(behandlingId),
        queryFn: () => hentFeilutbetaltValuta(behandlingId),
    });
}
