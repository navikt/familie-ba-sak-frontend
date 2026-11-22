import { type KorrigerVedtakPayload, korrigerVedtak } from '@api/korrigerVedtak';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IRestKorrigertVedtak } from '@typer/vedtak';

interface KorrigerVedtakParameters extends KorrigerVedtakPayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IRestKorrigertVedtak, DefaultError, KorrigerVedtakParameters>, 'mutationFn'>;

export function useKorrigerVedtak(options?: Options) {
    return useMutation<IRestKorrigertVedtak, Error, KorrigerVedtakParameters>({
        mutationFn: (parameters: KorrigerVedtakParameters): Promise<IRestKorrigertVedtak> => {
            const { behandlingId, ...payload } = parameters;
            return korrigerVedtak(payload, behandlingId);
        },
        ...options,
    });
}
