import { useHttp } from '@navikt/familie-http';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { type OpprettFeilutbetaltValutaPayload, opprettFeilutbetaltValuta } from '../api/opprettFeilutbetaltValuta';
import type { IBehandling } from '../typer/behandling';

interface Parameters {
    behandlingId: number;
    payload: OpprettFeilutbetaltValutaPayload;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

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
