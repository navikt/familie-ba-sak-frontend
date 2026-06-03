import { endreSøknadstidspunkt, type EndreSøknadstidspunktPayload } from '@api/endreSøknadstidspunkt';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

import { useHttp } from '@navikt/familie-http';

interface EndreSøknadstidspunktParameters extends EndreSøknadstidspunktPayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, EndreSøknadstidspunktParameters>, 'mutationFn'>;

export function useEndreSøknadstidspunkt(options?: Options) {
    const { request } = useHttp();

    return useMutation<IBehandling, Error, EndreSøknadstidspunktParameters>({
        mutationFn: (parameters: EndreSøknadstidspunktParameters): Promise<IBehandling> => {
            const { søknadstidspunktPerPerson, behandlingId } = parameters;
            const payload = { søknadstidspunktPerPerson };

            return endreSøknadstidspunkt(request, payload, behandlingId);
        },
        ...options,
    });
}
