import { slettKompetanse } from '@api/kompetanse';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface SlettKompetanseParameters {
    behandlingId: number;
    kompetanseId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, SlettKompetanseParameters>, 'mutationFn'>;

export function useSlettKompetanse(options?: Options) {
    return useMutation({
        mutationFn: ({ behandlingId, kompetanseId }: SlettKompetanseParameters) =>
            slettKompetanse(behandlingId, kompetanseId),
        ...options,
    });
}
