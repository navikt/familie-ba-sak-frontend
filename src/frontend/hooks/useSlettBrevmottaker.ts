import { slettBrevmottaker } from '@api/slettBrevmottaker';
import { mutationKeys } from '@hooks/keys/mutationKeys';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { BrevmottakerBehandling } from '@typer/brevmottaker';

interface Parameters {
    behandlingId: number;
    brevmottakerId: number;
}

type Options = Omit<
    UseMutationOptions<BrevmottakerBehandling[], DefaultError, Parameters>,
    'mutationKey' | 'mutationFn'
>;

export function useSlettBrevmottaker(options?: Options) {
    return useMutation({
        mutationKey: mutationKeys.slettBrevmottaker(),
        mutationFn: ({ behandlingId, brevmottakerId }: Parameters) =>
            slettBrevmottaker({ behandlingId, brevmottakerId }),
        ...options,
    });
}
