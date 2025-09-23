import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { henleggBehandling, type HenleggBehandlingPayload } from '../api/henleggBehandling';
import type { IBehandling } from '../typer/behandling';

interface Parameters extends HenleggBehandlingPayload {
    behandling: IBehandling;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters, unknown>, 'mutationFn'>;

export function useHenleggBehandling(options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { behandling, årsak, begrunnelse } = parameters;
            const payload = { årsak, begrunnelse };
            return henleggBehandling(request, behandling, payload);
        },
        ...options,
    });
}
