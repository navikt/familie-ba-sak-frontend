import { taBehandlingAvVent } from '@api/taBehandlingAvVent';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

import { useHttp } from '@navikt/familie-http';

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, number>, 'mutationFn'>;

export function useTaBehandlingAvVent(options?: Options) {
    const { request } = useHttp();

    return useMutation({
        mutationFn: (behandlingId: number) => taBehandlingAvVent(request, behandlingId),
        ...options,
    });
}
