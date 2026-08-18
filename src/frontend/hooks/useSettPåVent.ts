import { type SettPåVentPayload, settPåVent } from '@api/settPåVent';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface SettPåVentParameters extends SettPåVentPayload {
    behandlingId: number;
    erBehandlingAlleredePåVent: boolean;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, SettPåVentParameters>, 'mutationFn'>;

export function useSettPåVent(options?: Options) {
    return useMutation({
        mutationFn: (parameters: SettPåVentParameters) => {
            const { behandlingId, erBehandlingAlleredePåVent, ...payload } = parameters;
            return settPåVent(payload, behandlingId, erBehandlingAlleredePåVent);
        },
        ...options,
    });
}
