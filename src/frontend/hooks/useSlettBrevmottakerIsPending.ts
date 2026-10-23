import { SlettBrevmottakerMutationKeyFactory } from '@hooks/useSlettBrevmottaker';
import { useIsMutating } from '@tanstack/react-query';

export function useSlettBrevmottakerIsPending() {
    const isMutatingAntall = useIsMutating({ mutationKey: SlettBrevmottakerMutationKeyFactory.slettBrevmottaker() });
    return isMutatingAntall > 0;
}
