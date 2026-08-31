import { slettSammensattKontrollsak } from '@api/slettSammensattKontrollsak';
import { useHttp } from '@navikt/familie-http';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';

type Options = Omit<UseMutationOptions<number, DefaultError, IRestSammensattKontrollsak>, 'mutationKey' | 'mutationFn'>;

export const SlettSammensattKontrollsakMutationKeyFactory = {
    slettSammensattKontrollsak: (behandlingId: number) => ['slettSammensattKontrollsak', behandlingId],
};

export function useSlettSammensattKontrollsak(behandlingId: number, options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationKey: SlettSammensattKontrollsakMutationKeyFactory.slettSammensattKontrollsak(behandlingId),
        mutationFn: (sammensattKontrollsak: IRestSammensattKontrollsak) =>
            slettSammensattKontrollsak(request, sammensattKontrollsak),
        ...options,
    });
}
