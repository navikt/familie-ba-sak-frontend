import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { oppdaterRefusjonEøs, type OppdaterRefusjonEøsPayload } from '../api/oppdaterRefusjonEøs';
import type { IBehandling } from '../typer/behandling';

interface Parameters {
    behandlingId: number;
    refusjonEøsId: number;
    payload: OppdaterRefusjonEøsPayload;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters, unknown>, 'mutationFn'>;

export function useOppdaterRefusjonEøs(options: Options = {}) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, refusjonEøsId, payload } = parameters;
            return oppdaterRefusjonEøs(request, behandlingId, refusjonEøsId, payload);
        },
        ...options,
    });
}
