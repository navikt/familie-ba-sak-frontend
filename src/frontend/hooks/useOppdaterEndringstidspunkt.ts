import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { oppdaterEndringstidspunkt } from '../api/oppdaterEndringstidspunkt';
import type { IBehandling } from '../typer/behandling';

interface Parameters {
    endringstidspunkt: string;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters, unknown>, 'mutationFn'>;

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
