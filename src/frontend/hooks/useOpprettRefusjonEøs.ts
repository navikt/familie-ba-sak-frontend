import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { opprettRefusjonEøs, type OpprettRefusjonEøsPayload } from '../api/opprettRefusjonEøs';
import type { IBehandling } from '../typer/behandling';

interface Parameters {
    behandlingId: number;
    payload: OpprettRefusjonEøsPayload;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters, unknown>, 'mutationFn'>;

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
