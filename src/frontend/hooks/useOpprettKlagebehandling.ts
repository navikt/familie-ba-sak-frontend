import { opprettKlagebehandling, type OpprettKlagebehandlingPayload } from '@api/opprettKlagebehandling';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

import { useHttp } from '@navikt/familie-http';

interface OpprettKlagebehandlingParameters extends OpprettKlagebehandlingPayload {
    fagsakId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, OpprettKlagebehandlingParameters>, 'mutationFn'>;

export function useOpprettKlagebehandling(options?: Options) {
    const { request } = useHttp();

    return useMutation<IBehandling, Error, OpprettKlagebehandlingParameters>({
        mutationFn: (parameters: OpprettKlagebehandlingParameters): Promise<IBehandling> => {
            const { klageMottattDato, fagsakId } = parameters;
            const payload = { klageMottattDato };
            return opprettKlagebehandling(request, payload, fagsakId);
        },
        ...options,
    });
}
