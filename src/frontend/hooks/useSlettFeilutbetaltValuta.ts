import { slettFeilutbetaltValuta } from '@api/slettFeilutbetaltValuta';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

export function lagMutationKey(feilutbetaltValutaId: number) {
    return ['slett_feilutbetalt_valuta', feilutbetaltValutaId];
}

interface Parameters {
    behandlingId: number;
    feilutbetaltValutaId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'> & {
    feilutbetaltValutaId: number;
};

export function useSlettFeilutbetaltValuta(options: Options) {
    const { feilutbetaltValutaId, ...rest } = options;
    return useMutation({
        mutationKey: lagMutationKey(feilutbetaltValutaId),
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, feilutbetaltValutaId } = parameters;
            return slettFeilutbetaltValuta(behandlingId, feilutbetaltValutaId);
        },
        ...rest,
    });
}
