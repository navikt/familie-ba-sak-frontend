import { slettValutakurs } from '@api/valutakurs';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface SlettValutakursParameters {
    behandlingId: number;
    valutakursId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, SlettValutakursParameters>, 'mutationFn'>;

export function useSlettValutakurs(options?: Options) {
    return useMutation({
        mutationFn: ({ behandlingId, valutakursId }: SlettValutakursParameters) =>
            slettValutakurs(behandlingId, valutakursId),
        ...options,
    });
}
