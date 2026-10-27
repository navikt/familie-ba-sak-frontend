import { oppdaterRegisteropplysninger } from '@api/oppdaterRegisteropplysninger';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useOppdaterRegisteropplysninger(options: Options = {}) {
    return useMutation({
        mutationFn: ({ behandlingId }: Parameters) => oppdaterRegisteropplysninger(behandlingId),
        ...options,
    });
}
