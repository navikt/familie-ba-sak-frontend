import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { oppdaterBehandlingstema, type OppdaterBehandlingstemaPayload } from '../api/oppdaterBehandlingstema';
import type { IBehandling } from '../typer/behandling';

interface OppdaterBehandlingstemaParameters extends OppdaterBehandlingstemaPayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, OppdaterBehandlingstemaParameters>, 'mutationFn'>;

export const useOppdaterBehandlingstema = (options?: Options) => {
    const { request } = useHttp();

    return useMutation<IBehandling, Error, OppdaterBehandlingstemaParameters>({
        mutationFn: (parameters: OppdaterBehandlingstemaParameters): Promise<IBehandling> => {
            const { behandlingUnderkategori, behandlingKategori, behandlingId } = parameters;
            return oppdaterBehandlingstema(request, behandlingKategori, behandlingUnderkategori, behandlingId);
        },
        ...options,
    });
};
