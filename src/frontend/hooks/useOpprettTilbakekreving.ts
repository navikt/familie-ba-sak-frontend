import { opprettTilbakekreving } from '@api/opprettTilbakekreving';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

import { useHttp } from '@navikt/familie-http';

interface OpprettTilbakekrevingParameters {
    fagsakId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, OpprettTilbakekrevingParameters>, 'mutationFn'>;

export function useOpprettTilbakekreving(options?: Options) {
    const { request } = useHttp();

    return useMutation<IBehandling, Error, OpprettTilbakekrevingParameters>({
        mutationFn: (parameters: OpprettTilbakekrevingParameters): Promise<IBehandling> => {
            return opprettTilbakekreving(request, parameters.fagsakId);
        },
        ...options,
    });
}
