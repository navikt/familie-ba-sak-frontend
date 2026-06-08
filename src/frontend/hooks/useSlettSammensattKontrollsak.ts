import { slettSammensattKontrollsak } from '@api/slettSammensattKontrollsak';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';

import { useHttp } from '@navikt/familie-http';

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
