import { angreKorrigertEtterbetaling } from '@api/angreKorrigertEtterbetaling';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, number>, 'mutationFn'>;

export function useAngreKorrigertEtterbetaling(options?: Options) {
    return useMutation<IBehandling, Error, number>({
        mutationFn: (behandlingId: number): Promise<IBehandling> => angreKorrigertEtterbetaling(behandlingId),
        ...options,
    });
}
