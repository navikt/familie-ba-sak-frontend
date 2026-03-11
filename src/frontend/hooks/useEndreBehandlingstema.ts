// TODO: rename IRestEndreBehandlingUnderkategori to EndreBehandlingstemaPayload or similar

import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { endreBehandlingstema } from '../api/endreBehandlingstema';
import type { IBehandling } from '../typer/behandling';
import type { IRestEndreBehandlingUnderkategori } from '../typer/behandlingstema';

interface EndreBehandlingstemaParameters extends IRestEndreBehandlingUnderkategori {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, EndreBehandlingstemaParameters>, 'mutationFn'>;

export const useEndreBehandlingstema = (options?: Options) => {
    const { request } = useHttp();

    return useMutation<IBehandling, Error, EndreBehandlingstemaParameters>({
        mutationFn: (parameters: EndreBehandlingstemaParameters): Promise<IBehandling> => {
            const { behandlingUnderkategori, behandlingKategori, behandlingId } = parameters;
            const payload = { behandlingUnderkategori, behandlingKategori };
            return endreBehandlingstema(request, payload, behandlingId);
        },
        ...options,
    });
};
