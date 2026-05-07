import { korrigerVedtak, type KorrigerVedtakPayload } from '@api/korrigerVedtak';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

import { useHttp } from '@navikt/familie-http';

interface KorrigerVedtakParameters extends KorrigerVedtakPayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, KorrigerVedtakParameters>, 'mutationFn'>;

export function useKorrigerVedtak(options?: Options) {
    const { request } = useHttp();

    return useMutation<IBehandling, Error, KorrigerVedtakParameters>({
        mutationFn: (parameters: KorrigerVedtakParameters): Promise<IBehandling> => {
            const { vedtaksdato, begrunnelse, behandlingId } = parameters;
            const payload = { vedtaksdato, begrunnelse };
            return korrigerVedtak(request, payload, behandlingId);
        },
        ...options,
    });
}
