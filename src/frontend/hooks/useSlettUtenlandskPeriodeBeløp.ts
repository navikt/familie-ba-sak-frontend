import { slettUtenlandskPeriodeBeløp } from '@api/utenlandskPeriodeBeløp';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface SlettUtenlandskPeriodeBeløpParameters {
    behandlingId: number;
    utenlandskPeriodeBeløpId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, SlettUtenlandskPeriodeBeløpParameters>, 'mutationFn'>;

export function useSlettUtenlandskPeriodeBeløp(options?: Options) {
    return useMutation({
        mutationFn: ({ behandlingId, utenlandskPeriodeBeløpId }: SlettUtenlandskPeriodeBeløpParameters) =>
            slettUtenlandskPeriodeBeløp(behandlingId, utenlandskPeriodeBeløpId),
        ...options,
    });
}
