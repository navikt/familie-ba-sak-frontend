import {
    oppdaterUtenlandskPeriodeBeløp,
    type OppdaterUtenlandskPeriodeBeløpPayload,
} from '@api/utenlandskPeriodeBeløp';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface OppdaterUtenlandskPeriodeBeløpParameters extends OppdaterUtenlandskPeriodeBeløpPayload {
    behandlingId: number;
}

type Options = Omit<
    UseMutationOptions<IBehandling, DefaultError, OppdaterUtenlandskPeriodeBeløpParameters>,
    'mutationFn'
>;

export function useOppdaterUtenlandskPeriodeBeløp(options?: Options) {
    return useMutation({
        mutationFn: ({ behandlingId, ...payload }: OppdaterUtenlandskPeriodeBeløpParameters) =>
            oppdaterUtenlandskPeriodeBeløp(payload, behandlingId),
        ...options,
    });
}
