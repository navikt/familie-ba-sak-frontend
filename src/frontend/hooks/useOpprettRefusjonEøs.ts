import { type OpprettRefusjonEøsPayload, opprettRefusjonEøs } from '@api/opprettRefusjonEøs';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters {
    behandlingId: number;
    payload: OpprettRefusjonEøsPayload;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useOpprettRefusjonEøs(options: Options = {}) {
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, payload } = parameters;
            return opprettRefusjonEøs(behandlingId, payload);
        },
        ...options,
    });
}
