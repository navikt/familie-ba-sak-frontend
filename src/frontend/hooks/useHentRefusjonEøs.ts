import { hentRefusjonEøs } from '@api/hentRefusjonEøs';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { useQuery } from '@tanstack/react-query';

export function useHentRefusjonEøs(behandlingId: number) {
    return useQuery({
        queryKey: queryKeys.refusjonEøs(behandlingId),
        queryFn: () => hentRefusjonEøs(behandlingId),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
