import { oppdaterValutakurs, type OppdaterValutakursPayload } from '@api/valutakurs';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface OppdaterValutakursParameters extends OppdaterValutakursPayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, OppdaterValutakursParameters>, 'mutationFn'>;

export function useOppdaterValutakurs(options?: Options) {
    return useMutation({
        mutationFn: ({ behandlingId, ...payload }: OppdaterValutakursParameters) =>
            oppdaterValutakurs(payload, behandlingId),
        ...options,
    });
}
