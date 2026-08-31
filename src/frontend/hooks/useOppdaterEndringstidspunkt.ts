import { useHttp } from '@navikt/familie-http';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { oppdaterEndringstidspunkt } from '../api/oppdaterEndringstidspunkt';
import type { IBehandling } from '../typer/behandling';

interface Parameters {
    endringstidspunkt: string;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useOppdaterEndringstidspunkt(behandlingId: number, options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { endringstidspunkt } = parameters;
            return oppdaterEndringstidspunkt(request, endringstidspunkt, behandlingId);
        },
        ...options,
    });
}
