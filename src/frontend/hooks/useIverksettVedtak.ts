import type { ApiFeil } from '@api/client/apiClient';
import { iverksettVedtak } from '@api/iverksettVedtak';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';
import type { TotrinnskontrollBeslutning } from '@typer/totrinnskontroll';

interface Parameters {
    behandlingId: number;
    beslutning: TotrinnskontrollBeslutning;
    begrunnelse: string;
    kontrollerteSider: string[];
}

type Options = Omit<UseMutationOptions<IBehandling, ApiFeil, Parameters>, 'mutationFn'>;

export function useIverksettVedtak(options?: Options) {
    return useMutation<IBehandling, ApiFeil, Parameters>({
        mutationFn: (parameters: Parameters): Promise<IBehandling> => {
            const { behandlingId, ...payload } = parameters;
            return iverksettVedtak({ behandlingId }, payload);
        },
        ...options,
    });
}
