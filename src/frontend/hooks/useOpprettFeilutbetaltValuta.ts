import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { opprettFeilutbetaltValuta, type OpprettFeilutbetaltValutaPayload } from '../api/opprettFeilutbetaltValuta';
import type { IBehandling } from '../typer/behandling';

interface Parameters {
    behandlingId: number;
    payload: OpprettFeilutbetaltValutaPayload;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters, unknown>, 'mutationFn'>;

export function useOpprettFeilutbetaltValuta(options: Options = {}) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, payload } = parameters;
            return opprettFeilutbetaltValuta(request, behandlingId, payload);
        },
        ...options,
    });
}
