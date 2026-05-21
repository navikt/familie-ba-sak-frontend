import { oppdaterSammensattKontrollsak } from '@api/oppdaterSammensattKontrollsak';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';

import { useHttp } from '@navikt/familie-http';

type Parameters = IRestSammensattKontrollsak;

type Options = Omit<UseMutationOptions<IRestSammensattKontrollsak, DefaultError, Parameters>, 'mutationFn'>;

export function useOppdaterSammensattKontrollsak(options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (parameters: Parameters) => oppdaterSammensattKontrollsak(request, parameters),
        ...options,
    });
}
