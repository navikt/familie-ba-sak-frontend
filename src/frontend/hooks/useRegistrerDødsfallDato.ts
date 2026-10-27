import { type RegistrerDødsfallDatoPayload, registrerDødsfall } from '@api/registrerDødsfallDato';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface RegistrerDødsfallDatoParameters extends RegistrerDødsfallDatoPayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, RegistrerDødsfallDatoParameters>, 'mutationFn'>;

export function useRegistrerDødsfallDato(options?: Options) {
    return useMutation<IBehandling, Error, RegistrerDødsfallDatoParameters>({
        mutationFn: (parameters: RegistrerDødsfallDatoParameters): Promise<IBehandling> => {
            const { dødsfallDato, begrunnelse, personIdent, behandlingId } = parameters;
            const payload = { dødsfallDato, begrunnelse, personIdent };
            return registrerDødsfall(payload, behandlingId);
        },
        ...options,
    });
}
