import { mutationKeys } from '@hooks/keys/mutationKeys';
import { useMutationState } from '@tanstack/react-query';

export function useSlettSammensattKontrollsakError(behandlingId: number) {
    const states = useMutationState({
        filters: {
            mutationKey: mutationKeys.slettSammensattKontrollsak(behandlingId),
        },
        select: mutation => mutation.state,
    });
    const currentState = states.at(-1);
    return currentState?.error ?? undefined;
}
