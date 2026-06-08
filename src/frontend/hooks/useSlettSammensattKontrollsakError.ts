import { SlettSammensattKontrollsakMutationKeyFactory } from '@hooks/useSlettSammensattKontrollsak';
import { useMutationState } from '@tanstack/react-query';

export function useSlettSammensattKontrollsakError(behandlingId: number) {
    const states = useMutationState({
        filters: {
            mutationKey: SlettSammensattKontrollsakMutationKeyFactory.slettSammensattKontrollsak(behandlingId),
        },
        select: mutation => mutation.state,
    });
    const currentState = states.at(-1);
    return currentState?.error ?? undefined;
}
