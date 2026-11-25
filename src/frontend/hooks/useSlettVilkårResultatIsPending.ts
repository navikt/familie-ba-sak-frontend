import { mutationKeys } from '@hooks/keys/mutationKeys';
import type { Parameters } from '@hooks/useSlettVilkårResultat';
import { useIsMutating } from '@tanstack/react-query';

export function useSlettVilkårResultatIsPending(vilkårResultatId: number) {
    const isMutatingAntall = useIsMutating({
        mutationKey: mutationKeys.slettVilkårResultat(),
        predicate: mutation => {
            const variables = mutation.state.variables as Parameters | undefined;
            return variables?.vilkårResultatId === vilkårResultatId;
        },
    });
    return isMutatingAntall > 0;
}
