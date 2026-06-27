import type { Parameters } from '@hooks/useSlettVilkårResultat';
import { SlettVilkårResultatMutationKeyFactory } from '@hooks/useSlettVilkårResultat';
import { useIsMutating } from '@tanstack/react-query';

export function useSlettVilkårResultatIsPending(vilkårResultatId: number) {
    const isMutating = useIsMutating({
        mutationKey: SlettVilkårResultatMutationKeyFactory.slettVilkårResultat(),
        predicate: mutation => {
            const variables = mutation.state.variables as Parameters | undefined;
            return variables?.vilkårResultatId === vilkårResultatId;
        },
    });
    return isMutating > 0;
}
