import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { sendVedtakTilBeslutter } from '../api/sendVedtakTilBeslutter';
import type { IBehandling } from '../typer/behandling';

interface Parameters {
    behandlingId: number;
    behandlendeEnhet: string;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useSendVedtakTilBeslutter(options?: Options) {
    const { request } = useHttp();
    return useMutation<IBehandling, Error, Parameters>({
        mutationFn: (parameters: Parameters): Promise<IBehandling> => {
            return sendVedtakTilBeslutter(request, parameters);
        },
        ...options,
    });
}
