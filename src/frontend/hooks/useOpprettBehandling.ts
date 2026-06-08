import { opprettBehandling, type OpprettBehandlingPayload } from '@api/opprettBehandling';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

import { useHttp } from '@navikt/familie-http';

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, OpprettBehandlingPayload>, 'mutationFn'>;

export function useOpprettBehandling(options?: Options) {
    const { request } = useHttp();

    return useMutation<IBehandling, Error, OpprettBehandlingPayload>({
        mutationFn: (payload: OpprettBehandlingPayload): Promise<IBehandling> => {
            return opprettBehandling(request, payload);
        },
        ...options,
    });
}
