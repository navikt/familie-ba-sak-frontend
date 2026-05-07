import { angreKorrigertVedtak } from '@api/angreKorrigertVedtak';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

import { useHttp } from '@navikt/familie-http';

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, number>, 'mutationFn'>;

export function useAngreKorrigertVedtak(options?: Options) {
    const { request } = useHttp();

    return useMutation<IBehandling, Error, number>({
        mutationFn: (behandlingId: number): Promise<IBehandling> => {
            return angreKorrigertVedtak(request, behandlingId);
        },
        ...options,
    });
}
