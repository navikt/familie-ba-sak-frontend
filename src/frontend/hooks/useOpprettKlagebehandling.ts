import { opprettKlagebehandling, type OpprettKlagebehandlingPayload } from '@api/opprettKlagebehandling';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

interface OpprettKlagebehandlingParameters extends OpprettKlagebehandlingPayload {
    fagsakId: number;
}

type Options = Omit<UseMutationOptions<number, DefaultError, OpprettKlagebehandlingParameters>, 'mutationFn'>;

export function useOpprettKlagebehandling(options?: Options) {
    return useMutation<number, Error, OpprettKlagebehandlingParameters>({
        mutationFn: ({ klageMottattDato, fagsakId }: OpprettKlagebehandlingParameters): Promise<number> =>
            opprettKlagebehandling({ klageMottattDato }, fagsakId),
        ...options,
    });
}
