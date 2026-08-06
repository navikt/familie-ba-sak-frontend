import type { ApiFeil } from '@api/client/apiClient';
import { type Payload, registrerSøknad } from '@api/registrerSøknad';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters extends Payload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, ApiFeil, Parameters>, 'mutationFn'>;

export function useRegistrerSøknad(options?: Options) {
    return useMutation<IBehandling, ApiFeil, Parameters>({
        mutationFn: (parameters: Parameters): Promise<IBehandling> => {
            const { behandlingId, ...payload } = parameters;
            return registrerSøknad({ behandlingId }, payload);
        },
        ...options,
    });
}
