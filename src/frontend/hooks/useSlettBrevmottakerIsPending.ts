import { mutationKeys } from '@hooks/keys/mutationKeys';
import { useIsMutating } from '@tanstack/react-query';

export function useSlettBrevmottakerIsPending() {
    const isMutatingAntall = useIsMutating({ mutationKey: mutationKeys.slettBrevmottaker() });
    return isMutatingAntall > 0;
}
