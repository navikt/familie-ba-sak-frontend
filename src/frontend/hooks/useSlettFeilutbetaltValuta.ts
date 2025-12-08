import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { slettFeilutbetaltValuta } from '../api/slettFeilutbetaltValuta';
import type { IBehandling } from '../typer/behandling';

export function lagMutationKey(feilutbetaltValutaId: number) {
    return ['slett_feilutbetalt_valuta', feilutbetaltValutaId];
}

interface Parameters {
    behandlingId: number;
    feilutbetaltValutaId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters, unknown>, 'mutationFn'> & {
    feilutbetaltValutaId: number;
};

export function useSlettFeilutbetaltValuta(options: Options) {
    const { feilutbetaltValutaId, ...rest } = options;
    const { request } = useHttp();
    return useMutation({
        mutationKey: lagMutationKey(feilutbetaltValutaId),
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, feilutbetaltValutaId } = parameters;
            return slettFeilutbetaltValuta(request, behandlingId, feilutbetaltValutaId);
        },
        ...rest,
    });
}
