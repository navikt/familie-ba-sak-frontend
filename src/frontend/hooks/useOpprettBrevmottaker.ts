import { type OpprettBrevmottakerPayload, opprettBrevmottaker } from '@api/opprettBrevmottaker';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { BrevmottakerBehandling } from '@typer/brevmottaker';

interface Parameters extends OpprettBrevmottakerPayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<BrevmottakerBehandling[], DefaultError, Parameters>, 'mutationFn'>;

export function useOpprettBrevmottaker(options?: Options) {
    return useMutation({
        mutationFn: ({ behandlingId, ...payload }: Parameters) => opprettBrevmottaker({ behandlingId }, payload),
        ...options,
    });
}
