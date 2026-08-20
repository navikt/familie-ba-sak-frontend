import { korrigerVedtak, type KorrigerVedtakPayload } from '@api/korrigerVedtak';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
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
