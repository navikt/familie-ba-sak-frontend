import { type OpprettBrevmottakerPayload, opprettBrevmottaker } from '@api/opprettBrevmottaker';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters extends OpprettBrevmottakerPayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useOpprettBrevmottaker(options?: Options) {
    return useMutation({
        mutationFn: ({ behandlingId, ...payload }: Parameters) => opprettBrevmottaker({ behandlingId }, payload),
        ...options,
    });
}
