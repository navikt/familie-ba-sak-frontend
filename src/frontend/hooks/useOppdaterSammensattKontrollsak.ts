import { oppdaterSammensattKontrollsak } from '@api/oppdaterSammensattKontrollsak';
import { useHttp } from '@navikt/familie-http';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';

type Parameters = IRestSammensattKontrollsak;

type Options = Omit<UseMutationOptions<IRestSammensattKontrollsak, DefaultError, Parameters>, 'mutationFn'>;

export function useOppdaterSammensattKontrollsak(options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (parameters: Parameters) => oppdaterSammensattKontrollsak(request, parameters),
        ...options,
    });
}
