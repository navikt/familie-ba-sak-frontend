import { type OppdaterFeilutbetaltValutaPayload, oppdaterFeilutbetaltValuta } from '@api/oppdaterFeilutbetaltValuta';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IRestFeilutbetaltValuta } from '@typer/eøs-feilutbetalt-valuta';

interface Parameters {
    behandlingId: number;
    feilutbetaltValutaId: number;
    payload: OppdaterFeilutbetaltValutaPayload;
}

type Options = Omit<UseMutationOptions<IRestFeilutbetaltValuta[], DefaultError, Parameters>, 'mutationFn'>;

export function useOppdaterFeilutbetaltValuta(options: Options = {}) {
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, feilutbetaltValutaId, payload } = parameters;
            return oppdaterFeilutbetaltValuta(behandlingId, feilutbetaltValutaId, payload);
        },
        ...options,
    });
}
