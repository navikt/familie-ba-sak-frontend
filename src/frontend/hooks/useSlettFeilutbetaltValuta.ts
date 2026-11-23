import { slettFeilutbetaltValuta } from '@api/slettFeilutbetaltValuta';
import { mutationKeys } from '@hooks/keys/mutationKeys';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters {
    behandlingId: number;
    feilutbetaltValutaId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationKey' | 'mutationFn'> & {
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
