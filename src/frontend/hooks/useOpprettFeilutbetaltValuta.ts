import { type OpprettFeilutbetaltValutaPayload, opprettFeilutbetaltValuta } from '@api/opprettFeilutbetaltValuta';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IRestFeilutbetaltValuta } from '@typer/eøs-feilutbetalt-valuta';

interface Parameters {
    behandlingId: number;
    payload: OpprettFeilutbetaltValutaPayload;
}

type Options = Omit<UseMutationOptions<IRestFeilutbetaltValuta[], DefaultError, Parameters>, 'mutationFn'>;

export function useOpprettFeilutbetaltValuta(options: Options = {}) {
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, payload } = parameters;
            return opprettFeilutbetaltValuta(behandlingId, payload);
        },
        ...options,
    });
}
