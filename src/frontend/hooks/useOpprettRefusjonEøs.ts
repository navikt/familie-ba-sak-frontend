import { useHttp } from '@navikt/familie-http';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { type OpprettRefusjonEøsPayload, opprettRefusjonEøs } from '../api/opprettRefusjonEøs';
import type { IBehandling } from '../typer/behandling';

interface Parameters {
    behandlingId: number;
    payload: OpprettRefusjonEøsPayload;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useOpprettRefusjonEøs(options: Options = {}) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, payload } = parameters;
            return opprettRefusjonEøs(request, behandlingId, payload);
        },
        ...options,
    });
}
