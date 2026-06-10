import { opprettBehandling } from '@api/opprettBehandling';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling, NyBehandling } from '@typer/behandling';

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, NyBehandling>, 'mutationFn'>;

export function useOpprettBehandling(options?: Options) {
    return useMutation<IBehandling, Error, NyBehandling>({
        mutationFn: (payload: NyBehandling): Promise<IBehandling> => opprettBehandling(payload),
        ...options,
    });
}
