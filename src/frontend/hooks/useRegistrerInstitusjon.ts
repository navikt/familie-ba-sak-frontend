import type { ApiFeil } from '@api/client/apiClient';
import { registrerInstitusjon } from '@api/registrerInstitusjon';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, ApiFeil, Parameters>, 'mutationFn'>;

export function useRegistrerInstitusjon(options?: Options) {
    return useMutation<IBehandling, ApiFeil, Parameters>({
        mutationFn: (parameters: Parameters): Promise<IBehandling> => registrerInstitusjon(parameters),
        ...options,
    });
}
