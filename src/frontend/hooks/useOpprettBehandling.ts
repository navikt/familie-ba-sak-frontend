import { opprettBehandling } from '@api/opprettBehandling';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling, NyBehandling } from '@typer/behandling';

import { useHttp } from '@navikt/familie-http';

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, NyBehandling>, 'mutationFn'>;

export function useOpprettBehandling(options?: Options) {
    const { request } = useHttp();

    return useMutation<IBehandling, Error, NyBehandling>({
        mutationFn: (payload: NyBehandling): Promise<IBehandling> => {
            return opprettBehandling(request, payload);
        },
        ...options,
    });
}
