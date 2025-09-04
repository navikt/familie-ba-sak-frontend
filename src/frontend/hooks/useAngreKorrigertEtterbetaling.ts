import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { angreKorrigertEtterbetaling } from '../api/angreKorrigertEtterbetaling';
import type { IBehandling } from '../typer/behandling';

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, number>, 'mutationFn'>;

export function useAngreKorrigertEtterbetaling(options?: Options) {
    const { request } = useHttp();

    return useMutation<IBehandling, Error, number>({
        mutationFn: (behandlingId: number): Promise<IBehandling> => {
            return angreKorrigertEtterbetaling(request, behandlingId);
        },
        ...options,
    });
}
