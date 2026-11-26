import { oppdaterBehandlingsresultat } from '@api/oppdaterBehandlingsresultat';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useOppdaterBehandlingsresultat(options?: Options) {
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { behandlingId } = parameters;
            return oppdaterBehandlingsresultat(behandlingId);
        },
        ...options,
    });
}
