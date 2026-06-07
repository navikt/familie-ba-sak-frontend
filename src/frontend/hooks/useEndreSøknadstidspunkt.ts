import { endreSøknadstidspunkt, type EndreSøknadstidspunktPayload } from '@api/endreSøknadstidspunkt';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface EndreSøknadstidspunktParameters extends EndreSøknadstidspunktPayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, EndreSøknadstidspunktParameters>, 'mutationFn'>;

export function useEndreSøknadstidspunkt(options?: Options) {
    return useMutation({
        mutationFn: ({ søknadstidspunktPerPerson, behandlingId }: EndreSøknadstidspunktParameters) =>
            endreSøknadstidspunkt({ søknadstidspunktPerPerson }, behandlingId),
        ...options,
    });
}
