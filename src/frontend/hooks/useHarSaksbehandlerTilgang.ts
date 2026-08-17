import { harSaksbehandlerTilgang, type HarSaksbehandlerTilgangPayload } from '@api/harSaksbehandlerTilgang';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IRestTilgang } from '@typer/person';

type Options = Omit<UseMutationOptions<IRestTilgang, DefaultError, HarSaksbehandlerTilgangPayload>, 'mutationFn'>;

export function useHarSaksbehandlerTilgang(options?: Options) {
    return useMutation<IRestTilgang, Error, HarSaksbehandlerTilgangPayload>({
        mutationFn: (payload: HarSaksbehandlerTilgangPayload): Promise<IRestTilgang> =>
            harSaksbehandlerTilgang(payload),
        ...options,
    });
}
