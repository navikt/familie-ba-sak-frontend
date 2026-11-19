import { slettBrevmottaker } from '@api/slettBrevmottaker';
import { mutationKeys } from '@hooks/keys/mutationKeys';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters {
    behandlingId: number;
    brevmottakerId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationKey' | 'mutationFn'>;

export function useSlettBrevmottaker(options?: Options) {
    return useMutation({
        mutationKey: mutationKeys.slettBrevmottaker(),
        mutationFn: ({ behandlingId, brevmottakerId }: Parameters) =>
            slettBrevmottaker({ behandlingId, brevmottakerId }),
        ...options,
    });
}
