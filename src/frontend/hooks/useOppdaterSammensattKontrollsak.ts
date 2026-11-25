import { oppdaterSammensattKontrollsak } from '@api/oppdaterSammensattKontrollsak';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';

type Parameters = IRestSammensattKontrollsak;

type Options = Omit<UseMutationOptions<IRestSammensattKontrollsak, DefaultError, Parameters>, 'mutationFn'>;

export function useOppdaterSammensattKontrollsak(options?: Options) {
    return useMutation({
        mutationFn: (parameters: Parameters) => oppdaterSammensattKontrollsak(parameters),
        ...options,
    });
}
