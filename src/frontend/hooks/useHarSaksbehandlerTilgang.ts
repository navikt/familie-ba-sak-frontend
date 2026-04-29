import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { harSaksbehandlerTilgang, type HarSaksbehandlerTilgangPayload } from '../api/harSaksbehandlerTilgang';
import type { IRestTilgang } from '../typer/person';

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
