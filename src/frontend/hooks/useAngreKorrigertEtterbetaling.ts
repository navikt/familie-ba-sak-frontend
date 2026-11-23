import { angreKorrigertEtterbetaling } from '@api/angreKorrigertEtterbetaling';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IRestKorrigertEtterbetaling } from '@typer/vedtak';

type Options = Omit<UseMutationOptions<IRestKorrigertEtterbetaling | null, DefaultError, number>, 'mutationFn'>;

export function useAngreKorrigertEtterbetaling(options?: Options) {
    return useMutation<IRestKorrigertEtterbetaling | null, Error, number>({
        mutationFn: (behandlingId: number): Promise<IRestKorrigertEtterbetaling | null> =>
            angreKorrigertEtterbetaling(behandlingId),
        ...options,
    });
}
