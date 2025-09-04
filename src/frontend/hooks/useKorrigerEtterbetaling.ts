import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import {
    korrigerEtterbetalingAsync,
    type KorrigerEtterbetalingPayload,
} from '../api/korrigerEtterbetaling';
import type { IBehandling } from '../typer/behandling';

interface KorrigerEtterbetalingParameters extends KorrigerEtterbetalingPayload {
    behandlingId: number;
}

type Options = Omit<
    UseMutationOptions<IBehandling, DefaultError, KorrigerEtterbetalingParameters>,
    'mutationFn'
>;

export function useKorrigerEtterbetaling(options?: Options) {
    const { request } = useHttp();

    return useMutation<IBehandling, Error, KorrigerEtterbetalingParameters>({
        mutationFn: (parameters: KorrigerEtterbetalingParameters): Promise<IBehandling> => {
            const { årsak, beløp, begrunnelse, behandlingId } = parameters;
            const payload = { årsak, beløp, begrunnelse };
            return korrigerEtterbetalingAsync(request, payload, behandlingId);
        },
        ...options,
    });
}
