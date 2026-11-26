import { oppdaterEndringstidspunkt } from '@api/oppdaterEndringstidspunkt';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters {
    endringstidspunkt: string;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useOppdaterEndringstidspunkt(behandlingId: number, options?: Options) {
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { endringstidspunkt } = parameters;
            return oppdaterEndringstidspunkt(endringstidspunkt, behandlingId);
        },
        ...options,
    });
}
