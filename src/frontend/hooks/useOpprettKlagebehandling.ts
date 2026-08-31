import { type OpprettKlagebehandlingPayload, opprettKlagebehandling } from '@api/opprettKlagebehandling';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';

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
