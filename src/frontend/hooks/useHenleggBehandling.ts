import { type HenleggBehandlingPayload, henleggBehandling } from '@api/henleggBehandling';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters extends HenleggBehandlingPayload {
    behandling: IBehandling;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useHenleggBehandling(options?: Options) {
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { behandling, årsak, begrunnelse } = parameters;
            const payload = { årsak, begrunnelse };
            return henleggBehandling(behandling, payload);
        },
        ...options,
    });
}
