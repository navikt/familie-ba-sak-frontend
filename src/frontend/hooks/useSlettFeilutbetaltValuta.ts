import { slettFeilutbetaltValuta } from '@api/slettFeilutbetaltValuta';
import { mutationKeys } from '@hooks/keys/mutationKeys';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IRestFeilutbetaltValuta } from '@typer/eøs-feilutbetalt-valuta';

interface Parameters {
    behandlingId: number;
    feilutbetaltValutaId: number;
}

type Options = Omit<
    UseMutationOptions<IRestFeilutbetaltValuta[], DefaultError, Parameters>,
    'mutationKey' | 'mutationFn'
> & {
    feilutbetaltValutaId: number;
};

export function useSlettFeilutbetaltValuta(options: Options) {
    const { feilutbetaltValutaId, ...rest } = options;
    return useMutation({
        mutationKey: mutationKeys.slettFeilutbetaltValuta(feilutbetaltValutaId),
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, feilutbetaltValutaId } = parameters;
            return slettFeilutbetaltValuta(behandlingId, feilutbetaltValutaId);
        },
        ...rest,
    });
}
