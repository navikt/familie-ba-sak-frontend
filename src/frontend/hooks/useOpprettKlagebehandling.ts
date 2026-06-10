import { opprettKlagebehandling, type OpprettKlagebehandlingPayload } from '@api/opprettKlagebehandling';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface OpprettKlagebehandlingParameters extends OpprettKlagebehandlingPayload {
    fagsakId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, OpprettKlagebehandlingParameters>, 'mutationFn'>;

export function useOpprettKlagebehandling(options?: Options) {
    return useMutation<IBehandling, Error, OpprettKlagebehandlingParameters>({
        mutationFn: ({ klageMottattDato, fagsakId }: OpprettKlagebehandlingParameters): Promise<IBehandling> =>
            opprettKlagebehandling({ klageMottattDato }, fagsakId),
        ...options,
    });
}
