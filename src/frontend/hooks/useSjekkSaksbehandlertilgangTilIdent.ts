import { sjekkSaksbehandlertilgangTilIdent, type Tilgangsresultat } from '@api/sjekkSaksbehandlertilgangTilIdent';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

interface Parameters {
    brukerIdent: string;
}

type Options = Omit<UseMutationOptions<Tilgangsresultat, DefaultError, Parameters>, 'mutationFn'>;

export function useSjekkSaksbehandlertilgangTilIdent(options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { brukerIdent } = parameters;
            const payload = { brukerIdent };
            return sjekkSaksbehandlertilgangTilIdent(request, payload);
        },
        ...options,
    });
}
