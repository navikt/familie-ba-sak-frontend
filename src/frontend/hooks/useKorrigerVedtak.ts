import { type KorrigerVedtakPayload, korrigerVedtak } from '@api/korrigerVedtak';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface KorrigerVedtakParameters extends KorrigerVedtakPayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, KorrigerVedtakParameters>, 'mutationFn'>;

export function useKorrigerVedtak(options?: Options) {
    return useMutation<IBehandling, Error, KorrigerVedtakParameters>({
        mutationFn: (parameters: KorrigerVedtakParameters): Promise<IBehandling> => {
            const { behandlingId, ...payload } = parameters;
            return korrigerVedtak(payload, behandlingId);
        },
        ...options,
    });
}
