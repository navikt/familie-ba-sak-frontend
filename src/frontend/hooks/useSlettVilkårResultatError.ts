import type { Parameters } from '@hooks/useSlettVilkårResultat';
import { SlettVilkårResultatMutationKeyFactory } from '@hooks/useSlettVilkårResultat';
import { useMutationState } from '@tanstack/react-query';

export function useSlettVilkårResultatError(vilkårResultatId: number) {
    const errors = useMutationState({
        filters: {
            mutationKey: SlettVilkårResultatMutationKeyFactory.slettVilkårResultat(),
            predicate: mutation => {
                const variables = mutation.state.variables as Parameters | undefined;
                return variables?.vilkårResultatId === vilkårResultatId;
            },
        },
        select: mutation => mutation.state.error,
    });

    return errors.at(-1) ?? undefined;
}
