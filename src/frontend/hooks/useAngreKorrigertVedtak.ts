import { angreKorrigertVedtak } from '@api/angreKorrigertVedtak';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, number>, 'mutationFn'>;

export function useAngreKorrigertVedtak(options?: Options) {
    return useMutation<IBehandling, Error, number>({
        mutationFn: (behandlingId: number): Promise<IBehandling> => angreKorrigertVedtak(behandlingId),
        ...options,
    });
}
