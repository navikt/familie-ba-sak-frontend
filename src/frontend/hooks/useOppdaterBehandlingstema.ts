import { oppdaterBehandlingstema, type OppdaterBehandlingstemaPayload } from '@api/oppdaterBehandlingstema';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface OppdaterBehandlingstemaParameters extends OppdaterBehandlingstemaPayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, OppdaterBehandlingstemaParameters>, 'mutationFn'>;

export function useOppdaterBehandlingstema(options?: Options) {
    return useMutation<IBehandling, Error, OppdaterBehandlingstemaParameters>({
        mutationFn: (parameters: OppdaterBehandlingstemaParameters): Promise<IBehandling> => {
            const { behandlingId, ...payload } = parameters;
            return oppdaterBehandlingstema(payload, behandlingId);
        },
        ...options,
    });
}
