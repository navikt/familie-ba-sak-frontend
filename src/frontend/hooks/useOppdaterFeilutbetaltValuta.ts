import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { oppdaterFeilutbetaltValuta, type OppdaterFeilutbetaltValutaPayload } from '../api/oppdaterFeilutbetaltValuta';
import type { IBehandling } from '../typer/behandling';

interface Parameters {
    behandlingId: number;
    feilutbetaltValutaId: number;
    payload: OppdaterFeilutbetaltValutaPayload;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters, unknown>, 'mutationFn'>;

export function useOppdaterFeilutbetaltValuta(options: Options = {}) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, feilutbetaltValutaId, payload } = parameters;
            return oppdaterFeilutbetaltValuta(request, behandlingId, feilutbetaltValutaId, payload);
        },
        ...options,
    });
}
