import { harSaksbehandlerTilgang, type HarSaksbehandlerTilgangPayload } from '@api/harSaksbehandlerTilgang';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IRestTilgang } from '@typer/person';

import { useHttp } from '@navikt/familie-http';

type Options = Omit<UseMutationOptions<IRestTilgang, DefaultError, HarSaksbehandlerTilgangPayload>, 'mutationFn'>;

export const useHarSaksbehandlerTilgang = (options?: Options) => {
    const { request } = useHttp();

    return useMutation<IRestTilgang, Error, HarSaksbehandlerTilgangPayload>({
        mutationFn: (parameters: HarSaksbehandlerTilgangPayload): Promise<IRestTilgang> => {
            const { brukerIdent } = parameters;
            return harSaksbehandlerTilgang(request, brukerIdent);
        },
        ...options,
    });
};
