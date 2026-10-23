import { slettBrevmottaker } from '@api/slettBrevmottaker';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters {
    behandlingId: number;
    brevmottakerId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationKey' | 'mutationFn'>;

export const SlettBrevmottakerMutationKeyFactory = {
    slettBrevmottaker: () => ['slettBrevmottaker'],
};

export function useSlettBrevmottaker(options?: Options) {
    return useMutation({
        mutationKey: SlettBrevmottakerMutationKeyFactory.slettBrevmottaker(),
        mutationFn: ({ behandlingId, brevmottakerId }: Parameters) => slettBrevmottaker(behandlingId, brevmottakerId),
        ...options,
    });
}
