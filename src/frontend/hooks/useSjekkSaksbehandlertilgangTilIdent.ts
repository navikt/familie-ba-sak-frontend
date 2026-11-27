import { sjekkSaksbehandlertilgangTilIdent, type Tilgangsresultat } from '@api/sjekkSaksbehandlertilgangTilIdent';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';

interface Parameters {
    brukerIdent: string;
}

type Options = Omit<UseMutationOptions<Tilgangsresultat, DefaultError, Parameters>, 'mutationFn'>;

export function useSjekkSaksbehandlertilgangTilIdent(options?: Options) {
    return useMutation({
        mutationFn: ({ brukerIdent }: Parameters) => sjekkSaksbehandlertilgangTilIdent({ brukerIdent }),
        ...options,
    });
}
