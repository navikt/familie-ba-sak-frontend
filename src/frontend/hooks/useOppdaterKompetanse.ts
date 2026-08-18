import { type OppdaterKompetansePayload, oppdaterKompetanse } from '@api/kompetanse';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface OppdaterKompetanseParameters extends OppdaterKompetansePayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, OppdaterKompetanseParameters>, 'mutationFn'>;

export function useOppdaterKompetanse(options?: Options) {
    return useMutation({
        mutationFn: ({ behandlingId, ...payload }: OppdaterKompetanseParameters) =>
            oppdaterKompetanse(payload, behandlingId),
        ...options,
    });
}
