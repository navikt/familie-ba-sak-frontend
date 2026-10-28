import { oppdaterVilkårsvurdering } from '@api/oppdaterVilkårsvurdering';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useOppdaterVilkårsvurdering(options?: Options) {
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { behandlingId } = parameters;
            return oppdaterVilkårsvurdering(behandlingId);
        },
        ...options,
    });
}
