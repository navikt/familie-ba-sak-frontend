import { registrerSøknad } from '@api/registrerSøknad';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';
import type { IRestRegistrerSøknad } from '@typer/søknad';

interface RegistrerSøknadParameters {
    behandlingId: number;
    søknad: IRestRegistrerSøknad;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, RegistrerSøknadParameters>, 'mutationFn'>;

export function useRegistrerSøknad(options?: Options) {
    return useMutation({
        mutationFn: ({ behandlingId, søknad }: RegistrerSøknadParameters) => registrerSøknad(søknad, behandlingId),
        ...options,
    });
}
