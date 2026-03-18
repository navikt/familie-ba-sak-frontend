import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { endreBehandlingstema, type EndreBehandlingstemaPayload } from '../api/endreBehandlingstema';
import type { IBehandling } from '../typer/behandling';

interface EndreBehandlingstemaParameters extends EndreBehandlingstemaPayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, EndreBehandlingstemaParameters>, 'mutationFn'>;

export const useEndreBehandlingstema = (options?: Options) => {
    const { request } = useHttp();

    return useMutation<IBehandling, Error, EndreBehandlingstemaParameters>({
        mutationFn: (parameters: EndreBehandlingstemaParameters): Promise<IBehandling> => {
            const { behandlingUnderkategori, behandlingKategori, behandlingId } = parameters;
            return endreBehandlingstema(request, behandlingKategori, behandlingUnderkategori, behandlingId);
        },
        ...options,
    });
};
