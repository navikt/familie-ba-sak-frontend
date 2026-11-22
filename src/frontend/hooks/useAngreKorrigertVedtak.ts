import { angreKorrigertVedtak } from '@api/angreKorrigertVedtak';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IRestKorrigertVedtak } from '@typer/vedtak';

type Options = Omit<UseMutationOptions<IRestKorrigertVedtak | null, DefaultError, number>, 'mutationFn'>;

export function useAngreKorrigertVedtak(options?: Options) {
    return useMutation<IRestKorrigertVedtak | null, Error, number>({
        mutationFn: (behandlingId: number): Promise<IRestKorrigertVedtak | null> => angreKorrigertVedtak(behandlingId),
        ...options,
    });
}
