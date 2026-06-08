import { OpprettSammensattKontrollsakMutationKeyFactory } from '@hooks/useOpprettSammensattKontrollsak';
import { useMutationState } from '@tanstack/react-query';

export function useOpprettSammensattKontrollsakError(behandlingId: number) {
    const states = useMutationState({
        filters: {
            mutationKey: OpprettSammensattKontrollsakMutationKeyFactory.opprettSammensattKontrollsak(behandlingId),
        },
        select: mutation => mutation.state,
    });
    const currentState = states.at(-1);
    return currentState?.error ?? undefined;
}
