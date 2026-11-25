import { type OppdaterRefusjonEøsPayload, oppdaterRefusjonEøs } from '@api/oppdaterRefusjonEøs';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters {
    behandlingId: number;
    refusjonEøsId: number;
    payload: OppdaterRefusjonEøsPayload;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useOppdaterRefusjonEøs(options: Options = {}) {
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, refusjonEøsId, payload } = parameters;
            return oppdaterRefusjonEøs(behandlingId, refusjonEøsId, payload);
        },
        ...options,
    });
}
