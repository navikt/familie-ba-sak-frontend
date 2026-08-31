import { opprettSammensattKontrollsak } from '@api/opprettSammensattKontrollsak';
import { useHttp } from '@navikt/familie-http';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IRestOpprettSammensattKontrollsak, IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';

type Parameters = IRestOpprettSammensattKontrollsak;

type Options = Omit<UseMutationOptions<IRestSammensattKontrollsak, DefaultError, Parameters>, 'mutationFn'>;

export const OpprettSammensattKontrollsakMutationKeyFactory = {
    opprettSammensattKontrollsak: (behandlingId: number) => ['opprettSammensattKontrollsak', behandlingId],
};

export function useOpprettSammensattKontrollsak(behandlingId: number, options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationKey: OpprettSammensattKontrollsakMutationKeyFactory.opprettSammensattKontrollsak(behandlingId),
        mutationFn: (parameters: Parameters) => opprettSammensattKontrollsak(request, parameters),
        ...options,
    });
}
