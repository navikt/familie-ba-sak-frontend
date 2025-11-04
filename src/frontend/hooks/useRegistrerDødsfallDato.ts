import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { registrerDødsfall, type RegistrerDødsfallDatoPayload } from '../api/registrerDødsfallDato';
import type { IBehandling } from '../typer/behandling';

interface RegistrerDødsfallDatoParameters extends RegistrerDødsfallDatoPayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, RegistrerDødsfallDatoParameters>, 'mutationFn'>;

export function useRegistrerDødsfallDato(options?: Options) {
    const { request } = useHttp();

    return useMutation<IBehandling, Error, RegistrerDødsfallDatoParameters>({
        mutationFn: (parameters: RegistrerDødsfallDatoParameters): Promise<IBehandling> => {
            const { dødsfallDato, begrunnelse, personIdent, behandlingId } = parameters;
            const payload = { dødsfallDato, begrunnelse, personIdent };
            return registrerDødsfall(request, payload, behandlingId);
        },
        ...options,
    });
}
