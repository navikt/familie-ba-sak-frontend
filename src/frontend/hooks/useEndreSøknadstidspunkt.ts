import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

import { useHttp } from '@navikt/familie-http';

import { endreSøknadstidspunkt, type EndreSøknadstidspunktPayload } from '../api/endreSøknadstidspunkt';

export interface EndreSøknadstidspunktParameters extends EndreSøknadstidspunktPayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, EndreSøknadstidspunktParameters>, 'mutationFn'>;

export const useEndreSøknadstidspunkt = (options?: Options) => {
    const { request } = useHttp();

    return useMutation({
        mutationFn: (parameters: EndreSøknadstidspunktParameters) => {
            const { behandlingId, ...payload } = parameters;
            return endreSøknadstidspunkt(request, behandlingId, payload);
        },
        ...options,
    });
};
